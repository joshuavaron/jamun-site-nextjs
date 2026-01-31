import { cn } from "@/lib/utils";

type SectionBackground =
  | "white"
  | "gray"
  | "blue"
  | "cream"
  | "sage"
  | "lavender"
  | "peach"
  | "sky"
  | "dark";

type SectionPattern = "dots" | "grid" | "none";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  pattern?: SectionPattern;
  narrow?: boolean;
}

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white",
  gray: "bg-gray-50",
  blue: "bg-jamun-blue text-white",
  cream: "bg-cream",
  sage: "bg-light-sage",
  lavender: "bg-light-lavender",
  peach: "bg-soft-peach",
  sky: "bg-light-sky",
  dark: "bg-gray-900 text-white",
};

export function Section({
  background = "white",
  pattern = "none",
  narrow = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-16 md:py-20",
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      {/* Optional background pattern */}
      {pattern === "dots" && (
        <div className="absolute inset-0 text-gray-900/[0.03] pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="section-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#section-dots)" />
          </svg>
        </div>
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 text-gray-900/[0.03] pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="section-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#section-grid)" />
          </svg>
        </div>
      )}
      <div
        className={cn(
          "relative mx-auto px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-4xl" : "max-w-7xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  align,
  className,
}: SectionHeaderProps) {
  const isCenter = align ? align === "center" : centered;

  return (
    <div
      className={cn(
        "mb-8 lg:mb-12",
        isCenter && "text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-3 mb-3", isCenter && "justify-center")}>
          <span className="w-8 h-0.5 bg-jamun-blue rounded-full" aria-hidden="true" />
          <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg text-gray-600", isCenter && "max-w-2xl mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export type { SectionBackground, SectionPattern };
