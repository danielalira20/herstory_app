// AppTutorial — Walkthrough glassmorphism + paso de salida desde Auren
// Se muestra una vez después del onboarding

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  MessageCircle,
  BookOpen,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  LogOut,
} from "lucide-react";

interface TutorialStep {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  highlight?: string;
}

const STEPS: TutorialStep[] = [
  {
    icon: <Sparkles className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-pink-400 to-pink-600",
    title: "Bienvenida a HerStory",
    description:
      "Un espacio seguro creado por mujeres para mujeres. Aquí puedes buscar ayuda, aprender, y nunca estás sola.",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
    title: "Auren, tu compañera",
    description:
      "Auren es una inteligencia artificial que te escucha sin juzgar. Puedes contarle cómo te sientes, hacerle preguntas, o simplemente hablar. Si detecta que estás en peligro, te conecta con ayuda real.",
    highlight: "Encuéntrala en el ícono de chat en la esquina",
  },
  {
    icon: <LogOut className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-rose-400 to-red-500",
    title: "Salida rápida desde Auren",
    description:
      "Mientras hablas con Auren, tienes un botón de salida rápida. Si alguien se acerca, tócalo y saldrás de la conversación al instante. Tu seguridad siempre es primero.",
    highlight: "Búscalo dentro del chat de Auren",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-rose-400 to-rose-600",
    title: "Museo de mujeres históricas",
    description:
      "Descubre a más de 80 mujeres que cambiaron la historia. Juega trivias, adivina quién dijo cada frase célebre, y encuentra a la mujer histórica que más se parece a ti.",
  },
  {
    icon: <MapPin className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    title: "Búsqueda y visibilización",
    description:
      "Ayudamos a familias y colectivos a conectar información sobre mujeres desaparecidas. Un mapa nacional, herramientas de verificación, y una comunidad que no se rinde.",
  },
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    iconBg: "bg-gradient-to-br from-purple-600 to-purple-800",
    title: "Botón de pánico",
    description:
      "HerStory tiene un botón de seguridad que transforma todo en una calculadora si alguien revisa tu dispositivo. Sin rastro, sin evidencia. Para activarlo, necesitas configurar tu código secreto personal en tu perfil.",
    highlight:
      "Ve a tu perfil para configurarlo — el botón aparecerá cuando esté listo",
  },
];

interface AppTutorialProps {
  onComplete: () => void;
}

const AppTutorial = ({ onComplete }: AppTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const isFirst = currentStep === 0;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem("herstory-tutorial-complete", "true");
      onComplete();
      return;
    }
    setDirection(1);
    setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const handleSkip = () => {
    localStorage.setItem("herstory-tutorial-complete", "true");
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleSkip}
      />

      {/* Card Glass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Glow decorativo */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white/90 transition-colors"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pt-6 relative z-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-6 bg-white/90"
                  : i < currentStep
                    ? "w-1.5 bg-white/40"
                    : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pt-8 pb-6 relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-lg`}
                style={{
                  boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
                }}
              >
                {step.icon}
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">
                  {step.title}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
                {step.highlight && (
                  <p className="text-xs text-pink-300/80 font-medium mt-2">
                    {step.highlight}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-8 pb-6 relative z-10">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="flex items-center gap-1 text-sm text-white/40 hover:text-white/80 disabled:opacity-0 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <span className="text-xs text-white/30">
            {currentStep + 1} / {STEPS.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-sm font-medium text-white px-5 py-2 rounded-full transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(236, 72, 153, 0.7))",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)",
            }}
          >
            {isLast ? "Empezar" : "Siguiente"}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppTutorial;