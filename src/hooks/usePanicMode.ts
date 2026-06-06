// PAN-F02 + PAN-F03 + PAN-F05 — Daf — Semana 2
// PAN-Q01 fix: historial limpio + bloqueo de Back + MutationObserver para favicon/title

import { useState, useCallback, useEffect, useRef } from "react";

const CAMOUFLAGE_TITLE = "Calculadora";
const CAMOUFLAGE_URL = "/calc";
const ORIGINAL_TITLE = document.title;

const getOriginalFavicon = (): string => {
  const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  return link?.href ?? "/favicon.ico";
};

const ORIGINAL_FAVICON = getOriginalFavicon();

const CAMOUFLAGE_FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23333'/><rect x='15' y='15' width='70' height='25' rx='5' fill='%23fff' opacity='0.9'/><rect x='15' y='50' width='15' height='15' rx='3' fill='%23fff' opacity='0.7'/><rect x='35' y='50' width='15' height='15' rx='3' fill='%23fff' opacity='0.7'/><rect x='55' y='50' width='30' height='15' rx='3' fill='%23FF9500'/><rect x='15' y='72' width='15' height='15' rx='3' fill='%23fff' opacity='0.7'/><rect x='35' y='72' width='15' height='15' rx='3' fill='%23fff' opacity='0.7'/><rect x='55' y='72' width='15' height='15' rx='3' fill='%23fff' opacity='0.7'/><rect x='75' y='72' width='10' height='15' rx='3' fill='%23FF9500'/></svg>";

const originalPushState = window.history.pushState.bind(window.history);
const originalReplaceState = window.history.replaceState.bind(window.history);

export const usePanicMode = () => {
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);
  const lastEscapeTime = useRef<number>(0);
  const originalPath = useRef<string>(window.location.pathname);
  const camouflageActiveRef = useRef(false);

  const setMetaCamouflage = useCallback(() => {
    document.title = CAMOUFLAGE_TITLE;

    let favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = CAMOUFLAGE_FAVICON;

    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) metaDesc.content = "Calculadora";
  }, []);

  const restoreMeta = useCallback(() => {
    document.title = ORIGINAL_TITLE;

    const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (favicon) favicon.href = ORIGINAL_FAVICON;

    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) metaDesc.content = "HerStory";
  }, []);

  const activateCamouflage = useCallback(() => {
    originalPath.current = window.location.pathname;
    camouflageActiveRef.current = true;

    setMetaCamouflage();

    originalReplaceState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
    const entriesToPush = window.history.length + 10;
    for (let i = 0; i < entriesToPush; i++) {
      originalPushState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
    }

    setIsCamouflageActive(true);
  }, [setMetaCamouflage]);

  const deactivateCamouflage = useCallback(() => {
    camouflageActiveRef.current = false;
    restoreMeta();
    originalReplaceState(null, ORIGINAL_TITLE, originalPath.current);
    setIsCamouflageActive(false);
  }, [restoreMeta]);

  // Bloqueo de Back + interceptar React Router + MutationObserver
  useEffect(() => {
    if (!isCamouflageActive) return;

    // 1. Interceptar popstate (botón Back)
    const handlePopState = (e: PopStateEvent) => {
      if (!camouflageActiveRef.current) return;
      e.stopImmediatePropagation();
      originalPushState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
      setMetaCamouflage();
    };

    window.addEventListener("popstate", handlePopState, true);

    // 2. Interceptar pushState/replaceState de React Router
    window.history.pushState = (...args: Parameters<typeof window.history.pushState>) => {
      if (camouflageActiveRef.current) {
        originalPushState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
        return;
      }
      originalPushState(...args);
    };

    window.history.replaceState = (...args: Parameters<typeof window.history.replaceState>) => {
      if (camouflageActiveRef.current) {
        originalReplaceState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
        return;
      }
      originalReplaceState(...args);
    };

    // 3. MutationObserver — vigila que el favicon y title NUNCA cambien a HerStory
    //    Si React o cualquier otro script intenta cambiarlos, los revierte al instante
    const observer = new MutationObserver(() => {
      if (!camouflageActiveRef.current) return;

      const fav = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (fav && !fav.href.includes("data:image")) {
        fav.href = CAMOUFLAGE_FAVICON;
      }
      if (document.title !== CAMOUFLAGE_TITLE) {
        document.title = CAMOUFLAGE_TITLE;
      }
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    const titleEl = document.querySelector("title");
    if (titleEl) {
      observer.observe(titleEl, { childList: true });
    }

    return () => {
      window.removeEventListener("popstate", handlePopState, true);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      observer.disconnect();
    };
  }, [isCamouflageActive, setMetaCamouflage]);

  // PAN-F02: doble Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isCamouflageActive) {
        const now = Date.now();
        if (now - lastEscapeTime.current < 500) {
          activateCamouflage();
        }
        lastEscapeTime.current = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCamouflageActive, activateCamouflage]);

  return { isCamouflageActive, activateCamouflage, deactivateCamouflage };
};