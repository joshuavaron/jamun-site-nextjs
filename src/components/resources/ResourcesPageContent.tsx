"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Search,
  FileText,
  Video,
  File,
  Star,
  X,
  Clock,
  Trophy,
  Zap,
  PenTool,
  Compass,
  CheckCircle2,
} from "lucide-react";
import {
  Container,
  Heading,
  PillButton,
  ArrowLink,
  IconTile,
} from "@/components/ui";
import { fontBody, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { TestimonialSpread } from "@/components/sections/TestimonialSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { cn } from "@/lib/utils";
import type {
  ResourceMeta,
  ResourceCategory,
  ResourceFormat,
  ProgramConfig,
} from "@/lib/program-resources";
import type { LucideIcon } from "lucide-react";

// ────────── Photos — unique to this page ──────────
const PHOTOS = {
  hero: "/images/conferences/DSCF9443.webp",
  ppwPromo: "/images/conferences/DSC01601.webp",
  testimonial: "/images/conferences/DSC01363.webp",
  finalCta: "/images/conferences/DSCF9430.webp",
} as const;

// ────────── Learning paths ──────────
const LEARNING_PATHS = [
  {
    key: "gettingStarted",
    icon: Compass,
    color: "#10b981",
    slugs: ["delegate-handbook", "rules-of-procedure", "public-speaking-tips"],
  },
  {
    key: "writingSkills",
    icon: PenTool,
    color: "#f97316",
    slugs: [
      "writing-position-papers",
      "resolution-writing-guide",
      "ga-position-paper-outline",
      "draft-resolution-outline",
    ],
  },
  {
    key: "crisisCommittees",
    icon: Zap,
    color: "#ef4444",
    slugs: [
      "crisis-guide",
      "crisis-position-paper-outline",
      "directive-outline",
      "example-directive",
      "example-crisis-note",
    ],
  },
  {
    key: "levelUp",
    icon: Trophy,
    color: "#9333ea",
    slugs: [
      "advanced-debate-strategies",
      "country-research-guide",
      "ga-guide",
    ],
  },
];

// PATH_TITLES moved inside component for i18n access

// ────────── Format config ──────────
const FORMAT_CONFIG: Record<
  ResourceFormat,
  { icon: LucideIcon; color: string }
> = {
  Article: { icon: BookOpen, color: "#10b981" },
  PDF: { icon: FileText, color: "#397bce" },
  Video: { icon: Video, color: "#ef4444" },
  Worksheet: { icon: File, color: "#f97316" },
};

// ────────── Props ──────────
interface ResourcesPageContentProps {
  resources: ResourceMeta[];
  programConfig: ProgramConfig;
}

export default function ResourcesPageContent({
  resources,
  programConfig,
}: ResourcesPageContentProps) {
  const t = useTranslations(programConfig.translationNamespace);

  const PATH_TITLES: Record<string, { title: string; description: string }> = {
    gettingStarted: {
      title: t("pathGettingStartedTitle"),
      description: t("pathGettingStartedDescription"),
    },
    writingSkills: {
      title: t("pathWritingSkillsTitle"),
      description: t("pathWritingSkillsDescription"),
    },
    crisisCommittees: {
      title: t("pathCrisisCommitteesTitle"),
      description: t("pathCrisisCommitteesDescription"),
    },
    levelUp: {
      title: t("pathLevelUpTitle"),
      description: t("pathLevelUpDescription"),
    },
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory | null>(null);

  const { basePath } = programConfig;

  // Category counts
  const categoryOptions = useMemo(() => {
    const counts: Record<ResourceCategory, number> = {
      Skills: 0,
      Background: 0,
      Rules: 0,
      Reference: 0,
      Examples: 0,
      Strategy: 0,
    };
    resources.forEach((r) => counts[r.category]++);
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => ({ name: name as ResourceCategory, count }));
  }, [resources]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        !selectedCategory || resource.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== null || searchQuery.length > 0;
  const featuredCount = resources.filter((r) => r.featured).length;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const getCategoryName = (category: ResourceCategory): string => {
    const categoryMap: Record<ResourceCategory, string> = {
      Skills: t("categorySkills"),
      Background: t("categoryBackground"),
      Rules: t("categoryRules"),
      Reference: t("categoryReference"),
      Examples: t("categoryExamples"),
      Strategy: t("categoryStrategy"),
    };
    return categoryMap[category] || category;
  };

  // Empty state for programs with no resources yet
  if (resources.length === 0) {
    return (
      <div className="bg-white text-[#0a0a0a]">
        <section className="bg-white">
          <Container className="py-24">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <Heading size="micro" className="mb-2">
                {t("comingSoonTitle")}
              </Heading>
              <p style={fontBody} className={bodySize.base}>
                {t("comingSoonDescription")}
              </p>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.hero}
        photoAlt={t("heroPhotoAlt")}
        photoPriority
        photoClassName="min-h-[60svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("heroTitle")}
          <span className="text-[#f97316]">{t("heroTitleHighlight")}</span>
        </Heading>

        <p style={fontBody} className={`mt-6 max-w-lg ${bodySize.lead}`}>
          {t("heroDescription")}
        </p>

        {/* Search */}
        <div className="relative max-w-md mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={fontBody}
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#397bce]/30 focus:border-[#397bce] transition-all text-[15px]"
          />
        </div>

        {/* Quick stats */}
        <div
          style={fontBody}
          className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-neutral-500"
        >
          <span>
            <strong className="text-[#0a0a0a]">{resources.length}</strong>{" "}
            {t("resources")}
          </span>
          <span className="text-neutral-300">&middot;</span>
          <span>
            <strong className="text-[#0a0a0a]">{featuredCount}</strong>{" "}
            {t("featured")}
          </span>
          <span className="text-neutral-300">&middot;</span>
          <span>
            <strong className="text-[#10b981]">100%</strong> {t("free")}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="#resources" withArrow>
            {t("sectionTitle")}
          </PillButton>
          {programConfig.type === "modelun" && (
            <PillButton
              href={`${basePath}/position-paper-writer`}
              tone="outline"
            >
              {t("positionPaperWriter")}
            </PillButton>
          )}
        </div>
      </DiagonalSpread>

      {/* ───── Learning Paths ───── */}
      <section className="bg-white">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("learningPathsTitle")}
            subtitle={t("learningPathsSubtitle")}
            spacing="loose"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {LEARNING_PATHS.map((path, i) => {
              const info = PATH_TITLES[path.key];
              const pathResources = resources.filter((r) =>
                path.slugs.includes(r.slug)
              );
              if (pathResources.length === 0) return null;

              return (
                <motion.div
                  key={path.key}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="rounded-2xl border border-black/5 p-6 md:p-8 flex flex-col"
                >
                  <IconTile
                    icon={path.icon}
                    color={path.color}
                    size="md"
                    className="mb-5"
                  />
                  <Heading size="cardLg" className="mb-2">
                    {info.title}
                  </Heading>
                  <p
                    style={fontBody}
                    className={`${bodySize.micro} mb-5`}
                  >
                    {info.description}
                  </p>

                  <div className="space-y-1.5 mb-6 flex-1">
                    {pathResources.map((resource, idx) => (
                      <Link
                        key={resource.slug}
                        href={`${basePath}/${resource.slug}`}
                        className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                          style={{ backgroundColor: path.color }}
                        >
                          {idx + 1}
                        </span>
                        <span
                          style={fontBody}
                          className="text-sm font-medium text-neutral-700 group-hover:text-[#0a0a0a] transition-colors"
                        >
                          {resource.title}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <ArrowLink
                    href="#resources"
                    color={path.color}
                    className="mt-auto self-start"
                  >
                    {t("viewAllResources")}
                  </ArrowLink>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───── Position Paper Writer Promo (Model UN only) ───── */}
      {programConfig.type === "modelun" && (
        <DiagonalSpread
          photoSide="right"
          photoSrc={PHOTOS.ppwPromo}
          photoAlt={t("ppwPhotoAlt")}
          clip="none"
          panelBg="#9333ea"
          panelText="#ffffff"
        >
          <span
            style={{
              ...fontBody,
              backgroundColor: "rgba(255,255,255,0.18)",
            }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-white mb-6"
          >
            <PenTool className="w-3.5 h-3.5" />
            {t("newTool")}
          </span>

          <Heading size="section" className="text-white mb-4">
            {t("positionPaperWriter")}
          </Heading>

          <p
            style={fontBody}
            className={`${bodySize.lead} text-white/90 mb-8`}
          >
            {t("ppwDescription")}
          </p>

          <div className="space-y-2.5 mb-8">
            {[
              t("ppwFeature1"),
              t("ppwFeature2"),
              t("ppwFeature3"),
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2.5 text-sm text-white/90"
              >
                <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0" />
                <span style={fontBody}>{feature}</span>
              </div>
            ))}
          </div>

          <PillButton
            href={`${basePath}/position-paper-writer`}
            tone="custom"
            color="#ffffff"
            className="!text-[#0a0a0a]"
            withArrow
          >
            {t("startWriting")}
          </PillButton>
        </DiagonalSpread>
      )}

      {/* ───── All Resources ───── */}
      <section className="bg-white border-t border-black/5" id="resources">
        <Container className="py-14 md:py-20">
          <SectionIntro
            title={t("browseAllTitle")}
            subtitle={t("browseAllSubtitle", {
              count: resources.length,
            })}
          />

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-12 md:mb-16"
          >
            {/* Category row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={fontBody}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mr-2 shrink-0"
              >
                {t("filterCategory")}
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                style={fontBody}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === null
                    ? "bg-[#397bce] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {t("all")}
                <span className="ml-1.5 text-xs opacity-60">
                  ({resources.length})
                </span>
              </button>
              {categoryOptions.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.name ? null : cat.name
                    )
                  }
                  style={fontBody}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === cat.name
                      ? "bg-[#397bce] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {getCategoryName(cat.name)}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Active filter info + clear */}
            {hasActiveFilters && (
              <div className="flex items-center gap-4 pt-2">
                <span style={fontBody} className="text-sm text-neutral-500">
                  {t("showingResults", {
                    count: filteredResources.length,
                    total: resources.length,
                  })}
                </span>
                <button
                  onClick={clearFilters}
                  style={fontBody}
                  className="flex items-center gap-1 text-sm font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  {t("clearAll")}
                </button>
              </div>
            )}
          </motion.div>

          {/* Grid or empty state */}
          {filteredResources.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <Heading size="micro" className="mb-2">
                {t("noResultsTitle")}
              </Heading>
              <p
                style={fontBody}
                className={`${bodySize.base} mb-6 max-w-md mx-auto`}
              >
                {t("noResultsDescription")}
              </p>
              <PillButton onClick={clearFilters} tone="outline" size="md">
                {t("clearFilters")}
              </PillButton>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredResources.map((resource, i) => {
                const fmt =
                  FORMAT_CONFIG[resource.format] || FORMAT_CONFIG.Article;
                return (
                  <motion.div
                    key={resource.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: (i % 3) * 0.08,
                      duration: 0.7,
                    }}
                  >
                    <Link
                      href={`${basePath}/${resource.slug}`}
                      className="group block h-full rounded-2xl border border-black/5 p-6 md:p-7 transition-colors hover:border-black/10"
                    >
                      {/* Top row: format icon + featured badge */}
                      <div className="flex items-start justify-between mb-4">
                        <IconTile
                          icon={fmt.icon}
                          color={fmt.color}
                          size="sm"
                        />
                        {resource.featured && (
                          <span
                            style={{
                              ...fontBody,
                              backgroundColor: "#f973161a",
                              color: "#f97316",
                            }}
                            className="rounded-full px-3 py-1 text-xs font-semibold shrink-0 flex items-center gap-1"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            {t("featured")}
                          </span>
                        )}
                      </div>

                      {/* Category label */}
                      <p
                        style={fontBody}
                        className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-3"
                      >
                        {getCategoryName(resource.category)}
                      </p>

                      {/* Title */}
                      <Heading
                        size="micro"
                        className="text-[#397bce] group-hover:text-[#2a5fa3] transition-colors mb-2"
                      >
                        {resource.title}
                      </Heading>

                      {/* Description */}
                      <p
                        style={fontBody}
                        className={`${bodySize.micro} flex-1 mb-6 line-clamp-2`}
                      >
                        {resource.description}
                      </p>

                      {/* Footer metadata */}
                      <div
                        style={fontBody}
                        className="pt-4 border-t border-black/5 flex items-center gap-3 text-sm text-neutral-500"
                      >
                        {resource.duration && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {resource.duration}
                          </span>
                        )}
                        {resource.pages && (
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            {resource.pages} {t("pages")}
                          </span>
                        )}
                        <span
                          className="ml-auto flex items-center gap-1.5 text-[#397bce] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {t("readMore")} →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* ───── Testimonial ───── */}
      <TestimonialSpread
        bg="#397bce"
        photoSide="right"
        photoSrc={PHOTOS.testimonial}
        photoAlt={t("testimonialPhotoAlt")}
        heading={t("testimonialHeading")}
        quote={t("testimonialQuote")}
        attribution={t("testimonialAttribution")}
      />

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="md:min-h-[70svh]"
        panelClassName="py-12 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("ctaTitle")}
          <span className="text-[#f97316]">{t("ctaTitleHighlight")}</span>
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("ctaDescription")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href={t("primaryButtonHref")} withArrow>
            {t("primaryButton")}
          </PillButton>
          <PillButton href={t("secondaryButtonHref")} tone="outline">
            {t("secondaryButton")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("questionsText")}{" "}
          <a
            href={`mailto:${programConfig.contactEmail}`}
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            {programConfig.contactEmail}
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
