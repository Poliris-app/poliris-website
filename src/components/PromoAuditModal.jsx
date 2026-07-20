import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';

const CODE_RE = /^[A-Za-z0-9]{6}$/;
const SESSION_KEY = 'promoAuditModalShown';
const SHOW_DELAY_MS = 4000;

const AI_LOGOS = [
  { src: `${import.meta.env.BASE_URL}Chatgpt-logo-2.svg`, alt: 'ChatGPT' },
  { src: `${import.meta.env.BASE_URL}Gemini-logo-2.svg`, alt: 'Gemini' },
  { src: `${import.meta.env.BASE_URL}Claude-logo-2.svg`, alt: 'Claude' },
  { src: `${import.meta.env.BASE_URL}Perplexity-logo-2.svg`, alt: 'Perplexity' },
  { src: `${import.meta.env.BASE_URL}Mistral-ai-logo.svg`, alt: 'Mistral AI' },
  { src: `${import.meta.env.BASE_URL}Deepseek-logo.svg`, alt: 'Deepseek' },
];

export default function PromoAuditModal() {
  const { lang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  // Never show on the direct audit-link route — that page already handles
  // its own report modal, and stacking this on top would be confusing.
  const onAuditRoute = location.pathname.includes('/audit/');

  useEffect(() => {
    if (onAuditRoute) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
      trackEvent('promo_audit_modal_shown');
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [onAuditRoute]);

  const close = () => {
    setVisible(false);
    setCode('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!CODE_RE.test(trimmed)) {
      setError('That code doesn’t look right — it should be 6 characters.');
      return;
    }
    setChecking(true);
    setError('');
    try {
      const res = await fetch(`/api/audit?code=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        setError('Code not found — double-check and try again.');
        return;
      }
      trackEvent('promo_audit_code_valid');
      navigate(`/${lang}/audit/${trimmed}`);
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setChecking(false);
    }
  };

  if (!visible) return null;

  return createPortal(
    <div onClick={close} className="promo-modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="promo-modal-card">
        <div className="promo-modal-glow" aria-hidden="true" />

        <button onClick={close} aria-label="Close" className="promo-modal-close">
          &times;
        </button>

        <div className="promo-modal-body">
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

          <a
            href={`/${lang}/demo`}
            className="btn btn--primary promo-modal-cta"
            onClick={() => trackEvent('audit_cta_clicked')}
          >
            Get My Free Audit →
          </a>
          <p className="promo-modal-trust">🔒 No credit card required</p>

          <div className="promo-modal-divider">
            <div className="promo-modal-divider-line" />
            <span className="promo-modal-divider-text">or</span>
            <div className="promo-modal-divider-line" />
          </div>

          <p className="promo-modal-code-label">Already have a code from our team?</p>
          <form onSubmit={handleSubmit}>
            <div className="promo-modal-code-row">
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(''); }}
                placeholder="Enter your code"
                maxLength={6}
                className="promo-modal-code-input"
              />
              <button type="submit" className="btn btn--secondary promo-modal-code-submit" disabled={checking}>
                {checking ? 'Checking…' : 'View My Audit'}
              </button>
            </div>
            {error && <p className="promo-modal-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
