"use client";

import styles from "./IntroSection.module.css";
import { useEffect } from "react";
import gsap from "gsap";
import { useAnimation } from "@/context/AnimationContext";
// import FluidCursor from "@/components/FluidCursor.jsx";
// import SpotlightCursor from '@/components/SpotlightCursor.jsx';

export default function IntroSection() {
    const { setIntroFinished } = useAnimation();

    useEffect(() => {
        const cursor = document.querySelector(".spotlight-cursor");
        const title = document.querySelector(".reveal-title");
        if (!title) return;

        const originalText = title.textContent;
        title.textContent = "";
        const chars = [];

        for (const ch of originalText) {
            const span = document.createElement("span");
            span.classList.add("char");
            span.textContent = ch === " " ? "\u00A0" : ch;
            title.appendChild(span);
            chars.push(span);
        }

        let charRects = [];
        let revealed = new Array(chars.length).fill(false);
        let revealedCount = 0;
        let fullyRevealed = false;

        const radius = 110;
        const r2 = radius * radius;

        function updateRects() {
            charRects = chars.map((span) => span.getBoundingClientRect());
        }
        updateRects();

        window.addEventListener("resize", updateRects);

        function finishAnimation() {
            fullyRevealed = true;
            title.classList.add("fully-revealed");
            document.body.classList.add("white-mode");
            document.body.style.cursor = "auto";
            if (cursor) cursor.remove();

            setTimeout(() => {
                document.body.classList.add("flash-done");
            }, 600);

            setIntroFinished(true);
        }

        function handleMouseMove(e) {
            if (!fullyRevealed && cursor) {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                });
            }

            if (fullyRevealed) return;

            const mx = e.clientX;
            const my = e.clientY;

            for (let i = 0; i < chars.length; i++) {
                if (revealed[i]) continue;

                const rect = charRects[i];
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = mx - cx;
                const dy = my - cy;

                if (dx * dx + dy * dy <= r2) {
                    revealed[i] = true;
                    revealedCount++;
                    chars[i].classList.add("revealed");
                }
            }

            if (revealedCount === chars.length) {
                finishAnimation();
            }
        }

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", updateRects);
        };
    }, [setIntroFinished]);

    return (
        <section className="fp-sec-hero-home flex justify-center items-center h-screen">
            <div className="spotlight-cursor"></div>
            <h1 className="text-5xl font-medium reveal-title text-center">
                Where performance meets perfection.
            </h1>
            <SpotlightCursor />
             {/* <FluidCursor /> */}
        </section>
    );
}