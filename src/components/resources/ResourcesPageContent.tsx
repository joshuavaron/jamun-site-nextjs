"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Section, Button, TypewriterText } from "@/components/ui";
import {
  BookOpen,
  ArrowRight,
  Scale,
  Calculator,
  PenTool,
  Zap,
  Trophy,
  Compass,
  Lightbulb,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResourceMeta,
  ResourceCategory,
  ProgramConfig,
} from "@/lib/program-resources";
import { useResourceFilters } from "./useResourceFilters";
import ResourceFilters from "./ResourceFilters";
import ResourceGrid from "./ResourceGrid";

interface ResourcesPageContentProps {
  resources: ResourceMeta[];
  programConfig: ProgramConfig;
}

// Learning paths - always expanded
const LEARNING_PATHS = {
  gettingStarted: {
    title: "Getting Started",
    description: "New to Model UN? Start here!",
    icon: Compass,
    color: "bg-teal-500",
    borderColor: "border-teal-200",
    bgColor: "bg-teal-50",
    slugs: ["delegate-handbook", "rules-of-procedure", "public-speaking-tips"],
  },
  writingSkills: {
    title: "Writing Skills",
    description: "Position papers & resolutions",
    icon: PenTool,
    color: "bg-orange-500",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
    slugs: ["writing-position-papers", "resolution-writing-guide", "ga-position-paper-outline", "draft-resolution-outline"],
  },
  crisisCommittees: {
    title: "Crisis Committees",
    description: "Fast-paced & strategic",
    icon: Zap,
    color: "bg-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    slugs: ["crisis-guide", "crisis-position-paper-outline", "directive-outline", "example-directive", "example-crisis-note"],
  },
  levelUp: {
    title: "Level Up",
    description: "Advanced strategies",
    icon: Trophy,
    color: "bg-purple-500",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
    slugs: ["advanced-debate-strategies", "country-research-guide", "ga-guide"],
  },
};

// Get the program icon component
function ProgramIcon({ iconName, className }: { iconName: ProgramConfig["iconName"]; className?: string }) {
  switch (iconName) {
    case "Scale":
      return <Scale className={className} />;
    case "Calculator":
      return <Calculator className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

// Learning Path Card - always expanded, no toggle
function LearningPathCard({
  path,
  resources,
  basePath,
}: {
  path: typeof LEARNING_PATHS.gettingStarted;
  resources: ResourceMeta[];
  basePath: string;
}) {
  const PathIcon = path.icon;
  const pathResources = resources.filter(r => path.slugs.includes(r.slug));

  if (pathResources.length === 0) return null;

  return (
    <div className={cn("bg-white rounded-xl border-2 overflow-hidden", path.borderColor)}>
      {/* Header */}
      <div className={cn("p-4 flex items-center gap-4", path.bgColor)}>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", path.color)}>
          <PathIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{path.title}</h3>
          <p className="text-sm text-gray-600">{path.description}</p>
        </div>
      </div>

      {/* Resources - always visible */}
      <div className="p-4 space-y-2">
        {pathResources.map((resource, index) => (
          <Link
            key={resource.slug}
            href={`${basePath}/${resource.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
          >
            <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0", path.color)}>
              {index + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {resource.title}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesPageContent({
  resources,
  programConfig,
}: ResourcesPageContentProps) {
  const t = useTranslations(programConfig.translationNamespace);
  const { basePath, iconName } = programConfig;

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categoryOptions,
    filteredResources,
    hasActiveFilters,
    clearFilters,
  } = useResourceFilters(resources);

  const getCategoryName = (category: ResourceCategory): string => {
    const categoryMap: Record<ResourceCategory, string> = {
      Skills: t("categorySkills"),
      Background: t("categoryBackground"),
      Rules: t("categoryRules"),
      Reference: t("categoryReference"),
      Examples: t("categoryExamples"),
      Strategy: t("categoryStrategy"),
    };
    return categoryMap[category] || category;
  };

  // Empty state
  if (resources.length === 0) {
    return (
      <main>
        <Section background="white" className="py-24">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
              <ProgramIcon iconName={iconName} className="w-10 h-10 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {t("comingSoonTitle")}
            </h1>
            <p className="text-gray-600">
              {t("comingSoonDescription")}
            </p>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section - matching site style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-emerald-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
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
                FREE Delegate Resources
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text="Everything You Need to " delay={0.3} />
                <TypewriterText
                  text="Succeed"
                  delay={0.3 + 22 * 0.03}
                  className="bg-gradient-to-r from-emerald-600 via-jamun-blue to-emerald-600 bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Guides, templates, and examples created by experienced delegates. Whether you&apos;re preparing for your first conference or aiming for Best Delegate, we&apos;ve got you covered.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="#resources" size="lg" className="group">
                  Browse Resources
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/modelun/committees" variant="outline" size="lg">
                  Explore Committees
                </Button>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-6 mt-8"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600"><strong className="text-gray-900">{resources.length}</strong> Resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600"><strong className="text-gray-900">{resources.filter(r => r.featured).length}</strong> Must-Reads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600"><strong className="text-emerald-600">100%</strong> Free</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Position Paper Writer Tool */}
            {programConfig.type === "modelun" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Link
                  href={`${basePath}/position-paper-writer`}
                  className="block bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-shadow group relative overflow-hidden"
                >
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">NEW TOOL</span>
                      <span className="text-xs font-medium bg-emerald-500/80 px-2.5 py-1 rounded-full">FREE</span>
                    </div>

                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                      <PenTool className="w-7 h-7" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Position Paper Writer</h2>

                    <p className="text-white/80 text-base mb-6 leading-relaxed">
                      Write your position paper step-by-step with our guided tool. Save drafts, get formatting help, and export when you&apos;re done.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Step-by-step guidance
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Save multiple drafts
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Export to PDF
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-white font-semibold">
                      Start Writing
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <Section background="gray" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-jamun-blue/10 flex items-center justify-center">
              <Compass className="w-6 h-6 text-jamun-blue" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Learning Paths</h2>
              <p className="text-gray-600">Follow a guided journey based on your goals</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(LEARNING_PATHS).map(([key, path]) => (
              <LearningPathCard
                key={key}
                path={path}
                resources={resources}
                basePath={basePath}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* All Resources Section */}
      <Section background="white" className="py-16 md:py-20" id="resources">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">All Resources</h2>
              <p className="text-gray-600">Browse our complete library of {resources.length} resources</p>
            </div>
          </div>

          {/* Search and filters */}
          <ResourceFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryOptions={categoryOptions}
            filteredResources={filteredResources}
            totalCount={resources.length}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            getCategoryName={getCategoryName}
            searchPlaceholder={t("searchPlaceholder")}
            noResultsTitle={t("noResultsTitle")}
            noResultsDescription={t("noResultsDescription")}
            clearFiltersLabel={t("clearFilters")}
          />

          {/* Resources grid */}
          {filteredResources.length > 0 && (
            <ResourceGrid
              resources={filteredResources}
              basePath={basePath}
              translationNamespace={programConfig.translationNamespace}
            />
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gray" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20">
              <Rocket className="w-4 h-4" />
              Ready to compete?
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Put Your Knowledge to the{" "}
              <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
                Test
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              You&apos;ve got the resources. Now join a conference and experience the excitement of Model UN firsthand!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/register" size="lg" className="group">
                Register for a Conference
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/modelun/committees" variant="outline" size="lg">
                Explore Committees
              </Button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Questions? Email us at{" "}
              <a href={`mailto:${programConfig.contactEmail}`} className="text-jamun-blue hover:underline font-medium">
                {programConfig.contactEmail}
              </a>
            </p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
