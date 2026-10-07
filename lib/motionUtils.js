'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { splitText } from '@/lib/splitText';
import { useMotionEnv } from '@/lib/motionEnv';
import { DURATION, EASE, STAGGER, SCROLL, MEDIA_QUERIES, FRAME_SHAPES } from '@/lib/motionConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Handle for smoke tests / debugging (read-only use).
  window.__CAFE_MOTION__ = { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger, useGSAP };

const T = (root, sel) => Array.from(root.querySelectorAll(sel));

/**
 * Section motion hook.
 *  - waits for fonts (line-split accuracy)
 *  - gsap.matchMedia: desktop / tablet / mobile / reduced
 *  - prefers-reduced-motion: build() is NOT called, content stays in its natural, visible state
 *  - everything is scoped to `scope` and reverted on unmount / rebuild
 *
 * build(api) receives { root, mode, desktop, tablet, mobile, q, split, entrance, frame, parallax }
 */
export function useSectionMotion(scope, build, deps = []) {
  const { ready, key } = useMotionEnv();
  useGSAP(
    () => {
      const root = scope.current;
      if (!ready || !root) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERIES, (ctx) => {
        const { desktop, tablet, mobile, reduce } = ctx.conditions;
        const mode = reduce ? 'reduced' : desktop ? 'desktop' : tablet ? 'tablet' : 'mobile';
        root.dataset.motionMode = mode;
        if (reduce) return undefined;
        const splits = [];
        const api = {
          root,
          mode,
          desktop,
          tablet,
          mobile,
          q: (sel) => T(root, sel),
          split: (el, opts) => {
            const s = splitText(el, opts);
            splits.push(s);
            return s;
          },
        };
        api.entrance = (opts) => runEntrance(api, opts);
        api.frame = (el, tl, pos) => frameReveal(el, tl, pos);
        api.parallax = () => parallax(api);
        build(api);
        return () => splits.forEach((s) => s.revert());
      });
      return () => mm.revert();
    },
    { scope, dependencies: [ready, key, ...deps], revertOnUpdate: true }
  );
}

/** Standard entrance: label → heading (masked line rise) → body → frames → ctas, plus batched items. */
export function runEntrance(api, opts = {}) {
  const { root, q, split, mobile } = api;
  const tl = gsap.timeline({
    delay: opts.delay || 0,
    defaults: { ease: EASE.out },
    scrollTrigger: opts.immediate
      ? undefined
      : { trigger: opts.trigger || root, start: opts.start || SCROLL.entranceStart, once: true },
  });
  const skip = (el) => el.closest('[data-entrance="skip"]');
  const sel = (name) => q(`[data-motion-target="${name}"]`).filter((el) => !skip(el));

  sel('label').forEach((el, i) =>
    tl.from(el, { y: 14, opacity: 0, duration: DURATION.base }, i === 0 ? 0 : '<0.05')
  );
  sel('heading').forEach((el, i) => {
    const s = split(el, { type: 'lines' });
    if (s.lines.length) {
      tl.from(
        s.lines,
        { yPercent: 118, duration: DURATION.slow, stagger: STAGGER.line, ease: EASE.outStrong },
        i === 0 ? 0.08 : '<0.1'
      );
    }
  });
  sel('body').forEach((el, i) =>
    tl.from(el, { y: 22, opacity: 0, duration: DURATION.base }, i === 0 ? '<0.25' : '<0.08')
  );
  sel('frame').forEach((el, i) => frameReveal(el, tl, i === 0 ? 0.05 : '<0.15'));
  sel('cta').forEach((el, i) =>
    tl.from(el, { y: 16, opacity: 0, duration: DURATION.fast }, i === 0 ? '>-0.5' : '<0.08')
  );

  // Items reveal as they scroll into view (safe for tall grids).
  const items = sel('item');
  if (items.length) {
    gsap.set(items, { y: mobile ? 24 : 44, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: DURATION.base,
          ease: EASE.out,
          stagger: STAGGER.item,
          overwrite: true,
        }),
    });
  }
  return tl;
}

/** Frame treatments. Final state == CSS state, so clearProps hands control back to CSS. */
export function frameReveal(frame, tl, pos = '<') {
  const variant = frame.dataset.frame;
  const mask = frame.querySelector('[data-frame-mask]');
  const img = frame.querySelector('[data-frame-img]');
  const shape = FRAME_SHAPES[variant];
  const dur = DURATION.frame;
  const clip = (extra = 0) =>
    tl.fromTo(
      mask,
      { clipPath: shape.from },
      { clipPath: shape.to, duration: dur, ease: EASE.frame, clearProps: 'clipPath' },
      pos
    );

  switch (variant) {
    case 'aperture':
      clip();
      tl.from(img, { scale: 1.35, duration: dur + 0.4, ease: EASE.out }, '<');
      break;
    case 'portal': {
      clip();
      tl.from(img, { scale: 1.3, rotate: -8, duration: dur + 0.4, ease: EASE.out }, '<');
      const ring = frame.querySelector('[data-frame-ring]');
      if (ring) tl.from(ring, { scale: 0.7, opacity: 0, rotate: -90, duration: dur, ease: EASE.out }, '<0.1');
      break;
    }
    case 'asymmetric':
    case 'cinematic':
    case 'masked':
      clip();
      tl.from(img, { scale: variant === 'masked' ? 1.5 : 1.25, duration: dur + 0.4, ease: EASE.out }, '<');
      break;
    case 'grid': {
      const lines = T(frame, '[data-frame-line]');
      tl.from(lines, { scaleX: 0, scaleY: 0, duration: DURATION.base, stagger: 0.06, ease: EASE.out, transformOrigin: 'left top' }, pos);
      tl.fromTo(
        mask,
        { clipPath: shape.from },
        { clipPath: shape.to, duration: dur, ease: EASE.frame, clearProps: 'clipPath' },
        '<0.15'
      );
      tl.from(img, { scale: 1.2, duration: dur + 0.3, ease: EASE.out }, '<');
      break;
    }
    case 'porcelain': {
      const panel = frame.querySelector('[data-frame-panel]');
      tl.from(panel, { scaleX: 0, transformOrigin: 'left center', duration: DURATION.slow, ease: EASE.inOut }, pos);
      tl.fromTo(
        mask,
        { clipPath: shape.from },
        { clipPath: shape.to, duration: dur, ease: EASE.frame, clearProps: 'clipPath' },
        '<0.3'
      );
      tl.from(img, { scale: 1.2, duration: dur + 0.3, ease: EASE.out }, '<');
      break;
    }
    case 'outlined': {
      const outline = frame.querySelector('[data-frame-outline]');
      tl.fromTo(
        mask,
        { clipPath: shape.from },
        { clipPath: shape.to, duration: dur, ease: EASE.frame, clearProps: 'clipPath' },
        pos
      );
      tl.from(img, { scale: 1.2, duration: dur + 0.3, ease: EASE.out }, '<');
      if (outline) tl.from(outline, { x: -26, y: -26, opacity: 0, duration: DURATION.slow, ease: EASE.out }, '<0.35');
      break;
    }
    case 'shutters': {
      const bars = T(frame, '[data-shutter]');
      bars.forEach((b, i) =>
        tl.fromTo(
          b,
          { autoAlpha: 1, scaleY: 1, transformOrigin: i % 2 ? 'top center' : 'bottom center' },
          { scaleY: 0, duration: DURATION.slow, ease: EASE.inOut, onComplete: () => gsap.set(b, { autoAlpha: 0 }) },
          i === 0 ? pos : `<${STAGGER.bar}`
        )
      );
      tl.from(img, { scale: 1.25, duration: dur + 0.4, ease: EASE.out }, pos);
      break;
    }
    case 'split': {
      const top = frame.querySelector('[data-split="top"]');
      const bottom = frame.querySelector('[data-split="bottom"]');
      tl.fromTo(top, { autoAlpha: 1, yPercent: 0 }, { yPercent: -100, duration: dur, ease: EASE.frame, onComplete: () => gsap.set(top, { autoAlpha: 0 }) }, pos);
      tl.fromTo(bottom, { autoAlpha: 1, yPercent: 0 }, { yPercent: 100, duration: dur, ease: EASE.frame, onComplete: () => gsap.set(bottom, { autoAlpha: 0 }) }, '<');
      tl.from(img, { scale: 1.2, duration: dur + 0.3, ease: EASE.out }, '<');
      break;
    }
    default:
      tl.from(frame, { opacity: 0, y: 30, duration: dur, ease: EASE.out }, pos);
  }
  return tl;
}

/** Scrubbed image parallax (desktop + tablet only). */
export function parallax(api) {
  if (api.mobile) return;
  api.q('[data-frame-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: EASE.linear,
        scrollTrigger: {
          trigger: el.closest('[data-frame]') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

/** Count-up helper that is safe if JS never runs (the element already shows the final value). */
export function countUp(el, to, { decimals = 0, duration = 1.6, trigger } = {}) {
  const obj = { v: 0 };
  return gsap.to(obj, {
    v: to,
    duration,
    ease: EASE.out,
    onUpdate: () => {
      el.textContent = obj.v.toFixed(decimals);
    },
    onComplete: () => {
      el.textContent = to.toFixed(decimals);
    },
    scrollTrigger: { trigger: trigger || el, start: 'top 88%', once: true },
  });
}
