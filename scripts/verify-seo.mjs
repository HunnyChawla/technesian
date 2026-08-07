/*
 * Asserts the SEO invariants against the real build output in out/.
 *
 * For a statically exported site the emitted HTML *is* what Google sees, so
 * this is ground truth rather than a proxy. Run after `npm run build`:
 *
 *   npm run verify:seo
 *
 * Exits non-zero on failure, so it can gate the deploy workflow.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const ORIGIN = "https://technesian.com";

// Every page that should be indexable, and what makes it unique.
const PAGES = [
  { file: "index.html", canonical: ORIGIN, mustContain: ["Run the whole hospital"] },
  {
    file: "pricing.html",
    canonical: `${ORIGIN}/pricing`,
    // These live inside collapsed accordion panels. They were absent from the
    // HTML entirely until PricingFaq set `hiddenUntilFound`; if that prop is
    // ever dropped, ~1,200 words silently vanish from the index and the
    // FAQPage schema starts describing content that isn't on the page.
    mustContain: [
      "billed at actual usage",
      "twelve monthly payments",
      "role permissions",
      "self-service import template",
    ],
  },
];

let failed = 0;
let passed = 0;

const ok = (msg) => {
  passed++;
  console.log(`  [32m✓[0m ${msg}`);
};
const bad = (msg, detail) => {
  failed++;
  console.log(`  [31m✗[0m ${msg}`);
  if (detail) console.log(`      ${detail}`);
};
const check = (cond, msg, detail) => (cond ? ok(msg) : bad(msg, detail));

const read = (p) => readFileSync(join(OUT, p), "utf8");
const count = (h, re) => (h.match(re) || []).length;

console.log(`\nVerifying SEO in ${OUT}/\n`);

if (!existsSync(OUT)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

/* ---------- crawl directives ---------- */
console.log("robots + sitemap");
{
  const hasRobots = existsSync(join(OUT, "robots.txt"));
  check(hasRobots, "robots.txt emitted");

  if (hasRobots) {
    const robots = read("robots.txt");
    check(
      robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`),
      "robots.txt points at the sitemap"
    );
    check(
      !/^Disallow: \/\s*$/m.test(robots),
      "robots.txt does not disallow the whole site",
      "a blanket Disallow: / would deindex everything"
    );
  }

  const hasSitemap = existsSync(join(OUT, "sitemap.xml"));
  check(hasSitemap, "sitemap.xml emitted");

  if (hasSitemap) {
    const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1]
    );
    check(locs.length > 0, `sitemap lists ${locs.length} URL(s)`);
    check(
      locs.every((u) => u.startsWith(ORIGIN)),
      "every sitemap URL is absolute and on the canonical origin"
    );
    check(
      locs.every((u) => !u.endsWith("/") || u === ORIGIN),
      "no trailing slashes (they would not match the canonical tags)"
    );

    // A sitemap advertising a URL that 404s is worse than omitting it.
    for (const loc of locs) {
      const path = loc.replace(ORIGIN, "");
      const file = path === "" || path === "/" ? "index.html" : `${path.slice(1)}.html`;
      check(existsSync(join(OUT, file)), `sitemap URL resolves to a built page: ${loc}`);
    }
  }
}

/* ---------- per-page metadata ---------- */
for (const page of PAGES) {
  console.log(`\n${page.file}`);
  if (!existsSync(join(OUT, page.file))) {
    bad(`${page.file} missing`);
    continue;
  }
  const html = read(page.file);

  check(count(html, /<h1[\s>]/g) === 1, "exactly one <h1>", `found ${count(html, /<h1[\s>]/g)}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  check(count(html, /rel="canonical"/g) === 1, "exactly one canonical tag");
  check(canonical?.[1] === page.canonical, `canonical is ${page.canonical}`, `got ${canonical?.[1]}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  check(title.length > 0 && title.length <= 65, `<title> present and ≤65 chars (${title.length})`, title);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  check(desc.length >= 70 && desc.length <= 158, `meta description within SERP limit (${desc.length}/158)`);

  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  check(!!ogImage, "og:image present");
  check(ogImage?.startsWith("http"), "og:image is an absolute URL", ogImage);
  // Social crawlers reject anything not served as an image/* type, and GitHub
  // Pages derives Content-Type purely from the file extension.
  check(/\.(png|jpg|jpeg|webp)$/.test(ogImage ?? ""), "og:image has an image extension", ogImage);
  if (ogImage?.startsWith(ORIGIN)) {
    check(existsSync(join(OUT, ogImage.replace(ORIGIN, ""))), "og:image file actually shipped");
  }

  for (const tag of ["og:title", "og:type", "og:site_name", "og:url"]) {
    check(html.includes(`property="${tag}"`), `${tag} present`);
  }
  check(html.includes('name="twitter:image"'), "twitter:image present");

  check(/<html lang="en-IN"/.test(html), 'lang="en-IN"');

  // The LCP element must be painted. framer-motion server-renders opacity:0,
  // which stops LCP counting until hydration completes.
  const h1 = html.match(/<h1[^>]*>/)?.[0] ?? "";
  check(!/opacity:\s*0/.test(h1), "<h1> is not server-rendered at opacity:0", h1.slice(0, 120));

  check(
    !/<link rel="preload"[^>]*as="image"/.test(html),
    "no image preload competing with CSS/fonts for LCP"
  );

  for (const needle of page.mustContain) {
    check(html.includes(needle), `content present: "${needle}"`);
  }

  // Heading levels must not skip (h1 -> h3), which breaks the outline.
  const levels = [...html.matchAll(/<(h[1-4])[\s>]/g)].map((m) => Number(m[1][1]));
  let skip = null;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) skip = `h${levels[i - 1]} → h${levels[i]}`;
  }
  check(!skip, "no skipped heading levels", skip ?? "");

  /* ---------- structured data ---------- */
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    ),
  ].map((m) => m[1]);
  check(blocks.length > 0, `${blocks.length} JSON-LD block(s)`);

  const types = [];
  for (const raw of blocks) {
    try {
      const parsed = JSON.parse(raw);
      for (const node of [parsed].flat()) {
        types.push(node["@type"]);
        check(!!node["@context"], `JSON-LD ${node["@type"]} declares @context`);
      }
    } catch (e) {
      bad("JSON-LD is valid JSON", String(e).slice(0, 120));
    }
  }
  const expected =
    page.file === "index.html"
      ? ["Organization", "WebSite", "SoftwareApplication"]
      : ["Organization", "WebSite", "Product", "FAQPage", "BreadcrumbList"];
  for (const t of expected) {
    check(types.includes(t), `${t} schema present`);
  }
}

/* ---------- prices must match the page ---------- */
console.log("\nstructured data vs visible content");
{
  const html = read("pricing.html");
  const offers = [
    ...html.matchAll(/"@type":"UnitPriceSpecification","price":(\d+)/g),
  ].map((m) => m[1]);
  check(offers.length > 0, `${offers.length} price(s) in Offer schema`);
  // A price in the markup that is not on the page is the exact mismatch that
  // earns a "Spam structured markup" manual action.
  const missing = offers.filter((p) => {
    const withSeparators = Number(p).toLocaleString("en-IN");
    return !html.includes(p) && !html.includes(withSeparators);
  });
  check(missing.length === 0, "every marked-up price appears in the visible page", missing.join(", "));
}

/* ---------- supporting files ---------- */
console.log("\nsupporting files");
for (const f of ["404.html", "manifest.webmanifest", "og.png", "icon.png", "apple-icon.png"]) {
  check(existsSync(join(OUT, f)), `${f} emitted`);
}
{
  // Anything preloaded or on the critical path should be small.
  const heavy = readdirSync(OUT)
    .filter((f) => /\.(png|jpg|jpeg)$/.test(f))
    .map((f) => [f, readFileSync(join(OUT, f)).length])
    .filter(([, size]) => size > 120_000);
  check(
    heavy.length === 0,
    "no oversized images in the site root",
    heavy.map(([f, s]) => `${f} ${Math.round(s / 1024)}KB`).join(", ")
  );
}

console.log(
  `\n${passed} passed, ${failed} failed\n`
);
process.exit(failed > 0 ? 1 : 0);
