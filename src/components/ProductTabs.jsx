import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import clsx from 'clsx';

const TAB_ICONS = [
  <svg key="vis" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>,
  <svg key="sent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  <svg key="acc" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
];

export default function ProductTabs() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const tabsData = t('productTabs.tabs');
  const tab = tabsData[active];

  return (
    <section id="audit" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-10">
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-3">
            {t('productTabs.heading')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {t('productTabs.sub')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {tabsData.map((tb, i) => (
            <button
              key={tb.id}
              onClick={() => setActive(i)}
              className={clsx(
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border',
                active === i
                  ? 'bg-[#1e3893] text-white border-[#1e3893]'
                  : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
              )}
            >
              <span className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0', active === i ? 'bg-white/20' : 'bg-gray-200')}>
                {TAB_ICONS[i]}
              </span>
              {tb.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display font-semibold text-2xl md:text-3xl mb-4">{tab.title}</h3>
            <p className="text-gray-600 mb-6">{tab.description}</p>
            <ul className="space-y-3">
              {tab.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#1e3893] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1e3893]/8 to-[#5e74c4]/10 rounded-2xl h-64 md:h-80 flex items-center justify-center border border-[#1e3893]/10">
            <div className="text-center text-[#1e3893]/40">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01" />
              </svg>
              <p className="text-sm font-medium">{t('productTabs.preview')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
