"use client";

import gsap from "gsap";
import { useEffect } from "react";

let gsapLoaded = false;

export default function VideoExpand() {
    useEffect(() => {
        let ctx: any = null;

        async function start() {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            // 2. plugin registro guard
            if (!gsapLoaded) {
                gsap.registerPlugin(ScrollTrigger);
                gsapLoaded = true;
            }

            requestAnimationFrame(() => {
                ctx = gsap.context(() => {
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
                                start: "top 99%",
                                end: "top top",
                                scrub: true,
                            },
                        }
                    );
                });
            });
        }

        start();

        return () => {
            ctx?.revert();
        };
    }, []);

    return null;
}