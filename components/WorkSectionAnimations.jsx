import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkSectionAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".fp-swiper-work .swiper-slide:nth-child(2) .slide-inner", {
        y: -80,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".fp-sec-work",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
        },
    });

    gsap.from(".fp-swiper-work .swiper-slide:nth-child(3) .slide-inner", {
        y: -160,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".fp-sec-work",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
        },
    });

  }, []);

  return null;
}
