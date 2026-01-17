/**
 * AI Polish Client Helper
 *
 * Client-side helper for calling the Cloudflare Workers AI
 * polish-text API endpoint.
 */

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

export interface PolishOptions {
  text: string;
  context: PaperContext;
  transformType: AITransformType;
}

export interface PolishResult {
  success: boolean;
  polishedText: string;
  error?: string;
}

/**
 * Call the AI polish endpoint to improve text.
 * Returns the original text on failure (graceful degradation).
 *
 * @param options - The text, context, and transform type
 * @returns The polished text or original on failure
 */
export async function polishText(options: PolishOptions): Promise<PolishResult> {
  const { text, context, transformType } = options;

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
    const response = await fetch("/api/polish-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        context,
        transformType,
      }),
    });

    if (!response.ok) {
      // Handle rate limiting specially
      if (response.status === 429) {
        return {
          success: false,
          polishedText: text,
          error: "Rate limit exceeded. Please wait a moment.",
        };
      }

      // Other errors - return original text
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        polishedText: text,
        error: (errorData as { error?: string }).error || "AI processing failed",
      };
    }

    const data = (await response.json()) as { polishedText: string; error?: string };

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
    console.error("AI polish network error:", error);
    return {
      success: false,
      polishedText: text,
      error: "Network error",
    };
  }
}

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

  // Direct copies can be formalized
  if (!localTransform) {
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
