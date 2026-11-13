# Library builder

Converts the Semester 3 course folder (PDF / PPTX / DOCX / JPEG) into the markdown
documents and images served from `public/reading/`, and regenerates
`src/data/libraryIndex.ts`.

```bash
python -m venv .venv
.venv/Scripts/pip install pymupdf python-pptx python-docx   # Windows
# .venv/bin/pip install pymupdf python-pptx python-docx     # macOS / Linux

python scripts/library/build_library.py "<path to SEM 3 FINAL RUN>" "<project root>" "<path to .venv python>" scripts/library
```

- `guide2md.py` handles the five *Complete Study Guide* PDFs (headings, tables, code, diagrams).
- `src2md.py` handles lecture slides, notes, tutorials, Word docs and images. Pages without a
  text layer (handwritten scans) are exported as page images. Pass `pages` as the 5th
  argument to force page-image mode (used for formula-heavy CONMP tutorials).
- Subjects and their folders are listed at the top of `build_library.py`.
