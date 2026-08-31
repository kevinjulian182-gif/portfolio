/* ============================================================
   data.js — Fuente de datos compartida (portafolio + admin)
   Editar defaults aquí; el admin sobreescribe en localStorage.
============================================================ */

/* ============================================================
   DATA — Edita aquí para personalizar contenido
============================================================ */

/* PROJECTS
   Para agregar un proyecto:
   1. Copia un objeto de la lista
   2. Cambia todos los campos
   3. La categoría debe coincidir con los filtros: branding | uxui | editorial | motion
   4. col: "col-8", "col-4", "col-6", "col-12" controla el tamaño en grid
*/
// ── PROYECTOS reales de Behance ──────────────────────────────
// thumb: portada principal
// images: galería (hasta ~10). Usa URLs de Unsplash o tus propias imágenes.
// figmaUrl: (solo UX/UI) link embed de Figma. Pega aquí tu URL de prototipo.
// col: "col-8" | "col-4" | "col-6" | "col-12"
const PROJECTS = [
  {
    id: 1,
    title: "Manual de Marca Pineda Martínez Odontología",
    titleEn: "Brand Manual — Pineda Martínez Dentistry",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/e5c3be219375339.Y3JvcCw5MjAsNzIwLDE4MCww.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/862e42219375339.67b11a48865e6.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/e25fbf219375339.67b11a4886be9.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/a26cc6219375339.67b11a4885cee.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/bcdb7c219375339.67b11a48829d2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/3d7359219375339.67b11a48840c7.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/7ccfa2219375339.67b11a4883545.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/b91572219375339.67b11a48809bd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/872970219375339.67b11a488106a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/df6255219375339.67b11a48802d2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/0a18ce219375339.67b11a4882331.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/f61b06219375339.67b11a48851dd.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/575f1b219375339.67b11a488308d.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ad23db219375339.67b11a4884856.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/8e155e219375339.67b11a4881e29.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ac6b3c219375339.67b11a4881749.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/58c15c219375339.67b11a4883a4a.jpg"
    ],
    description: "Desarrollo del manual de marca completo para una clínica odontológica: logotipo, sistema de color, tipografía, iconografía, aplicaciones en redes sociales y papelería. Proyecto realizado en Adobe Illustrator y Photoshop.",
    descriptionEn: "Complete brand manual development for a dental clinic: logo, color system, typography, iconography, social media and stationery applications. Project made in Adobe Illustrator and Photoshop.",
    tags: ["Branding", "Logo Design", "Illustrator", "Visual Identity", "Social Media"],
    client: "Pineda Martínez Odontología",
    year: "2025",
    role: "Diseñador de marca",
    caseStudy: {
      challenge: "Una clínica odontológica sin sistema de marca: cada pieza —redes, papelería, señalética— se resolvía por separado, sin criterio común de logotipo, color ni tipografía. El encargo fue construir ese criterio y dejarlo documentado para que el equipo pudiera aplicarlo sin un diseñador de por medio.",
      challengeEn: "A dental clinic with no brand system: every piece — social, stationery, signage — was solved separately, with no shared criteria for logo, colour or type. The brief was to build that criteria and document it so the team could apply it without a designer in the loop.",
      process: "Partí del logotipo y desde ahí derivé el sistema completo: paleta, jerarquía tipográfica e iconografía. Probé cada decisión contra las aplicaciones reales —redes sociales y papelería— antes de darla por buena, y recogí el resultado en un manual con usos correctos e incorrectos. Producción en Illustrator y Photoshop.",
      processEn: "I started from the logo and derived the whole system from it: palette, type hierarchy and iconography. Every decision was tested against the real applications — social media and stationery — before being accepted, and the result was collected in a manual with correct and incorrect usage. Produced in Illustrator and Photoshop.",
      outcome: "La clínica quedó con un manual completo y aplicaciones listas para producción: las piezas nuevas se generan a partir de reglas escritas y no del criterio de quien las haga ese día.",
      outcomeEn: "The clinic ended up with a complete manual and production-ready applications: new pieces come from written rules rather than from whoever happens to make them that day.",
      draft: true
    },
    behanceUrl: "https://www.behance.net/gallery/219375339/Manual-de-Marca-Pineda-Martinez-Odontologia",
    col: "col-8"
  },
  {
    id: 2,
    title: "Diseño Página Web Polaris",
    titleEn: "Polaris Website Design",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/92a114192686175.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/ca1df1192686175.65df7ac9d7931.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fdf584192686175.65df7ac9d9cd6.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/59b7ee192686175.65df7ac9d8425.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f89f03192686175.65df7ac9d6dde.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/334493192686175.65df7ac9d6004.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/762ff8192686175.65df7ac9d91c0.jpg"
    ],
    description: "Diseño de página web para la marca Polaris. Concepto visual, wireframes y prototipo de alta fidelidad enfocado en la experiencia del usuario, estructura de contenido y jerarquía visual de marca.",
    descriptionEn: "Website design for the Polaris brand. Visual concept, wireframes and high-fidelity prototype focused on user experience, content structure and brand visual hierarchy.",
    tags: ["Web Design", "UX/UI", "Figma", "Prototipado"],
    client: "Polaris",
    year: "2024",
    role: "UX/UI Designer",
    behanceUrl: "https://www.behance.net/gallery/192686175/Diseno-Pagina-Web-Polaris",
    // ── Reemplaza esta URL con tu link real de Figma ──────────
    figmaUrl: "https://www.figma.com/proto/example-polaris",
    col: "col-4"
  },
  {
    id: 3,
    title: "App para Adopción de Mascotas",
    titleEn: "Pet Adoption App",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/489cf7138433671.Y3JvcCw4MDksNjMyLDAsMA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2c93a8138433671.621da42bbf07a.jpg"
    ],
    description: "Diseño de aplicación móvil para adopción de mascotas. Investigación de usuarios, arquitectura de información, flujos de navegación y prototipo de alta fidelidad en Figma. Proyecto con 175 visualizaciones en Behance.",
    descriptionEn: "Mobile app design for pet adoption. User research, information architecture, navigation flows and high-fidelity prototype in Figma. Behance project with 175 views.",
    tags: ["Mobile Design", "Figma", "UX Research", "Prototipado"],
    client: "Proyecto personal",
    year: "2022",
    role: "UX/UI Designer",
    behanceUrl: "https://www.behance.net/gallery/138433671/App-para-Adopcion-de-Mascotas",
    figmaUrl: "https://www.figma.com/proto/example-mascotas",
    col: "col-4"
  },
  {
    id: 4,
    title: "Material de Diseño en Logyca",
    titleEn: "Design Material at Logyca",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/3bfd48192692797.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/215b82192692797.65df8f23d1502.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/03d881192692797.65df8f23d06b7.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2e5aa8192692797.65df8f23cf7bc.jpg"
    ],
    description: "Lideré la creación y el despliegue de la identidad visual para canales digitales, incluyendo redes sociales, campañas de email marketing y el diseño estratégico de landing pages. Mi gestión se centró en el desarrollo de piezas gráficas de alto impacto bajo estándares corporativos rigurosos, garantizando una estética profesional en cada punto de contacto. Logré potenciar la presencia digital de la marca mediante soluciones visuales atractivas que equilibraron la funcionalidad con una comunicación visual efectiva.",
    descriptionEn: "Led the creation and deployment of visual identity for digital channels, including social media, email marketing campaigns and strategic landing page design. Focused on developing high-impact graphic pieces under rigorous corporate standards, ensuring professional aesthetics at every touchpoint.",
    tags: ["Illustrator", "Social Media", "Email Marketing", "Landing Pages"],
    client: "Logyca",
    year: "2022",
    role: "Diseñador Gráfico",
    caseStudy: {
      challenge: "Sostener una presencia digital coherente en varios canales a la vez —redes sociales, email marketing y landing pages— bajo estándares corporativos estrictos y con un ritmo de producción alto.",
      challengeEn: "Sustaining a coherent digital presence across several channels at once — social media, email marketing and landing pages — under strict corporate standards and at a high production rate.",
      process: "Asumí la creación y el despliegue de la identidad visual para esos canales. Trabajé cada pieza dentro del marco corporativo y coordiné los formatos entre social, email y landing, de modo que la marca se leyera igual en todos los puntos de contacto.",
      processEn: "I took on the creation and rollout of the visual identity for those channels, working each piece within the corporate framework and coordinating formats across social, email and landing pages so the brand read the same at every touchpoint.",
      outcome: "La marca ganó consistencia en todos sus puntos de contacto digitales, con piezas que cumplen el estándar corporativo sin quedarse en lo genérico.",
      outcomeEn: "The brand gained consistency across every digital touchpoint, with pieces that meet the corporate standard without settling for the generic.",
      draft: true
    },
    behanceUrl: "https://www.behance.net/gallery/192692797/Material-de-Diseno-en-Logyca",
    col: "col-4"
  },
  {
    id: 5,
    title: "Rediseño Página Web Colegio Virtual",
    titleEn: "Virtual School Website Redesign",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/81f5be141231141.Y3JvcCwxMDA3LDc4OCwxOTcsMA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5513e7141231141.65df781a0cc2e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2543f6141231141.624faeb1026ec.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/71ce1d141231141.624faeb0f3607.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/be9df9141231141.624faeb0f3dac.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/176b27141231141.624faeb103ec3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/180531141231141.624faeb1016b4.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d73357141231141.624faeb1037b2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/edfe3f141231141.624faeb100629.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/07a145141231141.624faeb100ea1.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/541b9a141231141.624faeb101ee8.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f05d60141231141.624faeb102e62.jpg"
    ],
    description: "Análisis de experiencia de usuario e implementación de rediseño completo para la plataforma web de un colegio virtual. Identificación de puntos de dolor, propuesta de nueva arquitectura de información y prototipado de alta fidelidad para mejorar la navegación y accesibilidad del sitio.",
    descriptionEn: "User experience analysis and complete redesign implementation for a virtual school web platform. Pain point identification, new information architecture proposal and high-fidelity prototyping to improve site navigation and accessibility.",
    tags: ["UX Research", "Web Design", "Rediseño", "Figma"],
    client: "Colegio Virtual",
    year: "2022",
    role: "UX/UI Designer",
    caseStudy: {
      challenge: "La plataforma web del colegio había ido creciendo por acumulación: los contenidos estaban donde la institución los fue colocando, no donde los buscaban las familias y los estudiantes.",
      challengeEn: "The school web platform had grown by accumulation: content sat where the institution had placed it over time, not where families and students were looking for it.",
      process: "Empecé con un análisis de experiencia para localizar los puntos de dolor concretos, no los supuestos. Con eso propuse una arquitectura de información nueva y la llevé a prototipo de alta fidelidad en Figma, revisando en paralelo la accesibilidad del sitio.",
      processEn: "I started with an experience analysis to locate the actual pain points rather than the assumed ones. From there I proposed a new information architecture and took it to a high-fidelity Figma prototype, reviewing site accessibility along the way.",
      outcome: "El rediseño reordenó la navegación alrededor de las tareas reales de quien usa el sitio, y dejó un prototipo completo como base para la implementación.",
      outcomeEn: "The redesign reorganised navigation around what people actually come to the site to do, and left a complete prototype as the basis for implementation.",
      draft: true
    },
    behanceUrl: "https://www.behance.net/gallery/141231141/Rediseno-Pagina-Web-Colegio-Virtual",
    figmaUrl: "https://www.figma.com/proto/example-colegio",
    col: "col-6"
  },
  {
    id: 6,
    title: "Prototipo — App Renta de Autos",
    titleEn: "Prototype — Car Rental App",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/2f2016139346567.Y3JvcCw5MjAsNzIwLDE4MCww.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/24e163139346567.622e456fae8d1.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/f5985c139346567.622e456faef21.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ab89c1139346567.622e456faf537.jpg"
    ],
    description: "Prototipo de concepto para aplicación móvil de renta de autos. Flujos completos de usuario: búsqueda, selección de vehículo, reserva y pago. Diseño centrado en la simplicidad del proceso y la confianza del usuario en la transacción.",
    descriptionEn: "Concept prototype for a car rental mobile app. Complete user flows: search, vehicle selection, booking and payment. Design centered on process simplicity and user trust in the transaction.",
    tags: ["Mobile Design", "Figma", "Prototipado", "UX"],
    client: "Proyecto de concepto",
    year: "2022",
    role: "UX/UI Designer",
    behanceUrl: "https://www.behance.net/gallery/139346567/Prototipo-concepto-de-app-para-renta-de-autos",
    figmaUrl: "https://www.figma.com/proto/example-autos",
    col: "col-4"
  },
  {
    id: 7,
    title: "Prototipo Landing Page Red 5G",
    titleEn: "5G Network Landing Page Prototype",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/53a58c142442963.Y3JvcCwxMjkyLDEwMTAsMCwzNQ.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4201a5142442963.62671e0619e8b.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9e93ad142442963.62671e061b23e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c2cb42142442963.62671e061c620.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9d76be142442963.62671e061b9ce.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2b20aa142442963.62671e061aa82.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/385a2a142442963.62671e061c0f8.jpg"
    ],
    description: "Prototipo de concepto para landing page de servicio de Red 5G. Diseño de interfaz moderna y tecnológica, con énfasis en la jerarquía de información, llamadas a la acción y una estética que transmite innovación y velocidad.",
    descriptionEn: "Concept prototype for a 5G Network service landing page. Modern and technological interface design, with emphasis on information hierarchy, calls to action and an aesthetic that conveys innovation and speed.",
    tags: ["Landing Page", "Web Design", "Figma", "UI"],
    client: "Proyecto de concepto",
    year: "2022",
    role: "UX/UI Designer",
    behanceUrl: "https://www.behance.net/gallery/142442963/Prototipo-Landing-Page-Red5G-concepto",
    figmaUrl: "https://www.figma.com/proto/example-5g",
    col: "col-4"
  },
  {
    id: 8,
    title: "Linio — Piezas Promocionales",
    titleEn: "Linio — Promotional Pieces",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/29e670192686691.Y3JvcCw4OTEsNjk3LDk5LDA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/bd4b62192686691.65df7c1e5006e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/7a9c3d192686691.65df7c1e4f2a6.jpg"
    ],
    description: "Diseño de piezas promocionales y publicitarias para Linio. Banners digitales, creatividades para redes sociales y materiales de campaña manteniendo coherencia con los estándares visuales de la marca.",
    descriptionEn: "Design of promotional and advertising pieces for Linio. Digital banners, social media creatives and campaign materials maintaining consistency with the brand's visual standards.",
    tags: ["Diseño publicitario", "Social Media", "Banners", "Illustrator"],
    client: "Linio",
    year: "2024",
    role: "Diseñador Gráfico",
    behanceUrl: "https://www.behance.net/gallery/192686691/Linio-Piezas-Promocionales",
    col: "col-4"
  },
  {
    id: 9,
    title: "Campaña Redes Sociales Yanbal",
    titleEn: "Yanbal Social Media Campaign",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/35ed5b137863125.Y3JvcCwzNDY4LDI3MTMsNjAwOSww.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f512b6137863125.621316436a891.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/5d96d5137863125.621316436b07e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/d7cdcc137863125.6213164369a22.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ce9884137863125.621316436a228.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ba1901137863125.621316436b7bf.jpg"
    ],
    description: "Concepto de campaña para redes sociales de Yanbal. Desarrollo de línea gráfica, sistema de piezas para distintos formatos digitales y propuesta de storytelling visual coherente con la identidad de la marca de cosméticos y joyería.",
    descriptionEn: "Campaign concept for Yanbal social media. Development of graphic line, pieces system for different digital formats and visual storytelling proposal consistent with the cosmetics and jewelry brand identity.",
    tags: ["Social Media", "Campaña digital", "Branding", "Illustrator"],
    client: "Yanbal",
    year: "2022",
    role: "Diseñador Gráfico",
    behanceUrl: "https://www.behance.net/gallery/137863125/Concepto-Campana-de-Redes-Sociales-Yanbal",
    col: "col-6"
  },
  {
    id: 10,
    title: "Prototipo Renovación App Picap",
    titleEn: "Picap App Renewal Prototype",
    category: "uxui",
    categoryLabel: "UX/UI",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/748a54140713837.Y3JvcCw5NjksNzU4LDIwNCww.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9115e1140713837.624639594490d.jpg"
    ],
    description: "Concepto de renovación de la aplicación móvil de Picap, plataforma de movilidad urbana en moto. Análisis de la app actual, identificación de oportunidades de mejora en UX y propuesta de rediseño de flujos principales con prototipo de alta fidelidad.",
    descriptionEn: "Renewal concept for Picap's mobile app, an urban motorcycle mobility platform. Analysis of the current app, UX improvement opportunity identification and high-fidelity prototype redesign proposal for main flows.",
    tags: ["Mobile Design", "Figma", "UX Research", "Rediseño"],
    client: "Picap (concepto)",
    year: "2022",
    role: "UX/UI Designer",
    behanceUrl: "https://www.behance.net/gallery/140713837/Prototipo-concepto-de-renovacion-app-picap",
    figmaUrl: "https://www.figma.com/proto/example-picap",
    col: "col-4"
  },
  {
    id: 11,
    title: "Flyer Promocional Jenesano Boyacá",
    titleEn: "Jenesano Boyacá Promotional Flyer",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/bc0cd9137862597.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7b4645137862597.621312bbb4818.jpg"
    ],
    description: "Diseño de flyer promocional para el municipio de Jenesano, Boyacá. Pieza publicitaria orientada al turismo local con identidad visual que resalta la cultura y el atractivo natural de la región.",
    descriptionEn: "Promotional flyer design for the municipality of Jenesano, Boyacá. Advertising piece oriented to local tourism with visual identity that highlights the culture and natural appeal of the region.",
    tags: ["Diseño editorial", "Turismo", "Illustrator", "Impresión"],
    client: "Jenesano, Boyacá",
    year: "2022",
    role: "Diseñador Gráfico",
    behanceUrl: "https://www.behance.net/gallery/137862597/Flyer-Promocional-Jenesano-Boyaca",
    col: "col-4"
  },
  {
    id: 12,
    title: "Concepto Ambientador Chocolatina JET",
    titleEn: "Chocolatina JET Air Freshener Concept",
    category: "branding",
    categoryLabel: "Branding",
    thumb: "https://mir-s3-cdn-cf.behance.net/projects/404/c8d902137862461.Y3JvcCwxMDg0LDg0NywwLDExNQ.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/d7f05b137862461.621311c2a89ea.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d5801b137862461.621311c2a7ceb.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/f63f59137862461.621311c2a82d3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/8eea55137862461.621311c2a909b.jpg"
    ],
    description: "Concepto creativo de producto: ambientador con olor a Chocolatina JET, icónica marca colombiana. Diseño de empaque, identidad del producto y presentación visual del concepto. 130 visualizaciones en Behance.",
    descriptionEn: "Creative product concept: air freshener with Chocolatina JET scent, iconic Colombian brand. Package design, product identity and visual concept presentation. 130 views on Behance.",
    tags: ["Packaging", "Branding", "Concepto creativo", "Illustrator"],
    client: "Proyecto de concepto",
    year: "2022",
    role: "Diseñador Gráfico",
    behanceUrl: "https://www.behance.net/gallery/137862461/Concepto-ambientador-olor-a-chocolatina-JET",
    col: "col-4"
  }
];

const SKILLS = [
  { name: "Diseño Gráfico", level: 92 },
  { name: "UX/UI Design", level: 88 },
  { name: "Figma", level: 90 },
  { name: "HTML & CSS / Sass", level: 80 },
  { name: "Branding & Identidad", level: 88 },
  { name: "E-learning / Articulate", level: 78 }
];

const TOOLS = ["Figma","Adobe Illustrator","Photoshop","Adobe XD","InDesign","Corel Draw","After Effects","Premiere","Articulate Storyline","HTML","CSS","Sass","Webflow","IA (integración)"];

// ── EXPERIENCIA: descripciones completas del CV, sin resumir ──
const EXPERIENCE = [
  {
    period: "Mayo 2025 — Actualidad",
    title: "Diseñador Gráfico & Diseñador Web UX/UI",
    company: "H2A",
    desc: "Especialista en el diseño y estructuración de experiencias de aprendizaje virtual e inducciones corporativas, transformando contenidos complejos en materiales interactivos y visualmente atractivos. Responsable de la creación de piezas de marketing educativo (banners, mailing y redes sociales) en Adobe Illustrator, complementando esta labor con la maquetación de interfaces web mediante HTML y CSS. Integro herramientas de IA para optimizar los flujos de trabajo, logrando productos digitales innovadores que combinan la pedagogía visual con una implementación técnica eficiente y moderna."
  },
  {
    period: "Oct 2022 — Mayo 2025",
    title: "Diseñador Web UX/UI",
    company: "BlueCaribu",
    desc: "Lideré la conceptualización y arquitectura de interfaces mediante el uso de Figma para la creación de prototipos de alta fidelidad. Ejecuté la maquetación técnica utilizando HTML y CSS (Sass), logrando optimizar la escalabilidad y el rendimiento de las plataformas internas de la compañía. Mi flujo de trabajo integró la IA como una herramienta estratégica para la generación de código eficiente y la aceleración de los ciclos de desarrollo, enfocándome siempre en la mejora continua de la experiencia de usuario para entregar productos digitales intuitivos y técnicamente robustos."
  },
  {
    period: "Jun 2023 — Dic 2023",
    title: "Diseñador Gráfico & Diseñador Web UX/UI",
    company: "Lookers",
    desc: "En Lookers, colaboraba estrechamente con diversos clientes de la empresa, desempeñando un papel clave en el diseño de elementos para redes sociales, campañas de mail marketing, banners web y la edición de videos. Además, llevaba a cabo análisis de experiencia de usuario y diseño de interfaz de usuario en las páginas de los clientes. Basándome en los resultados de estos análisis, implementaba rediseños que mejoraban significativamente la experiencia del usuario en dichas páginas."
  },
  {
    period: "May 2022 — Dic 2022",
    title: "Diseñador Gráfico",
    company: "Logyca",
    desc: "Lideré la creación y el despliegue de la identidad visual para canales digitales, incluyendo redes sociales, campañas de email marketing y el diseño estratégico de landing pages. Mi gestión se centró en el desarrollo de piezas gráficas de alto impacto bajo estándares corporativos rigurosos, garantizando una estética profesional en cada punto de contacto. Logré potenciar la presencia digital de la marca mediante soluciones visuales atractivas que equilibraron la funcionalidad con una comunicación visual efectiva."
  },
  {
    period: "May 2022 — Sep 2022",
    title: "Diseñador Web UX/UI",
    company: "Adasoft",
    desc: "Desarrollé prototipos de alta fidelidad mediante el uso avanzado de Figma y Webflow, traduciendo historias de usuario en interfaces funcionales y centradas en el humano. Ejecuté metodologías de investigación para identificar con precisión necesidades de información y puntos de dolor, transformando estos hallazgos en soluciones de diseño validadas que aseguraron la alineación entre los requerimientos técnicos y las expectativas reales de los usuarios finales."
  },
  {
    period: "Jun 2021 — May 2022",
    title: "Diseñador Gráfico",
    company: "Tech Education S.A.",
    desc: "Me desempeñé como diseñador de material e-learning utilizando el programa Articulate Storyline. Mi labor consistió en la creación de presentaciones de masters universitarios que incorporaban gráficos interactivos, actividades, videos e imágenes, centrándome especialmente en la experiencia del estudiante. Mi objetivo era desarrollar contenido interactivo e intuitivo que optimizara el proceso de aprendizaje."
  },
  {
    period: "Feb 2021 — Mar 2022",
    title: "Diseñador Gráfico",
    company: "Lujos la Gran Colombia",
    desc: "Me desempeñé como diseñador, especializándome en la creación de diseños a gran formato, que abarcaban desde vallas publicitarias hasta banners y diversas formas de publicidad. Además, tuve la responsabilidad de diseñar avisos reglamentarios y llevar a cabo proyectos de decoración de interiores utilizando vinilo y frost."
  },
  {
    period: "Oct 2020 — Feb 2021",
    title: "Diseñador Gráfico & Community Manager",
    company: "Agencia Item",
    desc: "Llevé a cabo estrategias publicitarias en Facebook Business y gestionando la interacción con los seguidores. Mi responsabilidad incluyó la ejecución de marketing de contenido, así como el diseño de materiales a gran formato, tarjetas de presentación, folletos y banners publicitarios."
  }
];

const EDUCATION = [
  {
    period: "2020 — 2022",
    title: "Tecnología en Producción Gráfica para Medios Publicitarios",
    company: "Politécnico Santa Fe de Bogotá",
    desc: "Tecnología en producción gráfica para medios publicitarios. Formación integral en comunicación visual, diseño editorial, producción de medios impresos y digitales."
  },
  {
    period: "2018 — 2019",
    title: "Técnico en Sistemas",
    company: "SENA",
    desc: "Formación técnica en sistemas computacionales, base tecnológica que complementa la visión técnica aplicada al desarrollo y maquetación de interfaces digitales."
  }
];

// ── CERTIFICACIONES ──────────────────────────────────────────
// Para agregar: { name, platform, year }
const CERTIFICATIONS = [
  { name: "Diseño UX/UI + Figma", platform: "Udemy", year: "2023" },
  { name: "Diseño UI con Figma", platform: "Udemy", year: "2023" },
  { name: "Adobe XD: Prototipos Profesionales", platform: "Udemy", year: "2022" },
  { name: "Introducción a Figma", platform: "Udemy", year: "2022" },
  { name: "Certificado en Desarrollo Web HTML y CSS", platform: "Udemy", year: "2022" },
  { name: "Técnicas avanzadas de styling: Sass y SCSS", platform: "Crehana", year: "2022" },
  { name: "Fundamentos de Marketing Digital", platform: "Google Activate", year: "2021" }
];

/* TRANSLATIONS */
/* Ajustes del sitio que no son ni proyecto ni texto: rutas de archivos.
   Van aquí para que se puedan cambiar desde el panel. */
const SITE = {
  portrait: "",
  portraitAlt: "Kevin Navarrete",
  cvUrl: ""
};

const i18n = {
  es: {
    "nav.projects": "Proyectos",
    "nav.about": "Sobre mí",
    "nav.cv": "CV",
    "nav.contact": "Contacto",
    "hero.available": "Bogotá, Colombia · disponible para proyectos",
    "hero.role": "Diseñador gráfico y UX/UI",
    "hero.sub": "Trabajo el sistema completo: del manual de marca al prototipo funcional. Cinco años construyendo identidades, interfaces y contenidos e-learning para equipos como BlueCaribu, Logyca, Lookers y H2A.",
    "hero.cta1": "Ver proyectos →",
    "hero.cta2": "Hablemos",
    "hero.stat1": "Años exp.",
    "hero.stat2": "Proyectos",
    "hero.stat3": "Dedicación",
    "hero.scroll": "Scroll",
    "projects.label": "Trabajo selecto",
    "projects.title": "Proyectos <em>destacados</em>",
    "projects.sub": "Una selección de trabajos que reflejan mi proceso y visión de diseño.",
    "projects.all": "Todos",
    "about.label": "Sobre mí",
    "about.title": "Diseño con<br><em>propósito</em><br>y alma.",
    "about.p1": "Soy Kevin Navarrete, diseñador gráfico y UX/UI con más de 5 años de experiencia creando identidades visuales, interfaces digitales y materiales e-learning que conectan marcas con sus audiencias.",
    "about.p2": "He colaborado con empresas como BlueCaribu, Logyca, Lookers y H2A, liderando desde la conceptualización de sistemas de marca hasta el desarrollo técnico de interfaces con HTML, CSS y Figma. Integro la inteligencia artificial como herramienta estratégica en mi flujo de trabajo.",
    "about.p3": "Me mueve el reto de transformar contenidos complejos en experiencias visuales claras, atractivas y funcionales. Cada proyecto es una oportunidad de impactar positivamente a las personas.",
    "about.skills": "Habilidades",
    "about.tools": "Herramientas",
    "cv.label": "Trayectoria",
    "cv.title": "Experiencia & <em>Formación</em>",
    "cv.sub": "Mi recorrido profesional y académico en diseño y comunicación visual.",
    "cv.experience": "Experiencia",
    "cv.education": "Formación",
    "cv.certs": "Certificaciones",
    "cv.download": "Descargar CV en PDF",
    "contact.label": "Contacto",
    "contact.title": "Trabajemos<br>juntos en algo<br><em>memorable.</em>",
    "contact.sub": "¿Tienes un proyecto en mente? Me encantaría escucharte. Estoy disponible para proyectos freelance, colaboraciones y consultoría.",
    "contact.email": "Email",
    "contact.name": "Nombre",
    "contact.email_label": "Correo",
    "contact.subject": "Servicio de interés",
    "contact.select": "Selecciona un servicio",
    "contact.opt1": "Branding / Identidad visual",
    "contact.opt2": "Diseño UX/UI",
    "contact.opt3": "Diseño editorial",
    "contact.opt4": "Marketing digital / Social",
    "contact.opt5": "Otro",
    "contact.message": "Mensaje",
    "contact.success": "✓ Mensaje enviado. Te contactaré pronto.",
    "contact.send": "Enviar mensaje →",
    "modal.client": "Cliente",
    "modal.year": "Año",
    "modal.role": "Rol",
    "footer.rights": "Todos los derechos reservados."
  },
  en: {
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.cv": "CV",
    "nav.contact": "Contact",
    "hero.available": "Bogotá, Colombia · available for projects",
    "hero.role": "Graphic and UX/UI designer",
    "hero.sub": "I work the whole system: from the brand manual to the working prototype. Five years building identities, interfaces and e-learning content for teams like BlueCaribu, Logyca, Lookers and H2A.",
    "hero.cta1": "View projects →",
    "hero.cta2": "Let's talk",
    "hero.stat1": "Years exp.",
    "hero.stat2": "Projects",
    "hero.stat3": "Satisfaction",
    "hero.scroll": "Scroll",
    "projects.label": "Selected work",
    "projects.title": "Featured <em>projects</em>",
    "projects.sub": "A selection of work that reflects my design process and vision.",
    "projects.all": "All",
    "about.label": "About me",
    "about.title": "Design with<br><em>purpose</em><br>and soul.",
    "about.p1": "I'm Kevin Navarrete, a Graphic & UX/UI designer with 5+ years of experience creating visual identities, digital interfaces and e-learning materials that connect brands with their audiences.",
    "about.p2": "I've collaborated with companies like BlueCaribu, Logyca, Lookers and H2A, leading everything from brand system conceptualization to technical interface development with HTML, CSS and Figma. I integrate AI as a strategic tool in my workflow.",
    "about.p3": "I'm driven by the challenge of transforming complex content into clear, attractive and functional visual experiences. Every project is an opportunity to make a positive impact.",
    "about.skills": "Skills",
    "about.tools": "Tools",
    "cv.label": "Journey",
    "cv.title": "Experience & <em>Education</em>",
    "cv.sub": "My professional and academic journey in design and visual communication.",
    "cv.experience": "Experience",
    "cv.education": "Education",
    "cv.certs": "Certifications",
    "cv.download": "Download CV as PDF",
    "contact.label": "Contact",
    "contact.title": "Let's work<br>on something<br><em>memorable.</em>",
    "contact.sub": "Have a project in mind? I'd love to hear about it. Available for freelance projects, collaborations and consulting.",
    "contact.email": "Email",
    "contact.name": "Name",
    "contact.email_label": "Email",
    "contact.subject": "Service of interest",
    "contact.select": "Select a service",
    "contact.opt1": "Branding / Visual identity",
    "contact.opt2": "UX/UI Design",
    "contact.opt3": "Editorial design",
    "contact.opt4": "Digital marketing / Social",
    "contact.opt5": "Other",
    "contact.message": "Message",
    "contact.success": "✓ Message sent. I'll reach out soon.",
    "contact.send": "Send message →",
    "modal.client": "Client",
    "modal.year": "Year",
    "modal.role": "Role",
    "footer.rights": "All rights reserved."
  }
};

/* ============================================================
   Runtime — lee localStorage si existe, si no usa defaults
============================================================ */
function getProjects()      { try { const s = localStorage.getItem('kn_projects');      return s ? JSON.parse(s) : PROJECTS;      } catch(e){ return PROJECTS; } }
function getSkills()        { try { const s = localStorage.getItem('kn_skills');        return s ? JSON.parse(s) : SKILLS;        } catch(e){ return SKILLS; } }
function getTools()         { try { const s = localStorage.getItem('kn_tools');         return s ? JSON.parse(s) : TOOLS;         } catch(e){ return TOOLS; } }
function getExperience()    { try { const s = localStorage.getItem('kn_experience');    return s ? JSON.parse(s) : EXPERIENCE;    } catch(e){ return EXPERIENCE; } }
function getEducation()     { try { const s = localStorage.getItem('kn_education');     return s ? JSON.parse(s) : EDUCATION;     } catch(e){ return EDUCATION; } }
function getCertifications(){ try { const s = localStorage.getItem('kn_certs');         return s ? JSON.parse(s) : CERTIFICATIONS;} catch(e){ return CERTIFICATIONS; } }
function getI18n()          { try { const s = localStorage.getItem('kn_i18n');          return s ? JSON.parse(s) : i18n;           } catch(e){ return i18n; } }
function getSite()          { try { const s = localStorage.getItem('kn_site');          return Object.assign({}, SITE, s ? JSON.parse(s) : {}); } catch(e){ return SITE; } }

function saveSection(key, value) {
  localStorage.setItem('kn_' + key, JSON.stringify(value));
}
function resetSection(key) {
  localStorage.removeItem('kn_' + key);
}
