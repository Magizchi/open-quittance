import transporter from "$lib/service/mailer";
import { json } from '@sveltejs/kit';

export async function POST() {

  try {
    await transporter.sendMail({
      from: `dymanshe@gmail.Com`,
      to: 'mek45031@laoia.com',           // ← your receiving address
      subject: `New message from $name`,
      html: `
        <p><strong>From:</strong></p>
        <p><strong>Message:</strong></p>
        <p>"message"</p>
      `,
    });

    return json({ success: true });

  } catch (err) {
    console.error('Mail error:', err);
    return json({ error: 'Failed to send email.' }, { status: 500 });
  }
};

