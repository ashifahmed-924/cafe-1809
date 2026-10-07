'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import Button from '@/components/ui/Button';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { signatureStory, getItem, business } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { EASE } from '@/lib/motionConfig';
import { img, moneyShort } from '@/lib/format';

/**
 * 06 TableGrillStory — adapted for the café as the "Brunch Signature Story".
 * Desktop: a pinned split-frame image slides apart (left ← →right) revealing the 1809 Breaky and its ingredients.
 * Tablet/mobile/reduced-motion: stacked split-image layout (default markup).
 */
export default function TableGrillStory() {
  const ref = useRef(null);
  const { open } = useDialogs();
  const dish = getItem('1809-breaky');

  useSectionMotion(ref, ({ root, entrance, desktop }) => {
    entrance();
    if (!desktop) return;
    const stage = root.querySelector('[data-story-stage]');
    const left = stage.querySelector('[data-panel-left]');
    const right = stage.querySelector('[data-panel-right]');
    const cover = stage.querySelector('[data-story-cover]');
    const center = stage.querySelector('[data-story-center]');
    const ings = stage.querySelectorAll('[data-ing]');
    const price = stage.querySelector('[data-story-price]');
    const imgs = stage.querySelectorAll('[data-panel-left] img, [data-panel-right] img');

    gsap.set(ings, { y: 36, opacity: 0 });
    gsap.set(price, { scale: 0.7, opacity: 0 });
    gsap.set(center.querySelectorAll('[data-story-reveal]'), { y: 40, opacity: 0 });

    gsap
      .timeline({
        defaults: { ease: EASE.linear },
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=190%', pin: true, scrub: 0.8, anticipatePin: 1 },
      })
      .to(cover, { opacity: 0, yPercent: -20, duration: 0.35 }, 0)
      .to(left, { xPercent: -66, ease: EASE.inOut, duration: 1.1 }, 0.1)
      .to(right, { xPercent: 66, ease: EASE.inOut, duration: 1.1 }, 0.1)
      .to(imgs, { scale: 1.12, duration: 1.2 }, 0)
      .to(center.querySelectorAll('[data-story-reveal]'), { y: 0, opacity: 1, stagger: 0.12, duration: 0.5 }, 0.45)
      .to(ings, { y: 0, opacity: 1, stagger: 0.07, duration: 0.4 }, 0.7)
      .to(price, { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.4 }, 1.1)
      .to({}, { duration: 0.35 });
  });

  return (
    <Section ref={ref} id="brunch-signature-story" motionId="brunch-signature-story" theme="rice" transition="journey-to-story" labelledBy="story-title">
      <style>{`
        .story-stage{display:none}
        [data-motion-mode='desktop'] .story-stage{display:block}
        [data-motion-mode='desktop'] .story-stack{display:none}
      `}</style>

      {/* Stacked / default layout */}
      <div className="story-stack section-pad">
        <div data-handoff="story-in" className="container-shell">
          <SectionHead
            id="story-title"
            jp="卓"
            eyebrow="Brunch signature story"
            title={<>The plate the café is <em className="em-accent">named around.</em></>}
            lead={`${signatureStory.lead} The ${dish.name} brings together ${signatureStory.ingredients.join(', ').toLowerCase()}.`}
          />
          <div data-handoff="story-out" className="mt-14 grid items-start gap-10 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              <FrameImage frame="split" src={signatureStory.left} alt="Eggs, avocado and toast" aspect="aspect-[3/4]" cover="var(--rice-paper)" />
              <FrameImage frame="split" src={signatureStory.right} alt="Plate of eggs on toast beside coffee" aspect="aspect-[3/4]" cover="var(--rice-paper)" className="mt-10" />
            </div>
            <div data-motion-target="body" className="max-md:text-center">
              <p className="font-display text-5xl">{dish.name}</p>
              <p className="mt-2 font-display text-3xl text-ultramarine">{moneyShort(dish.price)}</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 border-t line-themed max-md:text-left">
                {signatureStory.ingredients.map((x, i) => (
                  <li key={x} className="flex items-baseline gap-3 border-b line-themed py-3 text-sm font-semibold">
                    <span className="text-xs text-ultramarine">0{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3 max-md:justify-center" data-motion-target="cta">
                <Button variant="blue" onClick={() => open('dish', { dish })}>
                  Dish details
                </Button>
                <Button href={business.order.uberEats} external variant="outline">
                  Order delivery
                </Button>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-themed">Representative stock photography. {business.menuDisclaimer}</p>
        </div>
      </div>

      {/* Pinned desktop stage */}
      <div data-story-stage className="story-stage relative h-[100svh] overflow-hidden">
        <div data-story-center data-handoff="story-out" className="absolute inset-0 flex items-center justify-center px-8 pt-[var(--header-h)]">
          <div className="max-w-3xl text-center">
            <p data-story-reveal className="eyebrow justify-center">
              <span className="jp-label text-base normal-case" aria-hidden="true">卓</span>
              Brunch signature story
            </p>
            <h2 data-story-reveal id="story-title-stage" className="h-display mt-5">
              {dish.name}
            </h2>
            <p data-story-reveal className="lead mx-auto mt-4">{signatureStory.lead}</p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {signatureStory.ingredients.map((x) => (
                <li key={x} data-ing className="rounded-full border border-ink/25 bg-white/60 px-4 py-2 text-sm font-semibold">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <p data-story-price className="font-display text-5xl text-ultramarine">{moneyShort(dish.price)}</p>
              <Button variant="blue" onClick={() => open('dish', { dish })}>Dish details</Button>
              <Button href={business.order.uberEats} external variant="outline">Order delivery</Button>
            </div>
            <p className="mt-6 text-xs text-muted-themed">Representative stock photography. Delivery-platform price; may differ in-café.</p>
          </div>
        </div>

        <div data-panel-left className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-ink will-change-transform">
          <img src={img(signatureStory.left)} alt="Eggs, avocado and toast" className="h-full w-full object-cover" />
        </div>
        <div data-panel-right className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-ink will-change-transform">
          <img src={img(signatureStory.right)} alt="Eggs on toast with coffee" className="h-full w-full object-cover" />
        </div>
        <div data-story-cover data-handoff="story-in" className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink/35 text-center text-rice">
          <div>
            <p className="eyebrow justify-center !text-rice/80">Brunch signature story</p>
            <p className="h-display mt-4 max-w-[12ch]">One plate, built around eggs.</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em]">Scroll to open the frame</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
