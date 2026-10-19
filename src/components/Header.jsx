import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';

export default function Header({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const navigationRef = useRef(null);
  const home = page === 'privacy' ? '/' : '';

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const keydown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outsideClick = (event) => {
      if (!navigationRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const resize = () => {
      if (toggleRef.current && getComputedStyle(toggleRef.current).display === 'none') setMenuOpen(false);
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('click', outsideClick);
    window.addEventListener('resize', resize, { passive: true });
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('click', outsideClick);
      window.removeEventListener('resize', resize);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner wrap">
        <a href={`${home}#inicio`} className="brand" aria-label="Rotasegur, início">
          <span className="brand-logo"><img src="/assets/rotasegur-logo-transparent.png" alt="Rotasegur Segurança Eletrônica" width="1774" height="887" decoding="async" fetchPriority="high" /></span>
        </a>
        <button ref={toggleRef} id="menu-toggle" className="menu-toggle" type="button" aria-controls="site-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        <nav ref={navigationRef} id="site-nav" className={menuOpen ? 'is-open' : undefined} aria-label="Menu principal" onClick={(event) => { if (event.target.closest('a')) setMenuOpen(false); }}>
          <a href={`${home}#inicio`} className={page === 'home' ? 'nav-home' : undefined}>Início</a>
          <a href={`${home}#solucoes`}>Soluções</a>
          <a href={`${home}#sobre`}>A Rotasegur</a>
          <a href={`${home}#diferenciais`}>Diferenciais</a>
          <a href={`${home}#contato`} className="button button-gold header-cta">Fale com um especialista<Icon name="arrow-up" /></a>
        </nav>
      </div>
    </header>
  );
}
