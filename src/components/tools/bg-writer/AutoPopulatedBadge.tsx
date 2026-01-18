"use client";

import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface AutoPopulatedBadgeProps {
  fromLayer: string;
}

export function AutoPopulatedBadge({ fromLayer }: AutoPopulatedBadgeProps) {
  const t = useTranslations("BGWriter");

  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
      <RefreshCw className="h-3 w-3" />
      {t("autoPopulated.badge", { layer: fromLayer })}
    </span>
  );
}
