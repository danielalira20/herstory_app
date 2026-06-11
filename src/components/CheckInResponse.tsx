import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OPCIONES = [
  { emoji: "💚", texto: "Estoy bien",           accion: "bien" },
  { emoji: "💜", texto: "Necesito hablar",       accion: "hablar" },
  { emoji: "🌸", texto: "Gracias por preguntar", accion: "gracias" },
];

const CheckInResponse = () => {
  const [visible, setVisible] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkin") === "1") {
      setVisible(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  async function responder(opcion: typeof OPCIONES[0]) {
    await fetch(`${BACKEND}/api/push/checkin-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: opcion.texto }),
    });

    if (opcion.accion === "hablar") {
      setVisible(false);
      window.dispatchEvent(new CustomEvent("open-auren"));
    } else {
      setEnviado(true);
      setTimeout(() => setVisible(false), 2000);
    }
  }

return (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        className="fixed top-4 right-4 z-[2000] w-[260px] rounded-3xl p-5"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        {!enviado ? (
          <>
            <p className="text-white font-semibold text-sm text-center mb-0.5">
              Auren ✨
            </p>
            <p className="text-white/70 text-xs text-center mb-4">
              ¿Cómo estás hoy?
            </p>

            <div className="flex justify-between gap-2">
              {OPCIONES.map(op => (
                <button
                  key={op.texto}
                  onClick={() => responder(op)}
                  className="flex flex-col items-center gap-1.5 flex-1 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="text-2xl">{op.emoji}</span>
                  <span className="text-[10px] text-white/80 font-medium text-center leading-tight">
                    {op.texto}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setVisible(false)}
              className="w-full mt-3 text-xs text-white/40 hover:text-white/70 transition py-1"
            >
              Ahora no
            </button>
          </>
        ) : (
          <p className="text-sm text-center text-white font-medium py-2">
            Auren te escucha 🌸
          </p>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);
};

export default CheckInResponse;