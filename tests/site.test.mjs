import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { act, createElement, StrictMode } from 'react';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(project, 'dist');
const origin = 'https://rotasegur.test';
const routes = {
  home: { path: '/', file: 'index.html' },
  privacy: { path: '/politica-de-privacidade/', file: 'politica-de-privacidade/index.html' },
};
const trackingService = 'Meu veículo — rastreamento veicular';

async function documentFor(page) {
  return new JSDOM(await readFile(join(output, routes[page].file), 'utf8'), {
    url: `${origin}${routes[page].path}`,
    pretendToBeVisual: true,
  });
}

async function outputFile(url) {
  let file = join(output, decodeURIComponent(url.pathname));
  if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  assert.ok((await stat(file)).isFile(), `Local resource must exist: ${url.pathname}`);
  return file;
}

async function listFiles(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(files.map((file) => file.isDirectory()
    ? listFiles(join(directory, file.name))
    : join(directory, file.name)))).flat();
}

// Exercise the actual prerendered HTML and the same React tree used by the client.
// These are DOM/behavior checks only; no browser or screenshots are involved.
async function hydrate(page, { reducedMotion = false } = {}) {
  const dom = await documentFor(page);
  const { window } = dom;
  const errors = [];
  const globals = new Map();
  const timers = new Map();
  const mediaListeners = new Set();
  let nextTimer = 1;
  let matches = reducedMotion;
  const media = {
    get matches() { return matches; },
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_type, listener) => mediaListeners.add(listener),
    removeEventListener: (_type, listener) => mediaListeners.delete(listener),
  };
  const observers = [];
  class Observer {
    constructor() { this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
  }
  window.matchMedia = () => media;
  window.IntersectionObserver = Observer;
  window.ResizeObserver = Observer;
  window.setTimeout = (callback, delay) => {
    const id = nextTimer++;
    timers.set(id, { callback, delay });
    return id;
  };
  window.clearTimeout = (id) => timers.delete(id);
  window.HTMLElement.prototype.scrollBy = function scrollBy({ left = 0 }) {
    this.scrollLeft += left;
    this.dispatchEvent(new window.Event('scroll'));
  };
  window.scrollTo = () => {};

  for (const [name, value] of Object.entries({
    window,
    document: window.document,
    navigator: window.navigator,
    HTMLElement: window.HTMLElement,
    Node: window.Node,
    Event: window.Event,
    FormData: window.FormData,
    getComputedStyle: window.getComputedStyle.bind(window),
    IntersectionObserver: Observer,
    ResizeObserver: Observer,
    IS_REACT_ACT_ENVIRONMENT: true,
  })) {
    globals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
  const originalConsoleError = console.error;
  console.error = (...values) => errors.push(values.map(String).join(' '));
  let root;

  async function cleanup() {
    try {
      if (root) await act(async () => root.unmount());
      assert.equal(timers.size, 0, 'Unmount must cancel carousel timers');
      assert.equal(mediaListeners.size, 0, 'Unmount must remove motion listeners');
      assert.ok(observers.every((observer) => observer.targets.size === 0), 'Unmount must disconnect observers');
      assert.equal(window.document.body.classList.contains('menu-open'), false);
      assert.deepEqual(errors, [], 'Hydration and interactions must not log React errors');
    } finally {
      console.error = originalConsoleError;
      dom.window.close();
      for (const [name, descriptor] of globals) {
        if (descriptor) Object.defineProperty(globalThis, name, descriptor);
        else delete globalThis[name];
      }
    }
  }

  try {
    const [{ hydrateRoot }, { App }] = await Promise.all([
      import('react-dom/client'),
      import('../.prerender/entry-server.js'),
    ]);
    await act(async () => {
      root = hydrateRoot(window.document.getElementById('root'),
        createElement(StrictMode, null, createElement(App, { page })), {
          onRecoverableError: (error) => errors.push(error.message),
        });
    });
  } catch (error) {
    await cleanup();
    throw error;
  }

  return {
    window,
    document: window.document,
    timers,
    cleanup,
    query: (selector) => {
      const element = window.document.querySelector(selector);
      assert.ok(element, `Missing element: ${selector}`);
      return element;
    },
    async click(selector) {
      const element = this.query(selector);
      await act(async () => element.click());
    },
    async tickCarousel() {
      const timer = [...timers.entries()].find(([, value]) => value.delay === 7000);
      assert.ok(timer, 'Autoplay timer should be scheduled');
      timers.delete(timer[0]);
      await act(async () => timer[1].callback());
    },
    async changeMotion(value) {
      matches = value;
      await act(async () => { for (const listener of mediaListeners) listener(media); });
    },
  };
}

test('built pages preserve content, contacts, anchors and local resources without legacy scripts', async () => {
  const documents = new Map();
  try {
    for (const page of Object.keys(routes)) documents.set(page, await documentFor(page));
    const home = documents.get('home').window.document;
    const privacy = documents.get('privacy').window.document;
    assert.match(home.querySelector('h1').textContent, /Sua tranquilidade/);
    assert.equal(home.querySelectorAll('.hero-slide').length, 4);
    assert.equal(home.querySelectorAll('.service-card').length, 5);
    assert.match(home.querySelector('#quote-form').textContent, /Solicite seu orçamento/);
    assert.equal(privacy.querySelectorAll('.privacy-document > section').length, 11);
    assert.equal(privacy.querySelectorAll('.privacy-index ol > li').length, 11);
    assert.match(privacy.querySelector('.privacy-document').textContent, /RotaSegur Rastreamento/);

    for (const [page, dom] of documents) {
      const { document } = dom.window;
      assert.ok(document.querySelector('#root').children.length > 0, `${page} must be prerendered`);
      assert.match(document.body.textContent, /\(45\) 99806-6142/);
      assert.doesNotMatch(document.documentElement.outerHTML, /99806-7142|5545998067142/);
      assert.ok(document.querySelector('script[type="module"][src]'));
      assert.equal(document.querySelector('script[src$="app.js"]'), null);
      for (const element of document.querySelectorAll('[src], link[href]')) {
        const url = new URL(element.getAttribute('src') || element.getAttribute('href'), dom.window.location.href);
        if (url.origin === origin) await outputFile(url);
      }
      for (const link of document.querySelectorAll('a[href], use[href]')) {
        const url = new URL(link.getAttribute('href'), dom.window.location.href);
        if (url.hostname === 'wa.me') assert.equal(url.pathname, '/5545998066142');
        if (url.origin !== origin) continue;
        await outputFile(url);
        if (!url.hash) continue;
        const targetPage = Object.keys(routes).find((name) => routes[name].path === url.pathname);
        assert.ok(targetPage, `Unknown local route: ${url.pathname}`);
        assert.ok(documents.get(targetPage).window.document.getElementById(decodeURIComponent(url.hash.slice(1))),
          `Broken anchor in ${page}: ${link.getAttribute('href')}`);
      }
    }
    for (const file of (await listFiles(output)).filter((path) => path.endsWith('.css'))) {
      const css = await readFile(file, 'utf8');
      const base = new URL(file.slice(output.length), origin);
      for (const [, reference] of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        const url = new URL(reference.trim(), base);
        if (url.origin === origin) await outputFile(url);
      }
    }
  } finally {
    for (const dom of documents.values()) dom.window.close();
  }
});

test('home and privacy hydrate their prerendered content without recoverable errors', async () => {
  for (const page of Object.keys(routes)) {
    const app = await hydrate(page);
    try {
      assert.equal(app.query('#root').dataset.page, page);
      assert.equal(app.document.querySelectorAll('main').length, 1);
      assert.equal(app.query('.brand-logo img').getAttribute('src'), '/assets/rotasegur-logo-transparent.png');
      assert.equal(app.query('#menu-toggle').getAttribute('aria-expanded'), 'false');
    } finally { await app.cleanup(); }
  }
});

test('menu opens and closes with Escape, outside click and navigation', async () => {
  const app = await hydrate('home');
  try {
    await app.click('#menu-toggle');
    assert.equal(app.query('#menu-toggle').getAttribute('aria-expanded'), 'true');
    assert.ok(app.query('#site-nav').classList.contains('is-open'));
    assert.ok(app.document.body.classList.contains('menu-open'));
    await act(async () => app.document.dispatchEvent(new app.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    assert.equal(app.query('#menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(app.document.activeElement, app.query('#menu-toggle'));
    await app.click('#menu-toggle');
    await app.click('#site-nav a[href="#solucoes"]');
    assert.equal(app.query('#menu-toggle').getAttribute('aria-expanded'), 'false');
    await app.click('#menu-toggle');
    await app.click('#contato h2');
    assert.equal(app.query('#menu-toggle').getAttribute('aria-expanded'), 'false');
  } finally { await app.cleanup(); }
});

test('carousel advances, wraps, selects a slide and pauses autoplay', async () => {
  const app = await hydrate('home');
  try {
    assert.equal(app.query('#slide-current').textContent, '01');
    await app.click('#slide-prev');
    assert.equal(app.query('#slide-current').textContent, '04');
    assert.match(app.query('.hero-assurance').textContent, /Rastreamento veicular/);
    await app.click('#slide-next');
    assert.equal(app.query('#slide-current').textContent, '01');
    await app.tickCarousel();
    assert.equal(app.query('#slide-current').textContent, '02');
    await app.click('[data-slide-to="2"]');
    assert.equal(app.query('#slide-current').textContent, '03');
    assert.equal(app.document.querySelectorAll('.hero-slide[aria-hidden="false"]').length, 1);
    assert.equal(app.document.querySelectorAll('.hero-slide[inert]').length, 3);
    await app.click('#slide-pause');
    assert.equal(app.query('#slide-pause').getAttribute('aria-label'), 'Reproduzir carrossel');
    assert.equal(app.query('.slide-caption').getAttribute('aria-live'), 'polite');
    assert.equal(app.timers.size, 0);
    await app.click('#slide-pause');
    await app.tickCarousel();
    assert.equal(app.query('#slide-current').textContent, '04');
  } finally { await app.cleanup(); }
});

test('reduced motion disables autoplay while preserving manual carousel navigation', async () => {
  const app = await hydrate('home', { reducedMotion: true });
  try {
    assert.equal(app.query('#slide-pause').disabled, true);
    assert.equal(app.timers.size, 0);
    assert.equal(app.document.documentElement.classList.contains('js-reveal'), false);
    await app.click('#slide-next');
    assert.equal(app.query('#slide-current').textContent, '02');
    assert.equal(app.timers.size, 0);
    await app.changeMotion(false);
    assert.equal(app.query('#slide-pause').disabled, false);
    await app.click('#slide-pause');
    await app.tickCarousel();
    assert.equal(app.query('#slide-current').textContent, '03');
  } finally { await app.cleanup(); }
});

test('tracking CTA fills the quote and form prepares the correct WhatsApp draft with popup fallback', async () => {
  const app = await hydrate('home');
  try {
    await app.click('[data-slide-to="3"]');
    await app.click('.hero-slide.is-active [data-quote-service]');
    assert.equal(app.query('#service').value, trackingService);
    app.query('#name').value = 'Maria da Silva';
    app.query('#phone').value = '(45) 99806-6142';
    app.query('#message').value = 'Quero proteger meu veículo & consultar valores.';
    let popupCalls = 0;
    app.window.open = () => { popupCalls += 1; return null; };
    await act(async () => app.query('#quote-form').dispatchEvent(new app.window.Event('submit', { bubbles: true, cancelable: true })));
    assert.equal(popupCalls, 1);
    assert.match(app.query('#form-status').textContent, /bloqueou a nova janela/);
    const fallback = app.query('#whatsapp-fallback');
    assert.equal(fallback.hidden, false);
    assert.equal(fallback.rel, 'noopener noreferrer');
    const url = new URL(fallback.href);
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/5545998066142');
    assert.equal(url.searchParams.get('text'), [
      'Olá, Rota Segur! Gostaria de solicitar um orçamento.', '',
      'Nome: Maria da Silva', 'Telefone: (45) 99806-6142',
      `Serviço de interesse: ${trackingService}`, '',
      'Detalhes: Quero proteger meu veículo & consultar valores.',
    ].join('\n'));
    const popup = { opener: 'original', location: { href: '' } };
    app.window.open = (target, name) => {
      assert.equal(target, 'about:blank');
      assert.equal(name, '_blank');
      return popup;
    };
    await act(async () => app.query('#quote-form').dispatchEvent(new app.window.Event('submit', { bubbles: true, cancelable: true })));
    assert.equal(popup.opener, null);
    assert.equal(popup.location.href, url.href);
    assert.match(app.query('#form-status').textContent, /Continue no WhatsApp para enviar/);
    app.query('#phone').value = '123';
    popupCalls = 0;
    app.window.open = () => { popupCalls += 1; return null; };
    await act(async () => app.query('#quote-form').dispatchEvent(new app.window.Event('submit', { bubbles: true, cancelable: true })));
    assert.equal(popupCalls, 0, 'Invalid phone must not open WhatsApp');
    assert.equal(app.query('#phone').validity.valid, false);
  } finally { await app.cleanup(); }
});
