"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionHeader, Card } from "@/components/ui";
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
import { staggerContainerFast, fadeInUp, defaultViewport } from "@/lib/animations";

const skills = [
  {
    icon: Mic,
    titleKey: "skill1Title" as const,
    descriptionKey: "skill1Description" as const,
    iconColor: "text-jamun-blue",
    bgColor: "bg-jamun-blue/10",
  },
  {
    icon: Brain,
    titleKey: "skill2Title" as const,
    descriptionKey: "skill2Description" as const,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: MessageSquare,
    titleKey: "skill3Title" as const,
    descriptionKey: "skill3Description" as const,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: BookOpen,
    titleKey: "skill4Title" as const,
    descriptionKey: "skill4Description" as const,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Users,
    titleKey: "skill5Title" as const,
    descriptionKey: "skill5Description" as const,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    icon: Lightbulb,
    titleKey: "skill6Title" as const,
    descriptionKey: "skill6Description" as const,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    icon: Target,
    titleKey: "skill7Title" as const,
    descriptionKey: "skill7Description" as const,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    icon: Trophy,
    titleKey: "skill8Title" as const,
    descriptionKey: "skill8Description" as const,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export function SkillsSection() {
  const t = useTranslations("SkillsSection");

  return (
    <Section background="cream" pattern="dots" className="py-16 md:py-20 lg:py-24">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.titleKey}
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              variant="flat"
              className="h-full p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  skill.bgColor
                )}
              >
                <skill.icon className={cn("w-6 h-6", skill.iconColor)} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(skill.titleKey)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(skill.descriptionKey)}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* SEO-rich content block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mt-12"
      >
        <Card variant="default" className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            {t("seoTitle")}
          </h3>
          <div className="max-w-4xl mx-auto text-gray-600 space-y-4 text-center">
            <p>{t("seoParagraph1")}</p>
            <p>{t("seoParagraph2")}</p>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
