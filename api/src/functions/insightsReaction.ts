// POST /api/insights/reaction
//
// Registers a Useful / Not-useful reaction for an article. Idempotent per
// visitor: only the first reaction for a given article counts (subsequent
// reactions from the same visitor are ignored, so counts can't be inflated).

import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";

import { allow, clientIpKey } from "../lib/ratelimit.js";
import { ensureTable, registerReaction } from "../lib/tables.js";
import { validateSlug, validateVisitorId, validateVote } from "../lib/validate.js";

app.http("insightsReaction", {
  methods: ["POST", "OPTIONS"],
  route: "insights/reaction",
  authLevel: "anonymous",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    if (request.method === "OPTIONS") {
      return { status: 204 };
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!allow(clientIpKey(ip, "reaction"), 30, 60_000)) {
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
    const vote = validateVote(body.vote);
    if (!slugCheck.ok || !visitorId || !vote) {
      return { status: 400, jsonBody: { error: "Missing or invalid parameters." } };
    }

    await ensureTable();
    const metrics = await registerReaction(slugCheck.slug, visitorId, vote);
    if (!metrics) {
      return { status: 503, jsonBody: { error: "Metrics are not configured." } };
    }
    return { status: 200, jsonBody: metrics };
  },
});
