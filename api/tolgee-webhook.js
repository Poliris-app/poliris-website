import crypto from 'node:crypto';

// Tolgee calls this on every modifying activity (a translation saved, a key
// added, etc.). We don't act on the payload itself — we just verify it's
// genuinely from Tolgee, then tell GitHub Actions to run the real sync
// (scripts/tolgee-sync.mjs), which re-pulls the full current state and
// merges it into src/locales/en.js/fr.js. See docs.tolgee.io/platform/
// projects_and_organizations/webhooks for the signature scheme.
//
// Needs the raw request body for signature verification (an HMAC over the
// exact bytes Tolgee sent) — Vercel's default JSON body parser would give
// us a re-serialized object instead, which won't match, hence disabling it
// below and reading the stream ourselves.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function verifySignature(rawBody, header, secret) {
  if (!header) return false;
  let parsed;
  try {
    parsed = JSON.parse(header);
  } catch {
    return false;
  }
  const { timestamp, signature } = parsed;
  if (!timestamp || timestamp <= 0 || !signature) return false;
  if (timestamp < Date.now() - 300000) return false; // 5 min replay window, per Tolgee's own docs
  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  // Constant-time compare — same length is required by timingSafeEqual, checked first.
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const secret = process.env.TOLGEE_WEBHOOK_SECRET;
  const dispatchToken = process.env.GITHUB_DISPATCH_TOKEN;
  if (!secret || !dispatchToken) {
    console.error('tolgee-webhook: missing TOLGEE_WEBHOOK_SECRET or GITHUB_DISPATCH_TOKEN');
    return res.status(500).json({ detail: 'Server not configured' });
  }

  const rawBody = await readRawBody(req);
  if (!verifySignature(rawBody, req.headers['tolgee-signature'], secret)) {
    return res.status(401).json({ detail: 'Invalid signature' });
  }

  try {
    const ghRes = await fetch('https://api.github.com/repos/Poliris-app/poliris-website/dispatches', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${dispatchToken}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'tolgee-sync' }),
    });
    if (!ghRes.ok) {
      const text = await ghRes.text().catch(() => '');
      console.error('tolgee-webhook: GitHub dispatch failed', ghRes.status, text);
      return res.status(502).json({ detail: 'Could not trigger sync' });
    }
  } catch (err) {
    console.error('tolgee-webhook: dispatch error', err);
    return res.status(502).json({ detail: 'Could not trigger sync' });
  }

  return res.status(200).json({ ok: true });
}
