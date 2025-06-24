// A descriptive cache name helps in managing updates.
// Incrementing the version (e.g., to 'v6') will trigger the 'activate' event for cleanup.
const CACHE_NAME = 'grappa-guest-guide-v6';

// A comprehensive list of assets to cache for a full offline experience.
const URLS_TO_CACHE = [
  // Core files
  './',
  
  // Core scripts - Essential for the app to function (removed Tailwind CDN due to CORS)
  'https://unpkg.com/react@18/umd/react.development.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  
  // Fonts - Caching fonts prevents layout shifts and ensures consistent typography.
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
  
  // App Icons
  './grappa_icon_192px.png',
  './grappa_icon_512px.png',
  
  // Key Images - All images used in the app for a complete offline UI.
  'https://i.imgur.com/s6g6A4b.png', // App Icon
  'https://i.imgur.com/r4z8Ibx.png', // OG Image
  'https://i.imgur.com/MBYTWps.png', // Logistics info
  'https://i.imgur.com/ChMRT7d.jpg', // Sushi menu
  'https://i.imgur.com/2AahzMz.png', // Pool hours
  'https://i.imgur.com/5vg5NXj.png',  // Spa info (fixed URL)
  
  // Downloadable Trail Files - Caching these ensures guests can access them without a connection.
  './walk_to_the_bulbouse_mountain.gpx',
  './Zepp20230405100344.gpx',
  './Zepp20230118153553.gpx',
  './12km_walk.gpx'
];

// The 'install' event is fired when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell');
        // Cache each URL individually to handle CORS issues gracefully
        return Promise.all(
          URLS_TO_CACHE.map(url => {
            return cache.add(url).catch(err => {
              console.warn('Failed to cache:', url, err);
              // Continue with other resources even if one fails
            });
          })
        );
      })
      .then(() => {
        // This forces the waiting service worker to become the active service worker.
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// The 'activate' event is fired when the service worker becomes active.
// It's the perfect place to clean up old, unused caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache's name is different from our current one, we delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all open clients (pages) without requiring a reload.
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// The 'fetch' event is fired for every network request.
// We intercept this to serve cached assets when available.
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Use a "Network first, falling back to cache" strategy for HTML
  // This ensures fresh content when online
  if (event.request.mode === 'navigate' || event.request.url.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response before using it
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For other assets, use cache first for performance
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then(networkResponse => {
          // Only cache successful responses from our origin
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return networkResponse;
        });
      })
  );
});