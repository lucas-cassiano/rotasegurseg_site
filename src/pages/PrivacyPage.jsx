import { Icon } from '../components/Icons.jsx';
import { CONTACT, whatsappUrl } from '../site.js';

export default function PrivacyPage() {
  return (
    <main id="conteudo">
      <section className="privacy-hero" aria-labelledby="privacy-title">
        <div className="wrap">
          <nav className="privacy-breadcrumb" aria-label="Você está em">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Política de privacidade</span>
          </nav>
          <p className="eyebrow">
            <span>
            </span> TRANSPARÊNCIA E PROTEÇÃO</p>
          <h1 id="privacy-title">Política de<br />
            <em>privacidade.</em>
          </h1>
          <p className="privacy-lead">Entenda como seus dados são tratados no site, no aplicativo <strong>RotaSegur Rastreamento</strong> e nos nossos serviços de rastreamento veicular.</p>
          <p className="privacy-date">
            <Icon name="clock" />Última atualização: <time dateTime="2026-10-19">19 de outubro de 2026</time>
          </p>
        </div>
      </section>

      <div className="wrap privacy-layout">
        <nav className="privacy-index" aria-labelledby="privacy-index-title">
          <h2 id="privacy-index-title">Nesta política</h2>
          <ol>
            <li>
              <a href="#definicoes">Definições</a>
            </li>
            <li>
              <a href="#dados">Dados pessoais utilizados</a>
            </li>
            <li>
              <a href="#finalidades">Para que usamos os dados</a>
            </li>
            <li>
              <a href="#bases-legais">Bases legais</a>
            </li>
            <li>
              <a href="#compartilhamento">Compartilhamento</a>
            </li>
            <li>
              <a href="#seguranca">Conservação e segurança</a>
            </li>
            <li>
              <a href="#direitos">Seus direitos</a>
            </li>
            <li>
              <a href="#cookies">Cookies e tecnologias</a>
            </li>
            <li>
              <a href="#transferencias">Transferências internacionais</a>
            </li>
            <li>
              <a href="#atualizacoes">Atualizações da política</a>
            </li>
            <li>
              <a href="#contato-privacidade">Contato sobre privacidade</a>
            </li>
          </ol>
        </nav>

        <article className="privacy-document" aria-label="Texto da política de privacidade">
          <div className="privacy-intro">
            <p>A <strong>Rotasegur Segurança Eletrônica e Patrimonial</strong> respeita a privacidade de quem visita seus canais, utiliza o aplicativo <strong>RotaSegur Rastreamento</strong> ou contrata seus serviços. Este documento descreve o uso de informações pessoais nesses contextos e as formas de exercer seus direitos.</p>
            <p>O tratamento segue a <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm" target="_blank" rel="noopener noreferrer">Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018)</a>.</p>
          </div>

          <section id="definicoes" aria-labelledby="titulo-definicoes">
            <h2 id="titulo-definicoes">
              <span className="section-number">01</span>Definições</h2>
            <p>Alguns termos usados ao longo desta página:</p>
            <ul>
              <li>
                <strong>Dado pessoal:</strong> informação que identifica alguém ou permite identificar uma pessoa.</li>
              <li>
                <strong>Titular:</strong> a pessoa a quem uma informação pessoal diz respeito.</li>
              <li>
                <strong>Controlador:</strong> quem decide como e para que os dados serão tratados. Nos tratamentos descritos nesta política, essa função cabe à Rotasegur.</li>
              <li>
                <strong>Operador:</strong> prestador de serviço que realiza o tratamento por conta da Rotasegur.</li>
              <li>
                <strong>Tratamento:</strong> atividades realizadas com os dados, como recebê-los, consultá-los, guardá-los, transmiti-los ou apagá-los.</li>
            </ul>
          </section>

          <section id="dados" aria-labelledby="titulo-dados">
            <h2 id="titulo-dados">
              <span className="section-number">02</span>Dados pessoais utilizados</h2>
            <h3>Informações que você fornece</h3>
            <p>Conforme sua interação ou contratação, podemos receber nome, CPF ou CNPJ, endereço, e-mail e telefone; informações de cadastro, autenticação e contrato; além do conteúdo de mensagens, formulários e pedidos de suporte.</p>
            <h3>Veículo e operação do rastreamento</h3>
            <p>O serviço pode tratar a placa e as características do veículo cadastrado, suas posições geográficas, percursos registrados, alertas e ocorrências, bem como informações técnicas do rastreador e do chip utilizado na comunicação.</p>
            <h3>Informações de acesso</h3>
            <p>Durante o uso dos canais digitais, podem ser registrados endereço IP, momento do acesso, características do dispositivo, navegador e sistema operacional. Cookies e recursos semelhantes estão descritos na <a href="#cookies">seção 8</a>.</p>
            <div className="privacy-callout">
              <p>
                <strong>No formulário deste site:</strong> nome, telefone, serviço de interesse e mensagem são incluídos no link encaminhado ao WhatsApp quando você escolhe continuar. Você pode revisar a mensagem na plataforma antes de enviá-la à Rotasegur.</p>
            </div>
          </section>

          <section id="finalidades" aria-labelledby="titulo-finalidades">
            <h2 id="titulo-finalidades">
              <span className="section-number">03</span>Para que usamos os dados</h2>
            <ul>
              <li>Disponibilizar o rastreamento e o acompanhamento dos veículos vinculados ao serviço.</li>
              <li>Permitir a consulta de posições, trajetos e notificações aos usuários autorizados.</li>
              <li>Responder a dúvidas, preparar orçamentos e oferecer atendimento e suporte.</li>
              <li>Administrar a relação contratual, os cadastros e as cobranças correspondentes.</li>
              <li>Atender exigências legais e regulatórias e resguardar direitos.</li>
              <li>Identificar tentativas de fraude e manter a segurança da operação e dos sistemas.</li>
              <li>Comunicar assuntos relativos ao serviço e aperfeiçoar a experiência nos canais digitais.</li>
            </ul>
          </section>

          <section id="bases-legais" aria-labelledby="titulo-bases">
            <h2 id="titulo-bases">
              <span className="section-number">04</span>Bases legais</h2>
            <p>Cada uso de dados precisa de um fundamento previsto na LGPD. Para atender pedidos de orçamento ou prestar o serviço contratado, por exemplo, o fundamento pode ser a realização de procedimentos preliminares solicitados pelo titular ou a execução do contrato.</p>
            <p>Também podem se aplicar o cumprimento de deveres legais ou regulatórios, a defesa de direitos em processos e o legítimo interesse, desde que respeitados os direitos e as liberdades do titular. Quando um tratamento depender de consentimento, ele será solicitado para a finalidade correspondente.</p>
          </section>

          <section id="compartilhamento" aria-labelledby="titulo-compartilhamento">
            <h2 id="titulo-compartilhamento">
              <span className="section-number">05</span>Compartilhamento</h2>
            <p>Para executar as atividades descritas, pode ser necessário disponibilizar informações a prestadores de hospedagem, comunicação, processamento de pagamentos, suporte e operação do rastreamento. Esse acesso deve se limitar ao que cada serviço exige, com deveres de confidencialidade e proteção compatíveis com a legislação.</p>
            <p>Informações também poderão ser fornecidas a autoridades quando houver determinação competente ou obrigação legal.</p>
            <p>Ao seguir links para plataformas externas, como WhatsApp ou Google Maps, você também estará sujeito às práticas desses serviços. Consulte as políticas do <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp</a> e do <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Google</a> para conhecer o tratamento realizado por eles.</p>
          </section>

          <section id="seguranca" aria-labelledby="titulo-seguranca">
            <h2 id="titulo-seguranca">
              <span className="section-number">06</span>Conservação e segurança</h2>
            <p>A Rotasegur utiliza cuidados técnicos e administrativos para reduzir riscos de acesso indevido, perda, alteração ou exposição das informações. Esses cuidados incluem restrições de acesso, acompanhamento dos sistemas, orientações internas e recursos de criptografia quando aplicáveis.</p>
            <p>A conservação dos dados considera a necessidade do atendimento e do contrato, os prazos exigidos por lei e a proteção de direitos. Quando essas razões deixarem de existir, os dados serão excluídos ou tornados anônimos, ressalvadas as situações em que sua manutenção seja legalmente permitida ou exigida.</p>
          </section>

          <section id="direitos" aria-labelledby="titulo-direitos">
            <h2 id="titulo-direitos">
              <span className="section-number">07</span>Seus direitos</h2>
            <p>Você pode entrar em contato para exercer os direitos previstos na LGPD, entre eles:</p>
            <ul>
              <li>Saber se tratamos seus dados e obter acesso às informações correspondentes.</li>
              <li>Pedir a atualização ou correção de dados incorretos ou incompletos.</li>
              <li>Solicitar anonimização, bloqueio ou exclusão quando os dados forem excessivos, desnecessários ou tratados em desacordo com a lei.</li>
              <li>Solicitar a portabilidade, conforme as regras aplicáveis.</li>
              <li>Conhecer os destinatários com quem houve compartilhamento.</li>
              <li>Retirar um consentimento e pedir a exclusão dos dados tratados com esse fundamento, respeitadas as hipóteses legais de conservação.</li>
              <li>Receber informação sobre a possibilidade de não consentir e suas consequências.</li>
            </ul>
            <p>Faça sua solicitação pelo <a href="#contato-privacidade">canal de privacidade</a>. Para proteger suas informações, podemos precisar confirmar sua identidade. O pedido será analisado considerando as condições e os prazos legais; eventuais impedimentos serão esclarecidos no atendimento.</p>
            <p>Você também pode consultar a <a href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados" target="_blank" rel="noopener noreferrer">Autoridade Nacional de Proteção de Dados (ANPD)</a> sobre seus direitos e os meios de apresentar uma solicitação à autoridade.</p>
          </section>

          <section id="cookies" aria-labelledby="titulo-cookies">
            <h2 id="titulo-cookies">
              <span className="section-number">08</span>Cookies e tecnologias</h2>
            <p>Cookies são pequenos arquivos que um serviço pode guardar no navegador. Em nossos canais digitais, esses recursos e tecnologias semelhantes podem apoiar o funcionamento, as preferências, o desempenho e a compreensão do uso dos serviços, conforme as configurações adotadas.</p>
            <p>O site institucional não implementa cookies próprios de publicidade ou ferramentas de análise de audiência. A hospedagem e as plataformas externas acessadas por links podem utilizar recursos técnicos próprios, sujeitos às respectivas políticas.</p>
            <p>Você pode gerenciar ou apagar cookies nas configurações do navegador. Restringir recursos necessários ao funcionamento de um serviço pode afetar suas funcionalidades.</p>
          </section>

          <section id="transferencias" aria-labelledby="titulo-transferencias">
            <h2 id="titulo-transferencias">
              <span className="section-number">09</span>Transferências internacionais</h2>
            <p>Alguns fornecedores podem realizar operações com dados em outros países. Quando isso ocorrer em tratamentos sob responsabilidade da Rotasegur, serão observados os mecanismos e as garantias exigidos pela LGPD para transferências internacionais.</p>
          </section>

          <section id="atualizacoes" aria-labelledby="titulo-atualizacoes">
            <h2 id="titulo-atualizacoes">
              <span className="section-number">10</span>Atualizações da política</h2>
            <p>Mudanças nos serviços, na tecnologia ou na legislação podem exigir a revisão deste documento. A versão atual ficará disponível neste endereço, identificada pela data indicada no início da página.</p>
          </section>

          <section id="contato-privacidade" aria-labelledby="titulo-contato">
            <h2 id="titulo-contato">
              <span className="section-number">11</span>Contato sobre privacidade</h2>
            <p>Para dúvidas sobre esta política ou solicitações relacionadas aos seus dados no <strong>RotaSegur Rastreamento</strong> e nos demais canais da empresa, fale conosco:</p>
            <div className="privacy-contact-card">
              <strong>Rotasegur Segurança Eletrônica e Patrimonial</strong>
              <address>
                <a href={`mailto:${CONTACT.email}?subject=Privacidade%20-%20RotaSegur%20Rastreamento`}>
                  <Icon name="mail" />
                  <span>{CONTACT.email}</span>
                </a>
                <a href={whatsappUrl('Olá! Gostaria de tratar de uma solicitação sobre privacidade no RotaSegur Rastreamento.')} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" />
                  <span>WhatsApp: {CONTACT.whatsappDisplay}</span>
                </a>
                <a href={`tel:${CONTACT.phone}`}>
                  <Icon name="phone" />
                  <span>Telefone: {CONTACT.phoneDisplay}</span>
                </a>
                <p>
                  <Icon name="pin" />
                  <span>Avenida Paraná, 557<br />Formosa do Oeste – PR · CEP 85830-000</span>
                </p>
              </address>
            </div>
          </section>
          <a className="button button-gold privacy-return" href="/">Voltar para o site<Icon name="arrow" />
          </a>
        </article>
      </div>
    </main>
  );
}
