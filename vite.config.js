import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { LANGS, PAGE_SLUGS } from './src/seo.js'

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
      return LANGS.flatMap((lang) =>
        slugs.map((slug) => (slug ? `/${lang}/${slug}` : `/${lang}/`)),
      )
    },
  },
  };
})
