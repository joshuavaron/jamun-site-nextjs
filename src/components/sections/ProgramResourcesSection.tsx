"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import type { LucideIcon } from "lucide-react";

interface Resource {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProgramResourcesSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  resources: Resource[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: {
    /** e.g. "text-purple-600" */
    eyebrowColor: string;
    /** e.g. "bg-purple-100" */
    iconBg: string;
    /** e.g. "text-purple-600" */
    iconText: string;
    /** e.g. "bg-purple-600 hover:bg-purple-700" */
    buttonClass?: string;
  };
}

export function ProgramResourcesSection({
  eyebrow,
  title,
  subtitle,
  resources,
  ctaLabel,
  ctaHref,
  accentColor,
}: ProgramResourcesSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
      {/* Centered Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <span className={`${accentColor.eyebrowColor} font-semibold text-sm tracking-widest uppercase mb-3 block`}>
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex hover:[animation-play-state:paused]"
          style={{
            animation: "scroll 20s linear infinite",
            "--scroll-width": `${resources.length * 324}px`,
          } as React.CSSProperties}
        >
          {/* First set of cards */}
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={`first-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${accentColor.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${accentColor.iconText}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            );
          })}
          {/* Duplicate set for seamless infinite scroll */}
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={`second-${resource.title}-${index}`}
                className="flex-shrink-0 w-[300px] mx-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${accentColor.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${accentColor.iconText}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mt-10"
      >
        <Button
          href={ctaHref}
          size="lg"
          className={`group ${accentColor.buttonClass ?? ""}`}
        >
          {ctaLabel}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </section>
  );
}
