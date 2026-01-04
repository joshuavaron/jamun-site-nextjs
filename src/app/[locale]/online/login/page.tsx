import { SignIn } from "@clerk/nextjs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OnlineLogin" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OnlineLogin");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-md mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="flex justify-center">
          <SignIn
            path={`/${locale === "en" ? "" : locale + "/"}online/login`}
            routing="path"
            signUpUrl={`/${locale === "en" ? "" : locale + "/"}online/signup`}
            forceRedirectUrl={`/${locale === "en" ? "" : locale + "/"}online/dashboard`}
          />
        </div>

        <p className="text-center text-gray-600 mt-6">
          {t("noAccount")}{" "}
          <Link
            href="/online/signup"
            className="text-jamun-blue hover:underline font-medium"
          >
            {t("signUpLink")}
          </Link>
        </p>
      </div>
    </section>
  );
}
