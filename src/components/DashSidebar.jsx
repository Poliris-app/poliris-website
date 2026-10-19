import { useLang } from '../contexts/LangContext';

/**
 * Sidebar for the dashboard mockups, matching the app's current sidebar
 * (the one in the hero onboarding demo, public/onboarding-flow.html) at
 * ~0.82× its real size. Only the top of it is drawn — logo, project,
 * Dashboard/Poli AI switch, Roadmap, MEASURE and ACTION — and it's clipped
 * to the dashboard's height like the app's scrolling sidebar, so it never
 * makes the card taller.
 *
 * `product` is the index (into dashboard.sidebar.products) highlighted
 * under AI Reputation.
 */

// Lucide icon bodies, same as the app's.
const ICONS = {
  'panel-left': <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></>,
  'chevrons-up-down': <><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></>,
  settings: <><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx="12" cy="12" r="3" /></>,
  'layout-dashboard': <><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></>,
  sparkles: <><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></>,
  map: <><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  eye: <><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></>,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  search: <><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></>,
  pencil: <><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
  'link-2': <><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></>,
};

function Icon({ name, size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function FoldRow({ icon, label, open }) {
  return (
    <div className="dsb2__fold">
      <span className="dsb2__fold-ico"><Icon name={icon} size={13} /></span>
      <span className="dsb2__label">{label}</span>
      <Icon name="chevron-right" size={11} className={`dsb2__chev${open ? ' dsb2__chev--open' : ''}`} />
    </div>
  );
}

export default function DashSidebar({ product = 0 }) {
  const { t } = useLang();
  const s = t('dashboard').sidebar;
  const base = import.meta.env.BASE_URL;

  return (
    <aside className="dsb2" aria-hidden="true">
      <div className="dsb2__inner">
        <div className="dsb2__header">
          <img className="dsb2__logo" src={`${base}Logo-Poliris-1.png`} alt="" />
          <Icon name="panel-left" size={15} className="dsb2__toggle" />
        </div>

        <div className="dsb2__dotted" />
        <div className="dsb2__proj-row">
          <div className="dsb2__proj">
            <img className="dsb2__proj-logo" src={`${base}sony-com-logo.png`} alt="" />
            <div className="dsb2__proj-meta">
              <div className="dsb2__proj-name">Sony</div>
              <div className="dsb2__proj-sub">{s.activeProject}</div>
            </div>
            <Icon name="chevrons-up-down" size={12} className="dsb2__muted" />
          </div>
          <div className="dsb2__proj-settings"><Icon name="settings" size={13} /></div>
        </div>
        <div className="dsb2__pad">
          <div className="dsb2__mode">
            <span className="dsb2__mode-seg dsb2__mode-seg--on"><Icon name="layout-dashboard" size={12} />{s.dashboard}</span>
            <span className="dsb2__mode-seg"><Icon name="sparkles" size={12} />{s.poliAI}</span>
          </div>
        </div>
        <div className="dsb2__pad">
          <div className="dsb2__roadmap"><Icon name="map" size={13} /><span>{s.roadmap}</span></div>
        </div>
        <div className="dsb2__dotted" />

        <div className="dsb2__scroll">
          <div className="dsb2__section">
            <div className="dsb2__sec-head"><span>{s.measure}</span><Icon name="plus" size={12} className="dsb2__muted" /></div>
            <FoldRow icon="eye" label={s.aiReputation} open />
            <div className="dsb2__sub-list">
              {s.products.map((name, i) => (
                <div key={name} className={`dsb2__prod${i === product ? ' dsb2__prod--on' : ''}`}>
                  <span className="dsb2__chip">{name[0].toUpperCase()}</span>
                  <span className="dsb2__prod-lbl">{name}</span>
                </div>
              ))}
            </div>
            <FoldRow icon="search" label={s.keywords} />
            <FoldRow icon="globe" label={s.sites} />
          </div>

          <div className="dsb2__dotted" />
          <div className="dsb2__section">
            <div className="dsb2__sec-head"><span>{s.action}</span></div>
            <FoldRow icon="pencil" label={s.content} />
            <div className="dsb2__fold">
              <span className="dsb2__fold-ico"><Icon name="rocket" size={13} /></span>
              <span className="dsb2__label">{s.implementation}</span>
            </div>
            <FoldRow icon="link-2" label={s.citations} />
          </div>
        </div>
      </div>
    </aside>
  );
}
