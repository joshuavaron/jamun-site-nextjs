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
  Calculator,
  ArrowRight,
  Users,
  Trophy,
  BookOpen,
  CheckCircle,
  Brain,
  GraduationCap,
  Calendar,
  Clock,
  Quote,
  ChevronRight,
  File,
  ClipboardList,
  ScrollText,
  FileText,
  CalendarClock,
  Target,
  Puzzle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

const heroAccentColor = {
  badgeText: "text-emerald-600",
  badgeBg: "bg-emerald-100",
  badgeBorder: "border-emerald-200",
  gradientText: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent",
  iconColor: "text-emerald-600",
  buttonClass: "bg-emerald-600 hover:bg-emerald-700",
  bgGradient: "bg-gradient-to-br from-emerald-50/50 via-white to-teal-50",
  blobFrom1: "bg-gradient-to-r from-emerald-400/10 to-teal-400/10",
  blobFrom2: "bg-gradient-to-r from-cyan-400/10 to-emerald-400/10",
  imageBlob1: "bg-gradient-to-br from-emerald-400/30 to-teal-400/20",
  imageBlob2: "bg-gradient-to-br from-cyan-400/20 to-emerald-400/20",
  floatingBadgeBg: "bg-emerald-600",
};

const statsAccentColor = {
  bgOverlay: "from-emerald-600/10 via-transparent to-teal-900/10",
  blob1: "bg-emerald-600/5",
  blob2: "bg-teal-600/5",
  cardHoverBorder: "hover:border-emerald-500/50",
  cardHoverGradient: "from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/5 group-hover:to-teal-600/5",
  numberGradient: "from-emerald-400 to-teal-400",
};

const featuresAccentColor = {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  badgeText: "text-emerald-600",
  badgeBg: "bg-emerald-100",
};

const resourcesAccentColor = {
  eyebrowColor: "text-emerald-600",
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  buttonClass: "bg-emerald-600 hover:bg-emerald-700",
};


export default function MathletesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = useTranslations("MathletesHomePage");

  const mathletesActivities = [
    { icon: BookOpen, title: t("experienceActivity1Title"), description: t("experienceActivity1Description") },
    { icon: Brain, title: t("experienceActivity2Title"), description: t("experienceActivity2Description") },
    { icon: Puzzle, title: t("experienceActivity3Title"), description: t("experienceActivity3Description") },
    { icon: Trophy, title: t("experienceActivity4Title"), description: t("experienceActivity4Description") },
  ];

  const skills = [
    { icon: Brain, title: t("skill1Title"), description: t("skill1Description"), color: "bg-emerald-100", iconColor: "text-emerald-600" },
    { icon: Zap, title: t("skill2Title"), description: t("skill2Description"), color: "bg-teal-100", iconColor: "text-teal-600" },
    { icon: Target, title: t("skill3Title"), description: t("skill3Description"), color: "bg-cyan-100", iconColor: "text-cyan-600" },
    { icon: Users, title: t("skill4Title"), description: t("skill4Description"), color: "bg-green-100", iconColor: "text-green-600" },
  ];

  const competitionFormat = [
    { number: t("formatStep1Number"), title: t("formatStep1Title"), description: t("formatStep1Description") },
    { number: t("formatStep2Number"), title: t("formatStep2Title"), description: t("formatStep2Description") },
    { number: t("formatStep3Number"), title: t("formatStep3Title"), description: t("formatStep3Description") },
    { number: t("formatStep4Number"), title: t("formatStep4Title"), description: t("formatStep4Description") },
  ];

  const mathTopics = [
    { name: t("topic1Name"), topics: t("topic1Topics"), level: t("topic1Level") },
    { name: t("topic2Name"), topics: t("topic2Topics"), level: t("topic2Level") },
    { name: t("topic3Name"), topics: t("topic3Topics"), level: t("topic3Level") },
    { name: t("topic4Name"), topics: t("topic4Topics"), level: t("topic4Level") },
  ];

  const resources = [
    { icon: File, title: t("resource1Title"), description: t("resource1Description") },
    { icon: ClipboardList, title: t("resource2Title"), description: t("resource2Description") },
    { icon: ScrollText, title: t("resource3Title"), description: t("resource3Description") },
    { icon: FileText, title: t("resource4Title"), description: t("resource4Description") },
    { icon: BookOpen, title: t("resource5Title"), description: t("resource5Description") },
    { icon: Calculator, title: t("resource6Title"), description: t("resource6Description") },
  ];

  const faqs = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
    { question: t("faq4Question"), answer: t("faq4Answer") },
    { question: t("faq5Question"), answer: t("faq5Answer") },
    { question: t("faq6Question"), answer: t("faq6Answer") },
  ];

  const mathletesStats = [
    { value: "Fall 2026", label: t("statsProgramLaunch"), isText: true },
    { value: "100%", label: t("statsAllSkillLevels"), isText: true },
    { value: "4+", label: t("statsCompetitionTypes") },
    { value: "4", label: t("statsTournamentsYear") },
  ];

  return (
    <main>
      {/* Hero Section */}
      <ProgramHeroSection
        badge={{ icon: Calculator, label: t("heroBadge") }}
        titlePart1={t("heroTitlePart1")}
        titlePart2={t("heroTitlePart2")}
        titlePart2CharCount={21}
        description={t("heroDescription")}
        ctaButtons={[
          { label: t("heroPrimaryCTA"), href: "mailto:contact@jamun.org" },
          { label: t("heroSecondaryCTA"), href: "/programs", variant: "outline" },
        ]}
        infoBadges={[
          { icon: GraduationCap, label: t("heroBadgeGrades") },
          { icon: CalendarClock, label: t("heroBadgeLaunch") },
          { icon: CheckCircle, label: t("heroBadgeWelcome") },
        ]}
        image={{ src: "/images/conferences/homebackground2.webp", alt: t("heroImageAlt") }}
        floatingBadge={{ icon: Calculator, title: t("heroFloatingTitle"), subtitle: t("heroFloatingSubtitle") }}
        accentColor={heroAccentColor}
      />

      {/* Stats Section */}
      <ProgramStatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        stats={mathletesStats}
        accentColor={statsAccentColor}
      />

      {/* What is Mathletes Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              {t("aboutTitle")}
              <span className="text-emerald-600">{t("aboutTitleHighlight")}</span>
              {t("aboutTitleEnd")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("aboutParagraph1")}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("aboutParagraph2")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="mailto:contact@jamun.org" className="group bg-emerald-600 hover:bg-emerald-700">
                {t("aboutPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/mathletes/resources" variant="outline">
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
                src="/images/conferences/DSC00832.webp"
                alt={t("aboutImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/60 via-transparent to-transparent" />
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
        eyebrow={t("experienceEyebrow")}
        title={t("experienceTitle")}
        subtitle={t("experienceSubtitle")}
        features={mathletesActivities}
        stepLabel={(n) => t("experienceStep", { number: n })}
        accentColor={featuresAccentColor}
      />

      {/* Skills Section */}
      <Section background="white" className="py-16 md:py-20 bg-cream">
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
            <div className="bg-gradient-to-br from-emerald-100/50 via-teal-100/50 to-cyan-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-emerald-600/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                &ldquo;{t("skillsTestimonial")}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">SL</span>
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

      {/* Competition Format Section */}
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
            {competitionFormat.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
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
                src="/images/conferences/DSC01363.webp"
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
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t("formatTypicalTitle")}
                    </p>
                    <p className="text-sm text-gray-500">{t("formatTypicalDuration")}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {t("formatRounds")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {t("formatTeamSize")}
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </Section>

      {/* Topics Covered Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("topicsEyebrow")}
          title={t("topicsTitle")}
          subtitle={t("topicsSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {mathTopics.map((topic) => (
            <motion.div
              key={topic.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-emerald-300 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full",
                    topic.level === t("topic1Level")
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {topic.level}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {topic.name}
              </h3>
              <p className="text-gray-600">{topic.topics}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 mt-8"
        >
          {t("topicsNote")}
        </motion.p>
      </Section>

      {/* Resources Section */}
      <ProgramResourcesSection
        eyebrow={t("resourcesEyebrow")}
        title={t("resourcesTitle")}
        subtitle={t("resourcesSubtitle")}
        resources={resources}
        ctaLabel={t("resourcesCTA")}
        ctaHref="/mathletes/resources"
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
                      "w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform duration-300",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-100 rounded-full">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" size="lg" className="group bg-emerald-600 hover:bg-emerald-700">
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
              href="mailto:mathletes@jamun.org"
              className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
            >
              mathletes@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
