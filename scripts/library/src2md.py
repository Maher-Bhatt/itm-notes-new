"""Convert lecture source files (slide PDFs, notes PDFs, PPTX, DOCX, scans, JPEG) to markdown.

usage: src2md.py <input> <out.md> <img_dir> <img_url_prefix>
Prints a JSON line with stats.
"""
import sys, re, json, pathlib, collections
import pymupdf

src, out_md, img_dir, img_url = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3]), sys.argv[4]
FORCE_PAGES = len(sys.argv) > 5 and sys.argv[5] == "pages"
img_dir.mkdir(parents=True, exist_ok=True)
stem = re.sub(r"[^a-z0-9]+", "-", out_md.stem.lower()).strip("-")
BULLET_RE = re.compile(r"^([•▪◦●■➢➤►▶✓✔❖◆○]\s*|[-–]\s+|\d+[.)]\s|\(?[a-z][.)]\s|\(?[ivx]+\)\s)")
out, stats = [], dict(pages=0, images=0, scanned=0, chars=0)


def fix(t):
    t = t.replace(" ", " ").replace("�", "").replace("​", "")
    t = re.sub(r"^[•▪◦●■➢➤►▶✓✔❖◆○]\s*", "- ", t.strip())
    return re.sub(r"[ \t]+", " ", t)


def save_page_image(page, idx, dpi=110):
    name = f"{stem}-p{idx:03d}.jpg"
    pix = page.get_pixmap(dpi=dpi)
    if pix.width > 1300:
        pix = page.get_pixmap(dpi=int(dpi * 1300 / pix.width))
    pix.save(str(img_dir / name), jpg_quality=62)
    stats["images"] += 1
    return f"{img_url}/{name}"


def pdf_to_md(path):
    doc = pymupdf.open(path)
    stats["pages"] = doc.page_count
    total_chars = sum(len(p.get_text().strip()) for p in doc)
    scanned_doc = FORCE_PAGES or total_chars / max(1, doc.page_count) < 60
    xref_pages = collections.Counter()
    for p_ in doc:
        for x_ in {i[0] for i in p_.get_images(full=True)}:
            xref_pages[x_] += 1
    # repeated header/footer lines
    freq = collections.Counter()
    for p in doc:
        seen = set()
        for l in p.get_text().splitlines():
            l = l.strip()
            if 2 < len(l) < 90 and l not in seen:
                seen.add(l); freq[l] += 1
    repeated = {l for l, c in freq.items() if doc.page_count >= 5 and c >= max(3, 0.3 * doc.page_count)}

    sizes = collections.Counter()
    for p in doc:
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                for s in l["spans"]:
                    if s["text"].strip():
                        sizes[round(s["size"])] += len(s["text"])
    body = sizes.most_common(1)[0][0] if sizes else 11

    last_heading = None
    for pno, page in enumerate(doc):
        text_len = len(page.get_text().strip())
        if scanned_doc or (text_len < 40 and page.get_images()):
            stats["scanned"] += 1
            out.append(f"![Page {pno + 1}]({save_page_image(page, pno + 1)})")
            out.append("")
            continue
        words = page.get_text("words")
        tbl_boxes = []
        items = []
        try:
            for t in page.find_tables().tables:
                rows = []
                for row in t.rows:
                    cells = []
                    for cb in row.cells:
                        if not cb:
                            cells.append(""); continue
                        r = pymupdf.Rect(cb)
                        ws = sorted([w for w in words if r.contains(pymupdf.Point((w[0] + w[2]) / 2, (w[1] + w[3]) / 2))],
                                    key=lambda w: (round(w[3] / 4), w[0]))
                        cells.append(fix(" ".join(w[4] for w in ws)).replace("|", "\\|"))
                    if any(cells):
                        rows.append(cells)
                if len(rows) >= 2 and max(len(r) for r in rows) >= 2:
                    n = max(len(r) for r in rows)
                    rows = [r + [""] * (n - len(r)) for r in rows]
                    md = "| " + " | ".join(rows[0]) + " |\n|" + "---|" * n + "\n" + "\n".join("| " + " | ".join(r) + " |" for r in rows[1:])
                    tbl_boxes.append(pymupdf.Rect(t.bbox))
                    items.append((t.bbox[1], "table", md))
        except Exception:
            pass
        # large embedded pictures (diagrams on slides)
        for info in page.get_image_info(xrefs=True):
            bb = pymupdf.Rect(info["bbox"])
            if info.get("xref") and xref_pages[info["xref"]] >= 3:
                continue  # template / decorative image repeated across slides
            if bb.width > page.rect.width * 0.85 and bb.height < page.rect.height * 0.3:
                continue  # banner strip
            if pno == 0:
                continue  # title slide artwork
            if bb.width > page.rect.width * 0.3 and bb.height > 90 and bb.get_area() < page.rect.get_area() * 0.92:
                name = f"{stem}-p{pno + 1:03d}-{int(bb.y0)}.jpg"
                pix = page.get_pixmap(clip=bb, dpi=120)
                pix.save(str(img_dir / name), jpg_quality=65)
                stats["images"] += 1
                items.append((bb.y0, "img", f"{img_url}/{name}"))
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                spans = [s for s in l["spans"] if s["text"].strip()]
                if not spans:
                    continue
                lr = pymupdf.Rect(l["bbox"])
                if any(lr.intersects(t) for t in tbl_boxes):
                    continue
                txt = fix("".join(s["text"] for s in l["spans"]))
                if not txt or txt in repeated or re.fullmatch(r"\d{1,3}", txt):
                    continue
                size = max(s["size"] for s in spans)
                bold = any(s["flags"] & 16 or "Bold" in s["font"] for s in spans)
                mono = all("Courier" in s["font"] or "Mono" in s["font"] or "Consol" in s["font"] for s in spans)
                items.append((lr.y0, "line", dict(txt=txt, size=size, bold=bold, mono=mono, x0=lr.x0, x1=lr.x1, y0=lr.y0, y1=lr.y1)))
        items.sort(key=lambda x: (int(((x[2]["y0"] + x[2]["y1"]) / 2) // 5) if x[1] == "line" else int(x[0] // 5), x[2]["x0"] if x[1] == "line" else 0))

        para, prev, code = [], None, []

        def flush():
            nonlocal para, code
            if code:
                out.append("```"); out.extend(code); out.append("```"); out.append(""); code = []
            if para:
                out.append(" ".join(para)); out.append(""); para = []

        right = max([it[2]["x1"] for it in items if it[1] == "line"] or [page.rect.width])
        merged, pending = [], None
        for y, kind, it in items:
            if kind == "line" and (it["txt"] in ("-", "- ", "–") or re.fullmatch(r"\d{1,2}[.)]", it["txt"])):
                pending = "- " if it["txt"].startswith(("-", "–")) else it["txt"] + " "
                continue
            if kind == "line" and pending:
                it = dict(it, txt=pending + it["txt"]); pending = None
            merged.append((y, kind, it))
        items = merged
        for _, kind, it in items:
            if kind in ("table", "img"):
                flush(); prev = None
                out.append(it if kind == "table" else f"![Figure]({it})"); out.append("")
                continue
            t = it["txt"]
            if it["mono"]:
                if para: flush()
                code.append(t); prev = it; continue
            elif code:
                flush()
            heading = it["size"] >= body * 1.3 and len(t) < 110 and len(t.strip("-•# ")) > 1
            if heading:
                flush()
                if t != last_heading:
                    level = "##" if it["size"] >= body * 1.7 else "###"
                    if out and out[-1].startswith(level + " ") and prev is not None and prev.get("_h") and it["y0"] - prev["y1"] < it["size"]:
                        out[-1] += " " + t  # wrapped heading
                    else:
                        out.append(f"{level} {t}"); out.append("")
                    last_heading = out[-2] if out[-1] == "" else out[-1]
                it["_h"] = True; prev = it
                continue
            if para and prev is not None:
                h = it["y1"] - it["y0"]
                if (it["y0"] - prev["y1"] > 0.6 * h) or BULLET_RE.match(t) or t.startswith("- ") or (prev["x1"] < right - 70 and re.search(r"[.:;?!)]$", prev["txt"])) or prev.get("_h"):
                    flush()
            para.append(t); prev = it
        flush()
    doc.close()


def pptx_to_md(path):
    from pptx import Presentation
    from pptx.enum.shapes import MSO_SHAPE_TYPE
    prs = Presentation(str(path))
    stats["pages"] = len(prs.slides)
    seen_titles = None
    for n, slide in enumerate(prs.slides, 1):
        title = ""
        if slide.shapes.title is not None and slide.shapes.title.has_text_frame:
            title = fix(slide.shapes.title.text_frame.text.replace("\n", " "))
        body_lines = []
        cands = []

        def walk(shapes):
            for sh in shapes:
                if sh.shape_type == MSO_SHAPE_TYPE.GROUP:
                    walk(sh.shapes); continue
                if slide.shapes.title is not None and sh.shape_id == slide.shapes.title.shape_id:
                    continue
                if getattr(sh, "has_table", False) and sh.has_table:
                    rows = [[fix(c.text.replace("\n", " ")).replace("|", "\\|") for c in r.cells] for r in sh.table.rows]
                    if rows:
                        n_ = max(len(r) for r in rows)
                        body_lines.append("")
                        body_lines.append("| " + " | ".join(rows[0]) + " |")
                        body_lines.append("|" + "---|" * n_)
                        body_lines.extend("| " + " | ".join(r) + " |" for r in rows[1:])
                        body_lines.append("")
                    continue
                if sh.shape_type == MSO_SHAPE_TYPE.PICTURE:
                    try:
                        if sh.width and sh.height and sh.width > 2_500_000 and sh.height > 1_200_000:
                            img = sh.image
                            ext = "png" if img.ext == "png" else "jpg"
                            name = f"{stem}-s{n:03d}-{sh.shape_id}.{ext}"
                            blob = img.blob
                            pix = pymupdf.Pixmap(blob)
                            if pix.alpha and ext == "jpg":
                                pix = pymupdf.Pixmap(pix, 0)
                            if pix.width > 1100:
                                pix = pymupdf.Pixmap(pix, 1100, int(pix.height * 1100 / pix.width))
                            if ext == "jpg":
                                pix.save(str(img_dir / name), jpg_quality=65)
                            else:
                                pix.save(str(img_dir / name))
                            stats["images"] += 1
                            body_lines.append(f"\n![Slide {n} figure]({img_url}/{name})\n")
                    except Exception as e:
                        print("img err", e, file=sys.stderr)
                    continue
                if sh.has_text_frame:
                    is_body = getattr(sh, "is_placeholder", False)
                    for p in sh.text_frame.paragraphs:
                        t = fix("".join(r.text for r in p.runs))
                        if not t or re.fullmatch(r"\d{1,2}|Section \d+", t):
                            continue
                        sizes_ = [r.font.size.pt for r in p.runs if r.font.size]
                        sz = max(sizes_) if sizes_ else 0
                        bold = any(r.font.bold for r in p.runs)
                        cands.append((sz, t))
                        lvl = p.level or 0
                        if t.startswith("- "):
                            t = t[2:]
                        if (bold or sz >= 20) and len(t) < 80:
                            body_lines.append("")
                            body_lines.append(f"**{t}**")
                            body_lines.append("")
                        elif is_body or lvl > 0 or len(t) < 140:
                            body_lines.append("  " * lvl + "- " + t)
                        else:
                            body_lines.append("")
                            body_lines.append(t)
                            body_lines.append("")

        walk(slide.shapes)
        if not title and cands:
            big = max(cands, key=lambda c: c[0])
            if big[0] >= 18 and len(big[1]) < 90:
                title = big[1]
                body_lines = [b for b in body_lines if b not in (f"**{title}**", f"- {title}")]
        if not title and not body_lines:
            continue
        heading = title or f"Slide {n}"
        if heading == seen_titles:
            heading = f"{heading} (cont.)"
        else:
            seen_titles = heading
        out.append(f"### {heading}"); out.append("")
        out.extend(body_lines); out.append("")
        if slide.has_notes_slide:
            notes = fix(slide.notes_slide.notes_text_frame.text.replace("\n", " "))
            if len(notes) > 20:
                out.append(f"> {notes}"); out.append("")


def docx_to_md(path):
    import docx
    d = docx.Document(str(path))
    body = d.element.body
    for child in body.iterchildren():
        tag = child.tag.split("}")[1]
        if tag == "p":
            p = docx.text.paragraph.Paragraph(child, d)
            t = fix(p.text)
            if not t:
                continue
            st = (p.style.name or "").lower()
            if st.startswith("heading 1") or st == "title":
                out.append(f"## {t}")
            elif st.startswith("heading"):
                out.append(f"### {t}")
            elif "list" in st:
                out.append(f"- {t}")
            else:
                out.append(t)
            out.append("")
        elif tag == "tbl":
            tbl = docx.table.Table(child, d)
            rows = [[fix(c.text.replace("\n", " ")).replace("|", "\\|") for c in r.cells] for r in tbl.rows]
            if rows:
                n_ = max(len(r) for r in rows)
                out.append("| " + " | ".join(rows[0]) + " |"); out.append("|" + "---|" * n_)
                out.extend("| " + " | ".join(r + [""] * (n_ - len(r))) + " |" for r in rows[1:]); out.append("")


def image_to_md(path):
    name = f"{stem}.jpg"
    pix = pymupdf.Pixmap(str(path))
    if pix.width > 1300:
        pix = pymupdf.Pixmap(pix, 1300, int(pix.height * 1300 / pix.width))
    pix.save(str(img_dir / name), jpg_quality=70)
    stats["images"] += 1; stats["scanned"] += 1; stats["pages"] = 1
    out.append(f"![{src.stem}]({img_url}/{name})")


ext = src.suffix.lower()
if ext == ".pdf":
    pdf_to_md(src)
elif ext == ".pptx":
    pptx_to_md(src)
elif ext == ".docx":
    docx_to_md(src)
elif ext in (".jpg", ".jpeg", ".png"):
    image_to_md(src)

md = "\n".join(out)
md = re.sub(r"(^- .*)\n\n(?=- )", r"\1\n", md, flags=re.M)
md = re.sub(r"(^- .*)\n\n(?=- )", r"\1\n", md, flags=re.M)
md = re.sub(r"\n{3,}", "\n\n", md).strip() + "\n"
stats["chars"] = len(md)
out_md.write_text(md, encoding="utf-8")
print(json.dumps(stats))
