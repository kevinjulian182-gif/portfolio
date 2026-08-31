# Kevin Navarrete — Portafolio Profesional

**Diseñador Gráfico & UX/UI** · Bogotá, Colombia

🌐 [Ver sitio en vivo](https://kevinjulian182-gif.github.io/portfolio)
📧 kevinjulian182@gmail.com
🎨 [Behance](https://www.behance.net/kevinnavarrete1) · [LinkedIn](https://www.linkedin.com/in/kevin-navarrrete/)

---

## Estructura del proyecto

```
portfolio/
├── index.html          ← El portafolio
├── admin.html          ← Panel para editarlo
├── css/
│   ├── styles.css      ← Estilos del portafolio
│   └── admin.css       ← Estilos del panel
├── js/
│   ├── data.js         ← Datos: proyectos, textos, CV, ajustes
│   ├── main.js         ← Lógica del portafolio
│   ├── admin.js        ← Lógica del panel
│   └── github.js       ← Publicación vía API de GitHub
├── img/                ← Imágenes subidas desde el panel
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
- ✅ Casos de estudio por proyecto (reto / proceso / resultado)
- ✅ Panel de administración que publica solo
- ✅ Formulario de contacto (listo para Formspree)
- ✅ Botón flotante de WhatsApp
- ✅ 100% responsive · mobile-first
- ✅ Sin frameworks · sin build process

---

## Cómo editar el portafolio

Todo se edita desde el panel: **https://kevinjulian182-gif.github.io/portfolio/admin.html**

La primera vez hay que conectarlo con GitHub (una sola vez por navegador):

1. Crea un token *fine-grained* en
   [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)
2. **Repository access** → *Only select repositories* → `portfolio`
3. **Permissions → Repository permissions → Contents** → *Read and write*
4. Copia el token y pégalo en el panel, pestaña **Conexión** → *Probar conexión* → *Guardar*

A partir de ahí: editas, pulsas **Publicar**, y el sitio se actualiza solo en un minuto.

Se puede editar desde el móvil: el panel es responsive y el token se guarda por navegador.

> El usuario y la contraseña del panel no son seguridad — están en el código.
> Lo que protege el portafolio es el token: sin él no se puede guardar nada.

### Editar a mano (alternativa)
Todos los datos viven en `js/data.js`. Si prefieres tocarlo directamente, edita los
arrays `PROJECTS`, `SKILLS`, `EXPERIENCE`… o los objetos `i18n` y `SITE`, y haz push.

## Despliegue en GitHub Pages

1. Sube los archivos a un repositorio público en GitHub
2. Ve a **Settings → Pages → Branch: main → / (root) → Save**
3. Tu sitio estará en `https://kevinjulian182-gif.github.io/portfolio/`

## Despliegue en Netlify

Arrastra la carpeta completa a [netlify.com/drop](https://app.netlify.com/drop) — listo en 30 segundos.
