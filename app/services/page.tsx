// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';
import HeroServicesSection from '@/components/sections/HeroServicesSection';
import ProcessCardsSlider from '@/components/sections/ProcessCardsSlider';
import ServicesGrid from '@/components/sections/ServicesGrid';
import GridAnimation from '@/components/animations/GridAnimation';
import OpacityScrollAnimation from '@/components/animations/OpacityScrollAnimation';
import HorizontalGridAnimation from '@/components/animations/HorizontalGridAnimation';


export const metadata = buildMetadata({
    title: `Services | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function ServicesPage() {
    return (
        <>
            <GridAnimation />
            <HorizontalGridAnimation />
            
            <div className="fp-page-services-inner">
                <div className="fp-grid-background-1">
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                    <div className="fp-line"></div>
                </div>

                {/* <div className="fp-grid-background-2">
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                    <div className="fp-row"></div>
                </div> */}

                <HeroServicesSection />
                <div className="fp-text-after-video-wrap flex justify-end pb-20 md-pb-44">
                    <div className="fp-text-after-video text-[20px] max-w-[900px] pr-20">
                        Craft digital experiences that resonate. We design and develop interactive websites where motion, emotion, and strategy work together to guide users toward your goals. Using advanced animation frameworks and best-in-class technologies, we create interfaces that feel intuitive, purposeful, and unmistakably premium.
                    </div>
                </div>

                <section className="fp-sec-services z-2 relative">
                    <div className="container">
                        <div className="fp-heading text-[32px] font-medium pb-3">Services</div>
                    </div>
                    <ServicesGrid />
                </section>

                <div className="fp-sec-mind pt-44 pb-44 h-[110vh] relative">
                    <div className="inner max-w-[1000px] mx-auto relative">
                        <OpacityScrollAnimation className="fp-text text-[32px] font-medium leading-[44px] indent-30">
                            In the world filled with the same paterns, there is unique you that should be a best version of yourserf to achieve better results.
                        </OpacityScrollAnimation>

                        <div className="fp-anim-title-1 fp-text text-[32px] font-medium leading-[44px] relative -top-[44px] left-[488px]">Believe in a change.</div>
                    </div>
                </div>

                <ProcessCardsSlider />
            </div>

        </>
    );
}