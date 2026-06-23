# Vitala — Documento Fundacional

> **Misión:** que cualquier persona, sin importar su nivel económico, país o
> educación, acceda a orientación personalizada de nutrición, hábitos y
> bienestar. No construimos una app: construimos un movimiento global de salud
> accesible.
>
> **Visión:** mejorar la esperanza y la calidad de vida de cientos de millones
> de personas en la próxima década.

Este documento responde a los 15 entregables de la misión. La parte ya
**construida y funcional** en este repositorio está marcada con ✅; lo que
requiere tu acción (cuentas, pagos, publicación) está marcado con 🔑.

---

## 1. Nombre de la empresa

**Vitala** — de *vita* (vida). Corto, pronunciable en casi cualquier idioma, sin
connotaciones negativas conocidas, brandeable globalmente y con dominio/handle
plausibles (`vitala.health`, `@vitala`).

## 2. Identidad de marca

- **Esencia:** salud accesible, cálida, basada en evidencia, sin culpa.
- **Tagline:** *"Un nutriólogo para todos. Una moneda. Para toda la vida."*
- **Paleta:** verde fresco `#16A34A` (vida/salud), ámbar `#F59E0B` (la moneda /
  calidez), fondo verde-negro `#06120C`.
- **Tono:** humano, claro, motivador, nunca alarmista ni culpabilizador.
- **Símbolo:** hoja + moneda (ver `public/vitala/icon.svg`).
- Implementado en `lib/vitala/brand.ts`.

## 3. Producto MVP ✅

Disponible hoy en `/vitala`:

- **Onboarding seguro** que captura datos, **alergias**, condiciones médicas,
  medicamentos y embarazo/lactancia (gating legal antes de recomendar).
- **Generador de plan** con cálculo de BMR (Mifflin-St Jeor), TDEE, calorías
  objetivo con **piso de seguridad**, macros e hidratación.
- **Plan semanal** de comidas filtrado por alergias y preferencia
  (omnívora/vegetariana/vegana/pescetariana/keto/mediterránea).
- **Hub de bienestar:** hábitos atómicos, micro-prácticas emocionales,
  educación (mitos vs. evidencia) y motivación diaria.
- **PWA instalable** en iPhone/Android (manifest + íconos).
- **Privacidad por diseño:** los datos viven en el dispositivo del usuario.

## 4. Arquitectura técnica ✅ (MVP) / 🔑 (escala)

**Hoy (MVP, sin backend, desplegable en minutos):**
- Next.js 14 (App Router) + TypeScript + Tailwind, PWA.
- Motor de nutrición 100% local y determinista (`lib/vitala/*`): funciona
  offline, sin costos de API, sin filtración de datos.

**Escala (cuando crezca el tráfico):**
- **Backend:** Supabase/Postgres (auth, datos cifrados, RLS por usuario).
- **IA:** capa de orientación con Claude (Anthropic) tras un *guardrail* de
  seguridad clínica; respuestas con citas y disclaimers.
- **Infra:** Vercel (web/edge) + almacenamiento de objetos; observabilidad y
  *feature flags*.
- **Privacidad:** cifrado en reposo y tránsito, consentimiento explícito,
  minimización de datos, cumplimiento GDPR / LFPDPPP (México) / HIPAA-aware.

## 5. Aplicación iOS 🔑

La PWA ya se instala desde Safari ("Agregar a pantalla de inicio"). Para la App
Store se empaqueta con **Capacitor** (envuelve la misma web en un binario
nativo). Requiere de tu parte: cuenta **Apple Developer** (99 USD/año), y una
revisión de Apple de 1–3 días. Pasos detallados en el README de despliegue.

## 6. Aplicación Android 🔑

Misma base con Capacitor → **Google Play** (cuenta única 25 USD). Alternativa
inmediata: **TWA** (Trusted Web Activity) que publica la PWA como app.

## 7. Plataforma web ✅

Ya está viva en `/vitala` dentro de este proyecto Next.js, lista para Vercel.

## 8. Sistema de IA 🔑

- **MVP:** lógica determinista basada en reglas y fórmulas clínicas (sin IA
  generativa) → seguro, explicable, gratis.
- **V2:** asistente conversacional con Claude que:
  1. Pasa por un *guardrail* que bloquea diagnósticos y deriva a profesionales.
  2. Responde con base en lineamientos (OMS, guías locales) y disclaimers.
  3. Nunca recomienda sin conocer alergias/condiciones.

## 9. Sistema de personalización nutricional ✅

`lib/vitala/nutrition.ts` + `planner.ts` + `meals.ts`: cálculo individualizado y
selección de comidas por perfil, meta, alergias y preferencia. Extensible a más
alimentos, cocinas regionales y objetivos (rendimiento, salud metabólica).

## 10. Sistema de hábitos ✅

`lib/vitala/wellness.ts` (`HABITS`): hábitos atómicos con *anclaje* (cue) por
pilar (nutrición, movimiento, sueño, mente, hidratación). Roadmap: rachas,
recordatorios y seguimiento.

## 11. Sistema de bienestar emocional ✅

`PRACTICES`: respiración 4-7-8, "tres cosas buenas", anclaje 5-4-3-2-1. Marco
educativo y de regulación; **no** terapia. Roadmap: derivación a líneas de ayuda
locales y check-ins de ánimo.

## 12. Estrategia de crecimiento global

- **Producto viral por diseño:** plan compartible, retos de hábitos, referidos.
- **Localización agresiva:** idiomas y cocinas regionales; precio = 1 moneda
  local (poder adquisitivo respetado).
- **Alianzas:** ONGs de salud pública, gobiernos, aseguradoras, escuelas.
- **Contenido/SEO + creadores** de salud por región.
- **Distribución de bajo costo:** PWA primero (sin fricción de tienda) +
  WhatsApp como canal en mercados emergentes.

## 13. Estrategia de monetización ética

- **Acceso de por vida por 1 moneda local** (símbolo de inclusión, no barrera).
- **Sostenibilidad sin excluir:**
  - *Vitala+* opcional (consultas con nutriólogos reales, planes avanzados,
    sincronización familiar).
  - **B2B2C:** empresas/aseguradoras/gobiernos pagan por dar acceso a su gente.
  - Donaciones "paga lo que puedas" para subsidiar a quien menos tiene.
- **Nunca:** vender datos de salud ni publicidad invasiva.

## 14. Estrategia de lanzamiento

1. **Beta PWA** (esta semana) en un país piloto (México), feedback rápido.
2. **Localización** y campaña con creadores de salud.
3. **Apps en tiendas** (Capacitor) una vez validada la retención.
4. **Alianza institucional** ancla para credibilidad y alcance.

## 15. Roadmap a 10 años

- **Año 1:** PWA + apps, nutrición + hábitos + bienestar, 1–3 idiomas, primer
  país. Validar retención y seguridad.
- **Años 2-3:** IA conversacional con guardrails, sincronización en la nube
  cifrada, *Vitala+*, 10+ idiomas, alianzas de salud pública.
- **Años 4-6:** integración con wearables y biomarcadores, prevención
  personalizada, red de nutriólogos/coaches verificados, presencia en decenas de
  países.
- **Años 7-10:** plataforma de salud preventiva poblacional, investigación con
  datos anonimizados y consentidos, impacto medible en indicadores de salud de
  cientos de millones de personas.

---

## Restricciones que respetamos siempre

- ❌ Nunca diagnosticamos. ❌ Nunca reemplazamos profesionales.
- ✅ Cumplimiento legal (GDPR/LFPDPPP/HIPAA-aware). ✅ Seguridad del usuario
  primero. ✅ Decisiones con base en evidencia científica.

## Qué necesito de ti (🔑) para los pasos que no puedo hacer solo

Por seguridad **no manejo tus contraseñas ni creo cuentas a tu nombre** (requieren
verificación humana). Tú creas las cuentas y, cuando toque, pones las llaves como
variables de entorno. Necesitaremos, cuando decidas avanzar:

1. **Apple Developer** (99 USD/año) y **Google Play Console** (25 USD único) — para tiendas.
2. **Dominio** (p. ej. `vitala.health`) y proyecto en **Vercel** (deploy de la PWA, gratis para empezar).
3. **Handles de redes** (Instagram/TikTok/Facebook/X) creados por ti; yo preparo el plan de contenido y la bio.
4. **WhatsApp Business / Wati** (opcional, para soporte) — alta a tu nombre.
5. (V2) **API key de Anthropic** para el asistente con IA — se configura como variable de entorno, nunca en el código.
