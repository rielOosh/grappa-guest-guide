import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getTheme, applyTheme } from './utils/theme';
import { APP_VERSION } from './version';

// Apply initial theme
applyTheme(getTheme());

// Log app version and device info
console.log(`[main.jsx] GrappA Guest Guide v${APP_VERSION}`);
console.log('[main.jsx] User Agent:', navigator.userAgent);
console.log('[main.jsx] Screen size:', window.innerWidth, 'x', window.innerHeight);
console.log('[main.jsx] Is mobile:', /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
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

// Add visual error display for mobile debugging
window.addEventListener('error', (event) => {
  console.error('[Window Error]', event.error);
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:20px;z-index:99999;font-size:14px;';
  errorDiv.innerHTML = `<strong>Error:</strong> ${event.error?.message || event.message}<br><small>${event.error?.stack || ''}</small>`;
  document.body.appendChild(errorDiv);
});

console.log('[main.jsx] About to create React root and render App...');
try {
  const root = document.getElementById('root');
  console.log('[main.jsx] Root element found:', !!root);

  if (!root) {
    throw new Error('Root element not found!');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[main.jsx] React render call completed');
} catch (error) {
  console.error('[main.jsx] ERROR during render:', error);
  // Show error on screen for mobile debugging
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#ef4444;color:white;padding:20px;z-index:99999;font-size:16px;overflow:auto;';
  errorDiv.innerHTML = `
    <h1 style="margin:0 0 10px 0;">App Failed to Load</h1>
    <p><strong>Error:</strong> ${error.message}</p>
    <p><strong>User Agent:</strong> ${navigator.userAgent}</p>
    <pre style="background:rgba(0,0,0,0.3);padding:10px;border-radius:5px;overflow:auto;">${error.stack}</pre>
  `;
  document.body.appendChild(errorDiv);
  throw error;
}
