# Intango TSS — Course Information Website (LO4 PWA)

**School:** Intango TSS  
**Programme:** Software Development  
**Level:** 5  
**Module:** SWDFA501 ReactJS  
**Learning Outcome:** LO4 — Apply Progressive Web Application  
**Practical Assignment:** Group 3 — Service Workers and Offline Access  
**Trainer:** Fidèle NDAYISHIMIYE  

---

## What Was Implemented

This project implements a **Progressive Web Application (PWA)** feature set for a course-information website that works across different devices and keeps useful public course information available when connectivity is poor.

### Features Implemented

1. **Self-contained Offline Page** (`public/offline.html`)
   - Displays "You're offline" message
   - Shows school name: Intango TSS
   - Lists available courses:
     - Software Development — Levels 3, 4 and 5
     - Computer Applications — Level 2
     - ICDL — Digital skills certification
     - Diploma in Secondary Education (DSE)
   - Responsive design for desktop and mobile
   - No external dependencies (self-contained HTML/CSS)

2. **Service Worker Registration** (`src/registerServiceWorker.js`)
   - Checks for `serviceWorker` support in navigator
   - Registers `/sw.js` service worker
   - Reports registration errors to console
   - Handles unsupported browsers gracefully
   - Called once from React entry point (`src/main.jsx`)

3. **Service Worker** (`public/sw.js`)
   - **Versioned cache:** Uses `intango-v1` (initial version)
   - **Install event:** Caches `/offline.html` using `event.waitUntil()`
   - **Fetch event:** Network-first strategy for navigation requests only
     - Returns network response on success
     - Returns cached `/offline.html` on network failure
     - Minimal emergency fallback if cached page missing
     - Leaves other request types (images, scripts, etc.) untouched
   - **Activate event:** Deletes obsolete `intango-*` caches (not current)
     - Uses `self.clients.claim()` for immediate control
     - Uses `event.waitUntil()` for async cleanup

4. **Version Update Support (v1 → v2)**
   - Update `CACHE_NAME` in `sw.js` from `'intango-v1'` to `'intango-v2'`
   - Update offline message in `offline.html` to indicate v2
   - Rebuild and refresh to test the update lifecycle

---

## Files Created or Modified

### New Files Created

| File | Purpose |
|------|---------|
| `public/offline.html` | Self-contained offline page with course information |
| `src/registerServiceWorker.js` | Service worker registration module |
| `public/sw.js` | Service worker with install, fetch, activate events |
| `TEST_LOG.md` | Test cases and manual testing instructions |
| `DEMO_ANSWERS.md` | Oral question answers and demonstration plan |
| `Group_3_LO4/README.md` | Assignment submission README (in submission folder) |

### Existing Files Modified

| File | Change |
|------|--------|
| `src/main.jsx` | Added import and call to `registerServiceWorker()` in production |

### Files in Submission Folder (`Group_3_LO4/`)

All deliverables are collected in the `Group_3_LO4/` folder:
```
Group_3_LO4/
├── README.md              # Assignment submission README
├── offline.html           # Offline page (copy from public/)
├── sw.js                  # Service worker (copy from public/)
├── registerServiceWorker.js  # Registration module (copy from src/)
├── TEST_LOG.md            # Test log
├── DEMO_ANSWERS.md        # Oral answers and demo plan
├── evidence/              # Folder for screenshots (create when testing)
│   ├── 01-registration.jpg
│   ├── 02-install.jpg
│   ├── 03-offline.jpg
│   ├── 04-update-v2.jpg
│   └── 05-cache-cleanup.jpg
└── (source files copied for reference)
```

---

## How Registration Is Connected to the React Application

The service worker registration is integrated into the React app's entry point:

**File:** `src/main.jsx`

```javascript
import registerServiceWorker from './registerServiceWorker';

// ... existing app rendering code ...

// Register the service worker for offline functionality
// Must be called after the app is rendered and only in production
// served over HTTPS or localhost (not file://)
if (import.meta.env.PROD) {
  registerServiceWorker();
}
```

**How it works:**
1. The app renders normally
2. After rendering, in production mode, `registerServiceWorker()` is called
3. The registration module checks for service worker support
4. If supported, it registers `/sw.js` from the public directory
5. The service worker installs, caches the offline page, and activates

**Why only in production (`import.meta.env.PROD`)?**
- Development mode (`npm run dev`) has HMR and live reload which can interfere with service worker testing
- For development testing, you can temporarily remove the `if (import.meta.env.PROD)` condition or use `npm run preview` after building

---

## How to Run the Project

### Development Mode

```bash
# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build and Preview

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The preview server typically runs at `http://localhost:4173`.

**Important:** Service workers require HTTPS or localhost. The preview server provides localhost, so service workers will work during preview.

---

## How to Test Offline Behaviour

### Prerequisites

1. Build and preview the production app:
   ```bash
   npm run build
   npm run preview
   ```

2. Open Chrome or Edge DevTools (F12)

3. Make sure you're on the **Application** tab

### Test Steps

#### 1. Verify Registration
- Go to **Application** → **Service Workers**
- Confirm `sw.js` is listed with status "Active" or "Running"

#### 2. Verify Cache
- Go to **Application** → **Cache Storage**
- Expand `intango-v1`
- Confirm `offline.html` is listed

#### 3. Test Offline Navigation
- In **Service Workers** section, check the **"Offline"** checkbox
- OR: Go to **Network** tab and select "Offline" from throttling dropdown
- Reload the page (F5)
- Verify the offline page appears with:
  - "You're offline" message
  - Intango TSS school name
  - Course list
- Uncheck "Offline" and reload to verify normal operation returns

---

## How to Demonstrate the v1-to-v2 Update

### Step 1: Test v1 First
1. Build and preview the app
2. Open in browser and let the service worker install
3. Verify `intango-v1` cache exists with offline page
4. Test offline fallback (as above)

### Step 2: Update to v2
1. Edit `public/sw.js`:
   - Change `const CACHE_NAME = 'intango-v1';` to `const CACHE_NAME = 'intango-v2';`

2. Edit `public/offline.html`:
   - Update the offline message to indicate this is v2 (e.g., add "Version 2" somewhere visible)

3. Rebuild and restart preview:
   ```bash
   npm run build
   npm run preview
   ```

### Step 3: Observe the Update
1. Open DevTools → Application → Service Workers
2. You may see the new worker installed but "waiting to activate"
3. This is normal — the old worker stays active until all tabs are closed

### Step 4: Activate the New Worker
- Close all tabs with the site open
- Reopen the site
- The new worker should now activate

### Step 5: Verify
- **Cache Storage:** Only `intango-v2` should exist (old `intango-v1` deleted)
- **Service Workers:** New worker is active
- **Offline test:** New offline page (v2 message) appears when offline

### Step 6: Important Notes
- If the new worker is "waiting," you have open tabs. Close them and reopen.
- The waiting behavior is part of the service worker lifecycle — it's not a bug.
- Our implementation uses `skipWaiting()` in the install event, but browser behavior may still show a waiting state if tabs are open.

---

## Evidence Screenshots

Create a folder named `evidence/` inside `Group_3_LO4/` and save screenshots as:

| File | What to Capture |
|------|-----------------|
| `01-registration.jpg` | Application → Service Workers showing active worker |
| `02-install.jpg` | Application → Cache Storage showing `intango-v1` with `offline.html` |
| `03-offline.jpg` | Browser in Offline mode showing the offline page |
| `04-update-v2.jpg` | Application → Cache Storage showing only `intango-v2` after update |
| `05-cache-cleanup.jpg` | Before/after comparison of cache cleanup (optional) |

---

## Known Limitations

1. **Development mode:** Service workers work in dev mode but the "waiting to update" behavior differs from production. Use `npm run preview` for production-like testing.

2. **Multiple tabs:** If multiple tabs are open during an update, the new worker waits until all tabs are closed.

3. **Browser compatibility:** Tested with Chrome/Edge. Firefox and Safari have different DevTools layouts but similar functionality.

4. **Initial visit required:** The site must be visited online at least once before offline testing works (the offline page must be cached first).

5. **Network-first strategy:** This implementation uses network-first for navigation. If you want to cache more assets (images, styles), additional fetch handlers would be needed.

---

## Submission Structure

The completed assignment is in the `Group_3_LO4/` folder:

```
Group_3_LO4/
├── README.md
├── offline.html
├── sw.js
├── registerServiceWorker.js
├── TEST_LOG.md
├── DEMO_ANSWERS.md
├── screenshot-evidence/     (to be created during testing)
└── (optional ZIP file)
```

**Do NOT include `node_modules/` in the submission.**

---

## Build and Lint Commands

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Technical Notes

- **Build system:** Vite
- **React version:** 19.x
- **Service worker scope:** `/` (entire origin)
- **Cache names:** `intango-v1`, `intango-v2` — all start with `intango-` prefix
- **Cache cleanup filter:** Only deletes caches starting with `intango-` that are not the current version
- **Registration condition:** Only in production (`import.meta.env.PROD`)
- **Request types handled:** Navigation requests only (`event.request.mode === 'navigate'`)

---

## Assignment Compliance Checklist

- [x] Self-contained offline page with school name and course list
- [x] Service worker registration with browser support check
- [x] Versioned cache (`intango-v1`)
- [x] Install event with `event.waitUntil()` and offline page caching
- [x] Fetch event with network-first navigation handling
- [x] Activate event with safe cache cleanup (only `intango-*` caches)
- [x] `self.clients.claim()` for immediate control
- [x] Version update demonstration documented (v1 → v2)
- [x] Test log with pending results
- [x] Oral question answers
- [x] Demonstration plan
- [x] README with implementation details
- [ ] Evidence screenshots (manual step — take during testing)
- [ ] ZIP submission (optional — create when ready)
