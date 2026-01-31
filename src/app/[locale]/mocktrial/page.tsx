"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  ProgramHeroSection,
  ProgramStatsSection,
  ProgramFeaturesSection,
  ProgramResourcesSection,
} from "@/components/sections";
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
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

const skillsConfig = [
  { icon: MessageSquare, color: "bg-purple-100", iconColor: "text-purple-600" },
  { icon: Lightbulb, color: "bg-violet-100", iconColor: "text-violet-600" },
  { icon: Users, color: "bg-indigo-100", iconColor: "text-indigo-600" },
  { icon: Target, color: "bg-fuchsia-100", iconColor: "text-fuchsia-600" },
];

const heroAccentColor = {
  badgeText: "text-purple-600",
  badgeBg: "bg-purple-100",
  badgeBorder: "border-purple-200",
  gradientText: "bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent",
  iconColor: "text-purple-600",
  buttonClass: "bg-purple-600 hover:bg-purple-700",
  bgGradient: "bg-gradient-to-br from-purple-50/50 via-white to-violet-50",
  blobFrom1: "bg-gradient-to-r from-purple-400/10 to-violet-400/10",
  blobFrom2: "bg-gradient-to-r from-fuchsia-400/10 to-purple-400/10",
  imageBlob1: "bg-gradient-to-br from-purple-400/30 to-violet-400/20",
  imageBlob2: "bg-gradient-to-br from-fuchsia-400/20 to-purple-400/20",
  floatingBadgeBg: "bg-purple-600",
};

const statsAccentColor = {
  bgOverlay: "from-purple-600/10 via-transparent to-violet-900/10",
  blob1: "bg-purple-600/5",
  blob2: "bg-violet-600/5",
  cardHoverBorder: "hover:border-purple-500/50",
  cardHoverGradient: "from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5",
  numberGradient: "from-purple-400 to-violet-400",
};

const featuresAccentColor = {
  iconBg: "bg-purple-100",
  iconText: "text-purple-600",
  badgeText: "text-purple-600",
  badgeBg: "bg-purple-100",
};

const resourcesAccentColor = {
  eyebrowColor: "text-purple-600",
  iconBg: "bg-purple-100",
  iconText: "text-purple-600",
  buttonClass: "bg-purple-600 hover:bg-purple-700",
};

const resourceIcons = [File, ClipboardList, ScrollText, FileText, BookOpen, Gavel];


export default function MockTrialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = useTranslations("MockTrialHomePage");

  // Build translated data arrays
  const mockTrialStats = [
    { value: "Fall 2026", label: t("statsProgramLaunch"), isText: true },
    { value: "100%", label: t("statsBeginnerWelcome"), isText: true },
    { value: "6+", label: t("statsRolesToTry") },
    { value: "2", label: t("statsCompetitionsYear") },
  ];

  const courtroomActivities = [
    { icon: BookOpen, title: t("courtroomActivity1Title"), description: t("courtroomActivity1Description") },
    { icon: FileText, title: t("courtroomActivity2Title"), description: t("courtroomActivity2Description") },
    { icon: MessageSquare, title: t("courtroomActivity3Title"), description: t("courtroomActivity3Description") },
    { icon: Gavel, title: t("courtroomActivity4Title"), description: t("courtroomActivity4Description") },
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
      <ProgramHeroSection
        badge={{ icon: Scale, label: t("heroBadge") }}
        titlePart1={t("heroTitlePart1")}
        titlePart2={t("heroTitlePart2")}
        titlePart2CharCount={18}
        description={t("heroDescription")}
        ctaButtons={[
          { label: t("heroPrimaryCTA"), href: "mailto:contact@jamun.org" },
          { label: t("heroSecondaryCTA"), href: "/programs", variant: "outline" },
        ]}
        infoBadges={[
          { icon: GraduationCap, label: t("heroBadgeGrades") },
          { icon: CalendarClock, label: t("heroBadgeLaunch") },
          { icon: CheckCircle, label: t("heroBadgeExperience") },
        ]}
        image={{ src: "/images/conferences/DSC02088.webp", alt: t("heroImageAlt") }}
        floatingBadge={{ icon: Scale, title: t("heroFloatingTitle"), subtitle: t("heroFloatingSubtitle") }}
        accentColor={heroAccentColor}
      />

      {/* Stats Section */}
      <ProgramStatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        stats={mockTrialStats}
        accentColor={statsAccentColor}
      />

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
          </motion.div>
        </div>
      </Section>

      {/* What You'll Do Section */}
      <ProgramFeaturesSection
        eyebrow={t("courtroomEyebrow")}
        title={t("courtroomTitle")}
        subtitle={t("courtroomSubtitle")}
        features={courtroomActivities}
        stepLabel={(n) => t("courtroomStep", { number: n })}
        accentColor={featuresAccentColor}
      />

      {/* Skills Section */}
      <Section background="white" className="py-16 md:py-20 bg-light-lavender">
        <SectionHeader
          eyebrow={t("skillsEyebrow")}
          title={t("skillsTitle")}
          subtitle={t("skillsSubtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 right-6 md:right-auto md:max-w-xs"
            >
              <div className="bg-white rounded-xl p-5 shadow-[var(--shadow-card-hover)] border border-gray-100">
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

          </motion.div>
        </div>
      </Section>

      {/* Featured Case Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-50 rounded-2xl p-8 md:p-10">
              <div className="bg-white rounded-xl shadow-[var(--shadow-elevated)] p-6 md:p-8 border border-gray-100">
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

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center rotate-12">
                <div className="w-20 h-20 border-4 border-dashed border-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs text-center leading-tight">{t("caseFallBadge")}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </Section>

      {/* Resources Section */}
      <ProgramResourcesSection
        eyebrow={t("resourcesEyebrow")}
        title={t("resourcesTitle")}
        subtitle={t("resourcesSubtitle")}
        resources={resources}
        ctaLabel={t("resourcesCTA")}
        ctaHref="/mocktrial/resources"
        accentColor={resourcesAccentColor}
      />

      {/* FAQ Section */}
      <Section background="white" className="py-16 md:py-20 bg-cream">
        <SectionHeader
          eyebrow={t("faqEyebrow")}
          title={t("faqTitle")}
          subtitle={t("faqSubtitle")}
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
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
