# BLUEPRINT.md — Vitala

> Plano de arquitectura y seguridad. Generado con la metodología de El Arquitecto (16 secciones).
> Estado: Vitala ya está construida y desplegada en Vercel (branch `vitala`). Este plano
> formaliza la arquitectura existente y define el ORDEN DE CONSTRUCCIÓN (sección 09)
> de los bloques de seguridad PENDIENTES. El constructor debe seguir ese orden.

---

## 01 · Visión del Proyecto

**Vitala** — salud accesible para toda la humanidad. App global de nutrición y bienestar:
planes de alimentación personalizados (Mifflin-St Jeor), recetario del mundo con preparación
paso a paso, coach IA con guardrails clínicos, diario con análisis de foto, progreso.

**Modelo:** acceso de por vida por UNA moneda del país del usuario ("1 peso, para siempre").
**Target:** B2C global, español primero, LATAM-first.
**Principios innegociables:** privacidad por diseño (local-first), cero diagnósticos médicos,
seguridad desde el inicio, nadie excluido por dinero.

**Métricas de éxito:** onboarding completado > 60%; plan generado en < 3 s; 0 incidentes de
fuga de datos de salud; aprobación App Store a la primera o segunda revisión.

---

## 02 · Tech Stack

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | SSR + API routes en un solo deploy; tipado estricto |
| UI | Tailwind CSS + Framer Motion | Diseño cálido custom; animaciones Reveal/Aurora |
| Auth + DB | Supabase (Postgres + RLS + OAuth) | RLS nativo por fila; Google + Apple sin backend propio |
| IA | Claude API (claude-haiku-4-5, REST directo) | Costo/escala; visión para fotos; sin SDK = menos superficie |
| Pagos | Mercado Pago + Stripe (REST directo) | MP para LATAM, Stripe global; sin SDKs |
| Móvil | Capacitor 6 | PWA → App Store / Play Store con Apple Sign-In nativo |
| Hosting | Vercel (branch `vitala`, root `./`) | Deploy automático por push |

---

## 03 · Estructura de Directorios

```
/                         # raíz = app Vitala (branch vitala)
├─ app/
│  ├─ layout.tsx          # navbar/footer cálidos, fuentes, metadata
│  ├─ page.tsx            # landing con manifiesto de marca
│  ├─ globals.css         # paleta cálida, helpers .card/.btn-brand/.badge-amber
│  ├─ onboarding/         # perfil de salud + consentimiento
│  ├─ plan/               # plan semanal generado
│  ├─ recetas/            # recetario del mundo (33 platillos, pasos)
│  ├─ diario/             # diario de comidas + foto
│  ├─ progreso/           # peso/medidas, gráfica SVG nativa
│  ├─ coach/              # chat coach IA
│  ├─ bienestar/          # hábitos, prácticas, educación
│  ├─ cuenta/             # login, sync, borrado, (NUEVO: exportar datos)
│  ├─ uno-peso/           # pago acceso de por vida
│  ├─ legal/              # aviso de salud + privacidad
│  └─ api/
│     ├─ coach/route.ts             # Claude + guardrails (público, rate-limited)
│     ├─ analyze-food/route.ts      # Claude visión (público, rate-limited)
│     ├─ checkout/route.ts          # MP → Stripe → demo (rate-limited)
│     ├─ account/delete/route.ts    # borrado 5.1.1(v) (auth requerida)
│     ├─ account/export/route.ts    # [BLOQUE 4] portabilidad de datos
│     └─ webhooks/
│        ├─ mercadopago/route.ts    # [BLOQUE 2] confirma pago → otorga membresía
│        └─ stripe/route.ts         # [BLOQUE 2] idem con verificación de firma
├─ lib/
│  ├─ brand.ts, types.ts, nutrition.ts, meals.ts, planner.ts
│  ├─ wellness.ts, diary.ts, progress.ts, store.ts, entitlement.ts
│  ├─ supabase.ts, useUser.ts
│  └─ ratelimit.ts        # [BLOQUE 3] helper de rate limiting
├─ components/            # Reveal, VitalaAurora
├─ public/vitala/         # íconos, manifest, og
├─ supabase/setup.sql     # esquema + RLS + anonymize_user (+ bloques 1-3)
└─ BLUEPRINT.md           # este archivo
```

Nota: `app/(site)/` y varios `lib/`/`components/` son restos nulos de BotMate (branch padre).
No se tocan ni se importan; `next.config.js` ignora sus errores de tipos. No agregar código ahí.

---

## 04 · Modelo de Datos

### Existentes

**profiles** — perfil de salud (JSONB `data`), `user_id uuid FK auth.users ON DELETE SET NULL`,
`updated_at`, `deleted_at`. Índice único parcial sobre `user_id`.

**memberships** — `user_id` (misma FK desacoplada), `lifetime boolean`, `granted_at`, `deleted_at`.

### Nuevas (orden de construcción)

**payment_events** [BLOQUE 1] — idempotencia y auditoría de webhooks (sin datos personales):
```sql
create table payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('mercadopago','stripe')),
  external_id text not null,          -- payment id / session id del proveedor
  user_id uuid,                        -- a quién otorga (nullable)
  status text not null,
  raw_status text,
  processed_at timestamptz default now(),
  unique (provider, external_id)       -- idempotencia: un evento se procesa UNA vez
);
```
Sin RLS de lectura para clientes: tabla 100% server-side (service_role únicamente).

**rate_limits** [BLOQUE 3] — ventana fija en Postgres (sin servicios extra):
```sql
create table rate_limits (
  key text primary key,               -- p.ej. 'coach:user:<id>' o 'coach:ip:<hash>'
  window_start timestamptz not null,
  hits int not null default 1
);
```
+ función `check_rate_limit(p_key, p_window_secs, p_max) returns boolean` (security definer,
atomica: resetea ventana vencida o incrementa; revocada a anon/authenticated).

**Consentimiento** [BLOQUE 4] — dentro del JSONB del perfil: `consent: { version, acceptedAt }`.

**community_posts** — muro de logros: `user_id` (FK SET NULL), `display_name` (≤40), `message`
(≤500), `stats` jsonb, `created_at`, `deleted_at`. RLS: SELECT público (no borrados); INSERT
solo servidor tras moderación. `anonymize_user()` también anonimiza `display_name`.

### Relaciones
`auth.users 1⅄0..1 profiles`, `auth.users 1⅄0..1 memberships` — ambas sobreviven al borrado
de identidad como cascarón anónimo (SET NULL + anonymize_user previo).

---

## 05 · Diseño de API

| Ruta | Método | Auth | Rate limit | Descripción |
|---|---|---|---|---|
| `/api/coach` | POST | opcional | 20/h user · 10/h IP anón | Chat IA. Guardrail de emergencia ANTES del modelo. Degrada sin API key |
| `/api/analyze-food` | POST | opcional | 15/h user · 6/h IP anón | Visión IA. Imagen SOLO en memoria, nunca persiste |
| `/api/checkout` | POST | opcional | 5/h IP | MP → Stripe → demo. Devuelve `{url}` o `{demo:true}` |
| `/api/webhooks/mercadopago` | POST | firma/re-consulta | — | Re-consulta el pago a la API de MP con el access token; si `approved` → otorga membresía |
| `/api/webhooks/stripe` | POST | firma HMAC | — | Verifica `stripe-signature` con `STRIPE_WEBHOOK_SECRET`; `checkout.session.completed` → otorga |
| `/api/account/delete` | POST | Bearer token | 3/día user | Verifica `auth.getUser(token)` → `anonymize_user()` → `deleteUser()` |
| `/api/account/export` | GET | Bearer token | 5/día user | Devuelve JSON con perfil + membresía del usuario autenticado |
| `/api/analyze-body` | POST | opcional | 5/h user · 3/h IP | Visión IA de fotos de progreso. Guardrails anti-diagnóstico y anti-body-shaming. Foto SOLO en memoria |
| `/api/community/post` | POST | Bearer token | 5/día user | Publica en comunidad tras moderación de texto (reglas + IA) y de FOTO (IA visual, fail-closed). El cliente nunca inserta directo |
| `/api/community/report` | POST | Bearer token | 10/día user | Reporta un post (App Store 1.2); a los 3 reportes se auto-oculta |

Errores: JSON `{error}` con 400/401/429/500/502. Los webhooks SIEMPRE responden 200 tras
registrar el evento (aunque se ignore) para evitar reintentos infinitos, salvo firma inválida (401).

---

## 06 · Arquitectura Frontend

Páginas: landing, onboarding, plan, recetas, diario, progreso, coach, bienestar, cuenta,
uno-peso, legal. Estado: localStorage-first (`lib/store.ts`, `lib/diary.ts`, `lib/progress.ts`);
sync opcional a Supabase al iniciar sesión. Sin librería de estado global. Gráficas: SVG nativo.
Componentes animados: `Reveal` (scroll), `VitalaAurora` (fondo).

---

## 07 · Sistema de Diseño

Paleta cálida (en `lib/brand.ts` + `globals.css`): brand `#34D399`, brandLight `#6EE7B7`,
accent ámbar `#FBBF24`, fondo `#080F0A` con glows radiales verdes/ámbar. Texto `#ECFDF5`.
Fuentes: Inter (texto) + Plus Jakarta Sans (display). Helpers: `.card`, `.btn-brand`,
`.badge-amber`, `.glow`. Tono: cálido, humano, español claro, emojis con moderación.

---

## 08 · Auth y Autorización

**Identidad:** Supabase Auth. OAuth **Google** + **Sign in with Apple** (App Store 4.8).
Flujo **PKCE**, JWT + refresh automático. iOS nativo (Capacitor): Apple Sign-In nativo con
**nonce hasheado** (SHA-256 a Apple, raw a Supabase). Sin contraseñas propias.
La app funciona SIN cuenta (modo local); la cuenta habilita sync y borrado.

**Roles:**
- `anon` (sin sesión): páginas públicas, coach/análisis rate-limited por IP. Cero acceso a tablas.
- `authenticated`: SELECT/INSERT/UPDATE de **sus** filas en `profiles` vía RLS `auth.uid() = user_id`.
  En `memberships`: **SOLO SELECT** de la suya — INSERT/UPDATE revocados [BLOQUE 1].
- `service_role` (solo servidor): borrado de cuenta, otorgar membresías (webhooks), rate limits.
  JAMÁS en el cliente ni en variables `NEXT_PUBLIC_*`.

**Matriz:**
| Acción | anon | authenticated | service_role |
|---|---|---|---|
| Leer/editar mi perfil | ✖ | ✔ (solo propio) | ✔ |
| Leer mi membresía | ✖ | ✔ (solo propia) | ✔ |
| Otorgar membresía | ✖ | ✖ | ✔ (solo webhooks) |
| Borrar/anonimizar cuenta | ✖ | vía endpoint con token | ✔ |
| Coach / análisis de foto | ✔ (limitado) | ✔ (limitado) | — |

---

## 09 · ORDEN DE CONSTRUCCIÓN (lo pendiente, en secuencia estricta)

> Lo ya construido (páginas, motor nutricional, recetario, coach, borrado de cuenta, checkout
> básico, diseño) NO se reconstruye. Estos bloques cierran la seguridad diseñada.

**BLOQUE 1 — Endurecer la base de datos** (sin dependencias)
1. `supabase/setup.sql`: revocar INSERT/UPDATE de `memberships` al rol `authenticated`
   (eliminar políticas "crear/editar mi membresia"; queda solo SELECT propia).
2. Crear tabla `payment_events` (idempotencia, server-only).
3. Función `grant_lifetime_membership(p_user_id uuid)` security definer, revocada a
   anon/authenticated — único camino para otorgar `lifetime`.
✅ Criterio: un usuario autenticado NO puede darse membresía desde el cliente.

**BLOQUE 2 — Webhooks de pago** (depende de 1)
1. `/api/checkout`: incluir `user_id` (si hay sesión) en `external_reference` (MP) /
   `client_reference_id` (Stripe) y `metadata`.
2. `/api/webhooks/stripe`: verificar firma HMAC-SHA256 con `STRIPE_WEBHOOK_SECRET`
   (timestamp + tolerancia 5 min); en `checkout.session.completed` → registrar en
   `payment_events` (idempotente) → `grant_lifetime_membership`.
3. `/api/webhooks/mercadopago`: recibir notificación, RE-CONSULTAR `/v1/payments/{id}` con el
   access token (nunca confiar en el body), si `approved` → idem.
4. `/uno-peso` y `lib/entitlement.ts`: el estado "de por vida" en la nube viene de LEER
   `memberships` (no de escribirla). El unlock local (demo/simbólico) queda como estado
   de dispositivo claramente etiquetado, no como membresía verificada.
✅ Criterio: membresía cloud solo existe tras webhook verificado; reenvío del mismo evento no duplica.

**BLOQUE 3 — Rate limiting** (depende de 1)
1. SQL: tabla `rate_limits` + `check_rate_limit()` atómica (security definer, revocada).
2. `lib/ratelimit.ts`: helper server-side — claves `ruta:user:<id>` / `ruta:ip:<sha256(ip+salt)>`
   (IP hasheada: no guardar IPs crudas). Fail-open con log si la DB no responde.
3. Aplicar límites de la sección 05 en coach, analyze-food, checkout, delete, export → 429 con
   mensaje amable en español.
✅ Criterio: ráfaga de requests al coach devuelve 429 sin llamar a Claude.

**BLOQUE 4 — Derechos de datos** (depende de 1)
1. `/api/account/export` (GET, Bearer): JSON con perfil + membresía + fecha → descarga
   `vitala-mis-datos.json` desde `/cuenta`.
2. Consentimiento versionado: al aceptar el aviso en onboarding guardar
   `consent: { version: 'v1-2026-07', acceptedAt }` en el perfil (local y nube).
✅ Criterio: usuario logueado descarga sus datos; el perfil registra qué versión aceptó y cuándo.

**BLOQUE 5 — Verificación y despliegue**
1. `npm run build` limpio. 2. Probar flujos: pago → webhook → membresía; 429; export; borrado.
3. Configurar URLs de webhook en dashboards MP/Stripe + `STRIPE_WEBHOOK_SECRET` en Vercel.
4. Actualizar `/legal` si cambia lo recolectado.

---

## 10 · Setup del Entorno

Variables (Vercel → proyecto `vitala`):
```
NEXT_PUBLIC_SUPABASE_URL          # pública
NEXT_PUBLIC_SUPABASE_ANON_KEY     # pública (protegida por RLS)
SUPABASE_SERVICE_ROLE_KEY         # SECRETA — solo servidor
ANTHROPIC_API_KEY                 # SECRETA
MERCADOPAGO_ACCESS_TOKEN          # SECRETA
STRIPE_SECRET_KEY                 # SECRETA
STRIPE_WEBHOOK_SECRET             # SECRETA [BLOQUE 2]
RATELIMIT_IP_SALT                 # SECRETA [BLOQUE 3] — sal para hashear IPs
VITALA_PRICE_CENTS / VITALA_CURRENCY / VITALA_AI_MODEL / VITALA_VISION_MODEL  # opcionales
```
SQL: pegar `supabase/setup.sql` completo en Supabase SQL Editor tras cada bloque que lo modifique.

---

## 11 · Dependencias

Ya instaladas: `next@14.2.18`, `react@18`, `@supabase/supabase-js`, `@capacitor/core`,
`@capacitor-community/apple-sign-in`, `framer-motion`, `tailwindcss`.
**Regla: NO agregar dependencias nuevas para los bloques 1-4** — webhooks (Web Crypto para
HMAC), rate limiting (Postgres) y export (JSON) se resuelven con lo que hay.

---

## 12 · Despliegue

Vercel · repo `ivanrdsm-dot/botmate` · branch `vitala` · root `./` · push = deploy.
Webhooks: MP → `https://<dominio>/api/webhooks/mercadopago`; Stripe → `/api/webhooks/stripe`
(evento `checkout.session.completed`). Dominio propio cuando exista; Capacitor para stores.

---

## 13 · Testing

Sin framework de tests instalado (regla: sin deps nuevas). Verificación por bloque:
`npm run build` + pruebas manuales dirigidas del criterio ✅ de cada bloque + revisión de
políticas RLS en Supabase (probar con anon key que memberships no acepta INSERT).
Stripe CLI / MP sandbox para simular webhooks en local si está disponible.

---

## 14 · Skills a Usar

`code-review` tras cada bloque · `security-review` tras bloques 2 y 3 · `verify` antes del deploy final.

---

## 15 · CLAUDE.md (instrucciones para el constructor)

1. Lee este BLUEPRINT completo antes de escribir código. Construye en el orden de la sección 09.
2. Al terminar cada bloque: resumen corto + confirmación del usuario antes de seguir.
3. Si una decisión de seguridad no está definida aquí: DETENTE y pregunta. No inventes.
4. Estilo: español en strings de usuario, comentarios breves en español, sin SDKs nuevos,
   REST directo, tipos estrictos.
5. Todo push va al branch `vitala`. Vercel despliega solo.

---

## 16 · REGLAS (restricciones no negociables)

**Salud y ética**
1. NUNCA diagnósticos médicos, prescripciones ni dosis — en código, prompts ni UI.
2. Guardrail de emergencia SIEMPRE se evalúa antes de llamar al modelo.
3. Pisos calóricos de seguridad (1200/1500 kcal) jamás se eliminan ni se hacen configurables.
4. Banderas de seguridad (embarazo, condición, medicamentos, menor de edad) siempre visibles.

**Datos sensibles**
5. Las fotos del diario NUNCA tocan disco, storage ni base de datos. Memoria → análisis → descarte.
6. `anonymize_user()` sobreescribe EN SU LUGAR. Prohíbido copiar datos a logs, backups o auditoría.
7. Local-first: la nube es opt-in. Nada se sube sin sesión iniciada por el usuario.
8. No registrar IPs crudas (solo hash con sal) ni contenido de conversaciones del coach en logs.

**Secretos y acceso**
9. Secretos SOLO en env vars del servidor. Nunca en código, chat, commits ni `NEXT_PUBLIC_*`.
10. `service_role` jamás se importa en código de cliente.
11. El cliente NUNCA escribe `memberships`; solo `grant_lifetime_membership` vía webhook verificado.
12. Webhooks: Stripe exige firma válida; MP exige re-consulta a su API. Nunca confiar en el body.

**Límites (rate limiting)**
13. Endpoints que llaman a Claude: SIEMPRE rate-limited (user y/o IP) según sección 05.
14. Checkout, delete y export: limitados según sección 05. Respuesta 429 amable en español.

**Proceso**
15. Sin dependencias nuevas en bloques 1-4. Sin refactors fuera del alcance del bloque en curso.
16. Si un cambio toca este BLUEPRINT, actualízalo en el mismo commit.

**Fotos de progreso corporal y comunidad**
17. Las fotos de progreso corporal viven SOLO en el dispositivo (localStorage reducidas).
    El análisis IA las procesa en memoria y las descarta — misma garantía que el diario.
18. El análisis corporal JAMÁS da cifras "exactas" de grasa, diagnósticos ni lenguaje que
    avergüence el cuerpo o fomente trastornos alimenticios. Si parece menor de edad, se niega.
19. Comunidad con fotos: SOLO tras moderación visual con IA en modo fail-closed (sin llave
    de IA no se aceptan fotos). Se rechazan: desnudez/sexual, menores, violencia, spam,
    documentos. Subida al bucket 'community' únicamente vía service_role tras aprobarse.
    Publicar requiere cuenta; texto moderado (reglas + IA); mensajes en crisis reciben
    respuesta de apoyo con líneas de ayuda, nunca se publican.
20. Todo post es reportable (1 reporte/usuario/post); a los 3 reportes se auto-oculta.
    Al borrar la cuenta, las fotos de comunidad del usuario se ELIMINAN del storage.
