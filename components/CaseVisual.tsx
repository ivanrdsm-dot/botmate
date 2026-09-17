import Image from 'next/image';
import { brandLogos, type BotmateCase } from '@/lib/botmate-cases';
import type { Locale } from '@/lib/locale';

export function BrandLogo({brand}: {brand:string}) {
  const logo=brandLogos[brand];
  if(!logo)return <span>{brand}</span>;
  return <span className={`brand-logo${logo.dark?' brand-logo-dark':''}`}><Image src={logo.src} alt={logo.alt} width={180} height={70} sizes="180px"/></span>;
}
export function CaseVisual({entry,locale}: {entry:BotmateCase;locale:Locale}) {
  return <figure className="case-visual"><div className="case-visual-image"><Image src={entry.image} alt={entry.imageAlt[locale]} fill sizes="(min-width:1000px) 32vw, (min-width:760px) 45vw, 90vw"/></div><figcaption>{entry.imageCaption[locale]}</figcaption></figure>;
}
