import {
  Cloud,
  type LucideIcon,
  Network,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/TagList";
import { EXPERIENCE_DOMAINS, type ExperienceDomain } from "@/lib/content";

const AREA_ICONS: Record<ExperienceDomain["area"], LucideIcon> = {
  network: Network,
  systems: Server,
  security: ShieldCheck,
  cloud: Cloud,
  infrastructure: Server,
};

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My hands-on experience in systems and network engineering — enterprise networking, systems administration, cloud infrastructure, and security.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/experience"
        title="Experience"
        description="Hands-on technical experience across systems and network engineering."
      />

      <Container className="py-16 sm:py-24">
        <Reveal>
          <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-text-primary">
            <Wrench className="h-6 w-6 text-accent" />
            Technical experience
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            Two-plus years of hands-on practice across enterprise networking,
            system administration, cloud infrastructure, and security. The
            domains below reflect where that experience is concentrated and
            deepening every day.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {EXPERIENCE_DOMAINS.map((domain, index) => (
            <Reveal key={domain.title} delay={(index % 2) * 60}>
              <SpotlightCard>
                <div className="h-full rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)] sm:p-8">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {(() => {
                      const AreaIcon = AREA_ICONS[domain.area];
                      return (
                        <AreaIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-accent"
                        />
                      );
                    })()}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">
                    {domain.title}
                  </h3>
                  <p className="mt-3 leading-7 text-text-secondary">
                    {domain.summary}
                  </p>
                  <div className="mt-5">
                    <TagList tags={domain.focus} />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
