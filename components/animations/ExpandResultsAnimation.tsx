"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExpandResultsAnimation = () => {
    useEffect(() => {
        const section = document.querySelector<HTMLElement>(".fp-sec-results");
        const articles = gsap.utils.toArray<HTMLElement>(".fp-results-list article");

        if (!section || !articles.length) return;

        const ctx = gsap.context(() => {
            gsap.set(articles, {
                clipPath: "inset(0% 0% 100% 0%)",
                willChange: "clip-path",
            });

            gsap.timeline({
                defaults: { duration: 1, ease: "power3.out" },
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom 50%",
                    scrub: true,
                },
            }).to(articles, {
                clipPath: "inset(0% 0% 0% 0%)",
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return null;
};

export default ExpandResultsAnimation;
 