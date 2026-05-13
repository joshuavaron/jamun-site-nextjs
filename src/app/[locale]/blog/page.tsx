import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogPage } from "@/components/sections";
import { siteConfig, defaultOgImage } from "@/config/site";
import { routing, ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Model UN tips",
      "position paper guide",
      "Mock Trial strategies",
      "math competition preparation",
      "MUN delegate advice",
      "Model UN conference prep",
      "academic competition blog",
      "public speaking tips students",
      "debate strategies middle school",
      "Model UN resolution writing",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/blog`,
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/blog`,
      languages: {
        en: "/blog",
        es: "/es/blog",
        zh: "/zh/blog",
        ar: "/ar/blog",
        hi: "/hi/blog",
        tr: "/tr/blog",
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const posts = getAllPosts(locale, t.raw("readTime"));
  const categories = getCategories(locale, t("categoryAll"));

  const blogPosts = posts.map((post, index) => ({
    id: String(index + 1),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    author: post.author,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
  }));

  return <BlogPage posts={blogPosts} categories={categories} />;
}
