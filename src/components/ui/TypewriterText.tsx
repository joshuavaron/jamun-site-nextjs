"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface TypewriterTextProps {
  /** The text to animate */
  text: string;
  /** Initial delay before animation starts (seconds) */
  delay?: number;
  /** CSS class for the container span */
  className?: string;
  /** Delay between each character (seconds) */
  charDelay?: number;
}

/**
 * Typewriter text animation component.
 * Renders text with a character-by-character reveal animation.
 *
 * Accessibility: Uses aria-label for screen readers to announce full text immediately,
 * while aria-hidden hides the animated characters from assistive technology.
 */
export function TypewriterText({
  text,
  delay = 0,
  className = "",
  charDelay = 0.03,
}: TypewriterTextProps) {
  // Memoize character array to avoid recreating on every render
  const characters = useMemo(() => text.split(""), [text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {characters.map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.01,
              delay: delay + index * charDelay,
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
