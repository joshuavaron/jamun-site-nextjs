import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "success" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-jamun-blue/10 text-jamun-blue",
  accent: "bg-jamun-orange/10 text-jamun-orange",
  success: "bg-green-100 text-green-700",
  outline: "border border-gray-300 text-gray-600",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
