"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Video,
  File,
  Clock,
  Star,
  Calendar,
  User,
  Scale,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Resource, ResourceFormat, ResourceCategory, ProgramConfig } from "@/lib/program-resources";

interface ResourceHeaderProps {
  resource: Resource;
  programConfig: ProgramConfig;
  getCategoryName: (category: string) => string;
  allResourcesLabel: string;
  featuredLabel: string;
  pagesLabel: string;
}

// Format icons - returns JSX element
function renderFormatIcon(format: ResourceFormat, className?: string) {
  switch (format) {
    case "Video":
      return <Video className={className} />;
    case "PDF":
      return <FileText className={className} />;
    case "Worksheet":
      return <File className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

// Format colors
function getFormatColor(format: ResourceFormat) {
  switch (format) {
    case "Video":
      return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
    case "PDF":
      return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" };
    case "Worksheet":
      return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
  }
}

// Category colors (topic-based categories per CONTENT-CREATION.md)
const categoryColors: Record<ResourceCategory, { bg: string; text: string; border: string }> = {
  Skills: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  Background: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  Rules: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  Reference: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  Examples: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
  Strategy: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
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

export default function ResourceHeader({
  resource,
  programConfig,
  getCategoryName,
  allResourcesLabel,
  featuredLabel,
  pagesLabel,
}: ResourceHeaderProps) {
  const { colors, basePath, iconName } = programConfig;
  const formatColor = getFormatColor(resource.format);
  const categoryColor = categoryColors[resource.category] || categoryColors.Skills;

  return (
    <section className={cn(
      "relative overflow-hidden bg-gradient-to-br py-16 md:py-20 lg:py-24",
      colors.gradientFrom,
      colors.gradientVia,
      colors.gradientTo
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href={basePath}
            className={cn(
              "inline-flex items-center gap-2 text-gray-600 transition-colors group",
              `hover:${colors.primaryText}`
            )}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {allResourcesLabel}
          </Link>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {/* Format badge */}
          <span
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border",
              formatColor.bg,
              formatColor.text,
              formatColor.border
            )}
          >
            {renderFormatIcon(resource.format, "w-4 h-4")}
            {resource.format}
          </span>

          {/* Category badge */}
          <span
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border",
              categoryColor.bg,
              categoryColor.text,
              categoryColor.border
            )}
          >
            <ProgramIcon iconName={iconName} className="w-4 h-4" />
            {getCategoryName(resource.category)}
          </span>

          {/* Featured badge */}
          {resource.featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              <Star className="w-4 h-4" />
              {featuredLabel}
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4"
        >
          {resource.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
        >
          {resource.description}
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
        >
          {resource.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{resource.author}</span>
            </div>
          )}
          {resource.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(resource.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.pages && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{resource.pages} {pagesLabel}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
