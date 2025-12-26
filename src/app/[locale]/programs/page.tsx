"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Section, Button, TypewriterText } from "@/components/ui";
import {
  Globe,
  Scale,
  Calculator,
  ArrowRight,
  Users,
  Trophy,
  BookOpen,
  Target,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Brain,
  Gavel,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Different durations for each stat to create staggered finish effect
const statDurations = [1400, 1800, 2200, 2600];

function AnimatedNumber({ value, duration = 2000 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract the numeric part
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

    const steps = Math.max(30, Math.floor(duration / 33)); // ~30fps
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

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

export default function ProgramsPage() {
  const t = useTranslations("ProgramsPage");

  // Stats for programs section - now using translations
  const programStats = [
    { value: "3", label: t("statPrograms") },
    { value: "500+", label: t("statStudents") },
    { value: "100%", label: t("statBeginner") },
    { value: "$0", label: t("statCost") },
  ];

  // Detailed program data with translations
  const programs = [
    {
      id: "model-un",
      title: t("modelUNTitle"),
      tagline: t("modelUNTagline"),
      description: t("modelUNDescription"),
      longDescription: t("modelUNLongDescription"),
      icon: Globe,
      accentColor: "bg-jamun-blue",
      accentColorLight: "bg-jamun-blue/10",
      textColor: "text-jamun-blue",
      borderColor: "border-jamun-blue/20",
      glowColor: "group-hover:shadow-jamun-blue/20",
      href: "/modelun",
      image: "/images/conferences/DSC00848.webp",
      features: [
        {
          icon: MessageSquare,
          title: t("modelUNFeature1Title"),
          description: t("modelUNFeature1Description"),
        },
        {
          icon: Users,
          title: t("modelUNFeature2Title"),
          description: t("modelUNFeature2Description"),
        },
        {
          icon: BookOpen,
          title: t("modelUNFeature3Title"),
          description: t("modelUNFeature3Description"),
        },
        {
          icon: Target,
          title: t("modelUNFeature4Title"),
          description: t("modelUNFeature4Description"),
        },
      ],
      whatYouLearn: [
        t("modelUNLearn1"),
        t("modelUNLearn2"),
        t("modelUNLearn3"),
        t("modelUNLearn4"),
        t("modelUNLearn5"),
        t("modelUNLearn6"),
      ],
      schedule: {
        practice: t("modelUNSchedulePractice"),
        competitions: t("modelUNScheduleCompetitions"),
        commitment: t("modelUNScheduleCommitment"),
      },
      testimonial: {
        quote: t("modelUNTestimonialQuote"),
        author: t("modelUNTestimonialAuthor"),
      },
    },
    {
      id: "mock-trial",
      title: t("mockTrialTitle"),
      tagline: t("mockTrialTagline"),
      description: t("mockTrialDescription"),
      longDescription: t("mockTrialLongDescription"),
      icon: Scale,
      accentColor: "bg-purple-600",
      accentColorLight: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      glowColor: "group-hover:shadow-purple-500/20",
      href: "/mocktrial",
      image: "/images/conferences/DSC02128.webp",
      features: [
        {
          icon: Gavel,
          title: t("mockTrialFeature1Title"),
          description: t("mockTrialFeature1Description"),
        },
        {
          icon: FileText,
          title: t("mockTrialFeature2Title"),
          description: t("mockTrialFeature2Description"),
        },
        {
          icon: MessageSquare,
          title: t("mockTrialFeature3Title"),
          description: t("mockTrialFeature3Description"),
        },
        {
          icon: Trophy,
          title: t("mockTrialFeature4Title"),
          description: t("mockTrialFeature4Description"),
        },
      ],
      whatYouLearn: [
        t("mockTrialLearn1"),
        t("mockTrialLearn2"),
        t("mockTrialLearn3"),
        t("mockTrialLearn4"),
        t("mockTrialLearn5"),
        t("mockTrialLearn6"),
      ],
      schedule: {
        practice: t("mockTrialSchedulePractice"),
        competitions: t("mockTrialScheduleCompetitions"),
        commitment: t("mockTrialScheduleCommitment"),
      },
      testimonial: {
        quote: t("mockTrialTestimonialQuote"),
        author: t("mockTrialTestimonialAuthor"),
      },
    },
    {
      id: "mathletes",
      title: t("mathletesTitle"),
      tagline: t("mathletesTagline"),
      description: t("mathletesDescription"),
      longDescription: t("mathletesLongDescription"),
      icon: Calculator,
      accentColor: "bg-emerald-600",
      accentColorLight: "bg-emerald-100",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      glowColor: "group-hover:shadow-emerald-500/20",
      href: "/mathletes",
      image: "/images/conferences/homebackground2.webp",
      features: [
        {
          icon: Brain,
          title: t("mathletesFeature1Title"),
          description: t("mathletesFeature1Description"),
        },
        {
          icon: TrendingUp,
          title: t("mathletesFeature2Title"),
          description: t("mathletesFeature2Description"),
        },
        {
          icon: Users,
          title: t("mathletesFeature3Title"),
          description: t("mathletesFeature3Description"),
        },
        {
          icon: Award,
          title: t("mathletesFeature4Title"),
          description: t("mathletesFeature4Description"),
        },
      ],
      whatYouLearn: [
        t("mathletesLearn1"),
        t("mathletesLearn2"),
        t("mathletesLearn3"),
        t("mathletesLearn4"),
        t("mathletesLearn5"),
        t("mathletesLearn6"),
      ],
      schedule: {
        practice: t("mathletesSchedulePractice"),
        competitions: t("mathletesScheduleCompetitions"),
        commitment: t("mathletesScheduleCommitment"),
      },
      testimonial: {
        quote: t("mathletesTestimonialQuote"),
        author: t("mathletesTestimonialAuthor"),
      },
    },
  ];

  // Why Choose JAMUN items with translations
  const whyChooseItems = [
    {
      icon: Users,
      title: t("whyChooseBeginner"),
      description: t("whyChooseBeginnerDescription"),
    },
    {
      icon: Trophy,
      title: t("whyChooseCompetitions"),
      description: t("whyChooseCompetitionsDescription"),
    },
    {
      icon: BookOpen,
      title: t("whyChooseResources"),
      description: t("whyChooseResourcesDescription"),
    },
    {
      icon: Target,
      title: t("whyChooseSkills"),
      description: t("whyChooseSkillsDescription"),
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-jamun-blue/10 rounded-full blur-3xl -z-10" />

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
                <Sparkles className="w-4 h-4" />
                {t("heroBadge")}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t("heroTitle")} delay={0.3} />
                <TypewriterText
                  text={t("heroTitleHighlight")}
                  delay={0.3 + 16 * 0.03}
                  className="bg-gradient-to-r from-jamun-blue via-purple-600 to-emerald-500 bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {t("heroSubtitle")}
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
                <Button href="mailto:contact@jamun.org" variant="outline" size="lg">
                  {t("heroSecondaryCTA")}
                </Button>
              </motion.div>
            </motion.div>

            {/* Program Icons Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Model UN Card */}
                <Link href="/modelun" className="col-span-2 group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-jamun-blue/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-jamun-blue/10 flex items-center justify-center">
                        <Globe className="w-7 h-7 text-jamun-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{t("heroModelUNTitle")}</h3>
                        <p className="text-sm text-gray-600">{t("heroModelUNDescription")}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-jamun-blue transition-colors" />
                    </div>
                  </motion.div>
                </Link>

                {/* Mock Trial Card */}
                <Link href="/mocktrial" className="group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-purple-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{t("heroMockTrialTitle")}</h3>
                    <p className="text-xs text-gray-600">{t("heroMockTrialDescription")}</p>
                  </motion.div>
                </Link>

                {/* Mathletes Card */}
                <Link href="/mathletes" className="group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-emerald-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{t("heroMathletesTitle")}</h3>
                    <p className="text-xs text-gray-600">{t("heroMathletesDescription")}</p>
                  </motion.div>
                </Link>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-jamun-blue/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

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
            {programStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center h-full">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-purple-600/0 group-hover:from-jamun-blue/5 group-hover:to-purple-600/5 transition-all duration-300" />

                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-purple-400 bg-clip-text text-transparent mb-3">
                      <AnimatedNumber value={stat.value} duration={statDurations[index]} />
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

      {/* Program Deep Dives */}
      {programs.map((program, programIndex) => (
        <section
          key={program.id}
          className={cn(
            "py-16 md:py-20 lg:py-24 overflow-hidden",
            programIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Program Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
                  program.accentColorLight
                )}
              >
                <program.icon className={cn("w-5 h-5", program.textColor)} />
                <span className={cn("font-semibold", program.textColor)}>
                  {program.tagline}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
                {program.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {program.description}
              </p>
            </motion.div>

            {/* Main Content Grid */}
            <div
              className={cn(
                "grid lg:grid-cols-2 gap-12 items-center mb-16",
                programIndex % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: programIndex % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={cn(programIndex % 2 === 1 && "lg:order-2")}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl",
                      program.glowColor
                    )}
                  >
                    <Image
                      src={program.image}
                      alt={`${program.title} in action`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Icon badge on image */}
                    <div
                      className={cn(
                        "absolute top-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                        program.accentColor
                      )}
                    >
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>

                  {/* Decorative blobs */}
                  <div
                    className={cn(
                      "absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl -z-10",
                      program.accentColorLight
                    )}
                  />
                  <div
                    className={cn(
                      "absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-3xl -z-10 opacity-50",
                      program.accentColorLight
                    )}
                  />
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: programIndex % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(programIndex % 2 === 1 && "lg:order-1")}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t("whatIsProgram", { program: program.title })}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.longDescription}
                </p>

                {/* Schedule Info */}
                <div
                  className={cn(
                    "rounded-xl p-5 mb-6 border",
                    program.accentColorLight,
                    program.borderColor
                  )}
                >
                  <h4 className={cn("font-semibold mb-3", program.textColor)}>
                    {t("timeCommitment")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className={cn("w-4 h-4", program.textColor)} />
                      <span className="text-gray-700">
                        {program.schedule.commitment}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className={cn("w-4 h-4", program.textColor)} />
                      <span className="text-gray-700">
                        {program.schedule.practice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className={cn("w-4 h-4", program.textColor)} />
                      <span className="text-gray-700">
                        {program.schedule.competitions}
                      </span>
                    </div>
                  </div>
                </div>

                <Button href={program.href} className="group">
                  {t("learnMoreAbout", { program: program.title })}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Skills Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {program.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      program.accentColorLight
                    )}
                  >
                    <feature.icon className={cn("w-6 h-6", program.textColor)} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* What You'll Learn + Testimonial */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("whatYouLearn")}
                </h4>
                <ul className="space-y-3">
                  {program.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle
                        className={cn("w-5 h-5 mt-0.5 flex-shrink-0", program.textColor)}
                      />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  "rounded-2xl p-6 md:p-8 border",
                  program.accentColorLight,
                  program.borderColor
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                    program.accentColor
                  )}
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <blockquote className="text-lg md:text-xl font-medium text-gray-900 mb-4 leading-relaxed">
                  &ldquo;{program.testimonial.quote}&rdquo;
                </blockquote>
                <p className={cn("font-semibold", program.textColor)}>
                  — {program.testimonial.author}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose JAMUN Programs */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("whyChooseTitle")}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t("whyChooseSubtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-jamun-blue/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-jamun-blue-light" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Sparkles className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              {t("ctaBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("ctaTitle")}{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {t("ctaTitleHighlight")}
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("ctaSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                {t("ctaPrimaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/modelun/resources" variant="outline" size="lg">
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
              href="mailto:contact@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              contact@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
