# BotMate — Sitio oficial

Sitio web de **BotMate**: renta y venta de robots de servicio en México (BellaBot, KettyBot, SwiftBot, CC1, FlashBot, T300/T600 y más). Construido con Next.js 14, TypeScript, Tailwind CSS y Framer Motion, listo para Vercel.

- **Contacto:** contacto@botmate.mx
- **WhatsApp:** +52 55 3149 1986
- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · lucide-react

## ✨ Características

- Diseño tecnológico oscuro con gradientes, glow y animaciones suaves
- SEO profundo: metadata, OpenGraph, Twitter Cards, JSON-LD (Organization + LocalBusiness + Product + WebSite), sitemap dinámico, robots.txt
- Catálogo de robots con páginas dinámicas y schema.org de producto
- Formulario de contacto que abre WhatsApp con mensaje pre-llenado
- FAB de WhatsApp flotante en todas las páginas
- Páginas dedicadas: `/robots`, `/renta`, `/venta`, `/refacciones`, `/sectores`, `/contacto`
- 100% responsive, dark mode nativo, optimizado para Core Web Vitals

## 🚀 Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 🛠 Producción

```bash
npm run build
npm run start
```

## ☁️ Deploy en Vercel + GitHub (paso a paso)

### 1. Sube el código a GitHub

```bash
cd "/Users/ivancadavieeco/PAGINA BOTMATE"
git init
git add .
git commit -m "BotMate: sitio inicial Next.js"
git branch -M main
# Crea el repo vacío en https://github.com/new (ej. botmate-web)
git remote add origin https://github.com/<TU_USUARIO>/botmate-web.git
git push -u origin main
```

### 2. Conecta a Vercel

1. Entra a https://vercel.com/new
2. Importa el repo `botmate-web`
3. Vercel detecta automáticamente Next.js → **Deploy**
4. Agrega variables de entorno (opcional):
   - `NEXT_PUBLIC_SITE_URL=https://botmate.mx`
   - `NEXT_PUBLIC_WHATSAPP=525531491986`
   - `NEXT_PUBLIC_EMAIL=contacto@botmate.mx`

### 3. Conectar dominio botmate.mx

1. En Vercel → Project → Settings → Domains → Add → `botmate.mx`
2. En tu proveedor DNS (donde tienes registrado el dominio):
   - Para el dominio raíz: registro `A` apuntando a `76.76.21.21`
   - Para `www`: registro `CNAME` apuntando a `cname.vercel-dns.com`
3. Apaga WordPress y espera propagación DNS (5 min – 24 h)

### 4. Indexación

Después de deploy:
- Da de alta el dominio en [Google Search Console](https://search.google.com/search-console)
- Envía el sitemap: `https://botmate.mx/sitemap.xml`
- Da de alta en [Bing Webmaster Tools](https://www.bing.com/webmasters)

## 📁 Estructura

```
app/
  layout.tsx              # Layout raíz con metadata global + JSON-LD
  page.tsx                # Home
  sitemap.ts              # Sitemap dinámico
  robots.ts               # robots.txt
  robots/
    page.tsx              # Catálogo
    [slug]/page.tsx       # Detalle de robot
  renta/page.tsx
  venta/page.tsx
  refacciones/page.tsx
  sectores/page.tsx
  contacto/page.tsx
components/               # Hero, Navbar, Footer, FAQ, etc.
lib/
  site.ts                 # Config global (contacto, métricas)
  robots.ts               # Catálogo y datos de los robots
public/                   # og.svg, logo.svg
```

## 🔧 Personalización rápida

- **Datos de contacto:** `lib/site.ts`
- **Catálogo de robots:** `lib/robots.ts`
- **Colores y tema:** `tailwind.config.ts` + `app/globals.css`
- **FAQ:** `components/FAQ.tsx`

## 🧠 SEO incluido

- Metadata por página con title templates y canonical
- JSON-LD: Organization, LocalBusiness, WebSite, Product
- Sitemap XML automático con todas las rutas y robots
- robots.txt apuntando al sitemap
- OpenGraph + Twitter Cards con imagen 1200×630
- `lang="es-MX"`, theme-color, viewport y favicons SVG

## 📞 Soporte

Cualquier cambio en el catálogo, sectores, FAQ o textos se edita en los archivos correspondientes y se hace `git push` — Vercel redespliega automáticamente.
