"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", ...new Set(PROJECTS.map((p) => p.category))];

export function ProjectFilters() {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (category === "all") {
      return PROJECTS;
    }
    return PROJECTS.filter((project) => project.category === category);
  }, [category]);

  const countLabel =
    filtered.length === 1 ? "1 project" : `${filtered.length} projects`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          Filter
        </p>
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "h-9 rounded border px-3 text-sm transition-colors",
              category === item
                ? "border-accent text-accent"
                : "border-white/10 text-text-secondary hover:border-white/25 hover:text-text-primary",
            )}
          >
            {item}
          </button>
        ))}
        <span
          aria-live="polite"
          className="ml-auto font-mono text-sm text-text-secondary"
        >
          {countLabel}
        </span>
      </div>

      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {filtered.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 60}>
              <SpotlightCard className="h-full">
                <ProjectCard project={project} />
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="text-text-secondary">No projects in this category.</li>
        ) : null}
      </ul>
    </div>
  );
}
