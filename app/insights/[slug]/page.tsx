import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleFeedback } from "@/components/insights/ArticleFeedback";
import { ArticleMetrics } from "@/components/insights/ArticleMetrics";
import { CopyLinkButton } from "@/components/insights/CopyLinkButton";
import { InsightCard } from "@/components/insights/InsightCard";
import { TableOfContents } from "@/components/insights/TableOfContents";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { TagList } from "@/components/ui/TagList";
import { SITE } from "@/lib/constants";
import { getAllSlugs, getInsightBySlug } from "@/lib/insights";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return { title: "Article not found" };
  }

  return {
    title: insight.title,
    description: insight.description,
    alternates: {
      canonical: `/insights/${insight.slug}`,
    },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.description,
      url: `${SITE.url}/insights/${insight.slug}`,
      publishedTime: insight.date,
      tags: insight.tags,
    },
    twitter: {
      card: "summary",
      title: insight.title,
      description: insight.description,
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const { default: Post } = await import(`@/content/insights/${slug}.mdx`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/insights/${insight.slug}`,
    keywords: insight.tags,
  } as const;

  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow={`/insights / ${insight.date}`}
        title={insight.title}
        description={insight.description}
      />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="max-w-none lg:col-span-8 lg:pr-6">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {insight.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {insight.readingTime}
              </span>
              <ArticleMetrics slug={insight.slug} />
            </div>

            {insight.tags.length > 0 ? (
              <div className="mt-5">
                <TagList tags={insight.tags} />
              </div>
            ) : null}

            <div className="prose mt-8 max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary prose-a:no-underline prose-strong:text-text-primary prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-code:font-mono">
              <Post />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-8">
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All insights
              </Link>
              <CopyLinkButton />
            </div>

            <div className="mt-8">
              <ArticleFeedback articleSlug={insight.slug} />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <TableOfContents headings={insight.headings} />

              <div className="rounded-xl border border-border-subtle bg-background-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3">
                  <ProfilePhoto
                    name={SITE.name}
                    className="h-12 w-12 shrink-0 !rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">
                      {SITE.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {SITE.role.split("|")[0].trim()}
                    </p>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="mt-4 inline-block font-mono text-sm text-accent transition-colors hover:text-text-primary"
                >
                  read more about me...
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {insight.related.length > 0 ? (
          <section className="mt-24 border-t border-border-subtle pt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Related articles
            </h2>
            <ul className="mt-8 grid gap-6 lg:grid-cols-2">
              {insight.related.map((related, index) => (
                <li key={related.slug}>
                  <InsightCard insight={related} delay={index * 60} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </div>
  );
}
