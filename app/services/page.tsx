// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';
import HeroServicesSection from '@/components/sections/HeroServicesSection';
import ProcessCardsSlider from '@/components/sections/ProcessCardsSlider';
import ServicesGrid from '@/components/sections/ServicesGrid';


export const metadata = buildMetadata({
    title: `Services | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function ServicesPage() {
    return (
        <>
            <HeroServicesSection />
            <div className="fp-text-after-video-wrap flex justify-end pb-20 md-pb-44">
                <div className="fp-text-after-video text-[20px] max-w-[900px] pr-20">
                    Craft digital experiences that resonate. We design and develop interactive websites where motion, emotion, and strategy work together to guide users toward your goals. Using advanced animation frameworks and best-in-class technologies, we create interfaces that feel intuitive, purposeful, and unmistakably premium.
                </div>
            </div>

            <div className="fp-sec-services">
                <div className="container">
                    <div className="fp-heading text-[32px] font-medium pb-3">Services</div>
                </div>
            </div>
            <ServicesGrid />
            <ProcessCardsSlider />
        </>
    );
}