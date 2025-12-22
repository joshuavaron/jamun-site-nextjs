"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const exploreItems = [
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-explore-dropdown]")) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
            {/* Explore Dropdown */}
            <div className="relative" data-explore-dropdown>
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-jamun-blue font-medium transition-colors cursor-pointer"
              >
                Explore
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
                    {exploreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsExploreOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-jamun-blue/5 hover:text-jamun-blue transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div
              className={cn(
                "flex items-center rounded-full transition-all duration-300 h-9 w-52",
                isSearchFocused
                  ? "bg-white shadow-md ring-1 ring-gray-200"
                  : "bg-gray-100"
              )}
            >
              <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
                style={{ outline: "none", border: "none", boxShadow: "none" }}
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
                alt="The Junior Assembly of the Model United Nations"
                fill
                className="object-contain object-left nav:object-center"
                priority
              />
            </div>
          </Link>

          {/* Right side: CTA Buttons */}
          <div className="hidden nav:flex items-center gap-3 ml-auto">
            <Link
              href="/grants"
              className="text-gray-700 hover:text-jamun-blue font-medium transition-colors px-4 py-2"
            >
              Grants
            </Link>
            <Button href="/donate" variant="accent" size="sm">
              Donate
            </Button>
            <Button href="/register" variant="primary" size="sm">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="nav:hidden p-2 text-gray-700 hover:text-jamun-blue transition-colors ml-auto"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              {/* Mobile Search - matches desktop style */}
              <div className="flex items-center bg-gray-100 rounded-full h-10 mb-4">
                <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
                  style={{ outline: "none", border: "none", boxShadow: "none" }}
                />
              </div>

              {exploreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-gray-700 hover:text-jamun-blue font-medium py-2 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Button href="/grants" variant="ghost" className="w-full bg-gray-100">
                  Grants
                </Button>
                <Button href="/donate" variant="accent" className="w-full">
                  Donate
                </Button>
                <Button href="/register" variant="primary" className="w-full">
                  Register
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
