'use client';
import { useEffect, useRef, useCallback } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { business } from '@/data/businessData';
import { DURATION, EASE, STAGGER } from '@/lib/motionConfig';
import { navLinks } from './navLinks';

const FOCUSABLE = 'a[href],button:not([disabled])';
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Full-screen navigation. Circular clip-path reveal from the toggle corner. */
export default function NavigationOverlay({ onClosed }) {
  const root = useRef(null);
  const closing = useRef(false);

  const close = useCallback((target) => {
    if (closing.current) return;
    closing.current = true;
    const t = typeof target === 'string' ? target : undefined;
    if (reduced()) return onClosed(t);
    gsap.to(root.current, {
      clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)',
      duration: DURATION.base,
      ease: EASE.inOutStrong,
      onComplete: () => onClosed(t),
    });
    return undefined;
  }, [onClosed]);

  useEffect(() => {
    const el = root.current;
    const previous = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    el.querySelector(FOCUSABLE)?.focus({ preventScroll: true });

    if (!reduced()) {
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' },
        { clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)', duration: DURATION.slow, ease: EASE.inOutStrong, clearProps: 'clipPath' }
      );
      tl.from('[data-nav-item]', { yPercent: 110, duration: DURATION.slow, stagger: STAGGER.line, ease: EASE.outStrong }, '-=0.55');
      tl.from('[data-nav-meta]', { y: 20, opacity: 0, duration: DURATION.base, stagger: 0.08 }, '-=0.6');
    }

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const nodes = Array.from(el.querySelectorAll(FOCUSABLE));
        const a = nodes[0];
        const z = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.({ preventScroll: true });
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={root}
      id="site-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="scene theme-ink fixed inset-0 z-[110] overflow-y-auto"
    >
      <div className="container-shell flex min-h-full flex-col pb-10 pt-[calc(var(--header-h)+1rem)]">
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close navigation"
          className="absolute right-[clamp(1.25rem,4vw,4rem)] top-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-rice/30 transition hover:bg-rice hover:text-ink"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <nav aria-label="Primary" className="my-auto grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  data-nav-item
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    close(l.href);
                  }}
                  className="group flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.05] transition-colors hover:text-persimmon"
                >
                  <span className="font-body text-xs font-bold tracking-[0.2em] text-brass">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-6 text-sm text-rice/80">
            <div data-nav-meta>
              <p className="eyebrow">Visit</p>
              <p className="mt-3">{business.address.full}</p>
              <a className="link-underline mt-1 inline-block" href={`tel:${business.phone.tel}`}>
                {business.phone.display}
              </a>
            </div>
            <div data-nav-meta>
              <p className="eyebrow">Hours</p>
              {business.hoursSummary.map((h) => (
                <p key={h.label} className="mt-2 flex justify-between gap-6 border-b border-rice/15 pb-2">
                  <span>{h.label}</span>
                  <span>{h.value}</span>
                </p>
              ))}
            </div>
            <div data-nav-meta className="flex flex-wrap gap-3">
              <a className="btn btn-primary" href={business.order.uberEats} target="_blank" rel="noopener noreferrer">
                Order on Uber Eats <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

