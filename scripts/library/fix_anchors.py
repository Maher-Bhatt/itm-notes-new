"""Check and repair `/library/<subject>/<doc>#<anchor>` links inside the reading markdown.

Section ids are computed exactly like the reader (src/pages/ReaderPage.tsx, extractHeadings):
strip *_` from the heading text, lowercase, drop `*_~[]()`, collapse non [a-z0-9] runs to "-",
trim, cut to 80 chars, and de-duplicate with -1, -2, ...

A broken anchor is replaced with the target heading whose id (hyphens removed) shares the longest
prefix with the broken anchor (hyphens removed). Anything that cannot be matched is reported.

usage: python scripts/library/fix_anchors.py <project_root> [--check]
"""
import re, sys, pathlib

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
check_only = "--check" in sys.argv
reading = root / "public" / "reading"


def slugify(t: str) -> str:
    t = re.sub(r"[`*_~\[\]()]", "", t.lower())
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return t[:80]


def heading_ids(md: str) -> list[str]:
    ids, seen, code = [], {}, False
    for line in md.split("\n"):
        if line.startswith("```"):
            code = not code
        if code:
            continue
        m = re.match(r"^(#{1,3})\s+(.+?)\s*$", line)
        if not m:
            continue
        base = slugify(re.sub(r"[*_`]", "", m.group(2))) or "section"
        n = seen.get(base, 0)
        seen[base] = n + 1
        ids.append(f"{base}-{n}" if n else base)
    return ids


cache: dict[str, list[str]] = {}


def ids_for(subject: str, doc: str) -> list[str] | None:
    key = f"{subject}/{doc}"
    if key not in cache:
        p = reading / subject / f"{doc}.md"
        cache[key] = heading_ids(p.read_text(encoding="utf-8")) if p.exists() else None
    return cache[key]


def best_match(anchor: str, ids: list[str]) -> str | None:
    a = anchor.replace("-", "")
    best, score = None, 0
    for i in ids:
        b = i.replace("-", "")
        n = 0
        while n < min(len(a), len(b)) and a[n] == b[n]:
            n += 1
        if n > score:
            best, score = i, n
    return best if score >= 4 else None


LINK = re.compile(r"\]\(/library/([a-z0-9-]+)/([a-z0-9-]+)#([^)\s]+)\)")
fixed = broken = 0
for md_path in sorted(reading.rglob("*.md")):
    text = md_path.read_text(encoding="utf-8")

    def repl(m: re.Match) -> str:
        global fixed, broken
        subject, doc, anchor = m.groups()
        ids = ids_for(subject, doc)
        if ids is None:
            broken += 1
            print(f"MISSING DOC  {md_path.relative_to(reading)} -> {subject}/{doc}")
            return m.group(0)
        if anchor in ids:
            return m.group(0)
        new = best_match(anchor, ids)
        if not new:
            broken += 1
            print(f"UNRESOLVED   {md_path.relative_to(reading)} -> {subject}/{doc}#{anchor}")
            return m.group(0)
        fixed += 1
        return f"](/library/{subject}/{doc}#{new})"

    new_text = LINK.sub(repl, text)
    if new_text != text and not check_only:
        md_path.write_text(new_text, encoding="utf-8")

print(f"{'would fix' if check_only else 'fixed'} {fixed} anchors; {broken} unresolved")
