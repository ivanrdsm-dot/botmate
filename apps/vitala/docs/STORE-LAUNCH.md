# Vitala — Publicación en App Store y Google Play

Esta guía lleva la PWA de Vitala a las tiendas usando **Capacitor**, que envuelve
la web ya desplegada en un contenedor nativo.

> ⚠️ **Realidad honesta:** generar el binario de **iOS requiere una Mac con Xcode**
> (no se puede compilar desde un iPhone). Android requiere **Android Studio**.
> La revisión de Apple tarda **1–3 días** y la de Google horas–días. No existe
> forma de publicar en tiendas "en una noche": esto es un proceso de Apple/Google,
> no nuestro. Mientras tanto, la PWA YA funciona en el iPhone (ver paso 0).

---

## Paso 0 — Usable hoy mismo (sin tiendas, gratis)

1. Despliega la web en Vercel (ver `docs/VITALA.md`).
2. En tu iPhone, abre `https://TU-DOMINIO/vitala` en Safari.
3. Compartir → **"Agregar a pantalla de inicio"**. Queda como app, a pantalla
   completa, con ícono de Vitala.

## Pre-requisitos para tiendas (los pones tú)

| Necesitas | Costo | Dónde |
|---|---|---|
| Cuenta Apple Developer | 99 USD/año | developer.apple.com |
| Google Play Console | 25 USD único | play.google.com/console |
| Una Mac con Xcode (iOS) | — | App Store de macOS |
| Android Studio (Android) | gratis | developer.android.com/studio |
| Dominio + deploy en Vercel | gratis para empezar | vercel.com |

## Paso 1 — Configura la URL de producción

En `capacitor.config.ts`, `server.url` apunta a tu PWA desplegada. Puedes fijarlo
con variable de entorno al sincronizar:

```bash
export VITALA_APP_URL="https://TU-DOMINIO/vitala"
```

## Paso 2 — Instala Capacitor y añade plataformas

```bash
npm install
npm run cap:add:ios       # crea carpeta ios/  (requiere Mac)
npm run cap:add:android   # crea carpeta android/
npm run cap:sync
```

## Paso 3 — iOS (en Mac)

```bash
npm run cap:open:ios      # abre Xcode
```
En Xcode:
1. Selecciona tu *Team* (cuenta Apple Developer) y un *Bundle Identifier* único
   (`health.vitala.app`).
2. Agrega los íconos de la app (genera el set desde `public/vitala/icon.svg`).
3. Product → Archive → Distribuye a **App Store Connect**.
4. En App Store Connect: ficha de la app, capturas, política de privacidad
   (apunta a `/vitala/legal`), categoría **Salud y forma física**, y envía a
   revisión.

> 🔒 **Apple es estricto con apps de salud.** Declara que es orientación
> educativa, NO diagnóstico; incluye disclaimers (ya están en la app) y enlaza tu
> política de privacidad. Esto reduce rechazos.

## Paso 4 — Android (en cualquier PC/Mac)

```bash
npm run cap:open:android  # abre Android Studio
```
1. Build → Generate Signed Bundle/APK → crea un *keystore* (guárdalo a salvo).
2. Genera el **.aab** (Android App Bundle).
3. En Play Console: crea la app, sube el .aab, completa la ficha, el
   cuestionario de contenido y la política de privacidad. Publica en pruebas
   internas primero, luego producción.

> 💡 Alternativa más rápida en Android: **TWA / Bubblewrap** publica la PWA
> directamente sin tanto código nativo.

## Checklist de tienda (ambas)

- [ ] Política de privacidad pública (usa `/vitala/legal`).
- [ ] Disclaimers de salud visibles (incluidos).
- [ ] Capturas de pantalla (iPhone 6.7", Android phone).
- [ ] Ícono 1024×1024 (deriva un PNG desde el SVG de marca).
- [ ] Descripción y palabras clave (ver `docs/VITALA-BRAND.md`).
- [ ] Datos de contacto de soporte.

## Importante sobre íconos

El repo trae íconos **SVG**. Las tiendas piden **PNG** en varias resoluciones
(1024, 512, 192, 180…). Genera el set desde `public/vitala/icon.svg` con
cualquier herramienta de "app icon generator" antes de enviar.
