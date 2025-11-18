"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children }) {
    const ref = useRef();

    useEffect(() => {
        gsap.from(ref.current, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
            },
        });
    }, []);

    return <div ref={ref}>{children}</div>;
}