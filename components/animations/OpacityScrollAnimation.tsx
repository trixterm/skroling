'use client';
import { useEffect, useRef } from 'react';

interface OpacityScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export default function OpacityScrollAnimation({
  children,
  className = '',
  start = 'top bottom-=30%',
  end = 'top center',
  scrub = true,
  markers = false
}: OpacityScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splits: Array<{ revert: () => void }> = [];

    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText');
      
      gsap.registerPlugin(ScrollTrigger, SplitText);

      if (elementRef.current) {
        // Find .fp-anim-title-1 in parent container
        const parent = elementRef.current.parentElement;
        const animTitle = parent?.querySelector('.fp-anim-title-1');
        const partHiddenElements = parent
          ? Array.from(parent.querySelectorAll<HTMLElement>('.fp-text .part-hidden'))
          : [];
        
        // Main opacity animation
        const elementsToAnimate = animTitle 
          ? [elementRef.current, animTitle]
          : [elementRef.current];

        elementsToAnimate.forEach((element) => {
          if (!element) return;
          const split = new SplitText(element, { type: 'chars' });
          splits.push(split);

          gsap.fromTo(
            split.chars,
            {
              opacity: 0.2
            },
            {
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: element,
                start: start,
                end: end,
                scrub: scrub,
                markers: markers
              }
            }
          );
        });

        if (partHiddenElements.length) {
          gsap.to(partHiddenElements, {
            opacity: 0,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              end: end,
              scrub: scrub,
              markers: markers
            }
          });
        }

        // Additional animation for .fp-anim-title-1
        if (animTitle) {
          gsap.to(animTitle, {
            opacity: 1,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              end: end,
              scrub: scrub,
              markers: markers
            }
          });

          const element = animTitle as HTMLElement;
          const rect = element.getBoundingClientRect();
          const viewportCenter = window.innerWidth / 2;
          const elementCenter = rect.left + rect.width / 2;
          const distanceToCenter = viewportCenter - elementCenter;
          
          gsap.to(
            animTitle,
            {
              x: distanceToCenter,
              y: 300,
              scale: 3.5,
              scrollTrigger: {
                trigger: animTitle,
                start: 'top center',
                end: 'bottom top',
                scrub: true,
                markers: markers
              }
            }
          );

          // Fade out main element when .fp-anim-title-1 animation starts
          gsap.to(
            elementRef.current,
            {
              opacity: 0,
              scrollTrigger: {
                trigger: animTitle,
                start: 'top center',
                end: 'top top',
                scrub: true,
                markers: markers
              }
            }
          );
        }
      }
    };

    loadGSAP();

    return () => {
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      splits.forEach((split) => split.revert());
    };
  }, [start, end, scrub, markers]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
