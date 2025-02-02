"use server";

import ContactPageMessage from "@/emails/ContactPageMessage";
import { Resend } from "resend";

export const sendContactformMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, message, subject } = data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "contact-form@fastrackinvestment.com",
    to: "admin@fastrackinvestment.com",
    replyTo: email,
    subject: "(CONTACT PAGE) New message: " + subject,
    react: ContactPageMessage({
      name: name,
      email: email,
      message: message,
      subject: subject,
    }),
  });

  return JSON.parse(JSON.stringify({ success: true }));
};
