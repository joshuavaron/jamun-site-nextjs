"use client";

/**
 * MDX Components - Main Export
 *
 * Central export for all MDX rendering components.
 * Combines base renderers with custom components for MDXRemote.
 *
 * Module Structure:
 * - subpoint-helpers.ts: Pure helper functions for hierarchy calculation
 * - subpoint-storage.ts: LocalStorage persistence for selections/bookmarks
 * - SubpointParagraph.tsx: Interactive selectable paragraph component
 * - BookmarkableHeading.tsx: Heading with bookmark functionality
 * - CustomComponents.tsx: Callout, ImageGallery, Continuation
 * - mdx-renderers.tsx: Base MDX element renderers
 *
 * Usage:
 * import MDXComponents from '@/components/mdx/MDXComponents';
 * <MDXRemote source={content} components={MDXComponents} />
 *
 * Or import specific components:
 * import { Callout, ImageGallery } from '@/components/mdx/MDXComponents';
 */

import { mdxRenderers } from "./mdx-renderers";
import { Callout, ImageGallery, Continuation } from "./CustomComponents";

// Re-export custom components for direct imports
export { Callout, ImageGallery, Continuation };

// Re-export helpers for external use (e.g., ResourceNavSidebar)
export {
  SELECTION_CHANGE_EVENT,
  getTextContent,
} from "./subpoint-helpers";

export {
  loadSelections,
  loadBookmarks,
} from "./subpoint-storage";

// Combined components object for MDXRemote
const MDXComponents = {
  ...mdxRenderers,
  Callout,
  ImageGallery,
  Continuation,
};

export default MDXComponents;
