import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { TeamSection } from "@/components/sections/TeamSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <MarqueeSection />
        <ProblemSection />
        <SolutionSection />
        <ImpactSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
