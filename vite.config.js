import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { LANGS, PAGE_SLUGS, BLOG_POST_SLUGS } from './src/seo.js'

function devApiPlugin(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/send', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { Resend } = await import('resend');
            const { buildEmailHtml } = await import('./api/emailTemplate.js');
            const resend = new Resend(env.RESEND_API_KEY);
            const { firstName, lastName, email, company, role, size, message, topicIndex } = JSON.parse(body);

            const TOPICS = ['Request a demo', 'Free GEO audit', 'Agency partnership', 'Technical question', 'Something else'];
            const topic = TOPICS[topicIndex] ?? 'General enquiry';

            const { data, error } = await resend.emails.send({
              from: 'Poliris <no-reply@poliris.io>',
              to: ['ronamay.balangat@poliris.io'],
              replyTo: email,
              subject: `[Poliris] ${topic} — ${firstName} ${lastName}`,
              html: buildEmailHtml({ firstName, lastName, email, company, role, size, message, topic }),
            });

            if (error) {
              console.error('Resend API error:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: error.message }));
            }

            console.log('Email sent:', data?.id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            console.error('Resend error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to send message.' }));
          }
        });
      });

      server.middlewares.use('/api/audit', async (req, res) => {
        if (req.method !== 'GET') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        const url = new URL(req.url, 'http://localhost');
        const code = url.searchParams.get('code');
        if (!code || !/^[A-Za-z0-9]{6}$/.test(code)) {
          res.writeHead(404);
          return res.end();
        }

        try {
          const r = await fetch(
            `${env.POLIRIS_BACKEND_URL}/api/v2/audit/public/${encodeURIComponent(code)}`
          );
          if (!r.ok) {
            res.writeHead(404);
            return res.end();
          }
          const data = await r.json();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ companyName: data.company_name, pdfUrl: data.pdf_url }));
        } catch (err) {
          console.error('Audit lookup error:', err);
          res.writeHead(404);
          res.end();
        }
      });

      server.middlewares.use('/api/free-audit-request', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ detail: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { email, website, turnstile_token } = JSON.parse(body);
            if (!email || !website || !turnstile_token) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ detail: 'email, website, and turnstile_token are required' }));
            }

            const r = await fetch(`${env.POLIRIS_BACKEND_URL}/api/v2/freemium/public-request`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': req.headers['x-forwarded-for'] || '',
              },
              body: JSON.stringify({ email, website, turnstile_token }),
            });
            const data = await r.json().catch(() => ({}));
            res.writeHead(r.status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          } catch (err) {
            console.error('Free audit request error:', err);
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ detail: 'Could not reach the backend — please try again.' }));
          }
        });
      });

      server.middlewares.use('/api/checkout-session', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ detail: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { email, plan_tier, turnstile_token, locale } = JSON.parse(body);
            if (!email || !plan_tier || !turnstile_token) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ detail: 'email, plan_tier, and turnstile_token are required' }));
            }

            const r = await fetch(`${env.POLIRIS_BACKEND_URL}/api/v2/public/checkout/session`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': req.headers['x-forwarded-for'] || '',
              },
              body: JSON.stringify({ email, plan_tier, turnstile_token, locale: locale || 'en' }),
            });
            const data = await r.json().catch(() => ({}));
            res.writeHead(r.status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          } catch (err) {
            console.error('Checkout session error:', err);
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ detail: 'Could not reach the backend. Please try again.' }));
          }
        });
      });

      server.middlewares.use('/api/checkout-status', async (req, res) => {
        if (req.method !== 'GET') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ detail: 'Method not allowed' }));
        }

        const url = new URL(req.url, 'http://localhost');
        const sessionId = url.searchParams.get('session_id');
        if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ detail: 'Invalid session_id' }));
        }

        try {
          const r = await fetch(
            `${env.POLIRIS_BACKEND_URL}/api/v2/public/checkout/session/${encodeURIComponent(sessionId)}/status`
          );
          const data = await r.json().catch(() => ({}));
          const headers = { 'Content-Type': 'application/json' };
          if (r.ok && data.status === 'ready') {
            // No Domain= locally — localhost can't set a cross-subdomain
            // cookie the way `.poliris.io` does in production, but this still
            // lets you verify the Navbar's Dashboard/Login swap locally.
            const cookies = ['poliris_has_account=1; Path=/; Max-Age=31536000; SameSite=Lax'];
            if (data.plan_tier && /^[a-z_]+$/.test(data.plan_tier)) {
              cookies.push(`poliris_plan_tier=${data.plan_tier}; Path=/; Max-Age=31536000; SameSite=Lax`);
            }
            headers['Set-Cookie'] = cookies;
          }
          res.writeHead(r.status, headers);
          res.end(JSON.stringify(data));
        } catch (err) {
          console.error('Checkout status error:', err);
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ detail: 'Could not reach the backend. Please try again.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // '' loads ALL vars, not just VITE_

  return {
  plugins: [react(), devApiPlugin(env)],
  // vite-react-ssg build options (read from vite config at build time).
  ssgOptions: {
    // Emit /en/visibility/index.html so routes resolve as clean directory URLs.
    dirStyle: 'nested',
    // Expand the dynamic "/:lang" route into the concrete paths to prerender.
    includedRoutes() {
      const slugs = Object.values(PAGE_SLUGS)
      return LANGS.flatMap((lang) => [
        ...slugs.map((slug) => (slug ? `/${lang}/${slug}` : `/${lang}/`)),
        ...BLOG_POST_SLUGS.map((slug) => `/${lang}/blog/${slug}`),
      ])
    },
  },
  };
})
