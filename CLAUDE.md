# Portafolio Kevin Navarrete — Contexto del proyecto

## Qué es este proyecto
Portafolio profesional de Kevin Julian Navarrete Rodríguez, Diseñador Gráfico & UX/UI con +5 años de experiencia. Bogotá, Colombia.

## Estructura de archivos
```
portfolio/
├── index.html       ← Portafolio público
├── admin.html       ← Panel de administración (se publica; ver seguridad)
├── css/
│   ├── styles.css   ← Estilos del portafolio (editorial impresa, claro/oscuro)
│   └── admin.css    ← Estilos del panel
├── js/
│   ├── data.js      ← FUENTE DE VERDAD: datos + i18n + SITE + getters
│   ├── main.js      ← Lógica del portafolio
│   ├── admin.js     ← Lógica del panel
│   └── github.js    ← Publicación vía API de GitHub
├── img/             ← Imágenes subidas desde el panel
└── README.md
```

## Arquitectura de datos
- `js/data.js` contiene los DEFAULTS (`PROJECTS`, `SKILLS`, `TOOLS`, `EXPERIENCE`,
  `EDUCATION`, `CERTIFICATIONS`, `i18n`, `SITE`) y los getters
  `getProjects()`, `getI18n()`, `getSite()`, etc.
- Cada getter lee primero `localStorage` y cae a los defaults del archivo.
  Claves: `kn_projects`, `kn_skills`, `kn_tools`, `kn_experience`, `kn_education`,
  `kn_certs`, `kn_i18n`, `kn_site`.
- El panel escribe en `localStorage` (borrador local) y al **Publicar** regenera
  `js/data.js` entero y lo sube al repositorio. Tras publicar borra las claves
  locales, para que el panel vuelva a leer lo publicado y no arrastre divergencias.

### El ciclo completo
```
editar en el panel  →  localStorage (solo este navegador)
       ↓ Publicar
regenera js/data.js  →  PUT a la API de GitHub  →  commit en main
       ↓
GitHub Pages reconstruye (~1 min)  →  el cambio es visible para todos
```

### Cómo se regenera data.js
`buildDataJsFromSource()` descarga el `js/data.js` actual y **sustituye solo los
bloques `const`** que el panel gestiona, dejando intactos los comentarios y los
getters. `EXPORT_SECTIONS` lista cada bloque con su terminador, porque los arrays
cierran con `];` y `i18n`/`SITE` cierran con `};`. Si añades un bloque nuevo a
`data.js` y quieres que el panel lo publique, hay que registrarlo ahí.

Si la descarga falla (por ejemplo abriendo el panel con `file://`), cae a
`buildDataJsFromMemory()`, que reconstruye el archivo entero: sigue siendo válido
pero pierde los comentarios.

## Seguridad del panel (léelo antes de cambiar nada)

El panel **se publica** junto al sitio, en `/admin.html`.

- `ADMIN_USER` / `ADMIN_PASS` (`js/admin.js`) **no son seguridad**: están en un
  archivo público que cualquiera puede leer. Son un timbre, no una cerradura.
  Nunca pongas ahí una contraseña que uses en otro sitio.
- Lo que de verdad protege el portafolio es el **token de GitHub**. Sin un token
  con permiso de escritura, entrar al panel no permite modificar nada: la API
  rechaza la petición. El sitio es estático, no hay backend que engañar.
- El token lo introduce el usuario en la pestaña **Conexión** y se guarda en
  `localStorage` de ese navegador. Solo viaja a `api.github.com`.
- Se recomienda un token **fine-grained** limitado a este repositorio y con
  `Contents: Read and write` como único permiso: si se filtrara, no daría acceso
  a nada más de la cuenta.
- `admin.html` lleva `<meta name="robots" content="noindex, nofollow">`.

Credenciales actuales del timbre: `kevin` / `panel-kn`.

## Diseño / estética
- Dirección: **editorial impresa**. Papel y tinta, filetes (1px) en vez de cajas y sombras,
  retícula uniforme, un solo acento. La interfaz se aparta para que el color lo pongan
  las piezas del portafolio.
- Tipografía: **Newsreader** (display serif, con itálica real) + **Archivo** (UI/texto)
  + mono del sistema para metadatos (índices, años, etiquetas).
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

### Ojo al tocar el CSS
El JS conmuta la clase **`open`** (no `active`) en `#modal-overlay` y en `#mobile-menu`.
Si renombras esas clases en el CSS, el modal y el menú móvil dejan de aparecer sin
lanzar ningún error en consola.

## Funcionalidades implementadas
**Portafolio**
- 12 proyectos con galería y ficha detallada
- Casos de estudio (reto / proceso / resultado) por proyecto, bilingües y opcionales
- Filtros por categoría, galería con teclado, modo claro/oscuro, ES/EN
- Trayectoria, certificaciones, formulario de contacto, WhatsApp

**Panel (`/admin.html`)**
- Proyectos: crear, editar, eliminar, reordenar, con caso de estudio
- Subida de imágenes desde el equipo directamente a `img/` del repositorio
- Habilidades, herramientas, experiencia, formación y certificaciones
- **Textos del sitio**: edita el objeto `i18n` completo, ES/EN en paralelo, con buscador
- **Retrato y CV**: rutas editables (`SITE`), con subida de la foto
- **Conexión**: configuración y prueba del token
- **Publicar**: escribe `js/data.js` en el repositorio y dispara la reconstrucción
- Copia manual de `data.js` (copiar/descargar) como respaldo

## Contacto real del cliente
- Email: kevinjulian182@gmail.com
- WhatsApp: +57 313 808 9302
- Behance: https://www.behance.net/kevinnavarrete1
- LinkedIn: https://www.linkedin.com/in/kevin-navarrrete/
- GitHub: kevinjulian182-gif

## Pendientes / próximas mejoras sugeridas
- **Subir el retrato** desde el panel (Textos del sitio → Retrato y CV). Hasta entonces se ve el marco con la nota.
- Agregar URLs reales de prototipos Figma en cada proyecto UX/UI
- Conectar formulario de contacto a Formspree
- **Subir el CV en PDF** y poner su ruta en Textos del sitio → Retrato y CV
- **Reemplazar las imágenes de galería de Unsplash**: en la mayoría de proyectos solo la portada es obra real; las otras 9 son fotos de stock
- **Revisar los 3 casos de estudio en borrador** (Pineda Martínez, Colegio Virtual, Logyca): son reconstrucciones a partir de las descripciones, no relatos verificados. Salen marcados como borrador en la ficha hasta que quites la marca.
- Escribir casos de estudio para el resto de proyectos
