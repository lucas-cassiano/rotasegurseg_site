import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Icon, IconLibrary } from './components/Icons.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import { useReveal } from './hooks/useReveal.js';
import { whatsappUrl } from './site.js';

export default function App({ page = 'home' }) {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <IconLibrary />
      <Header page={page} />
      {page === 'privacy' ? <PrivacyPage /> : <HomePage />}
      <Footer page={page} />
      {page === 'home' && <a className="floating-whatsapp" href={whatsappUrl('Olá! Gostaria de conhecer as soluções da Rotasegur.')} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Rotasegur no WhatsApp"><Icon name="whatsapp" /><span>Vamos conversar</span></a>}
    </>
  );
}
