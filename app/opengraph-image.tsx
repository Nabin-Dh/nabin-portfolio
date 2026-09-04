import { ImageResponse } from "next/og";

import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — ${SITE.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0e1a";
const GRID = "rgba(255,255,255,0.05)";
const TEXT_PRIMARY = "#e5e7eb";
const TEXT_SECONDARY = "#9ca3af";
const ACCENT = "#3b82f6";

const ROLE_LINE = SITE.role.split("|")[0].trim();
const DOMAIN_LINE = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function gridBackground() {
  const cells: string[] = [];
  const step = 48;
  for (let x = 0; x <= size.width; x += step) {
    cells.push(`M ${x} 0 V ${size.height}`);
  }
  for (let y = 0; y <= size.height; y += step) {
    cells.push(`M 0 ${y} H ${size.width}`);
  }
  return `${[...cells].join(" ")}`;
}

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        color: TEXT_PRIMARY,
        fontFamily: "sans-serif",
        padding: "64px 72px",
        position: "relative",
      }}
    >
      <svg
        aria-hidden="true"
        width={size.width}
        height={size.height}
        style={{ position: "absolute", inset: 0 }}
      >
        <path d={gridBackground()} stroke={GRID} strokeWidth={1} />
      </svg>

      {/* accent glow */}
      <svg
        aria-hidden="true"
        width="560"
        height="560"
        style={{ position: "absolute", top: -160, right: -140, opacity: 0.35 }}
      >
        <circle cx="280" cy="280" r="280" fill={ACCENT} />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{ position: "relative", width: 48, height: 36, display: "flex" }}
          >
            <svg
              viewBox="0 0 38 28"
              width={48}
              height={36}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9.5 19.5C6.5 19.5 4 17.2 4 14.2c0-2.4 1.5-4.5 3.7-5.4C8 5.4 10.2 3.5 13 3.5c2.2 0 4.1 1.1 5.3 2.7C19 4.7 20.5 4 22.2 4c3.2 0 5.8 2.5 5.8 5.6 0 .2 0 .5-.1.7A5.3 5.3 0 0 1 31 14c0 3-2.5 5.5-5.5 5.5H9.5Z"
                fill={ACCENT}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "sans-serif",
                letterSpacing: "-0.04em",
              }}
            >
              ND
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: 24,
            display: "flex",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 34,
            color: TEXT_SECONDARY,
            marginTop: 16,
            display: "flex",
          }}
        >
          {ROLE_LINE}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
          fontFamily: "monospace",
          fontSize: 24,
          color: TEXT_SECONDARY,
        }}
      >
        <div style={{ display: "flex" }}>{DOMAIN_LINE}</div>
        <div style={{ display: "flex", color: ACCENT }}>
          cloud · network · security
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
