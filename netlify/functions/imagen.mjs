/* ============================================================
   imagen.mjs — Imágenes subidas desde el panel

   POST  → guarda una imagen (exige contraseña) y devuelve su ruta
   GET   → sirve la imagen por su id, para que el portafolio la use
           como cualquier otra URL
============================================================ */

import { getStore } from '@netlify/blobs';

const TIPOS = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
  'image/gif':  'gif',
  'image/svg+xml': 'svg',
};

const MAX = 8 * 1024 * 1024;

function almacen() {
  return getStore({ name: 'imagenes', consistency: 'strong' });
}

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/* Nombre seguro: sin acentos, espacios ni mayúsculas. */
function nombreSeguro(nombre) {
  const punto = nombre.lastIndexOf('.');
  const base = (punto > 0 ? nombre.slice(0, punto) : nombre)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 48) || 'imagen';
  return base;
}

export default async (req) => {
  const url = new URL(req.url);

  /* ── Servir ── */
  if (req.method === 'GET') {
    const id = url.searchParams.get('id');
    if (!id) return json({ error: 'Falta el id' }, 400);

    const res = await almacen().getWithMetadata(id, { type: 'arrayBuffer' });
    if (!res) return json({ error: 'No encontrada' }, 404);

    return new Response(res.data, {
      headers: {
        'Content-Type': (res.metadata && res.metadata.tipo) || 'application/octet-stream',
        // El id cambia con cada subida, así que se puede cachear fuerte.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  /* ── Subir ── */
  let form;
  try {
    form = await req.formData();
  } catch (e) {
    return json({ error: 'Se esperaba multipart/form-data' }, 400);
  }

  const esperada = process.env.PANEL_PASS;
  if (!esperada) return json({ error: 'El sitio no tiene contraseña configurada.' }, 500);
  if (form.get('clave') !== esperada) return json({ error: 'Contraseña incorrecta.' }, 401);

  const archivo = form.get('archivo');
  if (!archivo || typeof archivo === 'string') return json({ error: 'Falta el archivo' }, 400);

  if (!TIPOS[archivo.type]) {
    return json({ error: 'Formato no admitido (' + (archivo.type || 'desconocido') + '). Usa JPG, PNG, WebP, GIF o SVG.' }, 400);
  }
  if (archivo.size > MAX) {
    return json({ error: 'La imagen pesa ' + (archivo.size / 1048576).toFixed(1) + ' MB. El máximo es 8 MB.' }, 400);
  }

  const id = nombreSeguro(archivo.name) + '-' + Date.now().toString(36) + '.' + TIPOS[archivo.type];
  const datos = await archivo.arrayBuffer();

  await almacen().set(id, datos, { metadata: { tipo: archivo.type, nombre: archivo.name } });

  return json({ ok: true, id, url: '/api/imagen?id=' + encodeURIComponent(id) });
};

export const config = { path: '/api/imagen' };
