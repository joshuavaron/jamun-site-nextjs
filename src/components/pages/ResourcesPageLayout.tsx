"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Button, TypewriterText } from "@/components/ui";
import {
  ArrowRight,
  Search,
  FileText,
  Video,
  File,
  Star,
  X,
  Download,
  Clock,
  Layers,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { containerVariants, itemVariants } from "@/lib/animations";
import type { BaseResourceMeta } from "@/lib/resource-loader";

// Use the BaseResourceMeta type from resource-loader for type consistency
type BaseResource = BaseResourceMeta;

// Color theme configuration
export interface ColorTheme {
  // Hero section gradient
  heroGradient: string;
  // Decorative blob colors
  blobColors: [string, string, string];
  // Badge styling
  badgeClasses: string;
  // Filter button active state
  categoryActiveClasses: string;
  formatActiveClasses: string;
  // Clear filter text color
  clearFilterClasses: string;
  // Search ring color
  searchRingClasses: string;
  // Resource card hover color
  cardHoverClasses: string;
  // PDF format icon color
  formatPDFClasses: string;
  // CTA section
  ctaBadgeClasses: string;
  ctaGradientClasses: string;
  // Email link color
  emailLinkClasses: string;
}

// Format icons
function getFormatIcon(format: string): LucideIcon {
  switch (format) {
    case "Video":
      return Video;
    case "PDF":
      return FileText;
    case "Template":
    case "Worksheet":
      return File;
    default:
      return BookOpen;
  }
}

// Generic format colors (can be overridden by theme)
function getFormatColor(format: string, theme: ColorTheme): string {
  switch (format) {
    case "Video":
      return "bg-red-100 text-red-700";
    case "PDF":
      return theme.formatPDFClasses;
    case "Template":
      return "bg-purple-100 text-purple-700";
    case "Worksheet":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

interface CategoryOption<T extends string> {
  name: T;
  count: number;
}

interface FormatOption<T extends string> {
  name: T;
  count: number;
}

interface EmptyStateConfig {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

interface TranslationStrings {
  heroBadge: string;
  heroTitlePart1: string;
  heroTitlePart2: string;
  heroDescription: string;
  searchPlaceholder: string;
  resourcesLabel: string;
  categoriesLabel: string;
  featuredLabel: string;
  filterTitle: string;
  clearAll: string;
  categoryLabel: string;
  formatLabel: string;
  showingResults: (count: number, total: number) => string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionSubtitle: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFilters: string;
  pagesLabel: string;
  downloadLabel: string;
  ctaBadge: string;
  ctaTitlePart1: string;
  ctaTitlePart2: string;
  ctaDescription: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  questionsText: string;
  contactEmail: string;
  contactLinkText: string;
}

interface ResourcesPageLayoutProps<TCategory extends string, TFormat extends string> {
  resources: BaseResource[];
  programSlug: string;
  heroIcon: LucideIcon;
  colorTheme: ColorTheme;
  allCategories: TCategory[];
  allFormats: TFormat[];
  getCategoryName: (category: TCategory) => string;
  getFormatName: (format: TFormat) => string;
  translations: TranslationStrings;
  emptyState?: EmptyStateConfig;
}

export default function ResourcesPageLayout<TCategory extends string, TFormat extends string>({
  resources,
  programSlug,
  heroIcon: HeroIcon,
  colorTheme,
  allCategories,
  allFormats,
  getCategoryName,
  getFormatName,
  translations: t,
  emptyState,
}: ResourcesPageLayoutProps<TCategory, TFormat>) {
  const [selectedCategories, setSelectedCategories] = useState<Set<TCategory>>(new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<TFormat>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle functions for multi-select
  const toggleCategory = (category: TCategory) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setSelectedCategories(newSet);
  };

  const toggleFormat = (format: TFormat) => {
    const newSet = new Set(selectedFormats);
    if (newSet.has(format)) {
      newSet.delete(format);
    } else {
      newSet.add(format);
    }
    setSelectedFormats(newSet);
  };

  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedFormats(new Set());
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategories.size > 0 ||
    selectedFormats.size > 0 ||
    searchQuery.length > 0;

  // Build category options with counts
  const categoryOptions: CategoryOption<TCategory>[] = allCategories
    .map((name) => ({
      name,
      count: resources.filter((r) => r.category === name).length,
    }))
    .filter((c) => c.count > 0);

  // Format options with counts
  const formatOptions: FormatOption<TFormat>[] = allFormats
    .map((name) => ({
      name,
      count: resources.filter((r) => r.format === name).length,
    }))
    .filter((f) => f.count > 0);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategories.size === 0 ||
      selectedCategories.has(resource.category as TCategory);
    const matchesFormat =
      selectedFormats.size === 0 || selectedFormats.has(resource.format as TFormat);
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesFormat && matchesSearch;
  });

  // Count totals
  const featuredCount = resources.filter((r) => r.featured).length;
  const categoryCount = categoryOptions.length;

  // Check if we're in "coming soon" mode (no resources)
  const isComingSoon = resources.length === 0 && emptyState;

  return (
    <main>
      {/* Hero Section with Filters */}
      <section className={cn(
        "relative overflow-hidden min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24",
        colorTheme.heroGradient
      )}>
        {/* Decorative elements */}
        <div className={cn("absolute top-1/4 left-0 w-72 h-72 rounded-full blur-3xl -z-10", colorTheme.blobColors[0])} />
        <div className={cn("absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl -z-10", colorTheme.blobColors[1])} />
        <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl -z-10", colorTheme.blobColors[2])} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={cn("inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium rounded-full border", colorTheme.badgeClasses)}
              >
                <HeroIcon className="w-4 h-4" />
                {t.heroBadge}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t.heroTitlePart1} delay={0.3} />
                <TypewriterText
                  text={t.heroTitlePart2}
                  delay={0.3 + t.heroTitlePart1.length * 0.03}
                  className={colorTheme.ctaGradientClasses}
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {t.heroDescription}
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative max-w-md"
              >
                <label htmlFor="resource-search" className="sr-only">
                  {t.searchPlaceholder}
                </label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="resource-search"
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all",
                    colorTheme.searchRingClasses
                  )}
                />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-6 mt-8"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{resources.length}</strong>{" "}
                    {t.resourcesLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Layers className="w-5 h-5 text-jamun-blue" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{categoryCount}</strong>{" "}
                    {t.categoriesLabel}
                  </span>
                </div>
                {featuredCount > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-5 h-5 text-amber-600" />
                    <span className="text-sm">
                      <strong className="text-gray-900">{featuredCount}</strong>{" "}
                      {t.featuredLabel}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Filters Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.filterTitle}
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className={cn("text-sm font-medium flex items-center gap-1", colorTheme.clearFilterClasses)}
                  >
                    <X className="w-4 h-4" />
                    {t.clearAll}
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                {categoryOptions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      {t.categoryLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => toggleCategory(category.name)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                            selectedCategories.has(category.name)
                              ? colorTheme.categoryActiveClasses
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          {getCategoryName(category.name)}
                          <span
                            className={cn(
                              "ml-1.5 text-xs",
                              selectedCategories.has(category.name)
                                ? "text-white/70"
                                : "text-gray-400"
                            )}
                          >
                            ({category.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Format Filter */}
                {formatOptions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t.formatLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {formatOptions.map((format) => (
                        <button
                          key={format.name}
                          onClick={() => toggleFormat(format.name)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                            selectedFormats.has(format.name)
                              ? colorTheme.formatActiveClasses
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          {getFormatName(format.name)}
                          <span
                            className={cn(
                              "ml-1.5 text-xs",
                              selectedFormats.has(format.name)
                                ? "text-white/70"
                                : "text-gray-400"
                            )}
                          >
                            ({format.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state message when no resources */}
                {isComingSoon && (
                  <div className="text-center py-8">
                    <HeroIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {emptyState.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Results count */}
              {resources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    {t.showingResults(filteredResources.length, resources.length)}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t.sectionEyebrow}
          title={t.sectionTitle}
          subtitle={t.sectionSubtitle}
        />

        {isComingSoon ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className={cn("w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center", colorTheme.ctaBadgeClasses)}>
              <HeroIcon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {emptyState.title}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {emptyState.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={emptyState.primaryCta.href} className={cn("group", colorTheme.categoryActiveClasses)}>
                {emptyState.primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={emptyState.secondaryCta.href} variant="outline">
                {emptyState.secondaryCta.text}
              </Button>
            </div>
          </motion.div>
        ) : filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.noResultsTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.noResultsDescription}
            </p>
            <Button onClick={clearAllFilters} variant="outline">
              {t.clearFilters}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={`${Array.from(selectedCategories).join("-")}-${Array.from(selectedFormats).join("-")}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource) => {
              const FormatIcon = getFormatIcon(resource.format);
              return (
                <motion.div key={resource.slug} variants={itemVariants}>
                  <Link href={`/${programSlug}/resources/${resource.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Header: Format Icon + Featured Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            getFormatColor(resource.format, colorTheme)
                          )}
                        >
                          <FormatIcon className="w-5 h-5" />
                        </div>
                        {resource.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                            <Star className="w-3 h-3" />
                            {t.featuredLabel}
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        {getCategoryName(resource.category as TCategory)}
                      </p>

                      {/* Title */}
                      <h4 className={cn("text-lg font-semibold text-gray-900 mb-2 transition-colors", colorTheme.cardHoverClasses)}>
                        {resource.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                        {resource.description}
                      </p>

                      {/* Footer: Meta info */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {resource.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {resource.duration}
                            </span>
                          )}
                          {resource.pages && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {resource.pages} {t.pagesLabel}
                            </span>
                          )}
                          {resource.downloadUrl && (
                            <span className={cn("flex items-center gap-1", colorTheme.emailLinkClasses)}>
                              <Download className="w-4 h-4" />
                              {t.downloadLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Section>

      {/* CTA Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className={cn("inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full", colorTheme.ctaBadgeClasses)}>
            <HeroIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t.ctaBadge}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t.ctaTitlePart1}
            <span className={colorTheme.ctaGradientClasses}>
              {t.ctaTitlePart2}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                {t.primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href={t.secondaryCtaHref} variant="outline" size="lg">
                {t.secondaryCtaText}
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            {t.questionsText}{" "}
            <a
              href={`mailto:${t.contactEmail}`}
              className={cn("transition-colors font-medium", colorTheme.emailLinkClasses)}
            >
              {t.contactLinkText}
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
