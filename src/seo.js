// Centralized SEO metadata for every static route, per language.
// Copy is grounded in the product positioning used across the site
// (see src/locales/*.js): "Brand intelligence for the AI era".

export const SITE_URL = 'https://www.poliris.io';
export const SITE_NAME = 'Poliris';
// TODO: replace with a dedicated 1200x630 social image once designed.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/nike_landingpage.png`;

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
};

export const LANGS = ['en', 'fr'];

const META = {
  en: {
    home: {
      title: 'Poliris — Brand intelligence for the AI era',
      description:
        'Understand and manage how AI sees your brand. Track your visibility across AI engines, audit your site, and ship the fixes — product by product.',
    },
    visibility: {
      title: 'AI Visibility — Track your share of voice across AI engines | Poliris',
      description:
        "Track where your brand shows up in AI answers across ChatGPT, Gemini, Perplexity and more — and see where you're losing ground.",
    },
    sentiment: {
      title: 'AI Sentiment — See how AI engines describe your brand | Poliris',
      description:
        'Monitor how AI engines talk about your brand and catch anything wrong, cautious or harmful before it spreads.',
    },
    'technical-audit': {
      title: 'Technical Audit — Fix what blocks AI from reading your site | Poliris',
      description:
        'Identify and fix the technical issues that stop AI engines from reading, understanding and recommending your site.',
    },
    'content-writing': {
      title: 'Content Writing — Generate AI-optimised pages & structured data | Poliris',
      description:
        'Generate AI-optimised pages and structured data that get your brand recommended by AI engines.',
    },
    blog: {
      title: 'Blog — AI visibility & GEO strategy | Poliris',
      description:
        'Insights, guides and strategy on AI visibility and Generative Engine Optimisation (GEO).',
    },
    faqs: {
      title: 'FAQs | Poliris',
      description:
        "Common questions about Poliris, Kate and managing your brand's visibility in AI.",
    },
    glossary: {
      title: 'Glossary — AI search & GEO terms explained | Poliris',
      description:
        'Key terms in AI search and Generative Engine Optimisation (GEO), clearly explained.',
    },
  },
  fr: {
    home: {
      title: "Poliris — Intelligence de marque pour l'ère de l'IA",
      description:
        "Comprenez et pilotez la façon dont l'IA voit votre marque. Suivez votre visibilité sur les moteurs IA, auditez votre site et déployez les correctifs — produit par produit.",
    },
    visibility: {
      title: 'Visibilité IA — Suivez votre part de voix sur les moteurs IA | Poliris',
      description:
        'Suivez où votre marque apparaît dans les réponses IA (ChatGPT, Gemini, Perplexity…) et repérez où vous perdez du terrain.',
    },
    sentiment: {
      title: "Sentiment IA — Voyez comment l'IA décrit votre marque | Poliris",
      description:
        "Surveillez la façon dont les moteurs IA parlent de votre marque et détectez tout propos erroné, prudent ou nuisible.",
    },
    'technical-audit': {
      title: "Audit Technique — Corrigez ce qui bloque l'IA sur votre site | Poliris",
      description:
        "Identifiez et corrigez les problèmes techniques qui empêchent les moteurs IA de lire et recommander votre site.",
    },
    'content-writing': {
      title: 'Rédaction IA — Pages optimisées IA & données structurées | Poliris',
      description:
        "Générez des pages optimisées pour l'IA et des données structurées pour faire recommander votre marque par les moteurs IA.",
    },
    blog: {
      title: 'Blog — Visibilité IA & stratégie GEO | Poliris',
      description:
        'Insights, guides et stratégie sur la visibilité IA et le Generative Engine Optimisation (GEO).',
    },
    faqs: {
      title: 'FAQ | Poliris',
      description:
        'Questions courantes sur Poliris, Kate et la gestion de la visibilité de votre marque dans l\'IA.',
    },
    glossary: {
      title: 'Glossaire — Les termes de la recherche IA & du GEO | Poliris',
      description:
        'Les termes clés de la recherche IA et du Generative Engine Optimisation (GEO), expliqués simplement.',
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
