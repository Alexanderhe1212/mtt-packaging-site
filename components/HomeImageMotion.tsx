'use client';

import { useEffect } from 'react';

/** Progressive enhancement: the server-rendered photographs are always visible. */
export default function HomeImageMotion() {
  useEffect(() => {
    const root = document.querySelector('.home-v4');
    if (!root || !('IntersectionObserver' in window)) return;

    const images = Array.from(root.querySelectorAll<HTMLImageElement>('[data-home-image]'));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visited = new Set<HTMLImageElement>();
    const pending = new Map<HTMLImageElement, () => void>();
    let observer: IntersectionObserver | undefined;

    const stop = () => {
      observer?.disconnect();
      pending.forEach((handler, image) => image.removeEventListener('load', handler));
      pending.clear();
      images.forEach(image => image.classList.remove('home-image-enter'));
    };

    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const image = entry.target as HTMLImageElement;
          const reveal = () => {
            pending.delete(image);
            if (preference.matches || !image.naturalWidth) return;
            visited.add(image);
            image.classList.add('home-image-enter');
            observer?.unobserve(image);
          };
          if (image.complete) reveal();
          else if (!pending.has(image)) {
            pending.set(image, reveal);
            image.addEventListener('load', reveal, { once: true });
          }
        });
      }, { threshold: 0.12 });
      images.forEach(image => { if (!visited.has(image)) observer?.observe(image); });
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, []);

  return null;
}
