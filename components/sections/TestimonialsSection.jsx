"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function TestimonialsSection() {

    return (
        <section className="fp-sec-testimonials py-20">
            <div className="container mx-auto">
                <div className="inner flex items-end gap-12 relative max-w-[520px]">
                    <div className="fp-heading text-[52px] font-semibold leading-15">What clients <br />says about me</div>
                    <div className="fp-testimonials-list flex gap-6 items-end">
                        <div className="item w-[12px] h-[12px] rounded-[6px] bg-[#3C3C3C] absolute bottom-0 right-0">
                            <div className="fp-meta text-white z-2 p-6 opacity-0 invisible">
                                <div className="text-[12px] leading-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.</div>
                                <div className="text-[12px] mt-3">- Thom</div>
                            </div>
                        </div>
                        <div className="item w-[12px] h-[12px] rounded-[6px] bg-[#3C3C3C] absolute bottom-0 right-8">
                            <div className="fp-meta text-white z-2 p-6 opacity-0 invisible">
                                <div className="text-[12px] leading-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.</div>
                                <div className="text-[12px] mt-3">- Thom</div>
                            </div>
                        </div>
                        <div className="item w-[12px] h-[12px] rounded-[6px] bg-[#3C3C3C] absolute bottom-0 right-16">
                            <div className="fp-meta text-white z-2 p-6 opacity-0 invisible">
                                <div className="text-[12px] leading-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.</div>
                                <div className="text-[12px] mt-3">- Thom</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}