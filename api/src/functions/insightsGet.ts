// GET /api/insights?slug=<slug>
//
// Returns current, real metrics for an article: { slug, views, helpful,
// notHelpful }. When the metrics backend isn't configured, the client shows
// nothing rather than fabricated numbers.

import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";

import { getMetrics } from "../lib/tables.js";
import { validateSlug } from "../lib/validate.js";

app.http("insightsGet", {
  methods: ["GET"],
  route: "insights",
  authLevel: "anonymous",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const slugCheck = validateSlug(request.query.get("slug"));
    if (!slugCheck.ok) {
      return { status: 400, jsonBody: { error: "A valid 'slug' query parameter is required." } };
    }

    const metrics = await getMetrics(slugCheck.slug);
    if (!metrics) {
      return {
        status: 503,
        jsonBody: { error: "Metrics are not configured." },
      };
    }
    return { status: 200, jsonBody: metrics };
  },
});
