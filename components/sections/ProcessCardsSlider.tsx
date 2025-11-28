"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

const SliderNav = dynamic(() => import("@/components/SliderNav"), {
    loading: () => <div className="w-20 h-10 bg-gray-800 rounded animate-pulse" />,
    ssr: false,
});

const ITEM_WIDTH = 300;
const GAP = 15;
const FULL_ITEM_WIDTH = ITEM_WIDTH + GAP;

const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
};

type CardData = {
    number: string;
    duration: string;
    title: string;
    description: string;
};

type ProcessedCard = CardData & {
    mainText: string;
    lastSentence: string;
};

const splitLastSentence = (text: string): { main: string; last: string } => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length === 0) return { main: text, last: "" };
    const last = sentences[sentences.length - 1];
    const main = text.slice(0, -last.length);
    return { main, last };
};

const ProcessCard = React.memo<{
    card: ProcessedCard;
    isActive: boolean;
    index: number;
}>(
    ({ card, isActive, index }) => (
        <li
            className="relative flex-shrink-0 w-[300px] h-[380px] bg-[#1a1a1a] rounded-2xl p-6 pr-4 flex flex-col justify-between transition-all duration-300"
            style={{ 
                scrollSnapAlign: "start",
                contain: "layout style paint",
                willChange: isActive ? "transform" : "auto" 
            }}
            aria-current={isActive ? "true" : "false"}
            aria-label={`Step ${index + 1}: ${card.title}`}
        >
            <div>
                <div className="duration-wrap flex mb-6">
                    <div className="flex self-start border border-white px-6 py-1.5 rounded-[20px]">
                        <span className="text-[10px] font-medium text-[#F0F0F0] leading-[12px]">
                            {card.duration}
                        </span>
                    </div>
                    <div
                        className={`inline-block -mt-[14px] ml-auto text-[94px] font-medium leading-none transition-colors duration-300 ${
                            isActive ? "text-white" : "text-[#F0F0F0]"
                        }`}
                    >
                        {card.number}
                    </div>
                </div>
                <p className="text-[13px] text-[#F0F0F0] leading-[18px]">
                    {card.mainText}
                    {card.lastSentence && (
                        <span className="text-[#C4C4C4]">{card.lastSentence}</span>
                    )}
                </p>
            </div>
            <h3 className="text-[40px] font-medium text-[#F0F0F0] leading-none">
                {card.title}
            </h3>
        </li>
    ),
    (prev, next) => prev.isActive === next.isActive && prev.card === next.card
);

ProcessCard.displayName = "ProcessCard";

const ProcessCardsSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    // New state specifically for navigation buttons
    const [navState, setNavState] = useState({
        isAtStart: true,
        isAtEnd: false
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTicking = useRef(false);
    const isScrollingProgrammatically = useRef(false);

    const cards = useMemo<CardData[]>(
        () => [
            { number: "01", duration: "1-2 weeks", title: "Discovery", description: "The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional." },
            { number: "02", duration: "2-3 weeks", title: "Research", description: "We analyzed user behavior extensively. This allowed us to refine features and significantly improve UX. The final decisions were all data-driven and intuitive." },
            { number: "03", duration: "3-4 weeks", title: "Wireframe", description: "We created a full structural blueprint of the website. Every user journey was streamlined for efficiency. The clarity it brought saved weeks of development." },
            { number: "04", duration: "4-5 weeks", title: "Build", description: "The development process was executed with precision. The codebase is highly optimized and scalable. It ensures long-term stability and easy maintenance." },
            { number: "05", duration: "1-2 weeks", title: "Animation", description: "Micro-interactions were designed to enrich the user experience. They add motion that feels natural and purposeful. Users reported a significant increase in engagement." },
            { number: "06", duration: "2-3 weeks", title: "Testing", description: "Every feature underwent rigorous QA testing. We simulated real-world scenarios to eliminate issues. The final product is polished and exceptionally reliable." },
        ],
        []
    );

    const processedCards = useMemo<ProcessedCard[]>(
        () => cards.map((card) => {
            const { main, last } = splitLastSentence(card.description);
            return { ...card, mainText: main, lastSentence: last };
        }),
        [cards]
    );

    // Consolidated scroll logic
    const updateScrollState = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // 1. Calculate Active Index (Visual Highlighting)
        // We only update this if not scrolling programmatically to prevent flickering during animation
        if (!isScrollingProgrammatically.current) {
            const newIndex = Math.round(container.scrollLeft / FULL_ITEM_WIDTH);
            const clampedIndex = Math.max(0, Math.min(newIndex, processedCards.length - 1));
            
            // Only update state if changed
            setActiveIndex(prev => prev !== clampedIndex ? clampedIndex : prev);
        }

        // 2. Calculate Button States (Geometry Based)
        // Use a tolerance of 2px to handle fractional scaling issues on some displays
        const TOLERANCE = 2;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        const isAtStart = scrollLeft <= TOLERANCE;
        const isAtEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= TOLERANCE;

        setNavState(prev => {
            if (prev.isAtStart === isAtStart && prev.isAtEnd === isAtEnd) return prev;
            return { isAtStart, isAtEnd };
        });

    }, [processedCards.length]);

    const handleScroll = useCallback(() => {
        if (scrollTicking.current) return;
        scrollTicking.current = true;
        requestAnimationFrame(() => {
            updateScrollState();
            scrollTicking.current = false;
        });
    }, [updateScrollState]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Initial check on mount to set correct button state
        updateScrollState();

        container.addEventListener("scroll", handleScroll, { passive: true });
        
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Force update on resize as container width changes affect 'isAtEnd'
                updateScrollState();
            }, 150);
        };
        
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [handleScroll, updateScrollState]);

    const scrollToCard = useCallback(
        (direction: "next" | "prev") => {
            const container = scrollContainerRef.current;
            if (!container) return;

            // Determine target
            // Note: We use Math.round on current scroll position to find the current "slot",
            // then add/subtract. This is more reliable than relying on activeIndex state 
            // which might be slightly stale during rapid clicks.
            const currentSlot = Math.round(container.scrollLeft / FULL_ITEM_WIDTH);
            const targetIndex = direction === "next" ? currentSlot + 1 : currentSlot - 1;

            if (targetIndex < 0 || targetIndex >= processedCards.length) return;

            isScrollingProgrammatically.current = true;
            setActiveIndex(targetIndex);

            container.scrollTo({
                left: targetIndex * FULL_ITEM_WIDTH,
                behavior: "smooth",
            });

            // Re-enable active index detection after scroll animation (approx 500-1000ms)
            // Using a slightly smarter check than just a timeout:
            const checkScrollEnd = () => {
                if(!isScrollingProgrammatically.current) return;
                
                // If we are close enough to target, unlock
                const targetLeft = targetIndex * FULL_ITEM_WIDTH;
                if(Math.abs(container.scrollLeft - targetLeft) < 5) {
                    isScrollingProgrammatically.current = false;
                    updateScrollState(); // Final verification
                } else {
                    requestAnimationFrame(checkScrollEnd);
                }
            };
            
            // Start checking or fallback to timeout if animation gets stuck
            requestAnimationFrame(checkScrollEnd);
            setTimeout(() => { isScrollingProgrammatically.current = false; }, 1000);
        },
        [processedCards.length, updateScrollState]
    );

    const scrollToIndex = useCallback(
        (index: number) => {
            const container = scrollContainerRef.current;
            if (!container) return;

            isScrollingProgrammatically.current = true;
            setActiveIndex(index);
            container.scrollTo({ left: index * FULL_ITEM_WIDTH, behavior: "smooth" });
            
            setTimeout(() => { isScrollingProgrammatically.current = false; }, 1000);
        },
        []
    );

    return (
        <section className="fp-sec-process-cards-slider py-44" aria-label="Product development process">
            <div className="container">
                <header className="fp-header flex items-center mb-6">
                    <h2 className="fp-title text-[16px] font-semibold">
                        Your product going to live process
                    </h2>
                    <div className="ml-auto">
                        <SliderNav
                            onPrev={() => scrollToCard("prev")}
                            onNext={() => scrollToCard("next")}
                            disablePrev={navState.isAtStart}
                            disableNext={navState.isAtEnd}
                        />
                    </div>
                </header>
            </div>

            <div className="ml-auto max-w-full w-[1360px] fp-scroll-gallery">
                <div className="relative fp-scroll-container">
                    <ul
                        ref={scrollContainerRef}
                        className="flex gap-[15px] pb-4 overflow-x-auto"
                        style={{
                            scrollSnapType: "x mandatory",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                        role="list"
                        aria-label="Process steps"
                    >
                        {processedCards.map((card, index) => (
                            <ProcessCard
                                key={card.number}
                                card={card}
                                isActive={activeIndex === index}
                                index={index}
                            />
                        ))}
                        <div className="w-[1px] flex-shrink-0" aria-hidden="true" />
                    </ul>
                </div>

                <nav className="flex justify-center gap-2 mt-8" aria-label="Slider pagination">
                    {processedCards.map((card, index) => (
                        <button
                            key={card.number}
                            onClick={() => scrollToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                                activeIndex === index
                                    ? "bg-[#F0F0F0] w-8"
                                    : "bg-[#F0F0F0]/20 hover:bg-[#F0F0F0]/40"
                            }`}
                            aria-label={`Go to ${card.title}`}
                            aria-current={activeIndex === index ? "true" : "false"}
                        />
                    ))}
                </nav>
            </div>
            <style jsx>{`
                ul::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default ProcessCardsSlider;