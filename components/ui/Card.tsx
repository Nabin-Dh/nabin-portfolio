import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-background-card shadow-[var(--shadow-card)] transition-all duration-300",
        className,
      )}
      {...props}
    />
  );
}
