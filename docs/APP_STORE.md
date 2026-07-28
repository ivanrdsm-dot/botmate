# Vitala → App Store · Guía de publicación

El proyecto iOS ya está scaffoldeado en `ios/` con ícono, permisos, entitlements y
manifiesto de privacidad. Lo único que NO se puede hacer sin Mac es compilar y subir.

## Requisitos
- Mac con **Xcode 15+** y **CocoaPods** (`sudo gem install cocoapods`)
- **Apple Developer Program** activo ($99 USD/año) — developer.apple.com
- Bundle ID registrado: **`health.vitala.app`** (Identifiers → App IDs, con capability *Sign in with Apple*)

## Pasos en la Mac (30–45 min)

```bash
git clone -b vitala https://github.com/ivanrdsm-dot/botmate.git vitala && cd vitala
npm install
npx cap sync ios          # instala los Pods
npx cap open ios          # abre Xcode
```

En Xcode (target **App**):
1. **Signing & Capabilities** → selecciona tu Team → Bundle Identifier `health.vitala.app`.
2. **+ Capability → Sign in with Apple** (el archivo `App/App.entitlements` ya existe;
   si Xcode pregunta, úsalo).
3. Verifica que `PrivacyInfo.xcprivacy` esté incluido en el target (App → Build Phases →
   Copy Bundle Resources; si no aparece, arrástralo desde el navegador).
4. **General** → Version `1.0.0`, Build `1`.
5. Selecciona destino **Any iOS Device (arm64)** → **Product → Archive** →
   **Distribute App → App Store Connect → Upload**.

## App Store Connect (appstoreconnect.apple.com)

**My Apps → + → New App**: plataforma iOS · nombre **Vitala** · idioma **Spanish (Mexico)** ·
Bundle ID `health.vitala.app` · SKU `vitala-001`.

### Metadata (copiar y pegar)

- **Subtítulo (30 car.):** `Nutrición para todo el mundo`
- **Categoría:** Health & Fitness · Secundaria: Food & Drink
- **Palabras clave (100 car.):**
  `nutricion,dieta,plan alimenticio,recetas,salud,habitos,calorias,macros,bienestar,coach`
- **Promotional text:**
  `La salud nunca debió ser un privilegio. Plan de alimentación a tu medida, recetas del mundo y un coach que te acompaña. Una moneda, una vez, para toda la vida.`
- **Descripción:**

```
Todo el mundo necesita acceso a la salud. Y todo el mundo eres tú. 💚

Vitala te arma un plan de alimentación personalizado en segundos, con fórmulas
clínicas reconocidas (Mifflin-St Jeor), respetando tus alergias, tu etapa de vida
y tu presupuesto.

QUÉ INCLUYE
• Plan semanal a tu medida: calorías, macros y agua según tus datos y tu meta.
• Recetario del mundo: 33 platillos saludables de México, Japón, Grecia, India,
  Perú y más, con preparación paso a paso y alérgenos siempre visibles.
• Coach IA: resuelve tus dudas de nutrición y hábitos con lenguaje claro.
• Diario con foto: toma una foto de tu comida y estima sus nutrientes.
• Hábitos y bienestar: respiración, gratitud, sueño y educación en salud.
• Progreso: peso y medidas con gráficas simples.

TU PRIVACIDAD, PRIMERO
Tus datos de salud viven primero en TU dispositivo. La sincronización en la nube
es opcional, privada y puedes eliminar tu cuenta (y anonimizar tus datos de forma
irreversible) cuando quieras. Las fotos de tus comidas se analizan al momento y
se descartan: nunca se guardan.

UNA MONEDA, PARA SIEMPRE
Sin suscripciones. Sin letras chiquitas. El acceso de por vida cuesta el símbolo
de una moneda de tu país, porque creemos que el acceso a la salud no debe
depender de tu nivel económico.

IMPORTANTE
Vitala ofrece orientación educativa de nutrición y bienestar. No realiza
diagnósticos médicos, no prescribe tratamientos y no sustituye la consulta con
profesionales de la salud.
```

- **Support URL:** `https://vitala.vercel.app/legal` · **Privacy Policy URL:** igual.

### App Privacy (cuestionario)
- Data collected: **Email** (App Functionality, linked) · **Health & Fitness**
  (App Functionality, linked, solo con cuenta) · **NO tracking**.
- Fotos: NO se recolectan (se procesan y descartan) — no marcar "Photos".

### Age Rating
Todo en "None" → resultado **4+**. (No marcar contenido médico/tratamiento:
la app es educativa y lo declara.)

### Capturas de pantalla (obligatorias)
- iPhone 6.9" (1320×2868) y 6.5" (1284×2778): mínimo 3, ideal 5.
- Sugeridas: landing/manifiesto · plan semanal · recetas con pasos · coach · uno-peso.
- Tip rápido: simulador de Xcode → Cmd+S guarda la captura en el tamaño correcto.

### Notas para el revisor (App Review Information)
```
Vitala es una app educativa de nutrición. No diagnostica ni prescribe (los
disclaimers están en el onboarding, el coach y /legal).
- Sign in with Apple y Google están implementados (Guideline 4.8).
- La eliminación de cuenta está en Cuenta → Zona de peligro (Guideline 5.1.1(v)):
  anonimiza los datos de forma irreversible y borra la identidad.
- El "acceso de por vida" se compra fuera de la app vía web (precio simbólico).
- La app funciona sin cuenta: se puede revisar todo el flujo sin registrarse.
```

### Enviar
**Add for Review → Submit**. Primera revisión: 24–72 h. Si rechazan, responde en
Resolution Center citando las notas de arriba.

## Checklist previo al Archive
- [ ] Web en producción funcionando (la app carga `https://vitala.vercel.app` — si
      cambias el dominio, actualiza `capacitor.config.ts` → `server.url` y re-sync).
- [ ] Supabase: `setup.sql` corrido; Google Y Apple habilitados en Auth Providers
      (Apple: Services ID + key .p8 según docs de Supabase).
- [ ] Env vars en Vercel completas (ver BLUEPRINT.md sección 10).
- [ ] Pago probado end-to-end (webhook otorga membresía).


## Apple Salud / Health Connect (wearables) — build nativo

El panel `/salud` ya usa el mecanismo estándar de Capacitor (`registerPlugin`),
así que el build web funciona sin dependencias extra. Para que la sincronización
REAL funcione en la app nativa:

1. En tu Mac, dentro del proyecto:
   ```bash
   npm install capacitor-health   # compatible con Capacitor 6 (iOS + Android)
   npx cap sync
   ```
2. En Xcode → target App → Signing & Capabilities → **+ HealthKit**
   (el entitlement `com.apple.developer.healthkit` ya está en App.entitlements).
3. Verifica que el nombre del plugin registrado en `lib/healthkit.ts`
   ("HealthPlugin") coincida con el que exponga `capacitor-health`; ajusta los
   `dataType` ('steps', 'active-calories', 'workout') a los del plugin si difieren.
4. Las cadenas de permiso (`NSHealthShareUsageDescription`) ya están en Info.plist.

Con eso, el botón "Conectar Apple Salud" pedirá permiso y traerá pasos, energía
activa y ejercicio de los últimos 30 días. La mayoría de las pulseras (Apple
Watch, Fitbit, Garmin, Oura, Xiaomi…) ya vuelcan sus datos en Apple Salud /
Health Connect, así que se cubren sin integrarlas una por una.
