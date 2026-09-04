import { Award, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { CERTIFICATIONS, EDUCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Certifications and credentials of Nabin Dhungana — Microsoft Azure, Google Cybersecurity, Aviatrix multicloud networking, and Red Hat Linux.",
  alternates: {
    canonical: "/credentials",
  },
};

export default function CredentialsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/credentials"
        title="Credentials"
        description="Certifications and professional training in cloud infrastructure, networking, and security."
      />

      <Container className="py-16 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            Certifications
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            Verified credentials in cloud, networking, and security.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {CERTIFICATIONS.map((cert, index) => (
            <Reveal key={cert.title} delay={(index % 2) * 60}>
              <SpotlightCard>
                <li className="group flex gap-4 rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-accent-muted text-accent">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {cert.issuer}
                      {cert.issuedYear ? ` · Issued ${cert.issuedYear}` : ""}
                      {cert.expiresYear ? ` · Expires ${cert.expiresYear}` : ""}
                    </p>
                  </div>
                </li>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-sm text-text-secondary">
          Verify certifications on{" "}
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

        <Reveal>
          <h2 className="mt-20 text-2xl font-semibold tracking-tight text-text-primary">
            Education &amp; professional training
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
            Formal training and certifications that build on foundational
            knowledge in systems, networks, and cloud.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {EDUCATION.map((item, index) => (
            <Reveal
              key={`${item.institution}-${item.title}`}
              delay={(index % 2) * 60}
            >
              <SpotlightCard>
                <li className="flex gap-4 rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-accent-muted text-accent">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {item.type}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {item.institution}
                      {item.issuedYear ? ` · ${item.issuedYear}` : ""}
                    </p>
                  </div>
                </li>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </div>
  );
}
