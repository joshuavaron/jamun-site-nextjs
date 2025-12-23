"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  BookOpen,
  ArrowRight,
  Search,
  FileText,
  Video,
  File,
  Sparkles,
  X,
  Download,
  Clock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResourceMeta,
  ResourceCategory,
  ResourceFormat,
} from "@/lib/resources";

interface ResourcesPageContentProps {
  resources: ResourceMeta[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Format icons
function getFormatIcon(format: ResourceFormat) {
  switch (format) {
    case "Video":
      return Video;
    case "PDF":
      return FileText;
    case "Template":
    case "Worksheet":
      return File;
    default:
      return BookOpen;
  }
}

// Format colors
function getFormatColor(format: ResourceFormat) {
  switch (format) {
    case "Video":
      return "bg-red-100 text-red-700";
    case "PDF":
      return "bg-blue-100 text-blue-700";
    case "Template":
      return "bg-purple-100 text-purple-700";
    case "Worksheet":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ResourcesPageContent({
  resources,
}: ResourcesPageContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<
    Set<ResourceCategory>
  >(new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<ResourceFormat>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle functions for multi-select
  const toggleCategory = (category: ResourceCategory) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setSelectedCategories(newSet);
  };

  const toggleFormat = (format: ResourceFormat) => {
    const newSet = new Set(selectedFormats);
    if (newSet.has(format)) {
      newSet.delete(format);
    } else {
      newSet.add(format);
    }
    setSelectedFormats(newSet);
  };

  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedFormats(new Set());
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategories.size > 0 ||
    selectedFormats.size > 0 ||
    searchQuery.length > 0;

  // Build category options with counts
  const allCategoryOptions: { name: ResourceCategory; count: number }[] = [
    {
      name: "Research Guide" as ResourceCategory,
      count: resources.filter((r) => r.category === "Research Guide").length,
    },
    {
      name: "Position Papers" as ResourceCategory,
      count: resources.filter((r) => r.category === "Position Papers").length,
    },
    {
      name: "Public Speaking" as ResourceCategory,
      count: resources.filter((r) => r.category === "Public Speaking").length,
    },
    {
      name: "Parliamentary Procedure" as ResourceCategory,
      count: resources.filter((r) => r.category === "Parliamentary Procedure")
        .length,
    },
    {
      name: "Country Profiles" as ResourceCategory,
      count: resources.filter((r) => r.category === "Country Profiles").length,
    },
    {
      name: "Sample Documents" as ResourceCategory,
      count: resources.filter((r) => r.category === "Sample Documents").length,
    },
    {
      name: "Video Tutorials" as ResourceCategory,
      count: resources.filter((r) => r.category === "Video Tutorials").length,
    },
  ];
  const categoryOptions = allCategoryOptions.filter((c) => c.count > 0);

  // Format options
  const allFormatOptions: { name: ResourceFormat; count: number }[] = [
    {
      name: "Article" as ResourceFormat,
      count: resources.filter((r) => r.format === "Article").length,
    },
    {
      name: "PDF" as ResourceFormat,
      count: resources.filter((r) => r.format === "PDF").length,
    },
    {
      name: "Video" as ResourceFormat,
      count: resources.filter((r) => r.format === "Video").length,
    },
    {
      name: "Template" as ResourceFormat,
      count: resources.filter((r) => r.format === "Template").length,
    },
    {
      name: "Worksheet" as ResourceFormat,
      count: resources.filter((r) => r.format === "Worksheet").length,
    },
  ];
  const formatOptions = allFormatOptions.filter((f) => f.count > 0);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategories.size === 0 ||
      selectedCategories.has(resource.category);
    const matchesFormat =
      selectedFormats.size === 0 || selectedFormats.has(resource.format);
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesFormat && matchesSearch;
  });

  // Count totals
  const featuredCount = resources.filter((r) => r.featured).length;
  const categoryCount = categoryOptions.length;

  return (
    <main>
      {/* Hero Section with Filters */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-sky-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-blue/10 to-emerald-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-100/20 to-emerald-100/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200"
              >
                <BookOpen className="w-4 h-4" />
                Model UN Resources
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Delegate{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-jamun-blue to-emerald-600 bg-clip-text text-transparent">
                  Resources
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Everything you need to prepare for Model UN success. From
                beginner guides to advanced strategies, find resources tailored
                to your experience level.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative max-w-md"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-6 mt-8"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{resources.length}</strong>{" "}
                    Resources
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Layers className="w-5 h-5 text-jamun-blue" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{categoryCount}</strong>{" "}
                    Categories
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{featuredCount}</strong>{" "}
                    Featured
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Filters Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Filter Resources
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => toggleCategory(category.name)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                          selectedCategories.has(category.name)
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {category.name}
                        <span
                          className={cn(
                            "ml-1.5 text-xs",
                            selectedCategories.has(category.name)
                              ? "text-white/70"
                              : "text-gray-400"
                          )}
                        >
                          ({category.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                {formatOptions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Format
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {formatOptions.map((format) => (
                        <button
                          key={format.name}
                          onClick={() => toggleFormat(format.name)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                            selectedFormats.has(format.name)
                              ? "bg-jamun-blue text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          {format.name}
                          <span
                            className={cn(
                              "ml-1.5 text-xs",
                              selectedFormats.has(format.name)
                                ? "text-white/70"
                                : "text-gray-400"
                            )}
                          >
                            ({format.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results count */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {filteredResources.length}
                  </strong>{" "}
                  of {resources.length} resources
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Learn & Prepare"
          title="Find Your Resources"
          subtitle="Browse our collection of guides, tutorials, and templates designed to help you succeed in Model UN."
        />

        {filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <Button onClick={clearAllFilters} variant="outline">
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={`${Array.from(selectedCategories).join("-")}-${Array.from(selectedFormats).join("-")}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource) => {
              const FormatIcon = getFormatIcon(resource.format);
              return (
                <motion.div key={resource.slug} variants={itemVariants}>
                  <Link href={`/modelun/resources/${resource.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Header: Format Icon + Featured Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            getFormatColor(resource.format)
                          )}
                        >
                          <FormatIcon className="w-5 h-5" />
                        </div>
                        {resource.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        {resource.category}
                      </p>

                      {/* Title */}
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {resource.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                        {resource.description}
                      </p>

                      {/* Footer: Meta info */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {resource.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {resource.duration}
                            </span>
                          )}
                          {resource.pages && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {resource.pages} pages
                            </span>
                          )}
                          {resource.downloadUrl && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <Download className="w-4 h-4" />
                              Download
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Section>

      {/* CTA Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-100 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Ready to Compete?
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Put Your Knowledge to the{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-jamun-blue to-emerald-600 bg-clip-text text-transparent">
              Test
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            You&apos;ve got the resources. Now it&apos;s time to join a
            conference and experience the thrill of Model UN firsthand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                Register for Model UN
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/modelun/committees" variant="outline" size="lg">
                Explore Committees
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            Have questions about resources?{" "}
            <a
              href="mailto:modelun@jamun.org"
              className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
            >
              Contact our Model UN team
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
