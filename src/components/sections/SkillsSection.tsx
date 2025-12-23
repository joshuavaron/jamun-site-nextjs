"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui";
import {
  Mic,
  Brain,
  Users,
  Lightbulb,
  BookOpen,
  Trophy,
  Target,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  {
    icon: Mic,
    title: "Public Speaking & Presentation",
    description:
      "Develop confidence speaking in front of audiences through Model UN speeches, Mock Trial arguments, and team presentations. Students learn to articulate ideas clearly and persuasively.",
    color: "bg-jamun-blue",
    lightColor: "bg-jamun-blue/10",
  },
  {
    icon: Brain,
    title: "Critical Thinking & Analysis",
    description:
      "Learn to analyze complex problems, evaluate evidence, and form logical arguments. These skills transfer directly to academic success and standardized test performance.",
    color: "bg-purple-600",
    lightColor: "bg-purple-100",
  },
  {
    icon: MessageSquare,
    title: "Debate & Persuasion",
    description:
      "Master the art of constructing compelling arguments, responding to counterpoints, and persuading audiences. Essential skills for Mock Trial advocacy and Model UN diplomacy.",
    color: "bg-emerald-600",
    lightColor: "bg-emerald-100",
  },
  {
    icon: BookOpen,
    title: "Research & Writing",
    description:
      "Develop strong research skills writing Model UN position papers, case briefs, and analytical reports. Learn to find credible sources and synthesize information effectively.",
    color: "bg-amber-600",
    lightColor: "bg-amber-100",
  },
  {
    icon: Users,
    title: "Teamwork & Collaboration",
    description:
      "Work with peers to draft resolutions, prepare Mock Trial cases, and solve math problems as a team. Learn to leverage diverse perspectives and build consensus.",
    color: "bg-rose-600",
    lightColor: "bg-rose-100",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "Tackle challenging problems in Mathletes competitions, negotiate diplomatic solutions in Model UN, and develop case strategies in Mock Trial. Build creative problem-solving abilities.",
    color: "bg-indigo-600",
    lightColor: "bg-indigo-100",
  },
  {
    icon: Target,
    title: "Leadership & Initiative",
    description:
      "Take leadership roles as committee chairs, team captains, and bloc leaders. Students develop the confidence to guide others and drive collaborative outcomes.",
    color: "bg-teal-600",
    lightColor: "bg-teal-100",
  },
  {
    icon: Trophy,
    title: "Competitive Excellence",
    description:
      "Prepare for MATHCOUNTS, AMC 8, regional Mock Trial competitions, and Model UN conferences. Build a track record of achievement for high school and college applications.",
    color: "bg-orange-600",
    lightColor: "bg-orange-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SkillsSection() {
  return (
    <Section background="gray" className="py-16 md:py-20 lg:py-24">
      <SectionHeader
        eyebrow="SKILLS FOR SUCCESS"
        title="Essential Skills for Academic & Career Success"
        subtitle="JAMUN's academic competition programs develop the critical skills that colleges, employers, and magnet schools look for. Students who participate in Model UN, Mock Trial, and Mathletes consistently outperform their peers."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.title}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                skill.lightColor
              )}
            >
              <skill.icon
                className={cn("w-6 h-6", skill.color.replace("bg-", "text-"))}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {skill.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* SEO-rich content block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 bg-gradient-to-r from-jamun-blue/5 via-purple-50 to-jamun-blue/5 rounded-2xl p-8 border border-jamun-blue/10"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Why Academic Competitions Matter for Middle School Students
        </h3>
        <div className="max-w-4xl mx-auto text-gray-600 space-y-4 text-center">
          <p>
            Research shows that students who participate in academic competitions like Model UN,
            Mock Trial, and math leagues demonstrate stronger performance on standardized tests,
            higher GPAs, and better college admission rates. These extracurricular activities develop
            essential 21st-century skills that can&apos;t be taught in traditional classrooms alone.
          </p>
          <p>
            Starting in middle school (grades 5-8) gives students a significant advantage.
            They build foundational skills in public speaking, debate, and critical thinking
            that compound over time, making them more competitive for magnet school programs,
            high school honors tracks, and eventually college admissions.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
