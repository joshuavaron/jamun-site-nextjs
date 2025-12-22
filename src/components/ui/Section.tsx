import { cn } from "@/lib/utils";

type SectionBackground = "white" | "gray" | "blue";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  narrow?: boolean;
}

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white",
  gray: "bg-gray-50",
  blue: "bg-jamun-blue text-white",
};

export function Section({
  background = "white",
  narrow = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-8 md:py-10 lg:py-12",
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
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
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 lg:mb-8",
        centered && "text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-jamun-blue font-semibold text-base tracking-widest uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
