import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";
import { getTeamMember } from "@/lib/team-members";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return { title: "Team member — JAMUN" };
  }

  const t = await getTranslations({
    locale,
    namespace: `AboutPage.team.members.${member.messageKey}`,
  });
  const name = t("name");
  const role = t("role");
  const bio = t("bio");

  const title = `${name} — ${role} at JAMUN`;
  const description = bio;

  return {
    title,
    description,
    keywords: [
      name,
      `JAMUN ${role}`,
      "JAMUN team",
      "youth-led nonprofit",
      "JAMUN leadership",
    ],
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, `/about/${slug}`),
      type: "profile",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, `/about/${slug}`),
  };
}

export default function TeamMemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
