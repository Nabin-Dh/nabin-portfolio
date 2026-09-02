import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { TagList } from "@/components/ui/TagList";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col p-6 transition-colors hover:border-white/[0.12] sm:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">
          {project.title}
        </h2>
        <span className="mt-1 shrink-0 font-mono text-xs uppercase tracking-widest text-text-secondary">
          {project.category}
        </span>
      </div>
      <p className="mt-3 flex-1 leading-7 text-text-secondary">
        {project.description}
      </p>
      <div className="mt-5">
        <TagList
          tags={project.technologies.slice(0, 6)}
          className="group-hover:opacity-100"
        />
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3 group-hover:text-text-primary"
      >
        View project
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Card>
  );
}
