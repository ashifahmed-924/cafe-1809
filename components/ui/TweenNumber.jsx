'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/** Animates between numeric values (GSAP). Renders the target value immediately for reduced motion. */
export default function TweenNumber({ value, format = (v) => v.toFixed(2), className = '' }) {
  const [shown, setShown] = useState(value);
  const state = useRef({ v: value });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      state.current.v = value;
      setShown(value);
      return undefined;
    }
    const tw = gsap.to(state.current, {
      v: value,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: () => setShown(state.current.v),
    });
    return () => tw.kill();
  }, [value]);

  return <span className={className}>{format(shown)}</span>;
}
