"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import FaqSection from "@/components/sections/FaqSection";
import ContactForm2 from '@/components/ContactForm2';

export default function ContactPage() {
    const maskRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const messageWindowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const sentTextRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [pathData, setPathData] = useState('');

    useEffect(() => {
        // Create SVG path based on actual dimensions
        if (messageWindowRef.current) {
            const rect = messageWindowRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            const r = 18; // border radius

            // Path with rounded corners (no bottom-left radius)
            const path = `
                M ${r},0
                L ${w - r},0
                Q ${w},0 ${w},${r}
                L ${w},${h - r}
                Q ${w},${h} ${w - r},${h}
                L ${r},${h}
                L 0,${h}
                L 0,${h - r}
                L 0,${r}
                Q 0,0 ${r},0
                Z
            `;
            setPathData(path);
        }
    }, []);

    useEffect(() => {
        if (!pathData) return;

        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
        const originalText = "Hi, how are you? Leave me a message and I will respond to you via email in a few days.";
        let typingInterval: NodeJS.Timeout | null = null;
        
        // 1. Animate mask scale from 0 to 1
        timeline.from(maskRef.current, {
            scale: 0,
            duration: 0.5,
            transformOrigin: 'center center',
            ease: 'back.out(1.7)'
        });

        // 2. Animate dot scale from 0 to 1
        timeline.from(dotRef.current, {
            scale: 0,
            duration: 0.3,
            transformOrigin: 'center center',
            ease: 'back.out(1.7)'
        }, '-=0.1');

        // 3. Draw outline border animation
        timeline.add(() => {
            const path = pathRef.current;
            if (path) {
                const pathLength = path.getTotalLength();
                
                path.style.strokeDasharray = `${pathLength}`;
                path.style.strokeDashoffset = `${pathLength}`;
                path.style.opacity = '1';
                
                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power1.inOut'
                });
            }
        });

        // Wait for border animation to complete
        timeline.to({}, { duration: 1.2 });

        // 4. Typing effect for text
        timeline.add(() => {
            if (textRef.current) {
                textRef.current.textContent = '';
                
                let index = 0;
                typingInterval = setInterval(() => {
                    if (textRef.current && index < originalText.length) {
                        textRef.current.textContent += originalText[index];
                        index++;
                    } else {
                        if (typingInterval) clearInterval(typingInterval);
                    }
                }, 30);
            }
        });

        // Wait for typing to complete (text length * 30ms)
        timeline.to({}, { duration: originalText.length * 0.03 });

        // Add 0.2s delay before fade in
        timeline.to({}, { duration: 0.4 });

        // 5. Fade in sent text
        timeline.from(sentTextRef.current, {
            opacity: 0,
            duration: 0.5
        });

        return () => {
            if (typingInterval) clearInterval(typingInterval);
            timeline.kill();
        };
    }, [pathData]);

    return (
        <>
            <section className="fp-sec-contact-1 pt-20 md:pt-44">
                <div className="container mx-auto px-3">
                    <div className="inner max-w-[580px] mx-auto">
                        <div className="text-[19px] font-medium mb-4">Leave a message</div>
                        <div className="fp-message-window-wrap flex gap-x-3 items-end -ml-[63px] relative">
                            <div className="fp-chat-mask flex items-end">
                                <div ref={maskRef} className="fp-mask w-[52px] h-[52px] relative">
                                    <Image 
                                        src="/images/monty.png" 
                                        className="object-cover rounded-full" 
                                        fill={true} 
                                        alt="" 
                                    />
                                </div>
                                <div 
                                    ref={dotRef} 
                                    className="fp-dot w-[8px] h-[8px] bg-[#15B754] rounded-full"
                                ></div>
                            </div>
                            <div className="relative flex-1">
                                <svg
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        overflow: 'visible'
                                    }}
                                >
                                    {pathData && (
                                        <path
                                            ref={pathRef}
                                            d={pathData}
                                            fill="none"
                                            stroke="#707070"
                                            strokeWidth="1"
                                            opacity="0"
                                        />
                                    )}
                                </svg>
                                <div 
                                    ref={messageWindowRef}
                                    className="fp-message-window p-9 rounded-[18px] rounded-bl-none flex-1"
                                >
                                    <div 
                                        ref={textRef}
                                        className="fp-text text-[16px] font-medium leading-[21px] text-[#707070] min-h-[42px]"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            ref={sentTextRef}
                            className="fp-sent-text text-[13px] font-medium text-[#5A5A5A] mt-1 text-right mr-2"
                        >
                            sent just now
                        </div>
                        <ContactForm2 />
                    </div>
                </div>
            </section>

            <FaqSection />
        </>
    );
}