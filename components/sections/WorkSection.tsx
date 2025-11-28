"use client";

import { useState } from "react";
import SwiperSlider from "@/components/SwiperSlider";
import WorkSectionAnimations from "@/components/WorkSectionAnimations";
import SliderNav from "@/components/SliderNav";

type SliderControls = {
    prev: () => void;
    next: () => void;
};

export default function WorkSection() {
    const [controls, setControls] = useState<SliderControls | null>(null);

    return (
        <section className="fp-sec-work pt-28 pb-16 relative z-2">
            <WorkSectionAnimations />

            <div className="mx-5">
                <header className="fp-header flex items-center pb-7">
                    <div className="fp-section-heading">Work</div>

                    <SliderNav
                        className="fp-nav-swiper-work ml-auto"
                        onPrev={() => controls?.prev?.()}
                        onNext={() => controls?.next?.()}
                    />
                </header>

                <div className="fp-mod-swiper-work">
                    <SwiperSlider onInitControls={setControls} />
                </div>
            </div>
        </section>
    );
}