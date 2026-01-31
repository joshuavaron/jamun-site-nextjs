"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fadeInUp, defaultViewport } from "@/lib/animations";

interface ImageContentBlockProps {
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  decoration?: "dots" | "circles" | "none";
  accentColor?: string;
  className?: string;
  children: React.ReactNode;
}

export function ImageContentBlock({
  image,
  imageAlt,
  imageSide = "left",
  decoration = "none",
  accentColor = "#397bce",
  className,
  children,
}: ImageContentBlockProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className={cn(
        "flex flex-col gap-8 lg:gap-16 items-center",
        imageSide === "right" ? "lg:flex-row-reverse" : "lg:flex-row",
        className
      )}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          {/* Decorative pattern */}
          {decoration === "dots" && (
            <div
              className={cn(
                "absolute -z-10 w-full h-full text-gray-900/[0.04] pointer-events-none",
                imageSide === "right" ? "-right-4 -bottom-4" : "-left-4 -bottom-4"
              )}
              aria-hidden="true"
            >
              <svg className="w-full h-full">
                <defs>
                  <pattern id={`img-dots-${imageSide}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#img-dots-${imageSide})`} rx="12" />
              </svg>
            </div>
          )}
          {decoration === "circles" && (
            <svg
              className={cn(
                "absolute -z-10 w-48 h-48 pointer-events-none",
                imageSide === "right" ? "-right-8 -top-8" : "-left-8 -top-8"
              )}
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="80" cy="80" r="60" stroke={accentColor} strokeWidth="1" opacity="0.15" />
              <circle cx="120" cy="70" r="45" stroke={accentColor} strokeWidth="1" opacity="0.12" />
              <circle cx="100" cy="120" r="50" stroke={accentColor} strokeWidth="1" opacity="0.10" />
            </svg>
          )}

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2">
        {children}
      </div>
    </motion.div>
  );
}
