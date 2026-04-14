"use client";

import { site } from "@/content/site";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stagger = {
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroMotion() {
  const reduce = useReducedMotion();
  const { hero, assets } = site;

  return (
    <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
      <motion.div
        className="relative z-[1]"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="mode-accent text-xs font-semibold uppercase tracking-[0.28em] md:text-sm"
        >
          {site.tagline}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mode-text mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mode-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg"
        >
          {hero.sub}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#contact"
              className="mode-button inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg shadow-black/25 transition"
            >
              {hero.ctaPrimary}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#solution"
              className="mode-text inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10"
            >
              {hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
        <motion.ul
          variants={fadeUp}
          className="mode-muted mt-12 flex flex-wrap gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-widest md:text-sm"
        >
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Zero waste
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Zero plastic
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Zero compromise
          </li>
        </motion.ul>
      </motion.div>

      <motion.div
        className="relative z-[1] lg:justify-self-end"
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 28 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-image-frame relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl shadow-black/40">
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-[var(--section)]/90 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-white/10" />
          <motion.div
            className="relative aspect-[4/3] w-full md:aspect-[5/4]"
            animate={
              reduce
                ? undefined
                : { y: [0, -6, 0] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={assets.kitFlatlay}
              alt="Zero Trace reusable event kit — branded sustainable merchandise and dining ware"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mode-muted mt-4 max-w-md text-center text-xs leading-relaxed lg:text-left lg:text-sm"
        >
          Full kit flat lay: dining ware, drinkware, signage, and branded collateral—ready for your next campaign.
        </motion.p>
      </motion.div>
    </div>
  );
}
