#!/usr/bin/env python3
"""
migrate_to_v2.py — Dua HTML Migration: v7.x → v8.0 / CSS v2.1
===============================================================
Applies three changes to every dua .html file in the repository:

  1. Removes the embedded <style> block from <head>
     (now centralized in dua-core.css)

  2. Strips all inline style="" attributes from inside #narrationDrawer
     (now handled by .narration-drawer .xxx CSS selectors)

  3. Reorders DOM: moves .translation BEFORE .arabic-line in every
     .verse-block (frontstage AND drawer), so English primes first.

USAGE
-----
  # Dry run — preview what would change, writes nothing:
  python3 migrate_to_v2.py --dry-run

  # Live run — rewrites files in place:
  python3 migrate_to_v2.py

  # Target a specific folder only:
  python3 migrate_to_v2.py --dir ./duas

SAFETY
------
  Always run on a clean git branch. Review `git diff` before merging.
  The script skips: index.html, 404.html, and any file outside <body>.
"""

import os
import sys
import argparse
from bs4 import BeautifulSoup, Comment

# ── Files to always skip ──────────────────────────────────────────────────────
SKIP_FILES = {"index.html", "404.html", "_site"}

# ── Change counters ───────────────────────────────────────────────────────────
stats = {"files_scanned": 0, "files_changed": 0, "style_blocks": 0,
         "inline_styles": 0, "reorders": 0}


def is_dua_page(soup):
    """Only process pages that have our verse-block structure."""
    return bool(soup.find(class_="verse-block"))


def remove_style_block(soup):
    """
    Change 1: Remove the embedded <style> block from <head>.
    Only removes blocks that contain narration drawer rules.
    Leaves any other <style> blocks untouched (shouldn't exist, but safe).
    """
    removed = 0
    for style_tag in soup.find_all("style"):
        text = style_tag.get_text()
        if ".narration-drawer" in text or ".narration-tab" in text:
            style_tag.decompose()
            removed += 1
    return removed


def strip_drawer_inline_styles(soup):
    """
    Change 2: Remove all inline style="" attributes from every element
    inside #narrationDrawer. These are now handled by CSS.
    """
    removed = 0
    drawer = soup.find(id="narrationDrawer")
    if not drawer:
        return 0
    for tag in drawer.find_all(style=True):
        del tag["style"]
        removed += 1
    return removed


def reorder_translation_before_arabic(soup):
    """
    Change 3: In every .verse-block, move .translation to appear BEFORE
    the first .arabic-line. Applies to both frontstage and drawer blocks.

    Old order: .arabic-line(s) → .translation
    New order: .translation → .arabic-line(s)
    """
    reorders = 0
    for verse_block in soup.find_all(class_="verse-block"):
        # Direct children only — don't recurse into nested blocks
        children = list(verse_block.children)

        # Find the first .arabic-line and the .translation among direct children
        first_arabic = None
        translation = None

        for child in children:
            if not hasattr(child, "get"):
                continue  # skip NavigableString (whitespace nodes)
            classes = child.get("class", [])
            if "arabic-line" in classes and first_arabic is None:
                first_arabic = child
            if "translation" in classes:
                translation = child

        # Only reorder if translation currently comes AFTER first arabic-line
        if not first_arabic or not translation:
            continue

        # Check their positions in the parent
        all_tags = [c for c in children if hasattr(c, "get")]
        try:
            arabic_pos = all_tags.index(first_arabic)
            trans_pos = all_tags.index(translation)
        except ValueError:
            continue

        if trans_pos > arabic_pos:
            # Extract translation from its current position and insert before arabic-line
            translation.extract()
            first_arabic.insert_before(translation)
            reorders += 1

    return reorders


def migrate_file(filepath, dry_run=False):
    """Process a single HTML file. Returns True if changes were made."""
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    soup = BeautifulSoup(original, "html.parser")

    if not is_dua_page(soup):
        return False

    c1 = remove_style_block(soup)
    c2 = strip_drawer_inline_styles(soup)
    c3 = reorder_translation_before_arabic(soup)

    if c1 + c2 + c3 == 0:
        return False

    # Serialise — use original formatter to minimise whitespace noise
    updated = soup.encode(formatter="minimal").decode("utf-8")

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(updated)

    stats["style_blocks"] += c1
    stats["inline_styles"] += c2
    stats["reorders"] += c3
    stats["files_changed"] += 1

    action = "[DRY RUN]" if dry_run else "[UPDATED]"
    print(f"  {action} {filepath}")
    if c1: print(f"           → removed {c1} <style> block(s)")
    if c2: print(f"           → stripped {c2} inline style= attribute(s)")
    if c3: print(f"           → reordered translation in {c3} verse-block(s)")

    return True


def walk_repo(root_dir, dry_run=False):
    """Walk all subdirectories and process every .html file."""
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Skip hidden dirs and common non-dua folders
        dirnames[:] = [
            d for d in dirnames
            if not d.startswith(".")
            and d not in SKIP_FILES
            and d != "node_modules"
        ]

        for filename in filenames:
            if not filename.endswith(".html"):
                continue
            if filename in SKIP_FILES:
                continue

            filepath = os.path.join(dirpath, filename)
            stats["files_scanned"] += 1
            migrate_file(filepath, dry_run=dry_run)


def main():
    parser = argparse.ArgumentParser(
        description="Migrate dua HTML files from v7.x to v8.0 / CSS v2.1"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without writing any files"
    )
    parser.add_argument(
        "--dir",
        default=".",
        help="Root directory to scan (default: current directory)"
    )
    args = parser.parse_args()

    mode = "DRY RUN — no files will be written" if args.dry_run else "LIVE — files will be rewritten"
    print(f"\n{'='*55}")
    print(f"  Dua HTML Migration Script  |  {mode}")
    print(f"  Scanning: {os.path.abspath(args.dir)}")
    print(f"{'='*55}\n")

    walk_repo(args.dir, dry_run=args.dry_run)

    print(f"\n{'─'*55}")
    print(f"  Files scanned  : {stats['files_scanned']}")
    print(f"  Files changed  : {stats['files_changed']}")
    print(f"  <style> removed: {stats['style_blocks']}")
    print(f"  Inline stripped: {stats['inline_styles']}")
    print(f"  DOM reorders   : {stats['reorders']}")
    if args.dry_run:
        print(f"\n  Run without --dry-run to apply changes.")
    else:
        print(f"\n  Done. Run `git diff` to review before committing.")
    print(f"{'─'*55}\n")


if __name__ == "__main__":
    main()