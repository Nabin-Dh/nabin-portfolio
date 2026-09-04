import { ArrowUpRight } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { CloudLogo } from "@/components/ui/CloudLogo";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { CONTACT_TOPICS, CV_PATH, NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background-secondary/40">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2"
            aria-label={`${SITE.name} — home`}
          >
            <CloudLogo size={24} />
            <span className="text-base font-semibold tracking-tight">
              {SITE.name}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-text-secondary">
            System &amp; Network Engineer | Aspiring Cloud Solutions Architect.
            Engineer of reliable, secure, and scalable infrastructure.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            {SITE.email}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-1 content-start gap-2"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            Navigate
          </p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Resources"
          className="grid grid-cols-1 content-start gap-2"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            Resources
          </p>
          <Link
            href={CV_PATH}
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Download CV
          </Link>
          <Link
            href="/projects"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Projects
          </Link>
          <Link
            href="/credentials"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Credentials
          </Link>
          <a
            href={SITE.socials.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Credly
          </a>
        </nav>

        <nav
          aria-label="Open to opportunities"
          className="grid grid-cols-1 content-start gap-2"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            Open to
          </p>
          {CONTACT_TOPICS.map((topic) => (
            <Link
              key={topic}
              href="/contact"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {topic}
            </Link>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border-subtle">
        <Container className="flex flex-col gap-2 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-text-secondary">
            © 2026 {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-secondary">
            System &amp; Network Engineering · Cloud · Security
          </p>
        </Container>
      </div>
    </footer>
  );
}
