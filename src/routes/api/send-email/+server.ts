import transporter from "$lib/server/mailer";
import { json } from '@sveltejs/kit';

export async function POST() {

  try {
    await transporter.sendMail({
      from: `dymanshe@gmail.Com`,
      to: 'dymanshe@gmail.com',           // ← your receiving address
      subject: `New message from $name`,
      html: `
        <p><strong>From:</strong></p>
        <p><strong>Message:</strong></p>
        <p>"message"</p>
      `,
      attachments: [{
        filename: "report.pdf",
        path: "pdfs/fileName.pdf",
      },]
    });

    return json({ success: true });

  } catch (err) {
    console.error('Mail error:', err);
    return json({ error: 'Failed to send email.' }, { status: 500 });
  }
};

