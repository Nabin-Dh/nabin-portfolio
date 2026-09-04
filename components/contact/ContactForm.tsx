"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INPUT_CLASSES =
  "h-11 rounded-lg border border-border-subtle bg-background-card px-3 text-text-primary placeholder:text-text-secondary/70 outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

const INPUT_ERROR_CLASSES = "border-red-500/60";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Anti-spam: the timestamp is used server-side to reject bot-like instant
  // submissions. The honeypot field `email_address` must stay empty for humans.
  const loadTimeRef = useRef<number>(0);
  const [honeypot, setHoneypot] = useState("");

  function startClock() {
    if (loadTimeRef.current === 0) {
      loadTimeRef.current = Date.now();
    }
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) {
      next.name = "Please enter your name.";
    }
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      next.message = "Please enter a message.";
    } else if (message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: string) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    if (!validate()) {
      return;
    }
    setStatus("sending");
    startClock();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          email_address: honeypot,
          __t: loadTimeRef.current,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setServerError(
          body?.error ?? "Something went wrong sending your message.",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError(
        "Network error — please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-accent" />
          <p className="font-semibold text-text-primary">
            Message sent successfully.
          </p>
        </div>
        <p className="text-sm text-text-secondary">
          Thank you, {name.trim() || "there"} — I&apos;ll get back to you at{" "}
          {email.trim()}. For anything urgent, you can also reach me directly at{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${SITE.email}`}
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      aria-label="Contact form"
      aria-busy={status === "sending"}
      noValidate
      onFocus={startClock}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "sending"}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            className={cn(INPUT_CLASSES, errors.name && INPUT_ERROR_CLASSES)}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="text-xs text-red-500">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "sending"}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            className={cn(INPUT_CLASSES, errors.email && INPUT_ERROR_CLASSES)}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="text-xs text-red-500">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — hidden from humans, traps bots. Must remain empty. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="email_address">Do not fill this in</label>
        <input
          id="email_address"
          name="email_address"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="font-mono text-xs uppercase tracking-widest text-text-secondary"
        >
          Subject{" "}
          <span className="font-normal normal-case text-text-secondary/60">
            (optional)
          </span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          disabled={status === "sending"}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={INPUT_CLASSES}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={status === "sending"}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            clearError("message");
          }}
          className={cn(
            "rounded-lg border border-border-subtle bg-background-card px-3 py-3 text-text-primary outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent",
            errors.message && INPUT_ERROR_CLASSES,
          )}
        />
        {errors.message ? (
          <p
            id="message-error"
            role="alert"
            className="flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" && serverError ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {serverError}{" "}
            <span className="text-text-secondary">
              Alternatively, email me directly at{" "}
              <a
                className="text-accent hover:underline"
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
              </a>
              .
            </span>
          </span>
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-text-secondary">
          Delivered securely to {SITE.email}.{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${SITE.email}`}
          >
            Prefer email?
          </a>
        </p>
      </div>
    </form>
  );
}
