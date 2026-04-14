import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

function KitVisual({ kind }: { kind: "dining" | "signage" | "loop" }) {
  if (kind === "dining") {
    return (
      <svg viewBox="0 0 240 140" className="h-48 w-full rounded-xl">
        <defs>
          <linearGradient id="k1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--section-alt)" />
            <stop offset="100%" stopColor="var(--surface)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="240" height="140" rx="16" fill="url(#k1)" />
        <rect x="46" y="34" width="20" height="72" rx="8" fill="var(--fg)" />
        <rect x="74" y="34" width="7" height="72" rx="3.5" fill="var(--fg)" />
        <rect x="86" y="34" width="7" height="72" rx="3.5" fill="var(--fg)" />
        <rect x="98" y="34" width="7" height="72" rx="3.5" fill="var(--fg)" />
        <rect x="126" y="34" width="10" height="72" rx="5" fill="var(--fg)" />
        <ellipse cx="166" cy="70" rx="17" ry="36" fill="var(--fg)" />
      </svg>
    );
  }

  if (kind === "signage") {
    return (
      <svg viewBox="0 0 240 140" className="h-48 w-full rounded-xl">
        <rect x="0" y="0" width="240" height="140" rx="16" fill="var(--section-alt)" />
        <rect x="52" y="32" width="136" height="26" rx="6" fill="var(--fg)" />
        <rect x="62" y="39" width="74" height="4" rx="2" fill="var(--section)" />
        <rect x="62" y="47" width="57" height="4" rx="2" fill="var(--section)" />
        <rect x="52" y="64" width="62" height="42" rx="8" fill="var(--accent)" />
        <path d="M64 91L76 78L85 86L100 72" stroke="var(--section)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="154" cy="84" r="20" fill="var(--fg)" />
        <path d="M147 84L153 90L163 79" stroke="var(--section)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 140" className="h-48 w-full rounded-xl">
      <rect x="0" y="0" width="240" height="140" rx="16" fill="var(--section-alt)" />
      <circle cx="120" cy="70" r="42" fill="none" stroke="var(--fg)" strokeWidth="5" strokeDasharray="10 8" />
      <path d="M88 66C96 52 109 45 123 45C140 45 154 54 161 67" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
      <path d="M152 60L162 67L156 78" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M152 74C144 88 131 95 117 95C100 95 86 86 79 73" stroke="var(--fg)" strokeWidth="6" strokeLinecap="round" />
      <path d="M88 80L78 73L84 62" stroke="var(--fg)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="108" y="58" width="24" height="28" rx="6" fill="var(--fg)" />
    </svg>
  );
}

export function SolutionSection() {
  const { solution } = site;

  return (
    <section
      id="solution"
      className="mode-section scroll-mt-24 border-b py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="mode-text font-display text-3xl md:text-4xl">
            {solution.title}
          </h2>
          <p className="mode-accent mt-4 max-w-3xl font-display text-xl md:text-2xl">
            {solution.subtitle}
          </p>
        </Reveal>
        <div className="mode-muted mt-10 max-w-3xl space-y-4">
          {solution.body.map((p, i) => (
            <Reveal key={`${i}-${p.slice(0, 20)}`}>
              <p className="leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solution.kitImages.map((kit, i) => (
            <Reveal key={kit.title} delay={i * 0.06}>
              <figure
                className="group rounded-2xl border border-cream/10 bg-forest-deep/55 p-3 mode-surface animate-float"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <div className="relative overflow-hidden rounded-xl border border-cream/10">
                  <KitVisual kind={kit.kind} />
                </div>
                <figcaption className="mode-text px-1 pb-2 pt-4 text-sm font-medium">
                  {kit.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="mode-text text-sm font-semibold uppercase tracking-widest">
                Key features
              </h3>
              <ul className="mode-muted mt-4 space-y-3">
                {solution.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full mode-button" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 className="mode-text text-sm font-semibold uppercase tracking-widest">
                What makes it different
              </h3>
              <ul className="mode-muted mt-4 space-y-3">
                {solution.uniqueness.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full mode-button" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-14 rounded-2xl border border-moss/30 bg-forest-deep/60 p-8">
            <h3 className="mode-text font-display text-xl">
              {solution.pricing.headline}
            </h3>
            <p className="mode-muted mt-3 leading-relaxed">
              {solution.pricing.detail}
            </p>
            <p className="mode-muted mt-4 text-sm">
              {solution.pricing.volume}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
