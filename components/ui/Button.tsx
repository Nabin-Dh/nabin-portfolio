import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded border font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variant === "default" &&
          "border-transparent bg-accent text-white hover:bg-accent/90",
        variant === "outline" &&
          "border-white/15 text-text-primary hover:border-accent hover:text-accent",
        variant === "ghost" &&
          "border-transparent text-text-secondary hover:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}
