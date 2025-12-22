"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui";

const features = [
  {
    subtitle: "ENGAGING CONTENT",
    title: "Interactive Extracurricular Experiences",
    description:
      "Access expertly curated material for Model UN, Mock Trial, and Mathletes. Our modules are designed to be engaging, practical, and highly effective for competition prep.",
    bullets: [
      "Expert-designed curriculum",
      "Practice scenarios & simulations",
      "Progress tracking dashboards",
    ],
    image: "/images/conferences/engaging-content.webp",
    imagePosition: "left",
  },
  {
    subtitle: "COMPETE & GROW",
    title: "Real-Time Leaderboards",
    description:
      "Compete with peers globally! Our dynamic leaderboards track progress across multiple subjects and competitions, offering recognition for top performers.",
    bullets: [
      "Global & local rankings",
      "Achievement badges & rewards",
      "Weekly competition cycles",
    ],
    image: "/images/conferences/leaderboards.webp",
    imagePosition: "right",
  },
  {
    subtitle: "START TODAY",
    title: "No Experience Required",
    description:
      "It doesn't matter whether this is your first tournament or your hundredth! Our library of prep materials will make sure you are ready to compete at your best.",
    bullets: [
      "Beginner-friendly tutorials",
      "Step-by-step learning paths",
      "Mentor support available",
    ],
    image: "/images/conferences/no-experience.webp",
    imagePosition: "left",
  },
];

export function WhyChooseSection() {
  return (
    <Section background="white">
      <SectionHeader
        title="Why Choose JAMUN"
        subtitle="Everything You Need to Excel"
      />

      <div className="space-y-24 lg:space-y-32">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`flex flex-col gap-8 lg:gap-16 items-center ${
              feature.imagePosition === "right"
                ? "lg:flex-row-reverse"
                : "lg:flex-row"
            }`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Decorative background blob */}
                <div
                  className={`absolute -z-10 w-full h-full rounded-3xl bg-jamun-blue/5 ${
                    feature.imagePosition === "right"
                      ? "-right-4 -bottom-4"
                      : "-left-4 -bottom-4"
                  }`}
                />
                {/* Decorative accent circle */}
                <div
                  className={`absolute -z-10 w-24 h-24 rounded-full bg-jamun-blue/10 ${
                    feature.imagePosition === "right"
                      ? "-right-6 top-1/4"
                      : "-left-6 top-1/4"
                  }`}
                />

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              {/* Subtitle badge */}
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-jamun-blue bg-jamun-blue/10 rounded-full uppercase">
                {feature.subtitle}
              </span>

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {feature.description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-4">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-6 h-6 rounded-full bg-jamun-blue/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-jamun-blue" />
                    </div>
                    <span className="font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
