"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LineAnimationProps {
    children: React.ReactNode;
    className?: string;
}

export default function LineAnimation({ children, className = "" }: LineAnimationProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 1069px)", () => {
            const line = itemRef.current?.querySelector(".line-element");
            if (!line) return;

            const handleMouseEnter = () => {
                gsap.to(line, {
                    scaleX: 1,
                    transformOrigin: "left center",
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(line, {
                    scaleX: 0,
                    transformOrigin: "right center",
                    duration: 0.4,
                    ease: "power2.in",
                    overwrite: "auto",
                });
            };

            const item = itemRef.current;
            if (item) {
                item.addEventListener("mouseenter", handleMouseEnter);
                item.addEventListener("mouseleave", handleMouseLeave);
            }

            return () => {
                if (item) {
                    item.removeEventListener("mouseenter", handleMouseEnter);
                    item.removeEventListener("mouseleave", handleMouseLeave);
                }
            };
        });

        return () => mm.revert();
    }, { scope: itemRef });

    return (
        <div
            ref={itemRef}
            className={`relative overflow-hidden group ${className}`}
        >
            <span className="relative z-10">{children}</span>
            <div className="line-element absolute bottom-0 left-0 w-full h-px bg-current dark:bg-white origin-left scale-x-0 will-change-transform" />
        </div>
    );
}