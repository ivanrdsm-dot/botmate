# Botmate × Pudu Robotics: investigación e implementación

Actualización vigente: [navegación dentro de Botmate, equipo mexicano y cobertura industrial](02-navegacion-equipo-mexico.md). El informe de abajo documenta la primera entrega; los enlaces de salida y las cifras de páginas fueron modificados posteriormente.

Fecha de consulta: 13 de septiembre de 2026. Fuentes públicas oficiales de Pudu Robotics. El usuario declara ser distribuidor oficial y contar con autorización comercial para imágenes y publicidad.

## Cobertura

Se consultaron 113 páginas/variantes de idioma. El inventario corresponde a los recursos descubiertos en estas páginas; no supone haber agotado cada entrada histórica del archivo de noticias de Pudu.

| Sección de Pudu | Aplicación en Botmate |
| --- | --- |
| [Inicio](https://www.pudurobotics.com/en) | Cuatro líneas de producto, imágenes de referencia, 30 logos, ocho testimonios resumidos y cifras globales atribuidas. |
| [Productos](https://www.pudurobotics.com/en/products) | 27 modelos/variantes; fichas en español e inglés, filtros, búsqueda y comparación de hasta tres modelos. |
| Soluciones por industria | Diez áreas, con escenas y modelos publicados por Pudu. Cada ficha enlaza su fuente concreta. |
| [Accesorios](https://www.pudurobotics.com/en/accessory) | 28 accesorios y filtro por compatibilidad publicada. Una pieza sin modelo explícito requiere consulta por versión. |
| Casos internacionales | Nueve adaptaciones editoriales: Food Bayana, Skylark, Smile Park, fábrica de baterías anónima, MediaMarkt, Xtreme, Parkhotel, Meritum y MNACTEC. |
| [Noticias y blogs](https://www.pudurobotics.com/en/news?tab=blog) | Revisión de noticias y lanzamientos; cinco guías nuevas de Botmate con fuentes, además de cinco guías existentes traducidas. |
| [Descargas](https://www.pudurobotics.com/en/download) | Biblioteca con 27 PDF oficiales, enlazados al fabricante. |
| Pudu Care, manuales, plataforma e información corporativa | Recursos oficiales enlazados y distinción entre soporte del fabricante y alcance contratado con Botmate. |

Las diez áreas son restaurantes/alimentos, retail, hoteles, manufactura/almacenes, salud/cuidados, transporte, entretenimiento/deportes, edificios/inmobiliario, educación y servicios públicos.

## Recursos descargados y publicados

- Archivo local: **1,398 recursos**, **2,524,529,956 bytes**, sin descargas fallidas: 671 WebP, 357 PNG, 161 SVG, 116 MP4, 46 JPG, dos JPEG, 18 GIF y 27 PDF.
- Los originales están en `.pudu-source/originals/`, fuera de Git y del sitio. El mapa de URL, archivo y página de origen está en `media-inventory.json` y `archive-report.json`.
- Se prepararon **164 imágenes WebP** para web, conservando proporciones y transparencias. Máximo 1800 × 1400, sin ampliar artificialmente fuentes pequeñas. Se conserva también una copia del logo de Pudu con nombre estable.
- **22 clips únicos** cubren 24 modelos/variantes. Son extractos de hasta 18 segundos de videos oficiales, sin audio, de hasta 1280 × 720, proporción intacta y descarga progresiva. Dos pares de variantes comparten el video de su familia. Los 116 MP4 completos permanecen en el archivo local.
- Las fichas presentan los robots completos con `object-fit: contain`. Los fondos editoriales y las tarjetas de industria usan encuadres de composición; los archivos originales se conservan.
- Se mantienen los cuatro videos previos de Higgsfield y las fotos reales de activaciones de Botmate. No se generaron activaciones ficticias de clientes para esta ampliación de Pudu.

## Atribución y precisión comercial

- Los 30 logos son referencias de la red que Pudu presenta en su página. No se atribuyen contratos, clientes o avales directos de esas marcas a Botmate.
- Las cifras 130,000+ unidades, 85+ países/regiones y 1,000+ centros pertenecen a Pudu. La página visible mostraba cifras más recientes que algunos datos estructurados antiguos; se utilizó la versión visible y se fechó la consulta.
- Los ocho testimonios son síntesis editoriales identificadas como tales, con enlace a la fuente; no son citas textuales ni reseñas de Google de Botmate.
- La disponibilidad, configuración, implementación, garantía y soporte en México se confirman con Botmate. No se inventan inventario, precios, certificaciones locales ni resultados de proyectos.
- El caso Skylark describe el plan de incorporación publicado en su momento; no convierte una previsión en una cifra de instalaciones completadas.
- SH1 se identifica como fregadora con operador. Las demostraciones de IA física distinguen capacidades en desarrollo del alcance comercial confirmado.
- Los casos con generaciones anteriores no se presentan como prueba de que se desplegó la versión actual. SwiftBot, FlashBot y HolaBot conservan páginas históricas y sus equivalentes en inglés.
- El perfil de Google Maps de Botmate sigue sin enlace confirmado. No se creó una calificación o reseña ficticia. El SEO técnico no garantiza una posición en Google.

## Arquitectura y conversión

Español en las rutas principales; inglés en `/en`, con equivalentes de catálogo, industrias, casos, accesorios, guías, servicios, renta, compra, reservas, contacto y privacidad. Hay 144 URLs indexables con canonical y alternativas de idioma; las páginas de privacidad permanecen fuera del índice.

El calendario autorizado es [la agenda de Botmate](https://calendar.app.google/DMgTiWSSM7ERKEmA6). El iframe se carga después de que el visitante pulse el botón. Consultas de modelos/refacciones conservan el artículo seleccionado en el contacto. No se envían mensajes automáticamente.

La portada usa renders oficiales, transición manual entre modelos, profundidad visual por capas, órbitas y secuencias oficiales. Los videos decorativos responden a visibilidad, ahorro de datos, preferencia de movimiento reducido y pausa global. La CSP mantiene nonces únicos y medios locales; no se añadieron rastreadores.

## Reproducción y comprobación

1. `python3 scripts/archive-pudu.py` recupera los originales del inventario existente.
2. Con las capturas de páginas en `.pudu-source/`: `prepare-pudu.py`, `curate-pudu.py`, `optimize-pudu.mjs`, `pudu-video-previews.py` y `finalize-pudu-data.py`, en ese orden, reconstruyen los datos y medios. La optimización requiere Sharp; los clips requieren FFmpeg. No se deben regenerar datos sin revisar cambios posteriores del fabricante.
3. `npm run lint` y `npm run build` validan código y compilación.
4. `node scripts/verify-site.mjs <base>` revisa sitemap, 144 páginas, idiomas, títulos, canonical, enlaces, imágenes, videos, redirecciones, rutas retiradas y atribución.
5. `node scripts/verify-security.mjs <base>` comprueba nonces, CSP, encabezados, carga voluntaria del calendario y reproducción por rangos.

Los resultados locales están en `routes-qa.json`, `security-qa.json` y `browser-qa.json`. La revisión de navegador cubre móvil de 390 px, ficha de limpieza sin cortes, cambio de idioma conservando modelo, comparación de tres robots, búsqueda sin resultados, filtro de refacciones, reproducción real de video y apertura de calendario.
