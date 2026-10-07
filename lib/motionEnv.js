'use client';
import { useSyncExternalStore } from 'react';

/**
 * Shared motion environment (singleton):
 *  - ready: web fonts resolved (so splitText line measurement is correct)
 *  - key:   increments (debounced) when viewport WIDTH changes, so line splits are recomputed.
 * Height-only changes (mobile URL bar) are ignored on purpose.
 */
let snap = '0:0';
let state = { ready: false, key: 0 };
let started = false;
const listeners = new Set();

function set(patch) {
  state = { ...state, ...patch };
  snap = `${state.ready ? 1 : 0}:${state.key}`;
  listeners.forEach((l) => l());
}

function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    requestAnimationFrame(() => set({ ready: true }));
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
  else go();
  setTimeout(go, 2500); // failsafe if fonts never resolve
  let lastW = window.innerWidth;
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        set({ key: state.key + 1 });
      }
    }, 350);
  });
}

function subscribe(cb) {
  listeners.add(cb);
  start();
  return () => listeners.delete(cb);
}

export function useMotionEnv() {
  const s = useSyncExternalStore(subscribe, () => snap, () => '0:0');
  const [r, k] = s.split(':');
  return { ready: r === '1', key: Number(k) };
}
