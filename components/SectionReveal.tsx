"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            {
                y: 80,
                opacity: 0,
                filter: "blur(10px)",
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: false,
                },
            }
        );
    }, []);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
}
