"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Globe, Scale, Calculator } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const programs = [
  {
    id: "model-un",
    titleKey: "modelUNTitle" as const,
    descriptionKey: "modelUNDescription" as const,
    featuresKeys: ["modelUNFeature1", "modelUNFeature2", "modelUNFeature3"] as const,
    exploreKey: "exploreModelUN" as const,
    href: "/modelun",
    image: "/images/conferences/DSC00848.webp",
    icon: Globe,
    accentColor: "bg-jamun-blue",
    badgeColor: "bg-jamun-blue/80",
    glowColor: "group-hover:shadow-jamun-blue/30",
  },
  {
    id: "mock-trial",
    titleKey: "mockTrialTitle" as const,
    descriptionKey: "mockTrialDescription" as const,
    featuresKeys: ["mockTrialFeature1", "mockTrialFeature2", "mockTrialFeature3"] as const,
    exploreKey: "exploreMockTrial" as const,
    href: "/mocktrial",
    image: "/images/conferences/DSC02128.webp",
    icon: Scale,
    accentColor: "bg-purple-600",
    badgeColor: "bg-purple-600/80",
    glowColor: "group-hover:shadow-purple-500/30",
  },
  {
    id: "mathletes",
    titleKey: "mathletesTitle" as const,
    descriptionKey: "mathletesDescription" as const,
    featuresKeys: ["mathletesFeature1", "mathletesFeature2", "mathletesFeature3"] as const,
    exploreKey: "exploreMathletes" as const,
    href: "/mathletes",
    image: "/images/conferences/homebackground2.webp",
    icon: Calculator,
    accentColor: "bg-emerald-600",
    badgeColor: "bg-emerald-600/80",
    glowColor: "group-hover:shadow-emerald-500/30",
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
  const t = useTranslations("ProgramsSection");

  return (
    <Section>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
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
              <div className={cn(
                "relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden",
                "shadow-lg transition-all duration-500",
                "hover:shadow-2xl",
                program.glowColor
              )}>
                {/* Background Image */}
                <Image
                  src={program.image}
                  alt={t(program.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay - enhanced for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-black/90 transition-all duration-300" />

                {/* Icon Badge - top left */}
                <div className={cn(
                  "absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center",
                  "backdrop-blur-sm transition-all duration-300",
                  "group-hover:scale-110",
                  program.accentColor
                )}>
                  <program.icon className="w-6 h-6 text-white" />
                </div>

                {/* Arrow Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-gray-900 transition-colors" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {/* Accent line - colored per program */}
                  <div className={cn(
                    "w-12 h-1 mb-4 rounded-full transition-all duration-300",
                    "group-hover:w-20",
                    program.accentColor
                  )} />

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t(program.titleKey)}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {t(program.descriptionKey)}
                  </p>

                  {/* Feature badges - colored per program */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.featuresKeys.map((featureKey) => (
                      <span
                        key={featureKey}
                        className={cn(
                          "px-3 py-1 text-white text-xs font-medium rounded-full",
                          "transition-transform duration-200 hover:scale-105",
                          program.badgeColor
                        )}
                      >
                        {t(featureKey)}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center text-white font-medium border border-white/30 rounded-lg px-4 py-2 transition-all duration-300 group-hover:bg-white group-hover:text-gray-900 group-hover:border-white">
                    {t(program.exploreKey)}
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
