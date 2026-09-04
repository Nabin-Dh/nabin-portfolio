// Client-side API layer for article metrics (views + reactions).
//
// All functions are safe to call from the browser and contain NO secrets — they
// talk to the serverless Azure Functions API at `/api/*` (see the `api/` folder).
//
// Honesty rule: metrics are only displayed when the backend returns real,
// persisted numbers. If the API is unreachable or unconfigured, every function
// resolves to `null`/`false` and the UI shows nothing — counts are never
// fabricated.
//
// Privacy: the only client-side value persisted is a random, non-personal
// browser-session id used purely for de-duplication. No fingerprinting, no PII.

export type FeedbackMetrics = {
  articleSlug: string;
  helpful: number;
  notHelpful: number;
  views: number;
};

export type FeedbackVote = "helpful" | "not-helpful";

// Same-origin by default; override with NEXT_PUBLIC_API_URL if the API is
// served from a different origin in a preview/staging environment.
function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}

const VISITOR_KEY = "portfolio:visitor-id";
const VIEWS_SEEN_KEY = "portfolio:views-seen";

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${apiBase()}/api${path}`, {
      cache: "no-store",
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function readJson<T>(key: string): T[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeJson(key: string, value: unknown[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode / quota) — de-dup just won't persist.
  }
}

/** Random, non-personal browser-session id, created once and reused. */
export function getVisitorId(): string {
  if (typeof window === "undefined") {
    return "ssr-unknown";
  }
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing && /^[a-zA-Z0-9-]{8,64}$/.test(existing)) {
    return existing;
  }
  const id = crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    window.localStorage.setItem(VISITOR_KEY, id);
  } catch {
    // ignore storage errors
  }
  return id;
}

/**
 * Register a unique view. The server de-duplicates daily per visitor; the local
 * guard additionally prevents a single browser session from even POSTing more
 * than once per article. Returns the updated view count, or null if the backend
 * is unavailable/unconfigured.
 */
export async function recordView(slug: string): Promise<number | null> {
  const seen = readJson<string>(VIEWS_SEEN_KEY);
  if (seen.includes(slug)) {
    return null;
  }
  const res = await request<{ views: number }>("/insights/views", {
    method: "POST",
    body: JSON.stringify({ slug, visitorId: getVisitorId() }),
  });
  if (!res || typeof res.views !== "number") {
    return null;
  }
  writeJson(VIEWS_SEEN_KEY, [...seen, slug]);
  return res.views;
}

/**
 * Register a Useful / Not-useful reaction. Returns the updated metrics when the
 * backend is available, or null when it isn't (so the UI can stay honest).
 */
export async function recordFeedback(
  slug: string,
  vote: FeedbackVote,
): Promise<FeedbackMetrics | null> {
  return request<FeedbackMetrics>("/insights/reaction", {
    method: "POST",
    body: JSON.stringify({ slug, vote, visitorId: getVisitorId() }),
  });
}

/** Fetch current, real metrics for an article, or null when unavailable. */
export async function getArticleMetrics(
  slug: string,
): Promise<FeedbackMetrics | null> {
  return request<FeedbackMetrics>(
    `/insights?slug=${encodeURIComponent(slug)}`,
    { method: "GET" },
  );
}
