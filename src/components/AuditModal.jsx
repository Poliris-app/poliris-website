import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';

const AI_LOGOS = [
  { src: `${import.meta.env.BASE_URL}Chatgpt-logo-2.svg`, alt: 'ChatGPT' },
  { src: `${import.meta.env.BASE_URL}Gemini-logo-2.svg`, alt: 'Gemini' },
  { src: `${import.meta.env.BASE_URL}Claude-logo-2.svg`, alt: 'Claude' },
  { src: `${import.meta.env.BASE_URL}Perplexity-logo-2.svg`, alt: 'Perplexity' },
  { src: `${import.meta.env.BASE_URL}Mistral-ai-logo.svg`, alt: 'Mistral AI' },
  { src: `${import.meta.env.BASE_URL}Deepseek-logo.svg`, alt: 'Deepseek' },
];

const CODE_RE = /^[A-Za-z0-9]{6}$/;

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

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

function normalizeWebsite(value) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// FastAPI validation errors return `detail` as an array of
// {type, loc, msg, input} objects, not a string — never render that shape
// directly as a React child.
function extractErrorMessage(data) {
  const detail = data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((d) => d?.msg).filter(Boolean);
    if (messages.length) return messages.join(' ');
  }
  return 'Something went wrong — please try again.';
}

export default function AuditModal({ open, onClose, defaultTab = 'free' }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);

  // Code tab state
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [checking, setChecking] = useState(false);

  // Free-audit tab state
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [freeError, setFreeError] = useState('');
  const [done, setDone] = useState(null); // null | 'queued' | 'ready'
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!open || tab !== 'free' || !TURNSTILE_SITE_KEY) return;
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
  }, [open, tab]);

  if (!open) return null;

  const close = () => {
    onClose();
    setTab(defaultTab);
    setCode('');
    setCodeError('');
    setEmail('');
    setWebsite('');
    setTurnstileToken('');
    setFreeError('');
    setDone(null);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!CODE_RE.test(trimmed)) {
      setCodeError('That code doesn’t look right — it should be 6 characters.');
      return;
    }
    setChecking(true);
    setCodeError('');
    try {
      const res = await fetch(`/api/audit?code=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        setCodeError('Code not found. Please double-check the code and try again.');
        return;
      }
      trackEvent('audit_code_modal_valid');
      navigate(`/${lang}/audit/${trimmed}`);
    } catch {
      setCodeError('Something went wrong — please try again.');
    } finally {
      setChecking(false);
    }
  };

  const handleFreeSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setFreeError('Please complete the verification below.');
      return;
    }
    setSubmitting(true);
    setFreeError('');
    try {
      const res = await fetch('/api/free-audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          website: normalizeWebsite(website),
          turnstile_token: turnstileToken,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFreeError(extractErrorMessage(data));
        return;
      }
      const data = await res.json();
      trackEvent('free_audit_requested');
      setDone(data.status === 'ready' ? 'ready' : 'queued');
    } catch {
      setFreeError('Something went wrong — please try again.');
    } finally {
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
          {done ? (
            <>
              <div className="promo-modal-eyebrow">✦ You&rsquo;re all set</div>
              <h2 className="promo-modal-title">
                {done === 'ready' ? 'Check your inbox now' : 'Your audit is on its way'}
              </h2>
              <p className="promo-modal-lead">
                {done === 'ready'
                  ? 'Your AI Visibility Audit is ready and on its way to your inbox.'
                  : "Auditing a new website takes about 10 minutes. You'll receive your AI Visibility Audit by email as soon as it's done. Feel free to close this and check back later."}
              </p>
            </>
          ) : (
            <>
              <div className="promo-modal-eyebrow">✦ Free · 2-minute setup</div>
              <h2 className="promo-modal-title">
                Does your brand show up<br />when people ask <span className="hl">AI</span>?
              </h2>
              <p className="promo-modal-lead">
                Get a free AI Visibility Audit and see exactly how ChatGPT, Gemini, and Perplexity describe (or ignore) your brand.
              </p>

              <p className="promo-modal-tracked-label">Tracked across every AI that matters</p>
              <div className="promo-modal-logos">
                {AI_LOGOS.map((logo) => (
                  <div key={logo.alt} className="promo-modal-logo-chip">
                    <img src={logo.src} alt={logo.alt} title={logo.alt} />
                  </div>
                ))}
              </div>

              <div className="audit-modal-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'free'}
                  className={`audit-modal-tab${tab === 'free' ? ' audit-modal-tab--active' : ''}`}
                  onClick={() => setTab('free')}
                >
                  Get a free audit
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'code'}
                  className={`audit-modal-tab${tab === 'code' ? ' audit-modal-tab--active' : ''}`}
                  onClick={() => setTab('code')}
                >
                  I have a code
                </button>
              </div>

              {tab === 'free' ? (
                <form onSubmit={handleFreeSubmit} className="free-audit-form">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFreeError(''); }}
                    placeholder="Your work email"
                    className="free-audit-form__input"
                  />
                  <input
                    type="text"
                    required
                    value={website}
                    onChange={(e) => { setWebsite(e.target.value); setFreeError(''); }}
                    placeholder="yourbrand.com"
                    className="free-audit-form__input"
                  />
                  {TURNSTILE_SITE_KEY && (
                    <div ref={widgetRef} className="free-audit-form__turnstile" />
                  )}
                  <button type="submit" className="btn btn--primary promo-modal-cta" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Get My Free Audit →'}
                  </button>
                  {freeError && <p className="code-modal-error">{freeError}</p>}
                </form>
              ) : (
                <form onSubmit={handleCodeSubmit}>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setCodeError(''); }}
                    placeholder="Enter your 6-character code"
                    maxLength={6}
                    autoFocus
                    className="code-modal-input"
                  />
                  <button type="submit" className="btn btn--primary code-modal-submit" disabled={checking}>
                    {checking ? 'Checking…' : 'View My Audit'}
                  </button>
                  {codeError && <p className="code-modal-error">{codeError}</p>}
                </form>
              )}

              <p className="promo-modal-trust">🔒 No credit card required</p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
