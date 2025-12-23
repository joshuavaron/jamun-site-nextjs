"use client";

import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  charDelay?: number;
}

export function TypewriterText({
  text,
  delay = 0,
  className = "",
  charDelay = 0.03,
}: TypewriterTextProps) {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
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
  );
}
