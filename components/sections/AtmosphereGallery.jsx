'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { gallery, business } from '@/data/businessData';
import { gsap, useSectionMotion, frameReveal } from '@/lib/motionUtils';
import { EASE } from '@/lib/motionConfig';

const sizes = ['aspect-[4/5]', 'aspect-square', 'aspect-[5/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/5]', 'aspect-[5/4]'];
const offsets = ['', 'lg:mt-24', 'lg:-mt-8', 'lg:mt-16', '', 'lg:mt-20', 'lg:-mt-4'];

/**
 * 11 AtmosphereGallery — seven photos in seven frame treatments.
 * Desktop: stage pins and the strip travels horizontally (scrubbed) with per-image drift.
 * Tablet/mobile: native snap scrolling. Reduced motion: native scroll, no animation.
 */
export default function AtmosphereGallery() {
  const ref = useRef(null);
  const { open } = useDialogs();

  useSectionMotion(ref, ({ root, entrance, desktop }) => {
    entrance();
    const items = Array.from(root.querySelectorAll('[data-gallery-item]'));
    const track = root.querySelector('[data-track]');
    const stage = root.querySelector('[data-gallery-stage]');

    if (desktop) {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: EASE.linear,
        scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });
      items.forEach((item) => {
        const frame = item.querySelector('[data-frame]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, containerAnimation: travel, start: 'left 92%', once: true } });
        frameReveal(frame, tl, 0);
        const img = frame.querySelector('[data-frame-img]');
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: EASE.linear, scrollTrigger: { trigger: item, containerAnimation: travel, start: 'left right', end: 'right left', scrub: true } });
      });
    } else {
      items.forEach((item) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 90%', once: true } });
        frameReveal(item.querySelector('[data-frame]'), tl, 0);
      });
    }
  });

  return (
    <Section ref={ref} id="atmosphere-gallery" theme="ink" transition="home-to-gallery" labelledBy="gallery-title" className="atmosphere">
      <style>{`
        .gallery-scroll{overflow-x:auto;scroll-snap-type:x mandatory}
        .gallery-item{scroll-snap-align:center}
        [data-motion-mode='desktop'] .gallery-scroll{overflow:visible;scroll-snap-type:none}
        [data-motion-mode='desktop'] .gallery-stage{height:100svh;display:flex;flex-direction:column;justify-content:center;overflow:hidden;padding-block:calc(var(--header-h) + 1rem) 2rem}
      `}</style>
      <div data-gallery-stage className="gallery-stage section-pad">
        <div data-handoff="gallery-in" className="container-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead id="gallery-title" jp="景" eyebrow="Atmosphere" title={<>Light, steam &amp; <em className="em-accent">long tables.</em></>} />
            <p data-motion-target="body" className="max-w-sm text-sm leading-relaxed text-rice/70 max-md:mx-auto max-md:text-center">
              {business.imageryNote} Tap a frame to enlarge.
            </p>
          </div>
        </div>

        <div data-handoff="gallery-out" className="gallery-scroll no-scrollbar mt-10">
          <ul data-track className="flex w-max gap-6 px-[clamp(1.25rem,4vw,4rem)] pb-4 sm:gap-10">
            {gallery.map((g, i) => (
              <li key={g.src} data-gallery-item className={`gallery-item w-[78vw] shrink-0 sm:w-[44vw] lg:w-[24vw] lg:max-w-[420px] ${offsets[i]}`}>
                <button type="button" onClick={() => open('photo', { photo: g })} aria-label={`Enlarge photo: ${g.caption}`} className="group block w-full text-left">
                  <FrameImage frame={g.frame} src={g.src} alt={g.alt} aspect={sizes[i]} parallax={false} motionTarget="gframe" cover="var(--midnight-ink)" className="transition-transform duration-500 group-hover:-translate-y-1" />
                  <p className="mt-4 flex items-baseline gap-3 text-xs font-bold uppercase tracking-[0.2em] text-rice/70">
                    <span className="text-brass">0{i + 1}</span>
                    {g.caption}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
