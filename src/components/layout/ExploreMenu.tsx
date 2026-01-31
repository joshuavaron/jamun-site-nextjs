"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Explore menu items - keys map to translation keys
export const exploreItemKeys = [
  { key: "programs", href: "/programs" },
  { key: "about", href: "/about" },
  { key: "leaderboards", href: "/leaderboards" },
  { key: "blog", href: "/blog" },
] as const;

interface ExploreMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  t: (key: string) => string;
}

export function ExploreMenu({ isOpen, onToggle, onClose, t }: ExploreMenuProps) {
  return (
    <div className="relative" data-explore-dropdown>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-gray-700 hover:text-jamun-blue font-medium transition-colors cursor-pointer"
      >
        {t("explore")}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
          >
            {exploreItemKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-2 text-gray-700 hover:bg-jamun-blue/5 hover:text-jamun-blue transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
