'use client';
import { useEffect, useState } from 'react';
import { business } from '@/data/businessData';
import { fmtTime, melbourneNow } from '@/lib/hours';

/** Weekly hours with today highlighted (Melbourne time, resolved after hydration). */
export default function HoursTable() {
  const [today, setToday] = useState(null);
  useEffect(() => {
    setToday(melbourneNow().day);
  }, []);

  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {business.hours.map((h) => {
          const on = today === h.day;
          return (
            <tr key={h.day} className={`border-b line-themed ${on ? 'font-bold text-ultramarine' : ''}`} aria-current={on ? 'date' : undefined}>
              <th scope="row" className="py-3 pr-4 font-medium">
                {h.label}
                {on && <span className="ml-2 rounded-full bg-ultramarine px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-rice">Today</span>}
              </th>
              <td className="py-3 text-right">
                {fmtTime(h.open)} – {fmtTime(h.close)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
