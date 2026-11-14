"""Generate 1200x630 share images for each library subject and document.

usage: python scripts/library/og_images.py <project_root>
Writes public/og/<subject>.png and public/og/<subject>/<doc>.png. Requires PyMuPDF.
Uses Georgia / Segoe UI from C:/Windows/Fonts when available, else built-in fonts.
"""
import json, sys, pathlib, textwrap
import pymupdf

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
lib = json.loads((root / "public" / "reading" / "index.json").read_text(encoding="utf-8"))
out = root / "public" / "og"

W, H = 1200, 630
CREAM = (0xF6 / 255, 0xF1 / 255, 0xEA / 255)
INK = (0x20 / 255, 0x1B / 255, 0x16 / 255)
ACCENT = (0x97 / 255, 0x5A / 255, 0x30 / 255)
MUTED = (0x6F / 255, 0x66 / 255, 0x5D / 255)
LINE = (0xE8 / 255, 0xDF / 255, 0xD3 / 255)
FONTS = pathlib.Path("C:/Windows/Fonts")


def font(page, name, file, fallback):
    f = FONTS / file
    if f.exists():
        page.insert_font(fontname=name, fontfile=str(f))
        return name
    return fallback


def card(path, eyebrow, title, subtitle):
    doc = pymupdf.open()
    page = doc.new_page(width=W, height=H)
    page.draw_rect(page.rect, color=None, fill=CREAM)
    serif = font(page, "serif", "georgia.ttf", "tiro")
    serifi = font(page, "serifi", "georgiai.ttf", "tiit")
    sans = font(page, "sans", "segoeui.ttf", "helv")
    sansb = font(page, "sansb", "segoeuib.ttf", "hebo")

    page.draw_rect(pymupdf.Rect(80, 64, 120, 104), color=None, fill=INK, radius=0.22)
    page.insert_text((87, 92), "CL", fontname=serifi, fontsize=18, color=CREAM)
    page.insert_text((134, 92), "CampusLoop", fontname=sansb, fontsize=24, color=INK)
    page.insert_text((80, 168), eyebrow.upper(), fontname=sansb, fontsize=16, color=ACCENT)

    size = 66 if len(title) <= 34 else 56 if len(title) <= 52 else 46
    width = int(1040 / (size * 0.47))
    lines = textwrap.wrap(title, width=width)[:3]
    y = 168 + size * 1.25
    for ln in lines:
        page.insert_text((76, y), ln, fontname=serif, fontsize=size, color=INK)
        y += size * 1.12
    for ln in textwrap.wrap(subtitle, width=78)[:2]:
        y += 6
        page.insert_text((80, y + 18), ln, fontname=sans, fontsize=24, color=MUTED)
        y += 32
    page.draw_line((80, 540), (1120, 540), color=LINE, width=1.5)
    page.insert_text((80, 584), "Free to read online · itm-notes-new.vercel.app", fontname=sans, fontsize=20, color=INK)
    path.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(dpi=72).save(str(path))


n = 0
for s in lib:
    card(out / f"{s['slug']}.png", f"{s['short']} · Semester 3", s["name"],
         f"{len(s['docs'])} documents: complete study guide, unit notes, slides and papers.")
    n += 1
    for d in s["docs"]:
        unit = f" · Unit {d['unit']}" if d.get("unit") is not None else ""
        meta = f"{d['pages']} handwritten pages" if d.get("scanned") else f"{max(1, round(d['words'] / 200))} min read"
        card(out / s["slug"] / f"{d['slug']}.png", f"{s['short']} · {d['kind']}{unit}", d["title"], f"{s['name']} · {meta}")
        n += 1
print("generated", n, "share images")
