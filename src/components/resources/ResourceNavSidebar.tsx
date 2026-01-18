"use client";

/**
 * ResourceNavSidebar Component
 *
 * Sidebar navigation for resource pages showing document outline.
 * Displays all headings with bookmark indicators and scroll tracking.
 *
 * Features:
 * - Table of contents with h1/h2/h3 hierarchy
 * - Filter between all headings and bookmarked only
 * - Active heading tracking on scroll
 * - Share/import selections modal
 *
 * Uses shared storage from: @/components/mdx/subpoint-storage
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bookmark, List, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ImportExportModal from "./ImportExportModal";
import { SELECTION_CHANGE_EVENT } from "@/components/mdx/subpoint-helpers";
import { loadBookmarks } from "@/components/mdx/subpoint-storage";

interface HeadingItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
  isBookmarked: boolean;
}

interface ResourceNavSidebarProps {
  className?: string;
}


export default function ResourceNavSidebar({ className }: ResourceNavSidebarProps) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<"all" | "saved">("all");
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [hoveredHeading, setHoveredHeading] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scan for headings in the document
  const scanHeadings = useCallback(() => {
    const headingElements = document.querySelectorAll("h1[id], h2[id], h3[id]");
    const items: HeadingItem[] = [];
    const currentBookmarks = loadBookmarks(pathname);

    headingElements.forEach((el) => {
      const id = el.id;
      const text = el.textContent?.replace(/[\u{1F4D6}\u{2B50}]/gu, "").trim() || "";
      const level = parseInt(el.tagName[1]) as 1 | 2 | 3;

      if (id && text) {
        items.push({
          id,
          text,
          level,
          isBookmarked: currentBookmarks.has(id),
        });
      }
    });

    setHeadings(items);
    setBookmarks(currentBookmarks);
  }, [pathname]);

  // Initial scan and set up mutation observer
  useEffect(() => {
    // Initial scan with delay to wait for MDX to render
    const timeoutId = setTimeout(() => {
      scanHeadings();
    }, 100);

    // Set up mutation observer to detect DOM changes
    const observer = new MutationObserver(() => {
      scanHeadings();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-selected", "class"],
    });

    // Listen for storage changes (for when bookmarks change)
    const handleStorage = () => {
      scanHeadings();
    };
    window.addEventListener("storage", handleStorage);

    // Listen for selection change events from MDXComponents
    const handleSelectionChange = () => {
      scanHeadings();
    };
    window.addEventListener(SELECTION_CHANGE_EVENT, handleSelectionChange);

    // Also listen for click events that might toggle bookmarks
    const handleClick = () => {
      setTimeout(() => {
        scanHeadings();
      }, 50);
    };
    document.addEventListener("click", handleClick);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SELECTION_CHANGE_EVENT, handleSelectionChange);
      document.removeEventListener("click", handleClick);
    };
  }, [scanHeadings]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll("h1[id], h2[id], h3[id]");
      if (headingElements.length === 0) return;

      const headingsArray = Array.from(headingElements);
      let currentActive: string | null = null;

      // Find the last heading that has scrolled past the threshold (150px from top)
      // This ensures we always have an active heading once we've scrolled past the first one
      for (let i = headingsArray.length - 1; i >= 0; i--) {
        const el = headingsArray[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = el.id;
          break;
        }
      }

      // If no heading has been scrolled past yet, use the first heading
      // (user is at the top of the page)
      if (!currentActive && headingsArray.length > 0) {
        currentActive = headingsArray[0].id;
      }

      setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Scroll active item into view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeHeading]);

  // Navigate to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header if any
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Filter headings based on mode
  const getFilteredHeadings = () => {
    switch (filterMode) {
      case "saved":
        // Show only bookmarked headings (which includes headings with selected subpoints)
        return headings.filter((h) => h.isBookmarked);
      default:
        return headings;
    }
  };

  const filteredHeadings = getFilteredHeadings();
  const hasSaved = bookmarks.size > 0;

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        "h-full",
        "flex flex-col",
        "bg-gradient-to-b from-gray-50/80 to-white",
        "border-r border-gray-200/60",
        className
      )}
      aria-label="Page navigation"
      data-print-hidden="true"
    >
      {/* Header with filter tabs */}
      <div className="px-3 py-3 border-b border-gray-100/80 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 p-1 bg-gray-100/80 rounded-lg">
          <button
            onClick={() => setFilterMode("all")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200",
              filterMode === "all"
                ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <List className="w-3.5 h-3.5" />
            <span>All</span>
          </button>
          <button
            onClick={() => setFilterMode("saved")}
            disabled={!hasSaved}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200",
              filterMode === "saved"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm"
                : hasSaved
                ? "text-gray-500 hover:text-amber-600"
                : "text-gray-300 cursor-not-allowed"
            )}
          >
            <Bookmark className={cn("w-3.5 h-3.5", filterMode === "saved" && "fill-white")} />
            <span>Saved</span>
            {hasSaved && (
              <span className={cn(
                "ml-0.5 px-1.5 py-0.5 text-[10px] rounded-full tabular-nums",
                filterMode === "saved"
                  ? "bg-white/20 text-white"
                  : "bg-amber-100 text-amber-600"
              )}>
                {bookmarks.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Headings list with smooth scrolling */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden resource-nav-sidebar scroll-smooth">
        {filteredHeadings.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-amber-200/30 blur-xl rounded-full" />
              <Bookmark className="w-10 h-10 text-amber-400 relative" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">No saved items yet</p>
            <p className="text-xs text-gray-400 max-w-[180px] mx-auto leading-relaxed">
              Click any heading or select rule points to save them here
            </p>
          </div>
        ) : (
          <div className="py-2">
            {filteredHeadings.map((heading, index) => {
              const isActive = activeHeading === heading.id;
              const isHovered = hoveredHeading === heading.id;
              const showDivider = heading.level === 1 && index > 0;

              return (
                <div key={heading.id} className="relative">
                  {showDivider && (
                    <div className="mx-4 my-2 border-t border-gray-100" />
                  )}
                  {/* Active indicator - positioned in the wrapper for consistent placement */}
                  {isActive && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full z-10" />
                  )}
                  <button
                    ref={isActive ? activeRef : null}
                    onClick={() => scrollToHeading(heading.id)}
                    onMouseEnter={() => setHoveredHeading(heading.id)}
                    onMouseLeave={() => setHoveredHeading(null)}
                    className={cn(
                      "w-full flex items-center gap-2 py-2 text-left rounded-lg relative",
                      "transition-all duration-200 ease-out group",
                      // Padding based on level - more space for h1
                      heading.level === 1 && "pl-4 pr-3",
                      heading.level === 2 && "pl-8 pr-3",
                      heading.level === 3 && "pl-12 pr-3",
                      // Active state with gradient highlight
                      isActive && [
                        "bg-gradient-to-r from-purple-50 to-purple-50/50",
                        "text-purple-700",
                      ],
                      // Hover state
                      !isActive && isHovered && [
                        "bg-gray-50",
                        "text-gray-900",
                      ],
                      // Default state
                      !isActive && !isHovered && "text-gray-600"
                    )}
                  >
                    <span
                      className={cn(
                        "flex-1 truncate leading-relaxed transition-colors duration-150",
                        heading.level === 1 && "text-[13px] font-semibold",
                        heading.level === 2 && "text-xs font-medium",
                        heading.level === 3 && "text-[11px] text-gray-500"
                      )}
                    >
                      {heading.text}
                    </span>

                    {/* Bookmark indicator with animation */}
                    {heading.isBookmarked && (
                      <span className={cn(
                        "flex-shrink-0 transition-all duration-200",
                        isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                      )}>
                        <Bookmark
                          className={cn(
                            "w-3.5 h-3.5 fill-amber-400 text-amber-400",
                            "transition-transform duration-200",
                            isHovered && "scale-110"
                          )}
                        />
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modern footer with progress indicator */}
      <div className="px-3 py-3 border-t border-gray-100/80 bg-white/60 backdrop-blur-sm">
        {/* Share/Import button - prominent */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-3 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share / Import Selections
        </button>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium">
            {filteredHeadings.length} {filterMode === "saved" ? "saved" : "sections"}
          </span>
          {hasSaved && filterMode === "all" && (
            <button
              onClick={() => setFilterMode("saved")}
              className="flex items-center gap-1 text-[11px] text-amber-500 hover:text-amber-600 font-medium transition-colors"
            >
              <Bookmark className="w-3 h-3 fill-amber-400" />
              {bookmarks.size} saved
            </button>
          )}
        </div>

        {/* Scroll progress indicator (visual hierarchy) */}
        {headings.length > 0 && activeHeading && (
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((headings.findIndex(h => h.id === activeHeading) + 1) / headings.length) * 100}%`
              }}
            />
          </div>
        )}
      </div>

      {/* Import/Export Modal */}
      <ImportExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}
