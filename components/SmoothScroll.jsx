"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}