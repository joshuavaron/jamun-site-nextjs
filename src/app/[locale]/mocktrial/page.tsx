"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, Button, TypewriterText } from "@/components/ui";
import {
  Scale,
  ArrowRight,
  Users,
  BookOpen,
  CheckCircle,
  MessageSquare,
  FileText,
  Gavel,
  Lightbulb,
  GraduationCap,
  Calendar,
  Clock,
  Quote,
  ChevronRight,
  File,
  ClipboardList,
  ScrollText,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const courtroomIcons = [BookOpen, FileText, MessageSquare, Gavel];

const skillsConfig = [
  { icon: MessageSquare, color: "bg-purple-100", iconColor: "text-purple-600" },
  { icon: Lightbulb, color: "bg-violet-100", iconColor: "text-violet-600" },
  { icon: Users, color: "bg-indigo-100", iconColor: "text-indigo-600" },
  { icon: Target, color: "bg-fuchsia-100", iconColor: "text-fuchsia-600" },
];

const resourceIcons = [File, ClipboardList, ScrollText, FileText, BookOpen, Gavel];

const statDurations = [1400, 1800, 2200, 2600];

function AnimatedNumber({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const suffix = value.slice(
      value.indexOf(numericMatch[0]) + numericMatch[0].length
    );

    const steps = Math.max(30, Math.floor(duration / 33));
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(targetNumber * easeOutQuart);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function MockTrialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = useTranslations("MockTrialHomePage");

  // Build translated data arrays
  const mockTrialStats = [
    { value: "Fall 2026", label: t("statsProgramLaunch") },
    { value: "100%", label: t("statsBeginnerWelcome") },
    { value: "6+", label: t("statsRolesToTry") },
    { value: "2", label: t("statsCompetitionsYear") },
  ];

  const courtroomActivities = [
    { icon: courtroomIcons[0], title: t("courtroomActivity1Title"), description: t("courtroomActivity1Description") },
    { icon: courtroomIcons[1], title: t("courtroomActivity2Title"), description: t("courtroomActivity2Description") },
    { icon: courtroomIcons[2], title: t("courtroomActivity3Title"), description: t("courtroomActivity3Description") },
    { icon: courtroomIcons[3], title: t("courtroomActivity4Title"), description: t("courtroomActivity4Description") },
  ];

  const skills = [
    { ...skillsConfig[0], title: t("skill1Title"), description: t("skill1Description") },
    { ...skillsConfig[1], title: t("skill2Title"), description: t("skill2Description") },
    { ...skillsConfig[2], title: t("skill3Title"), description: t("skill3Description") },
    { ...skillsConfig[3], title: t("skill4Title"), description: t("skill4Description") },
  ];

  const trialFormat = [
    { number: t("formatStep1Number"), title: t("formatStep1Title"), description: t("formatStep1Description") },
    { number: t("formatStep2Number"), title: t("formatStep2Title"), description: t("formatStep2Description") },
    { number: t("formatStep3Number"), title: t("formatStep3Title"), description: t("formatStep3Description") },
    { number: t("formatStep4Number"), title: t("formatStep4Title"), description: t("formatStep4Description") },
  ];

  const resources = [
    { icon: resourceIcons[0], title: t("resource1Title"), description: t("resource1Description") },
    { icon: resourceIcons[1], title: t("resource2Title"), description: t("resource2Description") },
    { icon: resourceIcons[2], title: t("resource3Title"), description: t("resource3Description") },
    { icon: resourceIcons[3], title: t("resource4Title"), description: t("resource4Description") },
    { icon: resourceIcons[4], title: t("resource5Title"), description: t("resource5Description") },
    { icon: resourceIcons[5], title: t("resource6Title"), description: t("resource6Description") },
  ];

  const faqs = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
    { question: t("faq4Question"), answer: t("faq4Answer") },
    { question: t("faq5Question"), answer: t("faq5Answer") },
    { question: t("faq6Question"), answer: t("faq6Answer") },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-violet-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-violet-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-fuchsia-400/10 to-purple-400/10 rounded-full blur-3xl -z-10" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-purple-600 bg-purple-100 rounded-full border border-purple-200"
              >
                <Scale className="w-4 h-4" />
                {t("heroBadge")}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t("heroTitlePart1")} delay={0.3} />
                <TypewriterText
                  text={t("heroTitlePart2")}
                  delay={0.3 + 18 * 0.03}
                  className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {t("heroDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="mailto:contact@jamun.org" size="lg" className="group bg-purple-600 hover:bg-purple-700">
                  {t("heroPrimaryCTA")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/programs" variant="outline" size="lg">
                  {t("heroSecondaryCTA")}
                </Button>
              </motion.div>

              {/* Quick info badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  {t("heroBadgeGrades")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {t("heroBadgeLaunch")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  {t("heroBadgeExperience")}
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/conferences/DSC02088.webp"
                  alt={t("heroImageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {t("heroFloatingTitle")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t("heroFloatingSubtitle")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-violet-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-fuchsia-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-violet-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("statsTitle")}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t("statsSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mockTrialStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 text-center h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-3">
                      {stat.value.includes("Fall") || stat.value.includes("%") ? (
                        stat.value
                      ) : (
                        <AnimatedNumber
                          value={stat.value}
                          duration={statDurations[index]}
                        />
                      )}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Mock Trial Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              {t("aboutTitle")}
              <span className="text-purple-600">{t("aboutTitleHighlight")}</span>{t("aboutTitleEnd")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("aboutParagraph1")}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("aboutParagraph2")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="mailto:contact@jamun.org" className="group bg-purple-600 hover:bg-purple-700">
                {t("aboutPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/mocktrial/resources" variant="outline">
                {t("aboutSecondaryCTA")}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/conferences/DSC00969.webp"
                alt={t("aboutImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent" />

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white">
                  <p className="text-lg font-medium mb-2">
                    &ldquo;{t("aboutQuote")}&rdquo;
                  </p>
                  <footer className="text-white/80 text-sm">
                    — {t("aboutQuoteAuthor")}
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-violet-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* What You'll Do Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("courtroomEyebrow")}
          title={t("courtroomTitle")}
          subtitle={t("courtroomSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {courtroomActivities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <activity.icon className="w-7 h-7 text-purple-600" />
              </div>
              <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                {t("courtroomStep", { number: index + 1 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Skills Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("skillsEyebrow")}
          title={t("skillsTitle")}
          subtitle={t("skillsSubtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    skill.color
                  )}
                >
                  <skill.icon className={cn("w-6 h-6", skill.iconColor)} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-purple-100/50 via-violet-100/50 to-fuchsia-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-purple-600/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                &ldquo;{t("skillsTestimonial")}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">AT</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t("skillsTestimonialAuthor")}</p>
                  <p className="text-sm text-gray-600">
                    {t("skillsTestimonialRole")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Trial Format Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("formatEyebrow")}
          title={t("formatTitle")}
          subtitle={t("formatSubtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Format steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {trialFormat.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/conferences/DSC02128.webp"
                alt={t("formatImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Info card overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 right-6 md:right-auto md:max-w-xs"
            >
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t("formatTypicalTitle")}
                    </p>
                    <p className="text-sm text-gray-500">{t("formatTypicalDays")}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {t("formatRounds")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {t("formatTeamMembers")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Featured Case Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Case Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("caseEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              {t("caseTitle")}
            </h2>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
              {t("caseBadge")}
            </span>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("caseParagraph1")}
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("caseParagraph2")}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t("caseWitnesses")}</p>
                  <p className="text-sm text-gray-500">{t("caseWitnessesLabel")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t("caseExhibits")}</p>
                  <p className="text-sm text-gray-500">{t("caseExhibitsLabel")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="mailto:contact@jamun.org" className="group bg-purple-600 hover:bg-purple-700">
                {t("caseCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* Case Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-50 rounded-2xl p-8 md:p-10">
              {/* Case file styling */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{t("caseCaseNumber")}</p>
                    <p className="font-semibold text-gray-900">{t("caseCourt")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t("caseChargeLabel")}</p>
                    <p className="font-medium text-gray-900">{t("caseCharge")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t("caseDefendantLabel")}</p>
                    <p className="font-medium text-gray-900">{t("caseDefendant")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t("caseVictimLabel")}</p>
                    <p className="font-medium text-gray-900">{t("caseVictim")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t("caseKeyIssuesLabel")}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        {t("caseKeyIssue1")}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        {t("caseKeyIssue2")}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        {t("caseKeyIssue3")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative stamp */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center rotate-12">
                <div className="w-20 h-20 border-4 border-dashed border-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs text-center leading-tight">{t("caseFallBadge")}</span>
                </div>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-violet-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Resources Section */}
      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        {/* Centered Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-purple-600 font-semibold text-sm tracking-widest uppercase mb-3 block">
            {t("resourcesEyebrow")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            {t("resourcesTitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("resourcesSubtitle")}
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div
            className="flex hover:[animation-play-state:paused]"
            style={{
              animation: "scroll 20s linear infinite",
              "--scroll-width": `${resources.length * 324}px`,
            } as React.CSSProperties}
          >
            {/* First set of cards */}
            {resources.map((resource, index) => (
              <div
                key={`first-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
            {/* Duplicate set for seamless infinite scroll */}
            {resources.map((resource, index) => (
              <div
                key={`second-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Button href="/mocktrial/resources" size="lg" className="group bg-purple-600 hover:bg-purple-700">
            {t("resourcesCTA")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("faqEyebrow")}
          title={t("faqTitle")}
          subtitle={t("faqSubtitle")}
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-300",
                      openFaq === index && "rotate-90"
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gray" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-100 rounded-full">
            <Scale className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}
            <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" size="lg" className="group bg-purple-600 hover:bg-purple-700">
                {t("ctaPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/programs" variant="outline" size="lg">
                {t("ctaSecondaryCTA")}
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
            {t("ctaContactText")}{" "}
            <a
              href="mailto:mocktrial@jamun.org"
              className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
            >
              mocktrial@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
