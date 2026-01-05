"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button, SearchDropdown } from "@/components/ui";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { SearchResult } from "@/components/ui";

// Explore menu items - keys map to translation keys
const exploreItemKeys = [
  { key: "programs", href: "/programs" },
  { key: "about", href: "/about" },
  { key: "leaderboards", href: "/leaderboards" },
  { key: "blog", href: "/blog" },
] as const;

// Static pages to search - keys map to translation keys
const staticPageKeys = [
  { titleKey: "searchModelUN", url: "/modelun", keywordKeys: ["searchKwModel", "searchKwUN", "searchKwMUN", "searchKwUnitedNations"] },
  { titleKey: "searchMockTrial", url: "/mocktrial", keywordKeys: ["searchKwMock", "searchKwTrial", "searchKwLaw", "searchKwCourt"] },
  { titleKey: "searchMathletes", url: "/mathletes", keywordKeys: ["searchKwMath", "searchKwMathletes", "searchKwCompetition"] },
  { titleKey: "searchPrograms", url: "/programs", keywordKeys: ["searchKwPrograms", "searchKwActivities"] },
  { titleKey: "searchAbout", url: "/about", keywordKeys: ["searchKwAbout", "searchKwWho", "searchKwTeam", "searchKwOrganization"] },
  { titleKey: "searchDonate", url: "/donate", keywordKeys: ["searchKwDonate", "searchKwSupport", "searchKwGive", "searchKwContribution"] },
  { titleKey: "searchRegister", url: "/register", keywordKeys: ["searchKwRegister", "searchKwSignUp", "searchKwJoin"] },
  { titleKey: "searchGrants", url: "/grants", keywordKeys: ["searchKwGrants", "searchKwFunding", "searchKwFinancial", "searchKwAid"] },
  { titleKey: "searchBlog", url: "/blog", keywordKeys: ["searchKwBlog", "searchKwNews", "searchKwArticles", "searchKwPosts"] },
  { titleKey: "searchCommittees", url: "/modelun/committees", keywordKeys: ["searchKwCommittees", "searchKwGA", "searchKwSecurityCouncil"] },
  { titleKey: "searchModelUNResources", url: "/modelun/resources", keywordKeys: ["searchKwResources", "searchKwGuides", "searchKwModelUN"] },
  { titleKey: "searchMockTrialResources", url: "/mocktrial/resources", keywordKeys: ["searchKwResources", "searchKwGuides", "searchKwMockTrial"] },
  { titleKey: "searchMathletesResources", url: "/mathletes/resources", keywordKeys: ["searchKwResources", "searchKwGuides", "searchKwMath"] },
  { titleKey: "searchLeaderboards", url: "/leaderboards", keywordKeys: ["searchKwLeaderboard", "searchKwRankings", "searchKwScores"] },
] as const;

export function Header() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-explore-dropdown]")) {
        setIsExploreOpen(false);
      }
      if (!target.closest("[data-search-dropdown]")) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Build translated static pages for search
  const staticPages = useMemo(() => {
    return staticPageKeys.map((page) => ({
      title: t(page.titleKey),
      url: page.url,
      keywords: page.keywordKeys.map((key) => t(key).toLowerCase()),
    }));
  }, [t]);

  // Search logic - derived state using useMemo
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search static pages first (higher priority)
    for (const page of staticPages) {
      const titleMatch = page.title.toLowerCase().includes(query);
      const keywordMatch = page.keywords.some((k: string) => k.includes(query));
      if (titleMatch || keywordMatch) {
        results.push({ title: page.title, url: page.url, type: "page" });
      }
    }

    // Limit results
    return results.slice(0, 6);
  }, [searchQuery, staticPages]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, searchResults.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          window.location.href = searchResults[selectedIndex].url;
        }
        break;
      case "Escape":
        setIsSearchFocused(false);
        inputRef.current?.blur();
        break;
    }
  }, [searchResults, selectedIndex]);

  // Callbacks for dropdown interactions
  const handleDesktopResultClick = useCallback(() => {
    setSearchQuery("");
    setIsSearchFocused(false);
  }, []);

  const handleMobileResultClick = useCallback(() => {
    setSearchQuery("");
    setIsSearchFocused(false);
    setIsMenuOpen(false);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const toggleExplore = useCallback(() => {
    setIsExploreOpen((prev) => !prev);
  }, []);

  const closeExplore = useCallback(() => {
    setIsExploreOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0 && searchResults.length > 0;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/75 backdrop-blur-md shadow-sm" : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14 md:h-16">
          {/* Left side: Explore dropdown + Search */}
          <div className="hidden nav:flex items-center gap-4">
            {/* Explore Dropdown */}
            <div className="relative" data-explore-dropdown>
              <button
                onClick={toggleExplore}
                className="flex items-center gap-1 text-gray-700 hover:text-jamun-blue font-medium transition-colors cursor-pointer"
              >
                {t("explore")}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isExploreOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isExploreOpen && (
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
                        onClick={closeExplore}
                        className="block px-4 py-2 text-gray-700 hover:bg-jamun-blue/5 hover:text-jamun-blue transition-colors"
                      >
                        {t(item.key)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div className="relative" data-search-dropdown ref={searchRef}>
              <div
                className={cn(
                  "flex items-center rounded-full transition-all duration-200 h-9 w-52",
                  isSearchFocused ? "bg-white shadow-md" : "bg-gray-100"
                )}
              >
                <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleKeyDown}
                  className="no-focus-outline w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              <SearchDropdown
                results={searchResults}
                selectedIndex={selectedIndex}
                onResultClick={handleDesktopResultClick}
                show={showDropdown}
              />
            </div>
          </div>

          {/* Logo: Left-aligned on mobile, centered on desktop */}
          <Link
            href="/"
            className="flex items-center shrink-0 nav:absolute nav:left-1/2 nav:top-1/2 nav:-translate-x-1/2 nav:-translate-y-1/2"
          >
            <div className="relative h-8 w-40 md:h-9 md:w-52">
              <Image
                src="/images/logos/jamun-blue-side-logo.svg"
                alt={t("logoAlt")}
                fill
                className="object-contain object-left nav:object-center"
                priority
              />
            </div>
          </Link>

          {/* Right side: CTA Buttons + Language Switcher */}
          <div className="hidden nav:flex items-center gap-4 ml-auto">
            <LanguageSwitcher />
            <Link
              href="/grants"
              className="text-gray-700 hover:text-jamun-blue font-medium transition-colors"
            >
              {t("grants")}
            </Link>
            <Button href="/donate" variant="accent" size="sm">
              {t("donate")}
            </Button>
            <Button href="/register" variant="primary" size="sm">
              {t("register")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="nav:hidden p-2 text-gray-700 hover:text-jamun-blue transition-colors ml-auto"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
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
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    className="no-focus-outline w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>

                <SearchDropdown
                  results={searchResults}
                  selectedIndex={-1}
                  onResultClick={handleMobileResultClick}
                  show={showDropdown}
                />
              </div>

              {exploreItemKeys.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
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
    </header>
  );
}
