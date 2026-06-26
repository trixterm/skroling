"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./PageTransition.module.css";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageTransitionProps {
  children: ReactNode;
  /** Background color for the transition overlay. @default "#fff" */
  overlayColor?: string;
}

// Phases with overlapping animations
type TransitionPhase =
  | "idle"
  | "contentFadingOut"  // Content starts fading out
  | "entering"          // Overlay slides in (overlaps with fade out)
  | "holding"           // Overlay covers screen, navigation happens
  | "exiting"           // Overlay slides out
  | "contentFadingIn";  // Content fades in (overlaps with slide out)

// Animation timing constants
const CONTENT_FADE_DURATION = 500; // ms
const OVERLAY_SLIDE_DURATION = 400; // ms
const FADE_TO_SLIDE_OVERLAP = 150; // ms - overlap between content fade out and overlay slide in
const SLIDE_TO_FADE_OVERLAP = 150; // ms - overlap between overlay slide out and content fade in
const MIN_HOLDING_DURATION = 200; // ms - minimum time to hold overlay before starting exit

// ---------------------------------------------------------------------------
// Component - CSS Animation with Keyframes
// ---------------------------------------------------------------------------

function PageTransitionComponent({
  children,
  overlayColor = "#fff",
}: PageTransitionProps): ReactNode {
  const pathname = usePathname();
  const router = useRouter();

  const pendingNavigation = useRef<string | null>(null);
  const phaseRef = useRef<TransitionPhase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname = useRef<string>(pathname);

  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const prefetchedRoutes = useRef<Set<string>>(new Set());
  const holdingStartTime = useRef<number>(0);

  // Sync ref with state
  useEffect(() => {
    phaseRef.current = phase;

    // Track when we enter holding phase
    if (phase === "holding") {
      holdingStartTime.current = Date.now();
    }
  }, [phase]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Start transition sequence (when link is clicked)
  // ---------------------------------------------------------------------------
  const startTransition = useCallback(() => {
    clearTimer();

    // Step 1: Start content fade out
    setPhase("contentFadingOut");

    // Step 2: After overlap delay, start overlay slide in while content is still fading
    timerRef.current = setTimeout(() => {
      if (phaseRef.current !== "contentFadingOut") return;

      setPhase("entering");

      // Step 3: After overlay slides in, hold and navigate
      timerRef.current = setTimeout(() => {
        if (phaseRef.current !== "entering") return;

        setPhase("holding");

        if (pendingNavigation.current) {
          const url = pendingNavigation.current;
          pendingNavigation.current = null;
          router.push(url);
        }
      }, OVERLAY_SLIDE_DURATION);
    }, FADE_TO_SLIDE_OVERLAP);
  }, [router, clearTimer]);

  // ---------------------------------------------------------------------------
  // Play slide-out and fade-in sequence
  // ---------------------------------------------------------------------------
  const playSlideOut = useCallback(() => {
    clearTimer();

    // Step 1: Start overlay slide out
    setPhase("exiting");

    // Step 2: After overlap delay, start content fade in while overlay is still sliding
    timerRef.current = setTimeout(() => {
      if (phaseRef.current !== "exiting") return;

      setPhase("contentFadingIn");

      // Step 3: After content fades in, return to idle
      timerRef.current = setTimeout(() => {
        if (phaseRef.current !== "contentFadingIn") return;

        setPhase("idle");
      }, CONTENT_FADE_DURATION);
    }, SLIDE_TO_FADE_OVERLAP);
  }, [clearTimer]);

  // ---------------------------------------------------------------------------
  // Route change detection → trigger slide-out
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (phase === "holding" && pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      // Calculate how long we've been in holding phase
      const holdingElapsed = Date.now() - holdingStartTime.current;
      const remainingHoldTime = Math.max(0, MIN_HOLDING_DURATION - holdingElapsed);

      // Ensure minimum holding duration before starting exit
      if (remainingHoldTime > 0) {
        timerRef.current = setTimeout(() => {
          requestAnimationFrame(() => playSlideOut());
        }, remainingHoldTime);
      } else {
        requestAnimationFrame(() => playSlideOut());
      }
    }
  }, [pathname, phase, playSlideOut]);

  // ---------------------------------------------------------------------------
  // Prefetch on hover for faster navigation
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external/special links
      if (
        anchor.target === "_blank" ||
        anchor.rel?.includes("external") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Skip if already prefetched
      if (prefetchedRoutes.current.has(href)) return;

      // Prefetch the route and mark as prefetched
      prefetchedRoutes.current.add(href);
      router.prefetch(href);
    };

    document.addEventListener("mouseover", handleMouseOver, { capture: true });
    return () => document.removeEventListener("mouseover", handleMouseOver, { capture: true });
  }, [router]);

  // ---------------------------------------------------------------------------
  // Click interception
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external/special links
      if (
        anchor.target === "_blank" ||
        anchor.rel?.includes("external") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href === pathname
      ) {
        return;
      }

      // Skip if already transitioning
      if (phaseRef.current !== "idle") return;

      e.preventDefault();
      e.stopPropagation();

      pendingNavigation.current = href;
      prevPathname.current = pathname;
      startTransition();
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, startTransition]);

  // ---------------------------------------------------------------------------
  // Render - CSS Classes based on phase
  // ---------------------------------------------------------------------------

  // Content CSS class based on phase
  const getContentClass = () => {
    switch (phase) {
      case "idle":
        return styles.contentVisible;
      case "contentFadingOut":
        return styles.contentFadeOut; // Starts fading out
      case "entering":
      case "holding":
        return styles.contentHidden; // Stay hidden
      case "exiting":
        return styles.contentHidden; // Still hidden during overlay exit
      case "contentFadingIn":
        return styles.contentFadeIn; // Fades in
      default:
        return styles.contentVisible;
    }
  };

  // Overlay CSS class based on phase
  const getOverlayClass = () => {
    switch (phase) {
      case "idle":
      case "contentFadingOut":
        return `${styles.overlay} ${styles.overlayHidden}`; // Hidden until entering
      case "entering":
        return `${styles.overlay} ${styles.overlayEntering}`; // Slides in
      case "holding":
        return `${styles.overlay} ${styles.overlayVisible}`; // Stays visible
      case "exiting":
      case "contentFadingIn":
        return `${styles.overlay} ${styles.overlayExiting}`; // Slides out
      default:
        return `${styles.overlay} ${styles.overlayHidden}`;
    }
  };

  // Overlay should block interactions only when on screen
  const shouldBlockInteraction =
    phase === "entering" || phase === "holding" || phase === "exiting";

  return (
    <>
      {/* Content wrapper with CSS animation classes */}
      <div className={getContentClass()}>
        {children}
      </div>

      {/* CSS-animated overlay - always in DOM for smooth transitions */}
      <div
        aria-hidden="true"
        data-transition-phase={phase}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: shouldBlockInteraction ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        <div
          className={getOverlayClass()}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColor,
          }}
        />
      </div>
    </>
  );
}

const PageTransition = memo(PageTransitionComponent);
PageTransition.displayName = "PageTransition";

export default PageTransition;
