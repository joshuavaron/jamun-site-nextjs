"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
    titleKey: "skill1Title" as const,
    descriptionKey: "skill1Description" as const,
    color: "bg-jamun-blue",
    lightColor: "bg-jamun-blue/10",
  },
  {
    icon: Brain,
    titleKey: "skill2Title" as const,
    descriptionKey: "skill2Description" as const,
    color: "bg-purple-600",
    lightColor: "bg-purple-100",
  },
  {
    icon: MessageSquare,
    titleKey: "skill3Title" as const,
    descriptionKey: "skill3Description" as const,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-100",
  },
  {
    icon: BookOpen,
    titleKey: "skill4Title" as const,
    descriptionKey: "skill4Description" as const,
    color: "bg-amber-600",
    lightColor: "bg-amber-100",
  },
  {
    icon: Users,
    titleKey: "skill5Title" as const,
    descriptionKey: "skill5Description" as const,
    color: "bg-rose-600",
    lightColor: "bg-rose-100",
  },
  {
    icon: Lightbulb,
    titleKey: "skill6Title" as const,
    descriptionKey: "skill6Description" as const,
    color: "bg-indigo-600",
    lightColor: "bg-indigo-100",
  },
  {
    icon: Target,
    titleKey: "skill7Title" as const,
    descriptionKey: "skill7Description" as const,
    color: "bg-teal-600",
    lightColor: "bg-teal-100",
  },
  {
    icon: Trophy,
    titleKey: "skill8Title" as const,
    descriptionKey: "skill8Description" as const,
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
  const t = useTranslations("SkillsSection");

  return (
    <Section background="gray" className="py-16 md:py-20 lg:py-24">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
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
            key={skill.titleKey}
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
              {t(skill.titleKey)}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t(skill.descriptionKey)}
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
          {t("seoTitle")}
        </h3>
        <div className="max-w-4xl mx-auto text-gray-600 space-y-4 text-center">
          <p>{t("seoParagraph1")}</p>
          <p>{t("seoParagraph2")}</p>
        </div>
      </motion.div>
    </Section>
  );
}
