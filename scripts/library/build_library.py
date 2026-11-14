"""Build public/library (markdown + images) and src/data/libraryIndex.ts from the SEM 3 notes folder.

usage: build_library.py <notes_root> <project_root> <python_exe> <scratch_dir>
"""
import sys, re, json, pathlib, subprocess, shutil

notes, project, py, scratch = map(pathlib.Path, sys.argv[1:5])
lib = project / "public" / "reading"
if lib.exists():
    shutil.rmtree(lib)
lib.mkdir(parents=True)

SUBJECTS = [
    dict(slug="dsa", folder="1_DSA", guide="DSA_Complete_Study_Guide.pdf", code="C2310C5",
         name="Data Structures & Algorithms", short="DSA"),
    dict(slug="dbms", folder="2_DBMS", guide="DBMS_Complete_Study_Guide.pdf", code="C2311C4",
         name="Database Management Systems", short="DBMS"),
    dict(slug="conmp", folder="3_CONMP", guide="CONMP_Complete_Study_Guide.pdf", code="S2320C1",
         name="Computer Oriented Numerical Methods with Python", short="CONMP"),
    dict(slug="coa", folder="4_Computer_Architecture", guide="Computer_Architecture_Complete_Study_Guide.pdf", code="",
         name="Computer Organization & Architecture", short="COA"),
    dict(slug="java", folder="5_Java", guide="Java_Complete_Study_Guide.pdf", code="",
         name="Object-Oriented Programming with Java", short="Java"),
]


def kind_of(stem):
    s = stem.lower()
    if "syllabus" in s: return "Syllabus"
    if "handwritten" in s: return "Handwritten notes"
    if "tutorial" in s: return "Tutorial"
    if "question_bank" in s or "paper_" in s: return "Question paper"
    if "lab_manual" in s: return "Lab manual"
    if "assignment" in s: return "Assignment"
    if "slides" in s: return "Slides"
    return "Lecture notes"


def title_of(stem):
    t = re.sub(r"^(U\d+(-U\d+)?_)?(\d+_)?", "", stem)
    t = t.replace("_", " ").strip()
    t = re.sub(r"\bCET(\d)\b", r"CET-\1", t)
    t = re.sub(r"\bADT\b", "ADT", t)
    t = re.sub(r"\bPLSQL\b", "PL/SQL", t)
    return t[:1].upper() + t[1:]


def unit_of(stem):
    m = re.match(r"U(\d+)", stem)
    return int(m.group(1)) if m else None


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def words(md):
    body = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", md)
    return len(re.findall(r"\w+", body))


def outline(md):
    out = []
    for line in md.splitlines():
        m = re.match(r"^(#{1,2}) (.+)$", line)
        if m:
            out.append(dict(level=len(m.group(1)), text=m.group(2).strip()[:120]))
    return out


index = []
for sub in SUBJECTS:
    sdir = lib / sub["slug"]
    sdir.mkdir()
    img_dir = sdir / "img"
    docs = []

    # 1. complete study guide
    guide_md = sdir / "study-guide.md"
    r = subprocess.run([str(py), "-I", "-X", "utf8", str(scratch / "guide2md.py"), str(notes / sub["folder"] / sub["guide"]),
                        str(guide_md), str(img_dir), f"/reading/{sub['slug']}/img"], capture_output=True, text=True, encoding="utf-8")
    print(sub["slug"], "guide:", r.stdout.strip(), r.stderr.strip()[-200:] if r.returncode else "")
    md = guide_md.read_text(encoding="utf-8")
    units = [o["text"] for o in outline(md) if o["level"] == 1]
    docs.append(dict(slug="study-guide", title=f"{sub['short']} — Complete Study Guide", kind="Study guide", unit=None,
                     words=words(md), scanned=False, featured=True,
                     summary=f"Learn-from-zero guide covering every unit: {', '.join(units[1:7])}" if len(units) > 1 else "Complete guide"))

    # 2. source files
    src_dir = notes / sub["folder"] / "Source Files"
    files = sorted(p for p in src_dir.iterdir() if p.suffix.lower() in (".pdf", ".pptx", ".docx", ".jpeg", ".jpg", ".png"))
    for f in files:
        slug = slugify(f.stem)
        out_md = sdir / f"{slug}.md"
        force = ["pages"] if (sub["slug"] == "conmp" and f.suffix.lower() == ".pdf" and "Syllabus" not in f.name) else []
        r = subprocess.run([str(py), "-I", "-X", "utf8", str(scratch / "src2md.py"), str(f), str(out_md), str(img_dir),
                            f"/reading/{sub['slug']}/img"] + force, capture_output=True, text=True, encoding="utf-8")
        line = [l for l in r.stdout.splitlines() if l.startswith("{")]
        if r.returncode or not line:
            print("  FAIL", f.name, r.stderr[-300:]); continue
        st = json.loads(line[-1])
        md = out_md.read_text(encoding="utf-8")
        kind = kind_of(f.stem)
        scanned = st["scanned"] > 0 and st["scanned"] >= 0.6 * max(1, st["pages"])
        docs.append(dict(slug=slug, title=title_of(f.stem), kind=kind, unit=unit_of(f.stem), words=words(md),
                         scanned=scanned, featured=False, pages=st["pages"], summary=""))
        print(f"  {f.name}: {st}")

    order = {"Study guide": 0, "Syllabus": 1, "Lecture notes": 2, "Slides": 2, "Handwritten notes": 3, "Tutorial": 4,
             "Question paper": 5, "Lab manual": 6, "Assignment": 7}
    docs.sort(key=lambda d: (order.get(d["kind"], 9) if d["kind"] in ("Study guide", "Syllabus") else 2,
                             d["unit"] if d["unit"] is not None else 99, d["slug"]))
    index.append(dict(slug=sub["slug"], code=sub["code"], name=sub["name"], short=sub["short"], docs=docs))

(lib / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8", newline="\n")
ts = "// AUTO-GENERATED by the library build script from the SEM 3 notes folder. Do not edit by hand.\n"
ts += "import type { LibrarySubject } from \"./libraryTypes\";\n\n"
ts += "export const LIBRARY: LibrarySubject[] = " + json.dumps(index, ensure_ascii=False, indent=2) + ";\n"
(project / "src" / "data" / "libraryIndex.ts").write_text(ts, encoding="utf-8", newline="\n")
print("subjects", len(index), "docs", sum(len(s["docs"]) for s in index))
