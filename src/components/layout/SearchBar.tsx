"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchDropdown } from "@/components/ui";
import type { SearchResult } from "@/components/ui";

interface SearchBarProps {
  searchQuery: string;
  isSearchFocused: boolean;
  selectedIndex: number;
  searchResults: SearchResult[];
  showDropdown: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchRef: React.RefObject<HTMLDivElement | null>;
  placeholder: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onResultClick: () => void;
}

export function SearchBar({
  searchQuery,
  isSearchFocused,
  selectedIndex,
  searchResults,
  showDropdown,
  inputRef,
  searchRef,
  placeholder,
  onSearchChange,
  onSearchFocus,
  onKeyDown,
  onResultClick,
}: SearchBarProps) {
  return (
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
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          onKeyDown={onKeyDown}
          className="no-focus-outline w-full bg-transparent px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      <SearchDropdown
        results={searchResults}
        selectedIndex={selectedIndex}
        onResultClick={onResultClick}
        show={showDropdown}
      />
    </div>
  );
}
