'use client';
import { useRef } from 'react';
import { Instagram, Facebook, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import Section from '@/components/ui/Section';
import { business } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { EASE, DURATION } from '@/lib/motionConfig';
import { navLinks } from './navLinks';

/** 14 SiteFooter */
export default function SiteFooter() {
  const ref = useRef(null);

  useSectionMotion(ref, ({ root, q, entrance }) => {
    entrance({ start: 'top 85%' });
    const word = root.querySelector('[data-footer-word]');
    if (word) {
      gsap.fromTo(
        word,
        { yPercent: 40, opacity: 0.2 },
        { yPercent: 0, opacity: 1, ease: EASE.out, duration: DURATION.slow, scrollTrigger: { trigger: word, start: 'top 98%', end: 'top 70%', scrub: 0.6 } }
      );
    }
  });

  return (
    <Section
      as="footer"
      ref={ref}
      id="site-footer"
      motionId="site-footer"
      theme="ink"
      transition="reservation-to-footer"
      className="overflow-hidden"
    >
      <div data-handoff="footer-in" className="container-shell pt-10 pb-2 md:pt-12">
        <div className="grid gap-8 border-b line-themed pb-8 md:grid-cols-12 md:gap-10 md:pb-10">
          <div className="max-md:text-center md:col-span-5">
            <p data-motion-target="label" className="eyebrow max-md:justify-center">
              <span className="jp-label text-base normal-case" aria-hidden="true">珈琲</span>
              Glen Waverley
            </p>
            <h2 data-motion-target="heading" className="mt-3 max-w-[14ch] font-display text-[clamp(1.65rem,3.2vw,2.5rem)] leading-[1.1] tracking-[-0.015em] max-md:mx-auto">
              See you on <em className="em-accent">Willow Ave.</em>
            </h2>
            <p data-motion-target="body" className="lead mt-3 max-w-[36rem] text-[0.95rem] leading-relaxed max-md:mx-auto">
              {business.description}
            </p>
          </div>
          <nav data-motion-target="body" aria-label="Footer" className="max-md:text-center md:col-span-3">
            <p className="eyebrow max-md:justify-center">Explore</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-base">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <address data-motion-target="body" className="space-y-2.5 text-sm not-italic max-md:text-center md:col-span-4">
            <p className="eyebrow max-md:justify-center">Find us</p>
            <p className="flex gap-3 max-md:justify-center">
              <MapPin size={16} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                {business.address.full}
              </a>
            </p>
            <p className="flex gap-3 max-md:justify-center">
              <Phone size={16} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={`tel:${business.phone.tel}`} className="link-underline">
                {business.phone.display} · {business.phone.intl}
              </a>
            </p>
            <p className="flex gap-3 max-md:justify-center">
              <Mail size={16} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="link-underline break-all">
                {business.email}
              </a>
            </p>
            <div className="pt-0.5">
              {business.hoursSummary.map((h) => (
                <p key={h.label} className="flex justify-between gap-4 border-b line-themed py-1.5">
                  <span>{h.label}</span>
                  <span className="text-muted-themed">{h.value}</span>
                </p>
              ))}
            </div>
            <div className="flex gap-2.5 pt-1 max-md:justify-center">
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Café 1809 on Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border line-themed transition hover:bg-rice hover:text-ink">
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Café 1809 on Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border line-themed transition hover:bg-rice hover:text-ink">
                <Facebook size={16} aria-hidden="true" />
              </a>
            </div>
          </address>
        </div>

        <p
          data-footer-word
          aria-hidden="true"
          className="select-none whitespace-nowrap py-4 text-center font-display leading-none text-rice/90"
          style={{ fontSize: 'clamp(2.25rem, 8vw, 5.5rem)' }}
        >
          Café 1809
        </p>

        <div className="flex flex-col gap-3 border-t line-themed py-5 text-xs leading-relaxed text-muted-themed max-md:text-center md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl space-y-1 max-md:mx-auto">
            <p>{business.menuDisclaimer}</p>
            <p>{business.imageryNote}</p>
            <p>Reservation, voucher and regulars-list dialogs on this site are UI demos only. No data is collected.</p>
          </div>
          <div className="flex items-center gap-6 max-md:justify-center">
            <p>© {new Date().getFullYear()} Café 1809. All rights reserved.</p>
            <a href="#hero" className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-rice">
              Top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
