import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const services = [
  {
    imageClass: 'image-monitoring',
    imageLabel: 'Ilustração de central de monitoramento',
    badge: 'VIGILÂNCIA CONTÍNUA',
    icon: 'monitor',
    title: 'Monitoramento 24h',
    description: 'Uma central atenta aos sinais do seu sistema, acompanhando a proteção do seu patrimônio dia e noite.',
  },
  {
    imageClass: 'image-patrol',
    imageLabel: 'Ilustração de segurança patrimonial',
    badge: 'PRESENÇA QUE PROTEGE',
    icon: 'shield',
    title: 'Segurança patrimonial',
    description: 'Rondas com viatura e uma equipe preparada para cuidar da segurança de residências e comércios.',
  },
  {
    imageClass: 'image-tracking',
    imageLabel: 'Imagem ilustrativa de veículo grafite em ambiente noturno',
    badge: 'SEGURANÇA EM MOVIMENTO',
    icon: 'pin',
    title: 'Rastreamento veicular',
    description: 'Rastreamento para acompanhar a localização do seu veículo e trazer mais tranquilidade à sua rotina.',
  },
  {
    imageClass: 'image-cameras',
    imageLabel: 'Ilustração de instalação de câmera de segurança',
    badge: 'TECNOLOGIA A SEU FAVOR',
    icon: 'camera',
    title: 'Câmeras e CFTV',
    description: 'Venda e instalação de câmeras para ampliar sua visão sobre o que acontece nos ambientes que você protege.',
  },
  {
    imageClass: 'image-alarms',
    imageLabel: 'Ilustração de instalação de alarme',
    badge: 'PROTEÇÃO DESDE O ACESSO',
    icon: 'bell',
    title: 'Alarmes e acesso',
    description: 'Alarmes, cercas elétricas e controle de acesso para construir uma proteção adequada à sua rotina.',
  },
];

export default function ServicesSection() {
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [scrollLimits, setScrollLimits] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame;
    function updateControls() {
      const maximumScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const atStart = track.scrollLeft <= 4;
      const atEnd = track.scrollLeft >= maximumScroll - 4;
      setScrollLimits((current) => current.atStart === atStart && current.atEnd === atEnd
        ? current : { atStart, atEnd });
    }
    function handleScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateControls);
    }
    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateControls, { passive: true });
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(updateControls) : null;
    observer?.observe(track);
    if (track.firstElementChild) observer?.observe(track.firstElementChild);
    updateControls();
    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateControls);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function scrollServices(direction) {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  return (
    <section id="solucoes" className="solutions section-space">
      <div className="wrap">
        <div className="section-heading reveal">
          <div><p className="eyebrow">01 / NOSSAS SOLUÇÕES</p><h2>Proteção de verdade.<br /><span>Em cada detalhe.</span></h2></div>
          <div className="section-intro">
            <p>Da proteção do seu imóvel ao rastreamento do seu veículo, soluções com o cuidado que você merece.</p>
            <div className="service-controls">
              <button id="services-prev" className="circle-button" type="button" aria-label="Ver serviços anteriores" disabled={scrollLimits.atStart} onClick={() => scrollServices(-1)}><Icon name="arrow" className="arrow-left" /></button>
              <button id="services-next" className="circle-button" type="button" aria-label="Ver próximos serviços" disabled={scrollLimits.atEnd} onClick={() => scrollServices(1)}><Icon name="arrow" /></button>
            </div>
          </div>
        </div>
        <div ref={trackRef} id="services-track" className="services-track" role="region" aria-label="Nossas soluções de segurança" tabIndex={0}>
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className={`service-image ${service.imageClass}`} role="img" aria-label={service.imageLabel}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="image-badge">{service.badge}</span>
              </div>
              <div className="service-body">
                <Icon name={service.icon} className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contato" className="card-link">Quero saber mais<Icon name="arrow-up" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="services-footnote"><span className="little-star">✳</span> Cada necessidade é única. Seu projeto de segurança também deve ser. <a href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a></p>
      </div>
    </section>
  );
}
