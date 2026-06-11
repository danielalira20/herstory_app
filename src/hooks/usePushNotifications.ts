import { useState, useEffect } from "react";
 
export function usePushNotifications() {
  const [supported, setSupported]     = useState(false);
  const [subscribed, setSubscribed]   = useState(false);
  const [loading, setLoading]         = useState(false);
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
 
  useEffect(() => {
    setSupported("serviceWorker" in navigator && "PushManager" in window);
    // Verificar si ya está suscrita
    navigator.serviceWorker?.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setSubscribed(!!sub);
    });
  }, []);
 
  async function getVapidKey(): Promise<string> {
    const res = await fetch(`${BACKEND}/api/push/vapid-public-key`);
    const { publicKey } = await res.json();
    return publicKey;
  }
 
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }
 
  async function subscribe(frequency = "daily") {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") throw new Error("Permiso denegado");
 
      const reg = await navigator.serviceWorker.ready;
      const vapidKey = await getVapidKey();
 
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });
 
      await fetch(`${BACKEND}/api/push/subscribe`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ subscription, frequency }),
      });
 
      setSubscribed(true);
      return true;
    } catch (err) {
      console.error("Error suscribiendo:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }
 
  async function unsubscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch(`${BACKEND}/api/push/unsubscribe`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setSubscribed(false);
      return true;
    } catch (err) {
      console.error("Error desuscribiendo:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }
 
  return { supported, subscribed, loading, subscribe, unsubscribe };
}
 