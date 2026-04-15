"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type VisualSlide = { src: string; alt: string };

type Props = {
  slides: readonly VisualSlide[];
  intervalMs?: number;
};

const fadeEase = [0.22, 1, 0.36, 1] as const;

export function HeroVisualDeck({ slides, intervalMs = 6200 }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const safeLen = Math.max(1, slides.length);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % safeLen);
  }, [safeLen]);

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const id = window.setInterval(advance, intervalMs);
    return () => window.clearInterval(id);
  }, [advance, intervalMs, reduce, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="w-full min-w-0 max-w-[34rem] lg:min-w-[20rem]">
      <div
        className="hero-image-frame relative overflow-hidden rounded-3xl border bg-black/20 shadow-2xl shadow-black/40"
        style={{ borderColor: "var(--surface-border)" }}
      >
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-[var(--section)]/90 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-inset ring-white/10" />
        <div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
          {slides.map((slide, i) => (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.8, ease: fadeEase }}
              style={{ zIndex: i === active ? 2 : 1 }}
              aria-hidden={i !== active}
            >
              <Image
                src={slide.src}
                alt={i === active ? slide.alt : ""}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
