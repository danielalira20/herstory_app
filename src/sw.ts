/// <reference lib="webworker" />
// @ts-nocheck
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Calculadora", {
      body:  data.body  ?? "¿Todo bien hoy? 🌸",
      icon:  "/icons/calc-192.png",
      badge: "/icons/calc-192.png",
      data:  { url: data.url ?? "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url ?? "/")
  );
});