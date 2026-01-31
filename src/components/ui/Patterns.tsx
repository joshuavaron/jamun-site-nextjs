import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
}

// Repeating dot grid pattern
export function DotPattern({ className }: PatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
}

interface WavyLineProps extends PatternProps {
  color?: string;
}

// Gentle sine wave line - used as section dividers
export function WavyLine({ className, color = "currentColor" }: WavyLineProps) {
  return (
    <svg
      className={cn("w-full", className)}
      viewBox="0 0 1200 8"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 4C100 4 100 1 200 1C300 1 300 7 400 7C500 7 500 1 600 1C700 1 700 7 800 7C900 7 900 1 1000 1C1100 1 1100 4 1200 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface CircleClusterProps extends PatternProps {
  colors?: string[];
}

// Overlapping outlined circles - replaces blur-3xl gradient blobs
export function CircleCluster({ className, colors = ["#397bce", "#9333ea", "#f97316"] }: CircleClusterProps) {
  return (
    <svg
      className={cn("absolute", className)}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="60" stroke={colors[0]} strokeWidth="1" opacity="0.15" />
      <circle cx="120" cy="70" r="45" stroke={colors[1]} strokeWidth="1" opacity="0.12" />
      <circle cx="100" cy="120" r="50" stroke={colors[2]} strokeWidth="1" opacity="0.10" />
      <circle cx="60" cy="110" r="35" stroke={colors[0]} strokeWidth="1" opacity="0.08" />
      <circle cx="140" cy="130" r="30" stroke={colors[1]} strokeWidth="1" opacity="0.10" />
    </svg>
  );
}

interface CornerAccentProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  className?: string;
}

// Quarter-circle positioned in a corner
export function CornerAccent({ position = "top-right", color = "#397bce", className }: CornerAccentProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const transforms = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <svg
      className={cn("absolute w-32 h-32", positionClasses[position], className)}
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
      style={{ transform: transforms[position] }}
    >
      <path
        d="M0 0C0 70.7 57.3 128 128 128V0H0Z"
        fill={color}
        opacity="0.04"
      />
      <path
        d="M0 0C0 70.7 57.3 128 128 128"
        stroke={color}
        strokeWidth="1"
        opacity="0.1"
      />
    </svg>
  );
}

// Subtle grid lines for background depth
export function GridLines({ className }: PatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-lines"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-lines)" />
    </svg>
  );
}
