"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoMorphScrollAnimation() {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const circle = blockRef.current;
    const videoWrapper = videoContainerRef.current;
    const videoEl = videoWrapper?.querySelector("video") as HTMLVideoElement | null;

    if (!circle || !videoWrapper) return;

    // Dynamic target dimensions for responsive layouts
    function getTargetConfig() {
      const rect = videoWrapper.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        width: rect.width,
        height: rect.height,
      };
    }

    // MatchMedia for responsive breakpoints
    const mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      const target = getTargetConfig();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: circle,
          start: "top center",
          end: "+=1200",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(circle, {
        y: () => target.y,
        ease: "power3.out",
      })
        .to(
          circle,
          {
            width: () => target.width,
            height: () => target.height,
            borderRadius: "10px",
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          circle,
          {
            x: () => target.x,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          circle,
          {
            backgroundColor: "transparent",
          },
          "<0.2"
        )
        .to(
          videoEl,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power1.out",
          },
          "<0.3"
        );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* Source circle → morph target */}
      <div ref={blockRef} className="fp-rotating-text-block" />

      {/* Video container at bottom */}
      <div
        ref={videoContainerRef}
        className="fp-video-morph-target fixed bottom-0 left-0 w-full aspect-video overflow-hidden rounded-xl pointer-events-none"
      >
        <video
          src="/video/sample.mp4"
          className="w-full h-full object-cover opacity-0"
          muted
          playsInline
        />
      </div>
    </>
  );
}
