"""Build one "Exam guide" per subject from the exam-focused sections of its study guide.

Collects, unit by unit, the sections titled "What to write in the exam", "Questions asked in exam",
"Exam Questions You Must Be Able to Answer", "Common mistakes" and "Check yourself", plus the
Last-Night Revision Sheet. Nothing new is written: every line comes from the study guide.

usage: python scripts/library/exam_guides.py <project_root>
Writes public/reading/<subject>/exam-guide.md and registers it in public/reading/index.json and
src/data/libraryIndex.ts (right after the study guide).
"""
import json, re, sys, pathlib

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
reading = root / "public" / "reading"
PICK = re.compile(r"what to write|questions asked in exam|exam questions|common mistakes|check yourself", re.I)
SHEET = re.compile(r"last-night (revision|formula) sheet", re.I)


def sections(md: str):
    """Yield (level, title, start_line) for headings outside code fences."""
    code = False
    for i, line in enumerate(md.split("\n")):
        if line.startswith("```"):
            code = not code
        if code:
            continue
        m = re.match(r"^(#{1,3})\s+(.+?)\s*$", line)
        if m:
            yield len(m.group(1)), m.group(2), i


def build(subject: dict) -> tuple[str, int]:
    lines = (reading / subject["slug"] / "study-guide.md").read_text(encoding="utf-8").split("\n")
    heads = list(sections("\n".join(lines)))
    out = [
        f"> Everything here is taken from the {subject['short']} Complete Study Guide: for each unit, what examiners ask, "
        "what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.",
        "",
    ]
    current_unit, unit_written, picked, covered_until = None, False, 0, -1
    for idx, (level, title, start) in enumerate(heads):
        if start < covered_until:
            continue  # already inside a picked parent section
        if level == 1:
            current_unit, unit_written = title, False
            if SHEET.search(title):
                out += ["", f"# {title}", ""] + lines[start + 1:]
                picked += 1
                break
            continue
        if not PICK.search(title):
            continue
        end = next((h[2] for h in heads[idx + 1:] if h[0] <= level), len(lines))
        if not unit_written and current_unit:
            out += ["", f"# {current_unit}", ""]
            unit_written = True
        out += [f"{'#' * max(2, level)} {title}"] + lines[start + 1:end]
        covered_until = end
        picked += 1
    md = re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip() + "\n"
    return md, picked


ts_path = root / "src" / "data" / "libraryIndex.ts"
ts = ts_path.read_text(encoding="utf-8")
head, body = ts.split("export const LIBRARY: LibrarySubject[] = ", 1)
index = json.loads(body.rstrip().rstrip(";"))  # libraryIndex.ts is the source of truth (lecture order)
for s in index:
    md, picked = build(s)
    (reading / s["slug"] / "exam-guide.md").write_text(md, encoding="utf-8")
    words = len(re.findall(r"\w+", re.sub(r"!\[[^\]]*\]\([^)]*\)", "", md)))
    doc = {
        "slug": "exam-guide",
        "title": f"{s['short']}: Exam Guide",
        "kind": "Exam guide",
        "unit": None,
        "words": words,
        "scanned": False,
        "featured": False,
        "summary": f"Unit-by-unit exam questions, what to write, common mistakes and self-checks for {s['name']}, plus the last-night revision sheet.",
    }
    s["docs"] = [d for d in s["docs"] if d["slug"] != "exam-guide"]
    at = next((i + 1 for i, d in enumerate(s["docs"]) if d.get("featured")), 0)
    s["docs"].insert(at, doc)
    print(f"{s['slug']}: {picked} sections, {words} words")

(reading / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")
ts_path.write_text(head + "export const LIBRARY: LibrarySubject[] = " + json.dumps(index, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
