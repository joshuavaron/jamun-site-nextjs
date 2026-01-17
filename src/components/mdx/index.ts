/**
 * MDX Components Module
 *
 * File Structure:
 * - MDXComponents.tsx: Main export combining all renderers
 * - subpoint-helpers.ts: Hierarchy calculation utilities
 * - subpoint-storage.ts: LocalStorage persistence
 * - SubpointParagraph.tsx: Selectable paragraph component
 * - BookmarkableHeading.tsx: Bookmarkable heading component
 * - CustomComponents.tsx: Callout, ImageGallery, Continuation
 * - mdx-renderers.tsx: Base element renderers
 */

export { default as MDXComponents } from "./MDXComponents";
export { Callout, ImageGallery, Continuation } from "./CustomComponents";
export { SELECTION_CHANGE_EVENT, getTextContent } from "./subpoint-helpers";
export { loadSelections, loadBookmarks } from "./subpoint-storage";
