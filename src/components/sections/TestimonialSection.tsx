"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Section } from "@/components/ui";

export function TestimonialSection() {
  return (
    <Section background="gray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Image side */}
            <div className="relative md:col-span-2 h-64 md:h-auto">
              <Image
                src="/images/conferences/testimonial.webp"
                alt="Teachers at JAMUN conference"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-t md:from-transparent md:to-black/20" />
            </div>

            {/* Quote side */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-jamun-blue/20 mb-6" />

              {/* Quote text */}
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic leading-relaxed mb-8">
                &ldquo;This was something they were passionate about, and they
                put in an extraordinary amount of time and care into putting
                together a learning experience our students will not
                forget.&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jamun-blue/10 flex items-center justify-center">
                  <span className="text-jamun-blue font-bold text-lg">KM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Mr. Komie and Ms. Mastin
                  </p>
                  <p className="text-gray-600 text-sm">
                    Middle School Social Studies Teachers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
