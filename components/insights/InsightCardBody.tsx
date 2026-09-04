import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { TagList } from "@/components/ui/TagList";
import type { Insight } from "@/lib/insights";

export function InsightCardBody({ insight }: { insight: Insight }) {
  return (
    <Card className="flex h-full flex-col p-6 transition-colors hover:border-border-strong sm:p-7">
      <div className="flex items-center gap-4 font-mono text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {insight.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {insight.readingTime}
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-text-primary">
        {insight.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-text-secondary">
        {insight.excerpt || insight.description}
      </p>
      {insight.tags.length > 0 ? (
        <div className="mt-5">
          <TagList tags={insight.tags.slice(0, 4)} />
        </div>
      ) : null}
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:gap-3 hover:text-text-primary"
      >
        Read article
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
