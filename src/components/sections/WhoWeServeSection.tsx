"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import Link from "next/link";
import { cn } from "@/lib/utils";

const audiences = [
  {
    icon: GraduationCap,
    title: "For Students (Grades 5-8)",
    description:
      "Whether you're a first-time competitor or experienced delegate, our beginner-friendly programs help you develop public speaking, critical thinking, and teamwork skills through Model UN conferences, Mock Trial competitions, and Mathletes challenges.",
    cta: "Register Now",
    href: "/register",
    iconBg: "bg-jamun-blue",
    accentColor: "text-jamun-blue",
    hoverGlow: "group-hover:shadow-jamun-blue/20",
  },
  {
    icon: Users,
    title: "For Parents",
    description:
      "Looking for meaningful extracurricular activities that build skills for college and beyond? JAMUN offers free and low-cost academic enrichment programs that develop leadership, communication, and analytical thinking in a supportive environment.",
    cta: "Learn About Our Programs",
    href: "/programs",
    iconBg: "bg-purple-600",
    accentColor: "text-purple-600",
    hoverGlow: "group-hover:shadow-purple-500/20",
  },
  {
    icon: BookOpen,
    title: "For Teachers & Schools",
    description:
      "Bring Model UN, Mock Trial, or Mathletes to your school with our free resources and curriculum guides. We provide training materials, competition prep, and ongoing support to help educators build successful programs.",
    cta: "Access Free Resources",
    href: "/resources",
    iconBg: "bg-emerald-600",
    accentColor: "text-emerald-600",
    hoverGlow: "group-hover:shadow-emerald-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function WhoWeServeSection() {
  return (
    <Section background="gray">
      <SectionHeader
        eyebrow="WHO WE SERVE"
        title="Programs for Students, Parents & Educators"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {audiences.map((audience) => (
          <motion.div
            key={audience.title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <div className={cn(
              "h-full flex flex-col bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100",
              "transition-all duration-300",
              "hover:shadow-xl",
              audience.hoverGlow
            )}>
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                "transition-transform duration-300 group-hover:scale-110",
                audience.iconBg
              )}>
                <audience.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {audience.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                {audience.description}
              </p>
              <Link
                href={audience.href}
                className={cn(
                  "inline-flex items-center font-semibold transition-all duration-200",
                  audience.accentColor,
                  "group/link"
                )}
              >
                {audience.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
