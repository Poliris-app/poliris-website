export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const { email, plan_tier, turnstile_token, locale } = req.body || {};
  if (!email || !plan_tier || !turnstile_token) {
    return res.status(400).json({ detail: 'email, plan_tier, and turnstile_token are required' });
  }

  // Vercel populates this with the real visitor IP — forwarded on so the
  // backend can rate-limit and Turnstile-verify per visitor instead of per
  // this serverless function's own outbound IP. Same pattern as
  // free-audit-request.js.
  const forwardedFor = req.headers['x-forwarded-for'] || '';

  // The backend builds Stripe's success/cancel redirect URLs from this —
  // without it, every checkout (whether started from poliris.io or a
  // preview deployment) would redirect back to the same fixed
  // MARKETING_SITE_URL instead of wherever the visitor actually is.
  const siteOrigin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const r = await fetch(`${process.env.POLIRIS_BACKEND_URL}/api/v2/public/checkout/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': forwardedFor,
        'X-Site-Origin': siteOrigin,
      },
      body: JSON.stringify({
        email,
        plan_tier,
        turnstile_token,
        locale: locale || 'en',
      }),
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('Checkout session error:', err);
    return res.status(502).json({ detail: 'Could not reach the backend. Please try again.' });
  }
}
