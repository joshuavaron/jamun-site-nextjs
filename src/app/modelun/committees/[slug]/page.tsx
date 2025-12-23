import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCommitteeBySlug, getAllCommitteeSlugs } from "@/lib/committees";
import CommitteePageContent from "./CommitteePageContent";

interface CommitteePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCommitteeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CommitteePageProps): Promise<Metadata> {
  const { slug } = await params;
  const committee = getCommitteeBySlug(slug);

  if (!committee) {
    return {
      title: "Committee Not Found | JAMUN Model UN",
    };
  }

  return {
    title: `${committee.name} (${committee.abbreviation}) | JAMUN Model UN`,
    description: `${committee.topic} - ${committee.description}`,
    openGraph: {
      title: `${committee.abbreviation}: ${committee.topic}`,
      description: committee.description,
      type: "website",
      images: [committee.image || "/images/conferences/model-un.webp"],
    },
  };
}

export default async function CommitteePage({ params }: CommitteePageProps) {
  const { slug } = await params;
  const committee = getCommitteeBySlug(slug);

  if (!committee) {
    notFound();
  }

  return <CommitteePageContent committee={committee} />;
}
