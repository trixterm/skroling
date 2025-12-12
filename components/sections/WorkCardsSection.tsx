"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";

type Project = Readonly<{
  src: string;
  link: string;
  alt: string;
}>;

const projects: readonly Project[] = [
  { src: "/images/website-01.jpg", link: "/website-1", alt: "Website project 1 preview" },
  { src: "/images/website-02.jpg", link: "/website-2", alt: "Website project 2 preview" },
  { src: "/images/website-03.jpg", link: "/website-3", alt: "Website project 3 preview" },
];

export default function WorkCardsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const segment = useMemo(
    () => (projects.length > 0 ? 1 / projects.length : 1),
    []
  );

  return (
    <ReactLenis root>
      <section
        ref={sectionRef}
        className="fp-sec-work-cards mt-[100vh]"
        aria-label="Project gallery"
      >
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          const range: [number, number] = [i * segment, 1];

          return (
            <Card
              key={project.link}
              index={i}
              project={project}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </ReactLenis>
  );
}

type CardProps = Readonly<{
  index: number;
  project: Project;
  progress: MotionValue<number>;
  range: readonly [number, number];
  targetScale: number;
}>;

function Card({ index, project, progress, range, targetScale }: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-[100px]">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[550px] max-w-[1300px] rounded-[24px] origin-top"
      >
        <div className="flex h-full">
          <div className="relative w-[92%] md:w-[1300px] h-full rounded-[24px] overflow-hidden">
            <Link
              href={project.link}
              className="fp-link-work-card block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label={`Open: ${project.alt}`}
            >
              <Image
                fill
                src={project.src}
                alt={project.alt}
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 1300px"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}