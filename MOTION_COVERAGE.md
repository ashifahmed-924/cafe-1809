# Motion coverage — Café 1809

Every homepage section uses **GSAP** via `useSectionMotion` / `useGSAP`, with **ScrollTrigger**, **`gsap.matchMedia`**, and a **`prefers-reduced-motion: reduce`** path that skips entrance builders so content stays visible without animation.

Shared tokens live in `lib/motionConfig.js`. Frame reveals are clip-path / shutter treatments — **not** generic opacity fade-ups.

## Global systems

| System | File | Behaviour |
| --- | --- | --- |
| Section hook | `lib/motionUtils.js` → `useSectionMotion` | Fonts ready → matchMedia (desktop/tablet/mobile/reduce) → entrance + custom build |
| Frame reveals | `frameReveal()` | aperture, shutters, asymmetric, porcelain, portal, split, cinematic, grid, masked, outlined |
| Entrance | `runEntrance()` | label → masked line-rise heading → body → frames → CTAs; items via ScrollTrigger.batch |
| Parallax | `parallax()` | scrubbed image shift (desktop/tablet) |
| Scene handoffs | `lib/sceneTransitions.js` + `ScrollOrchestrator` | cross-section theme transitions |
| Reduced motion | `MEDIA_QUERIES.reduce` | `build()` not called; natural CSS end-states remain visible |

## Per-component coverage

| # | Component | Distinct motion (not fade-up) |
| --- | --- | --- |
| 01 | **SiteHeader** | Load: slide-in from above + staggered items. Scroll: hide on down / show on up. Theme sync via ScrollTrigger on sections. |
| 02 | **FusionHero** | Aperture frame + scale; rotating decor ring; infinite menu marquee; scrubbed hero scale/parallax on desktop. |
| 03 | **ExperienceModes** | Vertical shutter clip-path panel reveal; image scale; active panel expands, siblings fold to strips. |
| 04 | **FeaturedShowcase** | Portal frame + rotating ring; dish swap with mask wipe / scale; scrubbed portal. |
| 05 | **CulinaryJourney** | Horizontal / chapter scrub timeline; cinematic frame handoffs between day chapters. |
| 06 | **TableGrillStory** | Pinned split panels slide apart revealing 1809 Breaky ingredients + price pop (desktop); stacked fallback elsewhere. |
| 07 | **InteractiveExperiences** | Portal plate preview; selection items rise/stagger; price tween. |
| 08 | **MenuDiscovery** | Entrance + tab change: clip-path inset wipe on dish cards (staggered), not opacity-only. |
| 09 | **ExperienceValues** | Value cards + `countUp` numbers; parallax texture. |
| 10 | **HomeDining** | Dual-panel entrance; delivery CTA stagger; desktop scrub accents. |
| 11 | **AtmosphereGallery** | Per-item distinct `frameReveal` variants; lightbox open. |
| 12 | **GiftMembership** | Dual-card entrance + frame parallax. |
| 13 | **ReservationVisit** | Form panel + hours entrance; map / status accents. |
| 14 | **SiteFooter** | Word-by-word scrub rise on brand line; staggered link columns. |

## Frame types used on page

`aperture` · `shutters` · `asymmetric` · `porcelain` · `portal` · `split` · `cinematic` · `grid` · `masked` · `outlined`

Final visual state is CSS (`globals.css`). GSAP animates **from** collapsed geometry, then `clearProps` returns control to CSS so no-JS / reduced-motion still shows full images.

## Debugging

`MotionDebugger` (dev) and `window.__CAFE_MOTION__` expose GSAP / ScrollTrigger for smoke checks.

## Runtime verification (2026-10-06)

| Check | Result |
| --- | --- |
| `data-motion-section` count | **14** |
| ScrollTrigger instances via `__CAFE_MOTION__` | **102** |
| Frame elements (`[data-frame]`) | **26** |
| Scene handoffs (`[data-handoff]`) | **27** |
| Scene transitions | **12** |
| Mid-scroll menu cards | Opacity / transform values changing (e.g. `o:0.29` + `translateY`) — motion confirmed |
| Footer socials | Instagram + Facebook present and linked |
| Static export | `npm run build` → `out/` success |
| Captures | `reference/captures/` |

Reduced-motion Playwright pass: **NOT RUN** (Playwright not configured as a hard gate in this environment). Manual `prefers-reduced-motion` path is implemented in `lib/motionUtils.js`.
