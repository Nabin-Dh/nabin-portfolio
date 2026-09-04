import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { TagList } from "@/components/ui/TagList";
import { PROJECTS } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related = PROJECTS.filter((p) => p.slug !== slug);

  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow={`/projects / ${project.category}`}
        title={project.title}
        description={project.description}
      />

      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All projects
              </Link>
            </nav>
          </Reveal>

          <Reveal delay={60}>
            <span className="mt-10 inline-block rounded-md border border-border-subtle bg-accent-muted px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-accent">
              {project.category}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-8 text-text-secondary">
              {project.overview}
            </p>
          </Reveal>

          {project.context ? (
            <Reveal delay={80}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Context
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">
                {project.context}
              </p>
            </Reveal>
          ) : null}

          {project.objective ? (
            <Reveal delay={90}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Objective
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">
                {project.objective}
              </p>
            </Reveal>
          ) : null}

          {project.approach ? (
            <Reveal delay={100}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Approach
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">
                {project.approach}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={110}>
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
              Technologies &amp; concepts
            </h2>
            <div className="mt-5">
              <TagList tags={project.technologies} />
            </div>
          </Reveal>

          {project.outcomes ? (
            <Reveal delay={120}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Outcomes
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">
                {project.outcomes}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={140}>
            <div className="mt-12 flex flex-wrap gap-3 border-t border-border-subtle pt-8">
              <Button asChild>
                <Link
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-4 w-4" />
                  View repository
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {related.length > 0 ? (
          <section className="mt-24 border-t border-border-subtle pt-12">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                Related projects
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {related.map((relatedProject, index) => (
                <Reveal key={relatedProject.slug} delay={index * 60}>
                  <SpotlightCard className="h-full">
                    <ProjectCard project={relatedProject} />
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
