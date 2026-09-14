'use client';
import {useEffect,useState,type RefObject} from 'react';
import {useSiteMotion} from './MotionProvider';
/** Stop timers outside the viewport, in background tabs and when motion is disabled. */
export function useAutoplay(ref:RefObject<HTMLElement|null>,advance:()=>void,paused:boolean,delay=6500){
 const {enabled}=useSiteMotion();
 const [visible,setVisible]=useState(false),[pageVisible,setPageVisible]=useState(true);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.25});
  if(ref.current)observer.observe(ref.current);
  const visibility=()=>setPageVisible(!document.hidden);
  document.addEventListener('visibilitychange',visibility);
  return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
 },[ref]);
 const playing=enabled&&visible&&pageVisible&&!paused;
 useEffect(()=>{if(!playing)return;const timer=setInterval(()=>{if(!document.hidden)advance();},delay);return ()=>clearInterval(timer);},[playing,advance,delay]);
 return {playing,enabled};
}
