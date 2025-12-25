"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Users,
  ChevronUp,
  Medal,
  ArrowRight,
  Scale,
  Calculator,
  Globe,
  Minus,
  Layers,
} from "lucide-react";
import { Button, Section, TypewriterText } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  LEADERBOARDS,
  isTied,
  getMovement,
  getTopMovers,
  type LeaderboardEntry,
} from "@/lib/leaderboard";
import { useTranslations } from "next-intl";

// =============================================================================
// ANIMATED COUNTER COMPONENT
// =============================================================================

function AnimatedNumber({ value, duration = 1400 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart easing
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

// =============================================================================
// RANK BADGE COMPONENT
// =============================================================================

function RankBadge({ rank, isTied }: { rank: number; isTied: boolean }) {
  const getRankStyle = () => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-200";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-lg shadow-gray-200";
    if (rank === 3) return "bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-200";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className={cn(
      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl",
      getRankStyle()
    )}>
      {isTied ? "T" : ""}{rank}
    </div>
  );
}

// =============================================================================
// MOVEMENT INDICATOR COMPONENT
// =============================================================================

function MovementIndicator({ movement, sameLabel }: { movement: number; sameLabel: string }) {
  if (movement === 0) {
    return (
      <span className="flex items-center text-gray-400 text-sm font-medium">
        <Minus className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">{sameLabel}</span>
      </span>
    );
  }

  if (movement > 0) {
    return (
      <span className="flex items-center text-emerald-600 text-sm font-medium">
        <ChevronUp className="w-4 h-4" />
        <span>{movement}</span>
      </span>
    );
  }

  return (
    <span className="flex items-center text-red-500 text-sm font-medium rotate-180">
      <ChevronUp className="w-4 h-4" />
      <span className="rotate-180">{Math.abs(movement)}</span>
    </span>
  );
}

// =============================================================================
// LEADERBOARD FILTER TABS
// =============================================================================

function LeaderboardTabs({
  activeTab,
  onTabChange,
  tabLabels,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabLabels: { overall: string; modelUN: string; mockTrial: string; mathletes: string };
}) {
  const tabs: { id: string; name: string; icon: React.ReactNode }[] = [
    { id: "Overall", name: tabLabels.overall, icon: <Layers className="w-4 h-4" /> },
    { id: "Model UN", name: tabLabels.modelUN, icon: <Globe className="w-4 h-4" /> },
    { id: "Mock Trial", name: tabLabels.mockTrial, icon: <Scale className="w-4 h-4" /> },
    { id: "Mathletes", name: tabLabels.mathletes, icon: <Calculator className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
            activeTab === tab.id
              ? "bg-jamun-blue text-white shadow-lg shadow-jamun-blue/25"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-jamun-blue/30"
          )}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// STANDINGS TABLE COMPONENT
// =============================================================================

function StandingsTable({
  entries,
  labels,
}: {
  entries: LeaderboardEntry[];
  labels: { rank: string; school: string; score: string; movement: string; same: string };
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-2 md:gap-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-2 text-center">{labels.rank}</div>
          <div className="col-span-6 md:col-span-7">{labels.school}</div>
          <div className="col-span-2 text-center">{labels.score}</div>
          <div className="col-span-2 text-center">{labels.movement}</div>
        </div>
      </div>

      {/* Table Body */}
      <motion.div
        key="standings"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="divide-y divide-gray-100"
      >
        {entries.map((entry, index) => {
          const tied = isTied(entry, entries);
          const movement = getMovement(entry);

          return (
            <motion.div
              key={entry.school}
              variants={rowVariants}
              className={cn(
                "grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 items-center transition-colors hover:bg-gray-50",
                entry.rank <= 3 && "bg-gradient-to-r from-amber-50/50 to-transparent"
              )}
            >
              {/* Rank */}
              <div className="col-span-2 flex justify-center">
                <RankBadge rank={entry.rank} isTied={tied} />
              </div>

              {/* School Name */}
              <div className="col-span-6 md:col-span-7">
                <p className="font-semibold text-gray-900 text-sm md:text-base">{entry.school}</p>
              </div>

              {/* Score */}
              <div className="col-span-2 text-center">
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  <AnimatedNumber value={entry.score} duration={800 + index * 50} />
                </span>
              </div>

              {/* Movement */}
              <div className="col-span-2 flex justify-center">
                <MovementIndicator movement={movement} sameLabel={labels.same} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// =============================================================================
// TOP MOVERS SECTION
// =============================================================================

function TopMoversSection({
  movers,
  labels,
}: {
  movers: LeaderboardEntry[];
  labels: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    spots: string;
    nowRank: (rank: number) => string;
    wasRank: (rank: number) => string;
    currentScore: string;
    pts: string;
  };
}) {
  if (movers.length === 0) return null;

  return (
    <Section background="gray" className="py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200">
          <TrendingUp className="w-4 h-4" />
          {labels.badge}
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          {labels.title}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            {labels.titleHighlight}
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {labels.subtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movers.map((entry, index) => {
          const movement = getMovement(entry);

          return (
            <motion.div
              key={entry.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-teal-50/0 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300" />

              <div className="relative z-10">
                {/* Movement Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex items-center text-emerald-600 font-bold text-lg">
                      <ChevronUp className="w-5 h-5" />
                      {movement} {labels.spots}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{labels.nowRank(entry.rank)}</div>
                    <div className="text-xs text-gray-400">{labels.wasRank(entry.previousRank)}</div>
                  </div>
                </div>

                {/* School Name */}
                <h3 className="font-semibold text-gray-900 text-lg mb-3">{entry.school}</h3>

                {/* Score */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{labels.currentScore}</span>
                  <span className="font-bold text-gray-900">{entry.score} {labels.pts}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// =============================================================================
// STATS BAR COMPONENT
// =============================================================================

function StatsBar({ labels }: { labels: { schoolsCompeting: string; programs: string } }) {
  const overallLeaderboard = LEADERBOARDS.find((l) => l.title === "Overall");
  const schoolCount = overallLeaderboard?.data.length || 0;

  const stats = [
    { label: labels.schoolsCompeting, value: schoolCount, icon: Users },
    { label: labels.programs, value: 3, icon: Trophy },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-2">
            <stat.icon className="w-6 h-6 text-white/80" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            {typeof stat.value === "number" ? <AnimatedNumber value={stat.value} /> : stat.value}
          </div>
          <div className="text-sm text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function LeaderboardPage() {
  const t = useTranslations("LeaderboardPage");
  const [activeTab, setActiveTab] = useState("Overall");

  const currentLeaderboard = LEADERBOARDS.find((l) => l.title === activeTab);
  const entries = currentLeaderboard?.data || [];
  const movers = getTopMovers(6);

  return (
    <main>
      {/* Hero Section - Full viewport height */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-jamun-blue/5 to-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue-light bg-jamun-blue/20 rounded-full border border-jamun-blue/30"
            >
              <Trophy className="w-4 h-4" />
              {t("heroBadge")}
            </motion.span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
              <TypewriterText text={t("heroTitle")} delay={0.3} />
              <TypewriterText
                text={t("heroTitleHighlight")}
                delay={0.3 + 7 * 0.03}
                className="bg-gradient-to-r from-jamun-blue-light via-purple-400 to-emerald-400 bg-clip-text text-transparent"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              {t("heroSubtitle")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatsBar
                labels={{
                  schoolsCompeting: t("schoolsCompeting"),
                  programs: t("programs"),
                }}
              />
            </motion.div>

            {/* Trophy decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl shadow-amber-500/30">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Standings Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-3 block">
            {t("standingsEyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            {t("standingsTitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t("standingsSubtitle")}
          </p>

          {/* Leaderboard Tabs */}
          <LeaderboardTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabLabels={{
              overall: t("tabOverall"),
              modelUN: t("tabModelUN"),
              mockTrial: t("tabMockTrial"),
              mathletes: t("tabMathletes"),
            }}
          />
        </motion.div>

        {/* Standings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StandingsTable
            entries={entries}
            labels={{
              rank: t("tableRank"),
              school: t("tableSchool"),
              score: t("tableScore"),
              movement: t("tableMovement"),
              same: t("movementSame"),
            }}
          />
        </motion.div>

        {/* Tie explanation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          <Medal className="w-4 h-4 inline-block mr-1" />
          {t("tieExplanation")}
        </motion.p>
      </Section>

      {/* Top Movers Section */}
      <TopMoversSection
        movers={movers}
        labels={{
          badge: t("moversBadge"),
          title: t("moversTitle"),
          titleHighlight: t("moversTitleHighlight"),
          subtitle: t("moversSubtitle"),
          spots: t("moversSpots"),
          nowRank: (rank) => t("moversNowRank", { rank }),
          wasRank: (rank) => t("moversWasRank", { rank }),
          currentScore: t("moversCurrentScore"),
          pts: t("moversPts"),
        }}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-jamun-blue via-blue-600 to-purple-600 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/programs" size="lg" variant="accent" className="group">
                {t("ctaExplorePrograms")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="/register"
                size="lg"
                className="bg-white text-jamun-blue hover:bg-gray-100"
              >
                {t("ctaRegisterSchool")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
