"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_SELECTOR = ".fp-sec-results";
const ARTICLES_SELECTOR = ".fp-results-list article";
const DESKTOP_MEDIA_QUERY = "(min-width: 1069px)";

const ExpandResultsAnimation = () => {
    useEffect(() => {
        const section = document.querySelector<HTMLElement>(SECTION_SELECTOR);
        if (!section) return;

        const articles = gsap.utils.toArray<HTMLElement>(ARTICLES_SELECTOR);
        if (articles.length === 0) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add(DESKTOP_MEDIA_QUERY, () => {
                gsap.set(articles, {
                    clipPath: "inset(0% 0% 100% 0%)",
                    willChange: "clip-path",
                });

                const tl = gsap.timeline({
                    defaults: { duration: 1, ease: "power3.out" },
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "bottom 50%",
                        scrub: true,
                    },
                });

                tl.to(articles, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    stagger: 0,
                });

                return () => {
                    tl.scrollTrigger?.kill();
                    tl.kill();
                };
            });
        }, section);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return null;
};

export default ExpandResultsAnimation;