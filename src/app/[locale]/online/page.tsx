import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button, Section, SectionHeader } from "@/components/ui";
import { GraduationCap, Trophy, Users, BookOpen, Sparkles, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OnlineLanding" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function OnlineLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OnlineLanding");

  const features = [
    {
      icon: BookOpen,
      title: t("featureInteractive"),
      description: t("featureInteractiveDesc"),
    },
    {
      icon: Trophy,
      title: t("featureProgress"),
      description: t("featureProgressDesc"),
    },
    {
      icon: Users,
      title: t("featureTeams"),
      description: t("featureTeamsDesc"),
    },
  ];

  const programs = [
    { key: "modelun", href: "/online/programs/modelun" },
    { key: "mocktrial", href: "/online/programs/mocktrial" },
    { key: "mathletes", href: "/online/programs/mathletes" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-jamun-blue/10 text-jamun-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              {t("badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t("heroTitle")}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/online/signup" variant="primary" size="lg">
                {t("ctaSignUp")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="#features" variant="ghost" size="lg">
                {t("ctaLearnMore")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Section id="features" background="white">
        <SectionHeader
          eyebrow={t("featuresTitle")}
          title={t("featuresSectionTitle")}
          subtitle={t("featuresSectionDesc")}
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-jamun-blue/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-jamun-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Programs Section */}
      <Section background="gray">
        <SectionHeader
          eyebrow={t("programsBadge")}
          title={t("programsTitle")}
          subtitle={t("programsDesc")}
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {programs.map((program) => (
            <Link
              key={program.key}
              href={program.href}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-jamun-blue/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="w-8 h-8 text-jamun-blue" />
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-jamun-blue group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`program${program.key.charAt(0).toUpperCase() + program.key.slice(1)}`)}
              </h3>
              <p className="text-gray-600">
                {t(`program${program.key.charAt(0).toUpperCase() + program.key.slice(1)}Desc`)}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="blue">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Button href="/online/signup" variant="accent" size="lg">
            {t("ctaButton")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Section>
    </>
  );
}
