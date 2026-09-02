import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded border border-white/[0.06] bg-background-card",
        className,
      )}
      {...props}
    />
  );
}
