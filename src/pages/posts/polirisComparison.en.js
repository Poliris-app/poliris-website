// English copy for the Poliris comparison post (rendered by
// PolirisComparisonArticle.jsx). Competitor data: public pricing pages and
// documentation, checked October 24-26, 2026 (see the "method" section).
//
// Table cells: 'y' included · 'p' partial, add-on or higher plan ·
// 'n' not mentioned · 'd' not disclosed · ['p', 'note'] status with a note ·
// '28.8B' text · { t: '$408', s: 'note' } text with a note.

import jsonLd from './polirisComparison.en.ld.json';

const P = 'Poliris';

export default {
  // Article, SoftwareApplication and FAQPage, verbatim from the source HTML.
  jsonLd,

  seo: {
    title: 'Poliris vs Semrush, Ahrefs & AI Trackers: 2026 Comparison',
    description: 'Technical audit, keywords, links, content and 10 AI engines: how Poliris compares with 18 SEO and GEO tools. Public prices checked in October 2026.',
  },

  ui: {
    back: 'Back to blog',
    onPage: 'On this page',
    progress: 'Reading progress',
    category: 'Comparison',
    updated: 'updated October 27, 2026',
    dateISO: '2026-10-27',
    swipe: 'Swipe the table to see every tool',
    does: 'What Poliris does',
    further: 'Where others go further.',
    colon: ': ',
    trial: 'Start free trial',
    demo: 'Book a demo',
    status: {
      y: 'Included',
      p: 'Partial, add-on or higher plan',
      n: 'Not mentioned',
      d: 'Not disclosed',
    },
    legend: {
      y: 'Included in the entry plan',
      p: 'Partial, add-on or higher plan',
      n: 'Not mentioned in public documentation',
      d: 'Not disclosed',
    },
  },

  hero: {
    title: 'Poliris comparison: technical audit, keywords and AI visibility',
    deck: [
      'Compared with Semrush, Ahrefs, Search Atlas, Screaming Frog, Peec AI, Qwairy and 12 other tools',
      'Poliris brings together the technical audit, Google keywords, links, content and AI visibility, and pushes fixes live to your site. Data on other tools comes from their public pages.',
    ],
    kpisLabel: 'Every module, from $29 a month',
    kpis: [
      { k: 'Technical audit', v: '150+', l: 'checks per page, for Google and AI crawlers' },
      { k: 'Google keywords', v: '8B+', l: 'keywords with volume and difficulty' },
      { k: 'Links', v: '330,000+', l: 'sites to publish a sponsored article, prices compared' },
      { k: 'AI visibility', v: '10', l: 'AI engines tracked on every plan' },
    ],
  },

  sections: [
    {
      id: 'overview',
      nav: 'Overview',
      eyebrow: 'Overview',
      title: 'Poliris vs SEO suites, crawlers and AI visibility trackers',
      lede: 'SEO suites cover keywords and links. Crawlers audit the site. AI visibility trackers measure how often a brand appears in AI answers. Poliris covers all three in one subscription.',
      claim: 'Of the 19 tools reviewed, Poliris is the only one that documents a full-site audit with AI crawler checks, fixes pushed live and a dated action plan.',
      tableLabel: 'Overview: Poliris vs eight tools',
      table: {
        minWidth: 1040,
        corner: 'Feature',
        colGroups: [['SEO suites', 3], ['Crawler', 1], ['AI visibility trackers', 4]],
        cols: [P, 'Semrush', 'Ahrefs', 'Search Atlas', 'Screaming Frog', 'Profound', 'Peec AI', 'Qwairy', 'Otterly.AI'],
        rows: [
          { group: 'Technical audit' },
          { label: 'Full-site crawl', cells: ['y', 'y', 'y', 'y', 'y', 'p', 'n', 'p', 'p'] },
          { label: 'AI crawler checks', cells: ['y', ['p', 'AI add-on'], 'n', 'n', 'p', 'y', 'y', 'y', 'y'] },
          { label: 'Fixes pushed live to the site', cells: ['y', 'n', ['p', '$200 add-on'], 'y', 'n', 'p', 'n', 'n', 'n'] },
          { group: 'Google keywords' },
          { label: 'Google keyword database', cells: ['8B+', '28.8B', '29B', '5.2B', 'n', 'n', 'n', 'n', 'n'] },
          { label: 'Google rank tracking', cells: [['y', 'unlimited'], 'y', 'y', 'y', 'n', 'n', 'n', 'n', 'n'] },
          { group: 'Links' },
          { label: 'Links to earn on AI-cited sites', cells: ['y', ['p', 'AI PR, $149'], 'p', 'y', 'n', 'n', 'p', 'y', 'p'] },
          { label: 'Sponsored article prices compared', cells: [['y', '330,000+ sites'], 'n', 'n', 'p', 'n', 'n', 'n', ['y', 'bought outside the tool'], 'n'] },
          { group: 'AI visibility' },
          { label: 'AI engines tracked', cells: ['10', { t: '4+', s: '$99 add-on' }, { t: '7', s: 'from Lite' }, { t: '3', s: 'from Growth' }, 'n', 'up to 9', '3 of your choice', '7', { t: '4', s: '+3 add-ons' }] },
          { label: 'Brand sentiment', cells: ['y', 'p', 'n', 'p', 'n', 'y', 'y', 'y', 'y'] },
          { label: 'Sources cited by AI', cells: ['y', 'p', 'p', 'p', 'n', 'y', 'y', 'y', 'y'] },
          { group: 'Content and action plan' },
          { label: 'Article writing', cells: ['y', ['p', '$60 add-on'], 'p', 'y', 'n', 'y', 'n', 'y', 'n'] },
          { label: 'Publishing to the site', cells: ['y', 'p', 'n', 'y', 'n', 'y', 'n', 'n', 'n'] },
          { label: 'Dated action plan, all workstreams', cells: ['y', 'p', 'n', 'p', 'n', 'p', 'p', 'p', 'p'] },
          { group: 'Access and pricing' },
          { label: 'Users included', cells: ['Unlimited', '1', '1', '1', '1', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
          { label: 'White label on your domain', cells: [['y', 'agency pack'], ['p', 'reports'], 'n', ['p', 'from $999'], 'n', 'n', ['p', 'Looker Studio'], ['p', 'on quote'], ['p', 'Looker Studio']] },
          { label: 'Monthly price for every module', cells: ['$29', { t: '$408', s: 'Starter + content + AI PR' }, { t: '$329', s: 'Lite + Patches' }, { t: '$199', s: 'Growth' }, { t: '$23', s: '$279/yr license' }, 'On quote', '$95', '€79', '$29'] },
        ],
      },
      fine: 'Public prices checked October 24 to 26, 2026, in US dollars excluding tax, billed monthly. The monthly price for every module is the cheapest combination of plans and add-ons that unlocks the tool\'s features listed in this table, excluding white label. Profound: Enterprise plan, its only published paid plan.',
    },

    {
      id: 'cost',
      nav: 'Total cost',
      eyebrow: 'Total cost',
      title: 'Five subscriptions or one platform',
      lede: 'SEO teams often use one tool per workstream. Each tool keeps its own data, which has to be exported and cross-checked by hand. Poliris brings these workstreams into one platform, on a single dataset.',
      before: {
        tag: 'Today: one tool per workstream',
        head: ['Workstream', 'Usual tool', 'Per month'],
        rows: [
          ['Technical audit', 'Screaming Frog', '$23'],
          ['Keywords and links', 'Semrush', '$139'],
          ['AI visibility', 'Peec AI', '$95'],
          ['Content', 'Surfer', '$59'],
          ['Fixes on the site', 'Search Atlas', '$99'],
          ['Action plan', 'Spreadsheet', ''],
        ],
        note: '+ exports and manual cross-checking',
        totalLabel: 'Total subscriptions',
        total: '≈ $415',
        stats: ['5 subscriptions', '5 data sources', '1 user included in 4 tools out of 5'],
      },
      after: {
        tag: 'With Poliris: one platform',
        modulesLabel: '6 modules',
        modules: [
          ['Technical audit', '150+ checks'],
          ['Google keywords', '8B+ keywords'],
          ['AI visibility', '10 engines'],
          ['Links and citations', '330,000+ sites'],
          ['Content', 'written by Kate'],
          ['Action plan', 'week by week'],
        ],
        dataset: 'One dataset',
        ai: { b: 'Dashboard and Poli AI', p: 'Six AI agents analyze all the data and set the priorities for the week.' },
        team: { b: 'Your team', p: 'Approves the actions. Fixes, articles and outreach go out from Poliris.' },
        totalLabel: 'Poliris subscription',
        total: 'From $29',
        stats: ['1 subscription', '1 dataset', 'Unlimited users'],
      },
      fine: 'Example stack. Public prices billed monthly, for one user, October 2026. Screaming Frog: $279 annual license, shown per month. Surfer: Discovery plan. Search Atlas: Starter plan.',
      does: [
        { b: 'One dataset', p: 'Audit, rankings, AI answers, links and content share the same data and the same prioritization rules. No exports are needed.' },
        { b: 'Six built-in AI agents', p: 'Strategy, technical audit, visibility, content, sentiment and competition. Each agent works on all the platform\'s data, which an AI connected to separate tools cannot do.' },
        { b: 'A dated action plan', p: 'Fixes, content and links are scheduled week by week. No other tool reviewed documents a dated schedule.' },
        { b: 'Unlimited users', p: 'On every plan. Semrush and Ahrefs charge $45 and $40 a month respectively for each extra user.' },
      ],
    },

    {
      id: 'audit',
      nav: 'Audit',
      eyebrow: 'Technical audit',
      title: 'Technical audit: Poliris vs Screaming Frog, Semrush, Ahrefs, Search Atlas and Qwairy',
      lede: 'All six tools audit a site. Only two check AI crawler access on their entry plan, and two push fixes live. Poliris is the only one that does both.',
      kpis: [
        { v: '150+', l: 'checks per page, for Google and AI crawlers' },
        { v: '3 families', l: 'page access, content access (including JavaScript), content quality' },
        { v: 'Scheduled', l: 'automatic re-audit' },
        { v: 'Live', l: 'fixes applied to the site, with history and rollback' },
      ],
      tableLabel: 'Technical audit: comparison',
      table: {
        corner: 'Criterion',
        cols: [P, 'Screaming Frog', 'Semrush', 'Ahrefs', 'Search Atlas', 'Qwairy'],
        rows: [
          { label: 'Full-site crawl', cells: ['y', 'y', 'y', 'y', 'y', ['p', 'page by page']] },
          { label: 'Number of checks', cells: ['150+', '300+', '140+', '170+', 'd', 'd'] },
          { label: 'AI crawler checks', cells: ['y', 'p', ['p', 'AI add-on'], 'n', 'n', 'y'] },
          { label: 'Scheduled re-crawl', cells: ['y', 'y', 'y', 'y', 'y', 'n'] },
          { label: 'Fixes pushed live', cells: ['y', 'n', 'n', ['p', '$200 add-on'], 'y', 'n'] },
        ],
      },
      does: [
        { b: 'The whole site, from the domain name', p: 'Cloud crawl, nothing to install. Very large sites are audited by sampling.' },
        { b: 'Three families of checks', p: 'Crawler access to the page, content access including JavaScript, and content quality, for Google and AI engines alike.' },
        { b: 'Fixes pushed live', p: 'Titles, headings, structured data and robots.txt, after approval, with history and rollback.' },
        { b: 'WordPress and Shopify first', p: 'On these CMSs the page is changed at the source, so every crawler sees the fix. On other sites, a JavaScript pixel applies it on page load.' },
      ],
      further: 'Screaming Frog, Sitebulb and Lumar remain better suited to crawling millions of pages or running custom extractions.',
    },

    {
      id: 'keywords',
      nav: 'Keywords',
      eyebrow: 'Google keywords',
      title: 'Google keywords: Poliris vs Semrush, Ahrefs, SE Ranking and Search Atlas',
      lede: 'AI visibility trackers have no keyword database. SEO suites have one and sell AI tracking as an add-on. Poliris includes both in the same plan.',
      kpis: [
        { v: '8B+', l: 'Google keywords with volume and difficulty' },
        { v: 'Unlimited', l: 'rankings tracked, daily or weekly' },
        { v: 'Any city', l: 'live Google results page' },
        { v: 'AI competitors', l: 'tracked on Google too' },
      ],
      tableLabel: 'Google keywords: comparison',
      table: {
        corner: 'Criterion',
        cols: [P, 'Semrush', 'Ahrefs', 'SE Ranking', 'Search Atlas', 'AI visibility trackers'],
        rows: [
          { label: 'Google keyword database', cells: ['8B+', '28.8B', '29B', '5.5B', '5.2B', 'n'] },
          { label: 'Volume and difficulty', cells: ['y', 'y', 'y', 'y', 'y', 'n'] },
          { label: 'Google results pages (SERP)', cells: [['y', 'live, any city'], 'y', 'y', 'y', 'y', 'n'] },
          { label: 'Rankings tracked', cells: [{ t: 'Unlimited', s: 'daily or weekly' }, { t: '500', s: 'daily' }, { t: '750', s: 'Lite, weekly' }, { t: '2,000', s: 'daily' }, { t: '2,000', s: 'daily' }, 'n'] },
          { label: 'AI competitors tracked on Google', cells: ['y', ['p', 'AI add-on'], 'p', ['p', 'separate product'], 'p', 'n'] },
        ],
      },
      does: [
        { b: 'More than 8 billion keywords', p: 'Volume and difficulty in every tracked country.' },
        { b: 'Live results pages', p: 'From any city: top 20, local pack and Google\'s AI answer.' },
        { b: 'Unlimited rankings', p: 'Tracked daily or weekly, alongside real clicks from Search Console.' },
        { b: 'Your AI competitors on Google', p: 'Competitors cited by AI engines are tracked on Google, offer by offer and market by market.' },
      ],
      further: 'Semrush and Ahrefs have larger databases, close to 29 billion keywords each.',
    },

    {
      id: 'links',
      nav: 'Links',
      eyebrow: 'Links and citations',
      title: 'Links: Poliris vs Qwairy, Semrush, Search Atlas, Peec AI and Ahrefs',
      lede: 'AI answers rely on a limited set of sites. Several tools identify these sources. Poliris also compares the price of a sponsored article on those sites and lets you order it.',
      kpis: [
        { v: '330,000+', l: 'sites with a sponsored article price' },
        { v: '15+', l: 'marketplaces compared' },
        { v: '3 statuses', l: 'active link, unlinked mention, absent' },
        { v: '1 tool', l: 'orders and outreach from Poliris' },
      ],
      tableLabel: 'Links and citations: comparison',
      table: {
        corner: 'Criterion',
        cols: [P, 'Qwairy', 'Semrush', 'Search Atlas', 'Peec AI', 'Ahrefs'],
        rows: [
          { label: 'AI-cited sites, ranked', cells: ['y', 'y', ['p', 'AI PR, $149'], 'p', 'y', 'p'] },
          { label: 'Sponsored article prices compared', cells: [['y', '330,000+ sites'], 'y', 'n', 'p', 'n', 'n'] },
          { label: 'Order from the tool', cells: ['y', 'n', 'n', 'p', 'n', 'n'] },
          { label: 'Outreach email from the tool', cells: ['y', 'n', 'y', 'y', 'p', 'n'] },
        ],
      },
      does: [
        { b: 'AI sources, ranked', p: 'Press, forums, blogs, review sites. For each site: authority, brand presence and competitors cited.' },
        { b: 'Prices compared', p: 'The price of a sponsored article on more than 330,000 sites, collected from 15+ marketplaces. Orders are placed in Poliris. Google asks for these links to carry the rel="sponsored" attribute.' },
        { b: 'Outreach', p: 'Link requests on existing mentions, product listings or partnership proposals. The email is sent from Poliris.' },
        { b: 'The sites that matter to AI', p: 'The analysis starts from the sources cited in your market, not from the whole web.' },
      ],
      further: 'Poliris has no backlink index. For a full backlink profile audit, Semrush and Ahrefs remain the reference.',
    },

    {
      id: 'ai',
      nav: 'AI visibility',
      eyebrow: 'AI visibility',
      title: 'AI visibility: Poliris vs Peec AI, Profound, Qwairy, Otterly.AI and Semrush',
      lede: 'Poliris tracks the ten engines below on every paid plan, with no extra cost per engine or per user. It adds Google rank tracking, a full-site audit and live fixes.',
      engines: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Microsoft Copilot', 'Grok', 'Mistral', 'DeepSeek', 'Google AI Overviews', 'Google AI Mode'],
      tableLabel: 'AI visibility: comparison',
      table: {
        corner: 'Criterion',
        cols: [P, 'Peec AI', 'Profound', 'Qwairy', 'Otterly.AI', 'Semrush'],
        rows: [
          { label: 'AI engines tracked', cells: ['10', '3 of your choice', 'up to 9', '7', { t: '4', s: '+3 add-ons' }, '4+'] },
          { label: 'Monthly price', cells: ['$29', '$95', 'On quote', '€79', '$29', { t: '$99', s: 'AI add-on' }] },
          { label: 'Included volume', cells: [{ t: '300', s: 'answers' }, { t: '≈ 4,500', s: 'answers' }, 'd', { t: '2,500', s: 'credits' }, { t: '≈ 1,800', s: 'answers' }, { t: '25', s: 'prompts' }] },
          { label: 'Google rankings in the same tool', cells: ['y', 'n', 'n', 'n', 'n', 'y'] },
          { label: 'Full-site audit', cells: ['y', 'n', ['p', 'known pages'], ['p', 'page by page'], ['p', 'page by page'], 'y'] },
          { label: 'Fixes pushed live', cells: ['y', 'n', ['p', 'pages for AI crawlers'], 'n', 'n', 'n'] },
        ],
      },
      does: [
        { b: 'Prompts built from your offers', p: 'Poliris analyzes the site, identifies each offer, its personas and markets, then writes buyers\' questions in the language of each market.' },
        { b: 'Sentiment by buying criterion', p: '31 criteria in 10 categories, including price, quality and service.' },
        { b: 'Sources and competitors', p: 'Pages cited by each engine, and competitors recommended instead of the brand.' },
        { b: '240+ countries, down to city level', p: 'A local business is tracked from its own city, in its own language.' },
      ],
      further: 'Peec AI and Otterly.AI include more answers per dollar. Profound, Peec AI and Qwairy also analyze server logs to measure AI crawler visits.',
    },

    {
      id: 'content',
      nav: 'Content',
      eyebrow: 'Content',
      title: 'Content: Poliris vs Surfer, Semrush, Search Atlas, Qwairy and Profound',
      lede: 'Kate, the Poliris writing agent, works from the brand\'s data: products, audiences, competitors and audit results.',
      kpis: [
        { v: '90 s', l: 'approximately, for a complete, sourced first draft' },
        { v: '/100', l: 'SEO, GEO and AEO score for every page' },
        { v: '1 click', l: 'publishing to WordPress, Shopify or Webflow' },
      ],
      tableLabel: 'Content: comparison',
      table: {
        corner: 'Criterion',
        cols: [P, 'Surfer', 'Semrush', 'Search Atlas', 'Qwairy', 'Profound'],
        rows: [
          { label: 'Article writing', cells: ['y', 'y', ['p', '$60 add-on'], 'y', 'y', 'y'] },
          { label: 'Page scoring', cells: [['y', 'out of 100, SEO and AI'], ['y', 'Content Score'], 'p', 'y', 'y', 'y'] },
          { label: 'Publishing to the site', cells: [['y', 'WordPress, Shopify, Webflow'], ['p', 'WordPress, Google Docs'], ['p', 'WordPress export'], 'y', 'n', 'y'] },
          { label: 'AI visibility in the same tool', cells: ['y', ['p', 'higher plan'], ['p', 'AI add-on'], ['p', 'from Growth'], 'y', 'y'] },
        ],
      },
      does: [
        { b: 'Topics drawn from your gaps', p: 'Kate writes on the questions where AI engines do not cite the brand, based on audit results and engine answers.' },
        { b: 'Scoring and rewriting', p: 'Automated checks, AI evaluation and hallucination detection. Kate rewrites only the weak passages.' },
        { b: 'Internal linking', p: 'Kate turns key phrases into links to your other pages. Site-wide suggestions are in beta.' },
        { b: 'Repurposing', p: 'The same content feeds documentation, LinkedIn, social media and newsletters.' },
      ],
    },

    {
      id: 'pricing',
      nav: 'Pricing',
      eyebrow: 'Pricing',
      title: 'Pricing: Poliris vs SEO suites',
      lede: 'To unlock all their modules, the closest suites cost $199 to $408 a month, and none of them covers every Poliris workstream.',
      bars: {
        title: 'Monthly price for every module',
        unit: 'US dollars, excluding tax, billed monthly',
        items: [
          { name: 'Semrush Starter + content + AI PR', sub: 'no live fixes', price: '$408', value: 408 },
          { name: 'Ahrefs Lite + Patches', sub: 'no AI crawler checks', price: '$329', value: 329 },
          { name: 'SE Ranking Core + AI add-on', sub: 'no live fixes or AI crawler checks', price: '$218', value: 218 },
          { name: 'Search Atlas Growth', sub: 'no AI crawler checks, 3 AI engines', price: '$199', value: 199 },
          { name: 'Poliris Growth', sub: 'every module, 1,500 AI answers', price: '$99', value: 99, own: true },
          { name: 'Poliris Starter', sub: 'every module, 300 AI answers', price: '$29', value: 29, own: true },
        ],
      },
      plans: [
        { name: 'Free', price: '$0', items: ['10 prompts', '2 AI engines'] },
        { name: 'Starter', price: '$29', per: 'per month', items: ['100 prompts', '300 AI answers', '10 AI engines'] },
        { name: 'Growth', price: '$99', per: 'per month', items: ['500 prompts', '1,500 AI answers', '10 AI engines'], hl: true },
        { name: 'Pro', price: '$189', per: 'per month', items: ['1,000 prompts', '3,000 AI answers', '10 AI engines'] },
      ],
      fine: 'Every paid Poliris plan includes all features except the agency white label, with unlimited users. Volumes differ: the suites have larger keyword and backlink databases, and several AI trackers include more answers per dollar.',
    },

    {
      id: 'agencies',
      nav: 'Agencies',
      eyebrow: 'For agencies',
      title: 'White label: Poliris vs SE Ranking, Qwairy, Search Atlas, Semrush and Peec AI',
      lede: 'The Poliris white label covers the whole platform, on the agency\'s own domain, with unlimited users.',
      tableLabel: 'Agency white label: comparison',
      table: {
        corner: '',
        cols: [P, 'SE Ranking', 'Qwairy', 'Search Atlas', 'Semrush', 'Peec AI'],
        rows: [
          { label: 'What carries your brand', cells: ['The whole platform and its reports', 'The whole platform and its reports', 'The whole platform', 'The suite and client portals', 'PDF reports', 'Looker Studio dashboards'] },
          { label: 'On your own domain', cells: ['y', 'y', 'y', 'y', ['p', 'reports'], 'n'] },
          { label: 'Price', cells: [{ t: '$69/mo', s: 'agency pack' }, { t: '+$69/mo', s: 'billed annually' }, 'On quote', 'From $999/mo', { t: '$20/mo', s: 'per report' }, 'd'] },
        ],
      },
      does: [
        { b: 'One workspace per client', p: 'Pooled usage and centralized billing.' },
        { b: 'Your domain, your colors', p: 'Audit, AI visibility, content, links and action plan carry the agency\'s logo.' },
        { b: 'Unlimited users', p: 'For the agency team and its clients.' },
        { b: 'Agency pack', p: '$69 a month for the full white label.' },
      ],
    },

    {
      id: 'method',
      nav: 'Methodology',
      eyebrow: 'Methodology',
      title: 'Methodology and sources',
      items: [
        ['Sources', 'public pricing pages, documentation and help centers of each vendor.'],
        ['Period', 'data collected October 24 to 26, 2026.'],
        ['Prices', 'US dollars, excluding tax, billed monthly; annual licenses are shown per month.'],
        ['Unpublished data', 'marked as not disclosed, never estimated.'],
        ['Profound', 'column based on the Enterprise plan, its only published paid plan.'],
        ['Criteria', 'those the market uses on its own comparison pages (Qwairy, Semrush, Ahrefs, Search Atlas).'],
        ['Poliris', 'data from poliris.io and the product team.'],
      ],
      fix: 'This page is updated regularly. For any correction request:',
      sourcesTitle: 'Sources',
      pricingSource: 'Poliris pricing',
      sources: [
        ['Semrush pricing', 'https://www.semrush.com/prices/'],
        ['Semrush AI Visibility Toolkit', 'https://fr.semrush.com/kb/1493-ai-toolkit'],
        ['Semrush vs Ahrefs', 'https://www.semrush.com/vs/semrush-vs-ahrefs/'],
        ['Ahrefs pricing', 'https://ahrefs.com/plans-pricing'],
        ['Ahrefs data', 'https://ahrefs.com/big-data/'],
        ['Ahrefs Patches', 'https://help.ahrefs.com/en/articles/9775727-how-patches-work-in-site-audit'],
        ['Search Atlas pricing', 'https://searchatlas.com/pricing/'],
        ['Screaming Frog pricing', 'https://www.screamingfrog.co.uk/seo-spider/pricing/'],
        ['Profound documentation', 'https://docs.tryprofound.com/'],
        ['Peec AI pricing', 'https://peec.ai/pricing'],
        ['Qwairy pricing', 'https://www.qwairy.co/pricing'],
        ['Qwairy documentation', 'https://docs.qwairy.co/llms.txt'],
        ['Otterly.AI pricing', 'https://otterly.ai/pricing'],
        ['Surfer pricing', 'https://surfer.ai/pricing/'],
        ['SE Ranking pricing', 'https://seranking.com/subscription.html'],
        ['SE Ranking data', 'https://seranking.com/our-data.html'],
        ['Rankscale', 'https://rankscale.ai/'],
        ['AthenaHQ documentation', 'https://docs.athenahq.ai/guides/site-health.md'],
        ['Lumar pricing', 'https://lumar.io/pricing/'],
        ['Sitebulb pricing', 'https://sitebulb.com/subscriptions/pricing/index/'],
        ['Similarweb pricing', 'https://www.similarweb.com/corp/pricing-homepage/'],
        ['Scrunch', 'https://scrunch.com/faqs/category/pricing'],
        ['Meteoria', 'https://meteoria.ai/'],
        ['GetMint documentation', 'https://docs.getmint.ai/docs'],
      ],
    },

    { id: 'faq', nav: 'FAQ', eyebrow: 'FAQ', title: 'Frequently asked questions' },
  ],

  faq: {
    items: [
      { q: 'Can Poliris replace Screaming Frog?', a: 'For auditing and fixing a site, yes. Poliris crawls the whole site, checks its accessibility for Google and AI crawlers, prioritizes issues and pushes fixes live, which Screaming Frog does not do. For crawling millions of pages or running custom extractions, Screaming Frog remains a useful complement.' },
      { q: 'Can Poliris replace Semrush or Ahrefs?', a: 'For bringing keywords, rankings, links and AI visibility together, yes. Poliris adds live fixes and an action plan that covers technical work, content and links. For in-depth backlink profile analysis, Semrush and Ahrefs remain useful complements.' },
      { q: 'Is Poliris an AI visibility tracker like Peec AI or Profound?', a: 'Yes, and it goes further. Poliris tracks 10 AI engines using prompts built from your offers, measures sentiment by buying criterion and identifies cited sources. It then acts on these results with the audit, live fixes, content, links and the action plan.' },
      { q: 'What does Poli AI add compared with a general-purpose AI?', a: 'Poli AI and its six agents work inside Poliris, on a single dataset and with the same method: audit, rankings, AI answers, links and content. A general-purpose AI, or one connected to several separate tools, only sees part of this data.' },
      { q: 'Which AI engines does Poliris track?', a: 'ChatGPT, Gemini, Perplexity, Claude, Microsoft Copilot, Grok, Mistral, DeepSeek, Google AI Overviews and Google AI Mode, on every paid plan.' },
      { q: 'Is Poliris suited to agencies?', a: 'Yes. The white label covers the whole platform on the agency\'s domain, with unlimited users and one workspace per client. The agency pack costs $69 a month.' },
      { q: 'Is there a free plan?', a: 'Yes. The free plan tracks 10 prompts on two AI engines.' },
      { q: 'Is this comparison biased toward Poliris?', a: 'This comparison is written by Poliris, which chose the criteria it considers important, as every vendor does on its comparison pages. All competitor data comes from each vendor\'s public pages, listed in the sources. Each section also states where other tools go further. For any correction request: contact@poliris.io.' },
    ],
  },

  cta: {
    heading: 'Try Poliris on your own site',
    text: 'Audit, AI visibility, content, links and action plan in one platform.',
  },
};
