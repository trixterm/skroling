"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function HeroHomeSection() {

    return (
        <section className="fp-sec-hero-home flex justify-center items-center h-screen ">
            <div className="container mx-auto">
                <div className="inner max-w-[700px] mx-auto text-center">
                    <div className="fp-heading text-5xl font-semibold leading-14">Websites that move, react, and engage your use</div>
                </div>
            </div>
        </section>
    );
}