/**
 * Shared Framer Motion animation variants
 *
 * These variants are used across multiple components for consistent animations.
 * Import from here instead of redefining in each component.
 */

import { Variants } from "framer-motion";

// Standard staggered container animation for lists/grids
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Standard item animation for staggered lists
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Fade in from bottom animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Fade in from left animation
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

// Fade in from right animation
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

// Scale up animation for cards/images on hover
export const scaleUp: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
};

// Lift up animation for cards on hover
export const liftUp: Variants = {
  initial: { y: 0 },
  hover: { y: -4 },
};

// Standard viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: "-100px",
};

// Quick stagger for faster animations
export const quickContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Slower stagger for dramatic reveals
export const slowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};
