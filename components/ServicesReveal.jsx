"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesReveal() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".fp-sec-services .item", {
        opacity: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 1,
        scrollTrigger: {
            trigger: ".fp-sec-services",
            start: "top 80%",
            end: "top 40%"
        },
    });
  }, []);

  return null;
}