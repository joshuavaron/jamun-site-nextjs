/**
 * AI Client Helpers for Position Paper Writer
 *
 * Client-side helpers for calling the Cloudflare Workers AI endpoints.
 * Supports 4 AI modes per PP-Writer.md:
 * - Mode 1: Filter bookmarks by category (local, no AI)
 * - Mode 2: Summarize selected bookmarks
 * - Mode 3: Check idea against research
 * - Mode 4: Draft conclusion from sections
 *
 * Plus the original polish-text functionality.
 */

import type { ClassifiedBookmark, BookmarkCategory } from "./types";

// =============================================================================
// TYPES
// =============================================================================

export type AITransformType =
  | "bullets-to-paragraph"
  | "expand-sentence"
  | "formalize"
  | "combine-solutions";

export interface PaperContext {
  country: string;
  committee: string;
  topic: string;
}

/**
 * Prior context from earlier sections that helps the AI
 * understand what the student has already written.
 */
export interface PriorContext {
  whyImportant?: string;
  keyEvents?: string;
  countryPosition?: string;
  pastActions?: string;
  proposedSolutions?: string;
  /** Bookmarked sections from background guides - key topics to reference */
  backgroundGuideTopics?: string[];
  /** Actual content from bookmarked background guide sections */
  backgroundGuideContent?: string;
}

export interface PolishOptions {
  text: string;
  context: PaperContext;
  transformType: AITransformType;
  /** Prior answers from previous sections for better context */
  priorContext?: PriorContext;
  /** Target layer determines expected output length */
  targetLayer?: "ideaFormation" | "paragraphComponents";
}

export interface PolishResult {
  success: boolean;
  polishedText: string;
  error?: string;
}

// Mode 2: Summarize bookmarks
export interface SummarizeBookmarksResult {
  success: boolean;
  summary: string;
  error?: string;
}

// Mode 3: Check idea
export interface CheckIdeaResult {
  success: boolean;
  matchingBookmarks: Array<{
    bookmark: ClassifiedBookmark;
    explanation: string;
  }>;
  suggestions: string;
  error?: string;
}

// Mode 4: Draft conclusion
export interface DraftConclusionResult {
  success: boolean;
  draft: string;
  error?: string;
}

// Classify bookmark
export interface ClassifyBookmarkResult {
  success: boolean;
  category: BookmarkCategory;
  confidence: number;
  error?: string;
}

// =============================================================================
// MODE 1: CLASSIFY BOOKMARK (with AI fallback)
// =============================================================================

/**
 * Classify a bookmark using the AI endpoint.
 * This is used as a fallback when local regex classification fails.
 *
 * @param text - The bookmark text to classify
 * @returns Classification result with category and confidence
 */
export async function classifyBookmarkAI(
  text: string
): Promise<ClassifyBookmarkResult> {
  if (!text.trim()) {
    return {
      success: true,
      category: "other",
      confidence: 0,
    };
  }

  try {
    const response = await fetch("/api/classify-bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          category: "other",
          confidence: 0,
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        category: "other",
        confidence: 0,
        error: (errorData as { error?: string }).error || "Classification failed",
      };
    }

    const data = (await response.json()) as {
      category: BookmarkCategory;
      confidence: number;
      error?: string;
    };

    return {
      success: true,
      category: data.category || "other",
      confidence: data.confidence || 0,
    };
  } catch (error) {
    console.error("[AI Classify] Network error:", error);
    return {
      success: false,
      category: "other",
      confidence: 0,
      error: "Network error",
    };
  }
}

// =============================================================================
// MODE 2: SUMMARIZE BOOKMARKS
// =============================================================================

/**
 * Summarize 1+ selected bookmarks into 1-2 casual sentences.
 * Per PP-Writer.md: "Help them see the connection, don't write their paper for them"
 *
 * @param bookmarks - Array of bookmarks to summarize (need at least 1)
 * @param context - Optional paper context for better relevance
 * @returns Summary result
 */
export async function summarizeBookmarks(
  bookmarks: ClassifiedBookmark[],
  context?: PaperContext
): Promise<SummarizeBookmarksResult> {
  if (!bookmarks || bookmarks.length < 1) {
    return {
      success: false,
      summary: "",
      error: "Need at least 1 bookmark to summarize",
    };
  }

  try {
    const response = await fetch("/api/summarize-bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookmarks: bookmarks.map((b) => ({
          content: b.content,
          text: b.content, // API accepts either
          category: b.category,
        })),
        context,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          summary: "",
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        summary: "",
        error: (errorData as { error?: string }).error || "Summarization failed",
      };
    }

    const data = (await response.json()) as { summary: string; error?: string };

    if (data.summary?.trim()) {
      return {
        success: true,
        summary: data.summary,
      };
    }

    return {
      success: false,
      summary: "",
      error: data.error || "Empty response from AI",
    };
  } catch (error) {
    console.error("[AI Summarize] Network error:", error);
    return {
      success: false,
      summary: "",
      error: "Network error",
    };
  }
}

// =============================================================================
// MODE 3: CHECK IDEA AGAINST RESEARCH
// =============================================================================

/**
 * Comprehension answers from Layer 4 that provide research context
 */
export interface ComprehensionAnswers {
  keyStatistics?: string;
  presentState?: string;
  pastPositions?: string;
  countryInterests?: string;
}

/**
 * Check if a student's idea is supported by their bookmarked research.
 * Per PP-Writer.md: Returns matching bookmarks + suggestions
 *
 * @param idea - The student's idea to check
 * @param bookmarks - All their classified bookmarks
 * @param comprehensionAnswers - Optional L4 comprehension answers for additional context
 * @returns Matching bookmarks with explanations and suggestions
 */
export async function checkIdeaAgainstBookmarks(
  idea: string,
  bookmarks: ClassifiedBookmark[],
  comprehensionAnswers?: ComprehensionAnswers
): Promise<CheckIdeaResult> {
  if (!idea?.trim()) {
    return {
      success: false,
      matchingBookmarks: [],
      suggestions: "",
      error: "No idea provided",
    };
  }

  if (!bookmarks || bookmarks.length === 0) {
    return {
      success: false,
      matchingBookmarks: [],
      suggestions: "Try bookmarking some research from the background guide first!",
      error: "No bookmarks to check against",
    };
  }

  try {
    const response = await fetch("/api/check-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idea,
        bookmarks: bookmarks.map((b) => ({
          id: b.id,
          content: b.content,
          text: b.content,
          category: b.category,
        })),
        comprehensionAnswers,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          matchingBookmarks: [],
          suggestions: "",
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        matchingBookmarks: [],
        suggestions: "",
        error: (errorData as { error?: string }).error || "Idea checking failed",
      };
    }

    const data = (await response.json()) as {
      matchingBookmarks: Array<{
        bookmark: { id?: string; content?: string; category?: BookmarkCategory };
        explanation: string;
      }>;
      suggestions: string;
      error?: string;
    };

    // Map the response back to our ClassifiedBookmark type
    const matchingWithFullBookmarks = (data.matchingBookmarks || [])
      .map((match) => {
        // Find the original bookmark by matching content
        const originalBookmark = bookmarks.find(
          (b) =>
            b.id === match.bookmark?.id ||
            b.content === match.bookmark?.content
        );
        if (originalBookmark) {
          return {
            bookmark: originalBookmark,
            explanation: match.explanation,
          };
        }
        return null;
      })
      .filter(Boolean) as CheckIdeaResult["matchingBookmarks"];

    return {
      success: true,
      matchingBookmarks: matchingWithFullBookmarks,
      suggestions: data.suggestions || "",
    };
  } catch (error) {
    console.error("[AI Check Idea] Network error:", error);
    return {
      success: false,
      matchingBookmarks: [],
      suggestions: "",
      error: "Network error",
    };
  }
}

// =============================================================================
// MODE 4: DRAFT CONCLUSION
// =============================================================================

/**
 * Draft a 2-3 sentence conclusion from completed sections.
 * Per PP-Writer.md: "Use their words where possible. Keep their voice."
 *
 * @param sections - The completed paper sections
 * @param context - Optional paper context
 * @returns Draft conclusion
 */
export async function draftConclusion(
  sections: {
    backgroundFacts?: string;
    positionStatement?: string;
    solutionProposal?: string;
  },
  context?: PaperContext
): Promise<DraftConclusionResult> {
  const hasContent =
    sections.backgroundFacts?.trim() ||
    sections.positionStatement?.trim() ||
    sections.solutionProposal?.trim();

  if (!hasContent) {
    return {
      success: false,
      draft: "",
      error: "Need at least one completed section to draft conclusion",
    };
  }

  try {
    const response = await fetch("/api/draft-conclusion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sections,
        context,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          draft: "",
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        draft: "",
        error: (errorData as { error?: string }).error || "Conclusion drafting failed",
      };
    }

    const data = (await response.json()) as { draft: string; error?: string };

    if (data.draft?.trim()) {
      return {
        success: true,
        draft: data.draft,
      };
    }

    return {
      success: false,
      draft: "",
      error: data.error || "Empty response from AI",
    };
  } catch (error) {
    console.error("[AI Draft Conclusion] Network error:", error);
    return {
      success: false,
      draft: "",
      error: "Network error",
    };
  }
}

// =============================================================================
// ORIGINAL POLISH TEXT FUNCTIONALITY
// =============================================================================

/**
 * Call the AI polish endpoint to improve text.
 * Returns the original text on failure (graceful degradation).
 *
 * @param options - The text, context, and transform type
 * @returns The polished text or original on failure
 */
export async function polishText(options: PolishOptions): Promise<PolishResult> {
  const { text, context, transformType, priorContext, targetLayer } = options;

  // Don't call API for empty text
  if (!text.trim()) {
    return { success: true, polishedText: text };
  }

  // Validate context
  if (!context.country || !context.committee || !context.topic) {
    return {
      success: false,
      polishedText: text,
      error: "Missing paper context",
    };
  }

  try {
    console.log("[AI Polish] Calling /api/polish-text with:", {
      transformType,
      textLength: text.length,
      context,
    });

    const response = await fetch("/api/polish-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        context,
        transformType,
        priorContext,
        targetLayer,
      }),
    });

    console.log("[AI Polish] Response status:", response.status);

    if (!response.ok) {
      // Handle rate limiting specially
      if (response.status === 429) {
        console.warn("[AI Polish] Rate limited");
        return {
          success: false,
          polishedText: text,
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }

      // Other errors - return original text
      const errorData = await response.json().catch(() => ({}));
      console.error("[AI Polish] Error response:", errorData);
      return {
        success: false,
        polishedText: text,
        error: (errorData as { error?: string }).error || "AI processing failed",
      };
    }

    const data = (await response.json()) as {
      polishedText: string;
      error?: string;
    };
    console.log("[AI Polish] Success response:", {
      polishedTextLength: data.polishedText?.length,
      error: data.error,
    });

    // If we got polished text, use it; otherwise fall back to original
    if (data.polishedText?.trim()) {
      return {
        success: true,
        polishedText: data.polishedText,
      };
    }

    return {
      success: false,
      polishedText: text,
      error: data.error || "Empty response from AI",
    };
  } catch (error) {
    // Network errors, etc. - return original text
    console.error("[AI Polish] Network error:", error);
    return {
      success: false,
      polishedText: text,
      error: "Network error",
    };
  }
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Map from question transform types to AI transform types.
 * Not all transforms need AI - this maps those that do.
 */
export function mapToAITransform(
  localTransform: string | undefined,
  isMultiSource: boolean
): AITransformType | null {
  // Bullet transforms should use AI to create better paragraphs
  if (localTransform === "bullets-to-text") {
    return "bullets-to-paragraph";
  }

  // Solution combining should use AI for better flow
  if (localTransform === "combine-solutions" || isMultiSource) {
    return "combine-solutions";
  }

  // Sentence combining benefits from AI formalization
  if (localTransform === "combine-sentences") {
    return "formalize";
  }

  // Direct copies should still be polished by AI to turn casual ideas into focused sentences
  // This is the key transform for Layer 3 -> Layer 2
  if (!localTransform || localTransform === "direct") {
    return "formalize";
  }

  return null;
}

/**
 * Check if AI polishing is available (basic check).
 * In production, this would check if we're on Cloudflare.
 */
export function isAIAvailable(): boolean {
  // AI is available when running on Cloudflare Pages
  // In development, the endpoint won't exist
  return typeof window !== "undefined";
}
