// QuizTrivias — Trivia por categorías · Paleta rosa + dark mode

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Trophy,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Users,
  BookOpen,
  Scale,
  Megaphone,
  Palette,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { giveThirdBadge, giveFourthBadge } from "@/lib/badges";
import { supabase } from "@/lib/supabaseClient";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

interface Category {
  name: string;
  icon: React.ReactNode;
  gradient: string;
  questions: Question[];
}

const categories: Record<string, Category> = {
  igualdadGenero: {
    name: "Igualdad de Género",
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: "from-pink-400 to-pink-600",
    questions: [
      { question: "¿Qué es la igualdad de género?", options: ["Hombres y mujeres con mismos derechos", "Solo mujeres tienen más derechos", "Solo hombres tienen más derechos", "No existen leyes"], answer: 0, explanation: "La igualdad de género significa que hombres y mujeres tienen los mismos derechos, oportunidades y responsabilidades." },
      { question: "¿Cuál es un ejemplo de desigualdad de género?", options: ["Mismo salario por mismo trabajo", "Mujeres ganando menos por igual trabajo", "Mismo acceso a educación", "Participación igual en política"], answer: 1, explanation: "La desigualdad de género se refleja cuando las mujeres reciben un salario menor que los hombres por realizar el mismo trabajo." },
      { question: "¿Qué significa empoderamiento femenino?", options: ["Dar poder solo a mujeres", "Que las mujeres tomen decisiones y lideren", "Quitar derechos a hombres", "Ignorar la igualdad"], answer: 1, explanation: "El empoderamiento femenino consiste en que las mujeres tengan la capacidad de tomar decisiones y participar activamente en la sociedad." },
      { question: "ODS relacionado con igualdad de género", options: ["ODS 3", "ODS 5", "ODS 7", "ODS 10"], answer: 1, explanation: "El ODS 5 se enfoca en lograr la igualdad de género y empoderar a todas las mujeres y niñas." },
      { question: "Un estereotipo de género es...", options: ["Una creencia que limita roles de género", "Un tipo de salario", "Un derecho legal", "Un premio"], answer: 0, explanation: "Un estereotipo de género es una idea que limita a las personas a cumplir ciertos roles por ser hombres o mujeres." },
      { question: "Violencia de género es...", options: ["Abuso solo físico", "Abuso basado en género", "Abuso laboral solo", "Ignorar leyes"], answer: 1, explanation: "La violencia de género incluye cualquier tipo de abuso que ocurre por motivos relacionados con el género." },
      { question: "Equidad vs igualdad", options: ["Son lo mismo", "Equidad considera necesidades distintas", "Equidad no existe", "Igualdad es injusta"], answer: 1, explanation: "La equidad reconoce que algunas personas necesitan apoyos diferentes para alcanzar las mismas oportunidades." },
    ],
  },
  historiaMujeres: {
    name: "Historia de Mujeres",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    gradient: "from-rose-400 to-rose-600",
    questions: [
      { question: "Primera mujer en recibir Nobel de la Paz", options: ["Marie Curie", "Malala Yousafzai", "Bertha von Suttner", "Rigoberta Menchú"], answer: 2, explanation: "Bertha von Suttner fue la primera mujer en recibir el Premio Nobel de la Paz en 1905." },
      { question: "Quién luchó por el sufragio femenino en EEUU", options: ["Susan B. Anthony", "Frida Kahlo", "Simone de Beauvoir", "Clara Zetkin"], answer: 0, explanation: "Susan B. Anthony fue una líder clave en el movimiento por el sufragio femenino en Estados Unidos." },
      { question: "Famosa científica que descubrió radio", options: ["Ada Lovelace", "Marie Curie", "Rosalind Franklin", "Jane Goodall"], answer: 1, explanation: "Marie Curie descubrió el radio y el polonio, y fue la primera persona en ganar dos premios Nobel." },
      { question: "Mujer pionera en aviación", options: ["Amelia Earhart", "Harriet Tubman", "Marie Curie", "Valentina Tereshkova"], answer: 0, explanation: "Amelia Earhart fue la primera mujer en volar sola a través del océano Atlántico." },
      { question: "Activista por derechos civiles en EEUU", options: ["Rosa Parks", "Eleanor Roosevelt", "Malala Yousafzai", "Marie Curie"], answer: 0, explanation: "Rosa Parks fue una figura clave en el movimiento por los derechos civiles en Estados Unidos." },
      { question: "Mujer importante en computación temprana", options: ["Ada Lovelace", "Marie Curie", "Grace Hopper", "Rosalind Franklin"], answer: 0, explanation: "Ada Lovelace es considerada la primera programadora de la historia." },
      { question: "Conocida por su activismo por niñas", options: ["Malala Yousafzai", "Rosa Parks", "Angela Merkel", "Marie Curie"], answer: 0, explanation: "Malala Yousafzai es la persona más joven en recibir el Nobel de la Paz por defender la educación de las niñas." },
    ],
  },
  derechosHumanos: {
    name: "Derechos Humanos",
    icon: <Scale className="w-8 h-8 text-white" />,
    gradient: "from-pink-300 to-pink-500",
    questions: [
      { question: "Declaración Universal de DDHH se firmó en", options: ["1945", "1948", "1950", "1960"], answer: 1, explanation: "La Declaración Universal de los Derechos Humanos fue adoptada por la ONU en 1948." },
      { question: "Derecho a educación es...", options: ["Derecho fundamental", "Solo opcional", "Solo para hombres", "Solo para mujeres"], answer: 0, explanation: "El derecho a la educación es un derecho humano fundamental para todas las personas." },
      { question: "Derecho a la igualdad", options: ["Igualdad ante la ley", "Solo hombres", "Solo mujeres", "Solo ricos"], answer: 0, explanation: "El derecho a la igualdad asegura el mismo trato y protección legal sin importar género, raza o condición." },
      { question: "Libertad de expresión es...", options: ["Expresar ideas sin represalias", "No se permite", "Solo en redes", "Solo adultos"], answer: 0, explanation: "La libertad de expresión es el derecho a expresar ideas libremente sin miedo a represalias." },
      { question: "Derecho a voto es", options: ["Fundamental", "Solo hombres", "Solo mujeres", "No existe"], answer: 0, explanation: "El derecho al voto permite a las personas participar en las decisiones democráticas de su país." },
      { question: "Derecho a privacidad incluye", options: ["Protección de datos personales", "Publicar todo online", "Ignorar privacidad", "Solo empresas"], answer: 0, explanation: "El derecho a la privacidad protege la vida personal y los datos de cada individuo." },
    ],
  },
  activismoSocial: {
    name: "Activismo Social",
    icon: <Megaphone className="w-8 h-8 text-white" />,
    gradient: "from-rose-500 to-pink-700",
    questions: [
      { question: "Activismo social es...", options: ["Acción para cambiar la sociedad", "Ignorar problemas", "Solo protestas violentas", "Solo redes sociales"], answer: 0, explanation: "El activismo social consiste en tomar acciones para generar cambios positivos en la sociedad." },
      { question: "Una forma de activismo pacífico", options: ["Marchas y campañas", "Robos", "Ataques", "Ignorar causas"], answer: 0, explanation: "El activismo pacífico incluye marchas, campañas de concientización y protestas no violentas." },
      { question: "Voluntariado es", options: ["Ayudar sin fines de lucro", "Trabajo obligatorio", "Solo por dinero", "Ignorar causas"], answer: 0, explanation: "El voluntariado es trabajo libre y sin fines de lucro para ayudar a la comunidad." },
      { question: "Uso de redes para activismo", options: ["Campañas y concientización", "Solo memes", "Ignorar redes", "Spam"], answer: 0, explanation: "Las redes sociales son herramientas poderosas para campañas de concientización." },
      { question: "Empoderamiento social incluye", options: ["Dar voz a todos", "Ignorar a minorías", "Solo líderes", "Solo ricos"], answer: 0, explanation: "El empoderamiento social busca dar voz y participación a todas las personas." },
      { question: "Solidaridad es", options: ["Apoyar causas justas", "Ignorar problemas", "Solo palabras", "Solo dinero"], answer: 0, explanation: "La solidaridad significa apoyar activamente causas justas y a quienes lo necesitan." },
    ],
  },
  arteYCultura: {
    name: "Arte y Cultura",
    icon: <Palette className="w-8 h-8 text-white" />,
    gradient: "from-pink-500 to-rose-500",
    questions: [
      { question: "Mujeres importantes en arte", options: ["Frida Kahlo", "Todas las anteriores", "Mary Cassatt", "Artemisia Gentileschi"], answer: 1, explanation: "Muchas mujeres han hecho historia en el arte, como Frida Kahlo, Mary Cassatt y Artemisia Gentileschi." },
      { question: "Arte feminista busca", options: ["Visibilizar mujeres", "Ignorar género", "Solo estética", "Solo hombres"], answer: 0, explanation: "El arte feminista busca visibilizar a las mujeres y cuestionar desigualdades." },
      { question: "Música y empoderamiento femenino", options: ["Canciones que inspiran igualdad", "Ignorar música", "Solo instrumental", "Solo hombres"], answer: 0, explanation: "La música también es herramienta de empoderamiento con canciones que dan voz a las mujeres." },
      { question: "Literatura escrita por mujeres", options: ["Jane Austen, Gabriela Mistral", "Solo hombres", "Ignorar literatura", "Solo infantil"], answer: 0, explanation: "Mujeres como Jane Austen y Gabriela Mistral transformaron la literatura mundial." },
      { question: "Teatro feminista destaca...", options: ["Temas de igualdad", "Solo comedia", "Solo danza", "Ignorar género"], answer: 0, explanation: "El teatro feminista aborda igualdad y promueve la reflexión social." },
      { question: "Museos destacan...", options: ["Mujeres artistas", "Solo hombres", "Solo historia", "Nada"], answer: 0, explanation: "Cada vez más museos buscan visibilizar a mujeres artistas que antes fueron ignoradas." },
    ],
  },
};

const QuizTrivias = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [badgeAssigned, setBadgeAssigned] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setShuffledQuestions(
      [...categories[category].questions].sort(() => Math.random() - 0.5)
    );
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);

    if (!badgeAssigned && user) {
      setBadgeAssigned(true);
      try {
        if (category === "igualdadGenero") await giveThirdBadge(user.id);
        else if (category === "activismoSocial") await giveFourthBadge(user.id);
      } catch (error) {
        console.error("Error asignando insignia:", error);
      }
    }
  };

  const handleAnswer = (index: number) => {
    if (answered || !selectedCategory) return;

    const currentQ = shuffledQuestions[currentQuestion];
    setAnswered(true);
    setSelectedAnswer(index);

    if (index === currentQ.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  // ── Selector de categorías ──
  if (!selectedCategory) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(categories).map(([key, cat], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(key)}
              className={`relative rounded-2xl overflow-hidden p-7 text-left bg-gradient-to-br ${cat.gradient} shadow-md group min-h-[200px]`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <p className="text-white/60 text-sm mt-1">
                    {cat.questions.length} preguntas
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const cat = categories[selectedCategory];
  const currentQ = shuffledQuestions[currentQuestion];
  const progress =
    ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  // ── Pantalla de resultados ──
  if (showResult) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);

    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6 py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center mx-auto"
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground">
          {cat.name} — Completado
        </h2>
        <div className="text-5xl font-bold text-pink-600 dark:text-pink-400">
          {percentage}%
        </div>
        <p className="text-muted-foreground">
          {score} de {shuffledQuestions.length} correctas
        </p>

        <div className="w-full h-3 bg-pink-100 dark:bg-pink-950/40 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
          />
        </div>

        <p className="text-pink-800 dark:text-pink-300">
          {percentage >= 80
            ? "¡Excelente! Dominas este tema"
            : percentage >= 50
              ? "¡Bien! Sigue aprendiendo"
              : "Cada intento cuenta"}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-2.5 rounded-full border-2 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300 font-medium hover:bg-pink-50 dark:hover:bg-pink-950/30 transition"
          >
            Otra categoría
          </button>
          <button
            onClick={() => handleCategorySelect(selectedCategory)}
            className="px-6 py-2.5 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ── Juego activo ──
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={resetQuiz}
          className="text-sm text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition"
        >
          ← Categorías
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1}/{shuffledQuestions.length}
          </span>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold text-foreground">{score}</span>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-2 bg-pink-100 dark:bg-pink-950/40 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress}%` }}
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
        />
      </div>

      {/* Pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-pink-900 dark:text-pink-100">
            {currentQ.question}
          </h3>

          <div className="space-y-2">
            {currentQ.options.map((option, index) => {
              let estilo =
                "border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/30";
              if (answered) {
                if (index === currentQ.answer)
                  estilo = "border-green-400 bg-green-50 dark:bg-green-950/30 dark:border-green-600";
                else if (index === selectedAnswer)
                  estilo = "border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-600";
                else estilo = "border-gray-200 dark:border-gray-700 opacity-50";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${estilo}`}
                >
                  <span className="mr-3 text-pink-400 dark:text-pink-500 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span
                    className={
                      answered && index === currentQ.answer
                        ? "text-green-700 dark:text-green-400"
                        : "text-foreground"
                    }
                  >
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Explicación */}
          {answered && currentQ.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800"
            >
              <p className="text-sm text-pink-800 dark:text-pink-200">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizTrivias;