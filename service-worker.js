const CACHE_NAME = 'steps-of-muhammad-v1';

// App shell: the minimum needed to open the app offline immediately after install.
// Individual dua pages are cached on-the-fly the first time each one is visited (see fetch handler below),
// so new pages added to the site don't require updating this list.
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './dua-core.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
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
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => {
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('./index.html');
      }))
  );
});
