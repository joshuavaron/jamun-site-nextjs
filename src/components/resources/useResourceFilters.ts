"use client";

import { useState, useMemo } from "react";
import { ResourceMeta, ResourceCategory } from "@/lib/program-resources";

export interface CategoryOption {
  name: ResourceCategory;
  count: number;
}

export interface UseResourceFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ResourceCategory | null;
  setSelectedCategory: (category: ResourceCategory | null) => void;
  categoryOptions: CategoryOption[];
  filteredResources: ResourceMeta[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function useResourceFilters(resources: ResourceMeta[]): UseResourceFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);

  // Get category counts
  const categoryOptions = useMemo(() => {
    const counts: Record<ResourceCategory, number> = {
      Skills: 0, Background: 0, Rules: 0, Reference: 0, Examples: 0, Strategy: 0,
    };
    resources.forEach(r => counts[r.category]++);
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => ({ name: name as ResourceCategory, count }));
  }, [resources]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  const hasActiveFilters = selectedCategory !== null || searchQuery.length > 0;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categoryOptions,
    filteredResources,
    hasActiveFilters,
    clearFilters,
  };
}
