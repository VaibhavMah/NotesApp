import nodemailer from "nodemailer"

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // you can use SendGrid, Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Notes App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};

export default sendEmail;