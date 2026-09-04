// Shared, dependency-light input validation + sanitization for the API.
// Used by both the contact and insights endpoints.

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip control characters and surrounding whitespace. This prevents CR/LF
// header injection in outbound email ('From'/'Reply-To') and trims user text.
export function sanitize(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  // eslint-compatible: remove ASCII control chars except tab, and trim.
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export function validateContact(body: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
  data: { name: string; email: string; subject: string; message: string };
} {
  const errors: FieldErrors = {};
  const name = sanitize(body.name).slice(0, 100);
  const email = sanitize(body.email).slice(0, 254);
  const subject = sanitize(body.subject).slice(0, 200);
  const message = sanitize(body.message).slice(0, 5000);

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 100) {
    errors.name = "Name is too long.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "A valid email address is required.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 5000) {
    errors.message = "Message is too long (max 5000 characters).";
  }

  if (subject.length > 200) {
    errors.subject = "Subject is too long (max 200 characters).";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { name, email, subject, message },
  };
}

export function validateSlug(value: unknown): { ok: boolean; slug: string } {
  const slug = sanitize(value).toLowerCase();
  // /insights/[slug] slugs are generated from file names; constrain to a safe
  // pattern to avoid injection into queries / row keys.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { ok: false, slug: "" };
  }
  return { ok: true, slug };
}

export function validateVote(value: unknown): "helpful" | "not-helpful" | null {
  return value === "helpful" || value === "not-helpful" ? value : null;
}

// A client-supplied, non-personal random id used ONLY for de-duplication (one
// view / one reaction per article per session). It is not a fingerprint and
// contains no personal data. Enforce a safe shape.
export function validateVisitorId(value: unknown): string | null {
  const id = sanitize(value);
  return /^[a-zA-Z0-9-]{8,64}$/.test(id) ? id : null;
}
