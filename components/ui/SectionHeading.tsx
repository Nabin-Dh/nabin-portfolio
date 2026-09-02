import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="font-mono text-sm text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-8 text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
