"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sections = [
  {
    id: "parents",
    label: "FOR PARENTS",
    title: "Supporting Your Child's Academic Journey",
    description:
      "We know you want the best for your child. Here's how our programs—Model UN, Mock Trial, and Mathletes—help them grow academically, socially, and personally.",
    image: "/images/conferences/gallery-2.webp",
    imagePosition: "right" as const,
    stat: {
      value: "85%",
      label: "of JAMUN alumni say it shaped their future",
    },
    benefits: [
      { number: "01", title: "Confidence Building", description: "Watch your child develop public speaking skills and self-assurance through competition." },
      { number: "02", title: "Critical Thinking", description: "Students learn to analyze complex issues and solve problems creatively." },
      { number: "03", title: "Academic Benefits", description: "Strengthens research, writing, logical reasoning, and analytical skills." },
      { number: "04", title: "Lasting Friendships", description: "Students connect with peers who share their passion for learning." },
      { number: "05", title: "Well-Rounded Growth", description: "Choose from diplomacy, law, or math—or try all three to discover their strengths." },
      { number: "06", title: "College Preparation", description: "Build a standout extracurricular profile with skills universities value." },
    ],
    testimonial: {
      quote: "JAMUN helped my daughter find her voice. She used to be shy about speaking in class, but now she confidently presents to groups of her peers.",
      author: "Parent of 2024 JAMUN Participant",
    },
  },
  {
    id: "educators",
    label: "FOR EDUCATORS",
    title: "Bring Academic Competitions to Your School",
    description:
      "Whether you're experienced or just starting out, we provide the resources and support you need to run Model UN, Mock Trial, or Mathletes programs.",
    image: "/images/conferences/gallery-4.webp",
    imagePosition: "left" as const,
    stat: {
      value: "30+",
      label: "schools partnered with JAMUN",
    },
    benefits: [
      { number: "01", title: "Free Curriculum", description: "Access comprehensive teaching materials for all three programs at no cost." },
      { number: "02", title: "Training Workshops", description: "Professional development for advisors new to academic competitions." },
      { number: "03", title: "Competition Support", description: "Help preparing your students for regional and national events." },
      { number: "04", title: "Student Mentorship", description: "Connect your students with experienced JAMUN competitors and coaches." },
    ],
    testimonial: {
      quote: "The resources JAMUN provides made it easy to start our school's first academic competition club. Our students are thriving.",
      author: "Middle School Teacher",
    },
  },
];

export function GallerySection() {
  return (
    <section className="bg-white">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className={sectionIndex > 0 ? "mt-0" : ""}>
          <div
            className={`grid lg:grid-cols-2 ${
              section.imagePosition === "right" ? "" : ""
            }`}
          >
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative min-h-[400px] lg:min-h-[600px] ${
                section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Stat overlay */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {section.stat.value}
                </div>
                <div className="text-sm md:text-base text-white/90 max-w-[200px]">
                  {section.stat.label}
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`bg-gray-50 p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${
                section.imagePosition === "right" ? "lg:order-2" : "lg:order-1"
              }`}
            >
              {/* Label */}
              <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-4">
                {section.label}
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8">
                {section.description}
              </p>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {section.benefits.slice(0, 6).map((benefit) => (
                  <div key={benefit.number} className="flex gap-4">
                    <span className="text-jamun-blue font-semibold text-sm">
                      {benefit.number}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="border-l-4 border-jamun-blue pl-6 py-2">
                <p className="text-gray-700 italic mb-3">
                  &ldquo;{section.testimonial.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  — {section.testimonial.author}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
