"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Plus,
  FileText,
  Trash2,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useBGWriter } from "./BGWriterContext";

export function DraftsSidebar() {
  const t = useTranslations("BGWriter");
  const {
    draft,
    allDrafts,
    createNewDraft,
    loadDraftById,
    deleteDraftById,
  } = useBGWriter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteDraftById(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      // Reset after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <h3 className="font-semibold text-gray-900">{t("drafts.title")}</h3>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-4 py-3">
              {/* New Draft Button */}
              <Button
                onClick={createNewDraft}
                variant="outline"
                size="sm"
                className="mb-3 w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                {t("newDraft")}
              </Button>

              {/* Drafts List */}
              <div className="space-y-2">
                {allDrafts.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-500">
                    {t("drafts.noDrafts")}
                    <br />
                    <span className="text-xs">{t("drafts.startNew")}</span>
                  </p>
                ) : (
                  allDrafts.map((draftSummary) => (
                    <div
                      key={draftSummary.id}
                      className={cn(
                        "group relative rounded-lg border p-3 transition-colors",
                        draft?.id === draftSummary.id
                          ? "border-jamun-blue bg-jamun-blue/5"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <button
                        onClick={() => loadDraftById(draftSummary.id)}
                        className="block w-full text-left"
                      >
                        <div className="flex items-start gap-2">
                          <FileText
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0",
                              draft?.id === draftSummary.id
                                ? "text-jamun-blue"
                                : "text-gray-400"
                            )}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-gray-900">
                              {draftSummary.country || t("untitled")}
                            </p>
                            {draftSummary.committee && (
                              <p className="truncate text-xs text-gray-500">
                                {draftSummary.committee}
                              </p>
                            )}
                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(draftSummary.updatedAt)}</span>
                              <span className="rounded-full bg-gray-100 px-1.5 py-0.5">
                                {draftSummary.completionPercentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(draftSummary.id);
                        }}
                        className={cn(
                          "absolute right-2 top-2 rounded p-1 transition-colors",
                          deleteConfirm === draftSummary.id
                            ? "bg-red-100 text-red-600"
                            : "text-gray-400 opacity-0 hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
                        )}
                        title={
                          deleteConfirm === draftSummary.id
                            ? t("confirmDelete")
                            : t("deleteDraft")
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
