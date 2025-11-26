"use client";

import styles from "./SliderNav.module.css";

type SliderNavProps = {
    onPrev: () => void;
    onNext: () => void;
    className?: string;
};

export default function SliderNav({
    onPrev,
    onNext,
    className = "",
}: SliderNavProps) {
    return (
        <nav
            className={`
                ${styles["fp-nav-btn"]}
                fp-nav-btn
                ${className}
                flex border-1 border-[#707070] rounded-3xl
                items-center justify-between py-[9px] px-3
                dark:border-[#ffffff]
            `}
        >
            <svg
                className={`
                    ${styles["fp-arrow"]}
                    ${styles["fp-arrow-left"]}
                    fp-arrow fp-arrow-left
                `}
                fill="#000000"
                width="11px"
                height="11px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onPrev}
            >
                <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path>
            </svg>

            <div
                className={`
                    ${styles["fp-line-1"]}
                    fp-line-1
                    w-[55px] h-[1px] bg-[#000] dark:bg-[#fff]
                `}
            />

            <svg
                className={`
                    ${styles["fp-arrow"]}
                    fp-arrow fp-arrow-right
                `}
                fill="#000000"
                width="11px"
                height="11px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onNext}
            >
                <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path>
            </svg>
        </nav>
    );
}
