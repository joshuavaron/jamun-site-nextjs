"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
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
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
          {/* Decorative gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/20 via-purple-500/20 to-jamun-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-white m-[1px] rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Image side */}
              <div className="relative md:col-span-2 h-64 md:h-auto overflow-hidden">
                <Image
                  src="/images/conferences/testimonial.webp"
                  alt="Teachers at JAMUN conference"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-t md:from-transparent md:to-black/20" />

                {/* Floating rating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-jamun-orange text-jamun-orange" />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quote side */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center relative">
                {/* Decorative background quote */}
                <div className="absolute top-4 right-4 text-[120px] font-serif text-gray-100 leading-none select-none">
                  &ldquo;
                </div>

                {/* Quote icon with gradient */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jamun-blue to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-jamun-blue/20">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Quote text */}
                <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                  &ldquo;This was something they were passionate about, and they
                  put in an extraordinary amount of time and care into putting
                  together a learning experience our students will{" "}
                  <span className="text-jamun-blue font-semibold">not forget</span>.&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jamun-blue to-purple-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">KM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Mr. Komie and Ms. Mastin
                    </p>
                    <p className="text-gray-500 text-sm">
                      Middle School Social Studies Teachers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
