'use client';
import { useState } from 'react';
import { Check, Phone } from 'lucide-react';
import Dialog from './Dialog';
import Button from '@/components/ui/Button';
import { business } from '@/data/businessData';

const times = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm'];

const Field = ({ label, children }) => (
  <label className="block text-sm font-semibold">
    <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-themed">{label}</span>
    {children}
  </label>
);
const inputCls =
  'w-full rounded-xl border line-themed bg-white/60 px-4 py-3 text-base font-normal text-ink placeholder:text-ink/40 focus:border-ultramarine focus:outline-none';

export default function ReservationDialog({ onClose }) {
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState(2);

  return (
    <Dialog onClose={onClose} eyebrow="Reservation · demo preview" title={sent ? 'Demo complete' : 'Plan a table'}>
      {sent ? (
        <div role="status" className="space-y-5">
          <p className="flex items-start gap-3 text-base leading-relaxed">
            <Check className="mt-1 shrink-0 text-ultramarine" size={20} aria-hidden="true" />
            This is a design demo — nothing was sent and no table was booked.
          </p>
          <p className="lead !text-base">
            To reserve or ask about group seating, please call the café on{' '}
            <a className="font-bold underline" href={`tel:${business.phone.tel}`}>
              {business.phone.display}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${business.phone.tel}`} variant="blue">
              <span className="inline-flex items-center gap-2">
                <Phone size={16} aria-hidden="true" /> Call {business.phone.display}
              </span>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <p className="rounded-xl border line-themed px-4 py-3 text-sm text-muted-themed">{business.demoDisclaimer}</p>
          <Field label="Name">
            <input data-autofocus required name="name" autoComplete="name" className={inputCls} placeholder="Your name" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date">
              <input required type="date" name="date" className={inputCls} />
            </Field>
            <Field label="Time">
              <select name="time" className={inputCls} defaultValue={times[1]}>
                {times.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
          <fieldset>
            <legend className="mb-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-themed">Party size</legend>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} type="button" className="chip" aria-pressed={party === n} onClick={() => setParty(n)}>
                  {n}
                  {n === 6 ? '+' : ''}
                </button>
              ))}
            </div>
          </fieldset>
          <Field label="Notes (optional)">
            <textarea name="notes" rows={3} className={inputCls} placeholder="Highchair, dietary needs…" />
          </Field>
          <Button type="submit" variant="blue">
            Preview request
          </Button>
        </form>
      )}
    </Dialog>
  );
}
