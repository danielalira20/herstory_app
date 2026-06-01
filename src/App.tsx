import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import VocesSilenciadas from "./pages/VocesSilenciadas";
import { useInitializeUser } from "./hooks/useInitializeUser";
import HerStoryBot from "./components/HerStoryBot";
import PanicButton from "./components/PanicButton";
import AwarenessGuide from "@/pages/AwarenessGuide";
import Reportar from "./pages/Reportar";
import RastroNacional from "./pages/RastroNacional";
import Landing from "./pages/Landing";
import Search from "./pages/Search"; 
import Learn from "./pages/Learn"; 
import { SectionProvider } from "./context/SectionContext";  

/// Funcionar para pagina de admin: validar casos por levinshein
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"
import AdminVerificacion from "./pages/AdminVerificacion"


///import para COlectivos
import ParaColectivos from "./pages/ParaColectivos"

/// import Admin solicitudes 
import AdminSolicitudes from "./pages/AdminSolicitudes";

const queryClient = new QueryClient();

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
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/learn" element={<Learn />} />
              
              {/* Autenticación y perfil */}
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              
              {/* Páginas de Search (morado) */}
              <Route path="/mujeres-desaparecidas" element={<MujeresDesaparecidas />} />
              <Route path="/rastro-nacional" element={<RastroNacional />} />
              <Route path="/voces-silenciadas" element={<VocesSilenciadas />} />
              <Route path="/reportar" element={<Reportar />} />
              
              {/* Páginas de Learn (rosa) */}
              <Route path="/herstory" element={<HerStory />} />
              <Route path="/mujer/:id" element={<WomanDetail />} />
              <Route path="/aprende" element={<Aprende />} />
              <Route path="/ella-dice" element={<EllaDice />} />
              <Route path="/awareness-guide" element={<AwarenessGuide />} />
              
              {/* Páginas universales */}
              <Route path="/nosotras" element={<Nosotras />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ayuda" element={<Ayuda />} />
              

              {/* Panel admin por levinshein  */}
              <Route path="/admin/verificacion" element={
                  <ProtectedAdminRoute>
                    <AdminVerificacion />
                  </ProtectedAdminRoute>
                } 
              />

              {/* Panel admin - solicitudes */}
              <Route path="/admin/solicitudes" element={
                  <ProtectedAdminRoute>
                    <AdminSolicitudes />
                  </ProtectedAdminRoute>
                } 
              />

              {/* Fin panel admin*/}

              {/* Para colectivos */}
              <Route path="/para-colectivos" element={<ParaColectivos />} />

              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <HerStoryBot />
            <PanicButton />
            </SectionProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
