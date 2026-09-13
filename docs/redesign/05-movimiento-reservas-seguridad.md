# Segunda dirección: movimiento, medios reales y reservas

13 de septiembre de 2026. Implementación local en http://127.0.0.1:3006. No se desplegó el sitio público ni se enviaron mensajes o reservas de prueba.

## Experiencia visual

Portada editorial con tipografía grande, capas con perspectiva que responden al puntero, órbitas y transiciones. Tres escenas seleccionables, carrusel horizontal de cuatro secuencias, entradas al recorrer la página y estados interactivos en tarjetas. Se conservan la identidad clara y el logo original.

Los efectos de profundidad son composiciones 2.5D sobre fotografías, no modelos técnicos 3D ni vistas inventadas del hardware. La página conserva su contenido renderizado en servidor. El control global pausa animaciones; respeta movimiento reducido, ahorro de datos y conexiones 2G. La preferencia se recuerda durante la sesión. Los videos se cargan al entrar en pantalla, se detienen fuera de ella y al ocultar la pestaña. Hay controles individuales y fotografías de respaldo.

## Medios y fidelidad

El usuario autorizó utilizar y transformar sus fotografías locales en Higgsfield/OpenAI. Se produjeron tres pruebas de imagen y tres de video. Se descartaron las tres reinterpretaciones de producto y el video publicitario cuyo encuadre terminaba cortando la base. El manifiesto conserva los IDs y decisiones; no se presentan esas pruebas rechazadas como fotos de catálogo.

Se aprovecharon únicamente los píxeles del fondo vacío de una generación para componer la foto original del robot en un estudio ilustrativo. La extracción del fondo y los movimientos de cámara se realizaron en el entorno de Higgsfield. La imagen mantiene la perspectiva de la fotografía original; no reconstruye superficies ocultas. El montaje está identificado en la web como fondo generado.

| Archivo publicado en la revisión local | Procedencia | Tamaño |
| --- | --- | ---: |
| `studio.mp4` | Foto original, fondo de estudio generado y movimiento de cámara | 163,362 bytes |
| `publicidad-exacta.mp4` | Movimiento digital suave sobre la foto original, sin regenerar el robot | 361,259 bytes |
| `servicio.mp4` | Animación IA en Higgsfield desde foto real; identificada como tal | 785,810 bytes |
| `equipo.mp4` | Animación IA en Higgsfield desde foto real; identificada como tal | 366,335 bytes |

Los cuatro videos suman 1,676,766 bytes. El video inicial pesa aproximadamente 160 KiB; el resto se carga según visibilidad. Los fotogramas de las generaciones se revisaron a intervalos de un segundo. Las animaciones no constituyen evidencia documental de movimientos, nuevas instalaciones ni resultados de clientes.

La foto del CC1 se separó de la composición anterior de catálogo, conservando el producto principal completo sobre fondo claro. Todas las fotos de robots usan encuadre `contain`, con espacio alrededor de la silueta. Las imágenes fuente originales se conservan. El retoque no añade especificaciones, funcionalidades ni accesorios. La resolución final sigue limitada por la calidad de las fotos fuente; no se promete detalle fotográfico inexistente.

## Reservas reales

Enlace proporcionado por el usuario: https://calendar.app.google/DMgTiWSSM7ERKEmA6. Se verificó la agenda pública **CONOCE BOTMATE**, organizada por Ivan Cadavieco, citas de **30 minutos por Google Meet**, con horarios disponibles en la zona de Ciudad de México.

`/reservar` permite cargar la agenda dentro del sitio mediante una acción del visitante y ofrece el enlace directo como alternativa. Los CTA de navegación, portada, pie y fichas enlazan a esta página. Google gestiona datos, horarios y confirmaciones. La llamada inicial no se presenta como una demostración presencial ya confirmada. No se expone el calendario privado ni se incorporaron credenciales al código.

## Seguridad y SEO

Next.js se actualizó de 14 a 16.3.5, React a 19, ESLint a 9. Se migraron parámetros asíncronos y la configuración de lint. `npm audit` terminó con **0 vulnerabilidades conocidas** en el árbol instalado al verificarlo. Esto no equivale a una auditoría de penetración ni a seguridad absoluta.

Se implementaron CSP con nonce nuevo por respuesta, `strict-dynamic`, bloqueo de objetos y framing, restricciones de orígenes, `nosniff`, política de permisos, referrer, HSTS y eliminación del encabezado identificador. Solo Google Calendar puede cargarse como iframe. No hay comodines de imágenes remotas. El HTML con nonce se renderiza por solicitud y se marca privado/no-store; los recursos estáticos e imágenes conservan su mecanismo de optimización. La protección de infraestructura, WAF, secretos y reglas del hosting debe verificarse en el despliegue real.

Se preservaron canonical, sitemap, redirecciones y datos estructurados basados en contenido existente, sin precios, disponibilidad ni valoraciones inventadas. La página de reservas tiene sus metadatos propios y figura en el sitemap. Los datos estructurados también reciben nonce. El posicionamiento depende de publicación, indexación, contenido, competencia y autoridad; no es posible garantizar primera posición para búsquedas amplias de tecnología en México.

El módulo `GoogleReviews` está preparado para el enlace real mediante `GOOGLE_BUSINESS_PROFILE_URL`; permanece oculto hasta recibirlo. **Pendiente: enlace del perfil de Google Maps.** No se añadieron estrellas o testimonios ficticios. Para solicitar opiniones al terminar una atención puede usarse: «Gracias por conocer Botmate. Si quieres compartir tu experiencia, puedes dejar una opinión en nuestro perfil de Google: [enlace real]». No se ha enviado este mensaje, ni deben condicionarse beneficios a una reseña positiva.

## Verificación

- Compilación de producción y TypeScript correctos; lint sin errores ni advertencias.
- Prueba de 28 páginas: títulos, descripciones, H1, canonical, enlaces internos, imágenes, rutas retiradas y redirecciones.
- CSP comprobada en cuatro respuestas: nonce distinto, scripts legítimos con el nonce correcto, encabezado aportado por el cliente reemplazado, HTML sin caché compartida.
- Los cuatro MP4 responden a solicitudes parciales `Range` con HTTP 206.
- Agenda integrada cargada y horarios reales visibles; sin confirmar ninguna cita.
- Navegación móvil, cierre con Escape, selección de escenas, reproducción, carrusel y pausa persistente comprobados en navegador.
- Ancho real de 371 px en navegador integrado y 1033 px en Chrome: sin desbordamiento horizontal de página. El carrusel tiene desplazamiento horizontal intencional. El CC1 se revisó visualmente completo en su ficha.
- Sin errores ni advertencias de consola en las vistas finales de Chrome revisadas.

Resultados reproducibles: [rutas](higgsfield-v2/routes-qa.json), [seguridad](higgsfield-v2/security-qa.json), [generaciones](higgsfield-v2/generation-manifest.json). Scripts: `scripts/verify-site.mjs` y `scripts/verify-security.mjs`.

Referencias: [migración Next.js](https://nextjs.org/docs/app/guides/upgrading/version-16), [actualización de seguridad](https://nextjs.org/blog/august-2026-security-release), [guía SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [opiniones de Google Business Profile](https://support.google.com/business/answer/3474122). Dirección visual informada por la presentación de producto de Apple y [sus principios de interfaces fluidas](https://developer.apple.com/videos/play/wwdc2018/803/), sin copiar sus recursos.

Antes de publicar: completar el aviso integral de privacidad y confirmar catálogo, condiciones comerciales y derechos documentales de recursos de fabricante. No se requiere volver a pedir autorización para las transformaciones de las fotos locales que el usuario ya autorizó.
