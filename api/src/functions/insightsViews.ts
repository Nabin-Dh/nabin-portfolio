// POST /api/insights/views
//
// Registers a unique view for an article. De-duplication is authoritative on
// the server: a visitorId counts at most once per article per day. The visitor
// id is a random, non-personal browser-session id (see lib/feedback.ts
// client side) — never a fingerprint.

import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";

import { allow, clientIpKey } from "../lib/ratelimit.js";
import { ensureTable, registerView } from "../lib/tables.js";
import { validateSlug, validateVisitorId } from "../lib/validate.js";

app.http("insightsViews", {
  methods: ["POST", "OPTIONS"],
  route: "insights/views",
  authLevel: "anonymous",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    if (request.method === "OPTIONS") {
      return { status: 204 };
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!allow(clientIpKey(ip, "views"), 60, 60_000)) {
      return { status: 429, jsonBody: { error: "Too many requests." } };
    }

    if (Number(request.headers.get("content-length") ?? 0) > 4_096) {
      return { status: 413, jsonBody: { error: "Payload too large." } };
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return { status: 400, jsonBody: { error: "Invalid request body." } };
    }

    const slugCheck = validateSlug(body.slug);
    const visitorId = validateVisitorId(body.visitorId);
    if (!slugCheck.ok || !visitorId) {
      return { status: 400, jsonBody: { error: "Missing or invalid parameters." } };
    }

    await ensureTable();
    const views = await registerView(slugCheck.slug, visitorId);
    if (views === null) {
      // Backend not configured.
      return { status: 503, jsonBody: { error: "Metrics are not configured." } };
    }
    return { status: 200, jsonBody: { slug: slugCheck.slug, views } };
  },
});
