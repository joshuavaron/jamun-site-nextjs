"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProgramFeaturesSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: Feature[];
  /** Label factory for step badges, receives 1-based index. e.g. (n) => `Step ${n}` */
  stepLabel?: (index: number) => string;
  /** Number of grid columns at lg breakpoint: 3 or 4 (default 4) */
  columns?: 3 | 4;
  background?: "white" | "gray";
  accentColor: {
    /** e.g. "bg-purple-100" */
    iconBg: string;
    /** e.g. "text-purple-600" */
    iconText: string;
    /** e.g. "text-purple-600" */
    badgeText: string;
    /** e.g. "bg-purple-100" */
    badgeBg: string;
  };
}

export function ProgramFeaturesSection({
  eyebrow,
  title,
  subtitle,
  features,
  stepLabel,
  columns = 4,
  background = "gray",
  accentColor,
}: ProgramFeaturesSectionProps) {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <Section background={background} className="py-16 md:py-20">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`grid md:grid-cols-2 ${gridCols} gap-6`}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${accentColor.iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`w-7 h-7 ${accentColor.iconText}`} />
              </div>
              {stepLabel && (
                <div className={`inline-block px-3 py-1 mb-3 text-xs font-semibold ${accentColor.badgeText} ${accentColor.badgeBg} rounded-full`}>
                  {stepLabel(index + 1)}
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
