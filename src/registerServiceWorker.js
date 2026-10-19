// Service Worker Registration Module
// Registers the service worker for offline functionality
// Part of Intango TSS LO4 Practical Assignment - Group 3

const registerServiceWorker = () => {
  // Check if service workers are supported by the browser
  if ('serviceWorker' in navigator) {
    // Register the service worker from the public directory
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);

        // Optional: Check for updates periodically
        navigator.serviceWorker.addEventListener('updatefound', () => {
          const newWorker = registration.worker;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('Service Worker state changed:', newWorker.state);
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    // Handle browsers that don't support service workers
    console.warn(
      'Service Workers are not supported in this browser. ' +
      'Offline functionality will not be available.'
    );
  }
};

export default registerServiceWorker;
