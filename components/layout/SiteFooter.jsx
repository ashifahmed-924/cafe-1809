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
      <div data-handoff="footer-in" className="container-shell pt-20">
        <div className="grid gap-12 border-b line-themed pb-14 md:grid-cols-12">
          <div className="max-md:text-center md:col-span-5">
            <p data-motion-target="label" className="eyebrow max-md:justify-center">
              <span className="jp-label text-base normal-case" aria-hidden="true">珈琲</span>
              Glen Waverley
            </p>
            <h2 data-motion-target="heading" className="h-section mt-5 max-w-[14ch] max-md:mx-auto">
              See you on <em className="em-accent">Willow Ave.</em>
            </h2>
            <p data-motion-target="body" className="lead mt-5 max-md:mx-auto">
              {business.description}
            </p>
          </div>
          <nav data-motion-target="body" aria-label="Footer" className="max-md:text-center md:col-span-3">
            <p className="eyebrow max-md:justify-center">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-lg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <address data-motion-target="body" className="space-y-4 text-sm not-italic max-md:text-center md:col-span-4">
            <p className="eyebrow max-md:justify-center">Find us</p>
            <p className="flex gap-3 max-md:justify-center">
              <MapPin size={18} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                {business.address.full}
              </a>
            </p>
            <p className="flex gap-3 max-md:justify-center">
              <Phone size={18} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={`tel:${business.phone.tel}`} className="link-underline">
                {business.phone.display} · {business.phone.intl}
              </a>
            </p>
            <p className="flex gap-3 max-md:justify-center">
              <Mail size={18} className="mt-0.5 shrink-0 text-persimmon" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="link-underline break-all">
                {business.email}
              </a>
            </p>
            <div className="pt-1">
              {business.hoursSummary.map((h) => (
                <p key={h.label} className="flex justify-between gap-4 border-b line-themed py-2">
                  <span>{h.label}</span>
                  <span className="text-muted-themed">{h.value}</span>
                </p>
              ))}
            </div>
            <div className="flex gap-3 pt-2 max-md:justify-center">
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Café 1809 on Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border line-themed transition hover:bg-rice hover:text-ink">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Café 1809 on Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full border line-themed transition hover:bg-rice hover:text-ink">
                <Facebook size={18} aria-hidden="true" />
              </a>
            </div>
          </address>
        </div>

        <p
          data-footer-word
          aria-hidden="true"
          className="select-none whitespace-nowrap py-8 text-center font-display leading-none text-rice/90"
          style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)' }}
        >
          Café 1809
        </p>

        <div className="flex flex-col gap-4 border-t line-themed py-8 text-xs leading-relaxed text-muted-themed max-md:text-center md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl space-y-2 max-md:mx-auto">
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
