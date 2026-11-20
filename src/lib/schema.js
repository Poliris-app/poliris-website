// Structured data (schema.org JSON-LD) for every prerendered page.
//
// Rule for everything in this file: schema only states what the page itself
// shows. Company facts come from the Legal Notice and Privacy Policy, product
// names from the navigation, prices from the pricing cards, Q&As from the
// rendered FAQs. When the visible copy changes, the schema follows it, because
// both read the same data.
//
// Seo.jsx renders one @graph per page. Nodes reference each other by @id so
// Google and AI crawlers can resolve "Poliris" to one entity across the site.
import { SITE_URL, SITE_NAME, canonicalUrl, getMeta } from '../seo';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

// Company facts as published on /mentions-legales and /privacy. Edit here only.
export const ORG_FACTS = {
  legalName: 'POLIRIS',
  address: {
    streetAddress: '61 rue de Lyon',
    postalCode: '75012',
    addressLocality: 'Paris',
    addressCountry: 'FR',
  },
  // Google asks for a logo of at least 112x112 px; this wordmark is 218x54.
  // Swap in a square PNG when one exists.
  logo: `${SITE_URL}/Logo-Poliris-1.png`,
  // Only verified, live profiles (LinkedIn, G2, Crunchbase...). Never guess.
  sameAs: [],
};

// Pages that present the product itself.
const SOFTWARE_PAGES = new Set(['home', 'pricing', 'visibility', 'sentiment', 'technical-audit', 'content-writing']);

const CRUMB_LABELS = {
  en: { home: 'Home', blog: 'Blog', docs: 'Documentation' },
  fr: { home: 'Accueil', blog: 'Blog', docs: 'Documentation' },
};

/** "Pricing & Plans | Poliris" -> "Pricing & Plans" ("| Poliris Docs" too) */
export const stripBrand = (title = '') => String(title).replace(/\s*[|·–-]\s*Poliris(\s+Docs)?\s*$/i, '').trim();

/** Heading id for a glossary term, shared by GlossaryPage and the schema. */
export const termSlug = (term) =>
  String(term)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Plain text from locale values: strings, arrays, React elements (glossary
 * definitions use <em>), and the FAQ answer shape {intro, bullets, sections,
 * callout}. Whitespace is collapsed so schema text matches what users read.
 */
export function toText(value) {
  const walk = (v) => {
    if (v == null || typeof v === 'boolean') return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (Array.isArray(v)) return v.map(walk).join(' ');
    if (typeof v === 'object' && 'props' in v) return walk(v.props?.children);
    if (typeof v === 'object') {
      const bullet = (b) => [walk(b?.label), walk(b?.text)].filter(Boolean).join(' ');
      return [
        walk(v.intro),
        ...(v.bullets ?? []).map(bullet),
        ...(v.sections ?? []).map((s) => [walk(s.label), walk(s.intro), ...(s.bullets ?? []).map(bullet)].join(' ')),
        walk(v.callout),
      ].join(' ');
    }
    return '';
  };
  return walk(value).replace(/\s+/g, ' ').trim();
}

export function organizationNode(lang) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: ORG_FACTS.legalName,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: ORG_FACTS.logo, width: 218, height: 54 },
    description: getMeta(lang, 'home').description,
    address: { '@type': 'PostalAddress', ...ORG_FACTS.address },
    ...(ORG_FACTS.sameAs.length ? { sameAs: ORG_FACTS.sameAs } : {}),
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: ['en', 'fr'],
    publisher: { '@id': ORG_ID },
  };
}

/**
 * The product. featureList uses the product names from the navigation menu.
 * Offers are added on /pricing only, where the prices are visible.
 */
export function softwareNode(lang, { features = [], offers } = {}) {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/`,
    description: getMeta(lang, 'home').description,
    publisher: { '@id': ORG_ID },
    ...(features.length ? { featureList: features } : {}),
    ...(offers?.length ? { offers } : {}),
  };
}

/**
 * One Offer per plan card, monthly billing, in both currencies the pricing
 * page toggles between. `plans` are the localized cards (name, desc),
 * `meta` the PLAN_META rows (tier, monthly, eurMonthly), matched by index.
 */
export function planOffers(lang, plans = [], meta = []) {
  const url = canonicalUrl(lang, 'pricing');
  return meta.flatMap((m, i) => {
    const name = plans[i]?.name;
    if (!name) return [];
    return [
      ['USD', m.monthly],
      ['EUR', m.eurMonthly],
    ].map(([currency, price]) => ({
      '@type': 'Offer',
      name,
      price: String(price),
      priceCurrency: currency,
      url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(price),
        priceCurrency: currency,
        unitCode: 'MON',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        // The pricing page shows prices excluding tax.
        valueAddedTaxIncluded: false,
      },
    }));
  });
}

/** FAQPage from rendered Q&As. Skips any item without both a question and an answer. */
export function faqPageNode(lang, page, items = []) {
  const url = canonicalUrl(lang, page);
  const mainEntity = items
    .map((it) => ({ q: toText(it.q), a: toText(it.a) }))
    .filter((it) => it.q && it.a)
    .map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    }));
  if (!mainEntity.length) return null;
  return { '@type': 'FAQPage', '@id': `${url}#faq`, url, inLanguage: lang, mainEntity };
}

/** DefinedTermSet for the glossary; each term links to its heading anchor. */
export function definedTermSetNode(lang, page, name, terms = []) {
  const url = canonicalUrl(lang, page);
  const setId = `${url}#terms`;
  const seen = new Set();
  const hasDefinedTerm = terms
    .map((t) => ({ name: toText(t.term), description: toText(t.def) }))
    .filter((t) => t.name && !seen.has(termSlug(t.name)) && seen.add(termSlug(t.name)))
    .map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${url}#${termSlug(t.name)}`,
      name: t.name,
      ...(t.description ? { description: t.description } : {}),
      url: `${url}#${termSlug(t.name)}`,
      inDefinedTermSet: { '@id': setId },
    }));
  return { '@type': 'DefinedTermSet', '@id': setId, name, url, inLanguage: lang, hasDefinedTerm };
}

function breadcrumbNode(lang, page, title) {
  const labels = CRUMB_LABELS[lang] ?? CRUMB_LABELS.en;
  const crumbs = [{ name: labels.home, url: canonicalUrl(lang, 'home') }];
  const [section] = page.split('/');
  if (page.includes('/') && (section === 'blog' || section === 'docs')) {
    crumbs.push({ name: labels[section], url: canonicalUrl(lang, section) });
  }
  crumbs.push({ name: stripBrand(title), url: canonicalUrl(lang, page) });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(lang, page)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  };
}

/**
 * The full @graph for one page: Organization and WebSite everywhere, a
 * WebPage, a breadcrumb (not on the home page), the product on product
 * pages, BlogPosting on blog posts, TechArticle on docs chapters, plus any
 * nodes the page passes in.
 */
export function buildPageGraph({ lang, page, title, description, type, modified, post, features, extra = [] }) {
  const url = canonicalUrl(lang, page);
  const isHome = page === 'home';
  const isPost = type === 'article' && page.startsWith('blog/');
  const isDoc = page.startsWith('docs/');

  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: stripBrand(title),
    description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    ...(isHome ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    ...(SOFTWARE_PAGES.has(page) ? { about: { '@id': SOFTWARE_ID } } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };

  const nodes = [organizationNode(lang), websiteNode(), webPage];
  if (!isHome) nodes.push(breadcrumbNode(lang, page, title));
  // Docs chapters describe the product too, and their TechArticle points at it.
  if (SOFTWARE_PAGES.has(page) || isDoc) nodes.push(softwareNode(lang, { features }));

  if (isPost) {
    nodes.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: stripBrand(title),
      description,
      url,
      inLanguage: lang,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: `${SITE_URL}/og-image.png`,
      // The byline on every post reads "Poliris Team".
      author: { '@type': 'Organization', name: 'Poliris Team', url: `${SITE_URL}/`, parentOrganization: { '@id': ORG_ID } },
      publisher: { '@id': ORG_ID },
      ...(post?.dateValue ? { datePublished: post.dateValue } : {}),
      ...(modified ? { dateModified: modified } : {}),
    });
  }

  if (isDoc) {
    nodes.push({
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: stripBrand(title),
      description,
      url,
      inLanguage: lang,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      about: { '@id': SOFTWARE_ID },
      publisher: { '@id': ORG_ID },
      ...(modified ? { dateModified: modified } : {}),
    });
  }

  // A page node with the same @id as a default node is merged into it
  // (pricing adds offers to the product node); other nodes are appended.
  const graph = [...nodes];
  for (const node of extra.filter(Boolean)) {
    const i = node['@id'] ? graph.findIndex((n) => n['@id'] === node['@id']) : -1;
    if (i >= 0) graph[i] = { ...graph[i], ...node };
    else graph.push(node);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** JSON for a <script> tag. Escapes "<" so no string can close the tag early. */
// "$" is escaped too: the static build inserts this text with a string
// replace, where "$1", "$&" and the like are patterns, so a price such as
// "$10" in an FAQ answer would pull page markup into the JSON.
export const serializeGraph = (graph) =>
  JSON.stringify(graph).replace(/</g, '\\u003c').replace(/\$/g, '\\u0024');
