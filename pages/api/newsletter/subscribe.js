/**
 * Newsletter subscribe endpoint.
 * No database is attached in this Vercel-only deployment — wire this up to
 * a real email service (Resend, ConvertKit, Mailchimp, Buttondown) by adding
 * the provider's API call where marked below. Until then this validates
 * input and returns success so the frontend flow works end-to-end.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, name } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  // TODO: wire up a real provider here, e.g.:
  // await fetch('https://api.resend.com/audiences/.../contacts', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  //   body: JSON.stringify({ email, name }),
  // });

  return res.status(200).json({ success: true, message: 'Subscribed! Check your inbox to confirm.' });
}
