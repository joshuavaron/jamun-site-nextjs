"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Search, Users, X } from "lucide-react";
import { Container, Heading, PillButton } from "@/components/ui";
import { fontBody, fontHeading, bodySize } from "@/lib/typography";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { cn } from "@/lib/utils";
import type { CommitteeMeta } from "@/lib/committees";
import { useTranslations } from "next-intl";

// ────────── Photos — unique to this page ──────────
const PHOTOS = {
  hero: "/images/conferences/DSC01567.webp",
  finalCta: "/images/conferences/DSC01724.webp",
} as const;

// ────────── ShiftingTopic for Ad-Hoc committees ──────────
function ShiftingTopic({ topics }: { topics: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (topics.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topics.length);
    }, 100);
    return () => clearInterval(interval);
  }, [topics.length]);

  if (topics.length === 0) return <span>CLASSIFIED</span>;

  return <span className="font-mono">{topics[currentIndex]}</span>;
}

// ────────── Types & helpers ──────────
type CommitteeType =
  | "General Assembly"
  | "Crisis"
  | "Security Council"
  | "Specialized Agency"
  | "Regional Body";

type DifficultyLevel = "Beginner-Friendly" | "Intermediate" | "Advanced";
type SizeCategory = "Small" | "Medium" | "Large";

function getSizeCategory(delegateCount: number): SizeCategory {
  if (delegateCount < 24) return "Small";
  if (delegateCount < 40) return "Medium";
  return "Large";
}

function levelStyle(level: string) {
  if (level === "Beginner-Friendly")
    return { bg: "#10b9811a", text: "#10b981" };
  if (level === "Intermediate") return { bg: "#f973161a", text: "#f97316" };
  return { bg: "#ef44441a", text: "#ef4444" };
}

const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  "Beginner-Friendly": "#10b981",
  Intermediate: "#f97316",
  Advanced: "#ef4444",
};

// ────────── Component ──────────

interface CommitteesPageContentProps {
  committees: CommitteeMeta[];
}

export default function CommitteesPageContent({
  committees,
}: CommitteesPageContentProps) {
  const t = useTranslations("CommitteesPage");

  // Translation helpers
  const getTypeName = (type: CommitteeType): string => {
    switch (type) {
      case "General Assembly":
        return t("typeGeneralAssembly");
      case "Crisis":
        return t("typeCrisis");
      case "Security Council":
        return t("typeSecurityCouncil");
      case "Specialized Agency":
        return t("typeSpecializedAgency");
      case "Regional Body":
        return t("typeRegionalBody");
    }
  };

  const getDifficultyName = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case "Beginner-Friendly":
        return t("difficultyBeginner");
      case "Intermediate":
        return t("difficultyIntermediate");
      case "Advanced":
        return t("difficultyAdvanced");
    }
  };

  const getSizeLabel = (size: SizeCategory): string => {
    switch (size) {
      case "Small":
        return t("sizeSmall");
      case "Medium":
        return t("sizeMedium");
      case "Large":
        return t("sizeLarge");
    }
  };

  // ── Filter state ──
  const [selectedTypes, setSelectedTypes] = useState<Set<CommitteeType>>(
    new Set()
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<DifficultyLevel>
  >(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<SizeCategory>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleType = (type: CommitteeType) => {
    const next = new Set(selectedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setSelectedTypes(next);
  };

  const toggleDifficulty = (difficulty: DifficultyLevel) => {
    const next = new Set(selectedDifficulties);
    if (next.has(difficulty)) next.delete(difficulty);
    else next.add(difficulty);
    setSelectedDifficulties(next);
  };

  const toggleSize = (size: SizeCategory) => {
    const next = new Set(selectedSizes);
    if (next.has(size)) next.delete(size);
    else next.add(size);
    setSelectedSizes(next);
  };

  const clearAllFilters = () => {
    setSelectedTypes(new Set());
    setSelectedDifficulties(new Set());
    setSelectedSizes(new Set());
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedTypes.size > 0 ||
    selectedDifficulties.size > 0 ||
    selectedSizes.size > 0 ||
    searchQuery.length > 0;

  // ── Derived data ──
  const allTypeOptions: { name: CommitteeType; count: number }[] = [
    {
      name: "General Assembly",
      count: committees.filter((c) => c.category === "General Assembly").length,
    },
    {
      name: "Crisis",
      count: committees.filter((c) => c.category === "Crisis").length,
    },
    {
      name: "Security Council",
      count: committees.filter((c) => c.category === "Security Council").length,
    },
    {
      name: "Specialized Agency",
      count: committees.filter((c) => c.category === "Specialized Agency")
        .length,
    },
    {
      name: "Regional Body",
      count: committees.filter((c) => c.category === "Regional Body").length,
    },
  ];
  const typeOptions = allTypeOptions.filter((t) => t.count > 0);

  const difficultyOptions: DifficultyLevel[] = [
    "Beginner-Friendly",
    "Intermediate",
    "Advanced",
  ];
  const sizeOptions: SizeCategory[] = ["Small", "Medium", "Large"];

  const filteredCommittees = committees.filter((committee) => {
    const matchesType =
      selectedTypes.size === 0 ||
      selectedTypes.has(committee.category as CommitteeType);
    const matchesDifficulty =
      selectedDifficulties.size === 0 ||
      selectedDifficulties.has(committee.level as DifficultyLevel);
    const matchesSize =
      selectedSizes.size === 0 ||
      selectedSizes.has(getSizeCategory(committee.delegateCount));
    const matchesSearch =
      committee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesDifficulty && matchesSize && matchesSearch;
  });

  const totalDelegates = committees.reduce(
    (sum, c) => sum + c.delegateCount,
    0
  );
  const beginnerCount = committees.filter(
    (c) => c.level === "Beginner-Friendly"
  ).length;

  const filterKey = `${Array.from(selectedTypes).join("-")}-${Array.from(selectedDifficulties).join("-")}-${Array.from(selectedSizes).join("-")}-${searchQuery}`;

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.hero}
        photoAlt="JAMUN delegates studying background guides before committee session."
        photoPriority
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        <Heading size="hero">
          {t("heroTitlePart1")}
          <span className="text-[#397bce]">{t("heroTitlePart2")}</span>
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
            <strong className="text-[#0a0a0a]">{committees.length}</strong>{" "}
            {t("statsCommittees")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">{totalDelegates}+</strong>{" "}
            {t("statsDelegateSpots")}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-[#0a0a0a]">{beginnerCount}</strong>{" "}
            {t("statsBeginnerFriendly")}
          </span>
        </div>
      </DiagonalSpread>

      {/* ───── Filters + Grid ───── */}
      <section className="bg-white border-t border-black/5">
        <Container className="py-14 md:py-20">
          {/* Filter rows */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-12 md:mb-16"
          >
            {/* Type */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={fontBody}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mr-2 shrink-0"
              >
                {t("filterType")}
              </span>
              {typeOptions.map((type) => (
                <button
                  key={type.name}
                  onClick={() => toggleType(type.name)}
                  style={fontBody}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedTypes.has(type.name)
                      ? "bg-[#397bce] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {getTypeName(type.name)}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({type.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={fontBody}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mr-2 shrink-0"
              >
                {t("filterDifficulty")}
              </span>
              {difficultyOptions.map((difficulty) => {
                const hex = DIFFICULTY_COLORS[difficulty];
                return (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    style={{
                      ...fontBody,
                      ...(selectedDifficulties.has(difficulty)
                        ? { backgroundColor: hex, color: "#fff" }
                        : {}),
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      !selectedDifficulties.has(difficulty) &&
                        "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                  >
                    {getDifficultyName(difficulty)}
                  </button>
                );
              })}
            </div>

            {/* Size */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={fontBody}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mr-2 shrink-0"
              >
                {t("filterSize")}
              </span>
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  style={fontBody}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedSizes.has(size)
                      ? "bg-[#0ea5e9] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {getSizeLabel(size)}
                </button>
              ))}
            </div>

            {/* Active filter info + clear */}
            {hasActiveFilters && (
              <div className="flex items-center gap-4 pt-2">
                <span style={fontBody} className="text-sm text-neutral-500">
                  {t("showingResults", {
                    count: filteredCommittees.length,
                    total: committees.length,
                  })}
                </span>
                <button
                  onClick={clearAllFilters}
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
          {filteredCommittees.length === 0 ? (
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
              <PillButton onClick={clearAllFilters} tone="outline" size="md">
                {t("clearFilters")}
              </PillButton>
            </motion.div>
          ) : (
            <div
              key={filterKey}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredCommittees.map((committee, i) => {
                const lvl = levelStyle(committee.level);
                return (
                  <motion.div
                    key={committee.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.7 }}
                  >
                    <Link
                      href={`/modelun/committees/${committee.slug}`}
                      className="group block h-full rounded-2xl border border-black/5 p-6 md:p-7 transition-colors hover:border-black/10"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span
                          style={{ ...fontHeading, fontWeight: 600 }}
                          className="text-2xl text-[#0a0a0a]"
                        >
                          {committee.abbreviation}
                        </span>
                        <span
                          style={{
                            ...fontBody,
                            backgroundColor: lvl.bg,
                            color: lvl.text,
                          }}
                          className="rounded-full px-3 py-1 text-xs font-semibold shrink-0"
                        >
                          {getDifficultyName(
                            committee.level as DifficultyLevel
                          )}
                        </span>
                      </div>

                      <p
                        style={fontBody}
                        className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-4"
                      >
                        {getTypeName(committee.category as CommitteeType)}
                      </p>

                      <Heading
                        size="micro"
                        className="text-[#397bce] group-hover:text-[#2a5fa3] transition-colors mb-2"
                      >
                        {committee.isAdHoc &&
                        committee.redHerringTopics &&
                        committee.redHerringTopics.length > 0 ? (
                          <ShiftingTopic topics={committee.redHerringTopics} />
                        ) : (
                          committee.topic
                        )}
                      </Heading>

                      <p
                        style={fontBody}
                        className={`${bodySize.micro} flex-1 mb-6`}
                      >
                        {committee.description}
                      </p>

                      <div
                        style={fontBody}
                        className="pt-4 border-t border-black/5 flex items-center gap-2 text-sm text-neutral-500"
                      >
                        <Users className="w-4 h-4" />
                        <span>
                          {t("delegates", {
                            count: committee.delegateCount,
                          })}
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

      {/* ───── Final CTA ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={PHOTOS.finalCta}
        photoAlt="JAMUN delegates celebrating together after a successful conference."
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("ctaTitle")}
          <span className="text-[#397bce]">{t("ctaTitleHighlight")}</span>
        </Heading>

        <p style={fontBody} className={`${bodySize.lead} mb-9`}>
          {t("ctaDescription")}
        </p>

        <div className="flex flex-wrap gap-3">
          <PillButton href="/register" withArrow>
            {t("registerButton")}
          </PillButton>
          <PillButton href="/modelun" tone="outline">
            {t("learnMoreButton")}
          </PillButton>
        </div>

        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("ctaQuestion")}{" "}
          <a
            href="mailto:modelun@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            {t("ctaContactLink")}
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
