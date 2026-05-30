// Generates sitemap.xml from data files for static export SEO
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://overseas-pathways.vercel.app";

// Read all country and pathway slugs from data files
const countryDir = resolve(ROOT, "data", "countries");
const pathwayDir = resolve(ROOT, "data", "pathways");

const countrySlugs = readdirSync(countryDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(".json", ""));

const pathwaySlugs = readdirSync(pathwayDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(".json", ""));

const staticPages = ["", "about", "countries", "glossary", "pathways"];

const urls = [];

// Static pages
for (const page of staticPages) {
  urls.push({
    loc: `${BASE_URL}/${page}`,
    lastmod: "2026-05-29",
    changefreq: page === "" ? "weekly" : "monthly",
    priority: page === "" ? "1.0" : "0.8",
  });
}

// Country pages
for (const slug of countrySlugs) {
  urls.push({
    loc: `${BASE_URL}/countries/${slug}/`,
    lastmod: "2026-05-29",
    changefreq: "monthly",
    priority: "0.7",
  });
}

// Pathway pages
for (const slug of pathwaySlugs) {
  urls.push({
    loc: `${BASE_URL}/pathways/${slug}/`,
    lastmod: "2026-05-29",
    changefreq: "monthly",
    priority: "0.9",
  });
}

// Build XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const outPath = resolve(ROOT, "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`✅ sitemap.xml generated with ${urls.length} URLs`);
