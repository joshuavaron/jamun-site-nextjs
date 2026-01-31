"use client";

import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button, SearchDropdown } from "@/components/ui";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { exploreItemKeys } from "@/components/layout/ExploreMenu";
import type { SearchResult } from "@/components/ui";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  searchResults: SearchResult[];
  showDropdown: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchFocus: () => void;
  onResultClick: () => void;
  t: (key: string) => string;
}

export function MobileNav({
  isOpen,
  onClose,
  searchQuery,
  searchResults,
  showDropdown,
  onSearchChange,
  onSearchFocus,
  onResultClick,
  t,
}: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="nav:hidden bg-white border-t overflow-hidden"
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {/* Mobile Language Switcher */}
            <div className="flex justify-end mb-2">
              <LanguageSwitcher />
            </div>

            {/* Mobile Search */}
            <div className="relative" data-search-dropdown>
              <div className="flex items-center bg-gray-100 rounded-full h-10">
                <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={onSearchChange}
                  onFocus={onSearchFocus}
                  className="no-focus-outline w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              <SearchDropdown
                results={searchResults}
                selectedIndex={-1}
                onResultClick={onResultClick}
                show={showDropdown}
              />
            </div>

            {exploreItemKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block text-lg text-gray-700 hover:text-jamun-blue font-medium py-2 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3">
              <Button href="/grants" variant="ghost" className="w-full bg-gray-100">
                {t("grants")}
              </Button>
              <Button href="/donate" variant="accent" className="w-full">
                {t("donate")}
              </Button>
              <Button href="/register" variant="primary" className="w-full">
                {t("register")}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
