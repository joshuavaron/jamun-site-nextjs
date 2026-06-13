import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/sections";
import { generateBreadcrumbSchema, jsonLdScript } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const breadcrumbSchema = generateBreadcrumbSchema(locale, [
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("about"), url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
      <AboutPage />
    </>
  );
}
