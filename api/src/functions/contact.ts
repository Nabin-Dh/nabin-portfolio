// POST /api/contact
//
// Receives a contact form submission, validates + sanitizes it, applies
// anti-spam/abuse protection, and delivers it to the owner's inbox via
// SendGrid. All credentials live in server-side environment variables only.
//
// Environment variables:
//   SENDGRID_API_KEY       (required) SendGrid API key
//   SENDGRID_FROM_EMAIL    verified sender address (see SendGrid docs)
//   SENDGRID_FROM_NAME     display name for the sender
//   CONTACT_TO_EMAIL       (default SITE email) the recipient address

import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";
import sendGrid from "@sendgrid/mail";

import { allow, clientIpKey } from "../lib/ratelimit.js";
import { validateContact } from "../lib/validate.js";

const MIN_ELAPSED_MS = 3_000; // reject bots that submit faster than a human can type
const RATE_MAX = 5;
const RATE_WINDOW_MS = 60_000;
// Reject bodies larger than this up front (anti-abuse + request size limit).
const MAX_BODY_BYTES = 32_000;

function sender(): { fromEmail: string; fromName: string } | null {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!fromEmail || !apiKey) {
    return null;
  }
  return { fromEmail, fromName: process.env.SENDGRID_FROM_NAME ?? "Nabin Dhungana" };
}

function recipient(): string {
  return process.env.CONTACT_TO_EMAIL || "nabinndh@gmail.com";
}

function clientIp(request: HttpRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

app.http("contact", {
  methods: ["POST", "OPTIONS"],
  route: "contact",
  authLevel: "anonymous",
  handler: async (request: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    if (request.method === "OPTIONS") {
      return { status: 204 };
    }

    const ip = clientIp(request);

    if (!allow(clientIpKey(ip, "contact"), RATE_MAX, RATE_WINDOW_MS)) {
      return {
        status: 429,
        jsonBody: { error: "Too many submissions. Please try again shortly." },
      };
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return { status: 413, jsonBody: { error: "Payload too large." } };
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return { status: 400, jsonBody: { error: "Invalid request body." } };
    }

    // Honeypot: a field real humans never fill. If it has a value, it's a bot.
    if (typeof body.email_address === "string" && body.email_address.length > 0) {
      return { status: 200, jsonBody: { ok: true } };
    }

    // Timing check: forms submit too quickly are bots.
    const t0 = typeof body.__t === "number" ? body.__t : 0;
    if (Date.now() - t0 < MIN_ELAPSED_MS) {
      return { status: 200, jsonBody: { ok: true } };
    }

    const { ok, errors, data } = validateContact(body);
    if (!ok) {
      return { status: 400, jsonBody: { error: "Validation failed.", fields: errors } };
    }

    const senderObj = sender();
    if (!senderObj) {
      return {
        status: 503,
        jsonBody: { error: "Contact delivery is not configured yet." },
      };
    }

    const subject = data.subject || `Portfolio inquiry from ${data.name}`;
    const textBody = `${data.message}\n\n— ${data.name} (${data.email})`;
    const htmlBody = `<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p><p>— ${escapeHtml(data.name)} (<a href="mailto:${escapeAttr(data.email)}">${escapeHtml(data.email)}</a>)</p>`;

    try {
      sendGrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");
      await sendGrid.send({
        to: recipient(),
        from: {
          email: senderObj.fromEmail,
          name: senderObj.fromName,
        },
        replyTo: { email: data.email, name: data.name },
        subject,
        text: textBody,
        html: htmlBody,
      });
    } catch {
      return {
        status: 502,
        jsonBody: { error: "Failed to deliver the message. Please try again later." },
      };
    }

    return { status: 200, jsonBody: { ok: true } };
  },
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
