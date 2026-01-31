"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, School, HandHeart, DollarSign } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section, SectionHeader, StatCard } from "@/components/ui";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";

// Map stat labels to translation keys
const statTranslationKeys: Record<string, string> = {
  "Students Impacted": "studentsImpacted",
  "Schools Reached": "schoolsReached",
  Volunteers: "volunteers",
  "Raised for Programs": "raisedForPrograms",
};

// Icons and accent colors for each stat card
const statIcons = [Users, School, HandHeart, DollarSign];
const statAccentColors = [
  "border-t-jamun-blue",
  "border-t-purple-600",
  "border-t-emerald-500",
  "border-t-amber-500",
];

export function StatsSection() {
  const t = useTranslations("StatsSection");

  return (
    <Section background="cream" pattern="grid">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
      >
        <SectionHeader
          eyebrow={t("title")}
          title={t("subtitle")}
          align="center"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {siteConfig.stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={t(statTranslationKeys[stat.label] || stat.label)}
            icon={statIcons[index]}
            accentColor={statAccentColors[index]}
          />
        ))}
      </motion.div>
    </Section>
  );
}
