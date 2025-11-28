'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- Types & Data ---

interface ProjectData {
  id: string;
  title: string;
  tags: string[];
  videoSources: {
    desktop: string;
    mobile: string;
  };
  poster: string;
  theme: 'dark' | 'light'; // For text color logic in the HTML
}

const PROJECTS: ProjectData[] = [
  {
    id: 'planasb',
    title: 'Architectural Studio',
    tags: ['Web design', 'Development', '3D', 'CMS integration'],
    videoSources: {
      desktop: '/videos/planasb-promo.webm',
      mobile: '/videos-mobile/planasb-promo-mobile.mp4',
    },
    poster: '/images-mobile/planasb-promo-mobile.webp',
    theme: 'light',
  },
  {
    id: 'vr-interior',
    title: 'VR Interior Tour',
    tags: ['3D', 'Design', 'Development'],
    videoSources: {
      desktop: '/videos/vr-interior-promo.webm',
      mobile: '/videos-mobile/vr-interior-promo-mobile.mp4',
    },
    poster: '/images-mobile/vr-interior-promo-mobile.webp',
    theme: 'light',
  },
  {
    id: 'gimme-flights',
    title: 'Gimme Flights',
    tags: ['Web design', 'Development', 'Visual identity'],
    videoSources: {
      desktop: '/videos/gimme-flights-promo.webm',
      mobile: '/videos-mobile/gimme-flights-promo-mobile.mp4',
    },
    poster: '/images-mobile/gimme-flights-promo-mobile.webp',
    theme: 'light',
  },
];

// --- Component ---

export default function WorkCardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter((el): el is HTMLElement => el !== null);
      const totalCards = cards.length;

      cards.forEach((card, index) => {
        const isLast = index === totalCards - 1;
        const innerCard = card.querySelector('.card-inner');

        // Create the stacking effect
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=60', // Offset slightly for navbar breathing room
          end: () => `+=${card.offsetHeight}`, 
          pin: true,
          pinSpacing: false, // Critical: allows the next card to overlap this one
          id: `card-${index}`,
          invalidateOnRefresh: true,
        });

        // Animation: Scale down the card slightly as it gets covered
        // This adds the "Depth" effect utilizing the CSS perspective
        if (!isLast && innerCard) {
          gsap.to(innerCard, {
            scale: 0.95,
            opacity: 0.8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top top+=60',
              end: () => `+=${card.offsetHeight}`,
              scrub: true,
            },
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="work-component-vt"
      className="flex flex-col items-center space-y-0 py-4 lg:pb-24 w-full relative"
    >
      {PROJECTS.map((project, index) => (
        <article
          key={project.id}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="w-full lg:w-auto min-h-screen flex items-center justify-center sticky-card-container"
        >
          <Link href="#" className="group block w-full" data-tooltip="Open">
            {/* The Wrapper with Perspective */}
            <div className="card-wrapper mx-auto w-full perspective-[500px] lg:w-[70vw] xl:w-[63vw]">
              {/* The Inner Card - Target for Scaling Animation */}
              <div className="card card-inner lg:bg-main-bg h-auto overflow-hidden rounded-none will-change-transform lg:rounded-2xl fade-bg transition-shadow duration-300 lg:shadow-[0_2px_43px_rgba(30,30,30,0.1),0_-30px_100px_rgba(30,30,30,0.6)] bg-white">
                
                {/* Desktop Header */}
                <div className="hidden lg:block">
                  <div className="flex items-end justify-between pt-6 lg:px-6 lg:pt-8">
                    <div className="text-dark-text lg:text-light-text flex flex-col lg:w-full lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center lg:items-center">
                        <h3 className="ml-2 truncate text-2xl font-medium lg:ml-0 lg:max-w-[40vw] lg:text-3xl lg:transition-transform lg:duration-300 lg:ease-in-out lg:will-change-transform lg:group-hover:translate-x-9 text-slate-900">
                          {project.title}
                        </h3>
                      </div>
                      <div className="mt-2 flex gap-x-3 overflow-x-auto lg:mt-0">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="fade-text text-slate-900 lg:text-light-text text-xs whitespace-nowrap will-change-transform lg:text-base border border-slate-200 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <span className="absolute top-6 left-4 hidden h-8 w-8 overflow-hidden lg:top-8 lg:left-6 lg:block">
                      <span className="absolute bottom-0 left-0 -translate-x-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 text-slate-900">
                        <svg viewBox="0 0 24 24" role="img" width="24" height="24" fill="none" className="h-7 w-7">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>

                {/* Video Section */}
                <div className="overflow-hidden pt-3 lg:px-6 lg:pt-4 lg:pb-6">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-xl lg:rounded-md bg-gray-100">
                    <video
                      poster={project.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      className="h-full w-full scale-[1.02] object-cover"
                    >
                      <source src={project.videoSources.desktop} type="video/webm" media="(min-width: 1024px)" />
                      <source src={project.videoSources.mobile} type="video/mp4" media="(max-width: 1023px)" />
                    </video>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="mt-4 pb-6 lg:hidden px-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="fade-text text-dark-text text-xs whitespace-nowrap sm:text-base md:text-lg text-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-4 flex items-center">
                    <span className="flex items-center overflow-hidden">
                      <span className="t text-dark-text transform text-slate-900">
                        <svg viewBox="0 0 24 24" role="img" width="24" height="24" fill="none" className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </span>
                    <h3 className="text-dark-text ml-4 transform text-2xl font-normal sm:text-3xl md:text-4xl text-slate-900">
                      {project.title}
                    </h3>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}