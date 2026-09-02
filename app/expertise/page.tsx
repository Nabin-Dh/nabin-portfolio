import { Boxes, Cloud, Network, Server, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/TagList";
import {
  DOMAINS,
  type ProfessionalDomain,
  SKILL_CATEGORIES,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Technical expertise of Nabin Dhungana across networking, systems administration, cloud (Azure, AWS), and cybersecurity.",
  alternates: {
    canonical: "/expertise",
  },
};

const CATEGORY_ICONS: Record<ProfessionalDomain["icon"], typeof Network> = {
  network: Network,
  systems: Server,
  security: ShieldCheck,
  cloud: Cloud,
  infrastructure: Boxes,
};

const SKILL_CATEGORY_ICONS: Record<string, typeof Network> = {
  Networking: Network,
  Systems: Server,
  Cloud: Cloud,
  Cybersecurity: ShieldCheck,
};

export default function ExpertisePage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/expertise"
        title="Expertise"
        description="Engineering skills across networking, systems, cloud, and cybersecurity."
      />

      <Container className="py-16 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            Professional domains
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            Five overlapping areas where I work hands-on — from physical
            infrastructure to cloud architecture.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:[&>*:nth-child(odd)]:col-span-1 lg:[&>*:nth-child(even)]:col-span-1">
          {DOMAINS.map((domain, index) => {
            const Icon = CATEGORY_ICONS[domain.icon];
            return (
              <Reveal key={domain.title} delay={(index % 2) * 60}>
                <SpotlightCard>
                  <section className="group h-full rounded border border-white/[0.06] bg-background-card p-6 transition-colors hover:border-white/[0.12] sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight text-text-primary">
                          {domain.title}
                        </h3>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-text-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
                      {domain.summary}
                    </p>
                    <div className="mt-5">
                      <TagList tags={domain.capabilities} />
                    </div>
                  </section>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <h2 className="mt-20 text-2xl font-semibold tracking-tight text-text-primary">
            Core skills
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            The fundamental skill set underpinning the domains above.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = SKILL_CATEGORY_ICONS[category.title];
            return (
              <Reveal key={category.title} delay={index * 60}>
                <SpotlightCard>
                  <section className="group h-full rounded border border-white/[0.06] bg-background-card p-6 transition-colors hover:border-white/[0.12] sm:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-text-primary">
                        {category.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
                      {category.description}
                    </p>
                    <div className="mt-5">
                      <TagList tags={category.skills} />
                    </div>
                  </section>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
