"use client";

import { Calculator } from "lucide-react";
import { ResourcesPageLayout, ColorTheme } from "@/components/pages";
import {
  MathletesResourceMeta,
  MathletesResourceCategory,
  MathletesResourceFormat,
} from "@/lib/mathletes-resources";

interface MathletesResourcesPageContentProps {
  resources: MathletesResourceMeta[];
}

// All possible categories for Mathletes resources
const ALL_CATEGORIES: MathletesResourceCategory[] = [
  "Getting Started",
  "Problem Solving",
  "Number Theory",
  "Algebra",
  "Geometry",
  "Counting & Probability",
  "Mental Math",
  "Competition Prep",
  "Video Tutorials",
];

// All possible formats
const ALL_FORMATS: MathletesResourceFormat[] = [
  "Article",
  "PDF",
  "Video",
  "Template",
  "Worksheet",
];

// Mathletes color theme (emerald/teal)
const colorTheme: ColorTheme = {
  heroGradient: "bg-gradient-to-br from-emerald-50/50 via-white to-teal-50",
  blobColors: [
    "bg-gradient-to-r from-emerald-400/10 to-teal-400/10",
    "bg-gradient-to-r from-cyan-400/10 to-emerald-400/10",
    "bg-gradient-to-r from-teal-100/20 to-emerald-100/20",
  ],
  badgeClasses: "text-emerald-700 bg-emerald-100 border-emerald-200",
  categoryActiveClasses: "bg-emerald-600 text-white",
  formatActiveClasses: "bg-teal-600 text-white",
  clearFilterClasses: "text-emerald-600 hover:text-emerald-700",
  searchRingClasses: "focus:ring-emerald-500/30 focus:border-emerald-500",
  cardHoverClasses: "group-hover:text-emerald-600",
  formatPDFClasses: "bg-emerald-100 text-emerald-700",
  ctaBadgeClasses: "bg-emerald-100 text-emerald-600",
  ctaGradientClasses: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent",
  emailLinkClasses: "text-emerald-600 hover:text-emerald-700",
};

// Category name mapping (no translations for coming soon page)
const getCategoryName = (category: MathletesResourceCategory): string => category;

// Format name mapping
const getFormatName = (format: MathletesResourceFormat): string => format;

export default function MathletesResourcesPageContent({
  resources,
}: MathletesResourcesPageContentProps) {
  return (
    <ResourcesPageLayout
      resources={resources}
      programSlug="mathletes"
      heroIcon={Calculator}
      colorTheme={colorTheme}
      allCategories={ALL_CATEGORIES}
      allFormats={ALL_FORMATS}
      getCategoryName={getCategoryName}
      getFormatName={getFormatName}
      translations={{
        heroBadge: "Mathletes Resources",
        heroTitlePart1: "Math ",
        heroTitlePart2: "Resources",
        heroDescription: "Everything you need to prepare for Mathletes success. From beginner problem-solving guides to advanced competition strategies, find resources tailored to your skill level.",
        searchPlaceholder: "Search resources...",
        resourcesLabel: "Resources",
        categoriesLabel: "Categories",
        featuredLabel: "Featured",
        filterTitle: "Filter Resources",
        clearAll: "Clear all",
        categoryLabel: "Category",
        formatLabel: "Format",
        showingResults: (count, total) => `Showing ${count} of ${total} resources`,
        sectionEyebrow: "Learn & Practice",
        sectionTitle: "Find Your Resources",
        sectionSubtitle: "Browse our collection of guides, problem sets, and tutorials designed to help you succeed in Mathletes.",
        noResultsTitle: "No resources found",
        noResultsDescription: "Try adjusting your search or filters to find what you're looking for.",
        clearFilters: "Clear filters",
        pagesLabel: "pages",
        downloadLabel: "Download",
        ctaBadge: "Coming Fall 2026",
        ctaTitlePart1: "Ready to Become a ",
        ctaTitlePart2: "Mathlete?",
        ctaDescription: "Join our interest list to be among the first to know when JAMUN Mathletes launches. Get early access to resources, practice problems, and registration.",
        primaryCtaText: "Join Interest List",
        secondaryCtaText: "Learn About Mathletes",
        secondaryCtaHref: "/mathletes",
        questionsText: "Have questions about resources?",
        contactEmail: "mathletes@jamun.org",
        contactLinkText: "Contact our Mathletes team",
      }}
      emptyState={{
        title: "Resources Coming Soon",
        description: "We're building our Mathletes resource library for our Fall 2026 launch. Join the interest list to be notified when resources become available.",
        primaryCta: {
          text: "Join Interest List",
          href: "mailto:contact@jamun.org",
        },
        secondaryCta: {
          text: "Back to Mathletes",
          href: "/mathletes",
        },
      }}
    />
  );
}
