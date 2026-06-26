"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VideoExpandAnimation() {
    const ctxRef = useRef<gsap.Context | null>(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        const initializeAnimation = async () => {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            if (!isInitializedRef.current) {
                gsap.registerPlugin(ScrollTrigger);
                isInitializedRef.current = true;
            }

            requestAnimationFrame(() => {
                ctxRef.current = gsap.context(() => {
                    const mm = gsap.matchMedia();

                    mm.add("(min-width: 1069px)", () => {
                        gsap.fromTo(
                            ".fp-video-services video",
                            {
                                width: "0px",
                                // borderRadius: "20px",
                            },
                            {
                                width: "100vw",
                                // borderRadius: "0px",
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

                    return () => mm.revert();
                });
            });
        };

        initializeAnimation();

        return () => {
            ctxRef.current?.revert();
        };
    }, []);

    return null;
}