import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useInitializeUser } from "./hooks/useInitializeUser";
import HerStoryBot from "./components/HerStoryBot";
import PanicButton from "./components/PanicButton";
import AppTutorial from "./components/AppTutorial";
import CheckInResponse from "./components/CheckInResponse";
import { SectionProvider } from "./context/SectionContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ── Eager (críticas — cargan siempre) ────────────────────
import Landing            from "./pages/Landing";
import Login              from "./pages/Login";
import Onboarding         from "./pages/Onboarding";
import CamouflageCalculator from "./components/CamouflageCalculator";
import NotFound           from "./pages/NotFound";

// ── Lazy (cargan solo cuando se necesitan) ────────────────
const Home               = lazy(() => import("./pages/Home"));
const MujeresDesaparecidas = lazy(() => import("./pages/MujeresDesaparecidas"));
const Contacto           = lazy(() => import("./pages/Contacto"));
const Nosotras           = lazy(() => import("./pages/Nosotras"));
const Aprende            = lazy(() => import("./pages/Aprende"));
const Ayuda              = lazy(() => import("./pages/Ayuda"));
const Perfil             = lazy(() => import("./pages/perfil"));
const WomanDetail        = lazy(() => import("./pages/WomanDetail"));
const HerStory           = lazy(() => import("./pages/HerStory"));
const AwarenessGuide     = lazy(() => import("./pages/AwarenessGuide"));
const Reportar           = lazy(() => import("./pages/Reportar"));
const RastroNacional     = lazy(() => import("./pages/RastroNacional"));
const Search             = lazy(() => import("./pages/Search"));
const Learn              = lazy(() => import("./pages/Learn"));
const Guias              = lazy(() => import("./pages/Guias"));
const AdminVerificacion  = lazy(() => import("./pages/AdminVerificacion"));
const AdminSolicitudes   = lazy(() => import("./pages/AdminSolicitudes"));
const ParaColectivos     = lazy(() => import("./pages/ParaColectivos"));
const Reconocimiento     = lazy(() => import("./pages/Reconocimiento"));
const GuiaColectivos     = lazy(() => import("./pages/GuiaColectivos"));
const ModoCampo = lazy(() => import('./pages/ModoCampo'));
const MapaAcoso = lazy(() => import('./pages/MapaAcoso'));

const queryClient = new QueryClient();

// Spinner de carga
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-purple-50">
    <div className="w-8 h-8 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin" />
  </div>
);

// Componentes globales: se ocultan en /calc, muestran tutorial una vez
const GlobalUI = () => {
  const location = useLocation();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const onboardingDone = localStorage.getItem("herstory-onboarding-complete");
    const tutorialDone   = localStorage.getItem("herstory-tutorial-complete");
    const isExcludedPath = location.pathname === "/calc" || location.pathname === "/onboarding";
    if (onboardingDone && !tutorialDone && !isExcludedPath) setShowTutorial(true);
  }, [location.pathname]);

  if (location.pathname === "/calc") return null;

  return (
    <>
      {showTutorial && <AppTutorial onComplete={() => setShowTutorial(false)} />}
      <HerStoryBot />
      <PanicButton />
      <CheckInResponse />
    </>
  );
};

const App = () => {
  useInitializeUser();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="herstory-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SectionProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Landing y hubs principales */}
                  <Route
                    path="/"
                    element={
                      localStorage.getItem("herstory-onboarding-complete")
                        ? <Landing />
                        : <Navigate to="/onboarding" replace />
                    }
                  />
                  <Route path="/search"   element={<Search />} />
                  <Route path="/learn"    element={<Learn />} />

                  {/* Autenticación y perfil */}
                  <Route path="/login"      element={<Login />} />
                  <Route path="/perfil"     element={<Perfil />} />
                  <Route path="/onboarding" element={<Onboarding />} />

                  {/* Páginas de Search (morado) */}
                  <Route path="/mujeres-desaparecidas" element={<MujeresDesaparecidas />} />
                  <Route path="/rastro-nacional"       element={<RastroNacional />} />
                  <Route path="/reportar"              element={<Reportar />} />
                  <Route path="/modo-campo"            element={<ModoCampo />} /> 
                  <Route path="/mapa-acoso" element={<MapaAcoso />} />
                  

                  {/* Páginas de Learn (rosa) */}
                  <Route path="/herstory"       element={<HerStory />} />
                  <Route path="/mujer/:id"      element={<WomanDetail />} />
                  <Route path="/aprende"        element={<Aprende />} />
                  <Route path="/awareness-guide" element={<AwarenessGuide />} />
                  <Route path="/guias"          element={<Guias />} />

                  {/* Páginas universales */}
                  <Route path="/nosotras" element={<Nosotras />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/ayuda"    element={<Ayuda />} />

                  {/* Modo camuflaje */}
                  <Route
                    path="/calc"
                    element={<CamouflageCalculator onExit={() => (window.location.href = "/")} />}
                  />

                  {/* Panel admin */}
                  <Route
                    path="/admin/verificacion"
                    element={<ProtectedAdminRoute><AdminVerificacion /></ProtectedAdminRoute>}
                  />
                  <Route
                    path="/admin/solicitudes"
                    element={<ProtectedAdminRoute><AdminSolicitudes /></ProtectedAdminRoute>}
                  />

                  {/* Para colectivos */}
                  <Route path="/para-colectivos" element={<ParaColectivos />} />
                  <Route path="/reconocimiento"  element={<Reconocimiento />} />
                  <Route path="/guia-colectivos" element={<GuiaColectivos />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <GlobalUI />
            </SectionProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;