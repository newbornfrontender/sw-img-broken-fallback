const baseHref = 'sw-img-broken-fallback';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open('precache')
      .then((cache) => cache.add(`/${baseHref}/img/broken.png`)),
  );
});

function isImage(fetchRequest) {
  return fetchRequest.method === 'GET' && fetchRequest.destination === 'image';
}

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.ok) return response;

        if (isImage(e.request))
          return caches.match(`/${baseHref}/img/broken.png`);
      })
      .catch((err) => {
        if (isImage(e.request))
          return caches.match(`/${baseHref}/img/broken.png`);
      }),
  );
});
