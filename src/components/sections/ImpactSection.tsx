import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function ImpactSection() {
  const { impact } = site;

  return (
    <section
      id="impact"
      className="mode-section-alt scroll-mt-24 border-b py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="mode-text font-display text-3xl md:text-4xl">
            {impact.title}
          </h2>
          <p className="mode-muted mt-3 max-w-2xl">{impact.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impact.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.04}>
              <div className="rounded-2xl border border-cream/10 bg-forest/90 p-6 mode-surface">
                <p className="mode-accent text-xs uppercase tracking-widest">
                  {m.label}
                </p>
                <p className="mode-text mt-3 font-sans tabular-nums text-3xl font-semibold tracking-tight">
                  {m.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {impact.market.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-cream/10 p-6">
                <p className="mode-muted text-xs uppercase tracking-widest">
                  {row.label}
                </p>
                <p className="mode-text mt-3 font-sans tabular-nums text-2xl font-semibold tracking-tight">
                  {row.value}
                </p>
                {"source" in row ? (
                  <p className="mode-muted mt-3 text-xs leading-relaxed">
                    {row.source}
                  </p>
                ) : null}
                {"detail" in row ? (
                  <p className="mode-muted mt-3 text-sm leading-relaxed">
                    {row.detail}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-moss/25 bg-forest/80 p-8 mode-surface">
            <p className="mode-accent text-xs uppercase tracking-widest">
              {impact.viability.label}
            </p>
            <p className="mode-text mt-2 font-sans tabular-nums text-5xl font-semibold tracking-tight">
              {impact.viability.score}
            </p>
            <p className="mode-muted mt-4 max-w-3xl text-sm leading-relaxed">
              {impact.viability.note}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14">
            <h3 className="mode-text font-display text-2xl">
              {impact.prototype.title}
            </h3>
            <div className="mt-6 flex flex-wrap gap-6">
              {impact.prototype.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-cream/10 px-6 py-4 mode-surface"
                >
                  <p className="mode-muted text-xs uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p className="mode-text mt-1 font-sans tabular-nums text-3xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mode-muted mt-6 max-w-3xl text-sm leading-relaxed">
              {impact.prototype.feedback}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
