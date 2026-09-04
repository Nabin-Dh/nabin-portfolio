import { cn } from "@/lib/utils";

export function TagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center rounded-md border border-border-subtle bg-accent-muted px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
