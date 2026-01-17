/**
 * Subpoint Hierarchy Helpers
 *
 * Pure utility functions for calculating hierarchical relationships between
 * legal-style subpoints (e.g., (a), (1), (i), (A)) in MDX content.
 *
 * Used by: SubpointParagraph, Continuation components
 * Related: subpoint-storage.ts for persistence
 */

import React from "react";

// Custom event names for subpoint selection system
export const DESELECT_EVENT = "subpoint-deselect";
export const SELECTION_CHANGE_EVENT = "selection-change";

export interface DeselectEventDetail {
  parentId: string;
  childIds: string[];
}

/**
 * Extract text content from React children for pattern detection
 */
export function getTextContent(children: React.ReactNode): string {
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

/**
 * Extract the marker from subpoint text (e.g., "a" from "(a) Some text")
 */
export function extractMarker(text: string): string | null {
  const match = text.match(/^\*?\*?\(([a-zA-Z]+|\d+|i{1,3}|iv|vi{0,3}|ix|x)\)\*?\*?\s/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Detect if text is a legal-style sub-point and extract its marker type
 * Returns: 'roman' | 'lower' | 'number' | 'upper' | null
 */
export function getSubPointMarkerType(text: string): string | null {
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

/**
 * Check if a marker represents a "first" item in its series (resets hierarchy)
 */
export function isFirstInSeries(text: string): boolean {
  return /^\*?\*?\((?:a|1|A|i)\)\*?\*?\s/.test(text);
}

/**
 * Check if there's a heading between two elements
 */
export function hasHeadingBetween(el1: Element, el2: Element): boolean {
  let sibling = el1.nextElementSibling;
  while (sibling && sibling !== el2) {
    if (sibling.tagName.match(/^H[1-4]$/)) {
      return true;
    }
    sibling = sibling.nextElementSibling;
  }
  return false;
}

/**
 * Calculate hierarchy levels for all subpoints in a container
 * Returns Map of element -> level number
 */
export function calculateHierarchyLevels(allSubpoints: HTMLParagraphElement[]): Map<HTMLParagraphElement, number> {
  const levels = new Map<HTMLParagraphElement, number>();
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

    // Reset stack if there's a heading between elements (new section)
    if (prevElement && hasHeadingBetween(prevElement, el)) {
      markerTypeStack = [];
    }

    const isFirst = isFirstInSeries(text);
    const existingIndex = markerTypeStack.indexOf(markerType);

    if (existingIndex !== -1) {
      if (isFirst) {
        markerTypeStack.length = existingIndex + 1;
      }
      levels.set(el, existingIndex + 1);
    } else {
      markerTypeStack.push(markerType);
      levels.set(el, markerTypeStack.length);
    }

    prevElement = el;
  }

  return levels;
}

/**
 * Find parent subpoints (elements with lower level that come before this one)
 */
export function getParentSubpoints(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): HTMLParagraphElement[] {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const parents: HTMLParagraphElement[] = [];

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

/**
 * Find child subpoints (elements with higher level that come after, until same or lower level)
 */
export function getChildSubpoints(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): HTMLParagraphElement[] {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const children: HTMLParagraphElement[] = [];

  for (let i = myIndex + 1; i < allSubpoints.length; i++) {
    const candidateLevel = parseInt(allSubpoints[i].dataset.subpointLevel || "0", 10);
    if (candidateLevel <= myLevel) {
      break;
    }
    children.push(allSubpoints[i]);
  }

  return children;
}

/**
 * Generate a unique ID for a subpoint based on its hierarchy path
 */
export function generateSubpointId(el: HTMLParagraphElement, allSubpoints: HTMLParagraphElement[]): string {
  const myIndex = allSubpoints.indexOf(el);
  const myLevel = parseInt(el.dataset.subpointLevel || "0", 10);
  const myMarker = el.dataset.subpointMarker || String(myIndex);

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

/**
 * Find ALL parent heading IDs for a subpoint element (from immediate parent up to h1)
 */
export function findAllParentHeadingIds(el: HTMLElement): string[] {
  const parentIds: string[] = [];
  let currentLevel = 4;

  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/) && sibling.id) {
      const headingLevel = parseInt(sibling.tagName[1]);
      if (headingLevel < currentLevel) {
        parentIds.push(sibling.id);
        currentLevel = headingLevel;
        if (headingLevel === 1) break;
      }
    }
    sibling = sibling.previousElementSibling;
  }

  return parentIds;
}

/**
 * Find all subpoints under a heading (until next heading of same or higher level)
 */
export function getSubpointsUnderHeading(headingId: string): HTMLParagraphElement[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const subpoints: HTMLParagraphElement[] = [];

  let sibling = heading.nextElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/)) {
      const sibLevel = parseInt(sibling.tagName[1]);
      if (sibLevel <= headingLevel) break;
    }
    if (sibling.classList.contains('subpoint-paragraph')) {
      subpoints.push(sibling as HTMLParagraphElement);
    }
    sibling = sibling.nextElementSibling;
  }

  return subpoints;
}

/**
 * Find all child heading IDs under a heading (until next heading of same or higher level)
 */
export function getChildHeadingIds(headingId: string): string[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const childHeadingIds: string[] = [];

  let sibling = heading.nextElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/)) {
      const sibLevel = parseInt(sibling.tagName[1]);
      if (sibLevel <= headingLevel) break;
      if (sibling.id) {
        childHeadingIds.push(sibling.id);
      }
    }
    sibling = sibling.nextElementSibling;
  }

  return childHeadingIds;
}

/**
 * Find all parent headings of a heading (from immediate parent up to h1)
 */
export function getParentHeadingIds(headingId: string): string[] {
  const heading = document.getElementById(headingId);
  if (!heading) return [];

  const headingLevel = parseInt(heading.tagName[1]);
  const parentIds: string[] = [];
  let currentLevel = headingLevel;

  let sibling = heading.previousElementSibling;
  while (sibling) {
    if (sibling.tagName.match(/^H[1-3]$/) && sibling.id) {
      const sibLevel = parseInt(sibling.tagName[1]);
      if (sibLevel < currentLevel) {
        parentIds.push(sibling.id);
        currentLevel = sibLevel;
        if (sibLevel === 1) break;
      }
    }
    sibling = sibling.previousElementSibling;
  }

  return parentIds;
}

/**
 * Recursively filter out footnote backref elements from remark-gfm
 */
export function filterFootnoteBackrefs(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const props = child.props as Record<string, unknown>;

    if (props['data-footnote-backref']) {
      return null;
    }

    if (typeof props.className === 'string' && props.className.includes('data-footnote-backref')) {
      return null;
    }

    if (props.children) {
      return React.cloneElement(child, {
        ...props,
        children: filterFootnoteBackrefs(props.children as React.ReactNode)
      } as React.Attributes);
    }

    return child;
  });
}
