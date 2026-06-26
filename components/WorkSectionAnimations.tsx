"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSectionAnimations() {
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
    const pathname = usePathname();
    const hasInitialized = useRef(false);

    useIsomorphicLayoutEffect(() => {
        // Only run on home page
        if (pathname !== "/") {
            hasInitialized.current = false;
            return;
        }

        // Wait for page transition and DOM to be ready
        const initTimer = setTimeout(() => {
            // Check if elements exist before creating animations
            const workSection = document.querySelector(".fp-sec-work");
            const slide2 = document.querySelector(".fp-swiper-work .swiper-slide:nth-child(2) .slide-inner");
            const slide3 = document.querySelector(".fp-swiper-work .swiper-slide:nth-child(3) .slide-inner");
            const navBtn = document.querySelector(".fp-sec-work .fp-nav-btn");

            if (!workSection || !slide2 || !slide3 || !navBtn) {
                console.warn("WorkSectionAnimations: Required elements not found");
                return;
            }

            const ctx = gsap.context(() => {
                gsap.from(slide2, {
                    y: -80,
                    duration: 4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: workSection,
                        start: "top 100%",
                        end: "bottom 20%",
                        scrub: true,
                    },
                });

                gsap.from(slide3, {
                    y: -160,
                    duration: 4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: workSection,
                        start: "top 100%",
                        end: "bottom 20%",
                        scrub: true,
                    },
                });

                gsap.from(navBtn, {
                    opacity: 0,
                    duration: 4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: workSection,
                        start: "top 20%",
                        end: "bottom 10%",
                        scrub: true,
                    },
                });
            });

            // Integrate ScrollTrigger with Lenis and refresh
            const refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
                hasInitialized.current = true;
            }, 50);

            return () => {
                clearTimeout(refreshTimer);
                ctx.revert();
                // Clean up all ScrollTrigger instances for this component
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.trigger === workSection) {
                        trigger.kill();
                    }
                });
            };
        }, 100); // Reduced from 700ms to 100ms for faster initialization

        return () => {
            clearTimeout(initTimer);
        };

    }, [pathname]);

    // Integrate ScrollTrigger with Lenis smooth scroll
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Try to get the Lenis instance if it exists on window
        const lenis = (window as any).__lenis;

        if (lenis && typeof lenis.on === "function") {
            // Update ScrollTrigger on Lenis scroll
            const handleLenisScroll = () => {
                ScrollTrigger.update();
            };

            lenis.on("scroll", handleLenisScroll);

            return () => {
                lenis.off("scroll", handleLenisScroll);
            };
        }
    }, []);

    return null;
}