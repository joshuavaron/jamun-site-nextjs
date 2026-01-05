"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface SearchResult {
  title: string;
  url: string;
  type: "page" | "blog" | "committee" | "resource";
}

interface SearchDropdownProps {
  results: SearchResult[];
  selectedIndex: number;
  onResultClick: () => void;
  show: boolean;
  className?: string;
}

function SearchDropdownComponent({
  results,
  selectedIndex,
  onResultClick,
  show,
  className,
}: SearchDropdownProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 overflow-hidden",
            className
          )}
        >
          {results.map((result, index) => (
            <Link
              key={result.url}
              href={result.url}
              onClick={onResultClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-50"
              )}
            >
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-gray-700">{result.title}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const SearchDropdown = memo(SearchDropdownComponent);
