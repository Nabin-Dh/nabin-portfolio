import { ArrowUpRight, Cloud, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyMarquee } from "@/components/ui/TechnologyMarquee";
import { SITE } from "@/lib/constants";
import { CERTIFICATIONS, FOCUS_AREAS, PROFILE, PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

const FOCUS_ICONS = {
  network: NetworkIcon,
  systems: ServerIcon,
  cloud: Cloud,
  security: ShieldIcon,
} as const;

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="17" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="17" width="6" height="5" rx="1" />
      <path d="M4 16v1a2 2 0 0 0 2 2h3M16 9v1a4 4 0 0 0-4 4v3M4.5 14l2.1-1.7M19.5 14l-2.1-1.7" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="7" rx="1.5" />
      <rect x="3" y="14" width="18" height="7" rx="1.5" />
      <path d="M7 6.5h.01M7 17.5h.01" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
    </svg>
  );
}

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="/focus"
              title="What I work across."
              description="Four overlapping areas where I work hands-on, from the physical layer to the cloud."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS_AREAS.map((area, index) => {
              const Icon = FOCUS_ICONS[area.icon];
              return (
                <Reveal key={area.title} delay={index * 60}>
                  <div className="group h-full rounded-xl border border-border-subtle bg-background-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-accent-muted text-accent">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-text-primary">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {area.summary}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="/projects"
              title="Selected work."
              description="Two infrastructure designs — enterprise networking and Azure cloud architecture."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <SpotlightCard className="h-full">
                  <ProjectCard project={project} />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
            >
              view all projects...
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-background-secondary/50">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="/stack"
              title="Technologies."
              description="The systems, platforms, and tooling I work with day to day."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12">
              <TechnologyMarquee />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="/credentials"
              title="Credentials."
              description="Certifications in cloud, networking, and security."
            />
          </Reveal>
          <ul className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
            {CERTIFICATIONS.map((cert, index) => (
              <Reveal key={cert.title} delay={index * 40}>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-base font-medium text-text-primary">
                    {cert.title}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {cert.issuer}
                    {cert.issuedYear ? ` · ${cert.issuedYear}` : ""}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
            >
              read more in about...
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-2xl border border-border-subtle bg-background-card p-8 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  about
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">
                  The full picture
                </h2>
                <p className="mt-3 leading-7 text-text-secondary">
                  {PROFILE.bio}
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/about">
                  Read about me
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b absolute inset-0"
      />
      <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Nabin Dhungana
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-primary sm:text-xl">
              I work across networking, systems, security, and cloud
              infrastructure, with a growing focus on cloud architecture.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-xl text-lg leading-8 text-text-secondary">
              I build and understand reliable infrastructure — networks that
              switch and route, servers that stay up, and cloud environments
              designed secure and scalable from the start.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label={`Email ${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative mx-auto max-w-sm">
              <div className="relative rounded-3xl border border-border-subtle bg-background-card/80 p-5 shadow-[var(--shadow-card)] backdrop-blur">
                <ProfilePhoto
                  name={SITE.name}
                  className="aspect-square w-full"
                />
                <dl className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-background-elevated/60 px-4 py-3">
                    <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                      Focus
                    </dt>
                    <dd className="text-sm font-medium text-text-primary">
                      Networking · Systems · Cloud · Security
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
