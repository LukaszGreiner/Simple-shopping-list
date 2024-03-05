if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

// Cache static assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static-cache").then(function (cache) {
      return cache.addAll(["/", "/index.html", "/style.css", "/script.js"]);
    })
  );
});

// Serve cached assets
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});