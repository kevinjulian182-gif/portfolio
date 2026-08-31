# Portafolio Kevin Navarrete — Contexto del proyecto

## Qué es este proyecto
Portafolio profesional de Kevin Julian Navarrete Rodríguez, Diseñador Gráfico & UX/UI con +5 años de experiencia. Bogotá, Colombia.

## Estructura de archivos
```
portfolio/
├── index.html       ← Portafolio público
├── admin.html       ← Panel de administración (login requerido)
├── css/
│   ├── styles.css   ← Estilos del portafolio (dark/light, editorial luxury)
│   └── admin.css    ← Estilos del panel admin
├── js/
│   ├── data.js      ← Datos compartidos + helpers localStorage (FUENTE DE VERDAD)
│   ├── main.js      ← Lógica del portafolio (lee de localStorage vía data.js)
│   └── admin.js     ← Lógica del panel admin (escribe en localStorage)
└── README.md
```

## Arquitectura de datos
- `js/data.js` contiene los arrays DEFAULT (PROJECTS, SKILLS, TOOLS, EXPERIENCE, EDUCATION, CERTIFICATIONS) y los helpers `getProjects()`, `saveSection()`, etc.
- El portafolio (`main.js`) llama a `getProjects()` que lee `localStorage` primero, defaults después.
- El admin (`admin.js`) escribe con `saveSection('projects', data)` → `localStorage.setItem('kn_projects', ...)`
- Las claves de localStorage son: `kn_projects`, `kn_skills`, `kn_tools`, `kn_experience`, `kn_education`, `kn_certs`

## Credenciales del admin
> El panel (`admin.html`, `js/admin.js`, `css/admin.css`) está en `.gitignore`: la
> autenticación es del lado del cliente, así que publicarlo expondría la clave a
> cualquier visitante. Vive solo en local.

- URL: `/admin.html`
- Usuario: `kevin`
- Contraseña: `studio2025`
- Definidas en líneas 7-8 de `js/admin.js`

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
- 12 proyectos reales de Behance con galería de 10 imágenes c/u
- Flechas de navegación en galería (teclado ← → también funciona)
- Filtros por categoría: Branding / UX/UI
- Modal de proyecto con botón "Ver en Behance" y sección de prototipo Figma
- Toggle dark/light mode
- Toggle ES/EN (bilingüe completo)
- Timeline de 8 empleos con descripciones completas del CV real
- Sección de certificaciones (7 certs)
- Formulario de contacto (simulado, listo para Formspree)
- Botón flotante de WhatsApp (+57 313 808 9302)
- Admin panel: CRUD proyectos, habilidades, herramientas, experiencia, formación, certs
- Login con sesión en sessionStorage

## Contacto real del cliente
- Email: kevinjulian182@gmail.com
- WhatsApp: +57 313 808 9302
- Behance: https://www.behance.net/kevinnavarrete1
- LinkedIn: https://www.linkedin.com/in/kevin-navarrrete/
- GitHub: kevinjulian182-gif

## Pendientes / próximas mejoras sugeridas
- **Reemplazar el retrato**: había una foto de banco de imágenes de otra persona; ahora hay un bloque vacío esperando `img/kevin.jpg`
- Agregar URLs reales de prototipos Figma en cada proyecto UX/UI
- Conectar formulario de contacto a Formspree
- Activar descarga de CV PDF real
- **Reemplazar las imágenes de galería de Unsplash**: en la mayoría de proyectos solo la portada es obra real; las otras 9 son fotos de stock
- Considerar convertir 2-3 proyectos en casos de estudio (reto, rol, proceso, resultado): es lo que separa un portafolio bueno de uno contratable
