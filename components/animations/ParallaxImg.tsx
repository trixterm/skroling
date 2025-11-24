"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImg({ src }: { src: string }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { y: -50 },
            {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <div className="overflow-hidden h-[70vh]">
        <img
            ref={ref}
            src={src}
            className="w-full h-full object-cover"
        />
        </div>
    );
}
