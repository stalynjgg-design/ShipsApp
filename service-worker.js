
/* =========================================
   SHIPSAPP - SERVICE WORKER
========================================= */

const CACHE_NAME = "shipsapp-cache-v1";

const APP_FILES = [
    "../frontend/pages/index.html",
    "../frontend/pages/login.html",
    "../frontend/pages/register.html",
    "../frontend/styles/main.css",
    "../frontend/styles/liquid-glass.css",
    "../frontend/styles/responsive.css",
    "../frontend/scripts/app.js"
];

// INSTALAR SERVICE WORKER
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(APP_FILES);
        })
    );

    self.skipWaiting();

});

// ACTIVAR SERVICE WORKER
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {

            return Promise.all(
                cacheNames.map(cacheName => {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })
            );

        })
    );

    self.clients.claim();

});

// INTERCEPTAR SOLICITUDES
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request).then(cachedResponse => {

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request);

        })

    );

});
