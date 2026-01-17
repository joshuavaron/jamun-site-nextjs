"use client";

/**
 * BGWriterContext - Position Paper Writer State Management
 *
 * Version 2 - Complete rewrite for PP-Writer.md specification
 *
 * New features:
 * - Classified bookmarks with auto-categorization
 * - 4-layer structure (comprehension → ideaFormation → paragraphComponents → finalPaper)
 * - AI mode triggers (filter, summarize, check idea, draft conclusion)
 * - Clean break from v1 drafts
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type {
  BGWriterDraft,
  LayerType,
  BookmarkSource,
  DraftSummary,
  AutofillState,
  ClassifiedBookmark,
  BookmarkCategory,
} from "@/lib/bg-writer/types";
import {
  AUTOFILL_COOLDOWN_SECONDS,
  AUTOFILL_DEBOUNCE_MS,
} from "@/lib/bg-writer/types";
import {
  computeSourceHash,
  performAutofillWithAI,
  type AutofillResult,
} from "@/lib/bg-writer/autofill";
import {
  createEmptyDraft,
  loadDraft,
  saveDraft as saveDraftToStorage,
  deleteDraft as deleteDraftFromStorage,
  getCurrentDraftId,
  setCurrentDraftId,
  getAllDraftSummaries,
  exportDraftToJSON,
  importDraftFromJSON,
  initializeStorage,
  addClassifiedBookmarks,
  removeClassifiedBookmark,
  getClassifiedBookmarks,
} from "@/lib/bg-writer/storage";
import {
  getQuestionById,
  getEffectiveValueRecursive,
  applyTransform,
  combineSentences,
  combineSolutions,
} from "@/lib/bg-writer/questions";
import {
  classifyBookmark,
  classifyBookmarks,
  filterBookmarksByCategories,
} from "@/lib/bg-writer/bookmark-classifier";
import {
  summarizeBookmarks as aiSummarizeBookmarks,
  checkIdeaAgainstBookmarks as aiCheckIdea,
  draftConclusion as aiDraftConclusion,
  type SummarizeBookmarksResult,
  type CheckIdeaResult,
  type DraftConclusionResult,
  type PaperContext,
} from "@/lib/bg-writer/ai-polish";

// =============================================================================
// CONTEXT TYPES
// =============================================================================

interface BGWriterContextValue {
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

const BGWriterContext = createContext<BGWriterContextValue | null>(null);

export function useBGWriter() {
  const context = useContext(BGWriterContext);
  if (!context) {
    throw new Error("useBGWriter must be used within BGWriterProvider");
  }
  return context;
}

// =============================================================================
// PROVIDER
// =============================================================================

interface BGWriterProviderProps {
  children: ReactNode;
}

export function BGWriterProvider({ children }: BGWriterProviderProps) {
  const [draft, setDraft] = useState<BGWriterDraft | null>(null);
  const [currentLayer, setCurrentLayer] = useState<LayerType>("comprehension");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [allDrafts, setAllDrafts] = useState<DraftSummary[]>([]);
  const [migrationInfo, setMigrationInfo] = useState<{ hadOldDrafts: boolean; clearedCount: number } | null>(null);

  // Autofill state (v1 compatibility)
  const [autofillState, setAutofillState] = useState<AutofillState>({
    lastAutofillTimestamp: null,
    lastAutofillSourceHash: null,
    isAutofilling: false,
    cooldownRemaining: 0,
  });
  const lastAutofillClickRef = useRef<number>(0);

  // Track which fields were filled by AI (for highlight)
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());

  // AI loading states (v2)
  const [aiLoading, setAiLoading] = useState({
    summarizing: false,
    checkingIdea: false,
    draftingConclusion: false,
  });

  const refreshDraftsList = useCallback(() => {
    setAllDrafts(getAllDraftSummaries());
  }, []);

  // Initialize storage and handle v1 → v2 migration
  useEffect(() => {
    // Initialize storage (clears old v1 drafts if any)
    const migrationResult = initializeStorage();
    setMigrationInfo(migrationResult);

    // Load current draft if exists
    const currentId = getCurrentDraftId();
    if (currentId) {
      const loaded = loadDraft(currentId);
      if (loaded) {
        setDraft(loaded);
      }
    }
    refreshDraftsList();
  }, [refreshDraftsList]);

  // Auto-save when dirty
  useEffect(() => {
    if (isDirty && draft) {
      const timer = setTimeout(() => {
        setIsSaving(true);
        saveDraftToStorage(draft);
        setIsDirty(false);
        setIsSaving(false);
        refreshDraftsList();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDirty, draft, refreshDraftsList]);

  // Autofill cooldown timer
  useEffect(() => {
    if (autofillState.cooldownRemaining <= 0) return;

    const timer = setInterval(() => {
      setAutofillState((prev) => ({
        ...prev,
        cooldownRemaining: Math.max(0, prev.cooldownRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [autofillState.cooldownRemaining]);

  // Reset autofill hash when layer changes
  useEffect(() => {
    setAutofillState((prev) => ({
      ...prev,
      lastAutofillSourceHash: null,
    }));
  }, [currentLayer]);

  // =============================================================================
  // DRAFT OPERATIONS
  // =============================================================================

  const saveDraft = useCallback(() => {
    if (draft) {
      setIsSaving(true);
      saveDraftToStorage(draft);
      setIsDirty(false);
      setIsSaving(false);
      refreshDraftsList();
    }
  }, [draft, refreshDraftsList]);

  const createNewDraft = useCallback(() => {
    const newDraft = createEmptyDraft();
    setDraft(newDraft);
    setCurrentDraftId(newDraft.id);
    setCurrentLayer("comprehension");
    saveDraftToStorage(newDraft);
    refreshDraftsList();
  }, [refreshDraftsList]);

  const loadDraftById = useCallback((id: string) => {
    const loaded = loadDraft(id);
    if (loaded) {
      setDraft(loaded);
      setCurrentDraftId(id);
      setCurrentLayer("comprehension");
    }
  }, []);

  const deleteDraftById = useCallback(
    (id: string) => {
      deleteDraftFromStorage(id);
      if (draft?.id === id) {
        setDraft(null);
        setCurrentDraftId(null);
      }
      refreshDraftsList();
    },
    [draft, refreshDraftsList]
  );

  // =============================================================================
  // DATA OPERATIONS
  // =============================================================================

  const updateAnswer = useCallback(
    (layer: LayerType, questionId: string, value: string) => {
      setDraft((prev) => {
        if (!prev) return prev;

        if (layer === "finalPaper") {
          return { ...prev, layers: { ...prev.layers, finalPaper: value } };
        }

        return {
          ...prev,
          layers: {
            ...prev.layers,
            [layer]: { ...prev.layers[layer], [questionId]: value },
          },
        };
      });
      setIsDirty(true);
    },
    []
  );

  const updateFinalPaper = useCallback((content: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, layers: { ...prev.layers, finalPaper: content } };
    });
    setIsDirty(true);
  }, []);

  const getAnswer = useCallback(
    (layer: LayerType, questionId: string): string => {
      if (!draft) return "";
      if (layer === "finalPaper") return draft.layers.finalPaper;
      return draft.layers[layer][questionId] || "";
    },
    [draft]
  );

  const getAutoPopulatedValue = useCallback(
    (questionId: string): string | null => {
      if (!draft) return null;

      const question = getQuestionById(questionId);
      if (!question?.autoPopulateFrom) return null;

      const accessor = (layer: LayerType, qId: string): string => {
        if (layer === "finalPaper") return draft.layers.finalPaper;
        return draft.layers[layer]?.[qId] || "";
      };

      const country = draft.country || "Our delegation";

      const { questionId: sourceId, transform } = question.autoPopulateFrom;

      if (sourceId.includes(",")) {
        const sourceIds = sourceId.split(",").map((id) => id.trim());
        const sourceValues = sourceIds.map((id) =>
          getEffectiveValueRecursive(id, accessor)
        );

        if (!sourceValues.some((v) => v.trim())) return null;

        if (transform === "combine-sentences") {
          return combineSentences(sourceValues);
        }
        if (transform === "combine-solutions") {
          return combineSolutions(sourceValues, country);
        }
        return sourceValues.filter(Boolean).join(" ");
      }

      const sourceValue = getEffectiveValueRecursive(sourceId, accessor);
      if (!sourceValue) return null;

      return applyTransform(sourceValue, transform);
    },
    [draft]
  );

  // =============================================================================
  // CORE INFO UPDATES
  // =============================================================================

  const updateCountry = useCallback((value: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        country: value,
        layers: {
          ...prev.layers,
          comprehension: { ...prev.layers.comprehension, country: value },
        },
      };
    });
    setIsDirty(true);
  }, []);

  const updateCommittee = useCallback((value: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        committee: value,
        layers: {
          ...prev.layers,
          comprehension: { ...prev.layers.comprehension, committee: value },
        },
      };
    });
    setIsDirty(true);
  }, []);

  const updateTopic = useCallback((value: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        topic: value,
        layers: {
          ...prev.layers,
          comprehension: { ...prev.layers.comprehension, topic: value },
        },
      };
    });
    setIsDirty(true);
  }, []);

  // =============================================================================
  // BOOKMARK OPERATIONS (v1 - raw bookmarks)
  // =============================================================================

  const addBookmarkSource = useCallback((source: BookmarkSource) => {
    setDraft((prev) => {
      if (!prev) return prev;
      if (prev.importedBookmarks.some((b) => b.pathname === source.pathname)) {
        return prev;
      }
      return {
        ...prev,
        importedBookmarks: [...prev.importedBookmarks, source],
      };
    });
    setIsDirty(true);
  }, []);

  const removeBookmarkSource = useCallback((pathname: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        importedBookmarks: prev.importedBookmarks.filter(
          (b) => b.pathname !== pathname
        ),
      };
    });
    setIsDirty(true);
  }, []);

  // =============================================================================
  // CLASSIFIED BOOKMARKS (v2 - with categories)
  // =============================================================================

  const addClassifiedBookmarkFn = useCallback(
    async (
      bookmark: Omit<ClassifiedBookmark, "id" | "classifiedAt" | "classifiedBy">
    ): Promise<ClassifiedBookmark> => {
      // If no category provided, classify it
      let category = bookmark.category;
      let classifiedBy: "regex" | "ai" | "manual" = "manual";

      if (!category || category === "other") {
        const result = await classifyBookmark(bookmark.content);
        category = result.category;
        classifiedBy = result.classifiedBy;
      }

      const newBookmark: ClassifiedBookmark = {
        id: `bookmark-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        headingText: bookmark.headingText || "",
        content: bookmark.content,
        category,
        classifiedAt: new Date().toISOString(),
        classifiedBy,
        sourceTitle: bookmark.sourceTitle,
        sourcePathname: bookmark.sourcePathname,
      };

      setDraft((prev) => {
        if (!prev) return prev;
        return addClassifiedBookmarks(prev, [newBookmark]);
      });
      setIsDirty(true);

      return newBookmark;
    },
    []
  );

  const removeClassifiedBookmarkById = useCallback((id: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return removeClassifiedBookmark(prev, id);
    });
    setIsDirty(true);
  }, []);

  const getBookmarksByCategory = useCallback(
    (categories: BookmarkCategory[]): ClassifiedBookmark[] => {
      if (!draft) return [];
      return filterBookmarksByCategories(
        getClassifiedBookmarks(draft),
        categories
      );
    },
    [draft]
  );

  const importAndClassifyBookmarks = useCallback(
    async (
      bookmarks: Array<{ content: string; headingText?: string; sourceTitle?: string; sourcePathname?: string }>
    ): Promise<ClassifiedBookmark[]> => {
      if (!draft) return [];

      // Convert to BookmarkSection format
      const sections = bookmarks.map((b, i) => ({
        id: `bookmark-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 9)}`,
        headingText: b.headingText || "",
        content: b.content,
      }));

      // Classify all bookmarks
      const classifiedResults = await classifyBookmarks(sections);

      // Add source metadata to classified bookmarks
      const newBookmarks: ClassifiedBookmark[] = classifiedResults.map((result, i) => ({
        ...result,
        sourceTitle: bookmarks[i].sourceTitle,
        sourcePathname: bookmarks[i].sourcePathname,
      }));

      setDraft((prev) => {
        if (!prev) return prev;
        return addClassifiedBookmarks(prev, newBookmarks);
      });
      setIsDirty(true);

      return newBookmarks;
    },
    [draft]
  );

  // =============================================================================
  // EXPORT/IMPORT
  // =============================================================================

  const exportToJSON = useCallback((): string => {
    if (!draft) return "{}";
    return exportDraftToJSON(draft);
  }, [draft]);

  const importFromJSON = useCallback(
    (json: string): boolean => {
      const imported = importDraftFromJSON(json);
      if (imported) {
        setDraft(imported);
        setCurrentDraftId(imported.id);
        saveDraftToStorage(imported);
        refreshDraftsList();
        return true;
      }
      return false;
    },
    [refreshDraftsList]
  );

  // =============================================================================
  // AUTOFILL (v1 compatibility)
  // =============================================================================

  const canAutofill = useCallback((): { allowed: boolean; reason?: string } => {
    if (!draft) {
      return { allowed: false, reason: "noDraft" };
    }

    // Can't autofill comprehension layer (it's the source)
    if (currentLayer === "comprehension") {
      return { allowed: false, reason: "comprehensionLayer" };
    }

    // Can't autofill final paper layer (uses template generation)
    if (currentLayer === "finalPaper") {
      return { allowed: false, reason: "finalPaperLayer" };
    }

    if (autofillState.isAutofilling) {
      return { allowed: false, reason: "autofillInProgress" };
    }

    if (autofillState.cooldownRemaining > 0) {
      return { allowed: false, reason: "cooldown" };
    }

    const now = Date.now();
    if (now - lastAutofillClickRef.current < AUTOFILL_DEBOUNCE_MS) {
      return { allowed: false, reason: "debounce" };
    }

    const currentHash = computeSourceHash(currentLayer, draft);
    if (currentHash === autofillState.lastAutofillSourceHash) {
      return { allowed: false, reason: "noChanges" };
    }

    return { allowed: true };
  }, [draft, currentLayer, autofillState]);

  const triggerAutofill = useCallback(async (): Promise<AutofillResult | null> => {
    const canResult = canAutofill();
    if (!canResult.allowed) {
      return null;
    }

    if (!draft) return null;

    lastAutofillClickRef.current = Date.now();
    setAutofillState((prev) => ({ ...prev, isAutofilling: true }));

    try {
      const result = await performAutofillWithAI(currentLayer, draft, updateAnswer, {
        useAI: true,
        paperContext: {
          country: draft.country || "",
          committee: draft.committee || "",
          topic: draft.topic || "",
        },
      });

      if (result.updatedFields.length > 0) {
        setAiFilledFields((prev) => {
          const next = new Set(prev);
          for (const fieldId of result.updatedFields) {
            next.add(fieldId);
          }
          return next;
        });
      }

      const newHash = computeSourceHash(currentLayer, draft);
      setAutofillState({
        lastAutofillTimestamp: Date.now(),
        lastAutofillSourceHash: newHash,
        isAutofilling: false,
        cooldownRemaining: AUTOFILL_COOLDOWN_SECONDS,
      });

      return result;
    } catch (error) {
      setAutofillState((prev) => ({ ...prev, isAutofilling: false }));
      throw error;
    }
  }, [canAutofill, draft, currentLayer, updateAnswer]);

  // =============================================================================
  // AI MODES (v2)
  // =============================================================================

  const getPaperContext = useCallback((): PaperContext => ({
    country: draft?.country || "",
    committee: draft?.committee || "",
    topic: draft?.topic || "",
  }), [draft]);

  // Mode 2: Summarize selected bookmarks
  const summarizeSelectedBookmarks = useCallback(
    async (bookmarkIds: string[]): Promise<SummarizeBookmarksResult> => {
      if (!draft) {
        return { success: false, summary: "", error: "No draft loaded" };
      }

      const selectedBookmarks = getClassifiedBookmarks(draft).filter((b) =>
        bookmarkIds.includes(b.id)
      );

      if (selectedBookmarks.length < 2) {
        return {
          success: false,
          summary: "",
          error: "Need at least 2 bookmarks to summarize",
        };
      }

      setAiLoading((prev) => ({ ...prev, summarizing: true }));

      try {
        const result = await aiSummarizeBookmarks(
          selectedBookmarks,
          getPaperContext()
        );
        return result;
      } finally {
        setAiLoading((prev) => ({ ...prev, summarizing: false }));
      }
    },
    [draft, getPaperContext]
  );

  // Mode 3: Check idea against research
  const checkIdeaAgainstResearch = useCallback(
    async (idea: string): Promise<CheckIdeaResult> => {
      if (!draft) {
        return {
          success: false,
          matchingBookmarks: [],
          suggestions: "",
          error: "No draft loaded",
        };
      }

      const allBookmarks = getClassifiedBookmarks(draft);

      if (allBookmarks.length === 0) {
        return {
          success: false,
          matchingBookmarks: [],
          suggestions: "Try bookmarking some research from the background guide first!",
          error: "No bookmarks to check against",
        };
      }

      setAiLoading((prev) => ({ ...prev, checkingIdea: true }));

      try {
        const result = await aiCheckIdea(idea, allBookmarks);
        return result;
      } finally {
        setAiLoading((prev) => ({ ...prev, checkingIdea: false }));
      }
    },
    [draft]
  );

  // Mode 4: Generate conclusion draft
  const generateConclusionDraft = useCallback(async (): Promise<DraftConclusionResult> => {
    if (!draft) {
      return { success: false, draft: "", error: "No draft loaded" };
    }

    // Gather content from Layer 2 sections
    const backgroundFacts = [
      draft.layers.paragraphComponents.keyFact1,
      draft.layers.paragraphComponents.keyFact2,
      draft.layers.paragraphComponents.analysis1,
      draft.layers.paragraphComponents.analysis2,
    ]
      .filter(Boolean)
      .join(" ");

    const positionStatement = [
      draft.layers.paragraphComponents.positionStatement,
      draft.layers.paragraphComponents.posEvidence,
      draft.layers.paragraphComponents.reasoning,
    ]
      .filter(Boolean)
      .join(" ");

    const solutionProposal = [
      draft.layers.paragraphComponents.solutionProposal,
      draft.layers.paragraphComponents.solEvidence,
      draft.layers.paragraphComponents.alternateSolution,
    ]
      .filter(Boolean)
      .join(" ");

    setAiLoading((prev) => ({ ...prev, draftingConclusion: true }));

    try {
      const result = await aiDraftConclusion(
        { backgroundFacts, positionStatement, solutionProposal },
        getPaperContext()
      );
      return result;
    } finally {
      setAiLoading((prev) => ({ ...prev, draftingConclusion: false }));
    }
  }, [draft, getPaperContext]);

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const value: BGWriterContextValue = {
    // Draft state
    draft,
    isDirty,
    isSaving,

    // Layer navigation
    currentLayer,
    setCurrentLayer,

    // Draft operations
    createNewDraft,
    loadDraftById,
    deleteDraftById,
    saveDraft,

    // Data operations
    updateAnswer,
    updateFinalPaper,
    getAnswer,
    getAutoPopulatedValue,

    // Core info
    updateCountry,
    updateCommittee,
    updateTopic,

    // Bookmarks (v1)
    importedBookmarks: draft?.importedBookmarks || [],
    addBookmarkSource,
    removeBookmarkSource,

    // Classified bookmarks (v2)
    classifiedBookmarks: draft ? getClassifiedBookmarks(draft) : [],
    addClassifiedBookmark: addClassifiedBookmarkFn,
    removeClassifiedBookmarkById,
    getBookmarksByCategory,
    importAndClassifyBookmarks,

    // Drafts list
    allDrafts,
    refreshDraftsList,

    // Export/Import
    exportToJSON,
    importFromJSON,

    // Autofill (v1)
    autofillState,
    canAutofill,
    triggerAutofill,
    aiFilledFields,

    // AI Modes (v2)
    summarizeSelectedBookmarks,
    checkIdeaAgainstResearch,
    generateConclusionDraft,
    aiLoading,

    // Migration info
    migrationInfo,
  };

  return (
    <BGWriterContext.Provider value={value}>
      {children}
    </BGWriterContext.Provider>
  );
}
