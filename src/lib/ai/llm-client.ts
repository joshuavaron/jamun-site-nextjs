/**
 * Shared LLM Client for AI API Routes
 *
 * Makes OpenAI-compatible chat completion requests to a configurable
 * LLM provider (Groq, OpenRouter, etc.) via environment variables.
 *
 * Required env vars:
 * - LLM_API_KEY: API key for the provider
 * - LLM_API_URL: Base URL for chat completions endpoint
 * - LLM_MODEL: Model identifier (e.g., "llama-3.2-3b-instruct")
 */

/**
 * Check if the LLM is configured with all required environment variables.
 */
export function isLLMConfigured(): boolean {
  return !!(
    process.env.LLM_API_KEY &&
    process.env.LLM_API_URL &&
    process.env.LLM_MODEL
  );
}

/**
 * Call the configured LLM with a prompt and return the assistant's response text.
 *
 * Uses OpenAI-compatible chat completions format so it works with
 * Groq, OpenRouter, Together AI, and similar providers.
 *
 * @param prompt - The user prompt to send
 * @param maxTokens - Maximum tokens to generate (default: 500)
 * @returns The assistant's response text, or empty string on failure
 */
export async function callLLM(
  prompt: string,
  maxTokens: number = 500
): Promise<string> {
  const apiKey = process.env.LLM_API_KEY;
  const apiUrl = process.env.LLM_API_URL;
  const model = process.env.LLM_MODEL;

  if (!apiKey || !apiUrl || !model) {
    console.error("[LLM Client] Missing environment variables: LLM_API_KEY, LLM_API_URL, or LLM_MODEL");
    return "";
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(
        `[LLM Client] API error ${response.status}: ${errorText}`
      );
      return "";
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: { content?: string };
      }>;
    };

    const content = data.choices?.[0]?.message?.content?.trim() ?? "";
    return content;
  } catch (error) {
    console.error("[LLM Client] Request failed:", error);
    return "";
  }
}
