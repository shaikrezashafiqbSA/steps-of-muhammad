/* ════════════════════════════════════════════════════════════════
   Steps of Muhammad — Service Worker
   Offline-first PWA for the GitHub Pages static site.

   Strategies:
   • App shell (HTML/JS/font/icons)  → precached at install, then
     network-first so content updates ship immediately, with the
     cached copy as the offline fallback.
   • Content & media (.md, images)   → cache-first, refreshed in the
     background (stale-while-revalidate) so repeat reads are instant
     and work with no connection.
   • Cross-origin CDNs (Tailwind,
     Google Fonts, jsdelivr)          → cache-first with a runtime
     cap; the app still renders offline once they are cached.
   ════════════════════════════════════════════════════════════════ */

const VERSION = 'v1.0.0';
const SHELL_CACHE = `shell-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const CDN_CACHE = `cdn-${VERSION}`;

const MAX_RUNTIME_ENTRIES = 300;
const MAX_CDN_ENTRIES = 60;

/* Everything needed for the app to open and render offline. */
const PRECACHE = [
  './',
  './index.html',
  './web/render.html',
  './web/render_collection.html',
  './web/nav-data.js',
  './web/sun-clock.js',
  './fonts/UthmanicHafsVer18.ttf',
  './assets/black-flag.jpeg',
  './assets/black-flag-nur.jpeg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './manifest.json',
];

/* ── install: precache the shell, activate immediately ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── activate: drop caches from older versions ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => ![SHELL_CACHE, RUNTIME_CACHE, CDN_CACHE].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── helpers ── */
function isNavigation(request) {
  return request.mode === 'navigate'
    || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function isCdn(request) {
  const host = new URL(request.url).hostname;
  return ['cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net']
    .includes(host);
}

function isStaticAsset(request) {
  return /\.(js|css|ttf|woff2?|png|jpe?g|svg|webp|json|md)(\?.*)?$/i.test(new URL(request.url).pathname);
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)));
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    // Full offline fallback for any in-app page: hand back the viewer shell.
    return cache.match('./web/render.html', { ignoreSearch: true })
      || cache.match('./index.html');
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) {
    cache.put(request, response.clone());
    await trimCache(cacheName, cacheName === CDN_CACHE ? MAX_CDN_ENTRIES : MAX_RUNTIME_ENTRIES);
  }
  return response;
}

/* Stale-while-revalidate: serve cache instantly, update in background. */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  const fetched = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === 'opaque')) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || fetched;
}

/* ── fetch routing ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin && !isCdn(request)) return; // let the browser handle the rest

  // Pages (index / render / render_collection): fresh copy when online,
  // cached copy when offline.
  if (isNavigation(request)) {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  // CDN libraries & fonts: cache once, reuse forever (until a new VERSION).
  if (isCdn(request)) {
    event.respondWith(staleWhileRevalidate(request, CDN_CACHE));
    return;
  }

  // Content markdown, fonts, images, JS data: instant from cache, refresh behind.
  if (isStaticAsset(request)) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});

/* ── message: allow the page to trigger an immediate update ── */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
