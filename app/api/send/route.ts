import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Lorem Ipsum Catalog <onboarding@resend.dev>', // Use your own domain here
      to: ['joaquinsegura.dev@gmail.com'], // The email that receives the messages
      subject: `New message from ${name} from your catalog`,
      html: `
        <h1>New Message from Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email Sent Successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}