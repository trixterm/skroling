"use client";

import { useRef, useLayoutEffect, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesRevealProps {
  children: ReactNode;
  className?: string;
  gapAmount?: number;
}

export default function ServicesReveal({ children, className = "", gapAmount = 50 }: ServicesRevealProps) {
    const containerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        // Only run on home page
        if (pathname !== "/") {
            return;
        }

        // Wait for page transition and DOM to be ready
        const initTimer = setTimeout(() => {
            const ctx = gsap.context(() => {

                const items = gsap.utils.toArray<HTMLElement>(".item");

                if (items.length === 0) {
                    console.warn("ServicesReveal: No items found");
                    return;
                }

                items.forEach((item, index) => {
                    const extraScroll = index * gapAmount;

                    gsap.fromTo(item,
                        {
                            opacity: 0.1,
                            y: 5
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 3,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: `top+=${extraScroll} 90%`,
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            }
                        }
                    );
                });

            }, containerRef);

            // Refresh ScrollTrigger after initialization
            const refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 50);

            return () => {
                clearTimeout(refreshTimer);
                ctx.revert();
                // Clean up all ScrollTrigger instances for this component
                if (containerRef.current) {
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (containerRef.current?.contains(trigger.trigger as Node)) {
                            trigger.kill();
                        }
                    });
                }
            };
        }, 100); // Reduced from 700ms to 100ms for faster initialization

        return () => {
            clearTimeout(initTimer);
        };
    }, [gapAmount, pathname]); 

    return (
        <section ref={containerRef} className={className}>
            {children}
        </section>
    );
}