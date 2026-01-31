"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, defaultViewport } from "@/lib/animations";

interface CardGridProps {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
}

const columnStyles = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapStyles = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function CardGrid({
  columns = 3,
  gap = "md",
  stagger = true,
  className,
  children,
}: CardGridProps) {
  const gridClassName = cn(
    "grid",
    columnStyles[columns],
    gapStyles[gap],
    className
  );

  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className={gridClassName}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={gridClassName}>{children}</div>;
}
