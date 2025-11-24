"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CopyrightSection() {

    const year = new Date().getFullYear();

    return (
        <footer className="fp-sec-copyright py-6 relative z-2">
            <div className="container mx-auto">
                <div className="inner">
                    <div className="text-[10px]">© {year}. All rights reserved Monty and Kaite</div>
                </div>
            </div>
        </footer>
    );
}