/* ============================================================================
   Start a new research post.

     npm run new -- "Why skew steepens into earnings"
     npm run new -- "Fed path and the 2s10s" --pillar macro

   With no --pillar, it picks the next pillar in the weekly rotation after the
   most recent post. Dates default to the coming Monday.
   ============================================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS = path.join(ROOT, "_research", "posts");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "_research", "config.json"), "utf8"));

const args = process.argv.slice(2);
const pIdx = args.indexOf("--pillar");
let pillar = pIdx >= 0 ? args.splice(pIdx, 2)[1] : null;
const title = args.join(" ").trim();
if (!title) { console.error('Give it a title:  npm run new -- "Your headline"'); process.exit(1); }

const existing = fs.readdirSync(POSTS).filter(d => !d.startsWith("_") && fs.existsSync(path.join(POSTS, d, "index.md")))
  .map(d => matter(fs.readFileSync(path.join(POSTS, d, "index.md"), "utf8")).data)
  .filter(d => d.date instanceof Date).sort((a, b) => b.date - a.date);

if (!pillar) {
  const last = existing[0]?.pillar;
  const r = config.rotation;
  pillar = last ? r[(r.indexOf(last) + 1) % r.length] : r[0];
}
if (!config.pillars.some(p => p.slug === pillar)) {
  console.error(`Unknown pillar "${pillar}". Use one of: ${config.pillars.map(p => p.slug).join(", ")}`); process.exit(1);
}

const d = new Date(); d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
const date = d.toISOString().slice(0, 10);
const slug = title.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const dir = path.join(POSTS, `${date}-${slug}`);
if (fs.existsSync(dir)) { console.error(`Already exists: ${dir}`); process.exit(1); }

const tpl = fs.readFileSync(path.join(POSTS, "_template", "index.md"), "utf8")
  .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
  .replace(/^date: .*$/m, `date: ${date}`)
  .replace(/^pillar: .*$/m, `pillar: ${pillar}`)
  .replace(/^author: .*$/m, `author: ${config.defaultAuthor}`);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "index.md"), tpl);
console.log(`Created _research/posts/${date}-${slug}/index.md  (pillar: ${pillar}, draft)`);
