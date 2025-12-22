"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader, Badge } from "@/components/ui";

const programs = [
  {
    id: "model-un",
    title: "Model United Nations",
    description:
      "Simulate UN committees, represent countries, and debate global issues. Perfect for students interested in international relations, public speaking, and diplomacy.",
    features: ["Beginner-friendly", "Diplomatic skills", "Research & debate"],
    href: "/programs/model-un",
    image: "/images/conferences/model-un.webp",
  },
  {
    id: "mock-trial",
    title: "Mock Trial",
    description:
      "Experience the courtroom firsthand as attorneys and witnesses. Develop argumentation, evidence analysis, and persuasive presentation skills.",
    features: ["Courtroom simulation", "Legal reasoning", "Cross-examination"],
    href: "/programs/mock-trial",
    image: "/images/conferences/mock-trial.webp",
  },
  {
    id: "mathletes",
    title: "Mathletes",
    description:
      "Challenge yourself with competitive mathematics and problem-solving contests. Build analytical thinking and teamwork through math team competitions.",
    features: ["Math competitions", "Problem-solving", "Team challenges"],
    href: "/programs/mathletes",
    image: "/images/conferences/mathletes.webp",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ProgramsSection() {
  return (
    <Section>
      <SectionHeader
        title="Our Programs"
        subtitle="Three Paths to Academic Excellence"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {programs.map((program) => (
          <motion.div key={program.id} variants={itemVariants}>
            <Link href={program.href} className="group block h-full">
              <div className="relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Arrow Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-jamun-blue transition-colors" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {/* Accent line */}
                  <div className="w-12 h-1 bg-jamun-blue mb-4 rounded-full" />

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>

                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-jamun-blue/80 text-white text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center text-white font-medium border border-white/30 rounded-lg px-4 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-jamun-blue">
                    Explore {program.title.split(" ")[0]}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
