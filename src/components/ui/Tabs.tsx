"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pill";
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  className,
}: TabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1",
        variant === "pill" && "bg-gray-100 p-1 rounded-full w-fit",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jamun-blue focus-visible:ring-offset-2",
              variant === "pill" && [
                "rounded-full",
                isActive
                  ? "bg-jamun-blue text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50",
              ],
              variant === "underline" && [
                "border-b-2 rounded-none",
                isActive
                  ? "border-jamun-blue text-jamun-blue"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
              ]
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
