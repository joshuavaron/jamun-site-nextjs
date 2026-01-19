/**
 * Position Paper Writer Types
 *
 * TypeScript interfaces for the position paper writing tool.
 * Aligned with PP-Writer.md specification.
 *
 * Layer Structure (per spec):
 * - Layer 4: Background Guide Comprehension (raw research)
 * - Layer 3: Idea Formation (bridge layer - form complete thoughts)
 * - Layer 2: Paragraph Components (polished sentences)
 * - Layer 1: Final Paper (assembled position paper)
 */

// =============================================================================
// LAYER TYPES
// =============================================================================

export type LayerType =
  | "comprehension"    // Layer 4: Background Guide Comprehension
  | "ideaFormation"    // Layer 3: Form Ideas from research
  | "paragraphComponents"  // Layer 2: Write polished sentences
  | "finalPaper";      // Layer 1: Assembled position paper

export const LAYER_ORDER: LayerType[] = [
  "comprehension",
  "ideaFormation",
  "paragraphComponents",
  "finalPaper",
];

// =============================================================================
// PARAGRAPH TYPES
// =============================================================================

export type ParagraphType =
  | "intro"
  | "background"
  | "position"
  | "solutions"
  | "conclusion";

export const PARAGRAPH_ORDER: ParagraphType[] = [
  "intro",
  "background",
  "position",
  "solutions",
  "conclusion",
];

// =============================================================================
// BOOKMARK CATEGORIES (Layer 4 comprehension categories from spec)
// =============================================================================

export type BookmarkCategory =
  // Topic Fundamentals
  | "topic_definition"
  | "key_terms"
  | "scope"
  // Historical Context
  | "origin"
  | "timeline"
  | "evolution"
  // Current Situation
  | "present_state"
  | "key_statistics"
  | "recent_developments"
  // Stakeholders
  | "affected_populations"
  | "key_actors"
  | "power_dynamics"
  // Existing Efforts
  | "un_actions"
  | "regional_efforts"
  | "success_stories"
  | "failures"
  // Points of Contention
  | "major_debates"
  | "competing_interests"
  | "barriers"
  // Country-Specific Research
  | "country_involvement"
  | "past_positions"
  | "country_interests"
  | "allies"
  | "constraints"
  // Fallback
  | "other";

export const BOOKMARK_CATEGORY_GROUPS: Record<string, BookmarkCategory[]> = {
  topicFundamentals: ["topic_definition", "key_terms", "scope"],
  historicalContext: ["origin", "timeline", "evolution"],
  currentSituation: ["present_state", "key_statistics", "recent_developments"],
  stakeholders: ["affected_populations", "key_actors", "power_dynamics"],
  existingEfforts: ["un_actions", "regional_efforts", "success_stories", "failures"],
  pointsOfContention: ["major_debates", "competing_interests", "barriers"],
  countrySpecific: ["country_involvement", "past_positions", "country_interests", "allies", "constraints"],
};

export const BOOKMARK_CATEGORY_LABELS: Record<BookmarkCategory, string> = {
  topic_definition: "Topic Definition",
  key_terms: "Key Terms",
  scope: "Scope",
  origin: "Origin",
  timeline: "Timeline",
  evolution: "Evolution",
  present_state: "Present State",
  key_statistics: "Key Statistics",
  recent_developments: "Recent Developments",
  affected_populations: "Affected Populations",
  key_actors: "Key Actors",
  power_dynamics: "Power Dynamics",
  un_actions: "UN Actions",
  regional_efforts: "Regional Efforts",
  success_stories: "Success Stories",
  failures: "Failures",
  major_debates: "Major Debates",
  competing_interests: "Competing Interests",
  barriers: "Barriers",
  country_involvement: "Country Involvement",
  past_positions: "Past Positions",
  country_interests: "Country Interests",
  allies: "Allies",
  constraints: "Constraints",
  other: "Other",
};

/**
 * Maps bookmark categories to their corresponding L4 comprehension question IDs.
 * This allows Layer 3 to show the student's L4 answers for relevant categories.
 */
export const CATEGORY_TO_L4_QUESTION: Record<BookmarkCategory, string | null> = {
  topic_definition: "topicDefinition",
  key_terms: "keyTerms",
  scope: "scope",
  origin: "origin",
  timeline: "timeline",
  evolution: "evolution",
  present_state: "presentState",
  key_statistics: "keyStatistics",
  recent_developments: "recentDevelopments",
  affected_populations: "affectedPopulations",
  key_actors: "keyActors",
  power_dynamics: "powerDynamics",
  un_actions: "unActions",
  regional_efforts: "regionalEfforts",
  success_stories: "successStories",
  failures: "failures",
  major_debates: "majorDebates",
  competing_interests: "competingInterests",
  barriers: "barriers",
  country_involvement: "countryInvolvement",
  past_positions: "pastPositions",
  country_interests: "countryInterests",
  allies: "allies",
  constraints: "constraints",
  other: null,
};

// =============================================================================
// BOOKMARK TYPES
// =============================================================================

export interface BookmarkSection {
  id: string;
  headingText: string;
  content: string;
}

export interface ClassifiedBookmark extends BookmarkSection {
  category: BookmarkCategory;
  classifiedAt: string;
  classifiedBy: "regex" | "ai" | "manual";
  /** Confidence score 0-1 if classified by AI */
  confidence?: number;
  /** Source document title */
  sourceTitle?: string;
  /** Source document pathname */
  sourcePathname?: string;
}

export interface BookmarkSource {
  pathname: string;
  title: string;
  headingIds: string[];
  headingTexts: string[];
  /** Actual content from each bookmarked section */
  sections: BookmarkSection[];
  /** Classified versions of sections */
  classifiedSections?: ClassifiedBookmark[];
  importedAt: string;
}

// =============================================================================
// AI MODE TYPES
// =============================================================================

export type AIMode =
  | "classify"         // Classify bookmark into L4 category
  | "summarize"        // Mode 2: Summarize selected bookmarks
  | "check_idea"       // Mode 3: Check idea against bookmarks
  | "draft_conclusion" // Mode 4: Draft conclusion from sections
  | "polish";          // Original polish mode (kept for compatibility)

export interface AIModeResult {
  success: boolean;
  error?: string;
}

export interface ClassifyResult extends AIModeResult {
  category: BookmarkCategory;
  confidence: number;
  method: "regex" | "ai";
  classifiedBy: "regex" | "ai" | "manual";
}

export interface SummarizeResult extends AIModeResult {
  summary: string;
}

export interface CheckIdeaResult extends AIModeResult {
  matchingBookmarks: Array<{
    bookmark: ClassifiedBookmark;
    explanation: string;
  }>;
  suggestions?: string;
}

export interface DraftConclusionResult extends AIModeResult {
  draft: string;
}

// =============================================================================
// DRAFT TYPES
// =============================================================================

export interface BGWriterDraft {
  id: string;
  version: 2; // Version 2 for the new structure
  createdAt: string;
  updatedAt: string;
  country: string;
  committee: string;
  topic: string;
  layers: {
    comprehension: Record<string, string>;      // Layer 4: 25 categorized questions
    ideaFormation: Record<string, string>;      // Layer 3: Bridge ideas
    paragraphComponents: Record<string, string>; // Layer 2: 24 polished sentences
    finalPaper: string;                          // Layer 1: Assembled paper
  };
  importedBookmarks: BookmarkSource[];
  /** Classified bookmarks from all sources */
  classifiedBookmarks: ClassifiedBookmark[];
}

export interface DraftSummary {
  id: string;
  country: string;
  committee: string;
  topic: string;
  updatedAt: string;
  completionPercentage: number;
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

export type QuestionInputType = "text" | "textarea" | "bullets";

export type TransformType =
  | "bullets-to-text"
  | "text-to-bullets"
  | "combine-sentences"
  | "combine-solutions"
  | "combine-ideas"    // For L3: combine L4 answers into rough idea (casual language)
  | "direct";          // Direct copy, no transform

export interface QuestionDefinition {
  id: string;
  layer: LayerType;
  translationKey: string;
  helpTextKey?: string;
  inputType: QuestionInputType;
  required?: boolean;
  /** Which paragraph this question belongs to (for L2/L3) */
  paragraph?: ParagraphType;
  /** L4 category group for comprehension questions */
  categoryGroup?: string;
  /** Which bookmark categories are relevant for this question */
  l4Sources?: BookmarkCategory[];
  /** Auto-populate configuration */
  autoPopulateFrom?: {
    layer: LayerType;
    questionId: string; // Can be comma-separated for combining multiple fields
    transform?: TransformType;
  };
  /** For Layer 3: describes what idea to form */
  ideaGoal?: string;
  /** For Layer 3: describes which L4 fields to combine */
  combineFrom?: string;
  /** For Layer 3: which earlier L3 question IDs to show as "Previous Ideas" */
  l3Sources?: string[];
}

// =============================================================================
// LAYER INFO
// =============================================================================

export interface LayerInfo {
  type: LayerType;
  translationKey: string;
  descriptionKey: string;
  color: string;
  icon: string;
  /** Layer number per spec (4, 3, 2, 1) */
  specNumber: number;
}

export const LAYER_INFO: Record<LayerType, LayerInfo> = {
  comprehension: {
    type: "comprehension",
    translationKey: "comprehension",
    descriptionKey: "comprehensionDesc",
    color: "jamun-blue",
    icon: "BookOpen",
    specNumber: 4,
  },
  ideaFormation: {
    type: "ideaFormation",
    translationKey: "ideaFormation",
    descriptionKey: "ideaFormationDesc",
    color: "purple-600",
    icon: "Lightbulb",
    specNumber: 3,
  },
  paragraphComponents: {
    type: "paragraphComponents",
    translationKey: "paragraphComponents",
    descriptionKey: "paragraphComponentsDesc",
    color: "amber-500",
    icon: "PenLine",
    specNumber: 2,
  },
  finalPaper: {
    type: "finalPaper",
    translationKey: "finalPaper",
    descriptionKey: "finalPaperDesc",
    color: "green-600",
    icon: "FileText",
    specNumber: 1,
  },
};

// =============================================================================
// AUTOFILL STATE
// =============================================================================

export interface AutofillState {
  /** Timestamp of last autofill operation */
  lastAutofillTimestamp: number | null;
  /** Hash of source data at last autofill (for change detection) */
  lastAutofillSourceHash: string | null;
  /** Whether autofill is currently in progress */
  isAutofilling: boolean;
  /** Seconds remaining in cooldown period */
  cooldownRemaining: number;
}

/** Cooldown duration in seconds between autofill operations */
export const AUTOFILL_COOLDOWN_SECONDS = 3;

/** Debounce duration in milliseconds for rapid clicks */
export const AUTOFILL_DEBOUNCE_MS = 100;

// =============================================================================
// STORAGE VERSION
// =============================================================================

/** Current storage version - increment when breaking changes occur */
export const STORAGE_VERSION = 2;
