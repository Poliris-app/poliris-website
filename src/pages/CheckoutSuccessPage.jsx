import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trackEvent } from '../lib/analytics';
import '../pricing.css';

const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 10; // ~15s, matching the webhook-processing window

const MAIL_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const CHECK_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [state, setState] = useState(sessionId ? 'pending' : 'missing');
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    const poll = async () => {
      attemptsRef.current += 1;
      try {
        const res = await fetch(`/api/checkout-status?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (res.ok && data.status === 'ready' && data.login_url) {
          trackEvent('checkout_completed');
          setState('ready');
          window.location.assign(data.login_url);
          return;
        }
        if (!res.ok && res.status !== 404) {
          setState('error');
          return;
        }
        if (attemptsRef.current >= MAX_ATTEMPTS) {
          setState('timeout');
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (!cancelled) setState('error');
      }
    };

    poll();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="pricing-page">
      <Head><meta name="robots" content="noindex" /></Head>
      <Navbar />
      <div className="pricing-wrap" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 440, padding: '64px 24px' }}>
          {(state === 'pending' || state === 'ready') && (
            <>
              <div className="status-icon-circle status-icon-circle--pending" aria-hidden="true" />
              <h1 className="promo-modal-title">Setting up your account</h1>
              <p className="promo-modal-lead">
                Your payment was successful. We're finishing up your workspace. This only takes a few seconds and you'll be redirected automatically.
              </p>
            </>
          )}
          {state === 'timeout' && (
            <>
              <div className="status-icon-circle status-icon-circle--info">{MAIL_ICON}</div>
              <h1 className="promo-modal-title">Almost there</h1>
              <p className="promo-modal-lead">
                This is taking a little longer than expected. Check your email, we've sent you a sign-in link so you can access your account as soon as it's ready.
              </p>
            </>
          )}
          {(state === 'error' || state === 'missing') && (
            <>
              <div className="status-icon-circle status-icon-circle--success">{CHECK_ICON}</div>
              <h1 className="promo-modal-title">Payment received</h1>
              <p className="promo-modal-lead">
                Your payment went through. Check your email for a link to access your new account. It may take a minute to arrive.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
