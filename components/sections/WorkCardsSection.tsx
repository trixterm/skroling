"use client";

import { ReactLenis } from "lenis/react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo, useRef } from "react";

type Project = Readonly<{
  src: string;
  link: string;
  alt: string;
}>;

const projects: readonly Project[] = [
  {
    src: "/images/website-01.jpg",
    link: "/website-1",
    alt: "Website project 1 preview",
  },
  {
    src: "/images/website-02.jpg",
    link: "/website-2",
    alt: "Website project 2 preview",
  },
  {
    src: "/images/website-03.jpg",
    link: "/website-3",
    alt: "Website project 3 preview",
  },
];

const sectionClassName = "mt-[100svh]";
const wrapperClassName =
  "min-h-[100svh] sticky top-[64px] md:top-[100px] flex items-center justify-center";
const cardClassName =
  "relative h-[60svh] md:h-[550px] w-[92vw] md:w-[1300px] rounded-[24px] overflow-hidden origin-top";
const linkClassName =
  "block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function WorkCardsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const cards = useMemo(() => {
    const count = projects.length;
    const segment = count > 0 ? 1 / count : 1;

    return projects.map((project, index) => {
      const targetScale = 1 - (count - index) * 0.05;
      const range: [number, number] = [index * segment, 1];
      return { project, index, targetScale, range };
    });
  }, []);

  const content = (
    <section
      ref={sectionRef}
      className={sectionClassName}
      aria-label="Project gallery"
    >
      {cards.map(({ project, index, range, targetScale }) => (
        <Card
          key={project.link}
          index={index}
          project={project}
          progress={scrollYProgress}
          range={range}
          targetScale={targetScale}
        />
      ))}
    </section>
  );

  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return <ReactLenis root>{content}</ReactLenis>;
  }

  return content;
}

type CardProps = Readonly<{
  index: number;
  project: Project;
  progress: MotionValue<number>;
  range: readonly [number, number];
  targetScale: number;
}>;

const Card = memo(function Card({
  index,
  project,
  progress,
  range,
  targetScale,
}: CardProps): JSX.Element {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className={wrapperClassName}>
      <motion.div style={{ scale }} className={cardClassName}>
        <Link
          href={project.link}
          className={linkClassName}
          aria-label={`Open: ${project.alt}`}
        >
          <Image
            fill
            src={project.src}
            alt={project.alt}
            className="object-cover"
            sizes="(max-width: 768px) 92vw, 1300px"
            priority={index === 0}
          />
        </Link>
      </motion.div>
    </div>
  );
});
