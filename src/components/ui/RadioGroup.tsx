"use client";

import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  error?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  name,
  label,
  error,
  options,
  value,
  onChange,
  className,
}: RadioGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
              value === option.value
                ? "border-jamun-blue bg-jamun-blue/5"
                : "border-gray-200 hover:border-gray-300 bg-white"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only"
            />
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                value === option.value
                  ? "border-jamun-blue"
                  : "border-gray-300"
              )}
            >
              {value === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-jamun-blue" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {option.icon}
                <span className="font-medium text-gray-900">{option.label}</span>
              </div>
              {option.description && (
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
