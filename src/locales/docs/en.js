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
        "html": "<div class=\"card-grid card-grid-2\">\n          <div class=\"card card-plain\">\n            <h4>Measure your AI reputation</h4>\n            <p>See how often AI assistants mention each of your products, where you rank against competitors, and whether the tone is positive, neutral or negative.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Audit your website</h4>\n            <p>Crawl your site with the Poliris crawler and run 151 tests on the site and its pages, grouped in three stages: Page Access, Content Access and Content Quality.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Plan the work</h4>\n            <p>Turn both audits into a week-by-week SEO plan sized to the time you have, and track it on an execution board.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Act on it</h4>\n            <p>Write and optimize content with Kate, the content writer of Poli AI, apply technical fixes to your site, and find the sources AI assistants quote.</p>\n          </div>\n        </div>"
      },
      {
        "id": "who-is-it-for",
        "title": "Who is it for?",
        "html": "<ul>\n          <li><strong>Brands and marketing teams</strong> who want to know what AI assistants say about their products.</li>\n          <li><strong>SEO and GEO specialists</strong> who want the technical audit and the AI visibility audit in one place.</li>\n          <li><strong>Agencies and consultants</strong> who follow several brands, each in its own project.</li>\n          <li><strong>Content teams</strong> who need briefs and drafts grounded in real search and AI data.</li>\n        </ul>"
      },
      {
        "id": "introduction-4",
        "title": "How this guide is organized",
        "html": "<ol>\n          <li><a href=\"#getting-started\">Get Started</a>: create your account, run your first analysis, learn the vocabulary and how credits work.</li>\n          <li><a href=\"#feature-geo\">Measure</a>: read the AI Reputation dashboards and the Technical Audit.</li>\n          <li><a href=\"#feature-roadmap\">Act</a>: the Roadmap, Content, Implementation and Citations tools.</li>\n          <li><a href=\"#feature-poliagent\">Poli AI</a>: the assistant that answers questions about your data.</li>\n          <li><a href=\"#integrations\">Connections</a> and <a href=\"#settings-account\">Settings</a>: connect your site and your Google tools, manage your team and your plan.</li>\n        </ol>"
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
        "html": "<p>\n          The onboarding has four steps. Your progress is saved on the server at every step: if you close the tab,\n          you go back to the same step the next time you sign in.\n        </p>\n\n        <h3 id=\"sign-up\">Create your account</h3>\n        <p>\n          Go to the sign-up page and use <strong>Sign up with Google</strong>, or an email address and a password of at least 8 characters.\n          With an email address, Poliris sends you a 6-digit <strong>verification code</strong> to type in before your account is created.\n          If you received a <strong>promo code</strong>, enter it in the field at the top of the form: the extra credits are added when your account is created.\n        </p>\n        <p>\n          You can also start from the Poliris website by typing your domain in the form on the home page. The onboarding opens with your\n          website already filled in and asks you to create a free account before the analysis starts.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S02\"><img src=\"/docs/images/s02-sign-up.webp\" alt=\"The sign-up page. The promo code field is optional.\" width=\"1640\" height=\"808\" loading=\"lazy\" /><figcaption>The sign-up page. The promo code field is optional.</figcaption></figure>\n\n        <ol class=\"steps\">\n          <li>\n            <h3>Step 1: Add your website</h3>\n            <p>\n              Type your domain (for example <code>example.com</code>) and click <strong>Proceed</strong>. Poliris looks up your brand\n              and shows a card with its logo, a <strong>Brand name</strong> and a short <strong>Summary</strong>. Both are written by AI from your site:\n              click <strong>Edit details</strong> to correct them. The flag at the top right sets the language of the project, English or French.\n            </p>\n            <p>\n              Click <strong>Next</strong> to create the project. Poliris starts detecting your products in the background while you go on.\n            </p>\n        <figure class=\"docs-figure\" data-shot=\"S03\"><img src=\"/docs/images/s03-onboarding-step1.webp\" alt=\"Step 1. Poliris finds your brand name and writes a short summary you can edit.\" width=\"928\" height=\"948\" loading=\"lazy\" /><figcaption>Step 1. Poliris finds your brand name and writes a short summary you can edit.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 2: Help us tailor your experience</h3>\n            <p>Four optional questions. You can pick several answers per question, or skip them all.</p>\n            <ul class=\"def-rows\">\n              <li>\n                <span class=\"def-term\">Who are your customers?</span>\n                <span class=\"def-desc\"><strong>B2C</strong>, <strong>B2B</strong> or <strong>B2G</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">How do you sell?</span>\n                <span class=\"def-desc\"><strong>Online</strong> or <strong>Physical</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">What is your role?</span>\n                <span class=\"def-desc\"><strong>Founder-CEO</strong>, <strong>Marketing</strong>, <strong>Brand / Communications</strong>,\n                  <strong>Agency</strong>, <strong>Freelance</strong> or <strong>Other</strong>.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">What is your main goal?</span>\n                <span class=\"def-desc\"><strong>Monitor sentiment</strong>, <strong>Track visibility</strong>, <strong>Compare products</strong>\n                  or <strong>Follow competitors</strong>.</span>\n              </li>\n            </ul>\n            <p>\n              Your answers about customers, sales channel and goal help Poliris describe the people who buy your product (personas).\n              Those personas are used to write questions that sound like real customers.\n            </p>\n        <figure class=\"docs-figure\" data-shot=\"S04\"><img src=\"/docs/images/s04-onboarding-step2.webp\" alt=\"Step 2. All four questions are optional.\" width=\"1135\" height=\"910\" loading=\"lazy\" /><figcaption>Step 2. All four questions are optional.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 3: Choose your product and configure the analysis</h3>\n            <p>\n              Poliris lists the products it found on your site, at most five. A <strong>product</strong> here is a line of business, described the way a buyer would\n              ask an AI assistant about it; variants of the same offer are grouped. The main one is selected and marked <strong>Main</strong>.\n              The first analysis covers one product: pick it in <strong>Choose your product</strong>, or use <strong>+ Add new product</strong>\n              if the one you want is missing.\n            </p>\n            <p>Then set the scope of the analysis:</p>\n            <ul class=\"def-rows\">\n              <li>\n                <span class=\"def-term\">Trading zone</span>\n                <span class=\"def-desc\">The country or region where you want to track visibility. Poliris suggests zones for the product;\n                  <strong>Search trading zone</strong> lets you add any place from a map.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">Language</span>\n                <span class=\"def-desc\">The language the questions are written in. The list follows the trading zone.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">LLM</span>\n                <span class=\"def-desc\">The AI assistants to question. Select exactly two of the <strong>Free Models</strong>, which are the public\n                  web interfaces of the assistants (ChatGPT, Gemini, Perplexity, Google AI Mode, Google AI Overview). API models are available\n                  with a paid plan.</span>\n              </li>\n              <li>\n                <span class=\"def-term\">Topics</span>\n                <span class=\"def-desc\">The themes your brand is measured on, such as quality, value for money or customer support.\n                  Poliris pre-selects up to four. Keep between three and five; <strong>More topics</strong> opens the full list with a search.</span>\n              </li>\n            </ul>\n            <p>\n              Click <strong>Next</strong>. Poliris writes the questions and starts the free technical audit of your site at the same time.\n            </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S05\"><img src=\"/docs/images/s05-onboarding-step3.webp\" alt=\"Step 3. One product, one trading zone, two AI models and three to five topics.\" width=\"1207\" height=\"1439\" loading=\"lazy\" /><figcaption>Step 3. One product, one trading zone, two AI models and three to five topics.</figcaption></figure>\n          </li>\n\n          <li>\n            <h3>Step 4: Select your prompts</h3>\n            <p>\n              Poliris writes about 20 questions (prompts) for the product and pre-selects 10. Each question carries one or more topic tags\n              and a <strong>traffic</strong> icon. Keep between 5 and 10 questions.\n            </p>\n            <ul>\n              <li>\n                <strong>Traffic</strong> shows how much people search for the subject of the question on Google, compared with the other questions\n                in the list (high, medium or low). A grey dash means no search volume was found, which is not the same as low.\n              </li>\n              <li>\n                <strong>Add Prompt</strong> lets you add your own questions, one at a time or several at once. With <strong>Single</strong>, you pick the topics; with <strong>Bulk</strong>, Poliris suggests topics for each line and you can change them.\n                A question must not contain your brand name: naming the brand would bias the answer.\n              </li>\n              <li>The topic pills at the top filter the list.</li>\n            </ul>\n            <p>Click <strong>Start analysis</strong>.</p>\n        <figure class=\"docs-figure\" data-shot=\"S06\"><img src=\"/docs/images/s06-onboarding-step4.webp\" alt=\"Step 4. Ten questions are pre-selected; you can keep between five and ten.\" width=\"890\" height=\"1000\" loading=\"lazy\" /><figcaption>Step 4. Ten questions are pre-selected; you can keep between five and ten.</figcaption></figure>\n          </li>\n        </ol>"
      },
      {
        "id": "getting-started-2",
        "title": "What happens after you click Start analysis",
        "html": "<p>\n          A progress screen stays open while Poliris sends every selected question to the two AI assistants in your trading zone,\n          reads the answers and identifies your competitors. With 10 questions and 2 models, that is 20 answers to analyze.\n          If the analysis fails, a <strong>Retry</strong> button starts it again with the same selection.\n        </p>\n        <p>When the analysis is finished:</p>\n        <ul>\n          <li>Poliris creates a first <a href=\"#feature-roadmap\">SEO plan</a> for your product, over 12 weeks at 5 hours a week, and opens the Roadmap. The plan takes 30 to 90 seconds to generate and waits for the technical audit if it is still running.</li>\n          <li>The <a href=\"#feature-technical\">technical audit</a> of 100 pages appears under <strong>Sites</strong> in the sidebar.</li>\n          <li>Your product audit is under <strong>AI Reputation</strong> in the sidebar.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S07\"><img src=\"/docs/images/s07-first-roadmap.webp\" alt=\"After the first analysis, Poliris opens the Roadmap with a 12-week plan.\" width=\"1615\" height=\"1345\" loading=\"lazy\" /><figcaption>After the first analysis, Poliris opens the Roadmap with a 12-week plan.</figcaption></figure>\n        <div class=\"callout info\">\n          <strong>What is free.</strong> The onboarding analysis (one product, one trading zone, two web models, up to 10 questions)\n          and the 100-page technical audit cost no credits. After that, each analysis uses credits from your workspace.\n          See <a href=\"#credits\">Credits and plans</a>.\n        </div>"
      },
      {
        "id": "getting-started-3",
        "title": "Adding another project",
        "html": "<p>\n          A project is one brand and its website. To add one, open the project selector at the top of the sidebar and click\n          <strong>Add new project</strong>. Enter the website URL, check the brand name Poliris found, and click <strong>Proceed</strong>.\n          Poliris builds the brand structure in the background, then opens the <a href=\"#ai-reputation-overview\">AI Reputation Overview</a> where\n          you set up and run the first audit. There is no onboarding wizard and no free analysis for additional projects.\n          Adding a project requires at least 100 credits in the workspace.\n        </p>"
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
        "html": "<ul class=\"def-rows\">\n          <li>\n            <span class=\"def-term\">Trading zone</span>\n            <span class=\"def-desc\">The country or region where you measure visibility. AI answers change from one country to another, so every\n              product is audited per zone. The settings tab calls them <strong>Trade Areas</strong>.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Language</span>\n            <span class=\"def-desc\">The language the questions are written in. It is chosen per zone. The interface itself is available in English and French.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Topic</span>\n            <span class=\"def-desc\">A theme your brand is judged on: quality, value for money, customer support, sustainability, innovation and so on.\n              Topics come from a fixed list of about thirty. Each product follows three to five of them.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Prompt</span>\n            <span class=\"def-desc\">A question sent to the AI assistants, written the way a customer would ask it and in the zone language.\n              Prompts never contain your brand name, so the answer shows whether the assistant thinks of you on its own.\n              Each prompt is linked to one or more topics.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Model (LLM)</span>\n            <span class=\"def-desc\">An AI assistant Poliris questions. <strong>Free Models</strong> are the public web interfaces (ChatGPT, Gemini,\n              Perplexity, Google AI Mode, Google AI Overview): Poliris asks the question like a visitor would and reads the answer.\n              <strong>API models</strong> are queried through the provider&rsquo;s official API (OpenAI, Google, Anthropic, xAI, Mistral) and give access to specific versions.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Analysis run</span>\n            <span class=\"def-desc\">One execution of an audit: every selected prompt sent to every selected model, for one product in one zone.\n              10 prompts and 2 models give 20 answers. Poliris keeps every run, so you can compare them over time.</span>\n          </li>\n          <li>\n            <span class=\"def-term\">Competitors</span>\n            <span class=\"def-desc\">The brands that appear in the answers. Poliris extracts them, cleans the list and follows your brand plus\n              up to five competitors in all rankings.</span>\n          </li>\n        </ul>\n\n        <figure class=\"docs-figure\" data-shot=\"S08\"><img src=\"/docs/images/s08-brand-structure-edit.webp\" alt=\"The brand structure: brand, categories and products. Click Edit Structure to change it.\" width=\"1191\" height=\"503\" loading=\"lazy\" /><figcaption>The brand structure: brand, categories and products. Click Edit Structure to change it.</figcaption></figure>"
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
        "html": "<p class=\"lede\">\n          Poliris works with a monthly pool of credits shared by the whole workspace. Paid plans differ only by the size of the pool:\n          every feature is available on every paid plan.\n        </p>"
      },
      {
        "id": "plans",
        "title": "Plans",
        "html": "<table>\n          <thead>\n            <tr><th>Plan</th><th>Price</th><th>Credits per month</th><th>What it includes</th></tr>\n          </thead>\n          <tbody>\n            <tr><td><strong>Free</strong></td><td>$0</td><td>0</td><td>The onboarding analysis (1 product, 1 trading zone, 2 web models, 10 prompts), the 100-page technical audit and 1 project.</td></tr>\n            <tr><td><strong>Starter</strong></td><td>$29 / month</td><td>300</td><td>All features, all API models, several trading zones and projects, technical audits up to 30,000 pages.</td></tr>\n            <tr><td><strong>Growth</strong></td><td>$99 / month</td><td>1,500</td><td>Same as Starter with a larger pool.</td></tr>\n            <tr><td><strong>Pro</strong></td><td>$189 / month</td><td>3,000</td><td>Same as Growth with a larger pool.</td></tr>\n          </tbody>\n        </table>\n        <ul>\n          <li>Your first paid month comes with twice the monthly credits.</li>\n          <li>The pool is refilled at each monthly renewal. Unused credits do not carry over.</li>\n          <li>On a paid plan, an audit uses 2 to 4 models, and at least 5 of the 20 questions Poliris writes, plus any you add.</li>\n          <li>Annual billing (about 20% less) and prices in euros are only offered when you subscribe from the <a href=\"https://poliris.io/en/pricing\">pricing page</a> before creating an account. Plans chosen in the app are billed monthly in US dollars.</li>\n          <li>There are no credit packs: to get more credits during a month, move to a larger plan.</li>\n        </ul>"
      },
      {
        "id": "credit-costs",
        "title": "What uses credits",
        "html": "<p>\n          Credits follow the real processing cost of each action: the AI calls and data providers it needs. Before you start an audit or a crawl,\n          Poliris shows an estimate. For a technical audit, the final charge is usually lower than the estimate, because excluded URLs are not fully tested.\n        </p>\n\n        <table>\n          <thead>\n            <tr><th>Action</th><th>Typical cost</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>AI visibility analysis</td><td>Per question and per model: about 1 credit for a free web model, 1 to 15 credits for an API model depending on the model. 10 questions on 2 web models cost about 20 credits.</td></tr>\n            <tr><td>Technical audit</td><td>About 0.05 credit per page, reserved when the crawl starts. A 1,000-page audit is estimated at 50 credits. Stopped or failed audits are refunded.</td></tr>\n            <tr><td>Content generation, optimization, long-term plans, roadmap generation</td><td>The processing cost of each request.</td></tr>\n            <tr><td>Keyword audit scans</td><td>The processing cost of each scan.</td></tr>\n            <tr><td>Poli AI conversations</td><td>Free.</td></tr>\n            <tr><td>Onboarding analysis and the 100-page onboarding audit</td><td>Free.</td></tr>\n            <tr><td>Excel exports</td><td>Free.</td></tr>\n          </tbody>\n        </table>\n\n        <h3>Minimum balance</h3>\n        <p>Some actions check the balance before they start:</p>\n        <ul>\n          <li>An AI visibility analysis, a new project or a new brand needs at least <strong>100 credits</strong> left. Scheduled analyses are skipped when the balance is below 100.</li>\n          <li>A technical audit needs at least <strong>5 credits</strong> and enough credits for the page count you choose. The page slider stops at what your balance covers.</li>\n        </ul>\n        <p>\n          When a button shows a padlock, the action is not available with your current plan or balance. Clicking it explains why and offers\n          <strong>Upgrade to unlock</strong>.\n        </p>"
      },
      {
        "id": "credits-3",
        "title": "Following your usage",
        "html": "<p>\n          <strong>Workspace settings &rsaquo; Usage</strong> shows the credits used and left in the current billing period, the split by type of action,\n          and the credits used by each project. See <a href=\"#settings-workspace\">Workspace settings</a>.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S09\"><img src=\"/docs/images/s09-usage.webp\" alt=\"Usage: credits used in the current period, by action type and by project.\" width=\"1622\" height=\"804\" loading=\"lazy\" /><figcaption>Usage: credits used in the current period, by action type and by project.</figcaption></figure>"
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
        "html": "<p class=\"lede\">\n          AI Reputation is the audit of what AI assistants say about your products. It answers three questions:\n          do they mention you, how do you rank against your competitors, and how do they describe you.\n        </p>\n        <p>\n          In the sidebar, <strong>MEASURE &rsaquo; AI Reputation</strong> opens the overview of all your products, and lists each product underneath.\n          A product page has three tabs: <a href=\"#feature-geo-overview\">Overview</a>, <a href=\"#feature-geo-visibility\">Visibility</a>\n          and <a href=\"#feature-geo-sentiment\">Sentiment</a>.\n        </p>"
      },
      {
        "id": "ai-reputation-overview",
        "title": "AI Reputation Overview",
        "html": "<p>\n          The overview shows your brand structure as cards: one card per product, grouped by category. The bar at the top lets you\n          filter by trading zone and jump to a product with the search field.\n        </p>\n        <p>On each product card:</p>\n        <ul>\n          <li>the <strong>visibility</strong> score out of 100, in a ring with its level (Very Weak to Very Strong);</li>\n          <li>the <strong>sentiment</strong> level, shown as a word, never as a number;</li>\n          <li>when you look at all trading zones, how many of them have been audited;</li>\n          <li><strong>View Audit</strong> to open the product, <strong>Run now</strong> to start a new analysis, <strong>Schedule audit</strong> to run it automatically;</li>\n          <li><strong>Setup audit</strong> on a product that was never audited.</li>\n        </ul>\n        <p>\n          Two buttons at the top work on several products at once. <strong>Run Manager</strong> starts an analysis on the products you tick\n          (about five minutes each). <strong>Schedule Manager</strong> opens the scheduling settings. They appear once at least one product has been audited.\n        </p>\n        <p>\n          <strong>Edit Structure</strong> switches the page to edit mode: add a brand, a category or a product, rename or delete them.\n          Items that already have analysis runs cannot be renamed or deleted, and deleting the only brand deletes the whole project. When you delete a product followed in several zones,\n          Poliris asks which zones to remove it from.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S10\"><img src=\"/docs/images/s10-ai-reputation-cards.webp\" alt=\"Product cards on the AI Reputation Overview.\" width=\"1181\" height=\"552\" loading=\"lazy\" /><figcaption>Product cards on the AI Reputation Overview.</figcaption></figure>"
      },
      {
        "id": "feature-geo-setup",
        "title": "Setting up an audit",
        "html": "<p>\n          <strong>Setup audit</strong> (or <strong>Configure and run audit</strong> on an empty product page) opens a panel in three steps:\n          <em>Configure</em>, <em>Generate</em>, <em>Select</em>.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Configure</h3>\n            <ul>\n              <li><strong>AI Model to Query</strong>: between 2 and 4 models on a paid plan (2 on the Free plan). Each card shows its cost in credits per question.</li>\n              <li><strong>Topic to explore</strong>: 3 to 5 topics. Poliris suggests four for the product.</li>\n              <li><strong>Trading zone</strong> and <strong>Language</strong>. You can also add <em>Worldwide</em> as a target location.</li>\n              <li><strong>Auto-run this audit</strong>: run the audit again automatically every day, week or month, at the time you choose.</li>\n            </ul>\n            <p>\n              The footer shows the cost per question, or per run when auto-run is on. If the balance is too low, a warning says how many credits\n              the smallest run needs.\n            </p>\n          </li>\n          <li>\n            <h3>Generate</h3>\n            <p>Poliris writes 20 questions for the product. You can leave this step running in the background.</p>\n          </li>\n          <li>\n            <h3>Select</h3>\n            <p>\n              The 20 questions are listed with their topics and traffic level, sorted by search demand; 10 are pre-selected.\n              Keep at least 5. <strong>Add Prompt</strong> adds your own questions. The footer shows the number of questions, the models,\n              the estimated duration and the credits. Click <strong>Run Audits</strong>.\n            </p>\n          </li>\n        </ol>\n        <figure class=\"docs-figure\" data-shot=\"S11\"><img src=\"/docs/images/s11-setup-panel-configure.webp\" alt=\"The footer of the audit setup panel shows the cost before you start.\" width=\"245\" height=\"76\" loading=\"lazy\" /><figcaption>The footer of the audit setup panel shows the cost before you start.</figcaption></figure>\n        <figure class=\"docs-figure\" data-shot=\"S12\"><img src=\"/docs/images/s12-setup-panel-select.webp\" alt=\"Add Prompt: write your own question and link it to one or more topics.\" width=\"1035\" height=\"907\" loading=\"lazy\" /><figcaption>Add Prompt: write your own question and link it to one or more topics.</figcaption></figure>"
      },
      {
        "id": "feature-geo-running",
        "title": "Running, history and schedules",
        "html": "<p>The header of a product page gathers the controls for that product:</p>\n        <ul>\n          <li><strong>Run</strong> (or <strong>Rerun</strong>) sends the product&rsquo;s active questions to its current models, in the zone shown, and adds a new run. To change the questions or the models first, use Project Settings &rsaquo; Prompts and LLM Models.</li>\n          <li><strong>History</strong> lists the past runs. Pick one to see the whole page as it was on that date; <strong>Reset to latest run</strong> brings you back.</li>\n          <li><strong>Export</strong> downloads the data of the product and zone as an Excel file.</li>\n          <li>The <strong>trading zone</strong> switcher changes zone. A colored dot shows the state of each zone: blue for an audit in progress, green when results are available, amber when questions are ready but not run yet, grey when there is no data.</li>\n        </ul>\n        <p>\n          A run usually takes a few minutes. While it runs, the page shows a progress percentage and you can keep working elsewhere.\n          Scheduled runs use the zone of the last run, with the product&rsquo;s current active questions and models.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S13\"><img src=\"/docs/images/s13-product-header.webp\" alt=\"The product header: run, history, export and trading zone.\" width=\"1640\" height=\"150\" loading=\"lazy\" /><figcaption>The product header: run, history, export and trading zone.</figcaption></figure>"
      },
      {
        "id": "feature-geo-overview-1",
        "title": "Overview tab",
        "html": "<p class=\"lede\">\n          The Overview tab sums up the selected run for one product in one trading zone. Each card links to the detailed tab.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S14\"><img src=\"/docs/images/s14-product-overview.webp\" alt=\"The Overview tab of a product.\" width=\"1640\" height=\"1332\" loading=\"lazy\" /><figcaption>The Overview tab of a product.</figcaption></figure>\n\n        <h4>Poli AI Insight</h4>\n        <p>\n          One or two sentences written by AI from the figures of the run: your visibility and sentiment, your rank and the leading competitor.\n          The insight is generated once per run and language and changes only when the figures change.\n        </p>\n\n        <h4>AI Visibility and Brand Sentiment</h4>\n        <ul>\n          <li><strong>AI Visibility</strong>: how often the AI models mention your brand, out of 100, with a level from Weak to Excellent.</li>\n          <li><strong>Brand Sentiment</strong>: how positively the models describe your brand, on a five-level scale from Very Weak to Very Strong.</li>\n        </ul>\n\n        <h4>Visibility Ranking</h4>\n        <p>\n          Your position among the brands Poliris follows for this product, sorted by visibility score. The badge reads <strong>Leader</strong>\n          when you are first, <strong>Challenger</strong> in the top half and <strong>Follower</strong> below. Hover the rank to see the brands\n          ahead of you. A brand that is never mentioned is shown as <strong>Unranked</strong>.\n        </p>\n\n        <h4>Source intelligence</h4>\n        <p>\n          The share of AI answers that cite your website as a source, with the change since the previous run, the number of answers\n          citing you and the number of source domains. <strong>Details</strong> opens the Backlinks &amp; Citations window.\n        </p>\n\n        <h4>Position vs Competitors</h4>\n        <p>\n          A chart with visibility on the horizontal axis and sentiment on the vertical axis. Each dot is a brand logo, yours is marked.\n          The four areas read as follows:\n        </p>\n        <ul>\n          <li><strong>Leaders</strong>: mentioned often and described well.</li>\n          <li><strong>Strong sentiment, low visibility</strong>: described well when mentioned, but rarely mentioned.</li>\n          <li><strong>Strong visibility, weak sentiment</strong>: mentioned often, described poorly.</li>\n          <li><strong>At risk</strong>: low on both.</li>\n        </ul>\n        <p>The <strong>Filter</strong> button above the chart chooses which brands to show, up to six.</p>\n\n        <h4>Visibility Analysis</h4>\n        <p>\n          The average visibility score across models, your visibility rank, the trend since the previous run and one bar per model\n          (<em>Score by platform</em>). It tells you which assistant knows you and which one does not.\n        </p>\n\n        <h4>Sentiment Analysis</h4>\n        <p>\n          Your average sentiment level, its trend since the previous run and one bar per topic. A topic marked <em>No answer</em> had no\n          answer mentioning your brand.\n        </p>\n\n        <div class=\"callout info\">\n          <strong>Ask Poli AI about a card.</strong> When the Poli AI chat panel is open, clicking any card sends Poli AI a question about it.\n          See <a href=\"#feature-poliagent\">Poli AI</a>.\n        </div>"
      },
      {
        "id": "feature-geo-visibility-1",
        "title": "Visibility tab",
        "html": "<p class=\"lede\">\n          The Visibility tab shows where your brand is mentioned, against whom, and from which sources the AI models take their information.\n          It is available once the product has at least one run.\n        </p>\n\n        <h4>Score Breakdown</h4>\n        <p>\n          Your visibility score out of 100, broken down either by <strong>Topics</strong> or by <strong>AI Models</strong>.\n          The best item is tagged <strong>Strongest</strong> and the weakest is tagged <strong>Priority</strong>.\n          Hover a topic to see how many prompts it covers.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S15\"><img src=\"/docs/images/s15-score-breakdown.webp\" alt=\"Score Breakdown, by topic or by AI model.\" width=\"538\" height=\"501\" loading=\"lazy\" /><figcaption>Score Breakdown, by topic or by AI model.</figcaption></figure>\n\n        <h4>Competitive Position</h4>\n        <p>\n          Your rank among the followed brands, its change since the last run, and a chart of your rank over time (from two runs onwards).\n          The list below shows every followed brand with its rank.\n        </p>\n\n        <h4>Source Intelligence</h4>\n        <p>\n          The websites the AI models cite in their answers. The header gives the number of distinct source domains and how many times\n          your own domain is cited. Switch between <strong>Latest run</strong> and <strong>All</strong> runs.\n        </p>\n        <ul>\n          <li>A colored bar splits the sources by type: Your site, Competitor, Stockist, Review, Industry, News, Media, Social, Forum, Blog, Listicle, Academic, Government and General.</li>\n          <li>A badge describes the mix of sources: <strong>Concentrated</strong>, <strong>Moderate</strong> or <strong>Diversified</strong>.</li>\n          <li>The five most cited domains are listed with their change since the previous run.</li>\n        </ul>\n        <p>\n          <strong>Backlinks &amp; Citations</strong> opens the full list of cited pages. Click <strong>Process backlinks</strong> (once per run; in <strong>All</strong> mode, process the remaining runs too): Poliris opens each\n          cited page and checks whether it links to you (<em>Active Link</em>), names you (<em>Mention</em>), ignores you (<em>Uncited</em>) or could not be checked (<em>Unverified</em>).\n          The <em>Opportunity</em> column suggests the next step for each domain (<em>Purchase</em>, <em>Claim</em>, <em>Check</em>,\n          <em>Ask</em> or <em>View</em>) and opens the matching <a href=\"#feature-citations\">Citations</a> page.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S16\"><img src=\"/docs/images/s16-source-intelligence.webp\" alt=\"Source Intelligence: which websites the AI models rely on.\" width=\"534\" height=\"499\" loading=\"lazy\" /><figcaption>Source Intelligence: which websites the AI models rely on.</figcaption></figure>\n        <figure class=\"docs-figure\" data-shot=\"S17\"><img src=\"/docs/images/s17-backlinks-citations.webp\" alt=\"Backlinks & Citations: the cited pages and whether they mention or link to you.\" width=\"1410\" height=\"675\" loading=\"lazy\" /><figcaption>Backlinks &amp; Citations: the cited pages and whether they mention or link to you.</figcaption></figure>\n\n        <h4>Visibility Analysis</h4>\n        <p>\n          A grid of brands against models (<strong>By LLM</strong>) or against topics (<strong>By Topic</strong>). Warm cells show where a brand\n          is often mentioned. Pick a column to rank the brands on that model or topic.\n        </p>\n\n        <h4>Prompt Explorer</h4>\n        <p>\n          Every question of the run, with its topic tags and its traffic level. The <strong>LLMs</strong> column shows one chip per model:\n          blue when the answer mentions your brand, grey when it does not. Click a chip or a row to open <strong>Prompt Details</strong>:\n        </p>\n        <ul>\n          <li><strong>Response</strong>: the full answer of the model, with brands and domains highlighted.</li>\n          <li><strong>Details</strong>: the brands in the answer with their order of appearance, and the sources the model cited.</li>\n        </ul>\n        <p>\n          The traffic level shows how much people search for the subject of the question on Google, compared with the other questions of this audit: high, medium or low.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S18\"><img src=\"/docs/images/s18-prompt-explorer.webp\" alt=\"Prompt Explorer: the exact question and each model's answer.\" width=\"1615\" height=\"766\" loading=\"lazy\" /><figcaption>Prompt Explorer: the exact question and each model's answer.</figcaption></figure>\n\n        <h4>Evolution</h4>\n        <p>\n          Your visibility score over time, one line per brand. Choose the brands with <strong>Filter</strong> (up to six) and the period with the date picker.\n          With a single run, the chart shows one point and fills in as runs accumulate.\n        </p>\n\n        <h3>Reading the tab</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Find the gap</h5>\n            <p>In Score Breakdown, switch between Topics and AI Models. The <em>Priority</em> tag points to the weakest topic or model.</p>\n          </li>\n          <li>\n            <h5>See who wins instead</h5>\n            <p>In Visibility Analysis, select that topic or model and look at the brands ranked above you.</p>\n          </li>\n          <li>\n            <h5>Read the answers</h5>\n            <p>In Prompt Explorer, filter on the topic and open the answers where you are missing. They show what the assistant says and which sources it used.</p>\n          </li>\n          <li>\n            <h5>Go after the sources</h5>\n            <p>Open Backlinks &amp; Citations: the domains cited for your competitors and not for you are your citation targets.</p>\n          </li>\n        </ol>"
      },
      {
        "id": "feature-geo-sentiment-1",
        "title": "Sentiment tab",
        "html": "<p class=\"lede\">\n          The Sentiment tab looks at how the AI models talk about your brand when they mention it: positively, neutrally or negatively,\n          topic by topic and compared with your competitors.\n        </p>\n        <p>\n          Every answer that mentions a brand is labeled positive, neutral or negative for that brand. Sentiment is shown on five levels:\n          <span class=\"badge tier tier-vw\">Very Weak</span> <span class=\"badge tier tier-w\">Weak</span> <span class=\"badge tier tier-m\">Moderate</span>\n          <span class=\"badge tier tier-s\">Strong</span> <span class=\"badge tier tier-vs\">Very Strong</span>.\n        </p>\n\n        <h4>Sentiment Breakdown</h4>\n        <p>\n          Your overall sentiment level, with one bar per topic or per AI model. The weakest item is tagged <strong>Priority</strong>.\n          <em>No answer</em> means no answer mentioned your brand for that item.\n        </p>\n\n        <h4>Sentiment trend</h4>\n        <p>\n          Your overall sentiment level across runs, with the current and previous level and the direction (stable, improving, declining).\n          Use the range slider to look at a period. The chart needs at least two runs.\n        </p>\n\n        <h4>AI Model Coverage</h4>\n        <p>\n          Each answer of the run is counted once, as <strong>Positive</strong>, <strong>Neutral</strong>, <strong>Negative</strong> or\n          <strong>Not mentioned</strong>. The line above the grid gives the total, for example\n          <em>2 LLMs &times; 10 prompts = 20 answers</em>. Untick a model to see the split for the others. A high &ldquo;not mentioned&rdquo; share is\n          a visibility problem, not a sentiment one.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S19\"><img src=\"/docs/images/s19-sentiment-coverage.webp\" alt=\"Sentiment Breakdown and AI Model Coverage.\" width=\"1134\" height=\"428\" loading=\"lazy\" /><figcaption>Sentiment Breakdown and AI Model Coverage.</figcaption></figure>\n\n        <h4>Competitor sentiment</h4>\n        <p>\n          A radar with one shape per brand, by model or by topic, and a line chart of each brand&rsquo;s sentiment over time.\n          <strong>Details</strong> opens a table with a level per topic (or per model) for every brand, ranked by overall sentiment.\n          Use <strong>Filter</strong> to choose the brands.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S20\"><img src=\"/docs/images/s20-competitor-sentiment.webp\" alt=\"Competitor sentiment: radar, trend and details table.\" width=\"1592\" height=\"807\" loading=\"lazy\" /><figcaption>Competitor sentiment: radar, trend and details table.</figcaption></figure>\n\n        <h4>Cited Prompts</h4>\n        <p>\n          Every question with one chip per model, colored by the tone of the answer toward your brand: green for positive, amber for neutral,\n          red for negative, white when your brand is not mentioned. Filter by topic with the tabs above the table and click a chip to read the answer.\n        </p>\n\n        <h3>Reading the tab</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Spot the weak topic</h5>\n            <p>In Sentiment Breakdown, look for the <em>Priority</em> tag.</p>\n          </li>\n          <li>\n            <h5>Compare</h5>\n            <p>In Competitor sentiment, check whether competitors score better on the same topic. If everyone is weak, the topic is hard for the whole market.</p>\n          </li>\n          <li>\n            <h5>Read the negative answers</h5>\n            <p>In Cited Prompts, filter on the topic and open the red chips. The answer and its sources tell you what to correct or to prove on your own pages.</p>\n          </li>\n        </ol>"
      },
      {
        "id": "models",
        "title": "Models you can question",
        "html": "<p class=\"lede\">\n          The AI models you can choose when you set up an audit, and the estimated cost of each question in credits.\n        </p>\n\n        <table>\n          <thead>\n            <tr><th>Type</th><th>Models</th><th>Credits per question (estimate)</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>Free Models (web interface)</td><td>ChatGPT, Gemini, Perplexity, Google AI Mode, Google AI Overview</td><td>1</td></tr>\n            <tr><td>OpenAI API</td><td>GPT-5.5, GPT-5.4, GPT-5.4 Mini, GPT-5.4 Nano, GPT-4o Mini</td><td>15, 10, 5, 3, 1</td></tr>\n            <tr><td>Google API</td><td>Gemini 3.1 Pro Preview, Gemini 3.5 Flash, Gemini 3 Flash Preview, Gemini 3.1 Flash Lite</td><td>12, 7, 4, 3</td></tr>\n            <tr><td>Anthropic API</td><td>Claude Opus 4.8, Claude Haiku 4.5</td><td>7, 2</td></tr>\n            <tr><td>xAI API</td><td>Grok 4.3</td><td>2</td></tr>\n            <tr><td>Mistral API</td><td>Mistral Large, Mistral Medium, Mistral Small</td><td>2, 2, 1</td></tr>\n          </tbody>\n        </table>\n        <p>\n          Free Models are free during onboarding only; after that, each question costs about one credit.\n          API models require a paid plan.\n        </p>"
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
        "html": "<p class=\"lede\">\n          The technical audit crawls your website with the Poliris crawler and runs 151 tests on the site and its pages. It tells you whether\n          search engines and AI crawlers can reach your pages, read their content, and find that content worth quoting.\n        </p>"
      },
      {
        "id": "feature-technical-1",
        "title": "The three stages",
        "html": "<p>Every test belongs to one of three stages. A page has to pass the first stage before the next ones matter.</p>\n        <div class=\"card-grid\">\n          <div class=\"card card-plain\">\n            <h4>Page Access</h4>\n            <p>Can crawlers reach the page? Status codes, redirects, robots.txt, sitemap, canonical tags, links, URL structure and speed.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Content Access</h4>\n            <p>Can they read it? Title, meta description, headings, structured data, images, social tags, language tags, analytics.</p>\n          </div>\n          <div class=\"card card-plain\">\n            <h4>Content Quality</h4>\n            <p>Is it worth quoting? Depth, readability, structure and how the page fits with the rest of the site.</p>\n          </div>\n        </div>"
      },
      {
        "id": "sites",
        "title": "Your sites",
        "html": "<p>\n          In the sidebar, <strong>MEASURE &rsaquo; Sites</strong> opens <em>My site &amp; socials</em>, the list of websites in the project.\n          Sites are split into <strong>Owned</strong> (sites you manage: you can audit them and apply fixes) and <strong>Non-owned</strong>\n          (sites you audit without managing them, such as a competitor or a partner). Each card shows the health score, the date of the last\n          analysis and the progress of a running crawl. Expand a card to see its health pipeline, its Google connections and the\n          <strong>Issues</strong> and <strong>Refresh</strong> buttons.\n        </p>\n        <p>\n          To add a site, click <strong>Add site</strong>, enter the URL and choose the site type. No audit starts until you click <strong>Run audit</strong> on the new card.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S21\"><img src=\"/docs/images/s21-sites-toolbox.webp\" alt=\"Adding a site: enter its URL and choose whether you own it.\" width=\"456\" height=\"357\" loading=\"lazy\" /><figcaption>Adding a site: enter its URL and choose whether you own it.</figcaption></figure>"
      },
      {
        "id": "tech-run",
        "title": "Running an audit",
        "html": "<p>\n          Click <strong>Run audit</strong> on a site card, or <strong>Re-crawl</strong> at the top of Site Overview. A window asks how many URLs to check:\n          from 10 to 30,000. For a first audit, the slider starts at the estimated size of your site, based on its sitemap. The window shows the\n          estimated cost, about 0.05 credit per page, and the slider stops at what your balance covers.\n        </p>\n        <p>\n          A re-crawl keeps the page limit of the previous audit and the slider cannot be moved, so that scores stay comparable from one audit to the next. This includes the onboarding audit: its re-crawls also check 100 pages.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S22\"><img src=\"/docs/images/s22-run-audit.webp\" alt=\"Choosing the number of URLs to check.\" width=\"381\" height=\"347\" loading=\"lazy\" /><figcaption>Choosing the number of URLs to check.</figcaption></figure>\n        <ul>\n          <li>While the crawl runs, the site screens show the progress and the pages crawled so far, marked as partial results.</li>\n          <li><strong>Stop audit</strong> discards the run and refunds the credits spent; your last complete audit stays available.</li>\n          <li>If the site blocks the crawler (Cloudflare, DataDome, Akamai and other anti-bot services), cannot be reached or returns errors, Poliris says so on the site card and refunds the run. Allowing the Poliris crawler in your protection settings usually solves it.</li>\n          <li><strong>History</strong> opens the list of past audits; <strong>Export</strong> on Site Overview downloads the audit as an Excel file.</li>\n        </ul>\n        <p>\n          On the Free plan, the technical audit is limited to the 100-page audit run during onboarding. Running more audits requires a paid plan.\n        </p>"
      },
      {
        "id": "feature-technical-overview-1",
        "title": "Site Overview",
        "html": "<p class=\"lede\">\n          Site Overview is the summary of one audit for the whole site. It has two tabs, <strong>Overview</strong> and\n          <a href=\"#tech-issues-tab\">Issues</a>, and a pill at the top to switch to <a href=\"#feature-technical-page-explorer\">Page Explorer</a>.\n        </p>\n        <p>\n          The header shows the site URL, the date of the last update and the number of pages crawled, with the <strong>Export</strong>,\n          <strong>History</strong> and <strong>Re-crawl</strong> buttons. The <strong>GSC</strong> and <strong>GA4</strong> chips at the top right show\n          whether Google Search Console and Google Analytics are connected (green) or not (red).\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S23\"><img src=\"/docs/images/s23-site-overview-top.webp\" alt=\"Site Overview: crawl, page status and speed cards.\" width=\"1612\" height=\"358\" loading=\"lazy\" /><figcaption>Site Overview: crawl, page status and speed cards.</figcaption></figure>\n\n        <p>The three cards at the top can show raw figures or a chart across audits; the switch on the tab row changes all three.</p>\n\n        <h4>Crawl &amp; Indexation</h4>\n        <p>\n          The share of reached pages that search engines are allowed to index, according to the crawler (this is not Google&rsquo;s own index).\n          The line below gives the pages reached, audited, the number of page types and how many pages of the site the results represent.\n          <strong>Details</strong> lists the pages that cannot be indexed and why: noindex, canonical pointing elsewhere, blocked by robots.txt,\n          redirect, error and so on. Orphan pages are listed here too.\n        </p>\n\n        <h4>Page Status</h4>\n        <p>\n          How the pages answered: <strong>Accessible</strong> (2xx), <strong>Redirecting</strong> (3xx), <strong>Blocked</strong> (401, 403, 429 or\n          disallowed by robots.txt), <strong>Missing</strong> (404, 410), <strong>Error</strong> (5xx and other 4xx) and <strong>Unreachable</strong>\n          (no answer).\n        </p>\n\n        <h4>Page Speed Timing</h4>\n        <p>\n          Loading times measured by the Poliris crawler in a desktop browser: a performance score and the main vitals. <strong>Details</strong>\n          lists the five vitals with their rating.\n        </p>\n        <table>\n          <thead><tr><th>Vital</th><th>Good</th><th>Poor</th></tr></thead>\n          <tbody>\n            <tr><td>LCP, largest content shown</td><td>2.5 s or less</td><td>4 s or more</td></tr>\n            <tr><td>INP, reaction to a click</td><td>200 ms or less</td><td>500 ms or more</td></tr>\n            <tr><td>CLS, layout shift</td><td>0.1 or less</td><td>0.25 or more</td></tr>\n            <tr><td>FCP, first content shown</td><td>1.8 s or less</td><td>3 s or more</td></tr>\n            <tr><td>TTFB, server response</td><td>0.8 s or less</td><td>1.8 s or more</td></tr>\n          </tbody>\n        </table>\n        <p>\n          INP needs a real interaction and is often <em>Not measured</em> in a crawl. The performance score is hidden when too few timing checks could be measured. Mobile timings are not measured.\n        </p>\n\n        <h4>Site Health Pipeline</h4>\n        <p>\n          One score per stage: Page Access, Content Access and Content Quality. Together they make the site&rsquo;s <strong>health score</strong>.\n        </p>\n        <p>\n          The first stage that holds the site back gets a bottleneck label, such as <em>Crawl bottleneck</em> or <em>Low content quality</em>, and the stages after it read\n          <em>Capped by</em> that stage: fixing a later stage helps little while an earlier one is blocking. Use <strong>Filter scores by page type</strong>\n          to see the pipeline for one type of page. Below, the three main issues of each stage are listed.\n          Click a stage or an issue to open it in the Issues tab.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S24\"><img src=\"/docs/images/s24-health-pipeline.webp\" alt=\"The pipeline shows which stage limits the others.\" width=\"1604\" height=\"674\" loading=\"lazy\" /><figcaption>The pipeline shows which stage limits the others.</figcaption></figure>\n\n        <h4>Health Score Evolution and Issues Overview</h4>\n        <p>\n          The health score (or the number of issues) across audits, and the total number of issues split into <strong>Critical</strong>,\n          <strong>Warning</strong> and <strong>Notice</strong> with the change since the previous audit. If earlier audits of the site used a different page limit,\n          the history starts at the current limit and the change since the previous audit is hidden.\n        </p>\n\n        <h4>Sitemap test</h4>\n        <p>\n          How search engines discover your pages: the number of URLs in your sitemap, an estimate of the URLs with problems (redirects, missing pages,\n          errors, noindex, canonical elsewhere), the audited pages that are in the sitemap and the orphan pages. <strong>View Full Report</strong>\n          lists the results of the sitemap tests.\n        </p>\n\n        <h4>Robots.txt test</h4>\n        <p>\n          Pages allowed and blocked by your robots.txt, and <strong>AI Crawler Access</strong>: whether the crawlers of ChatGPT, Claude, Gemini, Mistral\n          and Perplexity may read your site. A blocked AI crawler cannot use your pages in its answers.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S25\"><img src=\"/docs/images/s25-sitemap-robots.webp\" alt=\"The Sitemap and Robots.txt cards, with AI crawler access.\" width=\"1609\" height=\"706\" loading=\"lazy\" /><figcaption>The Sitemap and Robots.txt cards, with AI crawler access.</figcaption></figure>\n\n        <h4>Connected Services</h4>\n        <p>\n          With Google Search Console connected: <strong>Total Visitors</strong> from search with the split by device, and <strong>Geography</strong>.\n          With Google Analytics connected: <strong>Traffic Sources</strong> (Search, Direct, Social, Paid and GEO, the visits coming from AI assistants).\n          Until a service is connected, its card is blurred with a <strong>Connect</strong> button. See <a href=\"#integration-gsc\">Google Search Console and Analytics</a>.\n        </p>"
      },
      {
        "id": "tech-issues-tab-1",
        "title": "Issues",
        "html": "<p class=\"lede\">\n          The Issues tab is the list of everything the audit found, test by test, with the pages affected.\n        </p>\n\n        <h3>Navigating the tests</h3>\n        <p>\n          The left column lists <strong>All Issues</strong>, then the three stages with their score and a colored dot (green, amber or red), then the categories of each stage with a score bar. Click a stage or a category to narrow the list.\n        </p>\n        <p>\n          The header of the list shows the score of the selection, how many tests are compliant, the split by severity, and the movement since the\n          previous crawl: <em>Fixed since last crawl</em>, <em>New this crawl</em> and <em>Net change</em>, counted in pages.\n        </p>\n\n        <h3>The issues table</h3>\n        <table>\n          <thead><tr><th>Column</th><th>What it shows</th></tr></thead>\n          <tbody>\n            <tr><td>Issue</td><td>The name of the test and its stage.</td></tr>\n            <tr><td>Category</td><td>The category of the test, such as Page Title or Sitemap.</td></tr>\n            <tr><td>Status</td><td>Critical, Warning, Notice, or Compliant when no page fails.</td></tr>\n            <tr><td>Pages affected</td><td>Failing pages out of the pages tested.</td></tr>\n            <tr><td>Change</td><td>The difference in pages affected since the previous crawl.</td></tr>\n          </tbody>\n        </table>\n        <p>\n          Filter by severity with the pills, search a test or a category, and download the list as CSV or Excel with <strong>Export</strong>.\n          Click a row to open it: the recommendation, the description of the test, and the <strong>Affected links</strong> table with each page,\n          its type and its importance. Sort by importance to fix the pages that matter most first. The page URL opens the live page; <strong>Details</strong> at the end of the row opens the\n          <a href=\"#page-explorer-report\">test details</a> of the page on this test.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S26\"><img src=\"/docs/images/s26-issues-tab.webp\" alt=\"The Issues tab, with one test opened.\" width=\"1640\" height=\"1023\" loading=\"lazy\" /><figcaption>The Issues tab, with one test opened.</figcaption></figure>\n\n        <h3>Severity</h3>\n        <ul>\n          <li><span class=\"badge sev-critical\">Critical</span> blocks crawlers or AI tools from reaching, reading or trusting the page. Fix it first.</li>\n          <li><span class=\"badge sev-warning\">Warning</span> hurts performance or coverage without blocking it.</li>\n          <li><span class=\"badge sev-notice\">Notice</span> is a recommendation or a detail.</li>\n        </ul>\n        <p>\n          Each test has a default severity.\n        </p>"
      },
      {
        "id": "feature-technical-page-explorer-1",
        "title": "Page Explorer",
        "html": "<p class=\"lede\">\n          Page Explorer lists every audited page with its scores, so you can find the pages that need work and open their report.\n        </p>\n\n        <ul class=\"explorer-stats\">\n          <li class=\"stat-total\"><span class=\"stat-label\">Analyzed Pages</span><span class=\"stat-meta\">Pages that loaded normally and got every test</span></li>\n          <li class=\"stat-healthy\"><span class=\"stat-label\">Healthy pages</span><span class=\"stat-meta\">score 80 or more</span></li>\n          <li class=\"stat-issues\"><span class=\"stat-label\">Pages with issues</span><span class=\"stat-meta\">score 50 to 79</span></li>\n          <li class=\"stat-critical\"><span class=\"stat-label\">Critical pages</span><span class=\"stat-meta\">score below 50</span></li>\n        </ul>\n        <p>The four cards at the top also act as filters on the table.</p>\n\n        <h3>Page details</h3>\n        <p>The table has one row per page:</p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Link</span><span class=\"def-desc\">The page title opens its report; the URL below opens the live page.</span></li>\n          <li><span class=\"def-term\">Global Score</span><span class=\"def-desc\">The page score, shown in green, amber or red.</span></li>\n          <li><span class=\"def-term\">Details</span><span class=\"def-desc\">Three squares for the three stages. Grey means the stage was skipped, for example on a redirect.</span></li>\n          <li><span class=\"def-term\">Category columns</span><span class=\"def-desc\">The score of each test category, grouped by stage.</span></li>\n          <li><span class=\"def-term\">Page importance</span><span class=\"def-desc\">From 0 to 100: how much the page matters within your site. Fix the most important pages first.</span></li>\n          <li><span class=\"def-term\">Status and Indexability</span><span class=\"def-desc\">The HTTP status and whether the page can be indexed (Indexable, Noindex, Blocked by robots.txt, Non-Canonical, Redirected).</span></li>\n          <li><span class=\"def-term\">Page Type</span><span class=\"def-desc\">Home page, landing page, article, product page, category page, service page, contact page, about page, utility or legal page. A page found only in the sitemap is marked as an orphan page.</span></li>\n          <li><span class=\"def-term\">Page speed insight</span><span class=\"def-desc\"><em>Measured</em> when the page was loaded in a browser, <em>From template</em> when it uses the timings of a page with the same template.</span></li>\n        </ul>\n        <p>\n          <strong>Manage Column</strong> shows, hides and reorders columns. <strong>Sort &amp; Filter</strong> sorts by score or importance and filters on score ranges.\n          Active filters appear as chips you can remove.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S27\"><img src=\"/docs/images/s27-page-explorer.webp\" alt=\"Page Explorer lists every audited page.\" width=\"1640\" height=\"1073\" loading=\"lazy\" /><figcaption>Page Explorer lists every audited page.</figcaption></figure>\n\n        <h3>Priority map</h3>\n        <p>\n          Each bubble is a page, placed by its score (horizontal) and its importance (vertical). The pages in the top left are important and in poor\n          health: fixing them has the most effect. Click a bubble to open the page report.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S28\"><img src=\"/docs/images/s28-priority-map.webp\" alt=\"The Priority map: important pages with a low score come first.\" width=\"1640\" height=\"858\" loading=\"lazy\" /><figcaption>The Priority map: important pages with a low score come first.</figcaption></figure>"
      },
      {
        "id": "page-explorer-report-1",
        "title": "Page report",
        "html": "<p class=\"lede\">\n          The page report shows the audit of one URL. It has two tabs: <strong>Page Overview</strong> and <strong>Test details</strong>.\n        </p>\n\n        <h3>Page Overview</h3>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Indexability</span><span class=\"def-desc\">Whether the page can be indexed and, if not, why. It also shows the state of the canonical tag, robots rules and structured data.</span></li>\n          <li><span class=\"def-term\">Page Status</span><span class=\"def-desc\">The HTTP status, whether the page is accessible, and the date of the last crawl.</span></li>\n          <li><span class=\"def-term\">Page Speed Timing</span><span class=\"def-desc\">The timings of this page, measured on it or taken from its template.</span></li>\n          <li><span class=\"def-term\">Page Health Pipeline</span><span class=\"def-desc\">The three stage scores for this page, the bottleneck and the main issues of each stage.</span></li>\n          <li><span class=\"def-term\">Health Score Evolution and Top Issues</span><span class=\"def-desc\">The page score over audits and its issues by severity.</span></li>\n          <li><span class=\"def-term\">Connected Services</span><span class=\"def-desc\">With Search Console: clicks and impressions over time and the top queries of the page, with the share of branded searches. With Google Analytics: engagement time, bounce, scroll and active users.</span></li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S29\"><img src=\"/docs/images/s29-page-report.webp\" alt=\"The Page Overview of one URL.\" width=\"1638\" height=\"1079\" loading=\"lazy\" /><figcaption>The Page Overview of one URL.</figcaption></figure>\n\n        <h3>Test details</h3>\n        <p>\n          Every test run on the page with its result: Passed, Failed, Skipped, or <em>Not evaluated</em> when the test could not run during this audit.\n          Open a failing test to read the assessment and the recommendation, the values found on the page (for example the title and its length)\n          and the items to fix (for example the images without alt text). The header compares the page score with the site average.\n        </p>\n        <p>\n          When a fix can be prepared automatically, an <strong>Implement Fix</strong> button sends you to <a href=\"#feature-implementation\">Implementation</a> with the test selected.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S30\"><img src=\"/docs/images/s30-test-details.webp\" alt=\"Test details: the result of each test on this page.\" width=\"1614\" height=\"910\" loading=\"lazy\" /><figcaption>Test details: the result of each test on this page.</figcaption></figure>"
      },
      {
        "id": "feature-keywords-1",
        "title": "Keywords",
        "html": "<p class=\"lede\">\n          The Keywords tools look at classic Google search: where your site ranks, which searches you could win, and how your positions move.\n          They sit under <strong>MEASURE &rsaquo; Keywords</strong>, with three tabs.\n        </p>\n\n        <h3>Keyword Audit</h3>\n        <p>\n          Where your site ranks and where it does not, how positions move, which pages competitors hold, and the gaps between what AI assistants\n          answer and what Google ranks on each topic. Keywords are grouped by position band and by how winnable they are (easy, realistic, a stretch).\n          Switch between <strong>All keywords</strong> and <strong>By product</strong>. A scan runs when you start it from the page and uses credits.\n        </p>\n\n        <h3>Keyword Research</h3>\n        <p>\n          Start from up to five seed terms and choose a mode: expand a head term, find adjacent searches, or measure the demand inside AI assistants\n          with its trend over 12 months. The cost is shown before you click <strong>Run</strong>. Send the results to Content Generation or follow them in the tracker.\n        </p>\n\n        <h3>Keyword Tracker</h3>\n        <p>\n          A list of up to 100 keywords per market whose Google position is checked every Monday. The tracker shows your position, its movement and\n          which competitor is ahead. A check that fails is shown as <em>not checked</em> rather than as a drop.\n        </p>"
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
    "intro": "<p class=\"lede\">\n          The list of every test the Poliris crawler runs, grouped by stage and category. Each entry gives what the test checks, why it matters,\n          what happens when it fails and how to fix it. These are the same texts you see in the Issues tab.\n        </p>\n\n        <ul class=\"tests-stats tests-stats-4\">\n          <li><span class=\"stat-num\">151</span><span class=\"stat-label\">Tests</span></li>\n          <li><span class=\"stat-num\">118</span><span class=\"stat-label\">Page level</span></li>\n          <li><span class=\"stat-num\">33</span><span class=\"stat-label\">Site level</span></li>\n          <li><span class=\"stat-num\">23</span><span class=\"stat-label\">Critical by default</span></li>\n        </ul>",
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
      "html": "<div class=\"tests-legend\">\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Severity</span>\n            <div class=\"legend-row\"><span class=\"badge sev-critical\">Critical</span><span>Fix as soon as possible</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-warning\">Warning</span><span>Plan a fix soon</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-notice\">Notice</span><span>Minor issue or recommendation</span></div>\n            <div class=\"legend-row\"><span class=\"badge sev-mixed\">Graded</span><span>Severity depends on how many items fail on the page</span></div>\n          </div>\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Level</span>\n            <div class=\"legend-row\"><span class=\"badge lvl-page\">Page level</span><span>Runs on each audited page</span></div>\n            <div class=\"legend-row\"><span class=\"badge lvl-site\">Site level</span><span>Runs once for the site (robots.txt, sitemap, domain)</span></div>\n          </div>\n          <div class=\"legend-group\">\n            <span class=\"legend-label\">Method</span>\n            <div class=\"legend-row\"><span class=\"badge ai-yes\">AI-evaluated</span><span>Judged by an AI model, on the 100 most important pages</span></div>\n          </div>\n        </div>\n\n        <div class=\"callout info\">\n          <strong>When a test does not run.</strong> A redirecting URL only runs the redirect tests. A page that could not be fetched only runs the Page URL tests.\n          Content Quality tests are not run on utility, legal and HTML sitemap pages. Some tests depend on others: for example, structured data tests are\n          skipped on a page without structured data. In the Test details tab, these tests appear as <em>Skipped</em>.\n        </div>\n\n        <ul class=\"tests-toc\">\n          <li><a href=\"#tests-page-access\"><span class=\"toc-title\">Page Access</span><span class=\"toc-count\">81 tests in 9 categories</span></a></li>\n          <li><a href=\"#tests-content-access\"><span class=\"toc-title\">Content Access</span><span class=\"toc-count\">54 tests in 10 categories</span></a></li>\n          <li><a href=\"#tests-content-quality\"><span class=\"toc-title\">Content Quality</span><span class=\"toc-count\">16 tests in 4 categories</span></a></li>\n        </ul>"
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
                "checks": "Verifies that the &quot;Master&quot; URL specified in your canonical tag is actually eligible to be indexed by search engines.",
                "why": "This test verifies that the &quot;Master&quot; URL specified in your canonical tag is actually eligible to be indexed by search engines. In SEO, pointing a canonical to a non-indexable page is a &quot;Signal Conflic&quot;&#x27; that breaks your site&#x27;s authority. For AI agents, this is a &quot;Ground Truth Paradox&quot;: the agent cannot verify your preferred data source if that source is marked as private or restricted.",
                "fails": "When you instruct Google to consolidate all &quot;link juice&quot; into a page that it isn&#x27;t allowed to index, Googlebot triggers a Logic Error. It will often ignore your canonical tag entirely and guess which page should be the master. This leads to Ranking Fragmentation, where your traffic is split across multiple weak URLs instead of one strong, authoritative page. AI scrapers rely on the canonical tag to identify the &quot;Definitive Version&quot; of your expertise. If the canonical points to a non-indexable URL, the AI triggers a &quot;Data Verification Failure.&quot; To avoid ingesting unofficial content, the agent may skip the page entirely, leaving your &quot;Expert Sentiment&quot; out of AI-generated summaries and answers.",
                "fix": "Audit Your Targets: Check the destination URL of your canonical tags. Ensure that the target page does NOT contain a noindex tag and is NOT blocked in your robots.txt file. Match Status Codes: The canonical target must return a 200 OK status code. If it redirects or returns a 404, the canonical signal is broken. Align Meta Robots: Ensure your page-level instructions are in sync. If a page is meant to be the &quot;master,&quot; it must be both indexable and canonicalized to itself. By maintaining Canonical Logic Integrity, you ensure a clear path of authority for both search engines and AI agents."
              },
              {
                "id": "test-canonical_link_fragments",
                "title": "Canonical Link Fragments",
                "checks": "Checks if your Canonical Tags contain a &quot;URL Fragment&quot;.",
                "why": "This test checks if your Canonical Tags contain a &quot;URL Fragment&quot;. In SEO, search engines ignore fragments when deciding which page to index. For AI agents, this is a &quot;Data Anchor&quot; issue. Adding a fragment can make the agent think the content is only a small piece of a page rather than the whole authoritative source.",
                "fails": "A canonical tag is supposed to point to the &quot;Clean version&quot; of a URL. If you include a fragment (e.g., yoursite.com/page#section1), Google will typically strip the fragment away. However, it can lead to Indexing Inconsistency, where Google isn&#x27;t sure if you want the whole page indexed or just that specific section, potentially weakening the ranking power of the overall URL. AI scrapers use URLs as unique IDs in their &quot;knowledge graphs.&quot; If your &quot;Master link&quot; includes a fragment, the AI may trigger a &quot;Duplicate ID Error.&quot; It might end up treating &quot;page#section1&quot; and &quot;page#section2&quot; as two different pages, causing it to over-read your site and potentially dilute your &quot;Expert Sentiment&quot; across multiple fragmented entries.",
                "fix": "Strip the Fragments: Ensure your canonical tags point to the base URL only (e.g., https://example.com/services/ instead of https://example.com/services/#consulting). Use Absolute Paths: Always use the full website address in your canonical tags to avoid any guessing by the bots. Check Social/Jump Links: Sometimes, SEO plugins accidentally grab a &quot;Jump Link&quot; from a table of contents and turn it into the canonical. Ensure your software is set to use the primary page URL only."
              },
              {
                "id": "test-canonical_link_indexability",
                "title": "Canonical Link Indexability",
                "checks": "Verifies that the destination of your Canonical tag is an indexable, live page.",
                "why": "This test verifies that the destination of your Canonical tag is an indexable, live page. A Canonical tag&#x27;s purpose is to pass authority, if it points to a page that is blocked by robots.txt, marked as &quot;noindex&quot;, or returning an error (404/500), the signal is broken.",
                "fails": "The page contains an &quot;Invalid Authority Path.&quot; By pointing your canonical link to a non-indexable page, you are effectively telling search engines: &quot;The master version of this content is a page you aren&#x27;t allowed to see.&quot; This signal conflict confuses indexing algorithms, often causing them to ignore your preferred URL and pick a random, less-optimized version instead.",
                "fix": "Audit the destination URL listed in your Canonical tag. Ensure the target page returns a 200 OK status code and does not contain a &quot;noindex&quot; meta tag."
              },
              {
                "id": "test-canonical_match",
                "title": "Canonical Match",
                "checks": "Confirms that the page’s Canonical tag points to itself (Self-Referencing).",
                "why": "This test confirms that the page’s Canonical tag points to itself (Self-Referencing).",
                "fails": "The page has a &quot;Mismatched Identity.&quot; This happens when a page accidentally points its canonical tag to a different URL (like the homepage or an older version). This is a &quot;De-indexing Trigger&quot;: you are telling search engines NOT to rank the current page. As a result, this page will likely disappear from search results, and its SEO value will be sent elsewhere, making the content invisible to searchers.",
                "fix": "Update the Canonical tag so that it matches the current page&#x27;s full URL exactly"
              },
              {
                "id": "test-canonical_singularity",
                "title": "Canonical Singularity",
                "checks": "Verifies that the page contains exactly one canonical tag.",
                "why": "This test verifies that the page contains exactly one canonical tag. While having one is essential, having two or more creates a logic error. When a search engine encounters multiple canonical instructions, it typically ignores all of them and reverts to its own &quot;guessing&quot; logic, which often leads to the wrong version of your page being indexed.",
                "fails": "Detected &quot;Canonical Redundancy.&quot; Multiple rel=&quot;canonical&quot; tags are present, likely caused by overlapping SEO tools. This ambiguity triggers Indexing Instability, where search engines may de-rank the page due to conflicting master URL declarations. For 2026 AI scrapers, this creates an &quot;Ambiguity Loop&quot; that blocks the page from being verified as a primary reference.",
                "fix": "Audit the page&#x27;s &lt;head&gt; and remove any duplicate &lt;link rel=&quot;canonical&quot;&gt; entries. Ensure that only one tag exists and that it points to the correct, absolute URL of the page."
              },
              {
                "id": "test-canonical_syntax",
                "title": "Canonical Syntax",
                "checks": "Checks for non-standard or &quot;illegal&quot; attributes inside the Canonical tag.",
                "why": "This test checks for non-standard or &quot;illegal&quot; attributes inside the Canonical tag. A Canonical tag should only contain the destination URL. In SEO, adding extra attributes like rel=&#x27;noindex&#x27; inside a canonical tag is an invalid implementation. For AI agents, this is a &quot;Logic Syntax Error&quot;: the agent cannot process the instruction if the &#x27;Master Link&#x27; code is technically malformed.",
                "fails": "When Google encounters an invalid attribute inside a canonical tag, it often treats the entire tag as Broken. This means your a&quot;Master&quot; signal is lost. If you have five versions of a page and the canonical is ignored, Google might index the &quot;junk&quot; version (like a search results page or a session ID URL) instead of your clean, high-value page. AI scrapers rely on &quot;Strict Parsing.&quot; If they see an attribute they don&#x27;t recognize inside a canonical tag, they may trigger a &quot;Processing Exception.&quot; To avoid ingesting incorrect&#x27;data, the AI agent might skip the page entirely, preventing your &quot;Expert Sentiment&quot; from being used in AI-generated answers and summaries.",
                "fix": "Clean the Tag: Ensure your canonical tags look exactly like this: &lt;link rel=&#x27;canonical&#x27; href=&#x27;https://example.com/page/&#x27; /&gt;. Separate Your Instructions: If you need to tell a bot not to index a page, use a separate Meta Robots tag. Never try to combine &quot;noindex&quot; or &quot;nofollow&quot; inside the canonical link itself. Audit Automated Tools: Some older SEO plugins or custom scripts accidentally inject &quot;tracking&quot; attributes into the canonical tag. Ensure your code generation is clean and follows modern W3C standards."
              },
              {
                "id": "test-canonical_url_declaration",
                "title": "Canonical URL Declaration",
                "checks": "Checks for the presence of a Canonical Link in the page&#x27;s &lt;head&gt;.",
                "why": "This test checks for the presence of a Canonical Link in the page&#x27;s &lt;head&gt;.",
                "fails": "The page lacks a &quot;Technical Identity Signature.&quot; Without a canonical declaration, search engines may treat minor URL variations (like example.com/page?ref=social) as entirely separate pages. This leads to &quot;Authority Dilution,&quot; where your SEO strength is split across several versions of the same content, preventing the page from reaching its full ranking potential and confusing AI agents trying to find the primary source.",
                "fix": "Implement a self-referencing canonical tag within the &lt;head&gt; section of the HTML. The tag should look like this: &lt;link rel=&quot;canonical&quot; href=&quot;https://poliris.io/exact-page-path/&quot; /&gt;. Ensure every page on the site points to its own preferred Master address."
              },
              {
                "id": "test-site_noncanonical_pages",
                "title": "Non-canonical Pages Found",
                "checks": "Reports checked URLs that resolve to a different canonical page.",
                "why": "Reports URLs that were excluded from the page audit because their canonical declaration points elsewhere or conflicts.",
                "fails": "Non-canonical URLs can waste search-engine crawl budget and split indexing signals even though they should not be audited as independent pages.",
                "fix": "Update internal links and sitemap entries to point directly to each preferred canonical URL, then remove conflicting canonical declarations."
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
                "checks": "Ensures that any URL that does not exist on your server correctly returns a &quot;4xx status code&quot; (usually a 404: Not Found).",
                "why": "This test ensures that any URL that does not exist on your server correctly returns a &quot;4xx status code&quot; (usually a 404: Not Found). In SEO, this prevents search engines from indexing &quot;ghost&quot; pages. For AI agents, this is a &quot;Data Integrity&quot; signal: it tells the machine exactly where your content ends so it doesn&#x27;t waste resources trying to learn from non-existent data.",
                "fails": "If a broken link returns a &quot;200 OK&quot; (meaning the page is fine) but shows a &quot;Page Not Found&quot; message, Google gets confused. This is called a &quot;Soft 404.&quot; Google will continue to crawl these dead pages, wasting your Crawl Budget and potentially lowering the overall ranking of your real content because your site looks messy and poorly maintained. AI scrapers prioritize &quot;Information Density.&quot; If an AI agent hits a broken link that doesn&#x27;t return a 404, it might accidentally index the text on your error page as if it were part of your main content. This leads to Knowledge Pollution, where the AI associates your brand with &quot;Page Not Found&quot; errors instead of your &quot;Expert Sentiment.&quot; This lowers your scrapability score because the machine cannot trust your server&#x27;s signals.",
                "fix": "Configure your server to handle missing data with technical precision: Correct Headers: Ensure your server is set to return a true 404 (Not Found) or 410 (Gone) status code for any URL that doesn&#x27;t exist. Custom 404 Page: Create a helpful, branded 404 page that directs users back to your active content, but ensure the underlying code still reports a 404 error to the bots. Monitor Crawl Errors: Regularly check your Search Console for &quot;Soft 404&quot; warnings to keep your site&#x27;s roadmap clean."
              },
              {
                "id": "test-content_security_authority",
                "title": "Content Security Authority",
                "checks": "Checks your server headers for a defined &quot;Content-Security-Policy.&quot; In SEO, a secure site is a trusted site: Google rewards domains that prioritize user safety.",
                "why": "This test audits your server headers for a defined &quot;Content-Security-Policy.&quot; In SEO, a secure site is a trusted site: Google rewards domains that prioritize user safety. For AI agents, this header acts as a &quot;Data Integrity Shield,&quot; it proves that the content the agent is scraping hasn&#x27;t been tampered with by a third-party script.",
                "fails": "Without a CSP, your site is an open target for Cross-Site Scripting (XSS) and Clickjacking. If a hacker injects spammy links or redirects into your code, search engines will quickly flag your site as compromised. AI scrapers are highly sensitive to &quot;Malicious Code Injection.&quot; If an AI detects unauthorized third-party scripts running on your page, it triggers a &quot;Safety Quarantine&quot;: the AI will stop ingesting your &quot;Expert Sentiment.&quot;",
                "fix": "Deploy a robust CSP header to lock down your site&#x27;s permissions: Define Trusted Sources: Explicitly list which domains are allowed to load scripts (e.g., your own domain, Google Analytics, etc.). Start with &quot;Report-Only&quot;: If you&#x27;ve never used a CSP, start in Content-Security-Policy-Report-Only mode. This allows you to see what would be blocked without actually breaking your site."
              },
              {
                "id": "test-favicon_presence",
                "title": "Favicon Presence",
                "checks": "Checks for the presence of a favicon (frequently a favicon.ico or a linked PNG).",
                "why": "This test checks for the presence of a favicon (frequently a favicon.ico or a linked PNG). In SEO, Google now displays favicons next to search results on both mobile and desktop, they are a key driver of visual trust. For AI agents, the favicon acts as a brand signature that helps identify the source of data in multi-source AI summaries.",
                "fails": "When your site lacks a favicon, search engines display a generic &quot;globe&quot; icon next to your listing. This looks untrustworthy and significantly lowers your Click-Through Rate (CTR). When an AI cites your content, the lack of a visual brand anchor makes your information look less official compared to competitors who have a clearly defined visual identity.",
                "fix": "Establish a clear visual signature for your domain: Standard Formatting: Use a 32x32 or 48x48 pixel icon. Provide it in multiple formats (ICO, PNG, and SVG) for cross-browser compatibility. Ensure the icon is legible even when shrunk to 16x16 pixels in a browser tab."
              },
              {
                "id": "test-master_version",
                "title": "Master Version",
                "checks": "Checks whether all versions of your domain (WWW vs. non-WWW, HTTP vs. HTTPS)",
                "why": "This test audits whether all versions of your domain (WWW vs. non-WWW, HTTP vs. HTTPS) consolidate into a single, master URL. In SEO, this prevents &quot;Keyword Cannibalization&quot; where your own pages compete against each other. For AI agents, this is a &quot;Deduplication Signal&quot; that ensures the scraper only processes your data once, at the correct address.&quot;",
                "fails": "Your ranking power is split in half. Instead of one strong page, you have two medium ones. This dilutes your authority and makes it harder to reach the first page of search results. This creates &quot;Path Ambiguity&quot;: If the AI sees two versions of your site, it may get confused about which one is the &quot;Source of Truth.&quot; This can lead to your content being ignored or labeled as duplicate across different AI summaries.",
                "fix": "Force a single &quot;Canonical&quot; identity for your entire domain: Choose Your Master: Decide whether you want to use www or non-www (in 2026, most modern brands prefer the shorter https://domain.com). Server-Side Redirects: Use a 301 (Permanent) Redirect to funnel all other three variants into your chosen master URL. Canonical Tags: Ensure every page has a rel=&quot;canonical&quot; tag in the HTML that matches the master URL structure exactly. By unifying your domain, you create a &quot;Singular Access Point&quot; that consolidates all your brand’s power into one address."
              },
              {
                "id": "test-secure_redirects",
                "title": "Secure Redirects",
                "checks": "Checks whether your server automatically pushes users from the &quot;insecure http://&quot; protocol to the secure &quot;https:// version.&quot; In SEO, this prevents duplicate content issues between two versions of the same site.",
                "why": "This test audits whether your server automatically pushes users from the &quot;insecure http://&quot; protocol to the secure &quot;https:// version.&quot; In SEO, this prevents duplicate content issues between two versions of the same site. For AI agents, this is a &quot;Trust Handshake&quot; that ensures the scraper is always communicating over a verified, tamper-proof connection.",
                "fails": "Without this redirect, search engines might see two separate versions of your site: one secure and one not. This leads to Authority Dilution, where your &quot;link juice&quot; and rankings are split between two URLs. The AI may stop the crawl to avoid ingesting potentially hijacked or manipulated data. This keeps your content out of the AI &quot;Knowledge Graph&quot; because the machine cannot verify that you are who you say you are.",
                "fix": "Server-Level 301: Use your .htaccess (Apache) or nginx.conf file to set up a permanent 301 Redirect. This tells search engines, &quot;the secure version is the only one that matters.&quot; Canonical Consistency: Ensure your rel=&quot;canonical&quot; tags all point to the &quot;https:// version.&quot; HSTS Implementation: Consider enabling HTTP Strict Transport Security (HSTS), which tells browsers to only ever try to connect to your site via HTTPS in the future."
              },
              {
                "id": "test-ssl_validator",
                "title": "SSL Validator",
                "checks": "Verifies that your website uses a valid SSL/TLS certificate to encrypt the connection between your server and the visitor.",
                "why": "This test verifies that your website uses a valid SSL/TLS certificate to encrypt the connection between your server and the visitor. In SEO, HTTPS is a confirmed ranking signal and a requirement for a professional web presence. For AI agents, this is a &quot;Safety Filter&quot;: secure protocols are required for the agent to safely ingest and store your data.",
                "fails": "Google Chrome and other browsers will display a &quot;Not Secure&quot; warning to users before they even see your content. This leads to an immediate &quot;Bounce Rate&quot; spike, as users flee the site out of fear. Furthermore, Google&#x27;s algorithm penalizes non-secure sites, pushing them to the bottom of the rankings in favor of encrypted competitors. Many AI scrapers operate under &quot;Strict Security Policies.&quot; If your site lacks a valid SSL, the AI triggers an Access Block. To prevent &quot;data poisoning&quot; or security leaks, the AI may be programmed to skip non-secure domains entirely.",
                "fix": "You must secure your domain with a modern SSL certificate: Install a Certificate Enforce HTTPS: Set up a permanent 301 Redirect so that any visitor trying to access the &quot;http://&quot; version of your site is automatically moved to the secure &quot;https://&quot; version. Update Internal Links: Ensure all your internal links, images, and scripts also use HTTPS to avoid &quot;Mixed Content&quot; errors. By securing your site, you provide a &quot;Protected Path&quot; that both users and AI agents can navigate with total confidence."
              }
            ]
          },
          {
            "id": "links",
            "title": "Links",
            "tests": [
              {
                "id": "test-external_link_authority",
                "title": "External Link Authority",
                "checks": "Monitors the number of links pointing to external domains.",
                "why": "This test monitors the number of links pointing to external domains. While citing sources is important for credibility, exceeding 20 external links on a single page can negatively impact your &quot;Authority Retention.&quot;",
                "fails": "The page is suffering from &quot;Authority Leakage.&quot; When a page has 20+ external links, the &quot;Sentiment&quot; shifts from being an Expert to being a Curator. For an AI agent, this creates a Knowledge Gap.",
                "fix": "Audit the external link profile of the page. Consolidate citations into a &quot;References&quot; section or move them to a dedicated resources page. Use internal linking to keep users and AI agents within your own &quot;Knowledge Graph&quot; for as long as possible. Ensure that any necessary external links are set to target=&quot;_blank&quot; and use appropriate rel attributes to protect your site’s security and &quot;Access integrity"
              },
              {
                "id": "test-external_link_integrity",
                "title": "External Link Integrity",
                "checks": "Identifies &quot;Dead Ends&quot; where your content points to an external URL that no longer exists (404 Error).",
                "why": "This test identifies &quot;Dead Ends&quot; where your content points to an external URL that no longer exists (404 Error).",
                "fails": "The page is suffering from &quot;External Connectivity Failure.&quot; A broken link is a high-friction event that destroys Technical Authority. For an AI agent, this is a &quot;Logic Break,&quot; the bot follows a path to verify a fact, hits a 404, and immediately downgrades the Sentiment of your page from &quot;Reliable Source&quot; to &quot;Unverified.&quot;",
                "fix": "Perform an immediate sweep of all external links. You have three options: Update the Link: Find the new, corrected URL for the resource. Replace the Link: Find a new, high-authority source that supports your claim. Remove the Link: If the resource is no longer necessary, delete the reference to clean up your site’s &quot;Discovery Map.&quot;"
              },
              {
                "id": "test-internal_link_directness",
                "title": "Internal Link Directness",
                "checks": "Redirecting internal links can slow your site and reduce PageRank flow.",
                "why": "Internal links that redirect slow down your website and may decrease the amount of PageRank passed to the linked-to pages.",
                "fails": "When a bot or user clicks a link that redirects, the browser must perform two or more requests instead of one. This lowers your TTFB (Time to First Byte) and degrades the user experience. For 2026 AI agents, these &quot;hops&quot; are costly. AI scrapers prioritize sites with Flat Architectures. If an AI bot has to follow multiple redirects to reach your content, it may deprioritize your site in its crawl queue, leading to &quot;Discovery Lag.&quot;",
                "fix": "Fix Legacy Links: Update all internal links to point directly to the final &quot;200 OK&quot; destination URL. If you have renamed a page or moved a category, do not just rely on the server redirect, log into your CMS, find the old links in your page&#x27;s HTML, and update the href attribute to the new destination. Use absolute URLs to ensure there is no ambiguity."
              },
              {
                "id": "test-internal_link_integrity",
                "title": "Internal Link Integrity",
                "checks": "Checks the functional health of your internal navigation.",
                "why": "This test audits the functional health of your internal navigation. It identifies links that point to pages on your own domain that no longer exist (404 Errors).",
                "fails": "Internal links are the &quot;Arteries&quot; of your site, when they are broken, the flow of authority and &quot;Crawl Equity&#x27; stops abruptly, leaving your site&#x27;s architecture fragmented.",
                "fix": "Perform an immediate audit of all internal 404 errors. You must: Redirect the Link: Use a 301 redirect to point the broken link to the most relevant live page. OR Update the Source: Correct the link at the source (the page it&#x27;s sitting on) to point to the new URL. OR Remove the Link: If the content is gone and no replacement exists, remove the link entirely to prevent AI agents from wasting their &quot;Crawl Budget&quot; on non-existent pages."
              },
              {
                "id": "test-link_relationship_syntax",
                "title": "Link Relationship Syntax",
                "checks": "Checks the rel attribute within your site&#x27;s HTML links.",
                "why": "This test audits the rel attribute within your site&#x27;s HTML links. These attributes act as &quot;Communication Protocols&quot; that tell search engines and AI agents exactly how to treat a connection (e.g., nofollow, sponsored, or author). Valid syntax is required for these bots to follow your instructions.",
                "fails": "When &quot;rel&quot; attributes are invalid (e.g., 17 instances of typos like no-follow or unsupported values), you are essentially giving broken directions to the AI. Instead of a clear signal, the AI encounters &quot;Semantic Friction&quot; and must use extra compute power to guess your intent.",
                "fix": "Perform a bulk audit of all outbound and internal links to identify the 17 invalid strings. Replace unsupported or misspelled values with W3C-standard attributes (e.g., correcting no-follow to nofollow) e.g rel=&quot;noopener noreferrer&quot;"
              },
              {
                "id": "test-link_volume_optimization",
                "title": "Link Volume Optimization",
                "checks": "Monitors the total number of outbound links (both internal and external) on a single page.",
                "why": "This test monitors the total number of outbound links (both internal and external) on a single page. Search engines and AI agents have a finite &quot;Crawl Budget&quot; and &quot;Authority Reservoir&quot; for any given page. When a page exceeds 500 links, the &quot;Link Equity&quot; (PageRank) passed to each individual destination becomes so diluted it is virtually non-existent.",
                "fails": "By spreading your link equity across 500+ destinations, you are telling the AI that nothing on this page is particularly important.",
                "fix": "Review the page architecture to consolidate or remove unnecessary links."
              },
              {
                "id": "test-master_canonical",
                "title": "Master Canonical",
                "checks": "Ensures every internal link on your site points directly to the &quot;Master&quot; version of a page, rather than a duplicate or a variation.",
                "why": "This test ensures every internal link on your site points directly to the &quot;Master&quot; version of a page, rather than a duplicate or a variation.",
                "fails": "Pointing to non-canonical URLs creates a &quot;Split-Signal&quot; effect. For an AI agent, this is a major hurdle in Knowledge Acquisition. The LLM encounters multiple versions of the same content and struggles to decide which one to ingest and cite. This results in &quot;Authority Dilution,&quot; where your site&#x27;s ranking power is fragmented across multiple URL variations instead of being concentrated into a single, high-visibility source of truth.",
                "fix": "Perform a site-wide crawl to identify internal links that do not match the destination&#x27;s self-referencing canonical tag. Update these links to point directly to the master URL. This ensures that 100% of your internal &quot;Link Juice&quot; and AI &quot;Discovery Effort&quot; are focused on the correct, authoritative versions of your content."
              },
              {
                "id": "test-outlink_accessibility",
                "title": "Outlink Accessibility",
                "checks": "Checks the relationship between your page content and your robots.txt file.",
                "why": "This test audits the relationship between your page content and your robots.txt file. It identifies instances where you have provided links to URLs that are explicitly &quot;Disallowed&quot; from being crawled.",
                "fails": "When you link to a disallowed page, you waste the &quot;Crawl Budget&quot; of AI agents. A bot follows the link (Access), hits the &quot;robots.txt&quot; wall, and is forced to turn back. In the 2026 AI landscape, this is a Technical Credibility Gap, it signals that your site&#x27;s architecture is fragmented.",
                "fix": "Review the robots.txt file alongside your outbound link profile. You have two choices: 1. Remove the link if the destination is truly sensitive or private. 2. Update the robots.txt to &quot;Allow&quot; crawling for those specific paths if you want that content to contribute to your site&#x27;s authority and AI-visibility."
              },
              {
                "id": "test-too_few_dofollow_internal_links",
                "title": "Too few dofollow internal links",
                "checks": "Checks whether a linked page receives at least five dofollow internal links.",
                "why": "Checks whether a linked page receives at least five dofollow internal links. Pages with no inbound internal links are covered by Orphaned Page Detection.",
                "fails": "Pages with too few dofollow in-links signal low importance to crawlers, leading to reduced crawl frequency and weaker authority flow. For AI agents, low internal link density reduces perceived reliability and discoverability, increasing the chance the page is skipped or treated as secondary.",
                "fix": "Strengthen internal linking to key pages using contextual, dofollow links from high-authority areas (nav, footer, related content). Build a clear link hierarchy so critical pages receive multiple incoming links."
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
                "checks": "Checks the nofollow directive within the meta robots tag.",
                "why": "This test audits the page for the nofollow directive within the meta robots tag. In SEO, nofollow tells search engines not to pass &quot;link juice&quot; or authority to the links on the page. For AI agents, this is a &quot;Path Block&quot;: it instructs the agent not to crawl or associate your page with the URLs it links to.",
                "fails": "If applied globally to a page, nofollow prevents search engines from discovering and ranking other pages on your site via those links, effectively &quot;starving&quot; your sub-pages of authority. AI agents use links to establish &quot;Topical Clusters.&quot; If an AI cannot follow the links on your page, it cannot verify the evidence for your Expert Sentiment found on other pages.",
                "fix": "Remove &quot;nofollow&quot; from the Meta Tag immediately. If you need to block specific paid or untrusted links, apply rel=&#x27;nofollow&#x27; to those specific links individually, rather than blocking the whole page."
              },
              {
                "id": "test-meta_robots_contradictory_status",
                "title": "Meta Robots Contradictory Status",
                "checks": "Checks conflicting instructions within the &lt;meta name=&#x27;robots&#x27;&gt; tag or between multiple robots tags.",
                "why": "This test audits the page for conflicting instructions within the &lt;meta name=&#x27;robots&#x27;&gt; tag or between multiple robots tags. For example, a page cannot be both index (please show this) and noindex (do not show this) simultaneously.",
                "fails": "Search engines typically default to the most restrictive directive to be safe. If you have both index and noindex, Google will likely de-index the page, causing a total loss of organic traffic for that URL. AI scrapers prioritize &quot;Risk Mitigation.&quot; When an agent encounters a contradiction, it flags the page as &quot;Unstable/Conflicting.&quot; Because the AI cannot verify its legal right to ingest the data, it will often trigger an &quot;Access Denied.&quot;",
                "fix": "Consolidate all crawler instructions into a single, clear directive. Audit your CMS or SEO plugins to ensure they aren&#x27;t injecting secondary, conflicting tags."
              },
              {
                "id": "test-meta_robots_deprecated_directives",
                "title": "Meta Robots Deprecated Directives",
                "checks": "Checks for the retired noodp and noydir directives, which no search engine honors.",
                "why": "This test checks for the noodp and noydir directives, which suppressed descriptions taken from the Open Directory Project and the Yahoo Directory. Google stopped honoring both in 2011 and the directories themselves have since closed, so the directives do nothing.",
                "fails": "Nothing breaks: the directives are ignored. What they signal is a robots tag copied forward from a template that predates 2011 and never audited since, so the directives that do matter on the same page are worth checking too. Leaving them also makes the tag harder to read for whoever edits it next.",
                "fix": "Delete noodp and noydir from the tag, then review the remaining directives on the same page, since a tag this old usually carries other assumptions worth revisiting."
              },
              {
                "id": "test-meta_robots_expiry_directive",
                "title": "Meta Robots Expiry Directive",
                "checks": "Checks for the unavailable_after directive, which schedules the page&#x27;s removal from the index.",
                "why": "This test checks for the unavailable_after directive in the meta robots tag or X-Robots-Tag header. The directive names a date after which the page is dropped from the search index, and it keeps working long after whoever set it has moved on.",
                "fails": "The page de-indexes itself on a date nobody is watching, and the traffic loss arrives as an unexplained drop weeks or months later. Because the directive is a scheduled instruction rather than a current state, it survives content refreshes: a page rewritten and relaunched still carries the old expiry unless the tag is removed.",
                "fix": "Remove unavailable_after from pages meant to stay indexed. It belongs only on genuinely time-boxed content such as an event or a limited offer, and the date should be reviewed whenever the page is updated."
              },
              {
                "id": "test-meta_robots_image_indexing",
                "title": "Meta Robots Image Indexing",
                "checks": "Checks for the noimageindex directive, which removes the page&#x27;s images from image search.",
                "why": "This test checks for the noimageindex directive in the meta robots tag or X-Robots-Tag header. The directive removes every image on the page from image search while leaving the page itself indexable, so the loss is invisible in ordinary rank reporting.",
                "fails": "Every image on the page leaves Google Images, and image-rich results such as product grids and recipe carousels lose their thumbnail. Multimodal AI agents lean on image data to ground a visual answer; with the images withheld the page can be read but not shown, so a competitor&#x27;s illustrated page is cited in its place.",
                "fix": "Remove noimageindex unless the images are genuinely private or licensed against reuse. If only some assets need protecting, move those to a path blocked in robots.txt rather than suppressing the whole page&#x27;s imagery."
              },
              {
                "id": "test-meta_robots_indexing_status",
                "title": "Meta Robots Indexing Status",
                "checks": "Checks for the presence of the noindex directive within the meta robots tag.",
                "why": "This test checks for the presence of the noindex directive within the meta robots tag. In SEO, noindex tells search engines to exclude the page from their search index. For AI agents, this is the &quot;De-listing Command&quot;: it ensures that the page&#x27;s data is not stored, cited, or used to generate answers for users in AI-driven search interfaces.",
                "fails": "If this tag is present on a high-value page, that page will generate zero organic traffic, as it is physically removed from the search index. Agents like ChatGPT and Gemini respect the noindex tag as a &quot;Privacy Boundary.&quot; While this protects sensitive data, if applied to your expert content, it creates a total Access Blackout. Your brand will never be cited as a source in an AI-generated summary.",
                "fix": "Verify that the noindex tag is only applied to utility pages (e.g., login screens, thank you pages, internal search results). Ensure all high-value &quot;Expert Sentiment&quot; pages are set to index to allow for maximum Content Access."
              },
              {
                "id": "test-meta_robots_location",
                "title": "Meta Robots Location",
                "checks": "This test ensures your Meta Robots directives are placed inside the &lt;head&gt; element. While search engines may sometimes tolerate tags elsewhere, proper placement follows standards, and AI scrapers often look in the header first for indexing instructions.",
                "why": "This test verifies that your Meta Robots directives are located within the &lt;head&gt; element of your HTML. In SEO, while Google is famously  forgiving and may find tags in the &lt;body&gt;, it is not a documented standard. For AI agents, this is a &quot;Parser Efficiency&quot; check. Modern AI scrapers often scan the header first and stop if they don&#x27;t find indexing instructions where they expect them.",
                "fails": "If a noindex tag is placed in the &lt;body&gt;, Googlebot usually finds it, but other search engines (like Bing or DuckDuckGo) may miss it entirely. This leads to Unintended Indexing, where private or utility pages you wanted to hide suddenly appear in search results, diluting your brand&#x27;s authority and creating &quot;thin content&quot; issues. Many AI agents use &quot;Streamlined Parsers&quot; to save on tokens. They read the first 1-2 KB of a page (the &lt;head&gt;) to decide how to handle the data. If your directives are buried deep in the &lt;body&gt;, the agent triggers a &quot;Hierarchy Exception Error.&quot; It may proceed to ingest data you intended to keep private, or it might ignore index instructions and skip your most important &quot;Expert Sentiment&quot; because it assumed the page had no directives at all.",
                "fix": "Move to the Head: Verify that all &lt;meta name=&quot;robots&quot; ...&gt; tags are placed between the opening &lt;head&gt; and closing &lt;/head&gt; tags. Place Early: For the best results, place these directives near the top of the &lt;head&gt;, before heavy CSS or JavaScript files that might cause the parser to &quot;timeout&quot; or stop reading. Audit CMS Plugins: If you use a CMS like WordPress, ensure your SEO plugin isn&#x27;t accidentally injecting tags into the footer or body of the page due to a theme conflict."
              },
              {
                "id": "test-meta_robots_protocol_and_syntax_integrity",
                "title": "Meta Robots Protocol & Syntax Integrity",
                "checks": "This test checks the &lt;meta name=&quot;robots&quot;&gt; tag for correct syntax and compatibility. In SEO, these directives control how search engines index and follow a page, while for AI systems, they act as permission headers that define what content can be scraped or ignored.",
                "why": "This test audits the &lt;meta name=&#x27;robots&#x27;&gt; tag for both syntax accuracy and protocol compatibility. In SEO, these directives (like noindex, nofollow, noarchive) tell search engines how to treat the page. For AI agents, these tags are the Permission Headers: they define the legal and technical boundaries of what the AI is allowed to scrape using a Strict Vocabulary List.",
                "fails": "If a tag is misspelled (Syntax) or uses a made-up directive like &quot;nocach&quot; (Compatibility), the instruction is ignored. This leads to Accidental Indexing, where private pages or duplicate content are exposed in public search results because the bot didn&#x27;t understand your command to stop. AI agents operate on Consent-Based Scraping. If you use proprietary or outdated tags that the agent doesn&#x27;t support, it triggers a Vocabulary Mismatch. The agent defaults to its own Scrape All policy because it doesn&#x27;t recognize your specific restriction. This results in Unintended Access, where your Expert Sentiment is ingested and processed despite your attempts to limit its use.",
                "fix": "Standardize your permissions using the industry-standard vocabulary: Validate Syntax: Ensure there are no typos, missing quotes, or conflicting instructions (e.g., having index and noindex on the same page). Use Supported Directives: Stick to the core vocabulary recognized by modern crawlers: index, noindex, follow, nofollow, noarchive, nosnippet, and max-snippet. Purge Legacy Tags: Remove unsupported or invented tags like &quot;nocache&quot; or &quot;noodp&quot;, as these create noise that can confuse AI parsers."
              },
              {
                "id": "test-meta_robots_snippet_suppression",
                "title": "Meta Robots Snippet Suppression",
                "checks": "Checks for the nosnippet directive, which strips the description text from search results.",
                "why": "This test checks for the nosnippet directive in the meta robots tag or X-Robots-Tag header. The directive tells search engines to show no description text under the result title, leaving a bare link.",
                "fails": "The result loses the two lines of text that persuade a user to click, so click-through falls even where the ranking holds. For AI agents nosnippet is an explicit instruction not to quote the page, which rules it out as a citable source: the content may be crawled, but it can never be the sentence an assistant attributes to you.",
                "fix": "Remove nosnippet from pages you want found. Where a snippet must be limited rather than removed, use max-snippet with a character budget so the result still carries persuasive text."
              },
              {
                "id": "test-meta_robots_translation_block",
                "title": "Meta Robots Translation Block",
                "checks": "Checks for the notranslate directive, which blocks search engines from translating the page.",
                "why": "This test checks for the notranslate directive in the meta robots tag or X-Robots-Tag header. The directive stops search engines offering a translation of the page, which limits it to readers of the language it was written in.",
                "fails": "The page is unreachable in practice for users searching in another language, which costs the most on a bilingual market where a single page was meant to serve both audiences. AI assistants answering in a second language will summarize a translatable competitor instead, since they cannot restate content they are told not to translate.",
                "fix": "Remove notranslate unless the wording is legally fixed, as with regulated terms or contractual language. If the page exists in several languages already, connect them with hreflang instead of blocking translation."
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
                "checks": "Verifies whether your website passes Core Web Vitals assessment.",
                "why": "This test follows Google PageSpeed Insights to assess the three Core Web Vitals: LCP, INP, and CLS. When INP is not measured, the assessment uses LCP and CLS; without LCP or CLS, it cannot be assessed.",
                "fails": "Failing this assessment is a strong signal of weak page experience. Even with strong content, users and search systems may deprioritize pages that feel slow or unstable.",
                "fix": "Track and improve LCP, INP, and CLS continuously, especially after releases. Review the separate TTFB test for server response performance."
              },
              {
                "id": "test-css_file_optimization",
                "title": "CSS File Optimization",
                "checks": "Checks if any single CSS file exceeds 300 KB.",
                "why": "This test checks if any single CSS file exceeds 300 KB. In SEO, large files are a primary cause of slow page load time. For AI agents, this is a &quot;Processing Tax&quot;: machines prefer lean, efficient code so they can quickly understand the visual structure of your site without sifting through thousands of lines of unused styling.",
                "fails": "Large CSS files create a &quot;Render Block.&quot; The browser refuses to show anything to the user until the entire CSS file is downloaded and parsed. This ruins your First Contentful Paint (FCP) score, a key part of Google&#x27;s ranking algorithm. If your FCP is slow, your rankings will drop. AI scrapers evaluate the &quot;Efficiency Score&quot; of a site. If your code is cluttered with thousands of lines of unused styling, the AI triggers a &quot;Resource Penalty.&quot; It may decide your site is too heavy to crawl frequently, causing a &quot;Discovery Lag&quot; where your newest content takes weeks to appear in AI-generated summaries.",
                "fix": "Optimize your CSS to stay under 300 KB limit. 1. Minification: Strip out all spaces, comments, and line breaks to shrink the file size. 2. CSS Purging: Identify and remove &#x27;Dead CSS&#x27;: styles that belong to old versions of your site or features you no longer use. 3. Modular Loading: Instead of one giant 500 KB file, split your CSS into smaller pieces that only load when a specific page needs them. By keeping your CSS lean, you create a High-Speed Entry for both users and AI agents."
              },
              {
                "id": "test-dom_element_size",
                "title": "DOM Element Size",
                "checks": "Counts how many individual pieces (elements) make up your webpage.",
                "why": "This test counts how many individual pieces (elements) make up your webpage. In SEO, a page with a massive &quot;skeleton&quot; takes a long time to load and can make the screen feel &quot;frozen&quot; while the browser tries to figure out where everything goes. For AI agents, a large skeleton creates &quot;Processing Clutter,&quot; it makes it harder for the machine to cut through the code and find your actual words.",
                "fails": "A huge DOM can cause the page to stutter or lag when scrolling. This is a bad user experience, and search engines like Google will notice and lower your ranking. Imagine trying to read a letter wrapped in 1,000 different envelopes. That’s what a large DOM feels like to an AI. Every &quot;envelope&quot; is a layer of code the machine must peel back to find your main content.",
                "fix": "Simplify your page layout. Avoid using nested boxes (boxes inside boxes inside boxes) where they aren&#x27;t needed. If you use a page builder (like Elementor or Divi), try to remove extra sections that don&#x27;t add value. Keeping your &quot;skeleton&quot; under 1,000 pieces ensures your page is fast and easy to read for everyone."
              },
              {
                "id": "test-fcp_speed",
                "title": "FCP Speed",
                "checks": "Measures how quickly the first visible page content appears.",
                "why": "This test measures First Contentful Paint (FCP). PageSpeed Insights reports FCP as the time until the browser renders the first text, image, SVG, or non-white canvas content.",
                "fails": "Slow FCP makes the page feel blank or stalled, increasing abandonment before users can evaluate the content.",
                "fix": "Reduce render-blocking resources, improve font loading, inline critical CSS where appropriate, and shorten server and redirect delays."
              },
              {
                "id": "test-interaction_latency_threshold",
                "title": "Interaction Latency Threshold",
                "checks": "Measures interaction latency of your pages.",
                "why": "This test measures Interaction to Next Paint (INP). A healthy threshold is 200ms or less. In SEO, this is a direct signal for responsiveness and usability.",
                "fails": "If interaction latency is high, users experience delayed responses and your site feels unresponsive. This increases abandonment and degrades search performance signals.",
                "fix": "Reduce long main-thread tasks, optimize third-party scripts, and split heavy JavaScript execution."
              },
              {
                "id": "test-js_efficiency",
                "title": "JS Efficiency",
                "checks": "Checks the size of individual JavaScript (.js) files to ensure they remain under the 300 KB threshold.",
                "why": "This test audits the size of individual JavaScript (.js) files to ensure they remain under the 300 KB threshold. In SEO, oversized scripts are the primary cause of poor &quot;Total Blocking Time&#x27;&quot;(TBT) and &quot;Interaction to Next Paint&quot; (INP) scores. For AI agents, large JS files represent &quot;Execution Bloat&quot;: they require significant CPU resources to parse and execute before the actual content can be accessed.",
                "fails": "Pages with massive JS files suffer from slow loading speeds, especially on mobile devices. Google penalizes these pages via Core Web Vitals, leading to a drop in rankings and a frustrating user experience. Many AI agents use &quot;Headless Rendering&quot; to see what a human sees. If a script is too large, the agent may trigger a &quot;Resource Budget Timeout.&quot; Instead of waiting for the script to load your expert data, the agent moves on, resulting in an &quot;Ingestion Failure.&quot; The AI &quot;sees&quot; a blank page or a loading spinner.",
                "fix": "Optimize JavaScript delivery through Code Splitting, Minification, and Compression."
              },
              {
                "id": "test-layout_responsiveness",
                "title": "Layout Responsiveness",
                "checks": "Measures the Cumulative Layout Shift (CLS) of your pages.",
                "why": "This test measures the Cumulative Layout Shift (CLS) of your pages. To meet Core Web Vitals standards, your CLS score should be 0.1 or less. In SEO, this is a critical metric for &quot;Visual Delight&quot; and user retention. For AI agents, this is a &quot;Coordinate Reliability&quot; factor: it ensures that the elements the bot is trying to scrape don&#x27;t move during the rendering process.",
                "fails": "A high CLS score (above 0.1) results in a Frustration Penalty. Google’s algorithms detect when elements shift unexpectedly, which signals a low-quality user experience. This leads to lower rankings in the &quot;Page Experience&quot; category and, more importantly, a high bounce rate as users abandon a site that feels glitchy or difficult to navigate. AI scrapers often use &quot;Visual Selectors&quot; to identify specific data points (like price, author, or product specs). If a page has high CLS, the AI triggers a &quot;Target Misalignment Error.&quot; The machine may attempt to extract data from a coordinate that has shifted, leading to &quot;Corrupted Ingestion.&quot;",
                "fix": "Set Explicit Dimensions: Always include width and height attributes on images and video elements so the browser can reserve the space before they load. Reserve Space for Dynamic Content: If you have ads or embedded widgets, use a placeholder container with a fixed height so they don&#x27;t push the rest of your content down when they appear. Avoid Inserting Content Above Existing Content: Never insert new elements (like banners or newsletters) above content that has already loaded, except in response to a user action. By maintaining &quot;Visual Layout Stability,&quot; you ensure that both humans and machines can interact with your brand with total confidence."
              },
              {
                "id": "test-lcp_speed",
                "title": "LCP Speed",
                "checks": "Measures the Largest Contentful Paint (LCP) of your pages.",
                "why": "This test measures the Largest Contentful Paint (LCP) of your pages. To meet Core Web Vitals standards, LCP should occur within 2.5 seconds. In SEO, this is a primary ranking signal for user experience. For AI agents, this is the &quot;Contextual Maturity&quot; point: the moment the most significant data block is ready for extraction and processing.",
                "fails": "If your LCP exceeds 2.5 seconds, search engines flag your site as slow. This usually happens due to unoptimized hero images or heavy render-blocking scripts. Because the largest element is what users focus on most, a delay here causes immediate frustration and significantly lowers conversion rates. AI scrapers prioritize the Main Body to determine &quot;Expert Sentiment.&quot; If the largest element (often the main article or product image) loads slowly, the AI agent may trigger a &quot;Contextual Timeout.&quot; This leads to &quot;Partial Ingestion,&quot; where the AI understands your headers but misses the core data found in the main content.",
                "fix": "Optimize the LCP Element: If it&#x27;s an image, ensure it is compressed (WebP/AVIF) and use fetchpriority=&quot;high&quot; to tell the browser to grab it first. Remove Render-Blocking CSS: Ensure the styles needed for that &quot;Hero section&quot; are inlined or loaded with the highest priority."
              },
              {
                "id": "test-server_compression_status",
                "title": "Server Compression Status",
                "checks": "Checks whether your server is compressing your HTML, CSS, and JavaScript files.",
                "why": "This test audits whether your server is compressing your HTML, CSS, and JavaScript files. In SEO, compression is a primary driver of Page Load Speed, which is a core ranking signal. For AI agents, this is a &quot;Processing Incentive.&quot; Compressed sites are cheaper and faster to scrape, leading to more frequent indexing.",
                "fails": "Without compression, your files can be 70% to 90% larger than they need to be. This causes a massive delay in Time to First Byte (TTFB) and Largest Contentful Paint (LCP). AI scrapers are optimized for &quot;Resource Conservation.&quot; If your site sends uncompressed data, the AI triggers a &quot;Crawl Latency&quot; penalty. Over time, the AI will prioritize faster, compressed competitors for its real-time &quot;Knowledge Graph&quot; updates, leaving your &quot;Expert Sentiment&quot; outdated in AI-generated answers.",
                "fix": "Apply high-performance compression to HTML, CSS, JavaScript, and SVG files."
              },
              {
                "id": "test-ttfb_speed",
                "title": "TTFB Speed",
                "checks": "Measures whether the first byte of the main document arrives within 800ms.",
                "why": "This test measures Time to First Byte (TTFB), the server and network response latency before the first byte of the main document is received. A healthy threshold is 800ms or less.",
                "fails": "Slow TTFB delays every later loading milestone, including FCP and LCP, and can make pages feel slow even when frontend assets are optimized.",
                "fix": "Improve origin response time, caching, CDN routing, database queries, and redirect chains so the first byte arrives quickly."
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
                "checks": "A redirecting URL must point to a live, 200 OK page.",
                "why": "This test flags any URL that redirects to a dead or missing page (returning a 4xx or 5xx status code). In SEO, pointing a bot to a broken page creates a &quot;Black Hole&quot; for authority. For AI agents, it is a &quot;Verification Failure,&quot; as the scraper follows your explicit instructions only to find missing data, breaking trust in your site&#x27;s architecture.",
                "fails": "A broken redirect severely harms User Experience and completely wastes crawl budget. You are actively forcing search engines and AI to load an error page, which causes them to instantly drop the original URL from their knowledge graph and heavily penalize your domain&#x27;s technical health score.",
                "fix": "Find the broken redirect rule in your server settings or CMS and update the destination URL to point to a live, indexable page that returns a 200 OK status code. If the content no longer exists and has no replacement, remove the redirect entirely and let the original URL return a clean 404."
              },
              {
                "id": "test-html_file_size",
                "title": "HTML File Size",
                "checks": "Checks the total size of your raw HTML document to ensure it stays below the 1 MB limit.",
                "why": "This test audits the total size of your raw HTML document to ensure it stays below the 1 MB limit. In SEO, oversized HTML leads to &quot;Crawl Truncation&quot; where Google simply stops reading the page halfway through. For AI agents, this is a &quot;Token Efficiency&quot; issue: excessive code &quot;noise&quot; that wastes the agent&#x27;s processing budget before it can reach your actual content.",
                "fails": "Googlebot has a limit on how much of a page it will parse. If your HTML is massive (1 MB+), Google may only index the first few hundred kilobytes. If your most important Expert Sentiment or product details are at the bottom of that file, they effectively do not exist to search engines. This leads to missing rankings for key terms located deep in the code. AI tools have a budget for how much they can read at once. Every line of code uses up that budget. If your page is 90% messy code and only 10% real information, the AI might fill up its brain reading your menus and background settings. By the time it gets to your actual advice, it has no room left to learn, leading to the AI giving users shallow or wrong answers about your brand.",
                "fix": "External CSS and JS: Don&#x27;t use inline large blocks of styling or scripts. Move them to separate files so the HTML stays clean and content focused. Remove unnecessary nested &lt;div&gt; tags and comments on DOM that add weight without values."
              },
              {
                "id": "test-https_redirect_integrity",
                "title": "HTTPS Redirect Integrity",
                "checks": "Checks the destination of all redirects to ensure they utilize the HTTPS protocol.",
                "why": "This test audits the destination of all redirects to ensure they utilize the HTTPS protocol. In SEO, HTTPS is a confirmed ranking signal and a prerequisite for modern web features. For AI agents, HTTPS represents the &quot;Secure Access Layer.&quot; If a redirect points to an insecure HTTP URL, the agent may flag the link as a &quot;Security Exception&quot; and terminate the connection.",
                "fails": "Search engines like Google prioritize the secure version of the web. If your redirects point to HTTP, you are intentionally downgrading your security signal, which can lead to lower rankings. If an AI agent follows a redirect that leads to an insecure HTTP page, it will often trigger an &quot;Insecure Source&quot; warning. The AI may decide to exclude your Expert Sentiment from its synthesized answer because the &quot;Handshake&quot; was not secure.",
                "fix": "Perform a global audit of your redirect table. Ensure every 301 and 302 destination URL starts with &quot;https://.&quot; Implement HSTS (HTTP Strict Transport Security) to tell browsers and AI agents to only interact with your site over secure connections."
              },
              {
                "id": "test-multi_hop_redirect_chain",
                "title": "Multi-Hop Redirect Chain",
                "checks": "Checks that URLs do not pass through multiple consecutive redirects before reaching the final destination.",
                "why": "URLs should reach their final destination in a single redirect hop. This test identifies URLs that bounce through multiple consecutive redirects (e.g., Page A -&gt; 301 -&gt; Page B -&gt; 301 -&gt; Page C). In SEO, every hop dilutes PageRank and slows page speed. For AI agents, redirect chains can trigger a max-hop timeout and the crawler may abandon the path before reading the final page.",
                "fails": "When a bot follows multiple redirects, it repeatedly downloads new server instructions before any content is rendered. This latency penalty hurts Core Web Vitals and crawl efficiency. Search engine bots and AI crawlers also enforce redirect-hop limits; long chains can cause crawl drop-off and indexing abandonment.",
                "fix": "Audit your server&#x27;s routing rules (e.g., .htaccess, Nginx config, or CMS SEO plugin). Update the initial redirect (Page A) so that it points directly to the final, active destination (Page C). Ensure no URL requires more than a single 301 or 302 hop to load."
              },
              {
                "id": "test-pages_health_status",
                "title": "Page Health Status",
                "checks": "A healthy page should return &quot;200 status&quot; code.",
                "why": "A healthy page should return &quot;200 status&quot; code.",
                "fails": "A 200 OK status indicates a healthy, accessible URL. This successful &quot;handshake&quot; confirms the page is live and ready for full indexing. If a page fails to return this status, its visibility is compromised: 4xx/5xx errors and &quot;No Response&quot; states create total access barriers that make content invisible to search engines, leading to an immediate collapse in rankings and user trust. Furthermore, a &quot;No Response&quot; signal often suggests a critical server timeout or a bot-blocking firewall. Meanwhile, 3xx redirects introduce latency and deplete &quot;crawl budget.&quot;",
                "fix": "Status: 200 (Ok): Page is healthy, no actions required. Status: 3xx (Redirected): Ensure this redirect is a permanent 301 and not a temporary 302. Audit your internal links to point directly to the final destination URL to eliminate &#x27;Redirect Chains&#x27; and save crawl budget. Status: 4xx (Client Error/Missing): Check for typos in the URL. If the page has been permanently removed, implement a 301 redirect to the most relevant live category or product page to retain &quot;link juice.&quot; Status: 5xx (Server Error): Review your server logs immediately. This is often caused by database connection issues, plugin conflicts, or memory exhaustion. Contact your hosting provider if the issue persists across the entire site. Status: No Response (Timeout/Blocked): Verify that your server is online. If it is, check your Firewall or CDN settings (like Cloudflare) to ensure you aren&#x27;t accidentally blocking legitimate search engine or AI bot IP addresses."
              },
              {
                "id": "test-redirect_url_structure",
                "title": "Redirect URL Structure",
                "checks": "Checks the destination of your redirects to ensure they are forced to lowercase.",
                "why": "This test audits the destination of your redirects to ensure they are forced to lowercase. In SEO, inconsistent casing (e.g., mixing /About and /about) causes Duplicate Content issues and splits your ranking power across multiple URLs. For AI agents, lowercase URLs are the industry standard for &quot;Clean Pathing.&quot; Maintaining a lowercase-only environment ensures that the machine can map your site architecture without encountering case-sensitivity conflicts.",
                "fails": "If your redirects point to URLs with uppercase characters, search engines may index two versions of the same page. This confuses the &quot;Canonical Signal&quot; and forces Google to choose which version to rank. AI models use &quot;Path Hashing&quot; to remember which pages they have already scraped. If your system redirects to &quot;/Expert-Insight&quot; but your sitemap says &quot;/expert-insight,&quot; the AI agent might crawl the same content twice, or worse, flag the site for &quot;Inconsistent Data Architecture.&quot;",
                "fix": "Implement a global server-side rule (usually via .htaccess or NGINX) to force all inbound requests and redirects to lowercase. Ensure all internal links and Canonical tags match this lowercase format. This creates a &quot;Uniform Access Pattern&quot; that allows AI agents to navigate your site with 100% path certainty."
              },
              {
                "id": "test-url_slash_occurrence",
                "title": "URL Slash Occurrence",
                "checks": "Checks URLs for accidental double slashes that can create duplicate content and messy site architecture.",
                "why": "This test checks your URLs for accidental double slashes (e.g., website.com//page). While web browsers usually fix this automatically for human users, search engines and AI agents view website.com/page and website.com//page as two completely different locations. We flag this to prevent duplicate content issues and keep your site architecture perfectly clean.",
                "fails": "Having double slashes in your URLs creates accidental duplicate pages. This forces search engines to guess which version to rank, splitting your SEO power and wasting your crawl budget. For AI models, messy URLs act as structural noise. AI agents expect clean, predictable paths to map your brand&#x27;s data. When they encounter sloppy URL formatting, it lowers their overall confidence in your site&#x27;s technical quality.",
                "fix": "Set Up a Global Redirect: Create a site-wide server rule that automatically redirects (301) any URL containing a double slash to its correct single-slash version. Update Internal Links: Check your website navigation menus, XML sitemaps, and canonical tags to make sure you are not accidentally linking to the broken double-slash version anywhere on your site."
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
                "checks": "Verifies that paginated pages use regular anchor links that users, search engines, and AI bots can follow.",
                "why": "This test verifies that paginated pages are linked with regular HTML anchor tags (&lt;a href=&quot;...&quot;&gt;) so users, search engines, and AI bots can navigate to the next page in the series.",
                "fails": "Search engines and AI bots cannot click JavaScript-only buttons like a human can; they need physical link paths to follow. If pagination relies on interactive buttons instead of standard links, bots can get stuck on Page 1, leaving older articles and deep product catalogs unindexed and undiscovered by AI agents.",
                "fix": "Use Standard Links: Always use the &lt;a&gt; tag for pagination. Avoid using &#x27;buttons&#x27; that rely solely on JavaScript to load the next page, as bots may not trigger the click. Visible Navigation: Ensure your &quot;Next,&quot; &quot;Previous,&quot; and &quot;Page X&quot; links are visible in the layout. This confirms to the bot that the content is part of a deliberate, accessible series. Check for &#x27;Infinite Scroll&#x27; Conflicts: If you use infinite scroll, ensure there is still a fallback pagination system (like a noscript version or hidden standard links) so bots can still find the deeper URLs."
              },
              {
                "id": "test-hidden_pagination_code",
                "title": "Hidden Pagination Code",
                "checks": "Identifies cases where pagination URLs exist in the hidden code (like rel=&#x27;next&#x27;) but have no corresponding clickable links on the actual page.",
                "why": "This test identifies cases where pagination URLs exist in the hidden code (like rel=&#x27;next&#x27;) but have no corresponding clickable links on the actual page. In SEO, hidden attributes do not pass PageRank (ranking power). For AI agents, this is a &quot;Contextual Isolation&quot; warning, it suggests that while the pages exist, they aren&#x27;t considered important enough to show to users.",
                "fails": "If you only use pagination tags in the &lt;head&gt; but forget the visible links, PageRank stops at Page 1. Google might know Page 2 exists, but it won&#x27;t give it any &quot;strength.&quot; Consequently, the articles or products on Page 2+ will struggle to rank because they are effectively starved of the authority that should be flowing through your site. AI scrapers use &quot;Authority Weighted Ingestion.&quot; They prioritize data that is vouched for by internal links. If an AI sees a pagination URL that is unlinked, it triggers an Importance &quot;Tier Exception.&quot; It may classify that deep content as low-priority or archival only, leading to your &quot;Expert Sentiment&quot; being ignored in favor of more &quot;connected&quot; competitors.",
                "fix": "Sync Code and Content: Every URL listed in your rel=&#x27;next&#x27; and rel=&#x27;prev&#x27; tags must have a matching clickable link in your website&#x27;s footer or navigation bar. Audit for Hidden Pagination: Some themes use code to tell Google &quot;there&#x27;s more&quot; but don&#x27;t give the user a way to get there. Ensure your pagination is both &quot;Search Engine Ready&quot; and &quot;User Friendly.&quot; Check for Redirects: If your pagination tags point to a URL that immediately redirects, the PageRank is leaked and lost. Always point to the final, healthy 200 OK page."
              },
              {
                "id": "test-pagination_status_return",
                "title": "Pagination Status Return",
                "checks": "Verifies that the URLs used in your rel=&#x27;next&#x27; and rel=&#x27;prev&#x27; attributes are fully functional and return a 200 OK status code.",
                "why": "This test verifies that the URLs used in your rel=&#x27;next&#x27; and rel=&#x27;prev&#x27; attributes are fully functional and return a 200 OK status code. In SEO, these links are instructions for crawlers to discover deeper content. For AI agents, this is a &quot;Data Continuity&quot; signal, if the sequence is broken, the agent assumes the knowledge base has ended, even if there are hundreds of pages left to ingest.",
                "fails": "Search engines treat non-200 pagination URLs as errors and immediately ignore the instruction. If Page 2 points to a Page 3 that redirects (301) or is broken (404), Googlebot may stop crawling the series entirely. This leads to &quot;Archive Decay,&quot; where your older content is never recrawled or updated because the bot lost the trail in the pagination sequence. AI scrapers use &quot;Sequence Mapping&quot; to ingest large datasets efficiently. A broken link in a rel=&quot;next&quot; tag triggers a &quot;Traversal Exception Error.&quot; Rather than trying to guess where the next page is, the AI agent will finalize its ingestion at the break point. This results in &quot;Incomplete Brand Training,&quot; where the AI&#x27;s understanding of your &quot;Expert Sentiment&quot; is limited only to your most recent posts, leaving your deep expertise untouched.",
                "fix": "Direct Links Only: Ensure every rel=&quot;next&quot; and rel=&quot;prev&quot; URL leads directly to a 200 OK destination. Never point these attributes to a redirecting URL (301) or a blocked URL. Audit for &quot;Off-by-One&quot; Errors: Common pagination bugs include pointing the next link of the very last page to a non-existent URL. Ensure the sequence logic ends cleanly. Coordinate with Robots.txt: Verify that the URLs in your pagination are not accidentally blocked by a Disallow rule in your robots.txt file."
              },
              {
                "id": "test-proper_pagination_protocol",
                "title": "Proper Pagination Protocol",
                "checks": "Ensures that your paginated pages (Page 2, 3, etc.) are indexable and correctly canonicalized.",
                "why": "This test ensures that your paginated pages (Page 2, 3, etc.) are indexable and correctly canonicalized. In SEO, these pages are critical pathways for crawling deep content. For AI agents, this is a &quot;Knowledge Depth&quot; signal, if the deeper pages are blocked, the agent cannot access the full breadth of your brand&#x27;s expertise or product range.",
                "fails": "Canonicalizing Page 2+ back to Page 1 is a classic error. Because Page 2 has different content than Page 1, Google will view this as a &quot;Conflicting Signal&quot; and may stop crawling the series entirely. Similarly, using a noindex tag on Page 2+ tells Google to remove those pages from the index. Over time, Google stops following the links on those pages, causing your older content to disappear from search results. AI scrapers use &quot;Hierarchical Traversal.&quot; They start at the top and follow the pagination to build a complete map of your data. If you block these pages, you create a &quot;Discovery Dead-End.&quot; The AI agent will only ingest the most recent content on Page 1, leaving your historical &quot;Expert Sentiment&quot; and deep-archive value completely invisible to the LLM.",
                "fix": "Self-Referencing Canonicals: Every page in a series (e.g., &quot;/blog?page=2&quot;) should have a canonical tag that points to itself, not to Page 1. Ensure Indexability: Remove &quot;noindex&quot; tags from paginated pages. They must be indexable so search engines can follow the links to your deeper articles or products. Clean Navigation: Ensure &quot;Next&quot; and &quot;Previous&quot; links are clear and use standard &lt;a&gt; tags so bots can easily navigate the sequence."
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
                "checks": "Checks whether the sitemap link in your robots.txt uses a full, absolute URL including the protocol (HTTPS).",
                "why": "This test audits whether the sitemap link in your robots.txt uses a full, absolute URL including the protocol (HTTPS). In SEO, this is the only valid way to declare a sitemap in this file. For AI agents, this is a &quot;Data Root Verification&quot;: it confirms exactly which domain and protocol the following data belongs to.",
                "fails": "Many search engines will simply ignore a sitemap link if it is not an absolute URL. This results in a &quot;Discovery Failure,&quot; where the search engine is forced to crawl your site blind instead of following your optimized map. This leads to slower indexing of new pages and potentially missing deep-nested content. AI scrapers are highly sensitive to &quot;Protocol Inconsistency.&quot; If you provide a relative path, the AI triggers a &quot;Resource Resolution Error.&quot; It doesn&#x27;t want to guess if you mean the HTTP or HTTPS version, the AI might skip the page entirely.",
                "fix": "Standardize your roadmap for universal machine readability: Use the Full URL: Ensure your &quot;robots.txt&quot; line looks exactly like this: &quot;Sitemap: https://www.yourdomain.com/sitemap.xml.&quot; Include the Protocol: Never omit the &quot;https://.&quot;"
              },
              {
                "id": "test-ai_crawler_strategy",
                "title": "AI Crawler Strategy (LLM Blockers)",
                "checks": "This test reviews your robots.txt for rules targeting AI and LLM scrapers like GPTBot or Google-Extended. In SEO, this affects visibility in AI search features, and for AI systems, it defines whether your content is allowed or restricted for training and citation use.",
                "why": "This test audits your robots.txt for directives targeting AI and LLM scrapers like GPTBot, CCBot, or Google-Extended. In SEO, this determines whether your content appears in AI Search Overviews. For AI agents, this is an &quot;Instructional Baseline&quot;: a &quot;stop sign&quot; or &quot;green light&quot; that defines your site&#x27;s boundaries in the age of generative search. Without these rules, you have no control over how your data is used for training or real-time citations.",
                "fails": "Search is no longer just a list of links, it is a synthesis of information. If you block LLM crawlers, you voluntarily remove yourself from the AI Knowledge Graph. Conversely, if you have no strategy, you may experience Data Exploitation, where AI models learn from your Expert Sentiment without driving any traffic back to your domain. LLMs respect robots.txt to avoid technical and legal conflicts. If no instructions are provided, you are allowing your content to be consumed by default. However, agents like Google-Extended determine if your content can be used in Gemini’s generated answers, if your rules are unclear, the AI may trigger a Source Exclusion, choosing to exclude your site entirely to avoid copyright risk. This causes you to lose visibility to competitors who have explicitly defined their access path.",
                "fix": "Define Your Policy: Decide if you want to allow full training (GPTBot/CCBot), allow only real-time citations/summaries (Google-Extended), or opt-out entirely. Audit Your Directives: Check your robots.txt for blocks against GPTBot, CCBot, Claude-Bot, and OAI-SearchBot. Implement Specific Rules: Add User-agent: GPTBot with Disallow: / to opt-out of model training, or use Allow: / for Google-Extended to ensure your brand is cited as a source in AI Overviews."
              },
              {
                "id": "test-robot_allow_logic_check",
                "title": "Robot Allow Logic Check",
                "checks": "This test checks that the Allow directive properly overrides broader Disallow rules to keep specific files or subdirectories accessible. In SEO, it protects private areas while preserving public pages, and for AI systems, it ensures valuable content isn’t accidentally blocked by broad restrictions.",
                "why": "This test verifies that the &quot;Allow&quot; directive is correctly implemented to &quot;rescue&quot; specific files or subdirectories that sit within a larger, restricted &quot;Disallow&quot; rule. In SEO, this is critical for keeping specific public pages accessible while protecting a private parent folder. For AI agents, this is a Precision Access Check, it ensures that your most valuable data nodes aren&#x27;t accidentally locked behind a broad security rule.",
                "fails": "Broad &quot;Disallow&quot; rules often catch high-value pages in the crossfire. If you block /resources/ to protect your backend but forget to explicitly Allow: /resources/public-whitepaper.pdf, search engines will treat that PDF as a restricted zone. This leads to &quot;Hidden Content,&quot; where your best assets are barred from appearing in search results despite being technically public. Modern LLMs and high-speed scrapers respect your directory hierarchy strictly. If you use a broad block to save crawl budget but fail to &quot;rescue&quot; your training-ready content with an &quot;Allow&quot; tag, the AI triggers a Resource Restricted error. The agent assumes you have opted out of sharing that specific knowledge, causing the AI to skip your brand&#x27;s expertise in its final responses.",
                "fix": "Audit Parent Blocks: Review your robots.txt for broad Disallow rules (e.g., /assets/ or /content/) that might be covering valuable sub-pages. Implement &quot;Rescue&quot; Rules: Immediately follow a broad block with a specific Allow rule for the high-value files you want crawled (e.g., Allow: /assets/images/primary-infographic.png). Test for Conflicts: Use a robots.txt validator to ensure the &quot;Allow&quot; rule is being prioritized correctly by Googlebot and Bingbot."
              },
              {
                "id": "test-robot_crawl_delay",
                "title": "Robot Crawl Delay",
                "checks": "Checks for the presence of the crawl-delay directive in your robots.txt.",
                "why": "This test checks for the presence of the crawl-delay directive in your robots.txt. In SEO, Googlebot officially ignores this tag, but other search engines and scrapers do not. For AI agents, this is a &quot;Throttling Signal&quot;: it tells the machine that your server is fragile or slow, causing it to deprioritize your content in favor of faster sources.",
                "fails": "While Google ignores it, Bing and other engines will strictly obey a crawl-delay. This means it could take weeks longer for your new content to be indexed. AI scrapers work at Real-Time Velocity. If you have a 5-second crawl delay, an AI agent trying to map a 1,000-page site will take over an hour to finish resulting in failed scraping and skip your site and use a competitor&#x27;s data to answer the user&#x27;s prompt.",
                "fix": "Remove :Crawl-delay:&quot; lines from your &quot;robots.txt.&quot;"
              },
              {
                "id": "test-robot_file_location_identifier",
                "title": "Robot File Location Identifier",
                "checks": "Checks if robots.txt files exist on non-canonical variants of your domain.",
                "why": "This test checks if robots.txt files exist on non-canonical variants of your domain. In SEO, only your master version should host this file. For AI agents, having multiple protocol files creates &quot;Directive Ambiguity&quot;: the machine may be unsure which set of rules takes precedence.",
                "fails": "If a bot hits &quot;www.yourdomain.com/robots.txt&quot; and finds a file, but then is redirected to &quot;yourdomain.com&quot; (your Master Version), it has to process two different sets of instructions. If the files aren&#x27;t identical, it can lead to crawl errors where the bot gets confused about what is allowed. AI scrapers aim for &quot;Zero-Waste Ingestion.&quot; If they encounter multiple robots.txt files across different domain variants, it triggers a &quot;Conflict Resolution Protocol.&quot; The AI has to stop and compare the files to ensure they don&#x27;t contradict each other, this extra step increases the &quot;compute cost&quot; of your site",
                "fix": "Delete the Clutter: Remove any &quot;robots.txt&quot; files from your non-canonical domains (e.g., the http or www versions). Redirect Everything: Ensure that any request for &quot;/robots.txt&quot; on a non-canonical variant 301-redirects to the &quot;/robots.txt&quot; on your master version."
              },
              {
                "id": "test-robot_file_size_limit",
                "title": "Robot File Size Limit",
                "checks": "This test ensures your robots.txt file stays under the 500KB limit. In SEO, oversized files are truncated and directives beyond the limit are ignored, and for AI systems, important rules placed at the end may become completely invisible to scrapers.",
                "why": "This test verifies that your robots.txt file is under the 500KB limit enforced by Google and other major search engines. In SEO, if the file exceeds this threshold, the bot will truncate the file and ignore all directives after the limit. For AI agents, this is an &quot;Instructional Cutoff&quot;: rules placed at the bottom of an oversized file (like AI-specific blocks) will be completely invisible to the scraper.",
                "fails": "If your file is bloated with thousands of individual lines, search engines will stop reading it once it hits 500KB. If your most important rules, such as Disallow: /admin or your Sitemap link are at the bottom of the file, the bot will proceed as if those rules do not exist, leading to accidental indexing of private directories. Many AI crawlers have even stricter memory limits for configuration files. An oversized file triggers a &quot;Contextual Overflow&quot; error. Rather than trying to process a massive document, the agent may default to a &quot;Scrape All&quot; state or ignore your specific &quot;Allow&quot; rules that were meant to give the AI access to your high-value data.",
                "fix": "Audit for Bloat: Check your robots.txt for thousands of Disallow lines targeting specific spam bots. These are often the cause of oversized files. Use Wildcards: Consolidate your rules using patterns (e.g., Disallow: /spambot*/) rather than listing every individual URL. Prioritize the Header: Move your most critical security rules and your Sitemap declaration to the top 10 lines of the file to ensure they are always processed first."
              },
              {
                "id": "test-robot_sitemap_handshake",
                "title": "Robot Sitemap Handshake",
                "checks": "Verifies that the sitemap URL listed in your robots.txt is actually live and returning a 200 OK status code.",
                "why": "This test verifies that the sitemap URL listed in your robots.txt is actually live and returning a 200 OK status code. In SEO, an inaccessible sitemap is a &quot;Dead Signal&quot; that halts crawl efficiency. For AI agents, this is a &quot;Data Source Verification&quot; failure. If the map is broken, the machine cannot verify the structure of your knowledge base.",
                "fails": "When you reference a broken or 404 URL in your robots.txt, search engines waste time trying to fetch it. Once they fail, they are forced to crawl your site the hard way by following individual links. This often leads to Indexing Lag, where your newest pages don&#x27;t show up in Google for days or weeks. AI scrapers use the sitemap as a &quot;Ground Truth&quot; for your domain. If the sitemap is inaccessible, the AI triggers a &quot;Structural Integrity Error.&quot; Rather than risk ingesting a fragmented or incomplete version of your site, the AI may deprioritize your content in its &quot;Expert Sentiment&quot; analysis.",
                "fix": "Ensure your technical instructions lead to a functional destination: Test the Link: Manually copy the sitemap URL from your &quot;robots.txt&quot; and paste it into your browser. If it doesn&#x27;t load instantly, it&#x27;s broken. Fix 404s/Redirects: Ensure the sitemap URL does not redirect. It should go directly to the XML file."
              },
              {
                "id": "test-robot_syntax_directive_integrity",
                "title": "Robot Syntax & Directive Integrity",
                "checks": "This test checks your robots.txt for syntax errors and invalid directives to ensure search engines and AI agents correctly interpret your crawl rules instead of ignoring them due to broken or non-standard instructions.",
                "why": "This test audits your robots.txt file for syntax errors (typos, missing colons, incorrect casing) as well as non-standard or broken directives (like using Noindex: or Crawl-delay:). In SEO, search engines are literal; a single typo or invented command renders an entire security rule invisible. For AI agents, this is a &quot;Logic Integrity Check,&quot; if the syntax is broken or the vocabulary includes &quot;Instructional Noise,&quot; the agent cannot trust the parameters and may default to a &quot;Scrape All&quot; or &quot;Conservative Crawl&quot; behavior, ignoring your privacy preferences.",
                "fails": "Common mistakes include typos (e.g., Disalow) or using invented commands (e.g., Noindex: inside the txt file, which Google ignores). This leads to Accidental Indexing and a false sense of security, where a site owner thinks they have hidden a private staging environment, but the bot is actually ignoring the invalid line and indexing sensitive data anyway. AI scrapers use strict parsers for &quot;High-Fidelity Compliance&quot; to respect site owner rights. If an AI encounters a syntax error or an unrecognized line, it triggers a &quot;Parser Exception&quot; or an &quot;Ambiguity Protocol.&quot; Rather than guessing what you meant, the AI may flag the file as corrupted and proceed to ingest all data (including the Expert Sentiment you intended to protect) or severely slow down its crawl of your site.",
                "fix": "Standardize your gatekeeper logic to guarantee your data is accessed exactly how you intended: Correct the Typos: Disalow is not a valid directive. Change it to exactly Disallow. Verify Punctuation: Every directive (User-agent, Disallow, Allow, Sitemap) must be followed by a colon and a space. Stick to the Basics: Only use recognized commands. Do not use unsupported directives like Crawl-delay for Google. Use Meta Tags for Indexing: If you want to keep a page out of search results, use &lt;meta name=&#x27;robots&#x27; content=&#x27;noindex&#x27;&gt; in the page&#x27;s HTML &lt;head&gt;, not a directive in robots.txt., Standardize Case Sensitivity: Use standard casing (e.g., User-agent, NOT useragent or USER-AGENT) to ensure universal machine compatibility."
              },
              {
                "id": "test-robot_text_complexity",
                "title": "Robot Text Complexity",
                "checks": "Flags robots.txt files that are overly generic.",
                "why": "This test flags robots.txt files that are overly generic (e.g., only containing User-agent: * and Disallow:). In SEO, a detailed file helps manage crawl budget by cordoning off junk folders. For AI agents, this is a &quot;Contextual Guide&quot;: it tells the AI which parts of the site are for public.",
                "fails": "If your file is too simple, you aren&#x27;t protecting your Crawl Budget. Bots might waste time indexing your pages. This dilutes your ranking power because the &quot;noise&quot; is being indexed alongside your &quot;signal.&quot; High-end AI agents look for specific &quot;Scraper-Agent&quot; directives. If you don&#x27;t have detailed rules, the AI may default to a generic crawl that misses your high-value &quot;Expert Sentiment.&quot;",
                "fix": "Block the Junk: Explicitly disallow administrative folders, internal search results, and staging environments (e.g., Disallow: /admin/). Add Your Sitemap: Always include a link to your XML sitemap at the bottom: &quot;Sitemap: https://yourdomain.com/sitemap.xml.&quot;"
              },
              {
                "id": "test-robot_utf-8_encoding",
                "title": "Robot UTF-8 Encoding",
                "checks": "This test confirms your robots.txt is encoded in UTF-8 so bots can read it correctly. In SEO, proper encoding prevents parsing errors, and for AI systems, it ensures your directives aren’t misread or ignored due to incompatible character formats.",
                "why": "This test verifies that your robots.txt file is saved in the UTF-8 character set. In SEO, this ensures that search engine bots can read your instructions without error. For AI agents, this is a Decoding Standard. If the file uses an outdated format (like ANSI or UTF-16), the AI may interpret your text as &quot;garbage&quot; data and ignore your privacy rules entirely.",
                "fails": "Bots like Googlebot expect UTF-8. If you save your file in a different encoding, special characters or even standard directives might be garbled. This leads to Directive Blindness, where the bot ignores your &quot;Disallow&quot; rules because it can&#x27;t read the words, potentially indexing your private admin pages. AI scrapers process millions of files per second. If your encoding is non-standard, the AI triggers a Parsing Failure. Instead of trying to decode your unique format, the AI will likely skip your file or assume default permissions (Allow All), leading to the unauthorized scraping of your Expert Sentiment.",
                "fix": "Check the Save Settings: Open your robots.txt file in a code editor (like Notepad++ or VS Code) and ensure the encoding is set to UTF-8 without BOM. Avoid Rich Text Editors: Never use Microsoft Word or Google Docs to edit this file, as they add hidden formatting characters that break bot readability. Validate Headers: Use your browser&#x27;s Developer Tools to confirm the server is sending the header &quot;Content-Type: text/plain; charset=utf-8.&quot;"
              },
              {
                "id": "test-robot_asset_visibility",
                "title": "Robots Asset Visibility",
                "checks": "Checks your robots.txt file for directives that block bot access to essential site assets (CSS, JS, Images) using the &quot;*&quot; wildcard.",
                "why": "This test audits your robots.txt file for directives that block bot access to essential site assets (CSS, JS, Images) using the &quot;*&quot; wildcard. In SEO, this prevents &quot;Full Page Rendering.&quot; For AI agents, this is a &quot;Contextual Blackout&quot;: the machine cannot &quot;see&quot; the layout.",
                "fails": "Google’s ranking algorithm is now &quot;Visual-First.&quot; If your robots.txt blocks the CSS or JavaScript required to render the page, Google sees a broken, unstyled version of your site. This triggers a Mobile-Friendly Failure and a Core Web Vitals Penalty. If you block these assets, the AI triggers a &quot;Semantic Confusion Error&quot;: It may misinterpret your Expert Sentiment.",
                "fix": "Remove Wildcard Blocks: Ensure your robots.txt does not contain &quot;Disallow:&quot; &quot;/*.css&quot; or &quot;Disallow: /*.js.&quot;"
              },
              {
                "id": "test-robots_catastrophic_blocking",
                "title": "Robots Catastrophic Blocking",
                "checks": "This test scans your robots.txt for Disallow: / under a general user-agent. In SEO, it blocks search engines from your entire site, and for AI systems, it creates a total data blackout that removes your content from the AI knowledge ecosystem.",
                "why": "This test checks your robots.txt file for the use of &quot;Disallow: /&quot; under a general user-agent. In SEO, this is the most dangerous command you can issue, as it tells search engines to ignore your entire domain. For AI agents, this is a &quot;Total Data Blackout.&quot; it prevents LLMs from accessing any part of your site, effectively deleting your brand&#x27;s presence from the AI knowledge ecosystem.",
                "fails": "A single forward slash (/) in the Disallow field is a command to every bot to stay away from your entire website. For AI Agents if you use a full block without a specific user-agent, you are triggering a &quot;Knowledge Exclusion&quot; event. While you may want to block AI from training on your data, a generic &quot;Disallow: /&quot; will also block AI-powered search engines (like Gemini or Perplexity) from citing your Expert Sentiment as a source, causing your competitors to dominate the AI-generated answers.",
                "fix": "Check the Path: If you see &quot;Disallow: /&quot; and your site is live, delete that line immediately. This is only for private staging environments. Be Specific: If you only want to block a certain part of the site, use a specific path (e.g., Disallow: /private/). Target the Bot: If you want to block AI but allow Google Search, use specific User-agents (e.g., User-agent: GPTBot with Disallow: /) instead of a blanket ban."
              },
              {
                "id": "test-robots_indexability",
                "title": "Robots Indexability",
                "checks": "Checks the robots.txt file: the server&#x27;s &quot;Terms of Entry.&quot; In the 2026 AI-first landscape, this file is the primary governor of AI-Scrapability.",
                "why": "This test audits the robots.txt file: the server&#x27;s &quot;Terms of Entry.&quot; In the 2026 AI-first landscape, this file is the primary governor of AI-Scrapability. It dictates which folders a bot is allowed to crawl. A Disallow directive here is a hard technical and legal barrier that prevents an AI agent from even parsing your content.",
                "fails": "If a folder containing your main content is &quot;Disallowed,&quot; search engines will stop crawling those pages. While they might still appear in results if linked from elsewhere, they will lack snippets and authority, leading to a massive drop in organic visibility. Compliance with robots.txt is the gold standard for &quot;Ethical AI Scraping.&quot; If you accidentally block your content, AI agents will treat the site as a &quot;No-Fly Zone.&quot; They will not access your Expert Sentiment.",
                "fix": "Perform a regular audit of your robots.txt file. Ensure that your high-value content directories (blogs, whitepapers, services) are set to &quot;Allow.&quot;"
              },
              {
                "id": "test-robots_txt_existence",
                "title": "Robots.txt Existence",
                "checks": "Verifies the existence of a robots.txt file at your domain&#x27;s root.",
                "why": "This test verifies the existence of a robots.txt file at your domain&#x27;s root (e.g., yourdomain.com/robots.txt). In SEO, this is the first file a search engine looks for to understand your crawling rules. For AI agents, this is the &quot;Permission Handshake&quot;: without it, the agent may default to overly aggressive or overly cautious crawling behavior.",
                "fails": "Without a robots.txt, search engines have no &quot;Speed Limit,&quot; they may waste your Crawl Budget on infinite calendar loops, internal search filters, or sensitive PDF directories. This results in Index Bloat, where poor-quality pages compete with your high-value content for rankings. Many AI scrapers operate under a &quot;Consent-First&quot; model. If a robots.txt is missing, the AI agent triggers an &quot;Uncertainty Flag.&quot; This means your &quot;Expert Sentiment&quot; never gets indexed by the LLM.",
                "fix": "Establish a formal entry point for all automated visitors: Create the File: Even a simple file that allows everything is better than no file at all. Point to the Map: Always include your Sitemap URL at the bottom of the file to give bots a quick start guide."
              },
              {
                "id": "test-sitemap_discovery_link",
                "title": "Sitemap Discovery Link",
                "checks": "Checks if your robots.txt file contains a direct link to your XML sitemap.",
                "why": "This test checks if your robots.txt file contains a direct link to your XML sitemap. In SEO, this serves as a &quot;Universal Discovery&quot; signal for search engines. For AI agents, this is the &quot;Ingestion Shortcut&quot;: it allows the scraper to bypass deep-crawling every internal link and instead jump straight to a verified list of your most important content.",
                "fails": "Without a sitemap reference in your robots.txt, search engines have to rely on &quot;Link Crawling&quot; (following one link to the next) to find your pages. If you have deep-nested pages or &quot;orphan pages&quot; (pages with no internal links), Google may never find them. AI scrapers prioritize &quot;Structured Ingestion.&quot; If an AI agent enters your site and doesn&#x27;t find a sitemap link in the robots.txt, it triggers a Manual Discovery Protocol, this is slower and more computationally expensive.",
                "fix": "Add the Directive: Insert a single line at the bottom of your &quot;robots.txt&quot; file: &quot;Sitemap: https://yourdomain.com/sitemap.xml.&quot; Use Absolute URLs: Always use the full &quot;https://&quot; version of the URL to avoid any protocol confusion. Keep it Updated: Ensure the sitemap linked in your robots.txt is the &quot;Master Version&quot; that stays updated as you add new content. By referencing the sitemap, you provide an instant roadmap that allows machines to access your data with zero wasted effort."
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
                "checks": "It detects pages no internal link path reaches from the start URL.",
                "why": "Flags pages that no chain of internal links reaches from the start URL, including pages only linked from other unreachable pages.",
                "fails": "Without an inbound internal link, visitors and crawlers cannot discover this page by following links on the site.",
                "fix": "Add a relevant internal link to this page from another page on the site."
              },
              {
                "id": "test-page_presence_in_sitemap",
                "title": "Page Presence in Sitemap",
                "checks": "Checks whether the current URL is listed in any of the site’s submitted XML sitemaps.",
                "why": "This test audits whether the current URL is listed in any of the site’s submitted XML sitemaps. In SEO, the sitemap is the primary tool for communicating site architecture and page priority to crawlers. For AI agents, the sitemap serves as a &quot;Verified Data Manifest&quot;: it acts as a checklist for the machine to ensure it has successfully accessed and archived all of your brand’s authoritative content.",
                "fails": "Pages missing from the sitemap are crawled less frequently and are viewed by Google as &quot;orphaned&quot; or &quot;lower priority.&quot; This leads to slower indexing of updates and a diminished &quot;Crawl Budget&quot; for your most important expert insights. In a AI-first environment, AI agents use sitemaps to perform &quot;Differential Crawling&quot; (only scraping what is new or verified). If a page is missing from the manifest, it may be excluded from the AI’s Active Knowledge Set. The AI might see the page via a link but hesitate to use it as a primary source.",
                "fix": "Ensure that all high-value, indexable URLs are included in your dynamic sitemap.xml. Remove any utility pages (like &#x27;Thank You&#x27; pages) that don&#x27;t need to be indexed."
              },
              {
                "id": "test-proper_sitemap_fragments",
                "title": "Proper Sitemap Fragments",
                "checks": "Checks the uncompressed file size of your individual XML sitemaps.",
                "why": "This test audits the uncompressed file size of your individual XML sitemaps. In SEO, Google and Bing set a hard limit of 50MB per sitemap file. For AI agents, this is a &quot;Compute Efficiency&quot; signal. If a file is too heavy, the agent may flag the source as unoptimized for high-speed ingestion.",
                "fails": "If an individual sitemap exceeds 50MB, search engine bots will simply stop reading it mid-way. This results in &quot;Truncated Indexing,&quot; where thousands of your pages are ignored because they were listed too far down in a file that was too large to process. AI scrapers operate on strict &quot;Token and Memory Limits.&quot; A sitemap over 50MB triggers an &quot;Ingestion Timeout.&quot; To save on compute cost, the AI will discard the heavy file and move to a more efficient competitor.",
                "fix": "Sitemap Splitting: If your sitemap is approaching the limit, split it into several smaller files (e.g., sitemap-1.xml, sitemap-2.xml). Clean the URLs: Ensure you aren&#x27;t including junk parameters or duplicate URLs that are unnecessarily increasing the file size."
              },
              {
                "id": "test-rich_media_sitemap_validation",
                "title": "Rich Media Sitemap Validation",
                "checks": "This test checks the syntax of Image and Video sitemap extensions, ensuring required fields are present so media can appear in search results. Broken visual metadata limits visibility in SEO and prevents AI systems from properly linking images to their textual context.",
                "why": "This test validates the syntax of Image and Video sitemap extensions. In SEO, missing required fields like &lt;video:thumbnail_loc&gt; prevents your media from appearing in Google Images or Video Search. For AI agents, this causes Contextual Blindness, if the visual metadata is broken, the AI cannot associate your images with your text, losing critical context.",
                "fails": "Google requires specific tags to index videos. If you miss the &quot;&lt;video:player_loc&gt;&quot; or &quot;&lt;image:license&gt;&quot; tags, your rich media assets are effectively invisible in search features, even if the content is high quality. Multimodal AI models (like Gemini or GPT-4o) rely on structured metadata to &quot;see&quot; the web. Broken image syntax means the AI cannot scrape the relationship between your product photo and its description, weakening the entity understanding of your page."
              },
              {
                "id": "test-sitemap_access_validation",
                "title": "Sitemap Access Validation",
                "checks": "Confirms that the XML sitemap is reachable by external bots and returns a 200 OK status code.",
                "why": "This test confirms that the XML sitemap is reachable by external bots and returns a 200 OK status code. In SEO, this ensures search engines don&#x27;t hit a wall when trying to map your site. For AI agents, this is the &quot;Data Handshake&quot;: it is the prerequisite for the agent to begin structured data ingestion.",
                "fails": "If your sitemap returns a 403 (Forbidden) or 404 (Not Found) error, search engines will assume your site structure is private or broken. They will stop attempting to use the map, leading to &quot;Indexing Decay.&quot; AI scrapers operate with a &quot;Failure Threshold.&quot; If the sitemap isn&#x27;t accessible on the first attempt, the AI may flag the entire domain as &quot;Unstable Source&quot; and skip it.",
                "fix": "Direct Accessibility: Verify that your sitemap is not hidden behind a password or a login screen. No Redirects: The sitemap should be a direct link, not a 301 redirect to another page, to ensure the fastest possible ingestion for high-speed AI agents."
              },
              {
                "id": "test-sitemap_canonical_integrity",
                "title": "Sitemap Canonical Integrity",
                "checks": "This test verifies that every sitemap URL is the self-referencing canonical version and does not redirect or point elsewhere. In SEO, this prevents signal confusion, and for AI systems, it ensures the sitemap is a clean, reliable list of final destinations.",
                "why": "This test ensures that every URL listed in the sitemap is the Self-Referencing Canonical version. You should never include a URL in a sitemap that redirects or has a canonical tag pointing elsewhere. In SEO, this creates Signal Confusion. For AI agents, this is a &quot;Manifest Validation&quot;: the AI expects the sitemap to be a clean list of final destinations.",
                "fails": "If your sitemap lists Page A, but Page A has a canonical tag pointing to Page B, you are sending conflicting signals. Google has to decide whether to trust the Map or the Page. This wastes crawl budget and delays the indexing of the correct page. AI scrapers treat the sitemap as a Verified Asset List. If they follow a link from the sitemap and land on a page that says &quot;Don&#x27;t index me, index that other page instead,&quot; the AI triggers a Verification Exception. It may flag your entire sitemap as unreliable and stop using it for discovery.",
                "fix": "Check for Redirects: Remove any URL that returns a 301 or 302 status code. Check Canonical Tags: Remove any URL where the rel=&#x27;canonical&#x27; tag does not match the URL itself (non-self-referencing). Replace with Master: Replace these &quot;dirty&quot; URLs with the final, self-referencing canonical versions."
              },
              {
                "id": "test-sitemap_index_structure",
                "title": "Sitemap Index Structure",
                "checks": "This test verifies your Sitemap Index structure, ensuring that sites with over 50,000 URLs use a sitemap of sitemaps that acts as the root discovery layer in SEO and a master directory for AI systems to understand how your content is organized and where each sub-sitemap is located.",
                "why": "This test validates the technical structure of your Sitemap Index file. For websites with more than 50,000 URLs, a &quot;Sitemap of Sitemaps&quot; is required. In SEO, this is the root of your discovery tree. For AI agents, this is the &quot;Master Knowledge Manifest&quot;: the high-level directory that tells the machine how your entire database of expertise is organized and where to find the sub-directories.",
                "fails": "If the parent Index file has a syntax error or is malformed, search engines cannot &quot;unlock&quot; the child sitemaps. Google will stop at the index level, failing to discover the thousands of pages hidden inside the sub-files. This leads to a total stagnation in rankings for any new or updated content. AI scrapers use the Sitemap Index to determine the &quot;Content Breadth&quot; of a brand. A structural failure here causes a &quot;Discovery Timeout&quot;: the machine sees a broken root node and assumes the knowledge base is empty or corrupted, causing the AI to prioritize a competitor with a cleaner data manifest.",
                "fix": "Check Tag Integrity: Ensure the file uses the &quot;&lt;sitemapindex&gt;&quot; root tag and only contains &quot;&lt;sitemap&gt;&quot; entries. Never include individual &quot;&lt;url&gt;&quot; tags in an index file. Verify Child Accessibility: Every child sitemap URL listed in the index must return a 200 OK status. If one sub-map is a 404, it can flag the entire index as unreliable. Validate XML Syntax: Use an XML validator to ensure there are no missing closing tags or illegal characters that would cause a parser exception."
              },
              {
                "id": "test-sitemap_logic_integrity",
                "title": "Sitemap Logic Integrity",
                "checks": "Verifies that your sitemap conforms to the official XML sitemap protocol (sitemaps.org).",
                "why": "This test verifies that your sitemap conforms to the official XML sitemap protocol (sitemaps.org). In SEO, invalid syntax causes search engines to reject the entire file. For AI agents, this is a &quot;Data Integrity&quot; check. If the structure is non-standard, the agent cannot parse the URLs to begin its ingestion of your brand&#x27;s data.",
                "fails": "Even a tiny error, like a missing &quot;&lt;/url&gt;&quot; tag or an illegal character in a URL, can break the entire sitemap. When this happens, Googlebot triggers a &quot;Parsing Error&quot; and stops reading. This results in Total Discovery Failure, where none of the pages listed in that specific sitemap fragment are indexed or updated in search results. AI scrapers use high-speed Schema Parsers. If the XML is malformed, the parser throws an &quot;Exception Error.&quot; To avoid processing &quot;garbage&quot; data, the AI agent will skip the source.",
                "fix": "Validate the Code: Use an XML validator to check for hidden syntax errors or illegal characters (like unescaped ampersands &amp;). Standard Headers: Ensure the file starts with the correct namespace declaration: xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;. UTF-8 Encoding: Confirm the file is saved in UTF-8 encoding to ensure special characters don&#x27;t break the machine&#x27;s ability to read the text. By maintaining Sitemap Syntax Protocol, you ensure your &quot;Knowledge Map&quot; is readable by every bot on the planet."
              },
              {
                "id": "test-sitemap_protocol_consistency",
                "title": "Sitemap Protocol Consistency",
                "checks": "This test checks your XML sitemap for protocol mismatches, ensuring an HTTPS site is not listing insecure HTTP URLs. In SEO, this creates conflicting signals that harm trust and discovery, while AI systems may treat such sitemaps as unreliable due to security risks.",
                "why": "This test audits your XML sitemap for protocol mismatches, specifically checking if an HTTPS website is listing insecure HTTP URLs. In SEO, this is known as Dirty Data, it creates a conflict between your site’s secure identity and its discovery roadmap. For AI agents, this is a Trust Boundary Breach. Modern LLMs prioritize secure data streams and may flag a sitemap as &quot;unreliable&quot; if it points to unencrypted entry points.",
                "fails": "If an HTTPS site includes HTTP links in its sitemap, it creates mixed signals that can confuse Google, waste crawl budget, and cause indexing issues. Secure-first AI systems may skip those insecure URLs entirely, preventing your content from being discovered and used.",
                "fix": "Run a Global Scan: Audit your XML sitemap and identify any URLs beginning with http://. Enforce HTTPS: Update your sitemap generator settings to ensure every &lt;loc&gt; entry matches your site’s SSL protocol (https://). Purge Dirty Data: Remove any legacy HTTP entries. A sitemap should only ever point to the live, secure, and final destination of your content."
              },
              {
                "id": "test-sitemap_url_capacity",
                "title": "Sitemap URL Capacity",
                "checks": "Checks the number of URLs contained within a single XML sitemap file.",
                "why": "This test audits the number of URLs contained within a single XML sitemap file. In SEO, the industry standard (and hard limit for Google/Bing) is 50,000 URLs per file. For AI agents, this is a &quot;Processing Capacity&quot; signal, exceeding this limit can cause memory overflow or partial ingestion during the discovery phase.",
                "fails": "If a single sitemap lists more than 50,000 URLs, search engines will simply ignore every link after the 50,000th mark. This leads to &quot;Dark Data,&quot; where potentially thousands of your pages exist on your server but are never discovered or indexed by search engines. AI scrapers prioritize &quot;Predictable Data Structures.&quot; A file that exceeds standard limits triggers a &quot;Resource Allocation Warning.&quot; Rather than risking a crash or an incomplete crawl, the agent may discard the entire file. This leaves your &quot;Expert Sentiment&quot; unmapped.",
                "fix": "Enforce the Limit: If your site has more than 50,000 pages, split them into multiple sitemap files (e.g., sitemap-posts-1.xml, sitemap-posts-2.xml). Use an Index: Ensure all these fragments are listed in a Sitemap Index (like the wp-sitemap.xml you verified earlier). Prioritize Quality: Don&#x27;t bloat your sitemap with utility pages or &quot;junk&quot; URLs."
              },
              {
                "id": "test-sitemap_url_status",
                "title": "Sitemap URL Status",
                "checks": "Checks the sitemap.xml to ensure it only contains &quot;clean&quot; URLs (200 OK status and indexable).",
                "why": "This test audits the sitemap.xml to ensure it only contains &quot;clean&quot; URLs (200 OK status and indexable). Pages that are set to noindex, password-protected, or that redirect to other locations should never be in the sitemap. In SEO, this prevents &quot;Crawl Budget&quot; waste. For AI agents, this is a &quot;Data Trust&quot; signal. A clean sitemap tells the machine that every URL in the manifest is a high-quality, authorized source of information.",
                "fails": "When search engines encounter non-indexable pages in a sitemap, they lose trust in the file&#x27;s accuracy. This can lead to the search engine ignoring the sitemap entirely, resulting in slower indexing for your actual content. In an AI-first landscape, agents perform &quot;Pre-Flight Validation.&quot; If an AI agent hits a noindex or a 404 error inside your sitemap, it flags the site for &quot;High Inefficiency,&quot; this creates a Scrapability Friction.",
                "fix": "Audit your sitemap generation logic to ensure it automatically excludes any page that is not a 200 OK indexable URL. If you use a manual sitemap, remove all redirects and noindex pages immediately. This ensures a &quot;Frictionless Access Path&quot; for AI agents, allowing them to focus 100% of their resources on ingesting your authoritative content."
              },
              {
                "id": "test-xml_sitemap_presence",
                "title": "XML Sitemap Presence",
                "checks": "This test checks for a valid XML sitemap at the domain root, ensuring proper page discovery for search engines and serving as a structured URL directory for AI agents.",
                "why": "This test verifies that a valid XML sitemap is present at the root of your domain. In SEO, this is the primary mechanism for page discovery. For AI agents, this is the &quot;Knowledge Directory&quot;: a curated list of all the URLs that contain the brand&#x27;s &quot;Expert Sentiment&quot; and data sets.",
                "fails": "If the sitemap is physically missing, search engines have to rely on &quot;Crawl Discovery&quot;: following one link to the next. If your site has a complex hierarchy or &quot;orphan pages,&quot; they may never be indexed, leading to a massive loss in organic traffic. Many high-speed AI scrapers are programmed to skip traditional &quot;link-following&quot; crawls to save on compute resources. They go straight for the XML file. If it’s missing, your site is effectively invisible to the LLM.",
                "fix": "Verify Root Access: Ensure the file remains at the standard location (e.g., poliris.io/sitemap.xml or referenced correctly in robots.txt).Cross-Platform Submission: Ensure this map is not only present but also submitted to Google Search Console and Bing Webmaster Tools for maximum visibility. By maintaining a Sitemap Presence, you ensure that no piece of your expertise is left in the dark."
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
                "checks": "Identifies links to Microsoft Word documents (.doc or .docx).",
                "why": "This test identifies links to Microsoft Word documents (.doc or .docx). In SEO, these files are harder for search engines to index and can provide a poor user experience. For AI agents, a Word document is an &quot;Unstructured Risk&quot;: they prefer PDFs or raw HTML because the data is more stable and easier to &quot;scrape&quot; accurately.",
                "fails": "While Google can index Word docs, they rarely rank well. When a user clicks a .doc link, it often forces a download rather than opening in the browser. This breaks the user&#x27;s flow, often leading them to close the tab immediately, which signals to Google that your content wasn&#x27;t helpful. AI scrapers use &quot;Fixed-Layout Ingestion.&quot; A PDF preserves the exact structure of your tables, headers, and images. A Word doc can change its layout depending on what software opens it. This creates &quot;Extraction Uncertainty&quot;: the AI might misinterpret your main content because the document&#x27;s structure shifted during the reading process.",
                "fix": "Convert all downloadable documents to PDF format:: Universality: Ensure your content can be read on any phone, tablet, or laptop without needing extra apps.: Security: PDFs can be locked to prevent unauthorized editing, which protects your &quot;Expert Sentiment.&quot;: Stability: Use PDFs to ensure AI agents see your data exactly as you intended it to be seen. By switching to PDFs, you provide a Standardized Path for both human readers and AI crawlers."
              },
              {
                "id": "test-href_attributes_detection",
                "title": "Href Attributes Detection",
                "checks": "Checks all anchor &lt;a&gt; tags to ensure they contain a valid, functional href attribute.",
                "why": "This test audits all anchor &lt;a&gt; tags to ensure they contain a valid, functional href attribute. In SEO, every link should be a clear path to new information. For AI agents, an empty href is a &quot;Logic Gap&quot;: the machine sees an invitation to access but no &quot;Address&quot; to follow, which can cause the scraper to stall or flag the page code as low-quality.",
                "fails": "Search engines like Google will fail to discover and pass &quot;Link Equity&quot; to your internal pages, leading to poor rankings for your deep content. AI scrapers use links to understand the Relationship between your pages. When they encounter an empty link, it creates Semantic Friction. The AI has to use extra processing power to determine if the link is a mistake or a hidden element. This reduces your &quot;Scrapability Score.&quot;",
                "fix": "Every link tag must have a valid destination. 1. Provide a URL: Ensure the href=&#x27;&#x27; &quot; is filled with a real web address. 2. Use a Button: If the element is meant to trigger a pop-up or a function (not a new page), use a &quot;&lt;button&gt;&quot; tag instead of a link tag. 3. Remove the Tag: If the link is no longer needed, delete the &lt;a&gt; tags entirely. By cleaning up these &quot;Ghost Links,&quot; you provide a frictionless path for AI agents to follow, ensuring they spend their time learning from your data rather than getting stuck on broken code."
              },
              {
                "id": "test-html_lang_attribute_identifier",
                "title": "HTML Lang Attribute Identifier",
                "checks": "Verifies the presence of the &quot;lang&quot; attribute within the &lt;html&gt; tag of your code.",
                "why": "This test verifies the presence of the &quot;lang&quot; attribute within the &lt;html&gt; tag of your code. In SEO, this helps search engines categorize your page for regional search results. For AI agents, this is the &quot;Linguistic Anchor&quot;: it tells the machine exactly which dictionary to use to interpret your content correctly.",
                "fails": "Without a lang tag, Google might struggle to determine if your page is meant for a specific country. This can lead to &quot;Regional Misplacement,&quot; where your Spanish-language site for Mexico accidentally shows up in searches for Spain, or doesn&#x27;t show up at all for your target audience. AI bots process your site almost instantly. If you do not define the language in the code, the AI is forced to guess the language. If the AI guesses incorrectly, it will likely mistranslate your content or apply the wrong tone. This means when an AI summarizes your business for a potential customer, it may use clunky phrasing or incorrect vocabulary, directly damaging your professional credibility.",
                "fix": "Ensure your developer adds the correct language code to the very first line of your website&#x27;s code: Be Specific: Use lang=&quot;en&quot; for English, lang=&quot;es&quot; for Spanish, or lang=&quot;fr&quot; for French. Regional Accuracy: If your content is specifically for a region, use a sub-tag like lang=&quot;en-US&quot; (English for the USA) or lang=&quot;en-GB&quot; (English for the UK). By labeling your language clearly, you give AI bots a guaranteed path to follow. This ensures they can translate and summarize your professional advice perfectly, without having to guess what you are trying to say."
              },
              {
                "id": "test-meta_keyword_presence",
                "title": "Meta Keyword Presence",
                "checks": "This test checks if the page uses the &lt;meta name=&#x27;keywords&#x27;&gt; tag.",
                "why": "This test checks if the page uses the &lt;meta name=&#x27;keywords&#x27;&gt; tag. In the early days of SEO, this was where you listed the words you wanted to rank for. Today, major search engines like Google ignore them completely. For AI agents, this tag is mostly ignored in favor of reading your actual sentences, though it can occasionally be used as a tiny hint for the page&#x27;s main topic.",
                "fails": "Major search engines abandoned the meta keywords tag over a decade ago. Today, it provides absolutely zero SEO or AI visibility value. Worse, leaving these tags on your pages adds unnecessary code bloat and publicly exposes your exact target keyword strategy to your competitors.",
                "fix": "Remove them entirely: Do not waste any time manually writing or generating meta keywords for new or existing pages."
              },
              {
                "id": "test-meta_refresh_identifier",
                "title": "Meta Refresh Identifier",
                "checks": "Checks for the &quot;&lt;meta http-equiv=&#x27;refresh&#x27;&gt;&quot; tag in your page code.",
                "why": "This test looks for the &quot;&lt;meta http-equiv=&#x27;refresh&#x27;&gt;&quot; tag in your page code. In SEO, these are considered unreliable redirects that search engines often ignore or penalize. For AI agents, this is an &quot;Unpredictable Jump&quot;: the machine starts reading your content, but the page suddenly changes, which can break the agent&#x27;s logic flow and lead to incomplete data indexing.",
                "fails": "Google prefers 301 Redirects (permanent server-side moves). When you use a Meta Refresh, the &quot;Ranking Power&quot; of the old page often fails to transfer to the new one. It can also be flagged as a &quot;Sneaky Redirect,&quot; which is a violation of Google’s quality guidelines and can lead to your site being de-indexed. AI scrapers are built for speed. If a page has a 5-second refresh timer, the AI might finish its scrape and leave before the refresh even happens, or it might hit the second page and lose the context of the first.",
                "fix": "Stop using Meta Refresh tags and switch to Server-Side Redirects: 301 Redirect: Use this for permanent moves. It tells the search engine, &quot;This page has moved forever; give all the credit to the new URL."
              },
              {
                "id": "test-style_attribute_hygiene",
                "title": "Style Attribute Hygiene",
                "checks": "Checks the HTML source code for the presence of the &quot;style=&quot; attribute within individual elements.",
                "why": "This test audits the HTML source code for the presence of the &quot;style=&quot; attribute within individual elements. While inline styles are technically functional, they create &quot;Code Bloat&quot; that intertwines presentation with information. In a modern technical framework, visual instructions should be abstracted into external CSS files to maintain a clean Text-to-HTML ratio.",
                "fails": "Excessive inline styles increase the page&#x27;s byte size and can lead to slower parsing times. It also makes site-wide design updates a nightmare, which indirectly leads to inconsistent User Experience (UX), a known Google ranking factor. AI agents use &quot;Tag-to-Text Analysis&quot; to understand content hierarchy. When your HTML is littered with inline styles, the &quot;Noise Floor&quot; of the document rises. The agent has to work harder to &quot;Tokenize&quot; your text because it is constantly interrupted by style strings.",
                "fix": "Migrate all inline styles to a centralized external CSS stylesheet. Use semantic classes (e.g., .expert-insight instead of style=&#x27;...&#x27;) to provide both a visual and a programmatic signal of the content&#x27;s importance."
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
                "checks": "Checks for analytics tracking snippets.",
                "why": "This test audits the page for the presence of analytics tracking snippets (such as Google Analytics 4, Adobe Analytics, or privacy-first alternatives). In SEO, analytics allow you to measure &quot;Dwell Time&quot; and &quot;Engagement,&quot; which are critical indirect ranking signals. For AI agents, analytics, specifically those that track bot behavior, provide the &quot;Access Audit Trail,&quot; allowing site owners to see which AI models are scraping their content and how they are navigating the site.&quot;",
                "fails": "Without tracking, you cannot identify which pages are performing well or where users are &quot;bouncing.&quot; This makes it impossible to optimize your content for human access and authority. In 2026, the battle for visibility happens in the &quot;AI Attribution&quot; space. If analytics are missing, you cannot measure &quot;Referral Traffic&quot; from AI agents like SearchGPT or Gemini. This results in a Strategic Access Gap, you cannot verify if your Expert Sentiment is actually being accessed and cited by AI models.",
                "fix": "Ensure a global analytics tracking snippet is correctly implemented on every indexable page. Prioritize configurations that can distinguish between human traffic and AI-bot traffic. This secures the &quot;Data Feedback Access&quot; needed to refine your site’s visibility in a machine-driven search economy."
              },
              {
                "id": "test-visual_analytics_presence",
                "title": "Visual Analytics Presence",
                "checks": "Checks for visual behavioral tracking tools like Hotjar, Microsoft Clarity, or Mouseflow.",
                "why": "This test audits the page for the presence of visual behavioral tracking tools like Hotjar, Microsoft Clarity, or Mouseflow. In SEO, these tools provide the &quot;why&quot; behind high bounce rates or low conversion. For AI agents, this data is the foundation of &quot;UX-Signal Optimization.&quot; Understanding how humans visually navigate your content allows you to restructure your data to ensure the most critical &quot;Expert Insights&quot; are in the primary Access Path.",
                "fails": "You cannot see where users stopped scrolling. This leads to a User Experience (UX) failure, which Google uses as a primary signal for ranking in 2026. If users cannot find (access) what they need, your rankings will drop. AI agents prioritize content that is &quot;high-engagement.&quot; If your page layout blocks human users from easily accessing information (e.g., a massive popup or confusing layout), AI models may eventually flag the URL as &quot;Low-Utility/Obstructive.&quot;",
                "fix": "Implement a visual analytics layer on key landing pages and high-traffic expert content. Analyze session recordings to identify &quot;Content Friction.&quot;"
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
                "checks": "Ensures your website has a designated &quot;default&quot; page for international visitors who don&#x27;t match your specific language settings.",
                "why": "Ensures your website has a designated &quot;default&quot; page for international visitors who don&#x27;t match your specific language settings.",
                "fails": "The website lacks a designated &quot;Universal Destination&quot; for international visitors. Without this safety net, search engines and AI agents are forced to guess which language or regional version to show a visitor when a perfect match isn&#x27;t available. This often results in &quot;Cross-Language Friction,&quot; where a user in one country is accidentally served content in a different language, leading to an immediate loss of trust, and high bounce rates.",
                "fix": "Define a default page for your international audience. Update your site&#x27;s header tags or Sitemap to include an x-default attribute that points to your primary language version (e.g., your English homepage). This ensures that any visitor whose language isn&#x27;t specifically supported is automatically routed to your most authoritative global version instead of landing on a broken or irrelevant page."
              },
              {
                "id": "test-hreflang_language_code_validator",
                "title": "Hreflang Language Code Validator",
                "checks": "Checks if your language and region codes are official and recognizable.",
                "why": "This test checks if your language and region codes are official and recognizable. Search engines use specific international standards (ISO codes). If you use an unofficial code or make a typo, the search engine will ignore your language settings entirely.",
                "fails": "The page contains &quot;Invalid Language Codes.&quot; For example, using &quot;fr-UK&quot; (French in the UK) or &quot;us&quot; instead of &quot;en-us.&quot; When a code is invalid, search engines cannot understand which audience the page is for. This leads to your global pages being ignored in local search results and causes &quot;Language Mismatch&quot; for your users.",
                "fix": "Audit your language tags and replace any unofficial codes with the correct ISO format. For example, use en for English, es for Spanish, and fr for French. Ensure the combination of language and region follows the standard language-country format."
              },
              {
                "id": "test-hreflang_return_links",
                "title": "Hreflang Return Links",
                "checks": "Verifies that all international alternate pages have Return Links.",
                "why": "This test verifies that all international alternate pages have Return Links. Hreflang is a reciprocal protocol, if Page X points to Page Y as an alternate, Page Y must point back to Page X. In SEO, missing return links cause search engines to ignore your localization instructions. For AI agents, this is a &quot;Geospatial Context&quot; signal: it helps the agent serve the correct &quot;regional Expert Sentiment&quot; to the user.",
                "fails": "When return links are missing, Google Search Console triggers a &quot;No Return Tag&quot; error. Because the relationship isn&#x27;t confirmed by both sides, Google may default to showing the wrong language version in search results (e.g., showing a UK English page to a US user). This leads to high bounce rates and poor conversion as users land on pages with the wrong currency, shipping info, or spelling. AI assistants provide &quot;Hyper-Localized Answers.&quot; If the hreflang return links are broken, the AI may fail to connect your regional subdomains. It might ingest your global brand data but miss the specific localized nuances (like regional pricing or local compliance) because the map between languages was incomplete.",
                "fix": "Map Your Alternates: For every page that has a localized version, ensure the code contains a full list of all alternates, including the page itself (self-referencing). Verify the Return: Use a crawling tool to confirm that if the English page points to the French page, the French page contains a tag pointing back to the English URL. Check for URL Accuracy: Ensure the return link uses the absolute, canonical URL. Even a slight mismatch (like http vs https) will break the reciprocity and cause the tag to be ignored."
              },
              {
                "id": "test-hreflang_tag_validator",
                "title": "Hreflang Tag Validator",
                "checks": "Checks if the page has at least one language or region attribute (hreflang) defined.",
                "why": "This test checks if the page has at least one language or region attribute (hreflang) defined.",
                "fails": "The page is missing its &quot;International Signal.&quot; Even if you have versions of this page in other languages, search engines don&#x27;t know they exist because there is no code connecting them.",
                "fix": "adding at least one link rel=&quot;alternate&quot; hreflang=&quot;...&quot; tag to the page&#x27;s &lt;head&gt;."
              },
              {
                "id": "test-hreflang_target_consistency",
                "title": "Hreflang Target Consistency",
                "checks": "Verifies that each language and region is assigned to exactly one unique page.",
                "why": "This test verifies that each language and region is assigned to exactly one unique page. Providing multiple &quot;targets&quot; for the same audience creates a conflict, forcing search engines to choose one and ignore the other. Ensuring a 1:1 relationship between a language and a URL creates a clear, stable path for your global visitors.",
                "fails": "The page contains &quot;Competing Destinations.&quot; For example, you might have two different links both claiming to be the official &quot;French&quot; version. This causes &quot;Ranking Cannibalization,&quot; where your own pages fight each other for the same spot in search results. It leads to indexing instability and can result in the wrong page being shown to your audience.",
                "fix": "Review your technical header &lt;head&gt; and remove any duplicate language assignments. Ensure that each unique hreflang code (like en-us or fr-fr) points to only one specific URL. Every audience should have one clear destination."
              },
              {
                "id": "test-hreflang_url_structure_checker",
                "title": "Hreflang URL Structure Checker",
                "checks": "Checks if your international links use the full website address (Absolute URL).",
                "why": "This test checks if your international links use the full website address (Absolute URL). Every link must include &quot;https://&quot; and your domain name to ensure search engines can find the page correctly.",
                "fails": "The links use shortcuts (Relative URLs) instead of full addresses. This confuses search engines and can lead to &quot;Page Not Found&quot; errors or the wrong language appearing in search results. It makes the site&#x27;s global setup unreliable.",
                "fix": "Change all links in the language tags to the full URL format. Ensure they start with &quot;https://www.yourdomain.com/.&quot;"
              },
              {
                "id": "test-langauge_identify_confirmation",
                "title": "Langauge Identify Confirmation",
                "checks": "Confirms that the page explicitly identifies its own language and region to search engines.",
                "why": "This test confirms that the page explicitly identifies its own language and region to search engines. In a global setup, every page must &quot;sign&quot; its own identity while also pointing to its foreign-language counterparts.",
                "fails": "The page is missing its Identity Signature. Without this, the link between your different language versions is broken. Search engines may get confused and show the wrong version to your visitors: like showing an English page to a French customer. This fragmentation makes your brand look disorganized to AI and lowers your global ranking power.",
                "fix": "Update the page&#x27;s &lt;head&gt; tag to include a self-pointing reference. e.g &lt;head&gt; &lt;title&gt;Poliris Global Audit&lt;/title&gt; &lt;link rel=&quot;alternate&quot; hreflang=&quot;es&quot; href=&quot;https://example.com/es/page&quot; /&gt; &lt;link rel=&quot;alternate&quot; hreflang=&quot;en&quot; href=&quot;https://example.com/en/page&quot; /&gt; &lt;link rel=&quot;alternate&quot; hreflang=&quot;x-default&quot; href=&quot;https://example.com/en/page&quot; /&gt; &lt;/head&gt;"
              },
              {
                "id": "test-official_language_connection",
                "title": "Official Language Connection",
                "checks": "Verifies that all international return links point only to the Canonical (Master) version of the page.",
                "why": "This test verifies that all international return links point only to the Canonical (Master) version of the page. In SEO, hreflang tags must be reciprocal and point to the official URL. For AI agents, this is a &quot;Source of Truth&quot; verification. If the links point to non-canonical URLs, the AI may struggle to determine which version of your brand&#x27;s expertise is the most current.",
                "fails": "When an international return link points to a non-canonical URL (like a URL with ?source=ref at the end), Google sees a Mismatch Error. Because the &quot;Handshake&quot; isn&#x27;t clean, Google may ignore your hreflang tags entirely. This results in the wrong language version appearing in search results, frustrating users and tanking your international conversion rates. AI scrapers use &quot;Canonical Mapping&quot; to consolidate data. If your international links point to &quot;dirty&quot; or non-canonical URLs, the AI triggers a &quot;Data Redundancy Warning.&quot; It might ingest the same content multiple times under different URLs, leading to a diluted and confused representation of your &quot;Expert Sentiment&quot; in different regions.",
                "fix": "Use Clean URLs: Audit your hreflang tags to ensure they point to the exact URL set in the page&#x27;s canonical tag. No tracking parameters, no fragments, and no session IDs. Verify Reciprocity: If the US page points to the Spanish page, the Spanish page must point back to the official US URL. Strict URL Standards: Ensure that protocols (https) and trailing slashes (/) match perfectly between the hreflang tag and the canonical tag. Even a tiny difference will break the handshake."
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
                "checks": "Identifies images that are missing the alt (alternative text) attribute.",
                "why": "This test identifies images that are missing the alt (alternative text) attribute. Alt tags are the primary method used by search engines and AI agents to understand the subject matter of an image. Without this attribute, the visual content of your site is blind to crawlers, and the context provided by those images is lost to the Knowledge Graph.",
                "fails": "When an image lacks an alt attribute, it creates a massive gap in your site&#x27;s data integrity. Search engines cannot &quot;see&quot; the image. Without descriptive text, your graphics will not appear in Google Image Search, and the page loses a critical relevance signal. For an AI agent, this results in &quot;Contextual Loss.&quot; If your page uses a chart or process diagram to prove a point, the AI will ignore that data entirely. This creates a Sentiment Gap where the AI perceives your content as thin or unverified because it cannot process the evidence hidden inside the graphic.",
                "fix": "Perform an audit of all site imagery to ensure every non-decorative image has a descriptive, keyword-relevant alt tag."
              },
              {
                "id": "test-image_availability",
                "title": "Image Availability",
                "checks": "Checks that every image on the page loads, including images hosted on other sites.",
                "why": "This test checks that every image the page loads actually responds, whatever site hosts it. An image that returns 404, 410 or a server error (5xx) shows as a broken or empty frame. In SEO, broken images signal a neglected page and lose their place in image search. For AI agents, a missing image removes the visual evidence the text refers to. Images that refuse automated checks (401, 403, 405, 429) are named but not counted.",
                "fails": "Visitors see broken or empty image frames, and search engines and AI agents find image references that lead nowhere. Images loaded from a staging or retired host break without any change on your own site.",
                "fix": "Replace each broken image URL with one that loads, usually by uploading the file to your own media library, or remove the image. Check that no image still points to a staging or development host."
              },
              {
                "id": "test-image_format_standardization",
                "title": "Image Format Standardization",
                "checks": "This test audits the site to ensure all visual assets utilize industry-standard web formats (JPEG, PNG, GIF, SVG, ICO, WebP, AVIF).",
                "why": "This test audits the site to ensure all visual assets utilize industry-standard web formats (JPEG, PNG, GIF, SVG, ICO, WebP, AVIF).",
                "fails": "A state where the use of non-standard image formats creates a hard barrier for both legacy SEO crawlers and modern AI agents. From an SEO perspective, search engines may simply ignore unsupported file types, leading to a loss in image search visibility and fragmented page context. In the 2026 AI-first landscape, this causes a &quot;Logic Break&quot; during data ingestion. If an AI agent cannot natively parse the file structure, it will fail to &quot;see&quot; the image.",
                "fix": "Convert any non-standard image formats (such as BMP, TIFF, or high-resolution RAW files) into universal web standards like WebP or high-quality JPEG."
              },
              {
                "id": "test-image_optimization",
                "title": "Image Optimization",
                "checks": "Checks the individual file size of every image asset on the page.",
                "why": "This test audits the individual file size of every image asset on the page. In SEO, keeping images under 100 KB is a critical benchmark for maintaining ultra-fast load times and passing Core Web Vitals. From an AI standpoint, this ensures that your visual data is &quot;lightweight&quot; enough to be indexed in real-time without exceeding the compute budget of the AI agent.",
                "fails": "Images exceeding 100 KB act as primary drivers for slow &quot;Time to Interactive&quot; (TTI) and unstable layout shifts, directly triggering search ranking penalties on mobile devices. In the 2026 AI-first environment, this creates &quot;Ingestion Latency&quot; for high-speed agents, which prioritize rapid data ingestion and may timeout on heavy visual assets to focus solely on text.",
                "fix": "Compress all images to fall below the 100 KB threshold without sacrificing visual clarity. Use &quot;Lossy&quot; compression and &quot;Responsive Image&quot; (srcset) attributes to ensure that mobile users and AI agents aren&#x27;t forced to download a desktop-sized 500 KB image when a 50 KB version will suffice."
              },
              {
                "id": "test-modern_image_format",
                "title": "Modern Image Format",
                "checks": "Checks the site’s use of image formats, specifically identifying legacy file types like JPEG and PNG.",
                "why": "This test audits the site’s use of image formats, specifically identifying legacy file types like JPEG and PNG. In the SEO landscape, modern formats like WebP and AVIF are the industry standard for meeting Core Web Vitals (CWV) requirements. From an AI perspective, smaller, highly-compressed files allow AI agents to ingest visual data more efficiently, reducing the risk of timeouts during a crawl.",
                "fails": "The site is suffering from &quot;Asset Bloat,&quot; a technical friction point that triggers a dual penalty in performance and intelligence. From a SEO standpoint, legacy image formats significantly increase the Largest Contentful Paint (LCP), leading to degraded mobile experiences and direct ranking demotions. However, the AI impact is even more critical. AI agents operate on a strict &quot;Compute Budget,&quot; meaning large, unoptimized assets are often deprioritized or bypassed to save processing power. This results in &quot;Visual Data Latency,&quot; where your site’s graphics and evidence are skipped during the AI’s knowledge synthesis, allowing faster, more &quot;Scrapable&quot; competitors to claim the primary citation in AI-generated answers.",
                "fix": "Implement an automated image conversion protocol to serve all visual assets in WebP or AVIF formats. This ensures high-fidelity visuals at a fraction of the file size."
              },
              {
                "id": "test-secure_image_delivery",
                "title": "Secure Image Delivery",
                "checks": "Checks the security protocol of all visual assets to ensure they are served via HTTPS.",
                "why": "This test audits the security protocol of all visual assets to ensure they are served via HTTPS. On a secure website, every single element, including images, must match the site&#x27;s security certificate. Serving images over an unencrypted HTTP connection on an HTTPS page triggers &quot;Mixed Content&quot; warnings, which undermines the encrypted environment and compromises data integrity.",
                "fails": "The page is suffering from &quot;Mixed Content Vulnerability,&quot; a state where insecure image requests trigger browser security warnings and negatively impact your Technical SEO trust signals. From a search perspective, Google and other engines prioritize &quot;Secure-at-all-Points&quot; sites. In the 2026 AI-first landscape, this creates an &quot;Access Block&quot; for high-security AI agents and scrapers, which are programmed to ignore or block unencrypted content to prevent data leaks. This means your brand’s visual evidence and diagrams will fail to load for the AI.",
                "fix": "Perform a global search-and-replace to update all image source URLs from &quot;http://&quot; to &quot;https://.&quot; Ensure that your Content Delivery Network (CDN) or hosting server is configured to force SSL for all media assets."
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
                "checks": "Checks the character count of the &lt;meta name=&quot;description&quot;&gt; tag.",
                "why": "This test audits the character count of the &lt;meta name=&quot;description&quot;&gt; tag. To maintain professional visibility and technical clarity, the description must fall between 120 and 155 characters. In SEO, this range ensures that your message is fully visible in search results without being cut off. For AI agents, this represents the &quot;Optimal Signal Window,&quot; a concise enough string to be tokenized efficiently while providing enough data to map your expert sentiment.",
                "fails": "Descriptions under 120 characters are often too thin to persuade a user to click, while those over 155 characters are truncated by search engines, often cutting off your primary call-to-action or unique value proposition. AI agents use this tag as a &quot;Priority Abstract.&quot; If the description is too long, the AI may experience &quot;Inference Latency,&quot; where it has to guess the priority of the information.",
                "fix": "Refine all meta descriptions to stay within the 120-155 character"
              },
              {
                "id": "test-meta_description_occurrence",
                "title": "Meta Description Occurrence",
                "checks": "Checks the HTML to ensure that only one &lt;meta name=&quot;description&quot;&gt; tag exists on the page.",
                "why": "This test audits the HTML to ensure that only one &lt;meta name=&quot;description&quot;&gt; tag exists on the page. In SEO, multiple meta descriptions confuse search engines and often lead to the wrong snippet being displayed in search results. For AI agents, this property is the &quot;Primary Knowledge Abstract,&quot; having more than one creates a structural redundancy that compromises the machine-readability of the page.",
                "fails": "The presence of multiple descriptions causes search engines to ignore your intended brand message and default to random page text, leading to a loss of first-impression control and a diminished CTR. In the 2026 AI-first environment, this technical conflict triggers a &quot;Reliability Flag&quot; during ingestion as agents like Perplexity or GPT-based crawlers encounter &quot;Conflicting Directives.&quot;",
                "fix": "Perform a technical audit to identify and remove duplicate meta description tags. Ensure that your CMS or SEO plugins, or manual implementation are configured to output only one unique, high-quality description per URL."
              },
              {
                "id": "test-meta_description_presence",
                "title": "Meta Description Presence",
                "checks": "Checks the HTML for the presence of the &lt;meta name=&quot;description&quot;&gt; tag.",
                "why": "This test audits the HTML for the presence of the &lt;meta name=&quot;description&quot;&gt; tag. This tag is the &quot;Elevator Pitch&quot; for your page in Search Engine Results Pages (SERPs), directly influencing Click-Through Rate (CTR). For AI agents, the meta description serves as a &quot;High-Level Semantic Abstract,&quot; that provides a pre-verified summary that helps the agent classify your expert sentiment",
                "fails": "Without a defined meta description, search engines will scrape random, often disjointed snippets from the page. This leads to a messy and unprofessional appearance in search results, resulting in a significant loss of organic traffic and brand authority. AI Agents utilize the meta description for &quot;Initial Knowledge Filtering.&quot; If the tag is missing, the AI is forced to auto-summarize the page using its own logic that may cause &quot;Hallucination Risk.&quot;",
                "fix": "Craft a unique, keyword-rich meta description for every page that accurately reflects the &quot;Expert Sentiment&quot; of the content."
              },
              {
                "id": "test-meta_description_uniqueness",
                "title": "Meta Description Uniqueness",
                "checks": "Identifies pages that share identical Meta Descriptions.",
                "why": "This test identifies pages that share identical Meta Descriptions. When descriptions are duplicated, search engine result pages (SERPs) look repetitive and unprofessional. Furthermore, AI-powered search assistants use these descriptions to understand the specific nuance of a page",
                "fails": "When a user sees three different pages from your site with the exact same description, they perceive the content as low-quality or automated. This leads to a lower Click-Through Rate (CTR). For 2026 AI discovery, duplicate descriptions cause &quot;Summary Blurring,&quot; where LLMs may group distinct pages together as a single entity.",
                "fix": "Craft a unique Meta Description for every indexable page. The description should be between 140-160 characters and specifically describe the value found only on that specific URL."
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
                "checks": "Checks for the &quot;og:description&quot; tag in your site&#x27;s metadata.",
                "why": "Open Graph Descriptions outside the 55-155 character range risk being truncated on mobile messaging UIs or lacking the &quot;signal density&quot; required to drive a click. For AI agents, a description that is too short or cut off prevents accurate content extraction, often resulting in vague or incomplete summaries in AI-generated chat answers.",
                "fails": "When your description exceeds the character limit, platforms like mobile LinkedIn or X will cut the text off with an ellipsis (...). If your Call to Action or key value proposition is at the end, users will never see it. This results in a lower Click-Through Rate (CTR) because the &quot;hook&quot; of your content is hidden. I scrapers often use the &quot;og:description&quot; as a &quot;Primary Hook&quot; for voice assistants and chat previews. If the description is a rambling paragraph, the AI triggers a &quot;Summarization Penalty,&quot; and may choose to ignore your provided text",
                "fix": "Treat your og:description like a high-value advertisement: Front-Load the Value: Put the most exciting or important fact in the first 40 characters."
              },
              {
                "id": "test-og_description_presence",
                "title": "OG Description Presence",
                "checks": "Checks for the &quot;og:description&quot; tag in your site&#x27;s metadata.",
                "why": "This test checks for the &quot;og:description&quot; tag in your site&#x27;s metadata. In SEO, this tag defines the snippet of text shown when your link is shared on social platforms. For AI agents, this is the &quot;Contextual Summary&quot;: it provides a pre-digested explanation of your page&#x27;s value, which AI models use to verify if your content matches a user&#x27;s intent.",
                "fails": "Without this tag, platforms like LinkedIn or Facebook will scrape random text from your page. This looks unprofessional and significantly lowers your Click-Through Rate (CTR), meaning fewer people &quot;access&quot; your content. AI scrapers use Open Graph descriptions for &quot;Entity Verification.&quot; If the description is missing, the AI has to &quot;guess&quot; the core theme of your page based on the full body text. This leads to &quot;Summarization Lag,&quot; where the AI might not be able to quickly provide a snippet of your &quot;Expert Sentiment.&quot;",
                "fix": "Write a unique, compelling summary for your social media tag: Be Brief: Keep it between 150-160 characters to avoid it being cut off. Add Value: Don&#x27;t just repeat the title: explain why the user should click. Code Format: &lt;meta property=&#x27;og:description&#x27; content=&#x27;Discover expert 2026 SEO strategies to boost your AI visibility and search rankings.&#x27; /&gt; By providing this summary, you ensure a frictionless entry for users and a clear &quot;cheat sheet&quot; for AI agents."
              },
              {
                "id": "test-og_image_presence",
                "title": "OG Image Presence",
                "checks": "Checks your code for the &quot;og:image&quot; property.",
                "why": "This test audits your code for the &quot;og:image&quot; property. In SEO, this is the most critical factor for social media Click-Through Rate (CTR). For AI agents, this tag provides visual context, it tells the machine which specific image best represents the &quot;Core Expert Sentiment&quot; of your page.",
                "fails": "When your link is shared on LinkedIn, X, or Facebook without an og:image, the platform will either show a blank box or scrape a random, irrelevant image (like a tiny logo or a generic icon). This looks unprofessional and makes your content appear untrustworthy or broken. When a user asks an AI assistant for a recommendation, the AI may be unable to provide a visual preview of your brand or product, causing the user to choose a competitor whose &quot;Visual Identity&quot; is clearly defined in their metadata.",
                "fix": "Assign a specific, high-resolution image to every page: Dimensions: Use an image that is 1200 x 630 pixels for the best display across all platforms. Relevance: Choose an image that actually reflects the content (e.g., a chart for a data post, or a product photo for a shop page)."
              },
              {
                "id": "test-og_title_length",
                "title": "OG Title Length",
                "checks": "Measures the character count of your og:title.",
                "why": "This test measures the character count of your og:title. In SEO, a title under 60 characters ensures your full message is visible in social feeds. For AI agents, this is about &quot;Signal Clarity&quot;: a concise title allows the machine to immediately categorize your page without processing redundant text.",
                "fails": "When a title exceeds 60 characters, platforms like LinkedIn or X will truncate the text. If your most important keywords or your brand name are at the end of the title, they disappear. This significantly lowers your Click-Through Rate (CTR) because the user only sees a partial, confusing thought. In 2026, AI scrapers prioritize &quot;Density of Information.&quot; A long, rambling title triggers a &quot;Noise Penalty,&quot; the AI may struggle to extract the core entity of your page.",
                "fix": "Refine your social titles to be punchy and informative: Front-Load Keywords: Put your most important topic at the very beginning of the title."
              },
              {
                "id": "test-og_title_presence",
                "title": "OG Title Presence",
                "checks": "Checks for the &quot;og:title&quot; tag in your page&#x27;s hidden code.",
                "why": "This test checks for the &quot;og:title&quot; tag in your page&#x27;s hidden code. In SEO, this tag controls how your content looks when shared on social media, which directly affects your Click-Through Rate (CTR). For AI agents, this is a &quot;High-Level Summary&quot;: AI assistants often use Open Graph tags as a quick way to understand the main idea of a page before reading the full text.",
                "fails": "If the &quot;og:title&quot; is missing, social platforms will try to guess a title from your page. Often, they pick something generic like &quot;Home&quot; or untitled, which looks unprofessional. AI scrapers use Open Graph data for &quot;Rapid Classification.&quot; If this tag is missing, the AI triggers a &quot;Metadata Gap.&quot; It has to work harder to summarize your page, which can lead to an inaccurate preview in AI-generated chat responses.",
                "fix": "Ensure your site&#x27;s code includes a specific Open Graph title tag. Match the Content: The &quot;og:title&quot; should be very similar to your main page title. Be Punchy: Keep it under 60 characters so it doesn&#x27;t get cut off on mobile screens. Use the Format: &lt;meta property=&#x27;og:title&#x27; content=&#x27;Your Catchy Headline Here&#x27; /&gt;"
              },
              {
                "id": "test-og_url_presence",
                "title": "OG URL Presence",
                "checks": "Checks the &quot;og:url&quot; property in your metadata.",
                "why": "This test audits the &quot;og:url&quot; property in your metadata. In SEO, this tag acts like a social-specific &quot;Canonical Tag,&quot; ensuring all engagement (likes, shares) points to a single, preferred URL. For AI agents, this is a &quot;Source of Truth&quot; anchor: it helps the machine identify the definitive version of a page when multiple versions of a link might exist across the web.",
                "fails": "Without this tag, social platforms might treat different versions of the same link (e.g., &quot;yoursite.com/page&quot; vs &quot;yoursite.com/page?source=social&quot;) as separate entities. This splits your &quot;Engagement Equity,&quot; making it harder for search engines to see how popular your content actually is. AI scrapers deal with massive amounts of &quot;noise&quot; and duplicate URLs. If the &quot;og:url&quot; is missing, the AI triggers a &quot;Data Disambiguation Loop.&quot; It has to spend more energy verifying which URL is the official one.",
                "fix": "Ensure your metadata includes the absolute, permanent URL for the current page."
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
                "checks": "Checks the character count of the primary &lt;h1&gt; tag.",
                "why": "This test audits the character count of the primary &lt;h1&gt; tag. An effective H1 should be between 20 and 70 characters to balance descriptive depth with punchy clarity. In SEO, this range ensures the headline is fully visible in search snippets and browser tabs. For AI agents, this length provides a &quot;High-Signal Summary&quot; that clearly defines the page&#x27;s core expertise without unnecessary noise.",
                "fails": "Headers under 20 characters lack the specificity to rank for intent, while those over 70 characters risk truncation or being flagged as &quot;keyword stuffing&quot; by modern search algorithms. In a 2026 AI-first environment, this imbalance disrupts the H1&#x27;s role as the primary &quot;Semantic Anchor,&quot; an overly short headline provides insufficient data for AI agents like ChatGPT or Gemini to categorize your &quot;Main Content.&quot;",
                "fix": "Refine the primary headline to fall within the 20-70 characters. Ensure the H1 is descriptive, incorporates your primary keyword, and captures the specific value proposition of the content."
              },
              {
                "id": "test-h2_tag_length_requirements",
                "title": "H2 Tag Length Requirements",
                "checks": "Checks the character count of all &lt;h2&gt; tags on the page.",
                "why": "This test audits the character count of all &lt;h2&gt; tags on the page. Like the H1, H2 headers should fall within the 20-70 character range to remain descriptive yet concise.",
                "fails": "H2s that are too short (e.g., &quot;Summary&quot;) offer no keyword value and fail to help search engines understand the breadth of your expertise. AI Agents use H2s as &quot;Retrieval Pointers.&quot; When an AI is asked a specific question, it looks for an H2 that matches the intent. An optimized H2 allows for High-Speed Ingestion.",
                "fix": "Refine your sub-headings to be descriptive, keyword-rich &quot;Signposts&quot; between 20 and 70 characters."
              },
              {
                "id": "test-h2_tag_presence",
                "title": "H2 Tag Presence",
                "checks": "Checks the document for the presence of &lt;h2&gt; tags.",
                "why": "This test audits the document for the presence of &lt;h2&gt; tags. H2s are the primary sub-headings that break a page into logical, digestible sections. In SEO, H2s allow you to target secondary keywords and provide a clear topical map. For AI agents, H2s serve as &quot;Semantic Dividers,&quot; they allow the agent to &quot;Chunk&quot; your data into specific knowledge blocks for more precise retrieval and summarization.",
                "fails": "The lack of H2s creates a &quot;Wall of Text&quot; that drives higher bounce rates and lowers &quot;Dwell Time&quot; while simultaneously diluting your ranking potential by making it difficult for search engines to identify specific sub-topics of expertise. In the 2026 landscape, this absence of structure disrupts an AI agent&#x27;s ability to perform &quot;Rapid Chunking.&quot;",
                "fix": "Organize your content into logical chapters using at least one (and preferably several) &lt;h2&gt; tags. Each H2 should represent a distinct sub-topic or &quot;Expert Insight&quot; that supports the primary H1 title."
              },
              {
                "id": "test-heading_hierarchy",
                "title": "Heading Hierarchy",
                "checks": "Checks the document structure to ensure that heading levels (H1 through H6) follow a logical, descending order.",
                "why": "This test audits the document structure to ensure that heading levels (H1 through H6) follow a logical, descending order. In SEO, a proper hierarchy helps search engines understand the relationship between primary topics and sub-topics. For AI agents, this structure acts as the &quot;Table of Contents&quot; for your data.",
                "fails": "From an SEO perspective, skipping heading levels (like jumping from H1 to H3) confuses crawlers about the importance of your content, which can dilute your ranking power for key sub-topics. In the 2026 AI-first landscape, this results in &quot;Contextual Disconnection.&quot; AI agents use heading levels to nest information in their internal knowledge graphs.",
                "fix": "Restructure the page HTML so heading levels step down one at a time without skipping. For example, an H3 should follow an H2, not jump straight from an H2 to an H4. You can still repeat the same level (multiple H2s or H3s) as long as deeper levels are introduced in order."
              },
              {
                "id": "test-primary_heading_h1_presence",
                "title": "Primary Heading (H1) Presence",
                "checks": "Checks the HTML structure to ensure that exactly one &lt;h1&gt; tag exists on the page.",
                "why": "This test looks for the presence of &lt;h1&gt; tag within the &lt;body&gt; of your HTML. This test verifies that your page has a clear, singular topic. In SEO, the H1 is the most heavily weighted on-page text element. For AI agents, the H1 acts as the Primary Entity Signal, it ensures algorithms and LLMs understand the core subject matter of the page.",
                "fails": "Without an H1 tag, search engines and AI agents have to guess your page&#x27;s main topic by reading less important text. For traditional SEO, this means you might rank for the wrong keywords. For AI agents (like ChatGPT), missing an H1 means the bot cannot confidently identify your subject matter. If the AI isn&#x27;t 100% confident in your topic, it will skip your page and cite a competitor who has a clearly labeled H1 instead.",
                "fix": "Ensure every public-facing page has an &lt;h1&gt; tag located near the top of the visual hierarchy. Do not use zero H1s, and do not use multiple H1s. There should be exactly one Primary Entity Definition per URL. Write the H1 using clear, natural language that perfectly summarizes the core topic or keyword of that specific page."
              },
              {
                "id": "test-primary_heading_h1_uniqueness",
                "title": "Primary Heading (H1) Uniqueness",
                "checks": "Verifies that the H1 tag: the most important structural heading on the page is unique across your entire domain.",
                "why": "This test verifies that the H1 tag: the most important structural heading on the page is unique across your entire domain. The H1 provides the primary context for the page’s content.",
                "fails": "When H1s are duplicated across multiple pages, it signals to both users and bots that your content may be repetitive or low-value, weakening the topical authority of your site.",
                "fix": "Audit your H1 headings and ensure each one is specifically tailored to the unique value proposition of that page."
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
                "checks": "Checks if your &lt;title&gt; tag is under 30 characters.",
                "why": "This test checks if your &lt;title&gt; tag is under 30 characters. In SEO, a title that is too brief lacks the necessary keywords to rank for specific searches. For AI agents, a short title is a &quot;Vague Signal&quot;: the machine sees a lack of detail and may categorize the page as low-effort or &quot;thin content.&quot;",
                "fails": "Google uses the title tag to understand the main topic of your page. If your title is only 10 characters long, you aren&#x27;t providing enough information to compete for high-value search terms. This leads to &quot;Ranking Stagnation,&quot; where your page gets buried behind competitors who use descriptive, keyword-rich titles. AI scrapers use the title tag as the &quot;Primary Anchor&quot; for their Knowledge Graphs. A title like &quot;SEO Tips&quot; is too broad. The AI triggers a &quot;Low-Confidence Flag.&quot; Because the title doesn&#x27;t specify the &quot;Who, What, or When,&quot; the AI is less likely to pull your &quot;Expert Sentiment&quot; into an AI-generated answer because it can&#x27;t verify the specific relevance of your data.",
                "fix": "Expand your title to provide a clear, descriptive summary of the page. Be descriptive, include your brand, and target the recommended length."
              },
              {
                "id": "test-page_title_occurrence",
                "title": "Page Title Occurrence",
                "checks": "Checks your HTML to ensure there is exactly one &lt;title&gt; tag.",
                "why": "This test audits your HTML to ensure there is exactly one &lt;title&gt; tag. In SEO, having multiple titles confuses search engine crawlers and can lead to the wrong headline appearing in search results. For AI agents, this is a &quot;Semantic Conflict&quot;: the machine sees two competing definitions for the page, which can lead to data instability.",
                "fails": "When Google encounters two title tags, it doesn&#x27;t know which one to trust. It may pick the first one, the second one, or ignore both and invent its own title based on your content. This results in &quot;Display Volatility,&quot; where your carefully crafted headline is replaced by random text. AI scrapers rely on &quot;Definitive Metadata&quot; to build their Knowledge Graphs. Multiple titles trigger a &quot;Validation Error,&quot; and AI agent might flag the site as poorly coded or &quot;spammy.&quot;",
                "fix": "Audit your code to ensure only one title tag is generated. Ensure uniqueness, and text-richness."
              },
              {
                "id": "test-page_title_presence",
                "title": "Page Title Presence",
                "checks": "Verifies the existence of the &lt;title&gt; tag within your page&#x27;s HTML &lt;head&gt;.",
                "why": "This test verifies the existence of the &lt;title&gt; tag within your page&#x27;s HTML &lt;head&gt;. In SEO, this tag is the primary headline used by search engines in their results pages. For AI agents, this is the &quot;Root Label&quot;: it is the first thing a machine reads to determine the topic and relevance of the entire document.",
                "fails": "If a title tag is missing, Google has to invent a title for you by pulling random text from your page. This usually results in a messy, unprofessional headline in search results that destroys your Click-Through Rate (CTR). Even worse, search engines may struggle to rank the page at all because they lack a definitive signal of what the page is about. AI scrapers use the title tag as the &quot;Parent Topic&quot; for their database. If the tag is missing, the AI triggers a &quot;Classification Failure.&quot; Because the machine cannot instantly verify the page&#x27;s purpose, it may skip the site entirely to avoid indexing &quot;junk&quot; data.",
                "fix": "Every page must have a unique and descriptive title tag: Be Unique: No two pages on your site should have the same title. Be Keyword-Rich: Include your primary topic early in the title."
              },
              {
                "id": "test-title_tag_uniqueness",
                "title": "Title Tag Uniqueness",
                "checks": "Identifies pages that share identical or highly similar Title Tags.",
                "why": "This test identifies pages that share identical or highly similar Title Tags. When two or more pages have the same title, you are forcing search engines to choose between them, leading to internal competition where your own pages cannibalize each other’s rankings.",
                "fails": "Because the Title Tag is the strongest on-page signal for what a page is about, duplicate titles create &quot;Internal Cannibalization.&quot; Search engines won&#x27;t know which page to prioritize, often leading to lower rankings for both versions.",
                "fix": "Review your site’s Title Tag architecture. Ensure that every page has a unique, descriptive title that reflects its specific content."
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
                "checks": "Checks the page to verify the presence of any valid Schema.org markup (JSON-LD, Microdata, or RDFa).",
                "why": "This test audits the page to verify the presence of any valid Schema.org markup (JSON-LD, Microdata, or RDFa). In SEO, Schema is the primary method for communicating the page&#x27;s &quot;Identity&quot; to search engines. For AI agents, Schema represents the &quot;Structured Access Layer,&quot; it is the difference between an AI having to &quot;Read&quot; your content like a human and being able to download your content as structured knowledge.",
                "fails": "Without a foundational Schema layer, you are invisible to &quot;Rich Result&quot; carousels and specialized search filters, leading to a massive disadvantage in organic visibility. AI agents perform a &quot;Schema-First Scan.&quot; If no Schema is detected, the AI&#x27;s &quot;Confidence Score&quot; in your content&#x27;s data drops immediately.",
                "fix": "Implement foundational Schema.org markup across all indexable pages. At a minimum, every page should include WebPage schema, while core pages should use more specific types like Organization or Product."
              },
              {
                "id": "test-json_script_integrity",
                "title": "JSON Script Integrity",
                "checks": "Checks the &lt;script type=&quot;application/ld+json&quot;&gt; elements to ensure they contain a valid, parsable JSON object.",
                "why": "This test audits the &lt;script type=&quot;application/ld+json&quot;&gt; elements to ensure they contain a valid, parsable JSON object. In SEO, JSON-LD is the preferred format for search engines because it is decoupled from the user-facing HTML. For AI agents, this is the &quot;Direct Data API&quot; of your website.",
                "fails": "If the JSON object is unparsable, Google and Bing cannot extract any metadata, rendering your investment in structured data useless and preventing any Rich Result visibility. AI agents use &quot;Streamed Ingestion.&quot; When they encounter a script block that is not a valid JSON object, it creates a &quot;Technical Exception.&quot; To maintain speed, most LLM-crawlers will abort the parse of that specific element.",
                "fix": "Audit all JSON-LD implementations to ensure they are wrapped in a clean, single JSON object."
              },
              {
                "id": "test-recommended_schema_presence",
                "title": "Recommended Schema Presence",
                "checks": "Checks the page to see if it utilizes the most relevant Schema.org &quot;Entity&quot; types.",
                "why": "This test audits the page to see if it utilizes the most relevant Schema.org &quot;Entity&quot; types (e.g., Article for blogs, Product for e-commerce, LocalBusiness for physical stores). While general schema tells an AI that data exists, Recommended Schema tells the AI what that data is.",
                "fails": "The page is suffering from &quot;Entity Ambiguity,&quot; causing you to miss out on specialized SERP features like review stars and price drops while making your listing look generic and reducing CTR. In the 2026 landscape, this triggers a failure in AI-Scrapability because agents use &quot;Type-Based Filtering&quot; to isolate specific products or articles.",
                "fix": "Identify the primary entity for each page and implement the most specific Schema type available. Use Article for news and blogs, Product for items for sale, and Organization for your brand&#x27;s identity."
              },
              {
                "id": "test-schema_syntax",
                "title": "Schema Syntax",
                "checks": "Checks the JSON-LD or Microdata blocks for syntax errors, missing required properties, or non-compliance with the Schema.org vocabulary.",
                "why": "This test audits the JSON-LD or Microdata blocks for syntax errors, missing required properties, or non-compliance with the Schema.org vocabulary. In SEO, invalid schema is ignored by search engines, stripping the page of Rich Result eligibility. For AI agents, this is a &quot;Data Access Failure&quot;: the machine detects that structured data is present but cannot unlock or interpret it due to code corruption.",
                "fails": "Search engines like Google will flag the markup as &quot;Invalid,&quot; meaning your stars, prices, and author attributes will never appear in search results, directly hurting CTR. LLMs and AI-search agents use &quot;Strict Parsing Protocols&quot; to save on compute costs. If a Schema block contains a syntax error (like a missing comma or an unclosed bracket), the agent will simply discard the entire block.",
                "fix": "Run all Schema markup through the official Schema.org Validator or the Google Rich Results Test. Fix all &quot;Critical&quot; and &quot;Warning&quot; errors to ensure a clean, high-speed &quot;Digital Handshake&quot; with AI agents."
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
                "checks": "Checks the &quot;twitter:description&quot; meta tag, which provides a concise summary of the page content when shared on social platforms.",
                "why": "This test audits the &quot;twitter:description&quot; meta tag, which provides a concise summary of the page content when shared on social platforms. While the title captures attention, the description provides the SEO context needed to drive engagement. For AI agents, this tag serves as a high-priority summary that helps the model quickly categorize the page&#x27;s topical authority without needing to parse the entire body of content.",
                "fails": "The lack of a defined twitter:description forces AI agents and social platforms to scrape random snippets of text from the page. From an SEO perspective, this leads to messy, broken previews that fail to convert users.",
                "fix": "Craft a unique, compelling &quot;twitter:description&quot; for every page between 120-160 characters, front-loading the hook in the first 80 characters."
              },
              {
                "id": "test-social_metadata_description_requirements",
                "title": "Social Metadata Description Length Requirements",
                "checks": "Checks the character count of the twitter:description property.",
                "why": "This test audits whether the twitter:description property contains between 120 and 160 characters so the summary provides enough context without being truncated across devices and social platforms.",
                "fails": "A description outside the recommended range weakens the social preview: a short description may not provide enough context, while a long one can truncate the page&#x27;s hook and value proposition. This can reduce engagement and create inconsistent snippets for social platforms and AI aggregators.",
                "fix": "Draft a unique twitter:description between 120 and 160 characters, front-loading the hook in the first 80 characters."
              },
              {
                "id": "test-social_metadata_image",
                "title": "Social Metadata Image",
                "checks": "Checks the presence of the &quot;twitter:image&quot; property.",
                "why": "This test audits the presence of the &quot;twitter:image&quot; property. This tag specifies the exact visual asset that should represent the page when shared.",
                "fails": "The lack of a defined image property results in a text-only or broken link preview. From an SEO perspective, this drastically reduces the page&#x27;s prominence in social feeds, making your expert insights easy to overlook. In the 2026 AI-first landscape, if the image is missing, the AI cannot represent your brand visually, causing your content to feel less authoritative and &quot;generic&quot; compared to competitors who provide clear visual data.",
                "fix": "Ensure every page has a unique, high-resolution &quot;twitter:image&quot; that aligns with the page&#x27;s core topic. Use a standard ratio (typically 1.91:1) and ensure the image file size is optimized for fast loading."
              },
              {
                "id": "test-social_metadata_property",
                "title": "Social Metadata Property",
                "checks": "Checks the twitter:site meta tag, which links a specific web page to a verified social media profile.",
                "why": "This test audits the twitter:site meta tag, which links a specific web page to a verified social media profile. In SEO, this strengthens the connection between your domain and your brand’s social footprint. For AI agents, this property acts as a &quot;Verified Source&quot; identifier,",
                "fails": "From an SEO and engagement perspective, this means that when users share your content, your brand is not automatically tagged or credited, leading to a loss in social reach and community growth. In the 2026 AI-first environment, this creates &quot;Entity Ambiguity.&quot; AI agents use these tags to verify the origin of information.",
                "fix": "Add the &quot;twitter:site&quot; meta tag to your global site header, ensuring it correctly references your brand&#x27;s official @username. This simple technical addition ensures that every piece of content you produce is &quot;Signed&quot; by your brand."
              },
              {
                "id": "test-social_metadata_title",
                "title": "Social Metadata Title",
                "checks": "Checks the presence of the twitter:title meta tag.",
                "why": "This test audits the presence of the twitter:title meta tag. This tag is part of the &quot;Open Graph&quot; and &quot;Twitter Card&quot; protocols, which control how your content appears when shared on social platforms. In SEO, these tags are essential for driving Click-Through Rate (CTR). In the AI landscape, these tags act as &quot;Semantic Signposts,&quot; providing a pre-defined summary of the page&#x27;s identity for scrapers and AI researchers.",
                "fails": "The page is suffering from &quot;Metadata Anemia,&quot; a state where the absence of a specific twitter:title forces platforms and AI agents to fallback to generic, unoptimized page titles. From an SEO and social perspective, this results in unappealing link previews that lower engagement and brand authority. In the 2026 AI-first environment, this creates a &quot;Contextual Blur,&quot; instead of receiving a clear, intentional title",
                "fix": "Implement a unique and descriptive twitter:title for every page, ensuring it remains under 55 characters for optimal display. This title should mirror the core &quot;Sentiment&quot; of your expert content while being optimized for human engagement."
              },
              {
                "id": "test-social_metadata_title_requirements",
                "title": "Social Metadata Title Requirements",
                "checks": "Checks the character count of the &quot;twitter:title&quot; property.",
                "why": "This test audits the character count of the &quot;twitter:title&quot; property. To ensure full visibility across all device types and social aggregators, the title should be capped at 55 characters.",
                "fails": "The page will suffering from &quot;Signal Truncation,&quot; where an excessively long title results in an incomplete brand message. From an SEO perspective, if the core keyword or &quot;hook&quot; is pushed beyond the 55-character limit, engagement rates drop because the user cannot see the full context of the link. In the 2026 AI-first landscape, this creates &quot;Contextual Noise.&quot;",
                "fix": "Refine all twitter:title properties to be punchy, descriptive, and under the 55-character threshold."
              },
              {
                "id": "test-social_metadata_type",
                "title": "Social Metadata Type",
                "checks": "Checks the &quot;twitter:card&quot; property, which defines the visual layout of a page’s preview (e.g., &quot;summary&quot; vs.",
                "why": "This test audits the &quot;twitter:card&quot; property, which defines the visual layout of a page’s preview (e.g., &quot;summary&quot; vs. &quot;summary_large_image&quot;). In SEO, choosing the correct card type is essential for maximizing &quot;screen real estate&quot; and improving Click-Through Rates (CTR).",
                "fails": "From an SEO perspective, this results in small, low-impact thumbnails that fail to capture user attention in competitive feeds. In the 2026 AI-first landscape, this creates &quot;Structural Ambiguity.&quot; AI-driven social aggregators and research agents use this property to determine the &quot;Prominence&quot; of the content.",
                "fix": "Define a global &quot;twitter:card&quot; type, ideally &quot;summary_large_image&quot; for technical and visual content to ensure your brand occupies the maximum available space in the digital ecosystem. This standardization ensures that both human users and AI agents perceive your content as high-value."
              },
              {
                "id": "test-social_metadata_validation",
                "title": "Social Metadata Validation",
                "checks": "Checks the specific value assigned to the &quot;twitter:card&quot; property.",
                "why": "This test audits the specific value assigned to the &quot;twitter:card&quot; property. To be recognized by social platforms and AI aggregators, the value must be one of four valid types: &quot;summary,&quot; &quot;summary_large_image,&quot; &quot;app,&quot; or &quot;player.&quot;",
                "fails": "From an SEO perspective, this results in small, low-impact thumbnails that fail to capture user attention in competitive feeds. In the 2026 AI-first landscape, this creates &quot;Structural Ambiguity.&quot; AI-driven social aggregators and research agents use this property to determine the &quot;Prominence&quot; of the content.",
                "fix": "Review the twitter:card values across the site and ensure they strictly adhere to the supported types. For most professional and technical content, summary_large_image is recommended to maximize &quot;Technical Visibility.&quot;"
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
                "checks": "It detects duplicate-topic pages that compete with each other, weakening SEO and confusing AI about the main source.",
                "why": "Checks if multiple pages are semantically identical. In SEO, this splits your domain authority as pages compete against each other. For AI agents, it creates conflicting data points, making it impossible for the LLM to map a single, definitive &quot;source of truth&quot; for your brand.",
                "fails": "Multiple pages targeting the exact same meaning force search engines to guess which one to rank. This splits your domain authority, cannibalizes your own organic traffic, and confuses AI models trying to map a single &quot;source of truth&quot; for your brand.",
                "fix": "Merge the competing pages into one highly authoritative, comprehensive master asset. Set up a permanent 301 redirect from the discarded URLs to the new master page to consolidate your SEO power."
              },
              {
                "id": "test-page_content_uniqueness",
                "title": "Page Content Uniqueness",
                "checks": "Compares the body text of the current page against every other page on your domain.",
                "why": "This test compares the body text of the current page against every other page on your domain. It identifies &quot;Thin Content&quot; or &quot;Mirror Pages&quot; where the text is identical or nearly identical.",
                "fails": "To search engines, having multiple pages with the same content suggests a lack of depth and value, often resulting in most of those pages being filtered out of search results entirely.",
                "fix": "Rewrite the content to ensure it provides a unique perspective or specific data not found elsewhere on the site."
              },
              {
                "id": "test-topical_cluster_alignment",
                "title": "Topical Cluster Alignment",
                "checks": "It detects pages that are semantically disconnected from your main topic clusters using embeddings.",
                "why": "Flags pages that are semantically isolated from the rest of the crawl set based on embedding similarity. In SEO, these pages are harder for search engines to connect to your core topic clusters. For AI agents, isolated pages weaken knowledge graph cohesion and reduce confidence in your topical authority.",
                "fails": "Semantically isolated pages are less likely to be understood as part of your core expertise. This weakens topical authority signals and can reduce visibility for related queries.",
                "fix": "Align isolated pages with a clearer cluster by strengthening topic focus, improving contextual relevance, and adding internal links to semantically related pillar or supporting pages."
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
                "checks": "It detects robotic AI writing patterns that hurt trust, rankings, and overall content quality.",
                "why": "Identifies formulaic LLM transitions and robotic phrasing. Synthetic, unedited text degrades brand trust and triggers spam filters in both search engines and AI scrapers, leading to visibility downgrades.",
                "fails": "Robotic phrasing and AI footprints signal low-effort content, triggering algorithmic demotions and spam filters. For users, unedited synthetic text degrades brand trust and signals a lack of expertise, directly lowering conversion rates.",
                "fix": "Edit the text to remove generic LLM tropes (e.g., &quot;In today&#x27;s fast-paced world&quot;). Inject your unique brand voice, break up robotic paragraph structures, and ensure the content sounds like a human wrote it."
              },
              {
                "id": "test-content_signals_richness",
                "title": "Content Signals & Richness",
                "checks": "It detects recent dates to ensure content stays fresh, improving SEO performance and preventing outdated information for AI.",
                "why": "Scans for recent dates to verify content freshness. In SEO, current dates improve click-through rates and satisfy &quot;Freshness&quot; algorithms. For AI agents, recency is a key filter to prevent the extraction of obsolete or outdated information.",
                "fails": "Outdated content loses rankings to fresher competitors. AI agents built to answer user questions heavily prioritize recent data to avoid hallucinating obsolete facts, meaning your site will be bypassed for modern queries.",
                "fix": "Manually review the content for factual accuracy. Update old statistics, refresh case studies, and include references to the current year to signal active maintenance to search algorithms."
              },
              {
                "id": "test-demonstrated_expertise",
                "title": "Demonstrated Expertise",
                "checks": "It checks if content shows real expertise and authority to meet E-E-A-T standards and gain trust from search engines and AI.",
                "why": "Evaluates whether content demonstrates real authority. In SEO, this fulfills Google&#x27;s strict E-E-A-T guidelines for competitive rankings. For AI models, the credibility of the source dictates whether the LLM will trust your data enough to generate an answer based on it.",
                "fails": "Paraphrased &quot;Wikipedia-level&quot; content fails Google&#x27;s strict E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines. This prevents the page from ranking for high-value terms and stops AI models from citing your brand as a trusted source.",
                "fix": "Have a true Subject Matter Expert (SME) review the page. Add unique industry insights, first-hand experience, and authoritative credentials that prove you are a practitioner, not just a content scraper."
              },
              {
                "id": "test-introduction_engagement",
                "title": "Introduction Engagement",
                "checks": "It checks if the introduction clearly states the user&#x27;s problem and value proposition to boost engagement and reduce bounce rates.",
                "why": "Evaluates the first 200 words for a strong Value Proposition. In SEO, this immediately hooks the human reader, driving down bounce rates and signaling to search engines that the page successfully answered the user&#x27;s query.",
                "fails": "The digital attention span is unforgiving. Without a strong hook, readers will bounce back to the search results before scrolling, destroying your engagement metrics and signaling to Google that your page did not answer the user&#x27;s query.",
                "fix": "Rewrite the introduction. Immediately state the specific problem the user is facing and clearly outline the unique benefit they will gain by reading the rest of your page."
              },
              {
                "id": "test-llm_content_depth",
                "title": "LLM Content Depth",
                "checks": "It checks if content includes unique data or insights to outperform generic pages and be useful for AI extraction.",
                "why": "Evaluates if text contains substantive &quot;Information Gain.&quot; In SEO, deep content satisfies user intent and outranks generic fluff. For Generative Engine Optimization (GEO), unique statistics and expert case studies are exactly the &quot;High-Value Nodes&quot; AI Overviews actively look to extract and cite.",
                "fails": "Generic content fails to satisfy user intent. It will consistently be outranked by competitor pages that offer real expertise. Furthermore, AI Overviews specifically look for rich data points to extract; without them, your page is effectively invisible to Generative Engine Optimization (GEO).",
                "fix": "Inject verified data points, unique case studies, or expert quotes into the text to substantiate your claims and provide actionable value that competitors lack."
              },
              {
                "id": "test-unique_word_ratio",
                "title": "Unique Word Ratio",
                "checks": "It measures vocabulary diversity to avoid keyword stuffing and provide richer semantic context for SEO and AI understanding.",
                "why": "Calculates vocabulary diversity. In SEO, avoiding heavy repetition prevents &quot;keyword stuffing&quot; penalties. For AI agents, a richer vocabulary provides a denser web of Latent Semantic Indexing (LSI) keywords, giving the LLM more contextual nodes to associate with your target topic.",
                "fails": "A highly repetitive vocabulary triggers algorithmic penalties for &quot;keyword stuffing.&quot; To modern Natural Language Processing (NLP) engines, it signals low-effort content that lacks the Latent Semantic Indexing (LSI) keywords needed to rank for complex queries.",
                "fix": "Broaden your vocabulary. Incorporate natural synonyms and related sub-topics instead of awkwardly repeating your primary target keyword throughout the copy."
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
                "checks": "It ensures readable text exceeds 15% of HTML to avoid thin content and provide AI with meaningful, content-rich data.",
                "why": "Analyzes the page payload to ensure readable text makes up &gt;15% of the HTML. In SEO, this proves the page isn&#x27;t just &quot;thin content&quot; or template bloat. For AI agents, a high text ratio guarantees the bot is ingesting pure, valuable data rather than wasting its token limits parsing messy frontend code.",
                "fails": "A low ratio signals &quot;thin content&quot; drowning in template bloat. Search engines will index this as a low-value page, and AI scrapers will waste their crawl budget parsing your code rather than extracting your data, severely limiting your visibility.",
                "fix": "Expand the page with unique, substantive text. Add relevant FAQs, detailed product descriptions, or expert insights to comfortably surpass the code-to-text threshold."
              },
              {
                "id": "test-readability_grade_level_flesch",
                "title": "Readability Grade Level (Flesch)",
                "checks": "Checks that the main text scores at least 50 for reading ease (Flesch, or Kandel-Moles in French) for better user and AI comprehension.",
                "why": "Measures how easy the page&#x27;s main text is to read with the Flesch Reading Ease score (Kandel-Moles on French pages), from the average sentence length and the number of syllables per word. The page passes at 50 or above; below 50 the text is difficult to read, below 30 very difficult. Pages with fewer than 100 words of main content are not scored. In SEO, this prevents user fatigue and reduces mobile bounce rates. For AI agents, clear and accessible language lowers processing overhead, allowing large language models to extract key facts without struggling with overly complex or academic phrasing.",
                "fails": "Text that is too dense can cause users to leave the page quickly and return to search results. Excessive jargon and complex sentence structures create semantic noise, making it harder for AI systems to identify the core entities and meaning of the content.",
                "fix": "Simplify complex vocabulary, shorten long sentences, and break up dense paragraphs while keeping the technical information accurate."
              },
              {
                "id": "test-title_and_h1_alignment",
                "title": "Title and H1 Alignment",
                "checks": "It checks that your H1 and title tag share at least 50% of keywords to ensure consistent SEO signaling and clear topic identification for AI.",
                "why": "Verifies that your H1 and Title Tag share at least 50% of the same core keywords. In SEO, this provides a unified topical map from the SERP click to the page load. For AI agents, explicitly aligned headings serve as &quot;Semantic Anchors,&quot; allowing the bot to instantly verify the page&#x27;s core entity without guessing.",
                "fails": "Conflicting Title and H1 tags create &quot;Contextual Ambiguity.&quot; This confuses traditional search engines and AI RAG (Retrieval-Augmented Generation) agents about your page&#x27;s primary topic, diluting your topical authority and causing rankings to drop.",
                "fix": "Ensure your H1 and Title Tag present a unified topic. Keep the Title Tag optimized for the SERP, and make the H1 a natural, engaging extension of that exact same keyword theme."
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
                "checks": "Checks for the old &lt;bgsound&gt; tag used to play background music.",
                "why": "This test looks for the old &lt;bgsound&gt; tag used to play background music. In SEO, using deprecated tags tells search engines that your site is not being maintained, which can hurt your rankings. For AI agents, this tag is just &quot;Technical Noise&quot;: it&#x27;s a piece of junk code that adds no value to the information you are trying to share.",
                "fails": "Most modern browsers (like Chrome or Safari) don&#x27;t even support this tag anymore. If it does work, sudden unexpected audio is one of the fastest ways to make a user close your tab. This &quot;Bounce&quot; tells Google your page is low quality. AI looks for modern, clean, and professional code. When it sees an old tag, it lowers the &quot;Trust Score&quot; of your main content.",
                "fix": "If you have this tag, delete it immediately. If you actually need audio on your page, use the modern &quot;&lt;audio&gt;&quot; tag which gives the user a &quot;Play&quot; and &quot;Pause&quot; button."
              },
              {
                "id": "test-passive_voice_ratio",
                "title": "Passive Voice Ratio",
                "checks": "Checks if too many sentences use passive voice, reducing clarity for users and AI systems.",
                "why": "Flags pages where more than 10% of sentences use passive voice. In SEO, passive constructions weaken the clarity and persuasiveness of content. For AI agents, passive voice obscures the Subject-Action-Object relationship, making it harder for language models and knowledge graphs to accurately interpret who is performing an action.",
                "fails": "A high ratio of passive voice makes content sound evasive to users. Technically, it forces LLMs to work harder to understand the entity relationships in your text, blurring your topical authority.",
                "fix": "Rewrite sentences in active voice to clearly define who is performing the action (e.g., change &quot;the service is provided by us&quot; to &quot;we provide the service&quot;)."
              },
              {
                "id": "test-sentence_length_variety",
                "title": "Sentence Length Variety",
                "checks": "It measures the balance of short (&lt;12 words) and long (&gt;30 words) sentences to improve pacing, boost time on page, and signal more human-like writing.",
                "why": "Checks the ratio of short sentences (&lt;12 words) to longer sentences (&gt;30 words). In SEO, rhythmic pacing holds user attention and increases &quot;Time on Page&quot; metrics. For overall quality, it differentiates human-crafted narratives from monotonous text blocks.",
                "fails": "Monotonous text causes reader fatigue and quick drop-offs. Search engines interpret poor &quot;time-on-page&quot; as a negative quality signal, which indirectly harms your ranking power.",
                "fix": "Mix your sentence structures. Use short sentences to make strong points, and longer sentences to provide detail. Create a natural, engaging rhythm that keeps users scrolling."
              },
              {
                "id": "test-structured_data_density_lists_tables",
                "title": "Structured Data Density (Lists & Tables)",
                "checks": "Checks if the content uses lists or tables to improve readability and AI extraction.",
                "why": "Scans the text for HTML &lt;ol&gt;, &lt;ul&gt;, and &lt;table&gt; elements to evaluate the presence of structured content. In SEO, lists and tables improve the chances of earning Featured Snippets. For AI systems, structured formats are easier to parse and extract, reducing computational effort and improving content visibility.",
                "fails": "A long article with no bullet points or tables becomes a wall of text that overwhelms readers and forces AI systems to process dense paragraphs to find key information, lowering the chances of being cited in AI-generated summaries.",
                "fix": "Break down key ideas into bullet points or tables so both users and AI systems can quickly scan and extract important information."
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
        "html": "<p>\n          A first plan is created automatically at the end of onboarding. If the Roadmap is empty, click <strong>Create an SEO plan</strong> and fill in the form. Once a plan exists, <strong>Update plan</strong> opens the same form (see below).\n        </p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Website to optimize</span><span class=\"def-desc\">The site the plan works on. A site that was never audited is flagged: the plan would stay generic.</span></li>\n          <li><span class=\"def-term\">LLM to favour</span><span class=\"def-desc\">Shown when the project follows several models. Choose one model to target its answers and sources, or keep <em>All LLMs</em>.</span></li>\n          <li><span class=\"def-term\">Product to optimize</span><span class=\"def-desc\">One or more products, ranked by priority. Drag to reorder.</span></li>\n          <li><span class=\"def-term\">Focus topics</span><span class=\"def-desc\">The topics to work on, ranked. By default, the three main topics of the main product.</span></li>\n          <li><span class=\"def-term\">Available time per week</span><span class=\"def-desc\">From 1 to 20 hours, 5 by default. <em>Split by contributor</em> divides it between a developer, work done in Poliris, and the client.</span></li>\n          <li><span class=\"def-term\">Plan duration</span><span class=\"def-desc\">From 2 to 24 weeks. Poliris recommends a duration from the work found and the time available.</span></li>\n          <li><span class=\"def-term\">Tools to use</span><span class=\"def-desc\">Long-term content plan, Content optimization, Technical fixes, Backlinks &amp; outreach. Turn off what you will not use.</span></li>\n          <li><span class=\"def-term\">Developer tasks</span><span class=\"def-desc\">Turn off if no developer is available: canonicals, redirects, schema, sitemap or performance work is then left out and the time goes to the rest.</span></li>\n          <li><span class=\"def-term\">Anything else?</span><span class=\"def-desc\">A free note for the plan.</span></li>\n        </ul>\n        <p>\n          Click <strong>Generate plan</strong>. Generation takes 30 to 90 seconds and continues if you close the window. If the technical audit of the site is\n          still running, the plan waits for it. The plan is published to the Roadmap as soon as it is ready.\n        </p>\n\n        <figure class=\"docs-figure\" data-shot=\"S33\"><img src=\"/docs/images/s33-create-seo-plan.webp\" alt=\"The Create an SEO plan form.\" width=\"756\" height=\"850\" loading=\"lazy\" /><figcaption>The Create an SEO plan form.</figcaption></figure>"
      },
      {
        "id": "roadmap-view",
        "title": "Reading the plan",
        "html": "<ul>\n          <li><strong>Overview</strong>: where you stand, the approach chosen and what to expect.</li>\n          <li><strong>Your priorities</strong>: for each product and topic, the weeks of the plan that work on it, or <em>Not covered in this roadmap</em>.</li>\n          <li><strong>Timeline</strong>: the actions week by week, within your weekly capacity, with a marker on the current week. Each action shows its category, status and duration. Drag an action to change its order; the plan re-packs the weeks.</li>\n        </ul>\n        <p>Click an action to open its details:</p>\n        <ul>\n          <li>why it is in the plan and the audit findings it answers;</li>\n          <li>the fixes it includes, marked <strong>One-click</strong> when Poliris can apply them through the pixel, or <strong>Guided</strong> when someone has to apply them;</li>\n          <li>the pages affected, the time it takes, who does it and the week;</li>\n          <li><strong>Launch task</strong>, <strong>Mark accomplished</strong> and <strong>Remove from planner</strong>.</li>\n        </ul>\n\n        <h3>Action categories</h3>\n        <table>\n          <thead><tr><th>Category</th><th>What Launch task opens</th></tr></thead>\n          <tbody>\n            <tr><td>Technical fixes</td><td>A conversation with Poli AI, with the brief of the task</td></tr>\n            <tr><td>Content optimization</td><td>The content optimizer on the page to improve</td></tr>\n            <tr><td>Long-term content plan</td><td>Content Generation with Kate for new articles, or the long-term plan form</td></tr>\n            <tr><td>Backlinks &amp; outreach</td><td>Acquire Citation, filtered on the domain to target</td></tr>\n          </tbody>\n        </table>"
      },
      {
        "id": "roadmap-board",
        "title": "Execution board",
        "html": "<p>\n          The board shows the same actions in three columns: <strong>Backlog</strong>, <strong>In progress</strong> and <strong>Completed</strong>.\n          Launching a task moves it to In progress for the current week. Drag a card back to Backlog to park it until next week, or to Completed when it is done.\n          An action still in the backlog after its week is flagged <em>Late</em>. Filter the board by category.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S34\"><img src=\"/docs/images/s34-execution-board.webp\" alt=\"The Execution board.\" width=\"1237\" height=\"979\" loading=\"lazy\" /><figcaption>The Execution board.</figcaption></figure>"
      },
      {
        "id": "roadmap-update",
        "title": "Updating the plan",
        "html": "<p>\n          After a new audit, click <strong>Update plan</strong>. Poliris recomputes the plan on the latest results: finished work stays finished, actions the audit\n          no longer needs are closed and new findings are added. <strong>Preview changes</strong> shows the suggested plan with resolved and new actions;\n          untick or reorder them, then click <strong>Apply validated plan</strong>. The plan is not updated automatically.\n        </p>"
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
        "html": "<p>\n          Generation is Kate&rsquo;s content studio. The home screen asks what you want to write about and suggests three article ideas based on the gaps\n          of your project. <strong>Generate ideas</strong> suggests others, and your recent articles are listed on the side.\n          A precise subject takes you straight to the configuration; a vague request (&ldquo;suggest content for my brand&rdquo;) first offers a few angles to choose from.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S35\"><img src=\"/docs/images/s35-content-studio.webp\" alt=\"The content studio home.\" width=\"1640\" height=\"746\" loading=\"lazy\" /><figcaption>The content studio home.</figcaption></figure>\n\n        <ol class=\"steps\">\n          <li>\n            <h3>Configuration</h3>\n            <p>\n              Fill in the article title, the audience, the tone, the target keywords (the first one is the primary keyword), the depth (from a short answer\n              of 500 words to a pillar page of more than 2,000) and the article type: Guide, Comparison, How-To, Listicle, Case Study or Explainer.\n              Kate sits in the right panel and can fill any field for you. Title, audience, tone, a primary keyword and at least one secondary keyword are required to continue.\n            </p>\n            <p>\n              The <strong>Grounding Data</strong> field holds the real facts about your business: prices, specifications, certifications, figures.\n              Kate only states facts that are in this field; left empty, the article stays general. <strong>Suggest grounding data with AI</strong>\n              proposes facts from your site for you to check. You can also choose an author, whose name and short bio appear in the article.\n            </p>\n            <p>\n              The <strong>Internal Links</strong> step proposes pages of your site to link to. Select the ones that fit.\n            </p>\n          </li>\n          <li>\n            <h3>Outline</h3>\n            <p>Kate proposes the outline of the article. Edit the headings and their order before writing.</p>\n          </li>\n          <li>\n            <h3>Article</h3>\n            <p>\n              Kate researches the keywords, writes the article and gives it a content score.\n            </p>\n          </li>\n        </ol>\n\n        <h3 id=\"content-score\">The content score</h3>\n        <p>\n          The score, out of 100, rates the keywords, the depth of the topic, the writing, how easily AI assistants can quote the article, and its readability.\n          The article is rated <em>Excellent, ready to publish</em>, <em>Good</em> or <em>Fair</em>. Internal links have their own score, shown apart.\n          <strong>Improve article</strong> reworks the weakest parts to raise the score.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S36\"><img src=\"/docs/images/s36-article-result.webp\" alt=\"A generated article and its content score.\" width=\"1108\" height=\"973\" loading=\"lazy\" /><figcaption>A generated article and its content score.</figcaption></figure>\n\n        <h3>After writing</h3>\n        <ul>\n          <li>Edit the article in place and save. <strong>History</strong> keeps the previous versions and restores any of them.</li>\n          <li><strong>Generate hero image</strong> creates an image for the top of the article.</li>\n          <li>Copy the text, or download it as <strong>HTML</strong> (a complete page with title, meta description, canonical, Open Graph and structured data) or <strong>Markdown</strong>.</li>\n          <li>With WordPress or Webflow connected, send the article to your CMS as a <strong>draft</strong>. Nothing is published without you.</li>\n        </ul>"
      },
      {
        "id": "content-optimization",
        "title": "Optimization",
        "html": "<p>\n          The Content Optimizer scores an existing page against a target keyword. Paste the text, or give a URL and click <strong>Fetch &amp; optimize</strong>.\n          Leave the keyword empty and Poliris detects it. You get the same score as for a new article.\n        </p>\n        <p>\n          <strong>Optimize this content</strong> lets you choose the keywords to work in (yours, those the top pages cover and you do not, what people search for,\n          your products) and the links to add. Poliris then shows the original and the optimized version side by side. <strong>Accept &amp; apply</strong>\n          updates the text in the editor; export it as HTML, Markdown or plain text to publish it.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S37\"><img src=\"/docs/images/s37-content-optimizer.webp\" alt=\"The optimizer compares the original and the optimized text.\" width=\"1634\" height=\"949\" loading=\"lazy\" /><figcaption>The optimizer compares the original and the optimized text.</figcaption></figure>"
      },
      {
        "id": "long-term-plan",
        "title": "Long-term plan",
        "html": "<p>\n          A long-term plan is a series of articles that work toward one goal over several weeks. Click <strong>New plan</strong> and choose:\n        </p>\n        <ul>\n          <li>the brand and the <strong>objective</strong>: awareness, leads, product education or your own;</li>\n          <li>the shape: <strong>Every article stands alone</strong>, or <strong>Own one subject</strong> with a pillar article and supporting articles linked to it;</li>\n          <li>the products or categories to promote and, if you want, seed keywords;</li>\n          <li>the number of articles per week and the duration, from 2 to 24 weeks (4 to 48 articles).</li>\n        </ul>\n        <p>\n          Poliris analyzes your brand and existing content, plans the articles, assigns keywords and formats, and schedules them. Nothing is scheduled\n          before you review the series: edit titles and keywords, lock what you like, regenerate the rest, then approve. Approved articles appear\n          on the Roadmap as content actions.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S38\"><img src=\"/docs/images/s38-long-term-plan-review.webp\" alt=\"Reviewing a long-term content plan before approval.\" width=\"803\" height=\"977\" loading=\"lazy\" /><figcaption>Reviewing a long-term content plan before approval.</figcaption></figure>"
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
        "html": "<p>\n          Instead of one line per test, issues are grouped by the act that solves them, such as <em>Rewrite the page structure</em> or\n          <em>Rebuild schema.org markup</em>. Foundations come first, because they improve every page at once. Pick the website at the top;\n          <strong>Rerun</strong> recomputes the groups from the last audit without crawling again.\n        </p>\n        <p>\n          Today Poliris can prepare and apply two acts: <strong>Rewrite the page structure</strong> (title, meta description, H1) and\n          <strong>Rebuild schema.org markup</strong>. The other acts (robots.txt, sitemap, redirects, canonicals, hreflang, social tags and others) are\n          marked <em>Coming soon</em>: they show the pages concerned and a brief for your developer.\n        </p>"
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
        "html": "<p class=\"lede\">\n          AI assistants build their answers from a limited set of websites. The Citations pages list those websites for your prompts and tell you\n          what to do with each one. They are fed by the sources of your AI Reputation runs, under <strong>ACTION &rsaquo; Citations</strong>.\n        </p>"
      },
      {
        "id": "review-citation",
        "title": "Review Citation",
        "html": "<p>\n          Pages that already talk about your products. Check that they say the right thing and that they link to you. The counters show the pages\n          to review, the pages where you could ask for a link, and the pages already linking to you. For each source you see the product mentioned,\n          the domain rating and the action to take: <strong>Check</strong>, <strong>Ask</strong> or <strong>Follow up</strong>. Open a source to read\n          how it mentions you and in which AI answers it was used.\n        </p>"
      },
      {
        "id": "acquire-citation",
        "title": "Acquire Citation",
        "html": "<p>\n          Trusted sources that AI assistants quote on your prompts, where your products are still absent. Each row has a way in:\n          a <strong>Purchase</strong> (a sponsored article or listing) or a <strong>Free listing</strong> you can claim.\n        </p>\n        <ul>\n          <li>The counters show the number of ways in, the total cost to take them all and the best value.</li>\n          <li>Filter by type, status, product and category, set a budget per placement and sort by best value or cheapest first.</li>\n          <li><strong>Purchase</strong> opens the offers found on link marketplaces for that domain, with the best price. You buy directly on the marketplace.</li>\n          <li><strong>Claim it</strong> prepares an outreach email.</li>\n        </ul>\n        <p>Each paid source shows an <strong>opportunity score</strong> out of 100, based on its authority, its cost, its reach across your products and its type of site. A higher score is a better opportunity.</p>\n\n        <figure class=\"docs-figure\" data-shot=\"S40\"><img src=\"/docs/images/s40-acquire-citation.webp\" alt=\"Acquire Citation: sources to get cited on, with their cost and score.\" width=\"1640\" height=\"789\" loading=\"lazy\" /><figcaption>Acquire Citation: sources to get cited on, with their cost and score.</figcaption></figure>"
      },
      {
        "id": "other-citation",
        "title": "Other Citation",
        "html": "<p>\n          Sources that need no action: your own profiles, or sites out of reach. They are kept so that your coverage figures stay complete.\n        </p>"
      },
      {
        "id": "outreach",
        "title": "Outreach emails",
        "html": "<p>\n          From Review Citation and Acquire Citation, <strong>Prepare outreach</strong> drafts an email to the site: ask for a link, correct a fact, or claim a listing.\n          The draft includes your brand, the sentence that mentions you and the competitors cited. Poliris fills in the contact email when it finds one.\n          <strong>Send &amp; track</strong> opens the email in your own mail client: Poliris does not send it and does not follow up automatically yet.\n        </p>"
      },
      {
        "id": "feature-recommendations-1",
        "title": "Putting it all together",
        "html": "<p class=\"lede\">\n          The AI Reputation audit and the technical audit answer different questions, and each one helps you read the other.\n          This page suggests a simple routine.\n        </p>\n\n        <div class=\"action-grid action-grid-2\">\n          <div class=\"action-card\">\n            <span class=\"action-label\">Technical &rarr; AI</span>\n            <h5>What you fix changes what AI can say</h5>\n            <p>An assistant can only quote pages it can reach and read. Blocked crawlers, missing titles or thin pages limit how often you can be cited.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">AI &rarr; Technical</span>\n            <h5>What AI says tells you where to start</h5>\n            <p>A weak topic or a missing source points to the pages and content to work on first.</p>\n          </div>\n        </div>\n\n        <h3>A weekly routine</h3>\n        <ol class=\"playbook\">\n          <li>\n            <h5>Check the scores</h5>\n            <p>Open the AI Reputation Overview and the health score of your site. Note what moved since last week.</p>\n          </li>\n          <li>\n            <h5>Work from the Roadmap</h5>\n            <p>Open the Execution board, launch the tasks of the week and mark finished ones as accomplished.</p>\n          </li>\n          <li>\n            <h5>Look at the evidence</h5>\n            <p>When a score drops, open Prompt Explorer or Cited Prompts for the answers, and the Issues tab for the pages concerned.</p>\n          </li>\n          <li>\n            <h5>Measure again</h5>\n            <p>Re-run the analysis (or let the schedule do it), re-crawl the site after technical changes, then click <strong>Update plan</strong>.</p>\n          </li>\n        </ol>\n\n        <h3>Common situations</h3>\n        <div class=\"action-grid action-grid-2\">\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Low visibility, healthy site</h5>\n            <p>The site works but assistants do not know enough about you. Write content on the weak topics and get cited on the sources they use.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>High visibility, weak sentiment</h5>\n            <p>You are mentioned but not described well. Read the negative answers in Cited Prompts and correct the facts on the pages they cite.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Good visibility, many technical issues</h5>\n            <p>Fix the critical issues now: a blocked or slow page is less likely to be read and cited.</p>\n          </div>\n          <div class=\"action-card\">\n            <span class=\"action-label\">Pattern</span>\n            <h5>Low everywhere</h5>\n            <p>Start with Page Access (what blocks crawlers), then work on one weak topic at a time.</p>\n          </div>\n        </div>"
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
        "html": "<ul>\n          <li><strong>Full page</strong>: the <strong>Dashboard | Poli AI</strong> switch at the top of the sidebar opens Poli AI with your conversation history. Switch back to return to the page you were on.</li>\n          <li><strong>Chat bar</strong>: the bar at the bottom right of every page opens a smaller chat panel over the page you are reading.</li>\n          <li><strong>Ask about a card</strong>: with the chat panel open, click a card of the AI Reputation dashboards and Poli AI explains it.</li>\n          <li><strong>From the Roadmap</strong>: technical tasks and <em>Discuss with</em> buttons open a conversation with the brief of the action.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S41\"><img src=\"/docs/images/s41-poli-ai.webp\" alt=\"Poli AI in full page.\" width=\"1640\" height=\"943\" loading=\"lazy\" /><figcaption>Poli AI in full page.</figcaption></figure>"
      },
      {
        "id": "feature-poliagent-2",
        "title": "The team",
        "html": "<p>\n          Poli AI answers through specialized personas. Leo routes each question to the right one; type <code>@</code> and a name, for example\n          <code>@nora</code>, to ask a persona directly.\n        </p>\n        <table>\n          <thead><tr><th>Persona</th><th>Role</th><th>Ask about</th></tr></thead>\n          <tbody>\n            <tr><td>Leo</td><td>Lead Agent</td><td>General questions, summaries, what to do next.</td></tr>\n            <tr><td>Nora</td><td>GEO Analyst</td><td>Visibility and sentiment in AI assistants, competitors, sources.</td></tr>\n            <tr><td>Tom</td><td>Technical SEO</td><td>The technical audit, crawlability, speed, structured data.</td></tr>\n            <tr><td>Kate</td><td>Content &amp; Reputation Strategist</td><td>Content angles, existing pages, how you are described.</td></tr>\n            <tr><td>Ivy</td><td>Trend Strategist</td><td>Emerging questions and how the conversation in your market is changing.</td></tr>\n          </tbody>\n        </table>\n        <p>A paid media persona, Ryan, is planned and not available yet.</p>"
      },
      {
        "id": "feature-poliagent-3",
        "title": "Speed",
        "html": "<p>\n          The selector in the message box chooses which model answers: <strong>Auto</strong> (default, chosen per message), <strong>Fast</strong> for quick\n          lookups, <strong>Balanced</strong> for questions that cross several sources, <strong>Deep</strong> for plans and analyses. The default of the\n          project is set in <strong>Project Settings &rsaquo; AI Agent</strong>.\n        </p>"
      },
      {
        "id": "feature-poliagent-4",
        "title": "What Poli AI knows",
        "html": "<ul>\n          <li>Your AI Reputation results: visibility, sentiment per topic and per competitor, cited sources.</li>\n          <li>Your technical audit: scores, failing tests, recommendations.</li>\n          <li>The content of your crawled pages: what each page is about, pages that overlap, topics without a page.</li>\n          <li>Your brand structure: products, topics, trading zones.</li>\n          <li>The web, through a search tool and by reading public pages you mention (without logging in or running JavaScript).</li>\n        </ul>"
      },
      {
        "id": "feature-poliagent-5",
        "title": "What it can do",
        "html": "<ul>\n          <li>Answer with text, charts and up to three follow-up buttons.</li>\n          <li>Produce a PDF report or an Excel export of your data.</li>\n          <li>Propose a fix as a card. <strong>Deploy</strong> applies it through the SEO pixel and <strong>Roll back</strong> removes it. With WordPress connected, the fix is written in WordPress.</li>\n          <li>Create a WordPress draft article, and hand you over to Kate&rsquo;s content studio for full articles.</li>\n          <li>Add, move, remove or complete actions on your Roadmap, after asking for confirmation.</li>\n          <li>Read files you attach: up to 5 per message, 20 MB each (PDF, images, text, CSV, Markdown). You can also dictate a message.</li>\n        </ul>\n        <p>Nothing changes on your site or your roadmap without your click.</p>"
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
        "html": "<p>\n          Go to <strong>Project Settings &rsaquo; Connector</strong>, which lists your websites with their connection status, or click <strong>Connect</strong>\n          on the site card in <em>My site &amp; socials</em>. The window <strong>Site connection</strong> lets you choose between SEO Pixel, WordPress plugin\n          and Webflow; Poliris detects what your site runs and marks the matching option <em>Recommended</em>. Each option takes three steps, and the\n          screen updates by itself when the connection is detected. <strong>Check now</strong> forces a new check.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S42\"><img src=\"/docs/images/s42-connect-chooser.webp\" alt=\"Choosing how Poliris connects to your site.\" width=\"1640\" height=\"783\" loading=\"lazy\" /><figcaption>Choosing how Poliris connects to your site.</figcaption></figure>"
      },
      {
        "id": "integration-pixel",
        "title": "SEO Pixel",
        "html": "<ol>\n          <li><strong>Enable</strong> the pixel for the site.</li>\n          <li><strong>Install the snippet</strong>: paste the script Poliris gives you in the <code>&lt;head&gt;</code> of every page. If someone else manages the site,\n            <strong>Email my developer</strong> sends them the instructions, and <strong>Copy AI prompt</strong> copies instructions for a coding assistant.</li>\n          <li><strong>Verify</strong>: once the script has loaded on your site, the status changes to <em>Pixel installed</em>, with the last time it was seen.</li>\n        </ol>\n        <p>On a WordPress site connected with the plugin, the fixes you deploy from Poli AI and the article drafts go through the plugin. The Technical Fixes page applies changes through the pixel only.</p>"
      },
      {
        "id": "integration-wordpress",
        "title": "WordPress",
        "html": "<p>\n          The Poliris plugin writes fixes directly in your WordPress site, in the post and in the fields of your SEO plugin, so your team still sees one\n          version in wp-admin. You need an administrator account and the right to install plugins.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Install the plugin</h3>\n            <p>In wp-admin, go to <strong>Plugins &rsaquo; Add New</strong>, search for &ldquo;Poliris&rdquo;, install and activate it. The wizard also links to the plugin on wordpress.org.</p>\n          </li>\n          <li>\n            <h3>Pair with a code</h3>\n            <p>In Poliris, click <strong>Get my pairing code</strong>. The code is valid for 15 minutes. In wp-admin, open <strong>Poliris</strong> in the left menu, paste the code and click <strong>Connect to Poliris</strong>.</p>\n          </li>\n          <li>\n            <h3>Check the connection</h3>\n            <p>The Poliris screen switches to <em>WordPress connected</em> on its own and shows the SEO plugin it found.</p>\n          </li>\n        </ol>\n        <p>Once connected, Poliris can change a post title, the SEO title and meta description in your SEO plugin, the content of a post for approved rewrites and image alt texts, and create draft posts. Nothing is written until you apply a change.</p>\n        <table>\n          <thead><tr><th>Status</th><th>What it means</th></tr></thead>\n          <tbody>\n            <tr><td>Waiting for the plugin</td><td>The code has not been entered in wp-admin yet. Generate a new code if 15 minutes have passed.</td></tr>\n            <tr><td>Connection error</td><td>Poliris reached the site but the plugin did not answer correctly: the plugin is deactivated, its application password was revoked, or a firewall blocks the WordPress REST API. Connect again from step 1.</td></tr>\n            <tr><td>Not connected</td><td>No plugin connection on this site. Fixes go through the pixel.</td></tr>\n          </tbody>\n        </table>\n        <p>\n          To disconnect, click <strong>Disconnect</strong> in Project Settings &rsaquo; Connector. To remove all access, also revoke the\n          <em>Poliris Connector</em> application password in your WordPress profile.\n        </p>\n        <figure class=\"docs-figure\" data-shot=\"S43\"><img src=\"/docs/images/s43-wordpress-pairing.webp\" alt=\"Connecting WordPress: install the plugin, pair with a one-time code, verify.\" width=\"540\" height=\"440\" loading=\"lazy\" /><figcaption>Connecting WordPress: install the plugin, pair with a one-time code, verify.</figcaption></figure>"
      },
      {
        "id": "integration-webflow",
        "title": "Webflow",
        "html": "<p>\n          With a Webflow Site Token, Poliris writes SEO fixes in your page settings through the Webflow API and creates article drafts in the CMS collection you choose.\n        </p>\n        <ol class=\"steps\">\n          <li>\n            <h3>Create a Site Token</h3>\n            <p>In Webflow, open your site settings, <strong>Apps &amp; Integrations</strong>, and generate an API token with read and write access to <strong>Pages</strong>, <strong>CMS</strong> and <strong>Assets</strong>.</p>\n          </li>\n          <li>\n            <h3>Paste and validate</h3>\n            <p>In Poliris, click <strong>I have my token</strong>, paste it and validate. The token is stored encrypted and never shown again.</p>\n          </li>\n          <li>\n            <h3>Choose the drafts collection</h3>\n            <p>Pick the CMS collection where article drafts go, usually your blog. You can change it later in Project Settings &rsaquo; Connector.</p>\n          </li>\n        </ol>\n        <p>\n          Once connected, Poliris can set the SEO title and meta description of a page, the Open Graph title and description, image alt texts, and create\n          draft items. Changes go live when you publish the site in Webflow. To disconnect, click <strong>Disconnect</strong> and revoke the token in Webflow.\n        </p>"
      },
      {
        "id": "integration-gsc-1",
        "title": "Google Search Console and Google Analytics",
        "html": "<p class=\"lede\">\n          Connecting Search Console and Google Analytics adds real traffic data to the technical audit: the searches that bring visitors,\n          clicks and impressions per page, devices, countries and where visits come from. Both connections are read-only.\n        </p>\n\n        <h3>Where to connect</h3>\n        <p>\n          Use the <strong>GSC</strong> and <strong>GA4</strong> chips at the top right of Site Overview, Page Explorer and the page report, or the chips\n          on the site card in <em>My site &amp; socials</em>. A green dot means connected, a red dot not connected. Each website is connected separately,\n          with the Google account that manages it.\n        </p>\n\n        <h3 id=\"integration-gsc-setup\">Connect Search Console</h3>\n        <ol>\n          <li>Click <strong>GSC</strong>. The window <em>Manage Search Console</em> opens.</li>\n          <li>In <strong>GSC property</strong>, enter your property as Search Console names it: <code>sc-domain:example.com</code> for a domain property, or\n            <code>https://example.com/</code> for a URL-prefix property. The exact value is at the end of the Search Console address bar, after <code>resource_id=</code>.\n            Left empty, Poliris uses the site URL.</li>\n          <li>Click <strong>Connect Search Console</strong>. Google asks, in a popup, for one read-only permission.</li>\n          <li>Once you accept, the property is saved and the chip turns green. Poliris then fetches your data without crawling the site again.</li>\n        </ol>\n\n        <h3 id=\"integration-ga4\">Connect Google Analytics</h3>\n        <ol>\n          <li>Click <strong>GA4</strong>. The window <em>Manage Google Analytics</em> opens.</li>\n          <li>In <strong>GA4 property ID</strong>, enter the numeric ID of your property. You find it in Google Analytics under\n            <strong>Admin &rsaquo; Property &rsaquo; Property details</strong>, for example <code>123456789</code>. A measurement ID starting with\n            <code>G-</code> is not accepted.</li>\n          <li>Click <strong>Connect Google Analytics</strong> and accept the read-only permission.</li>\n        </ol>\n        <p>\n          You need access to the property with the Google account you use: at least Viewer in Google Analytics, and the property must be verified in Search Console.\n          If a popup does not open, allow popups for Poliris and try again.\n        </p>\n\n        <h3>What appears once connected</h3>\n        <ul>\n          <li><strong>Site Overview</strong>: total visitors from search with the split by device, visitors by country, and traffic sources (Search, Direct, Social, Paid, GEO).</li>\n          <li><strong>Page report</strong>: clicks and impressions over time, the top search queries of the page with the share of branded searches, and engagement (time, bounce, scroll, active users).</li>\n        </ul>\n\n        <h3>Changing or removing a connection</h3>\n        <p>\n          Open the chip again: the window shows the Google account in use. <strong>Use a different Google account</strong> switches account for the website.\n          <strong>Disconnect</strong> removes the connection of that service only; the other one is not affected. The connection belongs to the website:\n          when a teammate has connected it, the chip is green for everyone.\n        </p>"
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
        "html": "<ul class=\"def-rows\">\n          <li><span class=\"def-term\">Profile</span><span class=\"def-desc\">Your photo, first and last name, username and password. Your email address cannot be changed.\n            The <strong>Language</strong> field switches the interface between English and French.</span></li>\n          <li><span class=\"def-term\">Workspaces</span><span class=\"def-desc\">The workspaces you belong to, with your role in each. <strong>New workspace</strong> creates one; you become its Owner and it starts on the Free plan.</span></li>\n          <li><span class=\"def-term\">MCP</span><span class=\"def-desc\">Connect AI assistants to your Poliris data and manage access tokens. See <a href=\"#integration-mcp\">MCP connector</a>.</span></li>\n        </ul>\n        <p>To delete your account, write to <a href=\"mailto:support@poliris.io\">support@poliris.io</a>.</p>"
      },
      {
        "id": "settings-workspace-1",
        "title": "Workspace settings",
        "html": "<p class=\"lede\">\n          A workspace is your team: its members, its projects, its plan and its credits. The settings have five tabs.\n        </p>\n\n        <h3>General</h3>\n        <p>\n          The name, logo and description of the workspace. The Owner can delete the workspace from the Danger Zone, which deletes its projects,\n          audit data and member access.\n        </p>\n\n        <h3 id=\"settings-members\">Members and roles</h3>\n        <p>\n          <strong>Invite Member</strong> sends an invitation by email with a role. For the Member and Viewer roles, you also choose which projects they can open.\n          A pending invitation can be resent or canceled. The person accepts it from the link in the email, signed in with the invited address.\n        </p>\n        <table>\n          <thead><tr><th>Role</th><th>Projects</th><th>What they can do</th></tr></thead>\n          <tbody>\n            <tr><td>Owner</td><td>All</td><td>Everything, including the plan, payment methods and deleting the workspace. The creator of the workspace is its only Owner.</td></tr>\n            <tr><td>Admin</td><td>All</td><td>Invite members and change their role, manage project access, add projects, change project settings.</td></tr>\n            <tr><td>Member</td><td>Those assigned</td><td>Work in the projects: run audits, use the tools, edit prompts.</td></tr>\n            <tr><td>Viewer</td><td>Those assigned</td><td>Open the assigned projects.</td></tr>\n          </tbody>\n        </table>\n\n        <figure class=\"docs-figure\" data-shot=\"S46\"><img src=\"/docs/images/s46-members.webp\" alt=\"Members of a workspace and their roles.\" width=\"1324\" height=\"616\" loading=\"lazy\" /><figcaption>Members of a workspace and their roles.</figcaption></figure>\n\n        <h3>Projects</h3>\n        <p>\n          The projects of the workspace with their website, last audit, creator and members. <strong>Manage Access</strong> chooses which Members and\n          Viewers can open each project. <strong>Add Project</strong> creates a project from a website URL.\n        </p>\n\n        <h3>Usage</h3>\n        <p>\n          The credits of the current billing period: total, used and left, the split by type of action (GEO Audit, Technical Audit, Content Generation and others), the number of audits, and the credits used by each project.\n        </p>\n\n        <h3 id=\"settings-billing\">Billing</h3>\n        <p>\n          The current plan, its monthly credits, what is used and left, and the next billing date. Only the Owner can change the plan or the payment method.\n        </p>\n        <ul>\n          <li><strong>Manage Plan</strong> shows the plans. An upgrade applies at once, with a prorated charge, and the larger pool is available immediately.\n            A downgrade applies at the end of the current period; until then a banner reminds you of the change and <strong>Keep current plan</strong> cancels it.</li>\n          <li><strong>Manage Billing</strong> opens the Stripe customer portal, where you update your card or cancel the subscription. A canceled workspace goes back to the Free plan.</li>\n          <li>The invoice history links to each invoice as a PDF.</li>\n        </ul>\n        <figure class=\"docs-figure\" data-shot=\"S47\"><img src=\"/docs/images/s47-billing.webp\" alt=\"The Billing tab.\" width=\"1640\" height=\"990\" loading=\"lazy\" /><figcaption>The Billing tab.</figcaption></figure>"
      },
      {
        "id": "settings-project-1",
        "title": "Project Settings",
        "html": "<p class=\"lede\">\n          The settings of one project. Owners and Admins can change them; every member with access to the project can edit its prompts.\n        </p>\n        <ul class=\"def-rows\">\n          <li><span class=\"def-term\">Configuration</span><span class=\"def-desc\">Project name, description and color. The main website URL cannot be changed. The Danger Zone deletes the project.</span></li>\n          <li><span class=\"def-term\">LLM Models</span><span class=\"def-desc\">The models questioned for each product. Changes apply from the next run.</span></li>\n          <li><span class=\"def-term\">Prompts</span><span class=\"def-desc\">The questions of each product: edit the wording and topics, turn a question on or off, delete it. Active questions are asked at each run. New questions are added from the audit setup panel.</span></li>\n          <li><span class=\"def-term\">Trade Areas</span><span class=\"def-desc\">The trading zones of each product. Removing a zone keeps its audit history.</span></li>\n          <li><span class=\"def-term\">Visibility Topics</span><span class=\"def-desc\">The topics followed for each product, chosen from the list.</span></li>\n          <li><span class=\"def-term\">Scheduling</span><span class=\"def-desc\">Automatic runs of the AI visibility analysis per product: daily, weekly or monthly, with the time, day, time zone and trading zone. The table shows the next run and the recent runs with their credits. A scheduled run is skipped, without any notification, when the workspace has fewer than 100 credits.</span></li>\n          <li><span class=\"def-term\">Technical Audit</span><span class=\"def-desc\">The default maximum number of pages for the site. The number chosen in the run window takes precedence.</span></li>\n          <li><span class=\"def-term\">AI Agent</span><span class=\"def-desc\">The default language and default model tier (speed) of Poli AI, the conversation log and the memory of Poli AI for the project.</span></li>\n          <li><span class=\"def-term\">Connector</span><span class=\"def-desc\">How Poliris connects to each website: SEO pixel, WordPress or Webflow. See <a href=\"#integrations\">Site connection</a>.</span></li>\n        </ul>"
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
        "html": "<dl class=\"kv\">\n          <dt>AI Reputation</dt>\n          <dd>The audit of what AI assistants say about your products: visibility, ranking and sentiment.</dd>\n\n          <dt>Analysis run</dt>\n          <dd>One execution of an AI visibility audit: every selected prompt sent to every selected model, for one product in one trading zone.</dd>\n\n          <dt>Brand structure</dt>\n          <dd>The brands, categories and products of a project, shown on the AI Reputation Overview.</dd>\n\n          <dt>Credits</dt>\n          <dd>The unit used to pay for audits and AI tools. The pool belongs to the workspace and is refilled every month.</dd>\n\n          <dt>Execution board</dt>\n          <dd>The view of the Roadmap in three columns: Backlog, In progress and Completed.</dd>\n\n          <dt>Free Models</dt>\n          <dd>The public web interfaces of AI assistants (ChatGPT, Gemini, Perplexity, Google AI Mode, Google AI Overview). Free during onboarding, about one credit per question afterwards.</dd>\n\n          <dt>Health score</dt>\n          <dd>The overall score of a site or a page in the technical audit, across the Page Access, Content Access and Content Quality stages.</dd>\n\n          <dt>Page importance</dt>\n          <dd>A score from 0 to 100 that shows how much a page matters within your site. The home page is 100.</dd>\n\n          <dt>Poli AI</dt>\n          <dd>The assistant built into Poliris. It answers questions about your data, prepares fixes and edits the Roadmap when you ask.</dd>\n\n          <dt>Product</dt>\n          <dd>An offer as a buyer would ask an AI assistant about it. AI visibility is measured per product.</dd>\n\n          <dt>Project</dt>\n          <dd>One brand and its website, with its audits, roadmap and content.</dd>\n\n          <dt>Prompt</dt>\n          <dd>A question sent to the AI models, written like a customer would ask it, without your brand name.</dd>\n\n          <dt>SEO Pixel</dt>\n          <dd>A script added to the pages of your site that lets Poliris apply fixes such as titles or structured data.</dd>\n\n          <dt>SEO Plan</dt>\n          <dd>The plan shown on the Roadmap: actions placed week by week within the time you have.</dd>\n\n          <dt>Topic</dt>\n          <dd>A theme your brand is measured on, such as quality or value for money. Each product follows three to five topics.</dd>\n\n          <dt>Trading zone (Trade Area)</dt>\n          <dd>The country or region where visibility is measured. Each product is audited per zone.</dd>\n\n          <dt>Visibility score</dt>\n          <dd>How often the AI models mention your brand in their answers, from 0 to 100.</dd>\n\n          <dt>Workspace</dt>\n          <dd>Your team: its members, projects, plan and credits.</dd>\n        </dl>"
      },
      {
        "id": "glossary-2",
        "title": "GEO & AI Glossary",
        "html": "<p>\n          A broader glossary of Generative Engine Optimization and AI terminology used across the industry. Useful when\n          you&rsquo;re reading reports, talking to partners, or comparing Poliris output to other tools.\n        </p>\n\n        <dl class=\"kv\">\n          <dt>AI Answer Box / AI Summary / AI Snapshot</dt>\n          <dd>AI-generated boxes on results pages that provide a summary or direct answer to a query. They often combine information from multiple sources, similar to AI Overviews, and also include links to reference content. <em>See also: AI Overview, Answer Engine, Enriched Results.</em></dd>\n\n          <dt>AI Overview</dt>\n          <dd>AI-generated summaries displayed on Google results pages, combining information from multiple sources. They provide a quick overview of a topic, with links to relevant content, often in a prominent area at the top of the SERP. AI Overviews extend the Search Generative Experience and rely on Google&rsquo;s advanced models. <em>See also: SGE, AI Mode, AI Answer Box.</em></dd>\n\n          <dt>Answer Engine / Response Engine</dt>\n          <dd>A system that directly answers questions by computing or generating a response from external data (e.g., WolframAlpha). Unlike traditional search engines, it provides a precise answer rather than a list of links. It relies on knowledge bases, algorithms, and sometimes language models. <em>See also: AEO, AI Answer Box.</em></dd>\n\n          <dt>Answer Engine Optimization (AEO)</dt>\n          <dd>Content optimization to appear in direct answers provided by answer engines or conversational assistants. AEO focuses on content structure, clarity, and reliability so that AI systems can accurately retrieve and cite it. It specifically targets answers generated by tools like ChatGPT or Google&rsquo;s AI Overviews. <em>See also: GEO, Answer Engine, Enriched Results.</em></dd>\n\n          <dt>Chunking</dt>\n          <dd>The act of breaking large volumes of text into smaller units, called &ldquo;chunks,&rdquo; to make them easier for language models to process. This improves the efficiency and accuracy of summarization, information extraction, or translation. Chunks may consist of sentences, paragraphs, or passages, in order to preserve relevant context. <em>See also: Passage, Context Window.</em></dd>\n\n          <dt>Citation</dt>\n          <dd>Explicit mention of a source or document in the response generated by a model, used to reference the origin of the information. RAG systems and AI Overviews use citations to show which pages were consulted and to strengthen user trust. Structuring your content and providing reliable sources increases the chances of being cited. <em>See also: RAG, AI Overview, E-E-A-T.</em></dd>\n\n          <dt>Context Window</dt>\n          <dd>The maximum number of tokens a model can consider simultaneously around a word or query. A larger context window allows the model to retain more information and can improve response relevance. It determines how much text an LLM can analyze at once and influences chunking and RAG strategies. <em>See also: Token, LLM, Chunking.</em></dd>\n\n          <dt>Conversational Search</dt>\n          <dd>Search where the user asks questions in natural language and receives responses as in a conversation. It replaces keyword-based searches with full queries and offers a more human-like interaction. These systems rely on language models and context to understand intent and provide evolving answers (often via chatbots or voice assistants). <em>See also: Answer Engine, Search Intent, Prompt.</em></dd>\n\n          <dt>Data ingestion</dt>\n          <dd>The process by which raw data is collected, imported, and integrated into a system for processing or analysis. For language models, this includes gathering texts, cleaning them, and formatting them for training or updating via techniques like RAG. Effective ingestion ensures the quality and freshness of the information used by generative engines. <em>See also: RAG, Grounding, Vector Databases.</em></dd>\n\n          <dt>E-E-A-T</dt>\n          <dd>Acronym for Experience, Expertise, Authoritativeness, Trustworthiness. This is a content quality evaluation framework used by Google. Experience reflects first-hand knowledge of the topic; expertise refers to skills or qualifications; authoritativeness concerns reputation and the quality of sources; trustworthiness relates to site security and transparency. Strengthening these criteria improves content credibility and visibility, even though they are not direct ranking factors. <em>See also: YMYL, LLMO, Rich results.</em></dd>\n\n          <dt>Embeddings</dt>\n          <dd>Vector representations (in numerical form) of words, phrases, or objects, organized so that semantically similar items are close in the vector space. Obtained through learning techniques, they allow measurement of semantic similarity between texts or entities. They are used for semantic search, sentiment analysis, and information retrieval in vector databases. <em>See also: Semantic Proximity, Vector database, Semantic search.</em></dd>\n\n          <dt>Enriched Results</dt>\n          <dd>Search results that go beyond the traditional blue link, displaying additional data, images, or visuals (reviews, products, events, etc.). They are often generated from structured data. They enhance the user experience and can achieve high click-through rates, even with the rise of zero-click searches. <em>See also: Structured Data, Rich Snippet, Featured Snippet.</em></dd>\n\n          <dt>Entity / Named Entity</dt>\n          <dd>An important element of a text (person, place, organization, event, date, etc.) that can be detected and categorized using named entity recognition techniques. Identifying entities feeds knowledge graphs and improves search relevance. In GEO, properly defining and tagging entities enhances their recognition by models and increases the likelihood of being cited. <em>See also: Knowledge Graph, Schema.org, Embeddings.</em></dd>\n\n          <dt>Featured Snippet / Position Zero</dt>\n          <dd>A highlighted text snippet at the top of a search results page that provides a concise answer to a query. It is called &ldquo;position zero&rdquo; because it appears before the organic results, often in a box. It is selected from well-structured and relevant content, making it important for SEO and GEO. <em>See also: Enriched Results, Zero-Click Search, AI Answer Box.</em></dd>\n\n          <dt>Generative AI</dt>\n          <dd>A set of models capable of creating text, images, or other original content from existing data. Often based on transformer architectures and LLMs, generative AI produces responses, summaries, or multimodal creations and powers conversational assistants and creative tools. It also raises reliability and ethical concerns. <em>See also: LLM, Foundation AI, Hallucination.</em></dd>\n\n          <dt>Generative AI Optimization (GAIO)</dt>\n          <dd>Term used to describe the optimization of content to adapt it to generative engines (the conceptual equivalent of GEO). It combines structuring, markup, and semantic relevance so that language models recommend and cite a brand&rsquo;s content. GAIO largely overlaps with GEO. <em>See also: GEO, LLMO, AEO.</em></dd>\n\n          <dt>Generative Engine Advertising (GEA)</dt>\n          <dd>Adaptation of advertising strategies to optimize brand visibility and recommendations within AI-generated responses. This involves creating promotional content that is likely to be selected and mentioned by generative engines such as ChatGPT or Perplexity. GEA extends GEO by specifically targeting the commercial recommendations made by the models. <em>See also: GEO, LLMO.</em></dd>\n\n          <dt>Generative Engine Optimization (GEO)</dt>\n          <dd>The optimization of digital content to improve its visibility in results generated by AI models, particularly the synthetic answers produced by generative engines. This practice aims to influence the way large language models retrieve, synthesize, and cite a brand&rsquo;s or publisher&rsquo;s information in generated responses. It resembles an evolution of search optimization toward environments where users receive a complete answer without clicking, and it is distinct from Search Engine Optimization (SEO) and Answer Engine Optimization (AEO). <em>Also called: GAIO, AI SEO, generative engine optimization. See also: AEO, RAG.</em></dd>\n\n          <dt>Generative Search Optimization (GSO)</dt>\n          <dd>A set of optimization techniques aimed at ensuring content is effectively recognized by search engines using generative AI. Similar to GEO, AEO, and GAIO, it emphasizes semantic quality and the accessibility of information for the models, whether in generated answers, enriched results, or knowledge panels. <em>See also: GEO, Global Search Optimization, LLMO.</em></dd>\n\n          <dt>Global Search Optimization (GSO)</dt>\n          <dd>A set of optimization practices aimed at improving the visibility of content across all search interfaces: traditional search engines, voice assistants, generative engines, etc. It combines SEO, AEO, and GEO to ensure presence in organic results, direct answers, and generated previews. <em>See also: SEO, GEO, LLMO.</em></dd>\n\n          <dt>Google AI Mode</dt>\n          <dd>An advanced search experience using deep reasoning and multimodal capabilities to explore a topic in detail. It allows follow-up questions, provides links to useful resources, and integrates AI-generated answers. AI Mode notably relies on the query fan-out technique to break a query into sub-questions and explore the web in depth. <em>See also: Query Fan-Out, SGE, AI Overview.</em></dd>\n\n          <dt>Grounding / Factual Anchoring</dt>\n          <dd>The act of linking an AI model&rsquo;s output to real, verifiable data to ensure factual results. Grounding improves accuracy by basing generation on authentic documents rather than mere statistical correlations. It is often used alongside RAG to combat hallucinations and provide clear citations. <em>See also: RAG, Hallucination, Generative AI.</em></dd>\n\n          <dt>Hallucination (AI)</dt>\n          <dd>Inaccuracy or false statement generated by an AI model, while appearing plausible. It occurs when the model misinterprets patterns or lacks reliable information, producing responses that do not reflect reality. Reducing hallucinations involves techniques such as RAG or grounding, which link the output to verifiable sources. <em>See also: Grounding, RAG, Generative AI.</em></dd>\n\n          <dt>JSON-LD</dt>\n          <dd>Serialization format for linked data that allows structured data to be embedded within HTML using JSON. Recommended by Google for implementing Schema.org without modifying visible content, it simplifies markup maintenance and promotes the appearance of enriched results and knowledge panels. <em>See also: Structured Data, Schema.org, Knowledge Graph.</em></dd>\n\n          <dt>Knowledge Graph</dt>\n          <dd>A knowledge base that represents entities and their relationships as nodes and edges. It stores interconnected descriptions of objects, events, and concepts, allowing navigation between them via queries. Search engines use it to power knowledge panels and generated answers. <em>See also: Named Entity, Schema.org, Knowledge Panel.</em></dd>\n\n          <dt>Knowledge Panel</dt>\n          <dd>Box in search results that presents a summary of information from a knowledge graph (key facts, images, links, etc.) about an entity. Optimizing its presence involves using structured data and precise schemas for the relevant entities. <em>See also: Knowledge Graph, Schema.org, Enriched Results.</em></dd>\n\n          <dt>Large Language Model (LLM)</dt>\n          <dd>Large language model trained in a self-supervised manner on very large volumes of text for natural language processing tasks. Based on transformer-type architectures, it contains billions to trillions of parameters and can generate, summarize, translate, and reason over text. LLMs are at the core of conversational agents, code generators, and augmented search systems. <em>See also: Generative AI, Transformers, Context Window.</em></dd>\n\n          <dt>Large Language Model Optimization (LLMO)</dt>\n          <dd>Optimization of content so that it is used and cited by generative AI tools (ChatGPT, Perplexity, etc.). It prioritizes authoritative sources, semantically complete content blocks, and formats that are easy to analyze. LLMO is a variant of AEO and GEO focused on large language models. <em>Also called: AI SEO, LLM SEO. See also: GEO, AEO.</em></dd>\n\n          <dt>Multimodal Model / Multimodal Search</dt>\n          <dd>AI model capable of understanding and processing multiple types of information (text, image, audio, video) simultaneously. Multimodal search leverages these models to interpret queries combining multiple media and provide integrated results (e.g., describing an image and asking a question). <em>See also: Foundation AI, LLM, Transformers.</em></dd>\n\n          <dt>Natural Language Processing (NLP)</dt>\n          <dd>A field that enables machines to understand, analyze, and generate human language. It covers syntax analysis, translation, entity recognition, sentiment analysis, and more. Recent advances rely on LLMs, embeddings, and pretraining to enhance human-machine interaction. <em>See also: LLM, Transformers, Embeddings.</em></dd>\n\n          <dt>Ontology</dt>\n          <dd>Formal representation of the concepts within a domain and the relationships that link them, used to structure knowledge. It defines classes, properties, and hierarchies to ensure a shared understanding (for both machines and humans) of a subject. Ontologies are crucial for knowledge graphs and support semantic search and enriched results. <em>See also: Knowledge Graph, Taxonomy, Schema.org.</em></dd>\n\n          <dt>Passage</dt>\n          <dd>Text segment short enough to be processed or indexed individually. Passages are often created through chunking and serve as units for search or input into generative systems. A well-defined passage improves accuracy by focusing on a specific context. <em>See also: Chunking, RAG.</em></dd>\n\n          <dt>Prompt</dt>\n          <dd>Natural language text that describes the task an AI model should perform. It provides the initial context and can specify the style, format, or information to use. The quality and precision of the prompt directly influence the relevance of the responses and form the core of prompt engineering. <em>See also: Prompt Engineering, Query Fan-Out, Conversational Search.</em></dd>\n\n          <dt>Prompt Engineering</dt>\n          <dd>The art of formulating and structuring an instruction (prompt) to obtain more relevant responses from a generative AI model. A prompt describes the task to perform, sometimes including the desired style, format, or context. Optimizing it is essential to fully leverage language models in both search and creative applications. <em>See also: Prompt, Query Fan-Out, Conversational Search.</em></dd>\n\n          <dt>Query Fan-Out</dt>\n          <dd>Technique that breaks a question into multiple subtopics and simultaneously sends several queries to find diverse content. It helps capture different intents and retrieve results from the web, knowledge graphs, and other sources. Query fan-out powers generative search experiences such as AI Mode. <em>See also: AI Mode, SGE, Conversational Search.</em></dd>\n\n          <dt>Retrieval-Augmented Generation (RAG)</dt>\n          <dd>Technique that combines a language model with an information retrieval system to incorporate up-to-date knowledge into generation. The model first consults a set of specific documents before responding, which enriches the output and reduces hallucinations. It allows updating a model without full retraining and facilitates verifiable citations. <em>See also: GEO, Grounding, Augmented Retrieval.</em></dd>\n\n          <dt>Schema.org</dt>\n          <dd>Collaborative initiative aimed at defining schemas for structured data on the Internet. Led by players such as Google, Microsoft, Yahoo, Yandex, and the web community, it provides common tags to improve search engines&rsquo; understanding of pages. Using Schema.org in HTML helps generate enriched results, knowledge panels, and accurate citations. <em>See also: Structured Data, JSON-LD, Knowledge Graph.</em></dd>\n\n          <dt>Search Generative Experience (SGE)</dt>\n          <dd>Experience from Google Search Labs that uses generative AI to provide quick overviews of a topic, related ideas, and the ability to ask follow-up questions. SGE presents synthesized answers accompanied by links to sources, helping users understand a topic more quickly. It paves the way for more conversational search and has inspired AI Overviews and AI Mode. <em>See also: AI Overview, AI Mode, Query Fan-Out.</em></dd>\n\n          <dt>Search Intent</dt>\n          <dd>What the user actually wants to achieve when entering a query: informational (seeking a fact), transactional (purchasing or booking), or navigational (accessing a specific site). Understanding the intent allows content and responses to be tailored to better meet the need. <em>See also: Conversational Search, Query Fan-Out, Enriched Results.</em></dd>\n\n          <dt>Search or Crawl Bots</dt>\n          <dd>Programs that automatically browse websites to download and index their content. They allow search engines to discover and update pages, but also serve to collect data for training language models. Publishers can control their activity using the robots.txt file and certain meta tags. <em>See also: Knowledge Graph, LLMO, Web Crawling.</em></dd>\n\n          <dt>Semantic Proximity</dt>\n          <dd>Measure of the similarity in meaning between two words, phrases, or entities within a vector space. Calculated from embeddings, it allows finding relevant content beyond simple keyword matching. It is essential for semantic search and content alignment in answer engines. <em>See also: Embeddings, Semantic Search.</em></dd>\n\n          <dt>Semantic Search</dt>\n          <dd>Information retrieval approach that aims to understand intent and contextual meaning rather than relying solely on exact keywords. It leverages embeddings and measures semantic similarity to deliver more relevant results, particularly for conversational queries. <em>See also: Embeddings, Semantic Proximity, Vector Database.</em></dd>\n\n          <dt>SEO LLM / LLM SEO</dt>\n          <dd>Informal term referring to the optimization of content so that it can be utilized and cited by large language models. Similar to LLMO, it involves structuring content, providing reliable sources, and maximizing the models&rsquo; semantic understanding. It combines traditional SEO and GEO to ensure visibility in generated answers. <em>See also: LLMO, GEO, AEO.</em></dd>\n\n          <dt>Structured Data</dt>\n          <dd>A standardized format used to provide information about a page and classify its content (e.g., a recipe: ingredients, cooking time, nutritional value). This markup helps engines understand the content and supports the generation of enriched results and the use of the page by language models. <em>See also: Schema.org, JSON-LD, Enriched Results.</em></dd>\n\n          <dt>Taxonomy</dt>\n          <dd>Hierarchical classification used to organize concepts, products, or content into categories and subcategories. It facilitates user navigation and search engine indexing. In GEO, a consistent taxonomy helps models understand relationships between topics and generate more accurate responses. <em>See also: Ontology, Knowledge Graph, Structured Data.</em></dd>\n\n          <dt>Token</dt>\n          <dd>A sequence of characters considered a processing unit during tokenization (word, subword, symbol, etc.). Tokenization splits text into tokens, which the model then processes. The number of tokens affects the context window and processing costs. <em>See also: Context Window, Transformers, Embeddings.</em></dd>\n\n          <dt>Transformers</dt>\n          <dd>Neural network architecture based on the multi-head attention mechanism, without recurrence. Text is tokenized and embedded, then each token is contextualized via attention weights within a context window. Introduced in the paper &ldquo;Attention Is All You Need&rdquo; (2017), transformers have replaced RNNs and form the basis of most large language models. <em>See also: LLM, Context Window, Token.</em></dd>\n\n          <dt>Vector Database</dt>\n          <dd>A database designed to store and query embeddings (vectors representing the meaning or features of unstructured data). Unlike traditional databases, it handles multidimensional data and searches by similarity (distance between vectors). It powers semantic search and RAG by providing relevant documents through vector queries. <em>See also: Embeddings, Semantic Search, RAG.</em></dd>\n\n          <dt>YMYL (Your Money or Your Life)</dt>\n          <dd>Category of content that can impact users&rsquo; health, safety, happiness, or financial stability. Google applies higher quality standards to these pages to prevent inaccurate information from harming users. Publishers must demonstrate strong expertise and trustworthiness to be visible in these sensitive areas. <em>See also: E-E-A-T, Enriched Results, LLMO.</em></dd>\n\n          <dt>Zero-Click Search</dt>\n          <dd>Search where the answer to the query is provided directly on the results page, without the need for an additional click. This can take the form of rich snippets, knowledge panels, or generated answers that immediately satisfy the search intent. This trend impacts GEO and AEO, as it reduces site traffic in favor of presence in the immediate answer. <em>See also: Enriched Results, AI Overview, Featured Snippet.</em></dd>\n        </dl>"
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
        "html": "<p class=\"lede\">Answers to the questions we hear most often.</p>\n\n        <h3>What is GEO?</h3>\n        <p>\n          Generative Engine Optimization is the work of making a brand visible and well described in the answers of AI assistants. It builds on SEO:\n          the assistants search the web and quote the pages they can read and trust. GEO adds the work on the sources they rely on and on how your\n          content answers the questions people ask.\n        </p>\n\n        <h3>Which AI assistants does Poliris analyze?</h3>\n        <p>\n          Through their public web interface: ChatGPT, Gemini, Perplexity, Google AI Mode and Google AI Overview. Through their API, on paid plans:\n          models from OpenAI, Google, Anthropic (Claude), xAI (Grok) and Mistral. See <a href=\"#models\">Models you can question</a>.\n        </p>\n\n        <h3>How is visibility measured?</h3>\n        <p>\n          Poliris asks the AI models the questions your customers ask, without naming your brand, and shows how often your brand appears in the answers,\n          topic by topic and model by model, next to your competitors. See the <a href=\"#feature-geo-visibility-1\">Visibility tab</a>.\n        </p>\n\n        <h3>How is sentiment measured?</h3>\n        <p>\n          Each answer that mentions your brand is labeled positive, neutral or negative. The <a href=\"#feature-geo-sentiment-1\">Sentiment tab</a> shows the result\n          per topic and per model, next to your competitors.\n        </p>\n\n        <h3>Why do my scores change between two runs?</h3>\n        <p>\n          AI assistants do not always give the same answer to the same question, and their sources change. A single run is a snapshot: compare several runs,\n          or schedule the analysis to run regularly, before drawing conclusions. Using more prompts also makes the scores steadier.\n        </p>\n\n        <h3>How long does an analysis take?</h3>\n        <p>\n          An AI visibility analysis usually takes a few minutes. A technical audit depends on the number of pages: a few minutes for 100 pages, longer for\n          thousands. You can leave the page while it runs.\n        </p>\n\n        <h3>How many prompts should I use?</h3>\n        <p>\n          Onboarding runs 5 to 10. On a paid plan, Poliris writes 20 questions per audit and pre-selects 10; you keep at least 5 and can add your own, on 2 to 4 models. More prompts give steadier scores and cost more credits:\n          the setup panel shows the cost before you start.\n        </p>\n\n        <h3>Which countries and languages are covered?</h3>\n        <p>\n          Any country or region can be a trading zone. Questions are written in the language you choose for the zone. The interface is available in English and French.\n        </p>\n\n        <h3>Can I choose the competitors?</h3>\n        <p>\n          Not yet. Poliris finds your competitors in the AI answers and follows the five most important ones in every ranking.\n        </p>\n\n        <h3>Can an agency manage several brands?</h3>\n        <p>\n          Yes. Create one project per brand in your workspace and give each team member access to the projects they work on. All projects share the\n          credits of the workspace.\n        </p>\n\n        <h3>Does Poliris change my website?</h3>\n        <p>\n          Not by itself. Poliris reads your public pages. It changes something only when you connect the site (SEO pixel, WordPress or Webflow) and apply a fix\n          yourself. Access to Google Search Console and Google Analytics is read-only.\n        </p>\n\n        <h3>Is my data safe?</h3>\n        <p>\n          The application servers and the database are hosted in the European Union. Some providers, such as the AI model providers, are outside the EU and covered by standard contractual clauses. Poliris does not use your data, conversations or Google data to train its own AI models, and never sells data coming from Google. Access to your Google\n          data is read-only and is removed when you disconnect. A data processing agreement is available on request. See our\n          <a href=\"https://poliris.io/en/privacy\">privacy policy</a> for the details.\n        </p>\n\n        <h3>What happens when I run out of credits?</h3>\n        <p>\n          An AI visibility analysis needs at least 100 credits to start, and a technical audit needs enough credits for its pages. Below that, these\n          actions show a padlock and scheduled analyses are skipped. Credits come back at your next monthly renewal, or immediately if you move to a larger plan.\n        </p>\n\n        <h3>How do I cancel?</h3>\n        <p>\n          The workspace Owner opens <strong>Workspace settings &rsaquo; Billing &rsaquo; Manage Billing</strong> and cancels in the Stripe portal. The workspace then\n          goes back to the Free plan; your projects and past audits stay available.\n        </p>"
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
        "html": "<p>Something does not work as described, or you have a question?</p>\n        <ul>\n          <li>Email: <a href=\"mailto:support@poliris.io\">support@poliris.io</a></li>\n          <li>Book a call with the team: <a href=\"https://poliris.io/en/demo\">poliris.io/en/demo</a></li>\n          <li>Articles and guides: <a href=\"https://poliris.io/en/blog\">the Poliris blog</a></li>\n        </ul>"
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
        "html": "<p class=\"lede\">The main changes of the last months, newest first.</p>"
      },
      {
        "id": "release-notes-1",
        "title": "October 2026",
        "html": "<ul>\n          <li>Onboarding: products are now detected as lines of business, and questions are written in two steps to sound closer to what customers ask.</li>\n          <li>Roadmap: a new plan is published directly, without a validation step. Weekly hours can be split between a developer, work in Poliris and the client, and each plan opens with an overview.</li>\n          <li>AI Reputation: the Evolution chart moved to the Visibility tab. When you delete a product followed in several trading zones, you choose the zones to remove.</li>\n          <li>Keywords: Keyword Audit, Keyword Research and Keyword Tracker are grouped under one Keywords entry.</li>\n        </ul>"
      },
      {
        "id": "release-notes-2",
        "title": "September 2026",
        "html": "<ul>\n          <li>Roadmap: the SEO Plan, with a week-by-week timeline, an execution board, and <em>Update plan</em> with a preview of the changes. New options: LLM to favour and Developer tasks.</li>\n          <li>Sidebar: the <em>Dashboard | Poli AI</em> switch opens Poli AI in full page.</li>\n          <li>Technical audit: audits of up to 30,000 pages, Non-owned sites, orphan pages, and a sitemap card with estimated issues.</li>\n          <li>Excel export of AI Reputation and technical audit data.</li>\n          <li>Citations: Review Citation, and suggested actions on each cited source in Backlinks &amp; Citations.</li>\n        </ul>"
      },
      {
        "id": "release-notes-3",
        "title": "August 2026",
        "html": "<ul>\n          <li>MCP connector: connect Claude, ChatGPT or Cursor to your Poliris data.</li>\n          <li>Scheduled AI visibility analyses now run automatically.</li>\n          <li>Google Search Console and Google Analytics are connected separately, and the connection belongs to each website.</li>\n          <li>Roadmap: the <em>Create an SEO plan</em> form.</li>\n        </ul>"
      },
      {
        "id": "release-notes-4",
        "title": "July 2026",
        "html": "<ul>\n          <li>Plans and billing with Stripe: Starter, Growth and Pro.</li>\n          <li>Site connection: SEO pixel, WordPress plugin (available on wordpress.org) and Webflow.</li>\n          <li>Onboarding in four steps.</li>\n          <li>Content: the Content Optimizer and long-term content plans.</li>\n          <li>Acquire Citation.</li>\n        </ul>\n\n        <div class=\"doc-footer-nav\">\n          <a href=\"#introduction\"><span class=\"direction\">Back to</span>Introduction</a>\n          <a href=\"#getting-started\" class=\"next\"><span class=\"direction\">Start with</span>Quickstart</a>\n        </div>"
      }
    ]
  }
};
