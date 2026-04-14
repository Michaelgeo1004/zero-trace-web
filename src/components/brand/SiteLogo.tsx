"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type SiteLogoProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  /** Subtle breathing glow; off for secondary placements like the footer. */
  animate?: boolean;
};

export function SiteLogo({
  src,
  alt,
  size = 48,
  className = "",
  animate = true,
}: SiteLogoProps) {
  const reduce = useReducedMotion();
  const shouldPulse = animate && !reduce;

  return (
    <motion.span
      className={`relative inline-flex shrink-0 rounded-full bg-white/5 p-0.5 ring-1 ring-white/15 shadow-lg shadow-black/20 ${className}`}
      animate={
        shouldPulse
          ? {
              boxShadow: [
                "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)",
                "0 0 28px 2px color-mix(in srgb, var(--accent) 35%, transparent)",
                "0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent)",
              ],
            }
          : undefined
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full bg-white object-contain p-0.5"
        priority
        sizes={`${size}px`}
      />
    </motion.span>
  );
}
