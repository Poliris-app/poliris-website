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
  docs: 'docs',
};

export const LANGS = ['en', 'fr'];

// Individual blog post slugs to prerender (relative to /:lang/blog/).
// Keep in sync with the POST_MAP keys in src/pages/BlogPostPage.jsx.
export const BLOG_POST_SLUGS = [
  'why-seo-is-the-cornerstone-of-geo-success',
  'death-of-traditional-search-geo-priority',
];

const META = {
  en: {
    home: {
      title: 'Poliris',
      description:
        'Understand and manage how AI sees your brand. Track your visibility across AI engines, audit your site, and ship the fixes — product by product.',
    },
    visibility: {
      title: 'AI Visibility | Poliris',
      description:
        "Track where your brand shows up in AI answers across ChatGPT, Gemini, Perplexity and more — and see where you're losing ground.",
    },
    sentiment: {
      title: 'AI Sentiment | Poliris',
      description:
        'Monitor how AI engines talk about your brand and catch anything wrong, cautious or harmful before it spreads.',
    },
    'technical-audit': {
      title: 'Technical Audit | Poliris',
      description:
        'Identify and fix the technical issues that stop AI engines from reading, understanding and recommending your site.',
    },
    'content-writing': {
      title: 'Content Writing | Poliris',
      description:
        'Generate AI-optimised pages and structured data that get your brand recommended by AI engines.',
    },
    blog: {
      title: 'Blog | Poliris',
      description:
        'Insights, guides and strategy on AI visibility and Generative Engine Optimisation (GEO).',
    },
    faqs: {
      title: 'FAQs | Poliris',
      description:
        "Common questions about Poliris, Kate and managing your brand's visibility in AI.",
    },
    glossary: {
      title: 'Glossary | Poliris',
      description:
        'Key terms in AI search and Generative Engine Optimisation (GEO), clearly explained.',
    },
    demo: {
      title: 'Get a Demo | Poliris',
      description:
        'Book a 1-hour live demo, run a free GEO audit, or reach out about agency partnership. We reply in under 4 hours.',
    },
    docs: {
      title: 'Documentation | Poliris',
      description: 'Poliris platform documentation — guides, references and how-tos.',
    },
  },
  fr: {
    home: {
      title: 'Poliris',
      description:
        "Comprenez et pilotez la façon dont l'IA voit votre marque. Suivez votre visibilité sur les moteurs IA, auditez votre site et déployez les correctifs — produit par produit.",
    },
    visibility: {
      title: 'Visibilité IA | Poliris',
      description:
        'Suivez où votre marque apparaît dans les réponses IA (ChatGPT, Gemini, Perplexity…) et repérez où vous perdez du terrain.',
    },
    sentiment: {
      title: 'Sentiment IA | Poliris',
      description:
        "Surveillez la façon dont les moteurs IA parlent de votre marque et détectez tout propos erroné, prudent ou nuisible.",
    },
    'technical-audit': {
      title: 'Audit Technique | Poliris',
      description:
        "Identifiez et corrigez les problèmes techniques qui empêchent les moteurs IA de lire et recommander votre site.",
    },
    'content-writing': {
      title: 'Rédaction IA | Poliris',
      description:
        "Générez des pages optimisées pour l'IA et des données structurées pour faire recommander votre marque par les moteurs IA.",
    },
    blog: {
      title: 'Blog | Poliris',
      description:
        'Insights, guides et stratégie sur la visibilité IA et le Generative Engine Optimisation (GEO).',
    },
    faqs: {
      title: 'FAQ | Poliris',
      description:
        'Questions courantes sur Poliris, Kate et la gestion de la visibilité de votre marque dans l\'IA.',
    },
    glossary: {
      title: 'Glossaire | Poliris',
      description:
        'Les termes clés de la recherche IA et du Generative Engine Optimisation (GEO), expliqués simplement.',
    },
    demo: {
      title: 'Obtenir une démo | Poliris',
      description:
        "Réservez une démo d'1 heure, lancez un audit GEO gratuit ou contactez-nous pour un partenariat agence. Nous répondons en moins de 4 heures.",
    },
    docs: {
      title: 'Documentation | Poliris',
      description: 'Documentation de la plateforme Poliris — guides, références et tutoriels.',
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
  const slug = PAGE_SLUGS[pageKey] ?? '';
  return slug ? `${SITE_URL}/${lang}/${slug}` : `${SITE_URL}/${lang}/`;
}
