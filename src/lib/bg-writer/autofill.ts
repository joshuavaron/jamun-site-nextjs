/**
 * Autofill System for Position Paper Writer
 *
 * Version 2 - Updated for new layer structure:
 * - Layer 4: comprehension (source layer)
 * - Layer 3: ideaFormation (bridge layer)
 * - Layer 2: paragraphComponents (polished sections)
 * - Layer 1: finalPaper (assembled paper)
 *
 * Handles:
 * - Change detection via source data hashing
 * - Autofill execution for populating fields from previous layers
 * - AI-powered text polishing via Cloudflare Workers AI
 * - Rate limiting support utilities
 */

import type { BGWriterDraft, LayerType, TransformType, BookmarkSection } from "./types";
import {
  getQuestionsForLayer,
  getEffectiveValueRecursive,
  applyTransform,
  combineSentences,
  combineSolutions,
  combineIdeas,
} from "./questions";
import {
  polishText,
  mapToAITransform,
  type PaperContext,
  type PriorContext,
} from "./ai-polish";

/**
 * Extract keywords from text for relevance matching.
 * Filters out common stop words and returns lowercase keywords.
 */
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "must", "shall", "can", "this",
    "that", "these", "those", "it", "its", "as", "if", "when", "than",
    "so", "no", "not", "only", "own", "same", "too", "very", "just",
    "also", "now", "here", "there", "where", "how", "all", "each",
    "every", "both", "few", "more", "most", "other", "some", "such",
    "what", "which", "who", "whom", "why", "into", "through", "during",
    "before", "after", "above", "below", "between", "under", "again",
    "further", "then", "once", "about", "over", "out", "up", "down",
    "off", "any", "our", "your", "their", "his", "her", "we", "they",
    "you", "i", "me", "him", "them", "us", "my", "he", "she",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  return new Set(words);
}

/**
 * Calculate relevance score between a bookmark section and query keywords.
 * Higher score = more relevant.
 */
function calculateRelevance(section: BookmarkSection, queryKeywords: Set<string>): number {
  if (queryKeywords.size === 0) return 0;

  // Extract keywords from both heading and content
  const headingKeywords = extractKeywords(section.headingText);
  const contentKeywords = extractKeywords(section.content);

  let score = 0;

  // Heading matches are worth more (3 points each)
  for (const keyword of queryKeywords) {
    if (headingKeywords.has(keyword)) {
      score += 3;
    }
  }

  // Content matches (1 point each)
  for (const keyword of queryKeywords) {
    if (contentKeywords.has(keyword)) {
      score += 1;
    }
  }

  return score;
}

/**
 * Select the most relevant bookmark sections based on query context.
 * Returns up to `limit` sections sorted by relevance.
 */
function selectRelevantSections(
  sections: BookmarkSection[],
  queryContext: string,
  limit: number = 3
): BookmarkSection[] {
  if (sections.length <= limit) {
    return sections;
  }

  const queryKeywords = extractKeywords(queryContext);

  // Score each section
  const scored = sections.map(section => ({
    section,
    score: calculateRelevance(section, queryKeywords),
  }));

  // Sort by score descending, then take top `limit`
  scored.sort((a, b) => b.score - a.score);

  // Return sections with non-zero scores first, then fill with others if needed
  const relevant = scored.slice(0, limit).map(s => s.section);

  return relevant;
}

/** Layer order for v2 structure */
const LAYER_ORDER: LayerType[] = [
  "comprehension",       // Layer 4 (source)
  "ideaFormation",       // Layer 3 (bridge)
  "paragraphComponents", // Layer 2 (polished sections)
  "finalPaper",          // Layer 1 (assembled)
];

/**
 * Gather prior context from the draft to provide to the AI.
 * This helps the AI use specific information the student has already written.
 *
 * @param draft - The current draft state
 * @param queryContext - Optional context string for relevance filtering
 * @returns PriorContext object with available information
 */
function gatherPriorContext(draft: BGWriterDraft, queryContext?: string): PriorContext {
  const priorContext: PriorContext = {};

  // From comprehension layer (Layer 4)
  const comp = draft.layers.comprehension;

  // Key comprehension answers
  if (comp.topicDefinition?.trim()) {
    priorContext.whyImportant = comp.topicDefinition;
  }
  if (comp.timeline?.trim()) {
    priorContext.keyEvents = comp.timeline;
  }
  if (comp.countryInvolvement?.trim()) {
    priorContext.countryPosition = comp.countryInvolvement;
  }
  if (comp.pastPositions?.trim()) {
    priorContext.pastActions = comp.pastPositions;
  }

  // From idea formation layer (Layer 3)
  const ideas = draft.layers.ideaFormation;
  if (!priorContext.proposedSolutions && ideas.ideaSolutionProposal?.trim()) {
    priorContext.proposedSolutions = ideas.ideaSolutionProposal;
  }

  // Include bookmarked topics and content from background guides
  if (draft.importedBookmarks && draft.importedBookmarks.length > 0) {
    const allTopics: string[] = [];
    const allSections: BookmarkSection[] = [];

    for (const source of draft.importedBookmarks) {
      if (source.headingTexts && source.headingTexts.length > 0) {
        allTopics.push(...source.headingTexts);
      }
      // Collect all sections with content
      if (source.sections && source.sections.length > 0) {
        for (const section of source.sections) {
          if (section.content?.trim()) {
            allSections.push(section);
          }
        }
      }
    }

    if (allTopics.length > 0) {
      priorContext.backgroundGuideTopics = allTopics;
    }

    // Select most relevant sections (limit to 3) based on query context
    if (allSections.length > 0) {
      // Build query context from: explicit query, topic, country, and existing draft content
      const contextParts: string[] = [];
      if (queryContext) contextParts.push(queryContext);
      if (draft.topic) contextParts.push(draft.topic);
      if (draft.country) contextParts.push(draft.country);
      // Include some existing answers for better context matching
      if (priorContext.whyImportant) contextParts.push(priorContext.whyImportant);
      if (priorContext.keyEvents) contextParts.push(priorContext.keyEvents);

      const fullQueryContext = contextParts.join(" ");

      // Select the 3 most relevant sections
      const relevantSections = selectRelevantSections(allSections, fullQueryContext, 3);

      const contentParts = relevantSections.map(
        section => `## ${section.headingText}\n${section.content}`
      );

      if (contentParts.length > 0) {
        // Limit total content to avoid exceeding token limits
        const fullContent = contentParts.join("\n\n");
        priorContext.backgroundGuideContent =
          fullContent.length > 3000
            ? fullContent.slice(0, 3000) + "\n\n[Content truncated...]"
            : fullContent;
      }
    }
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
    if (layer === "finalPaper") continue;

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

  // Final paper layer is handled differently (template generation)
  if (targetLayer === "finalPaper") {
    return result;
  }

  // Get questions for target layer that have autoPopulateFrom
  const questions = getQuestionsForLayer(targetLayer);
  const autoPopulateQuestions = questions.filter((q) => q.autoPopulateFrom);

  // Create accessor function for recursive value computation
  const accessor = (layer: LayerType, qId: string): string => {
    if (layer === "finalPaper") return draft.layers.finalPaper;
    return draft.layers[layer][qId] || "";
  };

  const country = draft.country || "Our delegation";

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
          newValue = combineSolutions(sourceValues, country);
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

  // Final paper layer is handled differently (template generation)
  if (targetLayer === "finalPaper") {
    return result;
  }

  // Check if we can use AI
  const canUseAI = useAI && paperContext &&
    paperContext.country?.trim() &&
    paperContext.committee?.trim() &&
    paperContext.topic?.trim();

  console.log("[Autofill] Starting autofill for layer:", targetLayer, { useAI, canUseAI, paperContext });

  // Get questions for target layer that have autoPopulateFrom
  const questions = getQuestionsForLayer(targetLayer);
  const autoPopulateQuestions = questions.filter((q) => q.autoPopulateFrom);
  console.log("[Autofill] Found", autoPopulateQuestions.length, "questions with autoPopulateFrom");

  // Create accessor function for recursive value computation
  const accessor = (layer: LayerType, qId: string): string => {
    if (layer === "finalPaper") return draft.layers.finalPaper;
    return draft.layers[layer][qId] || "";
  };

  const country = draft.country || "Our delegation";

  // Process questions - collect all work first, then execute
  const updateTasks: Array<{
    questionId: string;
    transform: string | undefined;
    isMultiSource: boolean;
    localValue: string;
    paragraph: string | undefined;
    translationKey: string;
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
          localValue = combineSolutions(sourceValues, country);
        } else if (transform === "combine-ideas") {
          // For Layer 3: combine L4 research into rough ideas (stays unpolished)
          localValue = combineIdeas(sourceValues);
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
          paragraph: question.paragraph,
          translationKey: question.translationKey,
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
          // Build question-specific context for relevance filtering
          const questionContext = [
            task.paragraph,
            task.translationKey,
            task.questionId,
          ].filter(Boolean).join(" ");

          // Gather prior context with question-specific relevance filtering
          const priorContext = gatherPriorContext(draft, questionContext);

          const polishResult = await polishText({
            text: task.localValue,
            context: paperContext!,
            transformType: aiTransform,
            priorContext,
            targetLayer: targetLayer as "ideaFormation" | "paragraphComponents",
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
  if (targetLayer === "comprehension" || targetLayer === "finalPaper") {
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
