/* Network-first service worker: always fetch fresh content when online,
   fall back to the cache offline. Bump VERSION when files change. */
const VERSION = "bioglow-v1";
const ASSETS = ["./", "index.html", "css/style.css", "js/app.js", "js/figures.js", "data/ch02.js", "manifest.webmanifest", "icons/icon.svg"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
