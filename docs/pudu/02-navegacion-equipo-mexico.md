# Navegación propia, equipo mexicano y cobertura industrial

Actualización del 13 de septiembre de 2026, posterior a la primera publicación Pudu.

## Contenido dentro de Botmate

Se retiraron los enlaces de salida a los dominios de Pudu de fichas, logos, cifras, testimonios, casos, artículos y recursos. Se conserva la atribución textual al fabricante y la trazabilidad de fuentes en los datos y documentos del repositorio.

Los 27 PDF originales se sirven desde `/documentos/pudu/` en el dominio de Botmate; conservan su contenido original en inglés. Los artículos y las fichas del sitio tienen versiones en español e inglés. Las únicas salidas necesarias para contacto y reservas siguen siendo WhatsApp, correo y Google Calendar.

La biblioteca lista ahora 13 artículos bilingües: cinco guías anteriores, cinco guías Pudu ampliadas y tres publicaciones nuevas sobre el equipo de Botmate, cargas pesadas y jardinería. Los ocho artículos de la colección nueva tienen entre cinco y seis párrafos de contenido propio/adaptado y navegación interna.

## Equipo e identidad

Por instrucción directa del usuario, se identifica a Ivan Cadavieco como coordinador del equipo de Botmate. La portada, Nosotros y un artículo propio desarrollan una visión de modernización industrial de México basada en talento mexicano, colaboración con operadores y responsables de planta, diagnóstico, integración y preparación de equipos.

El usuario declaró: «somos los primeros en México en modernizar las plantas de fábricas que hay en este país». Esta declaración queda registrada para su investigación, no publicada como una primicia nacional verificada. Se solicitó la primera planta/proyecto, fecha y aplicación concreta para delimitar y respaldar la afirmación. No se inventaron nombres de clientes, instalaciones realizadas, fechas, resultados o cargos adicionales del equipo.

## Cobertura de robots

Se mantienen los 27 modelos/variantes del catálogo actual y las fichas históricas existentes. La portada incorpora seis modelos destacados, comenzando con MP2000, e identifica explícitamente:

- Jardinería y césped: GT3, GT5 y GT7.
- Logística y carga: T150, T300, T600, T600 Underride y MP2000.
- El resto del catálogo permanece accesible mediante filtros y fichas en ambos idiomas.

Hay 11 áreas de aplicación: las diez anteriores y jardinería/grandes exteriores. Esta última es una organización editorial de Botmate basada en la familia GT; no se afirma que sea una undécima industria oficial del menú de Pudu. La página industrial también incorpora las familias de carga que faltaban en su selección de modelos.

## Validación y mantenimiento

El sitemap contiene 152 páginas. `verify-pudu.mjs` comprueba ausencia de enlaces de salida a Pudu en las páginas públicas, existencia de los modelos de carga/jardinería en ambos idiomas, enlaces de la biblioteca, PDF locales y presencia del coordinador. Se mantienen los controles de seguridad existentes.

Los scripts de importación de la primera entrega son utilidades históricas: regenerar directamente el catálogo o las historias con ellos sobrescribiría las ampliaciones editoriales. Los archivos `lib/pudu-catalog.json` y `lib/pudu-stories.json` versionados son la referencia vigente; cualquier reimportación debe reconciliar estos cambios y ejecutar la verificación antes de publicar.
