import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getTheme, applyTheme } from './utils/theme';
import { APP_VERSION } from './version';

// Apply initial theme
applyTheme(getTheme());

// Log app version
console.log(`[main.jsx] GrappA Guest Guide v${APP_VERSION}`);
console.log('[main.jsx] About to apply theme and render...');

// Check if version has changed and clear cache if needed
const storedVersion = localStorage.getItem('app-version');
if (storedVersion && storedVersion !== APP_VERSION) {
  console.log(`Version updated from ${storedVersion} to ${APP_VERSION} - clearing cache`);
  if (caches) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        console.log('Clearing cache:', name);
        caches.delete(name);
      });
    });
  }
}
localStorage.setItem('app-version', APP_VERSION);

// Unregister old service worker and clear old cache
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      // Check if it's the old service worker
      if (registration.active && registration.active.scriptURL.includes('/service-worker.js')) {
        console.log('Unregistering old service worker');
        registration.unregister();

        // Clear old cache
        if (caches) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              if (name.includes('grappa-guest-guide-v0')) {
                console.log('Deleting old cache:', name);
                caches.delete(name);
              }
            });
          });
        }
      }
    });
  });
}

// Vite PWA plugin will handle service worker registration via registerSW.js

console.log('[main.jsx] About to create React root and render App...');
try {
  const root = document.getElementById('root');
  console.log('[main.jsx] Root element found:', !!root);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[main.jsx] React render call completed');
} catch (error) {
  console.error('[main.jsx] ERROR during render:', error);
}
