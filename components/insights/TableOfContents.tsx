import { List } from "lucide-react";

import { cn } from "@/lib/utils";

type TocItem = { level: 2 | 3; id: string; text: string };

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="rounded border border-white/[0.06] bg-background-card p-5"
    >
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary">
        <List className="h-3.5 w-3.5" />
        On this page
      </p>
      <ol className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "text-sm text-text-secondary transition-colors hover:text-accent",
                heading.level === 3 && "pl-4",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
