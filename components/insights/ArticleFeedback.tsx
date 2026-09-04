"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

import {
  type FeedbackMetrics,
  type FeedbackVote,
  getArticleMetrics,
  recordFeedback,
} from "@/lib/feedback";
import { cn } from "@/lib/utils";

type Vote = FeedbackVote | null;

/**
 * "Was this useful?" reaction widget backed by the serverless metrics API.
 *
 * Counts are shown ONLY when the backend returns real persisted numbers — if
 * the API is unconfigured or unreachable, the widget degrades to a
 * non-persistent local toggle and clearly notes that metrics aren't available.
 * Nothing is ever fabricated.
 */
export function ArticleFeedback({ articleSlug }: { articleSlug: string }) {
  const [vote, setVote] = useState<Vote>(null);
  const [metrics, setMetrics] = useState<FeedbackMetrics | null>(null);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    getArticleMetrics(articleSlug).then((result) => {
      if (!active) {
        return;
      }
      if (result) {
        setMetrics(result);
        setBackendAvailable(true);
      } else {
        setBackendAvailable(false);
      }
    });
    return () => {
      active = false;
    };
  }, [articleSlug]);

  async function choose(next: FeedbackVote) {
    setVote(next);
    const result = await recordFeedback(articleSlug, next);
    if (result) {
      setMetrics(result);
      setBackendAvailable(true);
    }
  }

  const totalReactions =
    metrics && metrics.helpful + metrics.notHelpful > 0
      ? metrics.helpful + metrics.notHelpful
      : 0;
  const helpfulPct =
    metrics && totalReactions > 0
      ? Math.round((metrics.helpful / totalReactions) * 100)
      : 0;

  const note =
    backendAvailable === false
      ? "Metrics aren't configured yet — feedback isn't stored."
      : backendAvailable === null
        ? "Loading…"
        : vote
          ? "Thanks! Your reaction was recorded."
          : "Tap Useful or Not useful to rate this article.";

  return (
    <fieldset className="flex flex-wrap items-center gap-4 rounded-xl border border-border-subtle bg-background-card p-5 shadow-[var(--shadow-card)]">
      <legend className="sr-only">Was this article useful?</legend>
      <p
        aria-hidden="true"
        className="w-full text-sm font-medium text-text-primary lg:w-auto"
      >
        Was this article useful?
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => choose("helpful")}
          aria-pressed={vote === "helpful"}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            vote === "helpful"
              ? "border-accent bg-accent-muted text-accent"
              : "border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary",
          )}
        >
          <ThumbsUp aria-hidden="true" className="h-4 w-4" />
          Useful
          {backendAvailable && typeof metrics?.helpful === "number" ? (
            <span className="font-mono text-xs text-text-secondary">
              {metrics.helpful}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => choose("not-helpful")}
          aria-pressed={vote === "not-helpful"}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            vote === "not-helpful"
              ? "border-accent bg-accent-muted text-accent"
              : "border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary",
          )}
        >
          <ThumbsDown aria-hidden="true" className="h-4 w-4" />
          Not useful
          {backendAvailable && typeof metrics?.notHelpful === "number" ? (
            <span className="font-mono text-xs text-text-secondary">
              {metrics.notHelpful}
            </span>
          ) : null}
        </button>
      </div>
      <p
        aria-live="polite"
        className="w-full text-xs text-text-secondary lg:w-auto"
      >
        {note}
        {backendAvailable && totalReactions > 0
          ? ` ${helpfulPct}% of ${totalReactions} find this${totalReactions === 1 ? " article" : ""} useful.`
          : ""}
      </p>
    </fieldset>
  );
}
