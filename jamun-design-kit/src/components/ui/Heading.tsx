import { createElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  fontSerif,
  fontHeading,
  fontBody,
  headingSize,
  type HeadingSize,
} from "@/lib/typography";

type FontFamily = "serif" | "sans-heading" | "sans-body";
type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "blockquote";

const familyStyle: Record<FontFamily, CSSProperties> = {
  serif: fontSerif,
  "sans-heading": fontHeading,
  "sans-body": fontBody,
};

// Default font + weight pairing per size variant.
// Serif heads are weight 400 (Freight Text Pro is heavy by default).
// Sans heads are weight 600.
const defaults: Record<
  HeadingSize,
  { family: FontFamily; weight: number; tag: Tag }
> = {
  hero: { family: "serif", weight: 400, tag: "h1" },
  ctaHero: { family: "serif", weight: 400, tag: "h2" },
  section: { family: "serif", weight: 400, tag: "h2" },
  panel: { family: "serif", weight: 400, tag: "h3" },
  cardLg: { family: "serif", weight: 400, tag: "h3" },
  card: { family: "sans-heading", weight: 600, tag: "h3" },
  sub: { family: "serif", weight: 400, tag: "h3" },
  micro: { family: "sans-body", weight: 600, tag: "h3" },
};

interface HeadingProps {
  /** Type-scale variant. Drives size, leading, tracking, and default font. */
  size: HeadingSize;
  /** Override the semantic tag. Defaults follow the variant (h1/h2/h3). */
  as?: Tag;
  /** Override the font family. */
  font?: FontFamily;
  /** Override the font weight. */
  weight?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Heading({
  size,
  as,
  font,
  weight,
  className,
  style,
  children,
}: HeadingProps) {
  const d = defaults[size];
  const family = font ?? d.family;
  const tag = as ?? d.tag;
  return createElement(
    tag,
    {
      className: cn(headingSize[size], className),
      style: { ...familyStyle[family], fontWeight: weight ?? d.weight, ...style },
    },
    children,
  );
}
