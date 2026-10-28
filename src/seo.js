// Centralized SEO metadata for every static route, per language.
// Copy is grounded in the product positioning used across the site
// (see src/locales/*.js): "Brand intelligence for the AI era".

export const SITE_URL = 'https://poliris.io';
export const SITE_NAME = 'Poliris';

// Maps a page key to its URL slug (relative to /:lang/).
export const PAGE_SLUGS = {
  home: '',
  visibility: 'visibility',
  sentiment: 'sentiment',
  'technical-audit': 'technical-audit',
  'content-writing': 'content-writing',
  blog: 'blog',
  faqs: 'faqs',
  glossary: 'glossary',
  demo: 'demo',
  pricing: 'pricing',
  docs: 'docs',
  privacy: 'privacy',
  terms: 'terms',
  'mentions-legales': 'mentions-legales',
};

export const LANGS = ['en', 'fr'];

// Individual blog post slugs to prerender (relative to /:lang/blog/).
// Keep in sync with the POST_MAP keys in src/pages/BlogPostPage.jsx.
export const BLOG_POST_SLUGS = [
  'why-seo-is-the-cornerstone-of-geo-success',
  'death-of-traditional-search-geo-priority',
  'entity-based-seo',
  'beyond-keywords-ai-content-generation',
  'blueprint-for-high-visibility-content',
  'ai-brand-visibility-strategies',
  'poliris-comparison',
];

const META = {
  en: {
    home: {
      title: 'AI Search Visibility, GEO & AI SEO Tool | Poliris',
      description:
        "Track your brand's visibility across AI search engines, perform technical AI SEO & GEO audits, and fix issues fast. The complete AI search platform.",
    },
    visibility: {
      title: 'AI Share of Voice & GEO Visibility Analytics | Poliris',
      description:
        "Track your brand's share of voice in ChatGPT, Claude, Perplexity and Gemini. See the sources behind AI answers and benchmark competitors.",
    },
    sentiment: {
      title: 'AI Brand Sentiment & Reputation Analytics | Poliris',
      description:
        'See how ChatGPT, Perplexity, Gemini and DeepSeek describe your brand. Track AI sentiment, monitor your reputation and fix perception gaps.',
    },
    'technical-audit': {
      title: 'AI Technical SEO Audit & Automated Site Fixes | Poliris',
      description:
        'Run technical SEO tests for search engines & AI bots like ChatGPT and Perplexity. Turn complex site audit data into automated, 1-click live fixes.',
    },
    'content-writing': {
      title: 'AI Content Writer for GEO, SEO & Answer Engines | Poliris',
      description:
        'Generate, score, and publish brand-aware content built for GEO and SEO. Close AI visibility gaps and earn citations in ChatGPT, Perplexity, & Claude.',
    },
    blog: {
      title: 'AI Visibility & GEO Insights, AI SEO Blog | Poliris',
      description:
        'Explore field notes, frameworks, and strategies on AI visibility, GEO, and AI SEO. Learn how to optimize your brand for ChatGPT, Perplexity, and Gemini.',
    },
    faqs: {
      title: 'Poliris FAQs: AI Visibility, GEO & Pricing Questions',
      description:
        "Common questions about Poliris, Kate and managing your brand's visibility in AI.",
    },
    glossary: {
      title: 'AI Search & GEO Glossary: Key Terms Explained | Poliris',
      description:
        'Key terms in AI search and Generative Engine Optimisation (GEO), clearly explained.',
    },
    demo: {
      title: 'Book a Live Demo of the AI Visibility Platform | Poliris',
      description:
        'Book a 1-hour live demo, run a free GEO audit, or reach out about agency partnership. We reply in under 4 hours.',
    },
    pricing: {
      title: 'Pricing & Plans for AI Visibility Tracking | Poliris',
      description:
        'Choose how much AI visibility coverage you need. Every plan includes sentiment tracking, competitor benchmarking, and real-time GEO scoring.',
    },
    docs: {
      title: 'Poliris Documentation: Guides for AI Visibility & GEO',
      description: 'Guides and reference for Poliris: set up AI visibility audits, run technical SEO audits, plan your roadmap and connect your website.',
    },
    privacy: {
      title: 'Privacy Policy: How Poliris Protects Your Data',
      description: 'How Poliris collects, uses, and protects personal data across the website, platform, and WordPress plugin.',
    },
    terms: {
      title: 'Terms of Service for Using the Poliris Platform',
      description: 'The terms governing access to and use of the Poliris platform and WordPress plugin.',
    },
    // English translation of the French legal notice — the French version
    // at /fr/mentions-legales remains the legally operative one (LCEN is a
    // French-language disclosure requirement); this is informational.
    'mentions-legales': {
      title: 'Legal Notice: Publisher & Hosting Details | Poliris',
      description: 'Legal notice for poliris.io: publisher, publication director, hosting provider, intellectual property and governing law.',
    },
  },
  fr: {
    home: {
      title: "Visibilité IA, outil GEO et SEO pour l'IA | Poliris",
      description:
        'Suivez la visibilité de votre marque dans les moteurs IA, auditez votre site et déployez les correctifs, produit par produit.',
    },
    visibility: {
      title: 'Visibilité IA et part de voix dans les réponses IA | Poliris',
      description:
        'Suivez où votre marque apparaît dans les réponses IA (ChatGPT, Gemini, Perplexity…) et repérez où vous perdez du terrain.',
    },
    sentiment: {
      title: 'Sentiment IA : la réputation de votre marque | Poliris',
      description:
        "Surveillez la façon dont les moteurs IA parlent de votre marque et détectez tout propos erroné, prudent ou nuisible.",
    },
    'technical-audit': {
      title: 'Audit technique SEO et IA, correctifs en un clic | Poliris',
      description:
        "Identifiez et corrigez les problèmes techniques qui empêchent les moteurs IA de lire et recommander votre site.",
    },
    'content-writing': {
      title: 'Rédaction IA pour le GEO et le SEO | Poliris',
      description:
        "Générez des pages optimisées pour l'IA et des données structurées pour faire recommander votre marque par les moteurs IA.",
    },
    blog: {
      title: 'Blog GEO et SEO IA : stratégies de visibilité | Poliris',
      description:
        'Insights, guides et stratégie sur la visibilité IA et le Generative Engine Optimisation (GEO).',
    },
    faqs: {
      title: 'FAQ Poliris : visibilité IA, GEO et tarifs',
      description:
        'Questions courantes sur Poliris, Kate et la gestion de la visibilité de votre marque dans l\'IA.',
    },
    glossary: {
      title: 'Glossaire de la recherche IA et du GEO | Poliris',
      description:
        'Les termes clés de la recherche IA et du Generative Engine Optimisation (GEO), expliqués simplement.',
    },
    demo: {
      title: 'Demander une démo de Poliris, plateforme GEO',
      description:
        "Réservez une démo d'1 heure, lancez un audit GEO gratuit ou contactez-nous pour un partenariat agence. Nous répondons en moins de 4 heures.",
    },
    pricing: {
      title: 'Tarifs et forfaits de suivi de la visibilité IA | Poliris',
      description:
        'Choisissez votre couverture de visibilité IA. Chaque forfait inclut le suivi du sentiment, le benchmark concurrentiel et le score GEO.',
    },
    docs: {
      title: 'Documentation Poliris : guides de visibilité IA et GEO',
      description: "Guides et référence de Poliris : configurer les audits de visibilité IA, lancer l'audit technique, planifier la roadmap, connecter votre site.",
    },
    privacy: {
      title: 'Politique de confidentialité | Poliris',
      description: 'Comment Poliris collecte, utilise, et protège les données personnelles sur le site, la plateforme, et le plugin WordPress.',
    },
    terms: {
      title: "Conditions Générales d'Utilisation | Poliris",
      description: "Les conditions régissant l'accès à la plateforme Poliris et au plugin WordPress.",
    },
    'mentions-legales': {
      title: 'Mentions légales : éditeur et hébergement | Poliris',
      description: 'Mentions légales de poliris.io : éditeur, directeur de la publication, hébergeur, propriété intellectuelle et droit applicable.',
    },
  },
};

export function getMeta(lang, pageKey) {
  const l = META[lang] ? lang : 'en';
  return META[l][pageKey] ?? META[l].home;
}

// Builds the canonical URL for a (lang, pageKey) pair.
// Home keeps a trailing slash (/en/); sub-pages have none (/en/visibility).
export function canonicalUrl(lang, pageKey) {
  // Documentation chapters ("docs/<chapter>") and blog posts ("blog/<slug>")
  // are real routes with the same slug in every language, so the path is the key.
  if (typeof pageKey === 'string' && /^(docs|blog)\//.test(pageKey)) return `${SITE_URL}/${lang}/${pageKey}`;
  const slug = PAGE_SLUGS[pageKey] ?? '';
  return slug ? `${SITE_URL}/${lang}/${slug}` : `${SITE_URL}/${lang}/`;
}
