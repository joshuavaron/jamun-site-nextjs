"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
          hover &&
            "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
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
