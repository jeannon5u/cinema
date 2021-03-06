const cacheName = "static";

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/images/icons/icon-128x128.png',
                    '/images/icons/icon-144x144.png',
                    '/images/icons/icon-512x512.png',
                    'index.html'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request)
                .then(function(response){
                    return caches.open(cacheName)
                        .then(function(cache){
                            cache.put(event.request, response.clone());
                            return response;
                        }
                    )
                }
            );
        }
    ));
}); 