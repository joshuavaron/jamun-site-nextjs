import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getResourceBySlug, getAllResourceSlugs, getRelatedResources } from "@/lib/resources";
import ResourcePageContent from "./ResourcePageContent";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllResourceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | JAMUN Model UN",
    };
  }

  return {
    title: `${resource.title} | JAMUN Model UN Resources`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources(slug, 4);

  return <ResourcePageContent resource={resource} relatedResources={relatedResources} />;
}
