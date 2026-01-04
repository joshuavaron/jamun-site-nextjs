import { setRequestLocale } from "next-intl/server";

// Force dynamic rendering for all online pages (they require Clerk auth)
export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function OnlineLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <>{children}</>;
}
