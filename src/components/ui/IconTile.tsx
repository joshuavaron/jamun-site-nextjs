import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

// A rounded square with a tinted background and a colored icon inside.
// Used to head every card in the audience and skills grids. The tint is
// computed from the `color` prop at 10% opacity, and the icon takes the
// full color. Pick a size depending on card density:
//   sm  (48 / icon 24)  — dense grids, ~4-up
//   md  (56 / icon 28)  — primary cards, ~3-up

type Size = "sm" | "md";

const tileSize: Record<Size, string> = {
  sm: "w-12 h-12 rounded-xl",
  md: "w-14 h-14 rounded-2xl",
};

const iconSize: Record<Size, string> = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
};

interface IconTileProps {
  /** Lucide icon component (or any component that accepts SVG props). */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Hex color string for the icon. The tile gets the same color at 10% bg. */
  color: string;
  size?: Size;
  className?: string;
}

export function IconTile({ icon: Icon, color, size = "md", className }: IconTileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        tileSize[size],
        className,
      )}
      style={{ backgroundColor: `${color}1a` }}
    >
      <Icon className={iconSize[size]} style={{ color }} />
    </div>
  );
}
