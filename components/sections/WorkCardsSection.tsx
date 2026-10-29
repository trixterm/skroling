"use client";


import { useScroll, useTransform, type MotionValue, motion } from "motion/react";
import { works } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef, type ReactElement } from "react";

type Project = Readonly<{
  src: string;
  link: string;
  alt: string;
}>;

const projects: readonly Project[] = works.map(w => ({src:w.heroImage,link:`/work/${w.slug}`,alt:w.title}));

const sectionClassName = "mt-[100svh] relative";
const wrapperClassName =
  "min-h-[100svh] sticky top-[40px] flex items-center justify-center";
const cardClassName =
  "relative h-[60svh] md:h-[550px] w-[92vw] md:w-[1300px] rounded-[24px] overflow-hidden origin-top bg-neutral-900";
const linkClassName =
  "fp-link-work-card block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const STICKY_BASE_TOP_PX = 0;
const CARD_OVERLAP_STEP_PX = 40;
const SCROLL_OFFSET = ["start start", "end end"] as const;

const projectCount = projects.length;
const scrollSegment = projectCount > 0 ? 1 / projectCount : 1;

const cardConfig = projects.map((project, index) => {
  const targetScale = 1 - (projectCount - index) * 0.05;
  const range: [number, number] = [index * scrollSegment, 1];
  const top = STICKY_BASE_TOP_PX + index * CARD_OVERLAP_STEP_PX;
  const isPriority = index === 0;
  return { project, targetScale, range, top, isPriority };
});

export default function WorkCardsSection(): ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: SCROLL_OFFSET as ["start start", "end end"],
  });

  const content = (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-label="Project gallery"
    >
      {cardConfig.map(({ project, range, targetScale, top, isPriority }) => (
        <Card
          key={project.link}
          project={project}
          progress={scrollYProgress}
          range={range}
          targetScale={targetScale}
          top={top}
          isPriority={isPriority}
        />
      ))}
    </section>
  );

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  if (isDesktop) {
    return content;
  }

  return content;
}

type CardProps = Readonly<{
  project: Project;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  top: number;
  isPriority: boolean;
}>;

const Card = memo(function Card({
  project,
  progress,
  range,
  targetScale,
  top,
  isPriority,
}: CardProps): ReactElement {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className={wrapperClassName}>
      <motion.div
        className={cardClassName}
        style={{
          scale,
          top,
        }}
      >
        <Link
          href={project.link}
          className={linkClassName}
          aria-label={`Open: ${project.alt}`}
        >
          <span className="absolute z-10 bottom-5 left-5 bg-black/80 text-white px-5 py-3 rounded-xl">{project.alt} ↗</span>
          <Image
            fill
            src={project.src}
            alt={project.alt}
            className="object-contain"
            sizes="(max-width: 768px) 92vw, 1300px"
            priority={isPriority}
          />
        </Link>
      </motion.div>
    </div>
  );
});