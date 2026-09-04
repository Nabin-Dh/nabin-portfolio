import {
  ArrowUpRight,
  Cloud,
  FileText,
  Network,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
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
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
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
  title: SITE.name,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

const CATEGORY_ICON: Record<string, typeof Network> = {
  Networking: Network,
  "Systems & Infrastructure": Server,
  "Cloud & Virtualization": Cloud,
  Cybersecurity: ShieldCheck,
  "IT Operations & Technical Support": Wrench,
};

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 2);
  const latestInsight = getAllInsights()[0];

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/expertise"
              title="Engineering today's infrastructure, architecting for the cloud."
              description="System & network engineering across networking, systems, cloud, and cybersecurity."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = CATEGORY_ICON[category.title];
              return (
                <Reveal key={category.title} delay={index * 60}>
                  <SpotlightCard>
                    <div className="group h-full bg-background-card p-6 transition-colors hover:bg-background-elevated">
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded border border-border-subtle text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                          0{index + 1} / {SKILL_CATEGORIES.length}
                        </p>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-text-primary">
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
              );
            })}
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

      <section className="relative overflow-hidden border-t border-border-subtle">
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
                  <div className="h-full rounded-xl border border-border-subtle bg-background-card/80 p-6 shadow-[var(--shadow-card)] backdrop-blur transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
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
                className="flex h-full min-h-[150px] flex-col items-start justify-end gap-2 rounded-xl border border-dashed border-border-strong p-6 transition-colors hover:border-accent"
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

      <section className="border-t border-border-subtle">
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
                <SpotlightCard className="h-full">
                  <ProjectCard project={project} />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle bg-background-secondary/50">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/approach"
              title="Engineering approach."
              description="Principles that guide how I design, build, and operate infrastructure."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="border-t border-border-subtle">
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
                <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-border-strong bg-background-card/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-border-subtle text-accent">
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

      <section className="border-t border-border-subtle">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="/credentials"
              title="Credentials."
              description="Certifications in cloud and cybersecurity."
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
              href="/credentials"
              className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
            >
              view all credentials...
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
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
      <GradientOrbs
        className="opacity-50"
        colors={["#2563eb", "#7c3aed", "#0284c7"]}
      />
      <Container className="relative grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background-card/70 px-3 py-1 font-mono text-xs text-text-secondary backdrop-blur">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 font-mono text-sm text-accent">
              {"> "}System &amp; Network Engineer
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              Nabin Dhungana
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary sm:text-xl">
              Aspiring Cloud Solutions Architect. Engineering reliable
              infrastructure, secure networks, and scalable cloud systems.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href={CV_PATH}>Download CV</Link>
              </Button>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-md grid-cols-2 gap-4 border-t border-border-subtle pt-8 sm:grid-cols-4">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Domain
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  Network
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Systems
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  Windows · Linux
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Cloud
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  Azure · AWS
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  Security
                </dt>
                <dd className="mt-1 text-sm font-medium text-text-primary">
                  Network Sec.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <div className="relative mx-auto max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/10 via-transparent to-transparent blur-2xl"
              />
              <div className="relative rounded-3xl border border-border-subtle bg-background-card/80 p-5 shadow-[var(--shadow-card)] backdrop-blur">
                <ProfilePhoto
                  name={SITE.name}
                  className="aspect-square w-full"
                />
                <div className="mt-5 flex items-center justify-between rounded-xl border border-border-subtle bg-background-elevated/60 px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-text-secondary">
                      status
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-text-primary">
                      System &amp; Network Engineer
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
