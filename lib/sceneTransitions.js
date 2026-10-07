'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL, EASE } from '@/lib/motionConfig';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * Scene handoffs between consecutive sections.
 *
 * Each entry links a real element in the OUTGOING section (`out`, matched via data-handoff~="…")
 * with a real element in the INCOMING section (`in`). A scrubbed timeline is attached to the
 * incoming section (`[data-scene-transition="<id>"]`), running while its top edge travels through
 * the viewport. The incoming section also owns a thin brass seam line (`[data-scene-seam]`) that
 * draws across during the handoff.
 *
 * Types:
 *  push    – outgoing content recedes upward & dims, incoming content rises into place
 *  expand  – incoming content is revealed through a rounded window that opens to full bleed
 *  zoom    – outgoing scales through, incoming settles from slightly smaller
 *  slide   – outgoing drifts left, incoming arrives from the right
 *  stagger – incoming children rise in sequence while the outgoing frame recedes
 */
export const SCENES = [
  { id: 'hero-to-modes', from: 'hero', to: 'experience-modes', type: 'push', out: 'hero-out', in: 'modes-in' },
  { id: 'modes-to-featured', from: 'experience-modes', to: 'featured-showcase', type: 'expand', out: 'modes-out', in: 'featured-in' },
  { id: 'featured-to-journey', from: 'featured-showcase', to: 'culinary-journey', type: 'zoom', out: 'featured-out', in: 'journey-in' },
  { id: 'journey-to-story', from: 'culinary-journey', to: 'brunch-signature-story', type: 'push', out: 'journey-out', in: 'story-in' },
  { id: 'story-to-interactive', from: 'brunch-signature-story', to: 'interactive-experiences', type: 'slide', out: 'story-out', in: 'interactive-in' },
  { id: 'interactive-to-menu', from: 'interactive-experiences', to: 'menu-discovery', type: 'stagger', out: 'interactive-out', in: 'menu-in' },
  { id: 'menu-to-values', from: 'menu-discovery', to: 'experience-values', type: 'expand', out: 'menu-out', in: 'values-in' },
  { id: 'values-to-home', from: 'experience-values', to: 'home-dining', type: 'push', out: 'values-out', in: 'home-in' },
  { id: 'home-to-gallery', from: 'home-dining', to: 'atmosphere-gallery', type: 'zoom', out: 'home-out', in: 'gallery-in' },
  { id: 'gallery-to-gift', from: 'atmosphere-gallery', to: 'gift-membership', type: 'slide', out: 'gallery-out', in: 'gift-in' },
  { id: 'gift-to-reservation', from: 'gift-membership', to: 'reservation-visit', type: 'expand', out: 'gift-out', in: 'reservation-in' },
  { id: 'reservation-to-footer', from: 'reservation-visit', to: 'site-footer', type: 'stagger', out: 'reservation-out', in: 'footer-in' },
];

const HANDLERS = {
  push: (tl, { out, inn, mobile }) => {
    if (out) tl.to(out, { yPercent: mobile ? -2 : -5, scale: 0.97, opacity: 0.55, transformOrigin: '50% 100%' }, 0);
    if (inn) tl.fromTo(inn, { yPercent: mobile ? 2 : 6, opacity: 0.4 }, { yPercent: 0, opacity: 1 }, 0);
  },
  expand: (tl, { out, inn, mobile }) => {
    if (out) tl.to(out, { opacity: 0.6, scale: 0.98 }, 0);
    if (inn)
      tl.fromTo(
        inn,
        { clipPath: mobile ? 'inset(4% 3% 0% 3% round 20px)' : 'inset(10% 8% 0% 8% round 40px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
        0
      );
  },
  zoom: (tl, { out, inn }) => {
    if (out) tl.to(out, { scale: 1.06, opacity: 0.35, transformOrigin: '50% 100%' }, 0);
    if (inn) tl.fromTo(inn, { scale: 0.94, opacity: 0.5, transformOrigin: '50% 0%' }, { scale: 1, opacity: 1 }, 0);
  },
  slide: (tl, { out, inn, mobile }) => {
    const d = mobile ? 3 : 6;
    if (out) tl.to(out, { xPercent: -d, opacity: 0.5 }, 0);
    if (inn) tl.fromTo(inn, { xPercent: d, opacity: 0.45 }, { xPercent: 0, opacity: 1 }, 0);
  },
  stagger: (tl, { out, inn }) => {
    if (out) tl.to(out, { scale: 0.96, opacity: 0.5 }, 0);
    if (inn) {
      const kids = Array.from(inn.children);
      tl.fromTo(kids, { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, stagger: 0.12 }, 0);
    }
  },
};

/** Layout variants (pinned stage vs stacked list) may share a handoff id; use the one that is rendered. */
function pickVisible(root, sel) {
  const all = Array.from(root.querySelectorAll(sel));
  return all.find((el) => el.getClientRects().length > 0) || null;
}

export function buildSceneTransitions({ mobile = false, tablet = false } = {}) {
  const created = [];
  SCENES.forEach((scene) => {
    const toEl = document.querySelector(`[data-motion-section="${scene.to}"]`);
    const fromEl = document.querySelector(`[data-motion-section="${scene.from}"]`);
    if (!toEl || !fromEl) return;
    const out = pickVisible(fromEl, `[data-handoff~="${scene.out}"]`);
    const inn = pickVisible(toEl, `[data-handoff~="${scene.in}"]`);
    const seam = toEl.querySelector('[data-scene-seam]');

    const tl = gsap.timeline({
      defaults: { ease: EASE.linear },
      scrollTrigger: {
        trigger: toEl,
        start: 'top bottom',
        end: mobile ? 'top 55%' : 'top 30%',
        scrub: SCROLL.scrubSmooth,
        id: scene.id,
      },
    });
    HANDLERS[scene.type](tl, { out, inn, mobile, tablet });
    if (seam) tl.fromTo(seam, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center' }, 0);
    created.push(tl);
  });
  return created;
}
