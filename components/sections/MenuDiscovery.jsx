'use client';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import FrameImage from '@/components/ui/FrameImage';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { business, categories, menuDiscovery, getItem, menuItems } from '@/data/businessData';
import { useSectionMotion } from '@/lib/motionUtils';
import { DURATION, EASE, STAGGER } from '@/lib/motionConfig';
import { money } from '@/lib/format';

const frameCycle = ['grid', 'outlined', 'asymmetric'];

/** 08 MenuDiscovery — 6 categories × 3 dishes (18) from the Uber Eats listing, plus the fuller list. */
export default function MenuDiscovery() {
  const ref = useRef(null);
  const first = useRef(true);
  const [tab, setTab] = useState('breakfast');
  const { open } = useDialogs();
  const cat = menuDiscovery.find((c) => c.id === tab);
  const dishes = cat.ids.map(getItem);

  useSectionMotion(ref, ({ entrance }) => {
    entrance();
  });

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = ref.current.querySelectorAll('[data-dish-card]');
    gsap.fromTo(
      cards,
      { clipPath: 'inset(0% 0% 100% 0%)', y: 30 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: DURATION.slow, ease: EASE.outStrong, stagger: STAGGER.item, clearProps: 'clipPath' }
    );
    gsap.fromTo('[data-cat-blurb]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out });
  }, [tab]);

  const onKey = (e) => {
    const i = menuDiscovery.findIndex((c) => c.id === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % menuDiscovery.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + menuDiscovery.length) % menuDiscovery.length;
    if (n !== null) {
      e.preventDefault();
      setTab(menuDiscovery[n].id);
      ref.current.querySelector(`#tab-${menuDiscovery[n].id}`)?.focus();
    }
  };

  const fullCats = categories.filter((c) => c.id !== 'featured');

  return (
    <Section ref={ref} id="menu-discovery" theme="rice" transition="interactive-to-menu" labelledBy="menu-title" className="section-pad">
      <div data-handoff="menu-in" className="container-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="menu-title"
            jp="品"
            eyebrow="Menu discovery"
            title={<>Eighteen ways to <em className="em-accent">start.</em></>}
          />
          <p data-motion-target="body" className="lead max-w-md max-md:mx-auto max-md:text-center">
            A taste of the menu as listed on Uber Eats. Tap any dish for details.
          </p>
        </div>

        <div data-handoff="menu-out">
          <div data-motion-target="body" role="tablist" aria-label="Menu categories" onKeyDown={onKey} className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {menuDiscovery.map((c) => (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={tab === c.id}
                aria-controls="menu-panel"
                tabIndex={tab === c.id ? 0 : -1}
                onClick={() => setTab(c.id)}
                className="chip shrink-0"
              >
                {c.label}
              </button>
            ))}
          </div>

          <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8">
            <p data-cat-blurb className="text-base text-muted-themed">{cat.blurb}</p>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {dishes.map((d, i) => (
                <li key={d.id} data-dish-card className="group">
                  <button
                    type="button"
                    onClick={() => open('dish', { dish: d })}
                    aria-label={`${d.name}, ${money(d.price)}. Open details`}
                    className="flex h-full w-full flex-col text-left"
                  >
                    {d.image ? (
                      <FrameImage frame={frameCycle[i % 3]} src={d.image} alt="" aspect="aspect-[4/3]" parallax={false} motionTarget="none" className="transition-transform duration-500 group-hover:-translate-y-1" />
                    ) : (
                      <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-[6px] bg-ink p-5 text-rice transition-transform duration-500 group-hover:-translate-y-1">
                        <span aria-hidden="true" className="absolute -right-3 -top-8 font-display text-[11rem] leading-none text-rice/[0.07]">
                          {d.name[0]}
                        </span>
                        <span aria-hidden="true" className="absolute inset-3 rounded-[4px] border border-brass/40" />
                        <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-brass">{categories.find((c) => c.id === d.category)?.label}</span>
                      </div>
                    )}
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="h-card">{d.name}</h3>
                      <p className="font-display text-xl text-ultramarine">{money(d.price)}</p>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-themed">{d.desc || 'Ask the team for today’s details.'}</p>
                    {d.featured && <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ultramarine">Featured on Uber Eats</p>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <details data-motion-target="item" className="group mt-16 rounded-2xl border line-themed bg-white/50 p-6 sm:p-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl [&::-webkit-details-marker]:hidden">
              Full menu ({menuItems.length} listings)
              <ChevronDown className="transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-8 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {fullCats.map((c) => (
                <div key={c.id}>
                  <h3 className="eyebrow">{c.label}</h3>
                  <ul className="mt-4 divide-y line-themed [&>li]:border-[var(--line)]">
                    {menuItems.filter((m) => m.category === c.id).map((m) => (
                      <li key={m.id} className="flex items-baseline justify-between gap-4 border-b py-2.5 text-sm">
                        <span className="font-semibold">{m.name}</span>
                        <span className="shrink-0 text-muted-themed">{money(m.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          <div data-motion-target="item" className="mt-10 flex flex-col gap-5 max-md:items-center max-md:text-center sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-muted-themed">
              Source: <a className="underline" href={business.menuSourceUrl} target="_blank" rel="noopener noreferrer">Uber Eats listing</a>. {business.menuDisclaimer} Dish groupings and photos are editorial/representative.
            </p>
            <div className="flex flex-wrap gap-3 max-md:justify-center">
              <Button href={business.order.uberEats} external variant="blue">Uber Eats</Button>
              <Button href={business.order.doorDash} external variant="outline">DoorDash</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
