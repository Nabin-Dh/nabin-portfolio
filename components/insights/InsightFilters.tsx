"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { InsightCardBody } from "@/components/insights/InsightCardBody";
import type { Insight } from "@/lib/insights";
import { cn } from "@/lib/utils";

type InsightFiltersProps = {
  insights: Insight[];
  tags: string[];
};

export function InsightFilters({ insights, tags }: InsightFiltersProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((insight) => {
      if (selectedTag && !insight.tags.includes(selectedTag)) {
        return false;
      }
      if (!q) {
        return true;
      }
      const haystack = [insight.title, insight.description, ...insight.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [insights, query, selectedTag]);

  const resultLabel =
    filtered.length === 1 ? "1 article" : `${filtered.length} articles`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className="h-11 w-full rounded border border-white/10 bg-background-card pl-10 pr-10 text-text-primary outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-text-secondary transition-colors hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>

        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-secondary">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={cn(
                "h-9 rounded border px-3 text-sm transition-colors",
                !selectedTag
                  ? "border-accent text-accent"
                  : "border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary",
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setSelectedTag((current) => (current === tag ? null : tag))
                }
                className={cn(
                  "h-9 rounded border px-3 text-sm transition-colors",
                  selectedTag === tag
                    ? "border-accent text-accent"
                    : "border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p
        aria-live="polite"
        className="mt-6 font-mono text-sm text-text-secondary"
      >
        {filtered.length > 0 ? resultLabel : "No articles match."}
      </p>

      <ul className="mt-6 grid gap-6 lg:grid-cols-2">
        {filtered.map((insight) => (
          <li key={insight.slug}>
            <InsightCardBody insight={insight} />
          </li>
        ))}
      </ul>
    </div>
  );
}
