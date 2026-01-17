/**
 * Background Guide Writer Storage Utilities
 *
 * LocalStorage persistence for drafts.
 * Pattern follows subpoint-storage.ts conventions.
 */

import type { BGWriterDraft, DraftSummary } from "./types";
import { QUESTIONS } from "./questions";

const STORAGE_KEYS = {
  CURRENT_DRAFT_ID: "bg-writer:current-draft",
  DRAFTS_INDEX: "bg-writer:drafts",
  DRAFT_PREFIX: "bg-writer:draft:",
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
 * Create an empty draft
 */
export function createEmptyDraft(): BGWriterDraft {
  const now = new Date().toISOString();
  return {
    id: generateDraftId(),
    createdAt: now,
    updatedAt: now,
    country: "",
    committee: "",
    topic: "",
    layers: {
      comprehension: {},
      initialContent: {},
      research: {},
      finalDraft: "",
    },
    importedBookmarks: [],
  };
}

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

/**
 * Load a draft by ID
 */
export function loadDraft(id: string): BGWriterDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(getDraftKey(id));
    if (stored) {
      return JSON.parse(stored);
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

/**
 * Calculate completion percentage for a draft
 */
export function calculateCompletion(draft: BGWriterDraft): number {
  let answered = 0;
  let total = 0;

  // Count comprehension questions
  const comprehensionQuestions = QUESTIONS.filter(
    (q) => q.layer === "comprehension"
  );
  total += comprehensionQuestions.length;
  answered += comprehensionQuestions.filter(
    (q) => draft.layers.comprehension[q.id]?.trim()
  ).length;

  // Count initialContent questions
  const initialContentQuestions = QUESTIONS.filter(
    (q) => q.layer === "initialContent"
  );
  total += initialContentQuestions.length;
  answered += initialContentQuestions.filter(
    (q) => draft.layers.initialContent[q.id]?.trim()
  ).length;

  // Count research questions
  const researchQuestions = QUESTIONS.filter((q) => q.layer === "research");
  total += researchQuestions.length;
  answered += researchQuestions.filter(
    (q) => draft.layers.research[q.id]?.trim()
  ).length;

  // Count final draft
  total += 1;
  if (draft.layers.finalDraft?.trim()) {
    answered += 1;
  }

  return total > 0 ? Math.round((answered / total) * 100) : 0;
}

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

/**
 * Export draft to JSON string
 */
export function exportDraftToJSON(draft: BGWriterDraft): string {
  const exportData = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    data: draft,
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Import draft from JSON string
 */
export function importDraftFromJSON(json: string): BGWriterDraft | null {
  try {
    const parsed = JSON.parse(json);
    if (parsed.version && parsed.data) {
      // Versioned export format
      const draft = parsed.data as BGWriterDraft;
      // Generate new ID to avoid conflicts
      draft.id = generateDraftId();
      draft.createdAt = new Date().toISOString();
      draft.updatedAt = new Date().toISOString();
      return draft;
    }
    // Try direct draft format
    if (parsed.id && parsed.layers) {
      const draft = parsed as BGWriterDraft;
      draft.id = generateDraftId();
      return draft;
    }
  } catch {
    // Invalid JSON
  }
  return null;
}
