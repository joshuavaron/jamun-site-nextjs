/**
 * Cloudflare Pages Function for Idea Checking (Mode 3)
 *
 * Checks if a student's idea is supported by their bookmarked research.
 * Per PP-Writer.md: Returns matching bookmarks + suggestions
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

function buildPrompt(idea, bookmarks) {
  // Limit bookmarks to avoid token limits
  const limitedBookmarks = bookmarks.slice(0, 10);

  const bookmarkList = limitedBookmarks
    .map((b, i) => `[${i + 1}] "${(b.content || b.text || "").slice(0, 300)}" (${b.category || "research"})`)
    .join("\n");

  return `A student is writing a position paper and drafted this idea:
"${idea.slice(0, 500)}"

Here are the bookmarks from their research:
${bookmarkList}

Which bookmarks (if any) support or relate to their idea?
List the bookmark numbers with a brief explanation. If none relate, say so kindly.

Format your response like this:
Your idea connects to these bookmarks:
- [1] — brief explanation
- [3] — brief explanation

If helpful, add a short suggestion at the end.

Keep it short and encouraging. Write like you're talking to a middle schooler.`;
}

function parseResponse(response, bookmarks) {
  const result = {
    matchingBookmarks: [],
    suggestions: "",
  };

  if (!response) return result;

  // Try to extract bookmark numbers
  const matches = response.matchAll(/\[(\d+)\]/g);
  const seenIndices = new Set();

  for (const match of matches) {
    const index = parseInt(match[1], 10) - 1;
    if (index >= 0 && index < bookmarks.length && !seenIndices.has(index)) {
      seenIndices.add(index);

      // Try to extract the explanation after this bracket
      const afterBracket = response.slice(response.indexOf(match[0]) + match[0].length);
      const explanation = afterBracket
        .split(/\n|\[/)[0]
        .replace(/^[\s—\-:]+/, "")
        .trim()
        .slice(0, 200);

      result.matchingBookmarks.push({
        bookmark: bookmarks[index],
        explanation: explanation || "Relates to your idea",
      });
    }
  }

  // Extract suggestions (anything after "suggestion" or similar)
  const suggestionMatch = response.match(/(?:suggestion|you might|tip)[:\s]+(.+?)(?:\n\n|$)/is);
  if (suggestionMatch) {
    result.suggestions = suggestionMatch[1].trim().slice(0, 300);
  }

  // If no suggestions found but there's extra text, use it
  if (!result.suggestions && result.matchingBookmarks.length > 0) {
    const lines = response.split("\n").filter(l => l.trim());
    const lastLine = lines[lines.length - 1];
    if (lastLine && !lastLine.includes("[") && lastLine.length > 20) {
      result.suggestions = lastLine.trim().slice(0, 300);
    }
  }

  return result;
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
        { error: "Rate limit exceeded. Please wait a moment.", matchingBookmarks: [], suggestions: "" },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await context.request.json();
    const { idea, bookmarks } = body;

    if (!idea?.trim()) {
      return Response.json(
        { error: "No idea provided", matchingBookmarks: [], suggestions: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!bookmarks || !Array.isArray(bookmarks) || bookmarks.length === 0) {
      return Response.json(
        {
          error: "No bookmarks to check against",
          matchingBookmarks: [],
          suggestions: "Try bookmarking some research from the background guide first!"
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const prompt = buildPrompt(idea, bookmarks);

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 400,
    });

    const parsed = parseResponse(result.response, bookmarks);

    // If no matches found, provide encouraging fallback
    if (parsed.matchingBookmarks.length === 0) {
      parsed.suggestions = "I didn't find bookmarks that directly match this. That's okay—you might remember something you didn't bookmark, or this could be your own original thinking!";
    }

    return Response.json(parsed, { headers: corsHeaders });
  } catch (error) {
    console.error("Check idea error:", error);
    return Response.json(
      { error: "Idea checking failed", matchingBookmarks: [], suggestions: "" },
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
