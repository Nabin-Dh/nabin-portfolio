import { Award, Mail } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/fx/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { CONTACT_TOPICS, CV_PATH, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nabin Dhungana — System & Network Engineer.",
  alternates: {
    canonical: "/contact",
  },
};

const CHANNELS = [
  {
    label: "Email",
    icon: Mail,
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    hint: "Direct",
  },
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    value: "in/linkedin",
    href: SITE.socials.linkedin,
    hint: "Professional",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    value: "Nabin-Dh",
    href: SITE.socials.github,
    hint: "Code & repos",
  },
  {
    label: "Credentials",
    icon: Award,
    value: "credly.com",
    href: SITE.socials.credly,
    hint: "Certifications",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/contact"
        title="Contact"
        description="Have a role, project, or infrastructure challenge to discuss? Get in touch."
      />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                Send a message
              </h2>
              <p className="mt-3 text-text-secondary">
                Fill in the form and your message is delivered securely to my
                inbox — no extra apps needed.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:pl-8">
            <Reveal delay={80}>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-text-primary">
                Direct channels
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-6 space-y-3">
                {CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  const isMailto = channel.href.startsWith("mailto:");
                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target={isMailto ? undefined : "_blank"}
                        rel={isMailto ? undefined : "noopener noreferrer"}
                        className="group flex items-center gap-4 rounded-xl border border-border-subtle bg-background-card p-4 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-accent hover:shadow-[var(--shadow-card-hover)]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-accent-muted text-text-secondary transition-colors group-hover:text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-text-secondary">
                            {channel.label} · {channel.hint}
                          </p>
                          <p className="truncate text-text-primary">
                            {channel.value}
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 rounded-xl border border-border-subtle bg-background-card p-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  What I&apos;m open to
                </h3>
                <ul className="mt-4 space-y-2">
                  {CONTACT_TOPICS.map((topic) => (
                    <li
                      key={topic}
                      className="before:mr-2 before:text-accent before:content-['·'] text-sm text-text-secondary"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-text-primary">CV</h3>
                <p className="text-sm leading-6 text-text-secondary">
                  Download my current CV for a full overview of skills and
                  credentials.
                </p>
                <Button asChild variant="outline" className="self-start">
                  <Link href={CV_PATH}>Download CV</Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </div>
  );
}
