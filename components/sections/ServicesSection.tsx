"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ServicesReveal from "@/components/animations/ServicesReveal";
import VideoExpand from "@/components/VideoExpand";

const SERVICE_ITEMS = [
    "Custom Website Development",
    "Interactive UI Engineering",
    "Performance-Focused Front-End",
    "Integration & Functionality",
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        const line = e.currentTarget.querySelector(".line-element");
        
        gsap.to(line, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
        });
    });

    const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        const line = e.currentTarget.querySelector(".line-element");

        gsap.to(line, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
        });
    });

    return (
        <ServicesReveal className="fp-sec-services py-24 relative z-2">
            <div className="container mx-auto" ref={containerRef}>
                <div className="fp-section-heading pb-6">Services</div>

                <div className="fp-services-list flex flex-col items-start">
                    {SERVICE_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className="item mb-5 relative text-[52px] leading-16 font-semibold mb-1 cursor-pointer overflow-hidden group"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="relative z-10">{item}</span>

                            <div 
                                className="line-element absolute bottom-0 left-0 w-full h-[1px] bg-current dark:bg-[#fff] origin-left scale-x-0 will-change-transform" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <section className="fp-video-services mt-24 flex justify-center">
                <VideoExpand />
                <video
                    className="w-[8px] h-screen object-cover rounded-xl"
                    playsInline
                    muted
                    autoPlay
                    loop
                >
                    <source src="/videos/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
                </video>
            </section>

        </ServicesReveal>
    );
}