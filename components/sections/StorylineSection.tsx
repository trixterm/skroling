"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./StorylineSection.module.css";
import SliderNav from "@/components/SliderNav";

type Size = {
    width: number;
    height: number;
};

export default function StorylineSection() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    // Preview box width/height (šitie animuojami)
    const [previewSize, setPreviewSize] = useState<Size>({
        width: 200,
        height: 265, // pradinis default, bet po pirmo efekto persiskaičiuos pagal data-w/h
    });

    // maksimalus box’as, į kurį telpa image (layout kontrolė)
    const MAX_WIDTH = 260;
    const MAX_HEIGHT = 320;

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const activeIndexRef = useRef<number>(0);

    // Pagal natūralią (ar nurodytą) dimensiją paskaičiuojam preview box’ą
    const computeBoxSize = (naturalWidth: number, naturalHeight: number): Size => {
        if (!naturalWidth || !naturalHeight) {
            return previewSize;
        }

        const aspect = naturalWidth / naturalHeight;

        // pirmiausia bandom pagal MAX_WIDTH
        let width = MAX_WIDTH;
        let height = width / aspect;

        // jei per aukštas – skalinam pagal MAX_HEIGHT
        if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT;
            width = height * aspect;
        }

        return { width, height };
    };

    // Scroll listener – randam artimiausią item pagal offsetLeft
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const items = Array.from(
                container.querySelectorAll<HTMLElement>(
                    `.${styles["fp-swiper-storyline"]} .${styles.item}`
                )
            );

            if (!items.length) return;

            const scrollLeft = container.scrollLeft;

            let closestIndex = 0;
            let closestDistance = Infinity;

            items.forEach((item, index) => {
                const distance = Math.abs(item.offsetLeft - scrollLeft);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            if (closestIndex !== activeIndexRef.current) {
                activeIndexRef.current = closestIndex;
                setActiveIndex(closestIndex);
            }
        };

        activeIndexRef.current = 0;
        setActiveIndex(0);

        container.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Inicijuojam pirmą image ir dydį pagal pirmą slide (kad nebūtų šuolio start’e)
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const items = Array.from(
            container.querySelectorAll<HTMLElement>(
                `.${styles["fp-swiper-storyline"]} .${styles.item}`
            )
        );
        if (!items.length) return;

        const firstItem = items[0];
        const mask = firstItem.querySelector<HTMLElement>(
            `.${styles["fp-mask"]}`
        );
        if (!mask) return;

        const imageSrc =
            mask.dataset.image || mask.getAttribute("data-image") || null;

        const w = Number(mask.dataset.w || mask.getAttribute("data-w"));
        const h = Number(mask.dataset.h || mask.getAttribute("data-h"));

        if (imageSrc) setActiveImage(imageSrc);
        if (w && h) {
            const box = computeBoxSize(w, h);
            setPreviewSize(box);
        }
    }, []);

    // Kai keičiasi activeIndex – iškart atnaujinam ir image, ir box size pagal data-w / data-h
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const items = Array.from(
            container.querySelectorAll<HTMLElement>(
                `.${styles["fp-swiper-storyline"]} .${styles.item}`
            )
        );

        const activeItem = items[activeIndex];
        if (!activeItem) return;

        const mask = activeItem.querySelector<HTMLElement>(
            `.${styles["fp-mask"]}`
        );
        if (!mask) return;

        const imageSrc =
            mask.dataset.image || mask.getAttribute("data-image") || null;

        const w = Number(mask.dataset.w || mask.getAttribute("data-w"));
        const h = Number(mask.dataset.h || mask.getAttribute("data-h"));

        if (imageSrc) {
            setActiveImage((prev) => (prev === imageSrc ? prev : imageSrc));
        }

        if (w && h) {
            const nextBox = computeBoxSize(w, h);

            // kad nere-renderint, jei skirtumas minimalus
            setPreviewSize((prev) => {
                const diffW = Math.abs(prev.width - nextBox.width);
                const diffH = Math.abs(prev.height - nextBox.height);
                if (diffW < 0.5 && diffH < 0.5) return prev;
                return nextBox;
            });
        }
    }, [activeIndex]);

    const handleArrow = (direction: "prev" | "next") => {
        const container = scrollRef.current;
        if (!container) return;

        const items = Array.from(
            container.querySelectorAll<HTMLElement>(
                `.${styles["fp-swiper-storyline"]} .${styles.item}`
            )
        );

        if (!items.length) return;

        let newIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;

        if (newIndex < 0) newIndex = 0;
        if (newIndex > items.length - 1) newIndex = items.length - 1;

        const target = items[newIndex];
        if (!target) return;

        container.scrollTo({
            left: target.offsetLeft,
            behavior: "smooth",
        });

        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
    };

    return (
        <section className="fp-sec-storyline py-44 relative z-2">
            <div className="inner relative">
                <header className="absolute w-[90%] mx-auto top-[237px] left-0 right-0 pb-4 flex items-end z-2">
                    <div className="text-[16px] font-semibold leading-none">
                        My Storyline
                    </div>

                    <div className="border-1 absolute top-[50px] left-0 w-[100%] h-[1px]"></div>

                    {/* DYNAMIC PREVIEW – width ir height smooth animacija */}
                    <div
                        className="fp-slide-img-place absolute t-[50px] left-[650px] overflow-hidden"
                        style={{
                            width: previewSize.width,
                            height: previewSize.height,
                            transition:
                                "width 260ms cubic-bezier(0.22, 0.61, 0.36, 1), height 260ms cubic-bezier(0.22, 0.61, 0.36, 1)",
                        }}
                    >
                        {activeImage && (
                            <div className="w-full h-full relative">
                                <Image
                                    src={activeImage}
                                    alt=""
                                    fill
                                    sizes={`${MAX_WIDTH}px`}
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <SliderNav
                        className="fp-nav-swiper-work ml-auto dark:border-[#ffffff]"
                        onPrev={() => handleArrow("prev")}
                        onNext={() => handleArrow("next")}
                    />

                    <div className="absolute bottom-0 left-0 w-full text-[#707070]"></div>
                </header>

                <div
                    className={`${styles["fp-scroll-gallery"]} max-w-1/2 ml-auto`}
                >
                    <div ref={scrollRef} className={styles["fp-scroll-container"]}>
                        <div
                            className={`${styles["fp-swiper-storyline"]} flex gap-x-10`}
                        >
                            {/* Slide 0 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 0 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-1.jpg"
                                    data-w="800"
                                    data-h="1200"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>

                            {/* Slide 1 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 1 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-2.jpg"
                                    data-w="1600"
                                    data-h="900"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>

                            {/* Slide 2 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 2 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-1.jpg"
                                    data-w="1200"
                                    data-h="1200"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>

                            {/* Slide 3 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 3 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-2.jpg"
                                    data-w="900"
                                    data-h="1400"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>

                            {/* Slide 4 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 4 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-1.jpg"
                                    data-w="1600"
                                    data-h="1000"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>

                            {/* Slide 5 */}
                            <div
                                className={`${styles.item} ${
                                    activeIndex === 5 ? styles["is-active"] : ""
                                }`}
                            >
                                <div
                                    className={`${styles["fp-mask"]} w-[200px] h-[265px] relative`}
                                    data-image="/images/website-2.jpg"
                                    data-w="1000"
                                    data-h="1000"
                                />
                                <div className="fp-content w-[245px] text-[12px] font-medium pt-12">
                                    Worked at flip180 media lead of the dev team. Worked at
                                    flip180 media lead of the dev team. Worked at flip180 media
                                    lead of the dev team. Worked at flip180 media lead of the dev
                                    team.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}