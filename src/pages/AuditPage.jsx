import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Navbar from '../components/Navbar';
import { useLang } from '../contexts/LangContext';

const CODE_RE = /^[A-Za-z0-9]{6}$/;

// A missing/wrong code must never look visibly "broken" — both a malformed
// code and a fetch-in-progress render the same brief loading state, then an
// invalid code silently redirects home rather than showing an error page.
export default function AuditPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const [audit, setAudit] = useState(null);
  const [invalid, setInvalid] = useState(false);

  const code = (slug || '').slice(-6);
  const malformed = !CODE_RE.test(code);

  useEffect(() => {
    if (malformed) return;

    let cancelled = false;
    fetch(`/api/audit?code=${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data) setAudit(data);
        else setInvalid(true);
      })
      .catch(() => {
        if (!cancelled) setInvalid(true);
      });

    return () => {
      cancelled = true;
    };
  }, [code, malformed]);

  if (malformed || invalid) return <Navigate to={`/${lang}/`} replace />;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />
        <div style={{ paddingTop: 74, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {audit ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                background: 'var(--surface2, #f3f5f9)',
                padding: '20px 0',
                minHeight: 0,
              }}
            >
              <iframe
                src={`${audit.pdfUrl}#view=Fit`}
                title={`${audit.companyName} Visibility Audit`}
                style={{
                  width: 'min(1100px, 92vw)',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-md, 0 16px 50px rgba(192,192,192,0.31))',
                }}
              />
            </div>
          ) : (
            <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={`${import.meta.env.BASE_URL}Logo-Poliris-1.svg`}
                alt="Poliris"
                style={{ height: 28, opacity: 0.5 }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
