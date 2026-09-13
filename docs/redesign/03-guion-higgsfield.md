# Guion de animaciones Higgsfield

Estado: propuesta presentada antes de producir. Ninguna generación enviada. Falta confirmar derechos de transformación de las referencias, identidad exacta de modelo y uso de marcas/personas. El usuario pidió esa comprobación en el brief; la falta de respuesta no es autorización.

## Dirección compartida
Luz natural suave, fotografía real como primer cuadro, fondos del entorno original. Sin escenarios inventados que parezcan instalaciones de clientes. Robot físicamente íntegro y sin demostrar funciones no verificadas. No redibujar logos ni borrar marcas mediante generación. Usar primer cuadro autorizado y evitar vistas nuevas no contenidas en referencias.

## 01 — Presencia cercana (primera prueba propuesta)
- Objetivo: presentar al robot de servicio como parte de un entorno cotidiano; complementar el hero.
- Referencia propuesta: `BOTMATE_FOTOS__CHAROLAS__IMG_2949.jpeg` (original local), sujeto a autorización.
- Duración: 5 segundos. Formato: 3:4, 720p de prueba; sin audio.
- Escena: robot quieto en el pasillo de la foto, mismas bandejas, pantalla y base.
- Cámara: acercamiento frontal máximo 2%; sin órbita ni cambio de ángulo que revele geometría oculta.
- Prompt:

> Use the supplied photograph as a strict first-frame reference. Preserve this exact Pudu service robot, its silhouette, proportions, number and spacing of trays, screen content, sensors, wheels, materials, brand marks and colors. The robot remains stationary in the exact photographed environment. Five seconds of a nearly imperceptible, physically plausible camera push-in, maximum two percent, with stable natural lighting. No new objects, no new faces, no articulated parts, no screen animation, no extra trays, no changes to logos, no morphing. Do not orbit or reveal unseen surfaces. Maintain the original framing and realistic floor contact. This is an illustrative animation, not footage of a new installation.

## 02 — Un recorrido de servicio
- Objetivo: explicar el traslado de productos con un clip real.
- Referencia propuesta: video real `IMG_4270.MOV`; cotejar el tramo con `public/videos/robot-service.mp4`.
- Duración: 7 segundos. Formato: vertical, 720p, sin audio.
- Escena: recorrido ya capturado. Sin generar personas, trayectorias o entregas nuevas.
- Cámara: conservar la cámara original, edición por cortes; no sintetizar movimiento del robot.
- Instrucción de edición Higgsedit propuesta:

> Edit only the supplied authorized real footage. Select one continuous seven-second section with clear robot geometry and stable framing. Preserve real-time speed, all robot parts, original colors, screen content and visible logos. Do not interpolate new actions, replace the background, add objects or imply a customer testimonial. Keep the original orientation. No generated audio. Export a clean H.264 web version and its first-frame poster.

## 03 — Limpieza, con contexto
- Objetivo: explicar el papel de CC1 sin confundir limpieza con desinfección.
- Referencia propuesta: material real `BADADEA0-5B9C-4CAC-AA9A-C3557748B9F8.MP4`; extraer y aprobar un cuadro que muestre el robot completo.
- Duración: 5 segundos. Formato: 3:4, 720p; sin audio.
- Escena: mismo CC1, piso y entorno originales; sin añadir una estela de limpieza artificial.
- Cámara: plano fijo, robot quieto; acercamiento óptico mínimo al conjunto, no a mecanismos invisibles.
- Prompt:

> Starting from the supplied authorized CC1 photograph, create a five-second subtle shot with a locked camera and a maximum one-percent optical push-in. Preserve exactly the real robot's body, sensors, color panels, wheels, logos and physical contact with the existing floor. Keep the robot stationary. Do not add brushes, tanks, tubes, spinning sensors, liquid trails or cleaning effects. Preserve the actual background and existing light. No sterilization or disinfection imagery, no invented function, no text or audio.

## Consulta real a Higgsfield
El 13 de septiembre de 2026 se consultó `models_recommend` y `estimate_video_cost` (solo lectura). Modelo candidato: `seedance_2_5`, modo `omni_reference`, 5 s, 3:4, 720p, sin audio. Estimación devuelta: **32.5 créditos** para una prueba. No se subió ningún material ni se consumieron créditos. Confirmar el costo nuevamente antes de ejecutar; no representa una cotización permanente. La disponibilidad de un modelo no garantiza fidelidad geométrica.

## Revisión obligatoria del resultado
Comparar primer cuadro, cuadros intermedios y final con la referencia: bandejas, sensores, ruedas, pantalla, logos, proporción y contacto con el piso. Descartar clips que modifiquen el producto; no resolver deformaciones con una etiqueta de “concepto”. Si no se consigue fidelidad, usar la foto original o el clip real editado.

## Integración web preparada
La galería incorpora reproducción voluntaria, controles nativos, carga del video solo tras pulsar reproducir, póster, descripción textual, manejo de error y pausa al ocultar la pestaña. No hay reproducción automática al entrar a la página. Los usuarios con menos movimiento ven el póster hasta decidir reproducir; al cambiar esa preferencia se pausa el video.

Para una animación hero aprobada: imagen estática por defecto en `saveData` o `prefers-reduced-motion`; carga de un único clip al entrar en pantalla; control visible de pausa; detener fuera del viewport. Especificación pendiente de implementación hasta disponer de un resultado aprobado. Presupuesto objetivo: <2 MB por clip móvil, póster WebP <200 KB, H.264 `+faststart`, sin pista de audio. No prometer un loop continuo si los cuadros inicial y final no coinciden.
