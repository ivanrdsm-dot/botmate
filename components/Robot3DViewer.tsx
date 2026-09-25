'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Locale } from '@/lib/locale';
import { useSiteMotion } from './MotionProvider';

type View = 'perspective' | 'front' | 'side' | 'top';
type Commands = { view: (view: View) => void; zoom: (factor: number) => void; rotate: (direction: number) => void; };
function disposeModel(object: THREE.Object3D) {
  object.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      for (const material of Array.isArray(child.material) ? child.material : [child.material]) material.dispose();
    }
  });
}

export default function Robot3DViewer({ locale }: { locale: Locale }) {
  const es = locale === 'es';
  const host = useRef<HTMLDivElement>(null);
  const commands = useRef<Commands | null>(null);
  const motion = useRef(false);
  const [variant, setVariant] = useState<'d5-w' | 'd5'>('d5-w');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [auto, setAuto] = useState(false);
  const { enabled } = useSiteMotion();
  const updateMotion = useRef<(() => void) | null>(null);
  useEffect(() => { motion.current = auto && enabled; updateMotion.current?.(); }, [auto, enabled]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let visible = false;
    let loaded = false;
    let model: THREE.Object3D | null = null;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { queueMicrotask(() => { if (!disposed) setStatus('error'); }); return () => { disposed = true; }; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .01, 30);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, .04);
    scene.environment = env.texture;
    room.dispose(); pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x949ba6, 2));
    const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(-2, 3, 2); scene.add(key);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableZoom = false; // Page scrolling remains available; accessible zoom buttons below.
    controls.minDistance = .8; controls.maxDistance = 3;
    controls.maxPolarAngle = Math.PI / 2 + .08;
    controls.autoRotateSpeed = .65;
    const target = new THREE.Vector3(0, .29, 0);
    controls.target.copy(target);
    function render() { if (!disposed && visible && !document.hidden) renderer.render(scene, camera); }
    function fit() {
      const width = container!.clientWidth, height = container!.clientHeight;
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix(); renderer.setSize(width, height); render();
    }
    const setView = (view: View) => {
      const distance = camera.aspect < 1 ? 2.15 : 1.8;
      const direction = view === 'front' ? new THREE.Vector3(-1, .12, 0) : view === 'side' ? new THREE.Vector3(0, .12, 1) : view === 'top' ? new THREE.Vector3(-.001, 1, .001) : new THREE.Vector3(-1, .49, 1);
      camera.position.copy(direction.normalize().multiplyScalar(distance).add(target));
      controls.target.copy(target); controls.update(); render();
    };
    commands.current = {
      view: setView,
      zoom: factor => { camera.position.sub(target).multiplyScalar(factor).clampLength(.8, 3).add(target); controls.update(); render(); },
      rotate: direction => { camera.position.sub(target).applyAxisAngle(new THREE.Vector3(0, 1, 0), direction * .22).add(target); controls.update(); render(); },
    };
    let previousTime = 0;
    function animation(time: number) {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, .1) : 0;
      previousTime = time; controls.update(delta); render();
    }
    function syncMotion() {
      controls.autoRotate = motion.current && loaded && visible && !document.hidden;
      previousTime = 0; renderer.setAnimationLoop(controls.autoRotate ? animation : null); render();
    }
    updateMotion.current = syncMotion;
    const resize = new ResizeObserver(() => { fit(); }); resize.observe(container);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncMotion(); }, { threshold: .1 }); observer.observe(container);
    document.addEventListener('visibilitychange', syncMotion);
    controls.addEventListener('change', render);
    const contextLost = (event: Event) => { event.preventDefault(); renderer.setAnimationLoop(null); setStatus('error'); };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    fit(); setView('perspective');
    const abort = new AbortController();
    fetch(`/media/models/${variant}-reconstruction.glb`, { signal: abort.signal })
      .then(response => { if (!response.ok) throw new Error('Model unavailable'); return response.arrayBuffer(); })
      .then(bytes => new GLTFLoader().parseAsync(bytes, '/media/models/'))
      .then(gltf => {
        if (disposed) { disposeModel(gltf.scene); return; }
        // Exported studio lights/floor stay out of the product viewer.
        let robot: THREE.Object3D | undefined;
        gltf.scene.traverse(child => { if (child.name.endsWith('_visual_reconstruction')) robot = child; });
        if (!robot) { disposeModel(gltf.scene); throw new Error('Robot root missing'); }
        gltf.scene.updateMatrixWorld(true);
        scene.attach(robot); model = robot; disposeModel(gltf.scene);
        // GLTF is Y-up. Centre the actual mesh envelope, preserving reference proportions.
        const bounds = new THREE.Box3().setFromObject(robot);
        const center = bounds.getCenter(new THREE.Vector3());
        robot.position.x -= center.x; robot.position.z -= center.z; robot.position.y -= bounds.min.y;
        loaded = true; setStatus('ready'); syncMotion(); render();
      }).catch(error => { if (!disposed && error.name !== 'AbortError') setStatus('error'); });
    return () => {
      disposed = true; abort.abort(); renderer.setAnimationLoop(null);
      resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', syncMotion);
      controls.removeEventListener('change', render); controls.dispose(); commands.current = null; updateMotion.current = null;
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      if (model) disposeModel(model);
      env.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    };
  }, [variant]);

  const views: [View, string][] = [['front', es ? 'Frente' : 'Front'], ['side', es ? 'Lateral' : 'Side'], ['top', es ? 'Arriba' : 'Top']];
  return <div className="robot-3d-viewer">
    <div className="robot-3d-variants" role="group" aria-label={es ? 'Variante del robot' : 'Robot variant'}>
      {(['d5-w', 'd5'] as const).map(v => <button type="button" key={v} aria-pressed={variant === v} onClick={() => { if (v !== variant) { setStatus('loading'); setVariant(v); } setAuto(false); }}>{v.toUpperCase()}<span>{v === 'd5-w' ? (es ? 'Con ruedas' : 'Wheeled') : (es ? 'Con patas' : 'Legged')}</span></button>)}
    </div>
    <div ref={host} className="robot-3d-canvas" tabIndex={0} role="group" aria-label={es ? 'Visor 3D. Arrastra para girar. También puedes usar flechas izquierda y derecha, más y menos.' : '3D viewer. Drag to orbit, or use left and right arrows, plus and minus.'}
      onKeyDown={event => { if (['ArrowLeft','ArrowRight','+','-','Home'].includes(event.key)) { event.preventDefault(); if (event.key === 'Home') commands.current?.view('perspective'); else if (event.key === '+' || event.key === '-') commands.current?.zoom(event.key === '+' ? .85 : 1.15); else commands.current?.rotate(event.key === 'ArrowLeft' ? -1 : 1); } }}/>
    {status !== 'ready' && <p className="robot-3d-loading" role="status">{status === 'error' ? (es ? 'No se pudo abrir el visor. Puedes volver a la imagen oficial.' : 'The viewer could not open. You can return to the official image.') : (es ? 'Preparando modelo 3D…' : 'Preparing 3D model…')}</p>}
    <div className="robot-3d-tools" aria-label={es ? 'Controles del visor' : 'Viewer controls'}>
      {views.map(([view,label]) => <button type="button" key={view} disabled={status !== 'ready'} onClick={() => { setAuto(false); commands.current?.view(view); }}>{label}</button>)}
      <button type="button" disabled={status !== 'ready'} onClick={() => commands.current?.zoom(.85)} aria-label={es ? 'Acercar' : 'Zoom in'}><ZoomIn size={16}/></button>
      <button type="button" disabled={status !== 'ready'} onClick={() => commands.current?.zoom(1.15)} aria-label={es ? 'Alejar' : 'Zoom out'}><ZoomOut size={16}/></button>
      <button type="button" disabled={status !== 'ready'} onClick={() => { setAuto(false); commands.current?.view('perspective'); }} aria-label={es ? 'Restablecer vista 3D' : 'Reset 3D view'}><RotateCcw size={16}/></button>
      <button type="button" disabled={!enabled || status !== 'ready'} aria-pressed={auto && enabled} onClick={() => setAuto(!auto)} aria-label={es ? 'Giro automático' : 'Automatic orbit'}>{auto && enabled ? <Pause size={16}/> : <Play size={16}/>}</button>
    </div>
    <p className="robot-3d-hint">{es ? 'Arrastra para girar · Usa + y − para acercar' : 'Drag to orbit · Use + and − to zoom'}</p>
  </div>;
}
