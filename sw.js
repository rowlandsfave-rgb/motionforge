const C='mf-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))])));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const same=new URL(r.url).origin===location.origin;
const net=()=>fetch(r).then(x=>{if(x.ok&&x.status===200){const k=x.clone();caches.open(C).then(c=>c.put(r,k)).catch(()=>{})}return x});
e.respondWith(same?net().catch(()=>caches.match(r)):caches.match(r).then(m=>m||net()))});
