"use client";
import Image from "next/image";
import { lazy, memo } from "react";
import ServicesReveal from "@/components/animations/ServicesReveal";
import LineAnimation from "@/components/animations/LineAnimation";
// import VideoExpandAnimation from "@/components/animations/VideosExpandAnimation";

const VideoExpandAnimation = lazy(() => import("@/components/animations/VideoExpandAnimation"));

const SERVICE_ITEMS = [
    "Custom Website Development",
    "Interactive UI Engineering",
    "Performance-Focused Front-End",
    "Integration & Functionality",
];

function ServicesSection() {
    return (
        <ServicesReveal className="fp-sec-services pt-10 pb-8 md:pb-24 relative z-2">
            <div className="container mx-auto">
                <div className="fp-section-heading mb-10">Services</div>
                <div className="fp-services-list flex flex-col items-start">
                    {SERVICE_ITEMS.map((item, index) => (
                        <LineAnimation
                            key={index}
                            className="item mb-5 md:mb-10 fp-extra-font text-[21px] sm:text-[40px] md:text-[56px] lg:text-[58px] leading-snug font-medium cursor-pointer dark:text-[#f5f5f5]"
                        >
                            {item}
                        </LineAnimation>
                    ))}
                </div>
            </div>
            <section className="fp-video-services mt-10 md:mt-24 flex justify-center">
                <VideoExpandAnimation />
                <Image src="/images/projects/kaite-services.jpg" alt="Kaite — synchronised services interaction" width={1280} height={720} className="fp-services-media max-w-[calc(100vw-30px)] h-auto md:h-svh object-contain rounded-[20px]" />
            </section>
            <div className="container">
                <div className="fp-text-after-video text-[16px] md:text-[20px] font-regular leading-[30px] md:leading-[33px] max-w-[870px] mt-17 max-sm:px-4 dark:text-[#f5f5f5]">
                    I’m Mantas, a freelance creative developer with 15 years in development. I collaborate with design studios to build websites, integrate WordPress, and bring motion and interaction to their designs.
                </div>
            </div>
        </ServicesReveal>
    );
}

export default memo(ServicesSection);