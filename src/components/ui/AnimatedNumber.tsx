"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedNumberProps {
  /** The value to animate to (can be a string like "500+" or "$70K+" or a number) */
  value: string | number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** CSS class for the container span */
  className?: string;
}

/**
 * Animated number component that counts up when scrolled into view.
 * Supports values with prefixes (like "$") and suffixes (like "+" or "K+").
 */
export function AnimatedNumber({
  value,
  duration = 2000,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState<string | number>(
    typeof value === "number" ? 0 : "0"
  );

  useEffect(() => {
    if (!isInView) return;

    const stringValue = String(value);

    // Extract the numeric part
    const numericMatch = stringValue.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    const prefix = stringValue.slice(0, stringValue.indexOf(numericMatch[0]));
    const suffix = stringValue.slice(
      stringValue.indexOf(numericMatch[0]) + numericMatch[0].length
    );

    const steps = Math.max(30, Math.floor(duration / 33)); // ~30fps
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(targetNumber * easeOutQuart);

      if (typeof value === "number") {
        setDisplayValue(current);
      } else {
        setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
