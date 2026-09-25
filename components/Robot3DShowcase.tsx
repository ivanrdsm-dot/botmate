'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Image as ImageIcon } from 'lucide-react';
import type { Locale } from '@/lib/locale';
import { RobotModelImage } from './RobotExperience';

// Both the renderer and GLBs are loaded only after an explicit request.
const Robot3DViewer = dynamic(() => import('./Robot3DViewer'), {
  ssr: false,
  loading: () => <div className="robot-3d-loading" role="status">3D…</div>,
});

export default function Robot3DShowcase({ src, name, locale }: { src: string; name: string; locale: Locale }) {
  const [active, setActive] = useState(false);
  const es = locale === 'es';
  return <div className="robot-3d-showcase">
    <div className="robot-3d-mode" role="group" aria-label={es ? 'Modo de presentación' : 'Presentation mode'}>
      <button type="button" aria-pressed={!active} onClick={() => setActive(false)}><ImageIcon size={15}/>{es ? 'Imagen oficial' : 'Official image'}</button>
      <button type="button" aria-pressed={active} onClick={() => setActive(true)}><Box size={16}/>{es ? 'Explorar en 3D' : 'Explore in 3D'}</button>
    </div>
    {active ? <Robot3DViewer locale={locale}/> : <RobotModelImage src={src} name={name} locale={locale}/>}
    <p className="robot-3d-caption">{active ? (es ? 'Reconstrucción visual · Geometría aproximada a partir de imágenes oficiales. No es un modelo técnico de Pudu.' : 'Visual reconstruction · Approximate geometry based on official images. Not a Pudu engineering model.') : (es ? 'Compara la imagen del fabricante con nuestra reconstrucción 3D.' : 'Compare the manufacturer image with our 3D reconstruction.')}</p>
  </div>;
}
