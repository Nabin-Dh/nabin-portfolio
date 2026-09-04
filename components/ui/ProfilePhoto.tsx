import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import { cn } from "@/lib/utils";

const PROFILE_DIR = path.join(process.cwd(), "public", "profile");
const FILENAMES = [
  "profile.jpg",
  "profile.jpeg",
  "profile.png",
  "profile.webp",
  "me.jpg",
];

function findProfilePhoto(): string | null {
  if (!fs.existsSync(PROFILE_DIR)) {
    return null;
  }
  for (const filename of FILENAMES) {
    if (fs.existsSync(path.join(PROFILE_DIR, filename))) {
      return `/profile/${filename}`;
    }
  }
  return null;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfilePhoto({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const src = findProfilePhoto();

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border-subtle bg-background-card shadow-[var(--shadow-card)]",
          className,
        )}
      >
        <Image
          src={src}
          alt={`Portrait of ${name}`}
          width={640}
          height={640}
          priority
          sizes="(max-width: 1024px) 320px, 480px"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name} — initials placeholder`}
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-accent-muted via-background-card to-background-secondary",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/30 bg-background-card/80 shadow-[var(--shadow-card)] backdrop-blur sm:h-32 sm:w-32">
        <span className="font-mono text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
          {initials(name)}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-3 flex h-4 w-4 items-center justify-center"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background-card bg-accent" />
        </span>
      </span>
    </div>
  );
}
