import { GradientOrbs } from "@/components/fx/GradientOrbs";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b absolute inset-0"
      />
      <GradientOrbs
        className="opacity-40"
        colors={["#2563eb", "#6d28d9", "#0e7490"]}
      />
      <Container className="relative flex flex-col gap-4 py-16 sm:py-24">
        {eyebrow ? (
          <p className="flex items-center gap-2 font-mono text-sm text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-lg leading-8 text-text-secondary">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
