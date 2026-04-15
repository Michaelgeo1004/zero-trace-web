"use client";

import { HeroRotatingHeadline } from "@/components/motion/HeroRotatingHeadline";
import { HeroVisualDeck } from "@/components/motion/HeroVisualDeck";
import { site } from "@/content/site";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

/** Parent must define both `hidden` and `show` or children can stay at opacity 0. */
const stagger = {
  hidden: {},
  show: {
    opacity: 1,
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
  const { hero } = site;

  return (
    <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)] lg:items-center lg:gap-16">
      <motion.div
        className="relative z-[1] min-w-0"
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
          <HeroRotatingHeadline
            prefix={hero.headlinePrefix}
            keywords={hero.headlineKeywords}
            suffix={hero.headlineSuffix}
          />
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
        className="relative z-[1] w-full min-w-0 lg:min-w-[20rem] lg:max-w-[34rem] lg:justify-self-end"
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 28 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <HeroVisualDeck slides={hero.visualDeck} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-4 max-w-md rounded-2xl border-l-[3px] px-4 py-3 text-left shadow-lg shadow-black/15 backdrop-blur-sm"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 35%, var(--surface-border))",
              backgroundColor: "color-mix(in srgb, var(--section) 84%, transparent)",
            }}
          >
            <p className="mode-accent mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] md:text-xs">
              Built for live operations
            </p>
            <p className="mode-muted text-xs leading-relaxed lg:text-sm">
              {hero.operationsCaption}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
