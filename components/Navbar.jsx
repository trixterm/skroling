"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/home" },
        { name: "Work", href: "/work" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav style={styles.nav}>
        {navItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            style={{
                ...styles.link,
                fontWeight: pathname === item.href ? "bold" : "normal",
            }}
            >
            {item.name}
            </Link>
        ))}
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ddd",
    },
    link: {
        textDecoration: "none",
        color: "black",
    },
};