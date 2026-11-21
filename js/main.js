/* ==========================================================================
   PORTFÓLIO · MATHEUS ALBUQUERQUE · main.js
   JavaScript puro (ES6+). Bibliotecas locais em /vendor: GSAP, ScrollTrigger, Lenis.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  const DATA = window.PORTFOLIO || {};
  const showExamples = /[?&]exemplos/.test(location.search);
  if (showExamples && window.PORTFOLIO_EXEMPLOS) {
    ['formacao', 'depoimentos'].forEach((k) => {
      if (!DATA[k] || !DATA[k].length) DATA[k] = window.PORTFOLIO_EXEMPLOS[k];
    });
  }

  const esc = (str = '') => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name) => `<i data-icon="${name}"></i>`;

  /* ---------- Ícones (Lucide, embutidos em js/icons.js) ---------- */
  function renderIcons(scope = document) {
    const set = window.ICONS || {};
    $$('i[data-icon]', scope).forEach((el) => {
      if (el.dataset.rendered) return;
      const body = set[el.dataset.icon];
      if (!body) return;
      el.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
      el.dataset.rendered = '1';
    });
  }

  /* ---------- WhatsApp ---------- */
  const waLink = () => {
    const w = DATA.whatsapp || {};
    return `https://wa.me/${w.numero || '5561998693512'}?text=${encodeURIComponent(w.mensagem || '')}`;
  };

  /* ======================================================================
     RENDERIZAÇÃO DOS DADOS
     ====================================================================== */
  /* ---------- Projetos: carrossel (card grande) + lista lateral ---------- */
  const show = { index: 0, timer: null, paused: false };

  function slideHTML(p, i) {
    const d = (p.destaques || []).map((m) => `<div class="metric"><strong>${esc(m.valor)}</strong><span>${esc(m.rotulo)}</span></div>`).join('');
    const isFirst = i === 0;
    return `
      <article class="project-card spotlight${isFirst ? ' is-active' : ''}" data-slide="${i}" ${isFirst ? '' : 'aria-hidden="true"'}>
        <div class="project-card__visual${p.visual === 'papeis' ? '' : ' project-card__visual--solo'}" aria-hidden="true">
          ${p.visual === 'papeis' ? `<div class="papers">
            <div class="paper"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="paper"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="paper"><i></i><i></i><i></i><i></i><i></i></div>
          </div>` : ''}
          <div class="browser">
            <div class="browser__bar"><span></span><span></span><span></span><em>${esc(p.id || '')}</em></div>
            ${p.capa ? `<img src="${esc(p.capa)}" alt="" loading="lazy" width="960" height="600" />` : ''}
          </div>
          ${(p.chipsCapa || []).slice(0, 2).map((c, k) => `<span class="chip-float chip-float--${k + 1}">${icon(c.icone || 'check')} ${esc(c.texto)}</span>`).join('')}
        </div>
        <div class="project-card__body">
          <div class="feat__meta">
            ${p.selo ? `<span class="selo">${icon(p.seloIcone || 'landmark')} ${esc(p.selo)}</span>` : ''}
            <span class="tag">${esc(p.segmento || '')}</span>
          </div>
          <h3 class="feat__title">${esc(p.tituloCurto || p.titulo)}</h3>
          <p class="feat__hook">${esc(p.resumo || '')}</p>
          ${d ? `<div class="feat__metrics">${d}</div>` : ''}
          <div class="feat__foot">
            <div class="tech-mini">${(p.tecnologias || []).slice(0, 8).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
            <button type="button" class="btn btn--primary" data-open-case="${i}">Conhecer o projeto ${icon('arrow-up-right')}</button>
          </div>
        </div>
      </article>`;
  }

  function renderShowcase() {
    const stage = $('#showcase-stage');
    const list = $('#showcase-list');
    const items = DATA.projetos || [];
    if (!stage) return;
    if (!items.length) { $('#projetos').hidden = true; return; }
    stage.innerHTML = items.map(slideHTML).join('');
    $('#showcase-count').textContent = String(items.length).padStart(2, '0');
    list.innerHTML = items.map((p, i) => `
      <li>
        <button type="button" class="showcase__item${i === 0 ? ' is-active' : ''}" data-goto="${i}" aria-current="${i === 0}">
          <span class="showcase__num">${String(items.length - i).padStart(2, '0')}</span>
          <span class="showcase__info">
            <strong>${esc(p.tituloCurto || p.titulo)}</strong>
            <small>${esc(p.segmento || '')}</small>
          </span>
          <span class="showcase__bar"><span></span></span>
        </button>
      </li>`).join('') + `
      <li class="showcase__soon">
        <span class="showcase__num">+</span>
        <span class="showcase__info"><strong>Novos projetos</strong><small>Em breve por aqui</small></span>
      </li>`;
    if (items.length > 1) $('#showcase').classList.add('is-multi');
  }

  function goTo(i, user) {
    const items = DATA.projetos || [];
    if (!items.length) return;
    show.index = (i + items.length) % items.length;
    $$('[data-slide]').forEach((el) => {
      const on = +el.dataset.slide === show.index;
      el.classList.toggle('is-active', on);
      if (on) el.removeAttribute('aria-hidden'); else el.setAttribute('aria-hidden', 'true');
    });
    $$('[data-goto]').forEach((b) => {
      const on = +b.dataset.goto === show.index;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-current', String(on));
      // reinicia a barra de progresso
      const bar = $('.showcase__bar span', b);
      bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    });
    if (user) restartAutoplay();
  }

  function restartAutoplay() {
    const items = DATA.projetos || [];
    clearInterval(show.timer);
    if (items.length < 2 || reduceMotion) return;
    const secs = DATA.tempoCarrossel || 8;
    $('#showcase').style.setProperty('--dur', secs + 's');
    show.timer = setInterval(() => { if (!show.paused && !drawer.classList.contains('is-open')) goTo(show.index + 1); }, secs * 1000);
  }

  function bindShowcase() {
    const box = $('#showcase');
    if (!box) return;
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-goto]');
      if (b) goTo(+b.dataset.goto, true);
    });
    box.addEventListener('pointerenter', () => { show.paused = true; box.classList.add('is-paused'); });
    box.addEventListener('pointerleave', () => { show.paused = false; box.classList.remove('is-paused'); });
    box.addEventListener('focusin', () => { show.paused = true; box.classList.add('is-paused'); });
    box.addEventListener('focusout', () => { show.paused = false; box.classList.remove('is-paused'); });
    // arrastar no celular
    let x0 = null;
    box.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) goTo(show.index + (dx < 0 ? 1 : -1), true);
      x0 = null;
    }, { passive: true });
    restartAutoplay();
  }

  /* ---------- Carrossel de fotos (seção Sobre) ---------- */
  function photoCarousel() {
    const frame = $('[data-carousel]');
    if (!frame) return;
    const dotsBox = $('.carousel-dots', frame);
    let idx = 0, timer = null;
    const slides = () => $$('.slide', frame);
    const draw = () => {
      const list = slides();
      if (!list.length) { frame.classList.add('is-empty'); dotsBox.innerHTML = ''; return; }
      if (idx >= list.length) idx = 0;
      list.forEach((im, k) => im.classList.toggle('is-active', k === idx));
      dotsBox.innerHTML = list.length > 1 ? list.map((_, k) => `<button type="button" role="tab" aria-label="Foto ${k + 1}" aria-selected="${k === idx}" class="${k === idx ? 'is-active' : ''}" data-dot="${k}"></button>`).join('') : '';
    };
    const start = () => {
      clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(() => { if (slides().length > 1) { idx = (idx + 1) % slides().length; draw(); } }, 4500);
    };
    dotsBox.addEventListener('click', (e) => {
      const d = e.target.closest('[data-dot]');
      if (!d) return;
      idx = +d.dataset.dot; draw(); start();
    });
    // imagens que não carregarem são removidas (onerror no HTML); redesenha depois
    window.addEventListener('load', draw);
    setTimeout(draw, 1200);
    draw();
    start();
  }

  function renderStack() {
    const grid = $('#stack-grid');
    const list = DATA.stack || [];
    if (!grid) return;
    if (!list.length) { $('#stack').hidden = true; return; }
    grid.innerHTML = list.map((g) => `
      <article class="stack-card spotlight${g.largura === 2 ? ' stack-card--wide' : ''}" data-reveal-item>
        <div class="stack-card__top">
          <span class="stack-card__icon">${icon(g.icone || 'code')}</span>
          <h3>${esc(g.grupo)}</h3>
        </div>
        <p>${esc(g.descricao || '')}</p>
        ${(g.itens || []).length ? `<div class="tags">${g.itens.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
        ${g.onde ? `<span class="stack-card__where">${icon('briefcase')} ${esc(g.onde)}</span>` : ''}
      </article>`).join('');
    const all = [...new Set(list.flatMap((g) => g.itens || []))];
    const row = all.map((t) => `<span>${esc(t)}</span>`).join('');
    $('#marquee').innerHTML = row + row; // duplicado para loop contínuo
    if (!all.length) $('.marquee').hidden = true;
  }

  function renderEducation() {
    const list = DATA.formacao || [];
    if (!list.length) return;
    $('#formacao').hidden = false;
    $('#edu-grid').innerHTML = list.map((f) => `
      <article class="edu-card spotlight" data-reveal-item>
        <span class="tag tag--primary">${esc(f.tipo || '')}</span>
        <h3>${esc(f.curso)}</h3>
        <span>${esc(f.instituicao || '')}${f.periodo ? ' · ' + esc(f.periodo) : ''}</span>
      </article>`).join('');
  }

  function renderNumbers() {
    const list = DATA.numeros || [];
    if (!list.length) return;
    $('#numeros').hidden = false;
    $('#numbers-grid').innerHTML = list.map((n) => {
      const val = n.texto
        ? `<span class="number__text">${esc(n.texto)}</span>`
        : `${esc(n.prefixo || '')}<span data-count="${Number(n.valor) || 0}">${Number(n.valor) || 0}</span>${n.sufixo ? `<em>${esc(n.sufixo)}</em>` : ''}`;
      return `<div class="number" data-reveal-item><strong>${val}</strong><span>${esc(n.rotulo)}</span>${n.detalhe ? `<small>${esc(n.detalhe)}</small>` : ''}</div>`;
    }).join('');
  }

  function renderTestimonials() {
    const list = DATA.depoimentos || [];
    if (!list.length) return;
    $('#depoimentos').hidden = false;
    $('#dep-grid').innerHTML = list.map((d) => `
      <figure class="quote-card spotlight" data-reveal-item>
        ${icon('quote')}
        <blockquote>${esc(d.texto)}</blockquote>
        <footer><strong>${esc(d.nome)}</strong><span>${esc(d.cargo || '')}</span></footer>
      </figure>`).join('');
  }

  /* ======================================================================
     DRAWER · ESTUDO DE CASO
     ====================================================================== */
  const drawer = $('#drawer');
  const drawerBody = $('#drawer-body');
  let lastFocus = null;
  let currentImages = [];
  let galleryCount = 0;

  function caseHTML(p) {
    const metrics = (p.destaques || p.metricas || []).map((m) => `<div class="metric"><strong>${esc(m.valor)}</strong><span>${esc(m.rotulo)}</span></div>`).join('');
    const strengths = (p.pontosFortes || []).length ? `
      <section class="case__block">
        <h4>${icon('sparkles')} Pontos fortes</h4>
        <div class="strengths">${p.pontosFortes.map((f) => `
          <div class="strength">${icon(f.icone || 'check')}<div><strong>${esc(f.titulo)}</strong><p>${esc(f.texto)}</p></div></div>`).join('')}
        </div>
      </section>` : '';
    const imgs = p.imagens || [];
    const gallery = imgs.length ? `
      <section class="case__block">
        <h4>${icon('monitor')} Telas do sistema</h4>
        <button class="gallery__main" type="button" data-lightbox-open="0" aria-label="Ampliar imagem">
          <img src="${esc(imgs[0].src)}" alt="${esc(imgs[0].legenda || '')}" />
          <span>${icon('search')} Ampliar</span>
        </button>
        <p class="gallery__caption" id="gallery-caption">${esc(imgs[0].legenda || '')}</p>
        ${imgs.length > 1 ? `<div class="gallery__thumbs">${imgs.map((im, k) => `
          <button type="button" class="${k === 0 ? 'is-active' : ''}" data-thumb="${k}" aria-label="Ver imagem ${k + 1}">
            <img src="${esc(im.src.replace('.webp', '-sm.webp'))}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${esc(im.src)}'" />
          </button>`).join('')}</div>` : ''}
      </section>` : '';

    const fotos = p.fotos || [];
    const photos = fotos.length ? `
      <section class="case__block">
        <h4>${icon('presentation')} Apresentação da solução</h4>
        <div class="photos">${fotos.map((f, k) => `
          <button type="button" class="photos__item${k === 0 ? ' photos__item--wide' : ''}" data-lightbox-open="${imgs.length + k}" aria-label="Ampliar foto: ${esc(f.legenda || '')}">
            <img src="${esc(f.src.replace('.webp', '-sm.webp'))}" alt="${esc(f.legenda || '')}" loading="lazy" onerror="this.onerror=null;this.src='${esc(f.src)}'" />
          </button>`).join('')}</div>
      </section>` : '';

    const levels = (p.sigilo || []).length ? `
      <section class="case__block">
        <h4>${icon('lock-keyhole')} Níveis de sigilo controlados</h4>
        <div class="levels">${p.sigilo.map((s, k) => `<div class="level">${icon(k === 0 ? 'lock-open' : 'lock')}${esc(s)}</div>`).join('')}</div>
      </section>` : '';

    return `
      <header>
        <div class="case__meta">
          ${p.selo ? `<span class="selo">${icon(p.seloIcone || 'landmark')} ${esc(p.selo)}</span>` : ''}
          <span class="tag">${esc(p.segmento || '')}</span>
        </div>
        <h2 class="case__title" id="drawer-title">${esc(p.titulo)}</h2>
        <p class="case__hook">${esc(p.resumo || p.gancho || '')}</p>
      </header>

      ${(p.visaoGeral || p.resultado) ? `
      <section class="case__block case__result">
        <h4>${icon('trending-up')} Visão geral</h4>
        <p>${esc(p.visaoGeral || p.resultado)}</p>
        ${metrics ? `<div class="case__metrics">${metrics}</div>` : ''}
      </section>` : ''}

      ${p.desafio ? `
      <section class="case__block">
        <h4>${icon('target')} O desafio</h4>
        <p>${esc(p.desafio)}</p>
      </section>` : ''}

      ${(p.solucao || []).length ? `
      <section class="case__block">
        <h4>${icon('layout-dashboard')} O que o sistema faz</h4>
        <ul class="case__list">${p.solucao.map((s) => `<li>${icon(s.icone || 'check')}<span>${esc(s.texto)}</span></li>`).join('')}</ul>
      </section>` : ''}

      ${strengths}
      ${levels}
      ${gallery}
      ${photos}

      ${p.papel ? `
      <section class="case__block">
        <h4>${icon('briefcase')} Meu papel</h4>
        <p>${esc(p.papel)}</p>
      </section>` : ''}

      ${(p.tecnologias || []).length ? `
      <section class="case__block">
        <h4>${icon('code')} Tecnologias</h4>
        <div class="tags">${p.tecnologias.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      </section>` : ''}

      <footer class="case__foot">
        <span>Quer saber mais sobre este projeto?</span>
        <a class="link-arrow" href="${waLink()}" target="_blank" rel="noopener">Fale comigo ${icon('arrow-up-right')}</a>
      </footer>`;
  }

  function openCase(index) {
    const p = (DATA.projetos || [])[index];
    if (!p) return;
    lastFocus = document.activeElement;
    currentImages = (p.imagens || []).concat(p.fotos || []);
    galleryCount = (p.imagens || []).length;
    drawerBody.innerHTML = caseHTML(p);
    renderIcons(drawerBody);
    drawerBody.scrollTop = 0;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    setTimeout(() => $('.drawer__panel').focus(), 50);
    if (history.replaceState) history.replaceState(null, '', '#caso-' + (p.id || index));

    if (hasGSAP && !reduceMotion) {
      gsap.fromTo($$('.drawer__body > *'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .06, ease: 'power3.out', delay: .15 });
    }
  }

  function closeCase() {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function setGallery(k) {
    const im = currentImages[k];
    if (!im || k >= galleryCount) return;
    const main = $('.gallery__main', drawerBody);
    $('img', main).src = im.src;
    $('img', main).alt = im.legenda || '';
    main.dataset.lightboxOpen = k;
    $('#gallery-caption').textContent = im.legenda || '';
    $$('[data-thumb]', drawerBody).forEach((b) => b.classList.toggle('is-active', +b.dataset.thumb === k));
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $('#lightbox');
  let lbIndex = 0;
  function openLightbox(k) {
    lbIndex = k;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    $('[data-lightbox-close]', lightbox).focus();
  }
  function updateLightbox() {
    const im = currentImages[lbIndex];
    if (!im) return;
    $('#lightbox-img').src = im.src;
    $('#lightbox-img').alt = im.legenda || '';
    $('#lightbox-caption').textContent = `${lbIndex + 1} / ${currentImages.length} · ${im.legenda || ''}`;
    const multi = currentImages.length > 1;
    $$('.lightbox__nav', lightbox).forEach((b) => (b.hidden = !multi));
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    const main = $('.gallery__main', drawerBody);
    if (main) main.focus();
  }
  const stepLightbox = (d) => { lbIndex = (lbIndex + d + currentImages.length) % currentImages.length; updateLightbox(); setGallery(lbIndex); };

  /* ---------- Trava de rolagem ---------- */
  let lenis = null;
  function lockScroll(on) {
    if (lenis) on ? lenis.stop() : lenis.start();
    document.body.style.overflow = on ? 'hidden' : '';
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = `${icon('check')} ${esc(msg)}`;
    renderIcons(t);
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2200);
  }

  /* ======================================================================
     INTERAÇÕES
     ====================================================================== */
  function bindEvents() {
    // Abrir estudo de caso
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-open-case]');
      if (card && !e.target.closest('a')) { openCase(+card.dataset.openCase); return; }

      if (e.target.closest('[data-drawer-close]')) { closeCase(); return; }

      const thumb = e.target.closest('[data-thumb]');
      if (thumb) { setGallery(+thumb.dataset.thumb); return; }

      const lbOpen = e.target.closest('[data-lightbox-open]');
      if (lbOpen) { openLightbox(+lbOpen.dataset.lightboxOpen || 0); return; }

      if (e.target.closest('[data-lightbox-close]') || e.target === lightbox) { closeLightbox(); return; }
      if (e.target.closest('[data-lightbox-prev]')) { stepLightbox(-1); return; }
      if (e.target.closest('[data-lightbox-next]')) { stepLightbox(1); return; }

      const copy = e.target.closest('[data-copy]');
      if (copy) {
        e.preventDefault();
        const text = copy.dataset.copy;
        const done = () => toast('E-mail copiado');
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
        else fallbackCopy(text, done);
      }
    });

    document.addEventListener('keydown', (e) => {
      const card = e.target.closest && e.target.closest('[data-open-case]');
      if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCase(+card.dataset.openCase); }

      if (e.key === 'Escape') {
        if (lightbox.classList.contains('is-open')) closeLightbox();
        else if (drawer.classList.contains('is-open')) closeCase();
        else if ($('#menu-mobile').classList.contains('is-open')) toggleMenu(false);
      }
      if (lightbox.classList.contains('is-open')) {
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
      }
      // Mantém o foco dentro do drawer
      if (e.key === 'Tab' && drawer.classList.contains('is-open') && !lightbox.classList.contains('is-open')) {
        const f = $$('button, a[href], [tabindex]:not([tabindex="-1"])', $('.drawer__panel')).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // WhatsApp
    $$('[data-whatsapp]').forEach((a) => (a.href = waLink()));

    // Ano no rodapé
    $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

    // Menu mobile
    $('.nav__toggle').addEventListener('click', () => toggleMenu());
    $$('#menu-mobile a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

    // Âncoras com rolagem suave (Lenis)
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: id === '#inicio' ? 0 : -20, duration: 1.4 });
        else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    // Brilho que segue o mouse
    if (finePointer) {
      document.addEventListener('pointermove', (e) => {
        const el = e.target.closest && e.target.closest('.spotlight');
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }, { passive: true });

      const hero = $('.hero'), spot = $('.hero__spot');
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        spot.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
        spot.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
      }, { passive: true });
    }
  }

  function toggleMenu(force) {
    const menu = $('#menu-mobile');
    const btn = $('.nav__toggle');
    const open = typeof force === 'boolean' ? force : !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    lockScroll(open);
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); cb(); } catch (_) { /* sem suporte */ }
    ta.remove();
  }

  /* ---------- Navegação: estado ao rolar + link ativo ---------- */
  function navOnScroll() {
    const nav = $('#nav');
    const bar = $('.scroll-progress span');
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 20);
      const menuOpen = $('#menu-mobile').classList.contains('is-open');
      nav.classList.toggle('is-hidden', !menuOpen && y > lastY && y > 400);
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const links = $$('.nav__links a');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['sobre', 'experiencia', 'projetos', 'stack', 'contato'].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Tilt 3D nos cards do Bento ---------- */
  function tilt() {
    if (!finePointer || reduceMotion) return;
    $$('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const strength = 2.5;
        card.style.transform = `rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Botões magnéticos ---------- */
  function magnetic() {
    if (!finePointer || reduceMotion) return;
    $$('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ======================================================================
     ANIMAÇÕES (GSAP + ScrollTrigger + Lenis)
     ====================================================================== */
  function splitWords(el, cls) {
    // Quebra o texto em palavras preservando elementos internos (ex.: .text-gradient)
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = cls;
            if (cls === 'w') { const inner = document.createElement('span'); inner.textContent = part; w.appendChild(inner); }
            else w.textContent = part;
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
  }

  function animations() {
    root.classList.remove('is-loading');
    if (!hasGSAP || reduceMotion) {
      $$('[data-count]').forEach((n) => (n.textContent = n.dataset.count));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Lenis: rolagem suave
    if (typeof window.Lenis !== 'undefined') {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // HERO: entrada
    const title = $('[data-split]');
    splitWords(title, 'w');
    $$('.text-gradient', title).forEach((g) => g.classList.add('is-split'));
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.nav', { y: -30, opacity: 0, duration: 1 }, 0)
      .from('.hero__title .w > span', { yPercent: 115, duration: 1.3, stagger: 0.06 }, 0.15)
      .from('[data-hero-fade]', { y: 26, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.55)
      .from('.scroll-hint', { opacity: 0, duration: 1 }, 1.2);

    // HERO: parallax ao sair
    gsap.to('.hero__content', {
      yPercent: -12, opacity: 0.2, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // SOBRE: headline acende palavra por palavra (estilo Apple)
    $$('[data-scrub-words]').forEach((el) => {
      splitWords(el, 'sw');
      gsap.fromTo($$('.sw', el), { opacity: 0.14 }, {
        opacity: 1, stagger: 0.08, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true }
      });
    });

    // Revelações genéricas
    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    $$('[data-reveal-group]').forEach((group) => {
      gsap.from(group.children, { y: 36, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: group, start: 'top 88%' } });
    });
    ['#stack-grid', '#edu-grid', '#numbers-grid', '#dep-grid'].forEach((sel) => {
      const items = $$(sel + ' [data-reveal-item]');
      if (!items.length) return;
      gsap.from(items, { y: 40, opacity: 0, duration: 1, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: sel, start: 'top 85%' } });
    });

    // Foto: leve parallax interno
    const photo = $('.about__photo-frame img');
    if (photo) gsap.fromTo(photo, { scale: 1.12, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.about__photo', start: 'top bottom', end: 'bottom top', scrub: true } });

    // TIMELINE: linha de progresso + itens
    gsap.to('.timeline__progress span', {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true }
    });
    $$('[data-timeline-item]').forEach((item) => {
      gsap.from($('.timeline__card', item), { x: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 85%' } });
      ScrollTrigger.create({ trigger: item, start: 'top 65%', onEnter: () => item.classList.add('is-active'), onLeaveBack: () => item.classList.remove('is-active') });
    });

    // PROJETOS: a tela do primeiro projeto "acende" ao rolar (e os papéis viram digital, se houver)
    const feat = $('.project-card');
    if (feat && $('.browser', feat)) {
      const papers = $$('.paper', feat);
      const ftl = gsap.timeline({ scrollTrigger: { trigger: '#showcase', start: 'top 75%', end: 'center 45%', scrub: 1 } });
      if (papers.length) ftl.fromTo(papers, { x: 0, opacity: 1 }, { x: (i) => 120 + i * 40, y: (i) => -10 + i * 8, rotate: 0, scale: 0.55, opacity: 0, stagger: 0.12, ease: 'power2.in' }, 0);
      ftl.from($('.browser', feat), { opacity: 0.35, filter: 'grayscale(1) brightness(.6)', ease: 'none' }, 0);
      const chips = $$('.chip-float', feat);
      if (chips.length) ftl.from(chips, { y: 18, opacity: 0, scale: 0.9, stagger: 0.15, ease: 'back.out(2)' }, 0.35);
    }
    gsap.from('.showcase__list li', { x: 30, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '#showcase', start: 'top 80%' } });

    // NÚMEROS: contagem
    $$('[data-count]').forEach((n) => {
      const end = +n.dataset.count;
      const obj = { v: 0 };
      n.textContent = '0';
      gsap.to(obj, {
        v: end, duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: n, start: 'top 90%' },
        onUpdate: () => (n.textContent = Math.round(obj.v))
      });
    });

    // CONTATO: fundo pulsa ao entrar
    gsap.from('.contact__bg', { scale: 1.25, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 30%', scrub: true } });

    // Recalcula após imagens/fontes carregarem
    window.addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* ---------- Abrir caso direto pelo link (#caso-itamaraty) ---------- */
  function deepLink() {
    const m = location.hash.match(/^#caso-(.+)$/);
    if (!m) return;
    const idx = (DATA.projetos || []).findIndex((p) => p.id === m[1]);
    if (idx > -1) setTimeout(() => openCase(idx), 600);
  }

  /* ======================================================================
     INICIALIZAÇÃO
     ====================================================================== */
  function init() {
    renderShowcase();
    renderStack();
    renderEducation();
    renderNumbers();
    renderTestimonials();
    renderIcons();
    bindEvents();
    bindShowcase();
    photoCarousel();
    navOnScroll();
    tilt();
    magnetic();
    animations();
    deepLink();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
