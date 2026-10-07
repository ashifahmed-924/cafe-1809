# Café 1809

Premium animated static homepage for **Café 1809**, a neighbourhood brunch café at 34 Willow Ave, Glen Waverley VIC 3150.

Built with **Next.js 14** (App Router, `output: 'export'`), **React 18**, **Tailwind CSS 3**, **GSAP** + `@gsap/react`, and **lucide-react**.

Menu prices are from the [Uber Eats listing](https://www.ubereats.com/au/store/cafe-1809/KVOjEGpURj6vx1GWt_8duw) (AUD delivery-platform prices; may differ in-café).

## Quick start

```powershell
Set-Location -LiteralPath "D:\projects\Café 1809"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production static export

```powershell
Set-Location -LiteralPath "D:\projects\Café 1809"
npm run build
npm start
```

`npm run build` writes a static site to `out/`. `npm start` serves that folder with `npx serve`.

> Use `-LiteralPath` in PowerShell because the folder name contains `é`.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 14.2.35 · `output: 'export'` · `trailingSlash: true` · `images.unoptimized: true` |
| UI | React 18 · Tailwind 3 · CSS variables |
| Motion | GSAP 3 · ScrollTrigger · `useGSAP` · `matchMedia` · reduced-motion path |
| Fonts | Bodoni Moda · Manrope · Noto Serif JP (next/font) |
| Icons | lucide-react |

## Homepage — 14 components

| # | Component | Role |
| --- | --- | --- |
| 01 | `SiteHeader` | Fixed nav, scene-aware theme, scroll hide/show |
| 02 | `FusionHero` | Full-viewport hero, aperture frame, menu ticker |
| 03 | `ExperienceModes` | Morning Brunch / Coffee Lounge / Shared Table / À La Carte |
| 04 | `FeaturedShowcase` | Signature dish carousel with portal frame |
| 05 | `CulinaryJourney` | Timed day chapters (doors → brunch → lunch → close) |
| 06 | `TableGrillStory` | Brunch Signature Story — pinned split reveal of 1809 Breaky |
| 07 | `InteractiveExperiences` | Plate builder (demo UI) |
| 08 | `MenuDiscovery` | 6×3 Uber Eats menu grid + full list |
| 09 | `ExperienceValues` | Four neighbourhood values + count-ups |
| 10 | `HomeDining` | Order / delivery CTAs |
| 11 | `AtmosphereGallery` | Lightbox gallery with distinct frames |
| 12 | `GiftMembership` | Gift card & membership dialogs (demo) |
| 13 | `ReservationVisit` | Hours, map, reserve (demo) + contact |
| 14 | `SiteFooter` | Address, socials, legal |

Dialogs are demo-only — nothing is submitted; call or email the café to book.

## Business facts

- **Address:** 34 Willow Ave, Glen Waverley VIC 3150
- **Phone:** 03 9886 4217
- **Email:** raya.au@yahoo.com
- **Hours:** Mon–Fri 7:30am–3:30pm · Sat–Sun 8:30am–3:00pm
- **Instagram:** https://www.instagram.com/1809cafe/
- **Facebook:** https://www.facebook.com/cafe1809/
- **Uber Eats:** https://www.ubereats.com/au/store/cafe-1809/KVOjEGpURj6vx1GWt_8duw

Source of truth: `data/businessData.js`.

## Project layout

```
app/                 # layout, page, globals.css
components/
  layout/            # SiteHeader, SiteFooter, NavigationOverlay
  sections/          # 02–13 homepage sections
  ui/                # Section, FrameImage, motion shell helpers
  dialogs/           # Dish, reserve, gift, membership, lightbox
data/businessData.js
lib/                 # motion, hours, format, splitText
public/images/       # local WebP brunch photography (no remote URLs)
reference/           # pattern / motion notes
ASSETS.md
MOTION_COVERAGE.md
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Static export → `out/` |
| `npm start` | Serve `out/` |
| `npm run lint` | ESLint (next/core-web-vitals) |

## Design system

CSS variables in `app/globals.css`:

`#151827` midnight ink · `#F4F0E8` rice paper · `#C9DBE6` porcelain · `#3554A5` ultramarine · `#EF6045` persimmon · `#B7A06A` brass · `#272B35` graphite · `#E3E6E5` mist

Scene themes alternate ink / rice / porcelain. Frames use clip-path reveals (aperture, shutters, portal, cinematic, etc.) — not generic fade-ups. See `MOTION_COVERAGE.md`.

## Notes

- Photography is representative Pexels stock (see `ASSETS.md`), not photos of the café.
- Prefer `prefers-reduced-motion: reduce` — GSAP entrance builders skip; content stays visible.
- Dialogs and plate-builder are client demos only.
