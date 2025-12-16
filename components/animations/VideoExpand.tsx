"use client";

import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoExpandProps {
  children: ReactElement;
}

const VideoExpand: React.FC<VideoExpandProps> = ({ children }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const videoEl = section.querySelector<HTMLElement>(".fp-video-block-1");
      const headingEl = section.querySelector<HTMLElement>(".fp-heading-wrap");
      const letterEls = section.querySelectorAll<SVGElement>(
        ".fp-k-letter, .fp-v-letter, .fp-n-letter"
      );

      if (!videoEl || !headingEl) return;

      // Force SVG letters to have their own stacking context with higher z-index
      if (letterEls.length) {
        letterEls.forEach((letterEl) => {
          gsap.set(letterEl, {
            transform: "translate3d(0, 0, 0)",
            zIndex: 50,
            willChange: "transform",
            force3D: true,
          });
        });
      }

      // Set video z-index lower than K letter
      gsap.set(videoEl, {
        zIndex: 3,
      });

      // Create a temporary dummy ScrollTrigger to calculate end position
      const calculateSectionHeight = () => {
        gsap.set(videoEl, { y: 0 });

        const sectionStyles = window.getComputedStyle(section);
        const paddingBottom = parseFloat(sectionStyles.paddingBottom);

        // Create dummy to find where animation ends
        const tempST = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          endTrigger: headingEl,
          end: "bottom-=100 top",
        });
        
        const endScrollPos = tempST.end;
        tempST.kill();

        const videoRect = videoEl.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const currentScrollY = window.scrollY || window.pageYOffset;

        // Where will section top be when we reach end scroll position?
        const sectionTopAtEnd = sectionRect.top + currentScrollY - endScrollPos;

        // Calculate final video dimensions
        const videoAspectRatio = videoRect.height / videoRect.width;
        const finalWidth = window.innerWidth * 0.96;
        const finalHeight = finalWidth * videoAspectRatio;

        // Video centered in viewport
        const videoCenterTop = (window.innerHeight - finalHeight) / 2;
        const videoBottomInViewport = videoCenterTop + finalHeight;

        // Convert viewport position to document position at end
        const videoBottomInDocument = videoBottomInViewport + endScrollPos;

        // Section top position in document at end
        const sectionTopInDocument = sectionRect.top + currentScrollY;

        // Section height = video bottom position - section top position + paddingBottom
        const sectionHeight = videoBottomInDocument - sectionTopInDocument + paddingBottom;

        section.style.height = `${sectionHeight}px`;
      };

      // Set initial height
      calculateSectionHeight();

      // Create a dummy ScrollTrigger to get end scroll position for animation
      const dummyST = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        endTrigger: headingEl,
        end: "bottom-=100 top",
      });

      const endScrollPosition = dummyST.end;
      dummyST.kill();

      // Calculate final Y position to center video vertically in viewport
      const calculateVideoEndY = () => {
        gsap.set(videoEl, { y: 0, zIndex: 3 });
        
        const videoRect = videoEl.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        const currentScrollY = window.scrollY || window.pageYOffset;
        const sectionTopWhenAtEnd = sectionRect.top + currentScrollY - endScrollPosition;

        const videoAspectRatio = videoRect.height / videoRect.width;
        const finalWidth = window.innerWidth * 0.96;
        const finalHeight = finalWidth * videoAspectRatio;

        const videoTopRelativeToSection = videoRect.top - sectionRect.top;
        
        const targetVideoTopInViewport = (window.innerHeight - finalHeight) / 2;
        
        const targetVideoTopRelativeToSection = targetVideoTopInViewport - sectionTopWhenAtEnd;
        
        return targetVideoTopRelativeToSection - videoTopRelativeToSection;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          endTrigger: headingEl,
          end: "bottom-=100 top",
          scrub: 0.6,
          pin: false,
          invalidateOnRefresh: true,
          onRefresh: calculateSectionHeight,
        },
      });

      tl.fromTo(
        videoEl,
        {
          width: () => {
            gsap.set(videoEl, { y: 0, zIndex: 3 });
            return videoEl.getBoundingClientRect().width || 320;
          },
          y: 0,
          zIndex: 3,
        },
        {
          width: "96vw",
          y: calculateVideoEndY,
          zIndex: 3,
          ease: "none",
        },
        0
      );

      // Heading opacity animation - starts at 20% of video animation
      tl.fromTo(
        headingEl,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          ease: "none",
        },
        0.2
      );

      const handleResize = () => {
        calculateSectionHeight();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const child = React.Children.only(children) as ReactElement<any>;
  const originalRef = (child as any).ref as React.Ref<HTMLElement> | undefined;

  const combinedRef = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;

      if (!originalRef) return;

      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (typeof originalRef === "object") {
        (originalRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    },
    [originalRef]
  );

  return React.cloneElement(child, {
    ref: combinedRef,
  });
};

export default VideoExpand;
