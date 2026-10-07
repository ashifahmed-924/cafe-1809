'use client';
import { useRef, useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import gsap from 'gsap';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import TweenNumber from '@/components/ui/TweenNumber';
import { plateBuilder, getItem, business } from '@/data/businessData';
import { useSectionMotion } from '@/lib/motionUtils';
import { img, money, moneyShort } from '@/lib/format';

const baseImages = {
  'free-range-eggs': 'dish-eggs-toast',
  'smashed-avocado': 'dish-smashed-avo',
  benedict: 'dish-avo-eggs',
  'breaky-burger': 'dish-breaky-burger',
};

const drinkImages = {
  latte: 'coffee-latte',
  'flat-white': 'dish-eggs-toast',
  cappuccino: 'coffee-pour',
  'prana-chai-masala': 'texture-beans',
  'turmeric-latte': 'atmosphere-bar',
  'iced-coffee': 'drink-iced-coffee',
};

/** 07 InteractiveExperiences — UI-only plate planner and coffee & bake pairing. No cart, no checkout. */
export default function InteractiveExperiences() {
  const ref = useRef(null);
  const [base, setBase] = useState('smashed-avocado');
  const [addons, setAddons] = useState(['side-halloumi']);
  const [drink, setDrink] = useState('latte');
  const [bake, setBake] = useState('almond-croissant');
  const prevAddons = useRef(addons);

  const baseItem = getItem(base);
  const plateTotal = baseItem.price + addons.reduce((s, id) => s + getItem(id).price, 0);
  const pairTotal = getItem(drink).price + getItem(bake).price;

  useSectionMotion(ref, ({ root, entrance, parallax }) => {
    entrance();
    parallax();
  });

  // pop-in newly added tokens
  useEffect(() => {
    const added = addons.filter((a) => !prevAddons.current.includes(a));
    prevAddons.current = addons;
    if (!added.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    added.forEach((id) => {
      const el = ref.current?.querySelector(`[data-token="${id}"]`);
      if (el) gsap.fromTo(el, { scale: 0.4, opacity: 0, y: 14 }, { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: 'back.out(2)' });
    });
  }, [addons]);

  // swap flourish on pairing
  const pairKey = `${drink}|${bake}`;
  const firstPair = useRef(true);
  useEffect(() => {
    if (firstPair.current) {
      firstPair.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current?.querySelector('[data-pair-result]');
    if (el) gsap.fromTo(el.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
  }, [pairKey]);

  const toggle = (id) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <Section ref={ref} id="interactive-experiences" theme="porcelain" transition="story-to-interactive" labelledBy="interactive-title" className="section-pad overflow-hidden">
      <div data-handoff="interactive-in" className="container-shell">
        <SectionHead
          id="interactive-title"
          jp="遊"
          eyebrow="Plan your visit · interactive"
          title={<>Build the table <em className="em-accent">before you arrive.</em></>}
          lead="A planning toy using menu prices from the delivery listing. Nothing is ordered or stored — it just helps you decide."
        />

        <div data-handoff="interactive-out" className="mt-14 space-y-16">
          <div className="grid min-w-0 items-start gap-12 lg:grid-cols-12">
            <div className="relative mx-auto w-full min-w-0 max-w-[460px] max-md:px-4 lg:col-span-5">
              <div className="frame aspect-square" data-frame="portal" data-motion-target="frame">
                <span className="frame-ring" data-frame-ring aria-hidden="true" />
                <div className="frame-mask" data-frame-mask>
                  <div className="frame-parallax" data-frame-parallax>
                    {plateBuilder.bases.map((b, i) => (
                      <img
                        key={b.id}
                        data-frame-img={i === 0 ? '' : undefined}
                        src={img(baseImages[b.id])}
                        alt={b.id === base ? `${b.label} — representative photo` : ''}
                        aria-hidden={b.id !== base}
                        loading="lazy"
                        className="frame-img absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: b.id === base ? 1 : 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-center text-rice shadow-xl" aria-live="polite">
                <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brass">Your plate</span>
                <span className="font-display text-3xl">
                  $<TweenNumber value={plateTotal} />
                </span>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="card-themed p-6 sm:p-8" data-motion-target="item">
                <fieldset>
                  <legend className="eyebrow">1 · Choose a base</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plateBuilder.bases.map((b) => (
                      <button key={b.id} type="button" className="chip" aria-pressed={base === b.id} onClick={() => setBase(b.id)}>
                        {b.label} <span className="opacity-70">{moneyShort(getItem(b.id).price)}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="mt-7">
                  <legend className="eyebrow">2 · Add extras</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plateBuilder.addons.map((id) => {
                      const it = getItem(id);
                      const on = addons.includes(id);
                      return (
                        <button key={id} type="button" className="chip" aria-pressed={on} onClick={() => toggle(id)}>
                          {on ? <Check size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                          {it.name} <span className="opacity-70">+{moneyShort(it.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="mt-8 border-t line-themed pt-6">
                  <p className="eyebrow">On the plate</p>
                  <ul className="mt-4 flex min-h-[3rem] flex-wrap gap-2">
                    <li className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-rice">{baseItem.name}</li>
                    {addons.map((id) => (
                      <li key={id} data-token={id} className="rounded-full bg-ultramarine px-4 py-2 text-sm font-semibold text-rice">
                        {getItem(id).name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 items-start gap-12 lg:grid-cols-12">
            <div className="relative mx-auto w-full min-w-0 max-w-[460px] max-md:px-4 lg:col-span-5">
              <div className="frame aspect-square" data-frame="portal" data-motion-target="frame">
                <span className="frame-ring" data-frame-ring aria-hidden="true" />
                <div className="frame-mask" data-frame-mask>
                  <div className="frame-parallax" data-frame-parallax>
                    {plateBuilder.drinks.map((id, i) => (
                      <img
                        key={id}
                        data-frame-img={i === 0 ? '' : undefined}
                        src={img(drinkImages[id])}
                        alt={id === drink ? `${getItem(id).name} — representative photo` : ''}
                        aria-hidden={id !== drink}
                        loading="lazy"
                        className="frame-img absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: id === drink ? 1 : 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-center text-rice shadow-xl" aria-live="polite">
                <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brass">Your pair</span>
                <span className="font-display text-3xl">
                  $<TweenNumber value={pairTotal} />
                </span>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="card-themed p-6 sm:p-8" data-motion-target="item">
                <p className="eyebrow">Coffee &amp; bake pairing</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold">Drink</legend>
                    <div className="flex flex-wrap gap-2">
                      {plateBuilder.drinks.map((id) => (
                        <button key={id} type="button" className="chip" aria-pressed={drink === id} onClick={() => setDrink(id)}>
                          {getItem(id).name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold">Something sweet</legend>
                    <div className="flex flex-wrap gap-2">
                      {plateBuilder.pastries.map((id) => (
                        <button key={id} type="button" className="chip" aria-pressed={bake === id} onClick={() => setBake(id)}>
                          {getItem(id).name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <div data-pair-result aria-live="polite" className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t line-themed pt-5">
                  <p className="font-display text-2xl">
                    {getItem(drink).name} <span className="text-ultramarine">+</span> {getItem(bake).name}
                  </p>
                  <p className="font-display text-3xl text-ultramarine">
                    $<TweenNumber value={pairTotal} />
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 max-md:justify-center" data-motion-target="cta">
                <Button href={business.order.uberEats} external variant="blue">
                  See it on Uber Eats
                </Button>
                <p className="text-xs text-muted-themed max-md:text-center">Total {money(plateTotal + pairTotal)} for both · delivery-platform prices, may differ in-café.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
