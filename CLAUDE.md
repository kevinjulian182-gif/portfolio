# Portafolio Kevin Navarrete — Contexto del proyecto

## Qué es este proyecto
Portafolio profesional de Kevin Julian Navarrete Rodríguez, Diseñador Gráfico & UX/UI con +5 años de experiencia. Bogotá, Colombia.

## Dónde vive
- **Sitio y panel:** https://kevinnavarrete.netlify.app (Netlify, proyecto `kevinnavarrete`)
- **Código:** https://github.com/kevinjulian182-gif/portfolio
- **Trabajo local:** `~/Downloads/portfolio-v2`
- **Desplegar = push a `main`.** Netlify está vinculado al repo desde el 2026-09-14 y publica cada push, también desde una sesión en la nube. `netlify deploy --prod --no-build` desde el PC sigue funcionando para urgencias.
- `PANEL_PASS` vive en Netlify y los datos del panel en Netlify Blobs (almacén `portafolio`, de todo el sitio): un despliegue nuevo no los borra.
- `netlify.toml` devuelve 404 para `CLAUDE.md`, `README.md`, `package*` y `netlify/*`, porque se publica la raíz. Si se agrega otro archivo interno en la raíz, sumarlo ahí.

## Estructura de archivos
```
portfolio/
├── index.html              ← El portafolio
├── cv.html                 ← Hoja de vida, se pinta con los mismos datos
├── admin.html              ← Panel de administración
├── css/{styles,admin,cv}.css
├── js/
│   ├── data.js             ← Valores por defecto + getters
│   ├── remoto.js           ← Cliente del API (cargar, guardar, subir)
│   ├── main.js             ← Lógica del portafolio
│   └── admin.js            ← Lógica del panel
├── netlify/functions/
│   ├── datos.mjs           ← GET/POST del contenido  → /api/datos
│   ├── imagen.mjs          ← Subir y servir imágenes → /api/imagen
│   └── contacto.mjs        ← Mensajes del formulario → /api/contacto
├── netlify.toml
└── package.json            ← Solo @netlify/blobs, para las funciones
```

## Arquitectura de datos

**El servidor manda.** `js/data.js` solo tiene los valores por defecto; lo guardado
vive en Netlify Blobs y tiene prioridad.

```
El visitante abre el sitio
  → main.js llama a cargarRemoto()  →  GET /api/datos
  → setRemoto(datos)                →  los getters ya devuelven lo guardado
  → pintarTodo()                    →  se pinta una sola vez, sin parpadeo

Kevin pulsa Guardar en el panel
  → saveSection(clave, valor)       →  POST /api/datos  (con la contraseña)
  → queda escrito en Blobs          →  cualquiera que recargue lo ve
```

No hay borrador, ni localStorage, ni paso de publicación. Guardar es publicar.

Si `/api/datos` falla (sin red, o el archivo abierto con `file://`), `cargarRemoto()`
devuelve `{}` y la página se pinta con los valores por defecto. Nunca se queda en blanco.

### Secciones que el panel puede escribir
`projects`, `skills`, `tools`, `experience`, `education`, `certs`, `i18n`, `site`.
La lista está también en `netlify/functions/datos.mjs` como lista blanca: si añades una
sección nueva hay que registrarla ahí, o el servidor la rechaza. Es a propósito — evita
que una petición manipulada escriba claves arbitrarias.

## Formulario de contacto — por qué no publica directo a Netlify Forms

Al verificar la entrega en producción apareció lo peor: la interfaz decía «mensaje
enviado» y Netlify registraba **cero**. El mismo POST lanzado desde el servidor sí
entraba, así que la tubería funcionaba y lo que se perdía era el envío hecho con
`fetch` desde el navegador. No se dejó un formulario que entrega a veces.

Flujo actual:
```
navegador → POST /api/contacto (JSON)
  1. se guarda en Blobs (almacén `contacto`)   ← esto es lo que NO puede fallar
  2. la función reenvía a Netlify Forms desde el servidor → correo a Kevin
  Si el paso 2 falla, el mensaje ya está a salvo y la respuesta sigue siendo éxito.
```

- La bandeja vive en el panel, pestaña **Mensajes** (GET y DELETE con `PANEL_PASS`).
- `ignore_html_forms` del sitio estaba en `true`: hubo que ponerlo en `false` para que
  Netlify detectara el formulario.
- El aviso por correo es un hook `email` / `submission_created` hacia
  kevinjulian182@gmail.com, creado con `netlify api createHookBySiteId`.
- Netlify reescribe el `<form>` al registrarlo y le quita `data-netlify`: no hay que
  asustarse ni volver a añadirlo.

## Seguridad del panel

- La contraseña vive en la variable de entorno **`PANEL_PASS`** de Netlify, no en el
  código. Se cambia con `netlify env:set PANEL_PASS "nueva"` y un redespliegue, sin
  tocar un solo archivo del sitio.
- El panel manda esa contraseña en cada escritura; el servidor la valida. Leer el código
  fuente no sirve de nada: ya no hay credenciales dentro.
- La contraseña se guarda en `sessionStorage`, así que se olvida al cerrar la pestaña.
- `admin.html` lleva `noindex` por meta y por cabecera (`netlify.toml`).

## Diseño / estética
- Dirección: **editorial impresa**. Papel y tinta, filetes (1px) en vez de cajas y sombras,
  retícula uniforme, un solo acento. La interfaz se aparta para que el color lo pongan
  las piezas del portafolio.
- Tipografía: **Fraunces** (display, con los ejes WONK y SOFT activados) + **Instrument Sans**
  (UI/texto) + mono del sistema para metadatos (índices, años, etiquetas). Sustituyeron a
  Newsreader + Archivo, que eran correctas pero neutras.
- Paleta clara (por defecto): papel `#F4F1EA`, tinta `#1B1A16`, filete `#D6D0C2`,
  acento vermellón `#B23A1E`.
- Paleta oscura: fondo `#121210`, texto `#E9E5DA`, filete `#302E28`, acento `#E0714E`.
- Todas las combinaciones de texto verificadas a >= 4.5:1 (WCAG AA).
- `--radius: 0` — sin esquinas redondeadas, es lenguaje de impresión.
- Variables CSS en `:root` y `[data-theme="dark"]` en `css/styles.css`.

### Reglas que sostienen el diseño
- **Retícula de proyectos uniforme.** Tamaños iguales leen como versatilidad; tamaños
  variables (el bento anterior con `col-8`/`col-4`) leen como desorden. El campo `col`
  sigue en los datos pero el render ya no lo usa.
- **Sin contadores de vanidad.** Se quitaron "5+ años / 8+ proyectos / 100% dedicación":
  una métrica que no significa nada resta credibilidad.
- **El héroe posiciona, no aspira.** Nombre, rol en una línea, disciplinas y ubicación,
  en vez de un eslogan del tipo "diseño que conecta".
- **Ojo con los ornamentos simétricos** (filete–etiqueta–filete) y las versalitas muy
  espaciadas: son el tic visual más reconocible de las plantillas generadas por IA.

### Decisiones orientadas a que lo contraten
Research: NN/g (204 hiring managers) y UXfolio 2026. Lo que mandó el diseño:
- **Trabajo real primero.** `PROJECTS` va ordenado con los encargos de cliente antes que
  los conceptos; el trabajo hipotético pesa menos para quien contrata.
- **Etiquetas honestas.** El proyecto de Yanbal figuraba con cliente «Yanbal» cuando en
  Behance se titula «Concepto Campaña…». Corregido a «Proyecto de concepto»: si un
  reclutador cruza las dos fuentes, no puede encontrar una contradicción.
- **El sello de «borrador» no se muestra al visitante.** A un reclutador le decía «esto
  está a medias». La marca sigue en los datos y el panel avisa de cuáles faltan.
- **La IA se demuestra, no se declara.** Prácticas concretas con herramientas nombradas y
  un bloque explícito de dónde no se usa; eso es lo que distingue según la investigación.

### Ojo al tocar el CSS
`styles.css` da a toda `<section>` un `padding-block` de 6rem. `cv.html` usa `<section>`
para sus apartados, así que `cv.css` lo pone a 0; si no, salen huecos enormes.

El JS conmuta la clase **`open`** (no `active`) en `#modal-overlay` y en `#mobile-menu`.
Si renombras esas clases en el CSS, el modal y el menú móvil dejan de aparecer sin
lanzar ningún error en consola.

## Funcionalidades implementadas
**Portafolio**
- 12 proyectos con galería (imágenes reales de Behance) y ficha detallada
- Casos de estudio (reto / proceso / resultado) por proyecto, bilingües y opcionales
- Filtros, galería con teclado, modo claro/oscuro, ES/EN
- Trayectoria, certificaciones, WhatsApp
- **Sección «Cómo trabajo con IA»**: prácticas concretas, herramientas y, sobre todo,
  dónde Kevin NO delega. Vive en `SITE.aiPractices` / `aiTools` / `aiLimit`, bilingüe.
- **Formulario de contacto real** (Netlify Forms): valida, envía de verdad y, si falla,
  ofrece el correo directo en vez de fingir que se envió
- **`/cv.html`**: hoja de vida generada desde `EXPERIENCE`, `EDUCATION`, `CERTIFICATIONS`
  y `TOOLS`, con hoja de impresión A4. El botón del sitio lleva ahí; si Kevin sube su
  propio PDF (`SITE.cvUrl`), ese tiene prioridad.
- Sistema de movimiento propio (CSS + IntersectionObserver), con reduced-motion

**Panel (`/admin.html`)**
- Proyectos: crear, editar, eliminar, reordenar, con caso de estudio
- Subida de imágenes desde el equipo, servidas desde `/api/imagen`
- Habilidades, herramientas, experiencia, formación y certificaciones
- Textos del sitio: el objeto `i18n` completo, ES/EN en paralelo, con buscador
- Retrato y CV editables (`SITE`)
- **Mensajes**: bandeja del formulario, con contador, ofertas de empleo destacadas y borrado
- Editor de la sección de IA (prácticas, herramientas y límite, ES/EN)
- Aviso de qué casos de estudio siguen marcados como borrador
- Copia de seguridad: vuelca todo a un `data.js` descargable

## Contacto real del cliente
- Email: kevinjulian182@gmail.com
- WhatsApp: +57 313 808 9302
- Behance: https://www.behance.net/kevinnavarrete1
- LinkedIn: https://www.linkedin.com/in/kevin-navarrrete/
- GitHub: kevinjulian182-gif

## Pendientes / próximas mejoras sugeridas
- Hay ~9 proyectos más en Behance que no están en el sitio (LeBron escritorio y móvil,
  My Dog Heal, Politécnico, Cariñositos, lata El Bosque, Kyrie Irving, jugo natural,
  INNOVA). Se dejaron fuera a propósito: la recomendación es mostrar 8–12 bien elegidos.
- **Subir el retrato** desde el panel (Textos del sitio → Retrato y CV). Hasta entonces se ve el marco con la nota.
- Agregar URLs reales de prototipos Figma en cada proyecto UX/UI
- ~~Reemplazar las imágenes de Unsplash~~: hecho. Las galerías son las 12 de Behance (59 imágenes reales), filtradas por el id de galería que va en el nombre de archivo del CDN, para que no se cuelen los proyectos «relacionados». Si hay que volver a descargarlas, hacerlo desde Bash: `curl` lanzado desde Python devolvía un stub de 3,7 KB.
- **Revisar los 3 casos de estudio en borrador** (Pineda Martínez, Colegio Virtual, Logyca): son reconstrucciones a partir de las descripciones, no relatos verificados. Salen marcados como borrador en la ficha hasta que quites la marca.
- Escribir casos de estudio para el resto de proyectos
