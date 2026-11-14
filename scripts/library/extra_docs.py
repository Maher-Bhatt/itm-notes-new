"""Register standalone Library documents listed in src/content/extraDocs.json.

Each entry points to public/reading/<subject>/<slug>.md and is inserted into the subject's
document list (after the doc named in "after", or at the end), in src/data/libraryIndex.ts and
public/reading/index.json. Its URL is added to public/sitemap.xml.

usage: python scripts/library/extra_docs.py <project_root>
"""
import json, re, sys, pathlib, datetime

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
reading = root / "public" / "reading"
extras = json.loads((root / "src" / "content" / "extraDocs.json").read_text(encoding="utf-8"))
SITE = "https://itm-notes-new.vercel.app"

ts_path = root / "src" / "data" / "libraryIndex.ts"
head, body = ts_path.read_text(encoding="utf-8").split("export const LIBRARY: LibrarySubject[] = ", 1)
index = json.loads(body.rstrip().rstrip(";"))
by_slug = {s["slug"]: s for s in index}

sm_path = root / "public" / "sitemap.xml"
sm = sm_path.read_text(encoding="utf-8")
today = datetime.date.today().isoformat()

for e in extras:
    subject = by_slug[e["subject"]]
    md = (reading / e["subject"] / f"{e['slug']}.md").read_text(encoding="utf-8")
    doc = {
        "slug": e["slug"], "title": e["title"], "kind": e["kind"], "unit": e.get("unit"),
        "words": len(re.findall(r"\w+", md)), "scanned": False, "featured": e.get("featured", False),
        "summary": e["summary"],
    }
    docs = [d for d in subject["docs"] if d["slug"] != e["slug"]]
    pos = next((i + 1 for i, d in enumerate(docs) if d["slug"] == e.get("after")), len(docs))
    docs.insert(pos, doc)
    subject["docs"] = docs
    loc = f"<loc>{SITE}/library/{e['subject']}/{e['slug']}</loc>"
    if loc not in sm:
        sm = sm.replace("</urlset>", f"  <url>\n    {loc}\n    <lastmod>{today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>")
    print("registered", e["subject"], e["slug"], doc["words"], "words")

ts_path.write_text(head + "export const LIBRARY: LibrarySubject[] = " + json.dumps(index, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8", newline="\n")
(reading / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8", newline="\n")
sm_path.write_text(sm, encoding="utf-8", newline="\n")
