"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
    ssr: false,
    loading: () => <p className="text-gray-400">Loading...</p>,
});

export default function ContactFormLazyWrapper() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = document.getElementById("contact-form-lazy");

        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "250px" }
        );

        observer.observe(el);
    }, []);

    return (
        <div id="contact-form-lazy">
            {visible ? <ContactForm /> : <p className="text-gray-400">Loading form…</p>}
        </div>
    );
}
