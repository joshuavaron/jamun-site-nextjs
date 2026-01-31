"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "outlined" | "flat" | "interactive";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  accent?: string; // Tailwind border-top color class, e.g. "border-t-jamun-blue"
  hover?: boolean; // Legacy support - maps to "interactive" variant behavior
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-white shadow-[var(--shadow-card)] border border-gray-100 rounded-xl",
  elevated:
    "bg-white shadow-[var(--shadow-elevated)] rounded-2xl",
  outlined:
    "bg-transparent border-2 border-gray-200 rounded-xl",
  flat:
    "bg-cream rounded-xl",
  interactive:
    "bg-white shadow-[var(--shadow-card)] border border-gray-100 rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 cursor-pointer",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", accent, hover = false, children, ...props }, ref) => {
    const effectiveVariant = hover && variant === "default" ? "interactive" : variant;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden",
          variantStyles[effectiveVariant],
          accent && `border-t-4 ${accent}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-b border-gray-100", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-t border-gray-100", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardImage = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: "video" | "square" }
>(({ className, aspectRatio = "video", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden bg-gray-100",
      aspectRatio === "video" ? "aspect-video" : "aspect-square",
      className
    )}
    {...props}
  />
));
CardImage.displayName = "CardImage";

export { Card, CardHeader, CardContent, CardFooter, CardImage };
export type { CardVariant, CardProps };
