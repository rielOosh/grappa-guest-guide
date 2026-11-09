const CACHE_NAME = 'grappa-guest-guide-v38';

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
  './swiming_pool_instructions.jpg?v=8',
  './swimming_pool_rules_en-v2.pdf',
  './swimming_pool_rules_he-v2.pdf',
  'https://i.imgur.com/ChMRT7d.jpg', // Sushi menu
  'https://i.imgur.com/5vg5NXj.png', // Spa info

  // Pre-parsed Offline Trail Data (all 4 desert hikes)
  './gpx_data.js'
];

// Install event: pre-cache App Shell assets individually so a single external failure never blocks install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell (v38)');
        return Promise.all(
          URLS_TO_CACHE.map(url => {
            return cache.add(url).catch(err => {
              console.warn('Failed to pre-cache:', url, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up older caches and claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network-first for HTML navigation; Cache-first with runtime caching for assets & tiles
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const reqUrl = new URL(event.request.url);
  const isSameOrigin = reqUrl.origin === self.location.origin;

  // IMPORTANT: Only ignore query strings for same-origin static assets (e.g., ?v=8 cache-busters).
  // Cross-origin URLs like https://fonts.googleapis.com/css2?family=... rely on query parameters!
  const matchOptions = isSameOrigin ? { ignoreSearch: true } : { ignoreSearch: false };

  // Network-first strategy for HTML documents
  if (event.request.mode === 'navigate' || reqUrl.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
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

  // Cache-first strategy for static assets, fonts, images, and viewed map tiles
  event.respondWith(
    caches.match(event.request, matchOptions)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache).catch(() => {});
              });

            return networkResponse;
          })
          .catch(() => {
            return caches.match(event.request, matchOptions);
          });
      })
  );
});
