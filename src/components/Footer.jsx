import { Icon } from './Icons.jsx';

export default function Footer({ page }) {
  const home = page === 'privacy' ? '/' : '';
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="brand" href={`${home}#inicio`} aria-label="Rotasegur, voltar ao início"><span className="brand-logo"><img src="/assets/rotasegur-logo-transparent.png" alt="Rotasegur Segurança Eletrônica" width="1774" height="887" decoding="async" loading="lazy" /></span></a>
          <p>Tecnologia que protege.<br />Pessoas que cuidam.</p>
          <nav aria-label="Menu do rodapé"><a href={`${home}#solucoes`}>Soluções</a><a href={`${home}#sobre`}>A Rotasegur</a><a href={`${home}#contato`}>Contato</a></nav>
          <a className="back-to-top" href="#inicio" aria-label="Voltar ao início"><Icon name="arrow-up" /></a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Rotasegur. Todos os direitos reservados.</p>
          <a className="footer-privacy" href="/politica-de-privacidade/" aria-current={page === 'privacy' ? 'page' : undefined}>Política de privacidade</a>
          <p>Formosa do Oeste – PR <span className="footer-dot">·</span> Protegendo desde 2016</p>
        </div>
      </div>
    </footer>
  );
}
