import { cn } from "@/lib/utils";

type CloudLogoProps = {
  size?: number;
  className?: string;
};

export function CloudLogo({ size = 28, className }: CloudLogoProps) {
  return (
    <svg
      viewBox="0 0 38 28"
      width={size}
      height={(size * 28) / 38}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path
        d="M9.5 19.5C6.5 19.5 4 17.2 4 14.2c0-2.4 1.5-4.5 3.7-5.4C8 5.4 10.2 3.5 13 3.5c2.2 0 4.1 1.1 5.3 2.7C19 4.7 20.5 4 22.2 4c3.2 0 5.8 2.5 5.8 5.6 0 .2 0 .5-.1.7A5.3 5.3 0 0 1 31 14c0 3-2.5 5.5-5.5 5.5H9.5Z"
        className="fill-accent"
      />
      <text
        x="18"
        y="16.2"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white font-sans text-[8px] font-bold"
        style={{ letterSpacing: "-0.04em" }}
      >
        ND
      </text>
    </svg>
  );
}
