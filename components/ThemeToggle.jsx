"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  return (
    <div className="fp-theme-toggle flex items-center gap-x-2">
        <div className="text-[10px] font-medium text-[#404040]">Dark mode</div>
        <div className="fp-theme-toggle-buttons flex gap-x-1">
            <div className="bg-[#1A1A1A] text-white rounded-2xl px-3 py-1 text-[11px] font-medium text-center cursor-pointer">Off</div>
            <div className="border-1 rounded-2xl px-3 py-1 text-[11px] font-medium text-center text-[#9B9B9B] cursor-pointer">On</div>
        </div>
    </div>
  );
}