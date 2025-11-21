"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import SwiperSlider from "@/components/SwiperSlider";
import WorkSectionAnimations from "@/components/WorkSectionAnimations";

export default function WorkSection() {

    const [controls, setControls] = useState(null);

    useEffect(() => {
        const btnPrev = document.querySelector(".fp-arrow-left");
        const btnNext = document.querySelector(".fp-arrow-right");

        if (!btnPrev || !btnNext || !controls) return;

        btnPrev.addEventListener("click", controls.prev);
        btnNext.addEventListener("click", controls.next);

        return () => {
            btnPrev.removeEventListener("click", controls.prev);
            btnNext.removeEventListener("click", controls.next);
        };
    }, [controls]);

    return (
        <section className="fp-sec-work pt-28 pb-16">

            <WorkSectionAnimations />

            <div className="mx-5">
                <header className="fp-header flex items-center pb-7">
                    <div className="fp-section-heading">Work</div>
                    <nav className="fp-nav-btn fp-nav-swiper-work ml-auto flex border-1 border-[#707070] rounded-3xl items-center justify-between py-[9px] px-3">
                        <svg className="fp-arrow fp-arrow-left" fill="#000000" width="11px" height="11px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g></svg>
                        <div className="fp-line-1 w-[55px] h-[1px] bg-[#000]"></div>
                        <svg className="fp-arrow fp-arrow-right" fill="#000000" width="11px" height="11px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g></svg>
                    </nav>
                </header>

                <div className="fp-mod-swiper-work">
                    <SwiperSlider onInitControls={setControls} />
                </div>
            </div>
        </section>
    );
}