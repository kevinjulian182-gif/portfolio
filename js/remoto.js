/* ============================================================
   remoto.js — Hablar con el servidor

   El portafolio guarda en Netlify (funciones + Blobs). Ya no hay
   tokens que generar ni pasos de publicación: al pulsar Guardar,
   el cambio queda en el servidor y todo el mundo lo ve.

   La contraseña vive como variable de entorno en Netlify, no en el
   código. El panel solo manda la que Kevin escribe al entrar, y el
   servidor decide.
============================================================ */

const API_DATOS  = '/api/datos';
const API_IMAGEN = '/api/imagen';

/* La clave se guarda solo mientras dura la pestaña. */
const CLAVE_SESION = 'kn_clave';

function claveGuardada() {
  try { return sessionStorage.getItem(CLAVE_SESION) || ''; } catch (e) { return ''; }
}

function guardarClave(clave) {
  try { sessionStorage.setItem(CLAVE_SESION, clave); } catch (e) {}
}

function olvidarClave() {
  try { sessionStorage.removeItem(CLAVE_SESION); } catch (e) {}
}

async function respuestaOError(res) {
  let cuerpo = {};
  try { cuerpo = await res.json(); } catch (e) {}
  if (!res.ok) throw new Error(cuerpo.error || ('Error del servidor (' + res.status + ')'));
  return cuerpo;
}

/* ── Lectura ──────────────────────────────────────────────────
   La usa tanto el portafolio como el panel. Si falla (sin red, o
   abierto como archivo local), se devuelve vacío y la página cae a
   los valores por defecto de data.js: nunca se queda en blanco. */
async function cargarRemoto() {
  try {
    const res = await fetch(API_DATOS, { cache: 'no-store' });
    if (!res.ok) return {};
    return await res.json();
  } catch (e) {
    return {};
  }
}

/* ── Sesión ─────────────────────────────────────────────────── */
async function comprobarClave(clave) {
  const res = await fetch(API_DATOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accion: 'comprobar', clave }),
  });
  await respuestaOError(res);
  guardarClave(clave);
  return true;
}

/* ── Escritura ──────────────────────────────────────────────── */
async function guardarRemoto(seccion, valor) {
  const clave = claveGuardada();
  if (!clave) throw new Error('Sesión caducada. Vuelve a entrar.');

  const res = await fetch(API_DATOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clave, seccion, valor }),
  });
  return respuestaOError(res);
}

/* ── Imágenes ───────────────────────────────────────────────── */
async function subirImagenRemota(file, onProgreso) {
  const clave = claveGuardada();
  if (!clave) throw new Error('Sesión caducada. Vuelve a entrar.');

  if (onProgreso) onProgreso('Subiendo ' + file.name + '…');

  const form = new FormData();
  form.append('clave', clave);
  form.append('archivo', file, file.name);

  const res = await fetch(API_IMAGEN, { method: 'POST', body: form });
  const cuerpo = await respuestaOError(res);
  return cuerpo.url;
}
