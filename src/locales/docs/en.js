// EN copy of the whole documentation, one entry per chapter (keyed by slug).
// Generated from the authored docs export by scripts/extract-docs.mjs.
// Managed in Tolgee under docs.<slug>.* — ids and flags live in
// src/content/docs-structure.js and are never translated.
export default {
  "introduction": {
    "title": "Welcome to Poliris",
    "breadcrumb": [
      "Docs",
      "Get Started",
      "Introduction"
    ],
    "blocks": [
      {
        "id": "introduction",
        "title": "",
        "html": "<p class=\"lede\">\n          Poliris measures how AI assistants such as ChatGPT, Gemini and Perplexity talk about your brand,\n          checks whether your website is easy for search engines and AI crawlers to read, and turns what it finds into a list of tasks.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S01\"><img src=\"/docs/images/s01-ai-reputation-overview.webp\" alt=\"AI Reputation Overview: your brand, its products and their latest visibility and sentiment scores.\" width=\"1636\" height=\"948\" loading=\"lazy\" /><figcaption>The AI Reputation Overview: your brand, its products and their latest visibility and sentiment scores.</figcaption></figure>"
      },
      {
        "id": "what-is-poliris",
        "title": "What is Poliris?",
        "html": "<p>\n          More and more people ask an AI assistant before they buy: <em>&ldquo;Which CRM is best for a small team?&rdquo;</em>,\n          <em>&ldquo;Which running shoes are best for beginners?&rdquo;</em>. The assistant answers with a short list of brands and a few sources.\n          Poliris asks those questions for you, on the assistants your customers use, and shows you whether your brand\n          appears, how it is described, and which websites the assistants rely on.\n        </p>\n        <p>\n          Poliris also audits your website the way a crawler sees it, because an assistant can only quote pages it can reach and read.\n          The two audits feed a roadmap of concrete tasks: content to write or rewrite, technical fixes, and sources worth getting cited on.\n        </p>"
      },
      {
        "id": "introduction-2",
        "title": "What you can do with it",
        "html": "<div class=\"card-grid card-grid-2\">\n          <div class=\"card card-plain\">\n            <h4>Measure your AI reputation</h4>\n            <p>See how often AI assistants mention each of your products, where you rank against competitors, and whether the tone is positive, neutral or negative.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Audit your website</h4>\n            <p>Crawl your site with the Poliris crawler and run 158 tests on the site and its pages, grouped into three stages: Page Access, Content Access and Content Quality.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Plan the work</h4>\n            <p>Turn both audits into a week-by-week SEO plan sized to the time you have, and track it on an execution board.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Act on it</h4>\n            <p>Write and optimize content with Kate, the content writer of Poli AI, apply technical fixes to your site, and find the sources AI assistants quote.</p>\n          </div>\n        </div>"
      },
      {
        "id": "who-is-it-for",
        "title": "Who is it for?",
        "html": "<ul>\n          <li><strong>Brands and marketing teams</strong> who want to know what AI assistants say about their products.</li>\n          <li><strong>SEO and GEO specialists</strong> who want the technical audit and the AI visibility audit in one place.</li>\n          <li><strong>Agencies and consultants</strong> who follow several brands, each in its own project.</li>\n          <li><strong>Content teams</strong> who need briefs and drafts grounded in real search and AI data.</li>\n        </ul>"
      },
      {
        "id": "introduction-4",
        "title": "How this guide is organized",
        "html": "<ol>\n          <li><a href=\"#getting-started\">Get Started</a>: create your account, run your first analysis, learn the vocabulary and how credits work.</li>\n          <li><a href=\"#feature-geo\">Measure</a>: read the AI Reputation dashboards, the Technical Audit and the Keywords tools.</li>\n          <li><a href=\"#feature-roadmap\">Act</a>: the Roadmap, Content, Implementation and Citations tools.</li>\n          <li><a href=\"#feature-poliagent\">Poli AI</a>: the assistant that answers questions about your data.</li>\n          <li><a href=\"#integrations\">Connections</a> and <a href=\"#settings-account\">Settings</a>: connect your site and your Google tools, manage your team and your plan.</li>\n        </ol>"
      }
    ]
  },
  "getting-started": {
    "title": "Getting Started",
    "breadcrumb": [
      "Docs",
      "Get Started",
      "Quickstart"
    ],
    "blocks": [
      {
        "id": "getting-started",
        "title": "",
        "html": "<p class=\"lede\">\n          The first analysis is free. You enter your website, check what Poliris found, pick a few settings and choose\n          the questions to ask. Poliris then runs the analysis, audits 100 pages of your site and prepares a first roadmap.\n        </p>"
      },
      {
        "id": "quickstart",
        "title": "Quickstart: your first analysis",
        "html": "<p>\n          The onboarding has four steps. Your progress is saved on the server at every step: if you close the tab,\n          you go back to the same step the next time you sign in.\n        </p>\n\n        <h3 id=\"sign-up\">Create your account</h3>\n        <p>\n          Go to the sign-up page and use <strong>Sign up with Google</strong>, or an email address and a password of at least 8 characters.\n          With an email address, Poliris sends you a 6-digit <strong>verification code</strong> to type in before your account is created.\n          If you received a <strong>promo code</strong>, enter it in the field at the top of the form: the extra credits are added when your account is created.\n        </p>\n        <p>\n          You can also start from the Poliris website by typing your domain in the form on the home page. The onboarding opens with your\n          website already filled in and asks you to create a free account before the analysis starts.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S02\"><img src=\"/docs/images/s02-sign-up.webp\" alt=\"The sign-up page. The promo code field is optional.\" width=\"1640\" height=\"808\" loading=\"lazy\" /><figcaption>The sign-up page. The promo code field is optional.</figcaption></figure>\n\n        <ol class=\"steps\">\n          <li>\n            <h3>Step 1: Add your website</h3>\n            <p>\n              Type your domain (for example <code>example.com</code>). As soon as you stop typing, Poliris looks up your brand\n              and shows a card with its logo, a <strong>Brand name</strong> and a short <strong>Summary</strong>. Both are written by AI from your site:\n              click the pencil icon (<strong>Edit details</strong>) to correct them. The language menu at the top right sets the language of the project and of the interface, English or French.\n            </p>\n            <p>\n              Click <strong>Next</strong> to create the project. Poliris starts detecting your products in the background while you go on.\n            </p>\n        <figure class=\"docs-figure\" data-shot=\"S03\"><img src=\"/docs/images/s03-onboarding-step1.webp\" alt=\"Step 1. Poliris finds your brand name and writes a short summary you can edit.\" width=\"928\" height=\"948\" loading=\"lazy\" /><figcaption>Step 1. Poliris finds your brand name and writes a short summary you can edit.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 2: Help us tailor your experience</h3>\n            <p>Four optional questions. You can pick several answers per question, or skip them all.</p>\n            <ul class=\"def-rows\">\n              <li>\n                <span class=\"def-term\">Who are your customers?</span>\n                <span class=\"def-desc\"><strong>B2C</strong>, <strong>B2B</strong> or <strong>B2G</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">How do you sell?</span>\n                <span class=\"def-desc\"><strong>Online</strong> or <strong>Physical</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">What is your role?</span>\n                <span class=\"def-desc\"><strong>Founder-CEO</strong>, <strong>Marketing</strong>, <strong>Brand / Communications</strong>,\n                  <strong>Agency</strong>, <strong>Freelance</strong> or <strong>Other</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">What is your main goal?</span>\n                <span class=\"def-desc\"><strong>Monitor sentiment</strong>, <strong>Track visibility</strong>, <strong>Compare products</strong>\n                  or <strong>Follow competitors</strong>.</span>\n              </li>\n            </ul>\n            <p>\n              Your answers about customers, sales channel and goal help Poliris describe the people who buy your product (personas).\n              Those personas are used to write questions that sound like real customers.\n            </p>\n        <figure class=\"docs-figure\" data-shot=\"S04\"><img src=\"/docs/images/s04-onboarding-step2.webp\" alt=\"Step 2. All four questions are optional.\" width=\"1135\" height=\"910\" loading=\"lazy\" /><figcaption>Step 2. All four questions are optional.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 3: Choose your product and configure the analysis</h3>\n            <p>\n              Poliris lists the products it found on your site, at most five. A <strong>product</strong> here is a line of business, described the way a buyer would\n              ask an AI assistant about it; variants of the same offer are grouped. The main one is selected and marked <strong>Main</strong>.\n              The first analysis covers one product: pick it in <strong>Choose your product</strong>, or use <strong>+ Add new product</strong>\n              if the one you want is missing.\n            </p>\n            <p>Then set the scope of the analysis:</p>\n            <ul class=\"def-rows\">\n              <li>\n                <span class=\"def-term\">Trading zone</span>\n                <span class=\"def-desc\">The country or region where you want to track visibility, in the <strong>Location</strong> field. Poliris suggests zones for the product;\n                  <strong>Search trading zone</strong> lets you add any place from a map.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">Language</span>\n                <span class=\"def-desc\">The language the questions are written in. The list follows the trading zone.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">LLM</span>\n                <span class=\"def-desc\">The AI assistants to question. Select exactly two of the <strong>Free Models</strong>, which are the public\n                  web interfaces of the assistants (ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode, Google AI Overview). API models are available\n                  with a paid plan.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">Topics</span>\n                <span class=\"def-desc\">The themes your brand is measured on, such as quality, value for money or customer support.\n                  Poliris pre-selects up to four. Keep between three and five; <strong>More topics</strong> opens the full list with a search.</span>\n              </li>\n            </ul>\n            <p>\n              Click <strong>Next</strong>. Poliris writes the questions and starts the free technical audit of your site at the same time.\n            </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S05\"><img src=\"/docs/images/s05-onboarding-step3.webp\" alt=\"Step 3. One product, one trading zone, two AI models and three to five topics.\" width=\"1207\" height=\"1439\" loading=\"lazy\" /><figcaption>Step 3. One product, one trading zone, two AI models and three to five topics.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 4: Select your prompts</h3>\n            <p>\n              Poliris writes about 20 questions (prompts) for the product and pre-selects 10. Each question carries one or more topic tags\n              and a <strong>traffic</strong> icon. Keep between 5 and 10 questions.\n            </p>\n            <ul>\n              <li>\n                <strong>Traffic</strong> shows how much people search for the subject of the question on Google, compared with the other questions\n                in the list (high, medium or low). A gray dash means no search volume was found, which is not the same as low.\n              </li>\n              <li>\n                <strong>Add Prompt</strong> lets you add your own questions, one at a time or several at once. With <strong>Single</strong>, you pick the topics; with <strong>Bulk</strong>, Poliris suggests topics for each line and you can change them.\n                A question must not contain your brand name: naming the brand would bias the answer.\n              </li>\n              <li>The topic pills at the top filter the list.</li>\n            </ul>\n            <p>Click <strong>Start analysis</strong>.</p>\n        <figure class=\"docs-figure\" data-shot=\"S06\"><img src=\"/docs/images/s06-onboarding-step4.webp\" alt=\"Step 4. Ten questions are pre-selected; you can keep between five and ten.\" width=\"890\" height=\"1000\" loading=\"lazy\" /><figcaption>Step 4. Ten questions are pre-selected; you can keep between five and ten.</figcaption></figure>\n          </li>\n        </ol>"
      },
      {
        "id": "getting-started-2",
        "title": "What happens after you click Start analysis",
        "html": "<p>\n          A progress screen stays open while Poliris sends every selected question to the two AI assistants in your trading zone,\n          reads the answers and identifies your competitors. With 10 questions and 2 models, that is 20 answers to analyze.\n          If the analysis fails, a <strong>Retry</strong> button starts it again with the same selection.\n        </p>\n        <p>When the analysis is finished:</p>\n        <ul>\n          <li>Poliris creates a first <a href=\"#feature-roadmap\">SEO plan</a> for your product, over 12 weeks at 5 hours a week, and opens the Roadmap. The plan takes 30 to 90 seconds to generate and waits for the technical audit if it is still running.</li>\n          <li>The <a href=\"#feature-technical\">technical audit</a> of 100 pages appears under <strong>Sites</strong> in the sidebar.</li>\n          <li>Your product audit is under <strong>AI Reputation</strong> in the sidebar.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S07\"><img src=\"/docs/images/s07-first-roadmap.webp\" alt=\"After the first analysis, Poliris opens the Roadmap with a 12-week plan.\" width=\"1615\" height=\"1345\" loading=\"lazy\" /><figcaption>After the first analysis, Poliris opens the Roadmap with a 12-week plan.</figcaption></figure>\n        <div class=\"callout info\">\n          <strong>What is free.</strong> The onboarding analysis (one product, one trading zone, two web models, up to 10 questions)\n          and the 100-page technical audit cost no credits. A new account also gets a 7-day free trial with 200 credits; after that, each analysis uses credits from your workspace.\n          See <a href=\"#credits\">Credits and plans</a>.\n        </div>"
      },
      {
        "id": "getting-started-3",
        "title": "Adding another project",
        "html": "<p>\n          A project is one brand and its website. To add one, open the project selector at the top of the sidebar and click\n          <strong>Add new project</strong>. Enter the website URL, check the brand name Poliris found, and confirm.\n          Poliris builds the brand structure in the background, then opens the <a href=\"#ai-reputation-overview\">AI Reputation Overview</a> where\n          you set up and run the first audit. There is no onboarding wizard and no free analysis for additional projects.\n          Adding a project requires at least 100 credits in the workspace.\n        </p>"
      }
    ]
  },
  "key-concepts": {
    "title": "Key concepts",
    "breadcrumb": [
      "Docs",
      "Get Started",
      "Key concepts"
    ],
    "blocks": [
      {
        "id": "key-concepts",
        "title": "",
        "html": "<p class=\"lede\">\n          A few terms appear on almost every screen. This page explains what they mean in Poliris and how they fit together.\n        </p>"
      },
      {
        "id": "key-concepts-1",
        "title": "How a project is organized",
        "html": "<ul class=\"def-rows\">\n          <li>\n            <span class=\"def-term\">Workspace</span>\n            <span class=\"def-desc\">Your team. A workspace holds the projects, the members, the plan and the pool of credits shared by everyone in it.\n              You can belong to several workspaces and switch between them from the <strong>Workspaces</strong> list at the bottom of the sidebar.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Project</span>\n            <span class=\"def-desc\">One brand and its website. Everything else (products, audits, roadmap, content) lives inside a project.\n              You switch projects from the selector at the top of the sidebar.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Brand structure</span>\n            <span class=\"def-desc\">The map of what the project sells, in three levels: <strong>brand</strong>, <strong>category</strong> and\n              <strong>product</strong>. Poliris builds it from your website and you can edit it. A project usually has one brand; you can add more.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Product</span>\n            <span class=\"def-desc\">An offer as a buyer would ask an AI assistant about it, for example &ldquo;trail running shoes&rdquo; rather than each model and size.\n              Variants are grouped under one product. AI visibility is always measured per product.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Site</span>\n            <span class=\"def-desc\">A website attached to the project. The technical audit runs on sites. The project website is added automatically;\n              you can add others, including sites you do not manage, such as a competitor.</span>\n          </li>\n        </ul>"
      },
      {
        "id": "key-concepts-2",
        "title": "What an AI visibility audit is made of",
        "html": "<ul class=\"def-rows\">\n          <li>\n            <span class=\"def-term\">Trading zone</span>\n            <span class=\"def-desc\">The country or region where you measure visibility. AI answers change from one country to another, so every\n              product is audited per zone. The settings tab calls them <strong>Trade Areas</strong>.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Language</span>\n            <span class=\"def-desc\">The language the questions are written in. It is chosen per zone. The interface itself is available in English and French.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Topic</span>\n            <span class=\"def-desc\">A theme your brand is judged on: quality, value for money, customer support, sustainability, innovation and so on.\n              Topics come from a fixed list of about thirty. Each product follows three to five of them.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Prompt</span>\n            <span class=\"def-desc\">A question sent to the AI assistants, written the way a customer would ask it and in the zone language.\n              Prompts never contain your brand name, so the answer shows whether the assistant thinks of you on its own.\n              Each prompt is linked to one or more topics.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Model (LLM)</span>\n            <span class=\"def-desc\">An AI assistant Poliris questions. <strong>Free Models</strong> are the public web interfaces (ChatGPT, Gemini,\n              Perplexity, Google AI Mode, Google AI Overview): Poliris asks the question as a visitor would and reads the answer.\n              <strong>API models</strong> are queried through the provider&rsquo;s official API (OpenAI, Google, Anthropic, xAI, Mistral) and give access to specific versions.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Analysis run</span>\n            <span class=\"def-desc\">One execution of an audit: every selected prompt sent to every selected model, for one product in one zone.\n              10 prompts and 2 models give 20 answers. Poliris keeps every run, so you can compare them over time.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Competitors</span>\n            <span class=\"def-desc\">The brands that appear in the answers. Poliris extracts them, cleans the list and follows your brand and its competitors in the rankings. You can pin, hide or merge brands and choose the five shown in the charts in <strong>Project Settings &rsaquo; Competitors</strong>.</span>\n          </li>\n        </ul>\n\n        <figure class=\"docs-figure\" data-shot=\"S08\"><img src=\"/docs/images/s08-brand-structure-edit.webp\" alt=\"The brand structure: brand, categories and products. Click Edit Structure to change it.\" width=\"1191\" height=\"503\" loading=\"lazy\" /><figcaption>The brand structure: brand, categories and products. Click Edit Structure to change it.</figcaption></figure>"
      },
      {
        "id": "key-concepts-3",
        "title": "Credits",
        "html": "<p>\n          Actions that query AI models or crawl pages use credits from the workspace pool. Audits and crawls show an estimate before\n          they start. See <a href=\"#credits\">Credits and plans</a> for the details.\n        </p>"
      }
    ]
  },
  "credits": {
    "title": "Credits and plans",
    "breadcrumb": [
      "Docs",
      "Get Started",
      "Credits and plans"
    ],
    "blocks": [
      {
        "id": "credits",
        "title": "",
        "html": "<p class=\"lede\">\n          Poliris works with a monthly pool of credits shared by the whole workspace. Paid plans differ only by the size of the pool and the level of support:\n          every feature is available on every paid plan.\n        </p>"
      },
      {
        "id": "plans",
        "title": "Plans",
        "html": "<table>\n          <thead>\n            <tr><th>Plan</th><th>Price</th><th>Credits per month</th><th>What it includes</th></tr>\n          </thead>\n          <tbody>\n            <tr><td><strong>Free</strong></td><td>$0</td><td>0</td><td>The onboarding analysis (1 product, 1 trading zone, 2 web models, up to 10 prompts), the 100-page technical audit and 1 project.</td></tr>\n            <tr><td><strong>Starter</strong></td><td>$29 or &euro;27 / month</td><td>300</td><td>All features, all API models, several trading zones and projects, technical audits up to 30,000 pages.</td></tr>\n            <tr><td><strong>Growth</strong></td><td>$99 or &euro;92 / month</td><td>1,500</td><td>Same as Starter with a larger pool.</td></tr>\n            <tr><td><strong>Pro</strong></td><td>$189 or &euro;175 / month</td><td>3,000</td><td>Same as Growth with a larger pool and dedicated support.</td></tr>\n            <tr><td><strong>Custom</strong></td><td>On quote</td><td>Built around your brands</td><td>Everything in Pro, unlimited projects and trading zones, and a dedicated account manager.</td></tr>\n          </tbody>\n        </table>\n        <ul>\n          <li>A new account starts with a 7-day free trial: 200 credits to use across the tools. After the trial, the workspace stays on the Free plan and its results remain available. Your first paid month comes with twice the monthly credits.</li>\n          <li>The pool is refilled at each monthly renewal. Unused credits do not carry over.</li>\n          <li>On a paid plan, an audit uses 2 to 4 models, and at least 5 of the 20 questions Poliris writes, plus any you add.</li>\n          <li>Annual billing (about 20% less) is only offered when you subscribe from the <a href=\"https://poliris.io/en/pricing\">pricing page</a> before creating an account. Plans chosen in the app are billed monthly, in US dollars or euros; a running subscription keeps its currency.</li>\n          <li>There are no credit packs: to get more credits during a month, move to a larger plan. Agencies have a separate offer, with white label and client workspaces, presented in the agency view of the pricing page.</li>\n        </ul>"
      },
      {
        "id": "credit-costs",
        "title": "What uses credits",
        "html": "<p>\n          One credit is about one AI model query: one question asked to one AI model. You use your credits as you like across the tools; every other action is counted in credits too, according to the AI calls and data it needs. Before you start an audit or a crawl,\n          Poliris shows an estimate. For a technical audit, the final charge is usually lower than the estimate, because excluded URLs are not fully tested.\n        </p>\n\n        <table>\n          <thead>\n            <tr><th>Action</th><th>Typical cost</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>AI visibility analysis</td><td>Per question and per model: about 1 credit for a free web model, 1 to 15 credits for an API model depending on the model. 10 questions on 2 web models cost about 20 credits.</td></tr>\n            <tr><td>Technical audit</td><td>About 0.05 credit per page, reserved when the crawl starts. A 1,000-page audit is estimated at 50 credits. Stopped or failed audits are refunded.</td></tr>\n            <tr><td>Content generation, optimization, long-term plans, roadmap generation</td><td>The processing cost of each request.</td></tr>\n            <tr><td>Keywords on Google</td><td>A fixed price per action, shown before you start it.</td></tr>\n            <tr><td>Poli AI conversations</td><td>Free.</td></tr>\n            <tr><td>Onboarding analysis and the 100-page onboarding audit</td><td>Free.</td></tr>\n            <tr><td>Excel exports</td><td>Free.</td></tr>\n          </tbody>\n        </table>\n\n        <h3>Minimum balance</h3>\n        <p>Some actions check the balance before they start:</p>\n        <ul>\n          <li>An AI visibility analysis, a new project or a new brand needs at least <strong>100 credits</strong> left. Scheduled analyses are skipped when the balance is below 100.</li>\n          <li>A technical audit needs at least <strong>5 credits</strong> and enough credits for the page count you choose. The page slider stops at what your balance covers.</li>\n        </ul>\n        <p>\n          When a button shows a padlock, the action is not available with your current plan or balance. Clicking it explains why and offers\n          <strong>Upgrade to unlock</strong>.\n        </p>"
      },
      {
        "id": "credits-3",
        "title": "Following your usage",
        "html": "<p>\n          <strong>Workspace settings &rsaquo; Usage</strong> shows the credits used and left in the current billing period, the split by type of action,\n          and the credits used by each project. See <a href=\"#settings-workspace-1\">Workspace settings</a>.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S09\"><img src=\"/docs/images/s09-usage.webp\" alt=\"Usage: credits used in the current period, by action type and by project.\" width=\"1622\" height=\"804\" loading=\"lazy\" /><figcaption>Usage: credits used in the current period, by action type and by project.</figcaption></figure>"
      }
    ]
  },
  "ai-reputation": {
    "title": "AI Reputation",
    "breadcrumb": [
      "Docs",
      "Measure",
      "AI Reputation"
    ],
    "blocks": [
      {
        "id": "feature-geo",
        "title": "",
        "html": "<p class=\"lede\">\n          AI Reputation is the audit of what AI assistants say about your products. It answers three questions:\n          do they mention you, how do you rank against your competitors, and how do they describe you.\n        </p>\n        <p>\n          In the sidebar, <strong>MEASURE &rsaquo; AI Reputation</strong> opens the overview of all your products, and lists each product underneath.\n          A product page has three tabs: <a href=\"#feature-geo-overview-1\">Overview</a>, <a href=\"#feature-geo-visibility-1\">Visibility</a>\n          and <a href=\"#feature-geo-sentiment-1\">Sentiment</a>.\n        </p>"
      },
      {
        "id": "ai-reputation-overview",
        "title": "AI Reputation Overview",
        "html": "<p>\n          The overview shows your brand structure as cards: one card per product, grouped by category. The bar at the top lets you\n          filter by trading zone and jump to a product with the search field.\n        </p>\n        <p>On each product card:</p>\n        <ul>\n          <li>the <strong>visibility</strong> score out of 100, with its level (Very Weak to Very Strong) in a badge at the top of the card;</li>\n          <li>the <strong>sentiment</strong> level, shown as a word, never as a number;</li>\n          <li>when you look at all trading zones, how many of them have been audited;</li>\n          <li><strong>View Audit</strong> to open the product, <strong>Run now</strong> to start a new analysis, <strong>Schedule audit</strong> to run it automatically;</li>\n          <li><strong>Setup audit</strong> on a product that was never audited.</li>\n        </ul>\n        <p>\n          Two buttons at the top work on several products at once. <strong>Run Manager</strong> starts an analysis on the products you tick\n          (about five minutes each). <strong>Schedule Manager</strong> opens the scheduling settings. They appear once at least one product has been audited.\n        </p>\n        <p>\n          <strong>Edit Structure</strong> switches the page to edit mode: add a brand, a category or a product, rename or delete them.\n          Items that already have analysis runs cannot be renamed or deleted, and deleting the only brand deletes the whole project. When you delete a product followed in several zones,\n          Poliris asks which zones to remove it from.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S10\"><img src=\"/docs/images/s10-ai-reputation-cards.webp\" alt=\"Product cards on the AI Reputation Overview.\" width=\"1181\" height=\"552\" loading=\"lazy\" /><figcaption>Product cards on the AI Reputation Overview.</figcaption></figure>"
      },
      {
        "id": "feature-geo-setup",
        "title": "Setting up an audit",
        "html": "<p>\n          <strong>Setup audit</strong> (or <strong>Configure and run audit</strong> on an empty product page) opens a panel in three steps:\n          <em>Configure</em>, <em>Generate</em>, <em>Select</em>.\n          When the product is already followed in another zone, Poliris first asks how to start: <strong>Copy an existing audit</strong> (its models, topics and prompts, with the prompts translated for the new zone for you to review), <strong>Reuse prompts only</strong> or <strong>Start from scratch</strong>.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Configure</h3>\n            <ul>\n              <li><strong>AI Model to Query</strong>: between 2 and 4 models on a paid plan (2 on the Free plan). Each card shows its cost in credits per question.</li>\n              <li><strong>Topic to explore</strong>: 3 to 5 topics. Poliris suggests four for the product.</li>\n              <li><strong>Trading zone</strong> and <strong>Language</strong>. You can also add <em>Worldwide</em> as a target location.</li>\n              <li><strong>Auto-run this audit</strong>: run the audit again automatically every day, week or month, at the time you choose.</li>\n            </ul>\n            <p>\n              The footer shows the cost per question, or per run when auto-run is on. If the balance is too low, a warning says how many credits\n              the smallest run needs.\n            </p>\n          </li>\n          <li>\n            <h3>Generate</h3>\n            <p>Poliris writes 20 questions for the product. You can leave this step running in the background.</p>\n          </li>\n          <li>\n            <h3>Select</h3>\n            <p>\n              The 20 questions are listed with their topics and traffic level, sorted by search demand; 10 are pre-selected.\n              Keep at least 5. <strong>Add Prompt</strong> adds your own questions. The footer shows the number of questions, the models,\n              the estimated duration and the credits. Click <strong>Run Audits</strong>.\n            </p>\n          </li>\n        </ol>\n        <figure class=\"docs-figure\" data-shot=\"S11\"><img src=\"/docs/images/s11-setup-panel-configure.webp\" alt=\"The footer of the audit setup panel shows the cost before you start.\" width=\"245\" height=\"76\" loading=\"lazy\" /><figcaption>The footer of the audit setup panel shows the cost before you start.</figcaption></figure>\n        <figure class=\"docs-figure\" data-shot=\"S12\"><img src=\"/docs/images/s12-setup-panel-select.webp\" alt=\"Add Prompt: write your own question and link it to one or more topics.\" width=\"1035\" height=\"907\" loading=\"lazy\" /><figcaption>Add Prompt: write your own question and link it to one or more topics.</figcaption></figure>"
      },
      {
        "id": "feature-geo-running",
        "title": "Running, history and schedules",
        "html": "<p>The header of a product page gathers the controls for that product:</p>\n        <ul>\n          <li><strong>Run</strong> (or <strong>Rerun</strong>) sends the product&rsquo;s active questions to its current models, in the zone shown, and adds a new run. To change the questions or the models first, use Project Settings &rsaquo; Setup and Prompts.</li>\n          <li><strong>History</strong> lists the past runs. Pick one to see the whole page as it was on that date; <strong>Reset to latest run</strong> brings you back.</li>\n          <li><strong>Export</strong> downloads the data of the product and zone as an Excel file.</li>\n          <li>The <strong>trading zone</strong> switcher changes zone. A colored dot shows the state of each zone: blue for an audit in progress, green when results are available, amber when questions are ready but not run yet, gray when there is no data.</li>\n        </ul>\n        <p>\n          A run usually takes a few minutes. While it runs, the page shows a progress percentage and you can keep working elsewhere.\n          Each scheduled run uses the zone its schedule was set up for, with the product&rsquo;s current active questions and models.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S13\"><img src=\"/docs/images/s13-product-header.webp\" alt=\"The product header: run, history, export and trading zone.\" width=\"1640\" height=\"150\" loading=\"lazy\" /><figcaption>The product header: run, history, export and trading zone.</figcaption></figure>"
      },
      {
        "id": "feature-geo-overview-1",
        "title": "Overview tab",
        "html": "<p class=\"lede\">\n          The Overview tab sums up the selected run for one product in one trading zone. Each card links to the detailed tab.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S14\"><img src=\"/docs/images/s14-product-overview.webp\" alt=\"The Overview tab of a product.\" width=\"1640\" height=\"1332\" loading=\"lazy\" /><figcaption>The Overview tab of a product.</figcaption></figure>\n\n        <h4>Poli AI Insight</h4>\n        <p>\n          One or two sentences written by AI from the figures of the run: your visibility and sentiment, your rank and the leading competitor.\n          The insight is generated once per run and language and changes only when the figures change.\n        </p>\n\n        <h4>AI Visibility and Brand Sentiment</h4>\n        <ul>\n          <li><strong>AI Visibility</strong>: how often the AI models mention your brand, out of 100, with a level from Weak to Excellent.</li>\n          <li><strong>Brand Sentiment</strong>: how positively the models describe your brand, on a five-level scale from Very Weak to Very Strong.</li>\n        </ul>\n\n        <h4>Visibility Ranking</h4>\n        <p>\n          Your position among the brands Poliris follows for this product, sorted by visibility score. The badge reads <strong>Leader</strong>\n          when you are first, <strong>Challenger</strong> in the top half and <strong>Follower</strong> below. Hover over the rank to see the brands\n          ahead of you. A brand that is never mentioned is shown as <strong>Unranked</strong>.\n        </p>\n\n        <h4>Source intelligence</h4>\n        <p>\n          The share of AI answers that cite your website as a source, with the change since the previous run, the number of answers\n          citing you and the number of source domains. <strong>Details</strong> opens the Backlinks &amp; Citations window.\n        </p>\n\n        <h4>Position vs Competitors</h4>\n        <p>\n          A chart with visibility on the horizontal axis and sentiment on the vertical axis. Each dot is a brand logo; yours is marked.\n          The four areas read as follows:\n        </p>\n        <ul>\n          <li><strong>Leaders</strong>: mentioned often and described well.</li>\n          <li><strong>Strong sentiment, low visibility</strong>: described well when mentioned, but rarely mentioned.</li>\n          <li><strong>Strong visibility, weak sentiment</strong>: mentioned often, described poorly.</li>\n          <li><strong>At risk</strong>: low on both.</li>\n        </ul>\n        <p>The <strong>Filter</strong> button above the chart chooses which brands to show, up to twelve.</p>\n\n        <h4>Visibility Analysis</h4>\n        <p>\n          The average visibility score across models, your visibility rank, the trend since the previous run and one bar per model\n          (<em>Score by platform</em>). It tells you which assistant knows you and which one does not.\n        </p>\n\n        <h4>Sentiment Analysis</h4>\n        <p>\n          Your average sentiment level, its trend since the previous run and one bar per topic. A topic marked <em>No answer</em> had no\n          answer mentioning your brand.\n        </p>\n\n        <div class=\"callout info\">\n          <strong>Ask Poli AI about a card.</strong> When the Poli AI chat panel is open, clicking any card sends Poli AI a question about it.\n          See <a href=\"#feature-poliagent\">Poli AI</a>.\n        </div>"
      },
      {
        "id": "feature-geo-visibility-1",
        "title": "Visibility tab",
        "html": "<p class=\"lede\">\n          The Visibility tab shows where your brand is mentioned, against whom, and from which sources the AI models take their information.\n          It is available once the product has at least one run.\n        </p>\n\n        <h4>Score Breakdown</h4>\n        <p>\n          Your visibility score out of 100, broken down either by <strong>Topics</strong> or by <strong>AI Models</strong>.\n          The best item is tagged <strong>Strongest</strong> and the weakest is tagged <strong>Priority</strong>.\n          Hover over a topic to see how many prompts it covers.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S15\"><img src=\"/docs/images/s15-score-breakdown.webp\" alt=\"Score Breakdown, by topic or by AI model.\" width=\"538\" height=\"501\" loading=\"lazy\" /><figcaption>Score Breakdown, by topic or by AI model.</figcaption></figure>\n\n        <h4>Competitive Position</h4>\n        <p>\n          Your rank among the followed brands, its change since the last run, and a chart of your rank over time (from two runs onwards).\n          The list below shows every followed brand with its rank.\n        </p>\n\n        <h4>Source Intelligence</h4>\n        <p>\n          The websites the AI models cite in their answers. The header gives the number of distinct source domains and how many times\n          your own domain is cited. Switch between <strong>Latest run</strong> and <strong>All</strong> runs.\n        </p>\n        <ul>\n          <li>A colored bar splits the sources by type: Your site, Competitor, Stockist, Review, Industry, News, Media, Social, Forum, Blog, Listicle, Academic, Government and General.</li>\n          <li>A badge describes the mix of sources: <strong>Concentrated</strong>, <strong>Moderate</strong> or <strong>Diversified</strong>.</li>\n          <li>The five most cited domains are listed with their change since the previous run.</li>\n        </ul>\n        <p>\n          <strong>Backlinks &amp; Citations</strong> opens the full list of cited pages. Click <strong>Process backlinks</strong> (once per run; in <strong>All</strong> mode, process the remaining runs too): Poliris opens each\n          cited page and checks whether it links to you (<em>Active Link</em>), names you (<em>Mention</em>), ignores you (<em>Uncited</em>) or could not be checked (<em>Unverified</em>).\n          The <em>Opportunity</em> column suggests the next step for each domain (<em>Purchase</em>, <em>Claim</em>, <em>Check</em>,\n          <em>Ask</em> or <em>View</em>) and opens the matching <a href=\"#feature-citations\">Citations</a> page.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S16\"><img src=\"/docs/images/s16-source-intelligence.webp\" alt=\"Source Intelligence: which websites the AI models rely on.\" width=\"534\" height=\"499\" loading=\"lazy\" /><figcaption>Source Intelligence: which websites the AI models rely on.</figcaption></figure>\n        <figure class=\"docs-figure\" data-shot=\"S17\"><img src=\"/docs/images/s17-backlinks-citations.webp\" alt=\"Backlinks & Citations: the cited pages and whether they mention or link to you.\" width=\"1410\" height=\"675\" loading=\"lazy\" /><figcaption>Backlinks &amp; Citations: the cited pages and whether they mention or link to you.</figcaption></figure>\n\n        <h4>Visibility Analysis</h4>\n        <p>\n          A grid of brands against models (<strong>By LLM</strong>) or against topics (<strong>By Topic</strong>). Darker cells show where a brand\n          is often mentioned. Pick a column to rank the brands on that model or topic.\n        </p>\n\n        <h4>Prompt Explorer</h4>\n        <p>\n          Every question of the run, with its topic tags and its traffic level. The <strong>LLMs</strong> column shows one chip per model:\n          blue when the answer mentions your brand, gray when it does not. Click a chip or a row to open <strong>Prompt Details</strong>:\n        </p>\n        <ul>\n          <li><strong>Response</strong>: the full answer of the model, with brands and domains highlighted.</li>\n          <li><strong>Details</strong>: the brands in the answer with their order of appearance, and the sources the model cited.</li>\n        </ul>\n        <p>\n          The traffic level shows how much people search for the subject of the question on Google, compared with the other questions of this audit: high, medium or low.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S18\"><img src=\"/docs/images/s18-prompt-explorer.webp\" alt=\"Prompt Explorer: the exact question and each model's answer.\" width=\"1615\" height=\"766\" loading=\"lazy\" /><figcaption>Prompt Explorer: the exact question and each model's answer.</figcaption></figure>\n\n        <h4>Evolution</h4>\n        <p>\n          Your visibility score over time, one line per brand. Choose the brands with <strong>Filter</strong> (up to twelve) and the period with the date picker.\n          With a single run, the chart shows one point and fills in as runs accumulate.\n        </p>\n\n        <h3>Reading the tab</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Find the gap</h5>\n            <p>In Score Breakdown, switch between Topics and AI Models. The <em>Priority</em> tag points to the weakest topic or model.</p>\n          </li>\n          <li>\n            <h5>See who wins instead</h5>\n            <p>In Visibility Analysis, select that topic or model and look at the brands ranked above you.</p>\n          </li>\n          <li>\n            <h5>Read the answers</h5>\n            <p>In Prompt Explorer, filter on the topic and open the answers where you are missing. They show what the assistant says and which sources it used.</p>\n          </li>\n          <li>\n            <h5>Go after the sources</h5>\n            <p>Open Backlinks &amp; Citations: the domains cited for your competitors and not for you are your citation targets.</p>\n          </li>\n        </ol>"
      },
      {
        "id": "feature-geo-sentiment-1",
        "title": "Sentiment tab",
        "html": "<p class=\"lede\">\n          The Sentiment tab looks at how the AI models talk about your brand when they mention it: positively, neutrally or negatively,\n          topic by topic and compared with your competitors.\n        </p>\n        <p>\n          Every answer that mentions a brand is labeled positive, neutral or negative for that brand. Sentiment is shown on five levels:\n          <span class=\"badge tier tier-vw\">Very Weak</span> <span class=\"badge tier tier-w\">Weak</span> <span class=\"badge tier tier-m\">Moderate</span>\n          <span class=\"badge tier tier-s\">Strong</span> <span class=\"badge tier tier-vs\">Very Strong</span>.\n        </p>\n\n        <h4>Sentiment Breakdown</h4>\n        <p>\n          Your overall sentiment level, with one bar per topic or per AI model. The weakest item is tagged <strong>Priority</strong>.\n          <em>No answer</em> means no answer mentioned your brand for that item.\n        </p>\n\n        <h4>Sentiment trend</h4>\n        <p>\n          Your overall sentiment level across runs, with the current and previous level and the direction (stable, improving, declining).\n          Use the range slider to look at a period. The chart needs at least two runs.\n        </p>\n\n        <h4>AI Model Coverage</h4>\n        <p>\n          Each answer of the run is counted once, as <strong>Positive</strong>, <strong>Neutral</strong>, <strong>Negative</strong> or\n          <strong>Not mentioned</strong>. The line above the grid gives the total, for example\n          <em>2 LLMs &times; 10 prompts = 20 answers</em>. Untick a model to see the split for the others. A high &ldquo;not mentioned&rdquo; share is\n          a visibility problem, not a sentiment one.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S19\"><img src=\"/docs/images/s19-sentiment-coverage.webp\" alt=\"Sentiment Breakdown and AI Model Coverage.\" width=\"1134\" height=\"428\" loading=\"lazy\" /><figcaption>Sentiment Breakdown and AI Model Coverage.</figcaption></figure>\n\n        <h4>Competitor sentiment</h4>\n        <p>\n          A radar with one shape per brand, by model or by topic, and a line chart of each brand&rsquo;s sentiment over time.\n          <strong>Details</strong> opens a table with a level per topic (or per model) for every brand, ranked by overall sentiment.\n          Use <strong>Filter</strong> to choose the brands.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S20\"><img src=\"/docs/images/s20-competitor-sentiment.webp\" alt=\"Competitor sentiment: radar, trend and details table.\" width=\"1592\" height=\"807\" loading=\"lazy\" /><figcaption>Competitor sentiment: radar, trend and details table.</figcaption></figure>\n\n        <h4>Cited Prompts</h4>\n        <p>\n          Every question with one chip per model, colored by the tone of the answer toward your brand: green for positive, amber for neutral,\n          red for negative, white when your brand is not mentioned. Filter by topic with the tabs above the table and click a chip to read the answer.\n        </p>\n\n        <h3>Reading the tab</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Spot the weak topic</h5>\n            <p>In Sentiment Breakdown, look for the <em>Priority</em> tag.</p>\n          </li>\n          <li>\n            <h5>Compare</h5>\n            <p>In Competitor sentiment, check whether competitors score better on the same topic. If everyone is weak, the topic is hard for the whole market.</p>\n          </li>\n          <li>\n            <h5>Read the negative answers</h5>\n            <p>In Cited Prompts, filter on the topic and open the red chips. The answer and its sources tell you what to correct or to prove on your own pages.</p>\n          </li>\n        </ol>"
      },
      {
        "id": "models",
        "title": "Models you can question",
        "html": "<p class=\"lede\">\n          The AI models you can choose when you set up an audit, and the estimated cost of each question in credits.\n        </p>\n\n        <table>\n          <thead>\n            <tr><th>Type</th><th>Models</th><th>Credits per question (estimate)</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>Free Models (web interface)</td><td>ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode, Google AI Overview</td><td>1</td></tr>\n            <tr><td>OpenAI API</td><td>GPT-5.5, GPT-5.4, GPT-5.4 Mini, GPT-5.4 Nano, GPT-4o Mini</td><td>15, 10, 5, 3, 1</td></tr>\n            <tr><td>Google API</td><td>Gemini 3.1 Pro Preview, Gemini 3.5 Flash, Gemini 3 Flash Preview, Gemini 3.1 Flash Lite</td><td>12, 7, 4, 3</td></tr>\n            <tr><td>Anthropic API</td><td>Claude Opus 4.8, Claude Haiku 4.5</td><td>7, 2</td></tr>\n            <tr><td>xAI API</td><td>Grok 4.3</td><td>2</td></tr>\n            <tr><td>Mistral API</td><td>Mistral Large, Mistral Medium, Mistral Small</td><td>2, 2, 1</td></tr>\n          </tbody>\n        </table>\n        <p>\n          Free Models are free during onboarding only; after that, each question costs about one credit.\n          API models require a paid plan.\n        </p>"
      }
    ]
  },
  "keywords": {
    "title": "Keywords",
    "breadcrumb": [
      "Docs",
      "Measure",
      "Keywords"
    ],
    "blocks": [
      {
        "id": "feature-keywords",
        "title": "",
        "html": "<p class=\"lede\">\n          Keywords on Google shows where your site and your competitors rank on Google, search by search, in one trading zone at a time.\n        </p>\n        <p>\n          In the sidebar, <strong>MEASURE &rsaquo; Keywords</strong> opens it. The page has three tabs: <a href=\"#keywords-overview\">Overview</a>,\n          <a href=\"#keywords-list\">Keywords</a> and <a href=\"#keywords-pages\">Pages</a>. <a href=\"#keywords-find\">Find keywords</a> looks up new searches to add to the list.\n        </p>\n        <p>\n          The header shows the trading zone, when the list was last updated and how many searches are tracked every week. It also holds\n          <strong>How it works</strong>, <strong>Competitors</strong>, <strong>Settings</strong>, the export button and <strong>Update</strong>.\n        </p>"
      },
      {
        "id": "keywords-zones",
        "title": "Zones and updates",
        "html": "<p>\n          Each trading zone has its own list of searches. The zones come from <a href=\"#feature-geo\">AI Reputation</a>, called AI Visibility on this screen:\n          a zone appears once a product has a trading zone with a country and the project has a website. Choose the zone at the top of the page.\n          Google's data for a zone is the country's: searches a month and positions are not split by city.\n        </p>\n        <p>The first time, click <strong>Set up</strong>. Poliris reads:</p>\n        <ul>\n          <li>the searches your site ranks on in this zone, up to 1,000, and up to 300 more within reach (positions 11 to 20);</li>\n          <li>the keywords of your products and of their AI questions, from AI Reputation, for this zone.</li>\n        </ul>\n        <p>\n          Each search comes with its position, its date, searches a month, difficulty and visits. It takes a few minutes: you can leave the page,\n          and the task tray tells you when it is done. One zone updates at a time.\n        </p>\n        <p>\n          <strong>Update</strong> reads Google's data again for every search of the list. New searches your site now ranks on join the list, and\n          <em>Moved up</em>, <em>Moved down</em> and the Overview changes compare this update with the one before. If nothing new can come back\n          since the last update, Poliris tells you before running it. The price is shown before you confirm: it is charged when the update starts\n          and given back if it fails.\n        </p>\n        <p>\n          In <strong>Settings</strong>, <strong>Update the list</strong> is set to <em>Every month</em> or <em>Off</em>. Google's data for most searches\n          changes about once a month, so a weekly update would show the same. Searches you track are checked every week (see\n          <a href=\"#keywords-list\">Checking and tracking</a>).\n        </p>"
      },
      {
        "id": "keywords-overview",
        "title": "Overview",
        "html": "<p>The Overview sums up the list of the zone:</p>\n        <ul>\n          <li><strong>On page one</strong>: the searches of the list where your site is in the top 10;</li>\n          <li><strong>Share of voice</strong>: your share of the estimated clicks on these searches, among you and the competitors you compare;</li>\n          <li><strong>Visits from these searches</strong>: an estimate, from searches a month and the share of clicks at the latest position. Real clicks replace it once Search Console is connected.</li>\n        </ul>\n        <p>\n          <strong>All your searches, month by month</strong> shows where each search of today's list stood at the end of each month: top 3, 4 to 10,\n          11 to 20, below the top 20, or not in the top 100. <strong>Against competitors</strong> shows how many searches of your list each one has on page one.\n          <strong>Tracked searches, week by week</strong> shows the weekly checks of the searches you track.\n        </p>\n        <p>\n          <strong>Next steps</strong> lists the five things that would move the most this month, each with its action: a <em>Quick win</em>\n          (Optimize the page), a <em>Gap</em> (Write an article), a search that <em>Dropped</em> (Update the content) or one <em>Worth tracking</em>\n          (Track every week).\n        </p>\n        <p>\n          When a figure is compared with the time before, only the searches present both times count: adding or removing a search never moves a figure by itself.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S53\"><img src=\"/docs/images/s53-keywords-overview.webp\" alt=\"The Overview tab of Keywords on Google.\" width=\"1648\" height=\"1043\" loading=\"lazy\" /><figcaption>The Overview tab of Keywords on Google.</figcaption></figure>"
      },
      {
        "id": "keywords-list",
        "title": "Keywords",
        "html": "<p>The Keywords tab lists the searches of the zone, one row per search:</p>\n        <ul>\n          <li><strong>Keyword</strong>, with the page of yours that ranks on it;</li>\n          <li><strong>Position</strong>: the latest one known, with its date (in orange when Google showed it more than a month ago) and its change since the point before;</li>\n          <li><strong>Competitor</strong>: the best placed competitor (<em>Best</em>), or one column per competitor you compare (<em>Each</em>);</li>\n          <li><strong>Searches</strong> and <strong>Visits</strong> a month, <strong>Opportunity</strong>, <strong>Difficulty</strong>, <strong>CPC</strong> and the AI Reputation <strong>Product</strong> the search belongs to.</li>\n        </ul>\n        <p>\n          Difficulty, out of 100, is how strong, in links, the ten pages on page one are. The opportunities are <em>Quick win</em> (position 4 to 20\n          on a search that is not too hard), <em>Gap</em> (a competitor is in the top 10 and you do not appear) and <em>Defend</em> (you are in the\n          top 3 and a competitor is right behind).\n        </p>\n        <p>\n          <strong>Filters</strong> narrow the list by position, why the search is in the list, last change, opportunity, competitors, tracking and\n          product. A search is in the list because you added it, your site ranks on it, it belongs to one of your products, it is searched in this\n          market, it is behind one of your AI questions, or a competitor ranks on it. Search the list with <strong>Search in the list</strong>, and\n          export it as CSV with the export button.\n        </p>\n\n        <h3>Checking and tracking</h3>\n        <p>Tick searches, or click the star of a row, then:</p>\n        <ul>\n          <li><strong>Check now</strong> reads Google live from the zone, once, with results in about a minute: your page and your competitors' places\n          in the top 20. Each search uses one of your 50 live checks of the month, and the price is shown before you confirm. The row then reads\n          <em>Checked today</em>.</li>\n          <li><strong>&#9733; Track every week</strong> checks the search live every Monday; clicking its star does the same. Tracking costs credits\n          every month, shown before you confirm. <strong>Stop tracking</strong> keeps the history.</li>\n        </ul>\n        <p>\n          A position Google showed more than a month ago is flagged <em>Over a month old</em>: select those searches and check them now.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S54\"><img src=\"/docs/images/s54-keywords-list.webp\" alt=\"The Keywords tab, with its filters and one row per search.\" width=\"1648\" height=\"1079\" loading=\"lazy\" /><figcaption>The Keywords tab, with its filters and one row per search.</figcaption></figure>\n\n        <h3>The panel of a search</h3>\n        <p>\n          Click a search to open its panel: its position over time, from the monthly updates and the checks; the positions of you and your\n          competitors; what Google shows on the page, such as an AI answer at the top, a map or a questions block; searches a month, difficulty,\n          CPC and intent; and why it is in your list. The panel has the same Check now and Track buttons.\n        </p>\n        <p>\n          <strong>Write an article</strong> opens <a href=\"#feature-content\">Content</a> generation on this search, and <strong>Optimize the page</strong>\n          opens the optimizer on the page that ranks. <strong>Add to AI Visibility</strong> turns the search into a question of a product’s <a href=\"#feature-geo\">AI Reputation</a> audit, asked of the AI assistants with its other questions; reword it first the way people would ask it. <strong>Not relevant</strong> leaves the search out of the list and of the next updates, with every\n          search containing its words. Bring it back from <strong>Settings</strong>, under <em>Left out as not relevant</em>, with <strong>Restore</strong>.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S55\"><img src=\"/docs/images/s55-keyword-panel.webp\" alt=\"The panel of one search.\" width=\"1647\" height=\"910\" loading=\"lazy\" /><figcaption>The panel of one search: its position over time, the positions and what Google shows.</figcaption></figure>"
      },
      {
        "id": "keywords-pages",
        "title": "Pages",
        "html": "<p>\n          The Pages tab shows the same data page by page: <strong>Pages ranking</strong>, <strong>Visits a month</strong> (an estimate from positions\n          and searches), <strong>Top 3 pages</strong> (the share of the visits they bring) and <strong>Within reach</strong> (searches at positions 11 to 20).\n        </p>\n        <p>\n          Each page shows how many of its searches sit in each position band, its visits a month, its number of searches, its best position, its main search and its <strong>Tech. score</strong>, the page’s score out of 100 in the latest <a href=\"#feature-technical\">technical audit</a> of your site. Filter by site, sort by most visits, most searches or most within reach, and click a page to see its searches. With Search Console\n          connected, real clicks replace the estimate.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S56\"><img src=\"/docs/images/s56-keywords-pages.webp\" alt=\"The Pages tab of Keywords on Google.\" width=\"1646\" height=\"918\" loading=\"lazy\" /><figcaption>The Pages tab: the same data, page by page.</figcaption></figure>"
      },
      {
        "id": "keywords-find",
        "title": "Find keywords",
        "html": "<p>\n          <strong>Find keywords</strong> opens a drawer to look for searches in the zone, see their data, then add them to the list or track them.\n          It has four tabs:\n        </p>\n        <ul>\n          <li><strong>Suggestions</strong>: searches Poliris found when something changed in your project, such as a product in AI Reputation, the searches behind your AI questions or a site in the technical audit;</li>\n          <li><strong>From a site</strong>: the searches a page ranks on (<em>This page</em>) or the whole site ranks on (<em>The whole site</em>), yours or a competitor's;</li>\n          <li><strong>From a competitor</strong>: every search a competitor is in the top 20 for;</li>\n          <li><strong>From an idea</strong>: one idea gives up to 100 searches around it, and several lines are each looked up.</li>\n        </ul>\n        <p>\n          Searches that look off your topic or are in another language come last, labeled. Select searches to see their 12 months of Google history\n          (up to 20 at a time), then add them to the list, which is free, or track them every week, which costs credits every month. A lookup's price\n          is shown on its button; a source pulled before opens free. Lookups also have a daily limit.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S57\"><img src=\"/docs/images/s57-find-keywords.webp\" alt=\"The Find keywords drawer.\" width=\"1647\" height=\"910\" loading=\"lazy\" /><figcaption>The Find keywords drawer, with its four tabs.</figcaption></figure>"
      },
      {
        "id": "keywords-competitors",
        "title": "Competitors and settings",
        "html": "<p>\n          Who is a direct or an indirect competitor is decided once, in AI Reputation, product by product. In <strong>Competitors</strong>, you only\n          choose who is compared with you, up to 12. The compared ones come first, then the others, those ranking on most of your searches first.\n          <strong>Check who ranks on your searches</strong> reads your 200 most searched searches to see who ranks on them; its price is shown on the\n          button, and it is free again the same day.\n        </p>\n        <p>\n          <strong>Settings</strong> holds the update schedule (see <a href=\"#keywords-zones\">Zones and updates</a>) and the searches left out as not\n          relevant, each with <strong>Restore</strong>.\n        </p>"
      },
      {
        "id": "keywords-free",
        "title": "On the free plan",
        "html": "<p>\n          On the free plan, Keywords shows your 100 most searched searches, or the 20 searches of your AI Reputation onboarding, and your first update\n          is free. Scheduled updates do not run. <strong>Unlock all</strong> shows the plans: a plan opens every search, every update and every lookup.\n          See <a href=\"#credits\">Credits and plans</a>.\n        </p>"
      }
    ]
  },
  "technical-audit": {
    "title": "Technical Audit",
    "breadcrumb": [
      "Docs",
      "Measure",
      "Technical Audit"
    ],
    "blocks": [
      {
        "id": "feature-technical",
        "title": "",
        "html": "<p class=\"lede\">\n          The technical audit crawls your website with the Poliris crawler and runs 158 tests: 121 on each audited page and 37 once for the whole site. It tells you whether\n          search engines and AI crawlers can reach your pages, read their content, and find that content worth quoting.\n        </p>"
      },
      {
        "id": "feature-technical-1",
        "title": "The three stages",
        "html": "<p>Every test belongs to one of three stages. A page has to pass the first stage before the next ones matter.</p>\n        <div class=\"card-grid\">\n          <div class=\"card card-plain\">\n            <h4>Page Access</h4>\n            <p>Can crawlers reach the page? Status codes, redirects, HTTPS, robots.txt, meta robots tags, sitemap, canonical tags, links, pagination, URL structure and speed.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Content Access</h4>\n            <p>Can they read it? Title, meta description, headings, structured data, images, social tags, language tags, analytics.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Content Quality</h4>\n            <p>Is it worth quoting? Depth, readability, structure and how the page fits with the rest of the site.</p>\n          </div>\n        </div>"
      },
      {
        "id": "sites",
        "title": "Your sites",
        "html": "<p>\n          In the sidebar, <strong>MEASURE &rsaquo; Sites</strong> opens <em>My site &amp; socials</em>, the list of websites in the project.\n          Sites are split into <strong>Owned</strong> (sites you manage: you can audit them and apply fixes) and <strong>Non-owned</strong>\n          (sites you audit without managing them, such as a competitor or a partner). Each card shows the health score, the date of the last\n          analysis and the progress of a running crawl. Expand a card to see its health pipeline, its Google connections and the\n          <strong>Issues</strong> and <strong>Refresh</strong> buttons.\n        </p>\n        <p>\n          To add a site, click <strong>Add site</strong>, enter the URL and choose the site type. No audit starts until you click <strong>Run audit</strong> on the new card.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S21\"><img src=\"/docs/images/s21-sites-toolbox.webp\" alt=\"Adding a site: enter its URL and choose whether you own it.\" width=\"456\" height=\"357\" loading=\"lazy\" /><figcaption>Adding a site: enter its URL and choose whether you own it.</figcaption></figure>"
      },
      {
        "id": "tech-run",
        "title": "Running an audit",
        "html": "<p>\n          Click <strong>Run audit</strong> on a site card, or <strong>Re-crawl</strong> at the top of Site Overview. A window asks how many URLs to check:\n          from 10 to 30,000. For a first audit, the slider starts at the estimated size of your site, based on its sitemap. The window shows the\n          estimated cost, about 0.05 credit per page, and the slider stops at what your balance covers.\n          When a site has more pages than the limit you choose, Poliris picks the pages to check across every type of page: the product pages of an online shop, which share one template, make up a small share of them.\n        </p>\n        <p>\n          A re-crawl keeps the page limit of the previous audit and the slider cannot be moved, so that scores stay comparable from one audit to the next. This includes the onboarding audit: its re-crawls also check 100 pages. On a paid plan, <strong>Run full audit</strong>, offered on the site card and in Site Overview, starts a new audit sized to the whole site.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S22\"><img src=\"/docs/images/s22-run-audit.webp\" alt=\"Choosing the number of URLs to check.\" width=\"381\" height=\"347\" loading=\"lazy\" /><figcaption>Choosing the number of URLs to check.</figcaption></figure>\n        <ul>\n          <li>While the crawl runs, the site screens show the progress and the pages crawled so far, marked as partial results.</li>\n          <li><strong>Stop audit</strong> discards the run and refunds the credits spent; your last complete audit stays available.</li>\n          <li>If the site blocks the crawler (Cloudflare, DataDome, Akamai and other anti-bot services), cannot be reached or returns errors, Poliris says so on the site card and keeps showing your last complete audit, if there is one. A run that fails without producing results is refunded. Allowing the Poliris crawler in your protection settings usually solves it.</li>\n          <li><strong>History</strong> opens the list of past audits; <strong>Export</strong> on Site Overview downloads the audit as an Excel file.</li>\n        </ul>\n        <p>\n          On the Free plan, the technical audit is limited to the 100-page audit run during onboarding. Running more audits requires a paid plan.\n        </p>"
      },
      {
        "id": "feature-technical-overview-1",
        "title": "Site Overview",
        "html": "<p class=\"lede\">\n          Site Overview is the summary of one audit for the whole site. It has two tabs, <strong>Overview</strong> and\n          <a href=\"#tech-issues-tab-1\">Issues</a>, and a pill at the top to switch to <a href=\"#feature-technical-page-explorer-1\">Page Explorer</a>.\n        </p>\n        <p>\n          The header shows the site URL, the date of the last update and the number of pages crawled, with the <strong>Export</strong>,\n          <strong>History</strong> and <strong>Re-crawl</strong> buttons. The <strong>GSC</strong> and <strong>GA4</strong> chips at the top right show\n          whether Google Search Console and Google Analytics are connected (green) or not (red).\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S23\"><img src=\"/docs/images/s23-site-overview-top.webp\" alt=\"Site Overview: crawl, page status and speed cards.\" width=\"1612\" height=\"358\" loading=\"lazy\" /><figcaption>Site Overview: crawl, page status and speed cards.</figcaption></figure>\n\n        <p>The three cards at the top can show raw figures or a chart across audits; the switch on the tab row changes all three.</p>\n\n        <h4>Crawl &amp; Indexation</h4>\n        <p>\n          The share of reached pages that search engines are allowed to index, according to the crawler (this is not Google&rsquo;s own index).\n          The line below gives the number of pages reached and audited, the number of page types and how many pages of the site the results represent.\n          <strong>Details</strong> lists the pages that cannot be indexed and why: noindex, canonical pointing elsewhere, blocked by robots.txt,\n          redirect, error and so on. Orphan pages are listed here too.\n        </p>\n\n        <h4>Page Status</h4>\n        <p>\n          How the pages answered: <strong>Accessible</strong> (2xx), <strong>Redirecting</strong> (3xx), <strong>Blocked</strong> (401, 403, 429 or\n          disallowed by robots.txt), <strong>Missing</strong> (404, 410), <strong>Error</strong> (5xx and other 4xx) and <strong>Unreachable</strong>\n          (no answer).\n        </p>\n\n        <h4>Page Speed Timing</h4>\n        <p>\n          Loading times measured by the Poliris crawler in a desktop browser: a performance score and the main vitals. <strong>Details</strong>\n          lists the four vitals with their rating.\n        </p>\n        <table>\n          <thead><tr><th>Vital</th><th>Good</th><th>Poor</th></tr></thead>\n          <tbody>\n            <tr><td>LCP, largest content shown</td><td>2.5 s or less</td><td>more than 4 s</td></tr>\n            <tr><td>CLS, layout shift</td><td>0.1 or less</td><td>more than 0.25</td></tr>\n            <tr><td>FCP, first content shown</td><td>1.8 s or less</td><td>more than 3 s</td></tr>\n            <tr><td>TBT, time blocked while loading</td><td>200 ms or less</td><td>more than 600 ms</td></tr>\n          </tbody>\n        </table>\n        <p>\n          INP, Google&rsquo;s responsiveness metric, needs real visitors, so the crawl measures <strong>Total Blocking Time</strong> (TBT) instead, and the Core Web Vitals assessment covers LCP and CLS. A vital that could not be measured reads <em>Not measured</em>. The performance score is hidden when too few timing checks could be measured. Mobile timings are not measured.\n        </p>\n\n        <h4>Site Health Pipeline</h4>\n        <p>\n          One score per stage: Page Access, Content Access and Content Quality. Together they make the site&rsquo;s <strong>health score</strong>.\n        </p>\n        <p>\n          The first stage that holds the site back gets a bottleneck label, such as <em>Crawl bottleneck</em> or <em>Low content quality</em>, and the stages after it read\n          <em>Capped by</em> that stage: fixing a later stage helps little while an earlier one is blocking. Use <strong>Filter scores by page type</strong>\n          to see the pipeline for one type of page. Below, the three main issues of each stage are listed.\n          Click a stage or an issue to open it in the Issues tab.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S24\"><img src=\"/docs/images/s24-health-pipeline.webp\" alt=\"The pipeline shows which stage limits the others.\" width=\"1604\" height=\"674\" loading=\"lazy\" /><figcaption>The pipeline shows which stage limits the others.</figcaption></figure>\n\n        <h4>Health Score Evolution and Issues Overview</h4>\n        <p>\n          The health score (or the number of issues) across audits, and the total number of issues split into <strong>Critical</strong>,\n          <strong>Warning</strong> and <strong>Notice</strong> with the change since the previous audit. If earlier audits of the site used a different page limit,\n          the history starts at the current limit and the change since the previous audit is hidden.\n        </p>\n\n        <h4>Sitemap test</h4>\n        <p>\n          How search engines discover your pages: the number of URLs in your sitemap, an estimate of the URLs with problems (redirects, missing pages,\n          errors, noindex, canonical elsewhere), the audited pages that are in the sitemap and the orphan pages. <strong>View Full Report</strong>\n          lists the results of the sitemap tests.\n        </p>\n\n        <h4>Robots.txt test</h4>\n        <p>\n          Pages allowed and blocked by your robots.txt, and <strong>AI Crawler Access</strong>: whether the crawlers of ChatGPT, Claude, Gemini, Mistral\n          and Perplexity may read your site. An assistant is shown as blocked when robots.txt blocks any of its crawlers, including those used only for model training. Blocking its search crawlers makes it less likely to cite or link to your pages.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S25\"><img src=\"/docs/images/s25-sitemap-robots.webp\" alt=\"The Sitemap and Robots.txt cards, with AI crawler access.\" width=\"1609\" height=\"706\" loading=\"lazy\" /><figcaption>The Sitemap and Robots.txt cards, with AI crawler access.</figcaption></figure>\n\n        <h4>Connected Services</h4>\n        <p>\n          With Google Search Console connected: <strong>Total Visitors</strong> from search with the split by device, and <strong>Geography</strong>.\n          With Google Analytics connected: <strong>Traffic Sources</strong> (Search, Direct, Social, Paid and GEO, the visits coming from AI assistants).\n          Until a service is connected, its card is blurred with a <strong>Connect</strong> button. See <a href=\"#integration-gsc-1\">Google Search Console and Analytics</a>.\n        </p>"
      },
      {
        "id": "tech-issues-tab-1",
        "title": "Issues",
        "html": "<p class=\"lede\">\n          The Issues tab is the list of everything the audit found, test by test, with the pages affected.\n        </p>\n\n        <h3>Navigating the tests</h3>\n        <p>\n          The left column lists <strong>All Issues</strong>, then the three stages with their score and a colored dot (green, amber or red), then the categories of each stage with a score bar. Click a stage or a category to narrow the list.\n        </p>\n        <p>\n          The header of the list shows the score of the selection, how many tests are compliant, the split by severity, and the movement since the\n          previous crawl: <em>Fixed since last crawl</em>, <em>New this crawl</em> and <em>Net change this crawl</em>, counted in pages.\n        </p>\n\n        <h3>The issues table</h3>\n        <table>\n          <thead><tr><th>Column</th><th>What it shows</th></tr></thead>\n          <tbody>\n            <tr><td>Issue</td><td>The name of the test and its stage.</td></tr>\n            <tr><td>Category</td><td>The category of the test, such as Page Title or Sitemap.</td></tr>\n            <tr><td>Status</td><td>Critical, Warning, Notice, or Compliant when no page fails.</td></tr>\n            <tr><td>Pages affected</td><td>Failing pages out of the pages tested.</td></tr>\n            <tr><td>Change</td><td>The difference in pages affected since the previous crawl.</td></tr>\n          </tbody>\n        </table>\n        <p>\n          Filter by severity with the pills, search for a test or a category, and download the list as CSV or Excel with <strong>Export</strong>.\n          Click a row to open it: the recommendation, the description of the test, and the <strong>Affected links</strong> table with each page,\n          its type and its importance. Sort by importance to fix the pages that matter most first. The page URL opens the live page; <strong>Details</strong> at the end of the row opens the\n          <a href=\"#page-explorer-report-1\">details of this test</a> for the page.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S26\"><img src=\"/docs/images/s26-issues-tab.webp\" alt=\"The Issues tab, with one test opened.\" width=\"1640\" height=\"1023\" loading=\"lazy\" /><figcaption>The Issues tab, with one test opened.</figcaption></figure>\n\n        <h3>Severity</h3>\n        <ul>\n          <li><span class=\"badge sev-critical\">Critical</span> has the strongest effect on whether crawlers and AI tools can reach, read or trust the page. Fix it as soon as possible.</li>\n          <li><span class=\"badge sev-warning\">Warning</span> hurts performance or coverage without blocking access.</li>\n          <li><span class=\"badge sev-notice\">Notice</span> is a recommendation or a detail.</li>\n          <li><span class=\"badge sev-mixed\">Graded</span> means the severity depends on what the test finds on the page.</li>\n        </ul>\n        <p>\n          The severity of each test is given in the <a href=\"#reference-tests\">Technical Audit test reference</a>.\n        </p>"
      },
      {
        "id": "feature-technical-page-explorer-1",
        "title": "Page Explorer",
        "html": "<p class=\"lede\">\n          Page Explorer lists every audited page with its scores, so you can find the pages that need work and open their report.\n        </p>\n\n        <ul class=\"explorer-stats\">\n          <li class=\"stat-total\"><span class=\"stat-label\">Analyzed Pages</span><span class=\"stat-meta\">Pages that loaded normally (HTTP 200) and received the full audit</span></li>\n          <li class=\"stat-healthy\"><span class=\"stat-label\">Healthy pages</span><span class=\"stat-meta\">score 80 or more</span></li>\n          <li class=\"stat-issues\"><span class=\"stat-label\">Pages with issues</span><span class=\"stat-meta\">score 50 to 79</span></li>\n          <li class=\"stat-critical\"><span class=\"stat-label\">Critical pages</span><span class=\"stat-meta\">score below 50</span></li>\n        </ul>\n        <p>The four cards at the top also act as filters on the table.</p>\n\n        <h3>Page details</h3>\n        <p>The table has one row per page:</p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Link</span><span class=\"def-desc\">The page title opens its report; the URL below opens the live page.</span></li>\n          <li><span class=\"def-term\">Global Score</span><span class=\"def-desc\">The page score, shown in green, amber or red.</span></li>\n          <li><span class=\"def-term\">Details</span><span class=\"def-desc\">Three squares for the three stages. Gray means the stage was skipped, for example on a redirect.</span></li>\n          <li><span class=\"def-term\">Category columns</span><span class=\"def-desc\">The score of each test category, grouped by stage.</span></li>\n          <li><span class=\"def-term\">Page importance</span><span class=\"def-desc\">From 0 to 100: how much the page matters within your site. Fix the most important pages first.</span></li>\n          <li><span class=\"def-term\">Status and Indexability</span><span class=\"def-desc\">The HTTP status and whether the page can be indexed (Indexable, Noindex, Blocked by robots.txt, Non-Canonical, Redirected).</span></li>\n          <li><span class=\"def-term\">Page Type</span><span class=\"def-desc\">Home page, landing page, article, product page, category page, service page, contact page, about page, utility or legal page. A page found only in the sitemap is marked as an orphan page.</span></li>\n          <li><span class=\"def-term\">Page speed insight</span><span class=\"def-desc\"><em>Measured</em> when the page was loaded in a browser, <em>From template</em> when it uses the timings of a page with the same template.</span></li>\n        </ul>\n        <p>\n          <strong>Manage Column</strong> shows, hides and reorders columns. <strong>Sort &amp; Filter</strong> sorts by score or importance and filters on score ranges.\n          Active filters appear as chips you can remove.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S27\"><img src=\"/docs/images/s27-page-explorer.webp\" alt=\"Page Explorer lists every audited page.\" width=\"1640\" height=\"1073\" loading=\"lazy\" /><figcaption>Page Explorer lists every audited page.</figcaption></figure>\n\n        <h3>Priority map</h3>\n        <p>\n          Each bubble is a page, placed by its score (horizontal) and its importance (vertical). The pages in the top left are important and in poor\n          health: fixing them has the most effect. Click a bubble to open the page report.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S28\"><img src=\"/docs/images/s28-priority-map.webp\" alt=\"The Priority map: important pages with a low score come first.\" width=\"1640\" height=\"858\" loading=\"lazy\" /><figcaption>The Priority map: important pages with a low score come first.</figcaption></figure>"
      },
      {
        "id": "page-explorer-report-1",
        "title": "Page report",
        "html": "<p class=\"lede\">\n          The page report shows the audit of one URL. It has two tabs: <strong>Page Overview</strong> and <strong>Test details</strong>.\n        </p>\n\n        <h3>Page Overview</h3>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Indexability</span><span class=\"def-desc\">Whether the page can be indexed and, if not, why. It also shows the state of the canonical tag, robots rules and structured data.</span></li>\n          <li><span class=\"def-term\">Page Status</span><span class=\"def-desc\">The HTTP status, whether the page is accessible, and the date of the last crawl.</span></li>\n          <li><span class=\"def-term\">Page Speed Timing</span><span class=\"def-desc\">The timings of this page, measured on it or taken from its template.</span></li>\n          <li><span class=\"def-term\">Page Health Pipeline</span><span class=\"def-desc\">The three stage scores for this page, the bottleneck and the main issues of each stage.</span></li>\n          <li><span class=\"def-term\">Health Score Evolution and Top Issues</span><span class=\"def-desc\">The page score over audits and its issues by severity.</span></li>\n          <li><span class=\"def-term\">Connected Services</span><span class=\"def-desc\">With Search Console: clicks and impressions over time and the top queries of the page, with the share of branded searches. With Google Analytics: engagement time, bounce, scroll and active users.</span></li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S29\"><img src=\"/docs/images/s29-page-report.webp\" alt=\"The Page Overview of one URL.\" width=\"1638\" height=\"1079\" loading=\"lazy\" /><figcaption>The Page Overview of one URL.</figcaption></figure>\n\n        <h3>Test details</h3>\n        <p>\n          Every test run on the page with its result: Passed; Critical, Warning or Notice when it fails; Skipped when it does not apply to the page, for example the Content Quality tests on a noindex page; or <em>Not evaluated</em> when the test could not run during this audit. AI-evaluated tests run only on a selection of your most important pages.\n          Open a failing test to read the assessment and the recommendation, the values found on the page (for example the title and its length)\n          and the items to fix (for example the images without alt text). The header compares the page score with the site average.\n        </p>\n        <p>\n          When a fix can be prepared automatically, an <strong>Implement Fix</strong> button sends you to <a href=\"#feature-implementation\">Implementation</a> with the test selected.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S30\"><img src=\"/docs/images/s30-test-details.webp\" alt=\"Test details: the result of each test on this page.\" width=\"1614\" height=\"910\" loading=\"lazy\" /><figcaption>Test details: the result of each test on this page.</figcaption></figure>"
      }
    ]
  },
  "test-reference": {
    "title": "Technical Audit test reference",
    "breadcrumb": [
      "Docs",
      "Measure",
      "Technical Audit test reference"
    ],
    "intro": "<p class=\"lede\">\n          The full list of Technical Audit tests in Poliris: what each test checks, its severity and how to fix the issues it finds.\n        </p>\n\n        <ul class=\"tests-stats tests-stats-4\">\n          <li><span class=\"stat-num\">158</span><span class=\"stat-label\">Tests</span></li>\n          <li><span class=\"stat-num\">121</span><span class=\"stat-label\">Page level</span></li>\n          <li><span class=\"stat-num\">37</span><span class=\"stat-label\">Site level</span></li>\n          <li><span class=\"stat-num\">21</span><span class=\"stat-label\">Critical</span></li>\n        </ul>",
    "labels": {
      "sevCritical": "Critical",
      "sevWarning": "Warning",
      "sevNotice": "Notice",
      "sevMixed": "Graded",
      "lvlPage": "Page level",
      "lvlSite": "Site level",
      "aiYes": "AI-evaluated",
      "why": "Why it matters",
      "fails": "If the test fails",
      "fix": "How to fix it",
      "category": "Category",
      "notes": "Notes",
      "checks": "What it checks"
    },
    "howToRead": {
      "title": "How to read each test",
      "html": "<div class=\"tests-legend\">\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Severity</span>\n            <div class=\"legend-row\"><span class=\"badge sev-critical\">Critical</span><span>Fix as soon as possible</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-warning\">Warning</span><span>Plan a fix soon</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-notice\">Notice</span><span>Minor issue or recommendation</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-mixed\">Graded</span><span>Severity depends on what the test finds on the page</span></div>\n          </div>\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Level</span>\n            <div class=\"legend-row\"><span class=\"badge lvl-page\">Page level</span><span>Runs on each audited page</span></div>\n            <div class=\"legend-row\"><span class=\"badge lvl-site\">Site level</span><span>Runs once for the whole site</span></div>\n          </div>\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Method</span>\n            <div class=\"legend-row\"><span class=\"badge ai-yes\">AI-evaluated</span><span>Judged by an AI model on a selection of your most important pages</span></div>\n          </div>\n        </div>\n\n        <div class=\"callout info\">\n          <strong>When a test does not run.</strong> A redirecting URL only runs the redirect tests, and a page that could not be fetched only runs the Page URL tests. Pages set to noindex, or whose canonical points to another URL, skip the Content Quality tests and the title, meta description, heading, social metadata and structured data tests: search engines keep noindex pages out of their results and usually show the canonical URL instead of the others, so Poliris does not judge their content. Hreflang tests run on pages that declare hreflang; on a page without hreflang, only the presence test runs, and only on sites published in two languages or more. Content Quality tests are not run on legal, utility and HTML sitemap pages. Some tests depend on others or need enough to measure: structured data tests are skipped on a page without structured data, and text tests on pages with very little text. In the Test details tab, these tests appear as <em>Skipped</em>.\n        </div>\n\n        <ul class=\"tests-toc\">\n          <li><a href=\"#page-access\"><span class=\"toc-title\">Page Access</span><span class=\"toc-count\">85 tests in 9 categories</span></a></li>\n          <li><a href=\"#content-access\"><span class=\"toc-title\">Content Access</span><span class=\"toc-count\">57 tests in 10 categories</span></a></li>\n          <li><a href=\"#content-quality\"><span class=\"toc-title\">Content Quality</span><span class=\"toc-count\">16 tests in 4 categories</span></a></li>\n        </ul>"
    },
    "categories": [
      {
        "id": "page-access",
        "title": "Page Access",
        "groups": [
          {
            "id": "canonical-link",
            "title": "Canonical Link",
            "tests": [
              {
                "id": "test-canonical_indexability_status",
                "title": "Canonical Indexability Status",
                "checks": "Flags pages set to noindex (meta robots tag or <code>X-Robots-Tag</code> header) whose canonical points to another URL; a noindex page with a canonical to itself passes.",
                "why": "A canonical to another URL says the page is a duplicate of that URL, while noindex asks search engines to drop the page entirely. Google advises against noindex for duplicates and recommends the canonical instead.",
                "fails": "Search engines receive two instructions that contradict each other and decide which one to follow, so the signals meant for the canonical URL may not be consolidated.",
                "fix": "<ul><li>If the page is a duplicate, keep the canonical to the main URL and remove the noindex.</li><li>If the page must stay out of search results, keep the noindex and remove the canonical, or make it point to the page itself.</li><li>Check where the noindex comes from: the meta robots tag, the <code>X-Robots-Tag</code> header, or a CMS or plugin setting.</li></ul>"
              },
              {
                "id": "test-canonical_link_fragments",
                "title": "Canonical Link Fragments",
                "checks": "Flags pages whose canonical URL contains a fragment, the part of the URL that starts with #.",
                "why": "Search engines generally ignore the part of a URL after #, so a canonical with a fragment does not name a distinct page. It is usually a template or plugin error.",
                "fails": "Search engines may drop the fragment or ignore the canonical, and then choose the preferred URL themselves.",
                "fix": "<ul><li>Point the canonical to the URL without the fragment: <code>https://example.com/services/</code>, not <code>https://example.com/services/#consulting</code>.</li><li>Check the template or SEO plugin setting that builds the canonical; links from a table of contents are a common cause.</li></ul>"
              },
              {
                "id": "test-canonical_link_indexability",
                "title": "Canonical Link Indexability",
                "checks": "Checks that the URL named in the canonical answers directly (no redirect, no error, no loop), is its own canonical, and is neither noindex nor disallowed in robots.txt.",
                "why": "When the canonical names another URL, search engines are asked to show that URL instead: if it redirects, fails or cannot be indexed, the hint leads nowhere. The test is skipped when that URL was not crawled.",
                "fails": "Search engines are likely to ignore the canonical and choose the preferred URL themselves, which may not be the one you want.",
                "fix": "<ul><li>Point the canonical to the final URL, the one that answers 200 without a redirect.</li><li>Make sure that URL declares itself as canonical, so there is no chain (A &gt; B &gt; C) or loop (A &gt; B &gt; A).</li><li>Remove the noindex or the robots.txt Disallow rule that affects the target, or choose another canonical URL.</li></ul>"
              },
              {
                "id": "test-canonical_match",
                "title": "Canonical Match",
                "checks": "Flags pages whose canonical URL is not their own URL; only a trailing slash is ignored, so protocol, host, letter case and parameters must match exactly.",
                "why": "A canonical that names another URL tells search engines this page is a duplicate and that the other URL should be shown. That is right for true duplicates, not for a page meant to rank on its own.",
                "fails": "If the page should rank, search engines are likely to show the other URL instead. Poliris also skips the content tests on this page, since search engines usually show the canonical URL.",
                "fix": "<ul><li>If the page should rank, set its canonical to its exact URL: <code>&lt;link rel=\"canonical\" href=\"https://example.com/page/\"&gt;</code>.</li><li>Use the same protocol, host and spelling as the live URL, for example https and www if that is your main version.</li><li>If the page is a real duplicate (print version, filter parameters), keep the canonical to the main URL: the result is expected.</li></ul>"
              },
              {
                "id": "test-canonical_singularity",
                "title": "Canonical Singularity",
                "checks": "Checks that the HTML of the page contains exactly one <code>&lt;link rel=\"canonical\"&gt;</code> tag, and flags pages that declare several.",
                "why": "When a page declares more than one canonical, Google says it may ignore all of them. Duplicates usually come from two tools writing the tag, such as a theme and an SEO plugin.",
                "fails": "Your canonical may be ignored, and search engines then choose the preferred URL themselves.",
                "fix": "<ul><li>Keep one canonical tag in the <code>&lt;head&gt;</code> and remove the others.</li><li>If a theme and an SEO plugin both write the tag, turn it off in one of them.</li><li>If you also send a canonical in the HTTP <code>Link</code> header, make it name the same URL as the tag.</li></ul>"
              },
              {
                "id": "test-canonical_syntax",
                "title": "Canonical Syntax",
                "checks": "Flags canonical <code>&lt;link&gt;</code> tags that carry an attribute the <code>&lt;link&gt;</code> element does not define, such as <code>content</code> or <code>target</code>; <code>data-</code> and <code>aria-</code> attributes are accepted.",
                "why": "A canonical tag only needs <code>rel</code> and <code>href</code>. An attribute borrowed from another element usually means the tag was built by mistake, often an attempt to put an instruction such as noindex inside it.",
                "fails": "Search engines do not read the extra attribute, so an instruction placed there, such as noindex, has no effect on the page.",
                "fix": "<ul><li>Write the tag with <code>rel</code> and <code>href</code> only: <code>&lt;link rel=\"canonical\" href=\"https://example.com/page/\"&gt;</code>.</li><li>Put indexing instructions in a separate tag: <code>&lt;meta name=\"robots\" content=\"noindex\"&gt;</code>.</li><li>Check the template or plugin that generates the tag; <code>data-</code> attributes added by frameworks are accepted.</li></ul>"
              },
              {
                "id": "test-canonical_url_declaration",
                "title": "Canonical URL Declaration",
                "checks": "Flags pages that declare no canonical URL, neither with a <code>&lt;link rel=\"canonical\"&gt;</code> tag in the <code>&lt;head&gt;</code> nor in the HTTP <code>Link</code> header.",
                "why": "The canonical tells search engines which URL to show when the same content is reachable at several addresses (parameters, http and https, trailing slash). Without it, they choose on their own.",
                "fails": "Search engines pick the preferred URL themselves, possibly a variant with parameters. The other canonical tests are skipped on this page.",
                "fix": "<ul><li>Add a self-referencing canonical in the <code>&lt;head&gt;</code>: <code>&lt;link rel=\"canonical\" href=\"https://example.com/page/\"&gt;</code>.</li><li>Use the absolute URL of the version you want shown, with your main protocol and host.</li><li>You can also send it in the HTTP header: <code>Link: &lt;https://example.com/page/&gt;; rel=\"canonical\"</code>.</li></ul>"
              },
              {
                "id": "test-site_noncanonical_pages",
                "title": "Non-canonical Pages Found",
                "checks": "Lists the audited URLs whose canonical points to another URL, or whose canonical declarations name different URLs (for example the tag and the HTTP header).",
                "why": "This list has no effect on the score: it shows the URLs you ask search engines to replace with another one, so you can confirm each case is intended. Content tests are skipped on these pages.",
                "fails": "If a listed URL should rank on its own, its canonical is wrong, and search engines are likely to show the other URL instead.",
                "fix": "<ul><li>Check each URL: a canonical to another page is right for true duplicates (parameters, print versions).</li><li>Fix canonicals that point elsewhere by mistake, for example every page to the homepage.</li><li>When two declarations conflict, keep one or make both name the same URL.</li><li>Point internal links and sitemap entries to the canonical URLs.</li></ul>"
              }
            ]
          },
          {
            "id": "domain",
            "title": "Domain",
            "tests": [
              {
                "id": "test-4xx_status_return",
                "title": "4xx Status Return",
                "checks": "Requests a URL that cannot exist on your site and checks that the server answers with a 4xx status; a 200, or a redirect to a live page, fails.",
                "why": "A missing page that answers 200 or redirects to another page is what Google calls a soft 404: it looks like a valid page but has no content. The test is skipped when the request is blocked, rate-limited or answers 5xx.",
                "fails": "Search engines have to guess that these pages are errors: missing URLs keep being crawled, and an error page can be indexed as if it were real content.",
                "fix": "<ul><li>Configure the server or CMS to answer 404, or 410 for content removed for good, to any unknown URL.</li><li>Keep a helpful custom error page, served with the 404 status.</li><li>Do not redirect every missing URL to the homepage; redirect only pages that moved, to their new address.</li></ul>"
              },
              {
                "id": "test-content_security_authority",
                "title": "Content Security Authority",
                "checks": "Checks that your pages send an enforcing <code>Content-Security-Policy</code> header; a <code>Content-Security-Policy-Report-Only</code> header alone fails.",
                "why": "A Content Security Policy tells browsers which sources may load scripts, styles and other resources, which limits cross-site scripting; it is a security measure, not a ranking factor. Poliris checks that the header is sent, not the rules it contains.",
                "fails": "Browsers apply no content policy, so a script injected through a vulnerability can run on your pages. A report-only header reports violations but blocks nothing.",
                "fix": "<ul><li>Test a policy first with <code>Content-Security-Policy-Report-Only</code> to see what it would block without breaking the site.</li><li>Then send the same policy as <code>Content-Security-Policy</code>: the test passes once every page sends the enforcing header.</li><li>Set it in the server, CDN or hosting configuration, so cached pages send it too.</li></ul>"
              },
              {
                "id": "test-favicon_presence",
                "title": "Favicon Presence",
                "checks": "Checks that the homepage declares a favicon with an icon link in its HTML, such as <code>&lt;link rel=\"icon\"&gt;</code>; a <code>/favicon.ico</code> file without the tag fails.",
                "why": "Browsers show the favicon in tabs and bookmarks, and Google shows it next to your site in search results. Google reads it from the icon link on the homepage.",
                "fails": "Google may show a default icon next to your results, which makes your site harder to spot. Browsers often still find a <code>/favicon.ico</code> file at the root, but Google asks for the link tag.",
                "fix": "<ul><li>Add <code>&lt;link rel=\"icon\" href=\"/favicon.ico\"&gt;</code> (or a PNG or SVG file) in the <code>&lt;head&gt;</code> of the homepage, ideally of every page.</li><li>Use a square image larger than 48 by 48 pixels, as Google recommends.</li><li>Make sure robots.txt does not block the homepage or the icon file.</li></ul>"
              },
              {
                "id": "test-master_version",
                "title": "Master Version",
                "checks": "Checks that the four versions of your domain (http and https, with and without www) end on the same URL; versions that answer separately fail, temporary redirects give a warning.",
                "why": "If several versions answer, search engines see several copies of the site and split links and signals between them. Permanent redirects (301, 308) tell them which version to keep; temporary ones (302, 303, 307) are a weaker signal.",
                "fails": "Search engines may index pages under several versions of the domain, or keep the version you did not choose, and the signals from links are split.",
                "fix": "<ul><li>Choose one version, for example <code>https://www.example.com/</code>.</li><li>Redirect the three others to it with a 301 or 308, in a single hop if possible.</li><li>Replace 302 or 307 redirects between versions with permanent ones.</li><li>Use the chosen version in canonicals, internal links and the sitemap.</li></ul>"
              },
              {
                "id": "test-secure_redirects",
                "title": "Secure Redirects",
                "checks": "Checks that the http:// version of your site redirects to https:// on the same domain; an http:// page that answers without redirecting, or redirects to another domain, fails.",
                "why": "Without this redirect, pages stay reachable without encryption and search engines can find two versions of each; Google recommends server-side permanent redirects from HTTP to HTTPS. The test is skipped when the check is blocked.",
                "fails": "Visitors who type your address or follow an old http:// link use an unencrypted connection that browsers mark as not secure, and both versions can be indexed.",
                "fix": "<ul><li>Redirect every http:// URL to the same path on https:// with a server-side 301.</li><li>Set it in the server, CDN or hosting panel; many offer an option to always use HTTPS.</li><li>Once HTTPS works everywhere, add a <code>Strict-Transport-Security</code> header so browsers go straight to https://.</li></ul>"
              },
              {
                "id": "test-security_headers",
                "title": "Security Headers",
                "checks": "Checks that every crawled page sends <code>Strict-Transport-Security</code> (on HTTPS, max-age of 6 months or more), <code>X-Content-Type-Options</code>, <code>X-Frame-Options</code> and <code>Referrer-Policy</code>; the test fails as soon as one page lacks one.",
                "why": "These headers tell browsers to use HTTPS only, not to guess file types, not to let other sites frame your pages, and how much of the page address to share. Content-Security-Policy has its own test.",
                "fails": "Visitors are more exposed to downgrade, clickjacking and content-sniffing attacks. When only some pages send the headers, a server or cache rule usually does not cover every page.",
                "fix": "<ul><li>Add the headers in the server, CDN or hosting configuration, so every response sends them.</li><li>Send <code>Strict-Transport-Security: max-age=31536000</code> (one year), adding <code>includeSubDomains</code> only if every subdomain serves HTTPS.</li><li>Send <code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options: SAMEORIGIN</code> and <code>Referrer-Policy: strict-origin-when-cross-origin</code>.</li></ul>"
              },
              {
                "id": "test-ssl_validator",
                "title": "SSL Validator",
                "checks": "Checks that the certificate your domain presents over HTTPS is valid: trusted by browsers, issued for your domain name and not expired.",
                "why": "The certificate lets browsers encrypt the connection and confirm they reach your real site; Google also uses HTTPS as a light ranking signal. The test is skipped when the server cannot be reached.",
                "fails": "Browsers show a full-page security warning instead of your content, and many visitors leave at that point.",
                "fix": "<ul><li>Renew the certificate before it expires, and turn on automatic renewal with your host or certificate authority.</li><li>Make sure it covers every host name you use, with and without www.</li><li>Install the full certificate chain, intermediate certificates included, on the server or CDN.</li></ul>"
              }
            ]
          },
          {
            "id": "links",
            "title": "Links",
            "tests": [
              {
                "id": "test-anchor_text_presence",
                "title": "Anchor Text Presence",
                "checks": "Flags internal links with no accessible name: no visible text, no alt text on an image inside the link, and no <code>aria-label</code>, <code>aria-labelledby</code> or <code>title</code> attribute.",
                "why": "Anchor text tells search engines what the linked page is about, and for an image link Google uses the alt text. Screen readers also read it aloud to describe the link.",
                "fails": "The link gives no description of its destination: search engines get no context from it, and screen reader users only hear that there is a link.",
                "fix": "<ul><li>Give each listed link a short text that describes its destination.</li><li>For image links, add alt text to the image: <code>&lt;img src=\"logo.svg\" alt=\"Example home\"&gt;</code>.</li><li>For icon links, add an <code>aria-label</code> to the link, for example <code>aria-label=\"View cart\"</code>.</li></ul>"
              },
              {
                "id": "test-external_link_authority",
                "title": "External Link Authority",
                "checks": "Flags pages that link to more than 20 different external URLs; several links to the same URL count once.",
                "why": "Linking to sources is useful, and Google sets no limit on external links. Poliris uses 20 as a threshold to point out pages whose outbound links are worth reviewing.",
                "fails": "The page is flagged for review: it sends visitors to many other sites, which is expected on a resource list but less so on a product or service page.",
                "fix": "<ul><li>Keep the external links that support your content and remove those that add nothing for the reader.</li><li>Check links repeated in shared templates (footer, sidebar), which add to the count on every page.</li><li>Mark paid or affiliate links with <code>rel=\"sponsored\"</code> and links in user content with <code>rel=\"ugc\"</code>.</li></ul>"
              },
              {
                "id": "test-external_link_integrity",
                "title": "External Link Integrity",
                "checks": "Flags external links whose target answers 404, 410 or 5xx, or whose domain no longer resolves; 301 and 308 redirects are notices, and 401, 403 or 429 answers are not counted.",
                "why": "A dead external link sends visitors to an error instead of the source you meant to cite. Some sites refuse automated checks, which is why 401, 403 and 429 answers are listed without being counted.",
                "fails": "Visitors who click reach an error page, and the reference that supported your content is lost.",
                "fix": "<ul><li>Update the link to the new address of the resource if it moved.</li><li>Replace it with another reliable source, or remove it if it is no longer needed.</li><li>For links listed as permanent redirects, link straight to the final URL.</li><li>Open the links that could not be checked in a browser to confirm they work.</li></ul>"
              },
              {
                "id": "test-internal_link_directness",
                "title": "Internal Link Directness",
                "checks": "Flags internal links that point to a URL that redirects (3xx).",
                "why": "Search engines follow redirects, but each one adds a request before the page loads. Linking straight to the final URL is faster and makes clear which address is the right one.",
                "fails": "Each click goes through a redirect first, which adds load time for visitors, and crawlers make an extra request to reach each page.",
                "fix": "<ul><li>Update the <code>href</code> of each listed link to the final URL shown next to it.</li><li>Check menus, footers and templates first: one fix there corrects every page.</li><li>Common causes: old URLs after a migration, http:// links, and a missing or extra trailing slash.</li></ul>"
              },
              {
                "id": "test-internal_link_integrity",
                "title": "Internal Link Integrity",
                "checks": "Flags internal links whose target answers a 4xx error (404, 410 and others); targets that gave no answer or a server error are not counted.",
                "why": "A broken internal link is a dead end: visitors reach an error page, and crawlers cannot reach the page you meant to link to through it.",
                "fails": "Visitors hit an error, and the page that should receive the link gets no link from here. Poliris also points out email addresses written without <code>mailto:</code>, which browsers open as pages.",
                "fix": "<ul><li>Update the link to the right page, or remove it if no replacement exists.</li><li>Redirect the old URL (301) for visitors and external links, but still update your own links: a redirected link fails Internal Link Directness.</li><li>Write email links with <code>mailto:</code>, for example <code>href=\"mailto:contact@example.com\"</code>.</li></ul>"
              },
              {
                "id": "test-internal_links_with_tracking_parameters",
                "title": "Internal Links With Tracking Parameters",
                "checks": "Flags internal links whose URL carries analytics or ad-click parameters: <code>utm_</code> parameters, <code>gclid</code>, <code>fbclid</code>, <code>msclkid</code> and similar.",
                "why": "These parameters identify visits that come from campaigns and other sites. On an internal link, they create another URL for the same page.",
                "fails": "Analytics tools such as Google Analytics can credit the visit to the campaign in the link instead of its real source, and search engines can see the tagged URL as a duplicate of the page.",
                "fix": "<ul><li>Remove the parameters so the link points to the clean URL, for example <code>https://example.com/offer/</code>.</li><li>Look for URLs copied from a newsletter, an ad or an AI answer (<code>utm_source=chatgpt.com</code>).</li><li>To measure clicks on internal links, use analytics events rather than URL parameters.</li></ul>"
              },
              {
                "id": "test-internal_nofollow_links",
                "title": "Internal Nofollow Links",
                "checks": "Flags internal links marked <code>rel=\"nofollow\"</code> that point to pages meant to be indexed: not blocked by robots.txt, not set to noindex, and listed in the sitemap when one exists.",
                "why": "The <code>nofollow</code> value asks search engines not to follow a link or pass it credit, and Google treats it as a hint. On a link to your own page, it works against your internal linking.",
                "fails": "The linked page can receive less internal link credit, and crawlers that respect nofollow may find it later. In a menu or footer, the instruction is repeated on every page.",
                "fix": "<ul><li>Remove <code>nofollow</code> from the <code>rel</code> attribute of these links; keep <code>noopener</code> or <code>noreferrer</code> if present.</li><li>To keep a page out of search results, set noindex on that page instead of nofollowing the links to it.</li><li>Check menu, footer and account links in templates, where nofollow is often added by default.</li></ul>"
              },
              {
                "id": "test-link_relationship_syntax",
                "title": "Link Relationship Syntax",
                "checks": "Flags links whose <code>rel</code> attribute contains a value that is not a recognized link type, such as <code>no-follow</code>, <code>dofollow</code> or <code>follow</code>.",
                "why": "Search engines only act on rel values they know, such as <code>nofollow</code>, <code>sponsored</code> or <code>ugc</code>. A misspelled or invented value has no effect, so the instruction you meant to give is not applied.",
                "fails": "The link is treated as if the value were not there: a paid or untrusted link you meant to qualify stays unqualified.",
                "fix": "<ul><li>Correct typos, for example <code>no-follow</code> to <code>nofollow</code>.</li><li>Remove <code>dofollow</code> and <code>follow</code>: links are followed by default.</li><li>Use <code>sponsored</code> for paid links and <code>ugc</code> for links in comments or forums.</li><li>Theme or plugin values such as <code>lightbox</code> are flagged too: move them to a <code>class</code> or <code>data-</code> attribute if possible.</li></ul>"
              },
              {
                "id": "test-link_volume_optimization",
                "title": "Link Volume Optimization",
                "checks": "Flags pages with 500 links or more, internal and external together, each occurrence counted.",
                "why": "Google sets no fixed limit, but very long link lists (large menus, tag clouds, filters) make pages heavier and hide the links that matter. 500 is a Poliris threshold.",
                "fails": "The page is flagged for review. The cause is often a navigation or listing template repeated across many pages.",
                "fix": "<ul><li>Trim large menus to the main sections, and link deeper pages from those sections.</li><li>Paginate long lists, and remove repeated links to the same page.</li><li>Move tag clouds and long filter lists off the pages where they are not needed.</li></ul>"
              },
              {
                "id": "test-master_canonical",
                "title": "Master Canonical",
                "checks": "Flags internal links to crawled pages whose canonical names another URL; links to pages without a canonical are left to Canonical URL Declaration.",
                "why": "Google recommends linking to the canonical URL within your site: consistent internal links help it understand which version you prefer.",
                "fails": "Your internal links promote a duplicate instead of the canonical, so search engines get mixed signals about which URL to show, and crawlers spend requests on the duplicate.",
                "fix": "<ul><li>Update each listed link to the canonical URL of its target.</li><li>Common causes: links with parameters, an http or https mismatch, and trailing slash or letter case differences.</li><li>If the linked page should rank on its own, fix its canonical so it points to itself.</li></ul>"
              },
              {
                "id": "test-outlink_accessibility",
                "title": "Outlink Accessibility",
                "checks": "Flags internal links to pages that your sitemap lists but your robots.txt blocks for Googlebot; blocked pages kept out of the sitemap (login, cart, search) are not flagged.",
                "why": "A URL in the sitemap asks search engines to crawl it, while a Disallow rule forbids it: the contradiction is usually a mistake in one of the two files. Without a sitemap, nothing is flagged.",
                "fails": "Search engines cannot read the page, so its content is not used, although the URL can still appear in results without a description when other pages link to it.",
                "fix": "<ul><li>If the page should be indexed, remove or narrow the Disallow rule that blocks it.</li><li>If it should stay blocked, remove it from the sitemap.</li><li>Check for rules broader than intended: <code>Disallow: /blog</code> also blocks <code>/blog-news/</code>.</li></ul>"
              },
              {
                "id": "test-too_few_dofollow_internal_links",
                "title": "Too few dofollow internal links",
                "checks": "Flags pages linked from fewer than five crawled pages through followed links (without <code>rel=\"nofollow\"</code>); several links from the same page count once.",
                "why": "Internal links help search engines find a page and judge its importance within your site. Five linking pages is a Poliris threshold; pages that no crawled page links to are left to Orphaned Page Detection.",
                "fails": "The page is reachable from few places, so crawlers may visit it less often, and it receives little of your internal link signal.",
                "fix": "<ul><li>Add contextual links to the page from related articles, guides or product pages.</li><li>List it in the category or hub page it belongs to.</li><li>Remove <code>nofollow</code> from the internal links that point to it.</li></ul>"
              }
            ]
          },
          {
            "id": "meta-robots",
            "title": "Meta Robots",
            "tests": [
              {
                "id": "test-meta_robots_nofollow_identifier",
                "title": "Meta Robots \"Nofollow\" Identifier",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>nofollow</code> (or <code>none</code>, which means <code>noindex</code>, <code>nofollow</code>).",
                "why": "Links are how search engines and AI crawlers find your pages and connect them. A page-level <code>nofollow</code> asks them to ignore every link on the page, internal links included.",
                "fails": "Pages linked only from this one may be discovered late or not at all, and its links may not count for the pages they point to.",
                "fix": "<ul><li>Remove <code>nofollow</code> from the robots meta tag or <code>X-Robots-Tag</code> header of pages whose links should be followed.</li><li>To qualify a single link (paid, user-generated), use <code>rel=\"nofollow\"</code>, <code>rel=\"sponsored\"</code> or <code>rel=\"ugc\"</code> on that link instead.</li><li>Check the SEO plugin or CMS setting that adds the tag, often a leftover from a staging site.</li></ul>"
              },
              {
                "id": "test-meta_robots_contradictory_status",
                "title": "Meta Robots Contradictory Status",
                "checks": "Flags pages whose robots directives contradict each other, such as <code>index</code> with <code>noindex</code> or <code>follow</code> with <code>nofollow</code>, in one tag, across several tags or with the <code>X-Robots-Tag</code> header.",
                "why": "When robots rules conflict, Google applies the more restrictive one. A contradiction usually means two sources write the directives, for example the theme and an SEO plugin, so the page does not behave as intended.",
                "fails": "The restrictive directive wins: a page meant to be indexed can stay out of search results, or its links can go unfollowed, while the tag seems to say the opposite.",
                "fix": "<ul><li>Keep a single robots meta tag per page and state each directive once.</li><li>Check whether the theme, an SEO plugin or the server (<code>X-Robots-Tag</code> header) adds a second set of directives, and keep one source.</li><li>Remove <code>index</code> and <code>follow</code> if you do not need them: they are the default behavior.</li></ul>"
              },
              {
                "id": "test-meta_robots_deprecated_directives",
                "title": "Meta Robots Deprecated Directives",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header still contains <code>noodp</code> or <code>noydir</code>.",
                "why": "These directives stopped search engines from using descriptions from the Open Directory Project (DMOZ) and the Yahoo Directory. Both directories have closed, DMOZ in 2017 and the Yahoo Directory in 2014, so the directives have no effect.",
                "fails": "Nothing changes in search results: the directives are ignored. They make the tag harder to read and often point to a template that has not been reviewed for years.",
                "fix": "<ul><li>Delete <code>noodp</code> and <code>noydir</code> from the tag or header: <code>noindex, noodp</code> becomes <code>noindex</code>.</li><li>Review the other directives of the same tag: an old template may carry rules that no longer match your intent.</li></ul>"
              },
              {
                "id": "test-meta_robots_expiry_directive",
                "title": "Meta Robots Expiry Directive",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>unavailable_after</code>, which sets a date after which the page should leave search results.",
                "why": "Google stops showing the page after the date given in the directive. Set once for an event or an offer, the rule stays in place when the page is reused or updated, until someone removes it.",
                "fails": "Once the date has passed, the page drops out of Google's results and its search traffic stops, which is easy to miss because nothing else on the page has changed.",
                "fix": "<ul><li>Remove <code>unavailable_after</code> from pages that should stay in search results.</li><li>Keep it only for content that really expires, such as an event page, and check the date whenever the page is updated.</li><li>Use a standard date format, for example <code>unavailable_after: 2027-06-30</code> (ISO 8601): Google ignores the rule when the date is not valid.</li></ul>"
              },
              {
                "id": "test-meta_robots_image_indexing",
                "title": "Meta Robots Image Indexing",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>noimageindex</code>, which asks search engines not to index the images on the page.",
                "why": "Images bring visits from Google Images and can illustrate the page in other results. With <code>noimageindex</code>, the page stays indexable but its images are left out, a loss that page rankings do not reveal.",
                "fails": "Google does not index the images on this page, so they bring no visits from image search and cannot illustrate the page in results that show pictures.",
                "fix": "<ul><li>Remove <code>noimageindex</code> from pages whose images should be found, such as product, recipe or portfolio pages.</li><li>If only some files must stay out of image search, block their folder in robots.txt for <code>Googlebot-Image</code> instead of the whole page.</li></ul>"
              },
              {
                "id": "test-meta_robots_indexing_status",
                "title": "Meta Robots Indexing Status",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>noindex</code> (or <code>none</code>); legal and utility pages are not evaluated, since they are often kept out of results on purpose.",
                "why": "A <code>noindex</code> page is kept out of search results. Google's AI Overviews and AI Mode only link to indexed pages, so the page cannot appear there as a source either.",
                "fails": "The page brings no organic traffic while the directive stays. A <code>noindex</code> left by mistake, often from a staging site or a CMS setting, can remove important pages without any visible sign.",
                "fix": "<ul><li>Remove <code>noindex</code> from every page that should appear in search results.</li><li>Keep it on pages with no search value: internal search results, cart, account, thank-you pages.</li><li>Check CMS options such as \"Discourage search engines from indexing this site\" in WordPress, and the <code>X-Robots-Tag</code> header set by the server.</li><li>To keep a page out, leave it crawlable: a URL blocked in robots.txt cannot show its <code>noindex</code> to Google.</li></ul>"
              },
              {
                "id": "test-meta_robots_location",
                "title": "Meta Robots Location",
                "checks": "Flags pages with a <code>&lt;meta name=\"robots\"&gt;</code> tag placed outside the <code>&lt;head&gt;</code> element, usually in the <code>&lt;body&gt;</code>.",
                "why": "The HTML standard places <code>&lt;meta name&gt;</code> tags in the <code>&lt;head&gt;</code>, and Google asks for the robots tag there. Google also reads one in the body, but other crawlers may not, and Poliris applies only directives found in the <code>&lt;head&gt;</code>.",
                "fails": "Crawlers may treat the page differently: a <code>noindex</code> in the body can be honored by Google and missed by other search engines or AI crawlers. Poliris's other meta robots tests do not take it into account.",
                "fix": "<ul><li>Move the tag between <code>&lt;head&gt;</code> and <code>&lt;/head&gt;</code>, for example <code>&lt;meta name=\"robots\" content=\"noindex\"&gt;</code>.</li><li>Remove elements that do not belong in the head, such as <code>&lt;img&gt;</code> or <code>&lt;iframe&gt;</code>, placed before the tag: browsers end the head there.</li><li>Check the theme, plugin or page builder that prints the tag, so that it writes it in the head.</li></ul>"
              },
              {
                "id": "test-meta_robots_protocol_and_syntax_integrity",
                "title": "Meta Robots Protocol & Syntax Integrity",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains a directive that search engines do not recognize, such as a typo (<code>noidex</code>, <code>no-index</code>) or a missing comma.",
                "why": "Search engines apply only the directives they know. A misspelled rule is not applied, so a page you meant to exclude can stay indexed without any visible error.",
                "fails": "The intended restriction does not apply: a misspelled <code>noindex</code> leaves the page indexable, a misspelled <code>nosnippet</code> leaves its snippet in place.",
                "fix": "<ul><li>Use directives documented by search engines, such as <code>noindex</code>, <code>nofollow</code>, <code>nosnippet</code>, <code>noimageindex</code>, <code>max-snippet</code> or <code>unavailable_after</code>.</li><li>Separate directives with commas: <code>noindex, nofollow</code>, not <code>noindex nofollow</code>.</li><li>Write values after a colon: <code>max-snippet:50</code>, not <code>max-snippet=50</code>.</li></ul>"
              },
              {
                "id": "test-meta_robots_snippet_suppression",
                "title": "Meta Robots Snippet Suppression",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>nosnippet</code>, which removes the text snippet under the page's search result.",
                "why": "The snippet tells searchers what the page offers before they click. Google applies <code>nosnippet</code> to all its result types, AI Overviews and AI Mode included.",
                "fails": "The result shows no description, which can lower clicks, and Google stops using the page's text as a direct input for AI Overviews and AI Mode.",
                "fix": "<ul><li>Remove <code>nosnippet</code> from pages you want to be found and quoted.</li><li>To limit rather than remove the snippet, use <code>max-snippet:[number]</code>, for example <code>max-snippet:160</code>.</li><li>To hide only part of the page, such as a legal notice, wrap it in a <code>div</code>, <code>span</code> or <code>section</code> carrying <code>data-nosnippet</code>.</li></ul>"
              },
              {
                "id": "test-meta_robots_translation_block",
                "title": "Meta Robots Translation Block",
                "checks": "Flags pages whose robots meta tag or <code>X-Robots-Tag</code> header contains <code>notranslate</code>, which stops Google from offering a translation of the page in search results.",
                "why": "When a result is not in the searcher's language, Google may show a translated title and snippet and open the page through Google Translate. The <code>notranslate</code> directive turns this off for the page.",
                "fails": "Searchers using another language see the result untranslated and are less likely to visit, which matters most when the page has no version in their language.",
                "fix": "<ul><li>Remove <code>notranslate</code> unless the exact wording must be kept, as with contractual or regulated text.</li><li>If the page exists in several languages, link the versions with hreflang so each searcher gets the right one.</li><li>To keep a few words untranslated, such as a brand name, mark them with <code>translate=\"no\"</code> in the HTML.</li></ul>"
              }
            ]
          },
          {
            "id": "page-efficiency",
            "title": "Page Efficiency",
            "tests": [
              {
                "id": "test-core_web_vitals_assessment",
                "title": "Core Web Vitals Assessment",
                "checks": "Checks that the LCP (2.5 s or less) and CLS (0.1 or less) measured by Poliris during the crawl meet Google's Core Web Vitals thresholds; skipped when either could not be measured.",
                "why": "Core Web Vitals are Google's measures of loading, responsiveness and visual stability; Google says good scores align with what its ranking systems reward. INP, the responsiveness measure, needs real visitors, so a crawl assesses LCP and CLS.",
                "fails": "Visitors wait for the main content or see it shift while the page loads. If real Chrome users experience the same, the page fails Google's own assessment as well.",
                "fix": "<ul><li>Start with the metric that fails: the LCP Speed and Layout Responsiveness tests give its value and how to improve it.</li><li>Prioritize the templates that serve the most pages, such as product or article pages, since one fix applies to all of them.</li><li>Check the Core Web Vitals report in Search Console, based on real visitors, once it has data for your pages.</li></ul>"
              },
              {
                "id": "test-css_file_optimization",
                "title": "CSS File Optimization",
                "checks": "Flags pages whose stylesheets loaded with <code>&lt;link rel=\"stylesheet\"&gt;</code> add up to 300 KB or more; inline styles are not counted.",
                "why": "Browsers wait for stylesheets before displaying the page, so heavy CSS delays the first display, especially on mobile. 300 KB is a Poliris recommendation, not a browser or search engine limit.",
                "fails": "First Contentful Paint and Largest Contentful Paint get slower, and visitors download styles that the page often does not use.",
                "fix": "<ul><li>Remove unused CSS, for example styles of plugins or templates the page does not use.</li><li>Load only the stylesheets each template needs instead of one site-wide bundle.</li><li>Minify the files and serve them compressed (gzip or Brotli).</li></ul>"
              },
              {
                "id": "test-dom_element_size",
                "title": "DOM Element Size",
                "checks": "Flags pages whose HTML contains 1,000 elements or more.",
                "why": "Each element adds work when the browser computes styles and layout, so a large DOM slows rendering and reactions to clicks, especially on mobile. 1,000 is a Poliris recommendation.",
                "fails": "The page displays and responds more slowly, and its HTML is heavier for every visitor and crawler to download and process.",
                "fix": "<ul><li>Remove the extra wrappers that page builders nest around content.</li><li>Avoid duplicating content in the HTML, such as separate desktop and mobile menus.</li><li>Split long lists of products or comments into paginated pages.</li><li>Replace repeated inline SVG icons with an SVG sprite or image files.</li></ul>"
              },
              {
                "id": "test-fcp_speed",
                "title": "FCP Speed",
                "checks": "Checks that the First Contentful Paint measured by Poliris during the crawl is 1.8 seconds or less; skipped when it could not be measured.",
                "why": "First Contentful Paint is the time until the browser shows the first text or image. Until then, the visitor sees a blank screen.",
                "fails": "Visitors wait on an empty page and some leave before anything appears. A late FCP also pushes back the Largest Contentful Paint, one of the Core Web Vitals.",
                "fix": "<ul><li>Shorten the server response time with caching or a CDN, and avoid redirects before the page.</li><li>Load non-essential scripts with <code>defer</code> or <code>async</code>, and inline only the CSS needed for the top of the page.</li><li>Load web fonts with <code>font-display: swap</code> so text shows before the font arrives.</li></ul>"
              },
              {
                "id": "test-js_efficiency",
                "title": "JS Efficiency",
                "checks": "Flags pages whose JavaScript files loaded with <code>&lt;script src&gt;</code> add up to 300 KB or more; inline scripts are not counted.",
                "why": "JavaScript has to be downloaded, parsed and run, which keeps the browser busy and delays reactions to clicks, especially on mid-range phones. 300 KB is a Poliris recommendation.",
                "fails": "Pages load and respond more slowly, and Total Blocking Time rises. If the content itself is built by these scripts, crawlers that do not run JavaScript, like most AI crawlers, may not see it.",
                "fix": "<ul><li>Remove unused libraries and third-party tags, and check what each plugin adds to every page.</li><li>Split the code per page or feature so each page loads only what it uses.</li><li>Minify and compress the files, and load non-critical scripts with <code>defer</code>.</li><li>Render the main content in the HTML sent by the server, so it does not depend on scripts.</li></ul>"
              },
              {
                "id": "test-layout_responsiveness",
                "title": "Layout Responsiveness",
                "checks": "Checks that the Cumulative Layout Shift measured by Poliris while the page loads during the crawl is 0.1 or less; skipped when it could not be measured.",
                "why": "CLS measures how much visible content moves unexpectedly, for example when an image, an ad or a banner pushes the text down. It is one of Google's three Core Web Vitals.",
                "fails": "Visitors lose their place or click the wrong element when the layout jumps. A lab measure covers loading only, so real visits with scrolling can score worse.",
                "fix": "<ul><li>Give images, videos and iframes <code>width</code> and <code>height</code> attributes, or a CSS <code>aspect-ratio</code>, so their space is reserved.</li><li>Reserve a fixed space for ads, embeds and cookie or promotional banners instead of inserting them above the content.</li><li>Preload web fonts and pick a fallback font with similar dimensions to limit text shifts.</li></ul>"
              },
              {
                "id": "test-lcp_speed",
                "title": "LCP Speed",
                "checks": "Checks that the Largest Contentful Paint measured by Poliris during the crawl is 2.5 seconds or less; skipped when it could not be measured.",
                "why": "LCP is the time until the largest image or text block in the visible part of the page is displayed, usually the main image or heading. It is one of Google's three Core Web Vitals.",
                "fails": "Visitors wait for the main content, the part they came for, and are more likely to leave. A slow LCP also fails the Core Web Vitals Assessment test.",
                "fix": "<ul><li>Compress the main image and serve it in WebP or AVIF at the size it is displayed.</li><li>Add <code>fetchpriority=\"high\"</code> to the main image and do not lazy-load it with <code>loading=\"lazy\"</code>.</li><li>Cut what delays the start: server response time, render-blocking CSS and scripts in the <code>&lt;head&gt;</code>.</li><li>Make sure the main content is in the HTML rather than added later by JavaScript.</li></ul>"
              },
              {
                "id": "test-server_compression_status",
                "title": "Server Compression Status",
                "checks": "Checks that the server sends the page's HTML compressed, with a <code>Content-Encoding</code> header such as gzip or br; stylesheets and scripts are not checked by this test.",
                "why": "Compressed HTML is usually several times smaller, so it reaches visitors and crawlers faster. Google's crawlers support gzip, deflate and Brotli (br), like all current browsers.",
                "fails": "Every page takes longer to download, especially on mobile networks, which delays First Contentful Paint and Largest Contentful Paint.",
                "fix": "<ul><li>Enable gzip or Brotli on the web server or CDN for <code>text/html</code>, and for CSS, JavaScript, JSON and SVG files as well.</li><li>Check a page's response headers in the browser's developer tools: <code>Content-Encoding: br</code> or <code>gzip</code> should appear.</li><li>If a proxy or CDN sits in front of the server, make sure it does not remove compression.</li></ul>"
              },
              {
                "id": "test-total_blocking_time",
                "title": "Total Blocking Time",
                "checks": "Checks that the Total Blocking Time measured by Poliris during the crawl is 200 ms or less; skipped when it could not be measured.",
                "why": "TBT adds up the time during loading when long tasks, mostly JavaScript, keep the browser too busy to react to a click, a tap or a key press. It is measured in the lab, unlike INP, Google's responsiveness metric, which needs real visitors.",
                "fails": "Clicks and taps made while the page loads go unanswered for a moment, so the page feels frozen. A high TBT often goes with a poor INP for real visitors.",
                "fix": "<ul><li>Break long JavaScript tasks into smaller ones so the browser can respond between them.</li><li>Remove or delay third-party scripts that run during loading, such as chat widgets, A/B testing or tag manager tags.</li><li>Send less JavaScript: split bundles per page and load non-critical code after the first display.</li></ul>"
              }
            ]
          },
          {
            "id": "page-url",
            "title": "Page URL",
            "tests": [
              {
                "id": "test-dead_end_redirect",
                "title": "Dead-End Redirect",
                "checks": "Flags redirects that lead to a page answering with an error (4xx or 5xx), whether the error is on the first destination or further along the chain.",
                "why": "A redirect is meant to send visitors and crawlers to the new location of a page. When the destination is broken, they land on an error and search engines have no page to index in place of the old URL.",
                "fails": "Visitors following links or bookmarks to the old URL hit an error page, and search engines may drop the old URL without passing its signals to a replacement.",
                "fix": "<ul><li>Point the redirect straight to a live page that answers 200 OK, ideally the closest replacement, for example https://example.com/new-page/.</li><li>If the content is gone with no replacement, remove the redirect and let the old URL answer 404 or 410.</li><li>Update internal links so they point to the final page rather than to the redirecting URL.</li></ul>"
              },
              {
                "id": "test-html_file_size",
                "title": "HTML File Size",
                "checks": "Flags pages whose HTML weighs 1 MB or more uncompressed; on pages Poliris renders in a browser, the HTML is measured after JavaScript has run.",
                "why": "1 MB is a Poliris recommendation, not a search engine limit: for Google Search, Googlebot reads the first 2 MB of an HTML file, uncompressed, and ignores the rest. Heavy HTML takes longer to download and process, and usually holds inline code or data rather than content.",
                "fails": "The page loads more slowly, especially on mobile connections, and crawlers fetch more code to reach the same text. Past 2 MB, Google ignores the rest of the HTML, including content and links.",
                "fix": "<ul><li>Move large inline <code>&lt;style&gt;</code> and <code>&lt;script&gt;</code> blocks to external files that browsers can cache.</li><li>Replace images embedded as base64 (<code>data:</code> URIs) and large inline SVG with regular image files.</li><li>Reduce the data embedded for JavaScript frameworks (hydration state, JSON blobs) to what the page needs.</li><li>Split very long listings into paginated pages.</li></ul>"
              },
              {
                "id": "test-https_redirect_integrity",
                "title": "HTTPS Redirect Integrity",
                "checks": "Flags redirects in which any step points to an <code>http://</code> URL instead of <code>https://</code>.",
                "why": "A redirect to http:// sends visitors and crawlers to an unencrypted address, which browsers mark as not secure and which usually needs another redirect back to HTTPS. Google uses HTTPS as a light ranking signal.",
                "fails": "Visitors and crawlers pass through an unencrypted step, and the extra redirect back to HTTPS slows the page down and lengthens the chain.",
                "fix": "<ul><li>Change the destination of the redirect rule to the https:// version, for example https://example.com/page/.</li><li>Check the site address set in the CMS: an http:// setting generates http redirects.</li><li>After a move to HTTPS, update old redirect tables so that no rule still targets http://.</li></ul>"
              },
              {
                "id": "test-multi_hop_redirect_chain",
                "title": "Multi-Hop Redirect Chain",
                "checks": "Flags URLs that need more than one redirect to reach their final page, such as A &gt; B &gt; C or http &gt; https &gt; www, and redirect loops; a single redirect passes.",
                "why": "Each extra redirect adds a request before the page loads. Google follows up to 10 redirect hops and notes that long chains hurt crawling; other crawlers may stop sooner, and a loop never reaches a page.",
                "fails": "The page takes longer to load, crawlers spend requests on intermediate URLs, and a loop leaves both visitors and crawlers on an error.",
                "fix": "<ul><li>Point the first redirect straight to the final URL: http://example.com/page should go directly to https://www.example.com/page.</li><li>Merge separate protocol and host rules (http to https, non-www to www) into a single redirect.</li><li>Update internal links, canonical tags and the sitemap to use final URLs.</li><li>Break loops by finding the rules that send a URL back to an earlier step.</li></ul>"
              },
              {
                "id": "test-pages_health_status",
                "title": "Page Health Status",
                "checks": "Checks that the page answers 200 OK: a 4xx or 5xx error is Critical, a redirect is a Warning, and a page Poliris could not fetch is shown as an error, not scored.",
                "why": "The status code is the server's first answer about a page: Google only considers pages that answer with a success status (2xx) for indexing, and does not index pages in error. Redirecting URLs are reviewed in detail by the redirect tests.",
                "fails": "A page in error cannot be indexed and leaves visitors at a dead end. Repeated 5xx errors make Google slow its crawling, and indexed URLs that keep failing are eventually dropped.",
                "fix": "<ul><li>4xx: correct the links that lead to this URL, or redirect (301) a removed page to its closest replacement.</li><li>5xx: check the server logs for crashes, timeouts or overloaded resources, and contact the host if errors persist.</li><li>Redirect (3xx): update links to the final URL; the redirect tests detail chains and broken destinations.</li><li>Not fetched: make sure the server is online and that your firewall or CDN does not block crawlers.</li></ul>"
              },
              {
                "id": "test-redirect_url_structure",
                "title": "Redirect URL Structure",
                "checks": "Flags redirects whose destination path contains uppercase letters, at any step of the chain; the domain and query string are ignored, and percent-encoded characters such as <code>%C3%A9</code> are accepted.",
                "why": "URL paths are case-sensitive: /About and /about can be two distinct pages for search engines. Redirecting to a mixed-case path creates a second spelling of the URL, which can end up indexed next to the lowercase one.",
                "fails": "Links, canonical tags and the sitemap may use different spellings of the same page, so search engines see duplicates and have to choose which one to keep.",
                "fix": "<ul><li>Make redirects point to the lowercase version, for example https://example.com/about/ rather than https://example.com/About/.</li><li>Use the same lowercase spelling in internal links, canonical tags and the sitemap.</li><li>If your server treats both cases as the same page, add a rule that redirects uppercase paths to lowercase.</li></ul>"
              },
              {
                "id": "test-url_slash_occurrence",
                "title": "URL Slash Occurrence",
                "checks": "Flags page URLs that contain a double slash (<code>//</code>) after the domain, for example https://example.com/blog//article; a <code>//</code> inside the query string is flagged too.",
                "why": "Most servers return the same page for /blog//article and /blog/article, but search engines treat them as two URLs. Each stray double slash creates a duplicate of an existing page.",
                "fails": "Search engines may crawl and index several versions of the same page, which wastes crawling and splits signals; relative links on these pages carry the double slash over to new URLs.",
                "fix": "<ul><li>Fix the template or link that builds the URL, often a base URL ending in \"/\" joined to a path starting with \"/\".</li><li>Redirect (301) double-slash URLs to their single-slash version, and keep the canonical tag on the clean URL.</li><li>If a query parameter carries a full URL (<code>?next=https://...</code>), percent-encode it to avoid the flag.</li></ul>"
              }
            ]
          },
          {
            "id": "pagination",
            "title": "Pagination",
            "tests": [
              {
                "id": "test-classic_clickable_page_connections",
                "title": "Crawlable Pagination Links",
                "checks": "Checks that pages declaring <code>&lt;link rel=\"next\"&gt;</code> or <code>rel=\"prev\"</code> also link at least one of those URLs with <code>&lt;a href&gt;</code>, and flags pagination buttons that work only through JavaScript.",
                "why": "Google no longer uses <code>rel=\"next\"</code> and <code>rel=\"prev\"</code> (other search engines may): crawlers move through a series by following regular <code>&lt;a href&gt;</code> links. Most AI crawlers do not run JavaScript, so script-only buttons leave them on the first page.",
                "fails": "Crawlers may stop at the first page of the series, so products or articles listed only on the following pages are found late or not at all.",
                "fix": "<ul><li>Link each page of the series with a regular link, for example <code>&lt;a href=\"https://example.com/blog/page/2/\"&gt;2&lt;/a&gt;</code>, alongside any button.</li><li>Make \"Next\" and \"Previous\" <code>&lt;a&gt;</code> elements with a real URL, not <code>href=\"#\"</code> or a <code>javascript:</code> handler.</li><li>With infinite scroll or a \"Load more\" button, keep the paginated URLs reachable through such links.</li></ul>"
              },
              {
                "id": "test-hidden_pagination_code",
                "title": "Hidden Pagination Code",
                "checks": "Flags each URL declared in <code>&lt;link rel=\"next\"&gt;</code> or <code>rel=\"prev\"</code> that the page does not also link with <code>&lt;a href&gt;</code>, and script-only pagination buttons; Crawlable Pagination Links fails only when none is linked.",
                "why": "<code>rel=\"next\"</code> and <code>rel=\"prev\"</code> tags are invisible to visitors, and Google no longer uses them. A page declared only in these tags gives visitors no way to reach it and crawlers that follow links no path to it.",
                "fails": "The next or previous page of the series, and the items it lists, may be crawled late or not at all, and visitors cannot move through the series.",
                "fix": "<ul><li>For every URL in <code>rel=\"next\"</code> or <code>rel=\"prev\"</code>, add a visible link to the same URL, for example in the pagination bar.</li><li>Use the same URL in the tag and in the link, parameters included: <code>?page=2</code> and <code>?p=2</code> are different URLs.</li><li>Replace script-only pagination buttons with <code>&lt;a&gt;</code> links carrying the page URL.</li></ul>"
              },
              {
                "id": "test-pagination_status_return",
                "title": "Pagination Status Return",
                "checks": "Checks that the URLs declared in <code>rel=\"next\"</code> and <code>rel=\"prev\"</code> answer 200 OK; a redirect or an error fails, and the test is skipped when none of them was crawled.",
                "why": "These tags should name the real neighboring pages of the series. A tag that points to a redirect or an error usually reveals a pagination bug, such as a \"next\" page after the last one, which the visible links often share.",
                "fails": "Search engines that read these tags are sent to dead ends or extra redirects, and the same faulty URLs often appear in the visible pagination links.",
                "fix": "<ul><li>Point each tag to the final URL of the neighboring page, not to a URL that redirects.</li><li>Remove <code>rel=\"next\"</code> from the last page and <code>rel=\"prev\"</code> from the first page of the series.</li><li>Write the URLs in the site's canonical format (https, trailing slash, parameters) so they do not redirect.</li></ul>"
              },
              {
                "id": "test-proper_pagination_protocol",
                "title": "Proper Pagination Protocol",
                "checks": "Checks that pages declaring <code>rel=\"next\"</code> or <code>rel=\"prev\"</code> are indexable (no <code>noindex</code>) and have a canonical pointing to themselves; a missing canonical, or one naming another page such as page 1, fails.",
                "why": "Google recommends giving each page of a series its own canonical URL rather than pointing them all to the first page. Each page lists different items, and crawlers reach those items through it.",
                "fails": "A <code>noindex</code> or a canonical to page 1 tells search engines not to keep the following pages, so items listed only there are harder for them to find and index.",
                "fix": "<ul><li>Give each page of the series a self-referencing canonical, for example <code>&lt;link rel=\"canonical\" href=\"https://example.com/blog/page/2/\"&gt;</code> on page 2.</li><li>Remove <code>noindex</code> from the pages of the series, including from the <code>X-Robots-Tag</code> header.</li><li>Keep <code>noindex</code> for filtered or sorted variants of a listing, and leave those variants out of <code>rel=\"next\"</code> and <code>rel=\"prev\"</code>.</li></ul>"
              }
            ]
          },
          {
            "id": "robots-txt",
            "title": "Robots.txt",
            "tests": [
              {
                "id": "test-absolute_sitemap_url",
                "title": "Absolute Sitemap URL",
                "checks": "Checks that the first Sitemap line of your robots.txt gives a full URL starting with http:// or https://, not a relative path such as <code>/sitemap.xml</code>.",
                "why": "Google and the sitemaps protocol require a fully qualified sitemap URL in robots.txt: Google does not guess the protocol or the host. The test is skipped when robots.txt has no Sitemap line.",
                "fails": "Search engines may ignore the relative line and not find your sitemap through robots.txt. They can still find it if you declared it elsewhere, for example in Google Search Console.",
                "fix": "<ul><li>Write the full URL: <code>Sitemap: https://example.com/sitemap.xml</code>.</li><li>Use the protocol and host your site really serves (https, with or without www), so the URL does not redirect.</li><li>If your CMS or SEO plugin writes robots.txt, correct the sitemap address in its settings.</li></ul>"
              },
              {
                "id": "test-ai_crawler_strategy",
                "title": "AI Crawler Strategy (LLM Blockers)",
                "checks": "Flags a robots.txt that blocks the root of the site (/) for an AI search or user crawler that follows robots.txt: OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, MistralAI-Index or MistralAI-User.",
                "why": "These crawlers fetch pages for the search answers of ChatGPT, Claude, Perplexity and Mistral, or at a user's request. ChatGPT-User and Perplexity-User are not counted: OpenAI and Perplexity say they may not follow robots.txt, so blocking them may have no effect. A robots.txt that names no AI crawler passes.",
                "fails": "The blocked crawlers no longer read your pages, so the assistants they serve are less likely to cite or link to your site. These assistants may still mention your brand from other sources.",
                "fix": "<ul><li>Remove <code>Disallow: /</code> from the groups that name these crawlers, or replace it with <code>Allow: /</code>.</li><li>A <code>Disallow: /</code> under <code>User-agent: *</code> applies to every crawler without its own group: give these crawlers a group with <code>Allow: /</code>.</li><li>To opt out of model training only, block GPTBot, ClaudeBot, CCBot or MistralAI-Training: the test passes, with a remark that this does not affect citations.</li><li>Blocking the <code>Google-Extended</code> token passes with a remark: it controls Gemini model training and answer grounding in Gemini Apps and Vertex AI, not Google Search.</li></ul>"
              },
              {
                "id": "test-robot_allow_logic_check",
                "title": "Robot Allow Logic Check",
                "checks": "Checks that each Allow rule takes effect, and fails when a longer Disallow still blocks a crawled page or file that the Allow matches, or the path it names.",
                "why": "For Google and under RFC 9309, the longest matching rule wins, so an Allow shorter than the Disallow it should override has no effect on those URLs. A robots.txt without Allow rules passes.",
                "fails": "The pages or files you meant to open stay blocked: with <code>Disallow: /wp-content/</code> and <code>Allow: /*.css$</code>, stylesheets under /wp-content/ remain blocked. The remark names the rule and one blocked URL.",
                "fix": "<ul><li>Make the Allow longer than the Disallow it overrides: <code>Allow: /wp-content/*.css</code> rather than <code>Allow: /*.css$</code>; a final <code>$</code> excludes URLs with <code>?ver=</code> parameters.</li><li>Check the blocked URL named in the remark with the URL Inspection tool in Google Search Console.</li><li>Keep the Allow in the same group as the Disallow: each crawler follows only the group that names it most precisely.</li></ul>"
              },
              {
                "id": "test-robot_crawl_delay",
                "title": "Robot Crawl Delay",
                "checks": "Flags a robots.txt that contains a Crawl-delay line, for any user agent.",
                "why": "Google ignores Crawl-delay, but crawlers such as Bingbot honor it and space their requests by that many seconds, which slows how fast they fetch new and updated pages.",
                "fails": "Crawlers that honor the directive fetch fewer pages: with <code>Crawl-delay: 10</code>, at most 8,640 requests a day. On a large site, new or updated pages can take longer to be crawled.",
                "fix": "<ul><li>Remove the <code>Crawl-delay</code> lines unless your server really cannot handle crawler traffic.</li><li>To limit Bingbot, use the crawl control setting in Bing Webmaster Tools instead.</li><li>Google adjusts its crawl rate to how your server responds: temporary 503 or 429 answers slow it down.</li></ul>"
              },
              {
                "id": "test-robot_file_location_identifier",
                "title": "Robot File Location Identifier",
                "checks": "Flags a robots.txt whose first absolute Sitemap URL points to another host than the site's domain (a subdomain or another domain); the www prefix is ignored.",
                "why": "A Sitemap line on another host can mean the robots.txt was copied from another site or a staging environment. A subdomain such as cdn.example.com fails here, while Sitemaps From Other Domains accepts it. The test passes without an absolute Sitemap line.",
                "fails": "Crawlers may be sent to a sitemap that does not list this site's pages, and the other rules of the file may have been written for another site.",
                "fix": "<ul><li>Point the first Sitemap line to this site's sitemap: <code>Sitemap: https://example.com/sitemap.xml</code>.</li><li>If the file was copied from another site or environment, review all its rules, not only the Sitemap line.</li><li>On a shared setup, such as a WordPress multisite, make each site's robots.txt declare its own sitemap.</li></ul>"
              },
              {
                "id": "test-robot_file_size_limit",
                "title": "Robot File Size Limit",
                "checks": "Flags a robots.txt larger than 500 KiB (512,000 bytes).",
                "why": "Google reads only the first 500 KiB of a robots.txt and ignores the rest, so rules placed after that point have no effect on Googlebot.",
                "fails": "Rules beyond the limit, such as Disallow or Sitemap lines at the end of the file, are not applied by Google, which may then crawl sections you meant to exclude.",
                "fix": "<ul><li>Group URLs under shared paths or wildcards, such as <code>Disallow: /search/</code> or <code>Disallow: /*?sort=</code>, instead of one line per URL.</li><li>Remove rules for paths that no longer exist and long lists of bots you do not need to name.</li><li>Place the most important rules and the Sitemap line near the top of the file.</li></ul>"
              },
              {
                "id": "test-robot_sitemap_handshake",
                "title": "Robot Sitemap Handshake",
                "checks": "Checks that each sitemap URL declared in robots.txt for this site answers with a status from 200 to 399; sitemaps on other domains are left to Sitemaps From Other Domains.",
                "why": "Search engines fetch the sitemaps declared in robots.txt to discover your URLs, and one that answers an error gives them nothing. The test is skipped when robots.txt has no Sitemap line or a relative one.",
                "fails": "Crawlers get no URL list from that sitemap and must find pages through links, so new or poorly linked pages may be discovered later. The remark lists the failing URLs.",
                "fix": "<ul><li>Open each Sitemap URL from robots.txt in a browser: it should display the XML file, not an error page.</li><li>If the sitemap moved, update the Sitemap line, or publish the sitemap at the declared address.</li><li>Check that no firewall or bot protection blocks crawlers from the sitemap URL.</li></ul>"
              },
              {
                "id": "test-robot_syntax_directive_integrity",
                "title": "Robot Syntax & Directive Integrity",
                "checks": "Flags robots.txt lines without a colon and likely misspellings of known directives (<code>disalow</code>, <code>useragent</code>, <code>user agent</code>, <code>site-map</code>); other recognized directives, such as Crawl-delay, Host, Clean-param or Content-Signal, pass.",
                "why": "Crawlers ignore lines they cannot read: Google's parser accepts a few common typos, but other crawlers may drop a misspelled rule, or a whole group when User-agent is misspelled. Field names are not case-sensitive, so <code>user-agent</code> and <code>USER-AGENT</code> both pass.",
                "fails": "Crawlers that do not tolerate the error skip the line: a Disallow may not apply, or rules meant for one crawler may be read as part of another group.",
                "fix": "<ul><li>Write one directive per line in the form <code>Name: value</code>, for example <code>Disallow: /search/</code>.</li><li>Correct misspelled names: the exact forms are <code>User-agent</code>, <code>Disallow</code>, <code>Allow</code> and <code>Sitemap</code>.</li><li>Start comments with <code>#</code>: a note without it is read as a line without a colon.</li></ul>"
              },
              {
                "id": "test-robot_text_complexity",
                "title": "Robot Text Complexity",
                "checks": "Flags a robots.txt that names user agents but contains no Disallow, Allow or Sitemap line.",
                "why": "User-agent lines without any rule restrict nothing and point to no sitemap, so the file gives crawlers no information. A minimal file with <code>User-agent: *</code> and an empty <code>Disallow:</code> passes.",
                "fails": "Crawlers treat the whole site as open and find no sitemap in robots.txt. This is valid, but the file does nothing to guide them.",
                "fix": "<ul><li>Add a Sitemap line: <code>Sitemap: https://example.com/sitemap.xml</code>.</li><li>Disallow the sections you do not want crawled, such as internal search: <code>Disallow: /search/</code>.</li><li>If you want no restriction, say so explicitly with an empty <code>Disallow:</code>.</li></ul>"
              },
              {
                "id": "test-robot_utf-8_encoding",
                "title": "Robot UTF-8 Encoding",
                "checks": "Flags a robots.txt that starts with a UTF-16 or UTF-32 byte order mark, contains bytes that are not valid UTF-8, or is served with another charset, such as <code>charset=iso-8859-1</code>.",
                "why": "Google expects robots.txt in UTF-8 and may ignore characters outside that range, which can make rules invalid. Plain ASCII files are valid UTF-8 and pass.",
                "fails": "Rules containing the affected characters, such as paths with accents, may be read wrongly or ignored, so some URLs may be crawled or blocked against your intent.",
                "fix": "<ul><li>Save the file as UTF-8 in a plain text or code editor, not in a word processor.</li><li>Serve it with <code>Content-Type: text/plain; charset=utf-8</code>, or without a charset.</li><li>If your CMS or server generates the file, check its encoding setting.</li></ul>"
              },
              {
                "id": "test-robot_asset_visibility",
                "title": "Robots Asset Visibility",
                "checks": "Flags CSS, JavaScript and image files that your crawled pages load from their own host and that robots.txt blocks for Googlebot.",
                "why": "Google renders pages like a browser: if it cannot fetch the CSS or JavaScript, it may not see the page as visitors do. Files on another host, such as a CDN, follow that host's robots.txt and are not checked.",
                "fails": "Google may index an incomplete version of the page, for example without content added by JavaScript, and blocked images are not shown in Google Images. The remark lists the blocked files.",
                "fix": "<ul><li>Remove rules that block asset folders or file types, such as <code>Disallow: /assets/</code> or <code>Disallow: /*.js$</code>.</li><li>If a folder must stay blocked, open its assets with a longer rule: <code>Allow: /wp-content/*.css</code>, without a final <code>$</code> that would miss <code>?ver=</code> URLs.</li><li>Check a page with the URL Inspection tool in Google Search Console to see which resources Google could not load.</li></ul>"
              },
              {
                "id": "test-robots_catastrophic_blocking",
                "title": "Robots Catastrophic Blocking",
                "checks": "Flags a robots.txt whose <code>User-agent: *</code> group blocks the root of the site (/), usually with <code>Disallow: /</code>.",
                "why": "This rule asks every crawler without a group of its own, search engines and AI crawlers included, to stay off the whole site. It is common on staging sites and is sometimes left in place at launch.",
                "fails": "Crawlers that follow robots.txt stop fetching your pages, so new content is not crawled and existing pages can lose their descriptions in results. Blocked URLs can still be indexed, without their content, when linked from elsewhere.",
                "fix": "<ul><li>Remove <code>Disallow: /</code> from the <code>User-agent: *</code> group, or leave the value empty: <code>Disallow:</code>.</li><li>To block only some sections, list their paths, such as <code>Disallow: /private/</code>.</li><li>To keep a staging site out of search results, protect it with a password rather than robots.txt.</li><li>To block one crawler, give it its own group instead of blocking <code>*</code>.</li></ul>"
              },
              {
                "id": "test-robots_indexability",
                "title": "Robots Indexability",
                "checks": "Checks that robots.txt lets Googlebot crawl your homepage (/), using the Googlebot group if there is one, otherwise the <code>User-agent: *</code> group.",
                "why": "The homepage is usually where a crawl starts and it links to your main sections. robots.txt is a crawling convention, not a legal or security barrier: a blocked URL can still be indexed without its content if other sites link to it.",
                "fails": "Googlebot can neither read your homepage nor follow its links, and the page may appear in results without a description. The remark names the group that blocks it.",
                "fix": "<ul><li>Find the group that applies to Googlebot (its own, or <code>User-agent: *</code>) and remove the rule that matches <code>/</code>.</li><li>To block a section, use its path, such as <code>Disallow: /admin/</code>, not <code>Disallow: /</code>.</li><li>To keep a page out of search results, use a <code>noindex</code> meta tag and leave the page crawlable so Google can see it.</li></ul>"
              },
              {
                "id": "test-robots_txt_existence",
                "title": "Robots.txt Existence",
                "checks": "Checks that a robots.txt file exists at the root of your domain: the test fails when the server answers 404 or 410 for it.",
                "why": "robots.txt tells crawlers which parts of the site they may crawl and where your sitemap is. If it is missing, the other robots.txt tests are skipped; if the server answers another error or times out, none is evaluated.",
                "fails": "Nothing is blocked: search engines and AI crawlers treat the whole site as open. You lose the means to keep them away from low-value URLs, such as filters or internal search, and to point them to your sitemap.",
                "fix": "<ul><li>Create https://example.com/robots.txt, even a minimal one: <code>User-agent: *</code> followed by an empty <code>Disallow:</code>.</li><li>Add a Sitemap line with the full URL of your sitemap.</li><li>Disallow only the sections you really do not want crawled.</li><li>Serve it as plain text with a 200 status, on each host you use (www, subdomains).</li></ul>"
              },
              {
                "id": "test-sitemap_discovery_link",
                "title": "Sitemap Discovery Link",
                "checks": "Checks that robots.txt contains at least one Sitemap line whose URL contains .xml, such as <code>Sitemap: https://example.com/sitemap.xml</code>.",
                "why": "The Sitemap line lets any crawler that reads robots.txt find your sitemap, including search engines where you have not submitted it. Sitemap lines are not tied to a user agent and can sit anywhere in the file.",
                "fails": "Crawlers that do not find your sitemap rely on links to discover pages, so new or poorly linked pages may be crawled later.",
                "fix": "<ul><li>Add one line per sitemap: <code>Sitemap: https://example.com/sitemap.xml</code>.</li><li>If you use a sitemap index, declaring the index alone is enough.</li><li>Use the full URL, with https:// and the host.</li></ul>"
              },
              {
                "id": "test-sitemaps_from_other_domains",
                "title": "Sitemaps From Other Domains",
                "checks": "Flags Sitemap lines in robots.txt that point to another domain than the site; the www prefix counts as the same site, and so do subdomains such as cdn.example.com, unlike in Robot File Location Identifier.",
                "why": "A Sitemap line on another domain usually comes from a shared setup, such as a WordPress multisite or a template copied from another site, and lists another site's pages. The test is skipped when robots.txt has no Sitemap line.",
                "fails": "Crawlers that read your robots.txt are sent to other sites' sitemaps, and your own sitemap is harder to tell apart. Poliris leaves these sitemaps out of its other sitemap tests; the remark lists them.",
                "fix": "<ul><li>Remove the Sitemap lines that point to other domains and keep those of this site.</li><li>On a WordPress multisite, set the SEO plugin to declare only the current site's sitemap.</li><li>Keep a sitemap hosted on another domain only if it lists this site's own pages (cross-site submission).</li></ul>"
              }
            ]
          },
          {
            "id": "sitemap",
            "title": "Sitemap",
            "tests": [
              {
                "id": "test-orphaned_page_detection",
                "title": "Orphaned Page Detection",
                "checks": "Flags pages found during the audit, for example in the sitemap, that no chain of internal links reaches from the start URL, including pages linked only from other unreachable pages.",
                "why": "Visitors and crawlers find pages by following links, and internal links tell search engines what a page is about. The test runs only when the crawl reached every linked page; otherwise it is skipped, with a remark saying why.",
                "fails": "Visitors cannot reach the page from your navigation, and search engines can only find it through the sitemap or external links, without internal anchor text to describe it.",
                "fix": "<ul><li>Link to the page from a related page, its category page or the navigation.</li><li>Use <code>&lt;a href&gt;</code> links, which crawlers can follow, rather than links built only with JavaScript events.</li><li>If the page is obsolete, remove it from the sitemap, then redirect or delete it.</li></ul>"
              },
              {
                "id": "test-page_presence_in_sitemap",
                "title": "Page Presence in Sitemap",
                "checks": "Flags pages that answer 200, are indexable and do not point their canonical to another URL, but are missing from your sitemaps (declared in robots.txt or found at usual locations).",
                "why": "A sitemap lists the URLs you want crawled and helps search engines find new or poorly linked pages. The test is skipped when no valid, readable sitemap is found.",
                "fails": "Search engines can still find the page through links, but it may be discovered or recrawled later, especially if it is new or deep in the site.",
                "fix": "<ul><li>Add the page to the sitemap, or find why your CMS or SEO plugin leaves it out (excluded content type, category or setting).</li><li>If the page should not be indexed, mark it <code>noindex</code> or point its canonical to the main version: it then leaves this test.</li><li>Generate the sitemap automatically so pages are added as soon as they are published.</li></ul>"
              },
              {
                "id": "test-proper_sitemap_fragments",
                "title": "Proper Sitemap Fragments",
                "checks": "Flags a sitemap file whose uncompressed size reaches 50 MB (52,428,800 bytes), the limit of the sitemaps protocol; gzipped sitemaps are measured after decompression.",
                "why": "The sitemaps protocol and Google limit each sitemap file to 50 MB uncompressed and 50,000 URLs; a larger file must be split into several sitemaps.",
                "fails": "Search engines may reject the file, so the URLs it lists are not read from that sitemap until it is split.",
                "fix": "<ul><li>Split the sitemap into several files, for example by section or by date, and list them in a sitemap index.</li><li>Remove URLs that do not belong there: redirects, errors, noindex pages, duplicates with parameters.</li><li>Gzip reduces the transfer size but not the limit, which applies to the uncompressed file.</li></ul>"
              },
              {
                "id": "test-rich_media_sitemap_validation",
                "title": "Rich Media Sitemap Validation",
                "checks": "Checks that each <code>&lt;image:image&gt;</code> entry in your sitemaps contains an <code>&lt;image:loc&gt;</code> and each <code>&lt;video:video&gt;</code> entry a <code>&lt;video:thumbnail_loc&gt;</code>; sitemaps without such entries pass.",
                "why": "Google may ignore image or video entries that lack required tags. <code>&lt;image:loc&gt;</code> is the only required image tag; a video entry also needs a title, a description and a content or player URL.",
                "fails": "Google may skip the incomplete entries, so those images or videos are less likely to be found through the sitemap for Google Images or video results.",
                "fix": "<ul><li>Give each image entry its URL: <code>&lt;image:image&gt; &lt;image:loc&gt;https://example.com/photo.jpg&lt;/image:loc&gt;&lt;/image:image&gt;</code>.</li><li>Give each video a <code>&lt;video:thumbnail_loc&gt;</code>, plus the title, description and content or player URL that Google requires.</li><li>Remove <code>&lt;image:caption&gt;</code>, <code>&lt;image:title&gt;</code>, <code>&lt;image:license&gt;</code> and <code>&lt;image:geo_location&gt;</code>: Google stopped using them in August 2022.</li></ul>"
              },
              {
                "id": "test-sitemap_access_validation",
                "title": "Sitemap Access Validation",
                "checks": "Checks that your sitemap files answer 200: every sitemap declared in robots.txt and their child sitemaps or, when robots.txt declares none, at least one sitemap found at a usual location.",
                "why": "Search engines fetch the same files, and a sitemap that answers with an error gives them no URLs. When this test fails, the sitemap tests that follow are skipped.",
                "fails": "Search engines cannot read the URLs listed in the failing files, so those pages must be found through links and may be crawled later.",
                "fix": "<ul><li>Open each sitemap URL named in the remark and check that it returns the XML file with a 200 status.</li><li>Remove files that no longer exist from robots.txt and from your sitemap index.</li><li>Make sure no login, firewall or bot protection blocks crawlers from your sitemaps.</li></ul>"
              },
              {
                "id": "test-sitemap_canonical_integrity",
                "title": "Sitemap Canonical Integrity",
                "checks": "Checks that the sitemap URLs fetched during the audit are final pages: fails on a URL that redirects, has no canonical tag, or whose canonical points to another URL.",
                "why": "Google asks for canonical URLs in sitemaps; a URL that redirects or names another canonical sends mixed signals about the version to index. Poliris also expects each listed page to declare its canonical. URLs that return errors are covered by Sitemap URL Status.",
                "fails": "Search engines spend crawls on URLs you do not want indexed, and the sitemap becomes a weaker hint for choosing the canonical. The remark names the first URL found.",
                "fix": "<ul><li>Replace each redirecting URL with its final destination, for example https://example.com/page/ instead of http://example.com/page.</li><li>Remove URLs whose canonical points to another page, or list that page instead.</li><li>Add a self-referencing canonical to listed pages: <code>&lt;link rel=\"canonical\" href=\"https://example.com/page/\"&gt;</code>.</li></ul>"
              },
              {
                "id": "test-sitemap_index_structure",
                "title": "Sitemap Index Structure",
                "checks": "Checks that each sitemap index is valid XML, follows the protocol and lists at least one child sitemap; without an index, flags a single sitemap holding more than 50,000 URLs.",
                "why": "A sitemap index (<code>&lt;sitemapindex&gt;</code>) is how the protocol spreads URLs over several files; an empty or broken index gives crawlers no sitemap to follow.",
                "fails": "Crawlers cannot reach the child sitemaps through the index, or may reject an oversized single file, so the URLs listed are not read from the sitemap.",
                "fix": "<ul><li>Use <code>&lt;sitemapindex&gt;</code> as the root, in the sitemaps.org namespace, with one <code>&lt;sitemap&gt; &lt;loc&gt;</code> entry per child sitemap.</li><li>Split a sitemap of more than 50,000 URLs into several files and list them in an index.</li><li>Put page URLs in the child sitemaps, not in the index itself.</li></ul>"
              },
              {
                "id": "test-sitemap_logic_integrity",
                "title": "Sitemap Logic Integrity",
                "checks": "Checks that each sitemap file is well-formed XML with a <code>&lt;urlset&gt;</code> or <code>&lt;sitemapindex&gt;</code> root in the sitemaps.org namespace, and that every entry has a non-empty <code>&lt;loc&gt;</code>.",
                "why": "A sitemap is read by an XML parser: one syntax error, such as an unescaped &amp; in a URL, can make the whole file unreadable. When this test fails, the sitemap tests that follow are skipped.",
                "fails": "Search engines may reject the file or skip invalid entries, so the URLs it lists may not be discovered through it.",
                "fix": "<ul><li>Escape special characters in URLs: write <code>&amp;amp;</code> for &amp;, as in <code>https://example.com/? a=1&amp;amp;b=2</code>.</li><li>Declare the namespace on the root element: <code>&lt;urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"&gt;</code>.</li><li>Give every <code>&lt;url&gt;</code> or <code>&lt;sitemap&gt;</code> entry a <code>&lt;loc&gt;</code> with a full URL.</li><li>Make sure the sitemap URL returns the XML itself, not an HTML or error page.</li></ul>"
              },
              {
                "id": "test-sitemap_protocol_consistency",
                "title": "Sitemap Protocol Consistency",
                "checks": "Flags http:// URLs listed in the sitemaps of an HTTPS site, that is a site whose sitemap files or listed URLs use https://.",
                "why": "On an HTTPS site, http:// addresses usually redirect to their https:// version, so the sitemap lists URLs that are not the ones you want indexed.",
                "fails": "Search engines fetch the http:// address, follow the redirect and get a mixed signal about which version is canonical.",
                "fix": "<ul><li>Set your sitemap generator or SEO plugin to build URLs with https://.</li><li>Check the site address setting of your CMS, a common source of http:// entries.</li><li>Replace every http://example.com/... entry with its https://example.com/... version.</li></ul>"
              },
              {
                "id": "test-sitemap_url_capacity",
                "title": "Sitemap URL Capacity",
                "checks": "Flags a sitemap file that lists more than 50,000 URLs, or a sitemap index that lists more than 50,000 sitemaps, the limits of the sitemaps protocol.",
                "why": "The sitemaps protocol and Google limit each sitemap file to 50,000 URLs; above that, the file must be split into several sitemaps.",
                "fails": "Search engines may reject the file, so the URLs it lists, or some of them, are not read from it.",
                "fix": "<ul><li>Split the file into sitemaps of at most 50,000 URLs, for example by section or by date.</li><li>List those files in a sitemap index and declare the index in robots.txt.</li><li>Leave out URLs that should not be indexed: redirects, errors, noindex pages, filter and sort parameters.</li></ul>"
              },
              {
                "id": "test-sitemap_url_status",
                "title": "Sitemap URL Status",
                "checks": "Checks that the sitemap URLs fetched during the audit answer 200 and are indexable: fails on a URL that redirects, returns an error, is set to noindex or is blocked by robots.txt.",
                "why": "A sitemap should list only the URLs you want indexed; search engines treat it as a hint about your preferred pages. Sitemap URLs that Poliris did not fetch are not checked.",
                "fails": "Search engines spend crawls on URLs that cannot be indexed, and the sitemap becomes a less reliable list of your pages. The remark names the first URL found.",
                "fix": "<ul><li>Replace redirecting URLs with their final destination.</li><li>Remove URLs that return 404, 410 or 5xx, or restore the pages if they should exist.</li><li>Exclude noindex pages and paths disallowed in robots.txt from the sitemap generator.</li></ul>"
              },
              {
                "id": "test-xml_sitemap_presence",
                "title": "XML Sitemap Presence",
                "checks": "Checks that Poliris finds at least one valid XML sitemap answering 200, declared in robots.txt or at a usual location such as /sitemap.xml, /sitemap_index.xml or /wp-sitemap.xml.",
                "why": "A sitemap lists the URLs you want crawled and helps search engines find new, deep or poorly linked pages. When no valid sitemap is found, the other sitemap tests are skipped.",
                "fails": "Search engines can still find your pages through links, but new or poorly linked pages may be discovered later, and the other sitemap checks cannot run.",
                "fix": "<ul><li>Publish an XML sitemap at https://example.com/sitemap.xml; most CMS and SEO plugins can generate one.</li><li>Declare it in robots.txt: <code>Sitemap: https://example.com/sitemap.xml</code>.</li><li>Make sure the URL returns the XML file with a 200 status, not an HTML page.</li><li>Submit it in Google Search Console and Bing Webmaster Tools.</li></ul>"
              }
            ]
          }
        ]
      },
      {
        "id": "content-access",
        "title": "Content Access",
        "groups": [
          {
            "id": "accessibility",
            "title": "Accessibility",
            "tests": [
              {
                "id": "test-document_format_identifier",
                "title": "Document Format Identifier",
                "checks": "Flags links on the page that point to Microsoft Word files (URLs ending in <code>.doc</code> or <code>.docx</code>).",
                "why": "A Word file opens in a separate application or downloads, instead of displaying in the browser like a web page or a PDF. Its layout also depends on the software and version used to open it.",
                "fails": "Visitors leave the page to open a file that may not display correctly on their device, especially on a phone. Google can index Word files, but the same content as a web page is easier to read, share and update.",
                "fix": "<ul><li>Publish the content as a web page when visitors only need to read it.</li><li>When a downloadable document is needed, export it as a PDF, which opens in the browser: <code>https://example.com/guide.pdf</code>.</li><li>Redirect the old <code>.docx</code> URLs to the new page or PDF, so that links from other sites keep working.</li></ul>"
              },
              {
                "id": "test-document_structure_validity",
                "title": "Document Structure Validity",
                "checks": "Flags pages whose HTML, as sent by the server, has more than one <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code> or <code>&lt;title&gt;</code> tag, or a title, meta description, meta robots or canonical tag outside the <code>&lt;head&gt;</code>.",
                "why": "Browsers silently repair a broken document, but crawlers may not read it the same way. Google stops reading the <code>&lt;head&gt;</code> at the first element that does not belong there, and ignores a canonical tag found outside it.",
                "fails": "Search engines may show the wrong title or ignore the canonical, and crawlers other than Google may miss a robots tag outside the <code>&lt;head&gt;</code>, while the page looks normal in a browser.",
                "fix": "<ul><li>Make the template output a single <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code> and <code>&lt;title&gt;</code>.</li><li>Move the title, meta description, meta robots and canonical tags into the <code>&lt;head&gt;</code>.</li><li>Look for a plugin, widget or included block that outputs a full HTML page: it is the usual cause of a second <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code>.</li><li>Check the source sent by the server (view source), not the browser inspector, which shows the document already repaired.</li></ul>"
              },
              {
                "id": "test-href_attributes_detection",
                "title": "Href Attributes Detection",
                "checks": "Flags <code>&lt;a&gt;</code> elements that have no <code>href</code> attribute or an empty one (<code>href=\"\"</code>).",
                "why": "Search engines discover pages through <code>&lt;a&gt;</code> elements whose <code>href</code> holds a URL. Without an <code>href</code>, the element is not a link: it cannot be followed, keyboard navigation skips it and screen readers do not announce it as a link. An empty one only points back to the current page.",
                "fails": "Pages reached only through these elements may not be found by search engines and AI crawlers, which follow <code>href</code> URLs. Keyboard and screen reader users cannot reach them either.",
                "fix": "<ul><li>Give each link a real destination: <code>&lt;a href=\"https://example.com/pricing/\"&gt;Pricing&lt;/a&gt;</code>.</li><li>Use a <code>&lt;button&gt;</code> for elements that open a menu or a pop-up, or run a script without changing page.</li><li>Remove the empty <code>&lt;a&gt;</code> elements left by the theme or the page builder.</li></ul>"
              },
              {
                "id": "test-html_lang_attribute_identifier",
                "title": "HTML Lang Attribute Identifier",
                "checks": "Flags pages whose <code>&lt;html&gt;</code> tag has no <code>lang</code> attribute or an empty one.",
                "why": "Screen readers use the <code>lang</code> attribute to pick the voice and pronunciation, browsers use it to offer translation, and WCAG requires it (Language of Page). Google detects the language from the visible text, but other search engines read the attribute.",
                "fails": "Screen readers may read the text with the wrong pronunciation, and browsers may offer a wrong translation or none. Search engines and tools that rely on the attribute have to guess the language.",
                "fix": "<ul><li>Declare the main language of the page: <code>&lt;html lang=\"en\"&gt;</code>, <code>&lt;html lang=\"fr\"&gt;</code>.</li><li>Add a region only when the content targets one country: <code>lang=\"en-GB\"</code>, <code>lang=\"fr-CA\"</code>.</li><li>In a CMS, set the site language so that every template outputs it; on a multilingual site, set it for each language version.</li></ul>"
              },
              {
                "id": "test-meta_keyword_presence",
                "title": "Meta Keyword Presence",
                "checks": "Flags pages that contain a <code>&lt;meta name=\"keywords\"&gt;</code> tag, even an empty one.",
                "why": "Google documents that it does not use the keywords meta tag. Keeping it in the templates adds markup with no benefit.",
                "fails": "It has no effect on Google rankings. The tag only shows the keywords you target to anyone who reads the page code, competitors included.",
                "fix": "<ul><li>Remove the <code>&lt;meta name=\"keywords\"&gt;</code> tag from your templates.</li><li>Turn off the meta keywords option of your SEO plugin or theme, if it has one.</li><li>Put the effort into the title, the meta description and the visible content instead.</li></ul>"
              },
              {
                "id": "test-meta_refresh_identifier",
                "title": "Meta Refresh Identifier",
                "checks": "Flags pages that contain a <code>&lt;meta http-equiv=\"refresh\"&gt;</code> tag, whether it sends visitors to another URL or reloads the page after a delay.",
                "why": "Google treats an instant meta refresh as a permanent redirect and a delayed one as a temporary redirect, and recommends server-side redirects when possible. A timed refresh also changes the page without the visitor's action, which accessibility guidelines (WCAG) advise against.",
                "fails": "Visitors load the page first, then are sent elsewhere or see it reload, which is slower and can disorient them. A delayed refresh counts as a temporary redirect, so search engines may keep showing the old URL.",
                "fix": "<ul><li>Replace the meta refresh with a server-side 301 redirect, set in the server configuration or the redirect manager of your CMS.</li><li>Point internal links and the sitemap to the destination, for example <code>https://example.com/new-page/</code>.</li><li>On a page that reloads itself, remove the tag and update the changing content with JavaScript, or let visitors reload.</li></ul>"
              },
              {
                "id": "test-style_attribute_hygiene",
                "title": "Style Attribute Hygiene",
                "checks": "Flags HTML elements that carry an inline <code>style</code> attribute instead of using classes from a stylesheet.",
                "why": "Inline styles repeat presentation code in every page, which makes the HTML heavier and site-wide design changes harder. A stylesheet is downloaded once, then cached by the browser.",
                "fails": "There is no direct ranking effect. Pages carry more markup than needed, and the same visual rule has to be changed in many places, which often leads to inconsistencies.",
                "fix": "<ul><li>Move repeated inline styles into a CSS class: <code>class=\"highlight\"</code> rather than <code>style=\"color:#c00\"</code>.</li><li>Check the theme or page builder settings: many can write styles to a CSS file instead of the HTML.</li><li>Text pasted from a word processor often brings inline styles with it: paste it as plain text.</li></ul>"
              }
            ]
          },
          {
            "id": "analytics",
            "title": "Analytics",
            "tests": [
              {
                "id": "test-performance_monitoring",
                "title": "Performance Monitoring",
                "checks": "Checks that a web analytics tool (such as Google Analytics, Adobe Analytics, Matomo or Plausible) is detected on the site, including when it is loaded through a tag manager.",
                "why": "Analytics measures visits per page and where they come from, including visits referred by AI assistants such as ChatGPT or Perplexity. It is how you check whether your SEO and content changes bring traffic.",
                "fails": "You cannot measure traffic per page and per source, so you cannot check the effect of your changes. Crawler visits, AI crawlers included, do not appear in analytics scripts: server or CDN logs show them.",
                "fix": "<ul><li>Install an analytics tool on every page, directly or through your tag manager: Google Analytics, Matomo, Plausible or another tool.</li><li>Check that the tag loads on all templates, including landing pages built outside the main theme.</li><li>To follow traffic from AI assistants, create a segment for sources such as chatgpt.com, perplexity.ai or gemini.google.com.</li><li>To see AI crawler visits, read your server or CDN logs: analytics scripts do not record them.</li></ul>"
              },
              {
                "id": "test-visual_analytics_presence",
                "title": "Visual Analytics Presence",
                "checks": "Checks that a heatmap or session recording tool (such as Hotjar, Microsoft Clarity, Mouseflow or Contentsquare) is detected on the site, including when it is loaded through a tag manager.",
                "why": "Heatmaps and session recordings show where visitors click, how far they scroll and where they hesitate. Page analytics shows that visitors leave; these tools help you see why.",
                "fails": "There is no direct effect on search rankings. You lack the data to spot layout problems that stop visitors on your key pages, such as a hidden call to action or a confusing form.",
                "fix": "<ul><li>Install a tool such as Microsoft Clarity or Hotjar on your key pages, directly or through your tag manager.</li><li>Mask form fields and personal data in the recordings, and declare the tool in your consent banner.</li><li>Review the sessions of your main landing pages first, where visitors from search engines and AI assistants arrive.</li></ul>"
              }
            ]
          },
          {
            "id": "hreflang",
            "title": "Hreflang",
            "tests": [
              {
                "id": "test-global_fallback_safety_net",
                "title": "Global Fallback Safety Net",
                "checks": "Flags pages whose hreflang tags include no <code>x-default</code> value; pages without hreflang are not tested.",
                "why": "<code>x-default</code> tells search engines which version to show users whose language or region matches none of your hreflang values. Google recommends it, especially for a language selector or a home page that adapts to the visitor.",
                "fails": "For visitors whose language you do not target, search engines choose a version themselves, which may not be the one you would pick.",
                "fix": "<ul><li>Add an <code>x-default</code> line to each hreflang set, pointing to the default version of that page: <code>&lt;link rel=\"alternate\" hreflang=\"x-default\" href=\"https://example.com/en/page/\"&gt;</code>.</li><li>It can also point to a language selector page; use the same <code>x-default</code> URL on every page of the set.</li><li><code>x-default</code> does not redirect visitors: it only tells search engines which page to show by default.</li></ul>"
              },
              {
                "id": "test-hreflang_language_code_validator",
                "title": "Hreflang Language Code Validator",
                "checks": "Flags hreflang values that are not a two-letter ISO 639-1 language, with an optional ISO 15924 script and an optional ISO 3166-1 alpha-2 region, or <code>x-default</code>; pages without hreflang are not tested.",
                "why": "Search engines match each hreflang value to a language and, if given, a region. A value they do not recognize cannot connect the page to its audience, and common mistakes look valid at first sight.",
                "fails": "The version with the invalid code may not be shown to its audience. Typical cases: <code>en-UK</code> or <code>fr-UK</code> (the code for the United Kingdom is GB), <code>us</code> (a country, not a language), <code>es-419</code> or a three-letter code such as <code>fil</code>.",
                "fix": "<ul><li>Write the language first, in ISO 639-1: <code>en</code>, <code>fr</code>, <code>de</code>. A region alone is not valid.</li><li>Add the region in ISO 3166-1 alpha-2 if needed: <code>en-GB</code>, <code>fr-CA</code>. Google does not support <code>es-419</code>: use <code>es</code> or <code>es-MX</code>.</li><li>Add an ISO 15924 script subtag only when the script differs: <code>zh-Hant</code>, <code>zh-Hans</code>.</li><li>Replace three-letter language codes with the two-letter ISO 639-1 code, for example <code>de</code> rather than <code>deu</code>.</li></ul>"
              },
              {
                "id": "test-hreflang_placement",
                "title": "Hreflang Placement",
                "checks": "Flags pages with an hreflang <code>&lt;link&gt;</code> tag outside the <code>&lt;head&gt;</code>, or with hreflang only on the <code>&lt;a&gt;</code> links of a language switcher; pages without hreflang are not tested.",
                "why": "In HTML, search engines read hreflang only from <code>&lt;link rel=\"alternate\"&gt;</code> tags placed in the <code>&lt;head&gt;</code>. An hreflang attribute on the links of a language switcher, or a <code>&lt;link&gt;</code> tag in the <code>&lt;body&gt;</code>, declares nothing.",
                "fails": "Search engines see no hreflang for these versions: each one is treated as a separate page, and visitors can land on the wrong language. When hreflang is only on switcher links, the other hreflang tests skip the page.",
                "fix": "<ul><li>Declare every language version, the page itself included, with <code>&lt;link rel=\"alternate\" hreflang=\"...\" href=\"...\"&gt;</code> tags inside the <code>&lt;head&gt;</code>.</li><li>Keep the language switcher links for visitors: their hreflang attribute does not replace the <code>&lt;head&gt;</code> tags.</li><li>If a tag lands in the <code>&lt;body&gt;</code>, look for an element before it that closes the <code>&lt;head&gt;</code> early, such as an image or a <code>&lt;div&gt;</code>.</li></ul>"
              },
              {
                "id": "test-hreflang_return_links",
                "title": "Hreflang Return Links",
                "checks": "Flags pages whose alternate version, when crawled, does not link back to them in its own hreflang tags; uncrawled alternates and pages without hreflang are not tested.",
                "why": "Hreflang must be reciprocal: if page A names page B as an alternate, B must name A. Google ignores annotations that are not confirmed by both pages.",
                "fails": "Search engines may ignore the pair, and show visitors a version in the wrong language or for the wrong country.",
                "fix": "<ul><li>On each language version, list every version of the set, the page itself included, with the same URLs.</li><li>Look for alternates that redirect or return an error: they cannot link back. Point the hreflang to their final URL.</li><li>Generate the tags from one shared list in your CMS or translation plugin rather than by hand on each page.</li></ul>"
              },
              {
                "id": "test-hreflang_tag_validator",
                "title": "Hreflang Tag Validator",
                "checks": "Flags pages of a site published in two languages or more that declare no hreflang tag with a valid language code.",
                "why": "Hreflang tags tell search engines which pages are versions of the same content in other languages, so that each audience gets its own. Poliris treats a site as multilingual when its hreflang tags or the <code>lang</code> attribute of its pages show two languages or more.",
                "fails": "Search engines get no link between this page and its translations: they may show a version in the wrong language, and treat the versions as separate pages.",
                "fix": "<ul><li>In the <code>&lt;head&gt;</code>, add one tag per language version, the page itself included: <code>&lt;link rel=\"alternate\" hreflang=\"fr\" href=\"https://example.com/fr/\"&gt;</code>.</li><li>Use the same set of tags on every version of the page.</li><li>A page that exists in one language only needs no hreflang: you can leave it as it is.</li></ul>"
              },
              {
                "id": "test-hreflang_target_consistency",
                "title": "Hreflang Target Consistency",
                "checks": "Flags pages where the same hreflang value (for example <code>fr-FR</code> or <code>x-default</code>) points to more than one URL; pages without hreflang are not tested.",
                "why": "Each hreflang value must designate a single page. With two candidates for the same audience, search engines cannot tell which one to show.",
                "fails": "Search engines may show, for that language or country, another version than the one you intended.",
                "fix": "<ul><li>Keep one URL per hreflang value on each page: one <code>fr-FR</code>, one <code>en-GB</code>, one <code>x-default</code>.</li><li>Check whether two sources write hreflang tags, such as the theme and a translation plugin, and keep only one.</li><li>For two regional pages in the same language, give each its own region: <code>fr-FR</code> and <code>fr-BE</code>.</li></ul>"
              },
              {
                "id": "test-hreflang_url_structure_checker",
                "title": "Hreflang URL Structure Checker",
                "checks": "Flags pages whose hreflang tags use a URL that does not start with <code>https://</code> or <code>http://</code>, such as <code>/fr/</code> or <code>//example.com/fr/</code>; pages without hreflang are not tested.",
                "why": "Google asks for fully qualified URLs in hreflang tags, protocol and domain included. A relative URL can be resolved to another address than the one you meant.",
                "fails": "Search engines may ignore the hreflang tags of the page or connect it to the wrong address, so the right language version is no longer guaranteed to appear.",
                "fix": "<ul><li>Write every hreflang URL in full: <code>https://example.com/fr/page/</code>, not <code>/fr/page/</code>.</li><li>Use the protocol and host your site really answers on (https, with or without www), as in your canonical tags.</li><li>If your CMS outputs relative URLs, change the setting or the template that builds the hreflang block.</li></ul>"
              },
              {
                "id": "test-langauge_identify_confirmation",
                "title": "Language Identity Confirmation",
                "checks": "Flags pages whose hreflang tags do not include the page itself (a self-referencing tag); pages without hreflang are not tested.",
                "why": "Google asks each language version to list itself as well as all the others. The self-referencing tag states the language and region of the page within the set.",
                "fails": "The page's own language and region are missing from the set, so search engines may not show it to the audience it was written for.",
                "fix": "<ul><li>Add a tag for the page itself with its exact URL: on <code>https://example.com/fr/</code>, <code>hreflang=\"fr\" href=\"https://example.com/fr/\"</code>.</li><li>Use the same URL as the page's canonical tag: same protocol, same host, same letter case.</li><li>Use one identical block on every version, each version listing itself and the others.</li></ul>"
              },
              {
                "id": "test-official_language_connection",
                "title": "Official Language Connection",
                "checks": "Flags hreflang URLs that contain a fragment, a tracking parameter or a session ID, or that differ from the canonical URL of the target page; targets not crawled are not checked.",
                "why": "Hreflang should point to the URL search engines index for each version, which is its canonical. A link to a variant (with <code>?utm_source=</code> or <code>#section</code>) names a duplicate, not the page itself.",
                "fails": "Search engines may not connect the language versions, because the hreflang points to a URL they treat as a duplicate of another page.",
                "fix": "<ul><li>Point each hreflang to the exact URL declared in the canonical tag of the target page.</li><li>Remove tracking parameters (<code>utm_*</code>, <code>gclid</code>, <code>fbclid</code>, <code>ref</code>), session IDs and <code>#</code> fragments from hreflang URLs.</li><li>When the canonical of a target points elsewhere, either fix that canonical or point the hreflang to the URL it names.</li></ul>"
              }
            ]
          },
          {
            "id": "images",
            "title": "Images",
            "tests": [
              {
                "id": "test-image_alt_attribute",
                "title": "Image Alt Attribute",
                "checks": "Flags images (<code>&lt;img&gt;</code> elements) that have no <code>alt</code> attribute; an empty alt (<code>alt=\"\"</code>) is accepted, as it marks a decorative image.",
                "why": "The alt text replaces the image for screen reader users and when the image does not load. Google uses it, with the surrounding text, to understand the image and show it in image search.",
                "fails": "Screen readers announce the image without a description, often by reading its file name. The image is less likely to appear in image search, and crawlers reading the HTML get no text for it.",
                "fix": "<ul><li>Describe in a short phrase what each content image shows: <code>alt=\"Blue running shoe, side view\"</code>.</li><li>Use <code>alt=\"\"</code> for purely decorative images, so that screen readers skip them.</li><li>Poliris lists content images with an empty alt as a notice, without scoring them: describe them if they carry information.</li><li>Fill in the alt text in your CMS media library when you insert the image.</li></ul>"
              },
              {
                "id": "test-image_alt_text_length",
                "title": "Image Alt Text Length",
                "checks": "Flags images whose alt text is longer than 100 characters, a Poliris recommendation; images without alt text are covered by Image Alt Attribute.",
                "why": "Screen readers read the whole alt text aloud, so a long one slows visitors down. Google asks for descriptive alt text in context and warns against filling it with keywords.",
                "fails": "Screen reader users hear a long passage for each image, and an alt text filled with keywords can be seen as spam.",
                "fix": "<ul><li>Shorten each listed alt text to a plain description of what the image shows, in 100 characters or fewer.</li><li>Move longer explanations into the page text or a caption (<code>&lt;figcaption&gt;</code>).</li><li>Remove keyword lists and repeated brand names from alt texts.</li></ul>"
              },
              {
                "id": "test-image_availability",
                "title": "Image Availability",
                "checks": "Flags images on the page that answer 404, 410 or a server error (5xx), wherever they are hosted; images that refuse automated checks (401, 403, 405, 429) are listed but not counted.",
                "why": "A broken image shows as an empty or broken frame and removes information the text may refer to. Images hosted on other sites can break without any change on your own site.",
                "fails": "Visitors see broken or empty image frames, and search engines and AI crawlers find image references that lead nowhere.",
                "fix": "<ul><li>Replace each broken image URL with one that loads, usually by uploading the file to your own media library, or remove the image.</li><li>Check that no image still points to a staging, development or retired host.</li><li>After a site migration, redirect the old image URLs to the new ones.</li></ul>"
              },
              {
                "id": "test-image_format_standardization",
                "title": "Image Format Standardization",
                "checks": "Flags images whose type, as declared by the server, is not JPEG, PNG, GIF, SVG, ICO, WebP or AVIF (for example BMP, TIFF or HEIC); images of unknown type are not counted.",
                "why": "Formats outside this list are either not displayed by every browser, such as TIFF or HEIC, or usually uncompressed and very heavy, such as BMP.",
                "fails": "Some visitors see a broken image, and the others download a heavier file than needed. Google Images does not support TIFF or HEIC, so these images may not appear there.",
                "fix": "<ul><li>Convert these images to WebP or AVIF; JPEG and PNG also pass this test, but Modern Image Format flags them.</li><li>Check the media library and upload settings: photos taken with a phone often arrive in HEIC.</li><li>Make sure the server sends the right <code>Content-Type</code> header, for example <code>image/webp</code>.</li></ul>"
              },
              {
                "id": "test-image_optimization",
                "title": "Image Optimization",
                "checks": "Flags images of 100 KB or more (a Poliris recommendation, not a search engine limit); images whose size could not be measured are not counted.",
                "why": "Heavy images slow down loading, mostly on mobile networks, and the main image often sets the Largest Contentful Paint (LCP), one of Google's Core Web Vitals.",
                "fails": "Pages display more slowly, especially on mobile, and LCP can exceed Google's 2.5-second threshold for a good score when the main image is heavy.",
                "fix": "<ul><li>Resize images to the size they are displayed at: a 400-pixel-wide thumbnail does not need a 3,000-pixel file.</li><li>Compress photos and serve them in WebP or AVIF, usually much lighter than JPEG or PNG.</li><li>Use <code>srcset</code> and <code>sizes</code> so that phones download a smaller version than desktops.</li></ul>"
              },
              {
                "id": "test-modern_image_format",
                "title": "Modern Image Format",
                "checks": "Flags images that are not served as WebP or AVIF, according to the server's <code>Content-Type</code> header; SVG and ICO files are left out of the test.",
                "why": "WebP and AVIF usually produce much lighter files than JPEG, PNG or GIF at the same visual quality, and all current browsers display them.",
                "fails": "Images weigh more than needed, which slows down loading and can delay the Largest Contentful Paint (LCP) when the main image of the page is concerned.",
                "fix": "<ul><li>Convert photos and illustrations to WebP or AVIF: most CMSs, image plugins and image CDNs can do it automatically.</li><li>Replace the JPEG, PNG or GIF file named in the image's <code>src</code> with its WebP or AVIF version.</li><li>Replace animated GIFs with animated WebP or a short video.</li><li>Keep SVG for logos and icons: vector files are not flagged.</li></ul>"
              },
              {
                "id": "test-secure_image_delivery",
                "title": "Secure Image Delivery",
                "checks": "Flags images loaded over <code>http://</code> instead of <code>https://</code>, wherever they are hosted.",
                "why": "On an HTTPS page, an image requested over HTTP is mixed content: the connection is no longer fully encrypted, and the image can be read or altered on the way.",
                "fails": "Recent browsers try to load these images over HTTPS and do not show them if that fails; others mark the page as not fully secure.",
                "fix": "<ul><li>Change image URLs to <code>https://</code> in your content and templates: <code>https://example.com/images/logo.png</code>.</li><li>In a CMS, replace <code>http://example.com</code> with <code>https://example.com</code> in the database after the HTTPS migration.</li><li>For images hosted elsewhere, use the provider's HTTPS URL, or host the file on your own site.</li></ul>"
              }
            ]
          },
          {
            "id": "meta-description",
            "title": "Meta Description",
            "tests": [
              {
                "id": "test-meta_description_length_requirements",
                "title": "Meta Description Length Requirements",
                "checks": "Checks that the meta description is 120 to 155 characters long; pages without a meta description are skipped.",
                "why": "Search engines can show the meta description as the snippet under your page title. Google sets no length limit but shortens snippets to fit the screen, so Poliris recommends 120 to 155 characters: enough to describe the page, short enough to be shown in full.",
                "fails": "A description over 155 characters is likely to be cut off in results, which can hide its end. One under 120 characters gives searchers little information to choose your page.",
                "fix": "<ul><li>Rewrite the description in 120 to 155 characters: what the page offers, for whom, and what sets it apart.</li><li>Put the key information first, in case the snippet is shortened.</li><li>If descriptions are generated automatically, adjust the template or SEO plugin setting that builds them.</li></ul>"
              },
              {
                "id": "test-meta_description_occurrence",
                "title": "Meta Description Occurrence",
                "checks": "Flags pages that have more than one <code>&lt;meta name=\"description\"&gt;</code> tag in the <code>&lt;head&gt;</code>; pages without a meta description are skipped.",
                "why": "A page should carry a single description. Several tags usually mean that two tools, such as a theme and an SEO plugin, each add one, and you no longer control which text search engines use.",
                "fails": "The snippet may come from the wrong tag, for example a generic text set by the theme instead of the description written for the page.",
                "fix": "<ul><li>View the page source and search for <code>name=\"description\"</code> to find each tag and the tool that outputs it.</li><li>Keep one source: turn off the description output of either the theme or the SEO plugin.</li><li>Also check scripts and templates that add tags to the <code>&lt;head&gt;</code>.</li></ul>"
              },
              {
                "id": "test-meta_description_presence",
                "title": "Meta Description Presence",
                "checks": "Checks that the page has a <code>&lt;meta name=\"description\"&gt;</code> tag in the <code>&lt;head&gt;</code>, with non-empty content.",
                "why": "Google may use the meta description for the snippet under your title when it describes the page better than the visible text. Writing one gives you a say in how the page is presented in search results.",
                "fails": "Search engines build the snippet from text taken from the page, which may summarize it poorly. The length and duplicate tag tests are skipped until a description is added.",
                "fix": "<ul><li>Write a description for each page that summarizes its content in 120 to 155 characters.</li><li>Add it in the <code>&lt;head&gt;</code>: <code>&lt;meta name=\"description\" content=\"Custom oak tables made to order, delivered in three weeks.\"&gt;</code></li><li>In a CMS, fill the description field of the page or of the SEO plugin rather than editing the template.</li></ul>"
              },
              {
                "id": "test-meta_description_uniqueness",
                "title": "Meta Description Uniqueness",
                "checks": "Compares each page's meta description with those of the other crawled pages in the same language: identical descriptions fail, almost identical ones show as a warning.",
                "why": "Google recommends a distinct description for each page: identical descriptions do not help searchers tell pages apart. A specific description also shows what that page offers that the others do not.",
                "fails": "Pages sharing a description look alike in search results, and the snippet gives no reason to choose one over another. Search engines may also replace it with text taken from the page.",
                "fix": "<ul><li>Write a specific description for each flagged page, 120 to 155 characters, based on what only that page offers.</li><li>For large sets of similar pages (products, locations), build the description from page data such as name, price or city.</li><li>For a warning, check that the pages really differ, then make that difference visible in the description.</li><li>If two URLs are true duplicates, point the canonical of one to the other: it is then left out of the comparison.</li></ul>"
              }
            ]
          },
          {
            "id": "open-graph-meta",
            "title": "Open Graph Meta",
            "tests": [
              {
                "id": "test-og_description_length",
                "title": "OG Description Length",
                "checks": "Checks that <code>og:description</code> is 55 to 155 characters long; it also fails when the page has other Open Graph tags but no <code>og:description</code>, and is skipped when it has none.",
                "why": "Social networks and messaging apps show <code>og:description</code> under the title of a shared link and shorten long texts to fit the preview. Poliris recommends 55 to 155 characters, so the text carries a full idea and stays readable.",
                "fails": "A long description is likely to be cut in link previews, and a very short one says little about the page. Either way, the preview gives people less reason to open the link.",
                "fix": "<ul><li>Rewrite <code>og:description</code> in 55 to 155 characters, with the main point first.</li><li>Reuse the meta description if it fits the range, or write a version for social sharing.</li><li>Check the social sharing settings of your CMS or SEO plugin, which often fill this tag automatically.</li></ul>"
              },
              {
                "id": "test-og_description_presence",
                "title": "OG Description Presence",
                "checks": "Checks that the page has a non-empty <code>og:description</code> tag (<code>&lt;meta property=\"og:description\"&gt;</code>).",
                "why": "When a link is shared on Facebook, LinkedIn or in messaging apps, <code>og:description</code> provides the text shown under the title. It lets you decide how the page is summarized instead of leaving it to each platform.",
                "fails": "Each platform then picks a text itself, or shows none, so the preview may describe the page poorly.",
                "fix": "<ul><li>Add the tag in the <code>&lt;head&gt;</code>: <code>&lt;meta property=\"og:description\" content=\"Custom oak tables made to order, delivered in three weeks.\"&gt;</code></li><li>Keep it between 55 and 155 characters, the range checked by OG Description Length.</li><li>Use the <code>property</code> attribute, as the Open Graph protocol specifies: a tag written with <code>name</code> is not counted.</li></ul>"
              },
              {
                "id": "test-og_image_presence",
                "title": "OG Image Presence",
                "checks": "Checks that the page has a non-empty <code>og:image</code> tag, giving the URL of the image to show when the page is shared.",
                "why": "<code>og:image</code> is one of the four properties the Open Graph protocol requires. Most platforms show this image as the visual of a link preview, which makes the link easier to notice in a feed.",
                "fails": "Platforms pick an image from the page themselves, which may be a logo or an icon, or share the link without an image.",
                "fix": "<ul><li>Add an absolute image URL: <code>&lt;meta property=\"og:image\" content=\"https://example.com/images/oak-table.jpg\"&gt;</code></li><li>Use a wide image of about 1200 x 630 pixels, a size that displays well on the main platforms.</li><li>Choose an image that represents the page, such as the product photo or the article illustration, rather than the same logo everywhere.</li></ul>"
              },
              {
                "id": "test-og_title_length",
                "title": "OG Title Length",
                "checks": "Checks that <code>og:title</code> is 60 characters or fewer; it also fails when the page has other Open Graph tags but no <code>og:title</code>, and is skipped when it has none.",
                "why": "Link previews show <code>og:title</code> as the headline of a shared link and shorten long titles to fit. Poliris recommends 60 characters at most, so the title is shown in full on most screens.",
                "fails": "The end of the title may be cut off in previews, so a key word or your brand name may not appear.",
                "fix": "<ul><li>Shorten <code>og:title</code> to 60 characters or fewer, with the main subject first.</li><li>Drop long brand suffixes: most previews already show your domain.</li><li>If <code>og:title</code> copies the <code>&lt;title&gt;</code>, write a shorter version for social sharing when needed.</li></ul>"
              },
              {
                "id": "test-og_title_presence",
                "title": "OG Title Presence",
                "checks": "Checks that the page has a non-empty <code>og:title</code> tag (<code>&lt;meta property=\"og:title\"&gt;</code>).",
                "why": "<code>og:title</code> is one of the four properties the Open Graph protocol requires. Facebook, LinkedIn and messaging apps show it as the headline of a shared link.",
                "fails": "Each platform then picks a title itself, often the <code>&lt;title&gt;</code> tag, which may not be written for social sharing.",
                "fix": "<ul><li>Add the tag in the <code>&lt;head&gt;</code>: <code>&lt;meta property=\"og:title\" content=\"Custom oak dining tables\"&gt;</code></li><li>Keep it to 60 characters or fewer, the limit checked by OG Title Length.</li><li>Use the <code>property</code> attribute, as the Open Graph protocol specifies: a tag written with <code>name</code> is not counted.</li></ul>"
              },
              {
                "id": "test-og_url_presence",
                "title": "OG URL Presence",
                "checks": "Checks that the page has a non-empty <code>og:url</code> tag; the value itself is not compared with the page URL or the canonical.",
                "why": "<code>og:url</code> is one of the four properties the Open Graph protocol requires. It gives the permanent address of the page: Facebook, for example, counts likes and shares on this URL rather than on each shared variant.",
                "fails": "Platforms use whatever URL was shared, so versions with tracking parameters (<code>? utm_source=...</code>) can be treated as separate pages, with their share counts split.",
                "fix": "<ul><li>Add the absolute canonical URL: <code>&lt;meta property=\"og:url\" content=\"https://example.com/tables/oak/\"&gt;</code></li><li>Use the same URL as the canonical tag, without tracking parameters or session IDs.</li><li>Generate it in the template so each page outputs its own URL, not the homepage's.</li></ul>"
              }
            ]
          },
          {
            "id": "page-headers",
            "title": "Page Headers",
            "tests": [
              {
                "id": "test-h1_heading_length_requirements",
                "title": "H1 Heading Length Requirements",
                "checks": "Checks that the page's first H1 is 20 to 70 characters long; pages without an H1 are skipped, and only the first H1 is measured when there are several.",
                "why": "The H1 is the visible title of the page and tells readers and crawlers what it is about. Poliris recommends 20 to 70 characters: enough to name the subject precisely, short enough to read at a glance.",
                "fails": "A very short H1, such as \"Welcome\" or a brand name, says little about the subject. A very long one reads like a paragraph and blurs the main topic.",
                "fix": "<ul><li>Rewrite the H1 to name the page's subject in 20 to 70 characters, for example \"Custom oak dining tables\".</li><li>Move secondary details, such as a slogan or an offer, into a subtitle or the first paragraph.</li><li>Check that the logo or a banner is not marked up as the first <code>&lt;h1&gt;</code> of the page.</li></ul>"
              },
              {
                "id": "test-h2_tag_length_requirements",
                "title": "H2 Tag Length Requirements",
                "checks": "Checks that every H2 on the page is 20 to 70 characters long; pages without an H2 are skipped.",
                "why": "H2 headings name the sections of a page. Descriptive headings help readers scan the content and help crawlers understand what each section covers. Poliris recommends 20 to 70 characters per H2.",
                "fails": "At least one H2 is outside the range. Short labels such as \"FAQ\" carry little information on their own, and very long H2s are often paragraphs or promotional text styled as headings.",
                "fix": "<ul><li>Make short H2s more descriptive: \"Delivery and returns questions\" rather than \"FAQ\".</li><li>Turn long H2s into a short heading followed by a paragraph.</li><li>Do not use <code>&lt;h2&gt;</code> for styling: footer titles, buttons or banners can use CSS classes instead.</li><li>Short labels such as \"Pricing\" can stay where they read well: this test has a low severity.</li></ul>"
              },
              {
                "id": "test-h2_tag_presence",
                "title": "H2 Tag Presence",
                "checks": "Checks that the page has at least one <code>&lt;h2&gt;</code> heading.",
                "why": "H2 headings divide a page into sections. They help readers scan the content, and help search engines and AI crawlers see which topics the page covers and where each one starts.",
                "fails": "The page has no marked-up sections: the text is harder to scan, and its structure is less clear to crawlers that read the HTML. H2 Tag Length Requirements is skipped.",
                "fix": "<ul><li>Split the main content into sections and give each one an <code>&lt;h2&gt;</code> that names its topic.</li><li>If section titles use <code>&lt;div&gt;</code> or <code>&lt;p&gt;</code> with bold styling, mark them up as <code>&lt;h2&gt;</code>.</li><li>Use H3 headings for subsections inside an H2 section.</li></ul>"
              },
              {
                "id": "test-heading_hierarchy",
                "title": "Heading Hierarchy",
                "checks": "Flags pages where a heading appears before any heading of the level just above it, for example an H3 with no H2 before it, or an H2 placed above the H1.",
                "why": "Headings form the outline of a page. Screen readers use them to navigate, and a logical order helps readers and crawlers understand how sections relate to each other.",
                "fails": "The outline is broken: a section seems to belong to a level that does not exist yet, which confuses assistive technologies and makes the structure harder to follow.",
                "fix": "<ul><li>Introduce levels in order: an H3 needs an H2 earlier on the page, an H4 needs an H3.</li><li>Check headings outside the main content, such as a menu, sidebar or banner title marked up as H2 or H3 above the H1.</li><li>Choose heading levels for structure, not for size: change the look with CSS.</li></ul>"
              },
              {
                "id": "test-primary_heading_h1_presence",
                "title": "Primary Heading (H1) Presence",
                "checks": "Checks that the page has exactly one H1 with text; a page with no H1, or with several, fails.",
                "why": "The H1 is the main visible heading and states the subject of the page for readers and crawlers. HTML allows several H1s, but Poliris recommends a single one so the main topic is unambiguous.",
                "fails": "With no H1, the page has no main heading in its markup. With several, none stands out as the main one, and the topic of the page is less clear.",
                "fix": "<ul><li>Add one <code>&lt;h1&gt;</code> at the top of the main content that names the subject of the page.</li><li>If there are several, keep the main one as H1 and change the others to H2, or style them with CSS.</li><li>Check the templates: logos, sliders and sidebar titles are frequent sources of extra H1s.</li></ul>"
              },
              {
                "id": "test-primary_heading_h1_uniqueness",
                "title": "Primary Heading (H1) Uniqueness",
                "checks": "Flags pages whose H1 is identical to the H1 of another crawled page in the same language, ignoring case and spacing.",
                "why": "The H1 tells visitors which page they are on. When several pages share the same H1, readers and search engines have more trouble telling them apart, and the pages may compete for the same searches.",
                "fails": "Pages with identical H1s look interchangeable, which makes it harder for each one to stand out as the answer to a specific search.",
                "fix": "<ul><li>Rewrite each flagged H1 so it names what is specific to the page: product, place, service or question.</li><li>On pages built from one template, include a variable such as the product name or the city in the H1.</li><li>If two URLs are true duplicates, point the canonical of one to the other: it is then left out of the comparison.</li></ul>"
              }
            ]
          },
          {
            "id": "page-title",
            "title": "Page Title",
            "tests": [
              {
                "id": "test-page_title_length",
                "title": "Page Title Length",
                "checks": "Checks that the <code>&lt;title&gt;</code> is 30 to 60 characters long; pages without a title are skipped.",
                "why": "Search engines usually build the clickable headline of a result from the title. Google sets no length limit but shortens long titles to fit the screen, so Poliris recommends 30 to 60 characters.",
                "fails": "A title over 60 characters may be cut off in results, hiding its last words. A title under 30 characters often lacks the detail that tells searchers what the page offers.",
                "fix": "<ul><li>Write a title of 30 to 60 characters with the page's subject first, for example \"Custom oak dining tables | Example\".</li><li>Put the brand name at the end, or drop it when space is short.</li><li>Check the title pattern of your CMS or SEO plugin, which often adds the same suffix to every page.</li></ul>"
              },
              {
                "id": "test-page_title_occurrence",
                "title": "Page Title Occurrence",
                "checks": "Flags pages that have more than one <code>&lt;title&gt;</code> tag in the <code>&lt;head&gt;</code>; pages without a title are skipped.",
                "why": "HTML allows only one <code>&lt;title&gt;</code> per document. A second tag usually means that two tools, such as a theme and an SEO plugin, each output one.",
                "fails": "Browsers show the first <code>&lt;title&gt;</code> in the code, which may not be the one written for the page, and you no longer control which title search engines read.",
                "fix": "<ul><li>View the page source and search for <code>&lt;title&gt;</code> to find each tag and the tool that outputs it.</li><li>Keep one source: turn off the title output of either the theme or the SEO plugin.</li><li>Also check scripts and templates that add tags to the <code>&lt;head&gt;</code>.</li></ul>"
              },
              {
                "id": "test-page_title_presence",
                "title": "Page Title Presence",
                "checks": "Checks that the page has a <code>&lt;title&gt;</code> tag in the <code>&lt;head&gt;</code>, with non-empty text.",
                "why": "Search engines use the <code>&lt;title&gt;</code> as a main source for the headline of a result, and browsers show it in the tab and in bookmarks.",
                "fails": "Search engines build a title from other text on the page, such as a heading, which may describe it poorly. Page Title Length and Page Title Occurrence are skipped until a title is added.",
                "fix": "<ul><li>Add a title in the <code>&lt;head&gt;</code>: <code>&lt;title&gt;Custom oak dining tables | Example&lt;/title&gt;</code></li><li>Make it specific to the page and 30 to 60 characters long.</li><li>If your CMS leaves it empty, fill the title field of the page or of the SEO plugin.</li></ul>"
              },
              {
                "id": "test-title_tag_uniqueness",
                "title": "Title Tag Uniqueness",
                "checks": "Compares each page's <code>&lt;title&gt;</code> with those of the other crawled pages in the same language: identical titles fail, almost identical ones show as a warning.",
                "why": "Google recommends distinctive titles that describe each page. When pages share a title, searchers cannot tell them apart in results, and search engines have more trouble choosing which page to show.",
                "fails": "Pages with the same title look interchangeable in results and may compete for the same searches. Google may also rewrite repeated titles with other text from the page.",
                "fix": "<ul><li>Rewrite each flagged title around what is specific to the page, keeping 30 to 60 characters.</li><li>On pages built from one template, include a variable such as the product name, city or category.</li><li>For a warning, check that the pages really differ, then make that difference visible in the title.</li><li>If two URLs are true duplicates, point the canonical of one to the other: it is then left out of the comparison.</li></ul>"
              }
            ]
          },
          {
            "id": "schema",
            "title": "Schema",
            "tests": [
              {
                "id": "test-general_schema_presence",
                "title": "General Schema Presence",
                "checks": "Checks that the page contains structured data: a JSON-LD script, or Microdata (<code>itemtype</code>) or RDFa (<code>typeof</code>) attributes; the markup itself is validated by the other schema tests.",
                "why": "Structured data describes the page in the Schema.org vocabulary: organization, product, article, price. Google uses it to understand content and to make pages eligible for rich results, and other crawlers can read it in the HTML too.",
                "fails": "Search engines and AI crawlers only have the visible text to work out what the page describes, and the page cannot get rich results that rely on structured data. The other schema tests are skipped.",
                "fix": "<ul><li>Add JSON-LD, the format Google recommends, in a <code>&lt;script type=\"application/ld+json\"&gt;</code> block.</li><li>Start with Organization and WebSite on the homepage, then the type that matches each page: Product, Article, Service.</li><li>Put the markup in the HTML sent by the server: markup added by JavaScript is missed by crawlers that do not run it.</li><li>Check the result with Google's Rich Results Test or the Schema.org validator.</li></ul>"
              },
              {
                "id": "test-json_script_integrity",
                "title": "JSON Script Integrity",
                "checks": "Checks that every <code>&lt;script type=\"application/ld+json\"&gt;</code> block on the page contains valid JSON; pages without JSON-LD are skipped.",
                "why": "A JSON-LD block can only be read if it is valid JSON. A single syntax error, such as a trailing comma or an unescaped quote, makes the whole block unreadable.",
                "fails": "Search engines and other tools cannot read the block, so the information it holds is lost and the page may lose rich results that depended on it.",
                "fix": "<ul><li>Paste the block into a JSON validator or Google's Rich Results Test to locate the error.</li><li>Look for common mistakes: trailing commas, single quotes, unescaped quotes in text, comments, or two objects without an enclosing array.</li><li>Generate JSON-LD with a JSON encoder or a plugin rather than by assembling text in a template.</li></ul>"
              },
              {
                "id": "test-recommended_schema_presence",
                "title": "Recommended Schema Presence",
                "checks": "Checks that the page's structured data includes at least one type expected for its page type, for example Product on a product page; pages without structured data are skipped.",
                "why": "Generic markup such as WebPage says little about the content. The type that matches the page (Product, Article, LocalBusiness) tells search engines and AI crawlers what the page describes, and most rich results require it.",
                "fails": "The page has structured data, but none of the types expected for its kind of page. Search engines get less precise information, and the page cannot get the rich results tied to that type.",
                "fix": "<ul><li>Homepage: Organization, WebSite or WebPage. Product page: Product. Article: Article, BlogPosting, NewsArticle, FAQPage or HowTo.</li><li>Category page: CollectionPage, ItemList, WebPage or BreadcrumbList. Service page: Service, Organization or WebPage. Contact page: LocalBusiness or Organization.</li><li>Other pages: one common type such as WebPage, WebSite, Organization, Service, Product or Article.</li><li>The expected types follow the page type shown in your Poliris audit.</li></ul>"
              },
              {
                "id": "test-schema_syntax",
                "title": "Schema Syntax",
                "checks": "Flags structured data with invalid JSON, no Schema.org <code>@context</code>, an empty <code>@type</code>, a core property missing on common types, or a Microdata <code>itemtype</code> outside Schema.org; pages without structured data are skipped.",
                "why": "Markup that cannot be parsed or lacks basic properties may be ignored by search engines. Poliris checks the errors that most often break markup, not every rule of the Schema.org vocabulary.",
                "fails": "Search engines may skip the affected markup, so the page can lose rich results and the information the markup was meant to convey.",
                "fix": "<ul><li>Declare the vocabulary: <code>\"@context\": \"https://schema.org\"</code> in JSON-LD, a <code>https://schema.org/...</code> URL in Microdata <code>itemtype</code>.</li><li>Core properties: name for Organization, LocalBusiness, Product and Service; headline for Article, BlogPosting and NewsArticle; mainEntity for FAQPage; itemListElement for BreadcrumbList.</li><li>WebSite needs name or url; WebPage and CollectionPage need name, headline or url, nested objects included (for example in mainEntityOfPage).</li><li>Then test the page with Google's Rich Results Test, which lists the properties each rich result requires.</li></ul>"
              }
            ]
          },
          {
            "id": "twitter-meta",
            "title": "Twitter Meta",
            "tests": [
              {
                "id": "test-social_metadata_description",
                "title": "Social Metadata Description",
                "checks": "Checks that the page has a non-empty <code>twitter:description</code> tag (<code>&lt;meta name=\"twitter:description\"&gt;</code>).",
                "why": "X (formerly Twitter) and some other apps read Twitter Card tags to build link previews. <code>twitter:description</code> sets the summary of the card; when it is missing, X falls back on <code>og:description</code> if the page has one.",
                "fails": "If the page has <code>og:description</code>, X uses it and the impact is limited. Without either tag, the card has no summary chosen by you.",
                "fix": "<ul><li>Add the tag in the <code>&lt;head&gt;</code>: <code>&lt;meta name=\"twitter:description\" content=\"Custom oak tables made to order, delivered in three weeks.\"&gt;</code></li><li>Aim for 120 to 160 characters, the range Poliris recommends for this tag.</li><li>Use the <code>name</code> attribute: a Twitter Card tag written with <code>property</code> is not counted by this test.</li></ul>"
              },
              {
                "id": "test-social_metadata_description_requirements",
                "title": "Social Metadata Description Length Requirements",
                "checks": "Checks that <code>twitter:description</code> is 120 to 160 characters long; pages without <code>twitter:description</code> are skipped.",
                "why": "X accepts up to 200 characters, and apps shorten text to fit their previews. Poliris recommends 120 to 160 characters, so the summary is complete without being cut.",
                "fails": "A short description says little about the page; a long one may be cut in previews, hiding its end.",
                "fix": "<ul><li>Rewrite <code>twitter:description</code> in 120 to 160 characters, with the main point first.</li><li>A meta description of 120 to 155 characters also fits this range and can be reused.</li><li>Check the social settings of your CMS or SEO plugin, which often fill this tag automatically.</li></ul>"
              },
              {
                "id": "test-social_metadata_image",
                "title": "Social Metadata Image",
                "checks": "Checks that the page has a non-empty <code>twitter:image</code> tag, giving the URL of the image for the card.",
                "why": "An image makes a shared link more visible in a feed. When <code>twitter:image</code> is missing, X falls back on <code>og:image</code> if the page has one.",
                "fails": "If the page has <code>og:image</code>, X uses it and the impact is limited. Without either tag, the link is shared without an image chosen by you.",
                "fix": "<ul><li>Add an absolute URL: <code>&lt;meta name=\"twitter:image\" content=\"https://example.com/images/oak-table.jpg\"&gt;</code></li><li>X accepts JPG, PNG, WEBP and GIF files under 5 MB; SVG is not supported.</li><li>For <code>summary_large_image</code> cards, use a wide image; the one used for <code>og:image</code> usually works.</li><li>Describe the image in <code>twitter:image:alt</code> for people using screen readers.</li></ul>"
              },
              {
                "id": "test-social_metadata_property",
                "title": "Social Metadata Property",
                "checks": "Checks that the page has a non-empty <code>twitter:site</code> tag, which names the X account of the website, for example <code>@example</code>.",
                "why": "<code>twitter:site</code> links the page to your X (Twitter) account, so cards can be attributed to it. X's documentation lists it, or <code>twitter:site:id</code>, as required for cards. Nothing is verified: the tag only states the account name.",
                "fails": "Shared links are not attributed to your X account. Note that this test looks for <code>twitter:site</code> only: a page with only <code>twitter:site:id</code> fails.",
                "fix": "<ul><li>Add the tag once in the site-wide template: <code>&lt;meta name=\"twitter:site\" content=\"@example\"&gt;</code></li><li>Use the handle of the company or publication account, with the @.</li><li>To credit the author of an article, also add <code>twitter:creator</code> with the author's handle.</li></ul>"
              },
              {
                "id": "test-social_metadata_title",
                "title": "Social Metadata Title",
                "checks": "Checks that the page has a non-empty <code>twitter:title</code> tag (<code>&lt;meta name=\"twitter:title\"&gt;</code>).",
                "why": "<code>twitter:title</code> is the Twitter Card tag for the title of a shared link, read by X and some other apps. When it is missing, X falls back on <code>og:title</code>.",
                "fails": "If the page has <code>og:title</code>, X uses it and the impact is limited. Without either tag, the card has no title chosen by you.",
                "fix": "<ul><li>Add the tag in the <code>&lt;head&gt;</code>: <code>&lt;meta name=\"twitter:title\" content=\"Custom oak dining tables\"&gt;</code></li><li>Keep it to 55 characters or fewer, the length Poliris recommends.</li><li>You can use the same text as <code>og:title</code>; most CMS and SEO plugins can output both tags.</li></ul>"
              },
              {
                "id": "test-social_metadata_title_requirements",
                "title": "Social Metadata Title Requirements",
                "checks": "Checks that <code>twitter:title</code> is 55 characters or fewer; pages without <code>twitter:title</code> are skipped.",
                "why": "X accepts titles of up to 70 characters, and apps shorten long titles to fit their previews. Poliris recommends 55 characters at most, so the title is shown in full.",
                "fails": "The end of the title may be cut off, so a key word or your brand name may not be visible.",
                "fix": "<ul><li>Shorten <code>twitter:title</code> to 55 characters or fewer, with the main subject first.</li><li>Drop long brand suffixes: the card already shows your domain.</li><li>If the tag copies the <code>&lt;title&gt;</code> (up to 60 characters), write a shorter version for social sharing.</li></ul>"
              },
              {
                "id": "test-social_metadata_type",
                "title": "Social Metadata Type",
                "checks": "Checks that the page has a non-empty <code>twitter:card</code> tag, which sets the type of card used when the page is shared on X.",
                "why": "<code>twitter:card</code> turns on a Twitter Card and sets its layout, such as <code>summary</code> (small image) or <code>summary_large_image</code> (large image).",
                "fails": "X cannot apply the layout you want. If the page has <code>og:type</code>, <code>og:title</code> and <code>og:description</code>, X may show a basic summary card; otherwise the link may have no card.",
                "fix": "<ul><li>Add the tag in the <code>&lt;head&gt;</code>: <code>&lt;meta name=\"twitter:card\" content=\"summary_large_image\"&gt;</code></li><li>Use <code>summary_large_image</code> for pages with a strong visual, <code>summary</code> for the others.</li><li>Set it once in the site-wide template so every page outputs it.</li></ul>"
              },
              {
                "id": "test-social_metadata_validation",
                "title": "Social Metadata Validation",
                "checks": "Checks that <code>twitter:card</code> is set to one of the four card types X supports, <code>summary</code>, <code>summary_large_image</code>, <code>app</code> or <code>player</code>, spelled exactly as listed; a missing tag also fails.",
                "why": "X recognizes only these four values. A typo or an unsupported value, such as <code>large_image</code> or a value copied from <code>og:type</code>, leaves X without a valid card type.",
                "fails": "X may ignore the tag and show a basic card or none, so the layout you chose is not applied.",
                "fix": "<ul><li>Replace the value with <code>summary_large_image</code> or <code>summary</code>, the two types meant for ordinary web pages.</li><li>Use <code>app</code> and <code>player</code> only for app install cards and media players, which need extra tags.</li><li>Check the spelling: lowercase with underscores, for example <code>summary_large_image</code>, not <code>Summary Large Image</code>.</li></ul>"
              }
            ]
          }
        ]
      },
      {
        "id": "content-quality",
        "title": "Content Quality",
        "groups": [
          {
            "id": "architecture",
            "title": "Architecture",
            "tests": [
              {
                "id": "test-content_cannibalization_risk",
                "title": "Content Cannibalization Risk",
                "checks": "Flags pages that cover the same topic as another page of the site; translations, pages of one paginated series and pages whose canonical points elsewhere are not compared.",
                "why": "When two pages answer the same need, search engines have to choose one of them for each search, and links and visits are split between two pages instead of building one strong reference.",
                "fails": "The pages may take turns in search results without either becoming the clear reference, and search engines or AI assistants may show the version you consider secondary.",
                "fix": "<ul><li>If both pages serve the same purpose, merge them into the stronger one and redirect the other with a 301.</li><li>If they serve different needs, make the difference clear in the title, the H1 and the first paragraph of each page.</li><li>If one page is a variant of the other (filter, print version), add a canonical tag pointing to the main page.</li><li>Link from the secondary page to the main one with anchor text that describes its topic.</li></ul>"
              },
              {
                "id": "test-page_content_uniqueness",
                "title": "Page Content Uniqueness",
                "checks": "Flags pages whose main text is identical to another page's, ignoring case and spacing; texts under 200 characters are not compared.",
                "why": "Search engines group identical pages and usually show only one of them, which may not be the one you prefer. Only exact copies fail here: pages on the same topic are covered by Content Cannibalization Risk.",
                "fails": "Search engines choose which copy to show and usually leave the others out of results. Links and visits are split across the copies, and crawlers spend time on pages that add nothing new.",
                "fix": "<ul><li>If the same page answers under several URLs, redirect the extra URLs to a single one with a 301.</li><li>If a copy must stay online, add a canonical tag: <code>&lt;link rel=\"canonical\" href=\"https://example.com/page/\"&gt;</code>.</li><li>If each page should exist on its own, rewrite its main text around what is specific to it.</li><li>Check URL parameters, such as sorting or tracking, that serve the same page under another address.</li></ul>"
              },
              {
                "id": "test-topical_cluster_alignment",
                "title": "Topical Cluster Alignment",
                "checks": "Flags pages whose topic is not close to any other page of the site; pages with fewer than 80 characters of main text are skipped.",
                "why": "Pages on related topics support each other: they can link to one another and together show what your site covers. A page with no related page gets none of that context.",
                "fails": "The page stands alone in your site: no related content supports it, and it may fall outside the topics your site is known for.",
                "fix": "<ul><li>Make the title, the H1 and the first paragraph state the page's topic clearly, in the terms your related pages use.</li><li>If the page belongs to your offer, create or link related pages that cover the same topic from other angles.</li><li>If the page is off-topic or outdated, merge it into a related page or remove it with a redirect.</li><li>A page isolated by nature, such as a job offer or an event page, can stay as it is.</li></ul>"
              }
            ]
          },
          {
            "id": "content",
            "title": "Content",
            "tests": [
              {
                "id": "test-ai_generation_footprint",
                "title": "AI Generation Footprint",
                "checks": "Flags pages whose main text reads like unedited AI-generated text, as judged by an AI model: stock phrases, predictable transitions, uniform paragraphs and no distinct voice.",
                "why": "Google does not penalize AI-written text as such: its spam policies target low-value content produced at scale, whatever the method. Generic wording still makes a page less convincing and harder to tell apart from others.",
                "fails": "Readers may trust the page less, and its wording offers nothing that sets it apart from competing pages.",
                "fix": "<ul><li>Remove stock phrases such as \"In today's fast-paced world\", \"It is important to note\" or \"In conclusion\".</li><li>Replace general statements with your own facts, examples and figures.</li><li>Vary sentence and paragraph length, and write in the voice your brand uses elsewhere.</li><li>Have someone who knows the subject edit the text before publishing.</li></ul>"
              },
              {
                "id": "test-content_signals_richness",
                "title": "Content Signals & Richness",
                "checks": "Flags pages whose most recent date, found in the page, the <code>Last-Modified</code> header or the sitemap <code>&lt;lastmod&gt;</code>, is older than 6 months, and pages that give no date at all.",
                "why": "Dates tell readers, search engines and AI assistants how current a page is. Google uses the sitemap <code>&lt;lastmod&gt;</code> when it is consistently accurate, and reads dates from structured data such as <code>dateModified</code>.",
                "fails": "Search engines and AI assistants cannot tell whether the page is current, or see that it has not changed in more than 6 months. For topics that change, more recent sources may be preferred.",
                "fix": "<ul><li>Review the content, update what has changed and show the update date on the page.</li><li>Mark the date up in the HTML: <code>dateModified</code> in your Article or WebPage structured data, or a <code>&lt;time datetime=\"2025-06-01\"&gt;</code> element.</li><li>Keep the sitemap <code>&lt;lastmod&gt;</code> accurate and have the server send a <code>Last-Modified</code> header.</li><li>Do not change a date without a real update: Google advises against refreshing dates artificially.</li></ul>"
              },
              {
                "id": "test-demonstrated_expertise",
                "title": "Demonstrated Expertise",
                "checks": "Flags pages whose main text shows no first-hand experience or in-depth knowledge of the subject (specific details, practitioner insight, credentials), as judged by an AI model.",
                "why": "Google asks sites to publish helpful, reliable content and to make clear who wrote it and with what expertise. E-E-A-T (experience, expertise, authoritativeness, trustworthiness) comes from its quality rater guidelines: it guides evaluation, it is not a ranking rule.",
                "fails": "The page reads as a summary of widely available information, so readers, search engines and AI assistants have little reason to prefer it over other sources.",
                "fix": "<ul><li>Add what only your team knows: cases you handled, tests you ran, figures from your own work, photos.</li><li>Name the author and state their role or qualifications, with a link to an author page.</li><li>Explain the reasons behind your recommendations and the limits or exceptions you have seen in practice.</li><li>Cite your sources and have a subject expert review the page.</li></ul>"
              },
              {
                "id": "test-introduction_engagement",
                "title": "Introduction Engagement",
                "checks": "Flags pages whose opening is slow to present the topic, the reader's need and what the page offers, as judged by an AI model.",
                "why": "Visitors decide quickly whether a page answers their question. A clear opening also gives search engines and AI assistants a direct summary of what the page is about.",
                "fails": "Visitors who do not see quickly that the page matches their need may go back to the search results.",
                "fix": "<ul><li>Open with the topic and the main answer or benefit, then give the details.</li><li>Cut long preambles, company history and general context from the first paragraph.</li><li>Address the reader's situation directly: the problem they have and what they will find on the page.</li></ul>"
              },
              {
                "id": "test-llm_content_depth",
                "title": "LLM Content Depth",
                "checks": "Flags pages whose main text stays generic, as judged by an AI model: few specific facts, figures, examples or insights beyond what most pages on the topic already say.",
                "why": "Google's guidance on helpful content asks whether a page provides original information or analysis, and substantial value compared with other pages in search results. Precise facts are also what AI assistants can quote in an answer.",
                "fails": "A generic page has little to set it apart from competing pages, in search results and as a source for AI answers.",
                "fix": "<ul><li>Add specific data: prices, dimensions, lead times, figures from your own activity, with their date.</li><li>Give worked examples or short case studies instead of general statements.</li><li>Answer the detailed questions your customers ask, not only the basic definition of the topic.</li><li>Remove filler sentences that repeat the title or state the obvious.</li></ul>"
              },
              {
                "id": "test-unique_word_ratio",
                "title": "Unique Word Ratio",
                "checks": "Flags pages whose main text has a low share of distinct words, a sign of heavy repetition; pages with fewer than 50 words are skipped.",
                "why": "Heavy repetition makes a text tedious to read. When it targets a keyword, it can look like keyword stuffing, which Google lists among its spam practices.",
                "fails": "The text reads as repetitive and adds little information per sentence, and repeated keywords may be seen as an attempt to manipulate rankings.",
                "fix": "<ul><li>Use pronouns, synonyms and more precise terms instead of repeating the same keyword.</li><li>Remove blocks repeated on the page, such as the same sentence or specification list shown twice.</li><li>Cover related subtopics with their own vocabulary rather than restating the main point.</li></ul>"
              }
            ]
          },
          {
            "id": "readability",
            "title": "Readability",
            "tests": [
              {
                "id": "test-plain_text_rate",
                "title": "Plain Text Rate (Content Density)",
                "checks": "Flags pages whose readable main text is small compared with the page's HTML markup, not counting scripts, styles and SVG drawings; skipped when no rate can be computed.",
                "why": "A page built mostly of markup with little text gives readers, search engines and AI assistants little to read and understand. Heavy markup also makes the page slower to download and process.",
                "fails": "The page offers few words for its size: search engines and AI assistants have little text to understand the page and quote it.",
                "fix": "<ul><li>Add useful text to the main content: descriptions, answers to common questions, details on the offer.</li><li>Reduce heavy markup: deeply nested wrappers, blocks repeated in the page, hidden duplicate versions of menus or content.</li><li>Check the theme or page builder settings that wrap each element in several layers of <code>&lt;div&gt;</code>.</li></ul>"
              },
              {
                "id": "test-readability_grade_level_flesch",
                "title": "Readability Grade Level (Flesch)",
                "checks": "Checks that the page's main text has a reading ease score of at least 50 (Flesch Reading Ease, or Kandel-Moles on French pages); pages under 100 words are skipped.",
                "why": "The score combines sentence length and word length: below 50 a text is considered difficult to read, below 30 very difficult. Pages in languages other than French are scored with the English formula.",
                "fails": "Readers may struggle with long sentences and complex words, especially on mobile or in a second language, and leave before finding what they need.",
                "fix": "<ul><li>Split long sentences: one idea per sentence.</li><li>Prefer common words, and explain technical terms the first time you use them.</li><li>Break up dense paragraphs and use lists for steps or options.</li><li>Simplify the wording, not the facts: keep the technical information accurate.</li></ul>"
              },
              {
                "id": "test-title_and_h1_alignment",
                "title": "Title and H1 Alignment",
                "checks": "Checks that the title tag and the H1 cover the same topic and intent, as judged by an AI model; different wording is fine.",
                "why": "The title is what people see in search results and the H1 is what they see when they arrive. Google may replace the title in its results with other text from the page, such as a heading, when the title does not describe the page well.",
                "fails": "Visitors may not recognize the page they clicked, and search engines may show a title link different from the one you wrote.",
                "fix": "<ul><li>Build both around the same main topic: the title can be shorter and include your brand, the H1 more descriptive.</li><li>Replace generic H1s such as \"Welcome\" or \"Home\" with the actual subject of the page.</li><li>Check templates that give every page of a section the same H1 or the same title.</li></ul>"
              }
            ]
          },
          {
            "id": "structure",
            "title": "Structure",
            "tests": [
              {
                "id": "test-bgsound_tag",
                "title": "bgsound Tag",
                "checks": "Flags pages that contain a <code>&lt;bgsound&gt;</code> tag, an obsolete element once used by Internet Explorer to play background sound.",
                "why": "The HTML standard lists <code>&lt;bgsound&gt;</code> as obsolete, and current browsers ignore it. It is leftover code that adds weight to the page and does nothing.",
                "fails": "The tag has no effect in current browsers: it is dead code to remove, and any sound it was meant to play is not heard.",
                "fix": "<ul><li>Remove the <code>&lt;bgsound&gt;</code> tag from the page or from the template that adds it.</li><li>If the page needs sound, use an <code>&lt;audio controls&gt;</code> element so visitors choose when to play it.</li></ul>"
              },
              {
                "id": "test-passive_voice_ratio",
                "title": "Passive Voice Ratio",
                "checks": "Flags pages with a high share of sentences in the passive voice, as judged by an AI model.",
                "why": "Active sentences say who does what. They are usually shorter and clearer, which matters most for instructions, commitments and claims about your offer.",
                "fails": "The text feels indirect, and readers may not see who is responsible for an action, such as who ships, pays or decides.",
                "fix": "<ul><li>Put the actor first: \"We ship orders within 48 hours\" rather than \"Orders are shipped within 48 hours\".</li><li>Keep the passive voice where the actor is unknown or does not matter.</li><li>Start with instructions and service descriptions, where knowing who acts matters most.</li></ul>"
              },
              {
                "id": "test-sentence_length_variety",
                "title": "Sentence Length Variety",
                "checks": "Flags pages where almost all sentences fall in the same length band (short, medium or long); pages with fewer than 5 sentences are skipped.",
                "why": "A mix of sentence lengths makes a text easier to follow: short sentences stress key points, longer ones carry detail. A single length throughout reads as monotonous.",
                "fails": "A text made only of long sentences tires the reader, one made only of short sentences reads as choppy, and a uniform rhythm is harder to follow to the end.",
                "fix": "<ul><li>Split the longest sentences and state key points in short ones.</li><li>Join short sentences that belong together into one longer sentence.</li><li>Read the text aloud: where the rhythm feels flat, vary the length.</li></ul>"
              },
              {
                "id": "test-structured_data_density_lists_tables",
                "title": "Structured Data Density (Lists & Tables)",
                "checks": "Checks that the main content of the page contains at least one list (<code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code>) or table (<code>&lt;table&gt;</code>); pages under 100 words are skipped.",
                "why": "Lists and tables make steps, options and comparisons easy to scan, and their structure is explicit in the HTML for crawlers. Despite its name, this test is about HTML lists and tables, not schema.org structured data.",
                "fails": "Steps, specifications and comparisons stay buried in paragraphs: readers scan the page less easily, and search engines and AI assistants find the items harder to pick out.",
                "fix": "<ul><li>Turn steps into an <code>&lt;ol&gt;</code> list and features or options into a <code>&lt;ul&gt;</code> list.</li><li>Present specifications, prices or comparisons in a <code>&lt;table&gt;</code> with header cells (<code>&lt;th&gt;</code>).</li><li>Use real HTML elements, not paragraphs styled to look like a list or an image of a table.</li><li>Add them only where the content lends itself to it: a list for its own sake adds nothing.</li></ul>"
              }
            ]
          }
        ]
      }
    ]
  },
  "roadmap": {
    "title": "Roadmap",
    "breadcrumb": [
      "Docs",
      "Act",
      "Roadmap"
    ],
    "blocks": [
      {
        "id": "feature-roadmap",
        "title": "",
        "html": "<p class=\"lede\">\n          The Roadmap turns your audits into an SEO plan: a list of actions placed week by week within the time you have, each one opening\n          the tool that carries it out. It is the <strong>Roadmap</strong> button at the top of the sidebar.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S32\"><img src=\"/docs/images/s32-seo-plan.webp\" alt=\"The SEO Plan: overview, priorities and timeline.\" width=\"1638\" height=\"1443\" loading=\"lazy\" /><figcaption>The SEO Plan: overview, priorities and timeline.</figcaption></figure>"
      },
      {
        "id": "roadmap-create",
        "title": "Creating a plan",
        "html": "<p>\n          A first plan is created automatically at the end of onboarding. If the Roadmap is empty, click <strong>Create an SEO plan</strong> and fill in the form. Once a plan exists, <strong>Update plan</strong> opens the same form (see below).\n        </p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Website to optimize</span><span class=\"def-desc\">The site the plan works on, or several sites when the project has more than one. A site that was never audited is flagged: the plan would stay generic.</span></li>\n          <li><span class=\"def-term\">AI models to target</span><span class=\"def-desc\">Shown when the project follows several models. Rank the models in the order Poliris should optimize for them, or choose <em>Optimize everything</em> to weigh them equally.</span></li>\n          <li><span class=\"def-term\">Products to optimize</span><span class=\"def-desc\">One or more products whose AI visibility audit is complete, ranked by priority. Drag to reorder, or choose <em>Optimize everything</em>.</span></li>\n          <li><span class=\"def-term\">Prioritize focus topics</span><span class=\"def-desc\">The topics of the selected products, ranked from their AI visibility audit: the largest gaps with competitors come first. Drag to reorder, remove a topic, or choose <em>Optimize everything</em>.</span></li>\n          <li><span class=\"def-term\">Available time per week</span><span class=\"def-desc\">From 1 to 20 hours, 5 by default.</span></li>\n          <li><span class=\"def-term\">Planned duration</span><span class=\"def-desc\">From 2 to 24 weeks. Poliris recommends a duration based on the work found and the time available.</span></li>\n          <li><span class=\"def-term\">Poliris tools in this plan</span><span class=\"def-desc\">Long-term content plan, Content optimization, Technical fixes, Internal linking, Backlinks &amp; outreach. Turn off what you will not use.</span></li>\n          <li><span class=\"def-term\">Include developer tasks in this roadmap?</span><span class=\"def-desc\">Choose <em>No</em> if no developer is available: canonicals, redirects, schema, sitemap or performance work is then left out and the time goes to the rest.</span></li>\n          <li><span class=\"def-term\">Note for Poli</span><span class=\"def-desc\">An optional free note for the plan.</span></li>\n        </ul>\n        <p>\n          Click <strong>Generate roadmap</strong>. Generation takes 30 to 90 seconds and continues if you close the window. If the technical audit of the site is\n          still running, the plan waits for it. The plan is published to the Roadmap as soon as it is ready.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S33\"><img src=\"/docs/images/s33-create-seo-plan.webp\" alt=\"The Create an SEO plan form.\" width=\"756\" height=\"850\" loading=\"lazy\" /><figcaption>The Create an SEO plan form.</figcaption></figure>"
      },
      {
        "id": "roadmap-view",
        "title": "Reading the plan",
        "html": "<ul>\n          <li><strong>Plan settings</strong>: at the top of the page, what the plan covers (websites, AI models, hours per week, developer tasks), next to the <strong>Update plan</strong> button.</li>\n          <li><strong>Your priorities</strong>: for each product and topic, the weeks of the plan that work on it, or <em>Not covered in this roadmap</em>.</li>\n          <li><strong>Timeline</strong>: the actions week by week, within your weekly capacity, with a marker on the current week. Each category has its own row and each action spans its weeks: completed actions are outlined, overdue ones are flagged. <strong>Weekly time allocation</strong>: the hours planned per category and week, compared with your available time.</li>\n        </ul>\n        <p>Click an action to open its details:</p>\n        <ul>\n          <li>why it is in the plan and the audit findings it addresses;</li>\n          <li>the issues it fixes, each marked <strong>One-click</strong> when Poliris can apply the fix through the pixel, or <strong>Guided</strong> when someone has to apply it;</li>\n          <li>the pages affected, the time it takes, who does it and the week;</li>\n          <li><strong>Launch task</strong> (<strong>Implement</strong>, <strong>Open conversation</strong> or <strong>Ask Poli</strong> for some technical actions), <strong>Complete task</strong> once it is in progress, and <strong>Remove from planner</strong>.</li>\n        </ul>\n\n        <h3>Action categories</h3>\n        <table>\n          <thead><tr><th>Category</th><th>What Launch task opens</th></tr></thead>\n          <tbody>\n            <tr><td>Technical fixes</td><td>The Technical Fixes page when Poliris prepares the fix (<strong>Implement</strong>), otherwise a conversation with Poli AI, with the brief of the task</td></tr>\n            <tr><td>Content optimization</td><td>The content optimizer on the page to improve</td></tr>\n            <tr><td>Long-term content plan</td><td>Content Generation with Kate for new articles, or the long-term plan form</td></tr>\n            <tr><td>Backlinks &amp; outreach</td><td>Acquire Citation, filtered on the domain to target</td></tr>\n            <tr><td>Internal linking</td><td>Link builder (beta), or the Site structure view of Page Explorer</td></tr>\n          </tbody>\n        </table>"
      },
      {
        "id": "roadmap-board",
        "title": "Execution board",
        "html": "<p>\n          Switch the timeline view to <strong>Execution board</strong> to see the same actions in three columns: <strong>Backlog</strong>, <strong>In progress</strong> and <strong>Completed</strong>.\n          Launching a task moves it to In progress for the current week. Drag a card back to Backlog to park it until next week, or to Completed when it is done.\n          An action not completed by the end of its week is flagged <em>Overdue</em>.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S34\"><img src=\"/docs/images/s34-execution-board.webp\" alt=\"The Execution board.\" width=\"1237\" height=\"979\" loading=\"lazy\" /><figcaption>The Execution board.</figcaption></figure>"
      },
      {
        "id": "roadmap-update",
        "title": "Updating the plan",
        "html": "<p>\n          After a new audit, click <strong>Update plan</strong>. Poliris recomputes the plan on the latest results: finished work stays finished, actions the audit\n          no longer needs are closed and new findings are added. The form opens with your current settings: change them if needed and click <strong>Generate roadmap</strong>. Poliris then shows a preview of the suggested plan, with resolved and new actions;\n          untick the ones you do not want, then click <strong>Apply validated plan</strong>. The plan is not updated automatically.\n        </p>"
      }
    ]
  },
  "content": {
    "title": "Content",
    "breadcrumb": [
      "Docs",
      "Act",
      "Content"
    ],
    "blocks": [
      {
        "id": "feature-content",
        "title": "",
        "html": "<p class=\"lede\">\n          The Content tools write new articles, improve existing pages and plan series of articles. They use what Poliris knows about your brand,\n          your site and the searches around your products. They are under <strong>ACTION &rsaquo; Content</strong> in the sidebar.\n        </p>"
      },
      {
        "id": "content-generation",
        "title": "Generation",
        "html": "<p>\n          Generation is Kate&rsquo;s content studio. The home screen asks what you want to write about and suggests three article ideas based on the gaps in your project. A button under the ideas suggests others, and your recent articles are listed on the side.\n          A precise subject takes you straight to the configuration; a vague request (&ldquo;suggest content for my brand&rdquo;) first offers a few angles to choose from.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S35\"><img src=\"/docs/images/s35-content-studio.webp\" alt=\"The content studio home.\" width=\"1640\" height=\"746\" loading=\"lazy\" /><figcaption>The content studio home.</figcaption></figure>\n\n        <ol class=\"steps\">\n          <li>\n            <h3>Configuration</h3>\n            <p>\n              Fill in the article title, the audience, the tone, the target keywords (the first one is the primary keyword), the depth (from a short answer\n              of 500 words to a pillar page of more than 2,000) and the article type: Guide, Comparison, How-To, Listicle, Case Study or Explainer.\n              Kate sits in the right panel and can fill any field for you. Title, audience, tone, a primary keyword and at least one secondary keyword are required to continue.\n            </p>\n            <p>\n              The <strong>Grounding Data</strong> field holds the real facts about your business: prices, specifications, certifications, figures.\n              Kate only states facts that are in this field; if it is left empty, the article stays general. <strong>Suggest grounding data with AI</strong>\n              proposes facts from your site for you to check. You can also choose an author, whose name and short bio appear in the article.\n            </p>\n            <p>\n              The <strong>Internal Links</strong> step proposes pages of your site to link to. Select the ones that fit.\n            </p>\n          </li>\n          <li>\n            <h3>Outline</h3>\n            <p>Kate proposes the outline of the article. Edit the headings and their order before writing.</p>\n          </li>\n          <li>\n            <h3>Article</h3>\n            <p>\n              Kate researches the keywords, writes the article and gives it a content score.\n            </p>\n          </li>\n        </ol>\n\n        <h3 id=\"content-score\">The content score</h3>\n        <p>\n          The score, out of 100, rates the keywords, the depth of the topic, the writing, how easily AI assistants can quote the article, and its readability.\n          The article is rated <em>Strong</em>, <em>Fair</em> or <em>Weak</em>. In the Content Optimizer, internal links have their own score, shown separately.\n          <strong>Improve article</strong> reworks the weakest parts to raise the score.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S36\"><img src=\"/docs/images/s36-article-result.webp\" alt=\"A generated article and its content score.\" width=\"1108\" height=\"973\" loading=\"lazy\" /><figcaption>A generated article and its content score.</figcaption></figure>\n\n        <h3>After writing</h3>\n        <ul>\n          <li>Edit the article in place and save. <strong>History</strong> keeps the previous versions and restores any of them.</li>\n          <li><strong>Generate hero image</strong> creates an image for the top of the article.</li>\n          <li>Copy the text, or download it as <strong>HTML</strong> (a complete page with title, meta description, canonical, Open Graph and structured data) or <strong>Markdown</strong>.</li>\n          <li>With WordPress or Webflow connected, send the article to your CMS as a <strong>draft</strong>. Nothing is published without you.</li>\n        </ul>"
      },
      {
        "id": "content-optimization",
        "title": "Optimization",
        "html": "<p>\n          The Content Optimizer scores an existing page against a target keyword. Paste the text, or give a URL and click <strong>Fetch &amp; optimize</strong>.\n          Leave the keyword empty and Poliris detects it. You get the same score as for a new article.\n        </p>\n        <p>\n          <strong>Optimize this content</strong> lets you choose the keywords to work in (yours, those the top pages cover and you do not, what people search for,\n          your products) and the links to add. Poliris then shows the original and the optimized version side by side. <strong>Accept &amp; apply</strong>\n          updates the text in the editor; export it as HTML, Markdown or plain text to publish it.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S37\"><img src=\"/docs/images/s37-content-optimizer.webp\" alt=\"The optimizer compares the original and the optimized text.\" width=\"1634\" height=\"949\" loading=\"lazy\" /><figcaption>The optimizer compares the original and the optimized text.</figcaption></figure>"
      },
      {
        "id": "long-term-plan",
        "title": "Long-term plan",
        "html": "<p>\n          A long-term plan is a series of articles that work toward one goal over several weeks. Click <strong>New plan</strong> and choose:\n        </p>\n        <ul>\n          <li>what the plan promotes: one or more products or categories;</li>\n          <li>what AI assistants should say you are best at: the topics of your AI visibility audit, weakest first, that the articles should prove;</li>\n          <li>the number of articles (4 to 48) and the duration, from 2 to 24 weeks: the publishing pace follows from the two;</li>\n          <li>if you want, what the plan should be about, and the keywords to target, taken from a suggested keyword pool.</li>\n        </ul>\n        <p>\n          Poliris analyzes your brand and existing content, plans standalone articles, each with its own focus and linked to the others, assigns keywords and formats, and schedules them. Nothing is scheduled\n          before you review the series: edit titles and keywords, lock what you like, regenerate the rest, then approve. Approved articles appear\n          on the Roadmap as content actions.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S38\"><img src=\"/docs/images/s38-long-term-plan-review.webp\" alt=\"Reviewing a long-term content plan before approval.\" width=\"803\" height=\"977\" loading=\"lazy\" /><figcaption>Reviewing a long-term content plan before approval.</figcaption></figure>"
      }
    ]
  },
  "implementation": {
    "title": "Implementation",
    "breadcrumb": [
      "Docs",
      "Act",
      "Implementation"
    ],
    "blocks": [
      {
        "id": "feature-implementation",
        "title": "",
        "html": "<p class=\"lede\">\n          Implementation, called <strong>Technical Fixes</strong> on screen, gathers every issue of the technical audit into the acts that fix them,\n          prepares the fix with AI and applies it to your site through the SEO pixel.\n        </p>"
      },
      {
        "id": "feature-implementation-1",
        "title": "How fixes are grouped",
        "html": "<p>\n          Instead of one line per test, issues are grouped by the act that solves them, such as <em>Rewrite the page structure</em> or\n          <em>Rebuild schema.org markup</em>. Foundations come first, because they improve every page at once. Pick the website at the top.\n        </p>\n        <p>\n          Today Poliris can prepare and apply <strong>Rewrite the page structure</strong> (title, meta description, H1), <strong>Rebuild schema.org markup</strong> and\n          <strong>Sync social tags</strong>. Two more acts are prepared in Poliris and finished by your team: <strong>Fix robots.txt</strong> (Poliris rewrites the file, you upload it at the root of the site) and\n          <strong>Asset pipeline</strong> (Poliris applies the missing alt texts and prepares lighter image files for you to upload). The other acts (sitemap, redirects, canonicals, hreflang and others) are\n          marked <em>Coming soon</em>: they show the pages concerned and a brief for your developer.\n        </p>"
      },
      {
        "id": "feature-implementation-2",
        "title": "Applying a fix",
        "html": "<ol>\n          <li>Open an act and pick a page. Filter by what can be applied, what is on hold or already applied, and sort by importance.</li>\n          <li>Read the issue and how to fix it, then click <strong>Generate fix</strong>. Poliris shows the current value and the proposed one, and the health points the page can gain.</li>\n          <li>Edit if needed, or <strong>Regenerate</strong>.</li>\n          <li>Click <strong>Apply changes</strong>. The fix goes live through the SEO pixel the next time the page loads.</li>\n        </ol>\n        <p>\n          Applying requires the <a href=\"#integrations\">SEO pixel</a> on the site. Without it, the button stays disabled and <strong>Install the pixel</strong>\n          opens the installation steps. You can still copy the proposed text or the brief and apply it yourself.\n        </p>"
      },
      {
        "id": "feature-implementation-3",
        "title": "Content issues",
        "html": "<p>\n          Issues about the body of a page (readability, depth, passive voice, structure) are not fixed here but with the\n          <a href=\"#content-optimization\">content optimizer</a>. The Roadmap turns them into content optimization actions.\n        </p>"
      }
    ]
  },
  "citations": {
    "title": "Citations",
    "breadcrumb": [
      "Docs",
      "Act",
      "Citations"
    ],
    "blocks": [
      {
        "id": "feature-citations",
        "title": "",
        "html": "<p class=\"lede\">\n          AI assistants build their answers from a limited set of websites. The Citations pages list those websites for your prompts and tell you\n          what to do with each one. They are fed by the sources of your AI Reputation runs and are found under <strong>ACTION &rsaquo; Citations</strong>.\n        </p>"
      },
      {
        "id": "review-citation",
        "title": "Review Citation",
        "html": "<p>\n          Pages that already talk about your products. Check that they say the right thing and that they link to you. The counters show the pages\n          to review, the pages where you could ask for a link, and the pages already linking to you. For each source you see the product mentioned,\n          the domain rating and the action to take: <strong>Check</strong>, <strong>Ask</strong> or <strong>Follow up</strong>. Open a source to read\n          how it mentions you and in which AI answers it was used.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S50\"><img src=\"/docs/images/s50-review-citation.webp\" alt=\"Review Citation: the pages that already mention your products and the action to take on each.\" width=\"1597\" height=\"1018\" loading=\"lazy\" /><figcaption>Review Citation: the pages that already mention your products and the action to take on each.</figcaption></figure>"
      },
      {
        "id": "acquire-citation",
        "title": "Acquire Citation",
        "html": "<p>\n          Trusted sources that AI assistants quote for your prompts, where your products are still absent. Each row has a way in:\n          a <strong>Purchase</strong> (a sponsored article or listing) or a <strong>Free listing</strong> you can claim.\n        </p>\n        <ul>\n          <li>The counters show the number of ways in, the total cost to take them all and the best value.</li>\n          <li>Filter by type, status, product and category, set a budget per placement and sort by best value or cheapest first.</li>\n          <li><strong>Purchase</strong> opens the offers found on link marketplaces for that domain, with the best price. You buy directly on the marketplace.</li>\n          <li><strong>Claim it</strong> prepares an outreach email.</li>\n        </ul>\n        <p>Each paid source shows an <strong>opportunity score</strong> out of 100, based on its authority, its cost, its reach across your products and its type of site. A higher score is a better opportunity.</p>\n\n        <figure class=\"docs-figure\" data-shot=\"S40\"><img src=\"/docs/images/s40-acquire-citation.webp\" alt=\"Acquire Citation: sources to get cited on, with their cost and score.\" width=\"1640\" height=\"789\" loading=\"lazy\" /><figcaption>Acquire Citation: sources to get cited on, with their cost and score.</figcaption></figure>"
      },
      {
        "id": "other-citation",
        "title": "Other Citation",
        "html": "<p>\n          Sources that need no action: your own profiles, or sites out of reach. They are kept so that your coverage figures stay complete.\n        </p>"
      },
      {
        "id": "outreach",
        "title": "Outreach emails",
        "html": "<p>\n          From Review Citation (<strong>Check</strong>, <strong>Ask</strong>, <strong>Follow up</strong>) and Acquire Citation (<strong>Claim it</strong>), the action button opens <strong>Prepare outreach</strong>, which drafts an email to the site: ask for a link, correct a fact, or claim a listing.\n          The draft includes your brand, the sentence that mentions you and the competitors cited. Poliris fills in the contact email when it finds one.\n          <strong>Send &amp; track</strong> opens the email in your own mail client: Poliris does not send it and does not follow up automatically yet.\n        </p>"
      },
      {
        "id": "feature-recommendations-1",
        "title": "Putting it all together",
        "html": "<p class=\"lede\">\n          The AI Reputation audit and the technical audit answer different questions, and each one helps you read the other.\n          This section suggests a simple routine.\n        </p>\n\n        <div class=\"action-grid action-grid-2\">\n          <div class=\"action-card\">\n            <span class=\"action-label\">Technical &rarr; AI</span>\n            <h5>What you fix changes what AI can say</h5>\n            <p>An assistant can only quote pages it can reach and read. Blocked crawlers, missing titles or thin pages limit how often you can be cited.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">AI &rarr; Technical</span>\n            <h5>What AI says tells you where to start</h5>\n            <p>A weak topic or a missing source points to the pages and content to work on first.</p>\n          </div>\n        </div>\n\n        <h3>A weekly routine</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Check the scores</h5>\n            <p>Open the AI Reputation Overview and the health score of your site. Note what moved since last week.</p>\n          </li>\n          <li>\n            <h5>Work from the Roadmap</h5>\n            <p>Open the Execution board, launch the tasks of the week and click <strong>Complete task</strong> on the finished ones.</p>\n          </li>\n          <li>\n            <h5>Look at the evidence</h5>\n            <p>When a score drops, open Prompt Explorer or Cited Prompts for the answers, and the Issues tab for the pages concerned.</p>\n          </li>\n          <li>\n            <h5>Measure again</h5>\n            <p>Re-run the analysis (or let the schedule do it), re-crawl the site after technical changes, then click <strong>Update plan</strong>.</p>\n          </li>\n        </ol>\n\n        <h3>Common situations</h3>\n        <div class=\"action-grid action-grid-2\">\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Low visibility, healthy site</h5>\n            <p>The site works but assistants do not know enough about you. Write content on the weak topics and get cited on the sources they use.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>High visibility, weak sentiment</h5>\n            <p>You are mentioned but not described well. Read the negative answers in Cited Prompts and correct the facts on the pages they cite.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Good visibility, many technical issues</h5>\n            <p>Fix the critical issues now: a blocked or slow page is less likely to be read and cited.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Low everywhere</h5>\n            <p>Start with Page Access (what blocks crawlers), then work on one weak topic at a time.</p>\n          </div>\n        </div>"
      }
    ]
  },
  "poli-ai": {
    "title": "Poli AI",
    "breadcrumb": [
      "Docs",
      "Poli AI"
    ],
    "blocks": [
      {
        "id": "feature-poliagent",
        "title": "",
        "html": "<p class=\"lede\">\n          Poli AI is the assistant built into Poliris. Ask it about your audits in plain language: it answers from your project data,\n          draws charts, prepares fixes and updates your roadmap when you ask.\n        </p>"
      },
      {
        "id": "feature-poliagent-1",
        "title": "Where to find it",
        "html": "<ul>\n          <li><strong>Full page</strong>: the <strong>Dashboard | Poli AI</strong> switch at the top of the sidebar opens Poli AI with your conversation history. Switch back to return to the page you were on.</li>\n          <li><strong>Chat bar</strong>: the bar at the bottom right of every page opens a smaller chat panel over the page you are reading.</li>\n          <li><strong>Ask about a card</strong>: with the chat panel open, click a card of the AI Reputation dashboards and Poli AI explains it.</li>\n          <li><strong>From the Roadmap</strong>: technical tasks and <em>Discuss with</em> buttons open a conversation with the brief of the action.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S41\"><img src=\"/docs/images/s41-poli-ai.webp\" alt=\"Poli AI as a full page.\" width=\"1651\" height=\"948\" loading=\"lazy\" /><figcaption>Poli AI as a full page.</figcaption></figure>"
      },
      {
        "id": "feature-poliagent-2",
        "title": "The team",
        "html": "<p>\n          Poli AI answers through specialized personas. Leo routes each question to the right one; type <code>@</code> and a name, for example\n          <code>@nora</code>, to ask a persona directly.\n        </p>\n        <table>\n          <thead><tr><th>Persona</th><th>Role</th><th>Ask about</th></tr></thead>\n          <tbody>\n            <tr><td>Leo</td><td>Lead Agent</td><td>General questions, summaries, what to do next.</td></tr>\n            <tr><td>Nora</td><td>GEO Analyst</td><td>Visibility and sentiment in AI assistants, competitors, sources.</td></tr>\n            <tr><td>Tom</td><td>Technical SEO</td><td>The technical audit, crawlability, speed, structured data.</td></tr>\n            <tr><td>Kate</td><td>Content &amp; Reputation Strategist</td><td>Content angles, existing pages, how you are described.</td></tr>\n            <tr><td>Ivy</td><td>Trend Strategist</td><td>Emerging questions and how the conversation in your market is changing.</td></tr>\n          </tbody>\n        </table>\n        <p>A paid media persona, Ryan, is planned and not available yet.</p>"
      },
      {
        "id": "feature-poliagent-3",
        "title": "Speed",
        "html": "<p>\n          The selector in the message box chooses which model answers: <strong>Auto</strong> (default, chosen per message), <strong>Fast</strong> for quick\n          lookups, <strong>Balanced</strong> for questions that cross several sources, <strong>Deep</strong> for plans and analyses. The default answer language of the\n          project is set in <strong>Project Settings &rsaquo; AI Agent</strong>.\n        </p>"
      },
      {
        "id": "feature-poliagent-4",
        "title": "What Poli AI knows",
        "html": "<ul>\n          <li>Your AI Reputation results: visibility, sentiment per topic and per competitor, cited sources.</li>\n          <li>Your technical audit: scores, failing tests, recommendations.</li>\n          <li>The content of your crawled pages: what each page is about, pages that overlap, topics without a page.</li>\n          <li>Your brand structure: products, topics, trading zones.</li>\n          <li>The web, through a search tool and by reading public pages you mention (without logging in or running JavaScript).</li>\n        </ul>"
      },
      {
        "id": "feature-poliagent-5",
        "title": "What it can do",
        "html": "<ul>\n          <li>Answer with text, charts and up to three follow-up buttons.</li>\n          <li>Produce a PDF report or an Excel export of your data.</li>\n          <li>Propose a fix as a card. <strong>Deploy</strong> applies it through the SEO pixel and <strong>Roll back</strong> removes it. With WordPress connected, the fix is written in WordPress.</li>\n          <li>Create a WordPress draft article, and hand you over to Kate&rsquo;s content studio for full articles.</li>\n          <li>Add, move, remove or complete actions on your Roadmap, after asking for confirmation.</li>\n          <li>Read files you attach: up to 5 per message, 20 MB each (PDF, images, text, CSV, Markdown). You can also dictate a message.</li>\n        </ul>\n        <p>Nothing changes on your site without your click, nor on your roadmap without your confirmation.</p>"
      },
      {
        "id": "feature-poliagent-6",
        "title": "Conversations and memory",
        "html": "<ul>\n          <li>Conversations are listed by date in the Poli AI sidebar and can be searched, renamed, exported (HTML, PDF or Markdown) or deleted.</li>\n          <li>Edit any of your messages: the answer is generated again from that point.</li>\n          <li>Tell Poli AI to remember something (&ldquo;remember that our blog is at /journal&rdquo;): it keeps preferences, decisions and facts per project.\n            The saved memories are listed in <strong>Project Settings &rsaquo; AI Agent</strong>, where you can delete them.</li>\n          <li>The answer language follows your messages; set a default language in the same settings.</li>\n        </ul>"
      },
      {
        "id": "feature-poliagent-7",
        "title": "What it does not do",
        "html": "<ul>\n          <li>Launch or re-run an audit. Start audits from the dashboards.</li>\n          <li>Change robots.txt, the sitemap, redirects or server settings.</li>\n          <li>Work across projects: a conversation belongs to one project.</li>\n          <li>Invent figures. When a number is not in your data, Poli AI says so. Check important figures anyway: like any AI model, it can be wrong.</li>\n        </ul>\n        <p>Conversations with Poli AI do not use credits.</p>"
      }
    ]
  },
  "site-connection": {
    "title": "Site connection",
    "breadcrumb": [
      "Docs",
      "Connections",
      "Site connection"
    ],
    "blocks": [
      {
        "id": "integrations",
        "title": "",
        "html": "<p class=\"lede\">\n          Poliris reads your site without any setup. To change it, for example to apply a fix or to send an article draft, it needs a connection.\n          You choose one per website.\n        </p>"
      },
      {
        "id": "integrations-choose",
        "title": "Three ways to connect",
        "html": "<table>\n          <thead><tr><th>Connection</th><th>Works on</th><th>How fixes are applied</th><th>Article drafts</th></tr></thead>\n          <tbody>\n            <tr><td>SEO Pixel</td><td>Any website</td><td>A script pasted once in the <code>&lt;head&gt;</code> of your pages. Fixes are applied when a visitor, or a crawler that runs JavaScript, loads the page.</td><td>No</td></tr>\n            <tr><td>WordPress plugin</td><td>WordPress sites</td><td>Written on the server, in the post and in the fields of your SEO plugin. Search engines and AI crawlers see the change on the first fetch.</td><td>Yes, as WordPress drafts</td></tr>\n            <tr><td>Webflow</td><td>Webflow sites</td><td>Through the Webflow API, in the SEO and Open Graph settings of the page.</td><td>Yes, as draft items in a CMS collection</td></tr>\n          </tbody>\n        </table>"
      },
      {
        "id": "integrations-where",
        "title": "Where to connect a site",
        "html": "<p>\n          Go to <strong>Project Settings &rsaquo; Connector</strong>, which lists your websites with their connection status, or click <strong>Connect</strong>\n          on the site card in <em>My site &amp; socials</em>. The <strong>Site connection</strong> window lets you choose between SEO Pixel, WordPress plugin\n          and Webflow; Poliris detects what your site runs and marks the matching option <em>Recommended</em>. Each option takes three steps, and the\n          screen updates by itself when the connection is detected. <strong>Check now</strong> forces a new check.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S42\"><img src=\"/docs/images/s42-connect-chooser.webp\" alt=\"Choosing how Poliris connects to your site.\" width=\"540\" height=\"358\" loading=\"lazy\" /><figcaption>Choosing how Poliris connects to your site.</figcaption></figure>"
      },
      {
        "id": "integration-pixel",
        "title": "SEO Pixel",
        "html": "<ol>\n          <li><strong>Enable</strong> the pixel for the site.</li>\n          <li><strong>Install the snippet</strong>: paste the script Poliris gives you in the <code>&lt;head&gt;</code> of every page. If someone else manages the site,\n            <strong>Email my developer</strong> sends them the instructions, and <strong>Copy AI prompt</strong> copies instructions for a coding assistant.</li>\n          <li><strong>Verify</strong>: once the script has loaded on your site, the status changes to <em>Pixel installed</em>, with the last time it was seen.</li>\n        </ol>\n        <p>When WordPress or Webflow is also connected, some fixes are written in the site itself instead of going through the pixel:</p>\n        <table>\n          <thead><tr><th>Action</th><th>Pixel only</th><th>WordPress connected</th><th>Webflow connected</th></tr></thead>\n          <tbody>\n            <tr><td>Apply a fix from Technical Fixes</td><td>Pixel</td><td>SEO title, meta description and image alt text: written in WordPress. Other fixes: pixel.</td><td>SEO title, meta description, Open Graph title and description, image alt text: written in Webflow, live once you publish the site. Other fixes: pixel.</td></tr>\n            <tr><td>Deploy a fix from Poli AI</td><td>Pixel</td><td>Same as Technical Fixes</td><td>Pixel</td></tr>\n            <tr><td>Article drafts</td><td>Not available</td><td>WordPress drafts</td><td>Draft items in a CMS collection</td></tr>\n          </tbody>\n        </table>\n\n        <figure class=\"docs-figure\" data-shot=\"S52\"><img src=\"/docs/images/s52-seo-pixel-enable.webp\" alt=\"Step 1: enable the SEO Pixel for the site.\" width=\"535\" height=\"348\" loading=\"lazy\" /><figcaption>Step 1: enable the SEO Pixel for the site.</figcaption></figure>\n\n        <figure class=\"docs-figure\" data-shot=\"S48\"><img src=\"/docs/images/s48-seo-pixel-install.webp\" alt=\"Installing the SEO Pixel: copy the snippet into your pages, then verify.\" width=\"533\" height=\"453\" loading=\"lazy\" /><figcaption>Installing the SEO Pixel: copy the snippet into your pages, then verify.</figcaption></figure>"
      },
      {
        "id": "integration-wordpress",
        "title": "WordPress",
        "html": "<p>\n          The Poliris plugin writes fixes directly in your WordPress site, in the post and in the fields of your SEO plugin, so your team still sees one\n          version in wp-admin. You need an administrator account and the right to install plugins.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Install the plugin</h3>\n            <p>In wp-admin, go to <strong>Plugins &rsaquo; Add New</strong>, search for &ldquo;Poliris&rdquo;, install and activate it. The wizard also links to the plugin on wordpress.org.</p>\n          </li>\n          <li>\n            <h3>Pair with a code</h3>\n            <p>In Poliris, click <strong>Get my pairing code</strong>. The code is valid for 15 minutes. In wp-admin, open <strong>Poliris</strong> in the left menu, paste the code and click <strong>Connect to Poliris</strong>.</p>\n          </li>\n          <li>\n            <h3>Check the connection</h3>\n            <p>The Poliris screen switches to <em>WordPress connected</em> on its own and shows the SEO plugin it found.</p>\n          </li>\n        </ol>\n        <p>Once connected, Poliris can change a post title, the SEO title and meta description in your SEO plugin, the content of a post for approved rewrites and image alt texts, and create draft posts. Nothing is written until you apply a change.</p>\n        <table>\n          <thead><tr><th>Status</th><th>What it means</th></tr></thead>\n          <tbody>\n            <tr><td>Waiting for the plugin</td><td>The code has not been entered in wp-admin yet. Generate a new code if 15 minutes have passed.</td></tr>\n            <tr><td>Connection error</td><td>Poliris reached the site but the plugin did not answer correctly: the plugin is deactivated, its application password was revoked, or a firewall blocks the WordPress REST API. Connect again from step 1.</td></tr>\n            <tr><td>Not connected</td><td>No plugin connection on this site. Fixes go through the pixel.</td></tr>\n          </tbody>\n        </table>\n        <p>\n          To disconnect, click <strong>Disconnect</strong> in Project Settings &rsaquo; Connector. To remove all access, also revoke the\n          <em>Poliris Connector</em> application password in your WordPress profile.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S43\"><img src=\"/docs/images/s43-wordpress-pairing.webp\" alt=\"Connecting WordPress: install the plugin, pair with a one-time code, verify.\" width=\"540\" height=\"440\" loading=\"lazy\" /><figcaption>Connecting WordPress: install the plugin, pair with a one-time code, verify.</figcaption></figure>"
      },
      {
        "id": "integration-webflow",
        "title": "Webflow",
        "html": "<p>\n          With a Webflow Site Token, Poliris writes SEO fixes in your page settings through the Webflow API and creates article drafts in the CMS collection you choose.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Create a Site Token</h3>\n            <p>In Webflow, open your site settings, <strong>Apps &amp; Integrations</strong>, and generate an API token with read and write access to <strong>Pages</strong>, <strong>CMS</strong> and <strong>Assets</strong>.</p>\n          </li>\n          <li>\n            <h3>Paste and validate</h3>\n            <p>In Poliris, click <strong>I have my token</strong>, paste it and validate. The token is stored encrypted and never shown again.</p>\n          </li>\n          <li>\n            <h3>Choose the drafts collection</h3>\n            <p>Pick the CMS collection where article drafts go, usually your blog. You can change it later in Project Settings &rsaquo; Connector.</p>\n          </li>\n        </ol>\n        <figure class=\"docs-figure\" data-shot=\"S49\"><img src=\"/docs/images/s49-webflow-connection.webp\" alt=\"Connecting Webflow: create a Site Token, connect, then choose the drafts collection.\" width=\"540\" height=\"410\" loading=\"lazy\" /><figcaption>Connecting Webflow: create a Site Token, connect, then choose the drafts collection.</figcaption></figure>\n        <p>\n          Once connected, Poliris can set the SEO title and meta description of a page, the Open Graph title and description, image alt texts, and create\n          draft items. Changes go live when you publish the site in Webflow. To disconnect, click <strong>Disconnect</strong> and revoke the token in Webflow.\n        </p>"
      },
      {
        "id": "integration-gsc-1",
        "title": "Google Search Console and Google Analytics",
        "html": "<p class=\"lede\">\n          Connecting Search Console and Google Analytics adds real traffic data to the technical audit: the searches that bring visitors,\n          clicks and impressions per page, devices, countries and where visits come from. Both connections are read-only.\n        </p>\n\n        <h3>Where to connect</h3>\n        <p>\n          Use the <strong>GSC</strong> and <strong>GA4</strong> chips at the top right of Site Overview, Page Explorer and the page report, or the chips\n          on the site card in <em>My site &amp; socials</em>. A green dot means connected, a red dot not connected. Each website is connected separately,\n          with the Google account that manages it.\n        </p>\n\n        <h3 id=\"integration-gsc-setup\">Connect Search Console</h3>\n        <ol>\n          <li>Click <strong>GSC</strong>. The <em>Manage Search Console</em> window opens.</li>\n          <li>In <strong>GSC property</strong>, enter your property as Search Console names it: <code>sc-domain:example.com</code> for a domain property, or\n            <code>https://example.com/</code> for a URL-prefix property. The exact value is at the end of the Search Console address bar, after <code>resource_id=</code>.\n            If it is left empty, Poliris uses the site URL.</li>\n          <li>Click <strong>Connect Search Console</strong>. Google asks, in a popup, for one read-only permission.</li>\n          <li>Once you accept, the property is saved and the chip turns green. Poliris then fetches your data without crawling the site again.</li>\n        </ol>\n\n        <figure class=\"docs-figure\" data-shot=\"S44\"><img src=\"/docs/images/s44-search-console.webp\" alt=\"The Manage Search Console window: enter your GSC property, then connect.\" width=\"545\" height=\"775\" loading=\"lazy\" /><figcaption>The Manage Search Console window: enter your GSC property, then connect.</figcaption></figure>\n\n        <h3 id=\"integration-ga4\">Connect Google Analytics</h3>\n        <ol>\n          <li>Click <strong>GA4</strong>. The <em>Manage Google Analytics</em> window opens.</li>\n          <li>In <strong>GA4 property ID</strong>, enter the numeric ID of your property. You can find it in Google Analytics under\n            <strong>Admin &rsaquo; Property &rsaquo; Property details</strong>, for example <code>123456789</code>. A measurement ID starting with\n            <code>G-</code> is not accepted.</li>\n          <li>Click <strong>Connect Google Analytics</strong> and accept the read-only permission.</li>\n        </ol>\n\n        <figure class=\"docs-figure\" data-shot=\"S51\"><img src=\"/docs/images/s51-google-analytics.webp\" alt=\"The Manage Google Analytics window: enter your GA4 property ID, then connect.\" width=\"534\" height=\"721\" loading=\"lazy\" /><figcaption>The Manage Google Analytics window: enter your GA4 property ID, then connect.</figcaption></figure>\n        <p>\n          You need access to the property with the Google account you use: at least Viewer in Google Analytics, and the property must be verified in Search Console.\n          If a popup does not open, allow popups for Poliris and try again.\n        </p>\n\n        <h3>What appears once connected</h3>\n        <ul>\n          <li><strong>Site Overview</strong>: total visitors from search with the split by device, visitors by country, and traffic sources (Search, Direct, Social, Paid, GEO).</li>\n          <li><strong>Page report</strong>: clicks and impressions over time, the top search queries of the page with the share of branded searches, and engagement (time, bounce, scroll, active users).</li>\n        </ul>\n\n        <h3>Changing or removing a connection</h3>\n        <p>\n          Open the chip again: the window shows the Google account in use. <strong>Use a different Google account</strong> switches the account used for this website.\n          <strong>Disconnect</strong> removes the connection of that service only; the other one is not affected. The connection belongs to the website:\n          when a teammate has connected it, the chip is green for everyone.\n        </p>"
      },
      {
        "id": "integration-mcp-1",
        "title": "MCP connector",
        "html": "<p class=\"lede\">\n          The MCP connector gives AI assistants such as Claude, ChatGPT or Cursor read-only access to your Poliris data, so you can ask them\n          about your audits from your own tools.\n        </p>\n\n        <h3>Connect an assistant</h3>\n        <p>\n          Open <strong>My Account &rsaquo; MCP</strong>. The tab shows the <strong>Server URL</strong> and the setup for each kind of client:\n        </p>\n        <ul>\n          <li><strong>Claude Code</strong>: a command to paste in your terminal.</li>\n          <li><strong>claude.ai and ChatGPT</strong>: add a custom connector with the server URL.</li>\n          <li><strong>Cursor and desktop apps</strong>: a configuration snippet with the server URL.</li>\n        </ul>\n        <p>\n          The first time the assistant connects, you sign in to Poliris and approve the access. There is nothing to copy.\n        </p>\n\n        <h3>Access tokens</h3>\n        <p>\n          For scripts and automations, create an <strong>access token</strong> in the same tab. The token is shown only once: copy it before leaving the page.\n          The list shows when each token was created and last used; <strong>Revoke</strong> disables it within about 30 seconds.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S45\"><img src=\"/docs/images/s45-mcp-tab.webp\" alt=\"The MCP tab in My Account.\" width=\"817\" height=\"529\" loading=\"lazy\" /><figcaption>The MCP tab in My Account.</figcaption></figure>\n\n        <h3>What the assistant can read</h3>\n        <table>\n          <thead><tr><th>Tool</th><th>What it returns</th></tr></thead>\n          <tbody>\n            <tr><td><code>list_projects</code></td><td>Your projects and their identifiers.</td></tr>\n            <tr><td><code>get_client_context</code></td><td>The brand of a project: name, domain, industry, tone, language.</td></tr>\n            <tr><td><code>get_geo_visibility</code></td><td>Visibility scores per topic and per model, with trends.</td></tr>\n            <tr><td><code>get_geo_competitors</code></td><td>Competitor visibility on the same topics.</td></tr>\n            <tr><td><code>get_geo_cited_prompts</code></td><td>The prompts whose answers mention the brand, per product.</td></tr>\n            <tr><td><code>get_radar_sentiment</code></td><td>How AI models describe the brand across topics.</td></tr>\n            <tr><td><code>get_sentiment_competitors</code></td><td>Sentiment of the brand compared with competitors.</td></tr>\n            <tr><td><code>get_technical_audit_summary</code></td><td>The latest technical audit: score, failing tests, main issues.</td></tr>\n            <tr><td><code>get_pagespeed_scores</code></td><td>Speed and Core Web Vitals.</td></tr>\n            <tr><td><code>get_content_analysis_scores</code></td><td>Content quality scores per page.</td></tr>\n          </tbody>\n        </table>\n        <ul>\n          <li>Access is read-only: the assistant cannot change anything in Poliris.</li>\n          <li>Only the projects you created are available, not the projects shared with you in a workspace.</li>\n          <li>Your account is limited to 60 requests per minute, across all your tokens and connected assistants.</li>\n        </ul>"
      }
    ]
  },
  "settings": {
    "title": "Settings",
    "breadcrumb": [
      "Docs",
      "Settings",
      "My Account"
    ],
    "blocks": [
      {
        "id": "settings-account",
        "title": "",
        "html": "<p class=\"lede\">\n          Settings are on three levels: <strong>My Account</strong> for you, <strong>Workspace settings</strong> for your team and your plan,\n          and <strong>Project Settings</strong> for one brand. My Account and Workspace settings are in the menu under your avatar at the bottom of\n          the sidebar; Project Settings is the gear icon next to the project selector.\n        </p>"
      },
      {
        "id": "settings-account-1",
        "title": "My Account",
        "html": "<ul class=\"def-rows\">\n          <li><span class=\"def-term\">Profile</span><span class=\"def-desc\">Your photo, first and last name, username and password. Your email address cannot be changed.\n            The <strong>Language</strong> field switches the interface between English and French.</span></li>\n          <li><span class=\"def-term\">Workspaces</span><span class=\"def-desc\">The workspaces you belong to, with your role in each. <strong>New workspace</strong> creates one; you become its Owner and it starts on the Free plan.</span></li>\n          <li><span class=\"def-term\">MCP</span><span class=\"def-desc\">Connect AI assistants to your Poliris data and manage access tokens. See <a href=\"#integration-mcp-1\">MCP connector</a>.</span></li>\n        </ul>\n        <p>To delete your account, write to <a href=\"mailto:contact@poliris.io\">contact@poliris.io</a>.</p>"
      },
      {
        "id": "settings-workspace-1",
        "title": "Workspace settings",
        "html": "<p class=\"lede\">\n          A workspace is your team: its members, its projects, its plan and its credits. The settings have five tabs.\n        </p>\n\n        <h3>General</h3>\n        <p>\n          The name, logo and description of the workspace. The Owner can delete the workspace from the Danger Zone, which deletes its projects,\n          audit data and member access.\n        </p>\n\n        <h3 id=\"settings-members\">Members and roles</h3>\n        <p>\n          <strong>Invite Member</strong> sends an invitation by email with a role. For the Member and Viewer roles, you also choose which projects they can open.\n          A pending invitation can be resent or canceled. The person accepts it from the link in the email, signed in with the invited address.\n        </p>\n        <table>\n          <thead><tr><th>Role</th><th>Projects</th><th>What they can do</th></tr></thead>\n          <tbody>\n            <tr><td>Owner</td><td>All</td><td>Everything, including the plan, payment methods and deleting the workspace. The creator of the workspace is its only Owner.</td></tr>\n            <tr><td>Admin</td><td>All</td><td>Invite members and change their role, manage project access, add projects, change project settings.</td></tr>\n            <tr><td>Member</td><td>Those assigned</td><td>Work in the projects: run audits, use the tools, edit prompts.</td></tr>\n            <tr><td>Viewer</td><td>Those assigned</td><td>Open the assigned projects.</td></tr>\n          </tbody>\n        </table>\n\n        <figure class=\"docs-figure\" data-shot=\"S46\"><img src=\"/docs/images/s46-members.webp\" alt=\"Members of a workspace and their roles.\" width=\"1324\" height=\"616\" loading=\"lazy\" /><figcaption>Members of a workspace and their roles.</figcaption></figure>\n\n        <h3>Projects</h3>\n        <p>\n          The projects of the workspace with their website, last audit, creator and members. <strong>Manage Access</strong> chooses which Members and\n          Viewers can open each project. <strong>Add Project</strong> creates a project from a website URL.\n        </p>\n\n        <h3>Usage</h3>\n        <p>\n          The credits of the current billing period: total, used and left, the split by type of action (GEO Audit, Technical Audit, Content Generation and others), the number of audits, and the credits used by each project.\n        </p>\n\n        <h3 id=\"settings-billing\">Billing</h3>\n        <p>\n          The current plan, its monthly credits, what is used and left, and the next billing date. Only the Owner can change the plan or the payment method.\n        </p>\n        <ul>\n          <li><strong>Manage Plan</strong> shows the plans. An upgrade applies at once, with a prorated charge, and the larger pool is available immediately.\n            A downgrade applies at the end of the current period; until then a banner reminds you of the change and <strong>Keep current plan</strong> cancels it.</li>\n          <li><strong>Manage Billing</strong> opens the Stripe customer portal, where you update your card or cancel the subscription. A canceled workspace goes back to the Free plan.</li>\n          <li>The invoice history links to each invoice as a PDF.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S47\"><img src=\"/docs/images/s47-billing.webp\" alt=\"The Billing tab.\" width=\"1640\" height=\"990\" loading=\"lazy\" /><figcaption>The Billing tab.</figcaption></figure>"
      },
      {
        "id": "settings-project-1",
        "title": "Project Settings",
        "html": "<p class=\"lede\">\n          The settings of one project. Owners and Admins can change them; every member with access to the project can edit its prompts.\n        </p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Configuration</span><span class=\"def-desc\">Project name, description and color. The main website URL cannot be changed. The Danger Zone deletes the project.</span></li>\n          <li><span class=\"def-term\">Setup</span><span class=\"def-desc\">For each product, how it is audited in each trade area: prompts, LLM models, visibility topics, schedule and last run. The models and topics you choose apply to every trade area of the product, and changes apply from the next run.</span></li>\n          <li><span class=\"def-term\">Prompts</span><span class=\"def-desc\">The questions of each product, trade area by trade area: edit the wording and topics, turn a question on or off, delete it. Active questions are asked at each run. <strong>Add a prompt</strong> adds your own question, and a deleted question can be restored.</span></li>\n          <li><span class=\"def-term\">Trade Areas</span><span class=\"def-desc\">The trading zones of each product. Removing a zone keeps its audit history.</span></li>\n          <li><span class=\"def-term\">Visibility Topics</span><span class=\"def-desc\">The topics followed for each product, chosen from the list.</span></li>\n          <li><span class=\"def-term\">Scheduling</span><span class=\"def-desc\">Automatic runs of the AI visibility analysis per product: daily, weekly or monthly, with the time, day, time zone and trading zone. The table shows the next run and the recent runs with their credits. A scheduled run is skipped, without any notification, when the workspace has fewer than 100 credits.</span></li>\n          <li><span class=\"def-term\">Technical Audit</span><span class=\"def-desc\">The default maximum number of pages for the site. The number chosen in the run window takes precedence.</span></li>\n          <li><span class=\"def-term\">AI Agent</span><span class=\"def-desc\">The default language of Poli AI, the conversation log and the memory of Poli AI for the project.</span></li>\n          <li><span class=\"def-term\">Connector</span><span class=\"def-desc\">How Poliris connects to each website: SEO pixel, WordPress or Webflow. See <a href=\"#integrations\">Site connection</a>.</span></li>\n        </ul>"
      }
    ]
  },
  "glossary": {
    "title": "Glossary",
    "breadcrumb": [
      "Docs",
      "Reference",
      "Glossary"
    ],
    "blocks": [
      {
        "id": "glossary",
        "title": "",
        "html": "<p class=\"lede\">\n          The words used in Poliris, then a broader glossary of GEO and AI terms used across the industry.\n        </p>"
      },
      {
        "id": "glossary-1",
        "title": "Poliris terms",
        "html": "<dl class=\"kv\">\n          <dt>AI Reputation</dt>\n          <dd>The audit of what AI assistants say about your products: visibility, ranking and sentiment.</dd>\n\n          <dt>Analysis run</dt>\n          <dd>One execution of an AI visibility audit: every selected prompt sent to every selected model, for one product in one trading zone.</dd>\n\n          <dt>Brand structure</dt>\n          <dd>The brands, categories and products of a project, shown on the AI Reputation Overview.</dd>\n\n          <dt>Credits</dt>\n          <dd>The unit used to pay for audits and AI tools. The pool belongs to the workspace and is refilled every month.</dd>\n\n          <dt>Execution board</dt>\n          <dd>The view of the Roadmap in three columns: Backlog, In progress and Completed.</dd>\n\n          <dt>Free Models</dt>\n          <dd>The public web interfaces of AI assistants (ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode, Google AI Overview). Free during onboarding, about one credit per question afterwards.</dd>\n\n          <dt>Health score</dt>\n          <dd>The overall score of a site or a page in the technical audit, across the Page Access, Content Access and Content Quality stages.</dd>\n\n          <dt>Page importance</dt>\n          <dd>A score from 0 to 100 that shows how much a page matters within your site. The home page is 100.</dd>\n\n          <dt>Poli AI</dt>\n          <dd>The assistant built into Poliris. It answers questions about your data, prepares fixes and edits the Roadmap when you ask.</dd>\n\n          <dt>Product</dt>\n          <dd>An offer as a buyer would ask an AI assistant about it. AI visibility is measured per product.</dd>\n\n          <dt>Project</dt>\n          <dd>One brand and its website, with its audits, roadmap and content.</dd>\n\n          <dt>Prompt</dt>\n          <dd>A question sent to the AI models, written the way a customer would ask it, without your brand name.</dd>\n\n          <dt>SEO Pixel</dt>\n          <dd>A script added to the pages of your site that lets Poliris apply fixes such as titles or structured data.</dd>\n\n          <dt>SEO Plan</dt>\n          <dd>The plan shown on the Roadmap: actions placed week by week within the time you have.</dd>\n\n          <dt>Topic</dt>\n          <dd>A theme your brand is measured on, such as quality or value for money. Each product follows three to five topics.</dd>\n\n          <dt>Trading zone (Trade Area)</dt>\n          <dd>The country or region where visibility is measured. Each product is audited per zone.</dd>\n\n          <dt>Visibility score</dt>\n          <dd>How often the AI models mention your brand in their answers, from 0 to 100.</dd>\n\n          <dt>Workspace</dt>\n          <dd>Your team: its members, projects, plan and credits.</dd>\n        </dl>"
      },
      {
        "id": "glossary-2",
        "title": "GEO & AI Glossary",
        "html": "<p>\n          A broader glossary of Generative Engine Optimization and AI terminology used across the industry. Useful when\n          you&rsquo;re reading reports, talking to partners, or comparing Poliris output to other tools.\n        </p>\n\n        <dl class=\"kv\">\n          <dt>AI Answer Box / AI Summary / AI Snapshot</dt>\n          <dd>AI-generated boxes on results pages that provide a summary or direct answer to a query. They often combine information from multiple sources, similar to AI Overviews, and also include links to reference content. <em>See also: AI Overview, Answer Engine, Enriched Results.</em></dd>\n\n          <dt>AI Overview</dt>\n          <dd>AI-generated summaries displayed on Google results pages, combining information from multiple sources. They provide a quick overview of a topic, with links to relevant content, often in a prominent area at the top of the SERP. AI Overviews extend the Search Generative Experience and rely on Google&rsquo;s advanced models. <em>See also: SGE, AI Mode, AI Answer Box.</em></dd>\n\n          <dt>Answer Engine / Response Engine</dt>\n          <dd>A system that directly answers questions by computing or generating a response from external data (e.g., WolframAlpha). Unlike traditional search engines, it provides a precise answer rather than a list of links. It relies on knowledge bases, algorithms, and sometimes language models. <em>See also: AEO, AI Answer Box.</em></dd>\n\n          <dt>Answer Engine Optimization (AEO)</dt>\n          <dd>Content optimization to appear in direct answers provided by answer engines or conversational assistants. AEO focuses on content structure, clarity, and reliability so that AI systems can accurately retrieve and cite it. It specifically targets answers generated by tools like ChatGPT or Google&rsquo;s AI Overviews. <em>See also: GEO, Answer Engine, Enriched Results.</em></dd>\n\n          <dt>Chunking</dt>\n          <dd>The act of breaking large volumes of text into smaller units, called &ldquo;chunks,&rdquo; to make them easier for language models to process. This improves the efficiency and accuracy of summarization, information extraction, or translation. Chunks may consist of sentences, paragraphs, or passages, in order to preserve relevant context. <em>See also: Passage, Context Window.</em></dd>\n\n          <dt>Citation</dt>\n          <dd>Explicit mention of a source or document in the response generated by a model, used to reference the origin of the information. RAG systems and AI Overviews use citations to show which pages were consulted and to strengthen user trust. Structuring your content and providing reliable sources increases the chances of being cited. <em>See also: RAG, AI Overview, E-E-A-T.</em></dd>\n\n          <dt>Context Window</dt>\n          <dd>The maximum number of tokens a model can take into account at once, including the prompt and the response it generates. A larger context window allows the model to retain more information and can improve response relevance. It determines how much text an LLM can analyze at once and influences chunking and RAG strategies. <em>See also: Token, LLM, Chunking.</em></dd>\n\n          <dt>Conversational Search</dt>\n          <dd>Search where the user asks questions in natural language and receives responses as in a conversation. It replaces keyword-based searches with full queries and offers a more human-like interaction. These systems rely on language models and context to understand intent and provide evolving answers (often via chatbots or voice assistants). <em>See also: Answer Engine, Search Intent, Prompt.</em></dd>\n\n          <dt>Data ingestion</dt>\n          <dd>The process by which raw data is collected, imported, and integrated into a system for processing or analysis. For language models, this includes gathering texts, cleaning them, and formatting them for training or updating via techniques like RAG. Effective ingestion ensures the quality and freshness of the information used by generative engines. <em>See also: RAG, Grounding, Vector Databases.</em></dd>\n\n          <dt>E-E-A-T</dt>\n          <dd>Acronym for Experience, Expertise, Authoritativeness, Trustworthiness. This is a content quality evaluation framework used by Google. Experience reflects first-hand knowledge of the topic; expertise refers to skills or qualifications; authoritativeness concerns reputation and the quality of sources; trustworthiness, the most important of the four according to Google, is the extent to which the page is accurate, honest, safe and reliable. Strengthening these criteria improves content credibility and visibility, even though they are not direct ranking factors. <em>See also: YMYL, LLMO, Rich results.</em></dd>\n\n          <dt>Embeddings</dt>\n          <dd>Vector representations (in numerical form) of words, phrases, or objects, organized so that semantically similar items are close in the vector space. Obtained through learning techniques, they allow measurement of semantic similarity between texts or entities. They are used for semantic search, sentiment analysis, and information retrieval in vector databases. <em>See also: Semantic Proximity, Vector database, Semantic search.</em></dd>\n\n          <dt>Enriched Results / Rich Results</dt>\n          <dd>Search results that go beyond the traditional blue link, displaying additional data, images, or visuals (reviews, products, events, etc.). They are often generated from structured data. They enhance the user experience and can achieve high click-through rates, even with the rise of zero-click searches. <em>See also: Structured Data, Schema.org, Featured Snippet.</em></dd>\n\n          <dt>Entity / Named Entity</dt>\n          <dd>An important element of a text (person, place, organization, event, date, etc.) that can be detected and categorized using named entity recognition techniques. Identifying entities feeds knowledge graphs and improves search relevance. In GEO, properly defining and tagging entities enhances their recognition by models and increases the likelihood of being cited. <em>See also: Knowledge Graph, Schema.org, Embeddings.</em></dd>\n\n          <dt>Featured Snippet / Position Zero</dt>\n          <dd>A highlighted text snippet at the top of a search results page that provides a concise answer to a query. It is called &ldquo;position zero&rdquo; because it appears before the organic results, often in a box. It is selected from well-structured and relevant content, making it important for SEO and GEO. <em>See also: Enriched Results, Zero-Click Search, AI Answer Box.</em></dd>\n\n          <dt>Generative AI</dt>\n          <dd>A set of models capable of creating text, images, or other original content from existing data. Often based on transformer architectures and LLMs, generative AI produces responses, summaries, or multimodal creations and powers conversational assistants and creative tools. It also raises reliability and ethical concerns. <em>See also: LLM, Multimodal Model, Hallucination.</em></dd>\n\n          <dt>Generative AI Optimization (GAIO)</dt>\n          <dd>Term used to describe the optimization of content to adapt it to generative engines (the conceptual equivalent of GEO). It combines structuring, markup, and semantic relevance so that language models recommend and cite a brand&rsquo;s content. GAIO largely overlaps with GEO. <em>See also: GEO, LLMO, AEO.</em></dd>\n\n          <dt>Generative Engine Advertising (GEA)</dt>\n          <dd>Paid advertising shown in or next to AI-generated answers, such as ads in ChatGPT or in Google AI Overviews and AI Mode. These placements are labeled as sponsored and kept separate from the answer: OpenAI states that ads do not influence the answers ChatGPT gives. GEA complements GEO, which works on the answer itself. <em>See also: GEO, LLMO.</em></dd>\n\n          <dt>Generative Engine Optimization (GEO)</dt>\n          <dd>The optimization of digital content to improve its visibility in results generated by AI models, particularly the synthetic answers produced by generative engines. This practice aims to influence the way large language models retrieve, synthesize, and cite a brand&rsquo;s or publisher&rsquo;s information in generated responses. It resembles an evolution of search optimization toward environments where users receive a complete answer without clicking, and it is distinct from Search Engine Optimization (SEO) and Answer Engine Optimization (AEO). <em>Also called: GAIO, AI SEO. See also: AEO, RAG.</em></dd>\n\n          <dt>Generative Search Optimization (GSO)</dt>\n          <dd>A set of optimization techniques aimed at ensuring content is effectively recognized by search engines using generative AI. Similar to GEO, AEO, and GAIO, it emphasizes semantic quality and the accessibility of information for the models, whether in generated answers, enriched results, or knowledge panels. <em>See also: GEO, Global Search Optimization, LLMO.</em></dd>\n\n          <dt>Global Search Optimization (GSO)</dt>\n          <dd>A set of optimization practices aimed at improving the visibility of content across all search interfaces: traditional search engines, voice assistants, generative engines, etc. It combines SEO, AEO, and GEO to ensure presence in organic results, direct answers, and generated previews. <em>See also: SEO, GEO, LLMO.</em></dd>\n\n          <dt>Google AI Mode</dt>\n          <dd>An advanced search experience using deep reasoning and multimodal capabilities to explore a topic in detail. It allows follow-up questions, provides links to useful resources, and integrates AI-generated answers. AI Mode notably relies on the query fan-out technique to break a query into sub-questions and explore the web in depth. <em>See also: Query Fan-Out, SGE, AI Overview.</em></dd>\n\n          <dt>Grounding / Factual Anchoring</dt>\n          <dd>The act of linking an AI model&rsquo;s output to real, verifiable data to ensure factual results. Grounding improves accuracy by basing generation on authentic documents rather than mere statistical correlations. It is often used alongside RAG to combat hallucinations and provide clear citations. <em>See also: RAG, Hallucination, Generative AI.</em></dd>\n\n          <dt>Hallucination (AI)</dt>\n          <dd>Inaccuracy or false statement generated by an AI model, while appearing plausible. It occurs when the model misinterprets patterns or lacks reliable information, producing responses that do not reflect reality. Reducing hallucinations involves techniques such as RAG or grounding, which link the output to verifiable sources. <em>See also: Grounding, RAG, Generative AI.</em></dd>\n\n          <dt>JSON-LD</dt>\n          <dd>Serialization format for linked data that allows structured data to be embedded within HTML using JSON. Recommended by Google for implementing Schema.org without modifying visible content, it simplifies markup maintenance and promotes the appearance of enriched results and knowledge panels. <em>See also: Structured Data, Schema.org, Knowledge Graph.</em></dd>\n\n          <dt>Knowledge Graph</dt>\n          <dd>A knowledge base that represents entities and their relationships as nodes and edges. It stores interconnected descriptions of objects, events, and concepts, allowing navigation between them via queries. Search engines use it to power knowledge panels and generated answers. <em>See also: Named Entity, Schema.org, Knowledge Panel.</em></dd>\n\n          <dt>Knowledge Panel</dt>\n          <dd>Box in search results that presents a summary of information from a knowledge graph (key facts, images, links, etc.) about an entity. Optimizing its presence involves using structured data and precise schemas for the relevant entities. <em>See also: Knowledge Graph, Schema.org, Enriched Results.</em></dd>\n\n          <dt>Large Language Model (LLM)</dt>\n          <dd>Large language model trained in a self-supervised manner on very large volumes of text for natural language processing tasks. Based on transformer-type architectures, it contains billions to trillions of parameters and can generate, summarize, translate, and reason over text. LLMs are at the core of conversational agents, code generators, and augmented search systems. <em>See also: Generative AI, Transformers, Context Window.</em></dd>\n\n          <dt>Large Language Model Optimization (LLMO)</dt>\n          <dd>Optimization of content so that it is used and cited by generative AI tools (ChatGPT, Perplexity, etc.). It prioritizes authoritative sources, semantically complete content blocks, and formats that are easy to analyze. LLMO is a variant of AEO and GEO focused on large language models. <em>Also called: AI SEO, LLM SEO. See also: GEO, AEO.</em></dd>\n\n          <dt>Multimodal Model / Multimodal Search</dt>\n          <dd>AI model capable of understanding and processing multiple types of information (text, image, audio, video) simultaneously. Multimodal search leverages these models to interpret queries combining multiple media and provide integrated results (e.g., describing an image and asking a question). <em>See also: Generative AI, LLM, Transformers.</em></dd>\n\n          <dt>Natural Language Processing (NLP)</dt>\n          <dd>A field that enables machines to understand, analyze, and generate human language. It covers syntax analysis, translation, entity recognition, sentiment analysis, and more. Recent advances rely on LLMs, embeddings, and pretraining to enhance human-machine interaction. <em>See also: LLM, Transformers, Embeddings.</em></dd>\n\n          <dt>Ontology</dt>\n          <dd>Formal representation of the concepts within a domain and the relationships that link them, used to structure knowledge. It defines classes, properties, and hierarchies to ensure a shared understanding (for both machines and humans) of a subject. Ontologies are crucial for knowledge graphs and support semantic search and enriched results. <em>See also: Knowledge Graph, Taxonomy, Schema.org.</em></dd>\n\n          <dt>Passage</dt>\n          <dd>Text segment short enough to be processed or indexed individually. Passages are often created through chunking and serve as units for search or input into generative systems. A well-defined passage improves accuracy by focusing on a specific context. <em>See also: Chunking, RAG.</em></dd>\n\n          <dt>Prompt</dt>\n          <dd>Natural language text that describes the task an AI model should perform. It provides the initial context and can specify the style, format, or information to use. The quality and precision of the prompt directly influence the relevance of the responses and form the core of prompt engineering. <em>See also: Prompt Engineering, Query Fan-Out, Conversational Search.</em></dd>\n\n          <dt>Prompt Engineering</dt>\n          <dd>The art of formulating and structuring an instruction (prompt) to obtain more relevant responses from a generative AI model. A prompt describes the task to perform, sometimes including the desired style, format, or context. Optimizing it is essential to fully leverage language models in both search and creative applications. <em>See also: Prompt, Query Fan-Out, Conversational Search.</em></dd>\n\n          <dt>Query Fan-Out</dt>\n          <dd>Technique that breaks a question into multiple subtopics and simultaneously sends several queries to find diverse content. It helps capture different intents and retrieve results from the web, knowledge graphs, and other sources. Query fan-out powers generative search experiences such as AI Mode. <em>See also: AI Mode, SGE, Conversational Search.</em></dd>\n\n          <dt>Retrieval-Augmented Generation (RAG)</dt>\n          <dd>Technique that combines a language model with an information retrieval system to incorporate up-to-date knowledge into generation. The model first consults a set of specific documents before responding, which enriches the output and reduces hallucinations. It allows updating a model without full retraining and facilitates verifiable citations. <em>See also: GEO, Grounding, Vector Database.</em></dd>\n\n          <dt>Schema.org</dt>\n          <dd>Collaborative initiative aimed at defining schemas for structured data on the Internet. Led by players such as Google, Microsoft, Yahoo, Yandex, and the web community, it provides common tags to improve search engines&rsquo; understanding of pages. Using Schema.org in HTML helps generate enriched results and knowledge panels, and helps search engines and AI crawlers understand what a page describes. <em>See also: Structured Data, JSON-LD, Knowledge Graph.</em></dd>\n\n          <dt>Search Generative Experience (SGE)</dt>\n          <dd>Experiment from Google Search Labs, launched in 2023, that used generative AI to provide quick overviews of a topic, related ideas, and the ability to ask follow-up questions. SGE presented synthesized answers accompanied by links to sources, helping users understand a topic more quickly. AI Overviews replaced it in Google Search in May 2024, and AI Mode carries on its conversational approach. <em>See also: AI Overview, AI Mode, Query Fan-Out.</em></dd>\n\n          <dt>Search Intent</dt>\n          <dd>What the user actually wants to achieve when entering a query: informational (seeking a fact), transactional (purchasing or booking), or navigational (accessing a specific site). Understanding the intent allows content and responses to be tailored to better meet the need. <em>See also: Conversational Search, Query Fan-Out, Enriched Results.</em></dd>\n\n          <dt>Search or Crawl Bots</dt>\n          <dd>Programs that automatically browse websites to download and index their content. They allow search engines to discover and update pages, but also serve to collect data for training language models. Publishers can control their activity using the robots.txt file and certain meta tags. <em>See also: Knowledge Graph, LLMO, Data ingestion.</em></dd>\n\n          <dt>Semantic Proximity</dt>\n          <dd>Measure of the similarity in meaning between two words, phrases, or entities within a vector space. Calculated from embeddings, it allows finding relevant content beyond simple keyword matching. It is essential for semantic search and content alignment in answer engines. <em>See also: Embeddings, Semantic Search.</em></dd>\n\n          <dt>Semantic Search</dt>\n          <dd>Information retrieval approach that aims to understand intent and contextual meaning rather than relying solely on exact keywords. It leverages embeddings and measures semantic similarity to deliver more relevant results, particularly for conversational queries. <em>See also: Embeddings, Semantic Proximity, Vector Database.</em></dd>\n\n          <dt>SEO LLM / LLM SEO</dt>\n          <dd>Informal term referring to the optimization of content so that it can be utilized and cited by large language models. Similar to LLMO, it involves structuring content, providing reliable sources, and maximizing the models&rsquo; semantic understanding. It combines traditional SEO and GEO to ensure visibility in generated answers. <em>See also: LLMO, GEO, AEO.</em></dd>\n\n          <dt>Structured Data</dt>\n          <dd>A standardized format used to provide information about a page and classify its content (e.g., a recipe: ingredients, cooking time, nutritional value). This markup helps engines understand the content and supports the generation of enriched results and the use of the page by language models. <em>See also: Schema.org, JSON-LD, Enriched Results.</em></dd>\n\n          <dt>Taxonomy</dt>\n          <dd>Hierarchical classification used to organize concepts, products, or content into categories and subcategories. It facilitates user navigation and search engine indexing. In GEO, a consistent taxonomy helps models understand relationships between topics and generate more accurate responses. <em>See also: Ontology, Knowledge Graph, Structured Data.</em></dd>\n\n          <dt>Token</dt>\n          <dd>A sequence of characters considered a processing unit during tokenization (word, subword, symbol, etc.). Tokenization splits text into tokens, which the model then processes. The number of tokens affects the context window and processing costs. <em>See also: Context Window, Transformers, Embeddings.</em></dd>\n\n          <dt>Transformers</dt>\n          <dd>Neural network architecture based on the multi-head attention mechanism, without recurrence. Text is tokenized and embedded, then each token is contextualized via attention weights within a context window. Introduced in the paper &ldquo;Attention Is All You Need&rdquo; (2017), transformers have replaced RNNs and form the basis of most large language models. <em>See also: LLM, Context Window, Token.</em></dd>\n\n          <dt>Vector Database</dt>\n          <dd>A database designed to store and query embeddings (vectors representing the meaning or features of unstructured data). Unlike traditional databases, it handles multidimensional data and searches by similarity (distance between vectors). It powers semantic search and RAG by providing relevant documents through vector queries. <em>See also: Embeddings, Semantic Search, RAG.</em></dd>\n\n          <dt>YMYL (Your Money or Your Life)</dt>\n          <dd>Category of content that can significantly impact the health, financial stability or safety of people, or the welfare or well-being of society. Google applies higher quality standards to these pages to prevent inaccurate information from harming users. Publishers must demonstrate strong expertise and trustworthiness to be visible in these sensitive areas. <em>See also: E-E-A-T, Enriched Results, LLMO.</em></dd>\n\n          <dt>Zero-Click Search</dt>\n          <dd>Search where the answer to the query is provided directly on the results page, without the need for an additional click. This can take the form of rich snippets, knowledge panels, or generated answers that immediately satisfy the search intent. This trend impacts GEO and AEO, as it reduces site traffic in favor of presence in the immediate answer. <em>See also: Enriched Results, AI Overview, Featured Snippet.</em></dd>\n        </dl>"
      }
    ]
  },
  "faq": {
    "title": "FAQ",
    "breadcrumb": [
      "Docs",
      "Reference",
      "FAQ"
    ],
    "blocks": [
      {
        "id": "faq",
        "title": "",
        "html": "<p class=\"lede\">Answers to the questions we hear most often.</p>\n\n        <h3>What is GEO?</h3>\n        <p>\n          Generative Engine Optimization is the work of making a brand visible and well described in the answers of AI assistants. It builds on SEO:\n          the assistants search the web and quote the pages they can read and trust. GEO adds the work on the sources they rely on and on how your\n          content answers the questions people ask.\n        </p>\n\n        <h3>Which AI assistants does Poliris analyze?</h3>\n        <p>\n          Through their public web interface: ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode and Google AI Overview. Through their API, on paid plans:\n          models from OpenAI, Google, Anthropic (Claude), xAI (Grok) and Mistral. See <a href=\"#models\">Models you can question</a>.\n        </p>\n\n        <h3>How is visibility measured?</h3>\n        <p>\n          Poliris asks the AI models the questions your customers ask, without naming your brand, and shows how often your brand appears in the answers,\n          topic by topic and model by model, next to your competitors. See the <a href=\"#feature-geo-visibility-1\">Visibility tab</a>.\n        </p>\n\n        <h3>How is sentiment measured?</h3>\n        <p>\n          Each answer that mentions your brand is labeled positive, neutral or negative. The <a href=\"#feature-geo-sentiment-1\">Sentiment tab</a> shows the result\n          per topic and per model, next to your competitors.\n        </p>\n\n        <h3>Why do my scores change between two runs?</h3>\n        <p>\n          AI assistants do not always give the same answer to the same question, and their sources change. A single run is a snapshot: compare several runs,\n          or schedule the analysis to run regularly, before drawing conclusions. Using more prompts also makes the scores steadier.\n        </p>\n\n        <h3>How long does an analysis take?</h3>\n        <p>\n          An AI visibility analysis usually takes a few minutes. A technical audit depends on the number of pages: a few minutes for 100 pages, longer for\n          thousands. You can leave the page while it runs.\n        </p>\n\n        <h3>How many prompts should I use?</h3>\n        <p>\n          Onboarding runs 5 to 10. On a paid plan, Poliris writes 20 questions per audit and pre-selects 10; you keep at least 5 and can add your own, on 2 to 4 models. More prompts give steadier scores and cost more credits:\n          the setup panel shows the cost before you start.\n        </p>\n\n        <h3>Which countries and languages are covered?</h3>\n        <p>\n          Any country or region can be a trading zone. Questions are written in the language you choose for the zone. The interface is available in English and French.\n        </p>\n\n        <h3>Can I choose the competitors?</h3>\n        <p>\n          Yes. Poliris finds your competitors in the AI answers. In <strong>Project Settings &rsaquo; AI Visibility &rsaquo; Competitors</strong>, you can add a player the answers did not name, change its type, merge or hide one, and select up to five for the charts; the other places are filled from the scores. Your changes are kept at every new run.\n        </p>\n\n        <h3>Can an agency manage several brands?</h3>\n        <p>\n          Yes. Create one project per brand in your workspace and give each team member access to the projects they work on. All projects share the\n          credits of the workspace. For agencies, the agency pack adds white label and a separate plan for each client.\n        </p>\n\n        <h3>Does Poliris change my website?</h3>\n        <p>\n          Not by itself. Poliris reads your public pages. It changes something only when you connect the site (SEO pixel, WordPress or Webflow) and apply a fix\n          yourself. Access to Google Search Console and Google Analytics is read-only.\n        </p>\n\n        <h3>Is my data safe?</h3>\n        <p>\n          The application servers and the database are hosted in the European Union. Some providers, such as the AI model providers, are outside the EU and covered by standard contractual clauses. Poliris does not use your data, conversations or Google data to train its own AI models, and never sells data coming from Google. Access to your Google\n          data is read-only and is removed when you disconnect. A data processing agreement is available on request. See our\n          <a href=\"https://poliris.io/en/privacy\">privacy policy</a> for the details.\n        </p>\n\n        <h3>What happens when I run out of credits?</h3>\n        <p>\n          An AI visibility analysis needs at least 100 credits to start, and a technical audit needs enough credits for its pages. Below that, these\n          actions show a padlock and scheduled analyses are skipped. Credits come back at your next monthly renewal, or immediately if you move to a larger plan.\n        </p>\n\n        <h3>How do I cancel?</h3>\n        <p>\n          The workspace Owner opens <strong>Workspace settings &rsaquo; Billing &rsaquo; Manage Billing</strong> and cancels in the Stripe portal. The workspace then\n          goes back to the Free plan; your projects and past audits stay available.\n        </p>"
      }
    ]
  },
  "support": {
    "title": "Support",
    "breadcrumb": [
      "Docs",
      "Reference",
      "Support"
    ],
    "blocks": [
      {
        "id": "support",
        "title": "Contact the Poliris team",
        "html": "<p>Something does not work as described, or you have a question?</p>\n        <ul>\n          <li>Email: <a href=\"mailto:contact@poliris.io\">contact@poliris.io</a></li>\n          <li>Book a call with the team: <a href=\"https://poliris.io/en/demo\">poliris.io/en/demo</a></li>\n          <li>Articles and guides: <a href=\"https://poliris.io/en/blog\">the Poliris blog</a></li>\n        </ul>"
      }
    ]
  },
  "whats-new": {
    "title": "What’s new",
    "breadcrumb": [
      "Docs",
      "Updates",
      "What’s new"
    ],
    "blocks": [
      {
        "id": "release-notes",
        "title": "",
        "html": "<p class=\"lede\">The main changes of recent months, newest first.</p>"
      },
      {
        "id": "release-notes-1",
        "title": "October 2026",
        "html": "<ul>\n          <li>Onboarding: products are now detected as lines of business, and questions are written in two steps to sound closer to what customers ask.</li>\n          <li>Roadmap: a new plan is published directly, without a validation step. Each plan shows its weekly time allocation.</li>\n          <li>AI Reputation: the Evolution chart moved to the Visibility tab. When you delete a product followed in several trading zones, you choose the zones to remove.</li>\n          <li>Keywords: the keyword tools are grouped under one Keywords entry.</li>\n          <li>Project Settings: the settings are grouped in three areas, AI Visibility, Technical audit and Project. Setup shows how each product is audited in each trading zone, prompts are managed zone by zone, and Competitors lets you add, merge or hide players and select up to five for the charts.</li>\n        </ul>"
      },
      {
        "id": "release-notes-2",
        "title": "September 2026",
        "html": "<ul>\n          <li>Roadmap: the SEO Plan, with a week-by-week timeline, an execution board, and <em>Update plan</em> with a preview of the changes. New options: LLM to favour and Developer tasks.</li>\n          <li>Sidebar: the <em>Dashboard | Poli AI</em> switch opens Poli AI as a full page.</li>\n          <li>Technical audit: audits of up to 30,000 pages, Non-owned sites, orphan pages, and a sitemap card with estimated issues.</li>\n          <li>Excel export of AI Reputation and technical audit data.</li>\n          <li>Citations: Review Citation, and suggested actions on each cited source in Backlinks &amp; Citations.</li>\n        </ul>"
      },
      {
        "id": "release-notes-3",
        "title": "August 2026",
        "html": "<ul>\n          <li>MCP connector: connect Claude, ChatGPT or Cursor to your Poliris data.</li>\n          <li>Scheduled AI visibility analyses now run automatically.</li>\n          <li>Google Search Console and Google Analytics are connected separately, and the connection belongs to each website.</li>\n          <li>Roadmap: the <em>Create an SEO plan</em> form.</li>\n        </ul>"
      },
      {
        "id": "release-notes-4",
        "title": "July 2026",
        "html": "<ul>\n          <li>Billing through Stripe for the Starter, Growth and Pro plans: card payment, invoices and the customer portal.</li>\n          <li>Site connection: SEO pixel, WordPress plugin (available on wordpress.org) and Webflow.</li>\n          <li>Onboarding in four steps.</li>\n          <li>Content: the Content Optimizer and long-term content plans.</li>\n          <li>Acquire Citation.</li>\n        </ul>\n\n        <div class=\"doc-footer-nav\">\n          <a href=\"#introduction\"><span class=\"direction\">Back to</span>Introduction</a>\n          <a href=\"#getting-started\" class=\"next\"><span class=\"direction\">Start with</span>Quickstart</a>\n        </div>"
      }
    ]
  }
};
