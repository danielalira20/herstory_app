// ONB-F03 [FRONT] — Daf — Semana 3
// Pantalla cinematográfica de revelación del match
// Busca la imagen de la figura en Supabase (tabla mujeres)

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Clock, Heart } from "lucide-react";
import { supabaseMuseo } from "@/lib/supabaseMuseo";

const CATEGORIAS_LABEL: Record<string, string> = {
  voces_creadoras: "Voces Creadoras",
  pensamiento_critico: "Pensamiento Crítico y Sabiduría",
  guardianas_dignidad: "Guardianas de la Dignidad",
  liderazgo_transformacion: "Liderazgo y Transformación",
  deporte: "Deporte",
  naturaleza_planeta: "Naturaleza y Defensa del Planeta",
  ciencia_salud_tecnologia: "Ciencia, Salud y Tecnología",
};

interface MatchFigura {
  nombre: string;
  region: string;
  epoca: string;
  injusticias: string[];
  categoria_campo: string;
  imagen_url?: string;
  explicacion?: string;
}

interface MatchRevealProps {
  figura: MatchFigura;
  onContinue: () => void;
}

const MatchReveal = ({ figura, onContinue }: MatchRevealProps) => {
  const [phase, setPhase] = useState<"intro" | "reveal" | "details">("intro");
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);

  // Buscar imagen en Supabase por nombre
  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const { data } = await supabaseMuseo
          .from("mujeres")
          .select("imagen_url")
          .ilike("nombre_conocido", `%${figura.nombre.split(" ")[0]}%`)
          .limit(1)
          .single();

        if (data?.imagen_url) {
          setImagenUrl(data.imagen_url);
        }
      } catch {
        console.log("No se encontró imagen para", figura.nombre);
      }
    };

    fetchImagen();
  }, [figura.nombre]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2000);
    const t2 = setTimeout(() => setPhase("details"), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const categoriaLabel =
    CATEGORIAS_LABEL[figura.categoria_campo] || figura.categoria_campo;

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #7e22ce 70%, #a855f7 100%)",
        }}
      />

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Fase 1: Intro */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto"
              >
                <Sparkles className="w-16 h-16 text-pink-300/60" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-pink-100 font-serif italic"
              >
                Buscando a la mujer que resuena contigo...
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="h-0.5 w-32 mx-auto rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #f9a8d4, transparent)",
                }}
              />
            </motion.div>
          )}

          {/* Fase 2: Reveal del nombre */}
          {phase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm uppercase tracking-[6px] text-pink-300/70"
              >
                Tu compañera histórica es
              </motion.p>

              {/* Foto */}
              {imagenUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-pink-300/30 shadow-2xl shadow-purple-500/30"
                >
                  <img
                    src={imagenUrl}
                    alt={figura.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight"
              >
                {figura.nombre}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="h-0.5 w-24 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(to right, #f9a8d4, #c084fc)",
                  boxShadow: "0 0 20px rgba(249, 168, 212, 0.5)",
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-lg text-purple-200/80 font-serif italic"
              >
                {categoriaLabel}
              </motion.p>
            </motion.div>
          )}

          {/* Fase 3: Detalles + botón */}
          {phase === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Foto + nombre */}
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[4px] text-pink-300/60">
                  Tu compañera histórica
                </p>

                {imagenUrl && (
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-pink-300/30 shadow-xl">
                    <img
                      src={imagenUrl}
                      alt={figura.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
                  {figura.nombre}
                </h1>
                <p className="text-purple-200/70 font-serif italic">
                  {categoriaLabel}
                </p>
              </div>

              {/* Divider */}
              <div
                className="h-0.5 w-20 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(to right, #f9a8d4, #c084fc)",
                  boxShadow: "0 0 15px rgba(249, 168, 212, 0.4)",
                }}
              />

              {/* Info cards */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                  <Clock className="w-4 h-4 text-pink-300" />
                  <span className="text-sm text-white/80">{figura.epoca}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                  <MapPin className="w-4 h-4 text-pink-300" />
                  <span className="text-sm text-white/80">{figura.region}</span>
                </div>
              </motion.div>

              {/* Mensaje emocional */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-pink-200/60 max-w-sm mx-auto"
              >
                Ella te acompañará en tu camino por HerStory. Su historia y la
                tuya ahora están conectadas.
              </motion.p>

              {/* Botón continuar */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 40px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="px-10 py-4 rounded-full font-medium text-lg text-white shadow-xl mx-auto flex items-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  boxShadow: "0 4px 30px rgba(168, 85, 247, 0.4)",
                }}
              >
                <Heart className="w-5 h-5" />
                Continuar a HerStory
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatchReveal;