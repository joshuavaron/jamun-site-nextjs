/**
 * Subpoint Storage Utilities
 *
 * LocalStorage persistence for subpoint selections and heading bookmarks.
 * Handles save/load with error handling for SSR and storage quota.
 *
 * Storage keys:
 * - `subpoint-selections:{pathname}` - Selected subpoint IDs
 * - `heading-bookmarks:{pathname}` - Bookmarked heading IDs
 *
 * Used by: SubpointParagraph, BookmarkableHeading, ResourceNavSidebar
 */

// --- Subpoint Selections ---

function getSelectionsStorageKey(pathname: string): string {
  return `subpoint-selections:${pathname}`;
}

/**
 * Load selected subpoint IDs from localStorage
 */
export function loadSelections(pathname: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(getSelectionsStorageKey(pathname));
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch {
    // Ignore localStorage errors (quota, parsing, etc.)
  }
  return new Set();
}

/**
 * Save selected subpoint IDs to localStorage
 */
export function saveSelections(pathname: string, selections: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    const key = getSelectionsStorageKey(pathname);
    if (selections.size === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify([...selections]));
    }
  } catch {
    // Ignore localStorage errors
  }
}

// --- Heading Bookmarks ---

function getBookmarksStorageKey(pathname: string): string {
  return `heading-bookmarks:${pathname}`;
}

/**
 * Load bookmarked heading IDs from localStorage
 */
export function loadBookmarks(pathname: string): Set<string> {
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

/**
 * Save bookmarked heading IDs to localStorage
 */
export function saveBookmarks(pathname: string, bookmarks: Set<string>): void {
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
