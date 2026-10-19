# Rotasegur — React

Site institucional em **React 19 + Vite 8**, independente do projeto Novtrack. O código-fonte está em `src/`; `dist/` contém a versão compilada para hospedagem estática. O visual, o carrossel, o formulário de WhatsApp e a política de privacidade foram preservados na migração.

## Executar localmente

Use Node.js 24.15.0 ou superior na linha 24, também utilizada no build da Vercel. Na pasta deste projeto:

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:4173/. A política de privacidade fica em http://127.0.0.1:4173/politica-de-privacidade/.

## Compilar e publicar

```sh
npm run build
```

Publique **todo o conteúdo de `dist/`** na raiz pública da hospedagem, preservando as subpastas. O build gera as duas páginas em HTML completo a partir dos componentes React e adiciona a hidratação para as interações. O texto da política permanece acessível mesmo sem JavaScript, e não são necessárias regras de fallback de SPA.

Para conferir o build localmente, encerre o servidor de desenvolvimento e execute:

```sh
npm run preview
```

A configuração de publicação no Sites fica em `.openai/hosting.json`. Ao utilizar outro domínio, ajuste os URLs absolutos nos metadados de `index.html` e `politica-de-privacidade/index.html` e compile novamente.

## Publicar na Vercel

1. Envie o projeto para o GitHub, incluindo `package-lock.json` e `vercel.json`.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. Mantenha a raiz do repositório como **Root Directory** e o preset **Vite**. O arquivo `vercel.json` configura instalação com `npm ci`, build com `npm run build` e saída em `dist/`. A versão de Node.js é selecionada pelo campo `engines` do `package.json`.
4. Clique em **Deploy**. Não são necessárias variáveis de ambiente para executar o site.

A página inicial fica em `/` e a política em `/politica-de-privacidade/`. A Vercel normaliza os endereços de páginas com barra final. As duas páginas são pré-renderizadas durante o build; não precisam de servidor Node.js em produção nem de rewrite global para a página inicial. Endereços inexistentes devem retornar 404.

Depois de definir o domínio definitivo, substitua `https://rota-segur.manoel-barros.chatgpt.site` nos dois arquivos HTML de origem pelos endereços do novo domínio (Open Graph, URL da empresa no JSON-LD e canonical da política) e faça um novo deploy. Confira a página inicial, a política e os links de contato no domínio publicado.

Os diretórios `dist/`, `.prerender/` e `.vercel/` são gerados localmente e ficam fora do Git. A configuração anterior do Sites permanece em `.openai/hosting.json` e não é utilizada pela Vercel.

## Estrutura

- `src/App.jsx`: composição das páginas e componentes compartilhados.
- `src/pages/`: página inicial e política de privacidade em JSX.
- `src/components/`: cabeçalho, rodapé, carrosséis, formulário e ícones.
- `src/hooks/`: preferência de movimento reduzido e animações de entrada.
- `src/site.js`: contatos centralizados; celular/WhatsApp **(45) 99806-6142**.
- `src/styles/`: estilos originais do site e da política.
- `public/assets/`: imagens, logo, ícones e fontes locais.
- `scripts/prerender.mjs`: geração do HTML completo das duas páginas.
- `tests/`: verificações de conteúdo, links, hidratação e interações.

## Verificação

```sh
npm run build
npm test
```

Os testes usam Node.js e JSDOM, sem navegador ou capturas de tela. A avaliação visual continua a cargo do cliente, conforme solicitado.

## Conteúdo e contatos

Informações extraídas em 15/10/2026 do site indicado pelo cliente:

- https://rotasegursegurancaeletronicaepatrimonial-6956bf.webnode.page/
- https://rotasegursegurancaeletronicaepatrimonial-6956bf.webnode.page/sobre-nos/
- https://rotasegursegurancaeletronicaepatrimonial-6956bf.webnode.page/servicos/
- https://rotasegursegurancaeletronicaepatrimonial-6956bf.webnode.page/contato/

Telefone: (44) 3778-0417. WhatsApp: (45) 99806-6142. E-mail: rotasegur2016@gmail.com. Endereço: Avenida Paraná, 557, Formosa do Oeste – PR, CEP 85830-000.

O formulário prepara uma mensagem e abre o WhatsApp; o visitante revisa e envia. Não existe envio automático, armazenamento local ou backend de captação. Os links para telefone, e-mail e mapa usam os contatos verificados. O carrossel automático respeita movimento reduzido e pausa com foco, mouse, aba oculta ou botão. Há navegação por toque, setas, indicadores e teclado nos controles nativos.

O serviço de rastreamento veicular foi confirmado pelo cliente em 15/10/2026 e incluído nos serviços, perguntas frequentes e formulário. Recursos específicos e condições devem ser consultados com a equipe.

## Política de privacidade

O componente `src/pages/PrivacyPage.jsx` gera `dist/politica-de-privacidade/index.html`, acessível em `/politica-de-privacidade/`. A política cobre o site, o aplicativo **RotaSegur Rastreamento** e os serviços de rastreamento. Em 19/10/2026, o cliente confirmou o nome do aplicativo em desenvolvimento, a titularidade da Rastro City e a reutilização do mesmo escopo de tratamento da política de referência: https://www.rastrocity.com.br/politica-de-privacidade.

O texto foi adaptado para a identidade e os contatos da Rotasegur, mantendo os onze temas da referência. A descrição do formulário e dos cookies do site reflete os arquivos atuais. A política tem navegação por seções, apresentação responsiva e links no rodapé e junto ao formulário. O conteúdo permanece acessível sem JavaScript. Não foi feita validação visual, conforme preferência do cliente.

Fontes oficiais consultadas: [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), [direitos dos titulares na ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados), [Apple App Privacy](https://developer.apple.com/app-store/app-privacy-details/) e [Google Play User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).

Para cadastrar a URL nas lojas, a página precisa estar publicamente acessível, sem login. A configuração de audiência do Sites permanece preservada. Esta página não implementa fluxos de exclusão dentro do aplicativo nem preenche App Privacy ou Data Safety; essas declarações e funcionalidades devem corresponder ao aplicativo lançado.

## Imagens

`dist/assets/rondas.jpg`, `cameras.jpg`, `alarmes.jpg` e `monitoramento.jpg` são peças promocionais da fonte original, convertidas para JPEG e enquadradas via CSS. São imagens ilustrativas, não documentação de instalações. A marca do cabeçalho e do rodapé usa `dist/assets/rotasegur-logo-transparent.png` (1774 × 887 px), derivada da imagem enviada pelo cliente em 15/10/2026. O fundo foi removido com ImageGen, com saída PNG transparente. O original permanece em `dist/assets/rotasegur-logo-original.jpg`. O cabeçalho usa dimensões menores e espaçamento vertical próprio para desktop, celular e navegação fixa. Prompt: remover somente o fundo preto texturizado e as sombras projetadas nele; preservar o escudo dourado, as letras prateadas de ROTASEGUR e o subtítulo SEGURANÇA ELETRÔNICA, incluindo formas, acentos, proporções e materiais; tornar transparente o espaço aberto e os vazios das letras; enquadrar com pequena margem transparente uniforme.

`dist/assets/hero-camera.jpg` foi gerada com a ferramenta integrada image_gen, otimizada para JPEG e identificada na interface como ilustrativa. Prompt:

> Cinematic, photorealistic premium editorial photograph of a professional graphite-metal bullet CCTV security camera securely mounted on a dark exterior wall, with the lens prominent in the right third. Out-of-focus modern residential architecture at night with subtle warm lights. Wide landscape; left 55 percent dark clean negative space for text. Soft golden side light, charcoal black, realistic metal and lens. One camera, no people, no text, logos, watermark, sci-fi, grids or neon.

`dist/assets/rastreamento.svg` foi substituída no site por `dist/assets/hero-vehicle.jpg`, usada no destaque principal e no card de rastreamento. A imagem foi criada com a ferramenta integrada image_gen e convertida para JPEG qualidade 85. Não representa um veículo ou operação real da empresa. A avaliação visual foi deixada com o cliente, conforme solicitado.

Prompt da imagem de veículo:

> Use case: ads-marketing. Asset type: Wide photographic website section background for vehicle tracking services. Premium cinematic editorial photograph of a modern unbranded graphite SUV/crossover at night, three-quarter front view, with the entire vehicle recognizable in the right third and middle-right of the frame. Quiet urban residential environment at night, softly defocused contemporary architecture, subtle warm lights. Landscape 1792x1024 composition; keep the entire left 55 percent very dark, clean, quiet negative space for website text. Vehicle mainly in the right 45 percent, including all wheels and roof in frame. Soft warm golden side lighting reflected gently along the graphite bodywork, natural shadows, calm premium atmosphere, realistic cinematic photography. Charcoal black, graphite grey, restrained gold highlights. Real automotive paint and glass with physically plausible reflections. No text. One SUV/crossover, no recognizable vehicle brand, no logos, no legible license plate, no people, no text, no watermark. Illustrative advertising photograph, no assertions of real tracking data. Avoid icons, location pins, maps, interface graphics, data overlays, futuristic neon effects, sci-fi.

Fontes Poppins servidas localmente. Nenhum tracker ou dependência externa é carregado para renderizar o site.
