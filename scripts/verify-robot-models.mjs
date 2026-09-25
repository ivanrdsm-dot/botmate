import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const base = process.argv[2] || 'http://localhost:3013';
const models = [];
for (const variant of ['d5-w', 'd5']) {
  const path = `/media/models/${variant}-reconstruction.glb`;
  const file = await readFile(new URL(`../public${path}`, import.meta.url));
  assert.equal(file.toString('ascii', 0, 4), 'glTF');
  assert.equal(file.readUInt32LE(4), 2);
  assert.equal(file.readUInt32LE(8), file.length);
  const json = JSON.parse(file.toString('utf8', 20, 20 + file.readUInt32LE(12)));
  assert(!json.buffers.some(buffer => buffer.uri), 'GLB must be self-contained');
  assert(!(json.images || []).some(image => image.uri && !image.uri.startsWith('data:')), 'No external textures');
  const gltf = await new GLTFLoader().parseAsync(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength), '');
  let root;
  gltf.scene.traverse(object => { if (object.name.endsWith('_visual_reconstruction')) root = object; });
  assert(root, 'Robot root is required');
  const bounds = new Box3().setFromObject(root), size = bounds.getSize(new Vector3());
  for (const [axis, expected] of [['x', .9], ['y', .572], ['z', .543]]) assert(Math.abs(size[axis] - expected) < .025, `Unexpected ${axis} extent: ${size[axis]}`);
  let meshes = 0;
  root.traverse(object => { if (object.isMesh) { meshes++; const position = object.geometry.getAttribute('position'); for (const v of position.array) assert(Number.isFinite(v)); } });
  assert(meshes > 50);
  const response = await fetch(base + path, { headers: { Range: 'bytes=0-31' } });
  assert.equal(response.status, 206);
  assert.equal(Buffer.from(await response.arrayBuffer()).toString('ascii', 0, 4), 'glTF');
  models.push({ variant, meshes, bytes: file.length, dimensions: size.toArray(), range: response.status });
}
for (const route of ['/robots/pudu-d5-series', '/en/robots/pudu-d5-series']) {
  const response = await fetch(base + route); assert.equal(response.status, 200);
  const html = await response.text();
  assert(html.includes(route.startsWith('/en') ? 'Explore in 3D' : 'Explorar en 3D'));
  assert(html.includes(route.startsWith('/en') ? 'Official image' : 'Imagen oficial'));
  assert(!/<canvas/.test(html), '3D should not load before user requests it');
}
const report = { checkedAt: new Date().toISOString(), base, models, routes: 2 };
await writeFile(new URL('../docs/3d/d5/models-qa.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
