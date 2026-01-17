"use client";

/**
 * Custom MDX Components
 *
 * Specialized components for enhancing MDX content beyond standard markdown.
 *
 * Components:
 * - Callout: Highlighted info/warning/success/tip boxes
 * - ImageGallery: Grid layout for multiple images
 * - Continuation: Text that continues a parent subpoint's content
 *
 * Usage in MDX:
 * <Callout type="info">Important information</Callout>
 * <ImageGallery images={[{src: "/img.jpg", alt: "desc"}]} />
 * <Continuation>Continuing paragraph text...</Continuation>
 */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { calculateHierarchyLevels } from "./subpoint-helpers";

// --- Callout Component ---

interface CalloutProps {
  type?: "info" | "warning" | "success" | "tip";
  children: React.ReactNode;
}

const calloutStyles = {
  info: "bg-jamun-blue/10 border-jamun-blue/30 text-jamun-blue",
  warning: "bg-amber-50 border-amber-300 text-amber-800",
  success: "bg-emerald-50 border-emerald-300 text-emerald-800",
  tip: "bg-purple-50 border-purple-300 text-purple-800",
};

const calloutIcons = {
  info: "💡",
  warning: "⚠️",
  success: "✅",
  tip: "💫",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`border-l-4 p-4 rounded-r-lg my-6 ${calloutStyles[type]}`}>
      <div className="flex gap-3">
        <span className="text-lg">{calloutIcons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// --- ImageGallery Component ---

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}

// --- Continuation Component ---

/**
 * Continuation component for text that belongs to the previous subpoint's PARENT
 * Usage: <Continuation>If admitted, the record may be read...</Continuation>
 * The continuation appears after all children of a section and belongs to that parent
 */
interface ContinuationProps {
  children: React.ReactNode;
}

export function Continuation({ children }: ContinuationProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [level, setLevel] = useState(1);
  const [parentElement, setParentElement] = useState<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const container = el.parentElement;
    if (!container) return;

    const calculateLevel = () => {
      const allSubpoints = Array.from(container.querySelectorAll('.subpoint-paragraph')) as HTMLParagraphElement[];
      if (allSubpoints.length === 0) return;

      const hierarchyLevels = calculateHierarchyLevels(allSubpoints);

      // Find the previous subpoint (the last child of the parent section)
      let prevSibling = el.previousElementSibling;
      while (prevSibling) {
        if (prevSibling.classList.contains('subpoint-paragraph')) {
          const prevLevel = hierarchyLevels.get(prevSibling as HTMLParagraphElement) || 1;
          let parentLvl = prevLevel;
          let parentEl: HTMLParagraphElement | null = null;

          const prevIndex = allSubpoints.indexOf(prevSibling as HTMLParagraphElement);
          for (let i = prevIndex - 1; i >= 0; i--) {
            const candidateLevel = hierarchyLevels.get(allSubpoints[i]) || 1;
            if (candidateLevel < prevLevel) {
              parentLvl = candidateLevel;
              parentEl = allSubpoints[i];
              break;
            }
          }

          if (parentEl) {
            setLevel(parentLvl);
            el.dataset.subpointLevel = String(parentLvl);
            setParentElement(parentEl);
            el.dataset.parentSubpointId = parentEl.dataset.subpointId || '';
          } else {
            setLevel(prevLevel);
            el.dataset.subpointLevel = String(prevLevel);
            setParentElement(prevSibling as HTMLParagraphElement);
            el.dataset.parentSubpointId = (prevSibling as HTMLParagraphElement).dataset.subpointId || '';
          }

          el.dataset.isContinuation = 'true';
          return;
        }

        // Chain with other continuation elements
        if (prevSibling.classList.contains('subpoint-continuation')) {
          const prevLevel = parseInt(prevSibling.getAttribute('data-subpoint-level') || '1', 10);
          setLevel(prevLevel);
          el.dataset.subpointLevel = String(prevLevel);
          el.dataset.isContinuation = 'true';
          const pid = (prevSibling as HTMLElement).dataset.parentSubpointId;
          if (pid) {
            el.dataset.parentSubpointId = pid;
            const pEl = container.querySelector(`[data-subpoint-id="${pid}"]`) as HTMLParagraphElement;
            if (pEl) setParentElement(pEl);
          }
          return;
        }
        prevSibling = prevSibling.previousElementSibling;
      }
    };

    calculateLevel();
    const timeoutId = setTimeout(calculateLevel, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleMouseEnter = () => {
    if (parentElement) {
      parentElement.dataset.childHovered = 'true';
    }
  };

  const handleMouseLeave = () => {
    if (parentElement) {
      parentElement.dataset.childHovered = 'false';
    }
  };

  const handleClick = () => {
    if (parentElement) {
      parentElement.click();
    }
  };

  return (
    <p
      ref={ref}
      className="text-gray-700 leading-relaxed subpoint-continuation cursor-pointer"
      data-subpoint-level={level}
      data-is-continuation="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </p>
  );
}
