"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { SearchResult } from "@/components/ui";

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

export function useSearch(t: ReturnType<typeof useTranslations<"Navigation">>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

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

    for (const page of staticPages) {
      const titleMatch = page.title.toLowerCase().includes(query);
      const keywordMatch = page.keywords.some((k: string) => k.includes(query));
      if (titleMatch || keywordMatch) {
        results.push({ title: page.title, url: page.url, type: "page" });
      }
    }

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

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchFocused(false);
  }, []);

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0 && searchResults.length > 0;

  return {
    searchQuery,
    isSearchFocused,
    selectedIndex,
    inputRef,
    searchResults,
    showDropdown,
    handleKeyDown,
    handleSearchChange,
    handleSearchFocus,
    clearSearch,
    setIsSearchFocused,
  };
}
