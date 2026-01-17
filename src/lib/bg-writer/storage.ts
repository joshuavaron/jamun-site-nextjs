/**
 * Position Paper Writer Storage Utilities
 *
 * LocalStorage persistence for drafts.
 * Version 2 - Complete rewrite with clean break from v1 drafts.
 */

import type { BGWriterDraft, DraftSummary, ClassifiedBookmark } from "./types";
import { STORAGE_VERSION } from "./types";
import { ALL_QUESTIONS } from "./questions";

const STORAGE_KEYS = {
  CURRENT_DRAFT_ID: "bg-writer:current-draft",
  DRAFTS_INDEX: "bg-writer:drafts-v2",
  DRAFT_PREFIX: "bg-writer:draft-v2:",
  // Old v1 keys (for cleanup)
  OLD_DRAFTS_INDEX: "bg-writer:drafts",
  OLD_DRAFT_PREFIX: "bg-writer:draft:",
} as const;

function getDraftKey(id: string): string {
  return `${STORAGE_KEYS.DRAFT_PREFIX}${id}`;
}

/**
 * Generate a unique draft ID
 */
export function generateDraftId(): string {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Create an empty draft with v2 structure
 */
export function createEmptyDraft(): BGWriterDraft {
  const now = new Date().toISOString();
  return {
    id: generateDraftId(),
    version: 2,
    createdAt: now,
    updatedAt: now,
    country: "",
    committee: "",
    topic: "",
    layers: {
      comprehension: {},
      ideaFormation: {},
      paragraphComponents: {},
      finalPaper: "",
    },
    importedBookmarks: [],
    classifiedBookmarks: [],
  };
}

// =============================================================================
// V1 DETECTION AND CLEANUP (Clean break)
// =============================================================================

/**
 * Check if there are old v1 drafts in storage
 */
export function hasOldDrafts(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const oldIndex = localStorage.getItem(STORAGE_KEYS.OLD_DRAFTS_INDEX);
    if (oldIndex) {
      const ids = JSON.parse(oldIndex);
      return Array.isArray(ids) && ids.length > 0;
    }
  } catch {
    // Ignore errors
  }
  return false;
}

/**
 * Clear all v1 drafts from storage
 * Returns count of deleted drafts
 */
export function clearOldDrafts(): number {
  if (typeof window === "undefined") return 0;
  let count = 0;
  try {
    // Get old draft IDs
    const oldIndex = localStorage.getItem(STORAGE_KEYS.OLD_DRAFTS_INDEX);
    if (oldIndex) {
      const ids = JSON.parse(oldIndex);
      if (Array.isArray(ids)) {
        // Delete each old draft
        for (const id of ids) {
          localStorage.removeItem(`${STORAGE_KEYS.OLD_DRAFT_PREFIX}${id}`);
          count++;
        }
      }
      // Delete old index
      localStorage.removeItem(STORAGE_KEYS.OLD_DRAFTS_INDEX);
    }
    // Clear old current draft reference
    const oldCurrent = localStorage.getItem("bg-writer:current-draft");
    if (oldCurrent && !oldCurrent.startsWith("draft-v2-")) {
      localStorage.removeItem("bg-writer:current-draft");
    }
  } catch {
    // Ignore errors
  }
  return count;
}

/**
 * Initialize storage - check for old drafts and handle clean break
 * Should be called on app startup
 */
export function initializeStorage(): { hadOldDrafts: boolean; clearedCount: number } {
  const hadOldDrafts = hasOldDrafts();
  let clearedCount = 0;

  if (hadOldDrafts) {
    clearedCount = clearOldDrafts();
    console.log(`[Storage] Cleared ${clearedCount} old v1 drafts for clean v2 migration`);
  }

  return { hadOldDrafts, clearedCount };
}

// =============================================================================
// DRAFT INDEX MANAGEMENT
// =============================================================================

/**
 * Get all draft IDs from index
 */
export function getDraftIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DRAFTS_INDEX);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore localStorage errors
  }
  return [];
}

/**
 * Save draft IDs index
 */
function saveDraftIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFTS_INDEX, JSON.stringify(ids));
  } catch {
    // Ignore localStorage errors
  }
}

// =============================================================================
// DRAFT CRUD OPERATIONS
// =============================================================================

/**
 * Load a draft by ID
 */
export function loadDraft(id: string): BGWriterDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(getDraftKey(id));
    if (stored) {
      const draft = JSON.parse(stored) as BGWriterDraft;
      // Ensure v2 structure
      if (!draft.version || draft.version !== 2) {
        console.warn(`[Storage] Found draft with incompatible version, ignoring`);
        return null;
      }
      return draft;
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

/**
 * Save a draft
 */
export function saveDraft(draft: BGWriterDraft): void {
  if (typeof window === "undefined") return;
  try {
    // Ensure version is set
    draft.version = 2;

    // Update timestamp
    draft.updatedAt = new Date().toISOString();

    // Save draft data
    localStorage.setItem(getDraftKey(draft.id), JSON.stringify(draft));

    // Update index if new draft
    const ids = getDraftIds();
    if (!ids.includes(draft.id)) {
      ids.unshift(draft.id);
      saveDraftIds(ids);
    }
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Delete a draft
 */
export function deleteDraft(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getDraftKey(id));
    const ids = getDraftIds().filter((draftId) => draftId !== id);
    saveDraftIds(ids);

    // Clear current if deleted
    if (getCurrentDraftId() === id) {
      setCurrentDraftId(null);
    }
  } catch {
    // Ignore localStorage errors
  }
}

// =============================================================================
// CURRENT DRAFT TRACKING
// =============================================================================

/**
 * Get current draft ID
 */
export function getCurrentDraftId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT_ID);
  } catch {
    return null;
  }
}

/**
 * Set current draft ID
 */
export function setCurrentDraftId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_DRAFT_ID);
    }
  } catch {
    // Ignore localStorage errors
  }
}

// =============================================================================
// COMPLETION CALCULATION
// =============================================================================

/**
 * Calculate completion percentage for a draft
 */
export function calculateCompletion(draft: BGWriterDraft): number {
  let answered = 0;
  let total = 0;

  // Count comprehension questions
  const comprehensionQuestions = ALL_QUESTIONS.filter(
    (q) => q.layer === "comprehension"
  );
  total += comprehensionQuestions.length;
  answered += comprehensionQuestions.filter(
    (q) => draft.layers.comprehension[q.id]?.trim()
  ).length;

  // Count ideaFormation questions
  const ideaFormationQuestions = ALL_QUESTIONS.filter(
    (q) => q.layer === "ideaFormation"
  );
  total += ideaFormationQuestions.length;
  answered += ideaFormationQuestions.filter(
    (q) => draft.layers.ideaFormation[q.id]?.trim()
  ).length;

  // Count paragraphComponents questions
  const paragraphComponentsQuestions = ALL_QUESTIONS.filter(
    (q) => q.layer === "paragraphComponents"
  );
  total += paragraphComponentsQuestions.length;
  answered += paragraphComponentsQuestions.filter(
    (q) => draft.layers.paragraphComponents[q.id]?.trim()
  ).length;

  // Count final paper
  total += 1;
  if (draft.layers.finalPaper?.trim()) {
    answered += 1;
  }

  return total > 0 ? Math.round((answered / total) * 100) : 0;
}

// =============================================================================
// DRAFT SUMMARIES
// =============================================================================

/**
 * Get all drafts as summaries
 */
export function getAllDraftSummaries(): DraftSummary[] {
  const ids = getDraftIds();
  const summaries: DraftSummary[] = [];

  for (const id of ids) {
    const draft = loadDraft(id);
    if (draft) {
      summaries.push({
        id: draft.id,
        country: draft.country || "Untitled",
        committee: draft.committee || "",
        topic: draft.topic || "",
        updatedAt: draft.updatedAt,
        completionPercentage: calculateCompletion(draft),
      });
    }
  }

  return summaries;
}

// =============================================================================
// EXPORT / IMPORT
// =============================================================================

/**
 * Export draft to JSON string
 */
export function exportDraftToJSON(draft: BGWriterDraft): string {
  const exportData = {
    version: STORAGE_VERSION,
    format: "position-paper-writer",
    exportedAt: new Date().toISOString(),
    data: draft,
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Import draft from JSON string
 * Only accepts v2 format
 */
export function importDraftFromJSON(json: string): BGWriterDraft | null {
  try {
    const parsed = JSON.parse(json);

    // Check for v2 versioned export format
    if (parsed.version === 2 && parsed.format === "position-paper-writer" && parsed.data) {
      const draft = parsed.data as BGWriterDraft;
      // Generate new ID to avoid conflicts
      draft.id = generateDraftId();
      draft.createdAt = new Date().toISOString();
      draft.updatedAt = new Date().toISOString();
      draft.version = 2;

      // Ensure all v2 fields exist
      if (!draft.layers.ideaFormation) draft.layers.ideaFormation = {};
      if (!draft.layers.paragraphComponents) draft.layers.paragraphComponents = {};
      if (!draft.classifiedBookmarks) draft.classifiedBookmarks = [];

      return draft;
    }

    // Reject old v1 imports
    if (parsed.version === "1.0" || parsed.version === 1) {
      console.warn("[Storage] Cannot import v1 draft format - incompatible structure");
      return null;
    }

    // Try direct v2 draft format (no wrapper)
    if (parsed.id && parsed.layers && parsed.version === 2) {
      const draft = parsed as BGWriterDraft;
      draft.id = generateDraftId();
      return draft;
    }

    console.warn("[Storage] Unknown import format");
  } catch (e) {
    console.error("[Storage] Invalid JSON during import:", e);
  }
  return null;
}

// =============================================================================
// BOOKMARK HELPERS
// =============================================================================

/**
 * Get all classified bookmarks from a draft
 */
export function getClassifiedBookmarks(draft: BGWriterDraft): ClassifiedBookmark[] {
  return draft.classifiedBookmarks || [];
}

/**
 * Add classified bookmarks to a draft
 */
export function addClassifiedBookmarks(
  draft: BGWriterDraft,
  bookmarks: ClassifiedBookmark[]
): BGWriterDraft {
  return {
    ...draft,
    classifiedBookmarks: [...(draft.classifiedBookmarks || []), ...bookmarks],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Remove a classified bookmark from a draft
 */
export function removeClassifiedBookmark(
  draft: BGWriterDraft,
  bookmarkId: string
): BGWriterDraft {
  return {
    ...draft,
    classifiedBookmarks: (draft.classifiedBookmarks || []).filter(
      (b) => b.id !== bookmarkId
    ),
    updatedAt: new Date().toISOString(),
  };
}
