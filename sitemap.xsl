<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap - The Webpage Builder</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #0056b3; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                    p { font-size: 14px; color: #666; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; font-size: 14px; }
                    th { background-color: #f8f9fa; color: #333; font-weight: 600; }
                    tr:hover { background-color: #f1f1f1; }
                    a { color: #0056b3; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>XML Sitemap</h1>
                <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs. It is generated to help search engines like Google discover the pages on your site.</p>
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Last Modified</th>
                            <th>Priority</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sitemap:urlset/sitemap:url">
                            <tr>
                                <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                                <td><xsl:value-of select="sitemap:lastmod"/></td>
                                <td><xsl:value-of select="sitemap:priority"/></td>
                                <td><xsl:value-of select="sitemap:changefreq"/></td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
