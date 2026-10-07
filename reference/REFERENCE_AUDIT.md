# Yamato reference audit — Café 1809 adaptation

Primary reference inspected: https://yamatorestaurant.hu/en/  
Hungarian: https://yamatorestaurant.hu/hu_hu/

Inspection date: 2026-10-06  
Viewports used: 1440×900 (primary capture), plus responsive review intent at 1024 / 820 / 390 / 360.

---

## VERIFIED FROM REFERENCE

Observations recorded from the live Yamato English homepage (accessibility snapshot + screenshot):

1. **Header** — Compact bar with logo left, orange hamburger control, and a prominent orange “Booking” CTA. Stays present over dark photographic content.
2. **Hero / dining-mode discovery** — Four tall vertical photographic panels spanning the viewport. Active/hovered panel is bright with a serif title (“Table Grill”) and a solid orange “Read more” button; inactive panels stay darkened.
3. **Experience labelling** — Distinct dining styles presented early (Table Grill, Japanese Yakiniku / BBQ-style grilling, Korean BBQ–adjacent imagery, sushi / à la carte platter).
4. **Photography language** — Top-down shared table, hands pouring / grilling, guest lifestyle shots, large sushi platters — experience-led rather than ecommerce product grids.
5. **Colour system on reference** — Near-black surfaces, white type, strong orange/red-orange interactive accents. (Café 1809 intentionally does **not** copy this palette.)
6. **Content rhythm** — Mode discovery → featured food storytelling → signature “Table Grill” explanation → interactive dining categories → menu density → values / atmosphere → delivery / gift / membership patterns → reservation / visit closing.
7. **Footer presence** — Language control and closing brand chrome; social / contact patterns present on the live site.
8. **Mobile** — Compact header with booking remains; vertical panels collapse into stacked discovery rather than tiny dropdown-only navigation.

Capture saved under `reference/captures/` when available from the browser session (`yamato-hero-1440.png`).

---

## REFERENCE-INSPIRED

Patterns recreated independently for Café 1809 (brunch café, Glen Waverley — not a table-grill restaurant):

| Yamato pattern | Café 1809 adaptation |
| --- | --- |
| Vertical dining-mode panels | `ExperienceModes` — Morning Brunch / Coffee Lounge / Shared Table / À La Carte |
| Signature Table Grill story | `TableGrillStory` → Brunch Signature Story for **1809 Breaky** |
| Interactive dining categories | `InteractiveExperiences` plate / experience builder UI |
| Culinary journey messaging | `CulinaryJourney` day-part chapters (7:30 → close) |
| Featured food stage | `FeaturedShowcase` editorial dish portal |
| Menu discovery with categories | `MenuDiscovery` using Uber Eats menu data |
| Atmosphere gallery | `AtmosphereGallery` editorial frames |
| Gift + membership | `GiftMembership` (membership labelled concept preview) |
| Reservation / visit close | `ReservationVisit` demo-only form |
| Cinematic footer | `SiteFooter` with Instagram + Facebook when supplied |

Motion language inspired by Yamato’s panel expand / dim inactive modes, strong food photography framing, and scroll-driven scene changes — implemented with GSAP/ScrollTrigger and an independent Midnight Ink / Rice Paper / Ultramarine / Persimmon palette.

---

## NEW MODERN ENHANCEMENT

Effects introduced by the Café 1809 brief (not claimed as Yamato measurements):

- Named frame system: aperture, shutters, asymmetric, porcelain, portal, split, cinematic, grid, masked, outlined
- Documented scene handoffs in `lib/sceneTransitions.js` with brass seam draw
- `?motionDebug=1` development debugger
- Custom line/word split utility (`lib/splitText.js`) instead of Club SplitText dependency
- Uber Eats–sourced menu prices with explicit delivery-price disclaimer
- Real Glen Waverley contact, hours, Instagram, Facebook in footer
- Reduced-motion matchMedia path that keeps content visible without large transforms

---

## Timing note

Exact Yamato easing curves and millisecond timings were **not** extracted from the live site. Implementation uses the approved default motion values in `lib/motionConfig.js` (heading ~0.85–1.05s `power3.out`, frames ~1.0–1.35s `power4.inOut`, etc.).
