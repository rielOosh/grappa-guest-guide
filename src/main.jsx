import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getTheme, applyTheme } from './utils/theme';

// Apply initial theme
applyTheme(getTheme());

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
