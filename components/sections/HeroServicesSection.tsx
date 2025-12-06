"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingCircleText from "@/components/RotatingCircleText";

export default function HeroServicesSection() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const circle = circleRef.current;
    const videoWrapper = videoContainerRef.current;
    const videoEl = videoRef.current;

    if (!circle || !videoWrapper || !videoEl) return;

    const getTargetConfig = () => {
      const rect = videoWrapper.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        width: rect.width,
        height: rect.height,
      };
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      const target = getTargetConfig();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: circle,
          start: "top center",   // debugui gali keisti į "top top"
          end: "+=1000",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          // markers: true, // -> įjunk, jei nori pamatyti, ar ScrollTrigger veikia
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

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="fp-sec-hero-services relative pt-28 pb-16">
      <div className="inner text-center relative z-10">
        <div className="fp-heading-wrap relative">
          <div className="fp-heading fp-extra-font text-[310px] font-medium uppercase">
            Evoking
          </div>

          {/* TIKRAS animuojamas blokas */}
          <div
            ref={circleRef}
            className="fp-rotating-text-block absolute top-[130px] left-[415px] w-[245px] h-[245px] rounded-full bg-gray-400 flex items-center justify-center overflow-hidden will-change-transform"
          >
            <RotatingCircleText
              text="TYPING ALL AROUND THE CIRCLE CAUSE I CAN DO THIS HERE..."
              centerText="VIDEO"
              size={245}
            />
          </div>
        </div>
      </div>

      {/* VIDEO TARGET apačioje */}
      <div
        ref={videoContainerRef}
        className="fp-video-morph-target fixed bottom-0 left-0 w-full aspect-video overflow-hidden rounded-xl pointer-events-none z-20"
      >
        <video
          ref={videoRef}
          src="/video/sample.mp4"
          className="w-full h-full object-cover opacity-0"
          muted
          playsInline
        />
      </div>
    </section>
  );
}
