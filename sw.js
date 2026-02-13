self.addEventListener('install', (e) => {
 e.waitUntil(caches.open('bhs-v1').then((c) => c.addAll(['index.html', 'style.css', 'main.js'])));
});
self.addEventListener('fetch', (e) => {
 e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
