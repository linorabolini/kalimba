!function(){"use strict";const e=["client/index.5e33a679.js","client/index.4facd370.js","client/Kalimba.aaadd3f9.js","client/client.ca2aabe9.js"].concat(["service-worker-index.html",".DS_Store","Misiones.wav","favicon.png","global.css","kalimba.wav","lego_blue_texture.jpg","lego_texture.jpg","logo-192.png","logo-512.png","manifest.json","metal2_texture.jpg","metal_texture.jpg","up2_texture.jpg","up_texture.jpg","wood2_texture.jpg","wood_texture.jpg"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1606064441426").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1606064441426"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const a=new URL(e.request.url);a.protocol.startsWith("http")&&(a.hostname===self.location.hostname&&a.port!==self.location.port||(a.host===self.location.host&&t.has(a.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1606064441426").then(async t=>{try{const a=await fetch(e.request);return t.put(e.request,a.clone()),a}catch(a){const n=await t.match(e.request);if(n)return n;throw a}}))))})}();
