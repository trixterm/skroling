"use client";
import { lazy } from "react";
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

export default function ServicesSection() {
    return (
        <ServicesReveal className="fp-sec-services pt-10 pb-8 md:pb-24 relative z-2">
            <div className="container mx-auto">
                <div className="fp-section-heading mb-10">Services</div>
                <div className="fp-services-list flex flex-col items-start">
                    {SERVICE_ITEMS.map((item, index) => (
                        <LineAnimation
                            key={index}
                            className="item mb-5 md:mb-10 fp-extra-font text-[21px] md:text-[58px] leading-snug font-medium cursor-pointer"
                        >
                            {item}
                        </LineAnimation>
                    ))}
                </div>
            </div>
            <section className="fp-video-services mt-10 md:mt-24 flex justify-center">
                <VideoExpandAnimation />
                <video
                    className="max-w-[calc(100vw-30px)] h-[485px] md:h-svh object-cover rounded-[20px]"
                    playsInline
                    muted
                    autoPlay
                    loop
                >
                    <source src="/videos/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
                </video>
            </section>
            <div className="container">
                <div className="fp-text-after-video text-[16px] md:text-[20px] font-regular leading-[30px] md:leading-[33px] max-w-[870px] mt-17 max-sm:px-4">
                    Behind every project is years of steady, hands-on experience and a commitment to doing the work with care and precision. I focus on consistency, clear communication, and delivering results that truly meet expectations. The numbers below reflect the reliability of my process and the level of quality I bring to every collaboration.
                </div>
            </div>
        </ServicesReveal>
    );
}