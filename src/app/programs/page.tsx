"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Section, Button } from "@/components/ui";
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

// Detailed program data
const programs = [
  {
    id: "model-un",
    title: "Model United Nations",
    tagline: "Diplomacy in Action",
    description:
      "Step into the shoes of UN delegates and tackle real-world global issues. Model UN develops critical thinking, public speaking, and negotiation skills while building deep understanding of international relations.",
    longDescription:
      "Model United Nations simulates the United Nations where students represent different countries and debate global issues. Delegates research their assigned country's positions, write position papers, give speeches, and work with others to draft resolutions addressing world challenges like climate change, human rights, and international security.",
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
        title: "Public Speaking",
        description: "Deliver speeches, respond to questions, and articulate your country's position clearly.",
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "Work with other delegates to build coalitions and draft consensus resolutions.",
      },
      {
        icon: BookOpen,
        title: "Research Skills",
        description: "Learn to research complex topics and understand multiple perspectives on global issues.",
      },
      {
        icon: Target,
        title: "Negotiation",
        description: "Practice diplomatic negotiation, compromise, and persuasion in a professional setting.",
      },
    ],
    whatYouLearn: [
      "How the United Nations and international diplomacy work",
      "Research and analysis of complex global issues",
      "Public speaking and formal debate techniques",
      "Writing position papers and draft resolutions",
      "Coalition-building and negotiation strategies",
      "Understanding diverse cultural perspectives",
    ],
    schedule: {
      practice: "Weekly club meetings",
      competitions: "2 conferences per year",
      commitment: "3 hours per week",
    },
    testimonial: {
      quote: "Model UN taught me that I could speak up and be heard. It changed how I see myself and my ability to make a difference.",
      author: "Former JAMUN Delegate",
    },
  },
  {
    id: "mock-trial",
    title: "Mock Trial",
    tagline: "Justice Takes the Stand",
    description:
      "Experience the drama of the courtroom as attorneys and witnesses bring cases to life. Mock Trial develops argumentation, critical analysis, and presentation skills that translate to success in any field.",
    longDescription:
      "Mock Trial is a competitive simulation where students take on the roles of attorneys and witnesses to argue a fictional legal case. Teams prepare both prosecution/plaintiff and defense sides, learning to craft opening statements, conduct direct and cross-examinations, and deliver closing arguments before real judges.",
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
        title: "Legal Reasoning",
        description: "Learn to construct logical arguments, analyze evidence, and think like a lawyer.",
      },
      {
        icon: FileText,
        title: "Case Analysis",
        description: "Dissect complex cases, identify key facts, and develop winning strategies.",
      },
      {
        icon: MessageSquare,
        title: "Examination Skills",
        description: "Master the art of questioning witnesses through direct and cross-examination.",
      },
      {
        icon: Trophy,
        title: "Performance",
        description: "Bring witnesses to life and deliver compelling arguments that persuade judges.",
      },
    ],
    whatYouLearn: [
      "Fundamentals of the American legal system",
      "How to construct and refute legal arguments",
      "Direct and cross-examination techniques",
      "Evidence rules and objection procedures",
      "Persuasive speaking and presentation skills",
      "Teamwork and strategic thinking",
    ],
    schedule: {
      practice: "Weekly club meetings",
      competitions: "Year-round programming",
      commitment: "5 hours per week",
    },
    testimonial: {
      quote: "Mock Trial pushed me out of my comfort zone. Now I can think on my feet and argue my point confidently.",
      author: "Dustin Simon, Director of Mock Trial",
    },
  },
  {
    id: "mathletes",
    title: "Mathletes",
    tagline: "Numbers, Teamwork, Victory",
    description:
      "Challenge yourself with competitive mathematics and discover the thrill of problem-solving. Mathletes builds analytical thinking, perseverance, and teamwork through engaging math competitions.",
    longDescription:
      "Mathletes is a competitive mathematics program where students tackle challenging problems ranging from arithmetic and algebra to geometry and number theory. Students compete individually and as teams, developing speed, accuracy, and creative problem-solving approaches while building a supportive math community.",
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
        title: "Problem Solving",
        description: "Develop creative approaches to challenging problems beyond standard curriculum.",
      },
      {
        icon: TrendingUp,
        title: "Speed & Accuracy",
        description: "Build computational fluency and confidence in time-pressured situations.",
      },
      {
        icon: Users,
        title: "Team Events",
        description: "Collaborate on relay rounds and team challenges that require coordination.",
      },
      {
        icon: Award,
        title: "Recognition",
        description: "Earn awards and recognition for mathematical achievement at competitions.",
      },
    ],
    whatYouLearn: [
      "Advanced problem-solving strategies",
      "Number theory and algebraic techniques",
      "Geometric reasoning and proofs",
      "Mental math and estimation skills",
      "Time management under pressure",
      "Mathematical communication",
    ],
    schedule: {
      practice: "Meetings every two weeks",
      competitions: "4 tournaments per year",
      commitment: "4 hours per week",
    },
    testimonial: {
      quote: "Mathematics isn't just about numbers—it's about developing the problem-solving mindset that unlocks every door in life.",
      author: "Will Ballis, Director of Mathletes",
    },
  },
];

// Stats for programs section
const programStats = [
  { value: "3", label: "Academic Programs" },
  { value: "500+", label: "Students Served" },
  { value: "100%", label: "Beginner Welcome" },
  { value: "$0", label: "To Start" },
];

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
                Our Programs
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Three Paths to{" "}
                <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                  Excellence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Whether you love debating global issues in Model UN, arguing cases
                in Mock Trial court, or solving challenging math problems in Mathletes
                competitions—we have a program that will ignite your passion and build
                skills for high school, college, and beyond. All designed specifically
                for middle school students in grades 5-8, all beginner-friendly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="/register" size="lg" className="group">
                  Register Your Team
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="mailto:contact@jamun.org" variant="outline" size="lg">
                  Questions? Contact Us
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
                        <h3 className="text-lg font-semibold text-gray-900">Model UN</h3>
                        <p className="text-sm text-gray-600">Diplomacy & Global Issues</p>
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
                    <h3 className="font-semibold text-gray-900">Mock Trial</h3>
                    <p className="text-xs text-gray-600">Legal Advocacy</p>
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
                    <h3 className="font-semibold text-gray-900">Mathletes</h3>
                    <p className="text-xs text-gray-600">Math Competitions</p>
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
              Academic Competitions Built for Middle School Students
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every program is designed specifically for grades 5-8, with no prior experience required.
              Build public speaking, critical thinking, and leadership skills that prepare you for
              magnet schools, high school honors tracks, and college admissions.
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
                  What is {program.title}?
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
                    Time Commitment
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
                  Learn More About {program.title}
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
                  What You&apos;ll Learn
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
              Why Choose JAMUN?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every program is designed with middle schoolers in mind—accessible,
              supportive, and genuinely fun.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Users,
                title: "Beginner-Friendly",
                description:
                  "No experience needed. We teach everything from the ground up with patient, supportive mentors.",
              },
              {
                icon: Trophy,
                title: "Real Competitions",
                description:
                  "Compete in actual tournaments and conferences, earning recognition and building your resume.",
              },
              {
                icon: BookOpen,
                title: "Free Resources",
                description:
                  "Access training materials, practice problems, and curriculum guides at no cost.",
              },
              {
                icon: Target,
                title: "Skill Development",
                description:
                  "Build transferable skills in communication, critical thinking, and teamwork.",
              },
            ].map((item) => (
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
              Ready to Get Started?
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Find Your{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              Perfect Program
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Whether you&apos;re a student eager to compete or a teacher looking to start
            a program at your school, we&apos;re here to help you take the first step.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/modelun/resources" variant="outline" size="lg">
                View Free Resources
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
            Questions? Reach out at{" "}
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
