#!/usr/bin/env python3
"""Valida a integridade do site estático em docs/ antes do empacotamento do Pages.

Confere os arquivos obrigatórios e cada ativo local referenciado em
docs/index.html e README.md (ícones, screenshots e demais arquivos do site).
Arquivos ausentes ou vazios fazem o step falhar.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PAGES_ORIGIN = "https://regardgames.github.io/pontinhos/"
ASSET_SUFFIXES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".svg",
    ".ico",
    ".css",
    ".js",
    ".html",
    ".md",
}
REQUIRED = (
    "docs/index.html",
    "docs/privacy-policy.html",
    "docs/.nojekyll",
    "docs/store-assets/MANIFEST.md",
)
REQUIRED_ICONS = (
    "docs/store-assets/play-store-icon-512x512.png",
    "docs/store-assets/app-store-icon-1024x1024.png",
)
ATTR_RE = re.compile(
    r"""(?:src|href|content)\s*=\s*["']([^"']+)["']""",
    re.IGNORECASE,
)
MD_IMG_RE = re.compile(r"""!\[[^\]]*\]\(([^)]+)\)""")
MD_LINK_RE = re.compile(r"""\[[^\]]*\]\(([^)]+)\)""")


def to_local(raw: str, base: Path, errors: list[str]) -> Path | None:
    candidate = raw.strip().strip("<>")
    if not candidate:
        return None
    candidate = candidate.split()[0]
    if candidate.startswith(("#", "mailto:", "data:", "javascript:")):
        return None
    if candidate.startswith(PAGES_ORIGIN):
        candidate = candidate[len(PAGES_ORIGIN) :]
        base = ROOT / "docs"
    elif candidate.startswith(("http://", "https://", "//")):
        return None

    candidate = candidate.split("#", 1)[0].split("?", 1)[0]
    if not candidate or Path(candidate).suffix.lower() not in ASSET_SUFFIXES:
        return None

    path = (base / candidate).resolve()
    try:
        path.relative_to(ROOT)
    except ValueError:
        errors.append(f"Referência fora do repositório: {raw}")
        return None
    return path


def harvest(text: str, base: Path, patterns: list[re.Pattern[str]], errors: list[str]) -> set[Path]:
    found: set[Path] = set()
    for pattern in patterns:
        for match in pattern.finditer(text):
            local = to_local(match.group(1), base, errors)
            if local is not None:
                found.add(local)
    return found


def check(path: Path, label: str, errors: list[str], checked: set[str]) -> None:
    if label in checked:
        return
    if not path.is_file():
        errors.append(f"Arquivo ausente: {label}")
        return
    if path.stat().st_size <= 0:
        errors.append(f"Arquivo vazio: {label}")
        return
    checked.add(label)
    print(f"OK {label} ({path.stat().st_size} bytes)")


def main() -> int:
    errors: list[str] = []
    checked: set[str] = set()

    for rel in REQUIRED:
        check(ROOT / rel, rel, errors, checked)

    index_path = ROOT / "docs" / "index.html"
    readme_path = ROOT / "README.md"
    if not index_path.is_file() or not readme_path.is_file():
        for error in errors:
            print(f"::error::{error}", file=sys.stderr)
        return 1

    refs = harvest(
        index_path.read_text(encoding="utf-8"),
        ROOT / "docs",
        [ATTR_RE],
        errors,
    )
    refs |= harvest(
        readme_path.read_text(encoding="utf-8"),
        ROOT,
        [ATTR_RE, MD_IMG_RE, MD_LINK_RE],
        errors,
    )

    icons: list[str] = []
    screenshots: list[str] = []
    referenced: set[str] = set()
    for path in sorted(refs):
        label = path.relative_to(ROOT).as_posix()
        referenced.add(label)
        check(path, label, errors, checked)
        lower = label.lower()
        if lower.endswith(".png") and "icon" in lower:
            icons.append(label)
        if lower.endswith(".png") and "screenshot" in lower:
            screenshots.append(label)

    for icon in REQUIRED_ICONS:
        if icon not in referenced:
            errors.append(f"Ícone oficial não referenciado em docs/index.html ou README.md: {icon}")

    if not icons:
        errors.append("Nenhum ícone local referenciado em docs/index.html ou README.md.")
    if not screenshots:
        errors.append("Nenhum screenshot local referenciado em docs/index.html ou README.md.")

    print(f"Arquivos íntegros: {len(checked)}")
    print(f"Ícones referenciados: {len(icons)}")
    print(f"Screenshots referenciados: {len(screenshots)}")

    if errors:
        for error in errors:
            print(f"::error::{error}", file=sys.stderr)
        return 1

    print("Integridade de docs/ confirmada.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

