"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { memo, useMemo } from "react";
import { siteConfig } from "@/config/site.config";
import clsx from "clsx";

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
};

const NavItem = memo(function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "px-[10px] py-[8px] cursor-none",
        active
          ? "text-[#C4C4C4] dark:text-[#1A1A1A] bg-[#1A1A1A] dark:bg-[#F0F0F0] rounded-3xl font-semibold"
          : "dark:text-[#F0F0F0]"
      )}
    >
      {label}
    </Link>
  );
});

export default function Navbar() {
  const segment = useSelectedLayoutSegment();

  const navItems = useMemo(() => siteConfig.navigation, []);

  const getIsActive = (href: string) => {
    if (href === "/") {
      return segment === null;
    }

    return segment === href.replace("/", "");
  };

  return (
    <nav className="fp-top-nav fixed left-0 right-0 mx-auto max-w-[335px] flex px-[6px] py-[5px] gap-1 bg-white dark:bg-[#292929] rounded-3xl text-[12px] font-medium text-[#5A5A5A] backdrop-blur-[50px] dark:backdrop-blur-[30px]">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          active={getIsActive(item.href)}
        />
      ))}
    </nav>
  );
}