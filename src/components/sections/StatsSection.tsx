"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract the numeric part
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const suffix = value.slice(
      value.indexOf(numericMatch[0]) + numericMatch[0].length
    );

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(targetNumber * easeOutQuart);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsSection() {
  return (
    <section className="bg-jamun-blue py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Empowering Young Leaders Nationwide
          </h2>
          <p className="text-jamun-blue-light text-lg">
            JAMUN is a 100% volunteer-run nonprofit making academic competitions
            accessible to middle school students across the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-sm md:text-base text-jamun-blue-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
