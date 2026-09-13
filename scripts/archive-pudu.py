"""Archive public, authorized Pudu media; never executes downloaded content."""
import concurrent.futures, hashlib, json, pathlib, urllib.request, time
ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / '.pudu-source' / 'originals'
DEST.mkdir(parents=True, exist_ok=True)
items = json.loads((ROOT / 'docs/pudu/media-inventory.json').read_text())
def get(item):
    url = item['url']
    path = DEST / (hashlib.sha256(url.encode()).hexdigest()[:16] + '.' + item['type'])
    for attempt in range(3):
        try:
            if not path.exists():
                with urllib.request.urlopen(url, timeout=120) as response:
                    temp = path.with_suffix(path.suffix + '.part')
                    with temp.open('wb') as out:
                        while chunk := response.read(1024 * 1024): out.write(chunk)
                    temp.replace(path)
            return {**item, 'archive': str(path.relative_to(ROOT)), 'bytes': path.stat().st_size, 'status': 'downloaded'}
        except Exception as error:
            if attempt == 2: return {**item, 'status':'failed', 'error':str(error)}
    return item
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for i,result in enumerate(pool.map(get,items)):
        results.append(result)
        if i % 50 == 0: print(f'{i+1}/{len(items)} archived',flush=True)
(ROOT / 'docs/pudu/archive-report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps({'total':len(results),'failed':sum(r['status']=='failed' for r in results),'bytes':sum(r.get('bytes',0) for r in results)}),flush=True)
