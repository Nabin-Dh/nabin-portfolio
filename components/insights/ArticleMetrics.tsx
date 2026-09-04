"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { recordView } from "@/lib/feedback";

/**
 * Displays a real, persistent view count for an article and records the
 * current visit (server de-duplicates daily per visitor; a single browser
 * session only POSTs once per article). Nothing is displayed unless the backend
 * returns a genuine number — if the API is unavailable, the element renders only
 * (and renders nothing visible), never a fabricated count.
 */
export function ArticleMetrics({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    recordView(slug).then((count) => {
      if (active && typeof count === "number") {
        setViews(count);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (typeof views !== "number") {
    // No real data yet — render nothing (avoids empty-label flicker and never
    // fakes a number).
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5" title="Article views">
      <Eye aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="tabular-nums">{views.toLocaleString()}</span>
      <span className="sr-only">views</span>
    </span>
  );
}
