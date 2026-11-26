<?xml version="1.0" encoding="UTF-8"?>
<!--
  Human-readable view of poliris.io's sitemaps. Browsers apply this
  stylesheet (linked from each sitemap by <?xml-stylesheet?>); search engines
  ignore it and read the raw XML. Without it, Chrome shows the per-language
  sitemaps as run-together text, because they contain xhtml:link (hreflang)
  elements.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="s xhtml image">

  <xsl:output method="html" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">Sitemap index | Poliris</xsl:when>
            <xsl:otherwise>Sitemap | Poliris</xsl:otherwise>
          </xsl:choose>
        </title>
        <style>
          body { margin: 0; font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #1a1a1a; background: #fafbfd; }
          main { max-width: 1200px; margin: 0 auto; padding: 32px 24px 64px; }
          h1 { margin: 0 0 6px; font-size: 24px; }
          p.lead { margin: 0 0 24px; color: #555; }
          table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e9ebf1; }
          th, td { padding: 10px 12px; text-align: left; vertical-align: top; border-bottom: 1px solid #e9ebf1; }
          th { background: #f3f5f9; font-size: 12px; text-transform: uppercase; letter-spacing: .03em; color: #555; }
          tr:last-child td { border-bottom: 0; }
          td.n { white-space: nowrap; color: #555; }
          a { color: #1e3893; word-break: break-all; }
          .alts { margin-top: 4px; font-size: 12px; color: #666; }
          .alts code { background: #f3f5f9; padding: 0 4px; border-radius: 3px; }
        </style>
      </head>
      <body>
        <main>
          <xsl:apply-templates/>
        </main>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap index: one row per child sitemap. -->
  <xsl:template match="s:sitemapindex">
    <h1>Sitemap index</h1>
    <p class="lead">
      <xsl:value-of select="count(s:sitemap)"/> sitemaps, one per language.
      This page is for people; search engines read the raw XML.
    </p>
    <table>
      <thead><tr><th>Sitemap</th><th>Last modified</th></tr></thead>
      <tbody>
        <xsl:for-each select="s:sitemap">
          <tr>
            <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
            <td class="n"><xsl:value-of select="s:lastmod"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- URL set: one row per page, with its language/market alternates. -->
  <xsl:template match="s:urlset">
    <h1>Sitemap</h1>
    <p class="lead">
      <xsl:value-of select="count(s:url)"/> pages,
      <xsl:value-of select="count(s:url/image:image)"/> images.
      <a href="/sitemap.xml">Back to the sitemap index</a>.
    </p>
    <table>
      <thead>
        <tr><th>Page</th><th>Last modified</th><th>Change freq.</th><th>Priority</th><th>Images</th></tr>
      </thead>
      <tbody>
        <xsl:for-each select="s:url">
          <tr>
            <td>
              <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
              <xsl:if test="xhtml:link">
                <div class="alts">
                  <xsl:value-of select="count(xhtml:link)"/> hreflang:
                  <xsl:for-each select="xhtml:link">
                    <code><xsl:value-of select="@hreflang"/></code>
                    <xsl:if test="position() != last()"><xsl:text> </xsl:text></xsl:if>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </td>
            <td class="n"><xsl:value-of select="s:lastmod"/></td>
            <td class="n"><xsl:value-of select="s:changefreq"/></td>
            <td class="n"><xsl:value-of select="s:priority"/></td>
            <td class="n"><xsl:value-of select="count(image:image)"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
