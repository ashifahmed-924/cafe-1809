import { business } from '@/data/businessData';

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const fmtTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? ':' + String(m).padStart(2, '0') : ''}${suffix}`;
};

/** Current Melbourne day-of-week (0 = Sunday) and minutes since midnight. */
export function melbourneNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: business.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hour = Number(get('hour')) % 24;
  return { day: map[get('weekday')], minutes: hour * 60 + Number(get('minute')) };
}

/** Returns { open: boolean, label: string, today } using the published trading hours. */
export function getOpenStatus(date = new Date()) {
  const { day, minutes } = melbourneNow(date);
  const today = business.hours.find((h) => h.day === day);
  if (!today) return { open: false, label: 'See opening hours', today: null };
  const o = toMin(today.open);
  const c = toMin(today.close);
  if (minutes >= o && minutes < c) {
    return { open: true, label: `Open now · until ${fmtTime(today.close)}`, today };
  }
  if (minutes < o) {
    return { open: false, label: `Closed · opens ${fmtTime(today.open)} today`, today };
  }
  const next = business.hours.find((h) => h.day === (day + 1) % 7);
  return { open: false, label: `Closed · opens ${fmtTime(next.open)} tomorrow`, today };
}
