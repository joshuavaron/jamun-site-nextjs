/**
 * Position Paper Writer Question Definitions
 *
 * Redesigned for maximum scaffolding - completing each section
 * directly builds the final position paper.
 *
 * Layer 1: Gather raw materials (facts, research, country info)
 * Layer 2: Build paragraph components (sentences, points)
 * Layer 3: Structure paragraphs with TEEA (Topic, Evidence, Explanation, Action)
 * Layer 4: Auto-assembled final paper
 */

import type { QuestionDefinition, LayerType } from "./types";

export const QUESTIONS: QuestionDefinition[] = [
  // ============================================
  // LAYER 1: COMPREHENSION
  // Gather all raw materials from background guide
  // ============================================
  {
    id: "country",
    layer: "comprehension",
    translationKey: "country",
    inputType: "text",
    required: true,
  },
  {
    id: "committee",
    layer: "comprehension",
    translationKey: "committee",
    inputType: "text",
    required: true,
  },
  {
    id: "topic",
    layer: "comprehension",
    translationKey: "topic",
    inputType: "text",
    required: true,
  },
  {
    id: "topicDefinition",
    layer: "comprehension",
    translationKey: "topicDefinition",
    helpTextKey: "topicDefinitionHelp",
    inputType: "textarea",
  },
  {
    id: "keyFacts",
    layer: "comprehension",
    translationKey: "keyFacts",
    helpTextKey: "keyFactsHelp",
    inputType: "bullets",
  },
  {
    id: "historicalEvents",
    layer: "comprehension",
    translationKey: "historicalEvents",
    helpTextKey: "historicalEventsHelp",
    inputType: "bullets",
  },
  {
    id: "countryBasicPosition",
    layer: "comprehension",
    translationKey: "countryBasicPosition",
    helpTextKey: "countryBasicPositionHelp",
    inputType: "textarea",
  },
  {
    id: "countryActions",
    layer: "comprehension",
    translationKey: "countryActions",
    helpTextKey: "countryActionsHelp",
    inputType: "bullets",
  },

  // ============================================
  // LAYER 2: BUILDING BLOCKS
  // Write specific sentences that become paragraphs
  // ============================================

  // INTRODUCTION BUILDING BLOCKS
  {
    id: "hookSentence",
    layer: "initialContent",
    translationKey: "hookSentence",
    helpTextKey: "hookSentenceHelp",
    inputType: "textarea",
    section: "introduction",
  },
  {
    id: "topicImportance",
    layer: "initialContent",
    translationKey: "topicImportance",
    helpTextKey: "topicImportanceHelp",
    inputType: "textarea",
    section: "introduction",
    autoPopulateFrom: {
      layer: "comprehension",
      questionId: "topicDefinition",
    },
  },
  {
    id: "thesisStatement",
    layer: "initialContent",
    translationKey: "thesisStatement",
    helpTextKey: "thesisStatementHelp",
    inputType: "textarea",
    section: "introduction",
  },

  // BACKGROUND BUILDING BLOCKS
  {
    id: "backgroundContext",
    layer: "initialContent",
    translationKey: "backgroundContext",
    helpTextKey: "backgroundContextHelp",
    inputType: "textarea",
    section: "background",
  },
  {
    id: "keyEventsDescription",
    layer: "initialContent",
    translationKey: "keyEventsDescription",
    helpTextKey: "keyEventsDescriptionHelp",
    inputType: "textarea",
    section: "background",
    autoPopulateFrom: {
      layer: "comprehension",
      questionId: "historicalEvents",
      transform: "bullets-to-text",
    },
  },
  {
    id: "currentSituation",
    layer: "initialContent",
    translationKey: "currentSituation",
    helpTextKey: "currentSituationHelp",
    inputType: "textarea",
    section: "background",
  },

  // POSITION BUILDING BLOCKS
  {
    id: "positionStatement",
    layer: "initialContent",
    translationKey: "positionStatement",
    helpTextKey: "positionStatementHelp",
    inputType: "textarea",
    section: "position",
    autoPopulateFrom: {
      layer: "comprehension",
      questionId: "countryBasicPosition",
    },
  },
  {
    id: "positionReason1",
    layer: "initialContent",
    translationKey: "positionReason1",
    helpTextKey: "positionReasonHelp",
    inputType: "textarea",
    section: "position",
  },
  {
    id: "positionReason2",
    layer: "initialContent",
    translationKey: "positionReason2",
    helpTextKey: "positionReasonHelp",
    inputType: "textarea",
    section: "position",
  },
  {
    id: "pastActions",
    layer: "initialContent",
    translationKey: "pastActions",
    helpTextKey: "pastActionsHelp",
    inputType: "textarea",
    section: "position",
    autoPopulateFrom: {
      layer: "comprehension",
      questionId: "countryActions",
      transform: "bullets-to-text",
    },
  },

  // SOLUTIONS BUILDING BLOCKS
  {
    id: "solution1",
    layer: "initialContent",
    translationKey: "solution1",
    helpTextKey: "solutionHelp",
    inputType: "textarea",
    section: "solutions",
  },
  {
    id: "solution2",
    layer: "initialContent",
    translationKey: "solution2",
    helpTextKey: "solutionHelp",
    inputType: "textarea",
    section: "solutions",
  },
  {
    id: "solution3",
    layer: "initialContent",
    translationKey: "solution3",
    helpTextKey: "solutionHelp",
    inputType: "textarea",
    section: "solutions",
  },

  // ============================================
  // LAYER 3: STRUCTURED PARAGRAPHS
  // Use TEEA format: Topic, Evidence, Explanation, Action/Transition
  // ============================================

  // INTRODUCTION PARAGRAPH STRUCTURE
  {
    id: "introTopicSentence",
    layer: "research",
    translationKey: "introTopicSentence",
    helpTextKey: "introTopicSentenceHelp",
    inputType: "textarea",
    section: "introduction",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "hookSentence",
    },
  },
  {
    id: "introContext",
    layer: "research",
    translationKey: "introContext",
    helpTextKey: "introContextHelp",
    inputType: "textarea",
    section: "introduction",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "topicImportance",
    },
  },
  {
    id: "introThesis",
    layer: "research",
    translationKey: "introThesis",
    helpTextKey: "introThesisHelp",
    inputType: "textarea",
    section: "introduction",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "thesisStatement",
    },
  },
  {
    id: "introPreview",
    layer: "research",
    translationKey: "introPreview",
    helpTextKey: "introPreviewHelp",
    inputType: "textarea",
    section: "introduction",
  },

  // BACKGROUND PARAGRAPH STRUCTURE
  {
    id: "bgTopicSentence",
    layer: "research",
    translationKey: "bgTopicSentence",
    helpTextKey: "bgTopicSentenceHelp",
    inputType: "textarea",
    section: "background",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "backgroundContext",
    },
  },
  {
    id: "bgEvidence",
    layer: "research",
    translationKey: "bgEvidence",
    helpTextKey: "bgEvidenceHelp",
    inputType: "textarea",
    section: "background",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "keyEventsDescription",
    },
  },
  {
    id: "bgAnalysis",
    layer: "research",
    translationKey: "bgAnalysis",
    helpTextKey: "bgAnalysisHelp",
    inputType: "textarea",
    section: "background",
    autoPopulateFrom: {
      layer: "comprehension",
      questionId: "keyFacts",
      transform: "bullets-to-text",
    },
  },
  {
    id: "bgTransition",
    layer: "research",
    translationKey: "bgTransition",
    helpTextKey: "bgTransitionHelp",
    inputType: "textarea",
    section: "background",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "currentSituation",
    },
  },

  // POSITION PARAGRAPH STRUCTURE
  {
    id: "posTopicSentence",
    layer: "research",
    translationKey: "posTopicSentence",
    helpTextKey: "posTopicSentenceHelp",
    inputType: "textarea",
    section: "position",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "positionStatement",
    },
  },
  {
    id: "posEvidence",
    layer: "research",
    translationKey: "posEvidence",
    helpTextKey: "posEvidenceHelp",
    inputType: "textarea",
    section: "position",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "positionReason1,positionReason2",
      transform: "combine-sentences",
    },
  },
  {
    id: "posAnalysis",
    layer: "research",
    translationKey: "posAnalysis",
    helpTextKey: "posAnalysisHelp",
    inputType: "textarea",
    section: "position",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "pastActions",
    },
  },
  {
    id: "posCounterargument",
    layer: "research",
    translationKey: "posCounterargument",
    helpTextKey: "posCounterargumentHelp",
    inputType: "textarea",
    section: "position",
  },
  {
    id: "posRebuttal",
    layer: "research",
    translationKey: "posRebuttal",
    helpTextKey: "posRebuttalHelp",
    inputType: "textarea",
    section: "position",
  },

  // SOLUTIONS PARAGRAPH STRUCTURE
  {
    id: "solTopicSentence",
    layer: "research",
    translationKey: "solTopicSentence",
    helpTextKey: "solTopicSentenceHelp",
    inputType: "textarea",
    section: "solutions",
  },
  {
    id: "solSolution1Full",
    layer: "research",
    translationKey: "solSolution1Full",
    helpTextKey: "solSolutionFullHelp",
    inputType: "textarea",
    section: "solutions",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "solution1",
    },
  },
  {
    id: "solSolution2Full",
    layer: "research",
    translationKey: "solSolution2Full",
    helpTextKey: "solSolutionFullHelp",
    inputType: "textarea",
    section: "solutions",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "solution2",
    },
  },
  {
    id: "solSolution3Full",
    layer: "research",
    translationKey: "solSolution3Full",
    helpTextKey: "solSolutionFullHelp",
    inputType: "textarea",
    section: "solutions",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "solution3",
    },
  },
  {
    id: "solImplementation",
    layer: "research",
    translationKey: "solImplementation",
    helpTextKey: "solImplementationHelp",
    inputType: "textarea",
    section: "solutions",
  },

  // CONCLUSION PARAGRAPH STRUCTURE
  {
    id: "conRestatement",
    layer: "research",
    translationKey: "conRestatement",
    helpTextKey: "conRestatementHelp",
    inputType: "textarea",
    section: "conclusion",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "thesisStatement",
    },
  },
  {
    id: "conSummary",
    layer: "research",
    translationKey: "conSummary",
    helpTextKey: "conSummaryHelp",
    inputType: "textarea",
    section: "conclusion",
    autoPopulateFrom: {
      layer: "initialContent",
      questionId: "solution1,solution2,solution3",
      transform: "combine-solutions",
    },
  },
  {
    id: "conCallToAction",
    layer: "research",
    translationKey: "conCallToAction",
    helpTextKey: "conCallToActionHelp",
    inputType: "textarea",
    section: "conclusion",
  },
];

/**
 * Get questions for a specific layer
 */
export function getQuestionsForLayer(layer: LayerType): QuestionDefinition[] {
  return QUESTIONS.filter((q) => q.layer === layer);
}

/**
 * Get a question by ID
 */
export function getQuestionById(id: string): QuestionDefinition | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

/**
 * Transform bullet list to paragraph text
 * Each bullet becomes a complete sentence in a flowing paragraph
 */
export function bulletsToText(bullets: string): string {
  const points = bullets
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const text = line.replace(/^[-•*]\s*/, "").trim();
      // Ensure each point ends with proper punctuation
      if (!text.endsWith(".") && !text.endsWith("!") && !text.endsWith("?")) {
        return text + ".";
      }
      return text;
    });

  return points.join(" ");
}

/**
 * Get individual bullet points as an array
 * Useful for creating separate sentences from each bullet
 */
export function bulletsToArray(bullets: string): string[] {
  return bullets
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((text) => text.length > 0);
}

/**
 * Transform bullet list to numbered sentences
 * E.g., "First, ... Second, ... Third, ..."
 */
export function bulletsToNumberedSentences(bullets: string, intro?: string): string {
  const points = bulletsToArray(bullets);
  if (points.length === 0) return "";

  const ordinals = ["First", "Second", "Third", "Fourth", "Fifth"];
  const sentences = points.map((point, i) => {
    const ordinal = ordinals[i] || `${i + 1}.`;
    // Lowercase the first letter of the point
    const lowercased = point.charAt(0).toLowerCase() + point.slice(1);
    // Ensure ends with period
    const withPeriod = lowercased.endsWith(".") || lowercased.endsWith("!") || lowercased.endsWith("?")
      ? lowercased
      : lowercased + ".";
    return `${ordinal}, ${withPeriod}`;
  });

  return intro ? `${intro} ${sentences.join(" ")}` : sentences.join(" ");
}

/**
 * Transform text to bullet list
 */
export function textToBullets(text: string): string {
  return text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim())
    .map((sentence) => `• ${sentence.trim()}`)
    .join("\n");
}

/**
 * Combine multiple text fields into a paragraph
 */
export function combineSentences(texts: string[]): string {
  return texts
    .filter((t) => t && t.trim())
    .map((t) => t.trim())
    .map((t) => (t.endsWith(".") || t.endsWith("!") || t.endsWith("?") ? t : t + "."))
    .join(" ");
}

/**
 * Combine solutions into a structured paragraph
 */
export function combineSolutions(solutions: string[], country: string): string {
  const validSolutions = solutions.filter((s) => s && s.trim());
  if (validSolutions.length === 0) return "";

  const intro = `${country} proposes the following solutions to address this issue.`;
  const formatted = validSolutions
    .map((s, i) => `${i === 0 ? "First" : i === 1 ? "Second" : "Third"}, ${s.trim().charAt(0).toLowerCase() + s.trim().slice(1)}`)
    .map((s) => (s.endsWith(".") ? s : s + "."))
    .join(" ");

  return `${intro} ${formatted}`;
}

/**
 * Apply auto-population transform
 */
export function applyTransform(
  value: string,
  transform?: "bullets-to-text" | "text-to-bullets" | "combine-sentences" | "combine-solutions",
  additionalValues?: string[],
  country?: string
): string {
  if (!transform) return value;
  if (transform === "bullets-to-text") return bulletsToText(value);
  if (transform === "text-to-bullets") return textToBullets(value);
  if (transform === "combine-sentences" && additionalValues) {
    return combineSentences([value, ...additionalValues]);
  }
  if (transform === "combine-solutions" && additionalValues) {
    return combineSolutions([value, ...additionalValues], country || "Our delegation");
  }
  return value;
}

/**
 * Generic layer data accessor type
 * This allows the recursive function to work with different data structures
 */
type LayerDataAccessor = {
  getDirectValue: (questionId: string) => string;
  country: string;
};

/**
 * Recursively compute the effective value for a question by following
 * the auto-populate chain all the way back to the source.
 *
 * For example: historicalEvents (L1) -> keyEventsDescription (L2) -> bgEvidence (L3)
 * If bgEvidence and keyEventsDescription are both empty, this will trace back
 * to historicalEvents and apply all transforms along the way.
 *
 * @param questionId - The question ID to get the value for
 * @param accessor - Object providing access to draft data
 * @param visited - Set of already visited question IDs (to prevent infinite loops)
 * @returns The effective value (user input or recursively computed auto-populated value)
 */
export function getEffectiveValueRecursive(
  questionId: string,
  accessor: LayerDataAccessor,
  visited: Set<string> = new Set()
): string {
  // Prevent infinite loops
  if (visited.has(questionId)) return "";
  visited.add(questionId);

  const question = getQuestionById(questionId);
  if (!question) return "";

  // Check if user has entered a value directly
  const userValue = accessor.getDirectValue(questionId);
  if (userValue.trim()) return userValue;

  // No user value - follow the auto-populate chain
  if (!question.autoPopulateFrom) return "";

  const { questionId: sourceId, transform } = question.autoPopulateFrom;

  // Handle comma-separated questionIds for combining multiple fields
  if (sourceId.includes(",")) {
    const sourceIds = sourceId.split(",").map((id) => id.trim());
    // Recursively get effective values for each source
    const sourceValues = sourceIds.map((id) =>
      getEffectiveValueRecursive(id, accessor, new Set(visited))
    );

    if (!sourceValues.some((v) => v.trim())) return "";

    if (transform === "combine-sentences") {
      return combineSentences(sourceValues);
    }
    if (transform === "combine-solutions") {
      return combineSolutions(sourceValues, accessor.country);
    }
    return sourceValues.filter(Boolean).join(" ");
  }

  // Recursively get the effective value from the source question
  const sourceValue = getEffectiveValueRecursive(sourceId, accessor, new Set(visited));
  if (!sourceValue) return "";

  // Apply transform
  return applyTransform(sourceValue, transform);
}
