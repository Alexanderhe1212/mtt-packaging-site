'use client';

import { useEffect } from 'react';
import { animate } from 'motion/mini';
import { inView, scroll, stagger } from 'motion';

/** Progressive enhancement: the complete page stays visible without JavaScript. */
export default function HomeImageMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.home-v4');
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 851px) and (hover: hover) and (pointer: fine)');
    const visited = new WeakSet<Element>();
    let dispose = () => {};

    const start = () => {
      dispose();
      if (reduced.matches) return;
      const cleanups: (() => void)[] = [];
      const controls: ReturnType<typeof animate>[] = [];
      const ease: [number, number, number, number] = [.16, 1, .3, 1];
      const track = (control: ReturnType<typeof animate>) => { controls.push(control); return control; };
      const ready = (image: HTMLImageElement, callback: () => void) => {
        if (image.complete) { if (image.naturalWidth) callback(); return; }
        const loaded = () => { if (image.naturalWidth) callback(); };
        image.addEventListener('load', loaded, { once: true });
        cleanups.push(() => image.removeEventListener('load', loaded));
      };
      root.dataset.homeMotion = 'cinematic';

      const hero = root.querySelector<HTMLElement>('.home-hero-scene');
      if (hero) {
        const image = hero.querySelector<HTMLImageElement>('img')!;
        ready(image, () => {
          if (!visited.has(hero)) {
            visited.add(hero);
            track(animate(hero, { clipPath: ['inset(9% 7% 9% 7% round 14px)', 'inset(0% 0% 0% 0% round 0px)'] }, { duration: desktop.matches ? 1.7 : .85, ease }));
            const copy = Array.from(root.querySelectorAll<HTMLElement>('.ed-hero-copy > *'));
            track(animate(copy, { opacity: [.55, 1], transform: ['translateY(22px)', 'translateY(0px)'] }, { duration: .9, delay: stagger(.09), ease }));
          }
        });
      }

      root.querySelectorAll<HTMLImageElement>('[data-home-image]:not([data-home-image="hero"])').forEach((image, index) => {
        const frame = image.parentElement!;
        cleanups.push(inView(frame, () => {
          ready(image, () => {
            if (visited.has(frame)) return;
            visited.add(frame);
            track(animate(frame, { clipPath: ['inset(10% 4% 10% 4% round 10px)', 'inset(0% 0% 0% 0% round 0px)'], opacity: [.55, 1] }, { duration: desktop.matches ? 1.15 : .65, delay: desktop.matches ? (index % 3) * .07 : 0, ease }));
          });
        }, { amount: .15 }));
      });

      if (desktop.matches) {
        // Scroll and pointer transforms live on separate layers to avoid fighting.
        root.querySelectorAll<HTMLImageElement>('[data-home-image="hero"], [data-home-image="industry"], [data-home-image="detail"]').forEach(image => {
          const target = image.closest('.home-hero-scene, .hp-industry-img, .home-image-frame') as HTMLElement;
          const animation = track(animate(image, { transform: ['translateY(-2%) scale(1.055)', 'translateY(2%) scale(1.055)'] }, { ease: 'linear' }));
          cleanups.push(scroll(animation, { target, offset: ['start end', 'end start'] }));
        });

        const tilts = Array.from(root.querySelectorAll<HTMLElement>('.home-hero-scene, .ed-product, .hp-finish-grid figure'));
        tilts.forEach(surface => {
          const plane = surface.querySelector<HTMLElement>('.home-hero-plane, .home-image-frame');
          if (!plane) return;
          let frame = 0;
          let x = 0;
          let y = 0;
          const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return;
            const rect = surface.getBoundingClientRect();
            x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
            y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
            if (!frame) frame = requestAnimationFrame(() => {
              plane.style.transform = `perspective(1100px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateZ(8px)`;
              frame = 0;
            });
          };
          const reset = () => { cancelAnimationFrame(frame); frame = 0; plane.style.removeProperty('transform'); };
          surface.addEventListener('pointermove', move, { passive: true });
          surface.addEventListener('pointerleave', reset);
          surface.addEventListener('pointercancel', reset);
          window.addEventListener('blur', reset);
          cleanups.push(() => {
            surface.removeEventListener('pointermove', move);
            surface.removeEventListener('pointerleave', reset);
            surface.removeEventListener('pointercancel', reset);
            window.removeEventListener('blur', reset);
            reset();
          });
        });
      }
      dispose = () => {
        cleanups.forEach(cleanup => cleanup());
        controls.forEach(control => control.cancel());
        // Completed native animations may commit inline styles; clear only our properties.
        root.querySelectorAll<HTMLElement>('[data-home-image], .home-image-frame, .hp-industry-img, .home-hero-scene, .home-hero-plane, .ed-hero-copy > *').forEach(element => {
          ['transform', 'clip-path', 'opacity'].forEach(property => element.style.removeProperty(property));
        });
        delete root.dataset.homeMotion;
      };
    };
    start();
    reduced.addEventListener('change', start);
    desktop.addEventListener('change', start);
    return () => {
      dispose();
      reduced.removeEventListener('change', start);
      desktop.removeEventListener('change', start);
    };
  }, []);
  return null;
}
