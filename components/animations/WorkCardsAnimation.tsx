"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkCardsAnimation = () => {
    useEffect(() => {
        const triggers: ScrollTrigger[] = [];

        const timeoutId = window.setTimeout(() => {
        const cards = gsap.utils.toArray<HTMLElement>(
            ".service-card, .service-card-last"
        );

        if (!cards.length) return;

        gsap.set(cards, {
                willChange: "transform",
                force3D: true,
                backfaceVisibility: "hidden",
        });

        if (window.innerWidth < 1024) return;

        cards.forEach((card, index) => {
            const offset = -360 + 120 * index;

            const tween = gsap.to(card, {
                y: offset,
                transformOrigin: "top center",
                ease: "power2.inOut",
            });

            const trigger = ScrollTrigger.create({
                trigger: card,
                start: "top top+=200",
                end: "top top+=200",
                endTrigger: ".service-card-last",
                scrub: true,
                pin: true,
                pinSpacing: false,
                fastScrollEnd: true,
                animation: tween,
            });

            triggers.push(trigger);
        });

        ScrollTrigger.refresh();
        }, 300);

        return () => {
            window.clearTimeout(timeoutId);
            triggers.forEach((t) => t.kill());
        };
  }, []);

  return null;
};

export default WorkCardsAnimation;
