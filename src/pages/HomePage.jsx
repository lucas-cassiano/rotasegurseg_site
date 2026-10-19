import { useState } from 'react';
import { Icon } from '../components/Icons.jsx';
import { CONTACT, whatsappUrl } from '../site.js';
import HeroCarousel from '../components/HeroCarousel.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import QuoteForm from '../components/QuoteForm.jsx';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState('');

  return (
    <main id="conteudo">
      <HeroCarousel onSelectService={setSelectedService} />

      <div className="trust-strip">
        <div className="wrap trust-inner">
          <p>
            <Icon name="shield" />
            <span>Protegendo desde <strong>2016</strong>
            </span>
          </p>
          <p>
            <Icon name="clock" />
            <span>Monitoramento <strong>24 horas</strong>
            </span>
          </p>
          <p>
            <Icon name="camera" />
            <span>Tecnologia a favor da <strong>segurança</strong>
            </span>
          </p>
          <p>
            <Icon name="pin" />
            <span>Presença <strong>local e regional</strong>
            </span>
          </p>
        </div>
      </div>

      <ServicesSection />

      <section id="sobre" className="about section-space">
        <div className="wrap about-grid">
          <div className="about-visual reveal">
            <div className="about-photo" role="img" aria-label="Imagem promocional da Rotasegur com profissional de segurança e viatura">
            </div>
            <div className="since-stamp">
              <span>DESDE</span>
              <strong>2016</strong>
              <span>AO SEU LADO</span>
            </div>
            <div className="photo-caption">
              <span className="status-dot">
              </span> Presença que transmite confiança <small>Imagem promocional ilustrativa</small>
            </div>
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow">02 / ESSA É A ROTASEGUR</p>
            <h2>Quem protege<br />o seu patrimônio<br />
              <em>cuida da sua paz.</em>
            </h2>
            <p>Desde 2016, a Rotasegur une tecnologia e cuidado humano para proteger famílias e empresas em Formosa do Oeste e região.</p>
            <p>Acreditamos que segurança começa com confiança. Por isso, estamos perto: entendendo sua necessidade, orientando a escolha dos equipamentos e acompanhando a proteção do seu espaço.</p>
            <div className="values">
              <span>
                <Icon name="check" /> Qualidade</span>
              <span>
                <Icon name="check" /> Agilidade</span>
              <span>
                <Icon name="check" /> Confiança</span>
            </div>
            <a className="text-link dark-link" href="#contato">Conte com a Rotasegur<Icon name="arrow-up" />
            </a>
          </div>
        </div>
      </section>

      <section id="diferenciais" className="technology section-space">
        <div className="wrap">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 / INTELIGÊNCIA QUE PROTEGE</p>
              <h2>Mais conexão.<br />
                <span>Mais tranquilidade.</span>
              </h2>
            </div>
            <p className="section-intro">Soluções que se complementam para levar a segurança além do básico. Converse com a equipe sobre a combinação ideal para você.</p>
          </div>
          <div className="technology-grid">
            <article className="tech-item reveal">
              <Icon name="scan" />
              <span className="tech-index">01</span>
              <h3>Reconhecimento facial</h3>
              <p>Tecnologia para identificar pessoas e apoiar o controle de acesso aos ambientes.</p>
            </article>
            <article className="tech-item reveal">
              <Icon name="camera" />
              <span className="tech-index">02</span>
              <h3>Leitura de placas</h3>
              <p>Sistemas LPR para identificar placas de veículos e acompanhar a movimentação.</p>
            </article>
            <article className="tech-item reveal">
              <Icon name="bell" />
              <span className="tech-index">03</span>
              <h3>Botão de pânico</h3>
              <p>Um recurso para sinalizar situações de emergência à central de monitoramento.</p>
            </article>
            <article className="tech-item reveal">
              <Icon name="phone" />
              <span className="tech-index">04</span>
              <h3>Na palma da mão</h3>
              <p>Acompanhamento por aplicativo para manter você conectado à segurança do seu espaço.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="wrap reveal">
          <Icon name="shield" />
          <p>Você vive os momentos.<br />
            <strong>A gente cuida da sua segurança.</strong>
          </p>
          <a href="#contato" className="button button-dark">Encontre a proteção ideal<Icon name="arrow-up" />
          </a>
        </div>
      </section>

      <section className="faq section-space">
        <div className="wrap faq-grid">
          <div className="reveal">
            <p className="eyebrow">04 / VAMOS ESCLARECER</p>
            <h2>Segurança começa<br />com uma<br />
              <span>boa conversa.</span>
            </h2>
            <p>Reunimos algumas respostas para você dar o próximo passo com confiança.</p>
            <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Tire sua dúvida com a equipe<Icon name="arrow-up" />
            </a>
          </div>
          <div className="faq-list reveal">
            <details open>
              <summary>Em quais regiões a Rotasegur atende?<span aria-hidden="true">
                </span>
              </summary>
              <p>Atendemos Formosa do Oeste, no Paraná, e região. Fale com nossa equipe para confirmar a disponibilidade na sua localização.</p>
            </details>
            <details>
              <summary>Posso contratar para minha casa ou empresa?<span aria-hidden="true">
                </span>
              </summary>
              <p>Sim. A Rotasegur oferece soluções para residências e comércios. A equipe orienta a escolha dos serviços e equipamentos de acordo com as necessidades do local.</p>
            </details>
            <details>
              <summary>O monitoramento funciona 24 horas?<span aria-hidden="true">
                </span>
              </summary>
              <p>Sim. O serviço de monitoramento atua 24 horas por dia. Consulte a equipe para conhecer os detalhes da contratação e os recursos disponíveis para o seu projeto.</p>
            </details>
            <details>
              <summary>Vocês também instalam os equipamentos?<span aria-hidden="true">
                </span>
              </summary>
              <p>Sim. A empresa trabalha com venda e instalação de câmeras, alarmes e outros equipamentos de segurança, além de soluções de controle de acesso e cercas elétricas.</p>
            </details>
            <details>
              <summary>A Rotasegur oferece rastreamento veicular?<span aria-hidden="true">
                </span>
              </summary>
              <p>Sim. Também trabalhamos com rastreamento veicular. Fale com nossa equipe para conhecer as opções disponíveis e solicitar um orçamento para seu veículo.</p>
            </details>
            <details>
              <summary>Como solicito um orçamento?<span aria-hidden="true">
                </span>
              </summary>
              <p>Preencha o formulário abaixo para preparar sua mensagem no WhatsApp, ou entre em contato pelo telefone {CONTACT.phoneDisplay}. Conte o que deseja proteger para receber uma orientação da equipe.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contato" className="contact section-space">
        <div className="wrap contact-grid">
          <div className="contact-copy reveal">
            <p className="eyebrow">05 / ESTAMOS PERTO DE VOCÊ</p>
            <h2>Vamos proteger<br />
              <em>o que importa?</em>
            </h2>
            <p>Conte o que você precisa. Nossa equipe ajuda a encontrar o caminho para uma rotina mais segura.</p>
            <div className="contact-details">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
                <span>
                  <small>FALE PELO WHATSAPP</small>
                  <strong>{CONTACT.whatsappDisplay}</strong>
                </span>
                <Icon name="arrow-up" className="icon contact-arrow" />
              </a>
              <a href={`tel:${CONTACT.phone}`}>
                <Icon name="phone" />
                <span>
                  <small>LIGUE PARA A ROTASEGUR</small>
                  <strong>{CONTACT.phoneDisplay}</strong>
                </span>
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                <Icon name="mail" />
                <span>
                  <small>E-MAIL</small>
                  <strong>{CONTACT.email}</strong>
                </span>
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Paran%C3%A1+557+Formosa+do+Oeste+PR" target="_blank" rel="noopener noreferrer">
                <Icon name="pin" />
                <span>
                  <small>VENHA NOS CONHECER</small>
                  <strong>Avenida Paraná, 557</strong>
                  <span>Formosa do Oeste – PR · CEP 85830-000</span>
                </span>
              </a>
            </div>
          </div>
          <QuoteForm selectedService={selectedService} onServiceChange={setSelectedService} />
        </div>
      </section>
    </main>
  );
}
