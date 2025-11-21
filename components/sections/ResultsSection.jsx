"use client";
import { useEffect } from "react";
import gsap from "gsap";
import CountUp from "@/components/CountUp";

export default function ResultsSection() {

    return (
        <section className="fp-sec-results">
            <CountUp selector=".fp-sec-results" />

                <div className="container mx-auto">
                    <div className="fp-section-heading pb-20">Real results</div>

                    <div className="fp-results-list text-[#5A5A5A]">
                        <div className="inner mx-20 grid grid-cols-3 gap-x-3 gap-y-12">
                            <div className="item">
                                <div className="fp-number text-[80px] font-medium leading-24">x5</div>
                                <div className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">Speed Upgrades</div>
                                <div className="border border-[0.5px]"></div>
                            </div>
                            <div className="item">
                                <div className="fp-number text-[80px] font-medium leading-24">23</div>
                                <div className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">Happy Clients</div>
                                <div className="border border-[0.5px]"></div>
                            </div>
                            <div className="item col-2">
                                <div className="fp-number text-[80px] font-medium leading-24">x5</div>
                                <div className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">Speed Upgrades</div>
                                <div className="border border-[0.5px]"></div>
                            </div>
                            <div className="item col-3">
                                <div className="fp-number text-[80px] font-medium leading-24">23</div>
                                <div className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">Launched Projects</div>
                                <div className="border border-[0.5px]"></div>
                            </div>
                        </div>
                    </div>
                </div>

        </section>
    );
}