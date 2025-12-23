'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type PageTransitionProps = {
  children: React.ReactNode;
  duration?: number;
  enabled?: boolean;
  internalOnly?: boolean;
};

type PendingNav = {
  href: string;
  fx: boolean;
  pop: boolean;
};

const EASE_OUT_COVER = 'cubic-bezier(.16,1,.3,1)';
const EASE_IN_REVEAL = 'cubic-bezier(.37,0,.63,1)';

function isModifiedEvent(e: MouseEvent) {
  return !!(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
}

function closestAnchor(el: Element | null): HTMLAnchorElement | null {
  let cur: Element | null = el;
  while (cur) {
    if (cur instanceof HTMLAnchorElement) return cur;
    cur = cur.parentElement;
  }
  return null;
}

function toInternalHref(a: HTMLAnchorElement): string | null {
  const rawHref = a.getAttribute('href') || '';
  const t = a.getAttribute('target');
  const dl = a.hasAttribute('download');
  if (t || dl) return null;
  if (rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return null;
  if (rawHref.startsWith('#')) return rawHref;

  try {
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function lockInteraction(lock: boolean) {
  const root = document.documentElement;
  if (lock) {
    root.dataset.pt = '1';
    document.body.style.pointerEvents = 'none';
  } else {
    delete root.dataset.pt;
    document.body.style.pointerEvents = '';
  }
}

function addFxToAnchor(a: HTMLAnchorElement | null, on: boolean) {
  if (!a) return;
  const hasU = a.classList.contains('u_');
  if (!hasU) return;
  if (on) a.classList.add('fx');
  else a.classList.remove('fx');
}

export default function PageTransition({
  children,
  duration = 2000,
  enabled = true,
  internalOnly = true,
}: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastClickedAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const mutatingRef = useRef(false);

  const [pending, setPending] = useState<PendingNav | null>(null);

  const coverDuration = useMemo(() => Math.min(350, Math.round(duration * 0.35)), [duration]);
  const revealDuration = useMemo(
    () => Math.max(250, duration - coverDuration),
    [duration, coverDuration]
  );

  const playCover = useCallback(
    async (fx: boolean) => {
      const el = overlayRef.current;
      if (!el) return;

      el.dataset.state = 'cover';
      el.dataset.fx = fx ? '1' : '0';

      el.style.transform = 'translateY(100%)';
      el.style.opacity = '1';

      el.getAnimations().forEach((a) => a.cancel());
      const anim = el.animate(
        [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
        {
          duration: coverDuration,
          easing: EASE_OUT_COVER,
          fill: 'forwards',
        }
      );

      try {
        await anim.finished;
      } catch {}
    },
    [coverDuration]
  );

  const playReveal = useCallback(
    async (fx: boolean) => {
      const el = overlayRef.current;
      if (!el) return;

      el.dataset.state = 'reveal';
      el.dataset.fx = fx ? '1' : '0';

      el.getAnimations().forEach((a) => a.cancel());
      const anim = el.animate(
        [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
        {
          duration: revealDuration,
          easing: EASE_IN_REVEAL,
          fill: 'forwards',
        }
      );

      try {
        await anim.finished;
      } catch {
      } finally {
        el.style.transform = 'translateY(100%)';
        el.style.opacity = '0';
        delete el.dataset.state;
        delete el.dataset.fx;
      }
    },
    [revealDuration]
  );

  const startNavigation = useCallback(
    (nextHref: string, a: HTMLAnchorElement | null, pop = false) => {
      if (!enabled) {
        router.push(nextHref);
        return;
      }
      if (mutatingRef.current) return;

      const fx = !!a?.classList.contains('u_');
      lastClickedAnchorRef.current = a;

      mutatingRef.current = true;
      lockInteraction(true);
      addFxToAnchor(a, true);

      setPending({ href: nextHref, fx, pop });

      void playCover(fx);
      router.push(nextHref);
    },
    [enabled, playCover, router]
  );

  useEffect(() => {
    if (!enabled) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (isModifiedEvent(e)) return;

      const a = closestAnchor(e.target as Element | null);
      if (!a) return;

      const href = toInternalHref(a);
      if (!href) return;

      if (href.startsWith('#')) return;

      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (href === current) return;

      e.preventDefault();
      e.stopPropagation();

      startNavigation(href, a, false);
    };

    document.body.addEventListener('click', onClick, true);
    return () => document.body.removeEventListener('click', onClick, true);
  }, [enabled, internalOnly, startNavigation, router]);

  useEffect(() => {
    if (!enabled) return;

    const onPop = () => {
      if (mutatingRef.current) return;
      const href = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      mutatingRef.current = true;
      lockInteraction(true);
      setPending({ href, fx: false, pop: true });
      void playCover(false);
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [enabled, playCover]);

  useEffect(() => {
    if (!enabled) return;
    if (!pending) return;

    const now = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (now !== pending.href) return;

    let cancelled = false;

    (async () => {
      await playReveal(pending.fx);

      if (cancelled) return;

      addFxToAnchor(lastClickedAnchorRef.current, false);
      lastClickedAnchorRef.current = null;

      lockInteraction(false);
      setPending(null);
      mutatingRef.current = false;
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, pending, enabled, playReveal]);

  return (
    <>
      <div ref={overlayRef} className="pt-overlay" aria-hidden="true" />
      {children}
      <style jsx global>{`
        .pt-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            pointer-events: none;
            transform: translateY(100%);
            opacity: 0;
            background: #f5f5f5;
            will-change: transform, opacity;
        }
        .pt-overlay[data-fx='1'] {
          background: #f5f5f5;
        }
      `}</style>
    </>
  );
}