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

function buildPrompt(idea, bookmarks, comprehensionAnswers) {
  // Limit bookmarks to avoid token limits
  const limitedBookmarks = bookmarks.slice(0, 8);

  const bookmarkList = limitedBookmarks
    .map((b, i) => `[${i + 1}] "${(b.content || b.text || "").slice(0, 250)}" (${b.category || "research"})`)
    .join("\n");

  // Build comprehension context if provided
  let comprehensionContext = "";
  if (comprehensionAnswers && Object.keys(comprehensionAnswers).length > 0) {
    const relevantAnswers = [];
    if (comprehensionAnswers.keyStatistics) {
      relevantAnswers.push(`Key statistics: ${comprehensionAnswers.keyStatistics.slice(0, 200)}`);
    }
    if (comprehensionAnswers.presentState) {
      relevantAnswers.push(`Current situation: ${comprehensionAnswers.presentState.slice(0, 200)}`);
    }
    if (comprehensionAnswers.pastPositions) {
      relevantAnswers.push(`Country's past positions: ${comprehensionAnswers.pastPositions.slice(0, 200)}`);
    }
    if (comprehensionAnswers.countryInterests) {
      relevantAnswers.push(`Country's interests: ${comprehensionAnswers.countryInterests.slice(0, 200)}`);
    }
    if (relevantAnswers.length > 0) {
      comprehensionContext = `\nStudent's research notes:\n${relevantAnswers.join("\n")}\n`;
    }
  }

  return `A middle school student wrote this for their Model UN position paper:
"${idea.slice(0, 400)}"
${comprehensionContext}
Their bookmarked research:
${bookmarkList}

Your job: Check if their writing is SUPPORTED by their research.

BE SELECTIVE. Only mention bookmarks that ACTUALLY support what they wrote. Most ideas will only match 0-2 bookmarks.

Respond in this format:

SUPPORTED BY:
[Only list bookmarks that directly support their claim. If none do, write "None of your bookmarks directly support this."]

GAPS TO CONSIDER:
[If their idea makes a claim not backed by their research, note it here. If everything checks out, write "Looks good!"]

Keep it brief and helpful. Talk like a friendly teacher.`;
}

function parseResponse(response, bookmarks) {
  const result = {
    matchingBookmarks: [],
    suggestions: "",
  };

  if (!response) return result;

  // Split response into sections
  const supportedMatch = response.match(/SUPPORTED BY[:\s]*\n?([\s\S]*?)(?=GAPS TO CONSIDER|$)/i);
  const gapsMatch = response.match(/GAPS TO CONSIDER[:\s]*\n?([\s\S]*?)$/i);

  // Parse the "SUPPORTED BY" section for bookmark references
  const supportedSection = supportedMatch ? supportedMatch[1] : response;

  // Try to extract bookmark numbers
  const matches = supportedSection.matchAll(/\[(\d+)\]/g);
  const seenIndices = new Set();

  for (const match of matches) {
    const index = parseInt(match[1], 10) - 1;
    if (index >= 0 && index < bookmarks.length && !seenIndices.has(index)) {
      seenIndices.add(index);

      // Try to extract the explanation after this bracket
      const afterBracket = supportedSection.slice(supportedSection.indexOf(match[0]) + match[0].length);
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

  // Extract gaps/suggestions from the "GAPS TO CONSIDER" section
  if (gapsMatch) {
    let gaps = gapsMatch[1].trim();
    // Clean up common artifacts
    gaps = gaps.replace(/^[:\s-]+/, "").trim();
    if (gaps && gaps.toLowerCase() !== "looks good!" && gaps.toLowerCase() !== "none") {
      result.suggestions = gaps.slice(0, 400);
    }
  }

  // Fallback: look for suggestions in other formats
  if (!result.suggestions) {
    const suggestionMatch = response.match(/(?:suggestion|you might|tip|consider)[:\s]+(.+?)(?:\n\n|$)/is);
    if (suggestionMatch) {
      result.suggestions = suggestionMatch[1].trim().slice(0, 300);
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
    const { idea, bookmarks, comprehensionAnswers } = body;

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

    const prompt = buildPrompt(idea, bookmarks, comprehensionAnswers);

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
