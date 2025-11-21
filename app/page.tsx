import Image from "next/image";

import IntroSection from "@/components/sections/IntroSection";
import Reveal from "@/components/Reveal";
import HeroHomeSection from "@/components/sections/HeroHomeSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ResultsSection from "@/components/sections/ResultsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
    return (
        <main>
            {/* <IntroSection /> */}

            <HeroHomeSection />
            <WorkSection />
            <ServicesSection />
            <ResultsSection />
            <TestimonialsSection />
        </main>
    );
}