// Vitala — descarga fotos libres de Wikimedia Commons para cada receta.
// CÓRRELO EN TU MÁQUINA (aquí el sandbox no tiene red abierta):
//   npm i -D sharp && node scripts/fetch-recipe-images.mjs
// Optimiza a WebP 800x600, guarda créditos y actualiza lib/recipeImages.ts.
import sharp from "sharp";
import { writeFileSync } from "fs";

const QUERIES = {
  d1: "oatmeal banana bowl", d2: "scrambled eggs avocado", d3: "yogurt strawberries granola",
  d4: "tofu scramble", d5: "green smoothie glass", d6: "chilaquiles verdes",
  d7: "shakshuka", d8: "avocado toast egg",
  c1: "grilled chicken rice vegetables", c2: "baked salmon asparagus", c3: "lentil vegetable bowl",
  c4: "beef tacos plate", c5: "tuna chickpea salad", c6: "tofu curry coconut",
  c7: "salmon teriyaki", c8: "dal lentils rice", c9: "poke bowl", c10: "ceviche peruvian",
  n1: "mushroom omelette", n2: "grilled fish salad plate", n3: "pumpkin soup bowl",
  n4: "chicken wrap tortilla", n5: "chickpea spinach salad", n6: "vegetable soup beans",
  n7: "miso soup bowl", n8: "greek salad feta",
  s1: "apple almonds snack", s2: "yogurt blueberries bowl", s3: "hummus carrot sticks",
  s4: "edamame bowl", s5: "walnuts dark chocolate", s6: "jicama sticks", s7: "tzatziki pita",
};

const UA = "VitalaApp/1.0 (recipe imagery; contact: ivan.cadavieco@botmate.mx)";
const credits = [];
const manifest = {};

function stripHtml(s) { return (s || "").replace(/<[^>]*>/g, "").trim(); }

async function searchCommons(query) {
  const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*" +
    "&generator=search&gsrnamespace=6&gsrlimit=8" +
    `&gsrsearch=${encodeURIComponent("filetype:bitmap " + query)}` +
    "&prop=imageinfo&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlwidth=900";
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  const candidates = pages
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter(({ info }) => info && /jpe?g/i.test(info.mime) && info.width >= 700 && info.height >= 450)
    .filter(({ info }) => info.width / info.height > 0.7 && info.width / info.height < 2.4)
    .sort((a, b) => (b.info.width * b.info.height) - (a.info.width * a.info.height));
  return candidates[0] ?? null;
}

for (const [id, query] of Object.entries(QUERIES)) {
  try {
    const hit = await searchCommons(query);
    if (!hit) { console.log(`✗ ${id} (${query}): sin resultados`); continue; }
    const { info, title } = hit;
    const imgRes = await fetch(info.thumburl || info.url, { headers: { "user-agent": UA } });
    if (!imgRes.ok) { console.log(`✗ ${id}: descarga ${imgRes.status}`); continue; }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await sharp(buf).resize(800, 600, { fit: "cover" }).webp({ quality: 78 }).toFile(`public/recetas/${id}.webp`);
    const meta = info.extmetadata ?? {};
    credits.push(`${id}.webp — "${title.replace("File:", "")}" · ${stripHtml(meta.Artist?.value) || "autor desconocido"} · ${meta.LicenseShortName?.value || "ver página"} · ${info.descriptionurl}`);
    manifest[id] = `/recetas/${id}.webp`;
    console.log(`✓ ${id}: ${title.slice(5, 60)}`);
    await new Promise((r) => setTimeout(r, 300));
  } catch (e) {
    console.log(`✗ ${id}: ${e.message}`);
  }
}

writeFileSync("public/recetas/CREDITS.txt",
  "Fotografías de recetas — Wikimedia Commons\n" +
  "Gracias a la comunidad de Commons. Autores y licencias por archivo:\n\n" +
  credits.join("\n") + "\n");
writeFileSync("image-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`\nTotal: ${Object.keys(manifest).length}/33`);

// Genera lib/recipeImages.ts con el manifiesto para que la UI use las fotos.
writeFileSync("lib/recipeImages.ts",
  "// Generado por scripts/fetch-recipe-images.mjs — fotos en public/recetas/.\n" +
  "// Créditos de autores: public/recetas/CREDITS.txt\n\n" +
  "export const RECIPE_IMAGES: Record<string, string> = " +
  JSON.stringify(manifest, null, 2) + ";\n");
console.log("lib/recipeImages.ts actualizado");
