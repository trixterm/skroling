"use client";

import { useEffect, useRef, useState } from "react";
import GridDigit, { DIGITS, DigitContent } from "@/components/GridDigit";

const FADE_DURATION_MS = 300;

export default function MyExpertiseSection() {
    const [displayedContent, setDisplayedContent] = useState<DigitContent>({
        heading: DIGITS[1].heading,
        description: DIGITS[1].description,
    });
    const [isVisible, setIsVisible] = useState(true);
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fadeOutStartedRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (fadeTimerRef.current) {
                clearTimeout(fadeTimerRef.current);
            }
        };
    }, []);

    const startFadeOut = () => {
        if (!isVisible && fadeOutStartedRef.current !== null) return;
        fadeOutStartedRef.current = performance.now();
        setIsVisible(false);
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }
    };

    const scheduleReveal = (content: DigitContent) => {
        const show = () => {
            setDisplayedContent(content);
            setIsVisible(true);
            fadeOutStartedRef.current = null;
            fadeTimerRef.current = null;
        };

        const start = fadeOutStartedRef.current;
        if (start === null) {
            show();
            return;
        }

        const elapsed = performance.now() - start;
        const wait = Math.max(FADE_DURATION_MS - elapsed, 0);

        if (wait === 0) {
            show();
        } else {
            fadeTimerRef.current = window.setTimeout(show, wait);
        }
    };

    const handleDigitChange = (_: number | null, content: DigitContent | null) => {
        if (!content) {
            startFadeOut();
            return;
        }

        const isSame =
            content.heading === displayedContent.heading &&
            content.description === displayedContent.description;

        if (isSame && isVisible) {
            return;
        }

        if (isVisible) {
            startFadeOut();
        } else if (fadeOutStartedRef.current === null) {
            fadeOutStartedRef.current = performance.now();
        }

        scheduleReveal(content);
    };

    const fadeClass = `transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`;

    return (
        <>
            <section className="fp-sec-my-expertise">
                <div className="fp-grid-background-3"></div>
                <div className="container">
                    <div className="inner relative z-2">
                        <div className="fp-heading fp-extra-font text-[34px] font-medium mb-18">Knowledge</div>
                        <div className="fp-grid-steps-1 md:flex md:gap-x-16 md:items-center max-w-[920px] mx-auto">
                            <div className="fp-col">
                                <GridDigit onDigitChange={handleDigitChange} />
                            </div>
                            <div className="fp-col max-w-[490px]">
                                <div className={fadeClass}>
                                    <div className="fp-heading fp-extra-font text-[28px] leading-10 font-medium mb-4">{displayedContent.heading}</div>
                                    <div className="fp-text text-[16px] font-medium">{displayedContent.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
