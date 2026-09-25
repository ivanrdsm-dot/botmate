# Botmate · primer piloto de reconstrucción 3D

24 septiembre 2026. Dos variantes de la familia D5: D5-W (ruedas) y D5 (patas).

## Alcance y fidelidad

Geometría poligonal real construida en Blender 5.2 mediante el conector 3D Jutsu de Higgsfield. No son planos CAD del fabricante, fotogrametría automática ni réplicas certificadas. La envolvente se ajustó a las dimensiones publicadas de 900 × 543 × 572 mm; el tamaño y la forma de las piezas individuales se estimaron visualmente. Las caras ocultas, la parte inferior y el interior no cuentan con referencias suficientes y se simplificaron. No usar para fabricación, cálculo de paso, identificación de piezas o validación de compatibilidad.

El visor conserva la imagen oficial como entrada. Su modo 3D muestra una advertencia en español e inglés. Permite órbita, zoom, vistas de frente/lateral/superior y comparación entre variantes. El giro automático mueve la cámara de presentación; no simula el comportamiento, la marcha ni el rendimiento del robot. No se inventaron demostraciones de locomoción.

## Referencias

- Página oficial: https://www.pudurobotics.com/en/products/d5
- D5-W: https://cdn.pudutech.com/PUDU_D5_W_f7d5d1671d.png
- D5: https://cdn.pudutech.com/PUDU_D5_567f811337.png
- Vista superior: https://cdn.pudutech.com/_edfe2b854a.webp
- Capturas reales de Botmate en `references/botmate-d5-screenshot.png` y `references/botmate-d5-specifications.png`.

Autorización comercial sobre las imágenes oficiales declarada por el usuario como distribuidor. Las referencias se conservan en documentación y no se confunden con renders propios.

## Archivos y edición

- `scripts/build-d5-blender.py`: escena inicial a escala métrica, piezas separadas, materiales PBR, cámara e iluminación. `WHEELED=False` genera la variante con patas.
- `scripts/refine-d5-blender.py`: segunda revisión de silueta tras comparar los renders con las referencias; aplicar después de la escena inicial.
- Proyectos privados: D5-W `bc0b39fc-652b-4f3b-bd24-11296a66c1fb`; D5 `f0829657-d304-40a5-8f5e-f4d0097ba805`.
- Revisión entregada: 3 en ambos proyectos. D5-W: 423 mallas, aproximadamente 3.16 MB GLB. D5: 131 mallas, aproximadamente 1.66 MB GLB. La revisión de las patas dejó una anchura visual de aproximadamente 523 mm en D5; la ficha técnica conserva el dato oficial de 543 mm. El visor no expone medidas calculadas sobre esta reconstrucción.
- Fuentes editables `.blend` en esta carpeta; exportaciones web `.glb` en `public/media/models/`.
- El GLB exportado incluye cámara y luces; el piso empleado para las sombras de los renders se omite. El visor selecciona exclusivamente el objeto raíz `*_visual_reconstruction` y usa su propia iluminación.

## Rendimiento y accesibilidad

Three.js se carga dinámicamente al pulsar «Explorar en 3D». Solo se descarga la variante seleccionada. Al cerrar o cambiar de variante se cancelan solicitudes pendientes y se liberan geometría, materiales y contexto WebGL. El render es bajo demanda salvo giro automático solicitado; este se detiene fuera de pantalla, en pestañas ocultas y con movimiento reducido o pausa global. Teclado: flechas izquierda/derecha, +/− e Inicio. Fallback explícito ante fallo de carga o WebGL; la imagen oficial sigue disponible.

## Extensión al catálogo

Este piloto solo incorpora D5 y D5-W. El resto de robots conserva su material oficial y no se presenta como 3D reconstruido. Para cada modelo adicional se debe reunir frente, laterales, trasera, vista superior y dimensiones; comparar siluetas, renderizar y verificar antes de publicarlo. Fotografías o CAD del fabricante permitirán sustituir las aproximaciones sin cambiar el visor.

## Validación realizada

`npm run lint`, `npm run build`, `node scripts/verify-robot-models.mjs <base>`, `node scripts/verify-robot-experience.mjs <base>` y `node scripts/verify-security.mjs <base>`. El verificador 3D comprueba estructura GLB, vértices finitos, dimensiones aproximadas, ausencia de texturas externas, descarga parcial y las dos rutas ES/EN. Navegador: 1280 px y 390 px, carga de ambas variantes, frente/lateral/perspectiva, zoom, flechas del teclado, giro automático y pausa global; sin desbordamiento horizontal ni errores de consola observados. `website-mobile.png` documenta el resultado en teléfono.
