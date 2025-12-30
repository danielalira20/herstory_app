import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, AlertTriangle, Sparkles } from "lucide-react";
import PathCard from "./PathCard";

const ChoosePathSection = () => {
  const [hoveredCard, setHoveredCard] = useState<"search" | "learn" | null>(null);

  const searchFeatures = [
  "Búsqueda inteligente con IA en testimonios y reportes.",
  "Mapa interactivo nacional de casos.",
  "Alertas geográficas en tiempo real para la comunidad.",
  "Herramientas para investigadores y organizaciones.",
  ];

  const learnFeatures = [
  "Museo digital interactivo de mujeres históricas.",
  "Chatbot histórico con IA que cuenta historias.",
  "Trivia gamificada: \"¿Qué mujer histórica eres?\"",
  "Recursos educativos para escuelas y docentes.",
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-slate-900 mb-4">
            Elige cómo quieres sumarte hoy
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Encontrar a quienes nos faltan o recordar a quienes la historia silenció.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Search Card - AZUL OSCURO */}
          <div
            onMouseEnter={() => setHoveredCard("search")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <PathCard
              badge={{ icon: AlertTriangle, text: "URGENTE" }}
              icon={<Search className="w-6 h-6 text-white" />}
              title="HERSTORY SEARCH"
              description="Ayudamos a familias y organizaciones a conectar reportes, testimonios y datos dispersos para que las desapariciones no se queden en silencio."
              features={searchFeatures}
              buttonText="Únete a la búsqueda"
              buttonLink="/search"
              microText="Para familias, colectivas, ONG y personas que se niegan a olvidar."
              variant="search"
              delay={0}
              isOtherHovered={hoveredCard === "learn"}
            />
          </div>

          {/* Learn Card - ROSA/MORADO */}
          <div
            onMouseEnter={() => setHoveredCard("learn")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <PathCard
              badge={{ icon: Sparkles, text: "INSPIRADOR" }}
              icon={<BookOpen className="w-6 h-6 text-white" />}
              title="HERSTORY LEARN"
              description="Un espacio para descubrir a las mujeres que cambiaron el mundo, pero que rara vez aparecen en los libros de texto."
              features={learnFeatures}
              buttonText="Descubre sus historias"
              buttonLink="/learn"
              microText="Para estudiantes, docentes y cualquiera que quiera aprender con el corazón."
              variant="learn"
              delay={0.15}
              isOtherHovered={hoveredCard === "search"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoosePathSection;
