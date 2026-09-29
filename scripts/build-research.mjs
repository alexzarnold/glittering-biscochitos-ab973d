/* ============================================================================
   ORCA RESEARCH BUILD
   ----------------------------------------------------------------------------
   Turns every post in _research/posts/ into a real HTML page under research/.
   Netlify runs this on every push (see netlify.toml). You should not need to
   edit it. To write a post, see section 12 of README.md.

   What it produces:
     research/index.html              All research, newest first
     research/<pillar>/index.html     One page per pillar
     research/<post-slug>/index.html  One page per post (+ its images)
     research/feed.xml                RSS feed
     research/sitemap.xml             For search engines

   The header and footer are copied from resources.html at build time, so the
   research pages can never drift out of sync with the rest of the site.

   Flags:  --drafts   also build posts marked draft: true (local preview only)
   ============================================================================ */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { Marked } from "marked";
import markedKatex from "marked-katex-extension";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "_research", "posts");
const OUT = path.join(ROOT, "research");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "_research", "config.json"), "utf8"));
const INCLUDE_DRAFTS = process.argv.includes("--drafts");
const SITE = config.siteUrl.replace(/\/$/, "");
const PILLARS = Object.fromEntries(config.pillars.map(p => [p.slug, p]));
// KaTeX styles and fonts are copied into research/katex/ so math never depends on a CDN.
const KATEX_DIST = path.join(ROOT, "node_modules", "katex", "dist");

const errors = [];
const fail = (where, msg) => errors.push(`  ${where}: ${msg}`);

// ---------------------------------------------------------------------------
// Markdown: GitHub-style Markdown plus $inline$ and $$display$$ math.
// ---------------------------------------------------------------------------
const md = new Marked({ gfm: true });
md.use(markedKatex({ throwOnError: false, nonStandard: true }));
md.use({
  renderer: {
    // Images become captioned figures. The caption is the image's title text:
    // ![alt text](chart.png "Figure 1. VIX term structure, Sep 25 close.")
    image({ href, title, text }) {
      const cap = title ? `<figcaption>${esc(title)}</figcaption>` : "";
      return `<figure class="post-figure"><img src="${href}" alt="${esc(text)}" loading="lazy">${cap}</figure>`;
    }
  }
});

function esc(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const fmtDate = d => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const isoDate = d => d.toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Page shell, lifted from resources.html so nav and footer stay identical.
// ---------------------------------------------------------------------------
const shellSrc = fs.readFileSync(path.join(ROOT, "resources.html"), "utf8");
const headStart = shellSrc.indexOf("<a class=\"skip-link\"");
const mainStart = shellSrc.indexOf("<main id=\"main\">");
const mainEnd = shellSrc.indexOf("</main>") + "</main>".length;
if (headStart < 0 || mainStart < 0 || mainEnd < 7) throw new Error("resources.html no longer has the expected <main> layout.");
let chromeTop = shellSrc.slice(headStart, mainStart)
  .replace(/ aria-current="page"/g, "")
  .replace(/<a href="research\/index.html">/, '<a href="research/index.html" aria-current="page">');
const chromeBottom = shellSrc.slice(mainEnd).replace(/<\/html>\s*$/, "</html>\n");

// Pages live one or two folders deep, so relative links need a prefix.
function relink(html, prefix) {
  return html.replace(/(href|src)="(?!https?:|mailto:|tel:|#|\/|data:)([^"]*)"/g, (_, a, u) => `${a}="${prefix}${u}"`);
}

function page({ depth, title, description, canonical, ogType = "website", extraHead = "", body }) {
  const prefix = "../".repeat(depth);
  const url = `${SITE}/${canonical}`;
  const head = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | ORCA at CU Boulder</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="ORCA at CU Boulder">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/assets/og-image.png">
<link rel="canonical" href="${url}">
<link rel="alternate" type="application/rss+xml" title="ORCA Research" href="${prefix}research/feed.xml">
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="${prefix}assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="${prefix}assets/favicon-180.png">
<meta name="theme-color" content="#141414">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap">
<link rel="stylesheet" href="${prefix}styles.css">
${extraHead}<script>document.documentElement.className += " js";</script>
</head>
<body>

`;
  return head + relink(chromeTop, prefix) + body + relink(chromeBottom, prefix);
}

const FIN = shellSrc.match(/<svg class="fin-watermark"[\s\S]*?<\/svg>/)[0];
const pageHead = (label, h1, sub) => `<main id="main">

<section class="page-head">
  ${FIN}
  <div class="wrap page-head__inner">
    <p class="label">${label}</p>
    <h1 class="h1">${h1}</h1>
    ${sub ? `<p>${sub}</p>` : ""}
  </div>
</section>
`;

// ---------------------------------------------------------------------------
// Read posts. Each post is a folder: _research/posts/<slug>/index.md plus any
// images it uses. Folders starting with "_" are ignored (the template lives
// there).
// ---------------------------------------------------------------------------
const posts = [];
for (const dir of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name.startsWith("_")) continue;
  const folder = path.join(SRC, dir.name);
  const file = path.join(folder, "index.md");
  if (!fs.existsSync(file)) { fail(dir.name, "missing index.md"); continue; }
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const where = `_research/posts/${dir.name}/index.md`;

  if (!data.title) fail(where, "needs a title");
  if (!data.summary) fail(where, "needs a summary (one or two sentences, shown on cards and link previews)");
  if (!(data.date instanceof Date)) fail(where, "date must look like 2026-09-28 with no quotes");
  if (!PILLARS[data.pillar]) fail(where, `pillar must be one of: ${Object.keys(PILLARS).join(", ")}`);
  if (data.draft && !INCLUDE_DRAFTS) continue;

  const slug = dir.name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const words = content.split(/\s+/).filter(Boolean).length;
  posts.push({
    ...data,
    slug, folder,
    authors: [].concat(data.author || config.defaultAuthor),
    minutes: Math.max(1, Math.round(words / 230)),
    html: md.parse(content),
    usesMath: /\$[^$]+\$/.test(content)
  });
}

if (errors.length) {
  console.error("\nResearch build stopped. Fix these and push again:\n" + errors.join("\n") + "\n");
  process.exit(1);
}
const slugs = posts.map(p => p.slug);
const dupe = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (dupe) { console.error(`Two posts share the slug "${dupe}". Rename one folder.`); process.exit(1); }

posts.sort((a, b) => b.date - a.date || a.title.localeCompare(b.title));

// ---------------------------------------------------------------------------
// Write everything
// ---------------------------------------------------------------------------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const write = (rel, s) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };

const byline = p => p.authors.map(esc).join(" and ");
const meta = p => `<time datetime="${isoDate(p.date)}">${fmtDate(p.date)}</time> &middot; ${byline(p)} &middot; ${p.minutes} min read`;
const pillarChip = (p, prefix) => `<a class="chip chip--pillar" href="${prefix}${p.pillar}/index.html">${esc(PILLARS[p.pillar].name)}</a>`;

function card(p, prefix) {
  return `<li class="post-card">
  <p class="post-card__meta">${pillarChip(p, prefix)}${p.draft ? ' <span class="chip">Draft</span>' : ""}</p>
  <h2 class="post-card__title"><a href="${prefix}${p.slug}/index.html">${esc(p.title)}</a></h2>
  <p class="post-card__summary">${esc(p.summary)}</p>
  <p class="post-card__byline">${meta(p)}</p>
</li>`;
}

function pillarNav(active, prefix) {
  const items = [`<a class="chip${active ? "" : " is-active"}" href="${prefix}index.html"${active ? "" : ' aria-current="page"'}>All</a>`]
    .concat(config.pillars.map(pl => `<a class="chip${active === pl.slug ? " is-active" : ""}" href="${prefix}${pl.slug}/index.html"${active === pl.slug ? ' aria-current="page"' : ""}>${esc(pl.name)}</a>`));
  return `<nav class="pillar-nav" aria-label="Research topics">${items.join("")}</nav>`;
}

function listing(list, active, prefix) {
  const body = list.length
    ? `<ul class="post-list">${list.map(p => card(p, prefix)).join("\n")}</ul>`
    : `<p class="text-muted">Nothing published here yet. The first piece is on the way.</p>`;
  return `<section class="section section--tight">
  <div class="wrap wrap--narrow">
    ${pillarNav(active, prefix)}
    ${body}
  </div>
</section>
</main>
`;
}

// Index
write("index.html", page({
  depth: 1, title: "Research", canonical: "research/index.html",
  description: "Weekly research from ORCA on options strategies, volatility and rates, market structure, and macro themes.",
  body: pageHead("Research", "Research", "A new piece every week, rotating through options strategies, volatility and rates, market structure, and macro. Educational only, never investment advice.") + listing(posts, null, "")
}));

// Pillar pages
for (const pl of config.pillars) {
  write(`${pl.slug}/index.html`, page({
    depth: 2, title: `${pl.name} | Research`, canonical: `research/${pl.slug}/index.html`,
    description: pl.blurb,
    body: pageHead("Research", esc(pl.name), esc(pl.blurb)) + listing(posts.filter(p => p.pillar === pl.slug), pl.slug, "../")
  }));
}

// Posts
posts.forEach((p, i) => {
  const newer = posts[i - 1], older = posts[i + 1];
  const pager = (newer || older) ? `<nav class="post-pager" aria-label="More research">
      ${older ? `<a href="../${older.slug}/index.html"><span>Previous</span>${esc(older.title)}</a>` : "<span></span>"}
      ${newer ? `<a class="next" href="../${newer.slug}/index.html"><span>Next</span>${esc(newer.title)}</a>` : ""}
    </nav>` : "";
  const body = `<main id="main">

<article>
<header class="page-head post-head">
  ${FIN}
  <div class="wrap wrap--narrow page-head__inner">
    <p class="label"><a href="../${p.pillar}/index.html">${esc(PILLARS[p.pillar].name)}</a></p>
    <h1 class="h1">${esc(p.title)}</h1>
    <p class="post-head__summary">${esc(p.summary)}</p>
    <p class="post-head__meta">${meta(p)}</p>
  </div>
</header>

<div class="section section--tight">
  <div class="wrap wrap--narrow">
    <div class="prose">
${p.html}
    </div>
    <aside class="post-disclaimer">
      <p><strong>Educational only.</strong> This is student research written for learning and discussion. It is not investment advice or a recommendation to buy or sell anything. ORCA does not manage money, and any trades described are simulated. Views are the author's own and do not represent the University of Colorado Boulder. See <a href="../../legal.html">Legal</a>.</p>
    </aside>
    ${pager}
    <p class="post-back"><a class="link" href="../index.html">All research</a></p>
  </div>
</div>
</article>
</main>
`;
  write(`${p.slug}/index.html`, page({
    depth: 2, title: p.title, description: p.summary, ogType: "article",
    canonical: `research/${p.slug}/index.html`,
    extraHead: (p.usesMath ? `<link rel="stylesheet" href="../katex/katex.min.css">\n` : "") +
      `<meta property="article:published_time" content="${isoDate(p.date)}">\n` +
      p.authors.map(a => `<meta name="author" content="${esc(a)}">\n`).join(""),
    body
  }));
  // Copy the post's images and other files next to its page
  for (const f of fs.readdirSync(p.folder)) {
    if (f !== "index.md") fs.cpSync(path.join(p.folder, f), path.join(OUT, p.slug, f), { recursive: true });
  }
});

// Math styles and fonts
if (posts.some(p => p.usesMath)) {
  fs.mkdirSync(path.join(OUT, "katex"), { recursive: true });
  fs.copyFileSync(path.join(KATEX_DIST, "katex.min.css"), path.join(OUT, "katex", "katex.min.css"));
  fs.cpSync(path.join(KATEX_DIST, "fonts"), path.join(OUT, "katex", "fonts"), { recursive: true });
}

// RSS
const rssItems = posts.filter(p => !p.draft).slice(0, 30).map(p => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE}/research/${p.slug}/index.html</link>
    <guid>${SITE}/research/${p.slug}/index.html</guid>
    <pubDate>${p.date.toUTCString()}</pubDate>
    <category>${esc(PILLARS[p.pillar].name)}</category>
    <dc:creator>${byline(p)}</dc:creator>
    <description>${esc(p.summary)}</description>
  </item>`).join("\n");
write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>ORCA Research</title>
  <link>${SITE}/research/index.html</link>
  <description>Weekly research from the Options, Risk, and Capital Association at CU Boulder. Educational only.</description>
  <language>en-us</language>
${rssItems}
</channel>
</rss>
`);

// Sitemap
const urls = ["research/index.html", ...config.pillars.map(p => `research/${p.slug}/index.html`), ...posts.filter(p => !p.draft).map(p => `research/${p.slug}/index.html`)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}/${u}</loc></url>`).join("\n")}
</urlset>
`);

console.log(`Research built: ${posts.length} post${posts.length === 1 ? "" : "s"}${INCLUDE_DRAFTS ? " (drafts included, do not deploy this)" : ""}.`);
