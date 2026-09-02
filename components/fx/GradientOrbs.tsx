import { cn } from "@/lib/utils";

export function GradientOrbs({
  className,
  colors = ["#3b82f6", "#8b5cf6", "#0ea5e9"],
}: {
  className?: string;
  colors?: [string, string, string];
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <span
        className="gradient-orb -left-24 -top-24 h-72 w-72"
        style={{ background: colors[0] }}
      />
      <span
        className="gradient-orb -bottom-32 -right-16 h-80 w-80"
        style={{ background: colors[1], animationDelay: "-8s" }}
      />
      <span
        className="gradient-orb left-1/2 top-1/3 h-56 w-56"
        style={{ background: colors[2], animationDelay: "-14s" }}
      />
    </div>
  );
}
