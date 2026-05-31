import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fontBody } from "@/lib/typography";

// A plain text link with a sliding arrow — `Get free resources →`.
// The arrow's gap expands on hover. Used inside cards beneath body copy
// to point to a related page in the same color as the card's icon.

interface BaseProps {
  /** Override the link color (defaults to brand blue). */
  color?: string;
  className?: string;
  children: ReactNode;
}

interface AsLinkProps extends BaseProps {
  href: string;
  onClick?: never;
}

interface AsAnchorProps extends BaseProps {
  /** External / mailto href — renders a plain <a> instead of next/link. */
  external: string;
  href?: never;
}

type ArrowLinkProps = AsLinkProps | AsAnchorProps;

export function ArrowLink(props: ArrowLinkProps) {
  const { color = "#397bce", className, children } = props;
  const style: CSSProperties = { ...fontBody, color };
  const classes = cn(
    "inline-flex items-center gap-2 text-[15px] font-semibold hover:gap-3 transition-all",
    className,
  );
  const inner = (
    <>
      {children}
      <span aria-hidden>→</span>
    </>
  );

  if ("external" in props && props.external) {
    return (
      <a href={props.external} className={classes} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={(props as AsLinkProps).href} className={classes} style={style}>
      {inner}
    </Link>
  );
}
