"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MEDIA_QUERY = "(min-width: 1069px)";
const TRIGGER_SELECTOR = ".fp-sec-before-after";
const BOUNDARY_START = "top 15%";

const VIDEO_BOX_1 = ".fp-video-box-1";
const VIDEO_BOX_2 = ".fp-video-box-2";
const CONTENT_SELECTOR = ".fp-grid-before-after .fp-content";

export default function VideosExpandAnimation() {
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(DESKTOP_MEDIA_QUERY, () => {
            const ctx = gsap.context(() => {
                const trigger = document.querySelector(TRIGGER_SELECTOR);
                if (!trigger) return;

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger,
                            start: "top 60%",
                            end: BOUNDARY_START,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    })
                    .fromTo(
                        VIDEO_BOX_1,
                        { clipPath: "inset(100% 0% 0% 0%)" },
                        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
                        0
                    )
                    .fromTo(
                        VIDEO_BOX_2,
                        { clipPath: "inset(0% 0% 100% 0%)" },
                        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
                        0
                    );

                const pinTl = gsap.timeline({
                    scrollTrigger: {
                        trigger,
                        start: BOUNDARY_START,
                        end: "+=500",
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                pinTl.to(
                    VIDEO_BOX_1,
                    {
                        x: 0,
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        ease: "none",
                    },
                    0
                );

                pinTl.to(
                    VIDEO_BOX_2,
                    {
                        x: 0,
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        ease: "none",
                    },
                    0
                );

                pinTl.fromTo(
                    CONTENT_SELECTOR,
                    { opacity: 0 },
                    { opacity: 1, ease: "none" },
                    0.2
                );
            });

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return null;
}