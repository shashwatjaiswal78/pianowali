# Piano Made Easy for Beginners — landing site

A single-page, conversion-focused landing site for Simran's beginner piano
course. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

---

## Where the content lives

**Everything provisional is in [`content/site.ts`](content/site.ts).** Copy,
stats, curriculum, testimonials, pricing, FAQ, image paths and every CTA link
resolve from that one file. Components read from it and hold no copy of their
own, so updating the site after the real assets arrive means editing one file.

All copy on the page is Simran's own. Fields marked `TODO` are the ones still
outstanding.

### Before launch

| # | What's needed | Where it goes |
|---|---|---|
| 1 | **Razorpay payment link** for the Enroll now buttons | `cta.primaryHref` |
| 2 | A longer intro for the About section, if wanted (YouTube ID) | `about.videoId` |
| 3 | Photography — portrait 3:4, teaching shots | `images` |
| 4 | Parental consent for each student video (several are children); written reviews, with permission to use names | `testimonials.videos`, `testimonials.items` |
| 5 | **Terms & Policies page** (`/policies`): address and jurisdiction city — they show in [brackets] until filled; confirm the access timing with Simran; have the text reviewed | `content/policies.ts` |
| 6 | YouTube channel, if there is one to link | `footer.socials` |

### A standing rule about claims

Every figure on the page is one Simran supplied: 8+ years playing, 3+ years
teaching, 100+ students, 23 lessons, ages 4 to 65. **Do not add star ratings,
learner counts, completion rates, or a money-back guarantee unless they are
real.** These values also feed the `Course` structured data in
`app/layout.tsx`, where an invented `aggregateRating` is something search
engines penalise, on top of being untrue.

The students section shows five progress videos (`testimonials.videos`).
Written reviews go in `testimonials.items` and appear as quote cards under the
videos — no other change needed. There are deliberately no star ratings.

### Video

The originals are in `Video Assets.zip`. The web copies in `public/videos/`
were re-encoded on this Mac with AVFoundation (H.264 + AAC, fast-start):

| File | Used in | Encode |
|---|---|---|
| `course-intro.mp4` | Course card — muted loop with pause and sound buttons | 1280×720, 30fps, ~2Mbps, 1.9MB |
| `students/student-1…5.mp4` | Students section — click-to-play wall | 832×464, 30fps, 900kbps, 5–13MB |

`student-3` came in as a vertical file with the landscape clip letterboxed in
the middle; it is cropped to the same 16:9 frame as the rest. Posters (one
frame from each) are in `public/images/posters/`. Nothing in the wall loads
until a tile is pressed, and only one clip plays at a time. The course clip
plays only while on screen and never starts by itself under reduced motion.

**Every "Enroll now" button** — hero, course, pricing, closing band, nav, mobile
menu and the sticky bar — reads from `cta.primaryHref`. Enrolment will run
through Razorpay (Simran is applying); until that link exists it opens WhatsApp
as a demo stand-in. When Razorpay is live, paste the payment link into
`cta.primaryHref` — nothing else changes.

Question links (FAQ "Ask a question", the mobile menu, the footer's WhatsApp
icon and "Message on WhatsApp") use `contact.whatsappHref` instead, so they keep
going to WhatsApp after enrolment moves to Razorpay.

**The launch offer** — ₹999, down from ₹1,499, for the first 100 enrollments —
lives in `pricing.price`, `pricing.originalPrice` and `pricing.offer`. Once the
100 are taken, set `price` back to `"1,499"` and `offer` to `null`: the card,
the sticky bar and the `Course` structured data all return to a single price.

### Images

Placeholders are Unsplash URLs, allowlisted in
[`next.config.ts`](next.config.ts). To swap in real photography, drop files into
`public/images/` and change each `src` in the `images` object to a local path
(`/images/hero-portrait.jpg`). The aspect ratios are fixed by the components, so
nothing else needs to change, and the `remotePatterns` allowlist can then be
deleted.

---

## Design system

All tokens are declared once, in the `@theme` block of
[`app/globals.css`](app/globals.css). No hex value appears anywhere else.

| Token | Value | Used for |
|---|---|---|
| `navy` | `#0D101B` | Header, hero, closing band, footer |
| `lavender` | `#F3F2FA` | Page background and alternating sections |
| `rose` | `#F5225B` | Brand accent — display text, icons, fills |
| `burgundy` | `#421F2A` | Announcement bar, the audience section |
| `gold` | `#F4C84D` | Star ratings, accents on dark sections |

Sections alternate `navy → lavender → white → lavender → burgundy → lavender →
white → navy`, which is what keeps a long page from reading as one flat band.

### The rose variants, and why they exist

Brand rose is **3.99:1** against white and **3.59:1** against lavender. That
clears the 3:1 bar for icons, borders and fills, and for display-size headings,
but *not* the 4.5:1 bar for small text. Rather than compromise the brand or the
accessibility requirement, interactive surfaces use slightly deeper variants:

| Token | Value | Contrast |
|---|---|---|
| `rose-cta` | `#E01050` | White text on it — 4.82:1 |
| `rose-hover` | `#C90A45` | White text on it — 5.81:1 |
| `rose-text` | `#D40D47` | On lavender 4.79:1, on white 5.32:1 |

The shift is barely perceptible; the compliance is not. Use `rose` for fills,
icons and display text; `rose-cta` for anything carrying white text;
`rose-text` for rose text set small.

### Typography

Manrope carries everything — headings at 700–800, body at 400–500. Fraunces
italic appears in exactly one role: the small eyebrow label above each section,
borrowing the idiom of an engraved tempo marking on sheet music. Sizes are
`clamp()`-driven from `--text-display` down to `--text-micro`.

### The hero collage

The hero is a torn-paper editorial collage rather than a photo in a frame:

- **The cut-out** (`public/images/simran-cutout.png`) is generated by
  [`scripts/cutout.py`](scripts/cutout.py) from Simran's source photograph. The
  script strips the smooth white sticker outline the source arrived with, then
  rebuilds a hand-torn cream paper edge by perturbing a distance field with
  two scales of noise — long calm runs with occasional angular bites. Paper
  grain and a soft contact shadow finish it. **Re-run that script on any
  replacement photo**; dropping in a raw PNG will not match the collage.
- **The background layers** (`components/ui/PaperCollage.tsx`) are generated by
  [`scripts/fragments.py`](scripts/fragments.py). Two large torn fragments,
  every edge perturbed so none has a straight side, each with a faint light
  edge so it reads as paper. They are dark on purpose: the cut-out carries its
  own cream edge, and a big cream shape behind her swallows it. The collage is
  mounted in the region *below* the headline, so it can never sit behind the
  type at any width. (The script's small cream corner piece is left out.)
- **The bottom edge** (`components/ui/TornEdge.tsx`) tears the navy hero away
  to reveal the lavender section beneath.

One constraint worth keeping: nothing sits behind the headline. And if paper
grain ever comes back, confine it to a small shape and clip the noise to it
(`feComposite in2="SourceAlpha"`) — `feTurbulence` fills its whole filter box
otherwise, and over a full-bleed path it costs ~200ms on a throttled phone.

### The keybed

[`components/ui/Keybed.tsx`](components/ui/Keybed.tsx) draws a piano keybed
entirely in CSS gradients — one octave is 112px, seven white keys at 16px, with
the five black keys straddling the boundaries and the wide gap where E and F
meet. Under the header it doubles as the scroll-progress indicator: the rose
fill advances across the keys as you move down the page. There it uses the
`muted` tone (dark unplayed keys) so the progress fill is what the eye reads,
not a black-and-white barcode. It reappears, full contrast, as the divider
above the footer.

The announcement bar scrolls away with the page: once scrolled, the header
slides up by the bar's height and only the nav and keybed stay pinned
(`--header-pinned` in `globals.css`, which anchor jumps clear).

---

## Structure

```
app/
  layout.tsx     fonts, metadata, Course + Person JSON-LD, skip link
  page.tsx       composes the seven sections in order
  globals.css    design tokens, base styles, reveal animation, reduced motion
  icon.png       favicon — the SJ monogram (apple-icon.png for iOS)

content/site.ts  ← all copy, data and links

components/
  ui/            Button CtaContent Container Eyebrow SectionHeading Accordion
                 LoopVideo ModuleGrid PriceLine VideoFacade VideoWall Reveal
                 Keybed
                 BrandIcon
  layout/        Header Footer StickyCTA Wordmark
  sections/      Hero About Course CourseDetail Curriculum Audience
                 Testimonials Convert
```

| Section | Contents |
|---|---|
| Hero | Centred headline, portrait; copy, CTA and price left; credentials right (from xl) |
| About | Intro video (once `about.videoId` is set), bio, pull quote, four-stat band |
| Course | Promise and outcomes left; course card right, led by Simran's intro clip |
| CourseDetail | What's included · why it works |
| Curriculum | Four solid colour blocks, one per module; each opens its lesson list |
| Audience | Two matched cards: who it's for (outlined), what you'll achieve (gold) |
| Testimonials | Student progress video wall, then written reviews when there are some |
| Convert | ₹999 launch price (₹1,499 struck through), FAQ, closing CTA |

The curriculum renders through `ModuleGrid`: four blocks in rose, navy, gold
and burgundy, alternating light and dark. Clicking one drops its lessons open
beneath it — directly under the block on small screens, and as a full-width
panel under the row of four from `lg`. Lessons are numbered 1–23 across the
course. The FAQ uses the simpler `Accordion`.

---

## Accessibility and performance

Verified against the production build:

| | Desktop | Mobile |
|---|---|---|
| Performance | 100 | 95 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

CLS 0, TBT 40ms. LCP is 0.6s on desktop and 2.9s on the mobile preset, where
the hero cut-out is the LCP element — it is preloaded and served as a 7KB AVIF
at phone widths.

- Semantic landmarks, one `h1`, no heading-level skips, a skip link.
- `Course`, `Person` and `FAQPage` structured data, containing only real claims.
- Every interactive element has a visible focus ring — rose on light sections,
  gold on dark, switched by the `.on-dark` class. Focus indication is excluded
  from transitions so it appears instantly.
- Tab order matches visual order; the accordion is a proper
  `aria-expanded` / `aria-controls` disclosure; the mobile menu is a labelled
  modal dialog — everything behind it is made `inert` while it is open, Escape
  closes it, page scroll is locked, and focus returns to the menu button.
- Touch targets are 44px in the header, footer and menu. The one exception is
  the announcement-bar link, held to the bar's 36px height (WCAG 2.5.8 asks
  for 24px).
- No horizontal scroll at 320px.
- The YouTube player is a click-to-load facade, so no third-party iframe sits on
  the critical path.

### Motion

Scroll reveals are **CSS-only**, via `animation-timeline: view()`, and content
is visible by default — the animation is layered on top only where the browser
supports it. An earlier IntersectionObserver version left blocks stuck at
`opacity: 0` when the observer didn't fire; content is never gated behind an
animation now. Everything is disabled under
`@media (prefers-reduced-motion: reduce)`.

The stat figures don't count up. A credibility number that reads "6+" for the
second it is animating is, for that second, a wrong claim — so they render as
the real figure from the first frame.
