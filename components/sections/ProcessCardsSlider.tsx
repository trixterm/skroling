"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimationControls, type PanInfo } from "framer-motion";

const SliderNav = dynamic(() => import("@/components/SliderNav"), {
  ssr: false,
});

const ITEM_WIDTH = 300;
const GAP = 15;
const FULL_ITEM_WIDTH = ITEM_WIDTH + GAP;

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

const splitLastSentence = (text: string): { main: string; last: string } => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length === 0) return { main: text, last: "" };
  const last = sentences[sentences.length - 1];
  const main = text.slice(0, -last.length);
  return { main, last };
};

const RAW_CARDS: CardData[] = [
  {
    number: "01",
    duration: "1-2 weeks",
    title: "Discovery",
    description: "The new website has completely transformed...",
  },
  {
    number: "02",
    duration: "2-3 weeks",
    title: "Research",
    description: "We analyzed user behavior extensively...",
  },
  {
    number: "03",
    duration: "3-4 weeks",
    title: "Wireframe",
    description: "We created a full structural blueprint...",
  },
  {
    number: "04",
    duration: "4-5 weeks",
    title: "Build",
    description: "The development process was executed...",
  },
  {
    number: "05",
    duration: "1-2 weeks",
    title: "Animation",
    description: "Micro-interactions were designed...",
  },
  {
    number: "06",
    duration: "2-3 weeks",
    title: "Testing",
    description: "Every feature underwent rigorous QA...",
  },
];

const PROCESSED_CARDS: ProcessedCard[] = RAW_CARDS.map((c) => {
  const { main, last } = splitLastSentence(c.description);
  return { ...c, mainText: main, lastSentence: last };
});

const ORIGINAL_COUNT = PROCESSED_CARDS.length;
const LOOPED_CARDS: ProcessedCard[] = [
  ...PROCESSED_CARDS,
  ...PROCESSED_CARDS,
  ...PROCESSED_CARDS,
];

const START_OFFSET = -(ORIGINAL_COUNT * FULL_ITEM_WIDTH);
const TOTAL_WIDTH = FULL_ITEM_WIDTH * ORIGINAL_COUNT;

type ProcessCardProps = {
  card: ProcessedCard;
  isActive: boolean;
  rotation: number;
};

const ProcessCard = React.memo(function ProcessCard({
  card,
  isActive,
  rotation,
}: ProcessCardProps) {
  return (
    <motion.li
      className="relative flex-shrink-0 w-[300px] h-[380px] bg-[#1a1a1a] rounded-2xl p-6 pr-4 flex flex-col justify-between"
      animate={{ opacity: isActive ? 1 : 0.5, rotate: rotation }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
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
  );
});

ProcessCard.displayName = "ProcessCard";

export default function ProcessCardsSlider() {
  const trackControls = useAnimationControls();

  const [offset, setOffset] = useState(START_OFFSET);
  const offsetRef = useRef(offset);
  offsetRef.current = offset;

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const snapIndexFromStart = Math.round(
    (START_OFFSET - offset) / FULL_ITEM_WIDTH
  );
  const hideLeftGutter = !isDragging && snapIndexFromStart === 0;

  const activeIndex =
    ((Math.round(-offset / FULL_ITEM_WIDTH) % ORIGINAL_COUNT) +
      ORIGINAL_COUNT) %
    ORIGINAL_COUNT;

  const computeRotation = useCallback((dragX: number) => {
    const limit = 4;
    const elasticity = 0.1;
    const angle = dragX * elasticity;
    return Math.max(Math.min(angle, limit), -limit);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setRotation(computeRotation(info.offset.x));
    },
    [computeRotation]
  );

  const animateNavRotation = useCallback((direction: "next" | "prev") => {
    setRotation(direction === "next" ? -4 : 4);
    setTimeout(() => setRotation(0), 200);
  }, []);

  const setOffsetSynced = useCallback((nextOffset: number) => {
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  }, []);

  const moveTo = useCallback(
    async (newOffset: number) => {
      setOffsetSynced(newOffset);

      await trackControls.start({
        x: newOffset,
        transition: { type: "spring", stiffness: 150, damping: 20 },
      });

      if (newOffset <= -TOTAL_WIDTH * 2) {
        const corrected = newOffset + TOTAL_WIDTH;
        setOffsetSynced(corrected);
        trackControls.set({ x: corrected });
      }

      if (newOffset >= -TOTAL_WIDTH) {
        const corrected = newOffset - TOTAL_WIDTH;
        setOffsetSynced(corrected);
        trackControls.set({ x: corrected });
      }
    },
    [trackControls, setOffsetSynced]
  );

  const goNext = useCallback(() => {
    animateNavRotation("next");
    moveTo(offsetRef.current - FULL_ITEM_WIDTH);
  }, [moveTo, animateNavRotation]);

  const goPrev = useCallback(() => {
    animateNavRotation("prev");
    moveTo(offsetRef.current + FULL_ITEM_WIDTH);
  }, [moveTo, animateNavRotation]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const delta = info.offset.x;

      setRotation(0);
      setIsDragging(false);

      if (delta < -40) goNext();
      else if (delta > 40) goPrev();
      else moveTo(offsetRef.current);
    },
    [goNext, goPrev, moveTo]
  );

  useLayoutEffect(() => {
    trackControls.set({ x: START_OFFSET });
  }, [trackControls]);

  return (
    <section className="fp-sec-onboarding mt-8 mb-32 overflow-hidden">
      <div className="container">
        <header className="flex items-center mb-6">
          <div className="fp-heading fp-extra-font text-[34px] font-medium">
            Onboarding
          </div>
          <div className="ml-auto max-md:hidden">
            <SliderNav onPrev={goPrev} onNext={goNext} />
          </div>
        </header>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          clipPath: hideLeftGutter
            ? "inset(0 0 0 var(--gutter))"
            : "inset(0 0 0 0)",
          transition: isDragging ? "none" : "clip-path 220ms ease",
        }}
      >
        <div style={{ paddingLeft: "var(--gutter)" }}>
          <motion.ul
            drag="x"
            dragElastic={0.15}
            dragMomentum
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={trackControls}
            style={{ x: offset }}
            className="flex gap-[15px] select-none"
          >
            {LOOPED_CARDS.map((card, i) => (
              <ProcessCard
                key={`${card.number}-${i}`}
                card={card}
                isActive={i % ORIGINAL_COUNT === activeIndex}
                rotation={rotation}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}