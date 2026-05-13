import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { fontBody, bodySize } from "@/lib/typography";

// The centered intro block that sits at the top of a content section:
//   serif heading (large) → optional lead paragraph.
// The heading uses the `section` size variant by default. Pass a different
// `headingSize` if the section calls for a tighter scale.

interface SectionIntroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Children render below the subtitle (e.g. a row of CTAs). */
  children?: ReactNode;
  /** Max width of the text block. Defaults to `3xl` (~48rem). */
  maxWidth?: "2xl" | "3xl" | "4xl";
  /** Bottom margin preset. */
  spacing?: "tight" | "default" | "loose";
  className?: string;
}

const widthClass = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
} as const;

const spacingClass = {
  tight: "mb-10 md:mb-12",
  default: "mb-12 md:mb-16",
  loose: "mb-14 md:mb-20",
} as const;

export function SectionIntro({
  title,
  subtitle,
  children,
  maxWidth = "3xl",
  spacing = "default",
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("text-center mx-auto", widthClass[maxWidth], spacingClass[spacing], className)}>
      <Heading size="section">{title}</Heading>
      {subtitle && (
        <p style={fontBody} className={cn("mt-5", bodySize.lead)}>
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
