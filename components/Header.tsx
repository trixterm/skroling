"use client";

import Logo from "@/components/Logo";
import NavbarWrapper from "@/components/NavbarWrapper";
import ThemeToggle from "@/components/ThemeToggle";
import React from 'react';

const Header = () => {
    return (
    <header className="site-header fixed top-0 left-0 w-full z-[9999]">
        <div className="container">
            <div className="inner flex justify-between items-center py-12">
                <Logo />
                <NavbarWrapper />
                <ThemeToggle />
            </div>
        </div>
    </header>
    )
}

export default Header