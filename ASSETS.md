# Assets — Café 1809

All homepage imagery is **local** under `public/images/*.webp`. Components reference files via `img(name)` in `lib/format.js` (`/images/{name}.webp`) — **no remote image URLs** in React/JSX.

## Source

Stock brunch / café photography from [Pexels](https://www.pexels.com/), downloaded and converted to WebP with `scripts/process-images.mjs` (sharp). Pexels photo IDs are recorded in `scripts/image-map.json`.

These are **representative** images, not photographs of Café 1809 or its exact dishes. The site states this via `business.imageryNote`.

## Image inventory

| File | Pexels ID | Description |
| --- | ---: | --- |
| `hero-dining.webp` | 2074130 | Flat lay of coffee, pastries and shared plates |
| `hero-plate.webp` | 566566 | Smashed avocado, eggs and toast |
| `dish-eggs-toast.webp` | 103124 | Eggs on toast with a flat white |
| `dish-acai.webp` | 1099680 | Smoothie bowl with fresh fruit |
| `dish-smashed-avo.webp` | 704569 | Smashed avocado with poached egg |
| `dish-avo-eggs.webp` | 566566 | Avocado toast with eggs |
| `dish-french-toast.webp` | 376464 | Stacked pancakes with berries and syrup |
| `dish-poke.webp` | 1640777 | Colourful grain bowl |
| `dish-toastie.webp` | 1633525 | Toasted sandwich |
| `dish-breaky-burger.webp` | 1633578 | Breakfast burger |
| `dish-chicken-burger.webp` | 1639557 | Loaded burger with cheese |
| `dish-egg-bacon-bun.webp` | 139746 | Egg and bacon bun |
| `dish-mushroom.webp` | 2067423 | Greens and avocado on a dark plate |
| `dish-bowl.webp` | 842571 | Warm bowl with greens |
| `dish-greens.webp` | 1213710 | Salad with avocado and sourdough |
| `coffee-latte.webp` | 312418 | Latte art in a black cup |
| `coffee-pour.webp` | 302899 | Barista pouring latte art |
| `drink-iced-coffee.webp` | 2615323 | Iced coffee |
| `drink-milkshake.webp` | 3727250 | Chocolate milkshake |
| `dessert-croissant.webp` | 3892469 | Golden croissant |
| `dessert-pastry.webp` | 2878740 | Bakery pastry |
| `dessert-counter.webp` | 205961 | Pastry counter |
| `dessert-cake.webp` | 2144200 | Berry cake slice |
| `atmosphere-room.webp` | 1307698 | Café dining room |
| `atmosphere-bar.webp` | 2159065 | Café coffee bar |
| `atmosphere-counter.webp` | 2253643 | Café counter and seating |
| `atmosphere-bakery.webp` | 1855214 | Bakery display and interior |
| `atmosphere-evening.webp` | 1581384 | Warm lit dining room |
| `kitchen-chefs.webp` | 3217156 | Chefs plating in a kitchen |
| `texture-beans.webp` | 4109743 | Roasted coffee beans |

## Video

| File | Source | Description |
| --- | --- | --- |
| `public/videos/hero-cafe.mp4` | [Mixkit 3577](https://mixkit.co/free-stock-video/coffee-and-steam-machine-in-a-coffee-shop-3577/) | Barista / espresso machine in a coffee shop — homepage hero backdrop (720p local MP4) |

Referenced via `video('hero-cafe')` in `lib/format.js`. Autoplay is muted + looped; paused when off-screen, tab-hidden, or `prefers-reduced-motion: reduce` (static poster `hero-dining.webp` remains).

## Reprocessing

If originals are present in `_dl/` or `_dl2/`:

```powershell
Set-Location -LiteralPath "D:\projects\Café 1809"
node scripts/process-images.mjs
```

Output is written to `public/images/` at max width 1600px, WebP quality 76.

## Usage conventions

- Prefer `FrameImage` for framed section media (ten clip-path treatments).
- Mark the first LCP-critical hero image with `priority` / `loading="eager"`.
- Alt text should describe the stock scene honestly when it stands alone; decorative frames may use empty `alt` when captioned nearby.
