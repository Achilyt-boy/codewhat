// Service Worker for Intango TSS - LO4 Practical Assignment
// Version: v1 (initial release)
// Caches offline.html for offline navigation fallback

const CACHE_NAME = 'intango-v1';

// Files to cache during installation
const OFFLINE_PAGE = '/offline.html';

// Install Event: Cache the offline page
self.addEventListener('install', (event) => {
  console.log('[SW] Install event triggered');

  // Open the cache and add the offline page
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cache opened:', CACHE_NAME);
      return cache.add(OFFLINE_PAGE).then(() => {
        console.log('[SW] Offline page cached successfully:', OFFLINE_PAGE);
      }).catch((error) => {
        console.error('[SW] Failed to cache offline page:', error);
        throw error; // Ensure installation fails if caching fails
      });
    }).catch((error) => {
      console.error('[SW] Failed to open cache:', error);
      throw error;
    })
  );

  // Take control immediately after installation
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event triggered');

  event.waitUntil(
    // Get all cache names
    caches.keys().then((cacheNames) => {
      // Filter and delete obsolete caches that start with 'intango-' but are not current
      const obsoleteCaches = cacheNames.filter(
        (name) => name.startsWith('intango-') && name !== CACHE_NAME
      );

      // Delete each obsolete cache
      return Promise.all(
        obsoleteCaches.map((cacheName) => {
          console.log('[SW] Deleting obsolete cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('[SW] Cache cleanup completed');
      // Claim all clients to take control immediately
      return self.clients.claim();
    }).catch((error) => {
      console.error('[SW] Cache cleanup failed:', error);
    })
  );
});

// Fetch Event: Network-first strategy for navigation
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests for this assignment
  // Leave other request types (images, scripts, etc.) untouched
  if (event.request.mode === 'navigate') {
    console.log('[SW] Navigation request intercepted:', event.request.url);

    event.respondWith(
      // Network-first: try the network first, fall back to cache
      fetch(event.request)
        .then((response) => {
          // Network succeeded, return the response
          console.log('[SW] Network response successful');
          return response;
        })
        .catch((error) => {
          console.log('[SW] Network failed, serving offline fallback:', error);

          // Try to return the cached offline page
          return caches.match(OFFLINE_PAGE).then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[SW] Served cached offline page');
              return cachedResponse;
            }

            // Emergency fallback if cached page is missing (should not happen)
            console.error('[SW] Cached offline page not found!');
            return new Response(
              'Unable to load page. Please check your connection.',
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'text/plain' }
              }
            );
          });
        })
    );
  }
  // Other request types are left untouched
});

// Message handler for debugging (optional)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
