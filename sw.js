/* Merkalimentos: funciona sin internet y se actualiza sola cuando hay conexión */
const CACHE = 'merkalimentos-v131';
const ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './icon-192-v2.png', './icon-512-v2.png', './icon-maskable-512-v2.png', './apple-touch-icon-v2.png', './logo-merkalimentos.svg', './fb/fb-app.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   /* mapas y otros sitios: directo a internet */
  if (url.pathname.includes('/catalogo/')) return;   /* el catálogo de clientes tiene su propio funcionamiento */
  /* Manifiesto e íconos: primero internet para que instalar y el ícono siempre usen lo más nuevo */
  if (/\.webmanifest$|icon[^/]*\.png$|logo[^/]*\.svg$/.test(url.pathname)) {
    e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(r => { if (r.ok) { const c2 = r.clone(); caches.open(CACHE).then(c => c.put(e.request, c2)); } return r; })
      .catch(() => caches.match(e.request)));
    return;
  }
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    /* La app: primero internet (versión más nueva); sin señal, la copia guardada */
    e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copia)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return res; })));
});
