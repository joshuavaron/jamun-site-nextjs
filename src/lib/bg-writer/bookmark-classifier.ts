/**
 * Bookmark Classification System
 *
 * Classifies bookmarked content into Layer 4 categories using:
 * 1. Regex patterns for quick, offline classification
 * 2. AI fallback via Cloudflare Workers for ambiguous cases
 *
 * Categories from PP-Writer.md spec:
 * - Topic Fundamentals: Definition, Key Terms, Scope
 * - Historical Context: Origin, Timeline, Evolution
 * - Current Situation: Present State, Key Statistics, Recent Developments
 * - Stakeholders: Affected Populations, Key Actors, Power Dynamics
 * - Existing Efforts: UN Actions, Regional Efforts, Success Stories, Failures
 * - Points of Contention: Major Debates, Competing Interests, Barriers
 * - Country-Specific: Involvement, Past Positions, Interests, Allies, Constraints
 */

import type { BookmarkCategory, ClassifiedBookmark, BookmarkSection, ClassifyResult } from "./types";

// =============================================================================
// REGEX PATTERNS FOR QUICK CLASSIFICATION
// =============================================================================

interface PatternRule {
  patterns: RegExp[];
  weight: number; // Higher weight = higher confidence
}

const CLASSIFICATION_PATTERNS: Record<BookmarkCategory, PatternRule> = {
  // Topic Fundamentals
  topic_definition: {
    patterns: [
      /\b(definition|defined as|refers to|meaning of|what is)\b/i,
      /\b(the issue of|the problem of|the topic of)\b/i,
      /\b(overview|introduction to)\b/i,
    ],
    weight: 1.0,
  },
  key_terms: {
    patterns: [
      /\b(terminology|glossary|key terms|important terms)\b/i,
      /\b(vocab|vocabulary|definitions)\b/i,
      /\bmeans\b.*\bwhen\b/i,
    ],
    weight: 0.8,
  },
  scope: {
    patterns: [
      /\b(scope|boundary|boundaries|extent|range)\b/i,
      /\b(geographic|regional|global|worldwide|international)\b/i,
      /\b(affects|impacts|covers)\s+(more than|over|approximately)\b/i,
    ],
    weight: 0.7,
  },

  // Historical Context
  origin: {
    patterns: [
      /\b(origin|originated|began|started|emerged)\b/i,
      /\b(first (appeared|occurred|happened))\b/i,
      /\b(roots|beginning|genesis)\b/i,
    ],
    weight: 0.9,
  },
  timeline: {
    patterns: [
      /\b(19|20)\d{2}\b/, // Years like 1990, 2020
      /\b(since|from|between|during)\s+\d{4}\b/i,
      /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}\b/i,
      /\b(timeline|chronology|history of)\b/i,
    ],
    weight: 1.0,
  },
  evolution: {
    patterns: [
      /\b(evolution|evolved|developed|changed over time)\b/i,
      /\b(progress|progression|transformation)\b/i,
      /\b(over the (years|decades)|historically)\b/i,
    ],
    weight: 0.8,
  },

  // Current Situation
  present_state: {
    patterns: [
      /\b(currently|today|now|present|ongoing)\b/i,
      /\b(current (state|situation|status))\b/i,
      /\b(as of \d{4}|this year)\b/i,
    ],
    weight: 0.9,
  },
  key_statistics: {
    patterns: [
      /\d+\s*(million|billion|trillion|percent|%)/i,
      /\b(statistics|data shows|numbers|figures)\b/i,
      /\b(approximately|about|around|nearly|over|more than)\s+\d+/i,
      /\$\d+/,
    ],
    weight: 1.0,
  },
  recent_developments: {
    patterns: [
      /\b(recent|recently|latest|new|emerging)\b/i,
      /\b(202[0-9])\b/, // Recent years
      /\b(last (year|month|few years))\b/i,
      /\b(development|breakthrough|announcement)\b/i,
    ],
    weight: 0.9,
  },

  // Stakeholders
  affected_populations: {
    patterns: [
      /\b(affected|impacted|vulnerable)\s+(populations?|communities?|groups?|people)\b/i,
      /\b(victims|refugees|displaced|marginalized)\b/i,
      /\b(women|children|minorities|indigenous)\b/i,
    ],
    weight: 0.9,
  },
  key_actors: {
    patterns: [
      /\b(key (actors|players|stakeholders))\b/i,
      /\b(governments?|organizations?|NGOs?|agencies)\b/i,
      /\b(leaders|officials|representatives)\b/i,
    ],
    weight: 0.8,
  },
  power_dynamics: {
    patterns: [
      /\b(power|influence|control|dominance)\b/i,
      /\b(geopolitical|political leverage|economic power)\b/i,
      /\b(balance of power|hegemony)\b/i,
    ],
    weight: 0.7,
  },

  // Existing Efforts
  un_actions: {
    patterns: [
      /\b(united nations|UN|U\.N\.)\b/i,
      /\b(resolution|treaty|convention|protocol)\b/i,
      /\b(UNICEF|WHO|UNESCO|UNHCR|UNDP|FAO|WFP)\b/,
      /\b(security council|general assembly)\b/i,
    ],
    weight: 1.0,
  },
  regional_efforts: {
    patterns: [
      /\b(regional|AU|EU|ASEAN|OAS|NATO|ECOWAS)\b/i,
      /\b(regional (organization|initiative|agreement))\b/i,
      /\b(African Union|European Union|Arab League)\b/i,
    ],
    weight: 0.9,
  },
  success_stories: {
    patterns: [
      /\b(success|successful|worked|effective|achieved)\b/i,
      /\b(progress|improvement|milestone|breakthrough)\b/i,
      /\b(model|example|best practice)\b/i,
    ],
    weight: 0.8,
  },
  failures: {
    patterns: [
      /\b(failed|failure|unsuccessful|ineffective)\b/i,
      /\b(challenges|obstacles|setbacks|limitations)\b/i,
      /\b(criticism|critique|shortcomings)\b/i,
    ],
    weight: 0.8,
  },

  // Points of Contention
  major_debates: {
    patterns: [
      /\b(debate|controversy|disagreement|dispute)\b/i,
      /\b(contentious|contested|divisive)\b/i,
      /\b(argument|differing views|opposing)\b/i,
    ],
    weight: 0.9,
  },
  competing_interests: {
    patterns: [
      /\b(competing|conflicting)\s+(interests?|priorities|goals)\b/i,
      /\b(economic interests|political interests|trade-off)\b/i,
      /\b(tension between|versus|vs\.)\b/i,
    ],
    weight: 0.8,
  },
  barriers: {
    patterns: [
      /\b(barriers?|obstacles?|impediments?|hindrances?)\b/i,
      /\b(why (hasn't|hasn't been|not been) (solved|resolved))\b/i,
      /\b(preventing|blocking|hindering)\b/i,
    ],
    weight: 0.8,
  },

  // Country-Specific Research
  country_involvement: {
    patterns: [
      /\b(involvement|involved|participation|role)\b/i,
      /\b(directly (affected|involved|connected))\b/i,
      /\b(domestic|national)\s+(policy|action|response)\b/i,
    ],
    weight: 0.7,
  },
  past_positions: {
    patterns: [
      /\b(voted|vote|voting record)\b/i,
      /\b(position|stance|statement|declared)\b/i,
      /\b(supported|opposed|abstained)\b/i,
    ],
    weight: 0.9,
  },
  country_interests: {
    patterns: [
      /\b(national interests?|strategic interests?)\b/i,
      /\b(why (it|this) matters to)\b/i,
      /\b(benefit|advantage|priority for)\b/i,
    ],
    weight: 0.8,
  },
  allies: {
    patterns: [
      /\b(allies|allied|alliance|coalition)\b/i,
      /\b(partners|partnership|cooperation with)\b/i,
      /\b(similar (views|positions|stance))\b/i,
    ],
    weight: 0.8,
  },
  constraints: {
    patterns: [
      /\b(constraints?|limitations?|restrictions?)\b/i,
      /\b(economic (constraints|limitations)|political (constraints|limitations))\b/i,
      /\b(cannot|unable to|limited by)\b/i,
    ],
    weight: 0.7,
  },

  // Fallback
  other: {
    patterns: [],
    weight: 0,
  },
};

// =============================================================================
// LOCAL (REGEX) CLASSIFICATION
// =============================================================================

interface ClassificationScore {
  category: BookmarkCategory;
  score: number;
  matchedPatterns: number;
}

/**
 * Classify bookmark text using regex patterns (fast, offline)
 * Returns the best matching category or null if no confident match
 */
export function classifyBookmarkLocal(text: string): ClassifyResult | null {
  const normalizedText = text.toLowerCase();
  const scores: ClassificationScore[] = [];

  for (const [category, rule] of Object.entries(CLASSIFICATION_PATTERNS)) {
    if (category === "other") continue;

    let matchCount = 0;
    for (const pattern of rule.patterns) {
      if (pattern.test(normalizedText)) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      const score = matchCount * rule.weight;
      scores.push({
        category: category as BookmarkCategory,
        score,
        matchedPatterns: matchCount,
      });
    }
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Return top match if confidence is high enough
  if (scores.length > 0 && scores[0].score >= 0.8) {
    // If there's a clear winner (significantly higher than second place)
    const confidence =
      scores.length === 1
        ? Math.min(scores[0].score / 2, 1)
        : Math.min((scores[0].score - (scores[1]?.score || 0)) / scores[0].score + 0.5, 1);

    return {
      success: true,
      category: scores[0].category,
      confidence,
      method: "regex",
      classifiedBy: "regex",
    };
  }

  // No confident match
  return null;
}

// =============================================================================
// AI CLASSIFICATION (FALLBACK)
// =============================================================================

/**
 * Classify bookmark text using Cloudflare Workers AI
 * Called when regex classification is not confident enough
 */
export async function classifyBookmarkAI(text: string): Promise<ClassifyResult> {
  try {
    const response = await fetch("/api/classify-bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      return {
        success: false,
        category: "other",
        confidence: 0,
        method: "ai",
        classifiedBy: "ai",
        error: `API error: ${response.status}`,
      };
    }

    const data = await response.json() as { category: BookmarkCategory; confidence?: number };
    return {
      success: true,
      category: data.category || "other",
      confidence: data.confidence || 0.5,
      method: "ai",
      classifiedBy: "ai",
    };
  } catch (error) {
    console.error("[Bookmark Classifier] AI classification failed:", error);
    return {
      success: false,
      category: "other",
      confidence: 0,
      method: "ai",
      classifiedBy: "ai",
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

// =============================================================================
// COMBINED CLASSIFICATION
// =============================================================================

/**
 * Classify bookmark using regex first, then AI fallback
 * This is the main function to use for classification
 */
export async function classifyBookmark(text: string): Promise<ClassifyResult> {
  // Try regex first (fast, offline)
  const localResult = classifyBookmarkLocal(text);
  if (localResult && localResult.confidence >= 0.7) {
    console.log(
      `[Bookmark Classifier] Regex classified as ${localResult.category} (confidence: ${localResult.confidence.toFixed(2)})`
    );
    return localResult;
  }

  // Fall back to AI for ambiguous cases
  console.log("[Bookmark Classifier] Regex not confident, trying AI...");
  const aiResult = await classifyBookmarkAI(text);
  return aiResult;
}

// =============================================================================
// BATCH CLASSIFICATION
// =============================================================================

/**
 * Classify multiple bookmarks, using regex where possible
 * Returns classified bookmarks with category metadata
 */
export async function classifyBookmarks(
  sections: BookmarkSection[]
): Promise<ClassifiedBookmark[]> {
  const results: ClassifiedBookmark[] = [];

  for (const section of sections) {
    const textToClassify = `${section.headingText} ${section.content}`;
    const classification = await classifyBookmark(textToClassify);

    results.push({
      ...section,
      category: classification.category,
      classifiedAt: new Date().toISOString(),
      classifiedBy: classification.method,
      confidence: classification.confidence,
    });
  }

  return results;
}

// =============================================================================
// CATEGORY HELPERS
// =============================================================================

/**
 * Get human-readable label for a category
 */
export function getCategoryLabel(category: BookmarkCategory): string {
  const labels: Record<BookmarkCategory, string> = {
    topic_definition: "Topic Definition",
    key_terms: "Key Terms",
    scope: "Scope",
    origin: "Origin",
    timeline: "Timeline",
    evolution: "Evolution",
    present_state: "Present State",
    key_statistics: "Key Statistics",
    recent_developments: "Recent Developments",
    affected_populations: "Affected Populations",
    key_actors: "Key Actors",
    power_dynamics: "Power Dynamics",
    un_actions: "UN Actions",
    regional_efforts: "Regional Efforts",
    success_stories: "Success Stories",
    failures: "Failures",
    major_debates: "Major Debates",
    competing_interests: "Competing Interests",
    barriers: "Barriers",
    country_involvement: "Country Involvement",
    past_positions: "Past Positions",
    country_interests: "Country Interests",
    allies: "Allies",
    constraints: "Constraints",
    other: "Other",
  };
  return labels[category] || category;
}

/**
 * Get the category group for a given category
 */
export function getCategoryGroup(category: BookmarkCategory): string {
  const groupMap: Record<BookmarkCategory, string> = {
    topic_definition: "topicFundamentals",
    key_terms: "topicFundamentals",
    scope: "topicFundamentals",
    origin: "historicalContext",
    timeline: "historicalContext",
    evolution: "historicalContext",
    present_state: "currentSituation",
    key_statistics: "currentSituation",
    recent_developments: "currentSituation",
    affected_populations: "stakeholders",
    key_actors: "stakeholders",
    power_dynamics: "stakeholders",
    un_actions: "existingEfforts",
    regional_efforts: "existingEfforts",
    success_stories: "existingEfforts",
    failures: "existingEfforts",
    major_debates: "pointsOfContention",
    competing_interests: "pointsOfContention",
    barriers: "pointsOfContention",
    country_involvement: "countrySpecific",
    past_positions: "countrySpecific",
    country_interests: "countrySpecific",
    allies: "countrySpecific",
    constraints: "countrySpecific",
    other: "other",
  };
  return groupMap[category] || "other";
}

/**
 * Filter bookmarks by categories
 */
export function filterBookmarksByCategories(
  bookmarks: ClassifiedBookmark[],
  categories: BookmarkCategory[]
): ClassifiedBookmark[] {
  if (categories.length === 0) return bookmarks;
  return bookmarks.filter((b) => categories.includes(b.category));
}
