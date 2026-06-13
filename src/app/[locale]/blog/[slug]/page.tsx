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
import { siteConfig } from "@/config/site";
import { contentAlternates, localizedUrl } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  jsonLdScript,
} from "@/lib/structured-data";
import { ogLocale, bcp47Locale } from "@/i18n/routing";

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

  // Content-driven alternates (blog content is en + es) + self-canonical + x-default.
  const alternates = getAlternateLanguages(slug, locale);
  const seoAlternates = contentAlternates(
    locale,
    `/blog/${slug}`,
    alternates.map((alt) => ({ locale: alt.locale, path: `/blog/${alt.slug}` })),
  );

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
      url: seoAlternates.canonical,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.coverImage],
      siteName: siteConfig.seo.openGraph.siteName,
      locale: ogLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: seoAlternates,
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

  const canonicalUrl = localizedUrl(locale, `/blog/${slug}`);

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { name: post.author.name },
    category: post.category,
    inLanguage: bcp47Locale(locale),
  });

  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const breadcrumbSchema = generateBreadcrumbSchema(locale, [
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("blog"), url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([articleSchema, breadcrumbSchema]),
        }}
      />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
