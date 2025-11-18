"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
    const pathname = usePathname();

    const variants = {
        initial: { opacity: 0, y: 20 },
        enter:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
        exit:    { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{ height: "100%" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}