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
  document.getElementById('modal-client').textContent  = p.client;
  document.getElementById('modal-year').textContent    = p.year;
  document.getElementById('modal-role').textContent    = p.role;

  const tagsEl = document.getElementById('modal-tags');
  let tagsHtml = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  if (p.behanceUrl) tagsHtml += `<a href="${p.behanceUrl}" target="_blank" class="modal-tag" style="border-color:var(--gold);color:var(--gold);">Ver en Behance ↗</a>`;
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
  projects.forEach(p => {
    const visible = filter === 'all' || p.category === filter;
    const card = document.createElement('div');
    card.className = `project-card ${p.col || 'col-6'}${visible ? '' : ' hidden'}`;
    const thumbHtml = p.thumb
      ? `<img src="${p.thumb}" class="project-thumb-img" alt="${p.title}" loading="lazy" />`
      : `<div class="project-thumb-placeholder">◈</div>`;
    card.innerHTML = `
      <div class="project-thumb">
        ${thumbHtml}
        <div class="project-overlay"><span class="project-overlay-link">Ver proyecto →</span></div>
      </div>
      <div class="project-info">
        <div class="project-cat">${p.categoryLabel}</div>
        <div class="project-title">${currentLang === 'en' && p.titleEn ? p.titleEn : p.title}</div>
        <div class="project-desc">${(currentLang === 'en' && p.descriptionEn ? p.descriptionEn : p.description).slice(0,110)}...</div>
      </div>`;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
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

function applyTranslations() {
  const t = i18n[currentLang];
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
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
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
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));
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

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = '...';
  setTimeout(() => {
    document.getElementById('form-success').classList.add('show');
    e.target.reset();
    btn.textContent = i18n[currentLang]['contact.send'];
  }, 1200);
});

document.getElementById('cv-download-btn').addEventListener('click', e => {
  e.preventDefault();
  window.open('https://www.behance.net/kevinnavarrete1', '_blank');
});

/* ── Init ────────────────────────────────────────────────── */
renderProjects();
renderSkills();
renderTools();
renderTimeline('timeline-exp', getExperience());
renderTimeline('timeline-edu', getEducation());
renderCerts();
applyTranslations();
initReveal();
initSkillBars();
