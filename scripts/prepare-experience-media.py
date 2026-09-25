"""Optimize user-authorized official product media without altering robot geometry.
Sources and local outputs: docs/pudu/experience-media-jobs.json.
"""
import json,pathlib,hashlib,urllib.request,subprocess,concurrent.futures
from PIL import Image
R=pathlib.Path(__file__).resolve().parents[1]
jobs=json.loads((R/'docs/pudu/experience-media-jobs.json').read_text())
(R/'public/media/experience').mkdir(parents=True,exist_ok=True)
def build(j):
 u=j['source']; name=hashlib.sha256(u.encode()).hexdigest()[:16];ext=u.rsplit('.',1)[-1];raw=R/'.pudu-source/originals'/(name+'.'+ext);dest=R/('public'+j['src'])
 try:
  if not raw.exists():urllib.request.urlretrieve(u,raw)
  if j['kind']=='video':
   if not dest.exists():subprocess.run(['ffmpeg','-nostdin','-y','-i',str(raw),'-an','-vf','scale=1280:960:force_original_aspect_ratio=decrease:force_divisible_by=2','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,capture_output=True)
   poster=R/('public'+j['poster'])
   if not poster.exists():subprocess.run(['ffmpeg','-nostdin','-y','-ss','0','-i',str(dest),'-frames:v','1',str(poster)],check=True,capture_output=True)
   probe=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-of','json',str(dest)]));duration=float(probe['format']['duration'])
  else:
   im=Image.open(raw);im.thumbnail((1800,1400));im.save(dest,'WEBP',quality=88);duration=None
  return {**j,'bytes':dest.stat().st_size,'duration':duration,'status':'ready'}
 except Exception as e:return {**j,'status':'failed','error':str(e)}
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for i,r in enumerate(pool.map(build,jobs)):
  results.append(r)
  if (i+1)%10==0 or r['status']!='ready':print(i+1,len(jobs),r['status'],r.get('error',''),flush=True)
(R/'docs/pudu/experience-media-report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print('ready',sum(r['status']=='ready' for r in results),'bytes',sum(r.get('bytes',0) for r in results),flush=True)
assert all(r['status']=='ready' for r in results)
