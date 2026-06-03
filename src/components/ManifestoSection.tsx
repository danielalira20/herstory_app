import { motion } from "framer-motion";

const ManifestoSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">

      {/* Fondo oscuro elegante como el hero */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #7e22ce 70%, #a855f7 100%)"
      }} />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(30,27,75,0.4) 100%)" }}
      />

      {/* Siluetas decorativas */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-[0.06] pointer-events-none">
        <svg
          viewBox="0 0 1200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0 100 L0 60 Q50 40, 100 60 Q130 75, 160 50 Q200 20, 240 50 L240 100 Z" fill="rgba(249,168,212,0.6)" />
          <path d="M200 100 L200 55 Q250 30, 300 55 Q340 75, 380 45 Q420 15, 460 45 L460 100 Z" fill="rgba(240,171,252,0.5)" />
          <path d="M420 100 L420 50 Q470 25, 520 50 Q560 70, 600 40 Q640 10, 680 40 L680 100 Z" fill="rgba(249,168,212,0.6)" />
          <path d="M640 100 L640 55 Q690 30, 740 55 Q780 75, 820 45 Q860 15, 900 45 L900 100 Z" fill="rgba(192,132,252,0.5)" />
          <path d="M860 100 L860 50 Q910 25, 960 50 Q1000 70, 1040 40 Q1080 10, 1120 40 L1120 100 Z" fill="rgba(240,171,252,0.5)" />
          <path d="M1080 100 L1080 60 Q1130 35, 1180 60 L1200 60 L1200 100 Z" fill="rgba(249,168,212,0.6)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Cita principal */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-relaxed italic">
            "Cada mujer merece ser recordada, encontrada y celebrada."
          </p>
        </motion.blockquote>

        {/* Historia personal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-lg text-pink-100/70 leading-relaxed max-w-2xl mx-auto"
        >
          HerStory es construido por mujeres mexicanas que vienen de comunidades reales, 
          que han visto desaparecer a amigas, vecinas y familiares. Este proyecto es nuestra 
          forma de decir: <span className="text-pink-300 font-medium">no están solas.</span>
        </motion.p>

        {/* Divider brillante */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(249,168,212,0.5))" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #f9a8d4, #c084fc)", boxShadow: "0 0 10px rgba(249,168,212,0.5)" }} />
          <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(192,132,252,0.5))" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;