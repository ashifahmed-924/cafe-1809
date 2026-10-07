'use client';
import { useEffect, useRef, useId, useCallback } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { DURATION, EASE } from '@/lib/motionConfig';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Accessible modal base: focus trap, ESC, backdrop click, scroll lock, GSAP open/close.
 * UI-only; no data leaves the browser.
 */
export default function Dialog({ title, eyebrow, onClose, children, wide = false, theme = 'rice' }) {
  const panel = useRef(null);
  const backdrop = useRef(null);
  const closing = useRef(false);
  const titleId = useId();

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReduced()) return onClose();
    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { y: 30, opacity: 0, duration: DURATION.fast, ease: EASE.inOut }, 0)
      .to(backdrop.current, { opacity: 0, duration: DURATION.fast }, 0);
    return undefined;
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const el = panel.current;
    const first = el.querySelector('[data-autofocus]') || el.querySelector(FOCUSABLE);
    first && first.focus({ preventScroll: true });

    if (!prefersReduced()) {
      gsap.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: DURATION.fast });
      gsap.fromTo(
        el,
        { y: 50, opacity: 0, clipPath: 'inset(8% 6% 8% 6% round 28px)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: DURATION.base, ease: EASE.outStrong, clearProps: 'clipPath' }
      );
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        requestClose();
      }
      if (e.key === 'Tab') {
        const nodes = Array.from(el.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null);
        if (!nodes.length) return;
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
    const backdropEl = backdrop.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous && previous.focus && previous.focus({ preventScroll: true });
      gsap.killTweensOf([el, backdropEl]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        ref={backdrop}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={requestClose}
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`scene theme-${theme} relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] p-6 shadow-2xl sm:rounded-[28px] sm:p-10 ${wide ? 'max-w-4xl' : 'max-w-xl'}`}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border line-themed transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={titleId} className="h-section mt-3 pr-10 !text-[clamp(1.8rem,3.4vw,2.8rem)]">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
