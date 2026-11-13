// v2: pages are network-first so content edits show up right after a deploy.
// v1 served the cached homepage forever, so returning visitors never saw
// updates and could load chunk URLs that no longer exist after a deploy.
const CACHE = 'nabiloo-v2'
const PRECACHE = ['/', '/manifest.webmanifest']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  // Pages: always try the network, keep a copy for offline use.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok && url.pathname === '/') {
            const copy = res.clone()
            caches.open(CACHE).then(c => c.put('/', copy))
          }
          return res
        })
        .catch(() => caches.match('/'))
    )
    return
  }

  // Hashed build assets never change, so cache-first is safe for them.
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone()
          caches.open(CACHE).then(c => c.put(req, copy))
        }
        return res
      }))
    )
  }
  // Everything else goes straight to the network.
})
