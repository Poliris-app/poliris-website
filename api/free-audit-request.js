export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const { email, website, turnstile_token } = req.body || {};
  if (!email || !website || !turnstile_token) {
    return res.status(400).json({ detail: 'email, website, and turnstile_token are required' });
  }

  // Vercel populates this with the real visitor IP — forwarded on so the
  // backend can rate-limit and Turnstile-verify per visitor instead of per
  // this serverless function's own outbound IP.
  const forwardedFor = req.headers['x-forwarded-for'] || '';

  try {
    const r = await fetch(`${process.env.POLIRIS_BACKEND_URL}/api/v2/freemium/public-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': forwardedFor,
      },
      body: JSON.stringify({ email, website, turnstile_token }),
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('Free audit request error:', err);
    return res.status(502).json({ detail: 'Could not reach the backend — please try again.' });
  }
}
