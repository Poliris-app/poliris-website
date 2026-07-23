import { useEffect, useState } from 'react';
import AuditModal from './AuditModal';
import { trackEvent } from '../lib/analytics';

export default function AuditCodeBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  // Shifts the fixed navbar (and this page's hero padding) down by the
  // banner's own height — see `body.has-code-banner` rules in poliris.css.
  useEffect(() => {
    document.body.classList.add('has-code-banner');
    return () => document.body.classList.remove('has-code-banner');
  }, []);

  const openModal = () => {
    trackEvent('audit_banner_clicked');
    setModalOpen(true);
  };

  return (
    <>
      <div className="audit-banner" role="button" tabIndex={0} onClick={openModal}>
        <div className="audit-banner__row">
          <span className="audit-banner__content">
            <span className="audit-banner__star" aria-hidden="true">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 2 C52 34 58 46 96 50 C58 54 52 66 50 98 C48 66 42 54 4 50 C42 46 48 34 50 2 Z" fill="#bcd7ff" />
              </svg>
            </span>
            <span className="audit-banner__text">
              <span className="audit-banner__line">Already have a code from our team? Or want your free AI Visibility Audit?</span>
              <span className="audit-banner__text-short">Have a code, or want a free audit?</span>
            </span>
          </span>
          <span className="audit-banner__cta">
            <span className="audit-banner__cta-label">Get your free audit</span>
            <span className="btn__icon btn__icon--black">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} defaultTab="free" />
    </>
  );
}
