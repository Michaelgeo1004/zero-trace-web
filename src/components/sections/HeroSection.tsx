import { FloatingDecor } from "@/components/motion/FloatingDecor";
import { HeroMotion } from "@/components/motion/HeroMotion";

export function HeroSection() {
  return (
    <section
      id="top"
      className="hero-shell mode-hero relative overflow-hidden border-b py-20 md:py-28 lg:py-32"
    >
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <FloatingDecor />
      <HeroMotion />
    </section>
  );
}
