"""Register transcribed past papers (src/content/papers.json) as Library documents.

For each paper with a markdown file at public/reading/<subject>/<slug>.md this adds a
"Question paper" document (with exam/date/year/marks metadata) to src/data/libraryIndex.ts and
public/reading/index.json, removes superseded entries listed in "replaces", and refreshes the
paper URLs in public/sitemap.xml.

usage: python scripts/library/papers.py <project_root>
"""
import json, re, sys, pathlib, datetime

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
reading = root / "public" / "reading"
papers = json.loads((root / "src" / "content" / "papers.json").read_text(encoding="utf-8"))
SITE = "https://itm-notes-new.vercel.app"

ts_path = root / "src" / "data" / "libraryIndex.ts"
head, body = ts_path.read_text(encoding="utf-8").split("export const LIBRARY: LibrarySubject[] = ", 1)
index = json.loads(body.rstrip().rstrip(";"))
by_slug = {s["slug"]: s for s in index}

EXAM_NAMES = {"CET-1": "CET-1", "CET-2": "CET-2", "Mid-sem": "Mid-semester exam", "End-sem": "End-semester exam"}


def nice_date(iso: str) -> str:
    d = datetime.date.fromisoformat(iso)
    return f"{d.day} {d.strftime('%b')} {d.year}"


registered = []
for p in papers:
    subject = by_slug[p["subject"]]
    md_path = reading / p["subject"] / f"{p['slug']}.md"
    if not md_path.exists():
        print("skip (no transcription yet):", p["subject"], p["slug"])
        continue
    md = md_path.read_text(encoding="utf-8")
    words = len(re.findall(r"\w+", md))
    drop = {p["slug"], *p.get("replaces", [])}
    subject["docs"] = [d for d in subject["docs"] if d["slug"] not in drop]
    subject["docs"].append({
        "slug": p["slug"],
        "title": f"{EXAM_NAMES[p['exam']]} · {nice_date(p['date'])}",
        "kind": "Question paper",
        "unit": None,
        "words": words,
        "scanned": False,
        "featured": False,
        "summary": f"{subject['name']} {EXAM_NAMES[p['exam']]} paper, {nice_date(p['date'])} ({p['academicYear']}, {p['marks']} marks), with worked solutions.",
        "exam": p["exam"],
        "date": p["date"],
        "academicYear": p["academicYear"],
        "marks": p["marks"],
    })
    registered.append((p["subject"], p["slug"]))

# newest papers last within each subject's document list (non-paper docs keep their order)
for s in index:
    others = [d for d in s["docs"] if d["kind"] != "Question paper" or "date" not in d]
    dated = sorted((d for d in s["docs"] if d["kind"] == "Question paper" and "date" in d), key=lambda d: d["date"], reverse=True)
    s["docs"] = others + dated

ts_path.write_text(head + "export const LIBRARY: LibrarySubject[] = " + json.dumps(index, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
(reading / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")

# sitemap: /papers plus one URL per paper
sm_path = root / "public" / "sitemap.xml"
sm = sm_path.read_text(encoding="utf-8")
today = datetime.date.today().isoformat()
entries = [("/papers", "weekly", "0.9")] + [(f"/library/{s}/{slug}", "monthly", "0.7") for s, slug in registered]
for url, freq, prio in entries:
    if f"<loc>{SITE}{url}</loc>" in sm:
        continue
    sm = sm.replace("</urlset>", f"  <url>\n    <loc>{SITE}{url}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{prio}</priority>\n  </url>\n</urlset>")
sm_path.write_text(sm, encoding="utf-8")
print(f"registered {len(registered)} papers")
