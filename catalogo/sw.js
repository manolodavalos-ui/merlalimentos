/* Cliente consentido: siempre busca la versión más nueva; sin señal usa la última guardada */
const CACHE = 'cliente-consentido-v23';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const clave = url.origin + url.pathname;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(k => k.put(clave, c)); } return r; })
    .catch(() => caches.match(clave)));
});

/* Avisos: llegan como datos {titulo, cuerpo, link, tag} y se muestran aquí */
self.addEventListener('push', e => {
  let j = {}; try { j = e.data ? e.data.json() : {}; } catch (_) { j = {cuerpo: e.data && e.data.text()}; }
  const d = j.data || j;
  e.waitUntil(self.registration.showNotification(d.titulo || 'Merkalimentos', {
    body: d.cuerpo || '', tag: d.tag || undefined, renotify: !!d.tag, icon: 'cc-icon-192.png', badge: 'cc-icon-192.png', data: {link: d.link || './'}
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.link) || './', self.registration.scope).href;
  e.waitUntil(clients.matchAll({type: 'window', includeUncontrolled: true}).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope) && 'focus' in w) { w.navigate && url !== w.url && !url.endsWith('/') ? w.navigate(url) : 0; return w.focus(); }
    return clients.openWindow(url);
  }));
});
