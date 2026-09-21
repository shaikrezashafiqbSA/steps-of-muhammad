"""Generate PWA icons from assets/black-flag-nur.jpeg.

Outputs into assets/icons/:
  icon-192.png          standard 192x192
  icon-512.png          standard 512x512
  icon-maskable-512.png 512x512 with 20% safe-zone padding (maskable)
  apple-touch-icon.png  180x180 (iOS home screen)
  favicon-48.png        48x48
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "black-flag-nur.jpeg"
OUT = ROOT / "assets" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

img = Image.open(SRC).convert("RGB")
w, h = img.size

def square_crop(im: Image.Image, ratio: float = 1.0) -> Image.Image:
    """Center-crop to a square, `ratio` < 1 zooms into the middle."""
    w0, h0 = im.size
    side = int(min(w0, h0) * ratio)
    left = (w0 - side) // 2
    top = (h0 - side) // 2
    return im.crop((left, top, left + side, top + side))

# Standard icons: full-bleed square crop (subject fills the frame nicely)
for size, name in [(192, "icon-192.png"), (512, "icon-512.png")]:
    square_crop(img).resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)

# Maskable: content shrunk into the inner ~72% so circular/squircle masks don't clip it.
# Achieved by cropping tighter (zoom) and pasting onto a blurred extension of the image.
mask_size = 512
inner = int(mask_size * 0.72)          # visible content zone
zoomed = square_crop(img, ratio=0.62).resize((inner, inner), Image.LANCZOS)
# Background: heavily blurred, darkened version of the same image fills the whole canvas
bg = square_crop(img).resize((mask_size, mask_size), Image.LANCZOS)
bg = bg.filter(__import__("PIL.ImageFilter", fromlist=["GaussianBlur"]).GaussianBlur(24))
from PIL import ImageEnhance
bg = ImageEnhance.Brightness(bg).enhance(0.75)
canvas = bg.copy()
canvas.paste(zoomed, ((mask_size - inner) // 2, (mask_size - inner) // 2))
canvas.save(OUT / "icon-maskable-512.png", optimize=True)

# iOS apple-touch-icon: 180x180, iOS adds its own rounding; opaque bg required (already RGB)
square_crop(img, ratio=0.9).resize((180, 180), Image.LANCZOS).save(
    OUT / "apple-touch-icon.png", optimize=True)

# favicon
square_crop(img).resize((48, 48), Image.LANCZOS).save(OUT / "favicon-48.png", optimize=True)

print("icons written to", OUT)
for p in sorted(OUT.iterdir()):
    print(f"  {p.name:26s} {p.stat().st_size:8d} bytes")
