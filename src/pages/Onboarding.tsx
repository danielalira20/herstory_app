// ONB-F01 [FRONT] + ONB-F02 [FRONT] — Daf — Semana 2
// ONB-F01: Pantalla de bienvenida con banner de fondo
// ONB-F02: Reutiliza Quiz existente con prop onComplete

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Quiz from "../components/quiz";
import banner from "@/assets/banner_trivias.webp";

const Onboarding = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ONB-F01: Pantalla de bienvenida */}
      {!showQuiz && (
        <div className="min-h-screen relative">

          {/* Banner de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
          />

          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-purple-900/70 to-black/80" />

          {/* Blobs decorativos sobre el banner */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(249,168,212,0.4) 0%, transparent 70%)" }}
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
              className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)" }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, delay: 4 }}
              className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)" }}
            />
          </div>

          {/* Contenido de bienvenida */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Logo animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mb-10 shadow-2xl shadow-purple-500/40"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-lg"
            >
              Bienvenida a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #f9a8d4 0%, #f0abfc 50%, #c084fc 100%)" }}
              >
                HerStory
              </span>
            </motion.h1>

            {/* Divider brillante */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="h-0.5 w-24 rounded-full mb-8 mx-auto"
              style={{
                background: "linear-gradient(to right, #f9a8d4, #c084fc)",
                boxShadow: "0 0 30px rgba(249, 168, 212, 0.6)",
              }}
            />

            {/* Subtítulo */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-pink-100 max-w-xl mb-4 leading-relaxed font-serif italic drop-shadow"
            >
              Voces que la historia olvidó,
              mujeres que seguimos buscando
            </motion.p>

            {/* Descripción */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-base text-white/70 max-w-md mb-14 leading-relaxed"
            >
              Queremos conocerte para conectarte
              con la mujer histórica que más resuena contigo
            </motion.p>

            {/* Botón comenzar */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(168, 85, 247, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuiz(true)}
              className="px-10 py-4 rounded-full font-medium text-lg flex items-center gap-3 text-white shadow-xl"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                boxShadow: "0 4px 30px rgba(168, 85, 247, 0.5)",
              }}
            >
              <Sparkles className="w-5 h-5" />
              Comenzar
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute bottom-8"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div
                  className="w-6 h-10 rounded-full flex items-start justify-center p-2"
                  style={{ border: "2px solid rgba(249, 168, 212, 0.4)" }}
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-pink-300/70 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ONB-F02: Quiz con fondo coherente */}
      {showQuiz && (
        <div className="min-h-screen relative">
          {/* Fondo del quiz */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#7e22ce]" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12"
          >
            <Quiz
            onComplete={() => {
              localStorage.setItem("herstory-onboarding-complete", "true");
              window.location.href = "/";
            }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;