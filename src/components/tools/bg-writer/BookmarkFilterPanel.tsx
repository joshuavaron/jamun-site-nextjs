"use client";

/**
 * BookmarkFilterPanel - Display and select bookmarks by category
 *
 * Used in Layer 3 (Idea Formation) to show relevant bookmarks for each question.
 * Per PP-Writer.md: Mode 1 - "Instantly filter bookmarks by layer 4 category"
 *
 * Features:
 * - Shows bookmarks filtered by relevant L4 categories
 * - Checkbox selection for combining bookmarks
 * - "Help me combine these" button triggers Mode 2 AI
 * - Category tags with colors
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useBGWriter } from "./BGWriterContext";
import type { BookmarkCategory, ClassifiedBookmark } from "@/lib/bg-writer/types";
import { BOOKMARK_CATEGORY_LABELS } from "@/lib/bg-writer/types";

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, string> = {
  // Topic Fundamentals - Blue
  topic_definition: "bg-blue-100 text-blue-800 border-blue-200",
  key_terms: "bg-blue-100 text-blue-800 border-blue-200",
  scope: "bg-blue-100 text-blue-800 border-blue-200",

  // Historical Context - Purple
  origin: "bg-purple-100 text-purple-800 border-purple-200",
  timeline: "bg-purple-100 text-purple-800 border-purple-200",
  evolution: "bg-purple-100 text-purple-800 border-purple-200",

  // Current Situation - Green
  present_state: "bg-green-100 text-green-800 border-green-200",
  key_statistics: "bg-green-100 text-green-800 border-green-200",
  recent_developments: "bg-green-100 text-green-800 border-green-200",

  // Stakeholders - Orange
  affected_populations: "bg-orange-100 text-orange-800 border-orange-200",
  key_actors: "bg-orange-100 text-orange-800 border-orange-200",
  power_dynamics: "bg-orange-100 text-orange-800 border-orange-200",

  // Existing Efforts - Teal
  un_actions: "bg-teal-100 text-teal-800 border-teal-200",
  regional_efforts: "bg-teal-100 text-teal-800 border-teal-200",
  success_stories: "bg-teal-100 text-teal-800 border-teal-200",
  failures: "bg-teal-100 text-teal-800 border-teal-200",

  // Points of Contention - Red
  major_debates: "bg-red-100 text-red-800 border-red-200",
  competing_interests: "bg-red-100 text-red-800 border-red-200",
  barriers: "bg-red-100 text-red-800 border-red-200",

  // Country-Specific - Amber
  country_involvement: "bg-amber-100 text-amber-800 border-amber-200",
  past_positions: "bg-amber-100 text-amber-800 border-amber-200",
  country_interests: "bg-amber-100 text-amber-800 border-amber-200",
  allies: "bg-amber-100 text-amber-800 border-amber-200",
  constraints: "bg-amber-100 text-amber-800 border-amber-200",

  // Other - Gray
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

interface BookmarkFilterPanelProps {
  /** Categories to filter bookmarks by */
  relevantCategories: BookmarkCategory[];
  /** Callback when bookmarks are selected */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Callback when "Help me combine" is clicked */
  onCombineRequest?: (selectedBookmarks: ClassifiedBookmark[]) => void;
  /** Whether the combine button is loading */
  isCombining?: boolean;
  /** Summary result from AI */
  combineSummary?: string;
  /** Maximum height before scrolling */
  maxHeight?: string;
  /** Show empty state message */
  emptyMessage?: string;
}

export function BookmarkFilterPanel({
  relevantCategories,
  onSelectionChange,
  onCombineRequest,
  isCombining = false,
  combineSummary,
  maxHeight = "300px",
  emptyMessage,
}: BookmarkFilterPanelProps) {
  const t = useTranslations("BGWriter");
  const { getBookmarksByCategory, classifiedBookmarks } = useBGWriter();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(true);

  // Get filtered bookmarks
  const filteredBookmarks = getBookmarksByCategory(relevantCategories);

  const toggleBookmark = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        onSelectionChange?.(Array.from(next));
        return next;
      });
    },
    [onSelectionChange]
  );

  const selectAll = useCallback(() => {
    const allIds = new Set(filteredBookmarks.map((b) => b.id));
    setSelectedIds(allIds);
    onSelectionChange?.(Array.from(allIds));
  }, [filteredBookmarks, onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const handleCombine = useCallback(() => {
    const selected = filteredBookmarks.filter((b) => selectedIds.has(b.id));
    onCombineRequest?.(selected);
  }, [filteredBookmarks, selectedIds, onCombineRequest]);

  const selectedCount = selectedIds.size;
  const canCombine = selectedCount >= 1;

  // If no bookmarks at all
  if (classifiedBookmarks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-500">
          {emptyMessage || t("noBookmarksYet")}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {t("importBookmarksHint")}
        </p>
      </div>
    );
  }

  // If no bookmarks match the filter
  if (filteredBookmarks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50 p-4 text-center">
        <p className="text-sm text-amber-700">
          {t("noMatchingBookmarks")}
        </p>
        <p className="mt-1 text-xs text-amber-600">
          {t("categoriesSearched")}: {relevantCategories.map(c => BOOKMARK_CATEGORY_LABELS[c]).join(", ")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {t("relevantBookmarks")}
          </span>
          <span className="rounded-full bg-jamun-blue/10 px-2 py-0.5 text-xs font-medium text-jamun-blue">
            {filteredBookmarks.length}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
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
            {/* Selection controls */}
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
              <div className="flex gap-2 text-xs">
                <button
                  onClick={selectAll}
                  className="text-jamun-blue hover:underline"
                >
                  {t("selectAll")}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={clearSelection}
                  className="text-gray-500 hover:underline"
                >
                  {t("clearSelection")}
                </button>
              </div>
              {selectedCount > 0 && (
                <span className="text-xs text-gray-500">
                  {selectedCount} {t("selected")}
                </span>
              )}
            </div>

            {/* Bookmark list */}
            <div
              className="overflow-y-auto border-t border-gray-100 px-2 py-2"
              style={{ maxHeight }}
            >
              <div className="space-y-2">
                {filteredBookmarks.map((bookmark) => (
                  <label
                    key={bookmark.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-lg border p-3 transition-all",
                      selectedIds.has(bookmark.id)
                        ? "border-jamun-blue bg-jamun-blue/5"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(bookmark.id)}
                      onChange={() => toggleBookmark(bookmark.id)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-jamun-blue focus:ring-jamun-blue"
                    />
                    <div className="min-w-0 flex-1">
                      {/* Category tag */}
                      <span
                        className={cn(
                          "mb-1 inline-block rounded-full border px-2 py-0.5 text-xs font-medium",
                          CATEGORY_COLORS[bookmark.category] || CATEGORY_COLORS.other
                        )}
                      >
                        {BOOKMARK_CATEGORY_LABELS[bookmark.category]}
                      </span>
                      {/* Content preview */}
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {bookmark.content}
                      </p>
                      {/* Source info */}
                      {bookmark.sourceTitle && (
                        <p className="mt-1 truncate text-xs text-gray-400">
                          {t("from")}: {bookmark.sourceTitle}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Combine button */}
            <div className="border-t border-gray-100 px-4 py-3">
              <button
                onClick={handleCombine}
                disabled={!canCombine || isCombining}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  canCombine && !isCombining
                    ? "bg-gradient-to-r from-jamun-blue to-purple-600 text-white shadow-sm hover:shadow-md"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                )}
              >
                {isCombining ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{t("combining")}</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>
                      {canCombine
                        ? t("helpMeCombine")
                        : t("selectTwoOrMore")}
                    </span>
                  </>
                )}
              </button>

              {/* Summary result */}
              <AnimatePresence>
                {combineSummary && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="rounded-lg bg-gradient-to-r from-jamun-blue/10 to-purple-100 p-3">
                      <p className="text-sm font-medium text-gray-700">
                        {t("aiSummary")}:
                      </p>
                      <p className="mt-1 text-sm italic text-gray-600">
                        &ldquo;{combineSummary}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BookmarkFilterPanel;
