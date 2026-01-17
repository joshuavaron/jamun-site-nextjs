"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, Save, Loader2, PenLine, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, Section } from "@/components/ui";
import {
  BGWriterProvider,
  useBGWriter,
  LayerTabs,
  ProgressBar,
  DraftsSidebar,
  BookmarksSidebar,
  ExportImportPanel,
  ComprehensionLayer,
  IdeaFormationLayer,
  ParagraphComponentsLayer,
  FinalDraftLayer,
} from "@/components/tools/bg-writer";

function BGWriterContent() {
  const t = useTranslations("BGWriter");
  const { draft, currentLayer, isDirty, isSaving, saveDraft, createNewDraft } = useBGWriter();

  const renderLayer = () => {
    switch (currentLayer) {
      case "comprehension":
        return <ComprehensionLayer />;
      case "ideaFormation":
        return <IdeaFormationLayer />;
      case "paragraphComponents":
        return <ParagraphComponentsLayer />;
      case "finalPaper":
        return <FinalDraftLayer />;
      default:
        return <ComprehensionLayer />;
    }
  };

  return (
    <main>
      {/* Hero Section - matches ResourcePageContent style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-sky-50 py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-r from-emerald-400/10 to-sky-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-gradient-to-r from-jamun-blue/10 to-emerald-400/10 blur-3xl" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link
              href="/modelun/resources"
              className="group inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t("backToResources")}
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex flex-wrap items-center gap-2"
          >
            {/* Format badge - Interactive Tool */}
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700">
              <PenLine className="h-4 w-4" />
              Interactive Tool
            </span>
            {/* Category badge - Skills */}
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700">
              <BookOpen className="h-4 w-4" />
              Skills
            </span>
            {/* Free badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
              {t("badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-lg leading-relaxed text-gray-600 md:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <Section background="white" className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Top bar with save and export */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={saveDraft}
                variant="primary"
                size="sm"
                disabled={!draft || !isDirty}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? t("actions.saved") : t("actions.save")}
              </Button>
              {draft && <ProgressBar />}
            </div>
            <ExportImportPanel />
          </div>

          {/* Main layout */}
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Sidebar */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:z-10 lg:self-start">
              <DraftsSidebar />
              <BookmarksSidebar />
            </div>

            {/* Main Content Area */}
            <div className="min-w-0">
              {draft ? (
                <div className="space-y-6">
                  {/* Layer tabs */}
                  <LayerTabs />

                  {/* Layer content */}
                  <div className="min-h-[400px]">{renderLayer()}</div>
                </div>
              ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-jamun-blue/10">
                    <Save className="h-8 w-8 text-jamun-blue" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {t("drafts.noDrafts")}
                  </h3>
                  <p className="mb-6 max-w-sm text-sm text-gray-500">
                    {t("drafts.startNew")}
                  </p>
                  <Button onClick={createNewDraft} variant="primary">
                    {t("newDraft")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default function BGWriterPageContent() {
  return (
    <BGWriterProvider>
      <BGWriterContent />
    </BGWriterProvider>
  );
}
