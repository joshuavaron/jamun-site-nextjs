"use client";

import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { ResourcesPageLayout, ColorTheme } from "@/components/pages";
import { ResourceMeta, ResourceCategory, ResourceFormat } from "@/lib/resources";

interface ResourcesPageContentProps {
  resources: ResourceMeta[];
}

// All possible categories for Model UN resources
const ALL_CATEGORIES: ResourceCategory[] = [
  "Research Guide",
  "Position Papers",
  "Public Speaking",
  "Parliamentary Procedure",
  "Country Profiles",
  "Sample Documents",
  "Video Tutorials",
];

// All possible formats
const ALL_FORMATS: ResourceFormat[] = [
  "Article",
  "PDF",
  "Video",
  "Template",
  "Worksheet",
];

// Model UN color theme
const colorTheme: ColorTheme = {
  heroGradient: "bg-gradient-to-br from-emerald-50/50 via-white to-sky-50",
  blobColors: [
    "bg-gradient-to-r from-emerald-400/10 to-sky-400/10",
    "bg-gradient-to-r from-jamun-blue/10 to-emerald-400/10",
    "bg-gradient-to-r from-sky-100/20 to-emerald-100/20",
  ],
  badgeClasses: "text-emerald-700 bg-emerald-100 border-emerald-200",
  categoryActiveClasses: "bg-emerald-600 text-white",
  formatActiveClasses: "bg-jamun-blue text-white",
  clearFilterClasses: "text-emerald-600 hover:text-emerald-700",
  searchRingClasses: "focus:ring-emerald-500/30 focus:border-emerald-500",
  cardHoverClasses: "group-hover:text-emerald-600",
  formatPDFClasses: "bg-blue-100 text-blue-700",
  ctaBadgeClasses: "bg-emerald-100 text-emerald-600",
  ctaGradientClasses: "bg-gradient-to-r from-emerald-600 via-jamun-blue to-emerald-600 bg-clip-text text-transparent",
  emailLinkClasses: "text-emerald-600 hover:text-emerald-700",
};

export default function ResourcesPageContent({ resources }: ResourcesPageContentProps) {
  const t = useTranslations("ResourcesPage");

  // Category name translations
  const getCategoryName = (category: ResourceCategory): string => {
    const categoryMap: Record<ResourceCategory, string> = {
      "Research Guide": t("categoryResearchGuide"),
      "Position Papers": t("categoryPositionPapers"),
      "Public Speaking": t("categoryPublicSpeaking"),
      "Parliamentary Procedure": t("categoryParliamentaryProcedure"),
      "Country Profiles": t("categoryCountryProfiles"),
      "Sample Documents": t("categorySampleDocuments"),
      "Video Tutorials": t("categoryVideoTutorials"),
    };
    return categoryMap[category] || category;
  };

  // Format name translations
  const getFormatName = (format: ResourceFormat): string => {
    const formatMap: Record<ResourceFormat, string> = {
      Article: t("formatArticle"),
      PDF: t("formatPDF"),
      Video: t("formatVideo"),
      Template: t("formatTemplate"),
      Worksheet: t("formatWorksheet"),
    };
    return formatMap[format] || format;
  };

  return (
    <ResourcesPageLayout
      resources={resources}
      programSlug="modelun"
      heroIcon={BookOpen}
      colorTheme={colorTheme}
      allCategories={ALL_CATEGORIES}
      allFormats={ALL_FORMATS}
      getCategoryName={getCategoryName}
      getFormatName={getFormatName}
      translations={{
        heroBadge: t("heroBadge"),
        heroTitlePart1: t("heroTitle"),
        heroTitlePart2: t("heroTitleHighlight"),
        heroDescription: t("heroDescription"),
        searchPlaceholder: t("searchPlaceholder"),
        resourcesLabel: t("resources"),
        categoriesLabel: t("categories"),
        featuredLabel: t("featured"),
        filterTitle: t("filterTitle"),
        clearAll: t("clearAll"),
        categoryLabel: t("categoryLabel"),
        formatLabel: t("formatLabel"),
        showingResults: (count, total) => t("showingResults", { count, total }),
        sectionEyebrow: t("sectionEyebrow"),
        sectionTitle: t("sectionTitle"),
        sectionSubtitle: t("sectionSubtitle"),
        noResultsTitle: t("noResultsTitle"),
        noResultsDescription: t("noResultsDescription"),
        clearFilters: t("clearFilters"),
        pagesLabel: t("pages"),
        downloadLabel: t("download"),
        ctaBadge: t("ctaBadge"),
        ctaTitlePart1: t("ctaTitle"),
        ctaTitlePart2: t("ctaTitleHighlight"),
        ctaDescription: t("ctaDescription"),
        primaryCtaText: t("registerButton"),
        secondaryCtaText: t("exploreCommitteesButton"),
        secondaryCtaHref: "/modelun/committees",
        questionsText: t("questionsText"),
        contactEmail: "modelun@jamun.org",
        contactLinkText: t("contactLink"),
      }}
    />
  );
}
