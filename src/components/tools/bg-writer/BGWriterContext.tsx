"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  BGWriterDraft,
  LayerType,
  BookmarkSource,
  DraftSummary,
} from "@/lib/bg-writer/types";
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
} from "@/lib/bg-writer/storage";
import {
  getQuestionById,
  getEffectiveValueRecursive,
  applyTransform,
  combineSentences,
  combineSolutions,
} from "@/lib/bg-writer/questions";

interface BGWriterContextValue {
  // Current draft state
  draft: BGWriterDraft | null;
  isDirty: boolean;
  isSaving: boolean;

  // Layer navigation
  currentLayer: LayerType;
  setCurrentLayer: (layer: LayerType) => void;

  // Draft operations
  createNewDraft: () => void;
  loadDraftById: (id: string) => void;
  deleteDraftById: (id: string) => void;
  saveDraft: () => void;

  // Data operations
  updateAnswer: (layer: LayerType, questionId: string, value: string) => void;
  updateFinalDraft: (content: string) => void;
  getAnswer: (layer: LayerType, questionId: string) => string;
  getAutoPopulatedValue: (questionId: string) => string | null;

  // Core info shortcuts
  updateCountry: (value: string) => void;
  updateCommittee: (value: string) => void;
  updateTopic: (value: string) => void;

  // Bookmark integration
  importedBookmarks: BookmarkSource[];
  addBookmarkSource: (source: BookmarkSource) => void;
  removeBookmarkSource: (pathname: string) => void;

  // Drafts list
  allDrafts: DraftSummary[];
  refreshDraftsList: () => void;

  // Export/Import
  exportToJSON: () => string;
  importFromJSON: (json: string) => boolean;
}

const BGWriterContext = createContext<BGWriterContextValue | null>(null);

export function useBGWriter() {
  const context = useContext(BGWriterContext);
  if (!context) {
    throw new Error("useBGWriter must be used within BGWriterProvider");
  }
  return context;
}

interface BGWriterProviderProps {
  children: ReactNode;
}

export function BGWriterProvider({ children }: BGWriterProviderProps) {
  const [draft, setDraft] = useState<BGWriterDraft | null>(null);
  const [currentLayer, setCurrentLayer] = useState<LayerType>("comprehension");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [allDrafts, setAllDrafts] = useState<DraftSummary[]>([]);

  const refreshDraftsList = useCallback(() => {
    setAllDrafts(getAllDraftSummaries());
  }, []);

  // Load initial draft on mount
  useEffect(() => {
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

  const updateAnswer = useCallback(
    (layer: LayerType, questionId: string, value: string) => {
      setDraft((prev) => {
        if (!prev) return prev;

        if (layer === "finalDraft") {
          return { ...prev, layers: { ...prev.layers, finalDraft: value } };
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

  const updateFinalDraft = useCallback((content: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, layers: { ...prev.layers, finalDraft: content } };
    });
    setIsDirty(true);
  }, []);

  const getAnswer = useCallback(
    (layer: LayerType, questionId: string): string => {
      if (!draft) return "";
      if (layer === "finalDraft") return draft.layers.finalDraft;
      return draft.layers[layer][questionId] || "";
    },
    [draft]
  );

  const getAutoPopulatedValue = useCallback(
    (questionId: string): string | null => {
      if (!draft) return null;

      const question = getQuestionById(questionId);
      if (!question?.autoPopulateFrom) return null;

      // Create an accessor that provides access to the draft data
      const accessor = {
        getDirectValue: (qId: string) => {
          const q = getQuestionById(qId);
          if (!q) return "";
          const layer = q.layer;
          if (layer === "finalDraft") return draft.layers.finalDraft;
          return draft.layers[layer][qId] || "";
        },
        country: draft.country || "Our delegation",
      };

      // Use the recursive function to follow the full auto-populate chain
      // But start from the SOURCE question, not the current one
      // (because we want to show what THIS field would be populated with)
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
          return combineSolutions(sourceValues, accessor.country);
        }
        return sourceValues.filter(Boolean).join(" ");
      }

      const sourceValue = getEffectiveValueRecursive(sourceId, accessor);
      if (!sourceValue) return null;

      // Apply the transform for this specific question
      return applyTransform(sourceValue, transform);
    },
    [draft]
  );

  const updateCountry = useCallback(
    (value: string) => {
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
    },
    []
  );

  const updateCommittee = useCallback(
    (value: string) => {
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
    },
    []
  );

  const updateTopic = useCallback(
    (value: string) => {
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
    },
    []
  );

  const addBookmarkSource = useCallback((source: BookmarkSource) => {
    setDraft((prev) => {
      if (!prev) return prev;
      // Don't add duplicates
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

  const value: BGWriterContextValue = {
    draft,
    isDirty,
    isSaving,
    currentLayer,
    setCurrentLayer,
    createNewDraft,
    loadDraftById,
    deleteDraftById,
    saveDraft,
    updateAnswer,
    updateFinalDraft,
    getAnswer,
    getAutoPopulatedValue,
    updateCountry,
    updateCommittee,
    updateTopic,
    importedBookmarks: draft?.importedBookmarks || [],
    addBookmarkSource,
    removeBookmarkSource,
    allDrafts,
    refreshDraftsList,
    exportToJSON,
    importFromJSON,
  };

  return (
    <BGWriterContext.Provider value={value}>
      {children}
    </BGWriterContext.Provider>
  );
}
