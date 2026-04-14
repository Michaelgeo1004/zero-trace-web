import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function ProblemSection() {
  const { problem } = site;

  return (
    <section
      id="problem"
      className="mode-section-alt scroll-mt-24 border-b py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="mode-text font-display text-3xl md:text-4xl">
            {problem.title}
          </h2>
          <p className="mode-muted mt-4 max-w-2xl text-lg">{problem.lead}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problem.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="mode-surface h-full rounded-2xl border p-6">
                <p className="mode-accent text-xs uppercase tracking-widest">
                  {s.label}
                </p>
                <p className="mode-text mt-3 font-display text-2xl">{s.value}</p>
                <p className="mode-muted mt-3 text-sm leading-relaxed">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mode-muted mt-12 max-w-3xl space-y-4">
          {problem.narrative.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
