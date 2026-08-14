const SESSION_ID_RE = /^cs_[A-Za-z0-9_]+$/;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const { session_id } = req.query;
  if (!session_id || !SESSION_ID_RE.test(session_id)) {
    return res.status(400).json({ detail: 'Invalid session_id' });
  }

  try {
    const r = await fetch(
      `${process.env.POLIRIS_BACKEND_URL}/api/v2/public/checkout/session/${encodeURIComponent(session_id)}/status`
    );
    const data = await r.json().catch(() => ({}));
    if (r.ok && data.status === 'ready') {
      // Plain, non-sensitive markers (no auth data) so the marketing site can
      // show "Dashboard" instead of "Login" and label this visitor's current
      // plan on the pricing page — the real session lives in app.poliris.io's
      // own (host-only) Supabase cookies, set separately when the browser
      // lands on the login_url.
      //
      // Domain=.poliris.io only gets attached when actually serving from a
      // poliris.io (sub)domain — browsers silently reject a Domain= that
      // doesn't match the real serving host, so on preview deployments (e.g.
      // *.vercel.app) this falls back to a host-only cookie instead of
      // failing to set anything at all.
      const host = req.headers.host || '';
      const domainAttr = host.endsWith('poliris.io') ? '; Domain=.poliris.io' : '';
      const cookies = [
        `poliris_has_account=1${domainAttr}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`,
      ];
      if (data.plan_tier && /^[a-z_]+$/.test(data.plan_tier)) {
        cookies.push(
          `poliris_plan_tier=${data.plan_tier}${domainAttr}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
        );
      }
      res.setHeader('Set-Cookie', cookies);
    }
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('Checkout status error:', err);
    return res.status(502).json({ detail: 'Could not reach the backend. Please try again.' });
  }
}
