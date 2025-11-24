"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    // Pradinis state - true, bet jis bus atnaujintas vos užsikrovus (jei reikia)
    const [isDarkMode, setIsDarkMode] = useState(true);

    // 1. TIK NUSKAITYMAS (Vyksta tik vieną kartą užsikrovus)
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        // Jei localStorage randa "light", perjungiam viską į light
        if (storedTheme === "light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            // Visais kitais atvejais užtikriname, kad Dark mode aktyvus
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    // 2. RANKINIS KEITIMAS (Vyksta tik paspaudus)
    const toggleTheme = (status: boolean) => {
        setIsDarkMode(status);
        
        if (status) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const baseButtonClass = "rounded-2xl px-3 py-1 text-[11px] font-medium text-center cursor-pointer transition-colors border";

    // Jūsų nurodyti stiliai
    const offButtonClass = isDarkMode 
        ? "bg-[#292929] text-white border border-[#fff]"
        : "bg-[#1A1A1A] text-white border-[#1A1A1A]";

    const onButtonClass = isDarkMode
        ? "bg-[#fff] text-[#000] border-[#fff]"
        : "bg-transparent text-[#9B9B9B] border-[#9F9F9F]";

    return (
        <div className="fp-theme-toggle flex items-center gap-x-2">
            <div className="text-[10px] font-medium text-[color:var(--text-color)]">Dark mode</div>
            <div className="fp-theme-toggle-buttons flex gap-x-1 items-center">
                
                {/* OFF Mygtukas */}
                <div 
                    onClick={() => toggleTheme(false)}
                    className={`${baseButtonClass} ${offButtonClass}`}
                >
                    Off
                </div>

                {/* ON Mygtukas */}
                <div 
                    onClick={() => toggleTheme(true)}
                    className={`${baseButtonClass} ${onButtonClass}`}
                >
                    On
                </div>
                
            </div>
        </div>
    );
}