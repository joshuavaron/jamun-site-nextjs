#!/usr/bin/env npx tsx

/**
 * Website Crawler for Sitemap Verification
 *
 * Crawls https://jamun.org recursively to discover all pages
 * and compares them against the existing sitemap.
 *
 * Usage: npx tsx scripts/crawl-sitemap.ts
 */

const BASE_URL = "https://jamun.org";
const MAX_CONCURRENT = 5;
const TIMEOUT_MS = 10000;

// URLs to skip (external links, assets, etc.)
const SKIP_PATTERNS = [
  /^mailto:/,
  /^tel:/,
  /^#/,
  /\.(pdf|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/i,
  /^https?:\/\/(?!jamun\.org)/,  // External domains
];

// Known sitemap URL
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

interface CrawlResult {
  discoveredUrls: Set<string>;
  sitemapUrls: Set<string>;
  missingFromSitemap: string[];
  extraInSitemap: string[];
  errors: Map<string, string>;
}

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'JAMUN-Sitemap-Crawler/1.0'
      }
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeUrl(url: string, baseUrl: string): string | null {
  try {
    // Handle relative URLs
    const fullUrl = new URL(url, baseUrl);

    // Only process jamun.org URLs
    if (fullUrl.hostname !== "jamun.org") {
      return null;
    }

    // Remove trailing slash (except for root)
    let pathname = fullUrl.pathname;
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Remove hash and query params
    return `${fullUrl.protocol}//${fullUrl.hostname}${pathname}`;
  } catch {
    return null;
  }
}

function shouldSkipUrl(url: string): boolean {
  return SKIP_PATTERNS.some(pattern => pattern.test(url));
}

function extractLinks(html: string, pageUrl: string): string[] {
  const links: string[] = [];

  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];

    if (shouldSkipUrl(href)) {
      continue;
    }

    const normalizedUrl = normalizeUrl(href, pageUrl);
    if (normalizedUrl) {
      links.push(normalizedUrl);
    }
  }

  return links;
}

async function fetchSitemap(): Promise<Set<string>> {
  const urls = new Set<string>();

  try {
    console.log(`\nFetching sitemap from ${SITEMAP_URL}...`);
    const response = await fetchWithTimeout(SITEMAP_URL, TIMEOUT_MS);
    const xml = await response.text();

    // Extract URLs from sitemap XML
    const locRegex = /<loc>([^<]+)<\/loc>/gi;
    let match;

    while ((match = locRegex.exec(xml)) !== null) {
      let url = match[1].trim();
      // Normalize: remove trailing slash except for root
      if (url !== BASE_URL && url !== `${BASE_URL}/` && url.endsWith("/")) {
        url = url.slice(0, -1);
      }
      if (url === `${BASE_URL}/`) {
        url = BASE_URL;
      }
      urls.add(url);
    }

    console.log(`Found ${urls.size} URLs in sitemap`);
  } catch (error) {
    console.error(`Error fetching sitemap: ${error}`);
  }

  return urls;
}

async function crawlPage(
  url: string,
  visited: Set<string>,
  toVisit: Set<string>,
  errors: Map<string, string>
): Promise<string[]> {
  if (visited.has(url)) {
    return [];
  }

  visited.add(url);

  try {
    const response = await fetchWithTimeout(url, TIMEOUT_MS);

    if (!response.ok) {
      errors.set(url, `HTTP ${response.status}`);
      return [];
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return [];
    }

    const html = await response.text();
    const links = extractLinks(html, url);

    // Add new links to toVisit queue
    for (const link of links) {
      if (!visited.has(link) && !toVisit.has(link)) {
        toVisit.add(link);
      }
    }

    return links;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.set(url, message);
    return [];
  }
}

async function crawlSite(): Promise<CrawlResult> {
  const visited = new Set<string>();
  const toVisit = new Set<string>([BASE_URL]);
  const errors = new Map<string, string>();

  console.log(`\nStarting crawl from ${BASE_URL}...`);
  console.log(`Max concurrent requests: ${MAX_CONCURRENT}`);
  console.log("");

  let processed = 0;

  while (toVisit.size > 0) {
    // Get batch of URLs to process
    const batch: string[] = [];
    const iterator = toVisit.values();

    for (let i = 0; i < MAX_CONCURRENT && toVisit.size > 0; i++) {
      const next = iterator.next();
      if (!next.done) {
        batch.push(next.value);
        toVisit.delete(next.value);
      }
    }

    // Process batch concurrently
    await Promise.all(
      batch.map(url => crawlPage(url, visited, toVisit, errors))
    );

    processed += batch.length;
    process.stdout.write(`\rCrawled: ${processed} pages, Queue: ${toVisit.size}    `);
  }

  console.log(`\n\nCrawl complete! Discovered ${visited.size} pages`);

  // Fetch and compare with sitemap
  const sitemapUrls = await fetchSitemap();

  // Find differences
  const missingFromSitemap = [...visited].filter(url => !sitemapUrls.has(url)).sort();
  const extraInSitemap = [...sitemapUrls].filter(url => !visited.has(url)).sort();

  return {
    discoveredUrls: visited,
    sitemapUrls,
    missingFromSitemap,
    extraInSitemap,
    errors,
  };
}

function printResults(result: CrawlResult): void {
  console.log("\n" + "=".repeat(60));
  console.log("SITEMAP VERIFICATION RESULTS");
  console.log("=".repeat(60));

  console.log(`\nTotal pages discovered by crawler: ${result.discoveredUrls.size}`);
  console.log(`Total URLs in sitemap: ${result.sitemapUrls.size}`);

  if (result.missingFromSitemap.length > 0) {
    console.log(`\n${"⚠️ "} MISSING FROM SITEMAP (${result.missingFromSitemap.length} URLs):`);
    console.log("-".repeat(50));
    for (const url of result.missingFromSitemap) {
      console.log(`  ${url}`);
    }
  } else {
    console.log("\n✅ All discovered pages are in the sitemap!");
  }

  if (result.extraInSitemap.length > 0) {
    console.log(`\n${"⚠️ "} IN SITEMAP BUT NOT CRAWLABLE (${result.extraInSitemap.length} URLs):`);
    console.log("-".repeat(50));
    console.log("(These might be valid if they're not linked from other pages)");
    for (const url of result.extraInSitemap) {
      console.log(`  ${url}`);
    }
  }

  if (result.errors.size > 0) {
    console.log(`\n${"❌"} ERRORS ENCOUNTERED (${result.errors.size}):`);
    console.log("-".repeat(50));
    for (const [url, error] of result.errors) {
      console.log(`  ${url}`);
      console.log(`    Error: ${error}`);
    }
  }

  // Group by locale/section for easier analysis
  console.log("\n" + "=".repeat(60));
  console.log("DISCOVERED URLS BY SECTION");
  console.log("=".repeat(60));

  const sections: Record<string, string[]> = {};
  for (const url of result.discoveredUrls) {
    const path = url.replace(BASE_URL, "") || "/";
    let section = "root";

    if (path.startsWith("/es/")) section = "es";
    else if (path.startsWith("/zh/")) section = "zh";
    else if (path.startsWith("/modelun/")) section = "modelun";
    else if (path.startsWith("/mocktrial/")) section = "mocktrial";
    else if (path.startsWith("/mathletes/")) section = "mathletes";
    else if (path.startsWith("/blog/")) section = "blog";
    else if (path === "/") section = "root";
    else section = "en-pages";

    if (!sections[section]) sections[section] = [];
    sections[section].push(path);
  }

  for (const [section, urls] of Object.entries(sections).sort()) {
    console.log(`\n${section} (${urls.length} pages):`);
    for (const url of urls.sort()) {
      console.log(`  ${url}`);
    }
  }

  // Save results to file
  const outputPath = "crawl-results.json";
  const output = {
    timestamp: new Date().toISOString(),
    stats: {
      discoveredCount: result.discoveredUrls.size,
      sitemapCount: result.sitemapUrls.size,
      missingCount: result.missingFromSitemap.length,
      extraCount: result.extraInSitemap.length,
      errorCount: result.errors.size,
    },
    discovered: [...result.discoveredUrls].sort(),
    sitemap: [...result.sitemapUrls].sort(),
    missingFromSitemap: result.missingFromSitemap,
    extraInSitemap: result.extraInSitemap,
    errors: Object.fromEntries(result.errors),
  };

  require("fs").writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n📄 Full results saved to ${outputPath}`);
}

// Main execution
async function main() {
  console.log("🔍 JAMUN Website Sitemap Crawler");
  console.log("=".repeat(60));

  try {
    const result = await crawlSite();
    printResults(result);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
