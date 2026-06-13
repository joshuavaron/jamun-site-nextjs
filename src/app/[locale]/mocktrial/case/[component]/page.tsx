import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  getActiveCase,
  getActiveCaseComponent,
  getActiveCaseNeighbors,
  getActiveCaseComponentParams,
} from "@/lib/cases";
import { CaseComponentContent } from "@/components/cases";
import { defaultOgImage } from "@/config/site";
import { localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";

interface Props {
  params: Promise<{ component: string; locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCaseComponentParams().map(({ component, locale }) => ({
    component,
    locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { component: componentSlug, locale } = await params;
  const manifest = getActiveCase(locale);
  const component = getActiveCaseComponent(componentSlug, locale);

  if (!manifest || !component) {
    return { title: "Document Not Found | JAMUN Mock Trial" };
  }

  const description = component.description || manifest.description;
  const url = localizedUrl(locale, `/mocktrial/case/${componentSlug}`);

  return {
    title: `${component.title} — ${manifest.title} | JAMUN Mock Trial`,
    description,
    // Thin, near-duplicate per-component drill-downs (3 components x 6 locales).
    // Keep them crawlable for navigation but out of the index; the case landing
    // (/mocktrial/case) and full case (/mocktrial/case/full) are the indexable
    // entry points.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${component.title} — ${manifest.title}`,
      description,
      url,
      type: "article",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: { canonical: url },
  };
}

export default async function CaseComponentPage({ params }: Props) {
  const { component: componentSlug, locale } = await params;
  setRequestLocale(locale);

  const manifest = getActiveCase(locale);
  const component = getActiveCaseComponent(componentSlug, locale);

  if (!manifest || !component) {
    notFound();
  }

  const { prev, next, index, total } = getActiveCaseNeighbors(componentSlug, locale);

  return (
    <CaseComponentContent
      manifest={manifest}
      component={component}
      prev={prev}
      next={next}
      index={index}
      total={total}
    />
  );
}
