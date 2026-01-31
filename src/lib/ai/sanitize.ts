/**
 * Input Sanitization Helpers for AI API Routes
 *
 * Provides text sanitization and prompt-injection detection
 * ported from the original Cloudflare Workers.
 */

/**
 * Sanitize user input by trimming whitespace, removing common
 * LLM prompt-injection markers, and limiting length.
 *
 * @param input - Raw user input
 * @param maxLength - Maximum character length (default: 10000)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, maxLength: number = 10_000): string {
  return (input || "")
    .trim()
    .replace(/\[INST\]/gi, "")
    .replace(/\[\/INST\]/gi, "")
    .replace(/<\|.*?\|>/g, "")
    .replace(/<<SYS>>/gi, "")
    .replace(/<<\/SYS>>/gi, "")
    .slice(0, maxLength);
}

/**
 * Detect common prompt-injection patterns in text.
 *
 * Returns true if the text appears to be attempting to override
 * system instructions. Patterns sourced from the original Workers.
 *
 * @param text - Text to check
 * @returns true if an injection attempt is detected
 */
export function detectsInjectionAttempt(text: string): boolean {
  const injectionPatterns: RegExp[] = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /disregard\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /forget\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /new\s+instructions?:/i,
    /you\s+are\s+now\s+a/i,
    /pretend\s+(you\s+are|to\s+be)/i,
    /act\s+as\s+(if|a)/i,
    /from\s+now\s+on,?\s+you/i,
    /instead,?\s+(please\s+)?give\s+me/i,
    /actually,?\s+(please\s+)?(just\s+)?give\s+me/i,
    /do\s+not\s+follow\s+the\s+(above|previous)/i,
    /override\s+(the\s+)?(system|instructions)/i,
    /system\s*prompt/i,
    /jailbreak/i,
    /dan\s+mode/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(text)) {
      return true;
    }
  }

  return false;
}
