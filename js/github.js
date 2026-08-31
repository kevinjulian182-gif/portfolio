/* ============================================================
   github.js — Publicación desde el panel

   El sitio es estático: no hay servidor que reciba los cambios.
   Este módulo escribe directamente en el repositorio con la API
   de GitHub, y Pages reconstruye solo en cosa de un minuto.

   SOBRE LA SEGURIDAD (léelo antes de tocar nada):
   El usuario y la contraseña del panel NO son seguridad — están
   en el código, que cualquiera puede leer. Lo único que de verdad
   protege el portafolio es el token: sin un token válido con
   permiso de escritura, nadie puede guardar nada, por mucho que
   entre al panel.

   El token se guarda en localStorage de ESTE navegador. No viaja
   a ningún sitio salvo a api.github.com. Si usas un equipo
   prestado, pulsa "Olvidar token" al terminar.
============================================================ */

const GH_CONFIG_KEY = 'kn_gh_config';

const GH_DEFAULTS = {
  owner:  'kevinjulian182-gif',
  repo:   'portfolio',
  branch: 'main',
  token:  '',
};

/* ── Configuración ─────────────────────────────────────────── */
function ghGetConfig() {
  try {
    const raw = localStorage.getItem(GH_CONFIG_KEY);
    return Object.assign({}, GH_DEFAULTS, raw ? JSON.parse(raw) : {});
  } catch (e) {
    return Object.assign({}, GH_DEFAULTS);
  }
}

function ghSaveConfig(cfg) {
  localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(Object.assign(ghGetConfig(), cfg)));
}

function ghForgetToken() {
  ghSaveConfig({ token: '' });
}

function ghIsConfigured() {
  const c = ghGetConfig();
  return Boolean(c.token && c.owner && c.repo);
}

/* ── Base64 que aguanta acentos y emojis ───────────────────── */
/* btoa() sólo admite latin-1: hay que pasar por UTF-8 primero,
   o "Diseño" rompe la petición. */
function ghEncodeText(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  const CHUNK = 0x8000;                       // evita desbordar la pila
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

function ghEncodeBytes(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let bin = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

/* ── Llamadas a la API ─────────────────────────────────────── */
async function ghFetch(path, options) {
  const cfg = ghGetConfig();
  if (!cfg.token) throw new Error('No hay token configurado. Ve a la pestaña Conexión.');

  const res = await fetch('https://api.github.com' + path, Object.assign({
    headers: {
      'Authorization': 'Bearer ' + cfg.token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, options || {}));

  if (res.status === 401) throw new Error('Token inválido o caducado (401).');
  if (res.status === 403) {
    const rest = res.headers.get('x-ratelimit-remaining');
    throw new Error(rest === '0'
      ? 'Límite de peticiones de GitHub alcanzado. Espera unos minutos.'
      : 'El token no tiene permiso de escritura sobre este repositorio (403).');
  }
  if (res.status === 404) throw new Error('No encontrado (404): revisa usuario, repositorio y rama.');
  if (res.status === 409) throw new Error('Conflicto (409): el archivo cambió en el repositorio. Recarga el panel y vuelve a intentarlo.');

  if (!res.ok) {
    let detalle = '';
    try { detalle = (await res.json()).message || ''; } catch (e) {}
    throw new Error('Error de GitHub (' + res.status + ') ' + detalle);
  }
  return res.status === 204 ? null : res.json();
}

/* Comprueba token y acceso de escritura sin modificar nada. */
async function ghTestConnection() {
  const cfg = ghGetConfig();
  const repo = await ghFetch('/repos/' + cfg.owner + '/' + cfg.repo);
  if (!repo.permissions || !repo.permissions.push) {
    throw new Error('El token llega al repositorio pero no puede escribir en él. Revisa que tenga permiso "Contents: Read and write".');
  }
  return { nombre: repo.full_name, privado: repo.private, rama: cfg.branch };
}

/* Devuelve el sha del archivo, o null si aún no existe. */
async function ghGetSha(ruta) {
  const cfg = ghGetConfig();
  try {
    const data = await ghFetch('/repos/' + cfg.owner + '/' + cfg.repo +
                               '/contents/' + ruta + '?ref=' + encodeURIComponent(cfg.branch));
    return data.sha;
  } catch (e) {
    if (/404/.test(e.message)) return null;   // archivo nuevo
    throw e;
  }
}

/* Crea o actualiza un archivo. contenidoB64 ya viene codificado. */
async function ghPutFile(ruta, contenidoB64, mensaje) {
  const cfg = ghGetConfig();
  const sha = await ghGetSha(ruta);
  const body = {
    message: mensaje,
    content: contenidoB64,
    branch:  cfg.branch,
  };
  if (sha) body.sha = sha;                    // sin sha, GitHub rechaza sobrescribir

  const res = await ghFetch('/repos/' + cfg.owner + '/' + cfg.repo + '/contents/' + ruta, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return { sha: res.content.sha, commit: res.commit.sha.slice(0, 7) };
}

/* ── Imágenes ──────────────────────────────────────────────── */
const GH_TIPOS_IMAGEN = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const GH_MAX_IMAGEN   = 8 * 1024 * 1024;      // la API rechaza archivos grandes

/* Nombre de archivo seguro: sin acentos, espacios ni mayúsculas. */
function ghNombreSeguro(nombre) {
  const punto = nombre.lastIndexOf('.');
  const base  = (punto > 0 ? nombre.slice(0, punto) : nombre)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'imagen';
  const ext = (punto > 0 ? nombre.slice(punto + 1) : 'jpg')
    .toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  return base + '.' + ext;
}

/* Sube una imagen a img/ y devuelve la ruta relativa para usarla
   en el portafolio. Relativa y no absoluta: así el sitio sigue
   funcionando aunque cambie el dominio. */
async function ghSubirImagen(file, onProgreso) {
  if (!GH_TIPOS_IMAGEN.includes(file.type)) {
    throw new Error('Formato no admitido (' + (file.type || 'desconocido') + '). Usa JPG, PNG, WebP, GIF o SVG.');
  }
  if (file.size > GH_MAX_IMAGEN) {
    throw new Error('La imagen pesa ' + (file.size / 1048576).toFixed(1) + ' MB. El máximo es 8 MB.');
  }

  if (onProgreso) onProgreso('Leyendo ' + file.name + '…');
  const buffer = await file.arrayBuffer();
  const b64    = ghEncodeBytes(buffer);

  // Si ya existe una imagen con ese nombre, no la pisamos.
  let ruta = 'img/' + ghNombreSeguro(file.name);
  if (await ghGetSha(ruta)) {
    const punto = ruta.lastIndexOf('.');
    ruta = ruta.slice(0, punto) + '-' + Date.now().toString(36) + ruta.slice(punto);
  }

  if (onProgreso) onProgreso('Subiendo ' + ruta + '…');
  await ghPutFile(ruta, b64, 'content: sube ' + ruta);
  return ruta;
}

/* ── Publicar los datos ────────────────────────────────────── */
async function ghPublicarDatos(textoDataJs, mensaje) {
  return ghPutFile('js/data.js', ghEncodeText(textoDataJs),
                   mensaje || 'content: actualiza el portafolio desde el panel');
}
