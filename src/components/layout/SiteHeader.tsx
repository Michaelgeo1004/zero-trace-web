"use client";

import { site } from "@/content/site";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#impact", label: "Impact" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const themes = [
  { id: "forest", label: "Forest" },
  { id: "aurora", label: "Aurora" },
  { id: "sunset", label: "Sunset" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<(typeof themes)[number]["id"]>("forest");

  useEffect(() => {
    const saved = window.localStorage.getItem("zero-trace-theme");
    if (saved && themes.some((entry) => entry.id === saved)) {
      setTheme(saved as (typeof themes)[number]["id"]);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }
    document.documentElement.setAttribute("data-theme", "forest");
  }, []);

  function updateTheme(nextTheme: (typeof themes)[number]["id"]) {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("zero-trace-theme", nextTheme);
  }

  return (
    <header className="mode-header sticky top-0 z-50 border-b border-cream/10 bg-forest-deep/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-moss focus:px-4 focus:py-2 focus:text-forest-deep"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="#top"
          className="mode-text font-display text-xl tracking-tight md:text-2xl"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mode-muted text-sm transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {themes.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => updateTheme(entry.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                theme === entry.id
                  ? "border-cream/40 text-white"
                  : "border-cream/20 mode-muted hover:border-cream/40 hover:text-white"
              }`}
              aria-pressed={theme === entry.id}
              style={theme === entry.id ? { backgroundColor: "color-mix(in srgb, var(--accent) 22%, transparent)" } : undefined}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mode-text inline-flex items-center justify-center rounded-md border border-cream/20 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="mode-header border-t border-cream/10 bg-forest-deep px-4 py-4 md:hidden"
        >
          <div className="mb-4 flex flex-wrap gap-2">
            {themes.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => updateTheme(entry.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  theme === entry.id
                  ? "border-cream/40 text-white"
                  : "border-cream/20 mode-muted hover:border-cream/40 hover:text-white"
                }`}
                aria-pressed={theme === entry.id}
                style={theme === entry.id ? { backgroundColor: "color-mix(in srgb, var(--accent) 22%, transparent)" } : undefined}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mode-muted block py-2 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
