'use client';
import { useEffect } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motionUtils';
import { useMotionEnv } from '@/lib/motionEnv';
import { MEDIA_QUERIES } from '@/lib/motionConfig';
import { buildSceneTransitions } from '@/lib/sceneTransitions';

/**
 * Mounted after the page content so its ScrollTriggers are created last
 * (pinned sections have already added their pin-spacing). It builds the
 * section-to-section handoffs defined in lib/sceneTransitions.js.
 */
export default function ScrollOrchestrator() {
  const { ready, key } = useMotionEnv();

  useGSAP(
    () => {
      if (!ready) return undefined;
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERIES, (ctx) => {
        const { reduce, mobile, tablet } = ctx.conditions;
        if (reduce) return undefined;
        buildSceneTransitions({ mobile, tablet });
        return undefined;
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { dependencies: [ready, key], revertOnUpdate: true }
  );

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 1200); // late image/layout settle
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return null;
}
