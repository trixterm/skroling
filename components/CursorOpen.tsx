'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './CursorOpen.module.css';

export default function CursorOpen() {
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isHoveringWork = target.closest('.fp-swiper-work .swiper-slide');

      if (isHoveringWork) {
        setIsVisible(true);
        document.body.classList.add('hide-native-cursor');
      } else {
        setIsVisible(false);
        document.body.classList.remove('hide-native-cursor');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.classList.remove('hide-native-cursor');
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={styles.cursorContainer}
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    >
      {/* AnimatePresence handles the smooth fade in/out */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.cursorCircle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {/* 4. The text is now HTML, not an image */}
            <span className={styles.cursorText}>Open</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}