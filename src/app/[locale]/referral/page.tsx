"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Scale,
  Calculator,
  CheckCircle,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Mail,
  FileText,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { programColors } from "@/lib/colors";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
} from "@/lib/animations";

type ProgramKey = "modelun" | "mocktrial" | "mathletes";

const tabConfig = {
  modelun: {
    icon: Globe,
    colors: programColors.modelUN,
    activeText: "text-jamun-blue",
    iconBg: "bg-jamun-blue",
    checkColor: "text-jamun-blue",
    lightBg: "bg-jamun-blue/5",
    activeBg: "bg-jamun-blue/10",
    headerColor: "#397bce",
    borderColor: "border-jamun-blue",
  },
  mocktrial: {
    icon: Scale,
    colors: programColors.mockTrial,
    activeText: "text-purple-600",
    iconBg: "bg-purple-600",
    checkColor: "text-purple-600",
    lightBg: "bg-purple-50",
    activeBg: "bg-purple-100",
    headerColor: "#9333ea",
    borderColor: "border-purple-600",
  },
  mathletes: {
    icon: Calculator,
    colors: programColors.mathletes,
    activeText: "text-emerald-600",
    iconBg: "bg-emerald-600",
    checkColor: "text-emerald-600",
    lightBg: "bg-emerald-50",
    activeBg: "bg-emerald-100",
    headerColor: "#059669",
    borderColor: "border-emerald-600",
  },
} as const;

const PROGRAMS: ProgramKey[] = ["modelun", "mocktrial", "mathletes"];

// ISBE Learning Standards data — kept in component since standard codes are universal
const standardsData: Record<ProgramKey, { code: string; name: string; note: string }[]> = {
  modelun: [
    { code: "CCSS.ELA-Literacy.W.6-8.1", name: "Argument Writing", note: "Position papers require supporting claims with evidence and addressing counterarguments" },
    { code: "CCSS.ELA-Literacy.W.6-8.7", name: "Research to Build Knowledge", note: "Country research using multiple sources on history, politics, economy, and foreign policy" },
    { code: "CCSS.ELA-Literacy.SL.6-8.1", name: "Collaborative Discussion", note: "Committee caucuses: building on others' ideas, responding with evidence, modifying views" },
    { code: "CCSS.ELA-Literacy.SL.6-8.4", name: "Presenting Claims & Findings", note: "Opening speeches, points of information, formal debate using evidence and reasoning" },
    { code: "CCSS.ELA-Literacy.RI.6-8.6", name: "Analyzing Point of View", note: "Understanding how different countries frame the same global issue differently" },
    { code: "SS.IS.1.6-8 / SS.IS.3.6-8", name: "Social Science Inquiry", note: "Formulating inquiry questions, finding diverse sources, critiquing arguments" },
    { code: "SS.CV.3.6-8 / SS.CV.4.6-8", name: "Civics — Governance & Policy", note: "Understanding international institutions, diplomacy, and collaborative policy development" },
    { code: "IL SEL Goal 2, Standards A-D", name: "Social-Emotional Learning", note: "Perspective-taking (representing another nation), conflict resolution, ethical decision-making" },
  ],
  mocktrial: [
    { code: "CCSS.ELA-Literacy.SL.6-8.3", name: "Evaluating a Speaker's Argument", note: "Cross-examination: evaluating testimony, identifying unsound reasoning, spotting irrelevant evidence" },
    { code: "CCSS.ELA-Literacy.SL.6-8.4", name: "Presenting Claims & Findings", note: "Opening/closing statements presenting claims with relevant evidence and sound reasoning" },
    { code: "CCSS.ELA-Literacy.W.6-8.1", name: "Argument Writing", note: "Written motions and closing arguments that anticipate and address counterarguments" },
    { code: "CCSS.ELA-Literacy.RI.6-8.8", name: "Analyzing Arguments in Text", note: "Evaluating case materials: distinguishing supported claims from unsupported ones" },
    { code: "CCSS.ELA-Literacy.L.6-8.6", name: "Domain-Specific Vocabulary", note: "Legal terminology: objection, sustained, hearsay, relevance, testimony, exhibits" },
    { code: "SS.CV.2.5 / SS.CV.5.6-8", name: "Civics — Rules, Laws, and Rights", note: "Due process, trial by jury, constitutional rights, the role of law in society" },
    { code: "CPS 8th Grade Requirement", name: "U.S. & Illinois Constitution", note: "Hands-on experience with constitutional principles directly supports the CPS Constitution exam" },
    { code: "IL SEL Goal 2, Standards A-D", name: "Social-Emotional Learning", note: "Empathy through witness roles, ethical reasoning in case analysis, structured conflict resolution" },
  ],
  mathletes: [
    { code: "CCSS.Math.Practice.MP.1", name: "Make Sense of Problems & Persevere", note: "Every competition problem requires analyzing constraints, planning solution pathways, and persisting" },
    { code: "CCSS.Math.Practice.MP.3", name: "Construct Arguments & Critique Reasoning", note: "Team rounds require articulating mathematical reasoning and evaluating solution approaches" },
    { code: "CCSS.Math.Practice.MP.7-8", name: "Structure & Repeated Reasoning", note: "Competition strategies: discerning patterns, finding shortcuts, generalizing methods" },
    { code: "CCSS.Math.Content.6.RP / 7.RP", name: "Ratios & Proportional Relationships", note: "Unit rates, proportional reasoning, and multi-step ratio/percent problems" },
    { code: "CCSS.Math.Content.7.G / 8.G", name: "Geometry", note: "Pythagorean Theorem, angle relationships, area/volume, coordinate geometry, transformations" },
    { code: "CCSS.Math.Content.7.SP.C", name: "Probability & Counting", note: "Compound events, sample spaces, tree diagrams — major competition topics" },
    { code: "CCSS.Math.Content.8.EE", name: "Expressions & Equations", note: "Integer exponents, linear equations, systems of equations, slope and intercept" },
    { code: "IL SEL Goal 1, Standard C", name: "Social-Emotional Learning", note: "Goal-setting, perseverance through challenges, managing competition pressure" },
  ],
};

function getTabLabel(key: ProgramKey): string {
  return key === "modelun" ? "ModelUN" : key === "mocktrial" ? "MockTrial" : "Mathletes";
}

export default function ReferralPage() {
  const t = useTranslations("ReferralPage");
  const [activeProgram, setActiveProgram] = useState<ProgramKey>("modelun");
  const [copied, setCopied] = useState(false);
  const [showFloatingPrint, setShowFloatingPrint] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as ProgramKey;
    if (PROGRAMS.includes(hash)) setActiveProgram(hash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeProgram}`);
  }, [activeProgram]);

  useEffect(() => {
    const handleScroll = () => setShowFloatingPrint(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText("https://jamun.org/referral");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <main className="referral-page">
      {/* ===== PRINT-ONLY HEADER ===== */}
      <div className="referral-print-only hidden">
        <div className="flex justify-between items-center border-b-2 border-jamun-blue pb-3 mb-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logos/jamun-blue-side-logo.png" alt="JAMUN" className="h-10 mb-1" />
            <p className="text-xs text-gray-600">{t("printNonprofit")} &middot; jamun.org</p>
          </div>
          <div className="text-right flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{t("printHeader")}</p>
              <p className="text-xs text-gray-600">contact@jamun.org</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/referral-qr.png" alt="Scan to view online" width={64} height={64} className="border border-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* ===== COMPACT HEADER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-jamun-blue via-blue-700 to-purple-800 py-8 md:py-10" data-print-hidden="true">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-3">
                  <FileText className="w-3.5 h-3.5" />
                  {t("headerBadge")}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{t("headerTitle")}</h1>
                <p className="text-blue-200 text-base mt-1">{t("headerSubtitle")}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button href="/register" variant="accent" size="sm">
                  {t("registerCTA")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button href="mailto:contact@jamun.org" variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                  <Mail className="w-4 h-4 mr-1.5" />
                  {t("contactCTA")}
                </Button>
                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                  <Printer className="w-4 h-4" />
                  {t("savePDF")}
                </button>
              </div>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-blue-100/80 text-sm mt-3 max-w-3xl leading-relaxed">{t("headerOrg")}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm" data-print-hidden="true">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile */}
          <div className="sm:hidden py-2">
            <select
              value={activeProgram}
              onChange={(e) => setActiveProgram(e.target.value as ProgramKey)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base font-medium focus:border-jamun-blue focus:outline-none focus:ring-2 focus:ring-jamun-blue/20"
            >
              {PROGRAMS.map((key) => (
                <option key={key} value={key}>{t(`tab${getTabLabel(key)}`)}</option>
              ))}
            </select>
          </div>
          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-1" data-referral-tabs>
            {PROGRAMS.map((key) => {
              const tabCfg = tabConfig[key];
              const TabIcon = tabCfg.icon;
              const isActive = activeProgram === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveProgram(key)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 text-base font-semibold border-b-2 transition-all duration-200",
                    isActive
                      ? `${tabCfg.activeText} border-current`
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  {t(`tab${getTabLabel(key)}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== TAB CONTENT — single-column document flow ===== */}
      <div className="bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          {(() => {
            const key = activeProgram;
            const tabCfg = tabConfig[key];
            const TabIcon = tabCfg.icon;
            const label = getTabLabel(key);
            const standards = standardsData[key];

            return (
              <div key={key}>
                {/* Quick-reference bar */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp}
                  className="referral-quickref rounded-xl border-l-4 p-4 mb-8 bg-white shadow-sm flex flex-wrap items-center gap-x-6 gap-y-2"
                  style={{ borderLeftColor: tabCfg.headerColor }}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("referral-icon-box flex h-9 w-9 items-center justify-center rounded-lg text-white", tabCfg.iconBg)}>
                      <TabIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{t(`tab${label}`)}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="primary">{t(`${key}_type`)}</Badge>
                    <Badge variant="outline">{t(`${key}_grades`)}</Badge>
                    <Badge variant="outline">{t(`${key}_format`)}</Badge>
                    <Badge variant="outline">Team Size: {t(`${key}_capacity`)}</Badge>
                    <Badge variant="outline">{t(`${key}_sessions`)}</Badge>
                  </div>
                </motion.div>

                {/* Program Description */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("descriptionTitle")} color={tabCfg.headerColor} />
                  <p className="text-base text-gray-700 leading-relaxed">{t(`${key}_description`)}</p>
                </motion.div>

                {/* Program Objectives */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("objectivesTitle")} color={tabCfg.headerColor} />
                  <ul className="space-y-2.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className={cn("w-5 h-5 mt-0.5 flex-shrink-0", tabCfg.checkColor)} />
                        <span className="text-base text-gray-700">{t(`${key}_objective${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* ISBE Standards */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("standardsTitle")} color={tabCfg.headerColor} />
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className={cn("border-b border-gray-200", tabCfg.lightBg)}>
                          <th className="px-4 py-2.5 text-sm font-semibold text-gray-700 w-[280px]">Standard</th>
                          <th className="px-4 py-2.5 text-sm font-semibold text-gray-700">Connection to Program</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standards.map((std, idx) => (
                          <tr key={std.code} className={cn("border-b border-gray-100 last:border-0", idx % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                            <td className="px-4 py-2.5 align-top">
                              <code className={cn("text-xs font-mono px-1.5 py-0.5 rounded inline-block mb-0.5", tabCfg.activeBg, tabCfg.activeText)}>
                                {std.code}
                              </code>
                              <div className="text-sm font-medium text-gray-900">{std.name}</div>
                            </td>
                            <td className="px-4 py-2.5 text-sm text-gray-600 align-top">{std.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* School Requirements */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("schoolReqTitle")} color={tabCfg.headerColor} />
                  <p className="text-base text-gray-700 leading-relaxed">{t(`${key}_schoolReq`)}</p>
                </motion.div>

                {/* Scheduling */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("schedulingTitle")} color={tabCfg.headerColor} />
                  <p className="text-base text-gray-700 leading-relaxed">{t(`${key}_scheduling`)}</p>
                </motion.div>

                {/* Financial Information */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp} className="mb-8 referral-section">
                  <SectionHeading title={t("financialTitle")} color={tabCfg.headerColor} />
                  <p className="text-base text-gray-700 leading-relaxed">{t(`${key}_financial`)}</p>
                </motion.div>

                {/* What JAMUN Provides */}
                <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp}
                  className={cn("mb-8 rounded-xl p-5 referral-section", tabCfg.lightBg)}>
                  <SectionHeading title={t("providesTitle")} color={tabCfg.headerColor} />
                  <ul className="space-y-2.5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className={cn("w-5 h-5 mt-0.5 flex-shrink-0", tabCfg.checkColor)} />
                        <span className="text-base text-gray-700">{t(`${key}_provides${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })()}

          {/* Contact bar */}
          <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUp}
            className="rounded-xl bg-gray-900 text-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 referral-section">
            <div>
              <h3 className="font-bold text-lg">{t("contactTitle")}</h3>
              <p className="text-gray-300 text-base mt-0.5">
                {t("contactNote")}{" "}
                <a href="mailto:contact@jamun.org" className="text-white underline hover:no-underline">contact@jamun.org</a>
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0" data-print-hidden="true">
              <Button href="/register" variant="accent" size="sm">
                {t("registerCTA")}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t("copied") : t("copyLink")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== PRINT-ONLY FOOTER ===== */}
      <div className="referral-print-only hidden">
        <div className="border-t border-gray-300 pt-2 mt-4 text-center text-xs text-gray-500">
          {t("printFooter")}
        </div>
      </div>

      {/* ===== FLOATING PRINT BUTTON ===== */}
      <AnimatePresence>
        {showFloatingPrint && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.print()}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-jamun-blue text-white shadow-lg hover:bg-jamun-blue-dark transition-colors"
            data-print-hidden="true"
            aria-label={t("savePDF")}
          >
            <Printer className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

// Section heading styled like the Math Circles PDF — colored left border with bold title
function SectionHeading({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-0 mb-3 referral-heading">
      <div className="w-1 h-5 rounded-full mr-2.5 flex-shrink-0" style={{ backgroundColor: color }} />
      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
    </div>
  );
}
