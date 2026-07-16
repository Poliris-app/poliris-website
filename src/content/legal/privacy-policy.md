# Privacy Policy

**Last updated: July 15, 2026**

This Privacy Policy explains how **FCFD**, a French limited liability company (SARL) with a share capital of €100, registered with the Sarreguemines Trade and Companies Register (RCS) under number 940 441 876, having its registered office at 12 rue Saint-Blaise, 57460 Behren-lès-Forbach, France ("**Poliris**", "**we**", "**us**"), collects and processes personal data when you:

- visit our website **poliris.io** (the "Website");
- use the Poliris platform at **app.poliris.io** (the "Service");
- install and use the **Poliris WordPress plugin** (the "Plugin").

FCFD operates the Service under the brand name **Poliris**. FCFD is the data controller for the processing described in this policy, except where stated otherwise in Section 4.

**Privacy contact:** florian.michel@poliris.io

---

## 1. Data we collect

### 1.1 When you visit the Website

- Technical data: IP address, browser type and version, device type, pages viewed, referrer, and similar log data, collected for security and to operate the Website.
- Data you submit voluntarily: name, email address, company name, and message content when you fill in a contact or demo-request form.

### 1.2 When you create and use a Poliris account

- Account data: name, business email address, password (stored hashed), company name, and billing details.
- Usage data: actions performed within the Service, projects and sites configured, and support communications.
- Content data: the domains, URLs, keywords, prompts, and publicly available website content you ask Poliris to audit and analyze. Website audits are performed by crawling publicly accessible pages of the websites you configure; this crawl operates independently of the Plugin.

### 1.3 When you use the WordPress Plugin

The Plugin is a thin connector between your WordPress site and your Poliris account. When you connect ("pair") a WordPress site, the Plugin transmits to us, over HTTPS:

- a **WordPress Application Password** (a native, revocable WordPress access credential created for the administrator account performing the pairing);
- the pairing code;
- the site URL;
- the WordPress username of the administrator performing the pairing;
- the WordPress version and Plugin version;
- the name of the active SEO plugin (e.g. Yoast SEO, Rank Math), if any.

Once a site is paired:

- when you approve a change in the Poliris dashboard, we transmit the content of that change to your site through the WordPress REST API (e.g. an updated title, meta description, page content, image alt text, or a new blog post created as a draft);
- on regular front-end page views, the Plugin fetches from Poliris the list of currently approved fixes for your site and sends lightweight connection-status ("heartbeat") signals. These are **server-to-server requests identified only by an opaque per-site identifier and a timestamp**.

### 1.4 What we do NOT collect

- The Plugin does **not** collect or transmit any personal data of your website's visitors: no IP addresses, no cookies, no analytics, no browsing behavior, no customer or e-commerce data.
- The Plugin does not set cookies on your website and does not send usage telemetry.
- We do not sell personal data, and we do not use your data for advertising.

## 2. Purposes and legal bases (GDPR)

| Processing | Purpose | Legal basis |
|---|---|---|
| Account, billing, and Service operation | Provide the Service you subscribed to | Performance of a contract (Art. 6(1)(b) GDPR) |
| Plugin data flows described in 1.3 | Apply the SEO/GEO fixes and content you approve to your site | Performance of a contract (Art. 6(1)(b) GDPR) |
| Website logs and security | Secure and maintain the Website and Service | Legitimate interest (Art. 6(1)(f) GDPR) |
| Contact and demo requests | Respond to your inquiry | Steps prior to entering into a contract (Art. 6(1)(b) GDPR) |
| Legal and accounting obligations | Comply with French tax and commercial law | Legal obligation (Art. 6(1)(c) GDPR) |

## 3. Where your data is hosted and our sub-processors

Our infrastructure is hosted in the **European Union**. We rely on the following categories of sub-processors:

| Sub-processor | Role | Location of processing |
|---|---|---|
| Fly.io, Inc. | Application hosting | European Union (EU region) |
| Vercel Inc. | Website and front-end hosting | European Union (EU region) |
| Supabase, Inc. | Database hosting | European Union (EU region) |
| OpenAI, L.L.C. | AI analysis and content generation | United States |
| Anthropic, PBC | AI analysis and content generation | United States |
| Google LLC (Gemini API) | AI analysis and content generation | United States |
| [Payment processor — Stripe, Inc.] | Subscription payments | United States / EU |

## 4. International transfers

Where data is transferred outside the European Economic Area (in particular to the AI providers listed above), we rely on the **EU–U.S. Data Privacy Framework** where the recipient is certified, and on the European Commission's **Standard Contractual Clauses (SCCs)** together with appropriate supplementary measures otherwise.

When we process website content, credentials, or other data on behalf of our business customers in connection with their own websites, we act as a **processor** and the customer acts as the controller. A Data Processing Agreement (DPA) governing this processing is available upon request at florian.michel@poliris.io.

## 5. Retention

- Account and Service data: retained for the duration of your contract, then deleted within **90 days** of termination. Backups are purged within a further **30 days**.
- **WordPress Application Passwords: deleted immediately** when you disconnect the site from the Poliris dashboard, revoke the Application Password in WordPress, or deactivate the Plugin.
- Billing records: retained for **10 years** as required by French commercial and tax law.
- Contact-form inquiries that do not lead to a contract: deleted within **24 months**.

## 6. Security

All data in transit is encrypted over HTTPS/TLS. WordPress Application Passwords are stored **encrypted at rest**. Access to production systems is restricted to authorized personnel on a need-to-know basis.

## 7. Your rights

If you are located in the EEA or the United Kingdom, you have the right to access, rectify, erase, and port your personal data, to restrict or object to its processing, and to withdraw consent where processing is based on consent. You may also lodge a complaint with your supervisory authority; in France, this is the **CNIL** (www.cnil.fr).

If you are a California resident, you have equivalent rights under the CCPA/CPRA, including the right to know, delete, and correct your personal information, and the right to non-discrimination. We do not sell or share personal information within the meaning of the CCPA.

To exercise any of these rights, contact **florian.michel@poliris.io**. We respond within one month (GDPR) or 45 days (CCPA).

You can withdraw the Plugin's access to your WordPress site at any time, without contacting us, by revoking the "Poliris Connector" Application Password in your WordPress user profile, disconnecting the site in the Poliris dashboard, or deactivating the Plugin.

## 8. Cookies

The Website uses only cookies that are strictly necessary for it to function (e.g. session and security cookies). If we introduce analytics or marketing cookies in the future, we will request your prior consent through a consent banner and update this policy. **The WordPress Plugin does not set any cookies on your website.**

## 9. Children

The Service is a business tool and is not directed at anyone under 18. We do not knowingly collect data from minors.

## 10. Changes to this policy

We may update this policy from time to time. The "Last updated" date at the top reflects the latest version. Material changes will be notified to account holders by email or through the Service.

## 11. Contact

**FCFD (Poliris)**\
12 rue Saint-Blaise, 57460 Behren-lès-Forbach, France\
Privacy: florian.michel@poliris.io\
Legal: florian.michel@fcfd.fr
