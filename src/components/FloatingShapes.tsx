import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating circles - mix azul + rosa/morado */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(76, 29, 149, 0.3)' }} // morado oscuro
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }} // rosa-morado
        animate={{
          y: [20, -30, 20],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(126, 34, 206, 0.25)' }} // morado medio
        animate={{
          y: [-30, 20, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Smaller decorative circles - rositas */}
      <motion.div
        className="absolute top-1/3 left-20 w-4 h-4 rounded-full"
        style={{ backgroundColor: 'rgba(249, 168, 212, 0.3)' }} // rosa
        animate={{
          y: [-40, 40, -40],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-32 w-3 h-3 rounded-full"
        style={{ backgroundColor: 'rgba(240, 171, 252, 0.4)' }} // rosa claro
        animate={{
          y: [30, -30, 30],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full"
        style={{ backgroundColor: 'rgba(232, 121, 249, 0.5)' }} // fucsia suave
        animate={{
          y: [-20, 20, -20],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default FloatingShapes;
