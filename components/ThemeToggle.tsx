"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const stored = (localStorage.getItem("theme") as Theme | null) || "dark";
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
    }, []);

    const toggleTheme = useCallback((status: boolean) => {
        const newTheme: Theme = status ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", status);
        localStorage.setItem("theme", newTheme);
    }, []);

    const baseButtonClass =
        "rounded-2xl px-3 py-1 text-[11px] font-medium text-center cursor-pointer transition-colors border";

    // ⛔️ Must run EVERY render → keep before any conditional return
    const classMap = useMemo(() => {
        const dark = theme === "dark";

        return {
            offButtonClass: dark
                ? "bg-[#292929] text-white border border-[#fff]"
                : "bg-[#1A1A1A] text-white border-[#1A1A1A]",

            onButtonClass: dark
                ? "bg-[#fff] text-[#000] border-[#fff]"
                : "bg-transparent text-[#9B9B9B] border-[#9F9F9F]",
        };
    }, [theme]);

    // ✔ Only now we can return early safely
    if (theme === null) return null;

    return (
        <div className="fp-theme-toggle flex items-center gap-x-2">
            <div className="text-[10px] font-medium text-[color:var(--text-color)]">Dark mode</div>

            <div className="fp-theme-toggle-buttons flex gap-x-1 items-center">
                <div
                    onClick={() => toggleTheme(false)}
                    className={`${baseButtonClass} ${classMap.offButtonClass}`}
                >
                    Off
                </div>

                <div
                    onClick={() => toggleTheme(true)}
                    className={`${baseButtonClass} ${classMap.onButtonClass}`}
                >
                    On
                </div>
            </div>
        </div>
    );
}