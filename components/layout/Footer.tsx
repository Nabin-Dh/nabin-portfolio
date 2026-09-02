import { ArrowUpRight } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { CV_PATH, NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <Container className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="flex items-baseline gap-2">
            <span className="font-mono text-sm text-accent">&gt;_</span>
            <span className="text-base font-semibold tracking-tight">
              {SITE.name}
            </span>
          </p>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            System &amp; Network Engineer | Aspiring Cloud Solutions Architect.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            {SITE.email}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3 lg:gap-x-16"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CV_PATH}
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            CV
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </Container>
      <div className="border-t border-white/[0.06]">
        <Container className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="font-mono text-xs text-text-secondary">
            System &amp; Network Engineer
          </p>
        </Container>
      </div>
    </footer>
  );
}
