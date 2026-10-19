import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

export function useReveal() {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    const showAll = () => {
      document.documentElement.classList.remove('js-reveal');
      elements.forEach((element) => element.classList.add('is-visible'));
    };
    if (reducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }
    let observer;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
      elements.forEach((element) => observer.observe(element));
      document.documentElement.classList.add('js-reveal');
    } catch {
      showAll();
    }
    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove('js-reveal');
    };
  }, [reducedMotion]);
}
