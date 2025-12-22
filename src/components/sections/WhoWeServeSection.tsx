"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import { Section, SectionHeader, Card, CardContent, Button } from "@/components/ui";

const audiences = [
  {
    icon: GraduationCap,
    title: "For Students (Grades 5-8)",
    description:
      "Whether you're a first-time competitor or experienced delegate, our beginner-friendly programs help you develop public speaking, critical thinking, and teamwork skills through Model UN conferences, Mock Trial competitions, and Mathletes challenges.",
    cta: "Register Now",
    href: "/register",
  },
  {
    icon: Users,
    title: "For Parents",
    description:
      "Looking for meaningful extracurricular activities that build skills for college and beyond? JAMUN offers free and low-cost academic enrichment programs that develop leadership, communication, and analytical thinking in a supportive environment.",
    cta: "Learn About Our Programs",
    href: "/programs",
  },
  {
    icon: BookOpen,
    title: "For Teachers & Schools",
    description:
      "Bring Model UN, Mock Trial, or Mathletes to your school with our free resources and curriculum guides. We provide training materials, competition prep, and ongoing support to help educators build successful programs.",
    cta: "Access Free Resources",
    href: "/resources",
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
        title="Who We Serve"
        subtitle="Programs for Students, Parents & Educators"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {audiences.map((audience) => (
          <motion.div key={audience.title} variants={itemVariants}>
            <Card hover className="h-full flex flex-col">
              <CardContent className="flex flex-col flex-grow p-6 lg:p-8">
                <div className="w-14 h-14 bg-jamun-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <audience.icon className="w-7 h-7 text-jamun-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {audience.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {audience.description}
                </p>
                <Button href={audience.href} variant="ghost" className="justify-start p-0 h-auto text-jamun-blue hover:text-jamun-blue-dark hover:bg-transparent group">
                  {audience.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
