"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
    "bg-jamun-blue text-white hover:bg-jamun-blue-dark active:bg-jamun-blue-dark",
  accent:
    "bg-jamun-orange text-white hover:bg-jamun-orange-dark active:bg-jamun-orange-dark",
  outline:
    "border-2 border-jamun-blue text-jamun-blue hover:bg-jamun-blue hover:text-white",
  ghost:
    "text-gray-700 hover:bg-gray-100 hover:text-jamun-blue",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    } = props;

    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jamun-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ("href" in props && props.href) {
      return (
        <Link
          href={props.href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
