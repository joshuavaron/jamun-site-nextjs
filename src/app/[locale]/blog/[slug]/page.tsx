import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPostBySlug, getAllSlugsAllLocales, getAlternateLanguages } from "@/lib/blog";
import BlogPostContent from "./BlogPostContent";
import { siteConfig } from "@/config/site";
import { generateArticleSchema, jsonLdScript } from "@/lib/structured-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const allSlugs = getAllSlugsAllLocales();
  return allSlugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({ locale, namespace: "BlogPage" });
    return {
      title: t("notFoundTitle"),
    };
  }

  // Build alternate languages for SEO
  const alternates = getAlternateLanguages(slug, locale);
  const languages: Record<string, string> = {};

  // Add current locale
  languages[locale] = locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  // Add alternate locales
  for (const alt of alternates) {
    languages[alt.locale] = alt.locale === "en" ? `/blog/${alt.slug}` : `/${alt.locale}/blog/${alt.slug}`;
  }

  return {
    title: `${post.title} | JAMUN Blog`,
    description: post.excerpt,
    keywords: [
      "Model UN tips",
      "academic competition guide",
      post.category,
      "middle school",
      "JAMUN",
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: siteConfig.seo.openGraph.siteName,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/blog/${slug}`,
      languages,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const post = getPostBySlug(slug, locale, t.raw("readTime"));

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${slug}`,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      name: post.author.name,
    },
    category: post.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(articleSchema),
        }}
      />
      <BlogPostContent post={post} />
    </>
  );
}
