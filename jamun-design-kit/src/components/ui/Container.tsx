import { cn } from "@/lib/utils";

// Container is the standard page-width wrapper used inside <section> blocks.
// Width caps at 1500px with a generous gutter that grows on larger screens.
// Sections that are full-bleed (spreads) skip this — only content sections
// that should align to the page rhythm wrap their content in Container.

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tighten the max width for narrow content (FAQ list, prose blocks). */
  narrow?: boolean;
}

export function Container({
  className,
  narrow = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6 md:px-16 lg:px-24",
        narrow ? "max-w-3xl" : "max-w-[1500px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
