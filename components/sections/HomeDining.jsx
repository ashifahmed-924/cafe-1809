'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import Button from '@/components/ui/Button';
import { business } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';

const steps = [
  { n: '1', title: 'Pick your plates', text: 'Browse the café menu on Uber Eats — or find Café 1809 on DoorDash.' },
  { n: '2', title: 'The kitchen gets going', text: 'Eggs, burgers and bowls are made as the order comes in.' },
  { n: '3', title: 'Brunch at your table', text: 'Arrives at your door. Delivery area and fees are set by each app.' },
];

/** 10 HomeDining — masked oversized arch image + delivery steps. Links out to Uber Eats / DoorDash only. */
export default function HomeDining() {
  const ref = useRef(null);

  useSectionMotion(ref, ({ root, entrance, parallax, desktop }) => {
    entrance();
    parallax();
    const line = root.querySelector('[data-step-line]');
    if (line)
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: line.parentElement, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 } }
      );
    if (desktop) {
      const word = root.querySelector('[data-home-word]');
      if (word) gsap.to(word, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    }
  });

  return (
    <Section ref={ref} id="home-dining" theme="rice" transition="values-to-home" labelledBy="home-title" className="section-pad overflow-hidden">
      <span
        data-home-word
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[6%] select-none whitespace-nowrap font-display leading-none text-transparent [-webkit-text-stroke:1px_rgba(21,24,39,0.1)]"
        style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}
      >
        At home
      </span>

      <div data-handoff="home-in" className="container-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div data-handoff="home-out" className="lg:col-span-5">
            <FrameImage frame="masked" src="dish-acai" alt="Smoothie bowl topped with fresh fruit" aspect="aspect-[3/4]" className="mx-auto max-w-[480px]" />
            <p className="mx-auto mt-4 max-w-[480px] text-xs text-muted-themed">Representative stock photography.</p>
          </div>

          <div className="lg:col-span-7">
            <SectionHead
              id="home-title"
              jp="家"
              eyebrow="Brunch at home"
              title={<>The café table, <em className="em-accent">delivered.</em></>}
              lead="Can’t make it to Willow Ave? The menu is also available for delivery on Uber Eats and DoorDash."
            />

            <ol className="relative mt-12 space-y-8 pl-10">
              <span aria-hidden="true" className="absolute bottom-3 left-[0.95rem] top-3 w-px bg-ink/15">
                <span data-step-line className="absolute inset-0 bg-ultramarine" />
              </span>
              {steps.map((s) => (
                <li key={s.n} data-motion-target="item" className="relative">
                  <span className="absolute -left-10 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ultramarine text-sm font-bold text-rice">{s.n}</span>
                  <h3 className="h-card">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-themed">{s.text}</p>
                </li>
              ))}
            </ol>

            <div data-motion-target="cta" className="mt-12 flex flex-wrap gap-3 max-md:justify-center">
              <Button href={business.order.uberEats} external variant="blue">Order on Uber Eats</Button>
              <Button href={business.order.doorDash} external variant="outline">Find us on DoorDash</Button>
            </div>
            <p data-motion-target="item" className="mt-5 max-w-xl text-xs leading-relaxed text-muted-themed">
              {business.menuDisclaimer} Delivery fees, service fees and availability are set by the delivery apps.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
