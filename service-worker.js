// A descriptive cache name helps in managing updates.
// To update your PWA, you only need to change this version string.
const CACHE_NAME = 'grappa-guest-guide-v1.1';

// This is the list of all files that make up your app's "shell".
// Caching these ensures the app loads instantly, even offline.
const URLS_TO_CACHE = [
    './', // This caches the root HTML file.
    './manifest.json', // Cache the manifest itself.
    
    // Core Scripts
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    
    // Fonts
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    
    // Key Images
    'https://i.imgur.com/s6g6A4b.png', // App Icon
    'https://i.imgur.com/r4z8Ibx.png', // OG Image
    'https://i.imgur.com/MBYTWps.png', // Logistics info
    'https://i.imgur.com/ChMRT7d.jpg', // Sushi menu
    'https://i.imgur.com/2AahzMz.png', // Pool hours
    'https://imgur.com/5vg5NXj.png', // Spa info
    
    // Downloadable Trail Files
    './walk_to_the_bulbouse_mountain.gpx',
    './Zepp20230405100344.gpx',
    './Zepp20230118153553.gpx',
    './12km_walk.gpx'
];

// 1. INSTALL: Fired when the service worker is first installed.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching App Shell');
                // addAll() fetches and caches all URLs. If any fetch fails, the entire install fails.
                return cache.addAll(URLS_TO_CACHE);
            })
            .then(() => self.skipWaiting()) // Activate the new service worker immediately.
    );
});

// 2. ACTIVATE: Fired when the service worker becomes active.
// This is the perfect time to clean up old, unused caches.
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
        }).then(() => self.clients.claim()) // Take control of open pages.
    );
});

// 3. FETCH: Fired for every network request the page makes.
self.addEventListener('fetch', event => {
    // We only want to cache safe, GET requests.
    if (event.request.method !== 'GET') {
        return;
    }
    
    // "Cache first, then network" strategy
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // If the resource is in the cache, return it.
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // If not in cache, fetch it from the network.
                return fetch(event.request).then(networkResponse => {
                    // Clone the response because it's a stream that can only be consumed once.
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // Add the new response to the cache for next time.
                            cache.put(event.request, responseToCache);
                        });
                    
                    // Return the original response to the browser.
                    return networkResponse;
                });
            })
    );
});