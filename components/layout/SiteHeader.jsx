'use client';
import { useRef, useState, useCallback } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motionUtils';
import { useMotionEnv } from '@/lib/motionEnv';
import { DURATION, EASE } from '@/lib/motionConfig';
import { business } from '@/data/businessData';
import NavigationOverlay from './NavigationOverlay';
import { navLinks } from './navLinks';

/**
 * 01 SiteHeader — fixed, adapts colour to the scene underneath (data-theme),
 * slides away on scroll-down and returns on scroll-up. Opens NavigationOverlay.
 */
export default function SiteHeader() {
  const root = useRef(null);
  const toggle = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState('ink');
  const { ready, key } = useMotionEnv();

  useGSAP(
    () => {
      if (!ready) return undefined;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(root.current, { yPercent: -100 }, { yPercent: 0, duration: DURATION.slow, ease: EASE.outStrong, delay: 0.2 });
        gsap.fromTo(root.current.querySelectorAll('[data-header-item]'), { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION.base, stagger: 0.07, delay: 0.5, ease: EASE.out, clearProps: 'transform,opacity' });
        let hidden = false;
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            if (document.body.style.overflow === 'hidden') return;
            const hide = self.direction === 1 && self.scroll() > 280;
            const show = self.direction === -1 || self.scroll() <= 280;
            if ((hide && hidden) || (show && !hidden)) return; // no change
            hidden = hide;
            gsap.to(root.current, { yPercent: hide ? -100 : 0, duration: DURATION.fast, ease: EASE.out, overwrite: 'auto' });
          },
        });
      });
      // Theme tracking works in every motion mode (not an animation).
      const triggers = Array.from(document.querySelectorAll('[data-motion-section]')).filter((s) => s.tagName !== 'HEADER').map((sec) =>
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 44px',
          end: 'bottom 44px',
          onToggle: (self) => self.isActive && setTheme(sec.dataset.theme || 'ink'),
        })
      );
      return () => {
        triggers.forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: root, dependencies: [ready, key], revertOnUpdate: true }
  );

  const onClosed = useCallback((target) => {
    setNavOpen(false);
    if (target) {
      requestAnimationFrame(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      toggle.current?.focus();
    }
  }, []);

  const dark = theme === 'ink';
  return (
    <>
      <header
        ref={root}
        data-motion-section="site-header"
        data-theme={theme}
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
          dark ? 'text-rice' : 'text-ink'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 backdrop-blur-md transition-colors duration-500 ${
            dark ? 'bg-ink/55' : theme === 'porcelain' ? 'bg-porcelain/75' : 'bg-rice/80'
          }`}
        />
        <div className="container-shell flex h-full items-center justify-between gap-6">
          <a href="#hero" data-header-item aria-label="Café 1809 — back to top" className="flex items-baseline gap-2 font-display text-2xl tracking-tight">
            Café <span className={dark ? 'text-persimmon' : 'text-ultramarine'}>1809</span>
          </a>
          <nav aria-label="Quick links" className="hidden items-center gap-8 lg:flex">
            {navLinks.slice(0, 4).map((l) => (
              <a key={l.href} data-header-item href={l.href} className="link-underline py-1 text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              data-header-item
              href={business.order.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !hidden !min-h-[2.75rem] !px-5 sm:!inline-flex"
            >
              Order <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              ref={toggle}
              data-header-item
              type="button"
              aria-haspopup="dialog"
              aria-expanded={navOpen}
              aria-controls="site-navigation"
              onClick={() => setNavOpen(true)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-current px-4 text-[0.78rem] font-bold uppercase tracking-[0.14em] transition-colors hover:border-persimmon hover:text-persimmon"
            >
              <Menu size={18} aria-hidden="true" />
              Menu
            </button>
          </div>
        </div>
      </header>
      {navOpen && <NavigationOverlay onClosed={onClosed} />}
    </>
  );
}
