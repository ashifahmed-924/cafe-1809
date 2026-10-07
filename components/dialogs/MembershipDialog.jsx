'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Dialog from './Dialog';
import Button from '@/components/ui/Button';
import { business } from '@/data/businessData';

const perks = [
  'A friendly nudge when seasonal specials land',
  'Early word on weekend events',
  'A place on the "regulars" shortlist for table requests',
];

export default function MembershipDialog({ onClose }) {
  const [joined, setJoined] = useState(false);
  return (
    <Dialog onClose={onClose} eyebrow="Regulars list · concept preview" title={joined ? 'Concept preview only' : 'Join the 1809 regulars'}>
      {joined ? (
        <div role="status" className="space-y-5">
          <p className="lead !text-base">
            No membership programme is live and no email was stored. Follow{' '}
            <a className="font-bold underline" href={business.social.instagram} target="_blank" rel="noopener noreferrer">
              @1809cafe
            </a>{' '}
            for café news, or say hello at the counter.
          </p>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setJoined(true);
          }}
        >
          <p className="rounded-xl border line-themed px-4 py-3 text-sm text-muted-themed">{business.demoDisclaimer}</p>
          <ul className="space-y-2">
            {perks.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <Check size={18} className="mt-0.5 shrink-0 text-ultramarine" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <label className="block text-sm font-semibold">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-themed">Email</span>
            <input data-autofocus required type="email" autoComplete="email" className="w-full rounded-xl border line-themed bg-white/60 px-4 py-3 font-normal focus:border-ultramarine focus:outline-none" placeholder="you@example.com" />
          </label>
          <Button type="submit" variant="blue">
            Preview sign-up
          </Button>
        </form>
      )}
    </Dialog>
  );
}
