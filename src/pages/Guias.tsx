import { Link } from "react-router-dom";
import NavbarLearn from "@/components/NavbarLearn";
import { BookOpen, Shield } from "lucide-react";
import headerImage from "@/assets/guides-book.jpg";
import WomenSilhouettes from "@/components/WomenSilhouettes";

const Guias = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />

      {/* Hero */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <img
          src={headerImage}
          alt="Guías"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-pink-800/60 to-pink-700/50 flex items-center justify-center">
          <WomenSilhouettes />
          <div className="relative z-20 text-center text-white space-y-3 px-4">
            <p className="text-xs md:text-sm uppercase tracking-[4px] text-pink-200">
              HerStory · Guías
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Guías{" "}
              <span className="italic font-normal text-pink-200">para ti</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Recursos descargables y guías de concientización para informarte, protegerte y actuar.
            </p>
          </div>
        </div>
      </div>

      {/* Hub de secciones */}
      <div className="container max-w-4xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Guías de Apoyo */}
          <Link to="/guias/apoyo" className="group">
            <div className="border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Guías de Apoyo
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Documentos descargables sobre derechos humanos, salud, recursos legales, empoderamiento y más.
                </p>
                <p className="text-xs text-primary mt-4 font-medium">
                  Ver guías →
                </p>
              </div>
            </div>
          </Link>

          {/* Guía de Concientización */}
          <Link to="/guias/concientizacion" className="group">
            <div className="border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Shield className="h-16 w-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Guía de Concientización
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Recursos e información para reconocer, prevenir y enfrentar la violencia. Guías por situación.
                </p>
                <p className="text-xs text-primary mt-4 font-medium">
                  Ver guía →
                </p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Guias;