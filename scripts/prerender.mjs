import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

for (const [page, path] of [['home', 'dist/index.html'], ['privacy', 'dist/politica-de-privacidade/index.html']]) {
  const template = await readFile(path, 'utf8');
  const root = `<div id="root" data-page="${page}"></div>`;
  if (!template.includes(root)) throw new Error(`Missing React root in ${path}`);
  await writeFile(path, template.replace(root, () => `<div id="root" data-page="${page}">${render(page)}</div>`));
  console.log(`Prerendered ${page}: ${path}`);
}
