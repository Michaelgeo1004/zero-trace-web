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
        <div className="-mx-4 mt-12 grid auto-cols-[78%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:snap-none">
          {team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <article
                className="h-full snap-start rounded-2xl border border-cream/10 bg-forest-deep/50 p-5 mode-surface animate-lift-hover md:p-8"
              >
                <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-cream/10 bg-[var(--section-alt)] md:mb-6 md:aspect-square">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    className="object-cover object-center md:object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--section)]/55 via-transparent to-transparent" />
                </div>
                <p className="mode-text font-display text-lg md:text-xl">{m.name}</p>
                <p className="mode-accent mt-1.5 text-xs font-medium md:mt-2 md:text-sm">{m.role}</p>
                <p className="mode-muted mt-3 text-xs md:mt-4 md:text-sm">{m.skills}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
