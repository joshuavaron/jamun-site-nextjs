"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            "block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900",
            "placeholder-gray-400 focus:border-jamun-blue focus:ring-2 focus:ring-jamun-blue/20",
            "transition-colors duration-200 outline-none",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            props.disabled && "bg-gray-50 text-gray-500 cursor-not-allowed",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
