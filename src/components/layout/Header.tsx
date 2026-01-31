"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useSearch } from "@/components/layout/useSearch";
import { SearchBar } from "@/components/layout/SearchBar";
import { ExploreMenu } from "@/components/layout/ExploreMenu";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    searchQuery,
    selectedIndex,
    isSearchFocused,
    inputRef,
    searchResults,
    showDropdown,
    handleKeyDown,
    handleSearchChange,
    handleSearchFocus,
    clearSearch,
    setIsSearchFocused,
  } = useSearch(t);

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
  }, [setIsSearchFocused]);

  const handleDesktopResultClick = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const handleMobileResultClick = useCallback(() => {
    clearSearch();
    setIsMenuOpen(false);
  }, [clearSearch]);

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
            <ExploreMenu
              isOpen={isExploreOpen}
              onToggle={toggleExplore}
              onClose={closeExplore}
              t={t}
            />
            <SearchBar
              searchQuery={searchQuery}
              isSearchFocused={isSearchFocused}
              selectedIndex={selectedIndex}
              searchResults={searchResults}
              showDropdown={showDropdown}
              inputRef={inputRef}
              searchRef={searchRef}
              placeholder={t("search")}
              onSearchChange={handleSearchChange}
              onSearchFocus={handleSearchFocus}
              onKeyDown={handleKeyDown}
              onResultClick={handleDesktopResultClick}
            />
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
      <MobileNav
        isOpen={isMenuOpen}
        onClose={closeMenu}
        searchQuery={searchQuery}
        searchResults={searchResults}
        showDropdown={showDropdown}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onResultClick={handleMobileResultClick}
        t={t}
      />
    </header>
  );
}
