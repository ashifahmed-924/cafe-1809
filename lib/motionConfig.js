/**
 * Central motion tokens. All durations are seconds.
 * Every section reads from here so the whole page shares one rhythm.
 */
export const DURATION = {
  micro: 0.25,
  fast: 0.45,
  base: 0.8,
  slow: 1.1,
  frame: 1.35,
  hero: 1.7,
};

export const EASE = {
  out: 'power3.out',
  outStrong: 'expo.out',
  inOut: 'power3.inOut',
  inOutStrong: 'expo.inOut',
  frame: 'power4.inOut',
  linear: 'none',
  soft: 'sine.inOut',
};

export const STAGGER = {
  line: 0.09,
  word: 0.035,
  item: 0.09,
  bar: 0.08,
};

export const SCROLL = {
  entranceStart: 'top 72%',
  scrubSmooth: 0.7,
};

export const MEDIA_QUERIES = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  tablet: '(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

/** Static end-state shapes for clip-path frames; must match the CSS in globals.css. */
export const FRAME_SHAPES = {
  aperture: { from: 'circle(0% at 50% 50%)', to: 'circle(78% at 50% 50%)' },
  portal: { from: 'circle(0% at 50% 50%)', to: 'circle(50% at 50% 50%)' },
  asymmetric: {
    from: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)',
    to: 'polygon(9% 0%, 100% 0%, 100% 90%, 91% 100%, 0% 100%, 0% 10%)',
  },
  cinematic: { from: 'inset(40% 0% 40% 0%)', to: 'inset(0% 0% 0% 0%)' },
  masked: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  grid: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
  porcelain: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  outlined: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
};

export const FRAME_TYPES = [
  'aperture',
  'shutters',
  'asymmetric',
  'porcelain',
  'portal',
  'split',
  'cinematic',
  'grid',
  'masked',
  'outlined',
];
