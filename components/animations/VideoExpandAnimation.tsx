"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoExpandAnimation() {
    useEffect(() => {
        const section = document.querySelector(".fp-video-services");
        const grid = document.querySelector(".fp-home-grid");
        const video = section?.querySelector(".fp-services-media");
        if (!section || !video) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
            if (grid) {
                const fade = gsap.timeline({
                    defaults: { ease: "sine.inOut" },
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.25,
                    },
                });
                fade.to(grid, { opacity: 0, duration: 0.25 }, 0);
                fade.to(grid, { opacity: 1, duration: 0.25 }, 0.75);
            }

            const media = gsap.matchMedia();
            media.add("(min-width: 1069px)", () => {
                gsap.fromTo(video, { width: "0px" }, {
                    width: "100vw",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 99%",
                        end: "top top",
                        scrub: true,
                    },
                });
            });
            return () => media.revert();
        });

        return () => context.revert();
    }, []);

    return null;
}
