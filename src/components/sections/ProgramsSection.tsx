"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Globe, Scale, Calculator } from "lucide-react";
import { Section, SectionHeader, Badge } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUpLarge, defaultViewport, tapScale } from "@/lib/animations";
import { programColors } from "@/lib/colors";

type BadgeVariant = "primary" | "purple" | "emerald";

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
    colors: programColors.modelUN,
    badgeVariant: "primary" as BadgeVariant,
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
    colors: programColors.mockTrial,
    badgeVariant: "purple" as BadgeVariant,
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
    colors: programColors.mathletes,
    badgeVariant: "emerald" as BadgeVariant,
  },
];

export function ProgramsSection() {
  const t = useTranslations("ProgramsSection");

  return (
    <Section>
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {programs.map((program) => (
          <motion.div
            key={program.id}
            variants={fadeInUpLarge}
            whileTap={tapScale}
          >
            <Link href={program.href} className="group block h-full">
              <div className={cn(
                "relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden",
                "shadow-lg transition-all duration-500",
                "hover:shadow-2xl",
                `group-hover:${program.colors.glow}`
              )}>
                {/* Background Image */}
                <Image
                  src={program.image}
                  alt={t(program.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay - softened for warmer tone */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-black/60 to-black/20 group-hover:from-gray-900/85 transition-all duration-300" />

                {/* Icon Badge - top left */}
                <div className={cn(
                  "absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center",
                  "backdrop-blur-sm transition-all duration-300",
                  "group-hover:scale-110",
                  program.colors.accent
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
                    program.colors.accent
                  )} />

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t(program.titleKey)}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {t(program.descriptionKey)}
                  </p>

                  {/* Feature badges - using Badge component */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.featuresKeys.map((featureKey) => (
                      <Badge
                        key={featureKey}
                        variant={program.badgeVariant}
                        size="sm"
                        className="backdrop-blur-sm bg-white/15 text-white border border-white/20"
                      >
                        {t(featureKey)}
                      </Badge>
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
