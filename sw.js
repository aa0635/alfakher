'use strict';
/* عامل الخدمة: يخزّن ملفات البرنامج ليعمل بدون إنترنت بعد أول فتح.
   الشبكة أولًا (فتظهر التحديثات فور توفر الاتصال)، ثم النسخة المخزنة عند انقطاعه.
   بيانات الفواتير والحسابات لا تمر من هنا؛ مكانها قاعدة بيانات المتصفح. */
const CACHE='alfakher-v1',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res})
  .catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))))});
