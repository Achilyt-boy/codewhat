# TEST_LOG.md

## Service Worker and Offline Access Testing Log

**Assignment:** LO4 — Apply Progressive Web Application
**Group:** 3
**School:** Intango TSS
**Trainer:** Fidèle NDAYISHIMIYE
**Date:** (To be filled during actual testing)

---

## Test Evidence Instructions

### Where to Save Screenshots

Create an `evidence/` folder in the `Group_3_LO4/` submission directory and save screenshots as:
- `01-registration.jpg` — Service Worker registration
- `02-install.jpg` — Installation and cache storage
- `03-offline.jpg` — Offline navigation result
- `04-update-v2.jpg` — Updated version (v2) activation
- `05-cache-cleanup.jpg` — Safe cache cleanup verification

---

## Test Table

| # | Test | Expected Result | Actual Result | Pass/Fail | Correction/Evidence |
|---|------|-----------------|---------------|-----------|---------------------|
| 1 | **Online Registration** | Service worker registers successfully on HTTPS/localhost. Console shows "Service Worker registered successfully". Worker appears in DevTools > Application > Service Workers. | *(Pending — to be tested manually)* | ⬜ Pending | Screenshot: Application → Service Workers showing active worker |
| 2 | **Installation and Page Control** | Install event fires. Cache `intango-v1` created. `/offline.html` cached inside. Console shows caching success. Worker takes control of pages. | *(Pending — to be tested manually)* | ⬜ Pending | Screenshot: Application → Cache Storage showing `intango-v1` with `offline.html` inside |
| 3 | **Offline Navigation** | After visiting site online and going offline, navigation to any page shows cached offline page with "You're offline" message, Intango TSS school name, and course list. | *(Pending — to be tested manually)* | ⬜ Pending | Screenshot: Browser in Offline mode showing offline.html content |
| 4 | **Updated Version (v1 → v2)** | After updating cache name to `intango-v2` and rebuilding, new worker installs. Old `intango-v1` cache deleted. New offline page (v2 message) served when offline. | *(Pending — to be tested manually)* | ⬜ Pending | Screenshot: Application → Cache Storage showing only `intango-v2`, and offline page showing v2 message |
| 5 | **Safe Cache Cleanup** | Only `intango-*` caches are deleted during activation. Other browser/application caches remain untouched. | *(Pending — to be tested manually)* | ⬜ Pending | Screenshot: Cache Storage before and after showing only intango caches removed |

---

## Manual Testing Instructions (Chrome/Edge DevTools)

### Prerequisite: Use HTTPS or localhost
- Service workers only work on **HTTPS** or **localhost**.
- Do **NOT** open the HTML file directly using `file://`.
- Use `npm run dev` (for development) or `npm run build && npm run preview` (for production preview).

---

### How to Inspect Service Workers

1. Open Chrome/Edge DevTools: **F12** or **Ctrl+Shift+I** (Windows) / **Cmd+Option+I** (Mac)
2. Go to **Application** tab
3. In the left sidebar, expand **Service Workers**
4. You should see `sw.js` listed with its status

**What to check:**
- Status should show "Active" or "Running" after registration
- "Update on reload" checkbox can be used to force update during testing
- "Bypass for network" checkbox can skip the service worker

---

### How to Inspect Cache Storage

1. In DevTools **Application** tab
2. Expand **Cache Storage** in the left sidebar
3. Click on `intango-v1` (or `intango-v2` after update)
4. You should see `offline.html` listed

**What to check:**
- Cache contains `offline.html`
- The cached response can be inspected by clicking on it

---

### How to Test Offline Fallback

1. **First, visit the site online** (required for the worker to install)
   - Open `http://localhost:5173` (dev mode) or production preview URL
   - Let the page load completely
   - Refresh once to ensure the service worker takes control

2. **Go offline**
   - In DevTools **Application** tab → **Service Workers** section
   - Check the **"Offline"** checkbox
   - Or use the **Network** tab → select "Offline" from the throttling dropdown

3. **Reload the page** (F5 or Ctrl+R)
   - The offline page should appear
   - Verify: "You're offline" message, Intango TSS school name, course list

4. **Go back online**
   - Uncheck "Offline" or switch Network throttling back to "No throttling"
   - Reload to verify normal operation resumes

---

### How to Test Version Update (v1 → v2)

1. **Test v1 first**
   - Build and preview the app
   - Register the service worker
   - Verify `intango-v1` cache exists with offline page
   - Test offline fallback (as above)

2. **Update to v2**
   - Change `CACHE_NAME` in `public/sw.js` from `'intango-v1'` to `'intango-v2'`
   - Update the offline message in `public/offline.html` to indicate v2
   - Rebuild: `npm run build`
   - Restart preview: `npm run preview`

3. **Check the new worker status**
   - Open DevTools → Application → Service Workers
   - You should see the new worker installed but possibly in "waiting to activate" state
   - The old worker remains active until all tabs using it are closed

4. **Activate the new worker**
   - Close all tabs with the site open
   - Reopen the site
   - The new worker should now activate

5. **Verify update**
   - Check Application → Cache Storage: only `intango-v2` should exist (old `intango-v1` deleted)
   - Check Application → Service Workers: new worker is active
   - Go offline and reload: new offline page (v2 message) should appear

---

### How to Check Waiting Worker (if applicable)

If the new worker is waiting:
1. DevTools → Application → Service Workers
2. You'll see the new worker listed with status "Installed" or "Waiting"
3. To activate: either close all tabs and reopen, or check "Update on reload" and reload

---

## Automated Testing Notes

Browser automation (e.g., Puppeteer, Playwright) can be used to test service workers programmatically, but it requires:
- Running a local server (not file://)
- Configuring the browser to allow service workers
- Properly handling the asynchronous nature of SW registration

For this assignment, manual testing via DevTools is recommended and sufficient.

---

## Known Limitations

1. **Development mode (npm run dev):** Service workers work but DevTools shows "waiting to update" behavior differently than production builds.
2. **Multiple tabs:** If multiple tabs are open when updating, the new worker waits until all tabs are closed.
3. **Browser compatibility:** Tested with Chrome/Edge. Other browsers may have slightly different DevTools layouts.
4. **Initial visit required:** The site must be visited online at least once before offline testing works.

---

## Test Results Summary

| Test | Status | Notes |
|------|--------|-------|
| 1. Online Registration | ⬜ Pending | Manual testing required |
| 2. Installation & Control | ⬜ Pending | Manual testing required |
| 3. Offline Navigation | ⬜ Pending | Manual testing required |
| 4. Version Update | ⬜ Pending | Manual testing required |
| 5. Safe Cache Cleanup | ⬜ Pending | Manual testing required |

**Overall: Tests pending — complete manual testing and fill in actual results above.**
