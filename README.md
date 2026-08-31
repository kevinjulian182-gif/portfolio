# Kevin Navarrete — Portafolio Profesional

**Diseñador Gráfico & UX/UI** · Bogotá, Colombia

🌐 [Ver sitio en vivo](https://kevinjulian182-gif.github.io/portfolio)
📧 kevinjulian182@gmail.com
🎨 [Behance](https://www.behance.net/kevinnavarrete1) · [LinkedIn](https://www.linkedin.com/in/kevin-navarrrete/)

---

## Estructura del proyecto

```
portfolio/
├── index.html          ← Estructura HTML del sitio
├── css/
│   └── styles.css      ← Todos los estilos (variables, layout, componentes)
├── js/
│   ├── data.js         ← Datos (proyectos, skills, CV) + traducciones
│   └── main.js         ← Lógica del sitio (render, i18n, galería, tema)
└── README.md
```

---

## Características

- ✅ Diseño editorial impresa — modo claro (por defecto) y oscuro
- ✅ Bilingüe ES/EN con toggle instantáneo
- ✅ 12 proyectos reales de Behance con galería de imágenes
- ✅ Flechas de navegación + miniaturas en cada proyecto
- ✅ Botón "Ver prototipo en Figma" en proyectos UX/UI
- ✅ Sección de certificaciones
- ✅ Timeline de experiencia y formación completo
- ✅ Formulario de contacto (listo para Formspree)
- ✅ Botón flotante de WhatsApp
- ✅ 100% responsive · mobile-first
- ✅ Sin frameworks · sin build process

---

## Cómo personalizar

### Agregar / editar proyectos
Edita el array `PROJECTS` en `js/data.js`:
```js
{
  id: 13,
  title: "Nombre del proyecto",
  category: "branding",          // branding | uxui
  thumb: "https://url-portada.jpg",
  images: ["url1.jpg", "url2.jpg", ...],  // hasta 10 imágenes
  figmaUrl: "https://figma.com/proto/...", // solo proyectos UX/UI
  // ...
}
```

### Cambiar foto de perfil
En `index.html`, busca `<img ... alt="Kevin Navarrete"` y reemplaza el `src`.

### Activar link de Figma
En `js/data.js`, en cada proyecto UX/UI, reemplaza el `figmaUrl` placeholder por tu URL real de Figma Share.

### Conectar formulario de contacto
Regístrate en [formspree.io](https://formspree.io), obtén tu endpoint y en `js/main.js` reemplaza el handler del formulario.

### Activar descarga de CV
En `js/main.js` busca `cv-download-btn` y reemplaza con:
```js
window.open('cv/CV_Kevin_Navarrete.pdf', '_blank');
```
Sube tu PDF a la carpeta `/cv/` del repositorio.

---

## Despliegue en GitHub Pages

1. Sube los archivos a un repositorio público en GitHub
2. Ve a **Settings → Pages → Branch: main → / (root) → Save**
3. Tu sitio estará en `https://kevinjulian182-gif.github.io/portfolio/`

## Despliegue en Netlify

Arrastra la carpeta completa a [netlify.com/drop](https://app.netlify.com/drop) — listo en 30 segundos.
