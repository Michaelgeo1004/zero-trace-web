"use client";

import { site } from "@/content/site";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      eventDate: String(fd.get("eventDate") ?? "").trim(),
      guests: String(fd.get("guests") ?? "").trim(),
      body: String(fd.get("body") ?? "").trim(),
      website: String(fd.get("company_website") ?? "").trim(),
    };

    if (payload.website) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        const hint =
          res.status === 503
            ? " Configure SMTP in .env (see .env.example) or email us directly."
            : "";
        setMessage(
          (data.error ?? "Something went wrong. Please try email instead.") +
            hint,
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try email or WhatsApp instead.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="new-password"
        inputMode="none"
        className="absolute h-px w-px -translate-x-[9999px] opacity-0"
        aria-hidden
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mode-muted text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mode-text mt-2 w-full rounded-lg border border-cream/15 bg-forest-deep/80 px-4 py-3 placeholder:text-cream-muted/40 focus:outline-none"
            style={{ borderColor: "var(--surface-border)", backgroundColor: "var(--section)" }}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mode-muted text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mode-text mt-2 w-full rounded-lg border border-cream/15 bg-forest-deep/80 px-4 py-3 placeholder:text-cream-muted/40 focus:outline-none"
            style={{ borderColor: "var(--surface-border)", backgroundColor: "var(--section)" }}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className="mode-muted text-sm">
            Event date (optional)
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className="mode-text mt-2 w-full rounded-lg border border-cream/15 bg-forest-deep/80 px-4 py-3 focus:outline-none"
            style={{ borderColor: "var(--surface-border)", backgroundColor: "var(--section)" }}
          />
        </div>
        <div>
          <label htmlFor="guests" className="mode-muted text-sm">
            Guest count (optional)
          </label>
          <input
            id="guests"
            name="guests"
            inputMode="numeric"
            className="mode-text mt-2 w-full rounded-lg border border-cream/15 bg-forest-deep/80 px-4 py-3 placeholder:text-cream-muted/40 focus:outline-none"
            style={{ borderColor: "var(--surface-border)", backgroundColor: "var(--section)" }}
            placeholder="e.g. 150"
          />
        </div>
      </div>
      <div>
        <label htmlFor="body" className="mode-muted text-sm">
          Message
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={4}
          className="mode-text mt-2 w-full rounded-lg border border-cream/15 bg-forest-deep/80 px-4 py-3 placeholder:text-cream-muted/40 focus:outline-none"
          style={{ borderColor: "var(--surface-border)", backgroundColor: "var(--section)" }}
          placeholder="City, venue type, kit needs…"
        />
      </div>
      <p className="mode-muted text-xs leading-relaxed">
        {site.contactSection.privacy}
      </p>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mode-button inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send inquiry"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-moss-bright" role="status">
          Thanks—we&apos;ll get back to you shortly.
        </p>
      ) : null}
      {status === "error" && message ? (
        <p className="text-sm text-red-300" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
