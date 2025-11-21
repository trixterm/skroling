"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Work", href: "/work" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fp-top-nav fixed left-0 right-0 mx-auto max-w-[330px] flex px-[6px] py-[5px] gap-1 bg-white rounded-3xl text-[12px] font-medium text-[#5A5A5A] backdrop-blur-2xl">
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`px-[9px] py-[8px] ${
                            isActive ? "text-[#C4C4C4] bg-[#1A1A1A] rounded-3xl" : ""
                        }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}
