import { useState } from 'react';
import { Icon } from './Icons.jsx';
import { whatsappUrl } from '../site.js';

const services = [
  'Minha residência',
  'Meu comércio / empresa',
  'Meu veículo — rastreamento veicular',
  'Outro patrimônio',
  'Quero conhecer as soluções',
];

export default function QuoteForm({ selectedService, onServiceChange }) {
  const [status, setStatus] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');

  function clearValidity(event) {
    event.currentTarget.setCustomValidity('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const digits = phone.replace(/\D/g, '');

    form.elements.namedItem('name').setCustomValidity(
      name.length >= 2 ? '' : 'Informe seu nome para continuar.',
    );
    form.elements.namedItem('phone').setCustomValidity(
      digits.length >= 10 && digits.length <= 15
        ? ''
        : 'Informe um telefone com DDD, entre 10 e 15 dígitos.',
    );
    form.elements.namedItem('service').setCustomValidity(
      service ? '' : 'Escolha o serviço de seu interesse.',
    );
    if (!form.reportValidity()) return;

    const text = [
      'Olá, Rota Segur! Gostaria de solicitar um orçamento.',
      '',
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Serviço de interesse: ${service}`,
      ...(message ? ['', `Detalhes: ${message}`] : []),
    ].join('\n');
    const url = whatsappUrl(text);
    setFallbackUrl(url);

    // Open during the submit event so the browser can identify a user action.
    // The message remains a draft until the visitor reviews and sends it.
    let opened = false;
    try {
      const whatsappWindow = window.open('about:blank', '_blank');
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = url;
        opened = true;
      }
    } catch {
      // The visible link also works when a browser prevents popup navigation.
    }

    setStatus(
      opened
        ? 'Sua mensagem está pronta. Continue no WhatsApp para enviar.'
        : 'Sua mensagem está pronta. O navegador bloqueou a nova janela. Use o link abaixo para continuar no WhatsApp e enviar.',
    );
  }

  return (
    <form id="quote-form" className="quote-form reveal" onSubmit={handleSubmit}>
      <span className="form-tag">O PRIMEIRO PASSO É SIMPLES</span>
      <h3>Solicite seu orçamento</h3>
      <p>Preencha os dados e continue a conversa no WhatsApp.</p>

      <label htmlFor="name">Seu nome <span>*</span></label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        placeholder="Como podemos chamar você?"
        required
        minLength={2}
        maxLength={100}
        onInput={clearValidity}
      />

      <label htmlFor="phone">Telefone / WhatsApp <span>*</span></label>
      <input
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="(00) 00000-0000"
        required
        maxLength={22}
        pattern={'\\+?[0-9\\s\\(\\)\\.\\-]{10,24}'}
        onInput={clearValidity}
      />

      <label htmlFor="service">O que você deseja proteger? <span>*</span></label>
      <select
        id="service"
        name="service"
        required
        value={selectedService}
        onChange={(event) => {
          clearValidity(event);
          onServiceChange(event.currentTarget.value);
        }}
      >
        <option value="" disabled>Selecione uma opção</option>
        {services.map((service) => <option key={service} value={service}>{service}</option>)}
      </select>

      <label htmlFor="message">Conte um pouco mais <span className="optional">(opcional)</span></label>
      <textarea
        id="message"
        name="message"
        rows={3}
        placeholder="Qual é sua necessidade de segurança?"
        maxLength={1500}
      />
      <button className="button button-gold submit-button" type="submit">
        Continuar no WhatsApp<Icon name="whatsapp" />
      </button>
      <p className="form-note">
        <Icon name="shield" />
        <span>
          Ao continuar, seus dados são incluídos no link do WhatsApp. Você revisa e envia a mensagem. Consulte nossa{' '}
          <a href="/politica-de-privacidade/">Política de privacidade</a>.
        </span>
      </p>
      <p id="form-status" role="status" aria-live="polite">{status}</p>
      <a
        id="whatsapp-fallback"
        className="text-link"
        href={fallbackUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        hidden={!fallbackUrl}
      >
        Abrir minha mensagem no WhatsApp<Icon name="arrow-up" />
      </a>
      <noscript>
        <p>Para solicitar seu orçamento, <a href={whatsappUrl()}>fale diretamente pelo WhatsApp</a>.</p>
      </noscript>
    </form>
  );
}
