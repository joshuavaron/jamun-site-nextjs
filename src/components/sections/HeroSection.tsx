"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, Badge, TypewriterText, DotPattern, CircleCluster } from "@/components/ui";
import { ArrowRight, Users } from "lucide-react";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("HeroSection");
  return (
    <section className="relative overflow-hidden bg-cream min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center">
      {/* Dot pattern covering the right half */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 text-gray-900/[0.03] pointer-events-none" aria-hidden="true">
        <DotPattern />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Badge variant="subtle" dot size="lg" icon={Users}>
                {t("badge")}
              </Badge>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-6">
              <TypewriterText text={t("title")} delay={0.3} />
              <span className="relative">
                <TypewriterText
                  text={t("titleHighlight")}
                  delay={0.3 + t("title").length * 0.03}
                  className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/register" size="lg" iconRight={ArrowRight}>
                {t("primaryCTA")}
              </Button>
              <Button href="/programs" variant="outline" size="lg">
                {t("secondaryCTA")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            className="relative"
          >
            {/* Circle cluster decoration behind image */}
            <CircleCluster className="w-72 h-72 -top-10 -right-10 -z-10" />

            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/conferences/DSC01722.webp"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
