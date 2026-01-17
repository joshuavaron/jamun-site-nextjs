/**
 * Cloudflare Pages Function for AI text polishing
 *
 * Uses Workers AI (Llama 3.2 3B) to polish auto-filled text
 * in the Position Paper Writer tool.
 *
 * Free tier: 10,000 neurons/day (~100-200 requests)
 */

// Rate limiting: track requests per IP (simple in-memory, resets on cold start)
const requestCounts = new Map();
const RATE_LIMIT = 20; // requests per minute per IP
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
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

function buildPrompt(text, context, transformType, priorContext) {
  const { country, committee, topic } = context;

  // Build context section from prior answers if provided
  let contextSection = "";
  if (priorContext && Object.keys(priorContext).length > 0) {
    const contextParts = [];
    if (priorContext.whyImportant) {
      contextParts.push(`Why this topic matters: ${priorContext.whyImportant}`);
    }
    if (priorContext.keyEvents) {
      contextParts.push(`Key events/facts: ${priorContext.keyEvents}`);
    }
    if (priorContext.countryPosition) {
      contextParts.push(`${country}'s position: ${priorContext.countryPosition}`);
    }
    if (priorContext.pastActions) {
      contextParts.push(`Past actions by ${country}: ${priorContext.pastActions}`);
    }
    if (priorContext.proposedSolutions) {
      contextParts.push(`Proposed solutions: ${priorContext.proposedSolutions}`);
    }
    if (contextParts.length > 0) {
      contextSection = `\nBackground information the student has provided:\n${contextParts.join("\n")}\n`;
    }
  }

  const prompts = {
    "bullets-to-paragraph": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear and direct, not stuffy or overly formal.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
Turn these bullet points into a short, readable paragraph:
${text}

IMPORTANT: Output ONLY the paragraph text. No quotes, no preamble like "Here's a paragraph", no explanations. Just the content itself.`,

    "expand-sentence": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear and direct, not stuffy.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
Expand this into 2-3 sentences with more detail:
${text}

IMPORTANT: Output ONLY the expanded text. No quotes, no preamble, no explanations. Just the content itself.`,

    formalize: `You are helping a middle school student write a Model UN position paper. The writing should sound confident but still like a student wrote it - not like a government document.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
Polish this text to sound a bit more professional while keeping it readable:
${text}

IMPORTANT: Output ONLY the polished text. No quotes, no preamble, no explanations. Just the content itself.`,

    "combine-solutions": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
Combine these solutions into one smooth paragraph:
${text}

IMPORTANT: Output ONLY the paragraph text. No quotes, no preamble like "Here's the combined paragraph", no explanations. Just the content itself.`,
  };

  return prompts[transformType];
}

export async function onRequestPost(context) {
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
        { error: "Rate limit exceeded. Please wait a moment." },
        { status: 429, headers: corsHeaders }
      );
    }

    // Parse request
    const body = await context.request.json();
    const { text, context: paperContext, transformType, priorContext } = body;

    // Validate input
    if (!text?.trim()) {
      return Response.json(
        { error: "No text provided", polishedText: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!paperContext?.country || !paperContext?.committee || !paperContext?.topic) {
      return Response.json(
        { error: "Missing context (country, committee, or topic)", polishedText: "" },
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
        { error: "Invalid transform type", polishedText: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Build prompt and call AI
    const prompt = buildPrompt(text, paperContext, transformType, priorContext || {});

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 500,
    });

    // Clean up the response - remove quotes and common preambles
    let polishedText = result.response?.trim() || text;

    // Remove surrounding quotes if present
    if ((polishedText.startsWith('"') && polishedText.endsWith('"')) ||
        (polishedText.startsWith("'") && polishedText.endsWith("'"))) {
      polishedText = polishedText.slice(1, -1).trim();
    }

    // Remove common preambles the model might add
    const preambles = [
      /^Here['']?s (?:a |the )?(?:paragraph|text|polished text|expanded text|combined paragraph)[:\s]*/i,
      /^(?:The )?(?:paragraph|text|polished text|expanded text) (?:is|reads)[:\s]*/i,
      /^Sure[,!]?\s*/i,
      /^Here you go[:\s]*/i,
    ];
    for (const pattern of preambles) {
      polishedText = polishedText.replace(pattern, "");
    }

    // Remove quotes again after stripping preambles
    if ((polishedText.startsWith('"') && polishedText.endsWith('"')) ||
        (polishedText.startsWith("'") && polishedText.endsWith("'"))) {
      polishedText = polishedText.slice(1, -1).trim();
    }

    return Response.json(
      { polishedText },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("AI polish error:", error);

    // Return original text on error (graceful degradation)
    return Response.json(
      {
        error: "AI processing failed",
        polishedText: "",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
