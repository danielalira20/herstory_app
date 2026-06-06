// AppTutorial — Walkthrough de funciones de HerStory
// No revela ningún código default — manda al perfil para configurar
// Se muestra una vez después del primer login

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-background border border-purple-200 dark:border-purple-800/50 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 border border-purple-200 dark:border-purple-700 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pt-5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-6 bg-purple-500 dark:bg-purple-400"
                  : i < currentStep
                    ? "w-1.5 bg-purple-300 dark:bg-purple-600"
                    : "w-1.5 bg-purple-200 dark:bg-purple-800"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pt-8 pb-6">
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
              >
                {step.icon}
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">
                  {step.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.highlight && (
                  <p className="text-xs text-purple-500 dark:text-purple-400 font-medium mt-2">
                    {step.highlight}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-8 pb-6">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {STEPS.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 px-5 py-2 rounded-full transition-colors"
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