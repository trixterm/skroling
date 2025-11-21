"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
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

export default function ServicesReveal({ children, className = "", gapAmount = 80 }: ServicesRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            const items = gsap.utils.toArray<HTMLElement>(".item");

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

        return () => ctx.revert();
    }, [gapAmount]); 

    return (
        <section ref={containerRef} className={className}>
            {children}
        </section>
    );
}