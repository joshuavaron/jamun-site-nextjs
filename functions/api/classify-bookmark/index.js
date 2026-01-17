/**
 * Cloudflare Pages Function for Bookmark Classification
 *
 * Uses Workers AI (Llama 3.2 3B) to classify bookmarked content
 * into Layer 4 categories.
 *
 * Categories (from PP-Writer.md):
 * - Topic Fundamentals: topic_definition, key_terms, scope
 * - Historical Context: origin, timeline, evolution
 * - Current Situation: present_state, key_statistics, recent_developments
 * - Stakeholders: affected_populations, key_actors, power_dynamics
 * - Existing Efforts: un_actions, regional_efforts, success_stories, failures
 * - Points of Contention: major_debates, competing_interests, barriers
 * - Country-Specific: country_involvement, past_positions, country_interests, allies, constraints
 */

// Rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 30; // requests per minute per IP
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

const VALID_CATEGORIES = [
  "topic_definition", "key_terms", "scope",
  "origin", "timeline", "evolution",
  "present_state", "key_statistics", "recent_developments",
  "affected_populations", "key_actors", "power_dynamics",
  "un_actions", "regional_efforts", "success_stories", "failures",
  "major_debates", "competing_interests", "barriers",
  "country_involvement", "past_positions", "country_interests", "allies", "constraints",
  "other"
];

function buildPrompt(text) {
  return `Classify this text into exactly one category from the list below. This is research content for a Model UN position paper.

Categories:
- topic_definition: Defines what the issue is in simple terms
- key_terms: Important vocabulary and definitions
- scope: Geographic or temporal boundaries of the topic
- origin: When and how the issue emerged
- timeline: Major events in chronological order
- evolution: How the issue has changed over time
- present_state: What is happening now
- key_statistics: Current numbers, percentages, statistics
- recent_developments: Events from the past 1-2 years
- affected_populations: Who is impacted and how
- key_actors: Countries, organizations, and groups involved
- power_dynamics: Who has influence over this issue
- un_actions: Relevant UN resolutions, treaties, agencies
- regional_efforts: Regional organization initiatives
- success_stories: What has worked (even partially)
- failures: What approaches have not worked
- major_debates: What do countries disagree about
- competing_interests: Economic, political, cultural tensions
- barriers: Why this hasn't been solved
- country_involvement: A specific country's connection to the issue
- past_positions: A country's voting record or past statements
- country_interests: Why a specific issue matters to a country
- allies: Countries that share similar views
- constraints: A country's economic, political, or social limitations
- other: If none of the above fit

Text to classify:
"${text.slice(0, 1500)}"

Respond with ONLY the category name (e.g., "key_statistics" or "timeline"). Nothing else.`;
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
    // Rate limiting
    const clientIP = context.request.headers.get("CF-Connecting-IP") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: "Rate limit exceeded. Please wait a moment.", category: "other", confidence: 0 },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await context.request.json();
    const { text } = body;

    if (!text?.trim()) {
      return Response.json(
        { error: "No text provided", category: "other", confidence: 0 },
        { status: 400, headers: corsHeaders }
      );
    }

    const prompt = buildPrompt(text);

    const result = await context.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
      prompt,
      max_tokens: 50,
    });

    // Parse the response
    let category = result.response?.trim()?.toLowerCase() || "other";

    // Clean up common response formats
    category = category.replace(/['"]/g, "").replace(/\.$/, "").trim();

    // Validate category
    if (!VALID_CATEGORIES.includes(category)) {
      // Try to find partial match
      const found = VALID_CATEGORIES.find(c => category.includes(c) || c.includes(category));
      category = found || "other";
    }

    return Response.json(
      { category, confidence: category === "other" ? 0.3 : 0.7 },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Classify bookmark error:", error);
    return Response.json(
      { error: "Classification failed", category: "other", confidence: 0 },
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
