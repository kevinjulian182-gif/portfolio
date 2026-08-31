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
- URL: `/admin.html`
- Usuario: `kevin`
- Contraseña: `studio2025`
- Definidas en líneas 7-8 de `js/admin.js`

## Diseño / estética
- Estilo: editorial de lujo, inspirado en revistas europeas de diseño
- Tipografía: Cormorant Garamond (serif) + DM Sans (sans-serif)
- Paleta: negro profundo `#0D0D0B` + dorado champagne `#C9A96E` + blanco hueso
- Dark mode por defecto, toggle a light mode
- Variables CSS en `:root` y `[data-theme]` en `css/styles.css`

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
- Reemplazar foto de perfil placeholder por foto real de Kevin
- Agregar URLs reales de prototipos Figma en cada proyecto UX/UI
- Conectar formulario de contacto a Formspree
- Activar descarga de CV PDF real
- Subir imágenes reales de proyectos de Behance para reemplazar las de Unsplash
- Considerar agregar sección de testimonios
- Considerar animación de cursor personalizado
