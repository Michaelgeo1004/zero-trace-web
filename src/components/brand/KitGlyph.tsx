/** Theme-aware SVG marks for kit rows (works on any photo background). */

type KitKind = "dining" | "signage" | "loop";

export function KitGlyph({ kind }: { kind: KitKind }) {
  const ring =
    "rounded-2xl bg-black/45 p-2 shadow-lg ring-1 ring-white/20 backdrop-blur-sm";

  if (kind === "dining") {
    return (
      <span className={ring} aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[var(--accent)]">
          <path
            d="M8 3v18M12 3v18M16 3v10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    );
  }

  if (kind === "signage") {
    return (
      <span className={ring} aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[var(--accent)]">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className={ring} aria-hidden>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[var(--accent)]">
        <path
          d="M12 4a8 8 0 108 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 4h4v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 20a8 8 0 01-8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 20H0v-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
