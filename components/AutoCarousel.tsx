'use client';
import {useCallback,useRef,useState,type ReactNode} from 'react';
import {ArrowLeft,ArrowRight,Pause,Play} from 'lucide-react';
import {useAutoplay} from './useAutoplay';
import type {Locale} from '@/lib/locale';
export default function AutoCarousel({children,label,locale='es'}:{children:ReactNode;label:string;locale?:Locale}){
 const es=locale==='es';const root=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false),[hovered,setHovered]=useState(false);
 const move=useCallback((direction:number,smooth:boolean)=>{
  const el=track.current;if(!el)return;
  const first=el.children[0] as HTMLElement|undefined,second=el.children[1] as HTMLElement|undefined;
  const step=first&&second?second.offsetLeft-first.offsetLeft:el.clientWidth;
  const max=el.scrollWidth-el.clientWidth;
  const left=direction>0?(el.scrollLeft>=max-3?0:Math.min(max,el.scrollLeft+step)):(el.scrollLeft<=3?max:Math.max(0,el.scrollLeft-step));
  el.scrollTo({left,behavior:smooth?'smooth':'instant'});
 },[]);
 const advance=useCallback(()=>move(1,true),[move]);
 const {playing,enabled}=useAutoplay(root,advance,paused||hovered,7000);
 return <div ref={root} className="auto-carousel" role="region" aria-roledescription={es?'carrusel':'carousel'} aria-label={label} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={e=>{if(!(e.target as HTMLElement).closest("[data-rotation-control]"))setPaused(true);}}>
  <div className="carousel-toolbar"><span>{es?'DESLIZA PARA EXPLORAR':'SWIPE TO EXPLORE'}</span><div><button type="button" aria-label={(es?'Anterior: ':'Previous: ')+label} onClick={()=>{setPaused(true);move(-1,enabled);}}><ArrowLeft size={18}/></button><button type="button" data-rotation-control disabled={!enabled} aria-label={(paused?es?'Reproducir carrusel: ':'Play carousel: ':es?'Pausar carrusel: ':'Pause carousel: ')+label} onClick={()=>setPaused(v=>!v)}>{paused||!enabled?<Play size={16}/>:<Pause size={16}/>}</button><button type="button" aria-label={(es?'Siguiente: ':'Next: ')+label} onClick={()=>{setPaused(true);move(1,enabled);}}><ArrowRight size={18}/></button></div></div>
  <div ref={track} className="auto-carousel-track" tabIndex={0} aria-label={label} onPointerDown={()=>setPaused(true)}>{children}</div>
  <div className="carousel-activity" data-playing={playing} aria-hidden="true"><span/></div>
 </div>;
}
