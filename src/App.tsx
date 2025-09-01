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
//import Chatbot from "./components/ui/chatbot";
import ChatbotSimulado from "./components/ui/chatbot_simulado";
import WomanDetail from "./pages/WomanDetail";
import HerStory from "./pages/HerStory";
import VocesSilenciadas from "./pages/VocesSilenciadas";
import { useInitializeUser } from "./hooks/useInitializeUser";

const queryClient = new QueryClient();

const App = () => {
  useInitializeUser();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="herstory-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ChatbotSimulado /> {/* Burbuja flotante */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="/mujeres-desaparecidas" element={<MujeresDesaparecidas />} />
            <Route path="/ella-dice" element={<EllaDice />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotras" element={<Nosotras />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/aprende" element={<Aprende />} />
            <Route path="/mujer/:id" element={<WomanDetail />} />
            <Route path="/herstory" element={<HerStory />} />
            <Route path="/voces-silenciadas" element={<VocesSilenciadas />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;