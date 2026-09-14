'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { puduProducts } from '@/lib/pudu';
import { localPath, type Locale } from '@/lib/locale';
import CinematicMedia from './CinematicMedia';
import PuduVideo from './PuduVideo';
import { useSiteMotion } from './MotionProvider';

const models = ['pudu-cc1', 'pudu-t600', 'bellabot-pro'];
export default function ExperienceCinema({locale = 'es'}: {locale?: Locale}) {
  const [index, setIndex] = useState(0);
  const {enabled} = useSiteMotion();
  const es = locale === 'es';
  const robot = puduProducts.find(r => r.slug === models[index])!;
  const titles = es ? ['Limpieza de pisos', 'Transporte de materiales', 'Entrega y servicio'] : ['Floor cleaning', 'Material transport', 'Delivery and service'];
  return <section id="en-accion" className="experience-cinema">
    <div className="container-x">
      <div className="cinema-heading"><h2>{es ? 'Robots en acción' : 'Robots in action'}</h2><p>{es ? 'Elige un video para conocer cómo trabaja cada modelo.' : 'Choose a video to see each model at work.'}</p></div>
      <div className="cinema-choices" role="group" aria-label={es ? 'Elegir video' : 'Choose video'}>{models.map((slug, i) => <button key={slug} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}><span>0{i + 1}</span>{puduProducts.find(r => r.slug === slug)!.name}</button>)}</div>
      <div className="cinema-screen" key={robot.slug}>{enabled ? <CinematicMedia src={robot.video} poster={robot.poster || robot.image} alt={`${robot.name} · ${es ? 'video oficial de Pudu Robotics' : 'official Pudu Robotics footage'}`} locale={locale}/> : <PuduVideo src={robot.video!} poster={robot.poster || robot.image} name={robot.name} locale={locale}/>}</div>
      <div className="cinema-caption"><div aria-live="polite"><span>{es ? 'VIDEO OFICIAL / PUDU ROBOTICS · SIN AUDIO' : 'OFFICIAL FILM / PUDU ROBOTICS · NO AUDIO'}</span><h3>{titles[index]}</h3></div><Link className="text-link" href={localPath('/robots/' + robot.slug, locale)}>{es ? 'Ver' : 'View'}{' '}{robot.name}<ArrowUpRight size={20}/></Link></div>
    </div>
  </section>;
}
