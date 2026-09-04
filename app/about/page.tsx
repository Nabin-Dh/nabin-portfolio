import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { TagList } from "@/components/ui/TagList";
import { CV_PATH, SITE } from "@/lib/constants";
import {
  DOMAINS,
  EDUCATION,
  ENGINEERING_APPROACH,
  PROFILE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nabin Dhungana — System & Network Engineer focused on enterprise networking, system administration, cloud infrastructure, virtualization, and cybersecurity.",
  alternates: {
    canonical: "/about",
  },
};

const FOCUS_AREAS = [
  "Enterprise Networking",
  "System Administration",
  "Cloud Infrastructure",
  "Virtualization",
  "Cybersecurity",
] as const;

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/about"
        title="About"
        description="System & Network Engineer focused on building reliable, secure, and scalable infrastructure."
      />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                Professional Overview
              </h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                {PROFILE.bio}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Career Direction
              </h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">
                Currently working as a System &amp; Network Engineer at{" "}
                <span className="font-medium text-text-primary">
                  {PROFILE.company}
                </span>{" "}
                (since {PROFILE.roleStart}). Long-term focus is Cloud Solutions
                Architecture — designing reliable, secure, and scalable
                infrastructure.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Technical interests
              </h2>
              <ul className="mt-6 grid gap-3">
                {[
                  {
                    title: "Network engineering",
                    text: "Routing, switching, and access-layer security that keep enterprises connected.",
                  },
                  {
                    title: "Systems administration",
                    text: "Windows & Linux server operations across physical and virtualized environments.",
                  },
                  {
                    title: "Cloud infrastructure",
                    text: "Designing secure, scalable Azure infrastructure with a cloud-architecture mindset.",
                  },
                  {
                    title: "Cybersecurity",
                    text: "Hardening systems and networks with defense-in-depth and least privilege.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border border-border-subtle bg-background-card/60 px-4 py-3"
                  >
                    <p className="font-medium text-text-primary">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Professional domains
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {DOMAINS.map((domain) => (
                  <li key={domain.title}>
                    <SpotlightCard>
                      <div className="h-full rounded-xl border border-border-subtle bg-background-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
                        <h3 className="text-base font-semibold text-text-primary">
                          {domain.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                          {domain.summary}
                        </p>
                      </div>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Engineering approach
              </h2>
              <dl className="mt-6 space-y-4">
                {ENGINEERING_APPROACH.map((principle) => (
                  <div
                    key={principle.title}
                    className="border-l border-accent/40 pl-4"
                  >
                    <dt className="font-semibold text-text-primary">
                      {principle.title}
                    </dt>
                    <dd className="mt-1 leading-7 text-text-secondary">
                      {principle.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-text-primary">
                Education &amp; professional training
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {EDUCATION.map((item) => (
                  <li
                    key={`${item.institution}-${item.title}`}
                    className="rounded-xl border border-border-subtle bg-background-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {item.type}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {item.institution}
                      {item.issuedYear ? ` · ${item.issuedYear}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-12 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={CV_PATH}>Download CV</Link>
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
                        Role
                      </dt>
                      <dd className="mt-2 text-text-primary">
                        {PROFILE.role} at {PROFILE.company}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Focus Areas
                      </dt>
                      <dd>
                        <ul className="mt-2 flex flex-col gap-2">
                          {FOCUS_AREAS.map((area) => (
                            <li
                              key={area}
                              className="before:mr-2 before:text-accent before:content-['·'] text-text-secondary"
                            >
                              {area}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        Tags
                      </dt>
                      <dd className="mt-2">
                        <TagList tags={PROFILE.keywords.slice(0, 6)} />
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
