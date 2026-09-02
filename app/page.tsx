import { ArrowUpRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import { GradientOrbs } from "@/components/fx/GradientOrbs";
import { Magnetic } from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { InsightCardBody } from "@/components/insights/InsightCardBody";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/TagList";
import { CV_PATH, SITE } from "@/lib/constants";
import {
  CERTIFICATIONS,
  DOMAINS,
  ENGINEERING_APPROACH,
  PROJECTS,
  SKILL_CATEGORIES,
} from "@/lib/content";
import { getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: SITE.headline,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 2);
  const latestInsight = getAllInsights()[0];

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="border-t border-white/[0.06]">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/expertise"
              title="Engineering today's infrastructure, architecting for the cloud."
              description="System & network engineering across networking, systems, cloud, and cybersecurity."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category, index) => (
              <Reveal key={category.title} delay={index * 60}>
                <SpotlightCard>
                  <div className="h-full bg-background-card p-6 transition-colors hover:bg-background-secondary">
                    <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                      0{index + 1} / {SKILL_CATEGORIES.length}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-text-primary">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {category.description}
                    </p>
                    <div className="mt-4">
                      <TagList tags={category.skills.slice(0, 5)} />
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 flex items-center gap-1">
              <p className="font-mono text-sm text-text-secondary">
                ~/infrastructure #
              </p>
              <Link
                href="/expertise"
                className="inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
              >
                view full expertise...
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.06]">
        <GradientOrbs
          className="opacity-40"
          colors={["#1d4ed8", "#4f46e5", "#0369a1"]}
        />
        <Container className="relative py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/domains"
              title="Professional domains."
              description="Five overlapping areas where I work hands-on — from the physical layer to the cloud."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((domain, index) => (
              <Reveal key={domain.title} delay={index * 60}>
                <SpotlightCard>
                  <div className="h-full rounded border border-white/[0.06] bg-background-card/80 p-6 transition-colors hover:border-white/[0.12]">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-text-primary">
                      {domain.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {domain.summary}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <Link
                href="/expertise"
                className="flex h-full min-h-[150px] flex-col items-start justify-end gap-2 rounded border border-dashed border-white/[0.12] p-6 transition-colors hover:border-accent"
              >
                <p className="font-mono text-sm text-accent">~/expertise #</p>
                <p className="text-sm text-text-secondary">
                  see capabilities, tools &amp; credentials...
                </p>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06]">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/projects"
              title="Selected infrastructure work."
              description="Hands-on designs across enterprise networking and Azure infrastructure."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-background-secondary/60">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/approach"
              title="Engineering approach."
              description="Principles that guide how I design, build, and operate infrastructure."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {ENGINEERING_APPROACH.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 60}>
                <div className="h-full bg-background-card p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06]">
        <Container className="py-16 sm:py-24">
          {latestInsight ? (
            <>
              <Reveal>
                <SectionHeading
                  eyebrow="/insights"
                  title="Latest insight."
                  description="Recent technical writing on networking, systems, cloud, and security."
                />
              </Reveal>
              <div className="mt-12 max-w-3xl">
                <Reveal>
                  <SpotlightCard>
                    <InsightCardBody insight={latestInsight} />
                  </SpotlightCard>
                </Reveal>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-start gap-6">
              <Reveal>
                <SectionHeading
                  eyebrow="/insights"
                  title="Insights."
                  description="Technical write-ups are published here as they are written."
                />
              </Reveal>
              <Reveal delay={80}>
                <div className="flex flex-col gap-4 rounded border border-dashed border-white/[0.12] bg-background-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-white/10 text-accent">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        No articles published yet
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        The publishing system is ready — first article will
                        appear here.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/insights"
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
                  >
                    visit insights...
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          )}
        </Container>
      </section>

      <section className="border-t border-white/[0.06]">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/credentials"
              title="Credentials."
              description="Certifications in cloud and cybersecurity."
            />
          </Reveal>
          <ul className="mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {CERTIFICATIONS.map((cert, index) => (
              <Reveal key={cert.title} delay={index * 40}>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-base font-medium text-text-primary">
                    {cert.title}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {cert.issuer}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b absolute inset-0"
      />
      <GradientOrbs
        className="opacity-50"
        colors={["#3b82f6", "#7c3aed", "#0284c7"]}
      />
      <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-sm text-accent">
              {"> "}
              System &amp; Network Engineer
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Nabin Dhungana
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              Aspiring Cloud Solutions Architect. Engineering reliable
              infrastructure, secure networks, and scalable cloud systems.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild>
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline">
                <Link href={CV_PATH}>Download CV</Link>
              </Button>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <Reveal delay={200}>
            <dl className="rounded border border-white/[0.06] bg-background-card/90 p-6 backdrop-blur sm:p-8">
              <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {"profile // active"}
              </dt>
              <div className="mt-6 space-y-5">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    role
                  </dt>
                  <dd className="mt-1 text-text-primary">
                    System &amp; Network Engineer
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    focus
                  </dt>
                  <dd className="mt-2">
                    <TagList
                      tags={["Networking", "Systems", "Cloud", "Security"]}
                    />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    certifications
                  </dt>
                  <dd className="mt-2 space-y-1">
                    {CERTIFICATIONS.slice(0, 3).map((cert) => (
                      <p
                        key={cert.title}
                        className="text-sm text-text-secondary"
                      >
                        {cert.title}
                      </p>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    links
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-3 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-text-primary"
                    >
                      GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={SITE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-text-primary"
                    >
                      LinkedIn
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
