import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "purple"
  | "emerald"
  | "amber"
  | "outline"
  | "subtle";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: LucideIcon;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-jamun-blue/10 text-jamun-blue",
  accent: "bg-jamun-orange/10 text-jamun-orange",
  success: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  outline: "border border-gray-300 text-gray-600 bg-transparent",
  subtle: "bg-jamun-blue/5 text-jamun-blue",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-gray-400",
  primary: "bg-jamun-blue",
  accent: "bg-jamun-orange",
  success: "bg-green-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  outline: "bg-gray-400",
  subtle: "bg-jamun-blue",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  icon: Icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}

export type { BadgeVariant, BadgeSize, BadgeProps };
