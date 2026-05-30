// PAN-F02 [FRONT] + PAN-F03 [FRONT] + PAN-F05 [FRONT] — Daf — Semana 2
// PAN-F02: atajo de teclado Escape doble para activar modo camuflaje
// PAN-F03: borra historial del navegador al activarse
// PAN-F05: cambia <title>, favicon y meta tags a algo neutral

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

export const usePanicMode = () => {
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);
  const lastEscapeTime = useRef<number>(0); // PAN-F02: rastrear doble Escape

  const activateCamouflage = useCallback(() => {
    // PAN-F05: cambiar título
    document.title = CAMOUFLAGE_TITLE;

    // PAN-F05: cambiar favicon
    let favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = CAMOUFLAGE_FAVICON;

    // PAN-F05: cambiar meta description
    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) metaDesc.content = "Calculadora";

    // PAN-F03: reemplazar historial
    window.history.replaceState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
    for (let i = 0; i < 5; i++) {
      window.history.pushState(null, CAMOUFLAGE_TITLE, CAMOUFLAGE_URL);
    }

    setIsCamouflageActive(true);
  }, []);

  const deactivateCamouflage = useCallback(() => {
    document.title = ORIGINAL_TITLE;

    const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (favicon) favicon.href = ORIGINAL_FAVICON;

    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) metaDesc.content = "HerStory";

    window.history.replaceState(null, ORIGINAL_TITLE, "/");

    setIsCamouflageActive(false);
  }, []);

  // PAN-F02: detectar doble Escape en menos de 500ms
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