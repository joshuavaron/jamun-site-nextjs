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

function buildPrompt(text, context, transformType, priorContext, targetLayer) {
  const { country, committee, topic } = context;

  // Determine length guidance based on target layer
  // Layer 2 (paragraphComponents): 1 sentence per field - these are individual sentence components
  // Layer 3 (ideaFormation): 1-2 sentences per field - casual ideas
  const lengthGuidance = targetLayer === "paragraphComponents"
    ? "IMPORTANT: Output exactly ONE polished sentence. No more than one sentence."
    : "Keep it to 1-2 casual sentences maximum.";

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
    if (priorContext.backgroundGuideTopics && priorContext.backgroundGuideTopics.length > 0) {
      contextParts.push(`Key topics from background guide: ${priorContext.backgroundGuideTopics.join(", ")}`);
    }
    if (priorContext.backgroundGuideContent) {
      contextParts.push(`\nReference material from background guide:\n${priorContext.backgroundGuideContent}`);
    }
    if (contextParts.length > 0) {
      contextSection = `\nBackground information the student has provided:\n${contextParts.join("\n")}\n\nIMPORTANT: Only use facts, statistics, and information from this background. Do NOT make up or invent any statistics or facts.\n`;
    }
  }

  // For Layer 2 (paragraphComponents), we need to focus scattered ideas into clear, readable sentences
  // Still conversational and student-like, just more focused and complete
  const isPolishingForFinalPaper = targetLayer === "paragraphComponents";

  const prompts = {
    "bullets-to-paragraph": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear, direct, and engaging.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
Turn these bullet points into ${isPolishingForFinalPaper ? "one clear, focused sentence" : "a short, readable paragraph"}:
${text}

${lengthGuidance} Keep it conversational but focused. Output ONLY the text. No quotes, no preamble.`,

    "expand-sentence": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear, direct, and engaging.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
${isPolishingForFinalPaper ? "Rewrite this scattered idea as one clear, focused sentence" : "Expand this with a bit more detail"}:
${text}

${lengthGuidance} Keep it conversational but focused. Output ONLY the text. No quotes, no preamble.`,

    formalize: `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear, direct, and engaging.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
${isPolishingForFinalPaper ? "Take this casual idea and turn it into one clear, complete sentence" : "Polish this text to sound a bit more put-together while keeping it readable"}:
${text}

${lengthGuidance} Keep it conversational but focused. Output ONLY the text. No quotes, no preamble.`,

    "combine-solutions": `You are helping a middle school student write a Model UN position paper. Write like a smart 7th grader would - clear, direct, and engaging.

Country: ${country}
Committee: ${committee}
Topic: ${topic}
${contextSection}
${isPolishingForFinalPaper ? "Combine these into one clear sentence about the proposed solution" : "Combine these solutions into one smooth paragraph"}:
${text}

${lengthGuidance} Keep it conversational but focused. Output ONLY the text. No quotes, no preamble.`,
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
    const { text, context: paperContext, transformType, priorContext, targetLayer } = body;

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
    const prompt = buildPrompt(text, paperContext, transformType, priorContext || {}, targetLayer);

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
