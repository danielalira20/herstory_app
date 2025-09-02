import { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { useWomen } from "@/hooks/womenData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Users, Heart, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIResult {
  name: string;
  coincidencePercentage: number;
  explanation: string;
  //imagen_url: string;
} 

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const { women, loading, error } = useWomen();

  const [aiResult, setAiResult] = useState<AIResult[]>([]);
  const [loadingResult, setLoadingResult] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);

    // Si no es la última pregunta, pasamos a la siguiente
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  //Envio de respuesta a la IA
   const userProfileText = answers
    .map((ans, i) => `Pregunta: ${questions[i].question} Respuesta: ${ans}`)
    .join("\n");
  
const womenData = women.map((w) => ({
    id: w.id,
    nombre_completo: w.nombre_completo,
    biografia: w.biografia,
    logros: w.logros,
    ocupacion: w.ocupacion,
    categoria: w.categoria?.nombre || "",
    imagen_url: w.imagen_url || "/assets/default.png",
  }));

  const fetchAIResult = async () => {
    setLoadingResult(true);
    try {
      const response = await fetch("http://localhost:3000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfileText, womenData }),
      });

      const data = await response.json();

      // La IA debe devolver un JSON parseable
      const parsed: AIResult[] = data.result;
      setAiResult(parsed);
    } catch (err) {
      console.error("Error al obtener resultado de IA:", err);
    } finally {
      setLoadingResult(false);
    }
  };

    // Ejecutar IA cuando termine el quiz
    //la linea se quita si marca error
  useEffect(() => {
    if (finished) fetchAIResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

    if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto elegant-shadow">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
            <p className="text-muted-foreground">Cargando mujeres históricas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto elegant-shadow border-destructive">
        <CardContent className="p-8 text-center">
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

const progress = finished ? 100 : ((current + 1) / questions.length) * 100;


  return (

     <div className="w-full max-w-2xl mx-auto space-y-3">
      {!finished ? (
        <Card className="elegant-shadow smooth-transition hover:glow-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-sm font-semibold">
                <Users className="h-3 w-3 mr-1" />
                Quiz de Mujeres Históricas
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {current + 1} / {questions.length}
                </span>
              </div>
            </div>
            <Progress value={progress} className="w-full mb-4 h-2" />
            <CardTitle className="text-xl font-bold text-center leading-relaxed">
              {questions[current].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[current].options.map((option, idx) => (
              <Button
                key={idx}
                variant={answers[current] === option ? "hero" : "outline"}
                className="w-full text-left justify-start h-auto p-4 text-wrap"
                onClick={() => handleAnswer(option)}
              >
                <span className="mr-3 font-bold text-primary">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">

          <Card className="elegant-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Tus Respuestas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {answers.map((ans, i) => (
                  <div key={i} className="p-3 bg-secondary/10 rounded-lg">
                    <div className="text-sm text-muted-foreground font-medium">
                      Pregunta {i + 1}
                    </div>
                    <div className="font-medium">{ans}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

           {loadingResult && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-card/95 backdrop-blur-md border rounded-2xl p-8 elegant-shadow animate-scale-in">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg font-medium text-foreground">Procesando tus respuestas</p>
                </div>
              </div>
            </div>
          )} 

          {!loadingResult && (
              aiResult.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center hero-gradient bg-clip-text text-transparent">
                  ✨ Tu Mujer Histórica Ideal
                </h3>
                {aiResult.map((res, index) => (
                  <Card key={index} className="elegant-shadow hover:glow-shadow smooth-transition">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-shrink-0">
                        {/*
                          <img
                            src={res.imagen_url}
                            alt={res.name}
                            className="w-32 h-32 object-cover rounded-full elegant-shadow"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/default.png';
                            }}
                          />
                        */}</div>
                        <div className="text-center md:text-left space-y-3 flex-1">
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <h3 className="text-2xl font-bold text-primary">
                              {res.name}
                            </h3>
                            <Badge variant="secondary" className="font-bold text-sm px-2 py-1">
                              {res.coincidencePercentage}% Match
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {res.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}

          <div className="flex justify-center">
            <Button
                variant="hero"
                size="lg"
                onClick={() => window.location.reload()}
                >
                <Sparkles className="h-4 w-4 mr-2" />
                Regresar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;









