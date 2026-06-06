// ImpactSection — Sección independiente de impacto en tiempo real
// Va entre ChoosePathSection y ManifestoSection en el landing

import { motion } from "framer-motion";
import DashboardImpacto from "./DashboardImpacto";

const ImpactSection = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-background">
      {/* Línea decorativa top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[4px] text-purple-400 dark:text-purple-500 mb-3">
            Impacto
          </p>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
            Lo que hemos construido{" "}
            <span className="italic text-pink-500 dark:text-pink-400">juntas</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Cada número representa a una mujer acompañada, una historia
            rescatada, una voz que dejó de estar sola.
          </p>
        </motion.div>

        {/* Dashboard widget */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <DashboardImpacto />
        </motion.div>
      </div>

      {/* Línea decorativa bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent" />
    </section>
  );
};

export default ImpactSection;