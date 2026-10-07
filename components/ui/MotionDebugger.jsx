'use client';
import { useEffect, useState } from 'react';
import { ScrollTrigger } from '@/lib/motionUtils';
import { SCENES } from '@/lib/sceneTransitions';

/**
 * Dev-only overlay. Visible when NODE_ENV !== 'production' AND the URL has ?motionDebug=1.
 * Shows every data-motion-section, its motion mode, scroll progress and active triggers.
 */
export default function MotionDebugger() {
  const [on, setOn] = useState(false);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ triggers: 0, y: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    setOn(new URLSearchParams(window.location.search).get('motionDebug') === '1');
  }, []);

  useEffect(() => {
    if (!on) return undefined;
    document.documentElement.dataset.motionDebug = '1';
    const style = document.createElement('style');
    style.textContent = `[data-motion-section]{outline:1px dashed rgba(239,96,69,.7);outline-offset:-1px}
      [data-handoff]{outline:1px dotted rgba(53,84,165,.9)}
      [data-motion-target]{box-shadow:0 0 0 1px rgba(183,160,106,.45)}`;
    document.head.appendChild(style);
    let raf;
    const tick = () => {
      const vh = window.innerHeight;
      const list = Array.from(document.querySelectorAll('[data-motion-section]')).map((el) => {
        const r = el.getBoundingClientRect();
        const visible = r.top < vh && r.bottom > 0;
        return {
          id: el.dataset.motionSection,
          mode: el.dataset.motionMode || 'static',
          visible,
          targets: el.querySelectorAll('[data-motion-target]').length,
          progress: Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh))),
        };
      });
      setRows(list);
      setMeta({ triggers: ScrollTrigger.getAll().length, y: Math.round(window.scrollY) });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      style.remove();
      delete document.documentElement.dataset.motionDebug;
    };
  }, [on]);

  if (!on) return null;
  return (
    <aside
      aria-label="Motion debugger"
      className="fixed bottom-3 left-3 z-[200] max-h-[70vh] w-72 overflow-auto rounded-xl border border-white/20 bg-black/85 p-3 font-mono text-[11px] leading-tight text-white"
    >
      <p className="mb-2 font-bold text-persimmon">
        motionDebug · {meta.triggers} triggers · y {meta.y} · {SCENES.length} handoffs
      </p>
      <ul className="space-y-1">
        {rows.map((r) => (
          <li key={r.id} className={r.visible ? 'text-white' : 'text-white/40'}>
            <span className="inline-block w-44 truncate align-middle">{r.id}</span>
            <span className="align-middle">
              {r.mode} · {r.targets}t · {(r.progress * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
