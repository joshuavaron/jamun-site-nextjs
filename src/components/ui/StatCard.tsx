"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { fadeInUp, defaultViewport } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  accentColor?: string;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  accentColor = "border-t-jamun-blue",
  className,
}: StatCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={cn(
        "bg-white rounded-xl shadow-[var(--shadow-card)] border border-gray-100 p-6 text-center",
        "transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        "border-t-4",
        accentColor,
        className
      )}
    >
      {Icon && (
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        <AnimatedNumber value={value} />
      </div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </motion.div>
  );
}
