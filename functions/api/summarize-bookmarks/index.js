/**
 * Cloudflare Pages Function for Bookmark Summarization (Mode 2)
 *
 * Summarizes 1+ selected bookmarks into 1-2 casual sentences.
 * Per PP-Writer.md: "Help them see the connection, don't write their paper for them"
 */

// Rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 20;
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

function buildPrompt(bookmarks, context) {
  const { country, committee, topic } = context || {};

  const contextLine = country && topic
    ? `\nContext: ${country} in ${committee || "their committee"} discussing "${topic}"\n`
    : "";

  const bookmarkList = bookmarks
    .map((b, i) => `${i + 1}. "${b.content?.slice(0, 500) || b.text?.slice(0, 500)}" (${b.category || "research"})`)
    .join("\n");

  // Slightly different prompt for single vs multiple bookmarks
  const isSingle = bookmarks.length === 1;
  const instruction = isSingle
    ? "Summarize this bookmark in 1-2 casual sentences that help the student understand the key point."
    : "Summarize what these bookmarks are saying together in 1-2 casual sentences. Help them see the connection.";

  return `You're helping a middle school student write a Model UN position paper.
${contextLine}
They selected ${isSingle ? "this bookmark" : "these bookmarks"} from their research:
${bookmarkList}

${instruction}
Use simple language. Don't write their paper for them.

Start with "It sounds like..." or "So basically..."

Output ONLY the summary. No quotes, no explanations.`;
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
        { error: "Rate limit exceeded. Please wait a moment.", summary: "" },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await context.request.json();
    const { bookmarks, context: paperContext } = body;

    if (!bookmarks || !Array.isArray(bookmarks) || bookmarks.length < 1) {
      return Response.json(
        { error: "Need at least 1 bookmark to summarize", summary: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Limit to 5 bookmarks to avoid token limits
    const limitedBookmarks = bookmarks.slice(0, 5);
    const prompt = buildPrompt(limitedBookmarks, paperContext);

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 200,
    });

    let summary = result.response?.trim() || "";

    // Clean up common response artifacts
    if (summary.startsWith('"') && summary.endsWith('"')) {
      summary = summary.slice(1, -1).trim();
    }

    // Remove preambles the model might add
    const preambles = [
      /^Here['']?s (?:a |the )?summary[:\s]*/i,
      /^Sure[,!]?\s*/i,
    ];
    for (const pattern of preambles) {
      summary = summary.replace(pattern, "");
    }

    // Ensure it starts with the expected phrase if it doesn't
    if (summary && !summary.toLowerCase().startsWith("it sounds like") && !summary.toLowerCase().startsWith("so basically")) {
      summary = "So basically, " + summary.charAt(0).toLowerCase() + summary.slice(1);
    }

    return Response.json(
      { summary },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Summarize bookmarks error:", error);
    return Response.json(
      { error: "Summarization failed", summary: "" },
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
