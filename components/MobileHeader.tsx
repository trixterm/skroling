"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden fixed top-0 left-0 w-full z-[9999] bg-white">
      <div className="container">
        <div className="flex justify-between items-center py-6">
          <Logo />
          
          {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative h-[20px] w-[31px]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {/* Viršutinė (31px) */}
          <span
            className={`
              absolute right-0 top-1/2 h-[2px] bg-black transition-all duration-300
              ${open ? "w-[31px] -translate-y-1/2 rotate-45" : "w-[31px] -translate-y-[7px] rotate-0"}
            `}
          />

          {/* Apatinė (23px) */}
          <span
            className={`
              absolute right-0 top-1/2 h-[2px] bg-black transition-all duration-300
              ${open ? "w-[31px] -translate-y-1/2 -rotate-45" : "w-[23px] translate-y-[1px] rotate-0"}
            `}
          />
        </button>


        </div>
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute top-22 left-0 right-0 w-[94%] mx-auto bg-white animate-fade-in rounded-[17px]">
          <nav className="fp-nav-mobile p-6 space-y-3.5 flex flex-col text-[15px] font-semibold">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
