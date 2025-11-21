"use client";

import { useEffect, useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import ParallaxImg from "@/components/ParallaxImg";

export default function HeroHomeSection() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    useEffect(() => {
        const follow = () => {
            setSmoothPos((prev) => ({
                x: prev.x + (pos.x - prev.x) * 0.08,
                y: prev.y + (pos.y - prev.y) * 0.08,
            }));
            requestAnimationFrame(follow);
        };
        follow();
    }, [pos]);

    return (
        <section
            className="fp-sec-hero-home flex justify-center items-center h-screen relative overflow-hidden"
            onMouseMove={handleMove}
        >
            <div
                className="gradient-trail"
                style={{
                    left: smoothPos.x - 250,
                    top: smoothPos.y - 250,
                }}
            />

            <div
                className="gradient-ball"
                style={{
                    left: smoothPos.x - 200,
                    top: smoothPos.y - 200,
                }}
            />

            <div className="container mx-auto relative z-10">
                <div className="inner max-w-[700px] mx-auto text-center">
                    <SectionReveal>
                        <div className="fp-heading text-5xl font-semibold leading-14">
                            Websites that move, react, and engage your user
                        </div>
                    </SectionReveal>
                </div>
            </div>

            {/* <ParallaxImg src="/images/example-11.jpg" /> */}
        </section>
    );
}