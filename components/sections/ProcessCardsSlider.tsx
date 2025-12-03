"use client";

import React, {
    useMemo,
    useState,
    useCallback,
    useEffect,
} from "react";
import dynamic from "next/dynamic";
import { motion, useAnimationControls } from "framer-motion";

const SliderNav = dynamic(() => import("@/components/SliderNav"), {
    ssr: false,
});

const ITEM_WIDTH = 300;
const GAP = 15;
const FULL_ITEM_WIDTH = ITEM_WIDTH + GAP;

/* ---------------------- Types ---------------------- */

type CardData = {
    number: string;
    duration: string;
    title: string;
    description: string;
};

type ProcessedCard = CardData & {
    mainText: string;
    lastSentence: string;
};

/* ---------------- Utilities ---------------- */

const splitLastSentence = (text: string): { main: string; last: string } => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length === 0) return { main: text, last: "" };
    const last = sentences[sentences.length - 1];
    const main = text.slice(0, -last.length);
    return { main, last };
};

/* ---------------- Card Component ---------------- */

const ProcessCard = React.memo(
    ({
        card,
        isActive,
        rotation,
    }: {
        card: ProcessedCard;
        isActive: boolean;
        rotation: number;
    }) => (
        <motion.li
            className="relative flex-shrink-0 w-[300px] h-[380px] bg-[#1a1a1a] rounded-2xl p-6 pr-4 flex flex-col justify-between"
            animate={{
                opacity: isActive ? 1 : 0.5,
                rotate: rotation,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
            }}
        >
            <div>
                <div className="duration-wrap flex mb-6">
                    <div className="flex self-start border border-white px-6 py-1.5 rounded-[20px]">
                        <span className="text-[10px] font-medium text-[#F0F0F0]">
                            {card.duration}
                        </span>
                    </div>
                    <div
                        className={`inline-block -mt-[14px] ml-auto text-[94px] font-medium leading-none ${
                            isActive ? "text-white" : "text-[#F0F0F0]"
                        }`}
                    >
                        {card.number}
                    </div>
                </div>
                <p className="text-[13px] text-[#F0F0F0] leading-[18px]">
                    {card.mainText}
                    {card.lastSentence && (
                        <span className="text-[#C4C4C4]">{card.lastSentence}</span>
                    )}
                </p>
            </div>

            <h3 className="text-[40px] font-medium text-[#F0F0F0] leading-none">
                {card.title}
            </h3>
        </motion.li>
    )
);

ProcessCard.displayName = "ProcessCard";

/* ---------------- Main Component ---------------- */

export default function ProcessCardsSlider() {
    const rawCards: CardData[] = useMemo(
        () => [
            { number: "01", duration: "1-2 weeks", title: "Discovery", description: "The new website has completely transformed..." },
            { number: "02", duration: "2-3 weeks", title: "Research", description: "We analyzed user behavior extensively..." },
            { number: "03", duration: "3-4 weeks", title: "Wireframe", description: "We created a full structural blueprint..." },
            { number: "04", duration: "4-5 weeks", title: "Build", description: "The development process was executed..." },
            { number: "05", duration: "1-2 weeks", title: "Animation", description: "Micro-interactions were designed..." },
            { number: "06", duration: "2-3 weeks", title: "Testing", description: "Every feature underwent rigorous QA..." },
        ],
        []
    );

    const processed = useMemo<ProcessedCard[]>(
        () =>
            rawCards.map((c) => {
                const { main, last } = splitLastSentence(c.description);
                return { ...c, mainText: main, lastSentence: last };
            }),
        [rawCards]
    );

    const originalCount = processed.length;

    // Triple list for infinite loop
    const looped = useMemo(
        () => [...processed, ...processed, ...processed],
        [processed]
    );

    /* ---------------- Slider State ---------------- */

    const [offset, setOffset] = useState(0);
    const [rotation, setRotation] = useState(0);

    const trackControls = useAnimationControls();

    /* Active index */
    const activeIndex =
        ((Math.round(-offset / FULL_ITEM_WIDTH) % originalCount) + originalCount) %
        originalCount;

    /* ---------------- Rotation Elasticity ---------------- */

    const computeRotation = useCallback((dragX: number) => {
        const limit = 4;         // MAX 4°
        const elasticity = 0.10;  // Drag sensitivity

        let angle = dragX * elasticity;
        return Math.max(Math.min(angle, limit), -limit);
    }, []);

    /* DRAG active rotation */
    const handleDrag = useCallback(
        (_, info) => {
            const deltaX = info.offset.x;
            setRotation(computeRotation(deltaX));
        },
        [computeRotation]
    );

    /* ---------------- Move Function ---------------- */

    const animateNavRotation = useCallback((direction: "next" | "prev") => {
        setRotation(direction === "next" ? -4 : 4);

        setTimeout(() => {
            setRotation(0);
        }, 200);
    }, []);

    const moveTo = useCallback(
        async (newOffset: number) => {
            setOffset(newOffset);

            await trackControls.start({
                x: newOffset,
                transition: { type: "spring", stiffness: 150, damping: 20 },
            });

            const totalWidth = FULL_ITEM_WIDTH * originalCount;

            if (newOffset <= -totalWidth * 2) {
                const corrected = newOffset + totalWidth;
                setOffset(corrected);
                trackControls.set({ x: corrected });
            }

            if (newOffset >= -totalWidth) {
                const corrected = newOffset - totalWidth;
                setOffset(corrected);
                trackControls.set({ x: corrected });
            }
        },
        [trackControls, originalCount]
    );

    /* ---------------- Navigation ---------------- */

    const goNext = useCallback(() => {
        animateNavRotation("next");
        moveTo(offset - FULL_ITEM_WIDTH);
    }, [offset, moveTo, animateNavRotation]);

    const goPrev = useCallback(() => {
        animateNavRotation("prev");
        moveTo(offset + FULL_ITEM_WIDTH);
    }, [offset, moveTo, animateNavRotation]);

    /* ---------------- Drag End ---------------- */

    const handleDragEnd = useCallback(
        (_: any, info: { offset: { x: number } }) => {
            const delta = info.offset.x;

            setRotation(0); // bounce back

            if (delta < -40) goNext();
            else if (delta > 40) goPrev();
            else moveTo(offset);
        },
        [goNext, goPrev, moveTo, offset]
    );

    /* ---------------- Initial ---------------- */

    useEffect(() => {
        const startOffset = -(originalCount * FULL_ITEM_WIDTH);
        setOffset(startOffset);
        trackControls.set({ x: startOffset });
    }, [originalCount, trackControls]);

    /* ---------------- Render ---------------- */

    return (
        <section className="py-44">
            <div className="container">
                <header className="flex items-center mb-6">
                    <h2 className="text-[16px] font-semibold">
                        Your product going to live process
                    </h2>

                    <div className="ml-auto">
                        <SliderNav onPrev={goPrev} onNext={goNext} />
                    </div>
                </header>
            </div>

            <div className="w-full max-w-[1360px] ml-[80px]">
                <motion.ul
                    drag="x"
                    dragElastic={0.15}
                    dragMomentum={true}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={trackControls}
                    style={{ x: offset, overflow: "visible" }}
                    className="flex gap-[15px] select-none"
                >
                    {looped.map((card, i) => (
                        <ProcessCard
                            key={`${card.number}-${i}`}
                            card={card}
                            isActive={i % originalCount === activeIndex}
                            rotation={rotation}
                        />
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
