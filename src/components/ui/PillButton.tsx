import type { CSSProperties, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { fontBody } from "@/lib/typography";

// The rounded-full pill button used for CTAs across the new design.
// Three sizes (sm/md/lg) and four built-in variants. Use `tone="custom"`
// with a `color` prop to render in a program-specific color (the program
// grid uses this to color each card's "Learn More" pill).

type Tone = "primary" | "outline" | "accent" | "custom";
type Size = "sm" | "md" | "lg";

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-1.5 text-[13px]",
  md: "px-6 py-3 text-[14px]",
  lg: "px-7 py-3.5 text-[17px]",
};

const toneStyles: Record<Exclude<Tone, "custom">, string> = {
  primary:
    "bg-[#397bce] text-white hover:bg-[#2a5fa3]",
  outline:
    "border-2 border-[#397bce] text-[#397bce] hover:bg-[#397bce] hover:text-white",
  accent:
    "bg-[#f97316] text-white hover:bg-[#ea580c]",
};

interface BaseProps {
  size?: Size;
  tone?: Tone;
  /** When tone="custom", the base background color (hover dims via opacity). */
  color?: string;
  /** Append a sliding arrow `→` after the label. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

interface AsLinkProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface AsButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type PillButtonProps = AsLinkProps | AsButtonProps;

export function PillButton(props: PillButtonProps) {
  const {
    size = "lg",
    tone = "primary",
    color,
    withArrow = false,
    className,
    children,
  } = props;

  const disabled = "disabled" in props ? props.disabled : false;
  const isCustom = tone === "custom";
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
    sizeStyles[size],
    isCustom ? "text-white hover:opacity-90" : toneStyles[tone],
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    className,
  );

  const style: CSSProperties = {
    ...fontBody,
    ...(isCustom && color ? { backgroundColor: color } : {}),
  };

  const content = (
    <>
      {children}
      {withArrow && <span aria-hidden>→</span>}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={disabled}
      className={base}
      style={style}
    >
      {content}
    </button>
  );
}
