# Botmate — sitio web

Sitio de robótica de servicio en México, construido con Next.js 16.3.5, React 19, TypeScript y CSS/Tailwind. Rediseño local de septiembre de 2026: blanco, gris, índigo Botmate y Manrope.

## Desarrollo

```sh
npm install
npm run dev
```

## Verificación y vista de producción

```sh
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3006
node scripts/verify-site.mjs http://127.0.0.1:3006
```

Detener el servidor de desarrollo antes de compilar: ambos usan `.next`. No ejecutar tareas de otro proyecto en esta carpeta.

## Contenido y funcionamiento

- Inicio editorial, catálogo con búsqueda/filtros/comparación, diez fichas de referencia, soluciones por industria, servicios, renta, compra, refacciones, Botmate, galería, cinco guías y contacto.
- `lib/robots.ts`: fichas con fabricante, fuentes y datos de referencia. URLs antiguas conservadas; no representan confirmación de stock ni de catálogo vigente.
- `lib/site.ts`: datos de contacto conservados del proyecto. Confirmar vigencia antes de publicar.
- `components/ContactForm.tsx`: construye una consulta local, permite revisarla y abre WhatsApp al pulsar el enlace. No hay almacenamiento de prospectos ni confirmación de envío. Las reservas se gestionan por separado en la agenda pública de Google Calendar.
- Fotografías WebP con procedencia en `docs/redesign/selected-media.json`; wordmark copiado sin redibujar de la carpeta de marca.
- Cuatro secuencias en `lib/films.ts`: dos animaciones IA de fotografías reales y dos movimientos de cámara por transformación de píxeles, producidos en Higgsfield. Carga según visibilidad, sin audio, controles de pausa, póster y respeto a movimiento reducido/ahorro de datos. Se conserva el video original de galería a petición.
- `/reservar`: citas reales de 30 minutos por Google Meet; Google Calendar se carga al pulsar el botón. Enlaces públicos en `lib/booking.ts`.
- `GOOGLE_BUSINESS_PROFILE_URL`: enlace del perfil auténtico para activar el módulo de opiniones; aún pendiente. No se inventan estrellas ni testimonios.
- CSP con nonce por respuesta, cabeceras de protección y bloqueo de recursos externos salvo el iframe de la agenda. HTML dinámico sin caché compartida por seguridad del nonce.
- Newsletter, Google Analytics y Meta Pixel desactivados. La medición requiere una implementación y condiciones de privacidad aprobadas.
- Los casos/testimonios no respaldados se retiraron. Las URLs de detalles de casos y el artículo fiscal devuelven 404; no se encuentran en el sitemap.

## Documentación de entrega

- [Auditoría y arquitectura](docs/redesign/01-auditoria-y-propuesta.md)
- [Fuentes y pendientes de validación](docs/redesign/02-fuentes-y-validacion.md)
- [Guion de Higgsfield](docs/redesign/03-guion-higgsfield.md)
- [Inventario de 149 recursos](docs/redesign/media-inventory.json)
- [Reporte de la primera entrega](docs/redesign/04-entrega-y-qa.md)
- [Segunda dirección, medios y pruebas](docs/redesign/05-movimiento-reservas-seguridad.md)

## Estado de publicación

El proyecto Vercel `botmate` está vinculado a `ivanrdsm-dot/botmate`, con `main` como rama de producción y `botmate.mx` como dominio. El usuario autorizó publicar este rediseño y usar y transformar sus fotografías en Higgsfield/OpenAI. El enlace de Google Maps y el aviso integral de privacidad continúan pendientes; las fichas muestran datos de referencia, con condiciones comerciales por confirmar. Los reportes de `docs/redesign` registran la revisión previa al despliegue.
