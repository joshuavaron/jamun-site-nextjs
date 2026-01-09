"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { MDXComponents } from "mdx/types";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Custom event for deselecting children
const DESELECT_EVENT = "subpoint-deselect";
// Custom event for when selections change (to notify headings)
const SELECTION_CHANGE_EVENT = "selection-change";

interface DeselectEventDetail {
  parentId: string;
  childIds: string[];
}

// Helper to find ALL parent heading IDs for a subpoint element (from immediate parent up to h1)
function findAllParentHeadingIds(el: HTMLElement): string[] {
  const parentIds: string[] = [];
  let currentLevel = 4; // Start higher than any heading level

  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/) && sibling.id) {
      const headingLevel = parseInt(sibling.tagName[1]);
      // Only add if it's a higher-level heading (lower number) than what we've seen
      if (headingLevel < currentLevel) {
        parentIds.push(sibling.id);
        currentLevel = headingLevel;
        // Stop if we've reached h1
        if (headingLevel === 1) break;
      }
    }
    sibling = sibling.previousElementSibling;
  }

  return parentIds;
}

// Helper to find all subpoints under a heading (until next heading of same or higher level)
function getSubpointsUnderHeading(headingId: string): HTMLParagraphElement[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const subpoints: HTMLParagraphElement[] = [];

  let sibling = heading.nextElementSibling;
  while (sibling) {
    // Stop at next heading of same or higher level
    if (sibling.tagName.match(/^H[1-3]$/)) {
      const sibLevel = parseInt(sibling.tagName[1]);
      if (sibLevel <= headingLevel) break;
    }
    // Collect subpoints
    if (sibling.classList.contains('subpoint-paragraph')) {
      subpoints.push(sibling as HTMLParagraphElement);
    }
    sibling = sibling.nextElementSibling;
  }

  return subpoints;
}

// Helper to find all child headings under a heading (until next heading of same or higher level)
function getChildHeadingIds(headingId: string): string[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const childHeadingIds: string[] = [];

  let sibling = heading.nextElementSibling;
  while (sibling) {
    // Stop at next heading of same or higher level
    if (sibling.tagName.match(/^H[1-3]$/)) {
      const sibLevel = parseInt(sibling.tagName[1]);
      if (sibLevel <= headingLevel) break;
      // This is a child heading (lower level = higher number)
      if (sibling.id) {
        childHeadingIds.push(sibling.id);
      }
    }
    sibling = sibling.nextElementSibling;
  }

  return childHeadingIds;
}

// Helper to find all parent headings of a heading (from immediate parent up to h1)
function getParentHeadingIds(headingId: string): string[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const parentIds: string[] = [];
  let currentLevel = headingLevel;

  let sibling = heading.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/) && sibling.id) {
      const sibLevel = parseInt(sibling.tagName[1]);
      // Only add if it's a higher-level heading (lower number)
      if (sibLevel < currentLevel) {
        parentIds.push(sibling.id);
        currentLevel = sibLevel;
        // Stop if we've reached h1
        if (sibLevel === 1) break;
      }
    }
    sibling = sibling.previousElementSibling;
  }

  return parentIds;
}

// localStorage helper functions for subpoint selections
function getStorageKey(pathname: string): string {
  return `subpoint-selections:${pathname}`;
}

function loadSelections(pathname: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(getStorageKey(pathname));
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch {
    // Ignore localStorage errors
  }
  return new Set();
}

function saveSelections(pathname: string, selections: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    const key = getStorageKey(pathname);
    if (selections.size === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify([...selections]));
    }
  } catch {
    // Ignore localStorage errors
  }
}

// localStorage helper functions for heading bookmarks
function getBookmarksStorageKey(pathname: string): string {
  return `heading-bookmarks:${pathname}`;
}

function loadBookmarks(pathname: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(getBookmarksStorageKey(pathname));
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch {
    // Ignore localStorage errors
  }
  return new Set();
}

function saveBookmarks(pathname: string, bookmarks: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    const key = getBookmarksStorageKey(pathname);
    if (bookmarks.size === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify([...bookmarks]));
    }
  } catch {
    // Ignore localStorage errors
  }
}

// Extract the marker from subpoint text (e.g., "a" from "(a) Some text")
function extractMarker(text: string): string | null {
  // Match (a), (1), (A), (i), (ii), etc.
  const match = text.match(/^\*?\*?\(([a-zA-Z]+|\d+|i{1,3}|iv|vi{0,3}|ix|x)\)\*?\*?\s/i);
  return match ? match[1].toLowerCase() : null;
}

// Helper to detect if text is a legal-style sub-point and extract its marker type
function getSubPointMarkerType(text: string): string | null {
  // Roman numerals (i), (ii), (iii), etc. - check FIRST because (i) would otherwise match lowercase
  if (/^\*?\*?\((?:i{1,3}|iv|vi{0,3}|vii{1,2}|ix|x)\)\*?\*?\s/i.test(text)) return 'roman';
  // Lowercase letters (a), (b), (c), etc. (excluding roman numeral letters)
  if (/^\*?\*?\([a-hj-uz]\)\*?\*?\s/.test(text)) return 'lower';
  // Numbers (1), (2), (3), etc.
  if (/^\*?\*?\(\d+\)\*?\*?\s/.test(text)) return 'number';
  // Uppercase letters (A), (B), (C), etc.
  if (/^\*?\*?\([A-Z]\)\*?\*?\s/.test(text)) return 'upper';
  return null;
}

// Check if a marker represents a "first" item in its series (resets hierarchy)
function isFirstInSeries(text: string): boolean {
  // Check for (a), (1), (A), or (i) - the first item in any series
  return /^\*?\*?\((?:a|1|A|i)\)\*?\*?\s/.test(text);
}


// Extract text content from React children for pattern detection
function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    return getTextContent(props.children);
  }
  return "";
}

// Recursively filter out footnote backref elements from remark-gfm
// These are nested inside <p> tags within <li> elements
function filterFootnoteBackrefs(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const props = child.props as Record<string, unknown>;

    // Check for data-footnote-backref attribute (remark-gfm adds this)
    if (props['data-footnote-backref']) {
      return null;
    }

    // Check for footnote-backref class
    if (typeof props.className === 'string' && props.className.includes('data-footnote-backref')) {
      return null;
    }

    // Recursively filter children if they exist
    if (props.children) {
      return React.cloneElement(child, {
        ...props,
        children: filterFootnoteBackrefs(props.children as React.ReactNode)
      } as React.Attributes);
    }

    return child;
  });
}

// Helper to find parent subpoints (elements with lower level that come before this one)
function getParentSubpoints(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): HTMLParagraphElement[] {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const parents: HTMLParagraphElement[] = [];

  // Walk backwards to find parents at each level
  let currentLevel = myLevel;
  for (let i = myIndex - 1; i >= 0 && currentLevel > 1; i--) {
    const candidateLevel = parseInt(allSubpoints[i].dataset.subpointLevel || "0", 10);
    if (candidateLevel < currentLevel) {
      parents.push(allSubpoints[i]);
      currentLevel = candidateLevel;
    }
  }

  return parents;
}

// Helper to find child subpoints (elements with higher level that come after this one, until we hit same or lower level)
function getChildSubpoints(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): HTMLParagraphElement[] {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const children: HTMLParagraphElement[] = [];

  for (let i = myIndex + 1; i < allSubpoints.length; i++) {
    const candidateLevel = parseInt(allSubpoints[i].dataset.subpointLevel || "0", 10);
    if (candidateLevel <= myLevel) {
      // Found an element at same or lower level - stop
      break;
    }
    children.push(allSubpoints[i]);
  }

  return children;
}

// Generate a unique ID for a subpoint based on its hierarchy
function generateSubpointId(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): string {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const myMarker = el.dataset.subpointMarker || String(myIndex);

  // Build path from parents
  const pathParts: string[] = [];
  let currentLevel = myLevel;

  for (let i = myIndex - 1; i >= 0 && currentLevel > 1; i--) {
    const candidateLevel = parseInt(allSubpoints[i].dataset.subpointLevel || "0", 10);
    if (candidateLevel < currentLevel) {
      const marker = allSubpoints[i].dataset.subpointMarker || String(i);
      pathParts.unshift(marker);
      currentLevel = candidateLevel;
    }
  }

  pathParts.push(myMarker);
  return pathParts.join("-");
}

// Check if there's a heading between two elements
function hasHeadingBetween(el1: Element, el2: Element): boolean {
  let sibling = el1.nextElementSibling;
  while (sibling && sibling !== el2) {
    if (sibling.tagName.match(/^H[1-4]$/)) {
      return true;
    }
    sibling = sibling.nextElementSibling;
  }
  return false;
}

// Calculate hierarchy levels for all subpoints in a container
function calculateHierarchyLevels(allSubpoints: HTMLParagraphElement[]): Map<HTMLParagraphElement, number> {
  const levels = new Map<HTMLParagraphElement, number>();

  // Track marker type stack - when we see a new marker type, it's a new level
  // When we see the same marker type at position "first" (a, 1, A, i), we go back to that level
  let markerTypeStack: string[] = [];
  let prevElement: HTMLParagraphElement | null = null;

  for (const el of allSubpoints) {
    const text = el.textContent || '';
    const markerType = getSubPointMarkerType(text);

    if (!markerType) {
      levels.set(el, 0);
      prevElement = el;
      continue;
    }

    // Check if there's a heading between this element and the previous one
    // If so, reset the marker type stack (new section/rule)
    if (prevElement && hasHeadingBetween(prevElement, el)) {
      markerTypeStack = [];
    }

    const isFirst = isFirstInSeries(text);
    const existingIndex = markerTypeStack.indexOf(markerType);

    if (existingIndex !== -1) {
      // We've seen this marker type before
      if (isFirst) {
        // Reset to this level (e.g., seeing (a) again means new sibling at level where 'lower' lives)
        markerTypeStack.length = existingIndex + 1; // Truncate stack to this level
      }
      // Use the existing level for this marker type
      levels.set(el, existingIndex + 1);
    } else {
      // New marker type - it's a child of the current level
      markerTypeStack.push(markerType);
      levels.set(el, markerTypeStack.length);
    }

    prevElement = el;
  }

  return levels;
}

// Component that calculates and renders continuous lines for subpoints
function SubpointParagraph({ children, markerType }: { children: React.ReactNode; markerType: string }) {
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
    // Store marker as data attribute for ID generation
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

    // Calculate how far THIS element's line should extend (through its children and continuations)
    // Line extends until we hit an element with level <= myLevel OR a section break
    let lineEndIndex = myIndex;
    let lastElement: Element = allSubpoints[lineEndIndex];

    for (let i = myIndex + 1; i < allSubpoints.length; i++) {
      const nextEl = allSubpoints[i];
      const nextLevel = parseInt(nextEl.dataset.subpointLevel || "0", 10);

      if (nextLevel <= myLevel) {
        // Found an element at same or lower level - line stops before it
        break;
      }

      // Check if there's a heading (h1, h2, h3, h4) between current lineEndIndex and this element
      // This would indicate a new section/rule
      const prevEl = allSubpoints[lineEndIndex];
      let sibling = prevEl.nextElementSibling;
      while (sibling && sibling !== nextEl) {
        if (sibling.tagName.match(/^H[1-4]$/)) {
          // Found a heading between elements - this is a section break
          // Don't extend the line past this point
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      if (sibling !== nextEl) {
        // We broke out of the loop due to finding a heading
        break;
      }

      lineEndIndex = i;
      lastElement = nextEl;
    }

    // After finding the last child subpoint, check for continuation elements that follow
    // These should also be included in the line
    if (lineEndIndex > myIndex) {
      // We have children, so check for continuations after the last child
      const lastSubpoint = allSubpoints[lineEndIndex];
      let sibling = lastSubpoint.nextElementSibling;
      while (sibling) {
        // Stop if we hit a heading
        if (sibling.tagName.match(/^H[1-4]$/)) {
          break;
        }
        // Check if it's a continuation element - include it if it follows our children
        // (Continuations that follow child subpoints belong to the parent section)
        if (sibling.classList.contains('subpoint-continuation')) {
          lastElement = sibling;
          sibling = sibling.nextElementSibling;
          continue;
        }
        // Check if it's another subpoint - if so, check if it's still a child
        if (sibling.classList.contains('subpoint-paragraph')) {
          const sibLevel = parseInt((sibling as HTMLElement).dataset.subpointLevel || '0', 10);
          // If it's at same or lower level, stop
          if (sibLevel <= myLevel) {
            break;
          }
          // Otherwise, it's a child - but we've already processed children in the main loop
          // This shouldn't happen, but just in case
          break;
        }
        sibling = sibling.nextElementSibling;
      }
    }

    // Calculate the pixel distance from top of this element to bottom of the last child/continuation
    if (lastElement !== el) {
      const myRect = el.getBoundingClientRect();
      const lastRect = lastElement.getBoundingClientRect();
      // Calculate from my top to last element's bottom
      const totalHeight = lastRect.bottom - myRect.top;

      el.style.setProperty('--line-height', `${totalHeight}px`);
      el.dataset.hasChildren = 'true';
    } else {
      // No children - line just covers this element's text
      el.style.setProperty('--line-height', '100%');
      el.dataset.hasChildren = 'false';
    }

    // Generate ID and check localStorage for saved selection
    const id = generateSubpointId(el, allSubpoints);
    setSubpointId(id);
    el.dataset.subpointId = id;

    const savedSelections = loadSelections(pathname);
    if (savedSelections.has(id)) {
      setIsSelected(true);
      // Also update parent child-selected states
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

    // Also highlight parent heading bookmark icons
    const parentHeadingIds = findAllParentHeadingIds(ref.current);
    parentHeadingIds.forEach(headingId => {
      const heading = document.getElementById(headingId);
      if (heading) {
        heading.dataset.childHovered = 'true';
      }
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;

    const allSubpoints = Array.from(parent.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
    const parents = getParentSubpoints(ref.current, allSubpoints);

    parents.forEach(p => p.dataset.childHovered = 'false');

    // Also unhighlight parent heading bookmark icons
    const parentHeadingIds = findAllParentHeadingIds(ref.current);
    parentHeadingIds.forEach(headingId => {
      const heading = document.getElementById(headingId);
      if (heading) {
        heading.dataset.childHovered = 'false';
      }
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

    // If this element has selected children and is not itself selected,
    // clicking should deselect all children (not select this element)
    if (hasSelectedChildren && !isSelected) {
      // Deselect all children - but only count those that were actually selected
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

      // Dispatch event to notify child components to update their React state
      if (childIds.length > 0) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
            detail: { parentId: subpointId, childIds }
          }));
        }, 0);
      }

      // Reset this element's own childSelected state
      ref.current.dataset.childSelectedCount = '0';
      ref.current.dataset.childSelected = 'false';

      // Update parent counts - only subtract the children that were actually selected
      parents.forEach(p => {
        const count = parseInt(p.dataset.childSelectedCount || "0", 10);
        const newCount = Math.max(0, count - selectedChildCount);
        p.dataset.childSelectedCount = String(newCount);
        p.dataset.childSelected = newCount > 0 ? 'true' : 'false';
      });

      saveSelections(pathname, savedSelections);
      return; // Don't toggle this element's selection
    }

    // Normal toggle behavior
    setIsSelected(prevSelected => {
      const newSelected = !prevSelected;

      if (newSelected) {
        savedSelections.add(subpointId);

        // Also select all parent subpoints (backward propagation)
        parents.forEach(p => {
          const parentId = p.dataset.subpointId;
          if (parentId && !savedSelections.has(parentId)) {
            savedSelections.add(parentId);
            // Update the parent's visual state
            p.dataset.selected = 'true';
          }
          const count = parseInt(p.dataset.childSelectedCount || "0", 10);
          p.dataset.childSelectedCount = String(count + 1);
          p.dataset.childSelected = 'true';
        });

        // Also bookmark ALL parent headings (backward propagation to headings)
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
            // Dispatch event to update heading UI (deferred to avoid setState during render)
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
            }, 0);
          }
        }
      } else {
        savedSelections.delete(subpointId);

        // When deselecting, also deselect all children (forward propagation)
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

        // Dispatch event to notify child components to update their React state
        if (childIds.length > 0) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
              detail: { parentId: subpointId, childIds }
            }));
          }, 0);
        }

        // Reset this element's own childSelected state
        ref.current!.dataset.childSelectedCount = '0';
        ref.current!.dataset.childSelected = 'false';

        // Remove this element from parents' childSelected count
        // Need to subtract 1 (for this element) + only the children that were actually selected
        const totalDeselected = 1 + selectedChildCount;
        parents.forEach(p => {
          const count = parseInt(p.dataset.childSelectedCount || "0", 10);
          const newCount = Math.max(0, count - totalDeselected);
          p.dataset.childSelectedCount = String(newCount);
          p.dataset.childSelected = newCount > 0 ? 'true' : 'false';
        });
      }

      saveSelections(pathname, savedSelections);
      // Dispatch event to notify sidebar of changes (deferred to avoid setState during render)
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

// Bookmark icon component
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

// Bookmarkable heading component
function BookmarkableHeading({
  level,
  children,
  className
}: {
  level: 1 | 2 | 3;
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const textContent = getTextContent(children);

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

    if (isBookmarked) {
      // When unbookmarking, also deselect all subpoints under this heading (forward propagation)
      bookmarks.delete(headingId);

      // Also unbookmark all child headings (h2s under h1, h3s under h2, etc.)
      const childHeadingIds = getChildHeadingIds(headingId);
      childHeadingIds.forEach(childId => {
        bookmarks.delete(childId);
      });

      const subpointsUnderHeading = getSubpointsUnderHeading(headingId);
      const savedSelections = loadSelections(pathname);
      const deselectedIds: string[] = [];

      subpointsUnderHeading.forEach(sp => {
        const spId = sp.dataset.subpointId;
        if (spId && savedSelections.has(spId)) {
          savedSelections.delete(spId);
          deselectedIds.push(spId);
          sp.dataset.selected = 'false';
          sp.dataset.childSelectedCount = '0';
          sp.dataset.childSelected = 'false';
        }
      });

      if (deselectedIds.length > 0) {
        saveSelections(pathname, savedSelections);
        // Dispatch event to notify subpoint components to update their React state
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent<DeselectEventDetail>(DESELECT_EVENT, {
            detail: { parentId: headingId, childIds: deselectedIds }
          }));
        }, 0);
      }
    } else {
      bookmarks.add(headingId);

      // Also bookmark all parent headings (backward propagation)
      const parentHeadingIds = getParentHeadingIds(headingId);
      parentHeadingIds.forEach(parentId => {
        bookmarks.add(parentId);
      });
    }

    saveBookmarks(pathname, bookmarks);
    setIsBookmarked(!isBookmarked);
    // Notify sidebar of changes (deferred to avoid setState during render)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
    }, 0);
  };

  const Tag = `h${level}` as const;
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Handle hover - highlight this heading's bookmark icon AND parent heading bookmark icons
  const handleMouseEnter = () => {
    // Highlight this heading's own bookmark icon
    if (headingRef.current) {
      headingRef.current.dataset.childHovered = 'true';
    }
    // Highlight parent heading bookmark icons
    const parentHeadingIds = getParentHeadingIds(headingId);
    parentHeadingIds.forEach(parentId => {
      const parentHeading = document.getElementById(parentId);
      if (parentHeading) {
        parentHeading.dataset.childHovered = 'true';
      }
    });
  };

  const handleMouseLeave = () => {
    // Unhighlight this heading's own bookmark icon
    if (headingRef.current) {
      headingRef.current.dataset.childHovered = 'false';
    }
    // Unhighlight parent heading bookmark icons
    const parentHeadingIds = getParentHeadingIds(headingId);
    parentHeadingIds.forEach(parentId => {
      const parentHeading = document.getElementById(parentId);
      if (parentHeading) {
        parentHeading.dataset.childHovered = 'false';
      }
    });
  };

  // Handle click on the heading itself (not just the button)
  const handleHeadingClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on the button (it has its own handler)
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    handleBookmarkClick(e);
  };

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

// Footnote reference component (the superscript number in the text)
// Note: remark-gfm already wraps this in <sup>, so we don't add another wrapper
const FootnoteRef = ({ targetId, uniqueId, children }: { targetId?: string; uniqueId?: string; children: React.ReactNode }) => {
  // targetId is the footnote number to link to (e.g., "8" links to fn-8)
  const footnoteId = targetId || getTextContent(children);
  // Use the unique ID from remark-gfm (handles multiple refs like fnref-19-2)
  const elementId = uniqueId || `user-content-fnref-${footnoteId}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footnoteElement = document.getElementById(`user-content-fn-${footnoteId}`) ||
                           document.getElementById(`fn-${footnoteId}`);
    if (footnoteElement) {
      footnoteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a brief highlight effect
      footnoteElement.classList.add('footnote-highlight');
      setTimeout(() => footnoteElement.classList.remove('footnote-highlight'), 2000);
    }
  };

  return (
    <a
      href={`#user-content-fn-${footnoteId}`}
      id={elementId}
      onClick={handleClick}
      className="footnote-ref text-jamun-blue hover:text-jamun-blue-dark no-underline font-medium transition-colors"
      aria-describedby={`user-content-fn-${footnoteId}`}
    >
      [{children}]
    </a>
  );
};

const components: MDXComponents = {
  // Footnote section container (wraps the list of footnotes)
  section: ({ children, ...props }) => {
    // Check if this is the footnotes section by looking for data-footnotes attribute
    const dataFootnotes = (props as { 'data-footnotes'?: boolean })['data-footnotes'];
    if (dataFootnotes) {
      return (
        <section className="footnotes-section mt-12 pt-8 border-t border-gray-200" {...props}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">References</h2>
          {children}
        </section>
      );
    }
    return <section {...props}>{children}</section>;
  },
  // Superscript - pass through (footnote ref handling is in the `a` component)
  sup: ({ children, ...props }) => {
    return <sup {...props}>{children}</sup>;
  },
  h1: ({ children }) => (
    <BookmarkableHeading level={1} className="text-3xl md:text-4xl font-semibold text-gray-900 mt-10 mb-6 first:mt-0">
      {children}
    </BookmarkableHeading>
  ),
  h2: ({ children }) => (
    <BookmarkableHeading level={2} className="text-2xl md:text-3xl font-semibold text-gray-900 mt-10 mb-4">
      {children}
    </BookmarkableHeading>
  ),
  h3: ({ children }) => (
    <BookmarkableHeading level={3} className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">
      {children}
    </BookmarkableHeading>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => {
    const textContent = getTextContent(children);
    const markerType = getSubPointMarkerType(textContent);

    if (markerType) {
      return <SubpointParagraph markerType={markerType}>{children}</SubpointParagraph>;
    }

    return (
      <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
    );
  },
  a: ({ href, children, id, ...props }) => {
    // Check if this is a footnote reference (remark-gfm puts data-footnote-ref on the <a>)
    // Structure: <sup><a data-footnote-ref href="#user-content-fn-N" id="user-content-fnref-N">N</a></sup>
    // Note: For multiple refs to same footnote, remark-gfm appends -2, -3 etc. to id (e.g., fnref-19-2)
    if ((props as { 'data-footnote-ref'?: boolean })['data-footnote-ref']) {
      // Extract footnote ID from href for the target link (e.g., "#user-content-fn-8" -> "8")
      const footnoteId = href?.replace('#user-content-fn-', '') || getTextContent(children);
      // Preserve the ORIGINAL unique id from remark-gfm (handles multiple refs like fnref-19-2)
      const originalId = (id as string) || `user-content-fnref-${footnoteId}`;
      // Display the sequential number from remark-gfm (matches list position), not the original label
      const displayNumber = getTextContent(children);
      return <FootnoteRef targetId={footnoteId} uniqueId={originalId}>{displayNumber}</FootnoteRef>;
    }

    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-jamun-blue hover:text-jamun-blue-dark underline decoration-jamun-blue/30 hover:decoration-jamun-blue transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-jamun-blue hover:text-jamun-blue-dark underline decoration-jamun-blue/30 hover:decoration-jamun-blue transition-colors"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    // Check if this is a footnote item (has id starting with "user-content-fn-")
    const id = (props as { id?: string }).id;
    if (id && id.startsWith('user-content-fn-')) {
      const footnoteId = id.replace('user-content-fn-', '');
      // Recursively filter out the existing backref links from remark-gfm
      // The backref is nested inside <p> tags with data-footnote-backref attribute
      const filteredChildren = filterFootnoteBackrefs(children);

      // Create the backref link
      const backrefLink = (
        <a
          key="backref"
          href={`#user-content-fnref-${footnoteId}`}
          onClick={(e) => {
            e.preventDefault();
            const refElement = document.getElementById(`user-content-fnref-${footnoteId}`);
            if (refElement) {
              refElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="footnote-backref text-jamun-blue hover:text-jamun-blue-dark no-underline ml-1"
          aria-label="Back to content"
        >
          ↩
        </a>
      );

      // Append backref to the last paragraph's content (inline)
      const appendBackrefToChildren = (node: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(node)) {
          return node;
        }
        const element = node as React.ReactElement<{ children?: React.ReactNode }>;
        const childArray = React.Children.toArray(element.props.children);
        // If this is a paragraph, append the backref at the end
        if (element.type === 'p' || (typeof element.type === 'function' && (element.type as { name?: string }).name === 'p')) {
          return React.cloneElement(element, {}, ...childArray, backrefLink);
        }
        // Otherwise, recursively check the last child
        if (childArray.length > 0) {
          const lastIndex = childArray.length - 1;
          const lastChild = childArray[lastIndex];
          if (React.isValidElement(lastChild)) {
            const updatedLast = appendBackrefToChildren(lastChild);
            return React.cloneElement(element, {}, ...childArray.slice(0, lastIndex), updatedLast);
          }
        }
        return node;
      };

      // Try to append backref inline; if children is an array, process the last element
      let contentWithBackref: React.ReactNode;
      const childArray = React.Children.toArray(filteredChildren);
      if (childArray.length > 0) {
        const lastIndex = childArray.length - 1;
        const lastChild = childArray[lastIndex];
        if (React.isValidElement(lastChild)) {
          const updatedLast = appendBackrefToChildren(lastChild);
          contentWithBackref = [...childArray.slice(0, lastIndex), updatedLast];
        } else {
          // Last child is text, just append backref after
          contentWithBackref = <>{filteredChildren}{backrefLink}</>;
        }
      } else {
        contentWithBackref = <>{filteredChildren}{backrefLink}</>;
      }

      return (
        <li
          id={id}
          className="leading-relaxed footnote-item text-sm text-gray-600 py-2 px-3 rounded-lg transition-colors"
        >
          {contentWithBackref}
        </li>
      );
    }
    return <li className="leading-relaxed">{children}</li>;
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-jamun-blue/30 pl-6 pr-4 py-4 my-6 bg-jamun-blue/5 rounded-r-lg text-gray-700 italic [&_p]:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-gray-200 my-10" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-4 py-2 text-gray-700">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image
          src={src || ""}
          alt={alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-3">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

// Custom components for blog posts
const Callout = ({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success" | "tip";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-jamun-blue/10 border-jamun-blue/30 text-jamun-blue",
    warning: "bg-amber-50 border-amber-300 text-amber-800",
    success: "bg-emerald-50 border-emerald-300 text-emerald-800",
    tip: "bg-purple-50 border-purple-300 text-purple-800",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    success: "✅",
    tip: "💫",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg my-6 ${styles[type]}`}
    >
      <div className="flex gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const ImageGallery = ({
  images,
}: {
  images: { src: string; alt: string }[];
}) => (
  <div className="grid grid-cols-2 gap-4 my-8">
    {images.map((image, index) => (
      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
    ))}
  </div>
);

// Continuation component for text that belongs to the previous subpoint's PARENT
// Usage in MDX: <Continuation>If admitted, the record may be read...</Continuation>
// The continuation appears after all children of a section and belongs to that parent section
const Continuation = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [level, setLevel] = useState(1);
  const [parentElement, setParentElement] = useState<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const container = el.parentElement;
    if (!container) return;

    // Calculate the level by finding the parent section this continuation belongs to
    const calculateLevel = () => {
      const allSubpoints = Array.from(container.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];

      if (allSubpoints.length === 0) return;

      // Recalculate hierarchy levels
      const hierarchyLevels = calculateHierarchyLevels(allSubpoints);

      // Find the previous subpoint (the last child of the parent section)
      let prevSibling = el.previousElementSibling;
      while (prevSibling) {
        if (prevSibling.classList.contains('subpoint-paragraph')) {
          const prevLevel = hierarchyLevels.get(prevSibling as HTMLParagraphElement) || 1;

          // The continuation belongs to the PARENT of the previous subpoint
          // So we need to find the parent and use its level
          // Walk backwards to find an element with level < prevLevel
          let parentLvl = prevLevel;
          let parentEl: HTMLParagraphElement | null = null;

          const prevIndex = allSubpoints.indexOf(prevSibling as HTMLParagraphElement);
          for (let i = prevIndex - 1; i >= 0; i--) {
            const candidateLevel = hierarchyLevels.get(allSubpoints[i]) || 1;
            if (candidateLevel < prevLevel) {
              parentLvl = candidateLevel;
              parentEl = allSubpoints[i];
              break;
            }
          }

          // If we found a parent, use its level; otherwise the previous element IS the parent
          if (parentEl) {
            setLevel(parentLvl);
            el.dataset.subpointLevel = String(parentLvl);
            setParentElement(parentEl);
            el.dataset.parentSubpointId = parentEl.dataset.subpointId || '';
          } else {
            // No parent found - the previous element is a top-level item
            // Use its level and treat IT as the parent
            setLevel(prevLevel);
            el.dataset.subpointLevel = String(prevLevel);
            setParentElement(prevSibling as HTMLParagraphElement);
            el.dataset.parentSubpointId = (prevSibling as HTMLParagraphElement).dataset.subpointId || '';
          }

          el.dataset.isContinuation = 'true';
          return;
        }
        // Also check for other continuation elements to chain them
        if (prevSibling.classList.contains('subpoint-continuation')) {
          const prevLevel = parseInt(prevSibling.getAttribute('data-subpoint-level') || '1', 10);
          setLevel(prevLevel);
          el.dataset.subpointLevel = String(prevLevel);
          el.dataset.isContinuation = 'true';
          // Find the parent element from the previous continuation
          const pid = (prevSibling as HTMLElement).dataset.parentSubpointId;
          if (pid) {
            el.dataset.parentSubpointId = pid;
            const pEl = container.querySelector(`[data-subpoint-id="${pid}"]`) as HTMLParagraphElement;
            if (pEl) setParentElement(pEl);
          }
          return;
        }
        prevSibling = prevSibling.previousElementSibling;
      }
    };

    // Run immediately
    calculateLevel();

    // Also run after a brief delay to ensure parent IDs are set
    const timeoutId = setTimeout(calculateLevel, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  // Hover handlers - trigger parent's hover state
  const handleMouseEnter = () => {
    if (parentElement) {
      parentElement.dataset.childHovered = 'true';
    }
  };

  const handleMouseLeave = () => {
    if (parentElement) {
      parentElement.dataset.childHovered = 'false';
    }
  };

  // Click handler - trigger parent's click
  const handleClick = () => {
    if (parentElement) {
      parentElement.click();
    }
  };

  return (
    <p
      ref={ref}
      className="text-gray-700 leading-relaxed subpoint-continuation cursor-pointer"
      data-subpoint-level={level}
      data-is-continuation="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </p>
  );
};

// Export named components for direct imports
export { Callout, ImageGallery, Continuation };

// Combined components object including custom components for MDXRemote
const MDXComponents = {
  ...components,
  Callout,
  ImageGallery,
  Continuation,
};

export default MDXComponents;
