"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui";

interface Stat {
  value: string;
  label: string;
  /** Set to true to render value as plain text instead of animated number */
  isText?: boolean;
}

interface ProgramStatsSectionProps {
  title: string;
  subtitle: string;
  stats: Stat[];
  /** Duration for each stat animation in ms */
  statDurations?: number[];
  accentColor: {
    /** e.g. "from-purple-600/10 via-transparent to-violet-900/10" */
    bgOverlay: string;
    /** e.g. "bg-purple-600/5" */
    blob1: string;
    /** e.g. "bg-violet-600/5" */
    blob2: string;
    /** e.g. "hover:border-purple-500/50" */
    cardHoverBorder: string;
    /** e.g. "from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5" */
    cardHoverGradient: string;
    /** e.g. "from-purple-400 to-violet-400" */
    numberGradient: string;
  };
}

const defaultDurations = [1400, 1800, 2200, 2600];

export function ProgramStatsSection({
  title,
  subtitle,
  stats,
  statDurations = defaultDurations,
  accentColor,
}: ProgramStatsSectionProps) {
  return (
    <section className="bg-gray-900 py-16 md:py-20 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor.bgOverlay}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className={`relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 ${accentColor.cardHoverBorder} transition-all duration-300 text-center h-full`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentColor.cardHoverGradient} transition-all duration-300`} />
                <div className="relative z-10">
                  <div className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${accentColor.numberGradient} bg-clip-text text-transparent mb-3`}>
                    {stat.isText ? (
                      stat.value
                    ) : (
                      <AnimatedNumber
                        value={stat.value}
                        duration={statDurations[index] ?? 2000}
                      />
                    )}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 font-medium">
                    {stat.label}
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
