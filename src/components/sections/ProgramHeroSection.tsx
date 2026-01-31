"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button, TypewriterText } from "@/components/ui";
import type { LucideIcon } from "lucide-react";

interface HeroBadge {
  icon: LucideIcon;
  label: string;
}

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

interface FloatingBadge {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface ProgramHeroSectionProps {
  badge: {
    icon: LucideIcon;
    label: string;
  };
  titlePart1: string;
  titlePart2: string;
  titlePart2CharCount?: number;
  description: string;
  ctaButtons: CTAButton[];
  infoBadges: HeroBadge[];
  image: HeroImage;
  floatingBadge: FloatingBadge;
  /** Tailwind color classes for theming (e.g., "purple", "emerald", "jamun-blue") */
  accentColor: {
    badgeText: string;
    badgeBg: string;
    badgeBorder: string;
    gradientText: string;
    iconColor: string;
    buttonClass?: string;
    bgGradient: string;
    blobFrom1: string;
    blobFrom2: string;
    imageBlob1: string;
    imageBlob2: string;
    floatingBadgeBg: string;
  };
}

export function ProgramHeroSection({
  badge,
  titlePart1,
  titlePart2,
  titlePart2CharCount,
  description,
  ctaButtons,
  infoBadges,
  image,
  floatingBadge,
  accentColor,
}: ProgramHeroSectionProps) {
  const BadgeIcon = badge.icon;
  const FloatingIcon = floatingBadge.icon;

  return (
    <section className={`relative overflow-hidden ${accentColor.bgGradient} min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium ${accentColor.badgeText} ${accentColor.badgeBg} rounded-full border ${accentColor.badgeBorder}`}
            >
              <BadgeIcon className="w-4 h-4" />
              {badge.label}
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              <TypewriterText text={titlePart1} delay={0.3} />
              <TypewriterText
                text={titlePart2}
                delay={0.3 + (titlePart2CharCount ?? titlePart1.length) * 0.03}
                className={accentColor.gradientText}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {ctaButtons.map((btn) => (
                <Button
                  key={btn.href}
                  href={btn.href}
                  variant={btn.variant === "outline" ? "outline" : "primary"}
                  size="lg"
                  className={btn.variant !== "outline" ? `group ${accentColor.buttonClass ?? ""}` : undefined}
                >
                  {btn.label}
                  {btn.variant !== "outline" && (
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              ))}
            </motion.div>

            {/* Quick info badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {infoBadges.map((b) => {
                const Icon = b.icon;
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full"
                  >
                    <Icon className={`w-4 h-4 ${accentColor.iconColor}`} />
                    {b.label}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${accentColor.floatingBadgeBg} flex items-center justify-center`}>
                      <FloatingIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {floatingBadge.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {floatingBadge.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
