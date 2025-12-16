"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideosExpandAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = document.querySelector(".fp-sec-before-after");
      if (!trigger) return;

      const boundary = "top 15%";

      // 1) NO PIN — tik clipPath reveal
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 60%",
          end: boundary,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      revealTl.fromTo(
        ".fp-video-box-1",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        0
      );

      revealTl.fromTo(
        ".fp-video-box-2",
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        0
      );

      // 2) PIN — x + radius + content fade (prasideda tik kai tampa pin)
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: boundary,
          end: "+=500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTl.to(
        ".fp-video-box-1",
        {
          x: 0,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          ease: "none",
        },
        0
      );

      pinTl.to(
        ".fp-video-box-2",
        {
          x: 0,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          ease: "none",
        },
        0
      );

      pinTl.fromTo(
        ".fp-grid-before-after .fp-content",
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0.2 // jei nori iškart pin start — daryk 0
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
