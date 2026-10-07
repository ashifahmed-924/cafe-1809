'use client';
import { useEffect, useState } from 'react';
import { getOpenStatus } from '@/lib/hours';

/** Live open/closed pill computed from published hours in Melbourne time (client-only, no hydration mismatch). */
export default function OpenStatus({ className = '' }) {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold ${className}`} aria-live="polite">
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${status ? (status.open ? 'bg-emerald-400' : 'bg-persimmon') : 'bg-brass'}`}
      />
      {status ? status.label : 'Mon–Fri 7:30am–3:30pm · Sat–Sun 8:30am–3pm'}
    </p>
  );
}
