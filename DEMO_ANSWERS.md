# DEMO_ANSWERS.md

## Oral Questions — LO4 Practical Assignment
**Topic:** Service Workers and Offline Access
**Level:** 5 Software Development
**School:** Intango TSS

---

## Question 1: What is a service worker?

A **service worker** is a script that runs in the background of your browser, separate from the web page. It acts like a proxy between your website and the network.

**Key characteristics:**
- It runs on a separate thread from the main JavaScript thread
- It cannot access the DOM directly (no `document` or `window` access)
- It works even when the web page is closed
- It can intercept network requests, cache responses, and serve cached content when offline

**In simple terms:** Think of a service worker as a "network assistant" that decides whether to fetch data from the internet or serve it from a local cache.

---

## Question 2: What is caching?

**Caching** is storing copies of files or data in a temporary storage location so they can be accessed faster in the future.

**For service workers:**
- We use the **Cache API** to store responses (like HTML pages, images, scripts)
- When a request is made, the service worker can choose to return the cached version instead of going to the network
- This makes the website load faster and work offline

**Types of caching strategies:**
- **Cache-first:** Check cache first, go to network if not found
- **Network-first:** Try network first, fall back to cache if offline
- **Stale-while-revalidate:** Serve cached version immediately, update cache in background

---

## Question 3: What is an offline fallback?

An **offline fallback** is a page or response that is served when the user has no internet connection and the requested page is not available in the cache.

**In our implementation:**
- When a user tries to navigate to a page while offline, the service worker intercepts the request
- It tries to fetch from the network (which fails)
- It then returns the cached `/offline.html` page
- This page shows a friendly "You're offline" message with useful information

**Why it's important:**
- Without an offline fallback, users see a generic browser error page
- With a fallback, users see a branded, helpful message

---

## Question 4: What happens during the install event?

The **install event** fires when the service worker is first installed (or when a new version is detected).

**In our code (`public/sw.js`):**

```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('intango-v1').then((cache) => {
      return cache.add('/offline.html');
    })
  );
  self.skipWaiting();
});
```

**What happens:**
1. The browser detects a new service worker file
2. The `install` event is triggered
3. We open (or create) a cache with name `intango-v1`
4. We add `/offline.html` to that cache
5. `event.waitUntil()` ensures the installation waits until caching is complete
6. If caching fails, the installation fails (we throw the error)
7. `skipWaiting()` makes the new worker activate immediately instead of waiting

**Why cache the offline page now?** We need it available before the worker can handle offline requests.

---

## Question 5: What happens during the fetch event?

The **fetch event** fires whenever the browser makes a network request (for pages, images, scripts, etc.).

**In our code (`public/sw.js`):**

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/offline.html'))
    );
  }
});
```

**What happens:**
1. Every network request triggers the `fetch` event
2. We check if it's a **navigation request** (page load, not an image/script)
3. For navigation requests only:
   - We try to fetch from the network first (network-first strategy)
   - If the network fails (user is offline), we return the cached `/offline.html`
4. Other request types (images, CSS, scripts) are left untouched

**Why only navigation requests?** This assignment focuses on providing an offline page for navigation, not caching all assets.

---

## Question 6: What happens during the activate event?

The **activate event** fires when the service worker takes control of the pages. This happens after installation completes.

**In our code (`public/sw.js`):**

```javascript
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('intango-') && name !== 'intango-v1')
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});
```

**What happens:**
1. The `activate` event is triggered
2. We get a list of all cache names
3. We filter to find caches that:
   - Start with `intango-` (our application's caches)
   - Are NOT the current cache (`intango-v1`)
4. We delete those obsolete caches
5. `self.clients.claim()` makes the service worker take control of all open pages immediately

**Why clean up?** To prevent old caches from accumulating and wasting storage space.

**Why filter by `intango-`?** To only delete our caches, not other applications' caches.

---

## Question 7: Why does a service worker not directly manipulate the DOM?

**A service worker cannot access the DOM because:**

1. **Separate thread:** The service worker runs on a different thread from the main page
2. **No `window` or `document`:** These objects only exist in the page context, not in the service worker context
3. **Design decision:** This separation improves security and performance

**What can it do instead:**
- Communicate with the page via `postMessage()` and `message` events
- Cache and serve resources
- Show notifications (with permission)
- Handle background sync

**In our implementation:** The offline page (`offline.html`) is a separate HTML file, not manipulated by the service worker. The service worker simply serves this pre-built page when offline.

---

## Question 8: Why must we visit the website online before the first offline test?

**We must visit online first because:**

1. **Service worker registration:** The service worker can only be registered when the page loads from a server (HTTPS or localhost). Opening a file directly with `file://` does not work.

2. **Installation requires network:** The `install` event fires when the service worker is first loaded. During install, we cache the offline page. This can only happen when online.

3. **Cache must be populated:** The offline page must be in the cache BEFORE the user goes offline. This happens during the install event.

4. **Page control:** The service worker only takes control of pages loaded after it's installed. You need to reload the page after installation for the worker to control it.

**Simple sequence:**
1. Visit site online → Service worker registers and installs → Offline page is cached
2. Reload page → Service worker takes control
3. Go offline → Reload → Service worker serves cached offline page

---

## Question 9: How are a web app manifest and a service worker different?

| Feature | Web App Manifest | Service Worker |
|---------|-----------------|----------------|
| **Purpose** | Makes a website installable as a PWA (like an app icon on home screen) | Enables offline functionality and background features |
| **File** | `manifest.json` | `sw.js` (JavaScript file) |
| **Controls** | App name, icons, theme color, display mode | Network requests, caching, push notifications |
| **Offline** | No direct offline capability | Yes — can serve cached content offline |
| **Required for PWA?** | Yes (must have manifest to be "installable") | No (PWA can work without it, but limited) |
| **Runs in** | Not executed — just a JSON configuration | Background thread (separate from page) |
| **Example** | Tells the browser "this app's name is CodeBridge, use this icon" | Tells the browser "when offline, show this cached page" |

**Both work together:**
- Manifest makes the app installable
- Service worker makes it work offline

---

## Question 10: Why might a newly installed service worker wait before activation?

**A new service worker waits because:**

1. **Old worker is still in use:** If the user has the site open in any tab, the old service worker remains active for those tabs. The new worker waits until all tabs using the old worker are closed.

2. **Safety mechanism:** This prevents sudden disruption. If the new worker had a bug, the user could lose functionality across all open tabs at once.

3. **Controlled activation:** The old worker continues serving pages until no tabs are using it. Then the new worker activates.

**How to activate manually:**
- Close all tabs with the site open, then reopen
- In DevTools: Check "Update on reload" to force activation on reload
- In code: Call `self.skipWaiting()` during install (which we did)

**Why we documented this in the README:** Understanding this lifecycle is important for testing the v1 → v2 update. If you see "waiting to activate," it means there are still open tabs — close them and reopen the site.

---

## Five-Minute Demonstration Plan

### Minute 1: Explain the Problem and Solution

**What to say:**
> "Our course information website needs to work even when internet connectivity is poor. Without a service worker, users would see a generic browser error when offline. With a service worker, we can cache an offline page and serve it when the network fails, giving users a helpful branded message with course information."

**Show:**
- The website running normally online
- Briefly mention the school (Intango TSS) and the courses listed

---

### Minute 2-3: Demonstrate the Features

**Step 1: Show registration**
- Open DevTools → Application → Service Workers
- Show the active service worker
- Point out the cache name (`intango-v1`)

**Step 2: Show cache storage**
- Open DevTools → Application → Cache Storage
- Expand `intango-v1` and show `offline.html` is cached

**Step 3: Test offline navigation**
- Check the "Offline" box in Service Workers (or use Network throttling)
- Reload the page
- Show the offline page appearing with:
  - "You're offline" message
  - Intango TSS school name
  - Course list (Software Development, Computer Applications, ICDL, DSE)
- Uncheck "Offline" and reload to show normal operation returns

**Step 4: Demonstrate version update (if time permits)**
- Explain: "When we update the service worker (e.g., change cache name to v2), the new worker installs but may wait if tabs are open."
- Show the concept by explaining the process (actual v2 update would require rebuilding)

---

### Minute 4-5: Answer Questions

**Be prepared to answer:**
- "What happens if I close the tab and reopen?" (New worker activates)
- "Can we cache more than just the offline page?" (Yes, but this assignment focuses on navigation fallback)
- "Why only navigation requests?" (Assignment scope — we leave other resources untouched)
- "How do we update the offline page?" (Update `offline.html`, change cache name in `sw.js`, rebuild)

---

## Key Concepts to Emphasize

1. **Service workers are background scripts** — they don't touch the DOM
2. **Cache API is separate from HTTP cache** — we control what's stored
3. **Offline fallback requires prior online visit** — cache must be populated first
4. **Versioned caches prevent conflicts** — `intango-v1`, `intango-v2`
5. **Safe cleanup only deletes our caches** — using `startsWith('intango-')` filter
