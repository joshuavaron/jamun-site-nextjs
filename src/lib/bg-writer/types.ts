/**
 * Background Guide Writer Types
 *
 * TypeScript interfaces for the position paper writing tool.
 */

export type LayerType =
  | "comprehension"
  | "initialContent"
  | "research"
  | "finalDraft";

export const LAYER_ORDER: LayerType[] = [
  "comprehension",
  "initialContent",
  "research",
  "finalDraft",
];

export interface BGWriterDraft {
  id: string;
  createdAt: string;
  updatedAt: string;
  country: string;
  committee: string;
  topic: string;
  layers: {
    comprehension: Record<string, string>;
    initialContent: Record<string, string>;
    research: Record<string, string>;
    finalDraft: string;
  };
  importedBookmarks: BookmarkSource[];
}

export interface BookmarkSection {
  id: string;
  headingText: string;
  content: string;
}

export interface BookmarkSource {
  pathname: string;
  title: string;
  headingIds: string[];
  headingTexts: string[];
  /** Actual content from each bookmarked section */
  sections: BookmarkSection[];
  importedAt: string;
}

export interface DraftSummary {
  id: string;
  country: string;
  committee: string;
  topic: string;
  updatedAt: string;
  completionPercentage: number;
}

export type QuestionInputType = "text" | "textarea" | "bullets";

export type SectionType = "introduction" | "background" | "position" | "solutions" | "conclusion";

export type TransformType = "bullets-to-text" | "text-to-bullets" | "combine-sentences" | "combine-solutions";

export interface QuestionDefinition {
  id: string;
  layer: LayerType;
  translationKey: string;
  helpTextKey?: string;
  inputType: QuestionInputType;
  required?: boolean;
  section?: SectionType;
  autoPopulateFrom?: {
    layer: LayerType;
    questionId: string; // Can be comma-separated for combining multiple fields
    transform?: TransformType;
  };
}

export interface LayerInfo {
  type: LayerType;
  translationKey: string;
  color: string;
  icon: string;
}

/**
 * State for the autofill system
 */
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

export const LAYER_INFO: Record<LayerType, LayerInfo> = {
  comprehension: {
    type: "comprehension",
    translationKey: "comprehension",
    color: "jamun-blue",
    icon: "BookOpen",
  },
  initialContent: {
    type: "initialContent",
    translationKey: "initialContent",
    color: "purple-600",
    icon: "PenLine",
  },
  research: {
    type: "research",
    translationKey: "research",
    color: "amber-500",
    icon: "Search",
  },
  finalDraft: {
    type: "finalDraft",
    translationKey: "finalDraft",
    color: "green-600",
    icon: "FileText",
  },
};
