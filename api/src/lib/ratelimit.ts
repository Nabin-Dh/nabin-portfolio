// Simple in-memory rate limiter.
//
// IMPORTANT LIMITATION: serverless function instances are ephemeral and may
// reset on scale-out / cold starts, so this is a *best-effort* per-instance
// limiter, not a global one. It is enough to blunt trivial scripted abuse of a
// single instance; for strict distributed limits, move this into Table Storage
// (see metrics deduplication, which IS authoritative via the database).
//
// No personal data is retained — keys are hashed and entries expire naturally.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function hashKey(input: string): string {
  // Simple stable hash (djb2). We never store raw IPs / visitor ids.
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

/**
 * Returns true when the caller may proceed; false when the limit is exceeded.
 * @param key a string identifying the caller (e.g. hashed ip + route)
 * @param max maximum allowed calls in the window
 * @param windowMs the length of the window
 */
export function allow(key: string, max: number, windowMs: number): boolean {
  const k = hashKey(key);
  const now = Date.now();
  const current = buckets.get(k);
  if (!current || current.resetAt <= now) {
    buckets.set(k, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup to avoid unbounded growth.
    if (buckets.size > 10_000) {
      for (const [existingKey, bucket] of buckets) {
        if (bucket.resetAt <= now) {
          buckets.delete(existingKey);
        }
      }
    }
    return true;
  }
  if (current.count >= max) {
    return false;
  }
  current.count += 1;
  return true;
}

/** Derive a caller key from the request (hashed client IP). */
export function clientIpKey(ip: string, route: string): string {
  return `${route}:${ip}`;
}
