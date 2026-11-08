/* Cliente consentido: siempre busca la versión más nueva; sin señal usa la última guardada */
const CACHE = 'cliente-consentido-v3';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const clave = url.origin + url.pathname;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(k => k.put(clave, c)); } return r; })
    .catch(() => caches.match(clave)));
});
