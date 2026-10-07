'use client';
import { useEffect, useRef } from 'react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import FrameImage from '@/components/ui/FrameImage';
import OpenStatus from '@/components/ui/OpenStatus';
import { business, menuItems, getItem } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { EASE, DURATION } from '@/lib/motionConfig';
import { moneyShort, img, video } from '@/lib/format';

const marqueeNames = menuItems.filter((m) => !m.addon && m.category !== 'sides').map((m) => m.name);

/** 02 FusionHero — lively restaurant video backdrop + aperture frame, masked headline, menu ticker. */
export default function FusionHero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const breaky = getItem('1809-breaky');

  useEffect(() => {
    const el = videoRef.current;
    const root = ref.current;
    if (!el || !root) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;

    const sync = () => {
      if (reduce.matches || document.hidden || !visible) {
        el.pause();
        return;
      }
      const play = el.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };

    const onReduce = () => {
      root.dataset.heroVideo = reduce.matches ? 'static' : 'live';
      sync();
    };
    const onVisibility = () => sync();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.15;
        sync();
      },
      { threshold: [0, 0.15, 0.4] }
    );

    root.dataset.heroVideo = reduce.matches ? 'static' : 'live';
    io.observe(root);
    reduce.addEventListener('change', onReduce);
    document.addEventListener('visibilitychange', onVisibility);
    sync();

    return () => {
      io.disconnect();
      reduce.removeEventListener('change', onReduce);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useSectionMotion(ref, ({ root, entrance, parallax, desktop, tablet }) => {
    const tl = entrance({ immediate: true, delay: 0.25 });

    const card = root.querySelector('[data-hero-card]');
    if (card) tl.from(card, { y: 40, opacity: 0, rotate: -3, duration: DURATION.slow, ease: EASE.out }, 1.2);
    const status = root.querySelector('[data-hero-status]');
    if (status) tl.from(status, { opacity: 0, y: 12, duration: DURATION.base }, 1.4);
    const decor = root.querySelector('[data-hero-decor]');
    if (decor) tl.from(decor, { opacity: 0, scale: 0.9, duration: DURATION.hero, ease: EASE.out }, 0);
    const ring = root.querySelector('[data-hero-ring]');
    if (ring) gsap.to(ring, { rotate: 360, duration: 80, ease: 'none', repeat: -1 });
    const bg = root.querySelector('[data-hero-video-layer]');
    if (bg) tl.fromTo(bg, { scale: 1.08 }, { scale: 1, duration: DURATION.hero, ease: EASE.out }, 0);

    const track = root.querySelector('[data-marquee]');
    if (track) gsap.to(track, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });

    parallax();

    if (desktop || tablet) {
      const frameWrap = root.querySelector('[data-hero-frame-wrap]');
      const copy = root.querySelector('[data-hero-copy]');
      const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 };
      if (frameWrap) gsap.to(frameWrap, { scale: 0.9, yPercent: 8, ease: 'none', scrollTrigger: st });
      if (copy) gsap.to(copy, { yPercent: -14, opacity: 0.35, ease: 'none', scrollTrigger: st });
      if (decor) gsap.to(decor, { yPercent: 18, ease: 'none', scrollTrigger: st });
      if (bg) gsap.to(bg, { yPercent: 8, ease: 'none', scrollTrigger: st });
    }
  });

  return (
    <Section
      ref={ref}
      id="hero"
      motionId="hero"
      theme="ink"
      labelledBy="hero-title"
      className="hero-with-video min-h-[100svh] overflow-hidden"
    >
      <div className="hero-video-stage" aria-hidden="true">
        <div data-hero-video-layer className="hero-video-layer">
          <img
            className="hero-video-poster"
            src={img('hero-dining')}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          <video
            ref={videoRef}
            className="hero-video"
            poster={img('hero-dining')}
            preload="metadata"
            muted
            loop
            playsInline
            autoPlay
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={video('hero-restaurant')} type="video/mp4" />
          </video>
        </div>
        <div className="hero-video-veil" />
      </div>

      <div data-handoff="hero-out" className="relative z-10 flex min-h-[100svh] flex-col pt-[calc(var(--header-h)+1.5rem)]">
        <span
          data-hero-decor
          aria-hidden="true"
          className="pointer-events-none absolute -left-[4vw] top-[14%] select-none font-display leading-none text-transparent [-webkit-text-stroke:1px_rgba(244,240,232,0.14)]"
          style={{ fontSize: 'clamp(9rem, 30vw, 28rem)' }}
        >
          1809
        </span>

        <div className="container-shell relative grid flex-1 items-center gap-10 pb-10 lg:grid-cols-12">
          <div data-hero-copy className="relative z-10 max-md:text-center lg:col-span-7">
            <p data-motion-target="label" className="eyebrow max-md:justify-center">
              <span className="jp-label text-base normal-case" aria-hidden="true">朝食</span>
              Brunch &amp; coffee · Glen Waverley
            </p>
            <h1 id="hero-title" data-motion-target="heading" className="h-display mt-6 max-w-[11ch] max-md:mx-auto">
              Brunch, made <em className="em-accent">to linger.</em>
            </h1>
            <p data-motion-target="body" className="lead mt-7 max-md:mx-auto">
              A neighbourhood café on Willow Ave — house-blend coffee by Niccolo, eggs your way, burgers, bowls and
              bakery sweets, with a table that has room for one more.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 max-md:justify-center">
              <span data-motion-target="cta" className="inline-block">
                <Button href={business.order.uberEats} external variant="primary">
                  Order on Uber Eats
                </Button>
              </span>
              <span data-motion-target="cta" className="inline-block">
                <Button href="#menu-discovery" variant="outline" className="!text-rice !border-rice/50 hover:!bg-rice hover:!text-ink">
                  Explore the menu
                </Button>
              </span>
            </div>
            <div data-hero-status className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 max-md:flex-col max-md:justify-center max-md:text-center">
              <OpenStatus />
              <span className="text-sm text-rice/70">{business.address.full}</span>
            </div>
          </div>

          <div data-hero-frame-wrap className="relative min-w-0 lg:col-span-5">
            <div className="relative mx-auto w-full min-w-0 max-w-[520px] max-md:px-3">
              <FrameImage
                frame="aperture"
                src="hero-dining"
                alt="Coffee, pastries and shared plates on a café table, seen from above"
                aspect="aspect-[4/5]"
                priority
                objectPosition="40% 50%"
              />
              <span
                data-hero-ring
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 rounded-full border border-dashed border-brass/50 max-md:-inset-3"
              />
              <div
                data-hero-card
                className="absolute -bottom-6 left-2 w-[min(15rem,calc(100%-1rem))] rounded-2xl border border-rice/15 bg-ink/85 p-4 shadow-2xl backdrop-blur md:-left-14 md:w-[15rem]"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brass">The signature</p>
                <p className="mt-1 font-display text-2xl">{breaky.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-rice/70">Eggs your way, bacon, smashed avo, halloumi, hashbrown.</p>
                <p className="mt-3 font-display text-xl text-persimmon">{moneyShort(breaky.price)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-y border-rice/15 bg-ink/40 py-4 backdrop-blur-[2px]" aria-hidden="true">
          <div data-marquee className="marquee-track">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0 items-center">
                {marqueeNames.map((n) => (
                  <li key={n + k} className="flex items-center whitespace-nowrap font-display text-xl text-rice/80">
                    <span className="px-6">{n}</span>
                    <span className="text-persimmon">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
