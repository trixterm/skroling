import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Kontaktų forma" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "Nauja žinutė iš kontaktų formos",
      html: `
        <h2>Nauja žinutė</h2>
        <p><strong>Vardas:</strong> ${name}</p>
        <p><strong>El. paštas:</strong> ${email}</p>
        <p><strong>Žinutė:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}