// Service Worker for WebPage Builder Mobile App
const CACHE_NAME = 'webpage-builder-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://checkout.razorpay.com/v1/checkout.js',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=600&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=600&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Strategy: Cache First, then Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Background Sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
});

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from WebPage Builder!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Services'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('WebPage Builder', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#/services')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function for background sync
function syncContactForms() {
  // This would sync any pending form submissions
  // For now, just log to console
  console.log('Syncing contact forms...');
  return Promise.resolve();
}