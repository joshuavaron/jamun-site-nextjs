import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getPostBySlug,
  getAllPosts,
  getAllSlugsAllLocales,
  getAlternateLanguages,
} from "@/lib/blog";
import { BlogPostPage } from "@/components/sections";
import { siteConfig, defaultOgImage } from "@/config/site";
import { generateArticleSchema, jsonLdScript } from "@/lib/structured-data";
import { ogLocale } from "@/i18n/routing";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const dynamicParams = false;

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
    return { title: t("notFoundTitle") };
  }

  const alternates = getAlternateLanguages(slug, locale);
  const languages: Record<string, string> = {};
  languages[locale] =
    locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  for (const alt of alternates) {
    languages[alt.locale] =
      alt.locale === "en"
        ? `/blog/${alt.slug}`
        : `/${alt.locale}/blog/${alt.slug}`;
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
      images: [defaultOgImage],
      siteName: siteConfig.seo.openGraph.siteName,
      locale: ogLocale(locale),
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

export default async function Page({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const post = getPostBySlug(slug, locale, t.raw("readTime"));

  if (!post) {
    notFound();
  }

  // Build related posts (same category, excluding current)
  const allPosts = getAllPosts(locale, t.raw("readTime"));
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3)
    .map((p, i) => ({
      id: String(i),
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      category: p.category,
      author: p.author,
      publishedAt: p.publishedAt,
      readTime: p.readTime,
    }));

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${slug}`,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { name: post.author.name },
    category: post.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleSchema) }}
      />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
