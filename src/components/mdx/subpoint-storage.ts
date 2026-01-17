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

function getBookmarkContentStorageKey(pathname: string): string {
  return `heading-bookmark-content:${pathname}`;
}

/**
 * Bookmark data with heading text and content
 */
export interface BookmarkData {
  id: string;
  headingText: string;
  content: string;
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

/**
 * Load bookmark content (heading text + content under heading)
 */
export function loadBookmarkContent(pathname: string): Map<string, BookmarkData> {
  if (typeof window === "undefined") return new Map();
  try {
    const stored = localStorage.getItem(getBookmarkContentStorageKey(pathname));
    if (stored) {
      const parsed = JSON.parse(stored) as BookmarkData[];
      return new Map(parsed.map((b) => [b.id, b]));
    }
  } catch {
    // Ignore localStorage errors
  }
  return new Map();
}

/**
 * Save bookmark content to localStorage
 */
export function saveBookmarkContent(
  pathname: string,
  content: Map<string, BookmarkData>
): void {
  if (typeof window === "undefined") return;
  try {
    const key = getBookmarkContentStorageKey(pathname);
    if (content.size === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify([...content.values()]));
    }
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Extract content under a heading element (until next heading of same or higher level)
 */
export function extractContentUnderHeading(headingId: string): string {
  if (typeof document === "undefined") return "";

  const heading = document.getElementById(headingId);
  if (!heading) return "";

  const headingLevel = parseInt(heading.tagName[1]);
  const contentParts: string[] = [];

  let sibling = heading.nextElementSibling;
  while (sibling) {
    // Stop at next heading of same or higher level
    if (/^H[1-6]$/.test(sibling.tagName)) {
      const siblingLevel = parseInt(sibling.tagName[1]);
      if (siblingLevel <= headingLevel) break;
    }

    // Get text content from paragraphs, lists, etc.
    const text = sibling.textContent?.trim();
    if (text) {
      contentParts.push(text);
    }

    sibling = sibling.nextElementSibling;
  }

  // Limit content length to avoid huge storage
  const fullContent = contentParts.join("\n\n");
  return fullContent.length > 2000
    ? fullContent.slice(0, 2000) + "..."
    : fullContent;
}
