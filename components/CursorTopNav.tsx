'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorTopNav.module.css';

const CursorTopNav = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 1. Judėjimas: sekame pelę visada, net kai kursorius nematomas
    // Tai užtikrina, kad jam atsiradus, jis jau bus teisingoje vietoje
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // 2. Aptikimas: tikriname ar hover'iname .fp-top-nav a
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Naudojame 'closest', kad suveiktų net užvedus ant span ar ikonos nuorodos viduje
      if (target.closest('.fp-top-nav a')) {
        cursor.classList.add(styles.active);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('.fp-top-nav a')) {
        cursor.classList.remove(styles.active);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={styles.CursorTopNav} 
      aria-hidden="true"
    />
  );
};

export default CursorTopNav;