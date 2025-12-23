"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  Calculator,
  ArrowRight,
  Users,
  Trophy,
  BookOpen,
  CheckCircle,
  Brain,
  Lightbulb,
  GraduationCap,
  Calendar,
  Clock,
  Quote,
  ChevronRight,
  File,
  ClipboardList,
  ScrollText,
  FileText,
  Sparkles,
  Target,
  Puzzle,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// What participants do in Mathletes
const mathletesActivities = [
  {
    icon: BookOpen,
    title: "Learn Problem-Solving",
    description:
      "Master creative approaches to math problems that go beyond textbook methods. Discover elegant solutions.",
  },
  {
    icon: Brain,
    title: "Practice Weekly",
    description:
      "Work through challenging problems with teammates and coaches, building speed and accuracy.",
  },
  {
    icon: Puzzle,
    title: "Compete as a Team",
    description:
      "Collaborate with teammates in relay rounds and team challenges where every member contributes.",
  },
  {
    icon: Trophy,
    title: "Earn Recognition",
    description:
      "Compete for individual and team awards at regional and national competitions.",
  },
];

// Skills developed through Mathletes
const skills = [
  {
    icon: Brain,
    title: "Logical Reasoning",
    description:
      "Develop systematic approaches to breaking down complex problems into manageable steps.",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Mental Math",
    description:
      "Build lightning-fast calculation skills and number sense that serve you in all areas.",
    color: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: Target,
    title: "Strategic Thinking",
    description:
      "Learn to identify patterns, make predictions, and choose the best approach to each problem.",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Work with teammates to solve problems faster together than you could alone.",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
];

// Competition format sections
const competitionFormat = [
  {
    number: "01",
    title: "Sprint Round",
    description:
      "Individual challenge: 30 problems in 40 minutes testing accuracy and speed across all math topics.",
  },
  {
    number: "02",
    title: "Target Round",
    description:
      "Pairs of challenging problems with 6 minutes each. Focus on deep problem-solving over speed.",
  },
  {
    number: "03",
    title: "Team Round",
    description:
      "Work together with your team of 4 to solve 10 problems in 20 minutes. Collaboration is key.",
  },
  {
    number: "04",
    title: "Countdown Round",
    description:
      "Head-to-head bracket tournament for top scorers. First to buzz in with the correct answer advances.",
  },
];

// Math topics covered
const mathTopics = [
  {
    name: "Number Theory",
    topics: "Primes, divisibility, modular arithmetic",
    level: "Core Topic",
  },
  {
    name: "Algebra",
    topics: "Equations, inequalities, word problems",
    level: "Core Topic",
  },
  {
    name: "Geometry",
    topics: "Area, perimeter, angles, coordinate geometry",
    level: "Core Topic",
  },
  {
    name: "Probability & Counting",
    topics: "Combinations, permutations, expected value",
    level: "Advanced",
  },
];

// Resources for Mathletes
const resources = [
  {
    icon: File,
    title: "Getting Started Guide",
    description:
      "An introduction to competitive math and how to begin your Mathletes journey.",
  },
  {
    icon: ClipboardList,
    title: "Practice Problem Sets",
    description:
      "Curated problems organized by difficulty and topic for daily practice.",
  },
  {
    icon: ScrollText,
    title: "Formula Sheet",
    description:
      "Essential formulas and theorems you'll need for competition success.",
  },
  {
    icon: FileText,
    title: "Mental Math Tips",
    description:
      "Techniques for faster calculations and building number sense.",
  },
  {
    icon: BookOpen,
    title: "Problem-Solving Strategies",
    description:
      "Learn systematic approaches like working backwards and finding patterns.",
  },
  {
    icon: Calculator,
    title: "Past Competition Problems",
    description:
      "Real problems from previous competitions with detailed solutions.",
  },
];

// FAQs
const faqs = [
  {
    question: "Do I need to be a math genius to join Mathletes?",
    answer:
      "Not at all! Mathletes is for students who enjoy math and want to challenge themselves. We welcome all skill levels and provide training that helps everyone improve. Some of our best competitors started with no competition experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Mathletes is designed for middle school students in grades 5-8. We create age-appropriate practice materials and competition divisions so students compete with peers at similar levels.",
  },
  {
    question: "When does Mathletes start?",
    answer:
      "Mathletes begins in Fall 2026! We're currently building our curriculum and partnerships. Join our mailing list to be the first to know when registration opens.",
  },
  {
    question: "How much time does Mathletes require?",
    answer:
      "Teams typically practice 2-3 hours per week. Students are encouraged to do additional individual practice, but the time commitment is flexible based on your goals.",
  },
  {
    question: "What math level do I need?",
    answer:
      "If you're comfortable with pre-algebra concepts, you're ready to start! Our training covers topics from basic arithmetic through introductory algebra and geometry.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal. Many of our resources are free, and we offer financial assistance for competition registration fees. No student should be unable to participate due to cost.",
  },
];

// Stats for Mathletes (projected for launch)
const mathletesStats = [
  { value: "Fall 2026", label: "Program Launch" },
  { value: "100%", label: "All Skill Levels" },
  { value: "4+", label: "Competition Types" },
  { value: "3", label: "Competitions/Year" },
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

export default function MathletesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-teal-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-emerald-600 bg-emerald-100 rounded-full border border-emerald-200"
              >
                <Calculator className="w-4 h-4" />
                Mathletes
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Where Numbers Become{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                  Superpowers
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Join a community of problem-solvers who see math as an exciting
                challenge. Compete in fast-paced rounds, solve puzzles that push
                your limits, and discover how fun math can really be.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="/contact" size="lg" className="group bg-emerald-600 hover:bg-emerald-700">
                  Join the Interest List
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/programs" variant="outline" size="lg">
                  Explore All Programs
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
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Grades 5-8
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Launching Fall 2026
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  All Skill Levels Welcome
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
                  src="/images/conferences/mathletes.webp"
                  alt="Students engaged in math competition"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Coming Fall 2026
                        </p>
                        <p className="text-sm text-gray-600">
                          Be Among the First to Join
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-teal-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              JAMUN Mathletes at a Glance
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A brand new program launching Fall 2026—be among the founding members.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mathletesStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 text-center h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/5 group-hover:to-teal-600/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
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
              About Mathletes
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              What is{" "}
              <span className="text-emerald-600">Mathletes</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Mathletes is a competitive mathematics program where students
              challenge themselves with problems that go beyond the classroom.
              Think of it as a sport for your brain—with individual events,
              team competitions, and the thrill of solving problems under
              pressure.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              It's not about memorizing formulas—it's about creative thinking,
              pattern recognition, and the satisfaction of cracking a tough
              problem. Whether you love puzzles or want to strengthen your math
              skills, Mathletes makes math genuinely exciting.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact" className="group bg-emerald-600 hover:bg-emerald-700">
                Get Notified at Launch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/resources" variant="outline">
                View Resources
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
                src="/images/conferences/DSC01567.webp"
                alt="Students working on math problems together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/60 via-transparent to-transparent" />

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white">
                  <p className="text-lg font-medium mb-2">
                    "Math used to be just homework. Now it's my favorite puzzle
                    to solve with friends."
                  </p>
                  <footer className="text-white/80 text-sm">
                    — Ryan, 7th Grade Mathlete
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* What You'll Do Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="The Mathletes Experience"
          title="What You'll Do as a Mathlete"
          subtitle="From practice sessions to competition day—here's how you'll grow as a problem-solver."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mathletesActivities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <activity.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-emerald-600 bg-emerald-100 rounded-full">
                Step {index + 1}
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
          eyebrow="Skills for Life"
          title="More Than Just Math Problems"
          subtitle="The skills you develop in Mathletes will serve you in school, career, and life."
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
            <div className="bg-gradient-to-br from-emerald-100/50 via-teal-100/50 to-cyan-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-emerald-600/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                "Mathletes taught me that getting stuck is just part of the
                process. Now I actually enjoy the challenge of figuring things
                out."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">SL</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah L.</p>
                  <p className="text-sm text-gray-600">
                    8th Grade, Second-Year Mathlete
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
          eyebrow="Competition Format"
          title="How Competitions Work"
          subtitle="From sprint rounds to countdown brackets, here's what to expect at a competition."
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
                src="/images/conferences/DSC01601.webp"
                alt="Mathletes competition in progress"
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
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Typical Competition
                    </p>
                    <p className="text-sm text-gray-500">Half to Full Day</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 4 Rounds
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> Team of 4
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Topics Covered Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="What You'll Learn"
          title="Topics We Cover"
          subtitle="Explore the math concepts you'll master through practice and competition."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {mathTopics.map((topic) => (
            <motion.div
              key={topic.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full",
                    topic.level === "Core Topic"
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
          Topics expand as you advance. Our curriculum grows with you from
          beginner to competition-ready.
        </motion.p>
      </Section>

      {/* Resources Section */}
      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        {/* Centered Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Free Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Mathletes Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to prepare for competition—all free and designed
            for middle schoolers.
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
              // @ts-ignore - CSS custom property
              "--scroll-width": `${resources.length * 324}px`,
            } as React.CSSProperties}
          >
            {/* First set of cards */}
            {resources.map((resource, index) => (
              <div
                key={`first-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-emerald-600" />
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
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-emerald-600" />
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
          <Button href="/resources" size="lg" className="group bg-emerald-600 hover:bg-emerald-700">
            View All Resources
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about getting started with Mathletes."
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
              Coming Fall 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Be a Founding Member of{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              JAMUN Mathletes
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            We're building a program where math is exciting, challenging, and
            fun. Whether you're a student ready to test your skills or a teacher
            looking to start a Mathletes club, join our interest list to be the
            first to know when we launch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/contact" size="lg" className="group bg-emerald-600 hover:bg-emerald-700">
                Join the Interest List
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/programs" variant="outline" size="lg">
                Explore Other Programs
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
            Questions? Reach out to our Mathletes team at{" "}
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
