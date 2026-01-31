/**
 * BGWriter Types - TypeScript interfaces for the BGWriter context
 *
 * Extracted from BGWriterContext.tsx for modularity.
 */

import type { ReactNode } from "react";
import type {
  BGWriterDraft,
  LayerType,
  BookmarkSource,
  DraftSummary,
  AutofillState,
  ClassifiedBookmark,
  BookmarkCategory,
} from "@/lib/bg-writer/types";
import type { AutofillResult } from "@/lib/bg-writer/autofill";
import type {
  SummarizeBookmarksResult,
  CheckIdeaResult,
  DraftConclusionResult,
} from "@/lib/bg-writer/ai-polish";

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface BGWriterContextValue {
  // Current draft state
  draft: BGWriterDraft | null;
  isDirty: boolean;
  isSaving: boolean;

  // Layer navigation (v2: 4 layers)
  currentLayer: LayerType;
  setCurrentLayer: (layer: LayerType) => void;

  // Draft operations
  createNewDraft: () => void;
  loadDraftById: (id: string) => void;
  deleteDraftById: (id: string) => void;
  saveDraft: () => void;

  // Data operations
  updateAnswer: (layer: LayerType, questionId: string, value: string) => void;
  updateFinalPaper: (content: string) => void;
  getAnswer: (layer: LayerType, questionId: string) => string;
  getAutoPopulatedValue: (questionId: string) => string | null;

  // Core info shortcuts
  updateCountry: (value: string) => void;
  updateCommittee: (value: string) => void;
  updateTopic: (value: string) => void;

  // Bookmark integration (v1 - raw bookmarks)
  importedBookmarks: BookmarkSource[];
  addBookmarkSource: (source: BookmarkSource) => void;
  removeBookmarkSource: (pathname: string) => void;

  // Classified bookmarks (v2 - with categories)
  classifiedBookmarks: ClassifiedBookmark[];
  addClassifiedBookmark: (bookmark: Omit<ClassifiedBookmark, "id" | "classifiedAt" | "classifiedBy">) => Promise<ClassifiedBookmark>;
  removeClassifiedBookmarkById: (id: string) => void;
  getBookmarksByCategory: (categories: BookmarkCategory[]) => ClassifiedBookmark[];
  importAndClassifyBookmarks: (bookmarks: Array<{ content: string; sourceTitle?: string; sourcePathname?: string }>) => Promise<ClassifiedBookmark[]>;

  // Drafts list
  allDrafts: DraftSummary[];
  refreshDraftsList: () => void;

  // Export/Import
  exportToJSON: () => string;
  importFromJSON: (json: string) => boolean;

  // Autofill (v1 compatibility)
  autofillState: AutofillState;
  canAutofill: () => { allowed: boolean; reason?: string };
  triggerAutofill: () => Promise<AutofillResult | null>;
  aiFilledFields: Set<string>;

  // AI Modes (v2)
  // Mode 2: Summarize bookmarks
  summarizeSelectedBookmarks: (bookmarkIds: string[]) => Promise<SummarizeBookmarksResult>;
  // Mode 3: Check idea against research
  checkIdeaAgainstResearch: (idea: string) => Promise<CheckIdeaResult>;
  // Mode 4: Draft conclusion
  generateConclusionDraft: () => Promise<DraftConclusionResult>;

  // AI loading states
  aiLoading: {
    summarizing: boolean;
    checkingIdea: boolean;
    draftingConclusion: boolean;
  };

  // Migration info
  migrationInfo: { hadOldDrafts: boolean; clearedCount: number } | null;
}

export interface BGWriterProviderProps {
  children: ReactNode;
}
