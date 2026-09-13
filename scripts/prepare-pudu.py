"""Build traceable bilingual catalog data from the archived official public pages."""
import json,re,pathlib,hashlib,html
ROOT=pathlib.Path(__file__).resolve().parents[1]; SRC=ROOT/'.pudu-source'; jobs={}
def read(name):
 p=SRC/(name+'.json');return json.loads(p.read_text()) if p.exists() else {}
def clean(v):return re.sub(r'\s+',' ',re.sub('<[^>]+>',' ',html.unescape(re.sub('[\u200b\u200c\u200d\ufeff]','',str(v))))).strip()
def bi(es,en):return {'es':clean(es),'en':clean(en)}
def asset(url,kind='image'):
 if not url:return ''
 ext='mp4' if kind=='video' else 'webp';path='/media/pudu/'+hashlib.sha256(url.encode()).hexdigest()[:16]+'.'+ext
 jobs[url]={'url':url,'path':path,'kind':kind};return path
def flatten(groups):return [r for g in groups for r in g.get('item',[])]
nav=read('en_products')['data']['initData']['topNavProducts'];esnav=flatten(read('es_products')['data']['initData']['topNavProducts'][0]['item']);esmap={clean(x['title']):x for x in esnav};home=read('en')['data']['homePageData'];products=[]
category={}
for c,k in zip(nav[1:],['cleaning','delivery','industrial','ai']):
 for r in flatten(c['item']):category[clean(r['title'])]=k
slugmap={}
for r in flatten(nav[0]['item']):
 name=clean(r['title']);slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-');slugmap[name]=slug
for r in flatten(nav[0]['item']):
 name=clean(r['title']);s=esmap.get(name,{});key=r['jumpUrl'].rsplit('/',1)[-1];pg=read('en_'+r['jumpUrl'].strip('/').replace('/','_'));espg=read('es_'+r['jumpUrl'].strip('/').replace('/','_'));parts=pg.get('data',{}).get('productDetailData',[]);esparts=espg.get('data',{}).get('productDetailData',[])
 specs=[x for x in parts if x.get('__component')=='product-info.c3'];esspecs=[x for x in esparts if x.get('__component')=='product-info.c3'];idx=1 if ('Underride' in name or name=='PUDU BG1') else 0;spec=specs[min(idx,len(specs)-1)] if specs else {};esspec=esspecs[min(idx,len(esspecs)-1)] if esspecs else {}
 specrows=[]
 for i,row in enumerate(spec.get('paramsList',[])[:8]):
  sr=esspec.get('paramsList',[]);sr=sr[i] if i<len(sr) else row;val=' · '.join(clean(x['title']) for x in row['value']);esval=' · '.join(clean(x['title']) for x in sr['value']);specrows.append({'label':bi(sr['title'],row['title']),'value':bi(esval,val)})
 # Only manufacturer-specific media; no navigation icons or unrelated customer imagery.
 banner=next(((x.get('mediaUrl') or {}).get('url','') for x in parts if x.get('__component')=='product-info.f0'),'')
 vid=next(((x.get('videoUrl') or {}).get('url','') for x in parts if x.get('__component')=='product-info.f0'),'')
 if not vid:vid=next((x for x in pg.get('media',[]) if x.endswith('.mp4')),'')
 tagsen=[clean(x) for x in r.get('tags',[])][:6];tagses=[clean(x) for x in s.get('tags',[])][:6];
 products.append({'slug':slugmap[name],'name':name,'category':category.get(name,'outdoor'),'description':bi(s.get('desc',r['desc']),r['desc']),'features':{'es':tagses or tagsen,'en':tagsen},'specs':specrows,'image':asset(r['mediaUrl']),'banner':asset(banner) if banner else '', 'videoSource':vid,'source':'https://www.pudurobotics.com/en'+r['jumpUrl'],'sourceEs':'https://www.pudurobotics.com/es'+r['jumpUrl'],'new':'new' in str(r.get('iconTags',[])).lower(),'verifiedAt':'2026-09-13'})
# Models offered in the previous Botmate catalog retain their old URLs through aliases.
aliases={'botmate-serve':'bellabot-pro','botmate-ads':'kettybot-pro','botmate-clean':'pudu-cc1','botmate-clean-mini':'pudu-sh1','botmate-flex':'pudubot-2','botmate-cargo-300':'pudu-t300','botmate-cargo-600':'pudu-t600'}
industries=[]
industryNames=['Restaurantes y alimentos','Retail y centros comerciales','Hoteles y hospitalidad','Manufactura y almacenes','Salud y cuidados','Aeropuertos y transporte','Entretenimiento y deportes','Edificios y servicios inmobiliarios','Educación','Servicios públicos']
industryDescriptions=[('Entrega de alimentos, recolección de vajilla, recepción y cuidado de pisos. Una operación coordinada entre cocina, comedor y equipo de servicio.','Food delivery, dish return, reception and floor care. Connect kitchen, dining room and service teams.'),('Guía a visitantes, comunica promociones y apoya la reposición de productos y la limpieza de los pasillos.','Guide visitors, display promotions and support restocking and aisle cleaning.'),('Conecta recepción, habitaciones y áreas comunes con entregas, transporte de blancos y limpieza programada.','Connect reception, guest rooms and public areas through deliveries, linen transport and scheduled cleaning.'),('Automatiza recorridos de materiales entre estaciones de trabajo, almacenes y líneas de producción, junto con el cuidado de pisos.','Automate material routes between workstations, warehouses and production lines, alongside floor care.'),('Apoya la logística interna, la recepción y la limpieza en las áreas que autorice cada institución.','Support internal logistics, reception and cleaning in areas approved by each institution.'),('Limpieza de grandes superficies, reparto e información para pasajeros en terminales y zonas de servicio.','Large-area cleaning, delivery and passenger information in terminals and service areas.'),('Servicio de alimentos, comunicación en pantalla y limpieza en recintos deportivos, parques y espacios de entretenimiento.','Food service, on-screen communication and cleaning in sports venues, parks and entertainment spaces.'),('Coordina entregas, movimiento de carga y cuidado de espacios compartidos en edificios residenciales y corporativos.','Coordinate deliveries, load transport and shared-space care in residential and office buildings.'),('Cuida pisos y apoya entregas y orientación en campus, comedores y edificios educativos.','Maintain floors and support delivery and guidance in campuses, cafeterias and educational buildings.'),('Recibe visitantes, presenta información y programa el cuidado de pisos en museos, centros de ciencia y espacios públicos.','Welcome visitors, share information and schedule floor care in museums, science centers and public venues.')]
for i,h in enumerate(home['solutions']):
 key=h['jumpUrl'].rsplit('/',1)[-1];p=read('en_solutions_'+key)['data']['data'];ep=read('es_solutions_'+key).get('data',{}).get('data',{}) or {};scenes=[s for g in (p.get('secondSolutionModule') or {}).get('secondSolutionItem',[]) for s in g['sceneItems']];escenes=[s for g in (ep.get('secondSolutionModule') or {}).get('secondSolutionItem',[]) for s in g['sceneItems']];modelnames=[];ss=[]
 for j,s in enumerate(scenes):
  enames=[clean(x['title']) for x in s.get('products',[])];modelnames+=enames;es=escenes[j] if j<len(escenes) else s
  ss.append({'title':bi(es['title'],s['title']),'image':asset(s.get('mediaUrl',[{}])[0].get('mediaUrl','')) if s.get('mediaUrl') else '', 'models':[slugmap[n] for n in enames if n in slugmap]})
 industries.append({'slug':key,'title':bi(industryNames[i],h['title']),'description':bi(*industryDescriptions[i]),'image':asset(h['mediaUrl']),'scenes':ss,'models':list(dict.fromkeys(slugmap[n] for n in modelnames if n in slugmap)),'source':'https://www.pudurobotics.com/en'+h['jumpUrl']})
# All official accessory entries, with model compatibility taken from manufacturer grouping.
ap=read('en_accessory')['data']['initData']['productPart'];eap=read('es_accessory').get('data',{}).get('initData',{}).get('productPart',[]);ea={r['partId']:r for g in eap[:1] for c in g['category'][:1] for r in c['partSimpleInfo']};accessories=[]
for r in ap[0]['category'][0]['partSimpleInfo']:
 models=[clean(g['title'].replace(' Accessories','')) for g in ap[1:] if any(x['partId']==r['partId'] for c in g['category'][:1] for x in c['partSimpleInfo'])]
 accessories.append({'id':r['partId'],'name':bi(ea.get(r['partId'],r)['name'],r['name']),'image':asset(r['imageUrl']),'models':models,'type':'iot' if r['categoryTagName']=='IOT Accessories' else 'accessory','source':'https://www.pudurobotics.com/en/accessory'})
# Download links remain on the official CDN; visitors choose whether to open them.
downloads=[]
def files(x):
 if isinstance(x,dict):
  if x.get('downloadUrl','').endswith('.pdf'):downloads.append({'title':x['title'],'url':x['downloadUrl'],'sizeKB':x.get('size')})
  for v in x.values():files(v)
 elif isinstance(x,list):
  for v in x:files(v)
files(read('en_download')['data']['data'])
logos=[{'image':asset(u),'source':'https://www.pudurobotics.com/en','name':''} for u in home['customerLogos']]
# The original logo is kept untouched.
asset('https://www.pudurobotics.com/_next/static/media/logo.851bf515.svg')
result={'verifiedAt':'2026-09-13','products':products,'aliases':aliases,'industries':industries,'accessories':accessories,'downloads':downloads,'logos':logos,'families':[{'image':asset(x['mediaUrl']),'category':k} for x,k in zip(home['homeProductLines'],['cleaning','industrial','delivery','ai'])]}
(ROOT/'lib/pudu-catalog.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
(ROOT/'docs/pudu/web-media-jobs.json').write_text(json.dumps(list(jobs.values()),ensure_ascii=False,indent=2))
print({'products':len(products),'industries':len(industries),'accessories':len(accessories),'media':len(jobs)})
