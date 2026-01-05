// Centralized color schemes for consistent branding across components

// Program colors - used in cards, badges, and highlights
export const programColors = {
  modelUN: {
    accent: "bg-jamun-blue",
    accentLight: "bg-jamun-blue/10",
    text: "text-jamun-blue",
    glow: "shadow-jamun-blue/30",
    badge: "bg-jamun-blue/80",
  },
  mockTrial: {
    accent: "bg-purple-600",
    accentLight: "bg-purple-100",
    text: "text-purple-600",
    glow: "shadow-purple-500/30",
    badge: "bg-purple-600/80",
  },
  mathletes: {
    accent: "bg-emerald-600",
    accentLight: "bg-emerald-100",
    text: "text-emerald-600",
    glow: "shadow-emerald-500/30",
    badge: "bg-emerald-600/80",
  },
} as const;

// Category colors for blog posts and content tagging
export const categoryColors: Record<string, { bg: string; text: string }> = {
  "Model UN": { bg: "bg-jamun-blue/10", text: "text-jamun-blue" },
  "Mock Trial": { bg: "bg-purple-100", text: "text-purple-600" },
  Mathletes: { bg: "bg-emerald-100", text: "text-emerald-600" },
  News: { bg: "bg-amber-100", text: "text-amber-600" },
  Events: { bg: "bg-rose-100", text: "text-rose-600" },
  Resources: { bg: "bg-cyan-100", text: "text-cyan-600" },
};

// Default fallback for unknown categories
export const defaultCategoryColor = { bg: "bg-gray-100", text: "text-gray-600" };

// Get category colors with fallback
export function getCategoryColors(category: string) {
  return categoryColors[category] || defaultCategoryColor;
}

// Skill/feature icon colors - for grid displays
export const skillColors = [
  { accent: "bg-jamun-blue", light: "bg-jamun-blue/10" },
  { accent: "bg-purple-600", light: "bg-purple-100" },
  { accent: "bg-emerald-600", light: "bg-emerald-100" },
  { accent: "bg-amber-600", light: "bg-amber-100" },
  { accent: "bg-rose-600", light: "bg-rose-100" },
  { accent: "bg-indigo-600", light: "bg-indigo-100" },
  { accent: "bg-teal-600", light: "bg-teal-100" },
  { accent: "bg-orange-600", light: "bg-orange-100" },
] as const;

// Audience/target group colors
export const audienceColors = {
  students: {
    iconBg: "bg-jamun-blue",
    text: "text-jamun-blue",
    glow: "group-hover:shadow-jamun-blue/20",
  },
  parents: {
    iconBg: "bg-purple-600",
    text: "text-purple-600",
    glow: "group-hover:shadow-purple-500/20",
  },
  teachers: {
    iconBg: "bg-emerald-600",
    text: "text-emerald-600",
    glow: "group-hover:shadow-emerald-500/20",
  },
} as const;

// Committee category colors
export const committeeColors: Record<string, { bg: string; text: string; border: string }> = {
  "General Assembly": { bg: "bg-jamun-blue/10", text: "text-jamun-blue", border: "border-jamun-blue/20" },
  "Security Council": { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
  "Specialized Agency": { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  "Regional Body": { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  Crisis: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
};

// Resource difficulty colors
export const difficultyColors: Record<string, { bg: string; text: string }> = {
  "Beginner-Friendly": { bg: "bg-green-100", text: "text-green-700" },
  Intermediate: { bg: "bg-amber-100", text: "text-amber-700" },
  Advanced: { bg: "bg-red-100", text: "text-red-700" },
};
