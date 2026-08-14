import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let turnstileScriptPromise = null;
function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Turnstile'));
      document.head.appendChild(script);
    });
  }
  return turnstileScriptPromise;
}

// FastAPI validation errors return `detail` as an array of
// {type, loc, msg, input} objects, not a string — never render that shape
// directly as a React child. Same helper as AuditModal.jsx.
function extractErrorMessage(data) {
  const detail = data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((d) => d?.msg).filter(Boolean);
    if (messages.length) return messages.join(' ');
  }
  return 'Something went wrong. Please try again.';
}

export default function PlanCheckoutModal({
  open,
  onClose,
  plan,
  currency = 'USD',
  billingInterval = 'month',
  displayPrice,
  displayAnnualTotal,
  symbol = '$',
}) {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!open || !TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    loadTurnstileScript().then(() => {
      if (cancelled || !widgetRef.current || widgetIdRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'flexible',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
      });
    });
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [open]);

  if (!open || !plan) return null;

  const close = () => {
    onClose();
    setEmail('');
    setEmailError('');
    setTurnstileToken('');
    setFormError('');
    setSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!EMAIL_RE.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setFormError('Please complete the verification below.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    setEmailError('');
    try {
      const res = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          plan_tier: plan.tier,
          turnstile_token: turnstileToken,
          locale: lang,
          currency,
          billing_interval: billingInterval,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setFormError(extractErrorMessage(data));
        setSubmitting(false);
        return;
      }
      trackEvent('checkout_session_started', { plan_tier: plan.tier });
      window.location.assign(data.url);
    } catch {
      setFormError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return createPortal(
    <div onClick={close} className="promo-modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="promo-modal-card">
        <div className="promo-modal-glow" aria-hidden="true" />

        <button onClick={close} aria-label="Close" className="promo-modal-close">
          &times;
        </button>

        <div className="promo-modal-body">
          <div className="promo-modal-eyebrow">✦ {plan.name}</div>
          <h2 className="promo-modal-title">
            {symbol}{displayPrice}<span style={{ fontSize: '0.5em', fontWeight: 500 }}>/mo</span>
          </h2>
          {billingInterval === 'year' && (
            <p className="promo-modal-billed-annually">Billed {symbol}{displayAnnualTotal} annually</p>
          )}
          <p className="promo-modal-lead">{plan.desc}</p>

          <ul className="pricing-features">
            {plan.features.map((f, i) => (
              <li key={i}>
                <svg className="pricing-check" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="free-audit-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); setFormError(''); }}
              placeholder="Your work email"
              className="free-audit-form__input"
            />
            {emailError && <p className="code-modal-error">{emailError}</p>}
            {TURNSTILE_SITE_KEY && (
              <div ref={widgetRef} className="free-audit-form__turnstile" />
            )}
            <button type="submit" className="btn btn--primary promo-modal-cta" disabled={submitting}>
              {submitting ? 'Redirecting…' : 'Continue to payment →'}
            </button>
            {formError && <p className="code-modal-error">{formError}</p>}
          </form>

          <p className="promo-modal-trust">🔒 Secure checkout via Stripe · Cancel anytime</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
