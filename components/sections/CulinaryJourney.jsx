'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import { journeyChapters } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { EASE } from '@/lib/motionConfig';
import { img } from '@/lib/format';

/**
 * 05 CulinaryJourney — "A morning, hour by hour".
 * Desktop: stage pins and a cinematic window wipes between four chapters (scrubbed).
 * Tablet/mobile/reduced-motion: stacked chapter list (visible by default; stage only shows in desktop motion mode).
 */
export default function CulinaryJourney() {
  const ref = useRef(null);

  useSectionMotion(ref, ({ root, entrance, desktop, parallax }) => {
    entrance();
    parallax();
    if (!desktop) return;

    const stage = root.querySelector('[data-journey-stage]');
    const layers = Array.from(stage.querySelectorAll('[data-layer]'));
    const times = Array.from(stage.querySelectorAll('[data-time]'));
    const steps = Array.from(stage.querySelectorAll('[data-step]'));
    const bar = stage.querySelector('[data-progress]');
    const n = layers.length;

    gsap.set(layers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(times.slice(1), { yPercent: 105 });
    gsap.set(steps.slice(1), { opacity: 0.3 });
    gsap.set(bar, { scaleY: 0, transformOrigin: 'top center' });

    const tl = gsap.timeline({
      defaults: { ease: EASE.linear },
      scrollTrigger: { trigger: stage, start: 'top top', end: `+=${(n - 1) * 90}%`, pin: true, scrub: 0.8, anticipatePin: 1 },
    });
    for (let i = 1; i < n; i += 1) {
      const at = i - 1; // each chapter occupies 1 unit of timeline
      tl.fromTo(layers[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: EASE.inOut, duration: 0.8 }, at)
        .fromTo(layers[i].querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1 }, at)
        .to(times[i - 1], { yPercent: -105, duration: 0.6 }, at)
        .fromTo(times[i], { yPercent: 105 }, { yPercent: 0, duration: 0.6 }, at + 0.2)
        .to(steps[i - 1], { opacity: 0.3, duration: 0.4 }, at + 0.1)
        .to(steps[i], { opacity: 1, duration: 0.4 }, at + 0.3)
        .to(bar, { scaleY: i / (n - 1), duration: 0.8 }, at);
    }
    tl.to({}, { duration: 0.3 }); // hold on last chapter
  });

  return (
    <Section ref={ref} id="culinary-journey" theme="ink" transition="featured-to-journey" labelledBy="journey-title" className="journey">
      <style>{`
        .journey-stage{display:none}
        [data-motion-mode='desktop'] .journey-stage{display:flex}
        [data-motion-mode='desktop'] .journey-list{display:none}
      `}</style>

      <div data-handoff="journey-in" className="container-shell pt-[clamp(5rem,11vw,10rem)]">
        <SectionHead
          id="journey-title"
          jp="朝"
          eyebrow="A neighbourhood morning"
          title={<>A day at 1809, <em className="em-accent">hour by hour.</em></>}
          lead="From the first coffee on a weekday morning to a sweet finish before close — one way a visit can unfold."
        />
      </div>

      {/* Stacked (default) */}
      <div className="journey-list container-shell section-pad !pt-14">
        <ol data-handoff="journey-out" className="grid gap-16 md:grid-cols-2">
          {journeyChapters.map((c, i) => (
            <li key={c.time} data-motion-target="item">
              <FrameImage frame="cinematic" src={c.image} alt="" aspect="aspect-[16/11]" motionTarget="none" parallax={false} />
              <p className="mt-6 font-display text-5xl text-persimmon">{c.time}</p>
              <h3 className="h-card mt-2">{c.title}</h3>
              <p className="lead mt-3 !text-base">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pinned desktop stage */}
      <div data-journey-stage className="journey-stage h-[100svh] flex-col pt-[calc(var(--header-h)+1rem)] pb-10">
        <div className="container-shell grid min-h-0 flex-1 grid-cols-12 items-center gap-8">
          <div className="col-span-3">
            <div className="relative h-[clamp(5rem,12vw,10rem)] overflow-hidden" aria-hidden="true">
              {journeyChapters.map((c) => (
                <p key={c.time} data-time className="absolute inset-0 font-display text-[clamp(4.5rem,11vw,9rem)] leading-none text-persimmon">
                  {c.time}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-brass">Hours on the clock</p>
          </div>

          <div data-handoff="journey-out" className="col-span-5 h-full max-h-[68svh]">
            <div className="frame h-full" data-frame="cinematic" data-motion-target="frame">
              <div className="frame-mask" data-frame-mask>
                {journeyChapters.map((c, i) => (
                  <div key={c.time} data-layer className="absolute inset-0">
                    <img data-frame-img={i === 0 ? '' : undefined} className="frame-img" src={img(c.image)} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative col-span-4 pl-8">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-rice/20" aria-hidden="true">
              <span data-progress className="absolute inset-0 bg-persimmon" />
            </span>
            <ol className="space-y-9">
              {journeyChapters.map((c) => (
                <li key={c.time} data-step>
                  <h3 className="font-display text-3xl">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rice/75">{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
