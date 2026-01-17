/**
 * Cloudflare Pages Function for Conclusion Drafting (Mode 4)
 *
 * Generates a 2-3 sentence conclusion draft from completed sections.
 * Per PP-Writer.md: "Use their words where possible. Keep their voice."
 */

// Rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 15;
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

function buildPrompt(sections, context) {
  const { country, topic } = context || {};

  const { backgroundFacts, positionStatement, solutionProposal } = sections;

  return `A student wrote these sections of their Model UN position paper:

**Country:** ${country || "Their country"}
**Topic:** ${topic || "The topic"}

**Key Facts from Background:**
${backgroundFacts?.slice(0, 600) || "[not provided]"}

**Position Statement:**
${positionStatement?.slice(0, 400) || "[not provided]"}

**Solution Proposal:**
${solutionProposal?.slice(0, 400) || "[not provided]"}

Write a brief 2-3 sentence conclusion that summarizes these points.
Use their words where possible. Keep their voice—don't make it sound fancy or overly formal.
Write like a confident middle schooler would.

Output ONLY the conclusion text. No quotes, no labels, no "Here's the conclusion:".`;
}

export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = context.request.headers.get("CF-Connecting-IP") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: "Rate limit exceeded. Please wait a moment.", draft: "" },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await context.request.json();
    const { sections, context: paperContext } = body;

    if (!sections) {
      return Response.json(
        { error: "No sections provided", draft: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check that we have at least some content to work with
    const hasContent = sections.backgroundFacts?.trim() ||
                       sections.positionStatement?.trim() ||
                       sections.solutionProposal?.trim();

    if (!hasContent) {
      return Response.json(
        { error: "Need at least one completed section to draft conclusion", draft: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    const prompt = buildPrompt(sections, paperContext);

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 250,
    });

    let draft = result.response?.trim() || "";

    // Clean up common response artifacts
    if ((draft.startsWith('"') && draft.endsWith('"')) ||
        (draft.startsWith("'") && draft.endsWith("'"))) {
      draft = draft.slice(1, -1).trim();
    }

    // Remove preambles
    const preambles = [
      /^Here['']?s (?:a |the |your )?(?:conclusion|draft)[:\s]*/i,
      /^(?:The |Your )?conclusion[:\s]*/i,
      /^Sure[,!]?\s*/i,
      /^Okay[,!]?\s*/i,
    ];
    for (const pattern of preambles) {
      draft = draft.replace(pattern, "");
    }

    // Clean up again after removing preambles
    if ((draft.startsWith('"') && draft.endsWith('"')) ||
        (draft.startsWith("'") && draft.endsWith("'"))) {
      draft = draft.slice(1, -1).trim();
    }

    return Response.json(
      { draft },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Draft conclusion error:", error);
    return Response.json(
      { error: "Conclusion drafting failed", draft: "" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
