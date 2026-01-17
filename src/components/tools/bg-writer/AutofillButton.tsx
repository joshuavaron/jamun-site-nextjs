"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useBGWriter } from "./BGWriterContext";

type FeedbackType = "success" | "successWithAI" | "error" | "noChanges" | null;

interface FeedbackState {
  type: FeedbackType;
  fieldsUpdated?: number;
  aiPolishedCount?: number;
}

export function AutofillButton() {
  const t = useTranslations("BGWriter.autofill");
  const { currentLayer, autofillState, canAutofill, triggerAutofill } =
    useBGWriter();

  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    type: null,
  });

  // Don't show on comprehension layer (nothing to autofill from)
  // or final paper layer (uses template generation instead)
  if (currentLayer === "comprehension" || currentLayer === "finalPaper") {
    return null;
  }

  const { allowed, reason } = canAutofill();
  const { isAutofilling, cooldownRemaining } = autofillState;

  const handleClick = async () => {
    // Clear previous feedback
    setFeedbackState({ type: null });

    // If not allowed due to no changes, show feedback
    if (!allowed && reason === "noChanges") {
      setFeedbackState({ type: "noChanges" });
      // Auto-clear after 2 seconds
      setTimeout(() => setFeedbackState({ type: null }), 2000);
      return;
    }

    // If not allowed for other reasons, do nothing
    if (!allowed) {
      return;
    }

    try {
      const result = await triggerAutofill();
      if (result) {
        // Determine feedback type based on AI usage
        let feedbackType: FeedbackType = "noChanges";
        if (result.fieldsUpdated > 0) {
          feedbackType = result.aiPolishedCount > 0 ? "successWithAI" : "success";
        }

        setFeedbackState({
          type: feedbackType,
          fieldsUpdated: result.fieldsUpdated,
          aiPolishedCount: result.aiPolishedCount,
        });
        // Auto-clear success after 3 seconds
        setTimeout(() => setFeedbackState({ type: null }), 3000);
      }
    } catch (error) {
      console.error("Autofill error:", error);
      setFeedbackState({ type: "error" });
      setTimeout(() => setFeedbackState({ type: null }), 3000);
    }
  };

  // Determine button state and appearance
  const isDisabled = isAutofilling || cooldownRemaining > 0;
  const showCooldown = cooldownRemaining > 0 && !isAutofilling;

  // Determine button styling based on feedback state
  const getButtonStyles = () => {
    if (feedbackState.type === "success" || feedbackState.type === "successWithAI") {
      return "border-green-500 text-green-600 hover:bg-green-50";
    }
    if (feedbackState.type === "noChanges") {
      return "border-amber-500 text-amber-600 hover:bg-amber-50";
    }
    if (feedbackState.type === "error") {
      return "border-red-500 text-red-600 hover:bg-red-50";
    }
    return "border-jamun-blue text-jamun-blue hover:bg-jamun-blue hover:text-white";
  };

  // Render button content based on current state
  const renderButtonContent = () => {
    if (isAutofilling) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("filling")}</span>
        </>
      );
    }

    if (showCooldown) {
      return (
        <>
          <Clock className="h-4 w-4" />
          <span>{t("cooldown", { seconds: cooldownRemaining })}</span>
        </>
      );
    }

    if (feedbackState.type === "successWithAI") {
      return (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span>
            {t("successWithAI", {
              count: feedbackState.fieldsUpdated ?? 0,
              aiCount: feedbackState.aiPolishedCount ?? 0,
            })}
          </span>
        </>
      );
    }

    if (feedbackState.type === "success") {
      return (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span>{t("success", { count: feedbackState.fieldsUpdated ?? 0 })}</span>
        </>
      );
    }

    if (feedbackState.type === "noChanges") {
      return (
        <>
          <AlertCircle className="h-4 w-4" />
          <span>{t("noChanges")}</span>
        </>
      );
    }

    if (feedbackState.type === "error") {
      return (
        <>
          <AlertCircle className="h-4 w-4" />
          <span>{t("error")}</span>
        </>
      );
    }

    // Default: ready state
    return (
      <>
        <Sparkles className="h-4 w-4" />
        <span>{t("button")}</span>
      </>
    );
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jamun-blue focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          getButtonStyles()
        )}
      >
        {renderButtonContent()}
      </button>

      {/* Hint text - only shown when button is ready */}
      {!isAutofilling &&
        !showCooldown &&
        !feedbackState.type &&
        allowed && (
          <span className="hidden text-xs text-gray-500 lg:inline">
            {t("hint")}
          </span>
        )}
    </div>
  );
}
