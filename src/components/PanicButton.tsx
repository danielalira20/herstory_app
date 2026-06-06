// PAN-F01 [FRONT] — Daf — Semana 2 + Semana 4
// Botón de pánico flotante — SOLO aparece si la usuaria configuró su código
// Sin código configurado, el botón no existe

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { usePanicMode } from "@/hooks/usePanicMode";
import CamouflageCalculator from "./CamouflageCalculator";

const PanicButton = () => {
  const { isCamouflageActive, activateCamouflage, deactivateCamouflage } =
    usePanicMode();
  const [hasCode, setHasCode] = useState(false);

  // Verificar si hay código configurado
  useEffect(() => {
    const checkCode = () => {
      setHasCode(!!localStorage.getItem("herstory-panic-code"));
    };

    checkCode();

    // Revisar periódicamente por si lo configura en otra pestaña o en el perfil
    const interval = setInterval(checkCode, 2000);

    // También escuchar cambios en localStorage
    window.addEventListener("storage", checkCode);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkCode);
    };
  }, []);

  return (
    <>
      {/* Calculadora como overlay cuando está activo */}
      {isCamouflageActive && (
        <CamouflageCalculator onExit={deactivateCamouflage} />
      )}

      {/* Botón flotante — solo si tiene código configurado Y no está en camuflaje */}
      {hasCode && !isCamouflageActive && (
        <div className="fixed bottom-4 left-4 z-[1000]">
          <motion.button
            onClick={activateCamouflage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-14 h-14 rounded-full bg-purple-600/90 dark:bg-purple-700/90 
                       shadow-lg flex items-center justify-center
                       border-2 border-purple-400/30
                       hover:bg-purple-700 dark:hover:bg-purple-600
                       transition-colors duration-200"
            aria-label="Salida rápida"
          >
            <Shield className="h-6 w-6 text-white" />
          </motion.button>
        </div>
      )}
    </>
  );
};

export default PanicButton;