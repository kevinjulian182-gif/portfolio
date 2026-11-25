/* ============================================================
   main.js — Lógica del portafolio
   Los datos vienen de data.js (defaults) o localStorage (admin)
============================================================ */

let currentLang = 'es';
let currentFilter = 'all';

// ── Gallery state ─────────────────────────────────────────────
let galleryImages = [];
let galleryIndex = 0;

function setGalleryImage(idx) {
  galleryIndex = idx;
  const imgInner = document.getElementById('modal-icon');
  const counter  = document.getElementById('img-counter');
  const galleryEl = document.getElementById('modal-gallery');
  const prevBtn  = document.getElementById('img-prev');
  const nextBtn  = document.getElementById('img-next');
  const src = galleryImages[idx];
  imgInner.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;" alt="Imagen ${idx+1}" loading="lazy" />`;
  counter.textContent = galleryImages.length > 1 ? `${idx + 1} / ${galleryImages.length}` : '';
  prevBtn.classList.toggle('hidden', galleryImages.length <= 1);
  nextBtn.classList.toggle('hidden', galleryImages.length <= 1);
  galleryEl.querySelectorAll('.modal-gallery-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

/* ── Caso de estudio ───────────────────────────────────────────
   Reto, proceso y resultado. Es lo que separa mostrar una imagen
   de explicar una decision, asi que va antes de los metadatos. */
function renderCaseStudy(p, lang) {
  const box = document.getElementById('modal-case');
  const cs  = p.caseStudy;
  const pick = (k) => (lang === 'en' && cs[k + 'En']) ? cs[k + 'En'] : cs[k];

  if (!cs || !(cs.challenge || cs.process || cs.outcome)) {
    box.hidden = true;
    box.innerHTML = '';
    return;
  }

  const t = lang === 'en'
    ? { challenge: 'The challenge', process: 'Process', outcome: 'Outcome', draft: 'Draft — pending review' }
    : { challenge: 'El reto',       process: 'Proceso', outcome: 'Resultado', draft: 'Borrador — pendiente de revisar' };

  const bloque = (k) => pick(k)
    ? `<div class="case-block">
         <h4 class="case-label">${t[k]}</h4>
         <p class="case-text">${pick(k)}</p>
       </div>`
    : '';

  /* El sello de borrador ya no se muestra al visitante: a un reclutador
     le decia "esto esta a medias". La marca sigue en los datos y el panel
     la destaca, para que Kevin sepa cuales le faltan por revisar. */
  box.innerHTML = bloque('challenge') + bloque('process') + bloque('outcome');
  box.hidden = false;
}

function openModal(p) {
  const lang = currentLang;
  document.getElementById('modal-cat').textContent   = p.categoryLabel;
  document.getElementById('modal-title').textContent = lang === 'en' && p.titleEn ? p.titleEn : p.title;

  galleryImages = (p.images && p.images.length) ? [...p.images] : (p.thumb ? [p.thumb] : []);

  const galleryEl = document.getElementById('modal-gallery');
  if (galleryImages.length > 1) {
    galleryEl.innerHTML = galleryImages.map((src, i) =>
      `<div class="modal-gallery-thumb${i===0?' active':''}" data-idx="${i}">
        <img src="${src}" alt="Vista ${i+1}" loading="lazy" />
      </div>`
    ).join('');
    galleryEl.style.marginTop = '0.75rem';
    galleryEl.querySelectorAll('.modal-gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => setGalleryImage(parseInt(thumb.dataset.idx)));
    });
  } else {
    galleryEl.innerHTML = '';
    galleryEl.style.marginTop = '0';
  }

  if (galleryImages.length) {
    setGalleryImage(0);
  } else {
    document.getElementById('modal-icon').textContent = '◈';
    document.getElementById('img-counter').textContent = '';
  }

  document.getElementById('modal-desc').textContent    = lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description;
  renderCaseStudy(p, lang);
  document.getElementById('modal-client').textContent  = p.client;
  document.getElementById('modal-year').textContent    = p.year;
  document.getElementById('modal-role').textContent    = p.role;

  const tagsEl = document.getElementById('modal-tags');
  let tagsHtml = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  if (p.behanceUrl) tagsHtml += `<a href="${p.behanceUrl}" target="_blank" class="modal-tag" style="border-color:var(--accent);color:var(--accent);">Ver en Behance ↗</a>`;
  tagsEl.innerHTML = tagsHtml;

  const figmaBlock = document.getElementById('modal-figma');
  const figmaLink  = document.getElementById('modal-figma-link');
  if (p.figmaUrl && p.figmaUrl.includes('figma.com/proto/') && !p.figmaUrl.includes('example')) {
    figmaLink.href = p.figmaUrl;
    figmaBlock.style.display = 'block';
  } else {
    figmaBlock.style.display = 'none';
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Render functions ─────────────────────────────────────── */
function renderProjects(filter = 'all') {
  const projects = getProjects();
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  projects.forEach((p, i) => {
    const visible = filter === 'all' || p.category === filter;
    const title   = currentLang === 'en' && p.titleEn ? p.titleEn : p.title;
    const num     = String(i + 1).padStart(2, '0');

    const card = document.createElement('article');
    card.className = `project-card${visible ? '' : ' hidden'}`;
    // La tarjeta entera abre la ficha, así que tiene que ser alcanzable
    // por teclado igual que un botón.
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', (currentLang === 'en' ? 'View project: ' : 'Ver proyecto: ') + title);

    const thumbHtml = p.thumb
      ? `<img src="${p.thumb}" class="project-thumb-img" alt="${title}" loading="lazy" />`
      : `<div class="project-thumb-placeholder" aria-hidden="true">/</div>`;

    card.innerHTML = `
      <div class="project-thumb">
        ${thumbHtml}
        <div class="project-overlay" aria-hidden="true">
          <span class="project-overlay-link">${currentLang === 'en' ? 'View project' : 'Ver proyecto'} &rarr;</span>
        </div>
      </div>
      <div class="project-info">
        <span class="project-index" aria-hidden="true">${num}</span>
        <h3 class="project-title">${title}</h3>
        <div class="project-meta">
          <span class="project-cat">${p.categoryLabel}</span>
          <span class="project-year">${p.year || ''}</span>
        </div>
      </div>`;

    const open = () => openModal(p);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    grid.appendChild(card);
  });

  observarTarjetas();
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = getSkills().map(s => `
    <div class="skill-item">
      <div class="skill-name"><span>${s.name}</span><span>${s.level}%</span></div>
      <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
    </div>`).join('');
}

function renderTools() {
  document.getElementById('tools-grid').innerHTML = getTools()
    .map(t => `<span class="tool-pill">${t}</span>`).join('');
}

function renderTimeline(id, items) {
  document.getElementById(id).innerHTML = items.map(item => `
    <div class="timeline-item">
      <div class="timeline-period">${item.period}</div>
      <div class="timeline-title">${item.title}</div>
      <div class="timeline-company">${item.company}</div>
      <div class="timeline-desc">${item.desc}</div>
    </div>`).join('');
}

function renderCerts() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  grid.innerHTML = getCertifications().map(c => `
    <div class="cert-card">
      <div class="cert-platform">${c.platform}</div>
      <div class="cert-name">${c.name}</div>
      <div class="cert-year">${c.year}</div>
    </div>`).join('');
}


/* ══════════════════════════════════════════════════════════════
   MOVIMIENTO
══════════════════════════════════════════════════════════════ */

const SIN_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* La portada no entra hasta que las fuentes están listas: con Fraunces
   cargando, el titular cambiaría de forma a mitad de la animación. */
function initEntradaPortada() {
  const arrancar = () => document.documentElement.classList.add('fuentes-listas');
  if (SIN_MOVIMIENTO) { arrancar(); return; }

  if (document.fonts && document.fonts.ready) {
    // El tope evita que una red lenta deje la portada en blanco.
    Promise.race([
      document.fonts.ready,
      new Promise(r => setTimeout(r, 1200)),
    ]).then(arrancar);
  } else {
    arrancar();
  }
}

/* Escalona la entrada según el orden de lectura. El índice va en una
   variable CSS y el retardo lo calcula la hoja de estilos. */
function escalonar(elementos, tope) {
  elementos.forEach((el, i) => el.style.setProperty('--i', Math.min(i, tope || 6)));
}

function initRevelado() {
  const objetivos = [...document.querySelectorAll('.reveal, .project-card')];
  escalonar([...document.querySelectorAll('.reveal')], 4);

  if (SIN_MOVIMIENTO || !('IntersectionObserver' in window)) {
    objetivos.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entradas, o) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      o.unobserve(e.target);        // una vez revelado, deja de observarse
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  objetivos.forEach(el => obs.observe(el));
}

/* Las tarjetas se pintan por JS, así que hay que engancharlas cada vez
   que se vuelven a generar (al filtrar o al cambiar de idioma). */
function observarTarjetas() {
  const tarjetas = [...document.querySelectorAll('.project-card')];
  escalonar(tarjetas, 5);

  tarjetas.forEach(t => {
    const img = t.querySelector('.project-thumb-img');
    if (img) {
      if (img.complete && img.naturalWidth) img.classList.add('cargada');
      else img.addEventListener('load', () => img.classList.add('cargada'), { once: true });
      img.addEventListener('error', () => img.classList.add('cargada'), { once: true });
    }
  });

  if (SIN_MOVIMIENTO || !('IntersectionObserver' in window)) {
    tarjetas.forEach(t => t.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entradas, o) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      o.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  tarjetas.forEach(t => obs.observe(t));
}


/* ── Cómo trabajo con IA ───────────────────────────────────────
   Va en datos y no en el HTML para que Kevin pueda corregirlo desde
   el panel: es lo que más rápido se queda viejo. */
function renderIA() {
  const s    = getSite();
  const en   = currentLang === 'en';
  const lista = document.getElementById('ia-practicas');
  if (!lista) return;

  const practicas = s.aiPractices || [];
  lista.innerHTML = practicas.map((p, i) => `
    <li class="ia-practica" style="--i:${i}">
      <span class="ia-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="ia-practica-titulo">${en && p.tituloEn ? p.tituloEn : p.titulo}</h3>
      <p class="ia-practica-texto">${en && p.textoEn ? p.textoEn : p.texto}</p>
    </li>`).join('');

  const tools = document.getElementById('ia-tools');
  if (tools) tools.textContent = (s.aiTools || []).join(' · ');

  const limite = document.getElementById('ia-limite');
  if (limite) limite.textContent = (en && s.aiLimitEn) ? s.aiLimitEn : (s.aiLimit || '');
}

/* ── Ajustes del sitio ─────────────────────────────────────────
   Retrato y CV salen de los datos, no del HTML, para que se
   puedan cambiar desde el panel sin tocar código. */
function applySiteSettings() {
  const s = getSite();

  const marco = document.querySelector('.about-portrait');
  if (marco && s.portrait) {
    marco.innerHTML =
      '<img src="' + s.portrait + '" alt="' + (s.portraitAlt || 'Kevin Navarrete') + '" ' +
      'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;" />';
  }

  const cv = document.getElementById('cv-download-btn');
  if (cv) {
    cv.href = s.cvUrl || 'cv.html';
    if (s.cvUrl) {
      cv.setAttribute('target', '_blank');
      cv.setAttribute('rel', 'noopener');
    }
  }
}

function applyTranslations() {
  const t = getI18n()[currentLang] || i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
  });
  document.getElementById('lang-toggle').textContent = currentLang === 'es' ? 'EN' : 'ES';
  renderProjects(currentFilter);
}

/* ── Scroll reveal ───────────────────────────────────────── */
function initReveal() {
  initRevelado();
}

function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(f => { f.style.width = f.dataset.level + '%'; });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const grid = document.getElementById('skills-grid');
  if (grid) obs.observe(grid);
}

/* ── Events ──────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 60);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  document.documentElement.setAttribute('lang', currentLang);
  applyTranslations();
  renderIA();
});

document.getElementById('hamburger').addEventListener('click', e => {
  const open = document.getElementById('mobile-menu').classList.toggle('open');
  e.currentTarget.classList.toggle('active', open);
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
    const h = document.getElementById('hamburger');
    h.classList.remove('active');
    h.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProjects(currentFilter);
  });
});

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  const open = document.getElementById('modal-overlay').classList.contains('open');
  if (open && e.key === 'ArrowRight' && galleryIndex < galleryImages.length - 1) setGalleryImage(galleryIndex + 1);
  if (open && e.key === 'ArrowLeft'  && galleryIndex > 0) setGalleryImage(galleryIndex - 1);
});
document.getElementById('img-prev').addEventListener('click', () => { if (galleryIndex > 0) setGalleryImage(galleryIndex - 1); });
document.getElementById('img-next').addEventListener('click', () => { if (galleryIndex < galleryImages.length - 1) setGalleryImage(galleryIndex + 1); });

/* ── Formulario de contacto ───────────────────────────────────
   Antes esto fingia: un setTimeout de 1.2s y un "mensaje enviado"
   que no enviaba nada. Ahora publica contra Netlify Forms, que
   guarda el mensaje y lo reenvia por correo. */
const form = document.getElementById('contact-form');

function mostrarError(id, texto) {
  const campo = document.getElementById(id);
  const error = document.getElementById('err-' + id);
  if (!error) return;
  if (texto) {
    error.textContent = texto;
    error.hidden = false;
    campo.setAttribute('aria-invalid', 'true');
  } else {
    error.hidden = true;
    campo.removeAttribute('aria-invalid');
  }
}

function validarFormulario() {
  const t = getI18n()[currentLang] || i18n[currentLang];
  const requerido = t['contact.required'] || 'Este campo es obligatorio.';
  const correoMal  = t['contact.bademail'] || 'Revisa el correo: falta algo.';
  let primero = null;

  [['name', requerido], ['message', requerido]].forEach(([id, msg]) => {
    const v = document.getElementById(id).value.trim();
    mostrarError(id, v ? '' : msg);
    if (!v && !primero) primero = id;
  });

  const correo = document.getElementById('email').value.trim();
  const correoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  mostrarError('email', correoOk ? '' : (correo ? correoMal : requerido));
  if (!correoOk && !primero) primero = 'email';

  // El foco va al primer campo con problema: si no, en movil el error
  // queda fuera de pantalla y parece que el boton no hace nada.
  if (primero) document.getElementById(primero).focus();
  return !primero;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const t      = getI18n()[currentLang] || i18n[currentLang];
  const aviso  = document.getElementById('form-success');
  const boton  = document.getElementById('btn-enviar');
  const textoBoton = boton.textContent;

  if (!validarFormulario()) return;

  boton.disabled = true;
  boton.textContent = t['contact.sending'] || 'Enviando…';
  aviso.className = 'form-success';
  aviso.textContent = '';

  try {
    /* Va a /api/contacto y no directo a Netlify Forms: los envios
       hechos con fetch desde el navegador se perdian, mientras el
       mismo POST desde el servidor si entraba. La funcion guarda el
       mensaje primero y despues avisa por correo. */
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre:  document.getElementById('name').value.trim(),
        correo:  document.getElementById('email').value.trim(),
        motivo:  document.getElementById('subject').value,
        mensaje: document.getElementById('message').value.trim(),
        website: (document.querySelector('[name="bot-field"]') || {}).value || '',
      }),
    });
    if (!res.ok) {
      let detalle = '';
      try { detalle = (await res.json()).error || ''; } catch (e) {}
      throw new Error(detalle || ('HTTP ' + res.status));
    }

    aviso.className = 'form-success show';
    aviso.textContent = t['contact.success'] || 'Mensaje enviado. Te respondo pronto.';
    form.reset();
  } catch (err) {
    // Si falla, no se finge exito: se da una salida que si funciona.
    aviso.className = 'form-success show error';
    aviso.innerHTML = (t['contact.failed'] || 'No se pudo enviar. Escríbeme directamente a') +
      ' <a href="mailto:kevinjulian182@gmail.com">kevinjulian182@gmail.com</a>.';
  }

  boton.disabled = false;
  boton.textContent = textoBoton;
});

/* El boton del CV abria Behance, que no es un CV. Ahora lleva a
   /cv.html, que se pinta con los mismos datos del sitio y se puede
   guardar como PDF desde el navegador. Si Kevin sube su propio PDF
   al panel (SITE.cvUrl), ese tiene prioridad. */

/* ── Init ──────────────────────────────────────────────────
   Primero se pide al servidor lo guardado y solo después se pinta:
   si se pintara antes, se vería un parpadeo del contenido viejo al
   nuevo cada vez que Kevin cambia algo. */
function pintarTodo() {
  renderProjects();
  renderSkills();
  renderTools();
  renderTimeline('timeline-exp', getExperience());
  renderTimeline('timeline-edu', getEducation());
  renderCerts();
  applyTranslations();
  applySiteSettings();
  renderIA();
  initReveal();
  initSkillBars();
  initEntradaPortada();
}

cargarRemoto()
  .then(setRemoto)
  .catch(() => {})          // sin red, se pinta con los valores por defecto
  .then(pintarTodo);
