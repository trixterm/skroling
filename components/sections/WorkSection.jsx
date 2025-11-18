"use client";
import { useEffect } from "react";
import gsap from "gsap";
import SwiperSlider from "@/components/SwiperSlider";
import WorkSectionAnimations from "@/components/WorkSectionAnimations";

export default function WorkSection() {

    return (
        <section className="fp-sec-work py-20">

            <WorkSectionAnimations />

            <div className="mx-5">
                <header className="fp-header flex items-center pb-7">
                    <div className="fp-section-heading">Work</div>
                    <nav className="fp-nav-swiper-work ml-auto">
                        nav
                    </nav>
                </header>

                <div className="fp-mod-swiper-work">
                    <SwiperSlider />
                </div>
            </div>
        </section>
    );
}