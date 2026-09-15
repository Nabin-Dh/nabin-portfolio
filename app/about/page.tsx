import { Award, Cloud, Network, Server, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { SITE } from "@/lib/constants";
import {
  CERTIFICATIONS,
  ENGINEERING_APPROACH,
  FOCUS_AREAS,
  type FocusArea,
  PROFILE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nabin Dhungana — hands-on infrastructure engineering across networking, systems, security, and cloud, with a growing focus on cloud architecture.",
  alternates: {
    canonical: "/about",
  },
};

const FOCUS_ICONS: Record<FocusArea["icon"], typeof Network> = {
  network: Network,
  systems: Server,
  cloud: Cloud,
  security: ShieldCheck,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/about"
        title="About"
        description="Hands-on infrastructure engineering across networking, systems, security, and cloud."
      />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                Who I am
              </h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                {PROFILE.bio}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Where I&apos;m headed
              </h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                {PROFILE.direction}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                What I work across
              </h2>
              <p className="mt-6 leading-7 text-text-secondary">
                My work and learning span four domains. Each one is a layer of
                infrastructure I touch directly — not a collection of isolated
                tools.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {FOCUS_AREAS.map((area, index) => {
                  const Icon = FOCUS_ICONS[area.icon];
                  return (
                    <Reveal key={area.title} delay={index * 40}>
                      <SpotlightCard className="h-full">
                        <div className="h-full rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-accent-muted text-accent">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-text-primary">
                            {area.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-text-secondary">
                            {area.summary}
                          </p>
                          <ul className="mt-4 flex flex-col gap-1.5">
                            {area.points.map((point) => (
                              <li
                                key={point}
                                className="before:mr-2 before:text-accent before:content-['·'] text-sm text-text-secondary"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </SpotlightCard>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                How I work
              </h2>
              <dl className="mt-6 space-y-5">
                {ENGINEERING_APPROACH.map((principle) => (
                  <div
                    key={principle.title}
                    className="border-l border-accent/40 pl-4"
                  >
                    <dt className="font-semibold text-text-primary">
                      {principle.title}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-text-secondary">
                      {principle.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <div id="certifications" className="scroll-mt-24">
                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                  Certifications
                </h2>
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  The certifications behind the networking, cloud, and security
                  work on this site, verified on{" "}
                  <a
                    href={SITE.socials.credly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent transition-colors hover:text-text-primary"
                  >
                    Credly
                  </a>
                  .
                </p>
                <ul className="mt-6 divide-y divide-border-subtle border-y border-border-subtle">
                  {CERTIFICATIONS.map((cert) => (
                    <li
                      key={cert.title}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <span className="flex items-start gap-2 text-base font-medium text-text-primary">
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {cert.title}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">
                        {cert.issuer}
                        {cert.issuedYear ? ` · ${cert.issuedYear}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/projects">View my projects</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Reveal>
                <div className="rounded-2xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)]">
                  <ProfilePhoto
                    name={PROFILE.name}
                    className="aspect-square w-full"
                  />
                  <dl className="mt-6 space-y-6">
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Focus
                      </dt>
                      <dd className="mt-2 text-text-primary">{SITE.tagline}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Experience
                      </dt>
                      <dd className="mt-2 text-text-primary">
                        2+ years across networking, systems, security, and cloud
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Contact
                      </dt>
                      <dd className="mt-2 text-text-primary">
                        <a
                          href={`mailto:${SITE.email}`}
                          className="transition-colors hover:text-accent"
                        >
                          {SITE.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Elsewhere
                      </dt>
                      <dd className="mt-3 flex items-center gap-3">
                        <a
                          href={SITE.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub profile"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                        <a
                          href={SITE.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn profile"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
