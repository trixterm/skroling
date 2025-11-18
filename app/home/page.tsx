import Reveal from "@/components/Reveal";
import HeroHomeSection from "@/components/sections/HeroHomeSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ResultsSection from "@/components/sections/ResultsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CopyrightSection from "@/components/sections/CopyrightSection";
import FooterSection from "@/components/sections/FooterSection";

export default function HomePage() {
  return (
    <main>
        <HeroHomeSection />

        <Reveal>
            <WorkSection />
        </Reveal>
        
        <ServicesSection />
        <ResultsSection />
        <TestimonialsSection />
        <CopyrightSection />
        <FooterSection />
    </main>
  );
}