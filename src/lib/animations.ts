import type { Variants } from "framer-motion";

// Shared animation variants for consistent motion across the site

// Fade in from bottom - standard entry animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Fade in from bottom with more distance - for larger elements
export const fadeInUpLarge: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Container with staggered children - for lists and grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Faster stagger for tighter animations
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Scale up animation - for cards and images
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Simple fade - no movement
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Default viewport settings for whileInView animations
export const defaultViewport = {
  once: true,
  margin: "-100px" as const,
};

// Hover animations - use with whileHover
export const hoverScale = { scale: 1.02 };
export const hoverLift = { y: -4 };
export const hoverScaleLarge = { scale: 1.05 };

// Transition presets
export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const smoothTransition = {
  duration: 0.3,
  ease: "easeOut" as const,
};
