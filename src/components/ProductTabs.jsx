import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import clsx from 'clsx';

const tabs = [
  {
    id: 'visibility',
    label: 'Visibilité multi-LLM',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Analyse de visibilité',
    description:
      "Découvrez si vous êtes cité ou ignoré par les IA et comparez avec vos concurrents",
    features: [
      'Score de visibilité par LLM (ChatGPT, Gemini, Claude…)',
      'Classement face à vos concurrents directs',
      'Requêtes sur lesquelles vous apparaissez   ou non',
      'Évolution mensuelle de vos citations',
    ],
  },
  {
    id: 'sentiment',
    label: 'Sentiment des IA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Sentiment des IA',
    description:
      "Comprenez comment les IA décrivent et perçoivent votre marque",
    features: [
      'Qualificatifs positifs et négatifs associés à votre marque',
      'Radar de perception par attribut (innovation, fiabilité…)',
      'Comparaison avant / après optimisation',
      'Détection des biais de perception',
    ],
  },
  {
    id: 'accessibility',
    label: 'Confiance & Accessibilité',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Confiance & Accessibilité',
    description:
      "Évaluez dans quelle mesure vos contenus sont compréhensibles et utilisables par les LLM",
    features: [
      'Analyse de la structure et de la lisibilité du site',
      'Couverture des données structurées (schema.org)',
      'Qualité et cohérence des signaux de réputation',
      'Recommandations priorisées par impact',
    ],
  },
];

export default function ProductTabs() {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();
  const tab = tabs[active];

  return (
    <section id="audit" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal mb-10">
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-3">
            Votre audit GEO complet
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Un audit interactif et sur mesure grâce à nos outils experts
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={clsx(
                'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border',
                active === i
                  ? 'bg-[#1e3893] text-white border-[#1e3893]'
                  : 'bg-gray-100 text-gray-600 border-transparent hover:border-gray-300'
              )}
            >
              <span
                className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0',
                  active === i ? 'bg-white/20' : 'bg-gray-200'
                )}
              >
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display font-semibold text-2xl md:text-3xl mb-4">
              {tab.title}
            </h3>
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

          {/* Visual placeholder */}
          <div className="bg-gradient-to-br from-[#1e3893]/8 to-[#5e74c4]/10 rounded-2xl h-64 md:h-80 flex items-center justify-center border border-[#1e3893]/10">
            <div className="text-center text-[#1e3893]/40">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01" />
              </svg>
              <p className="text-sm font-medium">Aperçu de l&rsquo;interface</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
