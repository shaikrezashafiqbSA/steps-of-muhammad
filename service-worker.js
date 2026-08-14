const CACHE_NAME = 'steps-of-muhammad-v2';

// App shell: the minimum needed to open the app and render any dua offline immediately after install.
// render.html/render_collection.html are the engine that fetches individual dua .md files at runtime
// (see fetch handler below) — the .md/.html content itself is cached on-the-fly as each page is visited,
// so migrating pages from standalone .html to render.html?file=x.md needs no changes here.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './dua-core.css',
  './render.html',
  './render_collection.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

// Best-effort: the markdown renderer depends on this, but a hiccup fetching it shouldn't abort install.
const CDN_SHELL = [
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL).then(() => Promise.all(
        CDN_SHELL.map((url) => fetch(url, { mode: 'cors' })
          .then((res) => res.ok && cache.put(url, res))
          .catch(() => {}))
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Network-first: always serve the freshest content when online (dua text does get corrected),
// cache every successful response as we go, and fall back to cache when offline.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache real successes. Opaque responses (type 'opaque') are cross-origin no-cors
        // fetches — e.g. Google Fonts files — whose status we can't inspect, so we cache those too;
        // an actual same-origin 404 (a dead link left over from a page migration) is never cached.
        if (response.ok || response.type === 'opaque') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => {
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('./index.html');
      }))
  );
});
