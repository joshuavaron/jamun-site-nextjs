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

// What participants do in Mock Trial
const courtroomActivities = [
  {
    icon: BookOpen,
    title: "Analyze the Case",
    description:
      "Study the case materials, identify key facts and legal issues, and develop your team's theory of the case.",
  },
  {
    icon: FileText,
    title: "Prepare Arguments",
    description:
      "Craft compelling opening statements, closing arguments, and examination questions that tell a persuasive story.",
  },
  {
    icon: MessageSquare,
    title: "Examine Witnesses",
    description:
      "Conduct direct examinations to tell your story and cross-examinations to challenge the opposing side.",
  },
  {
    icon: Gavel,
    title: "Argue Before Judges",
    description:
      "Present your case to real attorneys and judges, responding to objections and adapting in real-time.",
  },
];

// Skills developed through Mock Trial
const skills = [
  {
    icon: MessageSquare,
    title: "Persuasive Speaking",
    description:
      "Learn to present arguments clearly and convince judges with logic and evidence.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Lightbulb,
    title: "Critical Analysis",
    description:
      "Break down complex situations, identify weaknesses in arguments, and think strategically.",
    color: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "Coordinate with teammates to build a cohesive case strategy and support each other.",
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: Target,
    title: "Quick Thinking",
    description:
      "Respond to unexpected objections and adapt your approach on the fly.",
    color: "bg-fuchsia-100",
    iconColor: "text-fuchsia-600",
  },
];

// Trial format sections
const trialFormat = [
  {
    number: "01",
    title: "Opening Statements",
    description:
      "Each side presents their theory of the case and previews the evidence they'll present to the judge.",
  },
  {
    number: "02",
    title: "Witness Examinations",
    description:
      "Attorneys call witnesses for direct examination, then the opposing side cross-examines to challenge their testimony.",
  },
  {
    number: "03",
    title: "Objections & Rulings",
    description:
      "Attorneys object to improper questions or evidence, and must know the rules to protect their case.",
  },
  {
    number: "04",
    title: "Closing Arguments",
    description:
      "Each side summarizes the evidence and makes their final persuasive appeal to the judge or jury.",
  },
];


// Resources for Mock Trial
const resources = [
  {
    icon: File,
    title: "Mock Trial Basics Guide",
    description:
      "An introduction to Mock Trial format, roles, and how competitions work.",
  },
  {
    icon: ClipboardList,
    title: "Objection Cheat Sheet",
    description:
      "Quick reference for common objections and when to use them in trial.",
  },
  {
    icon: ScrollText,
    title: "Opening Statement Template",
    description:
      "A structured template for crafting compelling opening statements.",
  },
  {
    icon: FileText,
    title: "Cross-Examination Techniques",
    description:
      "Learn the art of effective cross-examination with leading questions.",
  },
  {
    icon: BookOpen,
    title: "Rules of Evidence Simplified",
    description:
      "A student-friendly guide to the most important evidence rules.",
  },
  {
    icon: Gavel,
    title: "Closing Argument Framework",
    description:
      "How to structure a powerful closing that brings your case together.",
  },
];

// FAQs
const faqs = [
  {
    question: "Do I need any experience to join Mock Trial?",
    answer:
      "Not at all! Our program is designed specifically for beginners. We'll teach you everything from courtroom basics to advanced examination techniques. Many of our best attorneys started with no prior experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Mock Trial is designed for middle school students in grades 5-8. We create age-appropriate cases and provide training that meets students where they are.",
  },
  {
    question: "When does Mock Trial start?",
    answer:
      "Mock Trial begins in Fall 2026! We're currently building our program and will open registration soon. Join our mailing list to be the first to know when registration opens.",
  },
  {
    question: "What roles can I play?",
    answer:
      "Students can be attorneys (who argue the case) or witnesses (who testify). Most students try both roles during practice, and many discover hidden talents they didn't know they had!",
  },
  {
    question: "How much time does Mock Trial require?",
    answer:
      "Mock Trial involves about 5 hours per week with weekly club meetings and year-round programming. We work with students to balance academics and extracurriculars.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal and offer financial assistance for competition fees. No student should be unable to participate due to cost.",
  },
];

// Stats for Mock Trial (projected for launch)
const mockTrialStats = [
  { value: "Fall 2026", label: "Program Launch" },
  { value: "100%", label: "Beginner Welcome" },
  { value: "6+", label: "Roles to Try" },
  { value: "2", label: "Competitions/Year" },
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

export default function MockTrialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                Mock Trial
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text="Justice Takes the " delay={0.3} />
                <TypewriterText
                  text="Stand"
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
                Experience the drama of the courtroom in our Mock Trial program for
                middle school students (grades 5-8). Learn to craft opening statements,
                conduct cross-examinations, and deliver closing arguments before real
                judges. Develop critical thinking, public speaking, and legal reasoning
                skills that prepare you for high school debate and future success.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="mailto:contact@jamun.org" size="lg" className="group bg-purple-600 hover:bg-purple-700">
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
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  Grades 5-8
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Launching Fall 2026
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  No Experience Needed
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
                  alt="Mock Trial students receiving awards in courtroom"
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
              JAMUN Mock Trial at a Glance
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A brand new program launching Fall 2026—be among the founding members.
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
              About Mock Trial
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              What is{" "}
              <span className="text-purple-600">Mock Trial</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Mock Trial is a competitive simulation where students take on the
              roles of attorneys and witnesses to argue a fictional legal case.
              Teams prepare both prosecution/plaintiff and defense sides,
              learning to craft opening statements, conduct direct and
              cross-examinations, and deliver closing arguments before real
              judges.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              It&apos;s more than just public speaking—it&apos;s critical thinking,
              teamwork, and performance combined. Whether you dream of being a
              lawyer or just want to build confidence, Mock Trial gives you
              skills that last a lifetime.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="mailto:contact@jamun.org" className="group bg-purple-600 hover:bg-purple-700">
                Get Notified at Launch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/mocktrial/resources" variant="outline">
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
                src="/images/conferences/DSC00969.webp"
                alt="Students working on case materials"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent" />

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white">
                  <p className="text-lg font-medium mb-2">
                    &ldquo;Mock Trial pushed me out of my comfort zone. Now I can
                    think on my feet and argue my point confidently.&rdquo;
                  </p>
                  <footer className="text-white/80 text-sm">
                    — Marcus, 8th Grade Attorney
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
          eyebrow="The Courtroom Experience"
          title="What You'll Do in Mock Trial"
          subtitle="From case analysis to closing arguments—here's how you'll make your case in the courtroom."
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
          title="More Than Just Courtroom Drama"
          subtitle="The skills you develop in Mock Trial will serve you in school, career, and life."
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
                &ldquo;I never thought I&apos;d love public speaking, but Mock Trial
                changed that. Now I volunteer to present in class and I&apos;m not
                afraid to speak up for what I believe in.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">AT</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alicia T.</p>
                  <p className="text-sm text-gray-600">
                    7th Grade, First-Time Participant
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
          eyebrow="Competition Format"
          title="How a Trial Works"
          subtitle="From opening statements to the final verdict, here's what to expect in competition."
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
                alt="Award ceremony handshake at Mock Trial"
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
                      Typical Competition
                    </p>
                    <p className="text-sm text-gray-500">1 Full Day</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 2-3 Rounds
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> 6-8 Team Members
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
              Fall 2026 Case
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              State v. Alex Morgan
            </h2>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
              Criminal Case
            </span>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              On March 3, 2025, Briarwood University senior Ethan Morales was found dead in the
              chemistry lab after a toxic gas release. His lab partner, Alex Morgan, had left
              the room minutes before the alarms sounded. Was this a tragic accident—or
              calculated murder?
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Teams will argue both sides of this gripping case, examining security footage,
              mislabeled chemicals, missing notebook pages, and the heated rivalry between
              two competitive research partners fighting for academic credit.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">6 Witnesses</p>
                  <p className="text-sm text-gray-500">Per side</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">12 Exhibits</p>
                  <p className="text-sm text-gray-500">Evidence items</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="mailto:contact@jamun.org" className="group bg-purple-600 hover:bg-purple-700">
                Get Case Materials
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
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Case No. 2026-MT-001</p>
                    <p className="font-semibold text-gray-900">Briarwood County Superior Court</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Charge</p>
                    <p className="font-medium text-gray-900">Murder in the First Degree</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Defendant</p>
                    <p className="font-medium text-gray-900">Alex Morgan, 22</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Victim</p>
                    <p className="font-medium text-gray-900">Ethan Morales, 22</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Key Issues</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        Sabotage vs. Accident
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        Motive & Rivalry
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        Physical Evidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative stamp */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center rotate-12">
                <div className="w-20 h-20 border-4 border-dashed border-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs text-center leading-tight">FALL<br/>2026</span>
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
            Free Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Mock Trial Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to prepare for Mock Trial—all free and designed
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
          subtitle="Everything you need to know about getting started with Mock Trial."
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
              Coming Fall 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Be a Founding Member of{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              JAMUN Mock Trial
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            We&apos;re building something special. Whether you&apos;re a student ready to
            argue cases in the courtroom or a teacher looking to start a Mock
            Trial program, join our interest list to be the first to know when
            we launch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" size="lg" className="group bg-purple-600 hover:bg-purple-700">
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
            Questions? Reach out to our Mock Trial team at{" "}
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
