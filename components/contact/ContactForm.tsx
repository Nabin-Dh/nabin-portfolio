"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const INPUT_CLASSES =
  "h-11 rounded border border-white/10 bg-background-card px-3 text-text-primary outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      subject: subject || `Portfolio inquiry from ${name || "a visitor"}`,
      body: `${message}\n\n— ${name} (${email})`,
    });
    window.location.href = `mailto:${SITE.email}?${params.toString()}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      aria-label="Contact form"
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={INPUT_CLASSES}
          />
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="font-mono text-xs uppercase tracking-widest text-text-secondary"
        >
          Subject
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded border border-white/10 bg-background-card px-3 py-3 text-text-primary outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit">
          <Send className="h-4 w-4" />
          Send message
        </Button>
        <p className="text-xs text-text-secondary">Opens your email client.</p>
      </div>
    </form>
  );
}
