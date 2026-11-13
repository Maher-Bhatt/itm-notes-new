// CampusLoop Killer Service Worker
// Purpose: Automatically unregister legacy PWA Service Workers, purge obsolete CacheStorage, and force clients to load the latest release.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        // 1. Wipe every CacheStorage entry
        if ('caches' in self) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch (e) {}

      try {
        // 2. Unregister this service worker registration
        await self.registration.unregister();
      } catch (e) {}

      try {
        // 3. Claim all window clients and navigate them to trigger a fresh network fetch
        if (self.clients && self.clients.claim) {
          await self.clients.claim();
          const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
          for (const client of clientList) {
            if ('navigate' in client && client.url) {
              client.navigate(client.url);
            }
          }
        }
      } catch (e) {}
    })()
  );
});

// Pass through all network requests directly - never cache stale assets
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
