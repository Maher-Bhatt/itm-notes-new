"""Convert a 'Complete Study Guide' PDF (fixed template) into clean markdown + figure images.

usage: guide2md.py <pdf> <out.md> <img_dir> <img_url_prefix>
"""
import sys, re, pathlib, pymupdf

src, out_md, img_dir, img_url = sys.argv[1], pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3]), sys.argv[4]
img_dir.mkdir(parents=True, exist_ok=True)
doc = pymupdf.open(src)

import collections as _c
_cnt = _c.Counter()
for _pg in doc:
    for _b in _pg.get_text("dict")["blocks"]:
        for _l in _b.get("lines", []):
            for _s in _l["spans"]:
                if _s["text"].strip() and "Mono" not in _s["font"]:
                    _cnt[round(_s["size"], 1)] += len(_s["text"])
SCALE = _cnt.most_common(1)[0][0] / 11.2
SKIP_RE = re.compile(r"(·\s*Complete Study Guide$|^\d+ / \d+$|^(\S ){3,}\S$)")
def norm(x):
    return round(x / SCALE, 1)

BULLET_RE = re.compile(r"^([•▪◦●■]\s*|[-–]\s+|\d+[.)]\s|\(?[a-z][.)]\s|\(?[ivx]+\)\s|Step \d)")
BODY_SIZES = (11.2, 11.3, 12.2, 12.5, 15.5, 22.0)


def is_mono(span):
    f = span["font"]
    return "Mono" in f or "Courier" in f or "Consol" in f


def fix(t):
    t = t.replace(" ", " ").replace("�", "").replace("​", "")
    return re.sub(r"[ \t]+", " ", t)


def cell_text(rect, words):
    ws = [w for w in words if rect.contains(pymupdf.Point((w[0] + w[2]) / 2, (w[1] + w[3]) / 2))]
    ws.sort(key=lambda w: (round(w[3] / 4), w[0]))
    return fix(" ".join(w[4] for w in ws)).replace("|", "\\|").strip()


out = []
fig_n = 0


def emit(s=""):
    out.append(s)


for pno, page in enumerate(doc):
    if pno < 2:  # cover + table of contents
        continue
    W, H = page.rect.width, page.rect.height
    items = []
    words = page.get_text("words")

    # ---- tables (cell text rebuilt from words to keep spacing) ----
    tbl_boxes = []
    try:
        found = page.find_tables(vertical_strategy="text", horizontal_strategy="lines").tables
        if not found:
            found = page.find_tables().tables
        def build(t):
            rows = []
            for row in t.rows:
                cells = [cell_text(pymupdf.Rect(cb), words) if cb else "" for cb in row.cells]
                if any(cells):
                    rows.append(cells)
            if not rows:
                return rows
            n = max(len(r) for r in rows)
            rows = [r + [""] * (n - len(r)) for r in rows]
            keep = [j for j in range(n) if any(r[j] for r in rows)]
            return [[r[j] for j in keep] for r in rows]

        def empty_ratio(rows):
            cells = [c for r in rows for c in r]
            return sum(1 for c in cells if not c) / max(1, len(cells))

        try:
            alt = {tuple(round(v) for v in a.bbox): a for a in page.find_tables().tables}
        except Exception:
            alt = {}
        for t in found:
            rows = build(t)
            if rows and empty_ratio(rows) > 0.2:
                for a in alt.values():
                    if pymupdf.Rect(a.bbox).intersects(pymupdf.Rect(t.bbox)):
                        r2 = build(a)
                        if r2 and empty_ratio(r2) < empty_ratio(rows):
                            rows, t = r2, a
                        break
            if rows and empty_ratio(rows) > 0.15:
                # rebuild from raw word positions: columns from header cells, rows from text lines
                hdr_cells = [pymupdf.Rect(cb) for cb in t.rows[0].cells if cb]
                xs = sorted(c.x0 for c in hdr_cells)
                if len(xs) >= 2:
                    tb0 = pymupdf.Rect(t.bbox)
                    tw = sorted([w for w in words if tb0.contains(pymupdf.Point((w[0] + w[2]) / 2, (w[1] + w[3]) / 2))],
                                key=lambda w: (w[1], w[0]))
                    lines_ = []
                    for w in tw:
                        if lines_ and abs(lines_[-1][0] - w[1]) < 3:
                            lines_[-1][1].append(w)
                        else:
                            lines_.append([w[1], [w]])
                    new_rows = []
                    for _, ws in lines_:
                        cells = [""] * len(xs)
                        for w in sorted(ws, key=lambda w: w[0]):
                            j = max([k for k in range(len(xs)) if xs[k] - 4 <= w[0]] or [0])
                            cells[j] = (cells[j] + " " + w[4]).strip()
                        if new_rows and not cells[0] and any(cells):
                            new_rows[-1] = [(a + " " + b).strip() for a, b in zip(new_rows[-1], cells)]
                        else:
                            new_rows.append(cells)
                    if new_rows and empty_ratio(new_rows) < empty_ratio(rows):
                        rows = [[fix(c).replace("|", "\\|") for c in r] for r in new_rows]
            # header row sitting just above the table bbox
            tb = pymupdf.Rect(t.bbox)
            if rows:
                ncol = len(rows[0])
                above = [w for w in words if tb.y0 - 22 < w[3] <= tb.y0 + 1 and tb.x0 - 2 <= w[0] <= tb.x1]
                if above and len(rows[0]) >= 2:
                    # split header words into columns using first-row cell x positions
                    xs = [pymupdf.Rect(cb).x0 for cb in t.rows[0].cells if cb]
                    if len(xs) == ncol:
                        hdr = [""] * ncol
                        for w in sorted(above, key=lambda w: w[0]):
                            j = max(k for k in range(ncol) if xs[k] - 6 <= w[0] or k == 0)
                            hdr[j] = (hdr[j] + " " + w[4]).strip()
                        if sum(1 for h in hdr if h) >= 2:
                            rows.insert(0, hdr)
                            t_header_box = pymupdf.Rect(tb.x0, tb.y0 - 22, tb.x1, tb.y0)
                            tbl_boxes.append(t_header_box)
            if len(rows) >= 2 and max(len(r) for r in rows) >= 2:
                n = max(len(r) for r in rows)
                rows = [r + [""] * (n - len(r)) for r in rows]
                md = "| " + " | ".join(rows[0]) + " |\n|" + "---|" * n + "\n"
                md += "\n".join("| " + " | ".join(r) + " |" for r in rows[1:])
                r = pymupdf.Rect(t.bbox)
                tbl_boxes.append(r)
                items.append((r.y0, "table", md))
    except Exception as e:  # noqa
        print("table err", pno, e, file=sys.stderr)

    d = page.get_text("dict")
    blocks = [b for b in d["blocks"] if b.get("type") == 0]

    # ---- figures: vector drawing clusters that are not code boxes / callouts ----
    fig_boxes = []
    try:
        clusters = page.cluster_drawings()
    except Exception:
        clusters = []
    for c in clusters:
        c = pymupdf.Rect(c)
        if c.height < 50 or c.width < 80:
            continue
        if any(c.intersects(t) for t in tbl_boxes):
            continue
        if c.width > W * 0.95 and c.height > H * 0.9:
            continue
        spans = [s for b in blocks if pymupdf.Rect(b["bbox"]).intersects(c)
                 for l in b["lines"] for s in l["spans"] if s["text"].strip()]
        if spans:
            mono = sum(1 for s in spans if is_mono(s))
            body = sum(1 for s in spans if any(abs(norm(s["size"]) - b) < 0.15 for b in BODY_SIZES))
            if mono > 0.5 * len(spans) or body > 0.4 * len(spans):
                continue
        fig_n += 1
        name = f"fig-{fig_n:03d}.png"
        pix = page.get_pixmap(clip=c + (-4, -4, 4, 4), dpi=150)
        pix.save(str(img_dir / name))
        fig_boxes.append(c)
        items.append((c.y0, "fig", f"{img_url}/{name}"))

    # ---- text lines ----
    for b in blocks:
        for l in b["lines"]:
            spans = [s for s in l["spans"] if s["text"].strip()]
            if not spans:
                continue
            lr = pymupdf.Rect(l["bbox"])
            if any(lr.intersects(t) and (lr & t).get_area() > 0.5 * lr.get_area() for t in tbl_boxes):
                continue
            if any(lr.intersects(f) and (lr & f).get_area() > 0.5 * lr.get_area() for f in fig_boxes):
                continue
            txt = fix("".join(s["text"] for s in l["spans"]))
            size = norm(max(s["size"] for s in spans))
            mono = all(is_mono(s) for s in spans)
            items.append((lr.y0, "line", dict(size=size, mono=mono, txt=txt, x0=lr.x0, x1=lr.x1, y0=lr.y0, y1=lr.y1)))

    items.sort(key=lambda x: (round(x[0], 0), x[2]["x0"] if x[1] == "line" else 0))

    grouped = []
    for y, kind, payload in items:
        if kind == "line":
            if grouped and grouped[-1][1] == "text":
                grouped[-1][2].append(payload)
            else:
                grouped.append((y, "text", [payload]))
        else:
            grouped.append((y, kind, payload))

    for _, kind, payload in grouped:
        if kind == "table":
            emit(payload); emit(); continue
        if kind == "fig":
            emit(f"![Diagram]({payload})"); emit(); continue
        lines = payload
        right = max(l["x1"] for l in lines)
        i = 0
        while i < len(lines):
            L = lines[i]
            size, txt = L["size"], L["txt"]
            if size <= 7.6 or size in (8.5, 8.6) or size >= 80 or txt.strip() in ("💡", "★") or SKIP_RE.search(txt.strip()):
                i += 1; continue
            if L["mono"]:
                code, x0, prev = [], L["x0"], None
                while i < len(lines) and lines[i]["mono"]:
                    c = lines[i]
                    if prev is not None and c["y0"] - prev["y1"] > 14:
                        break
                    indent = max(0, int(round((c["x0"] - x0) / 5.2)))
                    code.append(" " * indent + c["txt"].rstrip())
                    prev = c; i += 1
                emit("```"); emit("\n".join(code)); emit("```"); emit(); continue
            if size >= 19.5:
                t = [txt]; i += 1
                while i < len(lines) and lines[i]["size"] >= 19.5:
                    t.append(lines[i]["txt"]); i += 1
                emit("# " + " ".join(x.strip() for x in t)); emit(); continue
            if 15.0 <= size < 16:
                t = [txt]; i += 1
                while i < len(lines) and 15.0 <= lines[i]["size"] < 16:
                    t.append(lines[i]["txt"]); i += 1
                emit("## " + " ".join(x.strip() for x in t)); emit(); continue
            if 12.0 <= size <= 12.7:
                t = [txt]; i += 1
                while i < len(lines) and 12.0 <= lines[i]["size"] <= 12.7:
                    t.append(lines[i]["txt"]); i += 1
                emit("### " + " ".join(x.strip() for x in t)); emit(); continue
            if size == 11.3:
                t = [txt]; i += 1
                while i < len(lines) and lines[i]["size"] == 11.3:
                    t.append(lines[i]["txt"]); i += 1
                emit("> " + " ".join(x.strip() for x in t)); emit(); continue
            if size == 8.8:
                emit(f"*{txt.strip()}*"); emit(); i += 1; continue
            if size < 10.5 and len(txt.strip()) <= 3:
                i += 1; continue
            if not (9 <= size < 12.0):
                i += 1; continue
            para, prev = [], None
            while i < len(lines):
                c = lines[i]
                if c["mono"] or not (9 <= c["size"] < 12.0) or c["size"] == 11.3:
                    break
                t = c["txt"].strip()
                if para:
                    h = c["y1"] - c["y0"]
                    gap = c["y0"] - prev["y1"]
                    short_prev = prev["x1"] < right - 60
                    if gap > 0.55 * h or BULLET_RE.match(t) or short_prev:
                        emit(" ".join(para)); emit(); para = []
                para.append(t); prev = c; i += 1
            if para:
                emit(" ".join(para)); emit()

md = "\n".join(out)
md = re.sub(r"^[•▪◦●■]\s*", "- ", md, flags=re.M)
md = re.sub(r"(\S)-\s(\w)", lambda m: m.group(1) + "-" + m.group(2) if False else m.group(0), md)
md = re.sub(r"\n{3,}", "\n\n", md)
# keep consecutive list items tight
md = re.sub(r"(^- .*)\n\n(?=- )", r"\1\n", md, flags=re.M)
out_md.write_text(md.strip() + "\n", encoding="utf-8")
print(f"{out_md.name}: {len(md)} chars, {fig_n} figures")
