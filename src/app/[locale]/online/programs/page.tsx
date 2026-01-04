import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BookOpen, ArrowRight, Sparkles, Scale, Calculator } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OnlinePrograms" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OnlinePrograms");

  const programs = [
    {
      key: "modelun",
      icon: Sparkles,
      color: "bg-blue-500",
      borderColor: "border-blue-200",
      href: "/online/programs/modelun",
    },
    {
      key: "mocktrial",
      icon: Scale,
      color: "bg-purple-500",
      borderColor: "border-purple-200",
      href: "/online/programs/mocktrial",
    },
    {
      key: "mathletes",
      icon: Calculator,
      color: "bg-green-500",
      borderColor: "border-green-200",
      href: "/online/programs/mathletes",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-gray-600 mt-1">{t("subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => {
          const Icon = program.icon;
          return (
            <div
              key={program.key}
              className={`bg-white rounded-2xl border-2 ${program.borderColor} p-6 shadow-sm`}
            >
              <div
                className={`w-12 h-12 ${program.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`${program.key}Title`)}
              </h2>

              <p className="text-gray-600 mb-4">{t(`${program.key}Desc`)}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <BookOpen className="w-4 h-4" />
                <span>{t("comingSoon")}</span>
              </div>

              <div className="w-full bg-gray-100 rounded-lg py-2.5 px-4 text-center text-gray-400 cursor-not-allowed flex items-center justify-center gap-2">
                {t("exploreProgram")}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Notice */}
      <div className="mt-12 bg-jamun-blue/5 rounded-2xl p-8 text-center">
        <Sparkles className="w-12 h-12 text-jamun-blue mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t("comingSoonTitle")}
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          {t("comingSoonDesc")}
        </p>
      </div>
    </div>
  );
}
