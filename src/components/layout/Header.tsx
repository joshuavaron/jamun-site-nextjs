"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Globe, Check, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const fontBody = { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" };

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "zh", label: "中文", name: "中文" },
  { code: "ar", label: "عر", name: "العربية" },
  { code: "hi", label: "हि", name: "हिन्दी" },
  { code: "tr", label: "TR", name: "Türkçe" },
];

export function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const EXPLORE_ITEMS = [
    { label: t("programs"), href: "/programs" },
    { label: t("about"), href: "/about" },
    { label: t("supporters"), href: "/supporters" },
    { label: t("blog"), href: "/blog" },
  ];

  const SEARCH_TARGETS = [
    { title: t("searchModelUN"), url: "/modelun" },
    { title: t("searchMockTrial"), url: "/mocktrial" },
    { title: t("searchMathletes"), url: "/mathletes" },
    { title: t("searchPrograms"), url: "/programs" },
    { title: t("searchAbout"), url: "/about" },
    { title: t("searchGrants"), url: "/grants" },
    { title: t("searchDonate"), url: "/donate" },
    { title: t("searchRegister"), url: "/register" },
    { title: t("searchBlog"), url: "/blog" },
    { title: t("searchCommittees"), url: "/modelun/committees" },
  ];

  const activeLocaleData = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-explore]")) setIsExploreOpen(false);
      if (!target.closest("[data-lang]")) setIsLangOpen(false);
      if (!target.closest("[data-search]")) setIsSearchFocused(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const q = searchQuery.trim().toLowerCase();
  const searchResults = q
    ? SEARCH_TARGETS.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 6)
    : [];
  const showSearchDropdown =
    isSearchFocused && q.length > 0 && searchResults.length > 0;

  const handleLocaleChange = (newLocale: Locale) => {
    setIsLangOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 border-b border-black/5"
      style={fontBody}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-between h-14 md:h-16">
          {/* Left: Explore + Search (search appears at lg) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Explore dropdown */}
            <div className="relative" data-explore>
              <button
                onClick={() => setIsExploreOpen((v) => !v)}
                className="flex items-center gap-1 text-[14px] text-neutral-700 hover:text-[#397bce] transition-colors"
              >
                {t("explore")}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isExploreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isExploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/[0.08] py-1.5 z-50"
                  >
                    {EXPLORE_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsExploreOpen(false)}
                        className="block px-4 py-2 text-[14px] text-neutral-700 hover:bg-[#397bce]/5 hover:text-[#397bce] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search — only at lg+, since the absolute-centered logo needs the
                gutter free at md to avoid collision with the right-side CTAs. */}
            <div className="relative hidden lg:block" data-search>
              <div
                className={`flex items-center rounded-full h-9 w-52 transition-all duration-200 ${
                  isSearchFocused
                    ? "bg-white shadow-md ring-1 ring-black/10"
                    : "bg-neutral-100"
                }`}
              >
                <Search className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-transparent px-2 py-1.5 text-[13px] text-neutral-700 placeholder-neutral-400 focus:outline-none"
                />
              </div>
              <AnimatePresence>
                {showSearchDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-black/[0.08] py-1 z-50 overflow-hidden"
                  >
                    {searchResults.map((r) => (
                      <Link
                        key={r.url}
                        href={r.url}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-[13px] text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        {r.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Logo — absolute-centered at md+. The logo is sized
              smaller at md (w-44) than lg (w-52) so it fits between the
              Explore button on the left and the CTA cluster on the right
              at the narrowest md width. */}
          <Link
            href="/"
            className="flex items-center shrink-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            aria-label={t("logoAlt")}
          >
            <div className="relative h-8 w-40 md:h-9 md:w-44 lg:w-52">
              <Image
                src="/images/logos/jamun-blue-side-logo.svg"
                alt={t("logoAlt")}
                fill
                className="object-contain object-left md:object-center"
                priority
              />
            </div>
          </Link>

          {/* Right: Language + Grants + Donate + Register */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-auto">
            {/* Language switcher */}
            <div className="relative" data-lang>
              <button
                onClick={() => setIsLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-[14px] text-neutral-700 hover:text-[#397bce] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{activeLocaleData.label}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-black/[0.08] py-1.5 z-50 min-w-[140px] sm:min-w-[160px] overflow-hidden"
                  >
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLocaleChange(l.code)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors ${
                          locale === l.code
                            ? "text-[#397bce] bg-[#397bce]/5"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <span className={locale === l.code ? "font-medium" : ""}>
                          {l.name}
                        </span>
                        {locale === l.code && (
                          <Check className="w-4 h-4 text-[#397bce]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/grants"
              className="hidden lg:inline text-[14px] text-neutral-700 hover:text-[#397bce] transition-colors"
            >
              {t("grants")}
            </Link>
            <Link
              href="/donate"
              className="px-3 lg:px-4 py-1.5 rounded-full bg-[#f97316] text-white text-[13px] hover:bg-[#ea580c] transition-colors"
            >
              {t("donate")}
            </Link>
            <Link
              href="/register"
              className="px-3 lg:px-4 py-1.5 rounded-full bg-[#397bce] text-white text-[13px] hover:bg-[#2a5fa3] transition-colors"
            >
              {t("register")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2 text-neutral-700 hover:text-[#397bce] transition-colors ml-auto"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <nav className="max-w-[1500px] mx-auto px-4 py-6 space-y-4">
              {/* Mobile language switcher */}
              <div className="flex justify-end mb-2">
                <div className="relative" data-lang>
                  <button
                    onClick={() => setIsLangOpen((v) => !v)}
                    className="flex items-center gap-1.5 text-[14px] text-neutral-700"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{activeLocaleData.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isLangOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-black/[0.08] py-1.5 z-50 min-w-[140px] sm:min-w-[160px] overflow-hidden"
                      >
                        {LOCALES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              handleLocaleChange(l.code);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors ${
                              locale === l.code
                                ? "text-[#397bce] bg-[#397bce]/5"
                                : "text-neutral-700 hover:bg-neutral-50"
                            }`}
                          >
                            <span className={locale === l.code ? "font-medium" : ""}>
                              {l.name}
                            </span>
                            {locale === l.code && (
                              <Check className="w-4 h-4 text-[#397bce]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile search */}
              <div className="relative" data-search>
                <div className="flex items-center bg-neutral-100 rounded-full h-10">
                  <Search className="w-4 h-4 text-neutral-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-transparent px-2 py-1.5 text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none"
                  />
                </div>
                <AnimatePresence>
                  {showSearchDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-black/[0.08] py-1 z-50 overflow-hidden"
                    >
                      {searchResults.map((r) => (
                        <Link
                          key={r.url}
                          href={r.url}
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchFocused(false);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          {r.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-base text-neutral-700 hover:text-[#397bce] font-medium py-2 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-black/5 space-y-3">
                <Link
                  href="/grants"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-5 py-3 rounded-full bg-neutral-100 text-[14px] text-neutral-700 hover:bg-neutral-200 transition-colors"
                >
                  {t("grants")}
                </Link>
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-5 py-3 rounded-full bg-[#f97316] text-white text-[14px] hover:bg-[#ea580c] transition-colors"
                >
                  {t("donate")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-5 py-3 rounded-full bg-[#397bce] text-white text-[14px] hover:bg-[#2a5fa3] transition-colors"
                >
                  {t("register")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
