// PAN-F01 [FRONT] — Daf — Semana 2
// Botón de pánico flotante — conecta PAN-F03, F04, F05, F06

import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { usePanicMode } from "@/hooks/usePanicMode";
import CamouflageCalculator from "./CamouflageCalculator";

const PanicButton = () => {
  const { isCamouflageActive, activateCamouflage, deactivateCamouflage } = usePanicMode();

  return (
    <>
      {/* PAN-F04: calculadora como overlay cuando está activo */}
      {isCamouflageActive && (
        <CamouflageCalculator onExit={deactivateCamouflage} />
      )}

      {/* PAN-F01: botón flotante — se oculta cuando el camuflaje está activo */}
      {!isCamouflageActive && (
        <div className="fixed bottom-4 left-4 z-[1000]">
          <motion.button
            onClick={activateCamouflage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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