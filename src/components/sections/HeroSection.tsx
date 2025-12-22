"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-jamun-orange/5 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
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
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full"
            >
              100% Youth-Led Nonprofit
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              JAMUN Makes{" "}
              <span className="text-jamun-blue">Learning Fun!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
            >
              Academic competition programs for grades 5-8. Build public
              speaking, critical thinking, and leadership skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/register" size="lg">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/programs" variant="outline" size="lg">
                Explore Programs
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/conferences/hero-main.webp"
                alt="Students participating in JAMUN conference"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/conferences/hero-secondary.webp"
                alt="Students celebrating achievement"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Stats badge floating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-white rounded-xl shadow-lg px-4 py-3"
            >
              <div className="text-2xl font-bold text-jamun-blue">500+</div>
              <div className="text-sm text-gray-600">Students Impacted</div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-jamun-orange/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-jamun-blue/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-jamun-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-jamun-orange/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
