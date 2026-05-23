"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// A full-bleed two-column layout. One column holds a photo, the other
// holds a text panel. Used four times on the landing page (hero, stats,
// themed quote, final CTA) and is the workhorse layout for content-rich
// sections that need editorial impact.
//
// `clip` controls the photo's silhouette:
//   - "diagonal"  — the photo is cut on a diagonal so it bleeds into the
//                   panel; pair with a white panel to feel like one canvas.
//   - "none"      — clean rectangle; use when the panel has a strong color
//                   and the divider itself is the contrast.
//
// `animation` controls how the panel enters:
//   - "entry"  — fires immediately on mount (above-the-fold hero).
//   - "inView" — fires when scrolled into view (everything else).

type PhotoSide = "left" | "right";
type ClipMode = "diagonal" | "none";

const CLIP_LEFT = "polygon(0 0, 100% 0, 86% 100%, 0 100%)";
const CLIP_RIGHT = "polygon(14% 0, 100% 0, 100% 100%, 0 100%)";

interface DiagonalSpreadProps {
  photoSide: PhotoSide;
  photoSrc: string;
  photoAlt: string;
  /** Marks the photo as the LCP candidate (hero only). */
  photoPriority?: boolean;
  /** Diagonal clip on the photo, or no clip. Defaults to "diagonal". */
  clip?: ClipMode;
  /** Tailwind classes for the spread's outer min-height (e.g. `min-h-[72svh]`). */
  minHeight?: string;
  /** Background color of the text panel (CSS value). */
  panelBg?: string;
  /** Text color inside the text panel (CSS value). */
  panelText?: string;
  /** Override the text panel padding / extra classes. */
  panelClassName?: string;
  /** Override the photo column extra classes. */
  photoClassName?: string;
  /** CSS `object-position` for the photo (e.g. `"center"`, `"70% center"`,
   *  `"right top"`). Use to shift the crop focus when the subject is not
   *  at the geometric center of the source image. Defaults to `"center"`. */
  objectPosition?: string;
  /** Animation timing for the text panel. */
  animation?: "entry" | "inView";
  children: ReactNode;
  className?: string;
}

export function DiagonalSpread({
  photoSide,
  photoSrc,
  photoAlt,
  photoPriority = false,
  clip = "diagonal",
  minHeight = "min-h-[60svh]",
  panelBg,
  panelText,
  panelClassName,
  photoClassName,
  objectPosition,
  animation = "inView",
  children,
  className,
}: DiagonalSpreadProps) {
  const clipPath =
    clip === "none" ? undefined : photoSide === "left" ? CLIP_LEFT : CLIP_RIGHT;

  const photoOrder = photoSide === "left" ? "order-2 md:order-1" : "order-1 md:order-2";
  const panelOrder = photoSide === "left" ? "order-1 md:order-2" : "order-2 md:order-1";

  // Apply clip-path only when the spread is in two-column mode (md+). At
  // mobile/single-column the photo sits above the panel as a rectangle —
  // applying a diagonal there carves an empty triangle into the image with
  // nothing to bleed into.
  const photoCssVar = clipPath
    ? ({ "--photo-clip": clipPath } as CSSProperties)
    : undefined;

  const photo = (
    <div
      className={cn(
        "relative min-h-[50svh] md:min-h-0",
        photoOrder,
        clipPath && "md:[clip-path:var(--photo-clip)]",
        photoClassName,
      )}
      style={photoCssVar}
    >
      <Image
        src={photoSrc}
        alt={photoAlt}
        fill
        priority={photoPriority}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
        sizes="(min-width:768px) 50vw, 100vw"
      />
    </div>
  );

  const panelInitial =
    animation === "entry"
      ? { opacity: 0, x: photoSide === "right" ? -16 : 16 }
      : { opacity: 0 };
  const panelAnimate = animation === "entry" ? { opacity: 1, x: 0 } : undefined;
  const panelWhileInView = animation === "inView" ? { opacity: 1 } : undefined;
  const panelViewport = animation === "inView" ? { once: true } : undefined;

  const panel = (
    <motion.div
      initial={panelInitial}
      animate={panelAnimate}
      whileInView={panelWhileInView}
      viewport={panelViewport}
      transition={{ duration: 0.9 }}
      className={cn(
        "px-6 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col justify-center",
        // Align the panel's "outer" edge (the side at the viewport border)
        // with `Container`'s content right/left edge at every viewport, so
        // text inside a full-bleed spread lands on the same right rail as
        // text inside a `<Container>` section. Without this scaling the
        // panel's outer text edge drifts past Container's right edge once
        // viewport > 1500px (and sits 32px past it at every viewport, since
        // the panel is full-bleed while Container caps at max-w-[1500px]).
        photoSide === "left"
          ? "md:pr-16 lg:pr-[max(6rem,calc(50vw-654px))]"
          : "md:pl-16 lg:pl-[max(6rem,calc(50vw-654px))]",
        panelOrder,
        panelClassName,
      )}
      style={{ backgroundColor: panelBg, color: panelText }}
    >
      {children}
    </motion.div>
  );

  return (
    <section className={cn("relative", className)}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2", minHeight)}>
        {photoSide === "left" ? (
          <>
            {photo}
            {panel}
          </>
        ) : (
          <>
            {panel}
            {photo}
          </>
        )}
      </div>
    </section>
  );
}
