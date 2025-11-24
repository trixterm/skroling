"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import styles from '@/components/sections/StorylineSection.module.css';

export default function StorylineSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(".fp-swiper-storyline .item")
      );

      if (!items.length) return;

      const scrollLeft = container.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    // pradžioje užtikrinam, kad aktyvus pirmas
    setActiveIndex(0);

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrow = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(".fp-swiper-storyline .item")
    );

    if (!items.length) return;

    let newIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;

    if (newIndex < 0) newIndex = 0;
    if (newIndex > items.length - 1) newIndex = items.length - 1;

    const target = items[newIndex];
    if (!target) return;

    container.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(newIndex);
  };

  return (
    <section className="fp-sec-storyline py-44">
      <div className="inner relative">
        <header className="absolute w-[90%] mx-auto top-[237px] left-0 right-0 pb-4 flex items-end z-2">
          <div className="text-[16px] font-semibold leading-none">
            My Storyline
          </div>

          <nav className="fp-nav-btn fp-nav-swiper-work ml-auto flex border-1 border-[#707070] rounded-3xl items-center justify-between py-[9px] px-3">
            <svg
              className="fp-arrow fp-arrow-left cursor-pointer"
              onClick={() => handleArrow("prev")}
              fill="#000000"
              width="11px"
              height="11px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path>
            </svg>

            <div className="fp-line-1 w-[55px] h-[1px] bg-[#000]" />

            <svg
              className="fp-arrow fp-arrow-right cursor-pointer"
              onClick={() => handleArrow("next")}
              fill="#000000"
              width="11px"
              height="11px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path>
            </svg>
          </nav>

          <div className="absolute bottom-0 left-0 w-full border-1 text-[#707070]"></div>
        </header>

        <div className="fp-swiper-storyline-wrapper fp-scroll-gallery max-w-1/2 ml-auto">
          <div ref={scrollRef} className="fp-scroll-container">
            <div className="fp-swiper-storyline flex gap-x-10">
              <div className={`item ${activeIndex === 0 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>

              <div className={`item ${activeIndex === 1 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>

              <div className={`item ${activeIndex === 2 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>

              <div className={`item ${activeIndex === 3 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>

              <div className={`item ${activeIndex === 4 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>

              <div className={`item ${activeIndex === 5 ? "is-active" : ""}`}>
                <div className="fp-mask w-[200px] h-[265px] relative">
                  <Image
                    className="object-cover"
                    src="/images/website-1.jpg"
                    fill
                    alt=""
                  />
                </div>
                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                  Worked at flip180 media lead of the dev team. Worked at
                  flip180 media lead of the dev team. Worked at flip180 media
                  lead of the dev team. Worked at flip180 media lead of the dev
                  team.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
