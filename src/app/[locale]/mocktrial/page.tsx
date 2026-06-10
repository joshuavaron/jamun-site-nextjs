import { setRequestLocale } from "next-intl/server";
import { MockTrialPage as MockTrialPageContent } from "@/components/sections/MockTrialPage";
import { getActiveCase } from "@/lib/cases";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MockTrialPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = getActiveCase(locale);
  const caseInfo = c
    ? {
        title: c.title,
        description: c.description,
        caseType: c.caseType,
        caseNumber: c.caption?.caseNumber,
        documentCount: c.components.length,
      }
    : null;

  return <MockTrialPageContent caseInfo={caseInfo} />;
}
