"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  ExternalLink,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useBGWriter } from "./BGWriterContext";
import { loadBookmarks, loadBookmarkContent } from "@/components/mdx/subpoint-storage";
import type { BookmarkSource, BookmarkSection } from "@/lib/bg-writer/types";

interface AvailableGuide {
  pathname: string;
  title: string;
  bookmarkCount: number;
}

/**
 * Extract title from pathname
 */
function extractTitle(pathname: string): string {
  const slug = pathname.split("/").pop() || "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Scan localStorage for background guides with bookmarks
 */
function getAvailableGuides(): AvailableGuide[] {
  if (typeof window === "undefined") return [];

  const guides: AvailableGuide[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key?.startsWith("heading-bookmarks:") &&
      key.includes("/background-guides/")
    ) {
      const pathname = key.replace("heading-bookmarks:", "");
      const bookmarks = loadBookmarks(pathname);
      if (bookmarks.size > 0) {
        guides.push({
          pathname,
          title: extractTitle(pathname),
          bookmarkCount: bookmarks.size,
        });
      }
    }
  }

  return guides;
}

export function BookmarksSidebar() {
  const t = useTranslations("BGWriter");
  const {
    importedBookmarks,
    addBookmarkSource,
    removeBookmarkSource,
    importAndClassifyBookmarks,
  } = useBGWriter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [availableGuides, setAvailableGuides] = useState<AvailableGuide[]>([]);
  const [selectedGuides, setSelectedGuides] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // Load available guides when modal opens
  useEffect(() => {
    if (showImportModal) {
      const guides = getAvailableGuides();
      // Filter out already imported
      const importedPaths = new Set(importedBookmarks.map((b) => b.pathname));
      const available = guides.filter((g) => !importedPaths.has(g.pathname));
      setAvailableGuides(available);
      setSelectedGuides(new Set());
    }
  }, [showImportModal, importedBookmarks]);

  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setIsImporting(true);

    for (const pathname of selectedGuides) {
      const guide = availableGuides.find((g) => g.pathname === pathname);
      if (guide) {
        const bookmarkIds = Array.from(loadBookmarks(pathname));
        const bookmarkContent = loadBookmarkContent(pathname);

        // Build sections array with actual content
        const sections: BookmarkSection[] = bookmarkIds
          .map((id) => {
            const data = bookmarkContent.get(id);
            if (data) {
              return {
                id: data.id,
                headingText: data.headingText,
                content: data.content,
              };
            }
            // Fallback if no content stored (old bookmarks)
            return {
              id,
              headingText: id
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              content: "",
            };
          })
          .filter((s) => s.content.trim()); // Only include sections with content

        const source: BookmarkSource = {
          pathname,
          title: guide.title,
          headingIds: bookmarkIds,
          headingTexts: bookmarkIds.map(
            (id) =>
              bookmarkContent.get(id)?.headingText ||
              id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          ),
          sections,
          importedAt: new Date().toISOString(),
        };
        addBookmarkSource(source);

        // Also classify and add to classifiedBookmarks (v2 system)
        // This makes them available in the Idea Formation layer
        if (sections.length > 0) {
          const bookmarksToClassify = sections.map((s) => ({
            content: s.content,
            headingText: s.headingText,
            sourceTitle: guide.title,
            sourcePathname: pathname,
          }));
          await importAndClassifyBookmarks(bookmarksToClassify);
        }
      }
    }

    setIsImporting(false);
    setShowImportModal(false);
  };

  const toggleGuide = (pathname: string) => {
    setSelectedGuides((prev) => {
      const next = new Set(prev);
      if (next.has(pathname)) {
        next.delete(pathname);
      } else {
        next.add(pathname);
      }
      return next;
    });
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-jamun-blue" />
            <h3 className="font-semibold text-gray-900">
              {t("bookmarks.title")}
            </h3>
          </div>
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
                {/* Import Button */}
                <Button
                  onClick={() => setShowImportModal(true)}
                  variant="outline"
                  size="sm"
                  className="mb-3 w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t("bookmarks.importFrom")}
                </Button>

                {/* Imported Bookmarks */}
                {importedBookmarks.length === 0 ? (
                  <div className="py-4 text-center">
                    <p className="text-sm text-gray-500">
                      {t("bookmarks.noBookmarks")}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {t("bookmarks.importDescription")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {importedBookmarks.map((source) => (
                      <div
                        key={source.pathname}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        {/* Guide title header */}
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <a
                            href={source.pathname}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-w-0 flex-1 items-start gap-2"
                          >
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400 group-hover:text-jamun-blue" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-jamun-blue">
                              {source.title || extractTitle(source.pathname)}
                            </span>
                          </a>
                          <button
                            onClick={() => removeBookmarkSource(source.pathname)}
                            className="flex-shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {source.sections && source.sections.length > 0 ? (
                            // Show expandable sections with actual content
                            source.sections.map((section) => {
                              const sectionKey = `${source.pathname}:${section.id}`;
                              const isOpen = expandedSections.has(sectionKey);
                              return (
                                <div
                                  key={section.id}
                                  className="rounded border border-gray-200 bg-white"
                                >
                                  <button
                                    onClick={() => toggleSection(sectionKey)}
                                    className="flex w-full items-center justify-between px-2 py-1.5 text-left"
                                  >
                                    <span className="text-xs font-medium text-gray-700 truncate">
                                      {section.headingText}
                                    </span>
                                    {isOpen ? (
                                      <ChevronUp className="h-3 w-3 flex-shrink-0 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3 flex-shrink-0 text-gray-400" />
                                    )}
                                  </button>
                                  <AnimatePresence>
                                    {isOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden"
                                      >
                                        <p className="border-t border-gray-100 px-2 py-2 text-xs text-gray-600 whitespace-pre-wrap">
                                          {section.content || "No content available"}
                                        </p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })
                          ) : (
                            // Fallback: show heading texts only (old data)
                            source.headingTexts.slice(0, 5).map((text, i) => (
                              <p
                                key={i}
                                className="truncate text-xs text-gray-500"
                              >
                                • {text}
                              </p>
                            ))
                          )}
                          {(!source.sections || source.sections.length === 0) &&
                            source.headingTexts.length > 5 && (
                              <p className="text-xs text-gray-400">
                                +{source.headingTexts.length - 5} more
                              </p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {t("bookmarks.selectGuide")}
              </h3>

              {availableGuides.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  {t("bookmarks.noGuidesFound")}
                </p>
              ) : (
                <>
                  <div className="mb-4 max-h-64 space-y-2 overflow-y-auto">
                    {availableGuides.map((guide) => (
                      <button
                        key={guide.pathname}
                        onClick={() => toggleGuide(guide.pathname)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors",
                          selectedGuides.has(guide.pathname)
                            ? "border-jamun-blue bg-jamun-blue/5"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {guide.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {guide.bookmarkCount} {guide.bookmarkCount === 1 ? "section" : "sections"} from this guide
                          </p>
                        </div>
                        {selectedGuides.has(guide.pathname) && (
                          <Check className="h-5 w-5 text-jamun-blue" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Selection summary */}
                  {selectedGuides.size > 0 && (
                    <div className="mb-4 rounded-lg bg-jamun-blue/10 p-3">
                      <p className="text-sm font-medium text-jamun-blue">
                        {t("bookmarks.selectedSummary", {
                          count: Array.from(selectedGuides).reduce((sum, pathname) => {
                            const guide = availableGuides.find(g => g.pathname === pathname);
                            return sum + (guide?.bookmarkCount || 0);
                          }, 0),
                          guides: selectedGuides.size
                        })}
                      </p>
                      <ul className="mt-1 text-xs text-gray-600">
                        {Array.from(selectedGuides).map(pathname => {
                          const guide = availableGuides.find(g => g.pathname === pathname);
                          return guide && (
                            <li key={pathname}>• {guide.bookmarkCount} from {guide.title}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowImportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={selectedGuides.size === 0 || isImporting}
                >
                  {isImporting ? "Classifying..." : t("bookmarks.importSelected")}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
