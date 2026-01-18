"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useBGWriter } from "./BGWriterContext";
import { calculateCompletion } from "@/lib/bg-writer/storage";

export function ProgressBar() {
  const t = useTranslations("BGWriter");
  const { draft } = useBGWriter();

  if (!draft) return null;

  const percentage = calculateCompletion(draft);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm">
        <span className="font-medium text-gray-700">
          {t("progress.percentage", { percent: percentage })}
        </span>
        <span
          className={cn(
            "text-xs font-medium",
            percentage === 100
              ? "text-green-600"
              : percentage > 50
                ? "text-amber-600"
                : "text-gray-500"
          )}
        >
          {percentage === 100
            ? t("progress.complete")
            : percentage > 0
              ? t("progress.inProgress")
              : t("progress.notStarted")}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            percentage === 100
              ? "bg-green-500"
              : percentage > 50
                ? "bg-amber-500"
                : "bg-jamun-blue"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
