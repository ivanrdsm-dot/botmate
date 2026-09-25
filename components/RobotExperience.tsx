'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react';
import type { Locale } from '@/lib/locale';
import type { ExperienceMedia, RobotChapter } from '@/lib/robot-experience';
import { useSiteMotion } from './MotionProvider';

/** A single visible player; no background downloads of the remaining chapters. */
function ChapterMedia({ media, locale }: { media: RobotChapter; locale: Locale }) {
  const { enabled } = useSiteMotion();
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [requested, setRequested] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const isVideo = media.kind === 'video';
  const mounted = isVideo && (requested || (enabled && visible));
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (box.current) observer.observe(box.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (mounted && visible && pageVisible && !paused && (enabled || requested)) {
      player.current?.play().catch(() => setPlaying(false));
    } else player.current?.pause();
  }, [mounted, visible, pageVisible, paused, enabled, requested]);
  return <div className="robot-chapter-media" ref={box}>
    {mounted && !error ? <video ref={player} src={media.src} poster={media.poster} muted loop playsInline controls preload="metadata"
      aria-label={media.title[locale]} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)}/>
      : <Image src={media.poster} alt={media.title[locale]} fill sizes="(min-width: 1000px) 64vw, 100vw"/>}
    {isVideo && !error && <button className="robot-play-control" type="button" aria-label={playing ? (locale === 'es' ? 'Pausar demostración' : 'Pause demonstration') : (locale === 'es' ? 'Reproducir demostración' : 'Play demonstration')}
      onClick={() => { if (playing) { setPaused(true); player.current?.pause(); } else { setRequested(true); setPaused(false); player.current?.play().catch(() => {}); } }}>
      {playing ? <Pause size={16}/> : <Play size={16}/>} {playing ? (locale === 'es' ? 'Pausar' : 'Pause') : (locale === 'es' ? 'Reproducir' : 'Play')}
    </button>}
    {error && <p role="status" className="robot-media-error">{locale === 'es' ? 'Video no disponible. Mostrando la imagen oficial.' : 'Video unavailable. Showing the official image.'}</p>}
  </div>;
}

export function RobotChapters({ chapters, locale, name }: { chapters: RobotChapter[]; locale: Locale; name: string }) {
  const [active, setActive] = useState(0);
  const { enabled } = useSiteMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const es = locale === 'es';
  const change = (index: number) => setActive((index + chapters.length) % chapters.length);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % chapters.length : event.key === 'ArrowLeft' ? (index - 1 + chapters.length) % chapters.length : event.key === 'Home' ? 0 : event.key === 'End' ? chapters.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  }
  return <section id="funcionamiento" className="robot-lab">
    <div className="container-x">
      <div className="robot-section-heading"><div><p className="eyebrow">01 / {es ? 'EXPLORA SU TECNOLOGÍA' : 'EXPLORE THE TECHNOLOGY'}</p><h2>{es ? 'Así funciona.' : 'See how it works.'}</h2></div><p>{es ? 'Elige una función. Mira lo que sucede.' : 'Choose a function. See what happens.'}</p></div>
      <div role="tablist" aria-label={`${name} · ${es ? 'funciones' : 'functions'}`} className="robot-chapter-tabs">
        {chapters.map((c, i) => <button type="button" key={i} ref={el => { tabs.current[i] = el; }} role="tab" id={`robot-tab-${i}`} aria-controls={`robot-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onKeyDown={e => keyboard(e, i)} onClick={() => change(i)}><span>{String(i + 1).padStart(2, '0')}</span>{c.title[locale]}</button>)}
      </div>
      {chapters.map((c, i) => <div key={i} role="tabpanel" id={`robot-panel-${i}`} aria-labelledby={`robot-tab-${i}`} hidden={active !== i} tabIndex={0} className="robot-chapter-panel">
        {active === i && <ChapterMedia key={`${c.src}-${enabled}`} media={c} locale={locale}/>}
        <div className="robot-chapter-copy"><span className="tiny-label">{es ? 'FUNCIÓN' : 'FUNCTION'} {String(i + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span><h3>{c.title[locale]}</h3><p>{c.description[locale]}</p><span className="robot-source-label">Pudu Robotics · {c.kind === 'video' ? (es ? 'Secuencia oficial sin audio' : 'Official sequence, no audio') : (es ? 'Imagen oficial' : 'Official image')}</span>
          {chapters.length > 1 && <div className="robot-chapter-controls"><button type="button" onClick={() => change(active - 1)} aria-label={es ? 'Función anterior' : 'Previous function'}><ArrowLeft size={19}/></button><button type="button" onClick={() => change(active + 1)} aria-label={es ? 'Siguiente función' : 'Next function'}><ArrowRight size={19}/></button></div>}
        </div>
      </div>)}
    </div>
  </section>;
}

const stations = [
  { x: 20, y: 67, es: 'Abasto a la línea', en: 'Line-side supply', detailEs: 'Traslada materiales desde el área de almacenamiento a los puntos de consumo de la línea.', detailEn: 'Move materials from storage to the points where they are used on the line.' },
  { x: 46, y: 62, es: 'Entre procesos', en: 'Work in progress', detailEs: 'Conecta estaciones con recorridos de producto en proceso.', detailEn: 'Connect workstations with routes for work-in-progress materials.' },
  { x: 74, y: 44, es: 'Producto terminado', en: 'Finished goods', detailEs: 'Lleva materiales hacia la zona de producto terminado según el recorrido configurado.', detailEn: 'Move materials towards finished-goods storage along configured routes.' },
  { x: 77, y: 75, es: 'Control de calidad', en: 'Quality inspection', detailEs: 'Apoya el traslado hacia las estaciones de inspección. La inspección la realiza tu equipo.', detailEn: 'Support transport to inspection stations. Your team performs the inspection.' },
];
export function FactoryExplorer({ media, locale }: { media: ExperienceMedia; locale: Locale }) {
  const [active, setActive] = useState(0);
  const es = locale === 'es';
  return <section className="robot-factory"><div className="container-x"><div className="robot-section-heading"><div><p className="eyebrow">T300 / {es ? 'UNA PLANTA CONECTADA' : 'A CONNECTED FACTORY'}</p><h2>{es ? 'Cada recorrido cuenta.' : 'Every journey counts.'}</h2></div><p>{es ? 'Explora cuatro aplicaciones en una línea de producción.' : 'Explore four applications on a production line.'}</p></div>
    <div className="robot-factory-scene"><Image src={media.src} alt={es ? 'Diagrama oficial Pudu T300 de transporte en una fábrica' : 'Official Pudu T300 factory delivery diagram'} width={1800} height={720} sizes="94vw"/>
      {stations.map((s, i) => <button key={s.en} type="button" className={`robot-hotspot ${active === i ? 'is-active' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }} aria-label={s[locale]} aria-pressed={active === i} onClick={() => setActive(i)}>{i + 1}</button>)}
    </div><div className="robot-stations" aria-label={es ? 'Aplicaciones del T300' : 'T300 applications'}>{stations.map((s, i) => <button key={s.en} type="button" aria-pressed={active === i} onClick={() => setActive(i)}><span>0{i + 1}</span>{s[locale]}</button>)}</div>
    <p className="robot-station-description" aria-live="polite">{es ? stations[active].detailEs : stations[active].detailEn}</p><p className="robot-source-label">{es ? 'Ilustración de aplicaciones del fabricante. El recorrido real se define en la evaluación de tu planta.' : 'Manufacturer application illustration. Actual routes are defined during your site assessment.'}</p>
  </div></section>;
}

export function RobotModelImage({ src, name, locale }: { src: string; name: string; locale: Locale }) {
  const [rotated, setRotated] = useState(false);
  const { enabled } = useSiteMotion();
  // Real manufacturer image, with a small presentation tilt. Not a fabricated 360° model.
  return <div className="robot-model-stage" data-tilt={rotated && enabled ? 'on' : 'off'}>
    <div className="robot-stage-grid" aria-hidden="true"/><div className="robot-stage-ring" aria-hidden="true"/>
    <div className="robot-model-render"><Image src={src} alt={`${name} · Pudu Robotics`} fill priority sizes="(min-width: 1000px) 50vw, 95vw"/></div>
    <button type="button" className="robot-view-control" aria-label={`${name}: ${rotated ? (locale === 'es' ? 'Restablecer vista' : 'Reset view') : (locale === 'es' ? 'Inclinar presentación' : 'Tilt presentation')}`} aria-pressed={rotated} onClick={() => setRotated(!rotated)} disabled={!enabled}><RotateCcw size={18}/></button>
  </div>;
}
