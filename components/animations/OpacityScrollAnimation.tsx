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
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      if (elementRef.current) {
        // Find .fp-anim-title-1 in parent container
        const parent = elementRef.current.parentElement;
        const animTitle = parent?.querySelector('.fp-anim-title-1');
        
        // Main opacity animation
        const elementsToAnimate = animTitle 
          ? [elementRef.current, animTitle]
          : elementRef.current;

        gsap.fromTo(
          elementsToAnimate,
          {
            opacity: 0.5
          },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: elementRef.current,
              start: start,
              end: end,
              scrub: scrub,
              markers: markers
            }
          }
        );

        // Additional animation for .fp-anim-title-1
        if (animTitle) {
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
              scale: 3,
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
    };
  }, [start, end, scrub, markers]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}