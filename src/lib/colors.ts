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

// Warm section accent mappings for design system
export const sectionAccents = {
  modelUN: {
    bg: "bg-light-sage",
    border: "border-emerald-200",
    text: "text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  mockTrial: {
    bg: "bg-light-lavender",
    border: "border-purple-200",
    text: "text-purple-700",
    iconBg: "bg-purple-100",
  },
  mathletes: {
    bg: "bg-cream",
    border: "border-amber-200",
    text: "text-amber-700",
    iconBg: "bg-amber-100",
  },
  general: {
    bg: "bg-light-sky",
    border: "border-jamun-blue/20",
    text: "text-jamun-blue",
    iconBg: "bg-jamun-blue/10",
  },
  donate: {
    bg: "bg-soft-peach",
    border: "border-orange-200",
    text: "text-orange-700",
    iconBg: "bg-orange-100",
  },
} as const;
