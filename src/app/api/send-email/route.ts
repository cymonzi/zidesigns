import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Securely inject the private key if it exists in environment variables
    const payload = {
      ...body,
      ...(process.env.EMAILJS_PRIVATE_KEY
        ? { accessToken: process.env.EMAILJS_PRIVATE_KEY }
        : {}),
    };

    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await emailRes.text();

    if (!emailRes.ok) {
      console.error("EmailJS API error:", text, "Status:", emailRes.status);
      return NextResponse.json(
        { error: `EmailJS API error: ${text}` },
        { status: emailRes.status }
      );
    }

    return NextResponse.json({ success: true, message: text });
  } catch (error: any) {
    console.error("Failed to send email via API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
