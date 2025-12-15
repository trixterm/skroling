"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import FaqSection from "@/components/sections/FaqSection";
import ContactForm2 from '@/components/ContactForm2';

let globalAudio: HTMLAudioElement | null = null;

export default function ContactPage() {
    // References
    const maskRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const messageWindowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const sentTextRef = useRef<HTMLDivElement>(null);
    const contactFormRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    
    // State
    const [pathData, setPathData] = useState('');

    // 1. Calculate SVG Path based on container dimensions
    useEffect(() => {
        if (!messageWindowRef.current) return;

        const el = messageWindowRef.current;

        const observer = new ResizeObserver(() => {
            const rect = el.getBoundingClientRect();

            const padding = 18;
            const r = 18;

            const w = rect.width;
            const h = rect.height;

            const path = `
                M ${r},0
                L ${w - r},0
                Q ${w},0 ${w},${r}
                L ${w},${h - r}
                Q ${w},${h} ${w - r},${h}
                L ${r},${h}
                Q 0,${h} 0,${h - r}
                L 0,${r}
                Q 0,0 ${r},0
                Z
            `;

            setPathData(path);
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);


    // 2. Main Animation Timeline
    useEffect(() => {
        if (!pathData) return;

        if (globalAudio) {
            globalAudio.pause();
            globalAudio.currentTime = 0;
            globalAudio = null;
        }

        const currentAudioInstance = new Audio('/pop-alert.mp3');
        currentAudioInstance.volume = 0.5;
        globalAudio = currentAudioInstance;

        // Context: Clear explicit values on cleanup
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
            
            // Text Configuration
            const part1 = "Hi, how are you?";
            const part2 = " Leave me a message and I will respond to you via email in a few days.";
            const fullText = part1 + part2;
            
            // We animate this proxy object. 'value' represents the character index.
            const textProgress = { value: 0 }; 
            const typeSpeed = 0.03; // Seconds per character

            // --- Sequence Start ---

            // 1. Avatar Pop-in
            timeline.from(maskRef.current, {
                scale: 0,
                duration: 0.5,
                transformOrigin: 'center center',
                ease: 'back.out(1.7)'
            });

            timeline.add(() => {
                if (globalAudio === currentAudioInstance) {
                    currentAudioInstance.currentTime = 0;
                    currentAudioInstance.play().catch(() => {});
                }
            }, "<0.1");

            // 2. Green Dot Pop-in
            timeline.from(dotRef.current, {
                scale: 0,
                duration: 0.3,
                transformOrigin: 'center center',
                ease: 'back.out(1.7)'
            }, '-=0.1');
            

            // 3. Draw the Border (SVG)
            // We use fromTo to ensure opacity handles correctly on re-runs
            if (pathRef.current) {
                const pathLength = pathRef.current.getTotalLength();
                timeline.fromTo(pathRef.current, 
                    { 
                        strokeDasharray: pathLength,
                        strokeDashoffset: pathLength,
                        opacity: 1 
                    },
                    {
                        strokeDashoffset: 0,
                        duration: 1.2,
                        ease: 'power1.inOut'
                    }
                );
            }

            // 4. Initial "Thinking" pause before typing starts
            timeline.to({}, { duration: 0.5 });

            // 5. Type Part 1: "Hi, how are you?"
            timeline.to(textProgress, {
                value: part1.length,
                duration: part1.length * typeSpeed,
                ease: "none", // Linear ease is crucial for typing
                onUpdate: () => {
                    if (textRef.current) {
                        // Rounding the value gives us an integer index for substring
                        textRef.current.textContent = fullText.substring(0, Math.round(textProgress.value));
                    }
                }
            });

            // 6. THE REQUIREMENT: Explicit 2 Second Pause
            timeline.to({}, { duration: 1.0 });

            // 7. Type Part 2: The rest of the message
            timeline.to(textProgress, {
                value: fullText.length,
                duration: part2.length * typeSpeed,
                ease: "none",
                onUpdate: () => {
                    if (textRef.current) {
                        textRef.current.textContent = fullText.substring(0, Math.round(textProgress.value));
                    }
                }
            });

            timeline.fromTo(sentTextRef.current, 
                { 
                    opacity: 0, 
                    y: 3 // Pradedame šiek tiek žemiau
                },
                { 
                    opacity: 1, 
                    y: 0, // Grįžtame į pradinę poziciją
                    duration: 1
                }, 
                "+=0.5"
            );

            // 9. Contact Form Slide Up (PATAISYMAS)
            timeline.fromTo(contactFormRef.current, 
                { 
                    opacity: 0, 
                    y: 10 // Pradedame žemiau
                },
                { 
                    opacity: 1, 
                    y: 0, // Grįžtame į viršų
                    duration: 1,
                    ease: "power2.out"
                }, 
                "-=0.1"
            );
        });

        // Cleanup: Revert context kills all animations and clears props
        return () => {            
            ctx.revert();
            if (globalAudio === currentAudioInstance) {
                currentAudioInstance.pause();
                currentAudioInstance.currentTime = 0;
                globalAudio = null;
            }
        };

    }, [pathData]);

    return (
        <>
            <section className="fp-sec-contact-1 pt-28 md:pt-44">
                <div className="container mx-auto px-3">

                    <div className="inner max-w-[580px] mx-auto">
                        {/* <div className="text-[19px] font-medium mb-4">Leave a message</div> */}
                        
                        {/* Avatar & Chat Bubble Wrapper */}
                        <div className="fp-message-window-wrap flex gap-x-3 items-end md:-ml-[63px] relative">
                            
                            {/* Avatar Section */}
                            <div className="fp-chat-mask flex items-end">
                                <div ref={maskRef} className="fp-mask w-[52px] h-[52px] relative">
                                    <Image 
                                        src="/images/monty.png" 
                                        className="object-cover rounded-full" 
                                        fill={true} 
                                        alt="User Avatar" 
                                    />
                                </div>
                                <div 
                                    ref={dotRef} 
                                    className="fp-dot w-[8px] h-[8px] bg-[#15B754] rounded-full shadow-[0_0_0_2px_white]"
                                ></div>
                            </div>

                            {/* Chat Bubble & SVG Border */}
                            <div className="relative flex-1">
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    viewBox={`0 0 ${messageWindowRef.current?.offsetWidth || 0} ${messageWindowRef.current?.offsetHeight || 0}`}
                                    preserveAspectRatio="none"
                                >
                                    {pathData && (
                                        <path
                                            ref={pathRef}
                                            d={pathData}
                                            fill="none"
                                            stroke="#707070"
                                            strokeWidth="1"
                                            opacity="0" // Handled by GSAP
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
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Timestamp */}
                        <div 
                            ref={sentTextRef}
                            className="fp-sent-text text-[13px] font-medium text-[#5A5A5A] mt-1 text-right mr-2 opacity-0"
                        >
                            sent just now
                        </div>

                        {/* Form Area */}
                        <div ref={contactFormRef} className="opacity-0">
                            <ContactForm2 />
                        </div>
                    </div>
                </div>
            </section>

            <FaqSection />
        </>
    );
}