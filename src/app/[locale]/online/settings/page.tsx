"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations("OnlineSettings");
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-jamun-blue" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-gray-600 mt-1">{t("subtitle")}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "shadow-none border-none",
              navbar: "hidden",
              pageScrollBox: "p-0",
            },
          }}
        />
      </div>
    </div>
  );
}
