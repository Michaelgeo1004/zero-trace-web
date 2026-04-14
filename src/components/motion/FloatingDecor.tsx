"use client";

import { motion, useReducedMotion } from "framer-motion";

function Leaf({
  className,
  duration,
}: {
  className: string;
  duration: number;
}) {
  return (
    <motion.span
      className={`absolute block h-8 w-5 rounded-[60%_40%_60%_40%] bg-moss/25 ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

/** Ambient background: morphing blobs + simple leaf shapes. */
export function FloatingDecor() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
        aria-hidden
      >
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-moss/20 blur-3xl" />
        <div className="absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-moss/15 blur-3xl" />
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
      />
      <motion.div
        className="absolute -right-24 bottom-40 h-80 w-80 rounded-full bg-moss/15 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <Leaf className="left-[12%] top-[28%] opacity-40" duration={7} />
      <Leaf className="right-[18%] top-[22%] h-6 w-4 opacity-30" duration={9} />
      <Leaf className="bottom-[32%] left-[22%] h-6 w-4 opacity-25" duration={8} />
    </div>
  );
}
