"use client";

import React, {
    ReactElement,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoExpandProps {
    children: ReactElement;
}

const VideoExpandAnimation2: React.FC<VideoExpandProps> = ({ children }) => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const videoEl = section.querySelector<HTMLElement>(".fp-video-block-1");
            const headingEl = section.querySelector<HTMLElement>(".fp-heading-wrap");
            const letterEls = section.querySelectorAll<SVGElement>(
                ".fp-k-letter, .fp-v-letter, .fp-n-letter"
            );

            if (!videoEl || !headingEl) return;

            // Nustatome pradines raidžių reikšmes
            if (letterEls.length) {
                letterEls.forEach((letterEl) => {
                    gsap.set(letterEl, {
                        transform: "translate3d(0, 0, 0)",
                        zIndex: 50,
                        willChange: "transform",
                        force3D: true,
                    });
                });
            }

            gsap.set(videoEl, { zIndex: 3 });

            const triggerConfig = {
                trigger: section,
                start: "top top",
                endTrigger: headingEl,
                end: "bottom-=100 top",
            } as const;

            const getEndScrollPosition = () => {
                const tempST = ScrollTrigger.create(triggerConfig);
                const endPos = tempST.end;
                tempST.kill();
                return endPos;
            };

            // --- AUKŠČIO SKAIČIAVIMAS ---
            const calculateSectionHeight = () => {
                // Resetuojame y, kad gautume tikslias pradines koordinates
                gsap.set(videoEl, { y: 0 });

                const isMobile = window.innerWidth < 768;
                const sectionStyles = window.getComputedStyle(section);
                const paddingBottom = parseFloat(sectionStyles.paddingBottom);
                
                const videoRect = videoEl.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                
                // Paskaičiuojame būsimą video dydį
                const videoAspectRatio = videoRect.height / videoRect.width;
                const finalWidth = window.innerWidth * 0.96; // 96vw
                const finalHeight = finalWidth * videoAspectRatio;

                if (isMobile) {
                    // --- MOBILE LOGIKA ---
                    // Video slenka žemyn 40px
                    const videoTopRelativeToSection = videoRect.top - sectionRect.top;
                    const animationDistance = 40; // Pasislinkimas žemyn

                    // Aukštis = (kur video prasideda) + (kiek pasislenka) + (naujas aukštis) + (padding)
                    const totalHeightNeeded = videoTopRelativeToSection + animationDistance + finalHeight + paddingBottom;

                    section.style.height = `${totalHeightNeeded}px`;

                } else {
                    // --- DESKTOP LOGIKA ---
                    // Video slenka žemyn 60px
                    const videoTopRelativeToSection = videoRect.top - sectionRect.top;
                    const animationDistance = 60; // Pasislinkimas žemyn

                    const totalHeightNeeded = videoTopRelativeToSection + animationDistance + finalHeight + paddingBottom;

                    section.style.height = `${totalHeightNeeded}px`;
                }
            };

            calculateSectionHeight();

            const endScrollPosition = getEndScrollPosition();

            // --- Y POZICIJOS SKAIČIAVIMAS ---
            const calculateVideoEndY = () => {
                const isMobile = window.innerWidth < 992;

                if (isMobile) {
                    // Mobile: slenka į apačią nedaug - 40px
                    return 40;
                }

                // Desktop: slenka į apačią dar mažiau - 60px
                return 60;
            };

            const getInitialVideoWidth = () => {
                gsap.set(videoEl, { y: 0, zIndex: 3 });
                return videoEl.getBoundingClientRect().width || 320;
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    ...triggerConfig,
                    scrub: 0.6,
                    pin: false,
                    invalidateOnRefresh: true,
                    onRefresh: calculateSectionHeight,
                },
            });

            tl.fromTo(
                videoEl,
                { width: getInitialVideoWidth, y: 0, zIndex: 3 },
                { width: "96vw", y: calculateVideoEndY, zIndex: 3, ease: "none" },
                0
            );

            tl.fromTo(
                headingEl,
                { opacity: 1 },
                { opacity: 0, ease: "none" },
                0.2
            );

            const handleResize = () => {
                calculateSectionHeight();
                ScrollTrigger.refresh();
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    const child = useMemo(
        () => React.Children.only(children) as ReactElement<any>,
        [children]
    );

    const originalRef = (child as any).ref as React.Ref<HTMLElement> | undefined;

    const combinedRef = useCallback(
        (node: HTMLElement | null) => {
            sectionRef.current = node;

            if (!originalRef) return;

            if (typeof originalRef === "function") {
                originalRef(node);
            } else if (typeof originalRef === "object") {
                (originalRef as React.MutableRefObject<HTMLElement | null>).current =
                    node;
            }
        },
        [originalRef]
    );

    return React.cloneElement(child, { ref: combinedRef });
};

export default React.memo(VideoExpandAnimation2);