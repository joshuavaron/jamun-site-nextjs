"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ResourceCategory } from "@/lib/program-resources";
import { CategoryOption } from "./useResourceFilters";

interface ResourceFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ResourceCategory | null;
  setSelectedCategory: (category: ResourceCategory | null) => void;
  categoryOptions: CategoryOption[];
  filteredResources: { length: number };
  totalCount: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  getCategoryName: (category: ResourceCategory) => string;
  searchPlaceholder: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFiltersLabel: string;
}

export default function ResourceFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
  filteredResources,
  totalCount,
  hasActiveFilters,
  clearFilters,
  getCategoryName,
  searchPlaceholder,
  noResultsTitle,
  noResultsDescription,
  clearFiltersLabel,
}: ResourceFiltersProps) {
  return (
    <div className="bg-warm-gray rounded-xl p-4 md:p-6 mb-8">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-jamun-blue/30 focus:border-jamun-blue transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            selectedCategory === null
              ? "bg-jamun-blue text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
          )}
        >
          All ({totalCount})
        </button>
        {categoryOptions.map((category) => (
          <button
            type="button"
            key={category.name}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedCategory === category.name
                ? "bg-jamun-blue text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
            )}
          >
            {getCategoryName(category.name)} ({category.count})
          </button>
        ))}
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredResources.length} of {totalCount} resources
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-jamun-blue font-medium hover:text-jamun-blue/80 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      )}

      {/* Empty state rendered inline when no results */}
      {filteredResources.length === 0 && hasActiveFilters && (
        <div className="text-center py-16 mt-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {noResultsTitle}
          </h3>
          <p className="text-gray-600 mb-4">
            {noResultsDescription}
          </p>
          <Button type="button" onClick={clearFilters} variant="outline">
            {clearFiltersLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
