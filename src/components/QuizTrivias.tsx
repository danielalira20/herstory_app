import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Users, BookOpen, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

const categories = {
  igualdadGenero: {
    name: "Igualdad de Género",
    icon: <Users className="h-5 w-5" />,
    color: "bg-pink-500",
    questions: [
      { 
        question: "¿Qué es la igualdad de género?", 
        options: ["Hombres y mujeres con mismos derechos", "Solo mujeres tienen más derechos", "Solo hombres tienen más derechos", "No existen leyes"], 
        answer: 0,
        explanation: "La igualdad de género significa que hombres y mujeres tienen los mismos derechos, oportunidades y responsabilidades."
      },
      // ... más preguntas
      {
        question: "¿Cuál es un ejemplo de desigualdad de género?", 
        options: ["Mismo salario por mismo trabajo", "Mujeres ganando menos que hombres por igual trabajo", "Mismo acceso a educación", "Participación igual en política"], 
        answer: 1,
        explanation: "La desigualdad de género se refleja cuando las mujeres reciben un salario menor que los hombres por realizar el mismo trabajo."
  },
  { 
    question: "¿Qué significa empoderamiento femenino?", 
    options: ["Dar poder solo a mujeres", "Que las mujeres tomen decisiones y lideren", "Quitar derechos a hombres", "Ignorar la igualdad"], 
    answer: 1,
    explanation: "El empoderamiento femenino consiste en que las mujeres tengan la capacidad de tomar decisiones, liderar y participar activamente en la sociedad."
  },
  { 
    question: "ODS relacionado con igualdad de género", 
    options: ["ODS 3", "ODS 5", "ODS 7", "ODS 10"], 
    answer: 1,
    explanation: "El ODS 5 se enfoca en lograr la igualdad de género y empoderar a todas las mujeres y niñas."
  },
  { 
    question: "Un estereotipo de género es...", 
    options: ["Una creencia que limita roles de género", "Un tipo de salario", "Un derecho legal", "Un premio"], 
    answer: 0,
    explanation: "Un estereotipo de género es una idea o creencia que limita a las personas a cumplir ciertos roles por ser hombres o mujeres."
  },
  { 
    question: "¿Qué busca la brecha salarial de género?", 
    options: ["Igualar salarios", "Que hombres ganen más", "Que mujeres ganen más", "Ignorar salarios"], 
    answer: 0,
    explanation: "La lucha contra la brecha salarial busca que hombres y mujeres reciban la misma remuneración por el mismo trabajo."
  },
  { 
    question: "Violencia de género es...", 
    options: ["Abuso solo físico", "Abuso basado en género", "Abuso laboral solo", "Ignorar leyes"], 
    answer: 1,
    explanation: "La violencia de género incluye cualquier tipo de abuso (físico, psicológico, económico o sexual) que ocurre por motivos relacionados con el género."
  },
  { 
    question: "Equidad vs igualdad", 
    options: ["Son lo mismo", "Equidad considera necesidades distintas", "Equidad no existe", "Igualdad es injusta"], 
    answer: 1,
    explanation: "La igualdad da a todos lo mismo, mientras que la equidad reconoce que algunas personas necesitan apoyos diferentes para alcanzar las mismas oportunidades."
  },
  { 
    question: "Participación política femenina", 
    options: ["Debe ser limitada", "Debe ser igual que masculina", "No importa", "Solo en algunos países"], 
    answer: 1,
    explanation: "La igualdad de género implica que las mujeres deben tener las mismas oportunidades de participación política que los hombres."
  },
  { 
    question: "Educación inclusiva significa...", 
    options: ["Acceso igualitario a todos", "Solo educación para hombres", "Solo educación para mujeres", "Ignorar la educación"], 
    answer: 0,
    explanation: "La educación inclusiva busca que todas las personas, sin importar su género u otras condiciones, tengan las mismas oportunidades de acceso al aprendizaje."
  },
    ]
  },
  historiaMujeres: {
    name: "Historia de Mujeres",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-purple-500",
    questions: [
      { 
        question: "Primera mujer en recibir Nobel de la Paz", 
        options: ["Marie Curie", "Malala Yousafzai", "Bertha von Suttner", "Rigoberta Menchú"], 
        answer: 2,
        explanation: "Bertha von Suttner fue la primera mujer en recibir el Premio Nobel de la Paz en 1905."
      },
      // ... más preguntas
      { 
    question: "Quién luchó por el sufragio femenino en EEUU", 
    options: ["Susan B. Anthony", "Frida Kahlo", "Simone de Beauvoir", "Clara Zetkin"], 
    answer: 0,
    explanation: "Susan B. Anthony fue una líder clave en el movimiento por el sufragio femenino en Estados Unidos, luchando para que las mujeres pudieran votar."
  },
  { 
    question: "Famosa científica que descubrió radio", 
    options: ["Ada Lovelace", "Marie Curie", "Rosalind Franklin", "Jane Goodall"], 
    answer: 1,
    explanation: "Marie Curie descubrió el radio y el polonio, y fue la primera persona en ganar dos premios Nobel en distintas áreas científicas."
  },
  { 
    question: "Mujer pionera en aviación", 
    options: ["Amelia Earhart", "Harriet Tubman", "Marie Curie", "Valentina Tereshkova"], 
    answer: 0,
    explanation: "Amelia Earhart fue una pionera de la aviación y la primera mujer en volar sola a través del océano Atlántico."
  },
  { 
    question: "Primera mujer presidenta en el mundo", 
    options: ["Sirimavo Bandaranaike", "Angela Merkel", "Margaret Thatcher", "Indira Gandhi"], 
    answer: 0,
    explanation: "Sirimavo Bandaranaike, de Sri Lanka, fue la primera mujer en ser elegida jefa de gobierno en el mundo, en 1960."
  },
  { 
    question: "Activista por derechos civiles en EEUU", 
    options: ["Rosa Parks", "Eleanor Roosevelt", "Malala Yousafzai", "Marie Curie"], 
    answer: 0,
    explanation: "Rosa Parks fue una figura clave en el movimiento por los derechos civiles en Estados Unidos, conocida por negarse a ceder su asiento en un autobús segregado."
  },
  { 
    question: "Premio Nobel de Literatura femenina", 
    options: ["Toni Morrison", "Gabriela Mistral", "Virginia Woolf", "Todas las anteriores"], 
    answer: 3,
    explanation: "Varias mujeres han recibido el Nobel de Literatura, entre ellas Gabriela Mistral y Toni Morrison. Virginia Woolf no lo recibió, pero su aporte literario fue fundamental."
  },
  { 
    question: "Mujer importante en computación temprana", 
    options: ["Ada Lovelace", "Marie Curie", "Grace Hopper", "Rosalind Franklin"], 
    answer: 0,
    explanation: "Ada Lovelace es considerada la primera programadora de la historia, al desarrollar el primer algoritmo pensado para una máquina."
  },
  { 
    question: "Pionera del movimiento feminista en Francia", 
    options: ["Simone de Beauvoir", "Marie Curie", "Jeanne d'Arc", "Clara Zetkin"], 
    answer: 0,
    explanation: "Simone de Beauvoir fue una filósofa y escritora francesa que impulsó el feminismo moderno con su obra 'El segundo sexo'."
  },
  { 
    question: "Conocida por su activismo por niñas", 
    options: ["Malala Yousafzai", "Rosa Parks", "Angela Merkel", "Marie Curie"], 
    answer: 0,
    explanation: "Malala Yousafzai es reconocida mundialmente por su defensa del derecho a la educación de las niñas y fue la persona más joven en recibir el Nobel de la Paz."
  }
    ]
  },
  derechosHumanos: 
  {
    name: "Derechos Humanos",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-purple-500",
    questions: [
  { 
    question: "Declaración Universal de Derechos Humanos se firmó en", 
    options: ["1945", "1948", "1950", "1960"], 
    answer: 1,
    explanation: "La Declaración Universal de los Derechos Humanos fue adoptada por la Asamblea General de la ONU en 1948, estableciendo derechos básicos para todas las personas."
  },
  { 
    question: "Derecho a educación es...", 
    options: ["Derecho fundamental", "Solo opcional", "Solo para hombres", "Solo para mujeres"], 
    answer: 0,
    explanation: "El derecho a la educación es un derecho humano fundamental que garantiza acceso a enseñanza de calidad para todas las personas sin discriminación."
  },
  { 
    question: "Derecho a la salud significa...", 
    options: ["Acceso a servicios médicos", "Opcional", "Solo hospitales privados", "No es derecho"], 
    answer: 0,
    explanation: "El derecho a la salud implica que todas las personas deben tener acceso a servicios médicos, prevención y tratamientos adecuados para vivir con bienestar."
  },
  { 
    question: "Derecho a la igualdad", 
    options: ["Igualdad ante la ley", "Solo hombres", "Solo mujeres", "Solo ricos"], 
    answer: 0,
    explanation: "El derecho a la igualdad asegura que todas las personas tienen el mismo trato y protección legal sin importar género, raza, religión o condición social."
  },
  { 
    question: "Derecho a la libertad de expresión", 
    options: ["Expresar ideas sin represalias", "No se permite", "Solo en redes", "Solo adultos"], 
    answer: 0,
    explanation: "La libertad de expresión es el derecho de toda persona a expresar sus ideas y opiniones libremente sin miedo a represalias."
  },
  { 
    question: "Prohibición de tortura es un", 
    options: ["Derecho humano", "Ley opcional", "Costumbre", "Norma social"], 
    answer: 0,
    explanation: "La prohibición de la tortura es un derecho humano absoluto que protege la dignidad y la integridad de todas las personas."
  },
  { 
    question: "Derecho a voto es", 
    options: ["Fundamental", "Solo hombres", "Solo mujeres", "No existe"], 
    answer: 0,
    explanation: "El derecho al voto es un derecho fundamental que permite a las personas participar en las decisiones políticas y democráticas de su país."
  },
  { 
    question: "Derecho a reunirse es", 
    options: ["Permitir reuniones pacíficas", "Solo políticos", "Solo estudiantes", "No permitido"], 
    answer: 0,
    explanation: "El derecho de reunión garantiza que las personas puedan reunirse pacíficamente para expresar sus opiniones o defender intereses comunes."
  },
  { 
    question: "Derecho a privacidad incluye", 
    options: ["Protección de datos personales", "Publicar todo online", "Ignorar privacidad", "Solo empresas"], 
    answer: 0,
    explanation: "El derecho a la privacidad protege la vida personal y los datos de cada individuo, garantizando que no se usen sin su consentimiento."
  },
  { 
    question: "Derecho laboral incluye", 
    options: ["Trabajo justo y seguro", "Salario arbitrario", "Sin contratos", "Solo voluntariado"], 
    answer: 0,
    explanation: "El derecho laboral garantiza condiciones de trabajo justas y seguras, salarios dignos y respeto a los derechos de los trabajadores."
  }
]
}, 
activismoSocial: {
    name: "Activismo Social",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-purple-500",
    questions:
    [
  { 
    question: "Activismo social es...", 
    options: ["Acción para cambiar la sociedad", "Ignorar problemas", "Solo protestas violentas", "Solo redes sociales"], 
    answer: 0,
    explanation: "El activismo social consiste en tomar acciones para generar cambios positivos en la sociedad, promoviendo justicia, igualdad y derechos."
  },
  { 
    question: "Una forma de activismo pacífico", 
    options: ["Marchas y campañas", "Robos", "Ataques", "Ignorar causas"], 
    answer: 0,
    explanation: "El activismo pacífico incluye acciones como marchas, campañas de concientización y protestas no violentas para defender una causa."
  },
  { 
    question: "Voluntariado es", 
    options: ["Ayudar sin fines de lucro", "Trabajo obligatorio", "Solo por dinero", "Ignorar causas"], 
    answer: 0,
    explanation: "El voluntariado es el trabajo realizado libremente y sin fines de lucro, con el objetivo de ayudar a la comunidad o a quienes lo necesitan."
  },
  { 
    question: "Lobbying responsable significa", 
    options: ["Influir en políticas", "Ignorar leyes", "Solo propaganda", "Robos"], 
    answer: 0,
    explanation: "El lobbying responsable es la acción de influir en políticas públicas de manera ética y transparente, buscando cambios positivos en la sociedad."
  },
  { 
    question: "Difusión de información correcta es", 
    options: ["Educar y concienciar", "Mentir", "Ignorar hechos", "Solo rumores"], 
    answer: 0,
    explanation: "Compartir información correcta ayuda a educar y concienciar a la sociedad, evitando desinformación y fortaleciendo las causas sociales."
  },
  { 
    question: "Manifestación pacífica es", 
    options: ["Expresar opiniones legalmente", "Violenta", "Ilegal", "Ignorar causas"], 
    answer: 0,
    explanation: "Una manifestación pacífica es el derecho a expresar ideas y demandas públicamente de forma legal, sin recurrir a la violencia."
  },
  { 
    question: "Uso de redes para activismo", 
    options: ["Campañas y concientización", "Solo memes", "Ignorar redes", "Spam"], 
    answer: 0,
    explanation: "Las redes sociales son herramientas poderosas para campañas de concientización, difusión de información y organización de acciones sociales."
  },
  { 
    question: "Acción comunitaria efectiva", 
    options: ["Trabajar con comunidad", "Solo individuos", "Ignorar problemas", "Solo gobierno"], 
    answer: 0,
    explanation: "La acción comunitaria efectiva se logra trabajando en conjunto con la comunidad para resolver problemas y promover el bienestar colectivo."
  },
  { 
    question: "Empoderamiento social incluye", 
    options: ["Dar voz a todos", "Ignorar a minorías", "Solo líderes", "Solo ricos"], 
    answer: 0,
    explanation: "El empoderamiento social busca dar voz, oportunidades y participación a todas las personas, especialmente a quienes suelen ser excluidos."
  },
  { 
    question: "Solidaridad es", 
    options: ["Apoyar causas justas", "Ignorar problemas", "Solo palabras", "Solo dinero"], 
    answer: 0,
    explanation: "La solidaridad significa apoyar de manera activa y comprometida causas justas y a quienes lo necesitan, más allá de las palabras."
  }
]
    
}, 
arteYCultura:{
     name: "Arte y cultura",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-purple-500",
    questions:
    [
  { 
    question: "El arte es...", 
    options: ["Expresión creativa", "Solo pintura", "Solo música", "Solo baile"], 
    answer: 0,
    explanation: "El arte es una forma de expresión creativa que abarca distintas manifestaciones como pintura, música, danza, literatura y más."
  },
  { 
    question: "Cultura incluye...", 
    options: ["Tradiciones y costumbres", "Solo música", "Solo religión", "Solo idioma"], 
    answer: 0,
    explanation: "La cultura incluye tradiciones, costumbres, creencias, arte, lengua y todas las formas en que las sociedades expresan su identidad."
  },
  { 
    question: "Mujeres en arte importante", 
    options: ["Frida Kahlo", "Todas las anteriores", "Mary Cassatt", "Artemisia Gentileschi"], 
    answer: 1,
    explanation: "Muchas mujeres han hecho historia en el arte, como Frida Kahlo, Mary Cassatt y Artemisia Gentileschi, contribuyendo en distintas disciplinas."
  },
  { 
    question: "Movimientos culturales incluyen", 
    options: ["Renaissance, Modernismo", "Solo actual", "Solo pasado", "Nada"], 
    answer: 0,
    explanation: "Los movimientos culturales como el Renacimiento o el Modernismo reflejan cambios en la forma de pensar, crear y vivir en distintas épocas."
  },
  { 
    question: "Arte feminista busca", 
    options: ["Visibilizar mujeres", "Ignorar género", "Solo estética", "Solo hombres"], 
    answer: 0,
    explanation: "El arte feminista busca visibilizar la participación de las mujeres, cuestionar desigualdades y promover la igualdad de género."
  },
  { 
    question: "Música y empoderamiento femenino", 
    options: ["Canciones que inspiran igualdad", "Ignorar música", "Solo instrumental", "Solo hombres"], 
    answer: 0,
    explanation: "La música también es una herramienta de empoderamiento, con canciones que inspiran igualdad y dan voz a las mujeres."
  },
  { 
    question: "Literatura escrita por mujeres", 
    options: ["Jane Austen, Gabriela Mistral", "Solo hombres", "Ignorar literatura", "Solo infantil"], 
    answer: 0,
    explanation: "Mujeres como Jane Austen y Gabriela Mistral transformaron la literatura con su visión y estilo, influyendo en generaciones posteriores."
  },
  { 
    question: "Teatro feminista destaca...", 
    options: ["Temas de igualdad", "Solo comedia", "Solo danza", "Ignorar género"], 
    answer: 0,
    explanation: "El teatro feminista aborda temas de igualdad, cuestiona roles de género y promueve la reflexión social a través de las artes escénicas."
  },
  { 
    question: "Patrimonio cultural incluye...", 
    options: ["Tradiciones y arte", "Solo edificios", "Solo monumentos", "Nada"], 
    answer: 0,
    explanation: "El patrimonio cultural abarca tradiciones, expresiones artísticas, monumentos, y todo aquello que representa la identidad de un pueblo."
  },
  { 
    question: "Museos destacan...", 
    options: ["Mujeres artistas", "Solo hombres", "Solo historia", "Nada"], 
    answer: 0,
    explanation: "Cada vez más museos buscan visibilizar a mujeres artistas que antes fueron ignoradas, reconociendo su papel en la historia del arte."
  }
]
}
};

const QuizTrivias = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleCategorySelect = (category: keyof typeof categories) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (answered || !selectedCategory) return;

    const currentQ = categories[selectedCategory].questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.answer;
    
    setAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "¡Correcto! 🎉",
      });
    } else {
      toast({
        title: "Incorrecto 😔",
      });
    }

    setTimeout(() => {
      if (currentQuestion < categories[selectedCategory].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };


 if (!selectedCategory) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Elige una Categoría</h2>
          <p className="text-muted-foreground">Selecciona un tema para comenzar tu quiz</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <Card
              key={key}
              className="cursor-pointer hover:scale-105 smooth-transition soft-shadow hover:elegant-shadow"
              onClick={() => handleCategorySelect(key as keyof typeof categories)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${category.color} text-white`}>{category.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.questions.length} preguntas</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = categories[selectedCategory].questions[currentQuestion];
  const progress = ((currentQuestion + 1) / categories[selectedCategory].questions.length) * 100;

  if (showResult) {
    const totalQuestions = categories[selectedCategory].questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <Card className="w-full max-w-2xl mx-auto elegant-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><Trophy className="h-16 w-16 text-accent" /></div>
          <CardTitle className="text-2xl">¡Quiz Completado!</CardTitle>
          <CardDescription>Has respondido {score} de {totalQuestions} preguntas correctamente</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold hero-gradient bg-clip-text text-transparent">{percentage}%</div>
          <Progress value={percentage} className="w-full" />
          <div className="flex gap-2 justify-center">
            <Button onClick={resetQuiz} variant="outline">Nuevo Quiz</Button>
            <Button onClick={() => handleCategorySelect(selectedCategory)} variant="hero">Reintentar</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto elegant-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-sm">{categories[selectedCategory].name}</Badge>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{currentQuestion + 1} / {categories[selectedCategory].questions.length}</span>
          </div>
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <CardTitle className="text-xl">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentQ.options.map((option, index) => (
          <Button
            key={index}
            variant={answered ? (index === currentQ.answer ? "hero" : "outline") : "outline"}
            className="w-full text-left justify-start h-auto p-4"
            onClick={() => handleAnswer(index)}
            disabled={answered}
          >
            <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
            {option}
          </Button>
        ))}

        {answered && (
          <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Explicación: {currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button variant="ghost" onClick={resetQuiz}>Salir del Quiz</Button>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span>Puntuación: {score}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizTrivias;