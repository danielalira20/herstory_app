// Rastrea la sección activa (search | learn) a nivel global.
// Solo cambia cuando el usuario navega A una página de sección.
// Páginas neutras (Home, Login, etc.) heredan el valor anterior → sin saltos de color.

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Section = "search" | "learn";

interface SectionContextType {
  section: Section;
}

// ─── Rutas por sección ────────────────────────────────────────────────────────

const SEARCH_ROUTES = [
  "/rastro-nacional",
  "/mujeres-desaparecidas",
  "/ayuda",
  "/reportar",
  "/colectivos",
  "/busqueda",
  "/search",        // ruta actual de Search.tsx
  "/nos-faltan-ellas",
];

const LEARN_ROUTES = [
  "/herstory",
  "/mujer",
  "/awareness-guide",
  "/aprende",
  "/ella-dice",
  "/voces-silenciadas",
  "/directorio",
  "/glosario",
  "/auren",
  "/educacion",
  "/learn",         // ruta actual de Learn.tsx
];

// ─── Context ──────────────────────────────────────────────────────────────────

const SectionContext = createContext<SectionContextType>({ section: "search" });

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState<Section>("search");
  const location = useLocation();

  useEffect(() => {
    const isSearch = SEARCH_ROUTES.some((r) => location.pathname.startsWith(r));
    const isLearn  = LEARN_ROUTES.some((r) => location.pathname.startsWith(r));

    if (isSearch) setSection("search");
    else if (isLearn) setSection("learn");
    // Páginas neutras: no se actualiza → color persiste sin cambios visuales
  }, [location.pathname]);

  return (
    <SectionContext.Provider value={{ section }}>
      {children}
    </SectionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSection = () => useContext(SectionContext);