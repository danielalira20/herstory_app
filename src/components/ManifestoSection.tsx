import { motion } from "framer-motion";

const ManifestoSection = () => {
  return (
    <section className="relative bg-background py-16 md:py-24 overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />
      
      {/* Minimalist silhouettes decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 100 L0 60 Q50 40, 100 60 Q130 75, 160 50 Q200 20, 240 50 L240 100 Z"
            fill="currentColor"
            className="text-primary"
          />
          <path
            d="M200 100 L200 55 Q250 30, 300 55 Q340 75, 380 45 Q420 15, 460 45 L460 100 Z"
            fill="currentColor"
            className="text-secondary"
          />
          <path
            d="M420 100 L420 50 Q470 25, 520 50 Q560 70, 600 40 Q640 10, 680 40 L680 100 Z"
            fill="currentColor"
            className="text-primary"
          />
          <path
            d="M640 100 L640 55 Q690 30, 740 55 Q780 75, 820 45 Q860 15, 900 45 L900 100 Z"
            fill="currentColor"
            className="text-accent"
          />
          <path
            d="M860 100 L860 50 Q910 25, 960 50 Q1000 70, 1040 40 Q1080 10, 1120 40 L1120 100 Z"
            fill="currentColor"
            className="text-secondary"
          />
          <path
            d="M1080 100 L1080 60 Q1130 35, 1180 60 L1200 60 L1200 100 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main manifesto text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-playfair text-foreground leading-relaxed italic">
            "Cada mujer merece ser recordada, encontrada y celebrada."
          </p>
        </motion.blockquote>

        {/* Personal story */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          HerStory es construido por mujeres mexicanas que vienen de comunidades reales, 
          que han visto desaparecer a amigas, vecinas y familiares. Este proyecto es nuestra 
          forma de decir: <span className="text-foreground font-medium">no están solas.</span>
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/40" />
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
