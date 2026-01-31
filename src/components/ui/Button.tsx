"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-jamun-blue text-white hover:bg-jamun-blue-dark active:bg-jamun-blue-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300",
  accent:
    "bg-gradient-to-r from-[#dc2626] to-jamun-orange text-white hover:from-[#b91c1c] hover:to-[#ea580c] active:from-[#b91c1c] active:to-[#ea580c] shadow-sm hover:shadow-md",
  outline:
    "border-2 border-jamun-blue text-jamun-blue hover:bg-jamun-blue hover:text-white",
  ghost:
    "text-gray-700 hover:bg-gray-100 hover:text-jamun-blue",
  link:
    "text-jamun-blue hover:underline underline-offset-4 p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3 text-lg gap-2.5",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

function LoadingSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={cn("animate-spin", iconSizes[size])}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      icon: Icon,
      iconRight: IconRight,
      isLoading = false,
      className,
      children,
      ...rest
    } = props;

    const isLinkVariant = variant === "link";

    const baseStyles = cn(
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jamun-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      !isLinkVariant && "rounded-full"
    );

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      !isLinkVariant && sizeStyles[size],
      isLoading && "pointer-events-none",
      className
    );

    const content = isLoading ? (
      <>
        <LoadingSpinner size={size} />
        <span>{children}</span>
      </>
    ) : (
      <>
        {Icon && <Icon className={cn("shrink-0", iconSizes[size])} />}
        <span>{children}</span>
        {IconRight && <IconRight className={cn("shrink-0", iconSizes[size])} />}
      </>
    );

    if ("href" in props && props.href) {
      return (
        <Link
          href={props.href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isLoading || ("disabled" in rest ? (rest as { disabled?: boolean }).disabled : false)}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
