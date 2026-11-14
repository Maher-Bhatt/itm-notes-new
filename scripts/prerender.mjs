/**
 * Prerender public pages to static HTML after `vite build`.
 *
 * For every public route (library, subject hubs, documents, info pages) this writes
 * dist/<route>.html with route-specific <title>, description, canonical, Open Graph tags,
 * JSON-LD and the full readable content inside #root. The React app replaces #root on load,
 * so visitors get the interactive reader while crawlers and link previews get real HTML.
 *
 * vercel.json sets `cleanUrls: true`, so /library/dsa is served from dist/library/dsa.html.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://itm-notes-new.vercel.app";

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const library = JSON.parse(fs.readFileSync(path.join(DIST, "reading", "index.json"), "utf8"));
const infoPages = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "content", "infoPages.json"), "utf8"));
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "content", "guides.json"), "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const minutes = (words) => Math.max(1, Math.round(words / 200));

function setMeta(html, { title, description, url, image }) {
  const replaceTag = (re, tag) => (re.test(html) ? (html = html.replace(re, tag)) : (html = html.replace("</head>", `    ${tag}\n  </head>`)));
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  replaceTag(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`);
  replaceTag(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  replaceTag(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  replaceTag(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`);
  replaceTag(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`);
  replaceTag(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`);
  replaceTag(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`);
  replaceTag(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  replaceTag(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  replaceTag(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);
  return html;
}

function withJsonLd(html, data) {
  return html.replace("</head>", `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n  </head>`);
}

function withBody(html, body) {
  return html.replace(/<div id="root">[\s\S]*<\/div>(\s*<\/body>)/, `<div id="root">${body}</div>$1`);
}

const shell = (inner) =>
  `<main style="max-width:46rem;margin:0 auto;padding:2.5rem 1.25rem;font-family:Georgia,serif;line-height:1.7;color:#201B16">${inner}</main>`;

const crumbs = (items) =>
  `<nav aria-label="Breadcrumb" style="font-family:system-ui,sans-serif;font-size:14px">${items
    .map(([label, href]) => (href ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`))
    .join(" › ")}</nav>`;

const breadcrumbLd = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${href ?? ""}` })),
});

function ogImageFor(subject, doc) {
  const rel = doc ? `og/${subject}/${doc}.png` : subject ? `og/${subject}.png` : "og-image.png";
  return fs.existsSync(path.join(DIST, rel)) ? `${SITE}/${rel}` : `${SITE}/og-image.png`;
}

function write(route, html) {
  const file = path.join(DIST, `${route.replace(/^\//, "")}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const renderMarkdown = (md) => renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, md));

let count = 0;

// ── Library index ────────────────────────────────────────────────────────────
{
  const route = "/library";
  const title = "Semester 3 Library: free B.Tech notes, study guides & slides | CampusLoop";
  const description = `Free Semester 3 B.Tech study material for ${library.map((s) => s.short).join(", ")}: complete study guides, lecture notes, slides and handwritten notes, readable online without sign-in.`;
  const body = shell(
    `${crumbs([["Home", "/"], ["Library"]])}<h1>Semester 3 Library</h1><p>${esc(description)}</p>` +
      library
        .map(
          (s) =>
            `<h2><a href="/library/${s.slug}">${esc(s.name)}</a></h2><ul>${s.docs
              .map((d) => `<li><a href="/library/${s.slug}/${d.slug}">${esc(d.title)}</a> (${esc(d.kind)})</li>`)
              .join("")}</ul>`
        )
        .join("")
  );
  let html = setMeta(template, { title, description, url: `${SITE}${route}`, image: ogImageFor() });
  html = withJsonLd(html, {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: "Semester 3 Library", url: `${SITE}${route}`, description, isAccessibleForFree: true },
      breadcrumbLd([["Home", "/"], ["Library", route]]),
    ],
  });
  write(route, withBody(html, body));
  count++;
}

// ── Subject hubs and documents ────────────────────────────────────────────────
for (const s of library) {
  const hub = `/library/${s.slug}`;
  const courseId = `${SITE}${hub}#course`;
  {
    const title = `${s.name} (${s.short}) Semester 3 notes, study guide & slides | CampusLoop`;
    const description = `Free ${s.short} Semester 3 study material: a complete study guide plus ${s.docs.length - 1} unit-wise lecture notes, slides, tutorials and papers for ${s.name}. Read online in a focused reader.`;
    const body = shell(
      `${crumbs([["Home", "/"], ["Library", "/library"], [s.short]])}<h1>${esc(s.name)}</h1><p>${esc(description)}</p><ul>${s.docs
        .map(
          (d) =>
            `<li><a href="${hub}/${d.slug}">${esc(d.title)}</a>: ${esc(d.kind)}${d.unit != null ? `, Unit ${d.unit}` : ""}${
              d.scanned ? "" : `, ${minutes(d.words)} min read`
            }</li>`
        )
        .join("")}</ul>`
    );
    let html = setMeta(template, { title, description, url: `${SITE}${hub}`, image: ogImageFor(s.slug) });
    html = withJsonLd(html, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": courseId,
          name: s.name,
          ...(s.code ? { courseCode: s.code } : {}),
          description,
          url: `${SITE}${hub}`,
          educationalLevel: "Undergraduate (B.Tech, Semester 3)",
          isAccessibleForFree: true,
          inLanguage: "en",
          provider: { "@type": "Organization", name: "CampusLoop", url: SITE },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10H" },
          offers: { "@type": "Offer", price: 0, priceCurrency: "INR", category: "Free" },
        },
        breadcrumbLd([["Home", "/"], ["Library", "/library"], [s.short, hub]]),
      ],
    });
    write(hub, withBody(html, body));
    count++;
  }

  for (const d of s.docs) {
    const route = `${hub}/${d.slug}`;
    const mdPath = path.join(DIST, "reading", s.slug, `${d.slug}.md`);
    if (!fs.existsSync(mdPath)) continue;
    const md = fs.readFileSync(mdPath, "utf8");
    const title = `${d.title} | ${s.short} Semester 3 ${d.kind} | CampusLoop`;
    const description =
      (d.summary || `${d.title}: ${d.kind.toLowerCase()} for ${s.name}${d.unit != null ? `, Unit ${d.unit}` : ""}, B.Tech Semester 3.`) +
      ` Free to read online${d.scanned ? "" : ` · ${minutes(d.words)} min read`}.`;
    const body = shell(
      `${crumbs([["Home", "/"], ["Library", "/library"], [s.short, hub], [d.title]])}<p style="font-family:system-ui,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:.08em">${esc(
        s.short
      )} · ${esc(d.kind)}${d.unit != null ? ` · Unit ${d.unit}` : ""}</p><h1>${esc(d.title)}</h1><article>${renderMarkdown(md)}</article>`
    );
    let html = setMeta(template, { title, description, url: `${SITE}${route}`, image: ogImageFor(s.slug, d.slug) });
    html = withJsonLd(html, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LearningResource",
          name: d.title,
          description,
          url: `${SITE}${route}`,
          image: ogImageFor(s.slug, d.slug),
          learningResourceType: d.kind,
          educationalLevel: "Undergraduate (B.Tech, Semester 3)",
          inLanguage: "en",
          isAccessibleForFree: true,
          ...(d.scanned ? {} : { timeRequired: `PT${minutes(d.words)}M`, wordCount: d.words }),
          isPartOf: { "@id": courseId, "@type": "Course", name: s.name },
          publisher: { "@type": "Organization", name: "CampusLoop", url: SITE },
        },
        breadcrumbLd([["Home", "/"], ["Library", "/library"], [s.short, hub], [d.title, route]]),
      ],
    });
    write(route, withBody(html, body));
    count++;
  }
}

// ── Exam plan ────────────────────────────────────────────────────────────────
{
  const examPlan = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "content", "examPlan.json"), "utf8"));
  const title = "Semester 3 finals revision plan: day-by-day, weighted by marks | CampusLoop";
  const description = `A day-by-day revision plan for Semester 3 B.Tech finals (${examPlan.map((s) => s.short).join(", ")}), with time split by each unit's marks and links to the exact study-guide section.`;
  const body = shell(
    `${crumbs([["Home", "/"], ["Exam plan"]])}<h1>Semester 3 finals revision plan</h1><p>${esc(description)}</p>` +
      examPlan
        .map(
          (s) =>
            `<h2>${esc(s.name)}</h2><ul>${s.units
              .map(
                (u) =>
                  `<li><a href="/library/${s.slug}/study-guide#${u.anchor}">Unit ${u.unit}: ${esc(u.topic)}</a>${s.weightsKnown ? ` (${u.weight} marks)` : ""}</li>`
              )
              .join("")}</ul>`
        )
        .join("")
  );
  let html = setMeta(template, { title, description, url: `${SITE}/exam-plan`, image: ogImageFor() });
  html = withJsonLd(html, { "@context": "https://schema.org", "@graph": [breadcrumbLd([["Home", "/"], ["Exam plan", "/exam-plan"]])] });
  write("/exam-plan", withBody(html, body));
  count++;
}

// ── Past papers index ────────────────────────────────────────────────────────
{
  const rows = library.flatMap((s) => s.docs.filter((d) => d.kind === "Question paper" && d.date).map((d) => ({ s, d })));
  rows.sort((a, b) => b.d.date.localeCompare(a.d.date));
  const title = "Semester 3 previous-year papers with solutions (DSA, DBMS, CONMP, COA, Java) | CampusLoop";
  const description = `${rows.length} real ITM SLS Baroda Semester 3 question papers (CET-1, CET-2, mid-semester and end-semester) transcribed as text, with worked solutions.`;
  const body = shell(
    `${crumbs([["Home", "/"], ["Past papers"]])}<h1>Semester 3 previous-year papers, solved</h1><p>${esc(description)}</p><ul>${rows
      .map(({ s, d }) => `<li><a href="/library/${s.slug}/${d.slug}">${esc(s.short)}: ${esc(d.title)}</a> (${d.marks} marks, ${esc(d.academicYear)})</li>`)
      .join("")}</ul>`
  );
  let html = setMeta(template, { title, description, url: `${SITE}/papers`, image: ogImageFor() });
  html = withJsonLd(html, { "@context": "https://schema.org", "@graph": [breadcrumbLd([["Home", "/"], ["Past papers", "/papers"]])] });
  write("/papers", withBody(html, body));
  count++;
}

// ── Info pages ───────────────────────────────────────────────────────────────
for (const [slug, page] of Object.entries(infoPages)) {
  const route = `/${slug}`;
  const html = setMeta(template, { title: `${page.title} | CampusLoop`, description: page.description, url: `${SITE}${route}`, image: ogImageFor() });
  write(route, withBody(html, shell(`<h1>${esc(page.title)}</h1>${renderMarkdown(page.body)}`)));
  count++;
}
// ── Exam-technique guides ────────────────────────────────────────────────────
for (const [slug, page] of Object.entries(guides)) {
  const route = `/guides/${slug}`;
  let html = setMeta(template, { title: `${page.title} | CampusLoop`, description: page.description, url: `${SITE}${route}`, image: ogImageFor() });
  html = withJsonLd(html, {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd([["Home", "/"], ["Exam plan", "/exam-plan"], [page.title, route]]),
      { "@type": "Article", headline: page.title, description: page.description, url: `${SITE}${route}`, publisher: { "@type": "Organization", name: "CampusLoop" } },
    ],
  });
  write(route, withBody(html, shell(`${crumbs([["Home", "/"], ["Exam plan", "/exam-plan"], [page.title]])}<h1>${esc(page.title)}</h1>${renderMarkdown(page.body)}`)));
  count++;
}
{
  const html = setMeta(template, {
    title: "Contact | CampusLoop",
    description: "Questions, missing notes, corrections or takedown requests: send CampusLoop a message.",
    url: `${SITE}/contact`,
    image: ogImageFor(),
  });
  write("/contact", withBody(html, shell(`<h1>Contact</h1><p>Missing notes, a mistake in a document, a feature idea, or a takedown request: use the form on this page and we'll reply by email.</p>`)));
  count++;
}

console.log(`prerendered ${count} public pages`);
