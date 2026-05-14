import { notFound } from "next/navigation";
import { TeamMemberPage } from "@/components/sections";
import { TEAM_MEMBERS, getTeamMember } from "@/lib/team-members";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getTeamMember(slug)) notFound();
  return <TeamMemberPage slug={slug} />;
}
