'use client';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import Button from '@/components/ui/Button';
import HoursTable from '@/components/ui/HoursTable';
import OpenStatus from '@/components/ui/OpenStatus';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { business } from '@/data/businessData';
import { gsap, useSectionMotion } from '@/lib/motionUtils';
import { EASE } from '@/lib/motionConfig';

/** 13 ReservationVisit — details, live hours, a stylised map card and a demo-only reservation dialog. */
export default function ReservationVisit() {
  const ref = useRef(null);
  const { open } = useDialogs();

  useSectionMotion(ref, ({ root, entrance, parallax }) => {
    entrance();
    parallax();
    const streets = root.querySelectorAll('[data-street]');
    const pin = root.querySelector('[data-map-pin]');
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector('[data-map]'), start: 'top 85%', once: true } });
    tl.from(streets, { scaleX: 0, transformOrigin: 'left center', duration: 1, stagger: 0.08, ease: EASE.inOut });
    if (pin) tl.from(pin, { y: -60, opacity: 0, duration: 0.8, ease: 'bounce.out' }, '-=0.3');
  });

  return (
    <Section ref={ref} id="reservation-visit" theme="rice" transition="gift-to-reservation" labelledBy="visit-title" className="section-pad">
      <div data-handoff="reservation-in" className="container-shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead
              id="visit-title"
              jp="訪"
              eyebrow="Reservation & visit"
              title={<>Come in, <em className="em-accent">sit down.</em></>}
              lead="Walk in, call ahead, or preview the reservation flow below. Group or table questions are best handled by phone."
            />

            <address data-motion-target="body" className="mt-10 space-y-4 not-italic">
              <p className="flex gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-ultramarine" aria-hidden="true" />
                <a className="link-underline" href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer">{business.address.full}</a>
              </p>
              <p className="flex gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-ultramarine" aria-hidden="true" />
                <span>
                  <a className="link-underline" href={`tel:${business.phone.tel}`}>{business.phone.display}</a>
                  <span className="text-muted-themed"> · {business.phone.intl}</span>
                </span>
              </p>
              <p className="flex gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-ultramarine" aria-hidden="true" />
                <a className="link-underline break-all" href={`mailto:${business.email}`}>{business.email}</a>
              </p>
              <p className="flex items-center gap-3 pt-1">
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border line-themed px-4 text-sm font-semibold transition hover:bg-ink hover:text-rice">
                  <Instagram size={16} aria-hidden="true" /> Instagram
                </a>
                <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border line-themed px-4 text-sm font-semibold transition hover:bg-ink hover:text-rice">
                  <Facebook size={16} aria-hidden="true" /> Facebook
                </a>
              </p>
            </address>

            <div data-motion-target="item" className="card-themed mt-10 p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow">Opening hours</p>
                <OpenStatus className="!text-ink" />
              </div>
              <HoursTable />
            </div>
          </div>

          <div data-handoff="reservation-out" className="space-y-8 lg:col-span-6">
            <FrameImage frame="shutters" src="atmosphere-counter" alt="Café counter and seating" aspect="aspect-[16/10]" cover="var(--rice-paper)" objectPosition="50% 35%" />

            <div data-motion-target="item" data-map className="relative overflow-hidden rounded-[22px] bg-ink p-6 text-rice sm:p-8">
              <svg viewBox="0 0 400 180" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g stroke="#C9DBE6" strokeOpacity=".35" strokeWidth="1" fill="none">
                  <rect data-street x="0" y="40" width="400" height="2" fill="#C9DBE6" fillOpacity=".25" stroke="none" />
                  <rect data-street x="0" y="105" width="400" height="3" fill="#B7A06A" fillOpacity=".5" stroke="none" />
                  <rect data-street x="0" y="150" width="400" height="2" fill="#C9DBE6" fillOpacity=".2" stroke="none" />
                  <path d="M90 0 V180 M210 0 V180 M310 0 V180" />
                </g>
              </svg>
              <span data-map-pin aria-hidden="true" className="absolute right-[24%] top-[30%] inline-block h-5 w-5 rounded-full bg-persimmon ring-8 ring-persimmon/25" />
              <div className="relative">
                <p className="eyebrow !text-rice/70">Willow Ave</p>
                <p className="mt-2 font-display text-3xl">{business.address.street}</p>
                <p className="text-sm text-rice/75">{business.address.suburb} {business.address.state} {business.address.postcode}</p>
                <div className="mt-6">
                  <Button href={business.address.mapsUrl} external variant="primary">Open in Google Maps</Button>
                </div>
              </div>
            </div>

            <div data-motion-target="item" className="card-themed p-6 sm:p-8">
              <p className="eyebrow">Reservation · demo preview</p>
              <p className="lead mt-3 !text-base">{business.demoDisclaimer}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="blue" onClick={() => open('reservation')}>Preview a table request</Button>
                <Button href={`tel:${business.phone.tel}`} variant="outline">Call {business.phone.display}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
