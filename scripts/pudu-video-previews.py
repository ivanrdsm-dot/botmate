import json,pathlib,hashlib,subprocess,concurrent.futures,urllib.request
R=pathlib.Path(__file__).resolve().parents[1];d=json.loads((R/'lib/pudu-catalog.json').read_text());report=[]
def convert(r):
 u=r.get('videoSource');
 if not u:return None
 name=hashlib.sha256(u.encode()).hexdigest()[:16];src=R/'.pudu-source/originals'/(name+'.mp4');dst=R/'public/media/pudu'/(name+'.mp4');poster=R/'public/media/pudu'/(name+'-poster.jpg')
 try:
  if not src.exists():urllib.request.urlretrieve(u,src)
  if not dst.exists():subprocess.run(['ffmpeg','-nostdin','-y','-i',str(src),'-t','18','-an','-vf',"scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2",'-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
  subprocess.run(['ffmpeg','-nostdin','-y','-ss','1','-i',str(dst),'-frames:v','1',str(poster)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
  return {'slug':r['slug'],'source':u,'video':'/media/pudu/'+dst.name,'poster':'/media/pudu/'+poster.name,'bytes':dst.stat().st_size,'status':'ready'}
 except Exception as e:return {'slug':r['slug'],'source':u,'status':'failed','error':str(e)}
# Shared source URLs are converted only once.
unique=list({r.get('videoSource'):r for r in d['products'] if r.get('videoSource')}.values())
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 for v in pool.map(convert,unique):
  if v:report.append(v);print(v['slug'],v['status'],flush=True)
lookup={x['source']:x for x in report if x['status']=='ready'}
for r in d['products']:
 if r.get('videoSource') in lookup:r['video']=lookup[r['videoSource']]['video'];r['poster']=lookup[r['videoSource']]['poster']
(R/'lib/pudu-catalog.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));(R/'docs/pudu/video-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
