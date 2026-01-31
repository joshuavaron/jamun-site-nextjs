"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface TimelineItem {
  year?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  accentColor?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      className={cn("relative", className)}
    >
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative pl-12"
            >
              {/* Node on the line */}
              <div
                className={cn(
                  "absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center",
                  item.accentColor || "bg-jamun-blue"
                )}
              >
                {Icon && <Icon className="w-2.5 h-2.5 text-white" />}
              </div>

              <div>
                {item.year && (
                  <span className="text-sm font-semibold text-jamun-blue mb-1 block">
                    {item.year}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
