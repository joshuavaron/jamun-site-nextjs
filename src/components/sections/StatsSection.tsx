"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { AnimatedNumber } from "@/components/ui";
import { fadeInUp, defaultViewport, hoverScale, smoothTransition } from "@/lib/animations";

// Different durations for each stat to create staggered finish effect
const statDurations = [1400, 1800, 2200, 2600];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

// Map stat labels to translation keys
const statTranslationKeys: Record<string, string> = {
  "Students Impacted": "studentsImpacted",
  "Schools Reached": "schoolsReached",
  "Volunteers": "volunteers",
  "Raised for Programs": "raisedForPrograms",
};

export function StatsSection() {
  const t = useTranslations("StatsSection");

  return (
    <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {siteConfig.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              whileHover={{ ...hoverScale, transition: smoothTransition }}
              className="group relative"
            >
              <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-purple-600/0 group-hover:from-jamun-blue/5 group-hover:to-purple-600/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-purple-400 bg-clip-text text-transparent mb-3">
                    <AnimatedNumber value={stat.value} duration={statDurations[index]} />
                  </div>
                  <div className="text-sm md:text-base text-gray-400 font-medium">
                    {t(statTranslationKeys[stat.label] || stat.label)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
