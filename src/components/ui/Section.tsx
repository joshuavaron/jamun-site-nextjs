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
        "py-16 md:py-20 lg:py-24",
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
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
