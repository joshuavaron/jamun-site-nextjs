"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  Globe,
  ArrowRight,
  Search,
  Users,
  Sparkles,
  GraduationCap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommitteeMeta } from "@/lib/committees";

// Shifting topic component for Ad-Hoc committee
function ShiftingTopic({ topics }: { topics: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (topics.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topics.length);
    }, 100);
    return () => clearInterval(interval);
  }, [topics.length]);

  if (topics.length === 0) return <span>CLASSIFIED</span>;

  return (
    <span className="font-mono">{topics[currentIndex]}</span>
  );
}

interface CommitteesPageContentProps {
  committees: CommitteeMeta[];
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

// Size categories for filtering
type SizeCategory = "Small" | "Medium" | "Large";

function getSizeCategory(delegateCount: number): SizeCategory {
  if (delegateCount < 24) return "Small";
  if (delegateCount < 40) return "Medium";
  return "Large";
}

function getSizeLabel(size: SizeCategory): string {
  switch (size) {
    case "Small":
      return "Small (<24)";
    case "Medium":
      return "Medium (24-39)";
    case "Large":
      return "Large (40+)";
  }
}

// Committee type options
type CommitteeType =
  | "General Assembly"
  | "Crisis"
  | "Security Council"
  | "Specialized Agency"
  | "Regional Body";

// Difficulty options
type DifficultyLevel = "Beginner-Friendly" | "Intermediate" | "Advanced";

export default function CommitteesPageContent({
  committees,
}: CommitteesPageContentProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<CommitteeType>>(
    new Set()
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<DifficultyLevel>
  >(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<SizeCategory>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle functions for multi-select
  const toggleType = (type: CommitteeType) => {
    const newSet = new Set(selectedTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedTypes(newSet);
  };

  const toggleDifficulty = (difficulty: DifficultyLevel) => {
    const newSet = new Set(selectedDifficulties);
    if (newSet.has(difficulty)) {
      newSet.delete(difficulty);
    } else {
      newSet.add(difficulty);
    }
    setSelectedDifficulties(newSet);
  };

  const toggleSize = (size: SizeCategory) => {
    const newSet = new Set(selectedSizes);
    if (newSet.has(size)) {
      newSet.delete(size);
    } else {
      newSet.add(size);
    }
    setSelectedSizes(newSet);
  };

  const clearAllFilters = () => {
    setSelectedTypes(new Set());
    setSelectedDifficulties(new Set());
    setSelectedSizes(new Set());
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedTypes.size > 0 ||
    selectedDifficulties.size > 0 ||
    selectedSizes.size > 0 ||
    searchQuery.length > 0;

  // Build type options with counts
  const allTypeOptions: { name: CommitteeType; count: number }[] = [
    {
      name: "General Assembly" as CommitteeType,
      count: committees.filter((c) => c.category === "General Assembly").length,
    },
    {
      name: "Crisis" as CommitteeType,
      count: committees.filter((c) => c.category === "Crisis").length,
    },
    {
      name: "Security Council" as CommitteeType,
      count: committees.filter((c) => c.category === "Security Council").length,
    },
    {
      name: "Specialized Agency" as CommitteeType,
      count: committees.filter((c) => c.category === "Specialized Agency")
        .length,
    },
    {
      name: "Regional Body" as CommitteeType,
      count: committees.filter((c) => c.category === "Regional Body").length,
    },
  ];
  const typeOptions = allTypeOptions.filter((t) => t.count > 0);

  // Difficulty options
  const difficultyOptions: DifficultyLevel[] = [
    "Beginner-Friendly",
    "Intermediate",
    "Advanced",
  ];

  // Size options
  const sizeOptions: SizeCategory[] = ["Small", "Medium", "Large"];

  const filteredCommittees = committees.filter((committee) => {
    const matchesType =
      selectedTypes.size === 0 ||
      selectedTypes.has(committee.category as CommitteeType);
    const matchesDifficulty =
      selectedDifficulties.size === 0 ||
      selectedDifficulties.has(committee.level as DifficultyLevel);
    const matchesSize =
      selectedSizes.size === 0 ||
      selectedSizes.has(getSizeCategory(committee.delegateCount));
    const matchesSearch =
      committee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      committee.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesDifficulty && matchesSize && matchesSearch;
  });

  // Count totals
  const totalDelegates = committees.reduce(
    (sum, c) => sum + c.delegateCount,
    0
  );
  const beginnerCount = committees.filter(
    (c) => c.level === "Beginner-Friendly"
  ).length;

  return (
    <main>
      {/* Hero Section with Filters */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-sky-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-sky-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-jamun-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-100/20 to-indigo-100/20 rounded-full blur-3xl -z-10" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20"
              >
                <Globe className="w-4 h-4" />
                Model UN Committees
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Explore Our{" "}
                <span className="bg-gradient-to-r from-jamun-blue via-sky-500 to-jamun-blue bg-clip-text text-transparent">
                  Committees
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                From the General Assembly to specialized agencies, discover the
                diverse committees where you can represent nations, debate
                global issues, and develop diplomatic skills.
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
                  placeholder="Search committees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-jamun-blue/30 focus:border-jamun-blue transition-all"
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
                  <Globe className="w-5 h-5 text-jamun-blue" />
                  <span className="text-sm">
                    <strong className="text-gray-900">
                      {committees.length}
                    </strong>{" "}
                    Committees
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-sky-600" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{totalDelegates}+</strong>{" "}
                    Delegate Spots
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">
                    <strong className="text-gray-900">{beginnerCount}</strong>{" "}
                    Beginner-Friendly
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
                  Filter Committees
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-jamun-blue hover:text-jamun-blue-dark font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((type) => (
                      <button
                        key={type.name}
                        onClick={() => toggleType(type.name)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                          selectedTypes.has(type.name)
                            ? "bg-jamun-blue text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {type.name}
                        <span
                          className={cn(
                            "ml-1.5 text-xs",
                            selectedTypes.has(type.name)
                              ? "text-white/70"
                              : "text-gray-400"
                          )}
                        >
                          ({type.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Difficulty
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => toggleDifficulty(difficulty)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                          selectedDifficulties.has(difficulty)
                            ? difficulty === "Beginner-Friendly"
                              ? "bg-green-500 text-white"
                              : difficulty === "Intermediate"
                                ? "bg-amber-500 text-white"
                                : "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {difficulty === "Beginner-Friendly"
                          ? "Beginner"
                          : difficulty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                          selectedSizes.has(size)
                            ? "bg-sky-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {getSizeLabel(size)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results count */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {filteredCommittees.length}
                  </strong>{" "}
                  of {committees.length} committees
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Committees Grid */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Our Committees"
          title="Find Your Committee"
          subtitle="Each committee offers a unique experience. Browse to find the perfect fit for your interests and experience level."
        />

        {filteredCommittees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No committees found
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
            key={`${Array.from(selectedTypes).join("-")}-${Array.from(selectedDifficulties).join("-")}-${Array.from(selectedSizes).join("-")}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCommittees.map((committee) => (
              <motion.div key={committee.slug} variants={itemVariants}>
                <Link href={`/modelun/committees/${committee.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Header: Abbreviation + Level Badge */}
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {committee.abbreviation}
                      </h3>
                      <span
                        className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0",
                          committee.level === "Beginner-Friendly"
                            ? "bg-green-100 text-green-700"
                            : committee.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        )}
                      >
                        {committee.level === "Beginner-Friendly"
                          ? "Beginner"
                          : committee.level}
                      </span>
                    </div>

                    {/* Category */}
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {committee.category}
                    </p>

                    {/* Topic */}
                    <h4 className="text-lg font-semibold text-jamun-blue mb-2 group-hover:text-jamun-blue-dark transition-colors">
                      {committee.isAdHoc && committee.redHerringTopics && committee.redHerringTopics.length > 0 ? (
                        <ShiftingTopic topics={committee.redHerringTopics} />
                      ) : (
                        committee.topic
                      )}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                      {committee.description}
                    </p>

                    {/* Footer: Delegate count */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{committee.delegateCount} delegates</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Sparkles className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              Ready to Join?
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Find Your Place on the{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-sky-500 to-jamun-blue bg-clip-text text-transparent">
              World Stage
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Whether you&apos;re a first-time delegate or a seasoned veteran,
            there&apos;s a committee waiting for you. Register now to secure
            your spot at our next conference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                Register for Model UN
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/modelun" variant="outline" size="lg">
                Learn About Model UN
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
            Have questions about committees?{" "}
            <a
              href="mailto:modelun@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              Contact our Model UN team
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
