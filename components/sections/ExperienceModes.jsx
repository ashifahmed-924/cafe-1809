'use client';
import { useRef, useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import { experienceModes } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { DURATION, EASE, STAGGER } from '@/lib/motionConfig';
import { img } from '@/lib/format';

/** 03 ExperienceModes — vertical-shutter panels; the active panel opens, siblings fold to slim strips. */
export default function ExperienceModes() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const first = useRef(true);

  useSectionMotion(ref, ({ root, entrance, mobile }) => {
    entrance();
    const wrap = root.querySelector('[data-panels]');
    const panels = Array.from(root.querySelectorAll('[data-panel]'));
    gsap.from(panels, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: DURATION.frame,
      ease: EASE.frame,
      stagger: STAGGER.bar * 1.5,
      clearProps: 'clipPath',
      scrollTrigger: { trigger: wrap, start: mobile ? 'top 88%' : 'top 78%', once: true },
    });
    gsap.from(panels.map((p) => p.querySelector('[data-panel-img]')), {
      scale: 1.35,
      duration: DURATION.frame + 0.5,
      ease: EASE.out,
      stagger: STAGGER.bar * 1.5,
      scrollTrigger: { trigger: wrap, start: mobile ? 'top 88%' : 'top 78%', once: true },
    });
  });

  // animate the newly-opened panel's text (not on first paint)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current?.querySelector(`[data-panel="${active}"] [data-panel-body]`);
    if (el) gsap.fromTo(el.children, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION.base, stagger: 0.07, ease: EASE.out, delay: 0.25 });
  }, [active]);

  return (
    <Section ref={ref} id="experience-modes" theme="rice" transition="hero-to-modes" labelledBy="modes-title" className="section-pad">
      <div data-handoff="modes-in" className="container-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="modes-title"
            jp="席"
            eyebrow="Ways to spend a morning"
            title={<>Four ways to <em className="em-accent">settle in.</em></>}
          />
          <p data-motion-target="body" className="lead max-w-md max-md:mx-auto max-md:text-center lg:pb-3">
            Hover, tap or tab through the modes. Same kitchen, same coffee — a different pace for every visit.
          </p>
        </div>

        <div data-handoff="modes-out" data-panels className="mt-14 flex flex-col gap-3 lg:h-[min(72vh,640px)] lg:flex-row">
          {experienceModes.map((m, i) => {
            const on = active === i;
            return (
              <article
                key={m.id}
                data-panel={i}
                data-active={on}
                onMouseEnter={() => window.matchMedia('(hover: hover) and (min-width: 1024px)').matches && setActive(i)}
                className="group relative h-[5.5rem] overflow-hidden rounded-[22px] bg-ink text-rice transition-[flex-grow,height] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=true]:h-[30rem] lg:h-auto lg:min-h-0 lg:grow lg:basis-0 lg:data-[active=true]:grow-[4.2]"
              >
                <img
                  data-panel-img
                  src={img(m.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-data-[active=false]:opacity-45 group-data-[active=false]:saturate-50"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/20" />

                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`mode-body-${i}`}
                  onClick={() => setActive(i)}
                  className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5 text-left lg:h-full lg:items-start lg:justify-start"
                >
                  <span className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-brass">0{i + 1}</span>
                    <span
                      className={`font-display text-xl transition-opacity duration-500 lg:[writing-mode:vertical-rl] lg:text-2xl ${on ? 'lg:opacity-0' : ''}`}
                    >
                      {m.title}
                    </span>
                  </span>
                  <span className="jp-label text-2xl text-rice/80" aria-hidden="true">
                    {m.jp}
                  </span>
                </button>

                <div
                  id={`mode-body-${i}`}
                  aria-hidden={!on}
                  data-panel-body
                  className={`absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 lg:p-9 ${on ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  <div className="lg:w-[30rem] lg:max-w-full">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">{m.time}</p>
                    <h3 className="mt-2 font-display text-3xl lg:text-5xl">{m.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-rice/80 lg:text-base">{m.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {m.picks.map((p) => (
                        <li key={p} className="rounded-full border border-rice/30 px-3 py-1.5 text-xs font-semibold">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
