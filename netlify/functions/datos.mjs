/* ============================================================
   datos.mjs — Guardado del portafolio

   Sustituye al flujo con token de GitHub. Aquí el secreto vive en
   el servidor (variable de entorno PANEL_PASS), no en el navegador:
   el panel solo manda la contraseña que Kevin escribe al entrar.

   GET   → devuelve lo guardado (o {} si aún no hay nada)
   POST  → guarda una sección; exige la contraseña
============================================================ */

import { getStore } from '@netlify/blobs';

const CLAVE_BLOB = 'contenido';

/* Secciones que el panel puede escribir. Lista blanca: así una
   petición manipulada no puede meter claves arbitrarias. */
const SECCIONES = new Set([
  'projects', 'skills', 'tools', 'experience',
  'education', 'certs', 'i18n', 'site',
]);

const cabeceras = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(cuerpo, estado = 200) {
  return new Response(JSON.stringify(cuerpo), { status: estado, headers: cabeceras });
}

function almacen() {
  return getStore({ name: 'portafolio', consistency: 'strong' });
}

async function leer() {
  try {
    return (await almacen().get(CLAVE_BLOB, { type: 'json' })) || {};
  } catch (e) {
    return {};
  }
}

export default async (req) => {
  if (req.method === 'GET') {
    return json(await leer());
  }

  if (req.method !== 'POST') {
    return json({ error: 'Método no permitido' }, 405);
  }

  let cuerpo;
  try {
    cuerpo = await req.json();
  } catch (e) {
    return json({ error: 'Cuerpo inválido' }, 400);
  }

  const esperada = process.env.PANEL_PASS;
  if (!esperada) {
    return json({ error: 'El sitio no tiene contraseña configurada (PANEL_PASS).' }, 500);
  }
  if (cuerpo.clave !== esperada) {
    return json({ error: 'Contraseña incorrecta.' }, 401);
  }

  // Comprobar sesión sin escribir nada.
  if (cuerpo.accion === 'comprobar') {
    return json({ ok: true });
  }

  if (cuerpo.accion === 'borrar-todo') {
    await almacen().setJSON(CLAVE_BLOB, {});
    return json({ ok: true, secciones: [] });
  }

  const { seccion, valor } = cuerpo;
  if (!SECCIONES.has(seccion)) {
    return json({ error: 'Sección desconocida: ' + seccion }, 400);
  }
  if (valor === undefined) {
    return json({ error: 'Falta el valor' }, 400);
  }

  const datos = await leer();
  datos[seccion] = valor;
  await almacen().setJSON(CLAVE_BLOB, datos);

  return json({ ok: true, seccion, secciones: Object.keys(datos) });
};

export const config = { path: '/api/datos' };
