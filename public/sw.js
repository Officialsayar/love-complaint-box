self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("fetch", (event) => {
  // You can cache stuff here if needed.
});
