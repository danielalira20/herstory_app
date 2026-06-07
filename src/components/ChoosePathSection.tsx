import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, AlertTriangle, Sparkles } from "lucide-react";
import PathCard from "./PathCard";

const ChoosePathSection = () => {
  const [hoveredCard, setHoveredCard] = useState<"search" | "learn" | null>(null);

  const searchFeatures = [
    "Búsqueda inteligente con IA en testimonios y reportes.",
    "Mapa interactivo nacional de casos.",
    "Herramientas para familias e investigadores.",
    "Base de datos verificada y actualizada.",
  ];

  const learnFeatures = [
    "Museo digital interactivo de mujeres históricas.",
    "Chatbot histórico con IA que cuenta historias.",
    "Trivia gamificada: ¿Qué mujer histórica eres?",
    "Recursos educativos para escuelas y docentes.",
  ];

  return (
    <section className="relative py-24 overflow-hidden">

      {/* Fondo con tinte sutil */}
      <div className="absolute inset-0 bg-purple-50/50 dark:bg-purple-950/20" />

      {/* Blobs decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(249,168,212,0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Formas animadas moradas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculo flotante grande */}
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-52 h-52 rounded-full border-2 border-purple-500/50"
        />

        {/* Círculo flotante pequeño */}
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 left-[8%] w-28 h-28 rounded-full bg-purple-400/30"
        />

        {/* Cuadrado rotado */}
        <motion.div
          animate={{ rotate: [0, 90, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-[5%] w-32 h-32 rounded-2xl border-2 border-purple-400/45 rotate-45"
        />

        {/* Círculo con glow */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 left-[15%] w-24 h-24 rounded-full bg-purple-500/30"
        />

        {/* Anillo grande */}
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[15%] left-[40%] w-44 h-44 rounded-full border-2 border-pink-400/40"
        />

        {/* Punto brillante */}
        <motion.div
          animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-[20%] w-4 h-4 rounded-full bg-purple-500/70"
        />

        {/* Punto brillante 2 */}
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-[25%] left-[25%] w-3 h-3 rounded-full bg-pink-500/60"
        />

        {/* Orb difuso nuevo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] right-[30%] w-36 h-36 rounded-full bg-purple-300/20 blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-0.5 w-16 rounded-full mx-auto mb-8"
            style={{
              background: "linear-gradient(to right, #a855f7, #ec4899)",
              boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)",
            }}
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-purple-900 dark:text-purple-200 mb-4">
            Elige cómo quieres sumarte hoy
          </h2>
          <p className="text-base md:text-lg text-purple-600/60 dark:text-purple-300/70 max-w-2xl mx-auto leading-relaxed">
            Encontrar a quienes nos faltan o recordar a quienes la historia silenció.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div
            onMouseEnter={() => setHoveredCard("search")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <PathCard
              badge={{ icon: AlertTriangle, text: "URGENTE" }}
              icon={<Search className="w-6 h-6 text-purple-700" />}
              title="HerStory Search"
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

          <div
            onMouseEnter={() => setHoveredCard("learn")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <PathCard
              badge={{ icon: Sparkles, text: "INSPIRADOR" }}
              icon={<BookOpen className="w-6 h-6 text-pink-700" />}
              title="HerStory Learn"
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