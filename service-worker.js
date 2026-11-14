const APP_CACHE = 'grappa-guest-guide-v43';
const TILE_CACHE = 'grappa-map-tiles-v1';
const MAX_CACHED_TILES = 1500;

// Comprehensive list of App Shell assets to pre-cache for a reliable offline experience.
// Note: Pre-parsed trail coordinates for all 4 hikes live in ./gpx_data.js (143 KB),
// while raw .gpx files are cached on-demand if downloaded.
const URLS_TO_CACHE = [
  // Core App Shell
  './',
  './index.html',
  './manifest.json',

  // Leaflet.js Mapping Library (cached for offline hiking map)
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',

  // Typography & Icon Fonts
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Secular+One&display=swap',

  // App Icons & Brand Marks
  './grappa_icon_192px.png',
  './grappa_icon_512px.png',
  './grappa_icon.png',
  './icon-192.svg',
  './icon-512.svg',

  // Local Schedules, Menus & Pool Regulations
  './Grocery_hours.jpg',
  './swimming_pool_rules_en-v2.pdf',
  './swimming_pool_rules_he-v2.pdf',
  'https://i.imgur.com/ChMRT7d.jpg', // Sushi menu
  'https://i.imgur.com/5vg5NXj.png', // Spa info

  // Pre-parsed Offline Trail Data (all 4 desert hikes)
  './gpx_data.js'
];

const NO_CORS_SHELL_URLS = [
  'https://cdn.tailwindcss.com'
];

const FONT_CSS_URLS = [
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Secular+One&display=swap'
];

const isTileRequest = (reqUrl) => {
  return (
    reqUrl.hostname === 'server.arcgisonline.com' ||
    reqUrl.hostname === 'israelhiking.osm.org.il' ||
    reqUrl.hostname.endsWith('.tile.openstreetmap.org')
  );
};

const trimTileCache = async (cache, maxEntries = MAX_CACHED_TILES) => {
  try {
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
      const excess = keys.length - maxEntries;
      await Promise.all(keys.slice(0, excess).map(key => cache.delete(key)));
    }
  } catch (e) {}
};

// Install event: pre-cache App Shell assets individually so a single external failure never blocks install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(async cache => {
        console.log('Service Worker: Caching App Shell (v43)');
        await Promise.all(
          URLS_TO_CACHE.map(url => {
            const req = url.includes('i.imgur.com')
              ? new Request(url, { mode: 'cors', referrerPolicy: 'no-referrer' })
              : (url === './' || url === './index.html')
                ? new Request(url, { cache: 'no-cache' })
                : url;
            return cache.add(req).catch(err => {
              console.warn('Failed to pre-cache:', url, err);
            });
          })
        );

        // Pre-cache external runtime scripts safely (no-cors opaque cache entry for Tailwind CDN)
        await Promise.all(
          NO_CORS_SHELL_URLS.map(async url => {
            try {
              const res = await fetch(url, { mode: 'no-cors' });
              if (res) await cache.put(url, res);
            } catch (err) {
              console.warn('Failed to pre-cache no-cors shell asset:', url, err);
            }
          })
        );

        // Pre-cache referenced .woff2 font binaries from Google Fonts stylesheets for offline typography
        await Promise.all(
          FONT_CSS_URLS.map(async cssUrl => {
            try {
              const cssRes = await cache.match(cssUrl) || await fetch(cssUrl);
              if (!cssRes || !cssRes.ok) return;
              const cssText = await cssRes.text();
              const fontUrls = Array.from(new Set(cssText.match(/https:\/\/fonts\.gstatic\.com\/[^)'"\s]+\.woff2/g) || []));
              await Promise.all(
                fontUrls.slice(0, 40).map(fontUrl =>
                  cache.add(new Request(fontUrl, { mode: 'cors' })).catch(() => {})
                )
              );
            } catch (e) {}
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up older app caches while preserving persistent TILE_CACHE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== APP_CACHE && cacheName !== TILE_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Tile Cache-First (TILE_CACHE), Network-first for HTML navigation, Cache-first for App Shell
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const reqUrl = new URL(event.request.url);
  const isSameOrigin = reqUrl.origin === self.location.origin;
  const matchOptions = isSameOrigin ? { ignoreSearch: true } : { ignoreSearch: false };

  // Dedicated persistent cache-first handler for satellite & desert topo tiles
  if (isTileRequest(reqUrl)) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async tileCache => {
        const cached = await tileCache.match(event.request, { ignoreVary: true });
        if (cached) {
          return cached;
        }
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            tileCache.put(event.request, responseToCache)
              .then(() => trimTileCache(tileCache))
              .catch(() => {});
          }
          return networkResponse;
        } catch (err) {
          return tileCache.match(event.request, { ignoreVary: true })
            .then(fallback => fallback || Response.error());
        }
      })
    );
    return;
  }

  // Network-first strategy for HTML documents
  if (event.request.mode === 'navigate' || reqUrl.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(APP_CACHE).then(cache => {
              cache.put(event.request, responseToCache).catch(() => {});
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request, { ignoreSearch: true })
            .then(cached => cached || caches.match('./index.html', { ignoreSearch: true }));
        })
    );
    return;
  }

  // Cache-first strategy for static assets, fonts, scripts, and images
  event.respondWith(
    caches.open(APP_CACHE).then(appCache =>
      appCache.match(event.request, matchOptions).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            appCache.put(event.request, responseToCache).catch(() => {});
            return networkResponse;
          })
          .catch(() => appCache.match(event.request, matchOptions));
      })
    )
  );
});
