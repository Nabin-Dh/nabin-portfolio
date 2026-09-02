import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import { cn } from "@/lib/utils";

const PROFILE_DIR = path.join(process.cwd(), "public", "profile");
const FILENAMES = ["profile.jpg", "profile.png", "profile.webp", "me.jpg"];

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

export function ProfilePhoto({ className }: { className?: string }) {
  const src = findProfilePhoto();

  if (!src) {
    return null;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded border border-white/[0.06]",
        className,
      )}
    >
      <Image
        src={src}
        alt="Portrait of Nabin Dhungana"
        width={640}
        height={640}
        priority
        sizes="(max-width: 1024px) 320px, 480px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
