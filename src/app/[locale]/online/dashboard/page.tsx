import { currentUser } from "@clerk/nextjs/server";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { DashboardCard } from "@/components/online/DashboardCard";
import { Button } from "@/components/ui";
import {
  Trophy,
  Star,
  Award,
  Flame,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OnlineDashboard" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OnlineDashboard");

  const user = await currentUser();

  if (!user) {
    redirect(`/${locale === "en" ? "" : locale + "/"}online/login`);
  }

  const firstName = user.firstName || t("defaultName");

  // Placeholder stats - will be replaced with real data in later phases
  const stats = {
    points: 0,
    level: 1,
    badges: 0,
    streak: 0,
  };

  const programs = [
    {
      key: "modelUN",
      href: "/online/programs/modelun",
      color: "bg-blue-500",
    },
    {
      key: "mockTrial",
      href: "/online/programs/mocktrial",
      color: "bg-purple-500",
    },
    {
      key: "mathletes",
      href: "/online/programs/mathletes",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("welcome", { name: firstName })}
        </h1>
        <p className="text-gray-600 mt-1">{t("welcomeSubtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title={t("totalPoints")}
          value={stats.points}
          icon={<Trophy className="w-5 h-5" />}
        />
        <DashboardCard
          title={t("currentLevel")}
          value={stats.level}
          icon={<Star className="w-5 h-5" />}
        />
        <DashboardCard
          title={t("badgesEarned")}
          value={stats.badges}
          icon={<Award className="w-5 h-5" />}
        />
        <DashboardCard
          title={t("streak")}
          value={stats.streak}
          description={t("days")}
          icon={<Flame className="w-5 h-5" />}
        />
      </div>

      {/* Continue Learning Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-jamun-blue" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t("continueWhere")}
          </h2>
        </div>

        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">{t("nothingStarted")}</p>
          <Button href="/online/programs" variant="primary">
            {t("startLearning")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("quickLinks")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Link
              key={program.key}
              href={program.href}
              className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-jamun-blue/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center`}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {t(program.key)}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-jamun-blue group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
