/**
 * Autofill System for Position Paper Writer
 *
 * Handles:
 * - Change detection via source data hashing
 * - Autofill execution for populating fields from previous layers
 * - AI-powered text polishing via Cloudflare Workers AI
 * - Rate limiting support utilities
 */

import type { BGWriterDraft, LayerType, TransformType } from "./types";
import {
  getQuestionsForLayer,
  getQuestionById,
  getEffectiveValueRecursive,
  applyTransform,
  combineSentences,
  combineSolutions,
} from "./questions";
import {
  polishText,
  mapToAITransform,
  type PaperContext,
  type PriorContext,
} from "./ai-polish";

/** Layer order for determining which layers are "previous" */
const LAYER_ORDER: LayerType[] = [
  "comprehension",
  "initialContent",
  "research",
  "finalDraft",
];

/**
 * Gather prior context from the draft to provide to the AI.
 * This helps the AI use specific information the student has already written.
 *
 * @param draft - The current draft state
 * @returns PriorContext object with available information
 */
function gatherPriorContext(draft: BGWriterDraft): PriorContext {
  const priorContext: PriorContext = {};

  // From comprehension layer
  const comp = draft.layers.comprehension;
  if (comp.comp_why_important?.trim()) {
    priorContext.whyImportant = comp.comp_why_important;
  }
  if (comp.comp_key_events?.trim()) {
    priorContext.keyEvents = comp.comp_key_events;
  }

  // From initial content layer
  const init = draft.layers.initialContent;
  if (init.init_country_position?.trim()) {
    priorContext.countryPosition = init.init_country_position;
  }
  if (init.init_past_actions?.trim()) {
    priorContext.pastActions = init.init_past_actions;
  }
  if (init.init_proposed_solutions?.trim()) {
    priorContext.proposedSolutions = init.init_proposed_solutions;
  }

  // Also check research layer for more detailed answers
  const research = draft.layers.research;
  if (!priorContext.countryPosition && research.res_country_position?.trim()) {
    priorContext.countryPosition = research.res_country_position;
  }
  if (!priorContext.pastActions && research.res_past_actions?.trim()) {
    priorContext.pastActions = research.res_past_actions;
  }
  if (!priorContext.proposedSolutions && research.res_proposed_solutions?.trim()) {
    priorContext.proposedSolutions = research.res_proposed_solutions;
  }

  return priorContext;
}

/**
 * Fast string hash using djb2 algorithm.
 * Not cryptographic, but fast and sufficient for change detection.
 */
function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  // Convert to base36 for compact representation
  return (hash >>> 0).toString(36);
}

/**
 * Compute a hash of all source layer data that feeds into the target layer.
 * Used to detect if source data has changed since the last autofill.
 *
 * @param targetLayer - The layer we want to autofill into
 * @param draft - The current draft state
 * @returns A hash string representing the source data state
 */
export function computeSourceHash(
  targetLayer: LayerType,
  draft: BGWriterDraft
): string {
  const sourceData: string[] = [];
  const targetIndex = LAYER_ORDER.indexOf(targetLayer);

  // Collect all data from layers BEFORE the target layer
  for (let i = 0; i < targetIndex; i++) {
    const layer = LAYER_ORDER[i];
    if (layer === "finalDraft") continue;

    const layerData = draft.layers[layer];
    // Sort keys for consistent hashing
    const sortedKeys = Object.keys(layerData).sort();
    for (const key of sortedKeys) {
      sourceData.push(`${layer}.${key}:${layerData[key] || ""}`);
    }
  }

  // Include country for combine-solutions transform
  sourceData.push(`meta.country:${draft.country || ""}`);

  return djb2Hash(sourceData.join("|"));
}

/**
 * Result of an autofill operation
 */
export interface AutofillResult {
  /** Number of fields that were updated */
  fieldsUpdated: number;
  /** Field IDs that were updated */
  updatedFields: string[];
  /** Number of fields that were AI-polished */
  aiPolishedCount: number;
  /** Any errors that occurred */
  errors: string[];
}

/**
 * Options for autofill operation
 */
export interface AutofillOptions {
  /** Whether to use AI polishing (default: true) */
  useAI?: boolean;
  /** Paper context for AI prompts */
  paperContext?: PaperContext;
}

/**
 * Perform autofill for a target layer from previous layers.
 * Only fills fields that:
 * 1. Have an autoPopulateFrom definition
 * 2. Don't already have user-entered content
 * 3. Have available source data
 *
 * This is the synchronous version without AI polishing.
 * Use performAutofillWithAI for AI-enhanced autofill.
 *
 * @param targetLayer - The layer to autofill into
 * @param draft - The current draft state
 * @param updateAnswer - Callback to update a field value
 * @returns Result containing count of updated fields and any errors
 */
export function performAutofill(
  targetLayer: LayerType,
  draft: BGWriterDraft,
  updateAnswer: (layer: LayerType, questionId: string, value: string) => void
): AutofillResult {
  const result: AutofillResult = {
    fieldsUpdated: 0,
    updatedFields: [],
    aiPolishedCount: 0,
    errors: [],
  };

  // Can't autofill comprehension layer (it's the source)
  if (targetLayer === "comprehension") {
    return result;
  }

  // Final draft layer is handled differently (template generation)
  if (targetLayer === "finalDraft") {
    return result;
  }

  // Get questions for target layer that have autoPopulateFrom
  const questions = getQuestionsForLayer(targetLayer);
  const autoPopulateQuestions = questions.filter((q) => q.autoPopulateFrom);

  // Create accessor for recursive value computation
  const accessor = {
    getDirectValue: (qId: string): string => {
      const q = getQuestionById(qId);
      if (!q) return "";
      if (q.layer === "finalDraft") return draft.layers.finalDraft;
      return draft.layers[q.layer][qId] || "";
    },
    country: draft.country || "Our delegation",
  };

  for (const question of autoPopulateQuestions) {
    // Skip if user has already entered a value
    const currentValue = draft.layers[targetLayer][question.id] || "";
    if (currentValue.trim()) {
      continue;
    }

    try {
      const { questionId: sourceId, transform } = question.autoPopulateFrom!;
      let newValue: string;

      if (sourceId.includes(",")) {
        // Multiple sources - combine them
        const sourceIds = sourceId.split(",").map((id) => id.trim());
        const sourceValues = sourceIds.map((id) =>
          getEffectiveValueRecursive(id, accessor)
        );

        // Skip if no source values available
        if (!sourceValues.some((v) => v.trim())) {
          continue;
        }

        if (transform === "combine-sentences") {
          newValue = combineSentences(sourceValues);
        } else if (transform === "combine-solutions") {
          newValue = combineSolutions(sourceValues, accessor.country);
        } else {
          newValue = sourceValues.filter(Boolean).join(" ");
        }
      } else {
        // Single source
        const sourceValue = getEffectiveValueRecursive(sourceId, accessor);
        if (!sourceValue.trim()) {
          continue;
        }
        newValue = applyTransform(sourceValue, transform as TransformType);
      }

      // Only update if we got a non-empty value
      if (newValue.trim()) {
        updateAnswer(targetLayer, question.id, newValue);
        result.fieldsUpdated++;
        result.updatedFields.push(question.id);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error";
      result.errors.push(`Failed to autofill ${question.id}: ${errorMsg}`);
    }
  }

  return result;
}

/**
 * Perform autofill with AI polishing.
 * This async version calls the Cloudflare Workers AI endpoint
 * to improve the quality of auto-filled text.
 *
 * Falls back to local transforms if AI is unavailable.
 *
 * @param targetLayer - The layer to autofill into
 * @param draft - The current draft state
 * @param updateAnswer - Callback to update a field value
 * @param options - Autofill options including AI settings
 * @returns Result containing count of updated fields and any errors
 */
export async function performAutofillWithAI(
  targetLayer: LayerType,
  draft: BGWriterDraft,
  updateAnswer: (layer: LayerType, questionId: string, value: string) => void,
  options: AutofillOptions = {}
): Promise<AutofillResult> {
  const { useAI = true, paperContext } = options;

  const result: AutofillResult = {
    fieldsUpdated: 0,
    updatedFields: [],
    aiPolishedCount: 0,
    errors: [],
  };

  // Can't autofill comprehension layer (it's the source)
  if (targetLayer === "comprehension") {
    return result;
  }

  // Final draft layer is handled differently (template generation)
  if (targetLayer === "finalDraft") {
    return result;
  }

  // Check if we can use AI
  const canUseAI = useAI && paperContext &&
    paperContext.country?.trim() &&
    paperContext.committee?.trim() &&
    paperContext.topic?.trim();

  // Gather prior context from what the student has already written
  const priorContext = gatherPriorContext(draft);

  console.log("[Autofill] Starting autofill for layer:", targetLayer, { useAI, canUseAI, paperContext, priorContext });

  // Get questions for target layer that have autoPopulateFrom
  const questions = getQuestionsForLayer(targetLayer);
  const autoPopulateQuestions = questions.filter((q) => q.autoPopulateFrom);
  console.log("[Autofill] Found", autoPopulateQuestions.length, "questions with autoPopulateFrom");

  // Create accessor for recursive value computation
  const accessor = {
    getDirectValue: (qId: string): string => {
      const q = getQuestionById(qId);
      if (!q) return "";
      if (q.layer === "finalDraft") return draft.layers.finalDraft;
      return draft.layers[q.layer][qId] || "";
    },
    country: draft.country || "Our delegation",
  };

  // Process questions - collect all work first, then execute
  const updateTasks: Array<{
    questionId: string;
    transform: string | undefined;
    isMultiSource: boolean;
    localValue: string;
  }> = [];

  for (const question of autoPopulateQuestions) {
    // Skip if user has already entered a value
    const currentValue = draft.layers[targetLayer][question.id] || "";
    if (currentValue.trim()) {
      continue;
    }

    try {
      const { questionId: sourceId, transform } = question.autoPopulateFrom!;
      let localValue: string;
      const isMultiSource = sourceId.includes(",");

      if (isMultiSource) {
        // Multiple sources - combine them
        const sourceIds = sourceId.split(",").map((id) => id.trim());
        const sourceValues = sourceIds.map((id) =>
          getEffectiveValueRecursive(id, accessor)
        );

        // Skip if no source values available
        if (!sourceValues.some((v) => v.trim())) {
          continue;
        }

        if (transform === "combine-sentences") {
          localValue = combineSentences(sourceValues);
        } else if (transform === "combine-solutions") {
          localValue = combineSolutions(sourceValues, accessor.country);
        } else {
          localValue = sourceValues.filter(Boolean).join(" ");
        }
      } else {
        // Single source
        const sourceValue = getEffectiveValueRecursive(sourceId, accessor);
        if (!sourceValue.trim()) {
          continue;
        }
        localValue = applyTransform(sourceValue, transform as TransformType);
      }

      if (localValue.trim()) {
        updateTasks.push({
          questionId: question.id,
          transform,
          isMultiSource,
          localValue,
        });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error";
      result.errors.push(`Failed to process ${question.id}: ${errorMsg}`);
    }
  }

  console.log("[Autofill] Collected", updateTasks.length, "tasks to process:", updateTasks.map(t => t.questionId));

  // Process all tasks - apply AI polishing where applicable
  for (const task of updateTasks) {
    let finalValue = task.localValue;

    // Try AI polishing if enabled
    if (canUseAI) {
      const aiTransform = mapToAITransform(task.transform, task.isMultiSource);
      console.log("[Autofill] Processing task", task.questionId, "with AI transform:", aiTransform);

      if (aiTransform) {
        try {
          const polishResult = await polishText({
            text: task.localValue,
            context: paperContext!,
            transformType: aiTransform,
            priorContext,
          });

          if (polishResult.success && polishResult.polishedText.trim()) {
            finalValue = polishResult.polishedText;
            result.aiPolishedCount++;
            console.log("[Autofill] AI polished successfully for", task.questionId);
          } else if (polishResult.error) {
            // Log but don't fail - use local value
            console.warn("[Autofill] AI polish warning for", task.questionId, ":", polishResult.error);
            result.errors.push(`AI polish warning for ${task.questionId}: ${polishResult.error}`);
          }
        } catch (error) {
          // AI failed - use local value
          const errorMsg = error instanceof Error ? error.message : "Unknown error";
          console.error("[Autofill] AI polish failed for", task.questionId, ":", errorMsg);
          result.errors.push(`AI polish failed for ${task.questionId}: ${errorMsg}`);
        }
      }
    }

    // Update the field
    updateAnswer(targetLayer, task.questionId, finalValue);
    result.fieldsUpdated++;
    result.updatedFields.push(task.questionId);
  }

  console.log("[Autofill] Complete:", result);
  return result;
}

/**
 * Get the count of fields that could potentially be autofilled.
 * Useful for showing users how many empty fields can be filled.
 *
 * @param targetLayer - The layer to check
 * @param draft - The current draft state
 * @returns Count of empty fields with autofill sources
 */
export function getAutofillableFieldCount(
  targetLayer: LayerType,
  draft: BGWriterDraft
): number {
  if (targetLayer === "comprehension" || targetLayer === "finalDraft") {
    return 0;
  }

  const questions = getQuestionsForLayer(targetLayer);
  const autoPopulateQuestions = questions.filter((q) => q.autoPopulateFrom);

  let count = 0;
  for (const question of autoPopulateQuestions) {
    const currentValue = draft.layers[targetLayer][question.id] || "";
    if (!currentValue.trim()) {
      count++;
    }
  }

  return count;
}
