"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from '@/config/site.config';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fp-top-nav fixed left-0 right-0 mx-auto max-w-[335px] flex px-[6px] py-[5px] gap-1 bg-white dark:bg-[#292929] rounded-3xl text-[12px] font-medium text-[#5A5A5A] backdrop-blur-[50px] dark:backdrop-blur-[30px]">
            {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`px-[10px] py-[8px] cursor-none ${
                            isActive ? "text-[#C4C4C4] dark:text-[#1A1A1A] bg-[#1A1A1A] dark:bg-[#F0F0F0] rounded-3xl font-semibold" : "dark:text-[#F0F0F0]"
                        }`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
