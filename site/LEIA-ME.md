# Portfólio · Matheus Albuquerque

Site estático feito só com **HTML, CSS e JavaScript puros**. Não precisa instalar nada, não tem build, não tem npm.
As bibliotecas de animação (GSAP, ScrollTrigger e Lenis) já estão dentro da pasta `vendor/`, então o site funciona mesmo sem CDN.

## Como ver no seu computador

Dê dois cliques em `index.html`. Pronto.

> Dica: para ver como ficam as seções de Formação e Depoimentos com textos de exemplo, abra `index.html?exemplos`.

## Estrutura

```
site/
├── index.html            → textos de Hero, Sobre, Experiência e Contato
├── css/style.css         → visual (cores no topo do arquivo, em :root)
├── js/dados.js           → PROJETOS, STACK, FORMAÇÃO, NÚMEROS e DEPOIMENTOS  ← edite aqui
├── js/main.js            → animações e interações (não precisa mexer)
├── js/icons.js           → ícones Lucide usados no site
├── vendor/               → GSAP, ScrollTrigger e Lenis
└── assets/img/
    ├── perfil/           → suas fotos (matheus.webp e matheus-apresentando-wide.webp)
    ├── projetos/         → prints e fotos de cada projeto
    ├── favicon.svg, apple-touch-icon.png
    └── og-image.jpg      → imagem que aparece ao compartilhar o link
```

## Como editar o conteúdo

- **Trocar a foto de perfil:** substitua `assets/img/perfil/matheus.webp` (formato retrato, 4:5) mantendo o mesmo nome.
- **Adicionar um projeto:** abra `js/dados.js`, copie o bloco "MODELO para um novo projeto", cole no **topo** da lista `projetos` (o mais recente sempre fica em cima) e preencha. Coloque as imagens em `assets/img/projetos/nome-do-projeto/`.
- **Formação e Depoimentos:** preencha as listas `formacao` e `depoimentos` em `js/dados.js`. A seção aparece sozinha quando tiver pelo menos um item.
- **Números:** edite a lista `numeros` em `js/dados.js`.
- **Mensagem do WhatsApp:** edite `whatsapp.mensagem` em `js/dados.js`.

---

## Como publicar na internet (grátis)

Escolha **uma** das opções. A mais fácil é a Netlify (arrastar e soltar). A mais "profissional" para portfólio de dev é o GitHub Pages.

### Opção 1 · Netlify Drop (2 minutos, sem conta de GitHub)

1. Acesse **https://app.netlify.com/drop**
2. Crie uma conta grátis (pode entrar com Google).
3. Arraste a **pasta `site` inteira** para a área indicada.
4. Pronto. O site fica no ar com um endereço tipo `nome-aleatorio.netlify.app`.
5. Para mudar o nome: *Site configuration → Change site name* (ex.: `matheus-albuquerque.netlify.app`).
6. Para atualizar depois: *Deploys* → arraste a pasta de novo.

### Opção 2 · GitHub Pages (recomendado para portfólio)

1. Crie uma conta em **https://github.com** (se ainda não tiver).
2. Clique em **New repository**. Nome sugerido: `portfolio` (ou `SEU-USUARIO.github.io` para o endereço ficar mais curto). Marque **Public** e crie.
3. Na página do repositório, clique em **uploading an existing file**.
4. Abra a pasta `site` no seu computador, selecione **tudo que está dentro dela** (não a pasta em si) e arraste para o navegador. Clique em **Commit changes**.
5. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.
6. Aguarde 1 a 2 minutos. O endereço aparece no topo da página: `https://SEU-USUARIO.github.io/portfolio/`.
7. Para atualizar: suba os arquivos alterados do mesmo jeito (Add file → Upload files).

### Opção 3 · Vercel

1. Suba a pasta para o GitHub (passos 1 a 4 da opção 2).
2. Acesse **https://vercel.com**, entre com o GitHub, clique em **Add New → Project** e importe o repositório.
3. Em *Framework Preset* deixe **Other** e clique em **Deploy**. Não precisa configurar build.

### Domínio próprio (opcional)

Se quiser `matheusalbuquerque.com.br`, registre em **https://registro.br** (cerca de R$ 40 por ano) e conecte nas configurações de domínio da Netlify, GitHub Pages ou Vercel. Todas têm o passo a passo na própria tela.

---

## Depois de publicar (2 ajustes rápidos)

1. **Imagem de compartilhamento:** no `index.html`, troque
   `content="assets/img/og-image.jpg"` por o endereço completo, por exemplo
   `content="https://seu-site.netlify.app/assets/img/og-image.jpg"`.
   Assim a prévia com sua foto aparece certinha no WhatsApp e no LinkedIn.
2. **robots.txt:** troque `SEU-SITE` pelo seu endereço real.
3. Teste a prévia do link em **https://www.opengraph.xyz** e coloque o link do portfólio no seu LinkedIn.

## Créditos técnicos

- GSAP + ScrollTrigger (GreenSock) · Lenis (darkroom.engineering) · Ícones Lucide (ISC) · Fontes Inter e Plus Jakarta Sans (Google Fonts).
