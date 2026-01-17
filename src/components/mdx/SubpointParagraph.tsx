"use client";

/**
 * SubpointParagraph Component
 *
 * Interactive paragraph component for legal-style subpoints (e.g., (a), (1), (i)).
 * Handles selection state, hierarchy visualization, and parent/child propagation.
 *
 * Features:
 * - Click to select/deselect subpoints
 * - Visual hierarchy lines showing parent-child relationships
 * - Hover highlighting of parent elements
 * - localStorage persistence of selections
 * - Automatic parent selection when selecting children
 * - Automatic child deselection when deselecting parents
 *
 * Used by: MDX paragraph renderer when text matches subpoint pattern
 * Related: BookmarkableHeading (for heading bookmarks), subpoint-helpers.ts
 */

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DESELECT_EVENT,
  SELECTION_CHANGE_EVENT,
  DeselectEventDetail,
  extractMarker,
  getTextContent,
  calculateHierarchyLevels,
  getParentSubpoints,
  getChildSubpoints,
  generateSubpointId,
  findAllParentHeadingIds,
} from "./subpoint-helpers";
import { loadSelections, saveSelections, loadBookmarks, saveBookmarks } from "./subpoint-storage";

interface SubpointParagraphProps {
  children: React.ReactNode;
  markerType: string;
}

export function SubpointParagraph({ children, markerType }: SubpointParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [subpointId, setSubpointId] = useState<string | null>(null);
  const [calculatedLevel, setCalculatedLevel] = useState(1);
  const pathname = usePathname();

  // Extract marker from text content
  const textContent = getTextContent(children);
  const marker = extractMarker(textContent) || "unknown";

  // Initialize: calculate line heights and restore selection from localStorage
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const parent = el.parentElement;
    if (!parent) return;

    // Store marker type as data attribute
    el.dataset.subpointMarkerType = markerType;
    el.dataset.subpointMarker = marker;

    // Find all subpoint paragraphs in the container
    const allSubpoints = Array.from(parent.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
    const myIndex = allSubpoints.indexOf(el);
    if (myIndex === -1) return;

    // Calculate hierarchy levels for all subpoints
    const hierarchyLevels = calculateHierarchyLevels(allSubpoints);
    const myLevel = hierarchyLevels.get(el) || 1;

    // Update state and data attribute with calculated level
    setCalculatedLevel(myLevel);
    el.dataset.subpointLevel = String(myLevel);

    // Also update all other subpoints' data attributes for consistency
    allSubpoints.forEach(sp => {
      const level = hierarchyLevels.get(sp) || 1;
      sp.dataset.subpointLevel = String(level);
    });

    // Calculate line height through children and continuations
    let lineEndIndex = myIndex;
    let lastElement: Element = allSubpoints[lineEndIndex];

    for (let i = myIndex + 1; i < allSubpoints.length; i++) {
      const nextEl = allSubpoints[i];
      const nextLevel = parseInt(nextEl.dataset.subpointLevel || "0", 10);

      if (nextLevel <= myLevel) break;

      // Check for heading between elements (section break)
      const prevEl = allSubpoints[lineEndIndex];
      let sibling = prevEl.nextElementSibling;
      while (sibling && sibling !== nextEl) {
        if (sibling.tagName.match(/^H[1-4]$/)) break;
        sibling = sibling.nextElementSibling;
      }
      if (sibling !== nextEl) break;

      lineEndIndex = i;
      lastElement = nextEl;
    }

    // Check for continuation elements after last child
    if (lineEndIndex > myIndex) {
      const lastSubpoint = allSubpoints[lineEndIndex];
      let sibling = lastSubpoint.nextElementSibling;
      while (sibling) {
        if (sibling.tagName.match(/^H[1-4]$/)) break;
        if (sibling.classList.contains('subpoint-continuation')) {
          lastElement = sibling;
          sibling = sibling.nextElementSibling;
          continue;
        }
        if (sibling.classList.contains('subpoint-paragraph')) {
          const sibLevel = parseInt((sibling as HTMLElement).dataset.subpointLevel || '0', 10);
          if (sibLevel <= myLevel) break;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
    }

    // Calculate pixel distance for line height
    if (lastElement !== el) {
      const myRect = el.getBoundingClientRect();
      const lastRect = lastElement.getBoundingClientRect();
      const totalHeight = lastRect.bottom - myRect.top;
      el.style.setProperty('--line-height', `${totalHeight}px`);
      el.dataset.hasChildren = 'true';
    } else {
      el.style.setProperty('--line-height', '100%');
      el.dataset.hasChildren = 'false';
    }

    // Generate ID and restore selection from localStorage
    const id = generateSubpointId(el, allSubpoints);
    setSubpointId(id);
    el.dataset.subpointId = id;

    const savedSelections = loadSelections(pathname);
    if (savedSelections.has(id)) {
      setIsSelected(true);
      const parents = getParentSubpoints(el, allSubpoints);
      parents.forEach(p => {
        const count = parseInt(p.dataset.childSelectedCount || "0", 10);
        p.dataset.childSelectedCount = String(count + 1);
        p.dataset.childSelected = 'true';
      });
    }
  }, [markerType, marker, pathname]);

  // Listen for deselect events from parent elements
  useEffect(() => {
    if (!subpointId) return;

    const handleDeselect = (event: Event) => {
      const customEvent = event as CustomEvent<DeselectEventDetail>;
      if (customEvent.detail.childIds.includes(subpointId)) {
        setIsSelected(false);
      }
    };

    window.addEventListener(DESELECT_EVENT, handleDeselect);
    return () => window.removeEventListener(DESELECT_EVENT, handleDeselect);
  }, [subpointId]);

  // Handle hover - highlight parent lines and parent heading bookmark icons
  const handleMouseEnter = () => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;

    const allSubpoints = Array.from(parent.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
    const parents = getParentSubpoints(ref.current, allSubpoints);
    parents.forEach(p => p.dataset.childHovered = 'true');

    const parentHeadingIds = findAllParentHeadingIds(ref.current);
    parentHeadingIds.forEach(headingId => {
      const heading = document.getElementById(headingId);
      if (heading) heading.dataset.childHovered = 'true';
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;

    const allSubpoints = Array.from(parent.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
    const parents = getParentSubpoints(ref.current, allSubpoints);
    parents.forEach(p => p.dataset.childHovered = 'false');

    const parentHeadingIds = findAllParentHeadingIds(ref.current);
    parentHeadingIds.forEach(headingId => {
      const heading = document.getElementById(headingId);
      if (heading) heading.dataset.childHovered = 'false';
    });
  };

  const handleClick = () => {
    if (!ref.current || !subpointId) return;
    const parentEl = ref.current.parentElement;
    if (!parentEl) return;

    const allSubpoints = Array.from(parentEl.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
    const parents = getParentSubpoints(ref.current, allSubpoints);
    const children = getChildSubpoints(ref.current, allSubpoints);
    const savedSelections = loadSelections(pathname);

    // Check if any children are currently selected
    const hasSelectedChildren = children.some(child => {
      const childId = child.dataset.subpointId;
      return childId && savedSelections.has(childId);
    });

    // If has selected children and not selected, clicking deselects all children
    if (hasSelectedChildren && !isSelected) {
      const childIds: string[] = [];
      let selectedChildCount = 0;
      children.forEach(child => {
        const childId = child.dataset.subpointId;
        if (childId) {
          childIds.push(childId);
          if (savedSelections.has(childId)) {
            selectedChildCount++;
            savedSelections.delete(childId);
          }
        }
        child.dataset.childSelectedCount = '0';
        child.dataset.childSelected = 'false';
      });

      if (childIds.length > 0) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
            detail: { parentId: subpointId, childIds }
          }));
        }, 0);
      }

      ref.current.dataset.childSelectedCount = '0';
      ref.current.dataset.childSelected = 'false';

      parents.forEach(p => {
        const count = parseInt(p.dataset.childSelectedCount || "0", 10);
        const newCount = Math.max(0, count - selectedChildCount);
        p.dataset.childSelectedCount = String(newCount);
        p.dataset.childSelected = newCount > 0 ? 'true' : 'false';
      });

      saveSelections(pathname, savedSelections);
      return;
    }

    // Normal toggle behavior
    setIsSelected(prevSelected => {
      const newSelected = !prevSelected;

      if (newSelected) {
        savedSelections.add(subpointId);

        // Select all parent subpoints (backward propagation)
        parents.forEach(p => {
          const parentId = p.dataset.subpointId;
          if (parentId && !savedSelections.has(parentId)) {
            savedSelections.add(parentId);
            p.dataset.selected = 'true';
          }
          const count = parseInt(p.dataset.childSelectedCount || "0", 10);
          p.dataset.childSelectedCount = String(count + 1);
          p.dataset.childSelected = 'true';
        });

        // Bookmark all parent headings
        const parentHeadingIds = findAllParentHeadingIds(ref.current!);
        if (parentHeadingIds.length > 0) {
          const bookmarks = loadBookmarks(pathname);
          let bookmarksChanged = false;
          parentHeadingIds.forEach(headingId => {
            if (!bookmarks.has(headingId)) {
              bookmarks.add(headingId);
              bookmarksChanged = true;
            }
          });
          if (bookmarksChanged) {
            saveBookmarks(pathname, bookmarks);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
            }, 0);
          }
        }
      } else {
        savedSelections.delete(subpointId);

        // Deselect all children (forward propagation)
        const childIds: string[] = [];
        let selectedChildCount = 0;
        children.forEach(child => {
          const childId = child.dataset.subpointId;
          if (childId) {
            childIds.push(childId);
            if (savedSelections.has(childId)) {
              selectedChildCount++;
              savedSelections.delete(childId);
            }
          }
          child.dataset.childSelectedCount = '0';
          child.dataset.childSelected = 'false';
        });

        if (childIds.length > 0) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
              detail: { parentId: subpointId, childIds }
            }));
          }, 0);
        }

        ref.current!.dataset.childSelectedCount = '0';
        ref.current!.dataset.childSelected = 'false';

        const totalDeselected = 1 + selectedChildCount;
        parents.forEach(p => {
          const count = parseInt(p.dataset.childSelectedCount || "0", 10);
          const newCount = Math.max(0, count - totalDeselected);
          p.dataset.childSelectedCount = String(newCount);
          p.dataset.childSelected = newCount > 0 ? 'true' : 'false';
        });
      }

      saveSelections(pathname, savedSelections);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
      }, 0);
      return newSelected;
    });
  };

  return (
    <p
      ref={ref}
      className="text-gray-700 leading-relaxed subpoint-paragraph cursor-pointer"
      data-subpoint-level={calculatedLevel}
      data-subpoint-marker-type={markerType}
      data-selected={isSelected}
      data-child-hovered="false"
      data-child-selected="false"
      data-child-selected-count="0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </p>
  );
}
