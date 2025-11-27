"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import SliderNav from "@/components/SliderNav";

const ITEM_WIDTH = 300;
const GAP = 15;
const FULL_ITEM_WIDTH = ITEM_WIDTH + GAP;

/* 🔥 Memoizuota paskutinio sakinio išskyrimo logika */
const useSplitLastSentence = (text: string) => {
    return useMemo(() => {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

        if (sentences.length === 0) {
            return { main: text, last: "" };
        }

        const last = sentences[sentences.length - 1];
        const main = text.slice(0, -last.length);

        return { main, last };
    }, [text]);
};

const ProcessCardsSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTicking = useRef(false);
    const isScrollingProgrammatically = useRef(false);

    const cards = useMemo(
        () => [
            {
                number: "01",
                duration: "1-2 weeks",
                title: "Discovery",
                description:
                    "The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.",
            },
            {
                number: "02",
                duration: "2-3 weeks",
                title: "Research",
                description:
                    "We analyzed user behavior extensively. This allowed us to refine features and significantly improve UX. The final decisions were all data-driven and intuitive.",
            },
            {
                number: "03",
                duration: "3-4 weeks",
                title: "Wireframe",
                description:
                    "We created a full structural blueprint of the website. Every user journey was streamlined for efficiency. The clarity it brought saved weeks of development.",
            },
            {
                number: "04",
                duration: "4-5 weeks",
                title: "Build",
                description:
                    "The development process was executed with precision. The codebase is highly optimized and scalable. It ensures long-term stability and easy maintenance.",
            },
            {
                number: "05",
                duration: "1-2 weeks",
                title: "Animation",
                description:
                    "Micro-interactions were designed to enrich the user experience. They add motion that feels natural and purposeful. Users reported a significant increase in engagement.",
            },
            {
                number: "06",
                duration: "2-3 weeks",
                title: "Testing",
                description:
                    "Every feature underwent rigorous QA testing. We simulated real-world scenarios to eliminate issues. The final product is polished and exceptionally reliable.",
            },
        ],
        []
    );

    /* 🔥 Active card detection (ultra-fast) */
    const detectActiveCard = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container || isScrollingProgrammatically.current) return;

        const newIndex = Math.round(container.scrollLeft / FULL_ITEM_WIDTH);
        const clampedIndex = Math.max(0, Math.min(newIndex, cards.length - 1));

        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    }, [activeIndex, cards.length]);

    /* 🔥 Throttled scroll using requestAnimationFrame */
    const handleScroll = useCallback(() => {
        if (scrollTicking.current) return;

        scrollTicking.current = true;
        requestAnimationFrame(() => {
            detectActiveCard();
            scrollTicking.current = false;
        });
    }, [detectActiveCard]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [handleScroll]);

    /* 🔥 Navigation calculation with boundary protection */
    const scrollToCard = useCallback(
        (direction: "next" | "prev") => {
            const container = scrollContainerRef.current;
            if (!container) return;

            // Calculate target index with boundaries
            let targetIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;
            
            // 🚨 KEY FIX: Prevent navigation beyond boundaries
            if (targetIndex < 0 || targetIndex >= cards.length) {
                return; // Do nothing if we're at the edge
            }

            const targetScrollLeft = targetIndex * FULL_ITEM_WIDTH;

            // Mark that we're scrolling programmatically
            isScrollingProgrammatically.current = true;

            // Immediately update active index for instant UI feedback
            setActiveIndex(targetIndex);

            // Cleanup function to reset flag
            const cleanup = () => {
                isScrollingProgrammatically.current = false;
                container.removeEventListener("scrollend", cleanup);
            };

            container.addEventListener("scrollend", cleanup, { once: true });

            // Perform smooth scroll
            container.scrollTo({
                left: targetScrollLeft,
                behavior: "smooth",
            });

            // Fallback cleanup in case scrollend doesn't fire (rare edge cases)
            setTimeout(() => {
                if (isScrollingProgrammatically.current) {
                    isScrollingProgrammatically.current = false;
                }
            }, 1000);
        },
        [activeIndex, cards.length]
    );

    const scrollToIndex = useCallback((index: number) => {
        const container = scrollContainerRef.current;
        if (!container || index < 0 || index >= cards.length) return;

        isScrollingProgrammatically.current = true;
        setActiveIndex(index);

        const cleanup = () => {
            isScrollingProgrammatically.current = false;
        };

        container.scrollTo({
            left: index * FULL_ITEM_WIDTH,
            behavior: "smooth",
        });

        setTimeout(cleanup, 1000);
    }, [cards.length]);

    // Calculate if navigation buttons should be disabled
    const canGoPrev = activeIndex > 0;
    const canGoNext = activeIndex < cards.length - 1;

    return (
        <section className="fp-sec-process-cards-slider py-44">
            <div className="container">
                <header className="fp-header flex items-center mb-6">
                    <div className="fp-title text-[16px] font-semibold">
                        Your product going to live process
                    </div>
                    <div className="ml-auto">
                        <SliderNav 
                            onPrev={() => scrollToCard("prev")} 
                            onNext={() => scrollToCard("next")}
                            disablePrev={!canGoPrev}
                            disableNext={!canGoNext}
                        />
                    </div>
                </header>
            </div>

            <div className="ml-auto w-[1360px] fp-scroll-gallery">
                <div className="relative fp-scroll-container">
                    <ul
                        ref={scrollContainerRef}
                        className="flex gap-[15px] pb-4 overflow-x-auto"
                        style={{
                            scrollSnapType: "x mandatory",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {cards.map((card, index) => {
                            const { main, last } = useSplitLastSentence(card.description);

                            return (
                                <li
                                    key={index}
                                    className="relative flex-shrink-0 w-[300px] h-[380px] bg-[#1a1a1a] rounded-2xl p-6 pr-4 flex flex-col justify-between transition-all duration-300"
                                    style={{ scrollSnapAlign: "start" }}
                                    aria-current={activeIndex === index ? "true" : "false"}
                                >
                                    <div>
                                        <div className="duration-wrap flex mb-6">
                                            <div className="flex self-start border border-[#FFF] px-6 py-1.5 rounded-[20px]">
                                                <span className="text-[10px] font-medium text-[#F0F0F0] leading-[12px]">
                                                    {card.duration}
                                                </span>
                                            </div>
                                            <div
                                                className={`inline-block -mt-[14px] ml-auto text-[94px] font-medium leading-none transition-colors duration-300 ${
                                                    activeIndex === index ? "text-white" : "text-[#F0F0F0]"
                                                }`}
                                            >
                                                {card.number}
                                            </div>
                                        </div>

                                        <p className="text-[13px] text-[#F0F0F0] leading-[18px]">
                                            {main}
                                            {last && <span className="text-[#C4C4C4]">{last}</span>}
                                        </p>
                                    </div>

                                    <h3 className="text-[40px] font-medium text-[#F0F0F0] leading-none">
                                        {card.title}
                                    </h3>
                                </li>
                            );
                        })}

                        <div className="w-[1px] flex-shrink-0" />
                    </ul>
                </div>

                {/* dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                activeIndex === index
                                    ? "bg-[#F0F0F0] w-8"
                                    : "bg-[#F0F0F0]/20 hover:bg-[#F0F0F0]/40"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                ul::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default ProcessCardsSlider;