"use client";

import Logo from "@/components/Logo";
import NavbarWrapper from "@/components/NavbarWrapper";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
    return (
        <header className="site-header fixed top-0 left-0 w-full z-9999 max-md:hidden">
            <div className="inner flex justify-between items-center p-12">
                <Logo />
                <NavbarWrapper />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header