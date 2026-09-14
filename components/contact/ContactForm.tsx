"use client";

import { AlertCircle, Mail, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INPUT_CLASSES =
  "h-11 rounded-lg border border-border-subtle bg-background-card px-3 text-text-primary placeholder:text-text-secondary/70 outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

const INPUT_ERROR_CLASSES = "border-red-500/60";

function encode(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [launched, setLaunched] = useState(false);

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const fallbackSubject = `Message from ${name.trim()}`;
    const body =
      `Hi Nabin,\n\n${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`.trim();
    const href = `mailto:${SITE.email}?subject=${encode(
      subject.trim() || fallbackSubject,
    )}&body=${encode(body)}`;
    setLaunched(true);
    window.location.href = href;
  }

  if (launched) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-border-subtle bg-background-card p-6 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center gap-3">
          <Mail aria-hidden="true" className="h-6 w-6 text-accent" />
          <p className="font-semibold text-text-primary">
            Your mail app should have opened.
          </p>
        </div>
        <p className="text-sm text-text-secondary">
          Your message is ready to send to{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${SITE.email}`}
          >
            {SITE.email}
          </a>
          . If nothing opened, email me directly at{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${SITE.email}`}
          >
            {SITE.email}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setLaunched(false)}
        >
          Write another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      aria-label="Contact form"
      noValidate
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

      <div className="flex items-center gap-4">
        <Button type="submit">
          <Send className="h-4 w-4" />
          Compose email
        </Button>
        <p className="text-xs text-text-secondary">
          Opens in your default mail app, addressed to {SITE.email}.{" "}
          <a
            className="text-accent hover:underline"
            href={`mailto:${SITE.email}`}
          >
            Or email me directly
          </a>
          .
        </p>
      </div>
    </form>
  );
}
