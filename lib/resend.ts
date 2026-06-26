"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async () => {
    await resend.emails.send({
        to: "mantuxas91@gmail.com",
        from: "Monty <onboarding@resend.dev>",
        subject: "Testing",
        html: "<strong>Yeeees! Pavyko!</strong>"
    })
}