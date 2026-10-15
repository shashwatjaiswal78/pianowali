import numpy as np
from PIL import Image

SRC = "public/images/simran-hero.png"
OUT = "public/images/simran-cutout.png"
SCALE = 2                     # process at 2x so the torn edge carries fine detail
BORDER = 13 * SCALE           # nominal paper width
TEAR_AMP = 5 * SCALE          # how far the tear wanders either side of nominal
PAD = 40 * SCALE              # room for the paper to form on every side

rng = np.random.default_rng(20)

# ---------- morphology helpers (no scipy) ---------------------------------
def shift(a, dy, dx, fill=False):
    out = np.full_like(a, fill)
    ys = slice(max(0, dy), a.shape[0] + min(0, dy))
    yd = slice(max(0, -dy), a.shape[0] + min(0, -dy))
    xs = slice(max(0, dx), a.shape[1] + min(0, dx))
    xd = slice(max(0, -dx), a.shape[1] + min(0, -dx))
    out[yd, xd] = a[ys, xs]
    return out

N8 = [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]
def dilate(m): 
    o = m.copy()
    for dy,dx in N8: o |= shift(m,dy,dx)
    return o
def erode(m):
    o = m.copy()
    for dy,dx in N8: o &= shift(m,dy,dx,fill=True)
    return o

def dist_outside(mask, maxd):
    """Distance from `mask`, measured outward, capped at maxd."""
    d = np.full(mask.shape, np.inf, dtype=np.float32)
    d[mask] = 0.0
    cur = mask.copy()
    for i in range(1, maxd + 1):
        nxt = dilate(cur)
        ring = nxt & ~cur
        d[ring] = i
        cur = nxt
    return d

def dist_inside(mask, maxd):
    d = np.full(mask.shape, np.inf, dtype=np.float32)
    cur = mask.copy()
    for i in range(1, maxd + 1):
        nxt = erode(cur)
        ring = cur & ~nxt
        d[ring] = i
        cur = nxt
    d[cur] = maxd + 1
    return d

def value_noise(shape, cell, octaves=3):
    """Smooth multi-octave noise in roughly [-1, 1]."""
    h, w = shape
    total = np.zeros(shape, np.float32); amp = 1.0; norm = 0.0
    for o in range(octaves):
        c = max(2, cell >> o)
        gh, gw = max(2, h // c + 2), max(2, w // c + 2)
        g = rng.random((gh, gw), dtype=np.float32)
        up = np.array(Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), np.float32) / 255.0
        total += (up - 0.5) * 2.0 * amp
        norm += amp; amp *= 0.5
    return total / norm

# ---------- load & upscale -------------------------------------------------
im = Image.open(SRC).convert("RGBA")
im = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
canvas = Image.new("RGBA", (im.width + PAD * 2, im.height + PAD * 2), (0, 0, 0, 0))
canvas.paste(im, (PAD, PAD))
im = canvas
a = np.array(im)
rgb = a[..., :3].astype(np.float32)
alpha = a[..., 3].astype(np.float32) / 255.0

solid = alpha > 0.55

# ---------- strip the baked-in white sticker outline ----------------------
lum = rgb.mean(axis=2)
mx, mn = rgb.max(axis=2), rgb.min(axis=2)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)

din = dist_inside(solid, 40)
# the sticker ring: bright, low-saturation, and hugging the alpha boundary
ring = solid & (din <= 34) & (lum > 178) & (sat < 0.42)
# keep only the part connected to the edge by closing small holes in the test
ring = erode(dilate(dilate(ring)))
subject = solid & ~ring
for _ in range(2):                 # clean stray specks
    subject = dilate(erode(subject))

print("stripped ring px:", int(ring.sum()), f"({ring.sum()/solid.sum():.1%} of subject)")

# ---------- build the torn paper border -----------------------------------
maxd = BORDER + TEAR_AMP + 4
dout = dist_outside(subject, maxd)

# two noise scales: broad wander + fine fibre
wander = value_noise(subject.shape, 70 * SCALE, 2)   # long, calm excursions
nick   = value_noise(subject.shape, 16 * SCALE, 1)   # occasional angular tears
fibre  = value_noise(subject.shape, 4 * SCALE, 1)    # barely-there fibre
# Nicks only bite where the field is already high, so they read as isolated
# tears rather than an evenly fuzzy outline.
nick_b = np.clip(nick, 0, 1) ** 2.2
radius = (BORDER
          + wander * TEAR_AMP
          - nick_b * (5.0 * SCALE)
          + fibre * (0.9 * SCALE))

paper = dout <= radius
paper = dilate(erode(paper))       # close pinholes the noise may have opened

# anti-aliased coverage from the distance field
cover = np.clip(radius + 0.5 - dout, 0.0, 1.0)
cover[~paper & (dout > radius + 1)] = 0.0
paper_a = np.where(paper | (cover > 0), np.maximum(cover, paper.astype(np.float32)), 0.0)

# ---------- paper colour: warm ivory with grain ---------------------------
CREAM = np.array([245, 235, 214], np.float32)
grain = value_noise(subject.shape, 3, 2) * 5.0 + value_noise(subject.shape, 13, 2) * 6.0
speck = (rng.random(subject.shape, dtype=np.float32) - 0.5) * 4.5
paper_rgb = np.clip(CREAM[None, None, :] + (grain + speck)[..., None], 0, 255)

# the torn lip catches light unevenly: darken toward the outer edge
edge_t = np.clip((dout - (radius - 4 * SCALE)) / (4 * SCALE), 0, 1)
paper_rgb *= (1.0 - 0.06 * edge_t)[..., None]

# ---------- composite ------------------------------------------------------
subj_a = np.where(subject, alpha, 0.0)
subj_a = np.clip(subj_a, 0, 1)

# soft contact shadow so the photo sits ON the paper rather than beside it
sh = dist_outside(subject, 4 * SCALE)
shadow = np.clip(1.0 - sh / (4 * SCALE), 0, 1) ** 2.2
paper_rgb *= (1.0 - 0.11 * shadow)[..., None]

out_a = np.clip(paper_a + subj_a * (1 - paper_a) + subj_a, 0, 1)
out_rgb = paper_rgb * (1 - subj_a)[..., None] + rgb * subj_a[..., None]

res = np.dstack([np.clip(out_rgb, 0, 255), np.clip(out_a * 255, 0, 255)]).astype(np.uint8)
img = Image.fromarray(res)
bbox = img.getchannel("A").getbbox()
img = img.crop(bbox)
img.save(OUT, optimize=True)
print("saved", OUT, img.size)

# preview on navy
bg = Image.new("RGBA", img.size, (13, 16, 27, 255)); bg.alpha_composite(img)
bg.convert("RGB").save("/tmp/cutout-preview.png")
