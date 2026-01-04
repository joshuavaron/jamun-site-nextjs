"use client";

import { Scale } from "lucide-react";
import { ResourcesPageLayout, ColorTheme } from "@/components/pages";
import {
  MockTrialResourceMeta,
  MockTrialResourceCategory,
  MockTrialResourceFormat,
} from "@/lib/mocktrial-resources";

interface MockTrialResourcesPageContentProps {
  resources: MockTrialResourceMeta[];
}

// All possible categories for Mock Trial resources
const ALL_CATEGORIES: MockTrialResourceCategory[] = [
  "Trial Basics",
  "Opening Statements",
  "Direct Examination",
  "Cross-Examination",
  "Closing Arguments",
  "Objections",
  "Evidence Rules",
  "Witness Preparation",
  "Video Tutorials",
];

// All possible formats
const ALL_FORMATS: MockTrialResourceFormat[] = [
  "Article",
  "PDF",
  "Video",
  "Template",
  "Worksheet",
];

// Mock Trial color theme (purple/violet)
const colorTheme: ColorTheme = {
  heroGradient: "bg-gradient-to-br from-purple-50/50 via-white to-violet-50",
  blobColors: [
    "bg-gradient-to-r from-purple-400/10 to-violet-400/10",
    "bg-gradient-to-r from-fuchsia-400/10 to-purple-400/10",
    "bg-gradient-to-r from-violet-100/20 to-purple-100/20",
  ],
  badgeClasses: "text-purple-700 bg-purple-100 border-purple-200",
  categoryActiveClasses: "bg-purple-600 text-white",
  formatActiveClasses: "bg-violet-600 text-white",
  clearFilterClasses: "text-purple-600 hover:text-purple-700",
  searchRingClasses: "focus:ring-purple-500/30 focus:border-purple-500",
  cardHoverClasses: "group-hover:text-purple-600",
  formatPDFClasses: "bg-purple-100 text-purple-700",
  ctaBadgeClasses: "bg-purple-100 text-purple-600",
  ctaGradientClasses: "bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent",
  emailLinkClasses: "text-purple-600 hover:text-purple-700",
};

// Category name mapping (no translations for coming soon page)
const getCategoryName = (category: MockTrialResourceCategory): string => category;

// Format name mapping
const getFormatName = (format: MockTrialResourceFormat): string => format;

export default function MockTrialResourcesPageContent({
  resources,
}: MockTrialResourcesPageContentProps) {
  return (
    <ResourcesPageLayout
      resources={resources}
      programSlug="mocktrial"
      heroIcon={Scale}
      colorTheme={colorTheme}
      allCategories={ALL_CATEGORIES}
      allFormats={ALL_FORMATS}
      getCategoryName={getCategoryName}
      getFormatName={getFormatName}
      translations={{
        heroBadge: "Mock Trial Resources",
        heroTitlePart1: "Courtroom ",
        heroTitlePart2: "Resources",
        heroDescription: "Everything you need to prepare for Mock Trial success. From beginner guides to advanced trial techniques, find resources tailored to your experience level.",
        searchPlaceholder: "Search resources...",
        resourcesLabel: "Resources",
        categoriesLabel: "Categories",
        featuredLabel: "Featured",
        filterTitle: "Filter Resources",
        clearAll: "Clear all",
        categoryLabel: "Category",
        formatLabel: "Format",
        showingResults: (count, total) => `Showing ${count} of ${total} resources`,
        sectionEyebrow: "Learn & Prepare",
        sectionTitle: "Find Your Resources",
        sectionSubtitle: "Browse our collection of guides, tutorials, and templates designed to help you succeed in Mock Trial.",
        noResultsTitle: "No resources found",
        noResultsDescription: "Try adjusting your search or filters to find what you're looking for.",
        clearFilters: "Clear filters",
        pagesLabel: "pages",
        downloadLabel: "Download",
        ctaBadge: "Coming Fall 2026",
        ctaTitlePart1: "Ready to Take the ",
        ctaTitlePart2: "Stand?",
        ctaDescription: "Join our interest list to be among the first to know when JAMUN Mock Trial launches. Get early access to resources, case materials, and registration.",
        primaryCtaText: "Join Interest List",
        secondaryCtaText: "Learn About Mock Trial",
        secondaryCtaHref: "/mocktrial",
        questionsText: "Have questions about resources?",
        contactEmail: "mocktrial@jamun.org",
        contactLinkText: "Contact our Mock Trial team",
      }}
      emptyState={{
        title: "Resources Coming Soon",
        description: "We're building our Mock Trial resource library for our Fall 2026 launch. Join the interest list to be notified when resources become available.",
        primaryCta: {
          text: "Join Interest List",
          href: "mailto:contact@jamun.org",
        },
        secondaryCta: {
          text: "Back to Mock Trial",
          href: "/mocktrial",
        },
      }}
    />
  );
}
