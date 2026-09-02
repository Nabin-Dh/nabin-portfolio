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
          className="inline-flex items-center rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-text-secondary"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
