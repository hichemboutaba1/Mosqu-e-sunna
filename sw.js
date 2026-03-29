const CACHE = 'msunna-v2';
const ASSETS = [
  './', './index.html', './manifest.json',
  './fonts/outfit-300.woff2', './fonts/outfit-400.woff2', './fonts/outfit-600.woff2',
  './fonts/cormorant-400.woff2', './fonts/cormorant-600.woff2', './fonts/cormorant-700.woff2',
  './fonts/amiri-arabic-400.woff2', './fonts/amiri-arabic-700.woff2', './fonts/amiri-latin-400.woff2'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      var clone = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
