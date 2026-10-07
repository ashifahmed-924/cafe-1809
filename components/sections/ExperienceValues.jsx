'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import { values, menuItems, business } from '@/data/businessData';
import { gsap, useSectionMotion, countUp } from '@/lib/motionUtils';
import { EASE } from '@/lib/motionConfig';

const facts = [
  { n: business.hours.length, label: 'days a week open' },
  { n: menuItems.filter((m) => m.category === 'hot').length, label: 'hot drinks listed' },
  { n: menuItems.filter((m) => !m.addon).length, label: 'dishes & drinks listed' },
];

/** 09 ExperienceValues — editorial grid frames, value rows that draw in, real-data counters (no invented stats). */
export default function ExperienceValues() {
  const ref = useRef(null);

  useSectionMotion(ref, ({ root, q, entrance, parallax, desktop }) => {
    entrance();
    parallax();
    q('[data-count]').forEach((el) => countUp(el, Number(el.dataset.count)));
    q('[data-rule]').forEach((el) =>
      gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: EASE.inOutStrong, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
    );
    if (desktop) {
      const stack = root.querySelector('[data-values-media]');
      if (stack) gsap.to(stack, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    }
  });

  return (
    <Section ref={ref} id="experience-values" theme="ink" transition="menu-to-values" labelledBy="values-title" className="section-pad overflow-hidden">
      <div data-handoff="values-in" className="container-shell">
        <SectionHead
          id="values-title"
          jp="心"
          eyebrow="What the café is about"
          title={<>Small room, <em className="em-accent">generous table.</em></>}
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div data-handoff="values-out" className="lg:col-span-7">
            <ol>
              {values.map((v) => (
                <li key={v.n} data-motion-target="item" className="group relative grid gap-3 py-8 sm:grid-cols-[5rem_1fr]">
                  <span data-rule aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-rice/25" />
                  <span className="font-display text-4xl text-brass">{v.n}</span>
                  <div>
                    <h3 className="h-card transition-colors group-hover:text-persimmon">{v.title}</h3>
                    <p className="lead mt-3 !text-base">{v.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-rice/25 pt-8 sm:gap-4">
              {facts.map((f) => (
                <div key={f.label} data-motion-target="item" className="flex min-w-0 flex-col max-md:items-center max-md:text-center">
                  <dt className="order-2 mt-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-rice/70 sm:text-xs sm:tracking-[0.16em]">{f.label}</dt>
                  <dd className="font-display text-4xl text-persimmon sm:text-6xl">
                    <span data-count={f.n}>{f.n}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-values-media className="relative min-w-0 lg:col-span-5">
            <FrameImage frame="grid" src="atmosphere-bar" alt="Baristas working behind a café coffee bar" aspect="aspect-[4/5]" />
            <div className="absolute -bottom-10 left-2 w-[46%] md:-left-12">
              <FrameImage frame="outlined" src="coffee-pour" alt="Barista pouring latte art" aspect="aspect-square" />
            </div>
            <p className="mt-14 text-xs text-rice/60 max-md:text-center lg:pl-[46%]">Representative stock photography.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
