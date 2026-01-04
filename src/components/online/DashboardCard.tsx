import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-jamun-blue/10 rounded-lg text-jamun-blue">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
