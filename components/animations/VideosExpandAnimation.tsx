"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideosExpandAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerElement = document.querySelector(".fp-sec-before-after");

      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "top 14%",
            end: "+=300",
            scrub: 1,
            pin: true,
          },
        });

        tl.fromTo(
          ".fp-video-box-1",
          { clipPath: "inset(99.5% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0
        );

        tl.fromTo(
          ".fp-video-box-2",
          { clipPath: "inset(0% 0% 99.5% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0
        );

        tl.to(
          ".fp-video-box-1",
          { x: 0, borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", ease: "none" },
          1
        );

        tl.to(
          ".fp-video-box-2",
          { x: 0, borderTopLeftRadius: "20px", borderTopRightRadius: "20px", ease: "none" },
          1
        );

        tl.fromTo(
          ".fp-grid-before-after .fp-content",
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          1
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}