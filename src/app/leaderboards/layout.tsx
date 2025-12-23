import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Competition Leaderboards | Model UN, Mock Trial & Mathletes Rankings",
  description:
    "View JAMUN competition leaderboards for Model UN, Mock Trial, and Mathletes. Track school rankings, top delegates, and team performance across our academic competition programs.",
  keywords: [
    "Model UN leaderboard",
    "Mock Trial rankings",
    "Mathletes competition results",
    "academic competition standings",
    "school rankings",
    "delegate awards",
    "competition results",
  ],
  openGraph: {
    title: "JAMUN Competition Leaderboards",
    description:
      "Track school rankings and top performers in Model UN, Mock Trial, and Mathletes competitions.",
    url: `${siteConfig.url}/leaderboards`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/leaderboards`,
  },
};

export default function LeaderboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
