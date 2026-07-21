// Vitala — fotos de progreso corporal, 100% en TU dispositivo.
// Privacidad por diseño: las fotos viven en localStorage (reducidas), nunca se
// suben a ningún servidor. El análisis IA opcional las envía en memoria y se
// descartan al instante (misma garantía que el diario de comidas).

export interface ProgressPhoto {
  id: string;
  ts: string; // ISO
  dataUrl: string; // JPEG reducido
  note?: string;
}

const KEY = "vitala.photos.v1";
const MAX_PHOTOS = 24;
const MAX_SIDE = 640;

export function loadPhotos(): ProgressPhoto[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]") as ProgressPhoto[];
  } catch {
    return [];
  }
}

function saveAll(photos: ProgressPhoto[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(photos));
}

/** Reduce la imagen en el navegador antes de guardarla (nunca sale del dispositivo). */
export async function downscale(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export async function addPhoto(file: File, note?: string): Promise<ProgressPhoto> {
  const dataUrl = await downscale(file);
  const photo: ProgressPhoto = {
    id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    ts: new Date().toISOString(),
    dataUrl,
    note,
  };
  const all = [...loadPhotos(), photo].slice(-MAX_PHOTOS);
  try {
    saveAll(all);
  } catch {
    // Almacenamiento lleno: quita la más antigua y reintenta una vez.
    saveAll(all.slice(1));
  }
  return photo;
}

export function removePhoto(id: string): void {
  saveAll(loadPhotos().filter((p) => p.id !== id));
}
