'use client';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { featuredDishes, getItem, business } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { DURATION, EASE } from '@/lib/motionConfig';
import { img, moneyShort } from '@/lib/format';

const dishes = featuredDishes.map((f) => ({ ...f, item: getItem(f.id) }));

/** 04 FeaturedShowcase — circular dish portal; changing dish closes/reopens the iris. */
export default function FeaturedShowcase() {
  const ref = useRef(null);
  const busy = useRef(false);
  const [idx, setIdx] = useState(0);
  const { open } = useDialogs();
  const cur = dishes[idx];

  useSectionMotion(ref, ({ root, entrance, parallax }) => {
    entrance();
    parallax();
    const thumbs = root.querySelectorAll('[data-thumb]');
    gsap.from(thumbs, {
      scale: 0,
      opacity: 0,
      duration: DURATION.base,
      stagger: 0.07,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: root.querySelector('[data-thumbs]'), start: 'top 92%', once: true },
    });
    gsap.to(root.querySelector('[data-frame-ring]'), { rotate: 360, duration: 90, ease: 'none', repeat: -1 });
  });

  const go = (target) => {
    const next = (target + dishes.length) % dishes.length;
    if (busy.current || next === idx) return;
    const root = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIdx(next);
      return;
    }
    busy.current = true;
    const mask = root.querySelector('[data-frame-mask]');
    const kids = root.querySelector('[data-showcase-copy]').children;
    gsap
      .timeline({ onComplete: () => (busy.current = false) })
      .to(mask, { clipPath: 'circle(0% at 50% 50%)', duration: 0.55, ease: EASE.inOut }, 0)
      .to(kids, { y: -18, opacity: 0, duration: 0.3, stagger: 0.04, ease: EASE.out }, 0)
      .add(() => setIdx(next))
      .set(kids, { y: 24 })
      .to(mask, { clipPath: 'circle(50% at 50% 50%)', duration: 0.9, ease: EASE.out })
      .to(kids, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: EASE.out }, '<0.15');
  };

  return (
    <Section ref={ref} id="featured-showcase" theme="porcelain" transition="modes-to-featured" labelledBy="featured-title" className="section-pad overflow-hidden">
      <div data-handoff="featured-in" className="container-shell">
        <SectionHead
          id="featured-title"
          jp="特"
          eyebrow="Featured from the menu"
          title={<>Plates worth <em className="em-accent">pointing at.</em></>}
        />

        <div className="mt-14 grid min-w-0 items-center gap-12 lg:grid-cols-12">
          <div data-handoff="featured-out" className="relative mx-auto w-full min-w-0 max-w-[560px] max-md:px-4 lg:col-span-6">
            <div className="frame aspect-square" data-frame="portal" data-motion-target="frame">
              <span className="frame-ring" data-frame-ring aria-hidden="true" />
              <div className="frame-mask" data-frame-mask>
                <div className="frame-parallax" data-frame-parallax>
                  {dishes.map((d, i) => (
                    <img
                      key={d.id}
                      data-frame-img={i === 0 ? '' : undefined}
                      className="frame-img absolute inset-0"
                      src={img(d.image)}
                      alt={i === idx ? `${d.item.name} — representative photo` : ''}
                      aria-hidden={i !== idx}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      style={{ opacity: i === idx ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="absolute -bottom-3 right-2 rounded-full bg-ink px-4 py-2 font-display text-2xl text-rice shadow-xl max-md:right-6" aria-live="polite">
              {moneyShort(cur.item.price)}
            </p>
          </div>

          <div className="min-w-0 max-md:text-center lg:col-span-6">
            <div data-showcase-copy aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ultramarine">
                0{idx + 1} / 0{dishes.length} · {cur.kicker}
              </p>
              <h3 className="h-section mt-4 !text-[clamp(2rem,4.2vw,3.75rem)] max-md:mx-auto">{cur.item.name}</h3>
              <p className="lead mt-5 max-md:mx-auto">{cur.note}</p>
              <p className="mt-4 text-sm text-muted-themed">Photo is representative stock imagery.</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 max-md:justify-center" data-motion-target="cta">
              <Button variant="blue" onClick={() => open('dish', { dish: cur.item })}>
                Dish details
              </Button>
              <Button href={business.order.uberEats} external variant="outline">
                Order delivery
              </Button>
            </div>

            <div className="mt-10 flex w-full flex-wrap items-center gap-5 max-md:flex-col max-md:justify-center md:justify-start">
              <div className="flex gap-2">
                <button type="button" aria-label="Previous dish" onClick={() => go(idx - 1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-rice">
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Next dish" onClick={() => go(idx + 1)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-rice">
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
              <ul data-thumbs className="flex flex-wrap justify-center gap-2">
                {dishes.map((d, i) => (
                  <li key={d.id}>
                    <button
                      data-thumb
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${d.item.name}`}
                      aria-current={i === idx}
                      className={`h-12 w-12 overflow-hidden rounded-full border-2 transition ${i === idx ? 'border-ultramarine scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img(d.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
