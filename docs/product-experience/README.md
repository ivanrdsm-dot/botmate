# Experiencia de producto · 24 septiembre 2026

Implementación para los 27 modelos/variantes del catálogo actual, en español e inglés (54 rutas).

- 82 capítulos de funciones con 86 recursos oficiales nuevos; 43 secuencias de video, sin audio y conservando la duración original. Videos en primera pantalla visible, un solo reproductor activo por visor, pausa al salir de pantalla o cambiar pestaña.
- T300: película oficial completa, modos de entrega, diagrama de planta con cuatro aplicaciones interactivas y dimensiones oficiales. La ilustración explica posibilidades, no documenta una instalación de Botmate.
- Portada con fotografía/render real y movimiento de presentación. No se representa como un modelo 3D de 360 grados.
- Navegación interna por funciones, aplicaciones, ficha y refacciones; accesos de cotización y reserva dentro de Botmate.
- Compatibilidad de accesorios basada en agrupación publicada por Pudu. Nueve consumibles/accesorios adicionales documentados para BG1/BG1 Pro y D5. Existencias, precio y versión se confirman con Botmate.
- D7: solo imagen del anuncio disponible en las fuentes revisadas; no se inventó video. Funciones de IA física con advertencia de alcance comercial. SH1 identificado como equipo con operador.
- Soporte de teclado en pestañas (flechas, inicio, fin), movimiento reducido, ahorro de datos y control global de pausa.
- Portadas e imágenes de ingeniería sin recortar el robot. Los rótulos incorporados en los originales conservan el idioma del fabricante; navegación y explicaciones disponibles en ES/EN.

## Fuentes y trazabilidad

`lib/robot-experiences.json`: capítulo, textos y URL original por recurso; `lib/robot-consumables.json`: piezas por compatibilidad. `docs/pudu/experience-media-jobs.json` y `experience-media-report.json`: archivos locales, tamaño, duración y URL de origen. Material autorizado por el usuario como distribuidor oficial. Recursos alojados en Botmate, sin reproductores externos ni nuevas cookies.

Páginas públicas del fabricante consultadas el 24/09/2026; copia local privada `.pudu-source/experience-2026-09-24/`. T300, por ejemplo: https://www.pudurobotics.com/en/products/pudut300 . Película localizada desde el reproductor visible de esa página, no desde un modelo de robot distinto.

## Validación

`npm run lint`, `npm run build` y `node scripts/verify-robot-experience.mjs <base>`.
El verificador comprueba las 54 fichas, idiomas, enlaces de soporte, secciones, canonical, archivos locales y reproducción parcial HTTP de todos los nuevos videos. Revisión de navegador en 1280 y 390 px: sin desbordamiento, cambio de funciones, video CC1, pausa global, navegación con teclado y consulta de refacciones.

## Siguiente nivel de 3D real

Para una vista 360° técnicamente fiel de cada modelo se necesitan GLB/GLTF/CAD aprobados por Pudu o secuencias fotográficas de todas las vistas. Los archivos de esta entrega son material oficial 2D/video; no se simularon ángulos ni piezas inexistentes. No hace falta conectar un servicio adicional para la experiencia publicada.
