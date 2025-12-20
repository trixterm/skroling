"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site.config";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const ariaLabel = open ? "Close menu" : "Open menu";

  const topBarClass = `absolute right-0 w-[31px] h-[2px] bg-black transition-all duration-400 ${
    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
  }`;

  const bottomBarClass = `absolute right-0 w-[23px] h-[2px] bg-black transition-all duration-400 ${
    open ? "top-1/2 w-[31px] -translate-y-1/2 -rotate-45" : "top-2"
  }`;

  return (
    <header className="md:hidden fixed top-0 left-0 w-full z-9999 bg-[#f5f5f5]">
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <Logo />

          <button
            onClick={toggleMenu}
            className="fp-menu-burger-trigger relative w-[31px] h-2.5"
            aria-label={ariaLabel}
          >
            <span className={topBarClass} />
            <span className={bottomBarClass} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fp-menu-mob-dropdown absolute top-16 left-0 right-0 w-[94%] mx-auto bg-white animate-fade-in rounded-[17px]">
          <nav className="fp-nav-mobile p-6 space-y-3.5 flex flex-col text-[15px] font-semibold">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default memo(MobileHeader);