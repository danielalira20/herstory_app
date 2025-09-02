import { useState, useEffect } from "react";
import { categorias as categoriasData } from "@/components/aprende/Categorias";
import { Button } from "@/components/ui/button";

type Pregunta = {
  question: string;
  options: string[];
  answer: number;
};

interface TriviasProps {
  onClose: () => void;
}

const Trivias = ({ onClose }: TriviasProps) => {
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [feedback, setFeedback] = useState<string>("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategorySelection(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(15);
    setFeedback("");
  };

  const preguntas: Pregunta[] =
    selectedCategory && categoriasData[selectedCategory]
      ? categoriasData[selectedCategory]
      : [];

  const currentPregunta = preguntas[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    if (!currentPregunta) return;

    if (optionIndex === currentPregunta.answer) {
      setScore((prev) => prev + 1);
      setFeedback("✅ ¡Correcto!");
    } else {
      setFeedback("❌ Incorrecto");
    }

    setTimeout(() => {
      setFeedback("");
      if (currentQuestionIndex + 1 < preguntas.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(15);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!currentPregunta || showResults) return;

    if (timeLeft <= 0) {
      setFeedback("⏰ Se acabó el tiempo");
      setTimeout(() => {
        setFeedback("");
        if (currentQuestionIndex + 1 < preguntas.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setTimeLeft(15);
        } else {
          setShowResults(true);
        }
      }, 1000);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestionIndex, showResults, currentPregunta]);

  const handleRestart = () => {
    setShowCategorySelection(true);
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(15);
    setFeedback("");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 text-white">
     <h1 className="text-4xl font-bold text-center mb-6 text-purple-900">Trivias Educativas</h1>
      {showCategorySelection && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.keys(categoriasData).map((category) => (
            <div
  key={category}
  className="cursor-pointer inline-block hover:scale-105 transition-transform duration-200"
  onClick={() => handleCategorySelect(category)}
>
  <img
    src={`/img/categorias/${category}.png`}
    alt={category}
    className="rounded-md"
  />
</div>

          ))}
        </div>
      )}

      {!showCategorySelection && !showResults && currentPregunta && (
        <div className="max-w-3xl mx-auto bg-purple-600 p-8 rounded-xl shadow-xl text-center">
          {/* Progreso */}
          <p className="mb-2 text-lg font-semibold">
            Pregunta {currentQuestionIndex + 1} de {preguntas.length}
          </p>
          <div className="w-full bg-purple-400 h-3 rounded-full mb-4">
            <div
              className="bg-purple-900 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / preguntas.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Pregunta */}
          <h2 className="text-3xl font-bold mb-6">{currentPregunta.question}</h2>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-4">
            {currentPregunta.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="bg-purple-800 hover:bg-purple-900 py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Temporizador visual */}
          <div className="w-full bg-red-400 h-2 rounded-full mt-4">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          {/* Feedback */}
          {feedback && <p className="mt-6 text-xl font-semibold">{feedback}</p>}

          {/* Tiempo restante */}
          <p className="mt-4 font-medium">Tiempo restante: {timeLeft} segundos</p>
        </div>
      )}

      {showResults && (
        <div className="max-w-3xl mx-auto bg-purple-600 p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-6">Resultados</h2>
          <p className="text-2xl mb-6">
            Obtuviste {score} de {preguntas.length} respuestas correctas
          </p>
          <Button onClick={handleRestart} className="bg-white text-purple-700 hover:bg-purple-100">
            Volver a intentar
          </Button>
        </div>
      )}

      {!showCategorySelection && (
        <div className="mt-6 text-center flex justify-center gap-4">
          <Button onClick={handleRestart} className="bg-white text-purple-700 hover:bg-purple-100">
            Volver a categorías
          </Button>
          <Button onClick={onClose} className="bg-white text-purple-700 hover:bg-purple-100">
            Salir
          </Button>
        </div>
      )}
    </div>
  );
};

export default Trivias;





