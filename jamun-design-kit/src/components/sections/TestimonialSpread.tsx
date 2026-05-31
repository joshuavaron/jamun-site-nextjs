"use client";

import type { ReactNode } from "react";
import { DiagonalSpread } from "./DiagonalSpread";
import { Heading } from "@/components/ui/Heading";
import { fontBody, fontSerif } from "@/lib/typography";
import { cn } from "@/lib/utils";

// A full-bleed colored panel with a themed pull-quote, paired with a photo.
// The "themed proof spreads" (blue / purple / emerald) all share this shape:
// a serif H3 lead-in, a blockquote, and a small attribution. Inputs are
// content-only — the layout, clip-free photo, and scroll animation are
// handled inside. Prefer this over rebuilding a quote-against-color by hand.

interface TestimonialSpreadProps {
  /** Hex color for the panel background. */
  bg: string;
  /** Photo side (which column the photo occupies). */
  photoSide: "left" | "right";
  photoSrc: string;
  photoAlt: string;
  /** Serif H3 lead-in displayed above the quote. */
  heading: ReactNode;
  /** The quote text. Quote marks are added by the component. */
  quote: ReactNode;
  /** Attribution line (e.g. "— A parent of a delegate"). */
  attribution: ReactNode;
  /** Override the spread's min-height. */
  minHeight?: string;
}

export function TestimonialSpread({
  bg,
  photoSide,
  photoSrc,
  photoAlt,
  heading,
  quote,
  attribution,
  minHeight = "min-h-[55svh]",
}: TestimonialSpreadProps) {
  return (
    <DiagonalSpread
      photoSide={photoSide}
      photoSrc={photoSrc}
      photoAlt={photoAlt}
      clip="none"
      panelBg={bg}
      panelText="#ffffff"
      minHeight={minHeight}
      photoClassName="min-h-[40svh]"
    >
      <Heading size="panel" className="mb-6">
        {heading}
      </Heading>
      <blockquote
        style={fontBody}
        className={cn("text-lg md:text-xl text-white/95 leading-relaxed")}
      >
        <span style={fontSerif} className="text-white/60">
          &ldquo;
        </span>
        {quote}
        <span style={fontSerif} className="text-white/60">
          &rdquo;
        </span>
      </blockquote>
      <div style={fontBody} className="mt-5 text-sm md:text-base text-white/80">
        {attribution}
      </div>
    </DiagonalSpread>
  );
}
