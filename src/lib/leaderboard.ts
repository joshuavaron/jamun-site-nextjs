/**
 * Leaderboard Data System
 *
 * Simple structure with computed ranks based on scores.
 * Ties are handled by giving same rank to equal scores.
 */

// Raw entry without rank (rank is computed from score)
interface RawLeaderboardEntry {
  school: string;
  score: number;
  previousRank: number;
}

// Entry with computed rank
export interface LeaderboardEntry {
  rank: number;
  school: string;
  score: number;
  previousRank: number;
}

export interface Leaderboard {
  title: string;
  data: LeaderboardEntry[];
}

// Helper to sort by score (desc), then alphabetically for ties, and assign ranks
function withRanks(entries: RawLeaderboardEntry[]): LeaderboardEntry[] {
  const sorted = [...entries].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Ties: sort alphabetically by school name
    return a.school.localeCompare(b.school);
  });

  // Assign ranks, accounting for ties (same score = same rank)
  let currentRank = 1;
  return sorted.map((entry, index) => {
    if (index > 0 && sorted[index - 1].score !== entry.score) {
      // Different score from previous, so rank = position + 1
      currentRank = index + 1;
    }
    return {
      ...entry,
      rank: currentRank,
    };
  });
}

// Individual competition data (without ranks - they're computed)
const modelUNRaw: RawLeaderboardEntry[] = [
  { school: "Edward E. Sadlowski Elementary School", score: 0, previousRank: 1 },
  { school: "Jose de Diego Community Academy", score: 0, previousRank: 1 },
  { school: "The Frances Xavier Warde School", score: 0, previousRank: 1 },
  { school: "Caruso Middle School", score: 0, previousRank: 1 },
  { school: "Holden Elementary", score: 0, previousRank: 1 },
  { school: "Moving Everest Charter School", score: 0, previousRank: 1 },
  { school: "Catalyst Circle Rock Charter School", score: 0, previousRank: 1 },
  { school: "Northwood Middle School", score: 0, previousRank: 1 },
];

const mockTrialRaw: RawLeaderboardEntry[] = [
  { school: "Edward E. Sadlowski Elementary School", score: 0, previousRank: 1 },
  { school: "Jose de Diego Community Academy", score: 0, previousRank: 1 },
  { school: "The Frances Xavier Warde School", score: 0, previousRank: 1 },
  { school: "Caruso Middle School", score: 0, previousRank: 1 },
  { school: "Holden Elementary", score: 0, previousRank: 1 },
  { school: "Moving Everest Charter School", score: 0, previousRank: 1 },
  { school: "Catalyst Circle Rock Charter School", score: 0, previousRank: 1 },
  { school: "Northwood Middle School", score: 0, previousRank: 1 },
];

const mathletesRaw: RawLeaderboardEntry[] = [
  { school: "Edward E. Sadlowski Elementary School", score: 0, previousRank: 1 },
  { school: "Jose de Diego Community Academy", score: 0, previousRank: 1 },
  { school: "The Frances Xavier Warde School", score: 0, previousRank: 1 },
  { school: "Caruso Middle School", score: 0, previousRank: 1 },
  { school: "Holden Elementary", score: 0, previousRank: 1 },
  { school: "Moving Everest Charter School", score: 0, previousRank: 1 },
  { school: "Catalyst Circle Rock Charter School", score: 0, previousRank: 1 },
  { school: "Northwood Middle School", score: 0, previousRank: 1 },
];

// Generate overall leaderboard by combining all scores
function generateOverallLeaderboard(): LeaderboardEntry[] {
  const allRaw = [modelUNRaw, mockTrialRaw, mathletesRaw];
  const schoolScores = new Map<string, { score: number; previousRank: number }>();

  for (const competition of allRaw) {
    for (const entry of competition) {
      const existing = schoolScores.get(entry.school);
      if (existing) {
        schoolScores.set(entry.school, {
          score: existing.score + entry.score,
          previousRank: existing.previousRank,
        });
      } else {
        schoolScores.set(entry.school, {
          score: entry.score,
          previousRank: entry.previousRank,
        });
      }
    }
  }

  const rawEntries: RawLeaderboardEntry[] = Array.from(schoolScores.entries()).map(
    ([school, { score, previousRank }]) => ({ school, score, previousRank })
  );

  return withRanks(rawEntries);
}

// Export the leaderboards array
export const LEADERBOARDS: Leaderboard[] = [
  {
    title: "Overall",
    data: generateOverallLeaderboard(),
  },
  {
    title: "Model UN",
    data: withRanks(modelUNRaw),
  },
  {
    title: "Mock Trial",
    data: withRanks(mockTrialRaw),
  },
  {
    title: "Mathletes",
    data: withRanks(mathletesRaw),
  },
];

export function getLeaderboardByTitle(title: string): Leaderboard | undefined {
  return LEADERBOARDS.find((l) => l.title.toLowerCase() === title.toLowerCase());
}

// Helper to check if an entry is tied with another entry
export function isTied(entry: LeaderboardEntry, allEntries: LeaderboardEntry[]): boolean {
  return allEntries.filter((e) => e.rank === entry.rank).length > 1;
}

// Helper to calculate movement (positive = moved up, negative = moved down)
export function getMovement(entry: LeaderboardEntry): number {
  return entry.previousRank - entry.rank;
}

// Get top movers (schools that moved up the most)
export function getTopMovers(limit: number = 5): LeaderboardEntry[] {
  const overall = LEADERBOARDS.find((l) => l.title === "Overall");
  if (!overall) return [];

  return overall.data
    .filter((entry) => getMovement(entry) > 0)
    .sort((a, b) => getMovement(b) - getMovement(a))
    .slice(0, limit);
}
