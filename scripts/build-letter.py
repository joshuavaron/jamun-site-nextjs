#!/usr/bin/env python3
"""Render lilly-endowment-letter-of-interest.md to a print-ready PDF.

Uses WeasyPrint with a small inline Markdown converter — the input file has a
stable structure (letterhead, date, recipient, salutation, body paragraphs,
signature), so a full Markdown library is overkill.

Usage:
    python3 scripts/build-letter.py
    # writes lilly-endowment-letter-of-interest.pdf next to the .md file
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

from weasyprint import CSS, HTML

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "lilly-endowment-letter-of-interest.md"
OUT = ROOT / "lilly-endowment-letter-of-interest.pdf"

LINE_HEIGHT = float(os.environ.get("LETTER_LINE_HEIGHT", "1.34"))
PARA_SPACING = float(os.environ.get("LETTER_PARA_SPACING", "0.70"))


def md_to_html_body(md: str) -> str:
    # Strip the editor-only H1 title and the horizontal rule that follows it.
    md = re.sub(r"\A#[^\n]*\n+", "", md)
    md = re.sub(r"\A-{3,}\s*\n+", "", md)

    # Inline bold.
    def bold_sub(text: str) -> str:
        return re.sub(r"\*\*([^*\n]+)\*\*", r"<strong>\1</strong>", text)

    blocks = re.split(r"\n\s*\n", md.strip())
    html_parts: list[str] = []
    for raw in blocks:
        block = raw.strip("\n")
        if not block.strip():
            # An empty block (e.g. the gap left for a handwritten signature)
            # renders as vertical space.
            html_parts.append('<div class="sig-space"></div>')
            continue
        lines = block.split("\n")
        if all(line.lstrip().startswith("- ") for line in lines):
            items = "".join(
                f"<li>{bold_sub(line.lstrip()[2:])}</li>" for line in lines
            )
            html_parts.append(f"<ul>{items}</ul>")
        elif len(lines) == 1:
            html_parts.append(f"<p>{bold_sub(lines[0])}</p>")
        else:
            joined = "<br>".join(bold_sub(line) for line in lines)
            html_parts.append(f'<p class="block">{joined}</p>')
    return "\n".join(html_parts)


PAGE_CSS = f"""
@page {{
    size: Letter;
    margin: 0.75in 0.9in;
}}

html, body {{
    font-family: "Iowan Old Style", "Palatino Linotype", "Palatino", "Georgia", serif;
    font-size: 11pt;
    line-height: {LINE_HEIGHT};
    color: #111;
}}

p {{
    margin: 0 0 {PARA_SPACING}em 0;
    text-align: left;
    orphans: 2;
    widows: 2;
}}

p.block {{
    margin: 0 0 {PARA_SPACING}em 0;
    line-height: {max(LINE_HEIGHT - 0.07, 1.2):.3f};
}}

p strong {{
    font-weight: 600;
}}

ul {{
    margin: 0 0 {PARA_SPACING}em 0;
    padding-left: 1.3em;
}}

li {{
    margin: 0 0 {PARA_SPACING * 0.6:.3f}em 0;
    padding-left: 0.2em;
}}

li:last-child {{
    margin-bottom: 0;
}}

li strong {{
    font-weight: 600;
}}

div.sig-space {{
    height: 1.8em;
}}
"""


def build() -> None:
    if not SRC.exists():
        sys.exit(f"error: source file not found: {SRC}")

    md = SRC.read_text(encoding="utf-8")
    body_html = md_to_html_body(md)
    doc = f"<!doctype html><html><head><meta charset='utf-8'></head><body>{body_html}</body></html>"

    HTML(string=doc, base_url=str(ROOT)).write_pdf(
        target=str(OUT),
        stylesheets=[CSS(string=PAGE_CSS)],
    )
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
