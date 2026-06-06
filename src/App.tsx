import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MujeresDesaparecidas from "./pages/MujeresDesaparecidas";
import EllaDice from "./pages/EllaDice";
import Contacto from "./pages/Contacto";
import Nosotras from "./pages/Nosotras";
import NotFound from "./pages/NotFound";
import Aprende from "./pages/Aprende";
import Ayuda from './pages/Ayuda';
import Perfil from "./pages/perfil";
import WomanDetail from "./pages/WomanDetail";
import HerStory from "./pages/HerStory";
import { useInitializeUser } from "./hooks/useInitializeUser";
import HerStoryBot from "./components/HerStoryBot";
import PanicButton from "./components/PanicButton";
import CamouflageCalculator from "./components/CamouflageCalculator";

import AwarenessGuide from "@/pages/AwarenessGuide";
import Reportar from "./pages/Reportar";
import RastroNacional from "./pages/RastroNacional";
import Landing from "./pages/Landing";
import Search from "./pages/Search"; 
import Learn from "./pages/Learn"; 
import Guias from "./pages/Guias";
import { SectionProvider } from "./context/SectionContext";
import Onboarding from "./pages/Onboarding";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"; 

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminVerificacion from "./pages/AdminVerificacion";
import ParaColectivos from "./pages/ParaColectivos";
import AdminSolicitudes from "./pages/AdminSolicitudes";
import Reconocimiento from "./pages/Reconocimiento";
import GuiaColectivos from "./pages/GuiaColectivos";


const queryClient = new QueryClient();

// Componentes globales que se ocultan en /calc
const GlobalUI = () => {
  const location = useLocation();
  if (location.pathname === "/calc") return null;

  return (
    <>
      <HerStoryBot />
      <PanicButton />
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
             <Routes>
              {/* Landing y hubs principales */}
              <Route path="/" element={
              localStorage.getItem("herstory-onboarding-complete")
              ? <Landing />
              : <Navigate to="/onboarding" replace />
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/learn" element={<Learn />} />
              
              {/* Autenticación y perfil */}
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Páginas de Search (morado) */}
              <Route path="/mujeres-desaparecidas" element={<MujeresDesaparecidas />} />
              <Route path="/rastro-nacional" element={<RastroNacional />} />
              <Route path="/reportar" element={<Reportar />} />
              
              {/* Páginas de Learn (rosa) */}
              <Route path="/herstory" element={<HerStory />} />
              <Route path="/mujer/:id" element={<WomanDetail />} />
              <Route path="/aprende" element={<Aprende />} />
              <Route path="/ella-dice" element={<EllaDice />} />
              <Route path="/awareness-guide" element={<AwarenessGuide />} />
              <Route path="/guias" element={<Guias />} />
              
              {/* Páginas universales */}
              <Route path="/nosotras" element={<Nosotras />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ayuda" element={<Ayuda />} />

              {/* Modo camuflaje — ruta real para refresh */}
              <Route path="/calc" element={
                <CamouflageCalculator onExit={() => window.location.href = '/'} />
              } />

              {/* Panel admin */}
              <Route path="/admin/verificacion" element={
                  <ProtectedAdminRoute>
                    <AdminVerificacion />
                  </ProtectedAdminRoute>
                } 
              />
              <Route path="/admin/solicitudes" element={
                  <ProtectedAdminRoute>
                    <AdminSolicitudes />
                  </ProtectedAdminRoute>
                } 
              />

              {/* Para colectivos */}
              <Route path="/para-colectivos" element={<ParaColectivos />} />

              {/* Reconocimiento madres buscadoras */}
              <Route path="/reconocimiento" element={<Reconocimiento />} />
              
              {/* Guía para colectivos */}
              <Route path="/guia-colectivos" element={<GuiaColectivos />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GlobalUI />
            </SectionProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;