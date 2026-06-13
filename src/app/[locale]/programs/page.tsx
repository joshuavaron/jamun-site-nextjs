import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProgramsPage } from "@/components/sections/ProgramsPage";
import {
  generateItemListSchema,
  generateBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });

  // ItemList of the three program offerings (Model UN / Mock Trial / Mathletes).
  const itemListSchema = generateItemListSchema(locale, [
    { name: tBreadcrumbs("modelUN"), url: "/modelun" },
    { name: tBreadcrumbs("mockTrial"), url: "/mocktrial" },
    { name: tBreadcrumbs("mathletes"), url: "/mathletes" },
  ]);
  const breadcrumbSchema = generateBreadcrumbSchema(locale, [
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("programs"), url: "/programs" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([itemListSchema, breadcrumbSchema]),
        }}
      />
      <ProgramsPage />
    </>
  );
}
