# Kevin Navarrete — Portafolio Profesional

**Diseñador Gráfico & UX/UI** · Bogotá, Colombia

🌐 [Ver sitio en vivo](https://kevinnavarrete.netlify.app)
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

Entra en **https://kevinnavarrete.netlify.app/admin.html**, escribe tu contraseña, edita
y pulsa **Guardar**. Ya está: el cambio queda publicado y cualquiera que recargue lo ve.

No hay tokens que generar, ni pasos de publicación, ni archivos que subir. Funciona igual
desde el móvil.

Puedes cambiar los proyectos y sus casos de estudio, subir imágenes desde el equipo,
editar todos los textos del sitio en español e inglés, y actualizar tu retrato y tu CV.

> La contraseña vive en el servidor (variable `PANEL_PASS` en Netlify), no en el código.
> Para cambiarla: `netlify env:set PANEL_PASS "la-nueva"` y volver a desplegar.

### Editar a mano (alternativa)
Los valores por defecto están en `js/data.js`. Lo que se guarda desde el panel tiene
prioridad sobre ese archivo.

## Despliegue

El sitio vive en Netlify, que además ejecuta las funciones del panel:

```bash
netlify deploy --prod --no-build
```

No hay proceso de build: es HTML, CSS y JS plano. Las funciones de `netlify/functions/`
se despliegan solas con el sitio.
