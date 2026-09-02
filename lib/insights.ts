import fs from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";

export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  readingTime: string;
  excerpt: string;
};

export type InsightWithToc = Insight & {
  headings: { level: 2 | 3; id: string; text: string }[];
  related: Insight[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

const WORDS_PER_MINUTE = 200;

function formatReadingTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function stripMarkdown(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[*_~|>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(
  source: string,
): { level: 2 | 3; id: string; text: string }[] {
  const slugger = new GithubSlugger();
  const headings: { level: 2 | 3; id: string; text: string }[] = [];

  for (const line of source.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    headings.push({ level, id: slugger.slug(text), text });
  }

  return headings;
}

function readInsightFile(slug: string): { slug: string; data: Insight } | null {
  if (slug.startsWith("_")) {
    return null;
  }
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    return null;
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const excerpt = `${stripMarkdown(content).slice(0, 200)}${content.length > 200 ? "…" : ""}`;
  const words = stripMarkdown(content).split(" ").filter(Boolean).length;

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag: unknown) => String(tag))
    : [];

  const insight = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags,
    featured: Boolean(data.featured),
    readingTime: formatReadingTime(words),
    excerpt,
  };

  return { slug, data: insight };
}

function readAllInsights(): { slug: string; data: Insight }[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .sort();

  const insights: { slug: string; data: Insight }[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const result = readInsightFile(slug);
    if (result) {
      insights.push(result);
    }
  }
  return insights;
}

function sortInsights(insights: Insight[]): Insight[] {
  return [...insights].sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }
    if (!a.featured && b.featured) {
      return 1;
    }
    return b.date.localeCompare(a.date);
  });
}

export function getAllInsights(): Insight[] {
  return sortInsights(readAllInsights().map(({ data }) => data));
}

export function getAllSlugs(): string[] {
  return readAllInsights().map(({ slug }) => slug);
}

export function findRelatedInsights(
  slug: string,
  tags: string[],
  limit = 2,
): Insight[] {
  const others = getAllInsights().filter((insight) => insight.slug !== slug);
  const scored = others
    .map((insight) => ({
      insight,
      score: insight.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ insight }) => insight);

  if (scored.length >= limit) {
    return scored;
  }

  const remaining = others.filter(
    (insight) => !scored.some((entry) => entry.slug === insight.slug),
  );
  for (const insight of remaining) {
    if (scored.length >= limit) {
      break;
    }
    scored.push(insight);
  }
  return scored;
}

export function getInsightBySlug(slug: string): InsightWithToc | null {
  if (slug.startsWith("_")) {
    return null;
  }
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    return null;
  }
  const raw = fs.readFileSync(file, "utf8");
  const { content } = matter(raw);
  const base = readInsightFile(slug);
  if (!base) {
    return null;
  }
  return {
    ...base.data,
    headings: extractHeadings(content),
    related: findRelatedInsights(slug, base.data.tags),
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const { data } of readAllInsights()) {
    for (const tag of data.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}
