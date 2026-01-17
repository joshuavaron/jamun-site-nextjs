/**
 * Cloudflare Pages Function for AI text polishing
 *
 * Uses Workers AI (Llama 3.2 3B) to polish auto-filled text
 * in the Position Paper Writer tool.
 *
 * Free tier: 10,000 neurons/day (~100-200 requests)
 */

// Cloudflare Workers AI types
interface Ai {
  run(
    model: string,
    options: { prompt: string; max_tokens?: number }
  ): Promise<{ response: string }>;
}

interface Env {
  AI: Ai;
}

// Cloudflare Pages Function types
interface EventContext<E = Env> {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
}

type PagesFunction<E = Env> = (context: EventContext<E>) => Response | Promise<Response>;

export interface PolishRequestBody {
  text: string;
  context: {
    country: string;
    committee: string;
    topic: string;
  };
  transformType:
    | "bullets-to-paragraph"
    | "expand-sentence"
    | "formalize"
    | "combine-solutions";
}

interface PolishResponseBody {
  polishedText: string;
  error?: string;
}

// Rate limiting: track requests per IP (simple in-memory, resets on cold start)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute per IP
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function buildPrompt(
  text: string,
  context: PolishRequestBody["context"],
  transformType: PolishRequestBody["transformType"]
): string {
  const { country, committee, topic } = context;

  const prompts: Record<PolishRequestBody["transformType"], string> = {
    "bullets-to-paragraph": `You are helping a middle school student write a Model UN position paper.

Convert these bullet points into a well-written paragraph. Keep the content accurate but make it flow naturally.

Country: ${country}
Committee: ${committee}
Topic: ${topic}

Bullet points:
${text}

Write a clear, formal paragraph suitable for a Model UN position paper. Use simple but professional language appropriate for middle school students. Output only the paragraph, no explanations.`,

    "expand-sentence": `You are helping a middle school student write a Model UN position paper.

Expand this sentence into a more detailed, formal statement while keeping it accessible for middle school students.

Country: ${country}
Committee: ${committee}
Topic: ${topic}

Original sentence: "${text}"

Write an expanded version (2-3 sentences) that adds detail and context. Use formal but clear language. Output only the expanded text, no explanations.`,

    formalize: `You are helping a middle school student write a Model UN position paper.

Rewrite this text in formal diplomatic language while keeping it understandable for middle school students.

Country: ${country}
Committee: ${committee}
Topic: ${topic}

Original text: "${text}"

Rewrite in a professional tone suitable for a UN delegate. Keep it clear and accessible. Output only the rewritten text, no explanations.`,

    "combine-solutions": `You are helping a middle school student write a Model UN position paper.

These are proposed solutions from ${country}. Combine them into a cohesive paragraph that flows well.

Committee: ${committee}
Topic: ${topic}

Solutions:
${text}

Write a paragraph that presents these solutions professionally, using transitions like "First," "Additionally," and "Finally." Keep language accessible for middle school students. Output only the paragraph, no explanations.`,
  };

  return prompts[transformType];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight
  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP =
      context.request.headers.get("CF-Connecting-IP") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: "Rate limit exceeded. Please wait a moment." } as PolishResponseBody,
        { status: 429, headers: corsHeaders }
      );
    }

    // Parse request
    const body = (await context.request.json()) as PolishRequestBody;
    const { text, context: paperContext, transformType } = body;

    // Validate input
    if (!text?.trim()) {
      return Response.json(
        { error: "No text provided", polishedText: "" } as PolishResponseBody,
        { status: 400, headers: corsHeaders }
      );
    }

    if (!paperContext?.country || !paperContext?.committee || !paperContext?.topic) {
      return Response.json(
        { error: "Missing context (country, committee, or topic)", polishedText: "" } as PolishResponseBody,
        { status: 400, headers: corsHeaders }
      );
    }

    const validTransforms = [
      "bullets-to-paragraph",
      "expand-sentence",
      "formalize",
      "combine-solutions",
    ];
    if (!validTransforms.includes(transformType)) {
      return Response.json(
        { error: "Invalid transform type", polishedText: "" } as PolishResponseBody,
        { status: 400, headers: corsHeaders }
      );
    }

    // Build prompt and call AI
    const prompt = buildPrompt(text, paperContext, transformType);

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 500,
    });

    // Return polished text
    const polishedText = result.response?.trim() || text;

    return Response.json(
      { polishedText } as PolishResponseBody,
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("AI polish error:", error);

    // Return original text on error (graceful degradation)
    return Response.json(
      {
        error: "AI processing failed",
        polishedText: "",
      } as PolishResponseBody,
      { status: 500, headers: corsHeaders }
    );
  }
};
