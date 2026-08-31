/* ============================================================
   admin.js — Panel de administración

   Ya no hay credenciales en este archivo. La contraseña vive como
   variable de entorno en el servidor (PANEL_PASS) y se comprueba
   allí: aunque alguien lea este código, no encuentra nada con lo
   que entrar.

   Guardar es inmediato — cada Guardar escribe en el servidor y el
   sitio queda actualizado. No hay borrador ni paso de publicación.
============================================================ */

/* ── Session check ─────────────────────────────────────────── */
function isLoggedIn() { return Boolean(claveGuardada()); }
function logout()     { olvidarClave(); location.reload(); }

/* ── Toast ─────────────────────────────────────────────────── */
/* saveSection ahora escribe en el servidor y puede fallar. Esto
   envuelve las llamadas para que el error se vea en pantalla en vez
   de perderse en la consola. */
function guardar(promesa) {
  Promise.resolve(promesa).catch(err => showToast('✗ No se pudo guardar: ' + err.message));
}

function showToast(msg = '✓ Cambios guardados') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Confirm dialog ────────────────────────────────────────── */
let confirmCallback = null;
function confirmDelete(cb) {
  confirmCallback = cb;
  document.getElementById('confirm-overlay').classList.add('open');
}
document.getElementById('confirm-cancel').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.remove('open');
});
document.getElementById('confirm-ok').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.remove('open');
  if (confirmCallback) confirmCallback();
  confirmCallback = null;
});

/* ══════════════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════════════ */
function initLogin() {
  if (isLoggedIn()) { showPanel(); return; }

  document.getElementById('login-screen').style.display = 'flex';

  const form  = document.getElementById('login-form');
  const campo = document.getElementById('login-pass');
  const error = document.getElementById('login-error');
  const boton = document.getElementById('btn-login');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.classList.remove('show');
    boton.disabled = true;
    boton.textContent = 'Comprobando…';
    try {
      await comprobarClave(campo.value);
      showPanel();
    } catch (err) {
      error.textContent = err.message;
      error.classList.add('show');
      campo.select();
    }
    boton.disabled = false;
    boton.textContent = 'Entrar';
  });
}

function showPanel() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display  = 'flex';
  initPanel();
}

document.getElementById('btn-logout').addEventListener('click', logout);

/* ══════════════════════════════════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════════════════════════════════ */
function initPanel() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
  renderProjectsList();
  renderSkillsEditor();
  renderExperienceEditor();
  renderEducationEditor();
  initExport();
  initTextos();
  initAjustes();
  initSubidaImagenes();
}

/* ══════════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════════ */
let editingProjectId = null;

function renderProjectsList() {
  const projects = getProjects();
  const list = document.getElementById('projects-list');
  if (!projects.length) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No hay proyectos. Agrega el primero.</p>';
    return;
  }
  list.innerHTML = projects.map((p, idx) => `
    <div class="project-row" data-id="${p.id}">
      <span class="drag-handle" title="Arrastrar para reordenar">⠿</span>
      <div class="project-row-thumb">
        ${p.thumb ? `<img src="${p.thumb}" alt="${p.title}" />` : '◈'}
      </div>
      <div class="project-row-info">
        <div class="project-row-title">${p.title}</div>
        <div class="project-row-meta">
          <span class="project-row-cat">${p.categoryLabel}</span>
          ${p.client} · ${p.year}
        </div>
      </div>
      <div class="project-row-actions">
        <button class="btn-icon-sm" title="Mover arriba" onclick="moveProject(${p.id}, -1)">↑</button>
        <button class="btn-icon-sm" title="Mover abajo"  onclick="moveProject(${p.id},  1)">↓</button>
        <button class="btn-icon-sm" title="Editar"       onclick="editProject(${p.id})">✎</button>
        <button class="btn-icon-sm del" title="Eliminar" onclick="deleteProject(${p.id})">✕</button>
      </div>
    </div>`).join('');
}

function moveProject(id, dir) {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.id === id);
  const target = idx + dir;
  if (target < 0 || target >= projects.length) return;
  [projects[idx], projects[target]] = [projects[target], projects[idx]];
  guardar(saveSection('projects', projects));
  renderProjectsList();
  showToast('Orden actualizado');
}

function deleteProject(id) {
  confirmDelete(() => {
    const projects = getProjects().filter(p => p.id !== id);
    guardar(saveSection('projects', projects));
    renderProjectsList();
    showToast('Proyecto eliminado');
  });
}

function editProject(id) {
  const p = getProjects().find(p => p.id === id);
  if (!p) return;
  editingProjectId = id;
  document.getElementById('modal-box-title').textContent = 'Editar proyecto';
  fillProjectForm(p);
  openProjectModal();
}

function fillProjectForm(p) {
  document.getElementById('pf-title').value      = p.title || '';
  document.getElementById('pf-titleEn').value    = p.titleEn || '';
  document.getElementById('pf-category').value   = p.category || 'branding';
  document.getElementById('pf-col').value        = p.col || 'col-6';
  document.getElementById('pf-client').value     = p.client || '';
  document.getElementById('pf-year').value       = p.year || '';
  document.getElementById('pf-role').value       = p.role || '';
  document.getElementById('pf-desc').value       = p.description || '';
  document.getElementById('pf-descEn').value     = p.descriptionEn || '';
  document.getElementById('pf-tags').value       = (p.tags || []).join(', ');
  document.getElementById('pf-behanceUrl').value = p.behanceUrl || '';
  document.getElementById('pf-figmaUrl').value   = p.figmaUrl || '';
  const imgs = p.images || (p.thumb ? [p.thumb] : []);
  document.getElementById('pf-images').value     = imgs.join('\n');

  const cs = p.caseStudy || {};
  document.getElementById('pf-cs-challenge').value   = cs.challenge   || '';
  document.getElementById('pf-cs-challengeEn').value = cs.challengeEn || '';
  document.getElementById('pf-cs-process').value     = cs.process     || '';
  document.getElementById('pf-cs-processEn').value   = cs.processEn   || '';
  document.getElementById('pf-cs-outcome').value     = cs.outcome     || '';
  document.getElementById('pf-cs-outcomeEn').value   = cs.outcomeEn   || '';
  document.getElementById('pf-cs-draft').checked     = Boolean(cs.draft);

  previewImages();
}

function clearProjectForm() {
  ['pf-cs-challenge','pf-cs-challengeEn','pf-cs-process','pf-cs-processEn',
   'pf-cs-outcome','pf-cs-outcomeEn'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const draft = document.getElementById('pf-cs-draft'); if (draft) draft.checked = false;
  ['pf-title','pf-titleEn','pf-client','pf-year','pf-role',
   'pf-desc','pf-descEn','pf-tags','pf-behanceUrl','pf-figmaUrl','pf-images'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('pf-category').value = 'branding';
  document.getElementById('pf-col').value      = 'col-6';
  document.getElementById('img-preview-grid').innerHTML = '';
}

function openProjectModal() {
  document.getElementById('project-modal-overlay').classList.add('open');
}
function closeProjectModal() {
  document.getElementById('project-modal-overlay').classList.remove('open');
  editingProjectId = null;
}

document.getElementById('btn-new-project').addEventListener('click', () => {
  editingProjectId = null;
  document.getElementById('modal-box-title').textContent = 'Nuevo proyecto';
  clearProjectForm();
  openProjectModal();
});
document.getElementById('modal-box-close').addEventListener('click', closeProjectModal);
document.getElementById('btn-cancel-project').addEventListener('click', closeProjectModal);

document.getElementById('btn-save-project').addEventListener('click', () => {
  const title = document.getElementById('pf-title').value.trim();
  if (!title) { alert('El título es obligatorio'); return; }

  const images = document.getElementById('pf-images').value
    .split('\n').map(s => s.trim()).filter(Boolean);
  const thumb = images[0] || '';
  const category = document.getElementById('pf-category').value;
  const categoryLabel = category === 'uxui' ? 'UX/UI' : 'Branding';

  const projectData = {
    id: editingProjectId || Date.now(),
    title,
    titleEn:     document.getElementById('pf-titleEn').value.trim(),
    category,
    categoryLabel,
    col:         document.getElementById('pf-col').value,
    thumb,
    images,
    description: document.getElementById('pf-desc').value.trim(),
    descriptionEn: document.getElementById('pf-descEn').value.trim(),
    tags:        document.getElementById('pf-tags').value.split(',').map(s=>s.trim()).filter(Boolean),
    client:      document.getElementById('pf-client').value.trim(),
    year:        document.getElementById('pf-year').value.trim(),
    role:        document.getElementById('pf-role').value.trim(),
    behanceUrl:  document.getElementById('pf-behanceUrl').value.trim(),
    figmaUrl:    document.getElementById('pf-figmaUrl').value.trim(),
  };

  // Caso de estudio: solo se adjunta si tiene algo escrito, para no
  // dejar objetos vacios en los datos.
  const cs = {
    challenge:   document.getElementById('pf-cs-challenge').value.trim(),
    challengeEn: document.getElementById('pf-cs-challengeEn').value.trim(),
    process:     document.getElementById('pf-cs-process').value.trim(),
    processEn:   document.getElementById('pf-cs-processEn').value.trim(),
    outcome:     document.getElementById('pf-cs-outcome').value.trim(),
    outcomeEn:   document.getElementById('pf-cs-outcomeEn').value.trim(),
  };
  if (cs.challenge || cs.process || cs.outcome) {
    if (document.getElementById('pf-cs-draft').checked) cs.draft = true;
    projectData.caseStudy = cs;
  }

  let projects = getProjects();
  if (editingProjectId) {
    const idx = projects.findIndex(p => p.id === editingProjectId);
    if (idx !== -1) projects[idx] = projectData;
  } else {
    projects.push(projectData);
  }
  guardar(saveSection('projects', projects));
  renderProjectsList();
  closeProjectModal();
  showToast(editingProjectId ? '✓ Proyecto actualizado' : '✓ Proyecto agregado');
});

/* Image preview */
function previewImages() {
  const urls = document.getElementById('pf-images').value
    .split('\n').map(s => s.trim()).filter(Boolean);
  const grid = document.getElementById('img-preview-grid');
  grid.innerHTML = urls.map((url, i) => `
    <div class="img-preview-thumb">
      <img src="${url}" alt="img ${i+1}" onerror="this.style.display='none'" />
      <span class="del-img" onclick="removePreviewImg(${i})" title="Quitar">✕</span>
    </div>`).join('');
}

function removePreviewImg(idx) {
  const lines = document.getElementById('pf-images').value
    .split('\n').map(s => s.trim()).filter(Boolean);
  lines.splice(idx, 1);
  document.getElementById('pf-images').value = lines.join('\n');
  previewImages();
}

document.getElementById('btn-preview-images').addEventListener('click', previewImages);
document.getElementById('pf-images').addEventListener('blur', previewImages);

/* ══════════════════════════════════════════════════════════════
   SKILLS & TOOLS
══════════════════════════════════════════════════════════════ */
function renderSkillsEditor() {
  const skills = getSkills();
  const tools  = getTools();

  document.getElementById('skills-editor').innerHTML = skills.map((s, i) => `
    <div class="skill-editor-row" data-idx="${i}">
      <input type="text" value="${s.name}" placeholder="Habilidad" class="sk-name" />
      <input type="range" min="1" max="100" value="${s.level}" class="sk-range"
        oninput="this.nextElementSibling.textContent=this.value+'%'" />
      <span class="skill-level-val">${s.level}%</span>
      <button class="btn-icon-sm del" onclick="removeSkillRow(${i})" title="Eliminar">✕</button>
    </div>`).join('');

  document.getElementById('tools-editor').value = tools.join('\n');
}

function removeSkillRow(idx) {
  const rows = [...document.querySelectorAll('#skills-editor .skill-editor-row')];
  rows[idx].remove();
}

document.getElementById('btn-add-skill').addEventListener('click', () => {
  const container = document.getElementById('skills-editor');
  const div = document.createElement('div');
  div.className = 'skill-editor-row';
  div.innerHTML = `
    <input type="text" placeholder="Nueva habilidad" class="sk-name" />
    <input type="range" min="1" max="100" value="75" class="sk-range"
      oninput="this.nextElementSibling.textContent=this.value+'%'" />
    <span class="skill-level-val">75%</span>
    <button class="btn-icon-sm del" title="Eliminar"
      onclick="this.closest('.skill-editor-row').remove()">✕</button>`;
  container.appendChild(div);
});

document.getElementById('btn-save-skills').addEventListener('click', () => {
  const rows = [...document.querySelectorAll('#skills-editor .skill-editor-row')];
  const skills = rows.map(row => ({
    name:  row.querySelector('.sk-name').value.trim(),
    level: parseInt(row.querySelector('.sk-range').value)
  })).filter(s => s.name);

  const tools = document.getElementById('tools-editor').value
    .split('\n').map(s => s.trim()).filter(Boolean);

  guardar(saveSection('skills', skills));
  guardar(saveSection('tools',  tools));
  showToast('✓ Habilidades y herramientas guardadas');
});

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════════════ */
function renderExperienceEditor() {
  const exp = getExperience();
  document.getElementById('experience-editor').innerHTML = exp.map((e, i) =>
    timelineEditorItem('exp', i, e)).join('');
}

function timelineEditorItem(type, idx, item) {
  return `
    <div class="timeline-editor-item" data-idx="${idx}" data-type="${type}">
      <div class="field-group">
        <label>Período</label>
        <input type="text" class="te-period" value="${item.period||''}" placeholder="Ej: 2022 — 2024" />
      </div>
      <div class="field-group">
        <label>Cargo / Título</label>
        <input type="text" class="te-title" value="${item.title||''}" />
      </div>
      <div class="field-group">
        <label>Empresa / Institución</label>
        <input type="text" class="te-company" value="${item.company||''}" />
      </div>
      <div class="field-group span-2">
        <label>Descripción completa</label>
        <textarea class="te-desc" rows="4">${item.desc||''}</textarea>
      </div>
      <div class="timeline-editor-actions">
        <button class="btn-icon-sm del" title="Eliminar" onclick="removeTimelineItem(this)">✕ Eliminar</button>
      </div>
    </div>`;
}

function removeTimelineItem(btn) {
  confirmDelete(() => btn.closest('.timeline-editor-item').remove());
}

document.getElementById('btn-add-exp').addEventListener('click', () => {
  const container = document.getElementById('experience-editor');
  container.insertAdjacentHTML('beforeend',
    timelineEditorItem('exp', Date.now(), {}));
});

document.getElementById('btn-save-exp').addEventListener('click', () => {
  const items = [...document.querySelectorAll('#experience-editor .timeline-editor-item')].map(el => ({
    period:  el.querySelector('.te-period').value.trim(),
    title:   el.querySelector('.te-title').value.trim(),
    company: el.querySelector('.te-company').value.trim(),
    desc:    el.querySelector('.te-desc').value.trim(),
  })).filter(e => e.title);
  guardar(saveSection('experience', items));
  showToast('✓ Experiencia guardada');
});

/* ══════════════════════════════════════════════════════════════
   EDUCATION & CERTIFICATIONS
══════════════════════════════════════════════════════════════ */
function renderEducationEditor() {
  const edu   = getEducation();
  const certs = getCertifications();

  document.getElementById('education-editor').innerHTML = edu.map((e, i) =>
    timelineEditorItem('edu', i, e)).join('');

  document.getElementById('certs-editor').innerHTML = certs.map((c, i) => `
    <div class="cert-editor-item" data-idx="${i}">
      <div class="field-group">
        <label>Nombre del certificado</label>
        <input type="text" class="cert-name-inp" value="${c.name||''}" />
      </div>
      <div class="field-group">
        <label>Plataforma</label>
        <input type="text" class="cert-platform-inp" value="${c.platform||''}" placeholder="Udemy" />
      </div>
      <div class="field-group">
        <label>Año</label>
        <input type="text" class="cert-year-inp" value="${c.year||''}" placeholder="2023" />
      </div>
      <button class="btn-icon-sm del" style="align-self:flex-end;"
        onclick="confirmDelete(()=>{this.closest('.cert-editor-item').remove()})" title="Eliminar">✕</button>
    </div>`).join('');
}

document.getElementById('btn-add-edu').addEventListener('click', () => {
  document.getElementById('education-editor')
    .insertAdjacentHTML('beforeend', timelineEditorItem('edu', Date.now(), {}));
});

document.getElementById('btn-add-cert').addEventListener('click', () => {
  const idx = Date.now();
  document.getElementById('certs-editor').insertAdjacentHTML('beforeend', `
    <div class="cert-editor-item" data-idx="${idx}">
      <div class="field-group">
        <label>Nombre del certificado</label>
        <input type="text" class="cert-name-inp" />
      </div>
      <div class="field-group">
        <label>Plataforma</label>
        <input type="text" class="cert-platform-inp" placeholder="Udemy" />
      </div>
      <div class="field-group">
        <label>Año</label>
        <input type="text" class="cert-year-inp" placeholder="2025" />
      </div>
      <button class="btn-icon-sm del" style="align-self:flex-end;"
        onclick="confirmDelete(()=>{this.closest('.cert-editor-item').remove()})">✕</button>
    </div>`);
});

document.getElementById('btn-save-edu').addEventListener('click', () => {
  const edu = [...document.querySelectorAll('#education-editor .timeline-editor-item')].map(el => ({
    period:  el.querySelector('.te-period').value.trim(),
    title:   el.querySelector('.te-title').value.trim(),
    company: el.querySelector('.te-company').value.trim(),
    desc:    el.querySelector('.te-desc').value.trim(),
  })).filter(e => e.title);

  const certs = [...document.querySelectorAll('#certs-editor .cert-editor-item')].map(el => ({
    name:     el.querySelector('.cert-name-inp').value.trim(),
    platform: el.querySelector('.cert-platform-inp').value.trim(),
    year:     el.querySelector('.cert-year-inp').value.trim(),
  })).filter(c => c.name);

  guardar(saveSection('education', edu));
  guardar(saveSection('certs', certs));
  showToast('✓ Formación y certificaciones guardadas');
});

/* ══════════════════════════════════════════════════════════════
   PUBLICAR — regenera js/data.js con lo que hay en el panel

   Vuelca todo el contenido actual a un data.js completo. Ya no hace
   falta para publicar -- eso es inmediato -- pero sirve de copia de
   seguridad y para reconstruir el sitio si algo se pierde.
══════════════════════════════════════════════════════════════ */

const EXPORT_SECTIONS = [
  ['PROJECTS',       () => getProjects(),       '];'],
  ['SKILLS',         () => getSkills(),         '];'],
  ['TOOLS',          () => getTools(),          '];'],
  ['EXPERIENCE',     () => getExperience(),     '];'],
  ['EDUCATION',      () => getEducation(),      '];'],
  ['CERTIFICATIONS', () => getCertifications(), '];'],
  ['i18n',           () => getI18n(),           '};'],
  ['SITE',           () => getSite(),           '};'],
];

/* Vuelca los datos del panel sobre el data.js original, dejando
   intacto todo lo demás (i18n, comentarios, getters de runtime). */
/* Localiza "const NOMBRE = ..." y lo reemplaza. Recorre por líneas
   en vez de usar regex: el bloque termina en la primera línea que
   cierra con "];" (sirve igual para arrays multilínea y de una sola). */
function replaceConstBlock(source, name, jsValue, cierre) {
  const lines = source.split('\n');
  const head  = 'const ' + name + ' = ';
  const start = lines.findIndex(l => l.startsWith(head));
  if (start === -1) throw new Error('no encontré "const ' + name + '"');

  let end = -1;
  for (let i = start; i < lines.length; i++) {
    if (lines[i].replace(/\s+$/, '').endsWith(cierre || '];')) { end = i; break; }
  }
  if (end === -1) throw new Error('el bloque "const ' + name + '" no cierra');

  return lines
    .slice(0, start)
    .concat('const ' + name + ' = ' + jsValue + ';', lines.slice(end + 1))
    .join('\n');
}

async function buildDataJsFromSource() {
  const res = await fetch('js/data.js', { cache: 'no-store' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  let src = await res.text();

  for (const [name, getter, cierre] of EXPORT_SECTIONS) {
    src = replaceConstBlock(src, name, JSON.stringify(getter(), null, 2), cierre);
  }
  return src;
}

/* Plan B: si no se puede leer data.js (por ejemplo al abrir el panel
   con file:// en vez de un servidor local), se reconstruye entero
   desde memoria. Funciona igual, pero pierde los comentarios. */
function buildDataJsFromMemory() {
  const out = [
    '/* ============================================================',
    '   data.js — Fuente de datos compartida (portafolio + admin)',
    '   Generado desde el panel de administración.',
    '============================================================ */',
    '',
  ];
  for (const [name, getter] of EXPORT_SECTIONS) {
    out.push('const ' + name + ' = ' + JSON.stringify(getter(), null, 2) + ';', '');
  }
  out.push(
    '/* ============================================================',
    '   Runtime — lo guardado en el servidor manda; si no hay nada,',
    '   valen los valores por defecto de arriba.',
    '============================================================ */',
    'let REMOTO = {};',
    'function setRemoto(datos) { REMOTO = datos || {}; }',
    '',
    'function getProjects()      { return REMOTO.projects   || PROJECTS; }',
    'function getSkills()        { return REMOTO.skills     || SKILLS; }',
    'function getTools()         { return REMOTO.tools      || TOOLS; }',
    'function getExperience()    { return REMOTO.experience || EXPERIENCE; }',
    'function getEducation()     { return REMOTO.education  || EDUCATION; }',
    'function getCertifications(){ return REMOTO.certs      || CERTIFICATIONS; }',
    'function getI18n()          { return REMOTO.i18n       || i18n; }',
    'function getSite()          { return Object.assign({}, SITE, REMOTO.site || {}); }',
    '',
    'async function saveSection(key, value) {',
    '  REMOTO[key] = value;',
    '  return guardarRemoto(key, value);',
    '}',
    ''
  );
  return out.join('\n');
}

function initExport() {
  const btnGen  = document.getElementById('btn-generate-data');
  const btnCopy = document.getElementById('btn-copy-data');
  const btnDown = document.getElementById('btn-download-data');
  const output  = document.getElementById('export-output');
  const status  = document.getElementById('export-status');
  if (!btnGen) return;

  btnGen.addEventListener('click', async () => {
    btnGen.disabled = true;
    status.textContent = 'Generando…';
    let text, nota;
    try {
      text = await buildDataJsFromSource();
      nota = 'Generado sobre el data.js original: se conservan los comentarios y las traducciones.';
    } catch (err) {
      text = buildDataJsFromMemory();
      nota = 'Generado desde memoria (no pude leer js/data.js: ' + err.message + '). '
           + 'El archivo es válido, pero pierde los comentarios del original.';
    }
    output.value = text;
    const kb = (new Blob([text]).size / 1024).toFixed(1);
    status.textContent = nota + ' — ' + kb + ' KB.';
    btnCopy.disabled = false;
    btnDown.disabled = false;
    btnGen.disabled = false;
    showToast('✓ data.js generado');
  });

  btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.value);
    } catch (e) {
      output.select();                 // plan B si el portapapeles está bloqueado
      document.execCommand('copy');
    }
    showToast('✓ Copiado al portapapeles');
  });

  btnDown.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([output.value], { type: 'text/javascript' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('✓ data.js descargado');
  });
}

/* ══════════════════════════════════════════════════════════════
   TEXTOS DEL SITIO (i18n)

   Todo lo que no es un proyecto: encabezado, "Sobre mí", contacto,
   menú. Se edita clave por clave y en los dos idiomas a la vez,
   que es como se detecta que falta una traducción.
══════════════════════════════════════════════════════════════ */

/* Agrupa las claves por su prefijo para que el editor no sea una
   lista plana de sesenta campos. */
const TEXTOS_GRUPOS = {
  nav:      'Menú de navegación',
  hero:     'Encabezado (portada)',
  projects: 'Sección de proyectos',
  about:    'Sobre mí',
  cv:       'Trayectoria',
  contact:  'Contacto',
  modal:    'Ficha de proyecto',
  footer:   'Pie de página',
};

function textosActuales() {
  // Copia profunda: no queremos editar el objeto vivo por accidente.
  return JSON.parse(JSON.stringify(getI18n()));
}

function renderTextosEditor(filtro) {
  const cont = document.getElementById('textos-editor');
  if (!cont) return;

  const datos = textosActuales();
  const claves = Object.keys(datos.es || {});
  const q = (filtro || '').trim().toLowerCase();

  const porGrupo = {};
  claves.forEach(k => {
    const grupo = k.split('.')[0];
    (porGrupo[grupo] = porGrupo[grupo] || []).push(k);
  });

  let html = '';
  let visibles = 0;

  Object.keys(porGrupo).forEach(grupo => {
    const items = porGrupo[grupo].filter(k => {
      if (!q) return true;
      const es = (datos.es[k] || '').toLowerCase();
      const en = (datos.en && datos.en[k] || '').toLowerCase();
      return k.toLowerCase().includes(q) || es.includes(q) || en.includes(q);
    });
    if (!items.length) return;
    visibles += items.length;

    html += `<div class="card mt-2">
      <div class="card-header-row"><h3 class="card-title">${TEXTOS_GRUPOS[grupo] || grupo}</h3></div>`;

    items.forEach(k => {
      const es = datos.es[k] || '';
      const en = (datos.en && datos.en[k]) || '';
      const largo = es.length > 90;
      const campo = (idioma, valor) => largo
        ? `<textarea class="texto-input" data-clave="${k}" data-idioma="${idioma}" rows="3">${escaparHtml(valor)}</textarea>`
        : `<input type="text" class="texto-input" data-clave="${k}" data-idioma="${idioma}" value="${escaparHtml(valor)}" />`;

      html += `<div class="texto-fila">
        <code class="texto-clave">${k}</code>
        <div class="texto-campos">
          <div class="field-group">
            <label>Español</label>
            ${campo('es', es)}
          </div>
          <div class="field-group">
            <label>English</label>
            ${campo('en', en)}
          </div>
        </div>
      </div>`;
    });

    html += '</div>';
  });

  cont.innerHTML = html || '<div class="card mt-2"><p class="hint">Ningún texto coincide con la búsqueda.</p></div>';
  const cabecera = document.getElementById('textos-filtro');
  if (cabecera) cabecera.setAttribute('aria-label', visibles + ' textos visibles');
}

/* value="..." e innerHTML necesitan escapado o un texto con comillas
   o con <em> rompe el editor. */
function escaparHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initTextos() {
  const filtro = document.getElementById('textos-filtro');
  const botonGuardar = document.getElementById('btn-save-textos');
  if (!botonGuardar) return;

  renderTextosEditor('');

  const site = getSite();
  document.getElementById('site-portrait').value = site.portrait || '';
  document.getElementById('site-cv').value       = site.cvUrl || '';
  initSubidaRetrato();

  if (filtro) {
    let t;
    filtro.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => renderTextosEditor(filtro.value), 180);
    });
  }

  botonGuardar.addEventListener('click', () => {
    const datos = textosActuales();
    datos.en = datos.en || {};
    document.querySelectorAll('.texto-input').forEach(inp => {
      datos[inp.dataset.idioma][inp.dataset.clave] = inp.value;
    });
    guardar(saveSection('i18n', datos));

    guardar(saveSection('site', Object.assign({}, getSite(), {
      portrait: document.getElementById('site-portrait').value.trim(),
      cvUrl:    document.getElementById('site-cv').value.trim(),
    })));

    showToast('✓ Textos y archivos guardados');
  });
}


/* El retrato se sube igual que las imagenes de proyecto, pero va a
   parar a un solo campo en vez de a una lista. */
function initSubidaRetrato() {
  const boton  = document.getElementById('btn-subir-retrato');
  const input  = document.getElementById('site-portrait-file');
  const campo  = document.getElementById('site-portrait');
  const estado = document.getElementById('retrato-estado');
  if (!boton || boton.dataset.listo) return;
  boton.dataset.listo = '1';

  boton.addEventListener('click', () => {
    input.click();
  });

  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    boton.disabled = true;
    estado.className = 'hint';
    try {
      campo.value = await subirImagenRemota(file, msg => { estado.textContent = msg; });
      estado.className = 'hint ok';
      estado.textContent = 'Subida. Pulsa "Guardar textos" para aplicarla.';
    } catch (err) {
      estado.className = 'hint error';
      estado.textContent = err.message;
    }
    boton.disabled = false;
    input.value = '';
  });
}

/* ══════════════════════════════════════════════════════════════
   AJUSTES
══════════════════════════════════════════════════════════════ */
function initAjustes() {
  const ver = document.getElementById('btn-ver-sitio');
  if (ver) ver.addEventListener('click', () => window.open('/', '_blank', 'noopener'));
}

/* ══════════════════════════════════════════════════════════════
   SUBIDA DE IMÁGENES
══════════════════════════════════════════════════════════════ */
function initSubidaImagenes() {
  const boton = document.getElementById('btn-subir-imagen');
  const input = document.getElementById('pf-file');
  const estado = document.getElementById('subida-estado');
  const lista = document.getElementById('pf-images');
  if (!boton) return;

  boton.addEventListener('click', () => {
input.click();
  });

  input.addEventListener('change', async () => {
    const archivos = [...input.files];
    if (!archivos.length) return;

    boton.disabled = true;
    const rutas = [];
    const fallos = [];

    for (let i = 0; i < archivos.length; i++) {
      estado.className = 'hint';
      estado.textContent = `(${i + 1}/${archivos.length}) ` + archivos[i].name;
      try {
        const ruta = await subirImagenRemota(archivos[i], msg => { estado.textContent = `(${i + 1}/${archivos.length}) ` + msg; });
        rutas.push(ruta);
      } catch (err) {
        fallos.push(archivos[i].name + ': ' + err.message);
      }
    }

    if (rutas.length) {
      const previas = lista.value.split('\n').map(s => s.trim()).filter(Boolean);
      lista.value = previas.concat(rutas).join('\n');
      previewImages();
    }

    estado.className = fallos.length ? 'hint error' : 'hint ok';
    estado.textContent = (rutas.length ? rutas.length + ' imagen(es) subidas. ' : '') +
                         (fallos.length ? 'Fallaron: ' + fallos.join(' | ') : '');
    boton.disabled = false;
    input.value = '';
  });
}

/* ── Boot ────────────────────────────────────────────────────── */
initLogin();
