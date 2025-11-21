"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoExpand() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".fp-video-services video",
            {
                width: "0px",
                borderRadius: "16px",
            },
            {
                width: "100vw",
                borderRadius: "0px",
                ease: "none",
                scrollTrigger: {
                    trigger: ".fp-video-services",
                    start: "top 90%",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    }, []);

    return null;
}