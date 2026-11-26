// Pricing calculator, "estimate from your website": proxies to the backend's
// public credit estimate (poliris-backend app/api/v2/public_credit_estimate.py).
//
// POST { website, language, turnstile_token } starts an estimate and returns
// { estimate_id }. GET ?id=<estimate_id> returns its status and, once done,
// the brands, products and trading zones found.
//
// Server-to-server like checkout-session.js: the visitor's IP is forwarded so
// the backend can apply its per-IP daily limit and log the request against
// the right visitor, not against this function's own outbound IP.

const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  const base = `${process.env.POLIRIS_BACKEND_URL}/api/v2/public/credit-estimate`;
  const headers = { 'X-Forwarded-For': req.headers['x-forwarded-for'] || '' };

  try {
    if (req.method === 'POST') {
      const { website, language, turnstile_token } = req.body || {};
      if (!website || !turnstile_token) {
        return res.status(400).json({ detail: 'website and turnstile_token are required' });
      }
      const r = await fetch(base, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, language: language || 'en', turnstile_token }),
      });
      const data = await r.json().catch(() => ({}));
      return res.status(r.status).json(data);
    }

    if (req.method === 'GET') {
      const { id } = req.query;
      if (!id || !ID_RE.test(id)) {
        return res.status(400).json({ detail: 'Invalid id' });
      }
      const r = await fetch(`${base}/${encodeURIComponent(id)}`, { headers });
      const data = await r.json().catch(() => ({}));
      // Polled every few seconds: never let a CDN keep an old status.
      res.setHeader('Cache-Control', 'no-store');
      return res.status(r.status).json(data);
    }

    return res.status(405).json({ detail: 'Method not allowed' });
  } catch (err) {
    console.error('Credit estimate error:', err);
    return res.status(502).json({ detail: 'Could not reach the backend. Please try again.' });
  }
}
