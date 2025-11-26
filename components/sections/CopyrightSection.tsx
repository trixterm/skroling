"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CopyrightSection() {

    const year = new Date().getFullYear();

    return (
        <div className="fp-sec-copyright relative z-2 pb-14 md:pb-27">
            <div className="container mx-auto">
                <div className="inner flex flex-col md:flex-row md:items-center">
                    <div className="text-[10px] max-md:pb-4">© {year}. All rights reserved Monty and Kaite</div>
                    <ul className="fp-social-list flex gap-x-1 md:ml-auto">
                        <li><a href="#" className="px-4 py-[5px] text-[10px] border-1 border-[#9F9F9F] rounded-[20px]">Linkedin</a></li>
                        <li><a href="#" className="px-4 py-[5px] text-[10px] border-1 border-[#9F9F9F] rounded-[20px]">Facebook</a></li>
                        <li><a href="#" className="px-4 py-[5px] text-[10px] border-1 border-[#9F9F9F] rounded-[20px]">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}