import { Briefcase, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/TagList";
import { EMPLOYMENT, EXPERIENCE_DOMAINS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Nabin Dhungana — System & Network Engineer at Rolling Plans Pvt. Ltd.",
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
        description="Professional roles and hands-on technical domains in systems and network engineering."
      />

      <Container className="py-16 sm:py-24">
        <Reveal>
          <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-text-primary">
            <Briefcase className="h-6 w-6 text-accent" />
            Professional employment
          </h2>
        </Reveal>
        <ol className="relative mt-8 space-y-12 border-l border-white/[0.06] pl-6">
          {EMPLOYMENT.map((role, index) => (
            <Reveal key={`${role.company}-${role.start}`} delay={index * 60}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-2 flex h-[7px] w-[7px] items-center justify-center rounded-full bg-accent ring-4 ring-accent/20"
                />
                <p className="font-mono text-sm text-accent">
                  {role.start}
                  {role.end ? ` — ${role.end}` : " — Present"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
                  {role.title}
                </h3>
                <p className="mt-1 text-text-secondary">{role.company}</p>
                <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
                  {role.summary}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <h2 className="mt-20 flex items-center gap-3 text-2xl font-semibold tracking-tight text-text-primary">
            <Wrench className="h-6 w-6 text-accent" />
            Technical experience
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            Domains where I apply hands-on technical experience in day-to-day
            engineering — separate from, and complementary to, the employment
            record above.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {EXPERIENCE_DOMAINS.map((domain, index) => (
            <Reveal key={domain.title} delay={(index % 2) * 60}>
              <SpotlightCard>
                <div className="h-full rounded border border-white/[0.06] bg-background-card p-6 transition-colors hover:border-white/[0.12] sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
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
