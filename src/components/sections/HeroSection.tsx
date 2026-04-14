import { site } from "@/content/site";
import Link from "next/link";
import { FloatingDecor } from "@/components/motion/FloatingDecor";
import { Reveal } from "@/components/motion/Reveal";

export function HeroSection() {
  return (
    <section
      id="top"
      className="mode-hero relative overflow-hidden border-b py-24 md:py-32"
    >
      <FloatingDecor />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="mode-accent text-sm font-medium uppercase tracking-[0.2em]">
            {site.tagline}
          </p>
          <h1 className="mode-text mt-6 max-w-3xl font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mode-muted mt-6 max-w-2xl text-lg leading-relaxed">
            {site.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="mode-button inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition"
            >
              {site.hero.ctaPrimary}
            </Link>
            <Link
              href="#solution"
              className="mode-text inline-flex items-center justify-center rounded-full border border-cream/25 px-8 py-3 text-sm font-medium transition hover:border-cream/50"
            >
              {site.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
