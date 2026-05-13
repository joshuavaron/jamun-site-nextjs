"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  User,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Heading, PillButton } from "@/components/ui";
import { DiagonalSpread } from "@/components/sections/DiagonalSpread";
import { SectionIntro } from "@/components/sections/SectionIntro";
import {
  PostCard,
  type BlogPostItem,
} from "@/components/sections/BlogPage";
import MDXComponents from "@/components/mdx/MDXComponents";
import { BlogPost } from "@/lib/blog";
import { fontBody, fontSerif, bodySize } from "@/lib/typography";

// ────────── Photos — distinct from other pages ──────────
const PHOTOS = {
  finalCta: "/images/conferences/DSC02030.webp",
} as const;

// ────────── Share button ──────────

function ShareButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
      aria-label={label}
    >
      <Icon className="w-4 h-4 text-neutral-600" />
    </button>
  );
}

// ────────── Page component ──────────

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts?: BlogPostItem[];
}

export function BlogPostPage({ post, relatedPosts = [] }: BlogPostPageProps) {
  const t = useTranslations("BlogPost");
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function compileMDX() {
      const source = await serialize(post.content, {
        mdxOptions: { remarkPlugins: [remarkGfm] },
      });
      setMdxSource(source);
    }
    compileMDX();
  }, [post.content]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = t("shareText", { title: post.title });

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero — DiagonalSpread with the post's cover image ───── */}
      <DiagonalSpread
        photoSide="left"
        photoSrc={post.coverImage}
        photoAlt={post.title}
        photoPriority
        photoClassName="min-h-[50svh]"
        minHeight="min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)]"
        panelClassName="py-16 md:py-0"
        animation="entry"
      >
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#397bce] transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span style={fontBody} className="text-sm font-medium">
            {t("backToBlog")}
          </span>
        </Link>

        <Heading size="section">{post.title}</Heading>

        {/* Author + date row */}
        <div className="flex items-center gap-3 mt-6">
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={44}
              height={44}
              className="rounded-full"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-[#397bce]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#397bce]" />
            </div>
          )}
          <div>
            <p
              style={fontBody}
              className="text-sm font-semibold text-[#0a0a0a]"
            >
              {post.author.name}
            </p>
            <div
              style={fontBody}
              className="flex items-center gap-2 text-xs text-neutral-500"
            >
              <span>{post.publishedAt}</span>
              <span className="text-neutral-300">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2 mt-6">
          <span
            style={fontBody}
            className="text-sm text-neutral-400 mr-1"
          >
            {t("share")}
          </span>
          <ShareButton
            label={t("shareOnTwitter")}
            icon={Twitter}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                "_blank",
              )
            }
          />
          <ShareButton
            label={t("shareOnFacebook")}
            icon={Facebook}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                "_blank",
              )
            }
          />
          <ShareButton
            label={t("shareOnLinkedIn")}
            icon={Linkedin}
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
                "_blank",
              )
            }
          />
          <div className="relative">
            <ShareButton
              label={t("copyLink")}
              icon={LinkIcon}
              onClick={handleCopyLink}
            />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded whitespace-nowrap">
                {t("copied")}
              </span>
            )}
          </div>
        </div>
      </DiagonalSpread>

      {/* ───── Excerpt pull-quote ───── */}
      <section className="bg-white">
        <Container narrow className="py-14 md:py-20">
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-l-2 border-[#397bce] pl-6 md:pl-8 py-2"
          >
            <blockquote
              style={fontSerif}
              className="text-xl md:text-2xl leading-relaxed text-neutral-900"
            >
              <span
                aria-hidden
                className="text-[#397bce] mr-1 select-none"
              >
                &ldquo;
              </span>
              {post.excerpt}
              <span
                aria-hidden
                className="text-[#397bce] ml-0.5 select-none"
              >
                &rdquo;
              </span>
            </blockquote>
          </motion.figure>
        </Container>
      </section>

      {/* ───── Article content ───── */}
      <section className="bg-white border-t border-black/5">
        <Container narrow className="py-14 md:py-20">
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={MDXComponents} />
            ) : (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
                <div className="h-4 bg-neutral-200 rounded w-4/6" />
                <div className="h-8 mt-6" />
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
              </div>
            )}
          </motion.article>
        </Container>
      </section>

      {/* ───── Author card ───── */}
      <section className="bg-white border-t border-black/5">
        <Container narrow className="py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 md:p-8 bg-[#397bce]/5 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={72}
                    height={72}
                    className="rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-[72px] h-[72px] rounded-full bg-[#397bce]/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-[#397bce]" />
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <p
                    style={fontBody}
                    className="text-sm text-neutral-500 mb-1"
                  >
                    {t("writtenBy")}
                  </p>
                  <Heading size="micro" className="mb-2">
                    {post.author.name}
                  </Heading>
                  <p style={fontBody} className={bodySize.micro}>
                    {t("authorBio")}{" "}
                    <a
                      href="mailto:contact@jamun.org"
                      className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
                    >
                      contact@jamun.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ───── Related articles ───── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-black/5">
          <Container className="py-14 md:py-20">
            <SectionIntro title={t("keepReading")} spacing="default" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {relatedPosts.map((rp, i) => (
                <PostCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ───── Final CTA — DiagonalSpread ───── */}
      <DiagonalSpread
        photoSide="right"
        photoSrc={PHOTOS.finalCta}
        photoAlt={t("ctaPhotoAlt")}
        clip="none"
        minHeight="min-h-[70svh]"
        panelClassName="py-16 md:py-0"
      >
        <Heading size="ctaHero" className="mb-6 text-[#0a0a0a]">
          {t("readMoreTitle")}
        </Heading>
        <p style={fontBody} className={`${bodySize.lead} mb-9 max-w-md`}>
          {t("readMoreDescription")}
        </p>
        <div className="flex flex-wrap gap-3">
          <PillButton href="/blog" withArrow>
            {t("browseAllArticles")}
          </PillButton>
          <PillButton href="/programs" tone="outline">
            {t("explorePrograms")}
          </PillButton>
        </div>
        <p style={fontBody} className="mt-8 text-sm text-neutral-600">
          {t("questionsReachOut")}{" "}
          <a
            href="mailto:contact@jamun.org"
            className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
          >
            contact@jamun.org
          </a>
        </p>
      </DiagonalSpread>
    </div>
  );
}
