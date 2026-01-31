"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  ProgramHeroSection,
  ProgramStatsSection,
  ProgramFeaturesSection,
  ProgramResourcesSection,
} from "@/components/sections";
import {
  Globe,
  ArrowRight,
  Users,
  Trophy,
  BookOpen,
  CheckCircle,
  MessageSquare,
  FileText,
  Handshake,
  Lightbulb,
  GraduationCap,
  Calendar,
  Clock,
  Quote,
  ChevronRight,
  File,
  ClipboardList,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { CommitteeMeta } from "@/lib/committees";

interface ModelUNPageContentProps {
  committees: CommitteeMeta[];
}

const heroAccentColor = {
  badgeText: "text-jamun-blue",
  badgeBg: "bg-jamun-blue/10",
  badgeBorder: "border-jamun-blue/20",
  gradientText: "bg-gradient-to-r from-jamun-blue via-sky-500 to-jamun-blue bg-clip-text text-transparent",
  iconColor: "text-jamun-blue",
  bgGradient: "bg-gradient-to-br from-jamun-blue/5 via-white to-sky-50",
  blobFrom1: "bg-gradient-to-r from-jamun-blue/10 to-sky-400/10",
  blobFrom2: "bg-gradient-to-r from-indigo-400/10 to-jamun-blue/10",
  imageBlob1: "bg-gradient-to-br from-jamun-blue/30 to-sky-400/20",
  imageBlob2: "bg-gradient-to-br from-indigo-400/20 to-jamun-blue/20",
  floatingBadgeBg: "bg-jamun-blue",
};

const statsAccentColor = {
  bgOverlay: "from-jamun-blue/10 via-transparent to-indigo-900/10",
  blob1: "bg-jamun-blue/5",
  blob2: "bg-sky-600/5",
  cardHoverBorder: "hover:border-jamun-blue/50",
  cardHoverGradient: "from-jamun-blue/0 to-sky-600/0 group-hover:from-jamun-blue/5 group-hover:to-sky-600/5",
  numberGradient: "from-jamun-blue-light to-sky-400",
};

const featuresAccentColor = {
  iconBg: "bg-jamun-blue/10",
  iconText: "text-jamun-blue",
  badgeText: "text-jamun-blue",
  badgeBg: "bg-jamun-blue/10",
};

const resourcesAccentColor = {
  eyebrowColor: "text-jamun-blue",
  iconBg: "bg-jamun-blue/10",
  iconText: "text-jamun-blue",
};

// What delegates do at Model UN
const delegateActivities = [
  { icon: BookOpen, title: "Research Your Country", description: "Dive deep into your assigned nation's history, politics, economy, and stance on global issues. Become the expert." },
  { icon: FileText, title: "Write Position Papers", description: "Craft compelling documents that outline your country's position and proposed solutions to world challenges." },
  { icon: MessageSquare, title: "Deliver Speeches", description: "Take the floor to address the committee, articulate your positions, and respond to questions from other delegates." },
  { icon: Handshake, title: "Build Coalitions", description: "Work with allies to draft resolutions, negotiate compromises, and build consensus on complex issues." },
];

// Skills developed through Model UN
const skills = [
  { icon: MessageSquare, title: "Public Speaking", description: "Gain confidence speaking in front of groups, structuring arguments, and thinking on your feet.", color: "bg-jamun-blue/10", iconColor: "text-jamun-blue" },
  { icon: Lightbulb, title: "Critical Thinking", description: "Analyze complex problems from multiple perspectives and develop creative solutions.", color: "bg-sky-100", iconColor: "text-sky-600" },
  { icon: Users, title: "Collaboration", description: "Learn to work with others, build consensus, and navigate diplomatic challenges.", color: "bg-indigo-100", iconColor: "text-indigo-600" },
  { icon: BookOpen, title: "Research & Writing", description: "Develop strong research skills and learn to write persuasive, well-structured documents.", color: "bg-cyan-100", iconColor: "text-cyan-600" },
];

// Conference format sections
const conferenceFormat = [
  { number: "01", title: "Opening Ceremonies", description: "Conferences begin with inspiring speakers and orientation to set the tone for productive diplomacy." },
  { number: "02", title: "Committee Sessions", description: "Delegates debate topics, deliver speeches, and work in blocs to draft working papers and resolutions." },
  { number: "03", title: "Unmoderated Caucuses", description: "Informal negotiation time where delegates move freely, form alliances, and draft collaborative documents." },
  { number: "04", title: "Voting & Awards", description: "Committees vote on resolutions, and outstanding delegates are recognized with awards and honors." },
];

// Resources for Model UN
const resourceItems = [
  { icon: File, title: "A Short Guide to the Crisis", description: "Learn how crisis committees work, from backroom notes to directives." },
  { icon: ClipboardList, title: "Crisis Committee Position Paper Outline", description: "A structured template for writing crisis committee position papers." },
  { icon: ScrollText, title: "Directive Outline", description: "A template for writing crisis committee directives." },
  { icon: FileText, title: "Draft Resolution Outline", description: "A template for writing General Assembly draft resolutions." },
  { icon: BookOpen, title: "Parliamentary Procedure Guide", description: "Everything you need to know about motions, points, and debate rules." },
  { icon: Globe, title: "Country Research Guide", description: "Step-by-step instructions for researching your assigned country." },
];

// FAQs
const faqs = [
  { question: "Do I need any experience to join Model UN?", answer: "Not at all! Our program is designed specifically for beginners. We'll teach you everything from how to research your country to parliamentary procedure. Many of our most successful delegates started with zero experience." },
  { question: "What grades can participate?", answer: "JAMUN Model UN is designed for middle school students in grades 5-8. We create age-appropriate committees and topics that challenge students while remaining accessible." },
  { question: "How much time does Model UN require?", answer: "Typically, clubs meet weekly for 1-2 hours. Before conferences, delegates spend additional time researching their country and preparing speeches. Conferences are usually 1-2 days on weekends." },
  { question: "What topics do you debate?", answer: "Topics range from climate change and human rights to technology regulation and international security. We select topics that are relevant, engaging, and appropriate for middle schoolers to explore." },
  { question: "Is there a cost to participate?", answer: "We work hard to keep costs minimal. Many of our resources are free, and we offer financial assistance for conference registration fees. No student should be unable to participate due to cost." },
  { question: "How do awards work?", answer: "Delegates can earn awards like Best Delegate, Outstanding Delegate, and Honorable Mention based on their preparation, speaking skills, collaboration, and adherence to their country's positions." },
];


export default function ModelUNPageContent({
  committees,
}: ModelUNPageContentProps) {
  const t = useTranslations("ModelUNHomePage");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Use committees from MDX, capped at 6
  const sampleCommittees = committees.slice(0, 6);

  // Calculate stats from committee data
  const totalDelegates = committees.reduce(
    (sum, c) => sum + c.delegateCount,
    0
  );

  const munStats = [
    { value: `${totalDelegates}+`, label: t("statsDelegateSpots") },
    { value: "15+", label: t("statsSchoolsParticipating") },
    { value: `${committees.length}`, label: t("statsCommitteesOffered") },
    { value: "100%", label: t("statsBeginnerWelcome"), isText: true },
  ];

  // Build translated resources for the carousel
  const translatedResources = resourceItems.map((r, i) => ({
    icon: r.icon,
    title: t(`resource${i + 1}Title` as "resource1Title" | "resource2Title" | "resource3Title" | "resource4Title" | "resource5Title" | "resource6Title"),
    description: t(`resource${i + 1}Description` as "resource1Description" | "resource2Description" | "resource3Description" | "resource4Description" | "resource5Description" | "resource6Description"),
  }));

  return (
    <main>
      {/* Hero Section */}
      <ProgramHeroSection
        badge={{ icon: Globe, label: t("heroBadge") }}
        titlePart1={t("heroTitlePart1")}
        titlePart2={t("heroTitlePart2")}
        titlePart2CharCount={10}
        description={t("heroDescription")}
        ctaButtons={[
          { label: t("heroPrimaryCTA"), href: "/register" },
          { label: t("heroSecondaryCTA"), href: "/modelun/committees", variant: "outline" },
        ]}
        infoBadges={[
          { icon: GraduationCap, label: t("heroBadgeGrades") },
          { icon: CheckCircle, label: t("heroBadgeExperience") },
          { icon: Trophy, label: t("heroBadgeAwards") },
        ]}
        image={{ src: "/images/conferences/homebackground.webp", alt: t("heroImageAlt") }}
        floatingBadge={{ icon: Globe, title: t("heroFloatingTitle"), subtitle: t("heroFloatingSubtitle") }}
        accentColor={heroAccentColor}
      />

      {/* Stats Section */}
      <ProgramStatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        stats={munStats}
        accentColor={statsAccentColor}
      />

      {/* What is Model UN Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("aboutEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              {t("aboutTitle")}
              <span className="text-jamun-blue">{t("aboutTitleHighlight")}</span>{t("aboutTitleEnd")}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t("aboutParagraph1")}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("aboutParagraph2")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/register" className="group">
                {t("aboutPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/modelun/resources" variant="outline">
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
                src="/images/conferences/DSC01032.webp"
                alt={t("aboutImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jamun-blue/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white">
                  <p className="text-lg font-medium mb-2">
                    &quot;{t("aboutQuote")}&quot;
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

      {/* What Delegates Do Section */}
      <ProgramFeaturesSection
        eyebrow={t("delegateEyebrow")}
        title={t("delegateTitle")}
        subtitle={t("delegateSubtitle")}
        features={delegateActivities.map((a, i) => ({
          icon: a.icon,
          title: t(`delegateActivity${i + 1}Title` as "delegateActivity1Title" | "delegateActivity2Title" | "delegateActivity3Title" | "delegateActivity4Title"),
          description: t(`delegateActivity${i + 1}Description` as "delegateActivity1Description" | "delegateActivity2Description" | "delegateActivity3Description" | "delegateActivity4Description"),
        }))}
        stepLabel={(n) => t("delegateStep", { number: n })}
        accentColor={featuresAccentColor}
      />

      {/* Skills Section */}
      <Section background="white" className="py-16 md:py-20 bg-light-sage">
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
            {skills.map((skill, index) => (
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
                  {t(`skill${index + 1}Title` as "skill1Title" | "skill2Title" | "skill3Title" | "skill4Title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t(`skill${index + 1}Description` as "skill1Description" | "skill2Description" | "skill3Description" | "skill4Description")}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-jamun-blue/10 via-sky-100/50 to-indigo-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-jamun-blue/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                &quot;{t("skillsTestimonial")}&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jamun-blue/20 flex items-center justify-center">
                  <span className="text-jamun-blue font-bold">A</span>
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

      {/* Conference Format Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("conferenceEyebrow")}
          title={t("conferenceTitle")}
          subtitle={t("conferenceSubtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {conferenceFormat.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-jamun-blue flex items-center justify-center text-white font-bold text-lg">
                  {t(`conferenceStep${index + 1}Number` as "conferenceStep1Number" | "conferenceStep2Number" | "conferenceStep3Number" | "conferenceStep4Number")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {t(`conferenceStep${index + 1}Title` as "conferenceStep1Title" | "conferenceStep2Title" | "conferenceStep3Title" | "conferenceStep4Title")}
                  </h3>
                  <p className="text-gray-600">
                    {t(`conferenceStep${index + 1}Description` as "conferenceStep1Description" | "conferenceStep2Description" | "conferenceStep3Description" | "conferenceStep4Description")}
                  </p>
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
                src="/images/conferences/DSC02021.webp"
                alt={t("conferenceImageAlt")}
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
                  <div className="w-10 h-10 rounded-lg bg-jamun-blue/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-jamun-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t("conferenceTypicalTitle")}
                    </p>
                    <p className="text-sm text-gray-500">{t("conferenceTypicalDays")}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {t("conferenceHoursPerDay")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {t("conferenceDelegates")}
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </Section>

      {/* Sample Committees */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("committeesEyebrow")}
          title={t("committeesTitle")}
          subtitle={t("committeesSubtitle")}
        />

        {sampleCommittees.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sampleCommittees.map((committee) => (
              <motion.div
                key={committee.slug}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
              >
                <Link href={`/modelun/committees/${committee.slug}`}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group h-full flex flex-col">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {committee.abbreviation}
                      </h3>
                      <span
                        className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0",
                          committee.level === "Beginner-Friendly"
                            ? "bg-green-100 text-green-700"
                            : committee.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        )}
                      >
                        {committee.level === "Beginner-Friendly"
                          ? t("committeesLevelBeginner")
                          : committee.level === "Intermediate"
                            ? t("committeesLevelIntermediate")
                            : t("committeesLevelAdvanced")}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {committee.category}
                    </p>
                    <h4 className="text-lg font-semibold text-jamun-blue mb-2 group-hover:text-jamun-blue-dark transition-colors">
                      {committee.topic}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                      {committee.description}
                    </p>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{t("committeesDelegates", { count: committee.delegateCount })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {t("committeesEmpty")}
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button href="/modelun/committees" size="lg" className="group">
            {t("committeesSeeCTA")}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            {t("committeesRotateNote")}{" "}
            <Link
              href="/register"
              className="text-jamun-blue hover:text-jamun-blue-dark font-medium"
            >
              {t("committeesRegistrationLink")}
            </Link>{" "}
            {t("committeesRotateNoteEnd")}
          </p>
        </motion.div>
      </Section>

      {/* Resources Section */}
      <ProgramResourcesSection
        eyebrow={t("resourcesEyebrow")}
        title={t("resourcesTitle")}
        subtitle={t("resourcesSubtitle")}
        resources={translatedResources}
        ctaLabel={t("resourcesCTA")}
        ctaHref="/modelun/resources"
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
                    {t(`faq${index + 1}Question` as "faq1Question" | "faq2Question" | "faq3Question" | "faq4Question" | "faq5Question" | "faq6Question")}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-5 h-5 text-jamun-blue flex-shrink-0 transition-transform duration-300",
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
                    {t(`faq${index + 1}Answer` as "faq1Answer" | "faq2Answer" | "faq3Answer" | "faq4Answer" | "faq5Answer" | "faq6Answer")}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Globe className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}
            <span className="bg-gradient-to-r from-jamun-blue via-sky-500 to-jamun-blue bg-clip-text text-transparent">
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                {t("ctaPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" variant="outline" size="lg">
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
              href="mailto:modelun@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              modelun@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
