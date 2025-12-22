"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    accentColor: "purple",
    labelColor: "text-purple-600",
    borderColor: "border-purple-600",
    numberColor: "text-purple-600",
    statGradient: "from-purple-600 to-jamun-blue",
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
    accentColor: "emerald",
    labelColor: "text-emerald-600",
    borderColor: "border-emerald-600",
    numberColor: "text-emerald-600",
    statGradient: "from-emerald-500 to-teal-600",
  },
];

export function GallerySection() {
  return (
    <section className="bg-white">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className={sectionIndex > 0 ? "mt-0" : ""}>
          <div className="grid lg:grid-cols-2">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={cn(
                "relative min-h-[400px] lg:min-h-[600px] overflow-hidden group",
                section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"
              )}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Stat overlay with gradient background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 text-white"
              >
                <div className={cn(
                  "text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                  section.statGradient
                )}>
                  {section.stat.value}
                </div>
                <div className="text-sm md:text-base text-white/90 max-w-[200px]">
                  {section.stat.label}
                </div>
              </motion.div>

              {/* Decorative corner accent */}
              <div className={cn(
                "absolute top-0 w-24 h-24 opacity-30",
                section.imagePosition === "right" ? "right-0" : "left-0"
              )}>
                <div className={cn(
                  "absolute w-full h-full bg-gradient-to-br",
                  section.imagePosition === "right"
                    ? "from-transparent to-purple-500/50 rounded-bl-full"
                    : "from-transparent to-emerald-500/50 rounded-br-full"
                )} />
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "right" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "bg-gray-50 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative",
                section.imagePosition === "right" ? "lg:order-2" : "lg:order-1"
              )}
            >
              {/* Label */}
              <span className={cn(
                "font-semibold text-sm tracking-widest uppercase mb-4",
                section.labelColor
              )}>
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
                {section.benefits.slice(0, 6).map((benefit, index) => (
                  <motion.div
                    key={benefit.number}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 group/benefit"
                  >
                    <span className={cn(
                      "font-bold text-sm transition-transform group-hover/benefit:scale-110",
                      section.numberColor
                    )}>
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
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className={cn(
                  "border-l-4 pl-6 py-2 bg-white rounded-r-lg shadow-sm",
                  section.borderColor
                )}
              >
                <p className="text-gray-700 italic mb-3">
                  &ldquo;{section.testimonial.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  — {section.testimonial.author}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
