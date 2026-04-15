import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

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
        <Reveal>
          <div
            className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14"
            style={{ borderColor: "var(--surface-border)" }}
          >
            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border shadow-2xl shadow-black/35 ring-1 ring-white/10"
                style={{ borderColor: "var(--surface-border)" }}
              >
                <Image
                  src={solution.showcase.imagePrimary}
                  alt="Zero Trace full kit composition — multiple reusables in one frame"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--section)]/50 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:bottom-4 sm:right-4 sm:mt-0 sm:w-[min(42%,220px)] sm:grid-cols-1 lg:bottom-6 lg:right-6">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-xl ring-1 ring-black/20"
                  style={{ borderColor: "var(--surface-border)" }}
                >
                  <Image
                    src={solution.showcase.imageSecondary}
                    alt="Fulfillment — crated reusables, sanitized staging, and packing for events"
                    fill
                    className="object-cover object-center"
                    sizes="220px"
                  />
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <p className="mode-accent text-xs font-semibold uppercase tracking-[0.22em]">
                {solution.showcase.kicker}
              </p>
              <h3 className="mode-text mt-3 font-display text-2xl leading-tight md:text-3xl">
                {solution.showcase.title}
              </h3>
              <p className="mode-muted mt-4 text-base leading-relaxed md:text-lg">
                {solution.showcase.lead}
              </p>
              <p className="mode-muted mt-4 text-sm leading-relaxed">
                Weddings, corporate programs, and campus events—tiered and branded to your run-of-show.
              </p>
              <ol className="mt-8 space-y-0">
                {solution.showcase.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 border-t py-4 first:border-t-0 first:pt-0"
                    style={{ borderColor: "var(--surface-border)" }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--accent) 22%, transparent)",
                        color: "var(--accent)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="mode-text font-medium">{step.title}</p>
                      <p className="mode-muted mt-1 text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="mode-muted mt-14 max-w-3xl text-sm leading-relaxed md:text-base">
            {solution.kitTiersIntro}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {solution.kitImages.map((kit, i) => (
            <Reveal key={kit.title} delay={i * 0.06}>
              <figure
                className="group mode-surface flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/25"
                style={{
                  borderColor: "var(--surface-border)",
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <div className="relative aspect-[3/4] w-full min-h-[220px] overflow-hidden md:aspect-[4/5]">
                  <Image
                    src={kit.image}
                    alt={`${kit.title} — ${kit.tier}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: kit.objectPosition }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--section)]/85 via-[var(--section)]/20 to-transparent"
                    aria-hidden
                  />
                  <p className="absolute left-3 top-3 z-[2] max-w-[85%] rounded-md bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm md:text-xs">
                    {kit.tier}
                  </p>
                </div>
                <figcaption
                  className="flex flex-1 flex-col border-t px-4 py-4"
                  style={{ borderColor: "var(--surface-border)" }}
                >
                  <p className="mode-text text-base font-semibold leading-snug">{kit.title}</p>
                  <p className="mode-muted mt-2 text-sm leading-relaxed">{kit.blurb}</p>
                  <ul className="mode-muted mt-4 space-y-1.5 border-t border-dashed pt-3 text-xs leading-relaxed" style={{ borderColor: "var(--surface-border)" }}>
                    {kit.includes.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-[var(--accent)]" aria-hidden>
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
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
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
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
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div
            className="mode-surface mt-14 rounded-2xl border border-l-4 p-8 shadow-lg shadow-black/20 transition-colors duration-500"
            style={{
              borderColor: "var(--surface-border)",
              borderLeftColor: "var(--accent)",
            }}
          >
            <p className="mode-accent text-xs font-semibold uppercase tracking-[0.2em]">
              Transparent pricing
            </p>
            <h3 className="mode-text mt-2 font-display text-xl md:text-2xl">
              {solution.pricing.headline}
            </h3>
            <p className="mode-muted mt-4 leading-relaxed">
              {solution.pricing.detail}
            </p>
            <p className="mode-muted mt-4 text-sm leading-relaxed">
              {solution.pricing.volume}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
