const CODE_RE = /^[A-Za-z0-9]{6}$/;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;
  if (!code || !CODE_RE.test(code)) {
    return res.status(404).end();
  }

  try {
    const r = await fetch(
      `${process.env.POLIRIS_BACKEND_URL}/api/v2/audit/public/${encodeURIComponent(code)}`
    );
    if (!r.ok) {
      return res.status(404).end();
    }
    const data = await r.json();
    return res.status(200).json({ companyName: data.company_name, pdfUrl: data.pdf_url });
  } catch (err) {
    console.error('Audit lookup error:', err);
    return res.status(404).end();
  }
}
