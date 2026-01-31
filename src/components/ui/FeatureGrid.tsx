"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBg?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  items,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      className={cn("grid gap-6", columnStyles[columns], className)}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="bg-cream rounded-xl p-6 transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 group"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110",
                item.iconBg || "bg-jamun-blue/10"
              )}
            >
              <Icon className={cn("w-6 h-6", item.iconColor || "text-jamun-blue")} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
