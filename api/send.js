import { Resend } from 'resend';
import { buildEmailHtml } from './emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const TOPICS = [
  'Request a demo',
  'Free GEO audit',
  'Agency partnership',
  'Technical question',
  'Something else',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, company, role, size, message, topicIndex } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const topic = TOPICS[topicIndex] ?? 'General enquiry';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Poliris <no-reply@poliris.io>',
      to: ['ronamay.balangat@poliris.io'],
      replyTo: email,
      subject: `[Poliris] ${topic} — ${firstName} ${lastName}`,
      html: buildEmailHtml({ firstName, lastName, email, company, role, size, message, topic }),
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
