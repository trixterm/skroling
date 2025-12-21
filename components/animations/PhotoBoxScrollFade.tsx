"use client";

import { FC, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let gsapRegistered = false;
const registerGsap = () => {
  if (typeof window === "undefined") return;
  if (gsapRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
};

type PhotoBoxScrollFadeProps = {
  /** Selektorius .photo-box elementams konteineryje */
  selector?: string;    
  /** Konteinerio selektorius, kuriame yra .photo-box */
  containerSelector?: string;
  /** Stagger delay tarp elementų */
  stagger?: number;
  /** Easing funkcija */
  ease?: string;
};

const PhotoBoxScrollFade: FC<PhotoBoxScrollFadeProps> = ({
  selector = ".photo-box img",
  containerSelector = ".fp-work-page-inner",
  stagger = 0.15,
  ease = "power2.out",
}) => {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    registerGsap();

    const container = document.querySelector(
      containerSelector
    ) as HTMLElement | null;

    if (!container) return;

    const boxes = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(selector)
    );

    if (!boxes.length) return;

    // Pradžioje – visi pilnai matomi
    gsap.set(boxes, { opacity: 1 });

    // Timeline, valdoma per ScrollTrigger progress
    const tl = gsap.timeline({ paused: true });

    tl.to(boxes, {
      opacity: 0,
      stagger,
      ease,
      duration: 1,
    });

    // Bendras scroll intervalas: nuo 0 iki 50% viewport height
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,           // gali būti ir container, svarbu, kad toks elementas egzistuoja
      start: 0,                     // "nuo pat puslapio viršaus"
      end: () => window.innerHeight * 0.5, // iki 50% viewport aukščio
      scrub: true,                  // glotniai riša scroll su progress
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // self.progress = 0 prie scrollY = 0
        // self.progress = 1 prie scrollY = 0.5 * viewport height
        tl.progress(self.progress);
      },
      // markers: true, // pasijunk debugui, jei nori pamatyti start/end
    });

    return () => {
      scrollTrigger.kill();
      tl.kill();
    };
  }, [selector, containerSelector, stagger, ease]);

  return null;
};

export default PhotoBoxScrollFade;