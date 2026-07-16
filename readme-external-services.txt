== External Services ==

This plugin connects your WordPress site to the Poliris platform (https://poliris.io), a SaaS service for SEO and Generative Engine Optimization (GEO). The plugin requires an active Poliris account and does nothing until you explicitly connect ("pair") your site.

**Service Used:** Poliris, operated by FCFD (https://app.poliris.io)

**Purpose:** The plugin lets Poliris apply the SEO/GEO fixes and content that you review and approve in your Poliris dashboard to your WordPress site.

**Data Sent:**

1. When the site administrator manually pairs the site (by pasting a pairing code and clicking "Connect"), the plugin sends to app.poliris.io over HTTPS: a WordPress Application Password (a native, revocable WordPress credential created for the pairing administrator), the pairing code, the site URL, the administrator's WordPress username, the WordPress version, the plugin version, and the name of the active SEO plugin (e.g. Yoast SEO or Rank Math), if any.

2. On front-end page views of a paired site (GET/HEAD requests only; admin, REST, cron, feeds, and AJAX requests are excluded), the plugin makes server-to-server requests to app.poliris.io to (a) fetch the list of currently approved fixes for the site (cached for 60 seconds) and (b) send a connection-status "heartbeat". These requests contain only an opaque per-site identifier and a timestamp.

**Data NOT Sent:** No personal data of your website's visitors is ever collected or transmitted: no IP addresses, no cookies, no analytics, no browsing behavior, no customer or e-commerce data. The plugin sets no cookies and sends no usage telemetry.

**When Data is Sent:** Data is sent only (a) when the administrator actively pairs the site, (b) when the site owner approves a change in the Poliris dashboard (the approved change is then written to the site via the WordPress REST API), and (c) during front-end page rendering of a paired site, for the fix-list and heartbeat requests described above.

**Output Modification:** On paired sites, the plugin rewrites the HTML of front-end pages before it is sent to the visitor, in order to apply only the fixes you approved (e.g. corrected title, meta description, canonical tag, structured data, or targeted element edits). If the Poliris servers are unreachable or an error occurs, the original HTML is served unmodified.

**Revoking Access:** You can withdraw Poliris's access at any time by revoking the "Poliris Connector" Application Password in your WordPress user profile, disconnecting the site in the Poliris dashboard, or deactivating the plugin. Upon disconnection, the Application Password stored by Poliris is deleted.

**Privacy & Terms:**

* Privacy Policy: https://poliris.io/privacy
* Terms of Service: https://poliris.io/terms
