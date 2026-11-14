"""Convert library JPEG page images to WebP and update markdown links.

usage: python scripts/library/to_webp.py <project_root> [quality]
Keeps the JPEG only if the WebP would not be smaller. Requires Pillow.
"""
import re, sys, pathlib
from PIL import Image

root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
quality = int(sys.argv[2]) if len(sys.argv) > 2 else 62
reading = root / "public" / "reading"

before = after = converted = 0
renamed = {}
for jpg in sorted(reading.rglob("*.jpg")):
    webp = jpg.with_suffix(".webp")
    with Image.open(jpg) as im:
        im.save(webp, "WEBP", quality=quality, method=6)
    a, b = jpg.stat().st_size, webp.stat().st_size
    before += a
    if b < a:
        after += b
        jpg.unlink()
        renamed[jpg.name] = webp.name
        converted += 1
    else:
        after += a
        webp.unlink()

for md in reading.rglob("*.md"):
    text = md.read_text(encoding="utf-8")
    new = re.sub(r"(/img/)([^)\s]+\.jpg)\)", lambda m: m.group(1) + renamed.get(m.group(2), m.group(2)) + ")", text)
    if new != text:
        md.write_text(new, encoding="utf-8")

print(f"converted {converted} images: {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB")
