// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';
import HeroServicesSection from '@/components/sections/HeroServicesSection';
import ProcessCardsSlider from '@/components/sections/ProcessCardsSlider';
import ServicesGrid from '@/components/sections/ServicesGrid';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import GridAnimation from '@/components/animations/GridAnimation';
import OpacityScrollAnimation from '@/components/animations/OpacityScrollAnimation';
import HorizontalGridAnimation from '@/components/animations/HorizontalGridAnimation';
import ResultsSection from '@/components/sections/ResultsSection';


export const metadata = buildMetadata({
    title: "Services",
    description: 'Creative development and WordPress integration by Mantas.',
    alternates: { canonical: '/services' },
});

export default function ServicesPage() {
    return (
        <>
            <GridAnimation />
            <HorizontalGridAnimation />
            
            <div className="fp-page-services-inner">

                <div className="fp-grid-background-1 max-md:hidden">
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
{/* 
                <div className="fp-grid-background-2 max-md:hidden">
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
                    <div className="fp-text-after-video text-[16px] leading-6 md:text-[20px] md:leading-[33px] max-w-[900px] md:pr-20 max-md:px-10 max-sm:px-[15px]">
                        Creative development for design studios. I develop interactive websites where motion, emotion, and strategy work together to guide users toward your goals. Using advanced animation frameworks and best-in-class technologies, I build interfaces that feel intuitive, purposeful, and unmistakably premium.
                    </div>
                </div>

                <section className="fp-sec-services z-2 relative">
                    <div className="container">
                        <div className="fp-heading fp-extra-font text-[32px] font-medium pb-10 md:pb-3">Services</div>
                    </div>
                    <ServicesGrid />
                </section>

                <div className="fp-sec-mind pt-30 pb-10 md:pt-44 h-screen relative">
                    <div className="inner max-w-[920px] mx-auto relative">
                        <OpacityScrollAnimation className="fp-text text-[30px] md:text-[32px] font-medium leading-11 max-md:px-4">
                            Your design deserves a careful implementation, from the first interaction to the final WordPress build. <span className="part-hidden">Bring it to life.</span>
                        </OpacityScrollAnimation>

                        <div className="fp-anim-title-1 text-[30px] md:text-[32px] font-medium leading-11 relative -top-11 left-[488px] max-md:hidden opacity-0">Bring it to life.</div>
                    </div>
                </div>


                <ResultsSection />
                <ProcessCardsSlider />
            </div>

        </>
    );
}