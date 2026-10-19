import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const trackingService = 'Meu veículo — rastreamento veicular';

const slides = [
  {
    label: 'Proteção que faz a diferença',
    photoClass: 'hero-camera',
    photoLabel: 'Imagem ilustrativa de câmera de segurança com iluminação dourada',
    eyebrow: 'SEU MUNDO MAIS SEGURO',
    heading: 'Sua tranquilidade.',
    emphasis: 'Nossa missão.',
    description: <>Tecnologia que protege. Pessoas que cuidam.<br />Segurança eletrônica e patrimonial para o que<br className="desktop-break" /> realmente importa para você.</>,
    action: 'Quero proteger meu patrimônio',
  },
  {
    label: 'Cuidado em todos os momentos',
    photoClass: 'hero-patrol',
    photoLabel: 'Imagem promocional de vigilância patrimonial da Rotasegur',
    eyebrow: 'PROTEÇÃO PERTO DE VOCÊ',
    heading: 'Seu patrimônio.',
    emphasis: 'Nosso cuidado.',
    description: <>Rondas e segurança patrimonial que aproximam<br className="desktop-break" /> a proteção da sua rotina. Para sua casa,<br className="desktop-break" /> seu comércio e sua tranquilidade.</>,
    action: 'Converse com nossa equipe',
  },
  {
    label: 'Tecnologia sempre atenta',
    photoClass: 'hero-monitoring',
    photoLabel: 'Imagem promocional de uma central de monitoramento',
    eyebrow: 'MONITORAMENTO 24 HORAS',
    heading: 'Você segue a vida.',
    emphasis: 'A gente protege.',
    description: <>Câmeras, alarmes e uma central de monitoramento.<br className="desktop-break" /> Soluções conectadas para acompanhar<br className="desktop-break" /> a segurança do seu espaço, dia e noite.</>,
    action: 'Encontre sua solução',
  },
  {
    label: 'Segurança em movimento',
    photoClass: 'hero-tracking',
    photoLabel: 'Imagem ilustrativa de veículo grafite à noite com iluminação dourada',
    eyebrow: 'RASTREAMENTO VEICULAR',
    heading: 'Seu veículo.',
    emphasis: 'No seu radar.',
    description: <>Acompanhe a localização do seu veículo<br className="desktop-break" /> e siga sua rotina com mais tranquilidade.<br />Conheça o rastreamento veicular da Rotasegur.</>,
    action: 'Quero rastrear meu veículo',
    service: trackingService,
    assuranceTitle: 'Rastreamento veicular',
    assuranceCopy: 'Mais tranquilidade em cada trajeto.',
  },
];

export default function HeroCarousel({ onSelectService }) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [autoplayRevision, setAutoplayRevision] = useState(0);
  const touchStart = useRef(null);
  const pauseRequested = manuallyPaused || reducedMotion;
  const paused = pauseRequested || hovering || focused || pageHidden;
  const activeSlide = slides[activeIndex];
  const pauseLabel = pauseRequested ? 'Reproduzir carrossel' : 'Pausar carrossel';

  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion) setManuallyPaused(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplayRevision, paused]);

  function showSlide(index) {
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
    setAutoplayRevision((revision) => revision + 1);
  }

  function handleTouchStart(event) {
    touchStart.current = null;
    if (event.touches.length !== 1 || event.target.closest('a, button, input, select, textarea')) return;
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  function handleTouchEnd(event) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !event.changedTouches.length) return;
    const deltaX = event.changedTouches[0].clientX - start.x;
    const deltaY = event.changedTouches[0].clientY - start.y;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }

  return (
    <section id="inicio" className="hero" aria-label="Destaques da Rotasegur">
      <div
        id="hero-carousel"
        className="hero-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Soluções de segurança"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => setFocused(event.currentTarget.contains(event.relatedTarget))}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {slides.map((slide, index) => {
          const active = index === activeIndex;
          const Heading = index === 0 ? 'h1' : 'h2';
          return (
            <article
              key={slide.label}
              className={`hero-slide${active ? ' is-active' : ''}`}
              data-label={slide.label}
              data-assurance-title={slide.assuranceTitle}
              data-assurance-copy={slide.assuranceCopy}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className={`hero-photo ${slide.photoClass}`} role="img" aria-label={slide.photoLabel} />
              <div className="hero-shade" />
              <div className="wrap hero-content">
                <p className="eyebrow"><span /> {slide.eyebrow}</p>
                <Heading>{slide.heading}<br /><em>{slide.emphasis}</em></Heading>
                <p className="hero-description">{slide.description}</p>
                <div className="hero-actions">
                  <a
                    className="button button-gold"
                    href="#contato"
                    data-quote-service={slide.service}
                    onClick={slide.service ? () => onSelectService?.(slide.service) : undefined}
                  >{slide.action}<Icon name="arrow-up" /></a>
                  <a className="text-link" href="#solucoes">Conheça as soluções<Icon name="arrow" /></a>
                </div>
                <p className="hero-location"><Icon name="pin" /> Formosa do Oeste – PR e região</p>
              </div>
            </article>
          );
        })}
        <div className="hero-assurance">
          <Icon name="shield" />
          <div><strong>{activeSlide.assuranceTitle || 'Proteção 24h'}</strong><span>{activeSlide.assuranceCopy || 'Seu dia. Sua noite. Sua paz.'}</span></div>
          <span className="status-dot" />
        </div>
        <div className="hero-bottom wrap">
          <div className="slide-caption" aria-atomic="true" aria-live={paused ? 'polite' : 'off'}>
            <span id="slide-current">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="caption-line" />
            <span id="slide-label">{activeSlide.label}</span>
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots" aria-label="Escolher destaque">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  data-slide-to={index}
                  className={index === activeIndex ? 'is-active' : undefined}
                  aria-label={`Ir para slide ${index + 1}: ${slide.label}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>
            <button
              id="slide-pause"
              className="circle-button pause-button"
              type="button"
              aria-label={pauseLabel}
              data-paused={String(pauseRequested)}
              title={reducedMotion ? 'Reprodução automática desativada pela preferência de movimento reduzido' : pauseLabel}
              disabled={reducedMotion}
              onClick={() => setManuallyPaused((value) => !value)}
            ><span /></button>
            <button id="slide-prev" className="circle-button" type="button" aria-label="Slide anterior" onClick={() => showSlide(activeIndex - 1)}><Icon name="arrow" className="arrow-left" /></button>
            <button id="slide-next" className="circle-button" type="button" aria-label="Próximo slide" onClick={() => showSlide(activeIndex + 1)}><Icon name="arrow" /></button>
          </div>
        </div>
        <span className="image-note">Imagem ilustrativa</span>
      </div>
    </section>
  );
}
