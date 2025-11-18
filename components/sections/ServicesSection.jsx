"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ServicesReveal from "@/components/ServicesReveal";
import VideoExpand from "@/components/VideoExpand";

export default function ServicesSection() {

    return (
        <section className="fp-sec-services py-20">
            
            <ServicesReveal />

            <div className="container mx-auto">
                <div className="fp-section-heading pb-6">Services</div>

                <div className="fp-services-list">
                    <div className="item text-[52px] font-semibold mb-1">Custom Website Development</div>
                    <div className="item text-[52px] font-semibold mb-1">Interactive UI Engineering</div>
                    <div className="item text-[52px] font-semibold mb-1">Performance-Focused Front-End</div>
                    <div className="item text-[52px] font-semibold">Integration & Functionality</div>
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

        </section>
    );
}