import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  propertyType?: unknown;
  message?: unknown;
};

const recipientEmail = process.env.CONTACT_TO_EMAIL ?? 'settlenetlimited@gmail.com';

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  let payload: ContactRequest;

  try {
    payload = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = readText(payload.name);
  const email = readText(payload.email);
  const propertyType = readText(payload.propertyType);
  const message = readText(payload.message);

  if (!name || !email || !propertyType) {
    return NextResponse.json({ error: 'Name, email, and property type are required.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || Number.isNaN(smtpPort)) {
    return NextResponse.json(
      { error: 'Email delivery is not configured on the server yet.' },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Settlenet Website" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Settlenet property enquiry from ${name}`,
      text: [
        'New property enquiry from the Settlenet website.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Property type: ${propertyType}`,
        '',
        message ? `Message: ${message}` : 'Message: Not provided',
      ].join('\n'),
      html: `
        <h2>New Settlenet property enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Property type:</strong> ${escapeHtml(propertyType)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message || 'Not provided').replace(/\n/g, '<br>')}</p>
      `,
    });
  } catch {
    return NextResponse.json(
      { error: 'Email could not be sent right now. Please try again later.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
