'use client';
import { useState } from 'react';
import Dialog from './Dialog';
import Button from '@/components/ui/Button';
import { business } from '@/data/businessData';

const amounts = [25, 50, 75, 100];

export default function GiftCardDialog({ onClose }) {
  const [amount, setAmount] = useState(50);
  const [done, setDone] = useState(false);
  const [to, setTo] = useState('');
  const [msg, setMsg] = useState('Brunch is on me.');

  return (
    <Dialog onClose={onClose} theme="porcelain" eyebrow="Gift voucher · concept preview" title={done ? 'Concept preview only' : 'Design a gift voucher'}>
      {done ? (
        <div role="status" className="space-y-5">
          <p className="lead !text-base">
            Café 1809 does not currently sell vouchers through this website — this is a UI concept. If you would like to
            arrange a gift, ask the team in person or call{' '}
            <a className="font-bold underline" href={`tel:${business.phone.tel}`}>
              {business.phone.display}
            </a>
            .
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
            setDone(true);
          }}
        >
          <div
            aria-label="Voucher preview"
            className="relative overflow-hidden rounded-2xl bg-ink p-6 text-rice"
          >
            <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-brass/60" aria-hidden="true" />
            <span className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-brass/40" aria-hidden="true" />
            <p className="jp-label text-sm text-brass" aria-hidden="true">
              珈琲
            </p>
            <p className="font-display text-3xl">Café 1809</p>
            <p className="mt-6 font-display text-5xl text-persimmon">${amount}</p>
            <p className="mt-3 text-sm text-rice/80">
              {to ? `For ${to} — ` : ''}
              {msg}
            </p>
          </div>
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-themed">Amount (AUD)</legend>
            <div className="flex flex-wrap gap-2">
              {amounts.map((a) => (
                <button key={a} type="button" className="chip" aria-pressed={amount === a} onClick={() => setAmount(a)}>
                  ${a}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm font-semibold">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-themed">To</span>
            <input data-autofocus value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-xl border line-themed bg-white/60 px-4 py-3 font-normal focus:border-ultramarine focus:outline-none" placeholder="Recipient name" />
          </label>
          <label className="block text-sm font-semibold">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-themed">Message</span>
            <input value={msg} maxLength={60} onChange={(e) => setMsg(e.target.value)} className="w-full rounded-xl border line-themed bg-white/60 px-4 py-3 font-normal focus:border-ultramarine focus:outline-none" />
          </label>
          <Button type="submit" variant="blue">
            Preview voucher
          </Button>
        </form>
      )}
    </Dialog>
  );
}
