import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

export function TeamSection() {
  const { team } = site;

  return (
    <section
      id="team"
      className="mode-section scroll-mt-24 border-b py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="mode-text font-display text-3xl md:text-4xl">
            {team.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <article
                className="h-full rounded-2xl border border-cream/10 bg-forest-deep/50 p-8 mode-surface animate-lift-hover"
              >
                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl border border-cream/10 bg-[var(--section-alt)]">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    width={420}
                    height={420}
                    className="h-full w-full object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--section)]/55 via-transparent to-transparent" />
                </div>
                <p className="mode-text font-display text-xl">{m.name}</p>
                <p className="mode-accent mt-2 text-sm font-medium">{m.role}</p>
                <p className="mode-muted mt-4 text-sm">{m.skills}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
