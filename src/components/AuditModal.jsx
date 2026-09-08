import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';

// Not currently mounted anywhere — the banner that opened this modal was
// removed (the "I have a code" flow it also carried is gone for good, now
// that the Lemlist audit email only sends the direct link). Kept here,
// hidden, in case the free-audit request flow gets a new entry point later.

const AI_LOGOS = [
  { src: `${import.meta.env.BASE_URL}Chatgpt-logo-2.svg`, alt: 'ChatGPT' },
  { src: `${import.meta.env.BASE_URL}Gemini-logo-2.svg`, alt: 'Gemini' },
  { src: `${import.meta.env.BASE_URL}Claude-logo-2.svg`, alt: 'Claude' },
  { src: `${import.meta.env.BASE_URL}Perplexity-logo-2.svg`, alt: 'Perplexity' },
  { src: `${import.meta.env.BASE_URL}Mistral-ai-logo.svg`, alt: 'Mistral AI' },
  { src: `${import.meta.env.BASE_URL}Deepseek-logo.svg`, alt: 'Deepseek' },
];

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
function extractErrorMessage(data, fallback) {
  const detail = data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((d) => d?.msg).filter(Boolean);
    if (messages.length) return messages.join(' ');
  }
  return fallback;
}

export default function AuditModal({ open, onClose }) {
  const { t } = useLang();
  const am = t('auditModal');

  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [freeError, setFreeError] = useState('');
  const [done, setDone] = useState(null); // null | 'queued' | 'ready'
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

  if (!open) return null;

  const close = () => {
    onClose();
    setEmail('');
    setWebsite('');
    setTurnstileToken('');
    setFreeError('');
    setDone(null);
  };

  const handleFreeSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setFreeError(am.errors.verifyRequired);
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
        setFreeError(extractErrorMessage(data, am.errors.generic));
        return;
      }
      const data = await res.json();
      trackEvent('free_audit_requested');
      setDone(data.status === 'ready' ? 'ready' : 'queued');
    } catch {
      setFreeError(am.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div onClick={close} className="promo-modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="promo-modal-card">
        <div className="promo-modal-glow" aria-hidden="true" />

        <button onClick={close} aria-label={am.close} className="promo-modal-close">
          &times;
        </button>

        <div className="promo-modal-body">
          {done ? (
            <>
              <div className="promo-modal-eyebrow">✦ {am.done.allSet}</div>
              <h2 className="promo-modal-title">
                {done === 'ready' ? am.done.readyTitle : am.done.queuedTitle}
              </h2>
              <p className="promo-modal-lead">
                {done === 'ready' ? am.done.readyLead : am.done.queuedLead}
              </p>
            </>
          ) : (
            <>
              <div className="promo-modal-eyebrow">✦ {am.freeSetup}</div>
              <h2 className="promo-modal-title">
                {am.titlePre}<br />{am.titlePost} <span className="hl">{am.titleHl}</span>?
              </h2>
              <p className="promo-modal-lead">
                {am.lead}
              </p>

              <p className="promo-modal-tracked-label">{am.trackedLabel}</p>
              <div className="promo-modal-logos">
                {AI_LOGOS.map((logo) => (
                  <div key={logo.alt} className="promo-modal-logo-chip">
                    <img src={logo.src} alt={logo.alt} title={logo.alt} />
                  </div>
                ))}
              </div>

              <form onSubmit={handleFreeSubmit} className="free-audit-form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFreeError(''); }}
                  placeholder={am.emailPlaceholder}
                  className="free-audit-form__input"
                />
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => { setWebsite(e.target.value); setFreeError(''); }}
                  placeholder={am.websitePlaceholder}
                  className="free-audit-form__input"
                />
                {TURNSTILE_SITE_KEY && (
                  <div ref={widgetRef} className="free-audit-form__turnstile" />
                )}
                <button type="submit" className="btn btn--primary promo-modal-cta" disabled={submitting}>
                  {submitting ? am.submitting : am.getMyFreeAudit}
                </button>
                {freeError && <p className="code-modal-error">{freeError}</p>}
              </form>

              <p className="promo-modal-trust">{am.trust}</p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
