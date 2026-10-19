# Group 3 — LO4 Practical Assignment

## Service Workers and Offline Access

**School:** Intango TSS  
**Programme:** Software Development  
**Level:** 5  
**Module:** SWDFA501 ReactJS  
**Learning Outcome:** LO4 — Apply Progressive Web Application  
**Trainer:** Fidèle NDAYISHIMIYE  

---

## Submission Contents

This folder contains the complete submission for the LO4 practical assignment on Progressive Web Applications, specifically focusing on service workers and offline access.

### Files Included

| File | Description |
|------|-------------|
| `README.md` | This file — assignment overview and instructions |
| `offline.html` | Self-contained offline page |
| `sw.js` | Service worker with install, fetch, activate events |
| `registerServiceWorker.js` | Service worker registration module |
| `TEST_LOG.md` | Test cases and manual testing instructions |
| `DEMO_ANSWERS.md` | Oral question answers and demonstration plan |

### Evidence Folder

Create a subfolder called `evidence/` (or `screenshot-evidence/`) and save screenshots:
- Service worker registration in DevTools
- Cache storage showing cached offline page
- Offline page displayed when browser is in offline mode
- Updated cache after v1 → v2 update
- Cache cleanup verification

---

## Overview

This assignment implements a course-information website that works across different devices and keeps useful public course information available when connectivity is poor.

### Key Concepts Demonstrated

1. **Service Worker Registration** — Registering a service worker in a React application
2. **Offline Caching** — Caching an offline page during service worker installation
3. **Offline Fallback** — Serving a cached page when the network is unavailable
4. **Versioned Caches** — Using versioned cache names (`intango-v1`, `intango-v2`)
5. **Safe Cache Cleanup** — Deleting only application-owned caches during activation
6. **Version Updates** — Demonstrating the service worker update lifecycle

---

## The Offline Page

The `offline.html` file is a self-contained HTML page that displays when the user is offline. It includes:

- School name: **Intango TSS**
- Clear "You're offline" message
- List of available courses:
  - Software Development — Levels 3, 4 and 5
  - Computer Applications — Level 2
  - ICDL — Digital skills certification
  - Diploma in Secondary Education (DSE)
- Explanation that saved course information remains available offline
- Responsive design for desktop and mobile
- No external dependencies (fonts, images, scripts, stylesheets)

---

## The Service Worker (`sw.js`)

The service worker implements three key events:

### Install Event
- Opens a versioned cache (`intango-v1`)
- Caches `/offline.html`
- Uses `event.waitUntil()` to wait for caching to complete
- Reports errors if caching fails

### Fetch Event
- Handles only **navigation requests** (page loads)
- Uses **network-first** strategy:
  - Try network first
  - If network fails, return cached `/offline.html`
- Leaves other request types (images, scripts, CSS) untouched
- Provides minimal emergency fallback if cached page is missing

### Activate Event
- Finds all cache names
- Deletes only caches that:
  - Start with `intango-`
  - Are NOT the current cache name
- Calls `self.clients.claim()` for immediate control
- Uses `event.waitUntil()` for async operations

---

## Registration Module (`registerServiceWorker.js`)

This module handles registering the service worker with the browser:

- Checks if `serviceWorker` is available in `navigator`
- Registers `/sw.js` from the public directory
- Reports success or error to console
- Handles browsers that don't support service workers gracefully

---

## Testing Instructions

### Prerequisites

1. Build the project:
   ```bash
   npm install
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

3. Open Chrome or Edge DevTools (F12)

### Test 1: Online Registration
1. Open Application → Service Workers
2. Verify `sw.js` is listed and active

### Test 2: Installation and Page Control
1. Open Application → Cache Storage
2. Expand `intango-v1`
3. Verify `offline.html` is cached

### Test 3: Offline Navigation
1. Check "Offline" in Service Workers section (or use Network throttling)
2. Reload the page
3. Verify offline page appears

### Test 4: Version Update (v1 → v2)
1. Change `CACHE_NAME` in `sw.js` to `intango-v2`
2. Update offline message in `offline.html`
3. Rebuild and preview
4. Close all tabs and reopen
5. Verify `intango-v2` cache exists and old cache deleted

### Test 5: Safe Cache Cleanup
1. Verify only `intango-*` caches are removed during activation
2. Other browser caches remain untouched

---

## Version Update Demonstration

### Initial Version (v1)
- Cache name: `intango-v1`
- Offline page displays v1 message

### Updated Version (v2)
- Cache name: `intango-v2`
- Offline page displays updated v2 message

### Procedure
1. Install and test v1
2. Confirm original offline page appears when offline
3. Update cache name and offline message to v2
4. Rebuild or refresh the production preview
5. Check if new worker installs, activates, or waits
6. If waiting, close controlled tabs and reopen the site
7. Verify `intango-v2` exists, updated offline message appears, and obsolete caches removed

---

## Oral Questions (Summary)

1. **What is a service worker?** — A background script that intercepts network requests and enables offline functionality.

2. **What is caching?** — Storing copies of files for faster future access.

3. **What is an offline fallback?** — A page served when offline instead of a browser error.

4. **Install event?** — Caches the offline page using `event.waitUntil()`.

5. **Fetch event?** — Intercepts navigation requests, returns network response or cached fallback.

6. **Activate event?** — Cleans up old caches, claims clients for immediate control.

7. **Why no DOM access?** — Service workers run on a separate thread without `window` or `document`.

8. **Why visit online first?** — The offline page must be cached during installation before offline use.

9. **Manifest vs service worker?** — Manifest makes the app installable; service worker enables offline functionality.

10. **Why does new worker wait?** — Old worker stays active until all tabs using it are closed.

---

## Known Limitations

- Service workers require HTTPS or localhost (not `file://`)
- Development mode behavior differs from production preview
- Multiple open tabs delay worker activation during updates
- Site must be visited online at least once before offline testing

---

## Contact

For questions about this assignment, refer to the trainer: **Fidèle NDAYISHIMIYE**
