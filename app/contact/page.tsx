import { Award, Mail } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/fx/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Nabin Dhungana about networking, systems, cloud infrastructure, and security.",
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
    value: "in/nabin-dhungana",
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
        eyebrow="contact"
        title="Contact"
        description="Questions about the projects here, feedback, or help with an infrastructure problem — email is the most direct route."
      />

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                Send a message
              </h2>
              <p className="mt-3 text-text-secondary">
                Compose an email in your mail app with the details pre-filled —
                no server involved, your message goes straight to the inbox.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:pl-8">
            <Reveal delay={80}>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
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
          </aside>
        </div>
      </Container>
    </div>
  );
}
