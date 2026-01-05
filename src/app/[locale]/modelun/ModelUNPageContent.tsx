"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeader, Button, TypewriterText } from "@/components/ui";
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
import { CommitteeMeta } from "@/lib/committees";

interface ModelUNPageContentProps {
  committees: CommitteeMeta[];
}

// What delegates do at Model UN
const delegateActivities = [
  {
    icon: BookOpen,
    title: "Research Your Country",
    description:
      "Dive deep into your assigned nation's history, politics, economy, and stance on global issues. Become the expert.",
  },
  {
    icon: FileText,
    title: "Write Position Papers",
    description:
      "Craft compelling documents that outline your country's position and proposed solutions to world challenges.",
  },
  {
    icon: MessageSquare,
    title: "Deliver Speeches",
    description:
      "Take the floor to address the committee, articulate your positions, and respond to questions from other delegates.",
  },
  {
    icon: Handshake,
    title: "Build Coalitions",
    description:
      "Work with allies to draft resolutions, negotiate compromises, and build consensus on complex issues.",
  },
];

// Skills developed through Model UN
const skills = [
  {
    icon: MessageSquare,
    title: "Public Speaking",
    description:
      "Gain confidence speaking in front of groups, structuring arguments, and thinking on your feet.",
    color: "bg-jamun-blue/10",
    iconColor: "text-jamun-blue",
  },
  {
    icon: Lightbulb,
    title: "Critical Thinking",
    description:
      "Analyze complex problems from multiple perspectives and develop creative solutions.",
    color: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Learn to work with others, build consensus, and navigate diplomatic challenges.",
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Research & Writing",
    description:
      "Develop strong research skills and learn to write persuasive, well-structured documents.",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

// Conference format sections
const conferenceFormat = [
  {
    number: "01",
    title: "Opening Ceremonies",
    description:
      "Conferences begin with inspiring speakers and orientation to set the tone for productive diplomacy.",
  },
  {
    number: "02",
    title: "Committee Sessions",
    description:
      "Delegates debate topics, deliver speeches, and work in blocs to draft working papers and resolutions.",
  },
  {
    number: "03",
    title: "Unmoderated Caucuses",
    description:
      "Informal negotiation time where delegates move freely, form alliances, and draft collaborative documents.",
  },
  {
    number: "04",
    title: "Voting & Awards",
    description:
      "Committees vote on resolutions, and outstanding delegates are recognized with awards and honors.",
  },
];

// Resources for Model UN
const resources = [
  {
    icon: File,
    title: "A Short Guide to the Crisis",
    description:
      "Learn how crisis committees work, from backroom notes to directives.",
    date: "2024-03-18",
  },
  {
    icon: ClipboardList,
    title: "Crisis Committee Position Paper Outline",
    description:
      "A structured template for writing crisis committee position papers.",
    date: "2024-07-25",
  },
  {
    icon: ScrollText,
    title: "Directive Outline",
    description: "A template for writing crisis committee directives.",
    date: "2025-02-09",
  },
  {
    icon: FileText,
    title: "Draft Resolution Outline",
    description:
      "A template for writing General Assembly draft resolutions.",
    date: "2024-11-03",
  },
  {
    icon: BookOpen,
    title: "Parliamentary Procedure Guide",
    description:
      "Everything you need to know about motions, points, and debate rules.",
    date: "2025-06-14",
  },
  {
    icon: Globe,
    title: "Country Research Guide",
    description:
      "Step-by-step instructions for researching your assigned country.",
    date: "2024-09-22",
  },
];

// FAQs
const faqs = [
  {
    question: "Do I need any experience to join Model UN?",
    answer:
      "Not at all! Our program is designed specifically for beginners. We'll teach you everything from how to research your country to parliamentary procedure. Many of our most successful delegates started with zero experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Model UN is designed for middle school students in grades 5-8. We create age-appropriate committees and topics that challenge students while remaining accessible.",
  },
  {
    question: "How much time does Model UN require?",
    answer:
      "Typically, clubs meet weekly for 1-2 hours. Before conferences, delegates spend additional time researching their country and preparing speeches. Conferences are usually 1-2 days on weekends.",
  },
  {
    question: "What topics do you debate?",
    answer:
      "Topics range from climate change and human rights to technology regulation and international security. We select topics that are relevant, engaging, and appropriate for middle schoolers to explore.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal. Many of our resources are free, and we offer financial assistance for conference registration fees. No student should be unable to participate due to cost.",
  },
  {
    question: "How do awards work?",
    answer:
      "Delegates can earn awards like Best Delegate, Outstanding Delegate, and Honorable Mention based on their preparation, speaking skills, collaboration, and adherence to their country's positions.",
  },
];

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
    { value: "100%", label: t("statsBeginnerWelcome") },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-sky-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-sky-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-jamun-blue/10 rounded-full blur-3xl -z-10" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20"
              >
                <Globe className="w-4 h-4" />
                {t("heroBadge")}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t("heroTitlePart1")} delay={0.3} />
                <TypewriterText
                  text={t("heroTitlePart2")}
                  delay={0.3 + 10 * 0.03}
                  className="bg-gradient-to-r from-jamun-blue via-sky-500 to-jamun-blue bg-clip-text text-transparent"
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
                <Button href="/register" size="lg" className="group">
                  {t("heroPrimaryCTA")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/modelun/committees" variant="outline" size="lg">
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
                  <GraduationCap className="w-4 h-4 text-jamun-blue" />
                  {t("heroBadgeGrades")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-jamun-blue" />
                  {t("heroBadgeExperience")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Trophy className="w-4 h-4 text-jamun-blue" />
                  {t("heroBadgeAwards")}
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
                  src="/images/conferences/homebackground.webp"
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
                      <div className="w-12 h-12 rounded-xl bg-jamun-blue flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
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
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-jamun-blue/30 to-sky-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-jamun-blue/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-indigo-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl" />

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
            {munStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-sky-600/0 group-hover:from-jamun-blue/5 group-hover:to-sky-600/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-sky-400 bg-clip-text text-transparent mb-3">
                      <AnimatedNumber
                        value={stat.value}
                        duration={statDurations[index]}
                      />
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

              {/* Quote overlay */}
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

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-jamun-blue/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-sky-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* What Delegates Do Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("delegateEyebrow")}
          title={t("delegateTitle")}
          subtitle={t("delegateSubtitle")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {delegateActivities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-jamun-blue/10 flex items-center justify-center mb-4">
                <activity.icon className="w-7 h-7 text-jamun-blue" />
              </div>
              <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-jamun-blue bg-jamun-blue/10 rounded-full">
                {t("delegateStep", { number: index + 1 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`delegateActivity${index + 1}Title` as "delegateActivity1Title" | "delegateActivity2Title" | "delegateActivity3Title" | "delegateActivity4Title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`delegateActivity${index + 1}Description` as "delegateActivity1Description" | "delegateActivity2Description" | "delegateActivity3Description" | "delegateActivity4Description")}
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
            {skills.map((skill, index) => (
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
          {/* Format steps */}
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
                src="/images/conferences/DSC02021.webp"
                alt={t("conferenceImageAlt")}
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

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-jamun-blue/20 rounded-full blur-2xl -z-10" />
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sampleCommittees.map((committee) => (
              <motion.div
                key={committee.slug}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Link href={`/modelun/committees/${committee.slug}`}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                    {/* Header: Abbreviation + Level Badge */}
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

                    {/* Category */}
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {committee.category}
                    </p>

                    {/* Topic */}
                    <h4 className="text-lg font-semibold text-jamun-blue mb-2 group-hover:text-jamun-blue-dark transition-colors">
                      {committee.topic}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                      {committee.description}
                    </p>

                    {/* Footer: Delegate count */}
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

        {/* See All Committees Button */}
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
      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        {/* Centered Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-3 block">
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

          {/* Scrolling track - using inline style for pixel-perfect scroll */}
          <div
            className="flex hover:[animation-play-state:paused]"
            style={{
              animation: "scroll 20s linear infinite",
            } as React.CSSProperties}
          >
            {/* First set of cards */}
            {resources.map((resource, index) => (
              <div
                key={`first-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-jamun-blue/10 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-jamun-blue" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`resource${index + 1}Title` as "resource1Title" | "resource2Title" | "resource3Title" | "resource4Title" | "resource5Title" | "resource6Title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`resource${index + 1}Description` as "resource1Description" | "resource2Description" | "resource3Description" | "resource4Description" | "resource5Description" | "resource6Description")}
                </p>
              </div>
            ))}
            {/* Duplicate set for seamless infinite scroll */}
            {resources.map((resource, index) => (
              <div
                key={`second-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-jamun-blue/10 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-jamun-blue" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`resource${index + 1}Title` as "resource1Title" | "resource2Title" | "resource3Title" | "resource4Title" | "resource5Title" | "resource6Title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`resource${index + 1}Description` as "resource1Description" | "resource2Description" | "resource3Description" | "resource4Description" | "resource5Description" | "resource6Description")}
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
          <Button href="/modelun/resources" size="lg" className="group">
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
