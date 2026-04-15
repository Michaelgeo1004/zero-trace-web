"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Floater = {
  className: string;
  duration: number;
  delay?: number;
  size: number;
  opacity?: number;
};

function Petal({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 56" width={size} height={(size * 56) / 40} fill="none" aria-hidden>
      <path
        d="M20 2C29 10 38 20 37 33C36 45 29 53 20 54C11 53 4 45 3 33C2 20 11 10 20 2Z"
        fill="currentColor"
      />
      <path d="M20 10V46" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" />
    </svg>
  );
}

function Loop({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 56 56" width={size} height={size} fill="none" aria-hidden>
      <path
        d="M28 8C39 8 48 16.8 48 27.6C48 38.3 39 47 28 47C17 47 8 38.3 8 27.6C8 16.8 17 8 28 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.95"
      />
      <path d="M18 27.5H38" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.65" />
    </svg>
  );
}

function FloatIcon({
  className,
  duration,
  delay = 0,
  size,
  opacity = 0.35,
  icon,
}: Floater & { icon: "petal" | "loop" }) {
  return (
    <motion.span
      className={`absolute block text-moss ${className}`}
      style={{ opacity }}
      animate={{
        y: [0, -12, 0],
        x: [0, 6, 0],
        rotate: [0, 8, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      {icon === "petal" ? <Petal size={size} /> : <Loop size={size} />}
    </motion.span>
  );
}

/** Ambient background: morphing blobs + simple leaf shapes. */
export function FloatingDecor() {
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        setParallax({ x, y });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
        aria-hidden
      >
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-moss/20 blur-3xl" />
        <div className="absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-moss/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_35%,rgba(6,24,17,0.45)_100%)]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-moss/25 blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 24, 0],
          y: [0, -16, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ translateX: parallax.x * -0.45, translateY: parallax.y * -0.35 }}
      />
      <motion.div
        className="absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-moss/15 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ translateX: parallax.x * 0.35, translateY: parallax.y * 0.42 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ translateX: parallax.x * 0.2, translateY: parallax.y * 0.2 }}
      >
        <FloatIcon
          icon="petal"
          className="left-[10%] top-[22%]"
          size={28}
          duration={14}
          opacity={0.36}
        />
        <FloatIcon
          icon="loop"
          className="right-[17%] top-[20%]"
          size={24}
          duration={19}
          delay={0.6}
          opacity={0.28}
        />
        <FloatIcon
          icon="petal"
          className="bottom-[30%] left-[20%]"
          size={20}
          duration={16}
          delay={0.2}
          opacity={0.22}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_38%,rgba(6,24,17,0.5)_100%)]" />
    </div>
  );
}
