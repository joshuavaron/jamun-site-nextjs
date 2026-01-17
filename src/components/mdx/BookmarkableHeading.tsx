"use client";

/**
 * BookmarkableHeading Component
 *
 * Heading component (h1, h2, h3) with bookmark functionality.
 * Click to bookmark/unbookmark headings for navigation sidebar.
 *
 * Features:
 * - Toggle bookmark on heading click
 * - Visual bookmark icon indicator
 * - Auto-bookmark parent headings when bookmarking children
 * - Auto-deselect all subpoints when unbookmarking
 * - Hover highlighting coordination with subpoints
 *
 * Used by: MDX heading renderers (h1, h2, h3)
 * Related: SubpointParagraph (for subpoint selections), ResourceNavSidebar
 */

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DESELECT_EVENT,
  SELECTION_CHANGE_EVENT,
  DeselectEventDetail,
  getTextContent,
  getSubpointsUnderHeading,
  getChildHeadingIds,
  getParentHeadingIds,
} from "./subpoint-helpers";
import {
  loadSelections,
  saveSelections,
  loadBookmarks,
  saveBookmarks,
  loadBookmarkContent,
  saveBookmarkContent,
  extractContentUnderHeading,
} from "./subpoint-storage";

// Bookmark icon SVG component
function BookmarkIcon({ isBookmarked }: { isBookmarked: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isBookmarked ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-amber-400' : 'text-gray-300 hover:text-gray-400'}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

interface BookmarkableHeadingProps {
  level: 1 | 2 | 3;
  children: React.ReactNode;
  className: string;
}

export function BookmarkableHeading({ level, children, className }: BookmarkableHeadingProps) {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const textContent = getTextContent(children);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Generate a stable ID from the heading text
  const headingId = textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  useEffect(() => {
    const bookmarks = loadBookmarks(pathname);
    setIsBookmarked(bookmarks.has(headingId));
  }, [pathname, headingId]);

  // Listen for selection changes (when subpoints auto-bookmark this heading)
  useEffect(() => {
    const handleSelectionChange = () => {
      const bookmarks = loadBookmarks(pathname);
      setIsBookmarked(bookmarks.has(headingId));
    };

    window.addEventListener(SELECTION_CHANGE_EVENT, handleSelectionChange);
    return () => window.removeEventListener(SELECTION_CHANGE_EVENT, handleSelectionChange);
  }, [pathname, headingId]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarks = loadBookmarks(pathname);
    const bookmarkContent = loadBookmarkContent(pathname);

    if (isBookmarked) {
      // Unbookmarking: also deselect all subpoints under this heading
      bookmarks.delete(headingId);
      bookmarkContent.delete(headingId);

      // Also unbookmark all child headings
      const childHeadingIds = getChildHeadingIds(headingId);
      childHeadingIds.forEach((childId) => {
        bookmarks.delete(childId);
        bookmarkContent.delete(childId);
      });

      const subpointsUnderHeading = getSubpointsUnderHeading(headingId);
      const savedSelections = loadSelections(pathname);
      const deselectedIds: string[] = [];

      subpointsUnderHeading.forEach((sp) => {
        const spId = sp.dataset.subpointId;
        if (spId && savedSelections.has(spId)) {
          savedSelections.delete(spId);
          deselectedIds.push(spId);
          sp.dataset.selected = "false";
          sp.dataset.childSelectedCount = "0";
          sp.dataset.childSelected = "false";
        }
      });

      if (deselectedIds.length > 0) {
        saveSelections(pathname, savedSelections);
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
              detail: { parentId: headingId, childIds: deselectedIds },
            })
          );
        }, 0);
      }
    } else {
      // Bookmarking: also bookmark all parent headings
      bookmarks.add(headingId);

      // Save the content under this heading
      const content = extractContentUnderHeading(headingId);
      bookmarkContent.set(headingId, {
        id: headingId,
        headingText: textContent,
        content,
      });

      const parentHeadingIds = getParentHeadingIds(headingId);
      parentHeadingIds.forEach((parentId) => {
        bookmarks.add(parentId);
        // Also save parent heading content if not already saved
        if (!bookmarkContent.has(parentId)) {
          const parentHeading = document.getElementById(parentId);
          if (parentHeading) {
            const parentText = parentHeading.textContent?.trim() || parentId;
            const parentContent = extractContentUnderHeading(parentId);
            bookmarkContent.set(parentId, {
              id: parentId,
              headingText: parentText,
              content: parentContent,
            });
          }
        }
      });
    }

    saveBookmarks(pathname, bookmarks);
    saveBookmarkContent(pathname, bookmarkContent);
    setIsBookmarked(!isBookmarked);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
    }, 0);
  };

  // Handle hover - highlight this heading AND parent headings
  const handleMouseEnter = () => {
    if (headingRef.current) {
      headingRef.current.dataset.childHovered = 'true';
    }
    const parentHeadingIds = getParentHeadingIds(headingId);
    parentHeadingIds.forEach(parentId => {
      const parentHeading = document.getElementById(parentId);
      if (parentHeading) {
        parentHeading.dataset.childHovered = 'true';
      }
    });
  };

  const handleMouseLeave = () => {
    if (headingRef.current) {
      headingRef.current.dataset.childHovered = 'false';
    }
    const parentHeadingIds = getParentHeadingIds(headingId);
    parentHeadingIds.forEach(parentId => {
      const parentHeading = document.getElementById(parentId);
      if (parentHeading) {
        parentHeading.dataset.childHovered = 'false';
      }
    });
  };

  // Handle click on heading itself (not just button)
  const handleHeadingClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    handleBookmarkClick(e);
  };

  const Tag = `h${level}` as const;

  return (
    <Tag
      ref={headingRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} cursor-pointer`}
      id={headingId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleHeadingClick}
    >
      {children}
      <button
        onClick={handleBookmarkClick}
        className="inline-flex items-center ml-2 align-middle"
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <BookmarkIcon isBookmarked={isBookmarked} />
      </button>
    </Tag>
  );
}
