"use client";

import { BookOpen, PenLine, Search, FileText, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useBGWriter } from "./BGWriterContext";
import { AutofillButton } from "./AutofillButton";
import type { LayerType } from "@/lib/bg-writer/types";
import { LAYER_ORDER, LAYER_INFO } from "@/lib/bg-writer/types";
import { getQuestionsForLayer } from "@/lib/bg-writer/questions";

const LAYER_ICONS: Record<LayerType, React.ComponentType<{ className?: string }>> = {
  comprehension: BookOpen,
  initialContent: PenLine,
  research: Search,
  finalDraft: FileText,
};

const LAYER_COLORS: Record<LayerType, { bg: string; bgLight: string; text: string; border: string }> = {
  comprehension: {
    bg: "bg-jamun-blue",
    bgLight: "bg-jamun-blue/10",
    text: "text-jamun-blue",
    border: "border-jamun-blue",
  },
  initialContent: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-600/10",
    text: "text-purple-600",
    border: "border-purple-600",
  },
  research: {
    bg: "bg-amber-500",
    bgLight: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500",
  },
  finalDraft: {
    bg: "bg-green-600",
    bgLight: "bg-green-600/10",
    text: "text-green-600",
    border: "border-green-600",
  },
};

function getLayerCompletion(
  layer: LayerType,
  draft: ReturnType<typeof useBGWriter>["draft"]
): number {
  if (!draft) return 0;

  if (layer === "finalDraft") {
    return draft.layers.finalDraft?.trim() ? 100 : 0;
  }

  const questions = getQuestionsForLayer(layer);
  if (questions.length === 0) return 0;

  const answered = questions.filter(
    (q) => draft.layers[layer][q.id]?.trim()
  ).length;

  return Math.round((answered / questions.length) * 100);
}

export function LayerTabs() {
  const t = useTranslations("BGWriter");
  const { currentLayer, setCurrentLayer, draft } = useBGWriter();

  return (
    <div className="w-full">
      {/* Mobile: Dropdown */}
      <div className="sm:hidden">
        <select
          value={currentLayer}
          onChange={(e) => setCurrentLayer(e.target.value as LayerType)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium focus:border-jamun-blue focus:outline-none focus:ring-2 focus:ring-jamun-blue/20"
        >
          {LAYER_ORDER.map((layer, index) => {
            const completion = getLayerCompletion(layer, draft);
            return (
              <option key={layer} value={layer}>
                {index + 1}. {t(`layers.${LAYER_INFO[layer].translationKey}`)}{" "}
                {completion === 100 ? "✓" : `(${completion}%)`}
              </option>
            );
          })}
        </select>
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1.5">
          {LAYER_ORDER.map((layer, index) => {
            const Icon = LAYER_ICONS[layer];
            const colors = LAYER_COLORS[layer];
            const isActive = currentLayer === layer;
            const completion = getLayerCompletion(layer, draft);
            const isComplete = completion === 100;

            return (
              <button
                key={layer}
                onClick={() => setCurrentLayer(layer)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? cn("bg-white text-gray-900 shadow-sm", colors.bgLight)
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    isActive ? colors.bg + " text-white" : "bg-gray-200 text-gray-600"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="hidden lg:inline">
                  {t(`layers.${LAYER_INFO[layer].translationKey}`)}
                </span>
                <Icon
                  className={cn(
                    "h-4 w-4 lg:hidden",
                    isActive ? colors.text : "text-gray-400"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Layer description and autofill button */}
        <div className="mt-3 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-500">
            {t(`layerDescriptions.${LAYER_INFO[currentLayer].translationKey}`)}
          </p>
          <AutofillButton />
        </div>
      </div>
    </div>
  );
}
