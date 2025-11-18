"use client";

import { sendEmail } from "@/lib/resend";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
    // const [status, setStatus] = useState<null | "success" | "error">(null);

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //   e.preventDefault();
    //   setStatus(null);

    //   const formData = new FormData(e.currentTarget);

    //   try {
    //     const res = await fetch("/api/contact", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         name: formData.get("name"),
    //         email: formData.get("email"),
    //         message: formData.get("message"),
    //       }),
    //       headers: { "Content-Type": "application/json" },
    //     });

    //     if (!res.ok) throw new Error("Failed");
    //     setStatus("success");
    //     e.currentTarget.reset();
    //   } catch {
    //     setStatus("error");
    //   }
    // }

    function send() {
      sendEmail(); 
    }

    return (
      <section className="fp-sec-contact-1 pt-16">
          <div className="container mx-auto px-3">
              <div className="inner max-w-[800px] mx-auto">
                  <h1 className="text-[42px] md:text-[60px] pb-6">Contact</h1>                

                  <Image src="/images/book-melisa.png" width={500} height={300} alt="Melissa Book" loading="lazy" layout="repsonsive" />

                  <form className="fp-form fp-form-contact" action={send}>
                      <div className="fp-row"><input name="name" required placeholder="Name" className="border p-2" /></div>
                      <div className="fp-row"><input name="email" type="email" required placeholder="Email" className="border p-2" /></div>
                      <div className="fp-row"><textarea name="message" required placeholder="Message" className="border p-2 h-32" /></div>
                      <button type="submit" className="bg-black text-white py-2 px-4 rounded">Send</button>
                  </form>
              </div>
          </div>

      </section>
    );
}
