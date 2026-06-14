#!/usr/bin/env python3
import sys
from bs4 import BeautifulSoup
from migrate_to_v2 import remove_style_block, strip_drawer_inline_styles, reorder_translation_before_arabic

def preview_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    soup = BeautifulSoup(original, "html.parser")
    
    # Apply your migration changes in memory
    remove_style_block(soup)
    strip_drawer_inline_styles(soup)
    reorder_translation_before_arabic(soup)

    # Serialize the output string
    updated = soup.encode(formatter="minimal").decode("utf-8")
    
    print("=================== PRINTING TRANSFORMED HTML PREVIEW ===================")
    print(updated)
    print("=========================================================================")

if __name__ == "__main__":
    # Replace this path with the exact file you want to inspect
    target_file = "start and end of day/2_bismillahiladhi_layadurru.html"
    preview_file(target_file)