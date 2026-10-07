'use client';
import { useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import FrameImage from '@/components/ui/FrameImage';
import Button from '@/components/ui/Button';
import { useDialogs } from '@/components/dialogs/DialogProvider';
import { useSectionMotion } from '@/lib/motionUtils';

/** 12 GiftMembership — two concept cards that open UI-only dialogs (nothing is sold or stored). */
export default function GiftMembership() {
  const ref = useRef(null);
  const { open } = useDialogs();

  useSectionMotion(ref, ({ entrance, parallax }) => {
    entrance();
    parallax();
  });

  return (
    <Section ref={ref} id="gift-membership" theme="porcelain" transition="gallery-to-gift" labelledBy="gift-title" className="section-pad overflow-hidden">
      <div data-handoff="gift-in" className="container-shell">
        <SectionHead
          id="gift-title"
          jp="贈"
          eyebrow="Gifts & regulars · concept"
          title={<>Share a table <em className="em-accent">with someone.</em></>}
          lead="Two ideas to explore. Both are interface concepts — Café 1809 isn’t selling vouchers or running a membership through this site."
        />

        <div data-handoff="gift-out" className="mt-14 grid gap-8 lg:grid-cols-2">
          <article data-motion-target="item" className="card-themed overflow-hidden">
            <FrameImage frame="porcelain" src="dessert-cake" alt="Slice of berry cake" aspect="aspect-[16/10]" />
            <div className="p-7 sm:p-9">
              <p className="eyebrow">Concept preview</p>
              <h3 className="h-card mt-3 !text-3xl">The brunch voucher</h3>
              <p className="lead mt-3 !text-base">Pick an amount, write a line, and preview a voucher design for a friend who deserves a long breakfast.</p>
              <div className="mt-6 max-md:text-center">
                <Button variant="blue" onClick={() => open('gift')}>Design a voucher</Button>
              </div>
            </div>
          </article>

          <article data-motion-target="item" className="card-themed overflow-hidden lg:mt-16">
            <FrameImage frame="shutters" src="coffee-latte" alt="Latte art in a black cup" aspect="aspect-[16/10]" cover="var(--porcelain-blue)" objectPosition="50% 40%" />
            <div className="p-7 sm:p-9">
              <p className="eyebrow">Concept preview</p>
              <h3 className="h-card mt-3 !text-3xl">The 1809 regulars list</h3>
              <p className="lead mt-3 !text-base">A friendly way to hear about specials and weekend plans. Preview the sign-up experience — no email is stored.</p>
              <div className="mt-6 max-md:text-center">
                <Button variant="outline" onClick={() => open('membership')}>Preview sign-up</Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}
