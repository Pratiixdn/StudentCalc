/**
 * Contact form endpoint. No backend DB in this Vercel-only build —
 * wire up a real email send here (Resend, SendGrid, Postmark) where marked.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // TODO: send via a real provider, e.g. Resend:
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     from: 'StudentCalc <noreply@studentcalc.com>',
  //     to: 'you@studentcalc.com',
  //     subject: `Contact form: ${name}`,
  //     text: `From: ${name} <${email}>\n\n${message}`,
  //   }),
  // });

  return res.status(200).json({ success: true, message: "Message sent! We'll reply within 2 business days." });
}
