import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FloatingShapes from "./FloatingShapes";
import WomenSilhouettes from "./WomenSilhouettes";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[85vh] flex flex-col justify-start pt-[20vh] items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #7e22ce 70%, #a855f7 100%)'
      }}
    >
      {/* Noise/texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(30,27,75,0.4) 100%)'
        }}
      />
      
      {/* Floating background shapes */}
      <FloatingShapes />
      
      {/* Women silhouettes with parallax */}
      <motion.div 
        style={{ y: silhouetteY }}
        className="absolute inset-0 pointer-events-none"
      >
        <WomenSilhouettes />
      </motion.div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-end">
          <Link to="/login" className="text-white/90 hover:text-white font-medium px-6 py-2 rounded-full border border-pink-300/30 hover:border-pink-300/50 hover:bg-pink-300/10 transition-all duration-300">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Iniciar Sesión
          </motion.span>
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-playfair tracking-normal mb-2"
        >
          HerStory
        </motion.h1>
        
        {/* Emotional subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-[1.875rem] lg:text-4xl text-pink-100 italic font-playfair mt-2"
        >
          Voces que la historia olvidó
        </motion.p>
        
        {/* Duality message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/80 mt-4"
        >
          Dos Caminos, Una Misión: Encontrar y Recordar
        </motion.p>
        
        {/* Glowing divider - ROSA/MORADO */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-0.5 w-24 rounded-full mt-6 mx-auto"
          style={{
            background: 'linear-gradient(to right, #f9a8d4, #f0abfc)',
            boxShadow: '0 0 20px rgba(249, 168, 212, 0.6)'
          }}
        />
        
        {/* Mission statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Tecnología creada por mujeres para mujeres, para que ninguna historia 
          se pierda y ninguna desaparición se quede sin buscar.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.p
          className="text-pink-200/80 text-sm font-medium tracking-wide"
        >
          Descubre cómo puedes ayudar
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-10 rounded-full border-2 border-pink-300/40 flex justify-center pt-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-pink-300/60 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
