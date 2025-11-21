"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CountUp({ selector = ".fp-sec-results" }) {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = [];
    const timelines = [];

    const items = document.querySelectorAll(`${selector} .item`);

    items.forEach((item) => {
      const numberEl = item.querySelector(".fp-number");
      const lineEl = item.querySelector(".border");

      if (!numberEl || !lineEl) return;

      // RESET DOM state prieš kuriant animaciją
      const originalText = numberEl.innerText;
      const finalValue = originalText.replace(/[^0-9]/g, "");
      const prefix = originalText.replace(/[0-9]/g, "");

      numberEl.innerText = prefix + "0";      // resetinam skaičių
      lineEl.style.transform = "scaleX(0)";   // resetinam liniją
      lineEl.style.transformOrigin = "left";

      const obj = { val: 0 };

      // Timeline su triggeriu
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: "top 70%",
          once: true
        }
      });

      // store instances so we can kill them later
      timelines.push(tl);
      triggers.push(tl.scrollTrigger);

      tl.fromTo(
        obj,
        { val: 0 },
        {
          val: Number(finalValue),
          duration: 2,
          ease: "back.out(2)",
          onUpdate: () => {
            numberEl.innerText = prefix + Math.floor(obj.val);
          }
        }
      );

      tl.fromTo(
        lineEl,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power1.out" },
        "+=0.1"
      );
    });

    // CLEANUP — super svarbu Next.js routing'e
    return () => {
      timelines.forEach((tl) => tl.kill());
      triggers.forEach((tr) => tr.kill());
      ScrollTrigger.refresh(); // atnaujina visą GSAP būseną
    };
  }, [selector]);

  return null;
}