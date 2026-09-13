# Botmate: auditoría y propuesta de rediseño

Fecha: 13 de septiembre de 2026 (UTC). Revisión local, sin publicación.

## Alcance y hallazgos antes de editar
Se revisaron las rutas Inicio, catálogo y sus 10 fichas, renta, venta, refacciones, sectores, nosotros, contacto, blog y 6 artículos, casos y 6 detalles, navegación, pie, formularios, metadatos, sitemap y componentes de portada. Captura inicial: `/tmp/botmate-audit/before-desktop.png`.

| Área | Evidencia | Decisión |
|---|---|---|
| Inicio | Más de 20 bloques, catálogo duplicado, carrusel, calculadora, múltiples videos y CTAs | Reducir a propuesta, soluciones, catálogo, evidencia visual, proceso, FAQ y contacto |
| Identidad | Fondo casi negro, auroras y cursor, SVG recreado con texto que se recorta | Fondo blanco/gris; wordmark de carpeta de marca sin redibujar |
| Catálogo | Pudu renombrado como fabricante BotMate; SLAM, OS y aplicaciones atribuidas a Botmate | Nombres de fabricante como referencia, conservar URLs; disponibilidad por confirmar |
| Fichas | `InStock`, 4.9 y 127 reseñas sin evidencia; macros y videos inexistentes | Retirar ofertas/rating y referencias rotas; fuentes por modelo |
| SH1 | Se presenta como robot de limpieza autónoma nocturna | Corregir a fregadora vertical operada por una persona |
| HolaBot | La imagen `botmate-carry.jpg` muestra otro tipo de equipo | No usar esa imagen en la ficha |
| Renta / venta | $9,800, descuentos, reemplazos en 24 h, garantía 4 años, entrega 48–72 h, 89% deducible | Retirar cifras y condiciones sin documentación comercial/fiscal |
| Nosotros | 500 robots, 80 clientes, uptime 99.7%, equipo representado por iniciales | Presentar enfoque de trabajo sin escala ni equipo inventados |
| Casos / testimonios | 6 clientes genéricos, nombres de personas y métricas sin fuentes | Retirar del contenido público; no presentar fotos como aval de resultados |
| Blog | Cifras de mercado, ROI y deducciones sin citas | Reemplazar por guías de evaluación sin resultados prometidos; mantener enlaces antiguos relevantes |
| Contacto | Promesa de respuesta; formulario abre WhatsApp, sin servidor | Flujo explícito de preparar mensaje, revisar y abrir WhatsApp; no fingir entrega |
| Newsletter | Muestra éxito pero no guarda ni envía | Retirar suscripción ficticia |
| Privacidad | Footer usa enlace `#`; GA/Meta se cargan si existen IDs, sin gestión de preferencia | Página provisional informativa; tracking desactivado hasta tener aviso aprobado |
| Accesibilidad | FAQ sin estado expandido; menú sin controles completos; H2 en páginas sin H1; animaciones sin fallback | HTML semántico, foco visible, menú accesible, movimiento reducido |
| SEO | Canonical global heredado, SearchAction de ruta inexistente, localización exacta no validada | Canonical por ruta, schema mínimo factual y títulos únicos |

## Inventario
149 recursos de `public`, `LOGOS BOTMATE`, `IMAGENES BOTMATE` y `fotos botmate`. 8 duplicados exactos detectados entre archivos con hash; los videos mayores de 50 MB no se hashearon inicialmente. Inventario detallado con dimensiones, peso, duración, orientación y codec en `media-inventory.json`. La orientación de videos requiere aplicar la rotación del contenedor antes de exportar. Los videos externos al proyecto suman más de 2 GB junto con los locales. No se inspeccionaron documentos personales o financieros de las carpetas encontradas.

Revisión visual de 5 hojas de contacto. Fotos oscuras/repetidas de estadio, capturas técnicas y clips con desenfoque no se priorizan. Materiales reales: DSC00151, DSC00193, DSC00205, DSC00209, DSC00491, DSCF5002, IMG_2949 y videos de servicio. Clips de escenario nocturno anteriores no tienen trazabilidad suficiente para presentarse como instalaciones reales. Los archivos existentes del catálogo tampoco prueban por sí mismos licencia ni modelo exacto.

## Arquitectura propuesta
- Inicio: valor comercial → 3 soluciones → selección de modelos → fotografía de campo → acompañamiento → FAQ → demostración.
- Robots: búsqueda, filtros por aplicación y comparación; detalle con aplicaciones y ficha de referencia enlazada.
- Soluciones por industria: restaurante, hotel, retail/eventos, oficinas, instalaciones industriales y salud (solo aplicaciones generales, sin promesas clínicas).
- Servicios: evaluación, implementación, capacitación y soporte; renta, compra y refacciones con consultas contextualizadas.
- Botmate: enfoque y relación entre comercialización local y fabricante.
- Recursos: guías propias de evaluación; galería sin resultados atribuidos ni testimonios sin aprobación.
- Contacto: un formulario breve, conserva robot/interés, revisión antes de WhatsApp.
- Privacidad: información transparente del flujo actual y borrador legal por completar antes de publicar.

## Dirección visual
Blanco `#FFFFFF`, gris suave `#F5F6F8`, texto grafito `#202326`, índigo Botmate `#5161FF` documentado en `creacion de contenido/BOTMATE/01_identidad/brand_profile.md`. Manrope. Titulares grandes, alineación editorial, líneas finas y espacios amplios. Profundidad mediante marcos, planos desplazados y sombras suaves. No se recolorea ningún logotipo; no se reproduce el diseño web de Pudu. Los colores del fabricante se conservan en sus productos.

## Datos que requieren respuesta del propietario
1. Catálogo comercial vigente y equivalencias de nombres Botmate/Pudu; versión exacta por foto.
2. Documento de distribución y alcance territorial; no se publica “distribuidor autorizado” sin respaldo.
3. Licencias de fotografía de producto, derechos de transformación para Higgsfield y autorizaciones de imagen/marca de terceros visibles.
4. Teléfono, correo, cobertura, domicilio, garantías, tiempos, precios y alcance de soporte.
5. Razón social, domicilio del responsable, finalidades, canal ARCO y aviso de privacidad aprobado.
6. Casos, metodología de métricas y testimonios con autorización de publicación.

Las preguntas de catálogo y materiales se presentaron antes de comenzar la implementación. La falta de respuesta no se interpreta como permiso para publicar ni para subir referencias a Higgsfield.
