"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  ArrowRight,
  FileText,
  Video,
  File,
  Star,
  Download,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResourceMeta,
  ResourceCategory,
  ResourceFormat,
} from "@/lib/program-resources";

// Format icons and colors
const FORMAT_CONFIG: Record<ResourceFormat, { icon: typeof FileText; bg: string; text: string }> = {
  Article: { icon: BookOpen, bg: "bg-emerald-100", text: "text-emerald-700" },
  PDF: { icon: FileText, bg: "bg-blue-100", text: "text-blue-700" },
  Video: { icon: Video, bg: "bg-red-100", text: "text-red-700" },
  Worksheet: { icon: File, bg: "bg-amber-100", text: "text-amber-700" },
};

// Category colors
const CATEGORY_COLORS: Record<ResourceCategory, string> = {
  Skills: "bg-teal-100 text-teal-700 border-teal-200",
  Background: "bg-blue-100 text-blue-700 border-blue-200",
  Rules: "bg-purple-100 text-purple-700 border-purple-200",
  Reference: "bg-amber-100 text-amber-700 border-amber-200",
  Examples: "bg-pink-100 text-pink-700 border-pink-200",
  Strategy: "bg-orange-100 text-orange-700 border-orange-200",
};

// Resource Card
function ResourceCard({
  resource,
  basePath,
  t,
}: {
  resource: ResourceMeta;
  basePath: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const formatConfig = FORMAT_CONFIG[resource.format] || FORMAT_CONFIG.Article;
  const FormatIcon = formatConfig.icon;
  const categoryColor = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS.Skills;

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

  return (
    <Link
      href={`${basePath}/${resource.slug}`}
      className="group block bg-white rounded-xl border-2 border-gray-100 hover:border-jamun-blue/30 hover:shadow-md transition-all duration-200 h-full"
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", formatConfig.bg)}>
            <FormatIcon className={cn("w-5 h-5", formatConfig.text)} />
          </div>
          {resource.featured && (
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-medium">{t("featured")}</span>
            </div>
          )}
        </div>

        <span className={cn("inline-flex self-start px-2 py-0.5 text-xs font-medium rounded border mb-2", categoryColor)}>
          {getCategoryName(resource.category)}
        </span>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-jamun-blue transition-colors line-clamp-2">
          {resource.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-2 mb-3">
          {resource.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
          {resource.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {resource.duration}
            </span>
          )}
          {resource.pages && (
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              {resource.pages} {t("pages")}
            </span>
          )}
          {resource.downloadUrl && (
            <span className="flex items-center gap-1 text-jamun-blue">
              <Download className="w-3.5 h-3.5" />
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-jamun-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Grid props
interface ResourceGridProps {
  resources: ResourceMeta[];
  basePath: string;
  translationNamespace: string;
}

export default function ResourceGrid({
  resources,
  basePath,
  translationNamespace,
}: ResourceGridProps) {
  const t = useTranslations(translationNamespace);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.slug}
          resource={resource}
          basePath={basePath}
          t={t}
        />
      ))}
    </div>
  );
}
