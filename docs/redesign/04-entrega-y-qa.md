# Entrega del rediseño Botmate

> Registro histórico de la primera dirección. El estado vigente está en [la segunda entrega](05-movimiento-reservas-seguridad.md).

Revisión local: 13 de septiembre de 2026 UTC. Vista previa: http://127.0.0.1:3006. No se han publicado cambios ni enviado generaciones a Higgsfield.

## Cambios realizados

- Sistema visual blanco y gris claro, índigo real de Botmate (#5161FF), Manrope, tipografía amplia, profundidad mediante capas y sombras suaves. Logo original sin redibujar ni cambiar proporciones.
- Inicio organizado alrededor de entrega, publicidad y limpieza; fotografías reales, catálogo destacado, proceso, preguntas frecuentes y demostración. Navegación común y menú móvil accesible.
- Catálogo de diez modelos de referencia con nombres del fabricante, búsqueda, filtros y comparación de hasta tres modelos. Fichas con aplicaciones, especificaciones comprobadas y enlaces a fuentes. Se conservaron URLs anteriores y redirecciones.
- Páginas de industrias, servicios, renta, compra, refacciones, Botmate, galería, guías y contacto adaptadas al nuevo sistema.
- Se retiraron precios, retornos, beneficios fiscales, métricas, reseñas y casos sin respaldo. La galería describe fotografías sin atribuir resultados ni testimonios. SH1 se identifica como equipo con operador. Se excluyó la foto incorrecta de HolaBot.
- Contacto breve con modelo preseleccionado, validación, consentimiento, revisión y edición del mensaje. WhatsApp se abre solo mediante una acción explícita; el formulario no guarda prospectos ni confirma envíos inexistentes.
- Metadatos únicos, un H1 por página, canonical, sitemap, imagen social, textos alternativos y datos estructurados sin ofertas, disponibilidad o valoraciones inventadas. Newsletter y rastreadores anteriores desactivados.
- Video real con carga a petición, póster, controles, descripción y estados de error; estilos compatibles con menos movimiento. No se incorporaron efectos 3D pesados ni se ocultó contenido hasta ejecutar JavaScript.

## Recursos utilizados

Inventario de **149 recursos**, incluidos **41 videos**, aproximadamente **2.36 GB**. Se calcularon hashes y detectaron **8 duplicados exactos**. El inventario registra dimensiones, duración, orientación, procedencia y observaciones de selección; la identidad precisa de algunos robots y los derechos siguen pendientes.

Se prepararon siete fotografías WebP, **740,424 bytes en conjunto**; no se descargan todas al entrar. El hero pesa 185,856 bytes. Se usó el wordmark azul original y el video local existente de aproximadamente 7 segundos / 1.95 MB. Las imágenes de catálogo preexistentes son referencias sujetas a cotejo de versión y licencia.

- [Inventario](media-inventory.json)
- [Procedencia y dimensiones de las fotografías](selected-media.json)
- [Captura de escritorio](previews/inicio-desktop.png)
- [Captura móvil](previews/inicio-mobile.png)

## Fuentes consultadas

La tabla de [fuentes oficiales y validación](02-fuentes-y-validacion.md) contiene URLs, fecha, datos utilizados y discrepancias. Incluye páginas oficiales de BellaBot Pro, KettyBot Pro, CC1, SH1, T300, T600 y los catálogos de Pudu para PuduBot 2, SwiftBot, FlashBot y HolaBot. Estas fuentes verifican características del fabricante; no verifican stock de Botmate, representación autorizada ni derechos de reutilización.

La identidad visual se contrastó con el perfil de marca local y la carpeta LOGOS BOTMATE. No se descargó material audiovisual de los canales oficiales.

## Pruebas y límites

| Comprobación | Resultado |
| --- | --- |
| Compilación de producción, lint y tipos | Correctos; build genera 35 entradas |
| Rutas, títulos, descripciones, H1 y canonical | 27 rutas correctas |
| Enlaces e imágenes | 51 enlaces internos y 16 imágenes correctos |
| Retiradas y redirecciones | Cuatro rutas desconocidas/retiradas devuelven 404; aliases previstos redirigen |
| Accesibilidad automática | 14 rutas representativas a 390 y 1440 px, sin incidencias axe WCAG A/AA después de corregir contraste |
| Adaptación adicional | Inicio y contacto a 320 y 768 px, sin incidencias axe ni desbordamiento |
| Teclado | Menú/Escape, filtros y reinicio, comparación, revisión/edición y recuperación de foco del formulario comprobados |
| Formulario | Campos obligatorios bloquean avance; contexto del modelo y datos conservados al editar; enlace de WhatsApp inspeccionado sin enviar mensajes |
| Video | Cero solicitudes MP4 antes de activarlo; metadatos, controles y estado listo comprobados |
| Limpieza del cambio | `git diff --check` correcto |

El navegador automatizado se bloqueó al ensayar reproducción nativa del video en la pestaña activa. Quedan por verificar manualmente reproducción completa, pausa por visibilidad/cambio de preferencia y recuperación ante fallo de red. No se presentan esos ensayos como aprobados.

El build reporta **99.2 kB de JavaScript inicial para inicio** y **104 kB para catálogo**. Son tamaños de compilación, no mediciones de experiencia real. No se ejecutó Lighthouse sobre un despliegue ni se midieron Core Web Vitals de visitantes. La revisión automática de accesibilidad complementa, pero no sustituye, una evaluación con lector de pantalla y dispositivos reales.

Evidencia estructurada: [rutas](qa-routes.json) y [navegador](qa-browser.json). Repetir la comprobación de rutas con `node scripts/verify-site.mjs http://127.0.0.1:3006` después de iniciar producción; instrucciones en el README.

## Higgsfield

Se entregaron [tres guiones](03-guion-higgsfield.md), cada uno con objetivo, referencia, duración, formato, cámara y prompt. La consulta de modelo y estimación fue de solo lectura: primera prueba propuesta de 5 segundos, 3:4, 720p, 32.5 créditos estimados. No se subieron fotografías ni se consumieron créditos.

La producción está pendiente de confirmar los derechos de transformación y el modelo exacto de las referencias, como exige el brief. Cada resultado deberá conservar geometría y marcas; un clip deformado se descartará. La integración del futuro hero animado sigue pendiente de un resultado aprobado.

## Datos que necesita confirmar Botmate

1. ¿Cuáles de los diez modelos siguen comercializándose, en qué versiones y con qué nombres comerciales? ¿Qué material acredita el estatus de distribución que puede afirmarse públicamente?
2. ¿Se autoriza publicar el material local seleccionado, incluyendo personas y marcas visibles, y transformarlo en Higgsfield? ¿Qué licencia cubre las imágenes de catálogo existentes?
3. ¿Siguen vigentes el teléfono, correo, cobertura y servicios descritos? ¿Qué condiciones reales aplican a renta, instalación, capacitación, refacciones y soporte?
4. ¿Cuál es la razón social, domicilio y contacto para derechos de privacidad? Falta el aviso integral revisado: la página actual es un borrador informativo marcado `noindex`.

## Recomendaciones posteriores

Tras confirmar esos datos: cerrar contenido y aviso, producir y revisar una sola prueba de Higgsfield, completar la comprobación manual de video y revisar el sitio en iOS/Android. Después de autorizar el despliegue, medir rendimiento en el dominio real y configurar seguimiento de clics y prospectos con el manejo de datos acordado. Incorporar testimonios o casos únicamente con autorización, evidencia y resultados verificables. Si se requiere recepción real de formularios, definir CRM/destinatario, almacenamiento y confirmaciones antes de conectar un backend.

El servidor local de vista previa queda disponible mientras siga activo el proceso. Los cambios permanecen en el workspace, sin commit ni despliegue externo. `apps/vitala` no se modificó.
