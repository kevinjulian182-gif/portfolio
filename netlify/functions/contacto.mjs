/* ============================================================
   contacto.mjs — Mensajes del formulario

   Por qué existe, en vez de dejar que el navegador publique
   directo contra Netlify Forms: los envíos hechos con fetch desde
   el navegador se perdían por el camino (el mismo POST lanzado
   desde el servidor sí entraba). No se puede dejar un formulario
   que a veces entrega: la pérdida es justo una oferta de trabajo.

   Así que el mensaje llega aquí primero:
     1. se guarda en Blobs  → el panel lo muestra siempre
     2. se reenvía a Netlify Forms desde el servidor → correo a Kevin

   El paso 1 es el que garantiza que nada se pierda. Si el 2 falla,
   el mensaje ya está a salvo y se responde éxito igualmente.
============================================================ */

import { getStore } from '@netlify/blobs';

const CLAVE = 'mensajes';
const MAX_GUARDADOS = 500;

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function almacen() {
  return getStore({ name: 'contacto', consistency: 'strong' });
}

async function leer() {
  try {
    return (await almacen().get(CLAVE, { type: 'json' })) || [];
  } catch (e) {
    return [];
  }
}

const recorta = (s, n) => String(s == null ? '' : s).trim().slice(0, n);

/* Reenvía a Netlify Forms para que llegue el correo. Se hace desde
   el servidor a propósito: así es como sí entra. */
async function avisarPorCorreo(origen, m) {
  const cuerpo = new URLSearchParams({
    'form-name': 'contacto',
    name: m.nombre,
    email: m.correo,
    subject: m.motivo,
    message: m.mensaje,
  });
  const res = await fetch(origen + '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: cuerpo.toString(),
  });
  if (!res.ok) throw new Error('Netlify Forms respondió ' + res.status);
}

export default async (req) => {
  const url = new URL(req.url);

  /* ── Leer los mensajes (solo con la contraseña del panel) ── */
  if (req.method === 'GET') {
    const clave = url.searchParams.get('clave');
    if (!process.env.PANEL_PASS) return json({ error: 'El sitio no tiene contraseña configurada.' }, 500);
    if (clave !== process.env.PANEL_PASS) return json({ error: 'Contraseña incorrecta.' }, 401);
    return json({ mensajes: await leer() });
  }

  /* ── Borrar uno (solo con la contraseña del panel) ── */
  if (req.method === 'DELETE') {
    const clave = url.searchParams.get('clave');
    if (clave !== process.env.PANEL_PASS) return json({ error: 'Contraseña incorrecta.' }, 401);
    const id = url.searchParams.get('id');
    const lista = await leer();
    const quedan = lista.filter(m => m.id !== id);
    await almacen().setJSON(CLAVE, quedan);
    return json({ ok: true, total: quedan.length });
  }

  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  let datos;
  try {
    datos = await req.json();
  } catch (e) {
    return json({ error: 'Cuerpo inválido' }, 400);
  }

  // Trampa para bots: si viene con contenido, se descarta en silencio
  // y se responde éxito, para no darle pistas al bot.
  if (recorta(datos.website, 50)) return json({ ok: true });

  const mensaje = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    fecha: new Date().toISOString(),
    nombre: recorta(datos.nombre, 120),
    correo: recorta(datos.correo, 160),
    motivo: recorta(datos.motivo, 40) || 'otro',
    mensaje: recorta(datos.mensaje, 5000),
    leido: false,
  };

  if (!mensaje.nombre || !mensaje.mensaje) return json({ error: 'Faltan campos' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mensaje.correo)) return json({ error: 'Correo inválido' }, 400);

  // 1. Guardar: esto es lo que no puede fallar.
  const lista = await leer();
  lista.unshift(mensaje);
  await almacen().setJSON(CLAVE, lista.slice(0, MAX_GUARDADOS));

  // 2. Avisar por correo. Si falla, el mensaje ya está guardado.
  let correoEnviado = true;
  try {
    await avisarPorCorreo(url.origin, mensaje);
  } catch (e) {
    correoEnviado = false;
  }

  return json({ ok: true, correoEnviado });
};

export const config = { path: '/api/contacto' };
